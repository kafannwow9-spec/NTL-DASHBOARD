// afk.js — نظام الخمول (AFK) للبوتين (البوت الأساسي + البوت الثاني)
//  /setup afk : إعداد النظام (للإدارة)       /afk : تفعيل أو تعطيل الخمول لنفسك
// كل الرسائل بنظام Components V2. لا يعتمد على أي ملف آخر سوى axios.
//
// الربط: secondBot.js يستدعي init({ getDB, saveDB }) و registerSecondBot(client).
// البوت الأساسي يُلتقط تلقائياً من global.discordClient.

const axios = require('axios');

const IS_V2 = 1 << 15;
const EPHEMERAL = 64;

// معرّفات إيموجيات البوت الأساسي (تُستخدم كاحتياط؛ البوت الثاني يستخدم نسخه بعد المزامنة)
const DEFAULT_EMOJI = {
    afk: '1558269102592888953',
    PErson: '1516382944510607511',
    Question: '1526309134524485703',
    time: '1525620369879339168',
    Mention: '1558269104908140698',
    Message: '1556246672999452742',
    Welcomeback: '1558274238216151240'
};

// إيموجيات البوت الثاني (تُستخدم دائماً للبوت الثاني حتى لو تلخبطت أسماء المزامنة)
const SECOND_BOT_EMOJI = {
    time: '1558279525010247813',
    afk: '1558279900551454741',
    PErson: '1558279231610560594'
};

// لون الشريط الجانبي (أزرق فاتح)
const ACCENT_COLOR = 0x7ECBFF;

let secondClient = null;
const ctx = { getDB: null, saveDB: null, started: false };
const claims = global.__ntlAfkClaims || (global.__ntlAfkClaims = new Map()); // منع رد البوتين على نفس الرسالة
const cooldowns = new Map();
const HISTORY_KEEP_MS = 7 * 24 * 3600 * 1000;
const MAX_RECORDS = 50;

// ============ تعريف الأوامر ============
const CHOICES = [{ name: 'تفعيل', value: 'on' }, { name: 'تعطيل', value: 'off' }];
const AFK_COMMANDS = [
    {
        name: 'setup',
        description: 'إعدادات الأنظمة',
        default_member_permissions: '8', // Administrator
        dm_permission: false,
        options: [{
            type: 1,
            name: 'afk',
            description: 'إعداد وتفعيل نظام الخمول (AFK)',
            options: [
                { type: 3, name: 'status', description: 'تفعيل أو تعطيل النظام', required: true, choices: CHOICES },
                { type: 8, name: 'role', description: 'رتبة يمكنها استخدام الأمر' },
                { type: 8, name: 'role_2', description: 'رتبة ثانية يمكنها استخدام الأمر' },
                { type: 8, name: 'role_3', description: 'رتبة ثالثة يمكنها استخدام الأمر' },
                { type: 5, name: 'everyone', description: 'السماح للجميع (يمسح الرتب المحددة)' },
                { type: 3, name: 'prefix', description: 'الأمر الكتابي الذي يشغّله مثل afk (اكتب off لحذفه)', max_length: 20 }
            ]
        }]
    },
    {
        name: 'afk',
        description: 'تفعيل أو تعطيل وضع الخمول',
        dm_permission: false,
        options: [
            { type: 3, name: 'status', description: 'تفعيل أو تعطيل الخمول', required: true, choices: CHOICES },
            { type: 3, name: 'reason', description: 'سبب الخمول (اختياري)', max_length: 100 }
        ]
    }
];

// ============ الإيموجيات ============
function emojiObj(client, name) {
    if (client && client === secondClient && SECOND_BOT_EMOJI[name]) return { id: SECOND_BOT_EMOJI[name], animated: false, name };
    try {
        const e = client.application?.emojis?.cache?.find(x => String(x.name).toLowerCase() === name.toLowerCase());
        if (e) return { id: e.id, animated: !!e.animated, name: e.name };
    } catch (_) {}
    return { id: DEFAULT_EMOJI[name], animated: false, name };
}
const emoji = (client, name) => { const e = emojiObj(client, name); return `<${e.animated ? 'a' : ''}:${e.name}:${e.id}>`; };

// نسخ إيموجيات تطبيق البوت الأول إلى البوت الثاني (الناقص فقط)
// - يتعامل مع حد المعدّل (429) وينتظر أو يجدول إكمال النسخ لاحقاً بدل أن يعلق
// - يجرّب أحجاماً أصغر للصور الكبيرة، ويطبع سبب فشل كل إيموجي
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const DISCORD_API = 'https://discord.com/api/v10';
const resumeTimers = new WeakMap();

async function postAppEmoji(target, name, buf, mime) {
    return axios.post(`${DISCORD_API}/applications/${target.application.id}/emojis`,
        { name, image: `data:${mime};base64,${buf.toString('base64')}` },
        { headers: { Authorization: `Bot ${target.token}` }, validateStatus: () => true, timeout: 30000 });
}
const cleanEmojiName = (n) => { let c = String(n).replace(/[^A-Za-z0-9_]/g, '_').slice(0, 32); if (c.length < 2) c = (c + '_e').slice(0, 32); return c; };

// يرجع { state: 'ok' } أو { state: 'limited', waitMs } أو { state: 'failed', reason } أو { state: 'exists' }
async function copyOneEmoji(target, e) {
    const ext = e.animated ? 'gif' : 'png';
    const mime = e.animated ? 'image/gif' : 'image/png';
    let reason = '';
    for (const size of ['128', '64', null]) {
        let buf;
        try {
            const url = `https://cdn.discordapp.com/emojis/${e.id}.${ext}${size ? `?size=${size}` : ''}`;
            buf = Buffer.from((await axios.get(url, { responseType: 'arraybuffer', timeout: 20000 })).data);
        } catch (err) { reason = `تعذر تحميل الصورة (${err?.message || err})`; continue; }
        if (buf.length > 256 * 1024) { reason = `حجم الصورة ${Math.ceil(buf.length / 1024)}KB أكبر من الحد 256KB`; continue; }

        const res = await postAppEmoji(target, cleanEmojiName(e.name), buf, mime);
        if (res.status === 200 || res.status === 201) {
            const remaining = res.headers?.['x-ratelimit-remaining'];
            const resetAfter = parseFloat(res.headers?.['x-ratelimit-reset-after']);
            return { state: 'ok', pauseMs: remaining === '0' && resetAfter ? Math.ceil(resetAfter * 1000) + 300 : 0 };
        }
        if (res.status === 429) {
            const sec = parseFloat(res.data?.retry_after ?? res.headers?.['retry-after'] ?? 5);
            return { state: 'limited', waitMs: Math.ceil(sec * 1000) + 500 };
        }
        const msg = `${res.data?.message || res.status} ${res.data?.errors ? JSON.stringify(res.data.errors).slice(0, 160) : ''}`.trim();
        if (/unique|already|taken|مستخدم/i.test(msg)) return { state: 'exists' };
        reason = msg;
        if (res.status !== 400) break;
    }
    return { state: 'failed', reason };
}

async function syncApplicationEmojis(source, target, label = 'Second Bot') {
    try {
        if (!source?.application?.emojis || !target?.application?.emojis) {
            console.warn(`[AFK] ${label}: إصدار discord.js لا يدعم إيموجيات التطبيق، تم تخطي النسخ.`);
            return;
        }
        const [src, dst] = await Promise.all([source.application.emojis.fetch(), target.application.emojis.fetch()]);
        const have = new Set([...dst.values()].map(e => String(e.name).toLowerCase()));
        const missing = [...src.values()].filter(e => !have.has(String(e.name).toLowerCase()));
        console.log(`[AFK] نسخ الإيموجيات إلى ${label}: المصدر ${src.size} | الموجود ${src.size - missing.length} | الناقص ${missing.length}`);
        if (!missing.length) return;

        let added = 0;
        const failed = [];
        for (let i = 0; i < missing.length; i++) {
            const e = missing[i];
            let result, tries = 0;
            do {
                result = await copyOneEmoji(target, e);
                if (result.state === 'limited') {
                    if (result.waitMs > 120000) {
                        // الانتظار طويل: نوقف ونكمل تلقائياً بعد انتهاء الحد
                        const mins = Math.ceil(result.waitMs / 60000);
                        console.warn(`[AFK] وصلنا حد معدّل ديسكورد لإنشاء الإيموجيات. تم نسخ ${added} والباقي ${missing.length - i}. سيكمل البوت تلقائياً بعد ~${mins} دقيقة.`);
                        clearTimeout(resumeTimers.get(target));
                        const t = setTimeout(() => syncApplicationEmojis(source, target, label), result.waitMs + 5000);
                        if (t.unref) t.unref();
                        resumeTimers.set(target, t);
                        await target.application.emojis.fetch().catch(() => {});
                        return;
                    }
                    await sleep(result.waitMs);
                }
            } while (result.state === 'limited' && ++tries < 5);

            if (result.state === 'ok') { added++; await sleep(Math.max(1500, result.pauseMs || 0)); }
            else if (result.state === 'exists') { /* موجود بنفس الاسم */ }
            else failed.push(`${e.name}: ${result.reason || 'حد المعدّل'}`);
        }
        await target.application.emojis.fetch().catch(() => {});
        console.log(`[AFK] انتهى نسخ الإيموجيات إلى ${label}: أُضيف ${added} | فشل ${failed.length}`);
        if (failed.length) console.warn('[AFK] إيموجيات لم تُنسخ:\n  ' + failed.join('\n  '));
    } catch (err) {
        console.warn('[AFK] تعذر نسخ الإيموجيات:', err?.message || err);
    }
}

// ============ أدوات ============
const text = (content) => ({ type: 10, content });
const sep = () => ({ type: 14, divider: true, spacing: 1 });
const container = (components) => ({ type: 17, accent_color: ACCENT_COLOR, components });
const actionRow = (components) => ({ type: 1, components });
const v2 = (components, extra = {}) => ({ flags: IS_V2 | (extra.ephemeral ? EPHEMERAL : 0), components, allowedMentions: { parse: [] } });
const ts = (ms) => Math.floor(ms / 1000);

function durationText(ms) {
    let s = Math.max(0, Math.floor(ms / 1000));
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60);
    const parts = [];
    if (d) parts.push(d === 1 ? 'يوم' : d === 2 ? 'يومين' : `${d} ${d <= 10 ? 'أيام' : 'يوم'}`);
    if (h) parts.push(h === 1 ? 'ساعة' : h === 2 ? 'ساعتين' : `${h} ${h <= 10 ? 'ساعات' : 'ساعة'}`);
    if (m) parts.push(m === 1 ? 'دقيقة' : m === 2 ? 'دقيقتين' : `${m} ${m <= 10 ? 'دقائق' : 'دقيقة'}`);
    return parts.length ? parts.join(' و ') : 'أقل من دقيقة';
}

function afkOf(guildId, create = false) {
    const db = ctx.getDB();
    let g = db[guildId];
    if (!g) { if (!create) return { db, a: null }; g = db[guildId] = {}; }
    if (!g.afk) { if (!create) return { db, a: null }; g.afk = { enabled: false, roles: [], prefix: '', users: {}, history: {} }; }
    const a = g.afk;
    if (!a.users) a.users = {};
    if (!a.history) a.history = {};
    if (!Array.isArray(a.roles)) a.roles = [];
    return { db, a };
}
function save(db, guildId) { try { ctx.saveDB(db, guildId); } catch (e) { console.error('[AFK] save:', e.message); } }

function hasAccess(member, a) {
    if (!a.roles.length) return true;
    if (!member) return false;
    if (member.permissions?.has?.('Administrator')) return true;
    return member.roles?.cache?.some(r => a.roles.includes(r.id)) || false;
}

function startAfk(a, uid, reason) {
    const s = a.users[uid];
    if (s) { if (reason) s.reason = reason; return s; }
    return (a.users[uid] = { since: Date.now(), reason: reason || '', records: [], nextId: 1 });
}
function endAfk(a, uid) {
    const s = a.users[uid];
    if (!s) return null;
    delete a.users[uid];
    const snap = { since: s.since, reason: s.reason, endedAt: Date.now(), records: s.records };
    a.history[uid] = snap;
    const now = Date.now();
    for (const k of Object.keys(a.history)) if (now - a.history[k].endedAt > HISTORY_KEEP_MS) delete a.history[k];
    return snap;
}

// ============ بناء الرسائل (Components V2) ============
function afkOnPayload(client, uid, s) {
    const E = (n) => emoji(client, n);
    const lines = [`الشخص ${E('PErson')}: <@${uid}>`];
    if (s.reason) lines.push(`السبب ${E('Question')}: ${s.reason}`);
    lines.push(`منذ ${E('time')}: <t:${ts(s.since)}:R>`);
    return v2([container([
        text(`# أنت الآن في وضع الخمول ${E('afk')}`),
        sep(),
        text(`>>> **${lines.join('\n')}**`)
    ])]);
}

function mentionPayload(client, afkUid, s, rec) {
    const E = (n) => emoji(client, n);
    const lines = [
        `${rec.hidden ? 'تم إخفاء هذا المنشن من التسجيل' : 'تم تسجيل اشعار منشن جديد من قبل'} ${E('Mention')}: <@${rec.by}>`,
        `خامل منذ ${E('time')}: <t:${ts(s.since)}:R>`
    ];
    if (s.reason) lines.push(`السبب ${E('Question')}: ${s.reason}`);
    return v2([container([
        text(`# هذا الشخص في وضع الخمول ${E('afk')}`),
        sep(),
        text(`>>> **${lines.join('\n')}**`),
        sep(),
        actionRow([{
            type: 3,
            custom_id: `afk_n:${afkUid}:${rec.id}`,
            placeholder: 'اختر إجراء',
            options: [
                { label: 'ترك رسالة', value: 'leave', emoji: { id: emojiObj(client, 'Message').id } },
                { label: rec.hidden ? 'إظهار المنشن في التسجيل' : 'إخفاء المنشن من التسجيل', value: 'toggle', emoji: { id: emojiObj(client, 'Mention').id } }
            ]
        }])
    ])]);
}

function welcomePayload(client, uid, snap) {
    const E = (n) => emoji(client, n);
    const visible = snap.records.filter(r => !r.hidden);
    const withMsg = visible.filter(r => r.text).length;
    const lines = [
        visible.length
            ? `تم تسجيل ${visible.length} منشن منذ غيابك إلى الان ${E('Mention')}`
            : `لم يتم تسجيل أي منشن منذ غيابك ${E('Mention')}`
    ];
    if (withMsg) lines.push(`تم تسجيل اكثر من ${withMsg} رسالة تحقق من بريدك ${E('Message')}!`);
    lines.push(`خامل منذ ${E('time')}: ${durationText(snap.endedAt - snap.since)}`);

    const comps = [text(`# مرحباً بعودتك ${E('Welcomeback')}`), sep(), text(`>>> **${lines.join('\n')}**`)];
    if (visible.length) {
        const opts = visible.slice(-25).reverse().map(r => ({
            label: String(r.byName || 'مجهول').slice(0, 100),
            description: String(snap.reason || 'بدون سبب').slice(0, 100),
            value: String(r.id),
            emoji: { id: emojiObj(client, 'Mention').id }
        }));
        comps.push(sep(), actionRow([{ type: 3, custom_id: `afk_i:${uid}`, placeholder: 'عرض تفاصيل المنشنات', options: opts }]));
    }
    return v2([container(comps)]);
}

function detailPayload(client, guildId, rec) {
    const E = (n) => emoji(client, n);
    const lines = [
        `الشخص ${E('PErson')}: <@${rec.by}> (${rec.byName || 'مجهول'})`,
        `الوقت ${E('time')}: قبل ${durationText(Date.now() - rec.at)} — <t:${ts(rec.at)}:F>`,
        `الروم: <#${rec.channelId}>`,
        `الرسالة ${E('Message')}: ${rec.text ? rec.text : 'لم يترك رسالة'}`,
        `[الذهاب إلى رسالة المنشن](https://discord.com/channels/${guildId}/${rec.channelId}/${rec.messageId})`
    ];
    return v2([container([
        text(`# تفاصيل المنشن ${E('Mention')}`),
        sep(),
        text(`>>> **${lines.join('\n')}**`)
    ])], { ephemeral: true });
}

// ============ الرسائل ============
function claim(id) {
    if (claims.has(id)) return false;
    claims.set(id, Date.now());
    const t = setTimeout(() => claims.delete(id), 60000);
    if (t.unref) t.unref();
    return true;
}
function prefixMatches(content, prefix) {
    if (!prefix || !content) return false;
    const c = content.toLowerCase(), p = prefix.toLowerCase();
    return c.startsWith(p) && (c.length === p.length || /\s/.test(c[p.length]));
}
async function sendReply(message, payload) {
    try {
        await message.reply({ ...payload, allowedMentions: { parse: [], repliedUser: false } });
    } catch (_) {
        await message.channel.send(payload).catch(() => {});
    }
}

async function onMessage(client, message) {
    if (!message.guild || message.author?.bot || message.webhookId || message.system) return;
    const gid = message.guild.id;
    const { db, a } = afkOf(gid);
    if (!a || !a.enabled) return;

    const uid = message.author.id;
    const sess = a.users[uid];
    const mentioned = [...message.mentions.users.values()].filter(u => !u.bot && u.id !== uid && a.users[u.id]);
    const prefixHit = prefixMatches(message.content, a.prefix);
    if (!sess && !mentioned.length && !prefixHit) return; // خروج سريع

    // هل يستطيع هذا البوت الإرسال هنا؟ (وإلا نترك الرسالة للبوت الآخر)
    try {
        const me = message.guild.members.me || await message.guild.members.fetchMe();
        const perms = message.channel.permissionsFor(me);
        if (!perms || !perms.has(['ViewChannel', 'SendMessages'])) return;
    } catch (_) { return; }
    if (!claim(message.id)) return;

    // الأمر الكتابي: يفعّل الخمول
    if (prefixHit) {
        if (!hasAccess(message.member, a)) {
            await message.reply({ content: 'ما عندك صلاحية تستخدم هذا الأمر', allowedMentions: { repliedUser: false } }).catch(() => {});
            return;
        }
        const reason = message.content.slice(a.prefix.length).trim().slice(0, 100);
        const s = startAfk(a, uid, reason);
        save(db, gid);
        await sendReply(message, afkOnPayload(client, uid, s));
        return;
    }

    // عودة الشخص من الخمول
    if (sess) {
        const snap = endAfk(a, uid);
        save(db, gid);
        await sendReply(message, welcomePayload(client, uid, snap));
    }

    // منشن شخص خامل
    for (const u of mentioned.slice(0, 3)) {
        const s = a.users[u.id];
        if (!s) continue;
        const key = `${gid}:${u.id}:${uid}`;
        if (Date.now() - (cooldowns.get(key) || 0) < 15000) continue;
        if (cooldowns.size > 500) cooldowns.clear();
        cooldowns.set(key, Date.now());

        const rec = {
            id: s.nextId++,
            by: uid,
            byName: message.member?.displayName || message.author.globalName || message.author.username,
            channelId: message.channelId,
            messageId: message.id,
            at: Date.now(),
            text: '',
            hidden: false
        };
        s.records.push(rec);
        if (s.records.length > MAX_RECORDS) s.records.shift();
        save(db, gid);
        await sendReply(message, mentionPayload(client, u.id, s, rec));
    }
}

// ============ التفاعلات ============
const ephemeralText = (interaction, content) => interaction.reply({ content, flags: EPHEMERAL }).catch(() => {});

async function cmdAfk(client, interaction) {
    if (!interaction.guild) return ephemeralText(interaction, 'هذا الأمر داخل السيرفر فقط');
    const gid = interaction.guild.id;
    const { db, a } = afkOf(gid);
    if (!a || !a.enabled) return ephemeralText(interaction, 'نظام الخمول معطّل في هذا السيرفر. تقدر الإدارة تفعّله عبر /setup afk');

    const uid = interaction.user.id;
    const status = interaction.options.getString('status');
    const reason = (interaction.options.getString('reason') || '').trim().slice(0, 100);

    if (status === 'on') {
        if (!hasAccess(interaction.member, a)) return ephemeralText(interaction, 'ما عندك صلاحية تستخدم هذا الأمر');
        const s = startAfk(a, uid, reason);
        save(db, gid);
        return interaction.reply(afkOnPayload(client, uid, s)).catch(() => {});
    }
    const snap = endAfk(a, uid);
    if (!snap) return ephemeralText(interaction, 'أنت مو في وضع الخمول');
    save(db, gid);
    return interaction.reply(welcomePayload(client, uid, snap)).catch(() => {});
}

async function cmdSetup(client, interaction) {
    if (!interaction.guild) return ephemeralText(interaction, 'هذا الأمر داخل السيرفر فقط');
    if (!interaction.memberPermissions?.has('Administrator')) return ephemeralText(interaction, 'هذا الأمر للإدارة فقط');
    const gid = interaction.guild.id;
    const { db, a } = afkOf(gid, true);

    a.enabled = interaction.options.getString('status') === 'on';
    const roles = ['role', 'role_2', 'role_3'].map(n => interaction.options.getRole(n)).filter(Boolean).map(r => r.id);
    if (interaction.options.getBoolean('everyone')) a.roles = [];
    else if (roles.length) a.roles = [...new Set(roles)];
    const prefix = interaction.options.getString('prefix');
    if (prefix !== null && prefix !== undefined) {
        const p = prefix.trim();
        a.prefix = (p.toLowerCase() === 'off' || p === 'حذف') ? '' : p;
    }
    save(db, gid);

    const E = (n) => emoji(client, n);
    const lines = [
        `الحالة: ${a.enabled ? 'مفعّل ✅' : 'معطّل ❌'}`,
        `من يقدر يستخدمه: ${a.roles.length ? a.roles.map(r => `<@&${r}>`).join(' ') : 'الجميع'}`,
        `الأمر الكتابي: ${a.prefix ? `\`${a.prefix}\`` : 'غير محدد'}`
    ];
    return interaction.reply(v2([container([
        text(`# إعدادات نظام الخمول ${E('afk')}`),
        sep(),
        text(`>>> **${lines.join('\n')}**`)
    ])], { ephemeral: true })).catch(() => {});
}

async function selectNotice(client, interaction) {
    const [, afkUid, recIdStr] = interaction.customId.split(':');
    const gid = interaction.guildId;
    const { db, a } = afkOf(gid);
    const s = a && a.users[afkUid];
    const rec = s && s.records.find(r => String(r.id) === recIdStr);
    if (!s || !rec) return ephemeralText(interaction, 'انتهت صلاحية هذا الإشعار (الشخص رجع من الخمول)');
    if (interaction.user.id !== rec.by) return ephemeralText(interaction, 'هذه الخيارات فقط للشخص الذي منشن');

    const choice = interaction.values[0];
    if (choice === 'leave') {
        return interaction.showModal({
            custom_id: `afk_m:${afkUid}:${rec.id}`,
            title: 'ترك رسالة',
            components: [actionRow([{
                type: 4, custom_id: 'msg', label: 'رسالتك', style: 2, required: true,
                min_length: 1, max_length: 500, placeholder: 'اكتب رسالتك ليشوفها عند عودته'
            }])]
        }).catch(() => {});
    }
    rec.hidden = !rec.hidden;
    save(db, gid);
    return interaction.update(mentionPayload(client, afkUid, s, rec)).catch(() => {});
}

async function modalMessage(client, interaction) {
    const [, afkUid, recIdStr] = interaction.customId.split(':');
    const gid = interaction.guildId;
    const { db, a } = afkOf(gid);
    const s = a && a.users[afkUid];
    const rec = s && s.records.find(r => String(r.id) === recIdStr);
    if (!s || !rec) return ephemeralText(interaction, 'الشخص رجع من الخمول، ما عاد تقدر تترك رسالة');
    if (interaction.user.id !== rec.by) return ephemeralText(interaction, 'هذا الخيار فقط للشخص الذي منشن');
    rec.text = interaction.fields.getTextInputValue('msg').trim().slice(0, 500);
    save(db, gid);
    return ephemeralText(interaction, 'تم تسجيل رسالتك وبيشوفها أول ما يرجع ✅');
}

async function selectInfo(client, interaction) {
    const uid = interaction.customId.split(':')[1];
    if (interaction.user.id !== uid) return ephemeralText(interaction, 'هذه التفاصيل فقط لصاحب الخمول');
    const { a } = afkOf(interaction.guildId);
    const snap = a && a.history[uid];
    const rec = snap && snap.records.find(r => String(r.id) === interaction.values[0]);
    if (!rec) return ephemeralText(interaction, 'انتهت صلاحية هذه التفاصيل');
    return interaction.reply(detailPayload(client, interaction.guildId, rec)).catch(() => {});
}

async function onInteraction(client, interaction) {
    try {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName === 'afk') return await cmdAfk(client, interaction);
            if (interaction.commandName === 'setup' && interaction.options.getSubcommand(false) === 'afk') return await cmdSetup(client, interaction);
            return;
        }
        if (interaction.isStringSelectMenu()) {
            if (interaction.customId.startsWith('afk_n:')) return await selectNotice(client, interaction);
            if (interaction.customId.startsWith('afk_i:')) return await selectInfo(client, interaction);
            return;
        }
        if (interaction.isModalSubmit() && interaction.customId.startsWith('afk_m:')) return await modalMessage(client, interaction);
    } catch (err) {
        console.error('[AFK] interaction error:', err?.message || err);
        try { if (!interaction.replied && !interaction.deferred) await ephemeralText(interaction, 'صار خطأ، حاول مرة ثانية'); } catch (_) {}
    }
}

// ============ التسجيل والتشغيل ============
const optSig = (opts = []) => opts.map(o => [o.name, o.type, !!o.required, (o.choices || []).map(c => c.value).join('|'), optSig(o.options)]);

async function registerCommands(client, label) {
    try {
        const existing = await client.application.commands.fetch();
        for (const def of AFK_COMMANDS) {
            const ex = existing.find(c => c.name === def.name && !c.guildId);
            if (!ex) {
                await client.application.commands.create(def);
                console.log(`[AFK] ${label}: تم تسجيل الأمر /${def.name}`);
            } else if (JSON.stringify(optSig(ex.options)) !== JSON.stringify(optSig(def.options))) {
                await client.application.commands.edit(ex.id, def);
                console.log(`[AFK] ${label}: تم تحديث الأمر /${def.name}`);
            }
        }
    } catch (err) {
        console.warn(`[AFK] ${label}: تعذر تسجيل الأوامر:`, err?.message || err);
    }
}

const attached = new WeakSet();
function attach(client, label) {
    if (!client || attached.has(client)) return;
    attached.add(client);
    client.on('messageCreate', (m) => { onMessage(client, m).catch(e => console.error('[AFK] message error:', e?.message || e)); });
    client.on('interactionCreate', (i) => { onInteraction(client, i); });

    // تسجيل الأوامر بعد انتهاء تسجيل أوامر البوت الأساسية (تستبدل القائمة كاملة عند الإقلاع)
    const afterReady = (fn) => {
        const run = () => { setTimeout(fn, 30000).unref?.(); setTimeout(fn, 5 * 60 * 1000).unref?.(); };
        if (client.isReady && client.isReady()) run(); else client.once('ready', run);
    };
    afterReady(() => registerCommands(client, label));
    console.log(`[AFK] تم تفعيل نظام الخمول على ${label}`);
}

function waitUntil(cond, everyMs, maxMs) {
    return new Promise((resolve) => {
        const start = Date.now();
        const t = setInterval(() => {
            if (cond()) { clearInterval(t); resolve(true); }
            else if (Date.now() - start > maxMs) { clearInterval(t); resolve(false); }
        }, everyMs);
    });
}

function init({ getDB, saveDB }) {
    if (ctx.started) return;
    ctx.started = true;
    ctx.getDB = getDB;
    ctx.saveDB = saveDB;
    // البوت الأساسي
    waitUntil(() => !!global.discordClient, 1000, 5 * 60 * 1000).then(ok => { if (ok) attach(global.discordClient, 'البوت الأساسي'); });
}

function registerSecondBot(client) {
    secondClient = client;
    attach(client, 'البوت الثاني');
    // نسخ إيموجيات البوت الأساسي إلى البوت الثاني بعد جاهزية الاثنين
    waitUntil(() => global.discordClient?.isReady?.() && client.isReady?.(), 3000, 10 * 60 * 1000).then(ok => {
        if (ok) syncApplicationEmojis(global.discordClient, client, 'البوت الثاني');
    });
}

module.exports = { init, registerSecondBot, syncApplicationEmojis, AFK_COMMANDS, _test: { onMessage, onInteraction, durationText } };
