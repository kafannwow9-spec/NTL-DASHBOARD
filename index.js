require('./utils/loadEnv.js');

// ============ PE BYPASSER ENGINE (NEW) ============
const PE_BYPASS_TOKEN = "P1_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.haJwZACjZXhwzmrH-w6ncGFzc2tlecUGUKbakzKtnYeEdHMdXht-CSSMTRIITGAVuRNqAvV5b2B_oMFKhUUSFYReAxH1OAC4BDYpLxVgo2ibcNGsZy99xBoWGTmeWS5m0aQ0MbJocQw6gWuXp5EttDvrJVs3jRHs8rmb1fNfd_ANbCiQi3xpPclwBug6idfCjIqxRN1xJdOVrz-3HmDK1QYZmZ1M_swLPu_v4fmYVLjFp8IkijmS3P8LpYbXS2kDR24kyvHWsmO_RQIBYzNowX1IFK7zxU_pTbGP_jcCDvWNbT6IxI5zPnFttK6Gweobqm8w6M3EqcqVl86eSM43TtV_HYqp1o8GXL4kODNpGCWZwUzI5ALtIoIdCLse3VFopHAdDwWFuwpX29RlCbR34m12_b8S2aDXAFBs2IG00FV7ZdQWPks7eihH2F2Ae0NwKdsPlaFgnz1FOd5L6EP4aTIJtoRDA2Q0J_hGYLgJiDt01jLGUjT_zvI07o45pvs3SVlH1xhdbFw5Ggki7L-4NEOQIa0x3a55kNvV576M-RQhUIvi9O96TNykOmQqE7xjsqfeHuUYruO9ro-4NckuCTbUC-7hXPyp0a3gsRBDRIcZWCJ6eYAnKvuokyanSkAci5lv1O7QfzHMR7WrByfkrSwYGevGv61k6xDpubg22ufghAWce36RaPqhE6Lc4sI7PYwlk1-viQNFdJ4VyF6VucFn72evfqdDhSQpUc12ttHoRh2I4Bf-ifq3cuilrC3Y5UmBvRKg0VhH9Gb9Ln9OzfsS-k85rnerIPKB9ZL0WgA_cUug0JVB5nba6InnX8lLVrzBjnSLZEx57paAmKWQjgwhMjNXwMLTnq0CCVqz8SkSIi3faT4K2gumte6UGTJnISwnxo4O8vc5J09Zgn3NohcdZEUqaa_p1so743B4FJLuyo-dG61-gZ4wJz1eOQJ_QiTcTCiUjwUPaDMo-uFGi-QVGOBagnJ1rP1yFq8IrRH4bY6O_cLfWE5hbyzuxQ9oyleuOa-zFmc5eqW7vem0U0ghdrhVgK9ZT6Wc-ZD7HONMeD2GAEzj3KhWpKWJzFKcT3dm0Nbc9Lsyvp_pszLjTgYN8nRnUiBJyfw4lj4wxZ3bvX3uWX4PcugFK5yduOYPX2T_bluMqhP8p8GT5qv-WpceY8AIHh5K6DCf9jcBrfjC14CCjNPng6_0XNMGxNAc2vSCIupO-E9vgjkEAz_gAVgI05Cs5SnkJInT9ysf7p7FFOUw3ogu_8q68SVDm1dgRijwlYSz2L1yqOUTmHkkbOk6YdsDg3Nzd cMi-1ktmzotgyeAUKUri5c08ECJjZJaJ0mvAqP31enAgSzIK0IeJQDDrLL3-Wndp442DZLHAqAJUJya0nDbUQDQ1xTVy9Qw-5tr2pP1I8CmojNs7R0pS3heYN6PcMPdg6qq0huVzv528DaheIXgF7mLAV_99RHjEzypfkwoe0ntzajKORb-DJs5ReOlSTaTZmduOq6jvgBMfGRaDxYPi9zLWtRZgzUPOCqvIHUh711mVXuVD1aNqGVR7OtuVYRn6ikZo3BJc3zPfWsTRSE5BQZleXQEyjsJ_wLIkx74tc5oxjLTauQaLs5m8FeHwld7wfybINTkV6RYqQqhxdHywk0VGzSjWq5xyrT_-XkdUqNOF7C4SUCsqTtg2hq91zic8Mr6E85nss3vgnU1sIWkUkQwTNG9s0ZpTLnh9vzzrGxKUn9StL_MSjIC83xMTKVhObmsAjcQSesqI4A-EpdzFJSMWh45FrkCP1szsqphbHh50_Lt7AKvmtOom3G7lDRy_koNrIKkZfDB-E7vlhETcbPH8MKcKisgKAWgIDb39I9k7cpip0lFUbBlcLgSNkhpg3lHoNZEjIX8D8zpb_NwfgbKyKGqXQDxkYX80_lNEFgqtj2cdDXOA5vCu6gN_sHF7QWT0rElRdfAYq7eI_5gfHNoQPYe6cO-U2ARyxI-oSoUY8ev22irUb0jiIj0Xp4HD13nb7gJDr4snwQtWU5-YcaSUpEZRSicjbL1eZBnALn4rvD3bgBWnlBetkvPRr9tZRBEDNAhoAM-8-2dDobQa-vvJHppi6Yo6Yk7zNO1S2HU2RG2SQ6bcayOav_KU6JdOXnNay7h0wPZFKWHKxGojoRjqZoMATWebrVLomtypiI1NDZiZWaoc2hhcmRfaWTOAzGDbw.nLzkfZ8Jh9SArslEo6HH3P-hSAcg332U4SU1QHJolik";

async function fetchPeBypasser(targetUrl, timeoutMs = 25000) {
    try {
        console.log(`[PE Bypasser] Trying: ${targetUrl.slice(0, 60)}...`);
        const innerData = { url: targetUrl, token: PE_BYPASS_TOKEN };
        const base64Encoded = Buffer.from(JSON.stringify(innerData), 'utf-8').toString('base64');

        const res = await fetch('https://pebypasser.vercel.app/api/bypass', {
            method: 'POST',
            headers: {
                'authority': 'pebypasser.vercel.app',
                'accept': '*/*',
                'content-type': 'application/json',
                'origin': 'https://pebypasser.vercel.app',
                'referer': 'https://pebypasser.vercel.app/',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
            },
            body: JSON.stringify({ data: base64Encoded }),
            signal: AbortSignal.timeout(timeoutMs)
        });

        if (!res.ok) return { bypassedLink: null, error: null };
        const data = await res.json().catch(() => null);
        if (!data) return { bypassedLink: null, error: null };

        const rawKey = data.result || data.bypassed || data.key || data.url || data.link;
        if (rawKey && typeof rawKey === 'string') {
            const lower = rawKey.toLowerCase();
            if (lower.includes('session has expired') || lower.includes('get a new link') || lower.includes('expired')) {
                return { bypassedLink: null, error: 'Link expired.' };
            }
            console.log(`[PE Bypasser] Success!`);
            return { bypassedLink: rawKey, error: null };
        }
    } catch (err) {
        console.log(`[PE Bypasser] ${err.message}`);
    }
    return { bypassedLink: null, error: null };
}
const { Client, GatewayIntentBits, IntentsBitField, Partials, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, REST, Routes, ChannelSelectMenuBuilder, ChannelType, UserSelectMenuBuilder, RoleSelectMenuBuilder, PermissionFlagsBits, AttachmentBuilder, MessageFlags, ActivityType, Options } = require('discord.js');
const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas');
const axios = require('axios');
const FormData = require('form-data');
const { askAI } = require('./gemini.js');
const commands = require('./commands'); // كل أوامر السلاش (مجلد commands/)
const { TTLCache } = require('./utils/ttlCache.js'); // كاش ينظّف نفسه (يمنع تضخم الذاكرة)
const { startUploadsCleaner } = require('./utils/uploadsCleaner.js'); // يمنع امتلاء القرص
const { buildModHelpPayload, buildTimeoutPayload, buildExemptedPayload } = require('./utils/modPanels.js'); // رسائل الإشراف (Components V2)

const bypassKeysCache = new Map();

// ==========================================
//    CONFIGURATION & API KEYS (EDIT HERE)
// ==========================================
let BACON_API_KEY = 'BaconAccess-8cf41d6deebd10b2226cf5b498486de5'; // مفتاح تجاوز باكون
let GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""; // مفتاح الذكاء الاصطناعي
let globalVideoUrl = "https://example.com/video.mp4"; // رابط الفيديو الافتراضي
// ==========================================

let messagesSentCount = 0;

// Manual Scripts Management
const MANUAL_SCRIPTS_PATH = path.join(__dirname, 'manual_scripts.json');
function getManualScripts() {
    try {
        if (!fs.existsSync(MANUAL_SCRIPTS_PATH)) fs.writeFileSync(MANUAL_SCRIPTS_PATH, '[]');
        return JSON.parse(fs.readFileSync(MANUAL_SCRIPTS_PATH, 'utf-8'));
    } catch (e) {
        console.error('[Manual Scripts Error]:', e);
        return [];
    }
}
function saveManualScripts(scripts) {
    try {
        fs.writeFileSync(MANUAL_SCRIPTS_PATH, JSON.stringify(scripts, null, 4));
    } catch (e) {
        console.error('[Save Manual Scripts Error]:', e);
    }
}

// Register Canvas Fonts
try {
    const fontsDir = path.join(__dirname, 'assets', 'fonts');
    if (fs.existsSync(fontsDir)) {
        if (fs.existsSync(path.join(fontsDir, 'Cairo.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Cairo.ttf'), 'Cairo');
        if (fs.existsSync(path.join(fontsDir, 'Tajawal.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Tajawal.ttf'), 'Tajawal');
        if (fs.existsSync(path.join(fontsDir, 'Almarai.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Almarai.ttf'), 'Almarai');
        if (fs.existsSync(path.join(fontsDir, 'Amiri.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Amiri.ttf'), 'Amiri');
        if (fs.existsSync(path.join(fontsDir, 'Changa.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Changa.ttf'), 'Changa');
        if (fs.existsSync(path.join(fontsDir, 'ReadexPro.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'ReadexPro.ttf'), 'Readex Pro');
        if (fs.existsSync(path.join(fontsDir, 'Poppins.ttf'))) GlobalFonts.registerFromPath(path.join(fontsDir, 'Poppins.ttf'), 'Poppins');
    }
} catch (fontErr) {
    console.error('[Canvas Font Register Error]:', fontErr);
}

// Components V2 Builders
class TextDisplayBuilder {
    constructor() {
        this.data = { type: 10, content: '' };
    }
    setContent(content) {
        this.data.content = content;
        return this;
    }
    toJSON() { return this.data; }
}

class SeparatorBuilder {
    constructor() {
        this.data = { type: 14, divider: true };
    }
    setDivider(divider) {
        this.data.divider = divider;
        return this;
    }
    toJSON() { return this.data; }
}

class MediaGalleryItemBuilder {
    constructor() {
        this.data = { media: { url: '' } };
    }
    setURL(url) {
        this.data.media = { url };
        return this;
    }
    toJSON() { return this.data; }
}

class MediaGalleryBuilder {
    constructor() {
        this.data = { type: 12, items: [] };
    }
    addItems(...callbacks) {
        for (const callback of callbacks) {
            if (typeof callback === 'function') {
                const builder = new MediaGalleryItemBuilder();
                callback(builder);
                this.data.items.push(builder.toJSON());
            } else if (typeof callback === 'string') {
                this.data.items.push({ media: { url: callback } });
            } else if (callback && callback.media) {
                this.data.items.push(callback);
            }
        }
        return this;
    }
    addMedia(url) {
        if (url) {
            const mediaUrl = typeof url === 'string' ? url : (url.url || '');
            if (mediaUrl) this.data.items.push({ media: { url: mediaUrl } });
        }
        return this;
    }
    toJSON() { return this.data; }
}

class SectionBuilder {
    constructor() {
        this.data = { type: 9, components: [], accessory: null };
    }
    addTextDisplayComponents(...callbacks) {
        for (const callback of callbacks) {
            const builder = new TextDisplayBuilder();
            callback(builder);
            this.data.components.push(builder.toJSON());
        }
        return this;
    }
    setButtonAccessory(callback) {
        const builder = new ButtonBuilder();
        callback(builder);
        this.data.accessory = typeof builder.toJSON === 'function' ? builder.toJSON() : builder;
        return this;
    }
    toJSON() {
        const json = { ...this.data };
        if (!json.accessory) delete json.accessory;
        return json;
    }
}

class ContainerBuilder {
    constructor() {
        this.data = {
            type: 17,
            accent_color: null,
            components: []
        };
    }
    setAccentColor(color) {
        if (typeof color === 'string') {
            this.data.accent_color = parseInt(color.replace('#', ''), 16);
        } else {
            this.data.accent_color = color;
        }
        return this;
    }
    addTextDisplayComponents(...callbacks) {
        for (const callback of callbacks) {
            const builder = new TextDisplayBuilder();
            callback(builder);
            this.data.components.push(builder.toJSON());
        }
        return this;
    }
    addMediaGalleryComponents(...callbacks) {
        for (const callback of callbacks) {
            const builder = new MediaGalleryBuilder();
            callback(builder);
            this.data.components.push(builder.toJSON());
        }
        return this;
    }
    addSeparatorComponents(...callbacks) {
        for (const callback of callbacks) {
            const builder = new SeparatorBuilder();
            callback(builder);
            this.data.components.push(builder.toJSON());
        }
        return this;
    }
    addSectionComponents(...callbacks) {
        for (const callback of callbacks) {
            const builder = new SectionBuilder();
            callback(builder);
            this.data.components.push(builder.toJSON());
        }
        return this;
    }
    addActionRowComponents(...callbacks) {
        for (const callback of callbacks) {
            if (typeof callback === 'function') {
                const builder = new ActionRowBuilder();
                callback(builder);
                this.data.components.push(builder.toJSON());
            } else if (callback && typeof callback.toJSON === 'function') {
                this.data.components.push(callback.toJSON());
            } else if (callback && typeof callback === 'object') {
                this.data.components.push(callback);
            }
        }
        return this;
    }
    toJSON() {
        return this.data;
    }
}

function buildKeyBypassContainer(bypassedLink, timeTaken, lang = 'ar') {
    const keyId = crypto.randomBytes(6).toString('hex');
    bypassKeysCache.set(keyId, bypassedLink);
    if (bypassKeysCache.size > 2000) {
        const firstKey = bypassKeysCache.keys().next().value;
        bypassKeysCache.delete(firstKey);
    }

    // Precise padding to fill the embed without overflowing or truncating with (...)
    const pad = '\u2800'.repeat(8);
    const copyLabel = lang === 'en' ? `${pad} Copy Key ${pad}` : (lang === 'es' ? `${pad} Copiar Clave ${pad}` : `${pad} نسخ المفتاح ${pad}`);
    const inviteLabel = lang === 'en' ? 'Invite' : (lang === 'es' ? 'Invitar' : 'دعوة');
    const supportLabel = lang === 'en' ? 'Support' : (lang === 'es' ? 'Soporte' : 'الدعم');
    const timeLabel = lang === 'en' ? `-${timeTaken}s` : (lang === 'es' ? `-${timeTaken}s` : `-${timeTaken} ث`);

    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel(inviteLabel)
            .setEmoji('1549481047094337727')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/oauth2/authorize?client_id=1405179057628254259'),
        new ButtonBuilder()
            .setCustomId('supported_sites_btn')
            .setLabel(timeLabel)
            .setEmoji('1525620369879339168')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setLabel(supportLabel)
            .setEmoji('1549491410162683994')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/hBvzFrqQP2')
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`copy_bypass_${keyId}`)
            .setLabel(copyLabel)
            .setEmoji('1549492321362649178')
            .setStyle(ButtonStyle.Secondary)
    );

    const hintText = lang === 'en' 
        ? '-# Click the button below to copy the key' 
        : (lang === 'es' ? '-# Haz clic en el botón de abajo para copiar la clave' : '-# اضغط على الزر بالاسفل لنسخ المفتاح');

    const container = new ContainerBuilder()
        .setAccentColor(0x38bdf8) // Light Blue
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
                `\`${bypassedLink}\`\n` +
                `-#  ~~                                                                                                                                                                   ~~\n` +
                hintText
            )
        )
        .addSeparatorComponents(() => {})
        .addActionRowComponents(row1, row2);

    return { container, row1, row2, keyId };
}

function buildLoginErrorContainer(lang = 'ar') {
    const supportLabel = lang === 'en' ? 'Support Server' : (lang === 'es' ? 'Servidor de soporte' : 'الدعم الفني');
    const transLabel = lang === 'en' ? 'Translation' : (lang === 'es' ? 'Traducción' : 'الترجمة');

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel(supportLabel)
            .setEmoji('1517590248501022791')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/hBvzFrqQP2'),
        new ButtonBuilder()
            .setCustomId('error_translation_btn')
            .setLabel(transLabel)
            .setEmoji('1545522949975441498')
            .setStyle(ButtonStyle.Secondary)
    );

    let title = 'Need to login';
    let description = '';

    if (lang === 'en') {
        title = 'Need to login';
        description = 
`Method 1 (Main):
 * Copy the key link and open it in Google.
 * Wait 5 seconds, then tap Continue.
 * Sign in with Google.
 * Go back to the bot and use the same key link again.
Method 2 (If Bypass Fails):
 * Repeat the same steps. After signing in, you will be redirected to the tasks site.
 * Tap the 3 dots (top-left) and select Copy Link.
 * Go back to the bot and use the newly copied link.`;
    } else if (lang === 'es') {
        title = 'Inicio de sesión requerido';
        description = 
`Método 1 (Principal):
 * Copia el enlace de la clave y ábrelo en Google.
 * Espera 5 segundos y toca Continuar.
 * Inicia sesión con tu cuenta de Google.
 * Vuelve al bot y usa el mismo enlace nuevamente.
Método 2 (Si falla el bypass):
 * Repite los mismos pasos. Tras iniciar sesión, serás redirigido al sitio de tareas.
 * Toca los 3 puntos (arriba a la izquierda) y copia el enlace.
 * Vuelve al bot y usa el nuevo enlace copiado.`;
    } else {
        title = 'تحتاج تسجيل دخول';
        description = 
`الطريقة الأولى (الأساسية):
 * انسخ رابط المفتاح وافتحه في قوقل.
 * انتظر 5 ثواني ثم اضغط على متابعة (Continue).
 * قم بتسجيل الدخول بحساب قوقل الخاص بك.
 * ارجع للبوت واستخدم نفس رابط المفتاح مجدداً.
الطريقة الثانية (في حال عدم عمل التخطي):
 * كرر نفس الخطوات، بعد تسجيل الدخول سيتم نقلك لموقع المهام.
 * اضغط على الثلاث نقاط بالأعلى على اليسار ثم انسخ الرابط.
 * ارجع للبوت واستخدم الرابط الجديد الذي نسخته.`;
    }

    const container = new ContainerBuilder()
        .setAccentColor(0xff4d4d) // Red
        .addTextDisplayComponents((textDisplay) =>
            textDisplay.setContent(
                `### <:No:1516534087161221233> ${title}\n` +
                description
            )
        )
        .addActionRowComponents(row);

    return { container, row, description };
}

async function logBotAction({ guildId, title, description, fields = [], user = 'الداشبورد / المسؤول', color = 0x8b5cf6, icon = '📜' }) {
    const timestamp = new Date();
    const userString = typeof user === 'string' ? user : (user.tag || user.username || user.id || 'الداشبورد');

    // 1. Console Output
    console.log(`[BOT LOG ${timestamp.toLocaleTimeString('ar-SA')}] ${icon} [${title}] Guild: ${guildId || 'Global'} | User: ${userString} | ${description}`);

    // 2. Local DB Sync
    try {
        const db = getDB();
        const gKey = String(guildId || 'global');
        if (!db[gKey]) db[gKey] = {};
        if (!db[gKey].violations) db[gKey].violations = [];
        db[gKey].violations.unshift({
            action_title: title,
            description: description,
            user_info: userString,
            created_at: timestamp.toISOString()
        });
        if (db[gKey].violations.length > 50) db[gKey].violations.pop();
        saveDB(db);
    } catch (e) {
        // Fallback silently
    }

    // 3. Discord Log Channel Embed Posting
    if (client && client.isReady() && guildId && guildId !== 'global') {
        try {
            const guild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId).catch(() => null);
            if (guild) {
                const db = getDB();
                const gData = db[guildId] || {};

                // Find log channel ID from config
                let targetChannelId = gData.protection?.logChannel || gData.panels?.logChannel || gData.deltaKeys?.channelId;
                let targetChannel = null;

                if (targetChannelId) {
                    targetChannel = guild.channels.cache.get(targetChannelId) || await guild.channels.fetch(targetChannelId).catch(() => null);
                }

                // Search for channel with log / لوق / سجلات / توثيق
                if (!targetChannel) {
                    targetChannel = guild.channels.cache.find(c =>
                        (c.type === 0 || c.type === 'GUILD_TEXT') &&
                        (c.name.includes('log') || c.name.includes('لوق') || c.name.includes('سجل') || c.name.includes('توثيق'))
                    );
                }

                if (!targetChannel && guild.systemChannel) {
                    targetChannel = guild.systemChannel;
                }

                if (targetChannel && targetChannel.isTextBased()) {
                    const embed = new EmbedBuilder()
                        .setTitle(`${icon} ${title}`)
                        .setDescription(description)
                        .setColor(color)
                        .addFields(
                            { name: '👤 المنفذ / المصدر', value: `\`${userString}\``, inline: true },
                            { name: '🕒 التوقيت', value: `<t:${Math.floor(timestamp.getTime() / 1000)}:f> (<t:${Math.floor(timestamp.getTime() / 1000)}:R>)`, inline: true }
                        )
                        .setFooter({ text: `نظام توثيق سجلات البوت • ${guild.name}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp();

                    if (fields && Array.isArray(fields) && fields.length > 0) {
                        fields.forEach(f => {
                            if (f.name && f.value) embed.addFields({ name: f.name, value: String(f.value).slice(0, 1024), inline: f.inline !== false });
                        });
                    }

                    await targetChannel.send({ embeds: [embed] }).catch(() => {});
                }
            }
        } catch (err) {
            console.error("Error sending log embed to Discord:", err.message);
        }
    }
}
global.logBotAction = logBotAction;

const playSearchCache = new TTLCache({ ttlMs: 30 * 60 * 1000, max: 200 });

function cleanBotToken(token) {
    if (!token || typeof token !== 'string') return '';
    return token
        .replace(/[\u200B-\u200D\uFEFF\r\n\t\s]+/g, '')
        .replace(/^Bot\s+/i, '')
        .replace(/^['"`]|['"`]$/g, '')
        .trim();
}

function getCleanBotToken() {
    let rawToken = '';
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.BOT_TOKEN && typeof config.BOT_TOKEN === 'string' && config.BOT_TOKEN.trim().length > 20 && !config.BOT_TOKEN.includes('ضع_توكن')) {
                rawToken = config.BOT_TOKEN;
            }
        }
    } catch (e) {}

    if (!rawToken && process.env.BOT_TOKEN) {
        rawToken = process.env.BOT_TOKEN;
    }

    return cleanBotToken(rawToken);
}

let BOT_TOKEN = getCleanBotToken();
let BOT_SECRET = process.env.BOT_SECRET;
if (!BOT_SECRET) {
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            BOT_SECRET = config.BOT_SECRET;
        }
    } catch (err) {
        console.error("Error reading BOT_SECRET from config.json:", err);
    }
}
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

let client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    makeCache: Options.cacheWithLimits({
        MessageManager: 10,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        StageInstanceManager: 0,
        ThreadManager: 0,
        VoiceStateManager: 0,
        GuildScheduledEventManager: 0,
        GuildMemberManager: 15,
        UserManager: 15,
        GuildEmojiManager: 0,
        BaseGuildEmojiManager: 0,
        GuildStickerManager: 0,
        AutoModerationRuleManager: 0,
        ApplicationCommandManager: 0,
        GuildInviteManager: 0,
        GuildBanManager: 0
    }),
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 60,
            lifetime: 60
        },
        users: {
            interval: 120,
            filter: () => user => !user.bot
        },
        guildMembers: {
            interval: 120,
            filter: () => member => !member.user?.bot
        }
    }
});

global.discordClient = client;

const { MongoClient } = require('mongodb');

const dbPath = './db.json';
if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}));

let dbCache = null;
function loadDBSync() {
    try {
        if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf8');
            dbCache = JSON.parse(data);
        } else {
            dbCache = {};
        }
    } catch (e) {
        console.error('[loadDBSync Error]:', e);
        dbCache = dbCache || {};
    }
}
loadDBSync();

// تنظيف مجلد uploads دورياً (لا يحذف أي صورة مذكورة في قاعدة البيانات)
startUploadsCleaner({
    dir: path.join(__dirname, 'uploads'),
    maxAgeHours: 48,
    maxTotalMB: 300,
    getReferenceText: async () => JSON.stringify(dbCache || {})
});

const mongoUri = process.env.MONGODB_URI;
let mongoClient = null;
let mongoDb = null;
let mongoCol = null;

// Performance & Memory optimization: Track changed keys so we only sync what actually changed!
const dirtyMongoKeys = new Set();
const lastSavedState = new Map();
let isMongoWriting = false;

async function initMongoDB() {
    try {
        console.log("🔌 Connecting to MongoDB Atlas...");
        mongoClient = new MongoClient(mongoUri, {
            maxPoolSize: 2, // Minimal connection pool to prevent socket & RAM exhaustion
            minPoolSize: 1,
            maxIdleTimeMS: 30000,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 15000,
            serverSelectionTimeoutMS: 5000
        });
        await mongoClient.connect();
        mongoDb = mongoClient.db("ntl_bot");
        mongoCol = mongoDb.collection("settings");
        console.log("✅ Successfully connected to MongoDB Atlas!");

        // Load complete DB from MongoDB to memory
        const docs = await mongoCol.find({}).toArray();
        if (docs.length > 0) {
            console.log(`📥 Loaded ${docs.length} documents from MongoDB settings collection.`);
            const mongoData = {};
            for (const doc of docs) {
                mongoData[doc._id] = doc.data;
                lastSavedState.set(doc._id, JSON.stringify(doc.data));
            }
            // Merge MongoDB data into dbCache (MongoDB takes precedence)
            dbCache = { ...dbCache, ...mongoData };
            // Write back to local file as an offline cache
            try {
                fs.writeFileSync(dbPath, JSON.stringify(dbCache), 'utf8');
            } catch (e) {}
            console.log("✅ Synced local cache with MongoDB data.");
        } else {
            console.log("ℹ️ MongoDB settings collection is empty. Seeding with local db.json data...");
            await syncLocalToMongo();
        }
    } catch (err) {
        console.log("ℹ️ [Database]: تم تهيئة نظام التخزين المحلي الآمن بنجاح (db.json Cache Mode).");
    }
}

async function syncLocalToMongo() {
    if (!mongoCol) return;
    try {
        const keys = Object.keys(dbCache || {});
        // Chunk into small batches of 25 to avoid socket timeout & massive memory usage
        for (let i = 0; i < keys.length; i += 25) {
            const batchKeys = keys.slice(i, i + 25);
            const ops = batchKeys.map(key => ({
                replaceOne: {
                    filter: { _id: key },
                    replacement: { _id: key, data: dbCache[key] },
                    upsert: true
                }
            }));
            await mongoCol.bulkWrite(ops, { ordered: false });
            for (const key of batchKeys) {
                lastSavedState.set(key, JSON.stringify(dbCache[key]));
            }
        }
        console.log(`📤 Seeded ${keys.length} documents into MongoDB successfully.`);
    } catch (err) {
        console.error("❌ Failed to seed MongoDB:", err.message || err);
    }
}

initMongoDB().then(() => {
    updateTicketChannelsCache();
}).catch(err => console.error("Error in initMongoDB call:", err));

function getDB() {
    if (!dbCache) loadDBSync();
    return dbCache;
}
const db = getDB();

const activeTicketChannels = new Set();
function updateTicketChannelsCache() {
    activeTicketChannels.clear();
    const currentDb = getDB();
    for (const gId in currentDb) {
        if (currentDb[gId]?.tickets) {
            for (const chId in currentDb[gId].tickets) {
                activeTicketChannels.add(chId);
            }
        }
    }
}
updateTicketChannelsCache();

// Flush dirty keys to MongoDB in small, safe, fast batches
async function flushMongoDirtyKeys() {
    if (!mongoCol || isMongoWriting || dirtyMongoKeys.size === 0) return;
    isMongoWriting = true;

    // Take up to 20 keys at a time
    const keysToSave = Array.from(dirtyMongoKeys).slice(0, 20);
    for (const k of keysToSave) {
        dirtyMongoKeys.delete(k);
    }

    try {
        const ops = keysToSave.map(k => ({
            replaceOne: {
                filter: { _id: k },
                replacement: { _id: k, data: dbCache[k] },
                upsert: true
            }
        }));

        if (ops.length > 0) {
            await mongoCol.bulkWrite(ops, { ordered: false });
        }
    } catch (err) {
        // Re-add on failure so they get retried
        for (const k of keysToSave) {
            dirtyMongoKeys.add(k);
        }
    } finally {
        isMongoWriting = false;
        if (dirtyMongoKeys.size > 0) {
            setTimeout(flushMongoDirtyKeys, 1500);
        }
    }
}

let saveTimeout = null;
let isDiskWriting = false;

function saveDB(data, changedKey = null) {
    if (data) dbCache = data;
    updateTicketChannelsCache();

    if (changedKey) {
        dirtyMongoKeys.add(changedKey);
        lastSavedState.set(changedKey, JSON.stringify(dbCache[changedKey]));
    } else if (dbCache) {
        // Identify which specific key changed rather than rewriting all 440 keys
        for (const key of Object.keys(dbCache)) {
            if (!key) continue;
            const str = JSON.stringify(dbCache[key]);
            if (lastSavedState.get(key) !== str) {
                dirtyMongoKeys.add(key);
                lastSavedState.set(key, str);
            }
        }
    }

    if (saveTimeout) return;
    saveTimeout = setTimeout(() => {
        saveTimeout = null;
        try {
            // Write to local disk cache only if not currently writing
            if (!isDiskWriting) {
                isDiskWriting = true;
                fs.writeFile(dbPath, JSON.stringify(dbCache), (err) => {
                    isDiskWriting = false;
                    if (err) console.error('[saveDB Write Error]:', err.message);
                });
            }

            // Flush changed keys to MongoDB
            flushMongoDirtyKeys();
        } catch (e) {
            isDiskWriting = false;
            console.error('[saveDB Exception]:', e.message);
        }
    }, 2500);
}

global.getDB = getDB;
global.saveDB = saveDB;

function isGuildPremium(guildId) {
    if (!guildId) return false;
    const database = getDB();
    if (!database[guildId]) return false;
    const premium = database[guildId].premium;
    if (!premium || !premium.expiresAt) return false;
    if (premium.expiresAt === 'lifetime') return true;
    return typeof premium.expiresAt === 'number' && Date.now() < premium.expiresAt;
}

function isUserBlacklisted(userId) {
    const db = getDB();
    if (!db.blacklist) db.blacklist = [];
    return db.blacklist.includes(userId);
}

function obfuscateLua(code) {
    // Basic robust Lua Obfuscator
    // We escape strings and wrap them in a loader
    try {
        const header = `-- (deobfuscators by NTL BOT,  discord: https://discord.gg/tXvgdvfZeN)\n`;
        
        // 1. Simple variable renaming and string hexing
        // This is a basic version. For a full-zip based one, we would require the external tool.
        const hex = Buffer.from(code).toString('hex').match(/.{1,2}/g).map(h => '\\' + parseInt(h, 16)).join('');
        const obf = `${header}local _ = "${hex}"; (loadstring or load)(_)();`;
        return obf;
    } catch (e) {
        return `-- Error during obfuscation: ${e.message}\n${code}`;
    }
}


// ==================== LIRA CURRENCY SYSTEM ====================
const activeLiraTransfers = new Set();

function getUserLira(userId) {
    const db = getDB();
    if (!db.lira) db.lira = {};
    return db.lira[userId] !== undefined ? db.lira[userId] : 0;
}

function setUserLira(userId, amount) {
    const db = getDB();
    if (!db.lira) db.lira = {};
    db.lira[userId] = Math.max(0, Math.floor(amount));
    saveDB(db);
}

function generateCaptchaImage(codeText) {
    const width = 320;
    const height = 110;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Dark distorted background
    const bgHue = Math.floor(Math.random() * 360);
    ctx.fillStyle = `hsl(${bgHue}, 25%, 15%)`;
    ctx.fillRect(0, 0, width, height);

    // Random background noise lines
    for (let i = 0; i < 25; i++) {
        ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.45)`;
        ctx.lineWidth = Math.floor(Math.random() * 3) + 1;
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }

    // Random background dots
    for (let i = 0; i < 60; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw captcha code characters
    const charCount = codeText.length;
    const spacing = width / (charCount + 1);

    for (let i = 0; i < charCount; i++) {
        ctx.save();
        const char = codeText[i];

        const x = spacing * (i + 1) + (Math.random() * 10 - 5);
        const y = height / 2 + (Math.random() * 14 - 7);
        const angle = (Math.random() * 0.6 - 0.3);

        ctx.translate(x, y);
        ctx.rotate(angle);

        const r = Math.floor(200 + Math.random() * 55);
        const g = Math.floor(200 + Math.random() * 55);
        const b = Math.floor(200 + Math.random() * 55);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        const fontSize = Math.floor(38 + Math.random() * 8);
        ctx.font = `bold ${fontSize}px Cairo, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(char, 0, 0);
        ctx.restore();
    }

    // Distorting foreground lines (ProBot style)
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.75)`;
        ctx.lineWidth = Math.floor(Math.random() * 3) + 2;
        ctx.beginPath();
        ctx.moveTo(0, Math.random() * height);
        ctx.bezierCurveTo(
            Math.random() * width, Math.random() * height,
            Math.random() * width, Math.random() * height,
            width, Math.random() * height
        );
        ctx.stroke();
    }

    return canvas.toBuffer('image/png');
}

async function handleLiraCommand({ sender, channel, targetUser, amount, isInteraction, interaction }) {
    // 1. If no target user or no amount specified -> Show balance
    if (!targetUser || !amount) {
        const checkUser = targetUser || sender;
        const balance = getUserLira(checkUser.id);
        const replyText = checkUser.id === sender.id
            ? `<:Lira:1536827269396308118> **رصيدك \`$${balance}\` ليرة. ايدك على جيبتك!**`
            : `<:Lira:1536827269396308118> **رصيد <@${checkUser.id}> \`$${balance}\` ليرة.**`;

        const supportRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji('1536827269396308118')
                .setLabel('اكسب الليرات عبر الدخول للسيرفر!')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/hBvzFrqQP2')
        );

        if (isInteraction) {
            return interaction.reply({ content: replyText, components: [supportRow] }).catch(() => {});
        } else {
            return channel.send({ content: replyText, components: [supportRow] }).catch(() => {});
        }
    }

    // 2. Validate transfer parameters
    if (targetUser.id === sender.id) {
        const msg = '❌ **لا يمكنك تحويل الليرات لنفسك!**';
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    if (targetUser.bot) {
        const msg = '❌ **لا يمكنك تحويل الليرات للبوتات!**';
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    if (isNaN(amount) || amount <= 0) {
        const msg = '❌ **يرجى كتابة عدد صحيح أكبر من صفر للتحويل!**';
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    const senderBalance = getUserLira(sender.id);
    if (senderBalance < amount) {
        const msg = `❌ **ليس لديك رصيد كافٍ لإجراء هذا التحويل! رصيدك الحالي: \`$${senderBalance}\` ليرة.**`;
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    if (activeLiraTransfers.has(sender.id)) {
        const msg = '⚠️ **لديك عملية تحويل قائمة بالفعل، يرجى إكمالها أو الانتظار حتى تنتهي!**';
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    // 3. Calculate tax and net amount
    const tax = Math.ceil(amount * 0.05);
    const netReceived = amount - tax;

    if (netReceived <= 0) {
        const msg = '❌ **المبلغ المراد تحويله صغير جداً بعد خصم الضريبة!**';
        if (isInteraction) return interaction.reply({ content: msg, ephemeral: true }).catch(() => {});
        return channel.send({ content: msg }).catch(() => {});
    }

    // 4. Generate random captcha numbers (4 to 5 digits)
    const captchaCode = Math.floor(10000 + Math.random() * 90000).toString();
    const captchaBuffer = generateCaptchaImage(captchaCode);
    const attachment = new AttachmentBuilder(captchaBuffer, { name: 'captcha.png' });

    const confirmContent = `<:Lira:1536827269396308118> **تأكيد التحويل: الضريبة: \`$${tax}\` ذهب. المجموع المرسل: \`$${netReceived}\` ذهب. اكتب هذه الأرقام لإجراء النقل.**`;

    activeLiraTransfers.add(sender.id);

    let confirmMsg;
    try {
        if (isInteraction) {
            await interaction.reply({ content: confirmContent, files: [attachment] });
            confirmMsg = await interaction.fetchReply();
        } else {
            confirmMsg = await channel.send({ content: confirmContent, files: [attachment] });
        }
    } catch (err) {
        activeLiraTransfers.delete(sender.id);
        console.error('[Lira Send Error]:', err);
        return;
    }

    // 5. Create message collector for CAPTCHA (30 seconds)
    const filter = m => m.author.id === sender.id;
    const collector = channel.createMessageCollector({ filter, time: 30000 });

    let completed = false;

    collector.on('collect', async (m) => {
        const text = m.content.trim().replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));

        if (text === captchaCode) {
            completed = true;
            collector.stop('success');

            m.delete().catch(() => {});

            const currentSenderBalance = getUserLira(sender.id);
            if (currentSenderBalance < amount) {
                activeLiraTransfers.delete(sender.id);
                return confirmMsg.edit({
                    content: `❌ **تم إلغاء التحويل لعدم كفاية الرصيد!**`,
                    files: []
                }).catch(() => {});
            }

            setUserLira(sender.id, currentSenderBalance - amount);
            setUserLira(targetUser.id, getUserLira(targetUser.id) + netReceived);

            activeLiraTransfers.delete(sender.id);

            const successContent = `<:Yea:1516534090751279257> **${sender.displayName || sender.username}** قد حولت \`$${netReceived}\` ليرة إلى **<@${targetUser.id}>**.`;

            try {
                await confirmMsg.edit({
                    content: successContent,
                    files: []
                });
            } catch (editErr) {
                channel.send({ content: successContent }).catch(() => {});
            }
        } else if (/^\d+$/.test(text)) {
            completed = false;
            collector.stop('wrong_code');
            m.delete().catch(() => {});
        }
    });

    collector.on('end', async (collected, reason) => {
        activeLiraTransfers.delete(sender.id);
        if (!completed) {
            let reasonText = 'انتهت المهلة أو تم كتابة أرقام خاطئة';
            if (reason === 'wrong_code') reasonText = 'تم كتابة أرقام خاطئة';
            try {
                await confirmMsg.edit({
                    content: `❌ **تم إلغاء عملية التحويل (${reasonText}).**`,
                    files: []
                }).catch(() => {});
            } catch (e) {}
        }
    });
}

// HTTP server inside index.js to serve static avatar images and handle secure updates
const http = require('http');
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const PORT = process.env.PORT || 8080;
const server = http.createServer(async (req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Bot-Secret, Authorization');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith('/uploads/')) {
        const decodedUrl = decodeURIComponent(req.url);
        const safePath = path.normalize(decodedUrl).replace(/^(\.\.[\/\\])+/, '');
        const filePath = path.join(process.cwd(), safePath);
        
        // Ensure it stays inside uploads directory
        if (!filePath.startsWith(uploadsDir)) {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('Forbidden');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'image/png');
                res.end(data);
            }
        });
        return;
    }

    // Helper for JSON response
    const sendJson = (statusCode, data) => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
    };

    // Parse body helper
    const getBody = () => new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); } catch(e) { resolve({}); }
        });
    });

    // 1. GET /api/guilds OR /api/bot-guilds
    if (pathname === '/api/guilds' || pathname === '/api/bot-guilds') {
        const activeGuilds = [];
        if (client && client.guilds && client.guilds.cache) {
            client.guilds.cache.forEach(bg => {
                activeGuilds.push({
                    id: String(bg.id),
                    name: bg.name,
                    icon: bg.iconURL({ extension: 'png' }) || `https://cdn.discordapp.com/icons/${bg.id}/${bg.icon}.png`,
                    memberCount: bg.memberCount || 0,
                    hasBot: true
                });
            });
        }
        return sendJson(200, { success: true, guilds: activeGuilds, activeGuilds, allAdminGuilds: activeGuilds });
    }

    // 2. GET /api/guild-settings/:guildId or via query ?guildId=
    if (pathname.startsWith('/api/guild-settings')) {
        const parts = pathname.split('/');
        let guildId = parts[3] || parsedUrl.searchParams.get('guildId');
        if (!guildId) return sendJson(400, { success: false, error: 'Missing guildId' });

        let guildObj = null;
        let textChannels = [];
        let categoryChannels = [];
        let guildRoles = [];

        if (client && client.guilds) {
            guildObj = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId).catch(() => null);
            if (guildObj) {
                try {
                    await guildObj.channels.fetch().catch(() => null);
                    await guildObj.roles.fetch().catch(() => null);
                    await guildObj.emojis.fetch().catch(() => null);
                } catch (e) {}

                guildObj.channels.cache.forEach(c => {
                    if (c.type === 0 || c.type === 5 || c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS') {
                        textChannels.push({ id: String(c.id), name: c.name });
                    } else if (c.type === 4 || c.type === 'GUILD_CATEGORY') {
                        categoryChannels.push({ id: String(c.id), name: c.name });
                    }
                });

                guildObj.roles.cache.forEach(r => {
                    if (r.name !== '@everyone' && !r.managed) {
                        guildRoles.push({ id: String(r.id), name: r.name, color: r.hexColor, position: r.position });
                    }
                });
                guildRoles.sort((a, b) => (b.position || 0) - (a.position || 0));
            }
        }

        const db = getDB();
        const localData = db[guildId] || {};

        const guildEmojis = (guildObj && guildObj.emojis && guildObj.emojis.cache)
            ? guildObj.emojis.cache.map(e => ({ id: String(e.id), name: e.name, animated: !!e.animated, url: e.url }))
            : [];

        return sendJson(200, {
            success: true,
            hasBot: !!guildObj,
            stats: {
                memberCount: guildObj ? guildObj.memberCount : 14,
                channelsCount: textChannels.length,
                categoriesCount: categoryChannels.length,
                rolesCount: guildRoles.length
            },
            channels: textChannels,
            categories: categoryChannels,
            roles: guildRoles,
            emojis: guildEmojis,
            settings: {
                panels: localData.panels || {},
                tickets: localData.tickets || {},
                suggestions: localData.suggestions || {},
                azkar: localData.azkar || {},
                moderation: localData.moderation || null,
                protection: localData.protection || {
                    antiBot: true,
                    antiChannelRaid: true,
                    antiSpam: true,
                    antiLinks: true,
                    botPunishment: 'ban',
                    channelPunishment: 'kick',
                    spamPunishment: 'timeout',
                    linkPunishment: 'timeout'
                },
                customEmbeds: localData.customEmbeds || {},
                autoResponses: localData.autoResponses || [],
                scriptSystem: localData.scriptSystem || {},
                ai: localData.ai || {},
                welcome: localData.welcome || {
                    enabled: false,
                    channelId: '',
                    displayMode: 'text_image',
                    messageText: 'مرحباً بك يا (Mentionuser) في سيرفر (Server)! نورتنا وأنت العضو رقم (Guildmember) 🎉',
                    templateId: 'template_1',
                    backgroundType: 'template',
                    customBackgroundUrl: '',
                    avatarX: 512,
                    avatarY: 150,
                    avatarRadius: 95,
                    avatarBorderColor: '#3b82f6',
                    avatarBorderWidth: 4,
                    text1: 'WELCOME TO (Server)',
                    text1Font: 'Cairo',
                    text1Size: 34,
                    text1Color: '#ffffff',
                    text1X: 512,
                    text1Y: 300,
                    text1Align: 'center',
                    text2: '(user)',
                    text2Font: 'Cairo',
                    text2Size: 44,
                    text2Color: '#60a5fa',
                    text2X: 512,
                    text2Y: 365,
                    text2Align: 'center',
                    text3: 'Member #(Guildmember)',
                    text3Font: 'Tajawal',
                    text3Size: 22,
                    text3Color: '#94a3b8',
                    text3X: 512,
                    text3Y: 420,
                    text3Align: 'center',
                    isV2: false,
                    embedTitle: '🎉 مرحباً بك في السيرفر!',
                    embedDesc: 'أهلاً وسهلاً بك (Mentionuser) في **(Server)**\nنتمنى لك قضاء وقت ممتع معنا!\nأنت العضو رقم **#(Guildmember)** في مجتمعنا.',
                    embedColor: '#5865F2',
                    embedFooter: 'نتمنى لك وقتاً ممتعاً!',
                    embedThumbnail: 'none'
                },
                musicEnabled: localData.musicEnabled || false,
                deltaKeys: localData.deltaKeys || {}
            },
            channels: textChannels,
            categories: categoryChannels,
            roles: guildRoles,
            emojis: guildEmojis
        });
    }

    // 3. POST /api/save-guild-settings/:guildId or /update-settings
    if ((pathname.startsWith('/api/save-guild-settings') || pathname === '/update-settings') && req.method === 'POST') {
        const payload = await getBody();
        const parts = pathname.split('/');
        const guildId = payload.guildId || parts[3] || parsedUrl.searchParams.get('guildId');

        if (!guildId) return sendJson(400, { success: false, error: 'Missing guildId' });

        const { panels, tickets, suggestions, azkar, moderation, protection, musicEnabled, deltaKeys, broadcastMessage, customEmbeds, autoResponses, scriptSystem, ai, welcome } = payload;
        const db = getDB();
        if (!db[guildId]) {
            db[guildId] = { panels: {}, tickets: {}, counter: 0 };
        }

        if (panels !== undefined) {
            db[guildId].panels = panels;
        } else if (tickets !== undefined && (!db[guildId].panels || Object.keys(db[guildId].panels).length === 0)) {
            db[guildId].panels = {
                'p1': {
                    id: 'p1',
                    title: tickets.title || "🎫 قسم الدعم الفني والتذاكر",
                    description: tickets.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.",
                    welcome: tickets.welcome || 'مرحباً بك في التذكرة! تفضل بكتابة استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.',
                    welcome_img: tickets.welcome_img || '',
                    color: tickets.color || '#5865f2',
                    channelId: tickets.channelId || '',
                    categoryId: tickets.categoryId || null,
                    roles: tickets.supportRole ? [tickets.supportRole] : (tickets.roles || []),
                    buttons: [
                        { name: tickets.btnLabel || 'فتح تذكرة', emoji: tickets.btnEmoji || '📩', categoryId: tickets.categoryId || null }
                    ]
                }
            };
        }
        if (tickets !== undefined) db[guildId].tickets = tickets;
        if (customEmbeds !== undefined) db[guildId].customEmbeds = customEmbeds;
        if (autoResponses !== undefined) db[guildId].autoResponses = autoResponses;
        if (scriptSystem !== undefined) db[guildId].scriptSystem = scriptSystem;
        if (ai !== undefined) db[guildId].ai = ai;
        if (welcome !== undefined) db[guildId].welcome = welcome;
        if (suggestions !== undefined) db[guildId].suggestions = suggestions;
        if (azkar !== undefined) db[guildId].azkar = azkar;
        if (protection !== undefined) {
            ensureGuildData(guildId);
            const prot = db[guildId].protection;
            if (protection.antiBot !== undefined) prot.bots.enabled = protection.antiBot;
            if (protection.antiChannelRaid !== undefined) prot.channels.enabled = protection.antiChannelRaid;
            if (protection.antiLinks !== undefined) prot.links.enabled = protection.antiLinks;
            if (protection.antiSpam !== undefined) prot.spam.enabled = protection.antiSpam;
            if (protection.botPunishment) prot.bots.punishment = protection.botPunishment;
            if (protection.channelPunishment) prot.channels.punishment = protection.channelPunishment;
            if (protection.linkPunishment) prot.links.punishment = protection.linkPunishment;
            if (protection.spamPunishment) prot.spam.punishment = protection.spamPunishment;
            if (protection.logChannel !== undefined) prot.logChannel = protection.logChannel;
            if (protection.permissions) prot.permissions = { ...prot.permissions, ...protection.permissions };
            if (protection.roles) prot.roles = { ...prot.roles, ...protection.roles };
        }
        if (musicEnabled !== undefined) db[guildId].musicEnabled = musicEnabled;
        if (deltaKeys !== undefined) db[guildId].deltaKeys = deltaKeys;
        if (moderation !== undefined) db[guildId].moderation = moderation;

        saveDB(db);

        // Instant Azkar reload in bot memory
        if (global.reloadAzkar) {
            try { global.reloadAzkar(guildId); } catch(e) {}
        }

        let deliveryLog = null;
        if (broadcastMessage && broadcastMessage.channelId && client && client.isReady && client.isReady()) {
            try {
                const chan = await client.channels.fetch(broadcastMessage.channelId).catch(() => null);
                if (chan) {
                    if (broadcastMessage.type === 'custom_embed' || broadcastMessage.type === 'embed') {
                        const embData = broadcastMessage.embedData || {};
                        const embedId = embData.id || 'emb_' + Date.now();
                        
                        if (embData.type === 'v2' || embData.isV2 !== false) {
                            // Discord Components V2 Message
                            try {
                                const container = new ContainerBuilder();
                                if (embData.color) {
                                    try { container.setAccentColor(parseInt(embData.color.replace('#', ''), 16)); } catch(e) {}
                                }
                                if (embData.title) {
                                    container.addTextDisplayComponents(td => td.setContent(`## ${embData.title}`));
                                    container.addSeparatorComponents(s => s.setDivider(true));
                                }
                                const descText = embData.desc || embData.description || '';
                                if (descText) {
                                    const separatorRegex = /\{type:\s*18\}|--- \[ خط فاصل \] ---|^\s*---\s*$/gm;
                                    if (separatorRegex.test(descText)) {
                                        const parts = descText.split(separatorRegex);
                                        parts.forEach((part, pIdx) => {
                                            if (part.trim()) {
                                                container.addTextDisplayComponents(td => td.setContent(part.trim()));
                                            }
                                            if (pIdx < parts.length - 1) {
                                                try {
                                                    container.addSeparatorComponents(s => s.setDivider(true));
                                                } catch(e) {
                                                    if (container.components) container.components.push({ type: 18 });
                                                }
                                            }
                                        });
                                    } else {
                                        container.addTextDisplayComponents(td => td.setContent(descText));
                                    }
                                }
                                const imgUrl = getAbsoluteUrl(embData.img || embData.imageUrl);
                                if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                    container.addMediaGalleryComponents(mg => mg.addItems(item => item.setURL(imgUrl)));
                                }
                                if (embData.footer) {
                                    container.addSeparatorComponents(s => s.setDivider(true));
                                    container.addTextDisplayComponents(td => td.setContent(`-# ${embData.footer}`));
                                }

                                const btnRow = new ActionRowBuilder();
                                if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                    embData.buttons.slice(0, 4).forEach((btn, idx) => {
                                        const b = new ButtonBuilder()
                                            .setCustomId(`custom_embed_btn:${embedId}:${idx}`)
                                            .setLabel(btn.label || 'اضغط هنا')
                                            .setStyle(
                                                btn.style === 'Success' ? ButtonStyle.Success :
                                                btn.style === 'Danger' ? ButtonStyle.Danger :
                                                btn.style === 'Secondary' ? ButtonStyle.Secondary : ButtonStyle.Primary
                                            );
                                        if (btn.emoji) b.setEmoji(btn.emoji);
                                        btnRow.addComponents(b);
                                    });
                                }

                                // Add Translation Button if enabled
                                if (embData.translationEnabled) {
                                    const transBtn = new ButtonBuilder()
                                        .setCustomId(`translation_btn:${embedId}`)
                                        .setLabel('Translation')
                                        .setEmoji('<:translation:1545522949975441498>')
                                        .setStyle(ButtonStyle.Secondary);
                                    btnRow.addComponents(transBtn);
                                    
                                    // Store translation data in DB for the interaction handler
                                    if (!db.translations) db.translations = {};
                                    db.translations[embedId] = {
                                        ar: { title: embData.title, desc: descText },
                                        en: { title: embData.translationTitle || embData.title, desc: embData.translationDesc || descText }
                                    };
                                    saveDB(db);
                                }

                                if (btnRow.components.length > 0) {
                                    container.addActionRowComponents(btnRow);
                                }

                                await chan.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                });
                            } catch (v2Error) {
                                console.warn('[V2 Send Fallback to Standard Embed]:', v2Error.message);
                                const cleanDesc = (embData.desc || embData.description || '')
                                    .replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n').trim();
                                const embed = new EmbedBuilder().setColor(embData.color || '#5865F2');
                                if (embData.title && embData.title.trim()) embed.setTitle(embData.title.trim());
                                if (cleanDesc) embed.setDescription(cleanDesc);

                                const imgUrl = getAbsoluteUrl(embData.img || embData.imageUrl);
                                if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                    embed.setImage(imgUrl);
                                }
                                if (embData.footer) {
                                    embed.setFooter({ text: embData.footer });
                                }

                                const msgPayload = { embeds: [embed] };

                                const btnRow = new ActionRowBuilder();
                                if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                    embData.buttons.slice(0, 4).forEach((btn, idx) => {
                                        const b = new ButtonBuilder()
                                            .setCustomId(`custom_embed_btn:${embedId}:${idx}`)
                                            .setLabel(btn.label || 'اضغط هنا')
                                            .setStyle(
                                                btn.style === 'Success' ? ButtonStyle.Success :
                                                btn.style === 'Danger' ? ButtonStyle.Danger :
                                                btn.style === 'Secondary' ? ButtonStyle.Secondary : ButtonStyle.Primary
                                            );
                                        if (btn.emoji) b.setEmoji(btn.emoji);
                                        btnRow.addComponents(b);
                                    });
                                }
                                if (embData.translationEnabled) {
                                    const transBtn = new ButtonBuilder()
                                        .setCustomId(`translation_btn:${embedId}`)
                                        .setLabel('Translation')
                                        .setEmoji('<:translation:1545522949975441498>')
                                        .setStyle(ButtonStyle.Secondary);
                                    btnRow.addComponents(transBtn);
                                }
                                if (btnRow.components.length > 0) {
                                    msgPayload.components = [btnRow];
                                }

                                await chan.send(msgPayload);
                            }
                        } else {
                            // Standard Embed
                            const cleanDesc = (embData.desc || embData.description || '')
                                .replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n').trim();
                            const embed = new EmbedBuilder().setColor(embData.color || '#5865F2');
                            if (embData.title && embData.title.trim()) embed.setTitle(embData.title.trim());
                            if (cleanDesc) embed.setDescription(cleanDesc);

                            const imgUrl = getAbsoluteUrl(embData.img || embData.imageUrl);
                            if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                embed.setImage(imgUrl);
                            }
                            if (embData.footer) {
                                embed.setFooter({ text: embData.footer });
                            }

                            const msgPayload = { embeds: [embed] };

                            const btnRow = new ActionRowBuilder();
                            if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                embData.buttons.slice(0, 4).forEach((btn, idx) => {
                                    const b = new ButtonBuilder()
                                        .setCustomId(`custom_embed_btn:${embedId}:${idx}`)
                                        .setLabel(btn.label || 'اضغط هنا')
                                        .setStyle(
                                            btn.style === 'Success' ? ButtonStyle.Success :
                                            btn.style === 'Danger' ? ButtonStyle.Danger :
                                            btn.style === 'Secondary' ? ButtonStyle.Secondary : ButtonStyle.Primary
                                        );
                                    if (btn.emoji) b.setEmoji(btn.emoji);
                                    btnRow.addComponents(b);
                                });
                            }
                            if (embData.translationEnabled) {
                                const transBtn = new ButtonBuilder()
                                    .setCustomId(`translation_btn:${embedId}`)
                                    .setLabel('Translation')
                                    .setEmoji('<:translation:1545522949975441498>')
                                    .setStyle(ButtonStyle.Secondary);
                                btnRow.addComponents(transBtn);
                                
                                if (!db.translations) db.translations = {};
                                db.translations[embedId] = {
                                    ar: { title: embData.title, desc: cleanDesc },
                                    en: { title: embData.translationTitle || embData.title, desc: embData.translationDesc || cleanDesc },
                                    img: imgUrl
                                };
                                saveDB(db);
                            }
                            if (btnRow.components.length > 0) {
                                msgPayload.components = [btnRow];
                            }

                            await chan.send(msgPayload);
                        }
                        deliveryLog = { status: "SENT", message: `تم إرسال الإيمبد المخصص لقناة #${chan.name} بنجاح!` };
                    } else if (broadcastMessage.type === 'ticket_panel') {
                        const pData = broadcastMessage.panelData || tickets || {};
                        const pid = broadcastMessage.panelId || pData.id || 'p1';
                        const isPanelV2 = pData.embedType === 'v2' || pData.isV2 || broadcastMessage.embedType === 'v2';

                        const row = new ActionRowBuilder();
                        if (pData.buttons && Array.isArray(pData.buttons) && pData.buttons.length > 0) {
                            pData.buttons.slice(0, 5).forEach((btn, idx) => {
                                const styleNum = btn.style === 'Danger' ? ButtonStyle.Danger :
                                                 btn.style === 'Success' ? ButtonStyle.Success :
                                                 btn.style === 'Secondary' ? ButtonStyle.Secondary : ButtonStyle.Primary;
                                const b = new ButtonBuilder()
                                    .setCustomId(`ticket_panel_btn_${pid}_${idx}`)
                                    .setLabel(btn.name || btn.label || 'فتح تذكرة')
                                    .setStyle(styleNum);
                                if (btn.emoji) b.setEmoji(btn.emoji);
                                row.addComponents(b);
                            });
                        } else {
                            const styleNum = (pData.btnStyle || broadcastMessage.buttonStyle) === 'Danger' ? ButtonStyle.Danger :
                                             (pData.btnStyle || broadcastMessage.buttonStyle) === 'Success' ? ButtonStyle.Success :
                                             (pData.btnStyle || broadcastMessage.buttonStyle) === 'Secondary' ? ButtonStyle.Secondary : ButtonStyle.Primary;
                            row.addComponents(
                                new ButtonBuilder()
                                    .setCustomId(`ticket_panel_btn_${pid}_0`)
                                    .setLabel(pData.btnLabel || broadcastMessage.buttonLabel || tickets?.btnLabel || 'فتح تذكرة')
                                    .setEmoji(pData.btnEmoji || broadcastMessage.buttonEmoji || tickets?.btnEmoji || '📩')
                                    .setStyle(styleNum)
                            );
                        }

                        const pTitle = pData.title || broadcastMessage.title || tickets?.title || "🎫 قسم الدعم الفني والتذاكر";
                        const rawDesc = pData.description || broadcastMessage.description || tickets?.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.";
                        const pColor = pData.color || broadcastMessage.color || tickets?.color || '#5865f2';
                        const pImgUrl = getAbsoluteUrl(pData.img || pData.imageUrl);
                        const embedId = pid || 'p1';

                        if (isPanelV2) {
                            try {
                                const container = new ContainerBuilder();
                                try { container.setAccentColor(parseInt(pColor.replace('#', ''), 16)); } catch(e) {}
                                if (pTitle) {
                                    container.addTextDisplayComponents(td => td.setContent(`## ${pTitle}`));
                                    container.addSeparatorComponents(s => s.setDivider(true));
                                }
                                if (rawDesc) {
                                    const separatorRegex = /\{type:\s*18\}|--- \[ خط فاصل \] ---|^\s*---\s*$/gm;
                                    if (separatorRegex.test(rawDesc)) {
                                        const parts = rawDesc.split(separatorRegex);
                                        parts.forEach((part, pIdx) => {
                                            if (part.trim()) {
                                                container.addTextDisplayComponents(td => td.setContent(part.trim()));
                                            }
                                            if (pIdx < parts.length - 1) {
                                                try { container.addSeparatorComponents(s => s.setDivider(true)); } catch(e) {}
                                            }
                                        });
                                    } else {
                                        container.addTextDisplayComponents(td => td.setContent(rawDesc));
                                    }
                                }
                                if (pImgUrl && pImgUrl !== 'لايوجد' && pImgUrl.startsWith('http')) {
                                    container.addMediaGalleryComponents(mg => mg.addItems(item => item.setURL(pImgUrl)));
                                }

                                if (pData.translationEnabled) {
                                    const transBtn = new ButtonBuilder()
                                        .setCustomId(`translation_btn:${embedId}`)
                                        .setLabel('Translation')
                                        .setEmoji('<:translation:1545522949975441498>')
                                        .setStyle(ButtonStyle.Secondary);
                                    row.addComponents(transBtn);
                                    
                                    if (!db.translations) db.translations = {};
                                    db.translations[embedId] = {
                                        ar: { title: pTitle, desc: rawDesc },
                                        en: { title: pData.translationTitle || pTitle, desc: pData.translationDesc || rawDesc }
                                    };
                                }

                                container.addActionRowComponents(row);

                                await chan.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                });
                            } catch (panelV2Err) {
                                console.warn('[Panel V2 Send Fallback]:', panelV2Err.message);
                                const cleanPanelDesc = rawDesc.replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
                                const embed = new EmbedBuilder()
                                    .setColor(pColor)
                                    .setTitle(pTitle)
                                    .setDescription(cleanPanelDesc);
                                if (pImgUrl && pImgUrl !== 'لايوجد' && pImgUrl.startsWith('http')) {
                                    embed.setImage(pImgUrl);
                                }
                                if (pData.translationEnabled) {
                                    const transBtn = new ButtonBuilder()
                                        .setCustomId(`translation_btn:${embedId}`)
                                        .setLabel('Translation')
                                        .setEmoji('<:translation:1545522949975441498>')
                                        .setStyle(ButtonStyle.Secondary);
                                    row.addComponents(transBtn);
                                    
                                    if (!db.translations) db.translations = {};
                                    db.translations[embedId] = {
                                        ar: { title: pTitle, desc: rawDesc },
                                        en: { title: pData.translationTitle || pTitle, desc: pData.translationDesc || rawDesc }
                                    };
                                }
                                await chan.send({ embeds: [embed], components: [row] });
                            }
                        } else {
                            const cleanPanelDesc = rawDesc.replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
                            const embed = new EmbedBuilder()
                                .setColor(pColor)
                                .setTitle(pTitle)
                                .setDescription(cleanPanelDesc);
                            if (pImgUrl && pImgUrl !== 'لايوجد' && pImgUrl.startsWith('http')) {
                                embed.setImage(pImgUrl);
                            }
                            if (pData.translationEnabled) {
                                const transBtn = new ButtonBuilder()
                                    .setCustomId(`translation_btn:${embedId}`)
                                    .setLabel('Translation')
                                    .setEmoji('<:translation:1545522949975441498>')
                                    .setStyle(ButtonStyle.Secondary);
                                row.addComponents(transBtn);
                                
                                if (!db.translations) db.translations = {};
                                db.translations[embedId] = {
                                    ar: { title: pTitle, desc: rawDesc },
                                    en: { title: pData.translationTitle || pTitle, desc: pData.translationDesc || rawDesc }
                                };
                            }
                            await chan.send({ embeds: [embed], components: [row] });
                        }
                        deliveryLog = { status: "SENT", message: `تم إرسال لوحة التذاكر لقناة #${chan.name}` };
                    } else if (broadcastMessage.type === 'suggestion_panel') {
                        const sData = db[guildId]?.suggestions?.panels?.find(p => p.id === broadcastMessage.panelId) || {};
                        const sTitle = broadcastMessage.title || sData.title || suggestions?.title || "💡 صندوق الاقتراحات والتطوير";
                        const sDesc = broadcastMessage.description || sData.description || suggestions?.description || "أهلاً بكم! يمكنك كتابة اقتراحك وطرح أفكارك لتطوير السيرفر هنا 💡";
                        const sColor = broadcastMessage.color || sData.color || suggestions?.color || '#12a524';
                        const sid = broadcastMessage.panelId || 's1';

                        const row = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('publish_suggestion_prompt_btn')
                                .setLabel('نشر إقتراح')
                                .setEmoji('1517591602049056829')
                                .setStyle(ButtonStyle.Success)
                        );

                        if (sData.translationEnabled) {
                            const transBtn = new ButtonBuilder()
                                .setCustomId(`translation_btn:${sid}`)
                                .setLabel('Translation')
                                .setEmoji('<:translation:1545522949975441498>')
                                .setStyle(ButtonStyle.Secondary);
                            row.addComponents(transBtn);
                            
                            if (!db.translations) db.translations = {};
                            db.translations[sid] = {
                                ar: { title: sTitle, desc: sDesc },
                                en: { title: sData.translationTitle || sTitle, desc: sData.translationDesc || sDesc }
                            };
                        }

                        const embed = new EmbedBuilder()
                            .setColor(sColor)
                            .setTitle(sTitle)
                            .setDescription(sDesc);

                        await chan.send({ embeds: [embed], components: [row] });
                        deliveryLog = { status: "SENT", message: `تم إرسال لوحة الاقتراحات لقناة #${chan.name}` };
                    } else if (broadcastMessage.content) {
                        await chan.send(broadcastMessage.content);
                        deliveryLog = { status: "SENT", message: `تم إرسال الرسالة لقناة #${chan.name}` };
                    }
                } else {
                    deliveryLog = { status: "ERROR", message: "تعذر العثور على القناة المحددة بالسيرفر، تأكد من وجود البوت وإعطائه صلاحيات الروم" };
                }
            } catch (err) {
                deliveryLog = { status: "ERROR", message: `خطأ أثناء الإرسال: ${err.message}` };
            }
        } else if (broadcastMessage && broadcastMessage.channelId) {
            deliveryLog = { status: "ERROR", message: "البوت غير متصل حالياً بالسيرفر، يرجى تشغيل البوت والتأكد من التوكن" };
        }

        return sendJson(200, {
            success: true,
            message: 'Settings updated and synchronized inside Bot successfully!',
            deliveryLog
        });
    }

    // 4. POST /api/azkar/trigger or /api/azkar/trigger/:guildId
    if (pathname.startsWith('/api/azkar/trigger') && req.method === 'POST') {
        const payload = await getBody();
        const parts = pathname.split('/');
        const guildId = payload.guildId || parts[4] || parts[3];
        
        const db = getDB();
        const azkarConfig = db[guildId]?.azkar;
        const channelId = payload.channelId || azkarConfig?.channelId;

        if (!channelId) return sendJson(400, { success: false, error: 'لم يتم تحديد روم الأذكار' });

        try {
            const channel = await client.channels.fetch(channelId).catch(() => null);
            if (!channel) return sendJson(404, { success: false, error: 'تعذر الوصول للروم المحددة' });

            const randomAzkar = mainAzkarList[Math.floor(Math.random() * mainAzkarList.length)];
            const buffer = await generateAzkarCard(randomAzkar.title, randomAzkar.text, randomAzkar.ref);
            const attachment = new AttachmentBuilder(buffer, { name: 'azkar.png' });
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('azkar_click').setEmoji('1516425996793024552').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('azkar_mosque').setEmoji('1516897918496542760').setStyle(ButtonStyle.Secondary)
            );
            const embed = new EmbedBuilder().setColor('#815c84').setDescription(`✨ **${randomAzkar.title}**\n\n**المرجع:** ${randomAzkar.ref}\n\n*تأمل الذكر واستحضر النية والتسبيح 🌸*`).setImage('attachment://azkar.png');

            await channel.send({ embeds: [embed], files: [attachment], components: [row] });
            return sendJson(200, { success: true, message: `تم إرسال الذكر بنجاح لقناة #${channel.name}` });
        } catch (err) {
            return sendJson(500, { success: false, error: err.message });
        }
    }

    // 4.5 POST /api/test-welcome or /api/welcome/test
    if ((pathname === '/api/test-welcome' || pathname === '/api/welcome/test') && req.method === 'POST') {
        const payload = await getBody();
        const { guildId, welcome } = payload;
        if (!guildId) return sendJson(400, { success: false, error: 'لم يتم تحديد معرف السيرفر' });

        const targetGuild = client.guilds.cache.get(guildId) || await client.guilds.fetch(guildId).catch(() => null);
        if (!targetGuild) return sendJson(404, { success: false, error: 'البوت غير متواجد في هذا السيرفر حالياً' });

        try {
            const member = targetGuild.members.me || await targetGuild.members.fetch(client.user.id).catch(() => null) || {
                id: client.user.id,
                displayName: client.user.username,
                user: client.user,
                guild: targetGuild,
                displayAvatarURL: (opts) => client.user.displayAvatarURL(opts)
            };

            const result = await handleWelcomeMember(member, true, welcome);
            if (result.success) {
                return sendJson(200, { success: true, message: `تم إرسال رسالة الترحيب التجريبية في روم #${result.channelName || ''} بنجاح!` });
            } else {
                return sendJson(400, { success: false, error: result.error || 'فشل إرسال الترحيب' });
            }
        } catch (err) {
            return sendJson(500, { success: false, error: `خطأ أثناء التجربة: ${err.message}` });
        }
    }

    // 5. POST /api/broadcast/:guildId
    if (pathname.startsWith('/api/broadcast') && req.method === 'POST') {
        const payload = await getBody();
        const parts = pathname.split('/');
        const guildId = parts[3] || payload.guildId;
        const { channelId, content, title, color } = payload;

        if (!channelId || (!content && !title)) return sendJson(400, { error: 'Missing channelId or content' });

        try {
            const channel = await client.channels.fetch(channelId).catch(() => null);
            if (!channel) return sendJson(404, { error: 'Channel not found or bot lacks permissions.' });

            if (title) {
                const embed = new EmbedBuilder()
                    .setColor(color || '#5865f2')
                    .setTitle(title)
                    .setDescription(content || '');
                await channel.send({ embeds: [embed] });
            } else {
                await channel.send(content);
            }
            return sendJson(200, { success: true, message: `Message sent to #${channel.name} successfully!` });
        } catch (err) {
            return sendJson(500, { error: err.message });
        }
    }

    return sendJson(404, { error: 'Not Found' });
});

if (require.main === module) {
    console.log(`[BOT] Started directly via index.js. Redirecting to server.js to run both Express and Discord Bot in parallel.`);
    require('./server.js');
} else {
    console.log(`[BOT] Loaded inside Express process. Skipping independent HTTP server to avoid port collision.`);
}

const activeStates = new TTLCache({ ttlMs: 30 * 60 * 1000, max: 1000 });
const activeClaims = new Set();
const azkarTimers = new Map();
const userMessageCache = new Map();
const bypassEvents = new Set();
const interactionCooldowns = new Map(); // للحد من العبث وضغط الأزرار العشوائي

// Periodic cleanup to keep RAM usage minimal
setInterval(() => {
    const now = Date.now();
    for (const [userId, messages] of userMessageCache.entries()) {
        const recent = messages.filter(m => now - m.time < 5000);
        if (recent.length === 0) userMessageCache.delete(userId);
        else userMessageCache.set(userId, recent);
    }
    for (const [userId, time] of interactionCooldowns.entries()) {
        if (now - time > 15000) interactionCooldowns.delete(userId);
    }
    if (global.gc) {
        try { global.gc(); } catch (e) {}
    }
}, 60000);

const arabCountries = [
    { label: "المملكة العربية السعودية", value: "saudi", city: "Riyadh", country: "Saudi Arabia", method: 4, emoji: "🇸🇦" },
    { label: "جمهورية مصر العربية", value: "egypt", city: "Cairo", country: "Egypt", method: 5, emoji: "🇪🇬" },
    { label: "الإمارات العربية المتحدة", value: "uae", city: "Abu Dhabi", country: "United Arab Emirates", method: 16, emoji: "🇦🇪" },
    { label: "دولة قطر", value: "qatar", city: "Doha", country: "Qatar", method: 4, emoji: "🇶🇦" },
    { label: "دولة الكويت", value: "kuwait", city: "Kuwait City", country: "Kuwait", method: 9, emoji: "🇰🇼" },
    { label: "مملكة البحرين", value: "bahrain", city: "Manama", country: "Bahrain", method: 4, emoji: "🇧🇭" },
    { label: "سلطنة عمان", value: "oman", city: "Muscat", country: "Oman", method: 1, emoji: "🇴🇲" },
    { label: "المملكة الأردنية الهاشمية", value: "jordan", city: "Amman", country: "Jordan", method: 1, emoji: "🇯🇴" },
    { label: "فلسطين", value: "palestine", city: "Jerusalem", country: "Palestine", method: 1, emoji: "🇵🇸" },
    { label: "الجمهورية اللبنانية", value: "lebanon", city: "Beirut", country: "Lebanon", method: 1, emoji: "🇱🇧" },
    { label: "الجمهورية العربية السورية", value: "syria", city: "Damascus", country: "Syria", method: 1, emoji: "🇸🇾" },
    { label: "جمهورية العراق", value: "iraq", city: "Baghdad", country: "Iraq", method: 1, emoji: "🇮🇶" },
    { label: "الجمهورية اليمنية", value: "yemen", city: "Sanaa", country: "Yemen", method: 1, emoji: "🇾🇪" },
    { label: "الجمهورية الجزائرية", value: "algeria", city: "Algiers", country: "Algeria", method: 3, emoji: "🇩🇿" },
    { label: "المملكة المغربية", value: "morocco", city: "Rabat", country: "Morocco", method: 1, emoji: "🇲🇦" },
    { label: "الجمهورية التونسية", value: "tunisia", city: "Tunis", country: "Tunisia", method: 3, emoji: "🇹🇳" },
    { label: "دولة ليبيا", value: "libya", city: "Tripoli", country: "Libya", method: 3, emoji: "🇱🇾" },
    { label: "جمهورية السودان", value: "sudan", city: "Khartoum", country: "Sudan", method: 1, emoji: "🇸🇩" }
];

const mainAzkarList = [
    { title: "الدعاء عند سماع صياح الديك ونهيق الحمار", text: "إِذَا سَمِعْتُمْ صِيَاحَ الدِّيَكَةِ فَاسْأَلُوا اللَّهَ مِنْ فَضْلِهِ، فَإِنَّهَا رَأَتْ مَلَكًا، وَإِذَا سَمِعْتُمْ نَهِيقَ الْحِمَارِ فَتَعَوَّذُوا بِاللَّهِ مِنَ الشَّيْطَانِ، فَإِنَّهُ رَأَى شَيْطَانًا.", ref: "صحيح البخاري (٣٣٠٣)، صحيح مسلم (٢٧٢٩)" },
    { title: "الدعاء في السجود", text: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلانِيَتَهُ وَسِرَّهُ.", ref: "صحيح مسلم (٤٨٣)" },
    { title: "دعاء الكرب والهم", text: "لَا إِلَهَ إِلَّا اللَّهُمَّ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُمَّ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُمَّ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.", ref: "صحيح البخاري (٦٣٤٦)، صحيح مسلم (٢٧٣٠)" },
    { title: "الاستعاذة قبل التشهد", text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمАТِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ.", ref: "صحيح مسلم (٥٨٨)" },
    { title: "دعاء الحماية اليومية", text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", ref: "سنن أبي داود (٥٠٨٨)، سنن الترمذي (٣٣٨٨)" }
];

const shortDhikrs = [
    "أستغفر الله العظيم وأتوب إليه",
    "سبحان الله وبحمده، سبحان الله العظيم",
    "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير",
    "اللهم صلِّ وسلم على نبينا محمد",
    "لا حول ولا قوة إلا بالله العلي العظيم",
    "الحمد لله حمداً كثيراً طيباً مباركاً فيه",
    "سبحان الله، والحمد لله، ولا إله إلا الله, والله أكبر",
    "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين"
];

function getAbsoluteUrl(pathOrUrl) {
    if (!pathOrUrl || pathOrUrl === 'لايوجد' || pathOrUrl === 'none') return 'لايوجد';
    pathOrUrl = pathOrUrl.trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
    if (!pathOrUrl) return 'لايوجد';

    // Handle base64 image data URL safely
    if (pathOrUrl.startsWith('data:image/')) {
        try {
            const matches = pathOrUrl.match(/^data:image\/([a-zA-Z0-9-+.]+);base64,(.+)$/);
            if (matches && matches[2]) {
                const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
                const buffer = Buffer.from(matches[2], 'base64');
                const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
                const uploadsDir = path.join(process.cwd(), 'uploads');
                if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
                fs.writeFileSync(path.join(uploadsDir, fileName), buffer);
                pathOrUrl = `/uploads/${fileName}`;
            } else {
                return 'لايوجد';
            }
        } catch (e) {
            console.error('Error saving base64 image in getAbsoluteUrl:', e);
            return 'لايوجد';
        }
    }

    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
        if (pathOrUrl.length > 2048) return 'لايوجد';
        return pathOrUrl;
    }
    
    let hostUrl = process.env.APP_URL || process.env.BOT_SERVER_URL;
    if (!hostUrl) {
        try {
            const configPath = path.join(process.cwd(), 'config.json');
            if (fs.existsSync(configPath)) {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                if (config.REDIRECT_URI) {
                    const parsed = new URL(config.REDIRECT_URI);
                    hostUrl = parsed.origin;
                }
            }
        } catch (e) {
            console.error("Error parsing REDIRECT_URI for getAbsoluteUrl:", e);
        }
    }
    
    if (!hostUrl) {
        hostUrl = 'https://ntlbot.ai.studio';
    }
    
    hostUrl = hostUrl.replace(/\/$/, '');
    const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    const fullUrl = `${hostUrl}${cleanPath}`;
    if (fullUrl.length > 2048) return 'لايوجد';
    return fullUrl;
}

function getHighestTicketNumberInGuild(guild) {
    let maxNum = 0;
    if (!guild || !guild.id) return maxNum;
    const database = getDB();
    const gData = database[guild.id];
    if (!gData) return maxNum;

    // Check all stored ticket records in our bot's database for this guild
    if (gData.tickets) {
        Object.values(gData.tickets).forEach(t => {
            if (t.ticketNum) {
                const num = parseInt(t.ticketNum, 10);
                if (!isNaN(num) && num > maxNum) {
                    maxNum = num;
                }
            }
        });
    }

    // Check stored counters in our bot's database
    if (gData.counters) {
        Object.values(gData.counters).forEach(cVal => {
            const num = parseInt(cVal, 10);
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        });
    }

    // Also check channels in guild cache ONLY if they belong to OUR bot's registered tickets
    if (guild.channels && gData.tickets) {
        guild.channels.cache.forEach(channel => {
            if (gData.tickets[channel.id]) {
                const name = channel.name || '';
                const match = name.match(/(?:ticket|closed)-(\d+)/i);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (!isNaN(num) && num > maxNum) {
                        maxNum = num;
                    }
                }
            }
        });
    }

    return maxNum;
}

function resolveTicketCategory(panel, btnIdx, guild) {
    if (!panel) return null;
    let catId = null;

    if (btnIdx !== 'default' && panel.buttons && panel.buttons[btnIdx]) {
        const btn = panel.buttons[btnIdx];
        const targetId = btn.categoryId || btn.category;
        if (targetId && (guild.channels.cache.has(targetId) || guild.channels.fetch(targetId).catch(() => null))) {
            catId = targetId;
        }
    }

    if (!catId) {
        const panelCat = panel.categoryId || panel.category;
        if (panelCat && (guild.channels.cache.has(panelCat) || guild.channels.fetch(panelCat).catch(() => null))) {
            catId = panelCat;
        }
    }

    return catId;
}

const activeBypassUsers = new Set();
const bypassMemoryCache = new Map(); // Fast In-Memory Cache (URL -> Key)
// MEMORY_GUARD_AUTO_V1
const MEMORY_GUARD_MAX_BYPASS = 300;

// Cleanup old cache entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, item] of bypassMemoryCache.entries()) {
        if (now - item.timestamp > 15 * 60 * 1000) {
            bypassMemoryCache.delete(key);
        }
    }
}, 10 * 60 * 1000);

function getDynamicBypassTime(startTime) {
    const raw = (performance.now() - startTime) / 1000;
    return raw.toFixed(2);
}

const KEY_FILE = 'key.txt';
const BACON_KEY_FILE = 'bacon_key.txt';

function getBaconApiKey() {
    try {
        if (fs.existsSync(BACON_KEY_FILE)) {
            const saved = fs.readFileSync(BACON_KEY_FILE, 'utf8').trim();
            if (saved.length > 0) return saved;
        }
    } catch (e) {}
    try {
        const db = getDB();
        if (db && db.baconApiKey) {
            return db.baconApiKey;
        }
    } catch (e) {}
    return BACON_API_KEY;
}

function setBaconApiKey(newKey) {
    if (!newKey || typeof newKey !== 'string') return;
    BACON_API_KEY = newKey.trim();
    try {
        fs.writeFileSync(BACON_KEY_FILE, BACON_API_KEY);
    } catch (e) {}
    try {
        const db = getDB();
        if (db) {
            db.baconApiKey = BACON_API_KEY;
            saveDB(db);
        }
    } catch (e) {}
    console.log(`[Bacon API Key] Updated to: ${BACON_API_KEY}`);
}

const KEY_URL = 'https://trw.lat/api/lvlol/captchaLess';
const BYPASS_URL = 'https://trw.lat/api/bypass';
const NEW_BYPASS_API_URL = 'https://trw.lat/api/bypass';
const NEW_BYPASS_API_IP_URL = 'http://13.250.130.150/api/bypass';
const AWS_BYPASS_API_URL = 'https://fp3ixapy16.execute-api.ap-southeast-1.amazonaws.com/api/bypass';

const bypassHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://bypassunlock.com/',
    'Accept': 'application/json, text/plain, */*'
};

async function getBypassApiKey(forceRefresh = false) {
    if (!forceRefresh && fs.existsSync(KEY_FILE)) {
        try {
            const savedKey = fs.readFileSync(KEY_FILE, 'utf8').trim();
            if (savedKey.length > 0) {
                return savedKey;
            }
        } catch (e) {}
    }

    console.log('[Delta Bypass] جاري جلب مفتاح API جديد وتحديث الملف...');
    try {
        const res = await fetch(KEY_URL, { headers: bypassHeaders, signal: AbortSignal.timeout(6000) });
        if (res.ok) {
            const data = await res.json();
            const newKey = data.freeKey;
            if (newKey) {
                fs.writeFileSync(KEY_FILE, newKey);
                console.log(`[Delta Bypass] تم حفظ المفتاح الجديد بنجاح.`);
                return newKey;
            }
        }
    } catch (err) {
        console.error(`[Delta Bypass] خطأ في جلب المفتاح: ${err.message}`);
    }
    return null;
}

async function fetchOldApi(deltaLink) {
    let apiKey = await getBypassApiKey();
    if (!apiKey) return { bypassedLink: null, error: null };
    try {
        const url = new URL(BYPASS_URL);
        url.searchParams.append('apikey', apiKey);
        url.searchParams.append('url', deltaLink);

        const res = await fetch(url, {
            headers: {
                ...bypassHeaders,
                'x-api-key': apiKey
            },
            signal: AbortSignal.timeout(15000)
        });

        const data = await res.json().catch(() => null);

        if (res.status === 401 || (data && data.success === false && data.result === 'Invalid API key')) {
            console.log('[Delta Bypass Old API] المفتاح المحفوظ انتهت صلاحيته. جاري تجديده تلقائياً...');
            const freshKey = await getBypassApiKey(true);
            if (freshKey) {
                const retryUrl = new URL(BYPASS_URL);
                retryUrl.searchParams.append('apikey', freshKey);
                retryUrl.searchParams.append('url', deltaLink);
                const retryRes = await fetch(retryUrl, {
                    headers: {
                        ...bypassHeaders,
                        'x-api-key': freshKey
                    },
                    signal: AbortSignal.timeout(8000)
                });
                const retryData = await retryRes.json().catch(() => null);
                if (retryData && retryData.success) {
                    const rawKey = retryData.result || retryData.bypassed || retryData.key;
                    if (rawKey && typeof rawKey === 'string') {
                        const lowerKey = rawKey.toLowerCase();
                        if (lowerKey.includes('session has expired') || lowerKey.includes('get a new link') || lowerKey.includes('expired')) {
                            return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                        }
                        return { bypassedLink: rawKey };
                    }
                }
            }
        }

        if (data && data.success) {
            const rawKey = data.result || data.bypassed || data.key;
            if (rawKey && typeof rawKey === 'string') {
                const lowerKey = rawKey.toLowerCase();
                if (lowerKey.includes('session has expired') || lowerKey.includes('get a new link') || lowerKey.includes('expired')) {
                    return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                }
                return { bypassedLink: rawKey };
            }
        } else if (data && data.result) {
            const errMsg = typeof data.result === 'string' ? data.result : 'فشلت معالجة الطلب';
            const lowerErr = errMsg.toLowerCase();
            if (lowerErr.includes('expired') || lowerErr.includes('session')) {
                return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
            }
            return { bypassedLink: null, error: errMsg };
        }
    } catch (err) {
        console.error(`[Old API Bypass Error]:`, err.message || err);
    }
    return { bypassedLink: null, error: null };
}

async function fetchWithNewApiKey(deltaLink, apiKey) {
    const endpoints = [
        `${NEW_BYPASS_API_URL}?url=${encodeURIComponent(deltaLink)}&apikey=${encodeURIComponent(apiKey)}`,
        `${NEW_BYPASS_API_IP_URL}?url=${encodeURIComponent(deltaLink)}`
    ];

    for (const apiUrl of endpoints) {
        try {
            console.log(`[New API Bypass] Sending request with key (${apiKey.slice(0, 10)}...) to: ${apiUrl.slice(0, 45)}...`);
            const res = await fetch(apiUrl, {
                headers: {
                    'X-API-Key': apiKey,
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
                    'Accept': 'application/json, text/plain, */*'
                },
                signal: AbortSignal.timeout(10000) // Increased to 10s
            });

            const data = await res.json().catch(() => null);
            if (data) {
                const rawKey = data.result || data.bypassed || data.key || data.url || data.link || data.destination;
                if (data.success !== false && rawKey && typeof rawKey === 'string') {
                    const lowerKey = rawKey.toLowerCase();
                    if (lowerKey.includes('session has expired') || lowerKey.includes('get a new link') || lowerKey.includes('expired')) {
                        return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                    }
                    return { bypassedLink: rawKey };
                } else if (data.result || data.error || data.message) {
                    const errMsg = typeof data.result === 'string' ? data.result : (data.error || data.message || 'فشلت معالجة الطلب');
                    const lowerErr = String(errMsg).toLowerCase();
                    if (lowerErr.includes('expired') || lowerErr.includes('session')) {
                        return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                    }
                    if (!errMsg.includes('fail') && !errMsg.includes('invalid')) {
                        return { bypassedLink: null, error: errMsg };
                    }
                }
            }
        } catch (err) {
            console.error(`[New API Bypass Notice]: Endpoint unreachable or timed out (${err.message})`);
        }
    }
    return { bypassedLink: null, error: null };
}

async function fetchAwsBypassApi(deltaLink) {
    try {
        console.log(`[AWS API Bypass] Requesting bypass for: ${deltaLink.slice(0, 60)}...`);
        const apiUrl = `${AWS_BYPASS_API_URL}?url=${encodeURIComponent(deltaLink)}`;
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            signal: AbortSignal.timeout(12000) // Increased to 12s
        });

        const data = await res.json().catch(() => null);
        if (data) {
            const rawKey = data.result || data.bypassed || data.key || data.url || data.link || data.destination || data.data;
            if (data.success !== false && rawKey && typeof rawKey === 'string') {
                const lowerKey = rawKey.toLowerCase();
                if (lowerKey.includes('session has expired') || lowerKey.includes('get a new link') || lowerKey.includes('expired')) {
                    return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                }
                return { bypassedLink: rawKey };
            } else if (data.result || data.error || data.message) {
                const errMsg = typeof data.result === 'string' ? data.result : (data.error || data.message || 'فشلت معالجة الطلب');
                const lowerErr = String(errMsg).toLowerCase();
                if (lowerErr.includes('expired') || lowerErr.includes('session')) {
                    return { bypassedLink: null, error: 'انتهت صلاحية هذا الرابط أو تم تخطيه مسبقاً، يرجى جلب رابط جديد من التطبيق.' };
                }
                return { bypassedLink: null, error: errMsg };
            }
        }
    } catch (err) {
        console.error(`[AWS API Bypass Notice]: ${err.message}`);
    }
    return { bypassedLink: null, error: null };
}

// ==================== BACON BYPASS XYZ ENGINE ====================
async function fetchBaconBypass(targetUrl, timeoutMs = 20000) {
    const currentApiKey = getBaconApiKey();
    if (!currentApiKey) return { bypassedLink: null, error: null };
    try {
        const apiUrl = `https://baconbypass.xyz/api/bypass?key=${encodeURIComponent(currentApiKey)}&url=${encodeURIComponent(targetUrl)}`;
        const res = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://baconbypass.xyz/'
            },
            signal: AbortSignal.timeout(timeoutMs)
        });
        if (!res.ok) return { bypassedLink: null, error: null };
        const data = await res.json().catch(() => null);
        if (!data) return { bypassedLink: null, error: null };
        const rawKey = data.result || data.bypassed || data.key || data.url || data.link || data.destination || data.data || data.output;
        if (data.success !== false && rawKey && typeof rawKey === 'string') {
            const lowerKey = rawKey.toLowerCase();
            if (lowerKey.includes('session has expired') || lowerKey.includes('get a new link') || lowerKey.includes('expired')) {
                return { bypassedLink: null, error: 'Link expired.' };
            }
            return { bypassedLink: rawKey, error: null };
        }
    } catch (err) {}
    return { bypassedLink: null, error: null };
}

async function fetchTrwBypass(targetUrl) {
    const encodedUrl = encodeURIComponent(targetUrl);
    const apiUrl = `https://trw.lat/api/bypass?url=${encodedUrl}&mode=stream&verbose=true`;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve(null);
        }, 15000); // Increased to 15s

        axios({
            method: 'get',
            url: apiUrl,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://v.rip.linkvertise.lol/'
            },
            responseType: 'stream'
        }).then(response => {
            response.data.on('data', (chunk) => {
                const lines = chunk.toString().split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const jsonStr = line.replace('data: ', '').trim();
                            const data = JSON.parse(jsonStr);
                            if (data.status === 'success' && data.result) {
                                clearTimeout(timeout);
                                resolve({ bypassedLink: data.result });
                                return;
                            }
                        } catch (e) {}
                    }
                }
            });

            response.data.on('error', () => {
                clearTimeout(timeout);
                resolve(null);
            });
            
            response.data.on('end', () => {
                clearTimeout(timeout);
                resolve(null);
            });
        }).catch(() => {
            clearTimeout(timeout);
            resolve(null);
        });
    });
}

// ==================== NEW TRW DIRECT BYPASS ENGINE ====================
async function getAuthUrlWithTRW(targetUrl, timeoutMs = 25000) {
    const apikey = "TRW_FREE-GAY-15a92945-9b04-4c75-8337-f2a6007281e9";
    try {
        const response = await axios.get("https://trw.lat/api/bypass", {
            params: {
                apikey: apikey,
                url: targetUrl
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
            },
            timeout: timeoutMs
        });

        const data = response.data;
        if (data && (data.result || data.url)) {
            let cleanRes = String(data.result || data.url).replace(/[\x00-\x1F\x7F]/g, "").trim();
            cleanRes = filterRipLinkvertise(cleanRes);
            if (cleanRes) return { success: true, result: cleanRes };
            return { success: false, error: "تعذر تخطي هذا الرابط حالياً." };
        }
        return { success: false, error: data?.error || "تعذر تخطي هذا الرابط حالياً." };
    } catch (err) {
        let errText = err.response?.data?.error || err.message || "";
        if (errText.includes("504") || errText.includes("timeout") || errText.includes("502")) {
            errText = "تعذر تخطي هذا الرابط حالياً بسبب ضغط في موقع التخطي، يرجى إعادة المحاولة.";
        }
        return { success: false, error: errText };
    }
}

const { fetchKey: fetchPlatoKey } = require('./platorelayBypass.js');

const SUPPORTED_BYPASS_SITES = [
    { name: 'Lootlabs', domains: ['lootlabs.gg', 'links.lootlabs.gg', 'loot-link.com', 'loot-links.com', 'lootlink.org', 'lootlinks.co', 'lootdest.org', 'lootdest.info', 'lootdest.com', 'lootlabs'] },
    { name: 'Platoboost', domains: ['platoboost.com', 'platoboost.net', 'gateway.platoboost.com', 'platorelay.com', 'auth.platorelay.com', 'plato.boost'] },
    { name: 'Pandadevelopment', domains: ['pandadevelopment.net', 'pandadevelopment.com', 'getkey.pandadevelopment.net'] },
    { name: 'Trine', domains: ['trine.xyz', 'trine.com'] },
    { name: 'Violated', domains: ['violated.link', 'violated.com'] },
    { name: 'Blox-script', domains: ['blox-script.com', 'bloxscript.com', 'scriptblox.com'] },
    { name: 'Hydrogen', domains: ['hydrogen.sh', 'gateway.hydrogen.sh'] },
    { name: 'Linkvertise', domains: ['linkvertise.com', 'link-to.net', 'up-to-down.net', 'direct-link.net', 'link-target.net', 'linkvertise.download', 'linkvertise.net', 'linkvertise.ninja', 'linkvertise'] },
    { name: 'Admaven', domains: ['ad-maven.com', 'admaven.com'] },
    { name: 'Workink', domains: ['work.ink', 'workink.net', 'workink.one', 'workink.me', 'workink.000webhostapp.com'] },
    { name: 'Codex', domains: ['codex.lol', 'gateway.codex.lol'] },
    { name: 'Shrtfly', domains: ['shrtfly.com', 'shrtfly.net'] },
    { name: 'Boostylink', domains: ['boostylink.com', 'boosty.link'] },
    { name: 'Lockr', domains: ['lockr.com', 'lockr.me', 'lockr.net', 'lockr.so'] },
    { name: 'Linkunlocker', domains: ['linkunlocker.com'] },
    { name: 'Link-unlock', domains: ['link-unlock.com', 'linkunlock.com'] },
    { name: 'Arolinks', domains: ['arolinks.com', 'arolink.net'] },
    { name: 'Tpi.li', domains: ['tpi.li'] },
    { name: 'Socialwolvez', domains: ['socialwolvez.com', 'social-wolvez.com'] },
    { name: 'Recognized', domains: ['recognized.link', 'recognized.com', 'rekonise.com', 'rekonise'] },
    { name: 'Pastebin', domains: ['pastebin.com'] },
    { name: 'Paste-Drop', domains: ['paste-drop.com', 'pastedrop.com'] },
    { name: 'Pastefy', domains: ['pastefy.app', 'pastefy.ga'] },
    { name: 'Rentry', domains: ['rentry.co', 'rentry.org'] },
    { name: 'Sub2Unlock', domains: ['sub2unlock.com', 'sub2unlock.net', 'sub2unlock.io', 'sub2unlock.me'] },
    { name: 'Sub4Unlock', domains: ['sub4unlock.com', 'sub4unlock.io', 'sub4unlock.net', 'sub4unlock.org'] },
    { name: 'Boostellar', domains: ['boostellar.com', 'bstlar.com', 'bstshrt.com', 'bst.gg'] },
    { name: 'Scriptpastebins', domains: ['scriptpastebin.com', 'scriptpastebins.com'] },
    { name: 'Robloxscripts', domains: ['robloxscripts.com', 'roblox-scripts.com'] },
    { name: 'Loanbuzz', domains: ['loanbuzz.net', 'loanbuzz.com', 'lnbz.la'] },
    { name: 'Linkzy', domains: ['linkzy.net', 'linkzy.com'] },
    { name: 'Ez4Short', domains: ['ez4short.com'] },
    { name: 'Link4Sub', domains: ['link4sub.com'] },
    { name: 'link2unlock', domains: ['link2unlock.com', 'link2unlock.net'] },
    { name: 'Subnise', domains: ['subnise.com'] },
    { name: 'Idnesfspublic', domains: ['idnesfspublic.com'] },
    { name: 'Gzenx', domains: ['gzenx.com', 'gzen.xyz'] },
    { name: 'Delta', domains: ['deltaexploits.net', 'gateway.deltaexploits.net', 'delta-executor.com'] },
    { name: 'Fluxus', domains: ['fluxteam.net', 'fluxteam.org', 'fluxteam.lat'] },
    { name: 'Arceus', domains: ['spdmteam.com', 'spdmteam.org'] },
    { name: 'Vegax', domains: ['vegax.gg'] },
    { name: 'KRNL', domains: ['krnl.place', 'krnl.vip'] },
    { name: 'Linkify', domains: ['linkify.im', 'linkify.ru'] },
    { name: 'Shrink', domains: ['shrink.pe', 'shrinkme.io', 'shrinke.me'] },
    { name: 'Mboost', domains: ['mboost.me'] },
    { name: 'Fly.inc', domains: ['fly.inc'] }
];

function isSupportedBypassSite(url) {
    if (!url || typeof url !== 'string') return null;
    const lower = url.toLowerCase().trim();
    for (const site of SUPPORTED_BYPASS_SITES) {
        for (const domain of site.domains) {
            if (lower.includes(domain)) return site;
        }
    }
    return null;
}

function isPlatoRelayLink(url) {
    if (!url || typeof url !== 'string') return false;
    const l = url.toLowerCase();
    return l.includes('platorelay') ||
           l.includes('paltorelay') ||
           l.includes('platoboost') ||
           l.includes('auth.platorelay');
}

function filterRipLinkvertise(url) {
    if (!url || typeof url !== 'string') return url;
    const lower = url.toLowerCase();
    if (!lower.includes('rip.linkvertis.lol') && !lower.includes('linkvertis.lol')) {
        return url;
    }
    try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        for (const param of ['url', 'target', 'link', 'dest', 'destination', 'r', 'redirect']) {
            const val = parsed.searchParams.get(param);
            if (val && (val.startsWith('http://') || val.startsWith('https://'))) {
                return decodeURIComponent(val);
            }
        }
    } catch (e) {}

    const matches = url.match(/https?%3A%2F%2F[^\s&"']+|https?:\/\/(?!rip\.linkvertis\.lol)[^\s&"']+/gi);
    if (matches && matches.length > 0) {
        return decodeURIComponent(matches[matches.length - 1]);
    }
    return null;
}


let bypassLinkCookieJar = {};
function mergeLinkCookies(res) {
  const setCookies = res.headers.raw ? res.headers.raw()['set-cookie'] : (res.headers.getSetCookie ? res.headers.getSetCookie() : null);
  if (!setCookies) return;
  for (const cookie of setCookies) {
    const [pair] = cookie.split(';');
    const idx = pair.indexOf('=');
    if (idx > 0) bypassLinkCookieJar[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
  }
}
function getLinkCookieHeader() { return Object.entries(bypassLinkCookieJar).map(([k, v]) => `${k}=${v}`).join('; '); }
async function fetchLinkWithCookies(url, options = {}) {
  const headers = { 'authority': 'bypass-link.com', 'accept': '*/*', 'content-type': 'application/json', 'origin': 'https://bypass-link.com', 'referer': 'https://bypass-link.com/', 'user-agent': 'Mozilla/5.0', ...(options.headers || {}) };
  const ck = getLinkCookieHeader(); if (ck) headers.cookie = ck;
  const res = await fetch(url, { ...options, headers }); mergeLinkCookies(res); return res;
}
async function bypassWithLinkCom(link, timeoutMs = 15000) {
  try {
    console.log(`[LinkCom] Trying: ${link.slice(0, 60)}...`);
    await fetchLinkWithCookies('https://bypass-link.com/', { method: 'GET', signal: AbortSignal.timeout(timeoutMs) }).catch(()=>{});
    for (let attempt = 1; attempt <= 3; attempt++) {
        const tokenRes = await fetchLinkWithCookies('https://bypass-link.com/api/token', { method: 'GET', signal: AbortSignal.timeout(timeoutMs) });
        if (tokenRes.status !== 200) continue;
        const tokenData = await tokenRes.json().catch(() => null);
        if (!tokenData || !tokenData.token) continue;
        const res = await fetchLinkWithCookies('https://bypass-link.com/api/bypass', { method: 'POST', body: JSON.stringify({ url: link, bypass_token: tokenData.token }), signal: AbortSignal.timeout(timeoutMs) });
        const data = await res.json().catch(() => null);
        if (data && data.success) {
            const rawKey = data.url || data.result || data.bypassed || data.link || data.destination;
            if (rawKey && typeof rawKey === 'string') return { bypassedLink: rawKey, error: null };
        }
    }
  } catch (err) { console.log(`[LinkCom] ❌ Failed: ${err.message}`); }
  return { bypassedLink: null, error: 'LinkCom failed' };
}

async function bypassDeltaLink(deltaLink, userIdentifier = null) {
    if (!deltaLink || typeof deltaLink !== 'string') return { bypassedLink: null, error: 'الرابط غير صالح.' };
    const cleanLink = deltaLink.trim();

    // إذا كان الرابط تابعاً لـ PlatoRelay -> استخدام الملف الآخر مباشرة بدون سباق
    if (isPlatoRelayLink(cleanLink)) {
        console.log(`⚡ [PlatoRelay Engine] Detected Plato link, using platorelayBypass.js directly...`);
        try {
            const res = await fetchPlatoKey(cleanLink);
            if (res && res.key && res.key !== 'KEY_NOT_FOUND') {
                return { bypassedLink: res.key, error: null };
            }
            return { bypassedLink: null, isGoogleAuthError: true };
        } catch (err) {
            console.error('[PlatoRelay Direct Error]:', err.message);
            return { bypassedLink: null, isGoogleAuthError: true };
        }
    }

    console.log(`⚡ [Race Engine] Starting bypass race for: ${cleanLink.slice(0, 60)}...`);

    const runPeBypasser = async () => {
        const res = await fetchPeBypasser(cleanLink, 15000);
        if (res && res.bypassedLink) {
            console.log(`
================ [WINNER: PE BYPASSER] ================
`);
            return { source: 'PE_Bypasser', link: res.bypassedLink };
        }
        throw new Error('PE Bypasser failed');
    };

    const runLinkCom = async () => {
        const res = await bypassWithLinkCom(cleanLink, 15000);
        if (res && res.bypassedLink) {
            console.log(`
================ [WINNER: LINKCOM] ================
`);
            return { source: 'LinkCom', link: res.bypassedLink };
        }
        throw new Error('LinkCom failed');
    };

    let winner = null;
    try {
        winner = await Promise.race([runPeBypasser(), runLinkCom()]);
    } catch (e) {
        console.log(`[Race Engine] Both methods failed. Trying fallback (3 attempts each)...`);
        for (let i = 1; i <= 3; i++) {
            try {
                console.log(`[Fallback] PE Bypasser Attempt ${i}...`);
                winner = await runPeBypasser();
                if (winner) break;
            } catch (err) {}
        }
        if (!winner) {
            for (let i = 1; i <= 3; i++) {
                try {
                    console.log(`[Fallback] LinkCom Attempt ${i}...`);
                    winner = await runLinkCom();
                    if (winner) break;
                } catch (err) {}
            }
        }
    }

    if (winner && winner.link) {
        let authResult = filterRipLinkvertise(winner.link);
        if (!authResult) return { bypassedLink: null, error: 'تعذر استخراج رابط صالح.' };
        if (!authResult.startsWith('http')) return { bypassedLink: authResult, error: null };
        
        if (isPlatoRelayLink(authResult)) {
            try {
                const res = await fetchPlatoKey(authResult);
                if (res && res.key && res.key !== 'KEY_NOT_FOUND') return { bypassedLink: res.key, error: null };
            } catch (err) {}
            return { bypassedLink: authResult, error: null };
        }
        return { bypassedLink: authResult, error: null };
    }
    return { bypassedLink: null, error: 'فشلت جميع المحاولات في تخطي الرابط.' };
}
global.bypassDeltaLink = bypassDeltaLink;

global.bypassDeltaLink = bypassDeltaLink;

// ==================== DASHBOARD & BOT API SECRET KEY ENGINE ====================

function parseDuration(input) {
    if (!input || typeof input !== 'string') return null;
    const str = input.trim().toLowerCase();

    // Infinite / Lifetime keywords
    if (['دائم', 'دائمي', 'مفتوح', 'ابد', 'ابدي', 'ابديا', 'lifetime', 'forever', 'unlimited', 'infinity', 'inf'].includes(str)) {
        return { ms: null, isLifetime: true, label: 'دائم (غير محدد الصلاحية)', raw: str };
    }

    // Direct words
    if (['ساعة', 'ساعه', 'hour', '1h'].includes(str)) return { ms: 3600 * 1000, isLifetime: false, label: 'ساعة واحدة', raw: str };
    if (['ساعتين', '2h'].includes(str)) return { ms: 2 * 3600 * 1000, isLifetime: false, label: 'ساعتان', raw: str };
    if (['يوم', 'day', '1d'].includes(str)) return { ms: 86400 * 1000, isLifetime: false, label: 'يوم واحد (24 ساعة)', raw: str };
    if (['يومين', '2d'].includes(str)) return { ms: 2 * 86400 * 1000, isLifetime: false, label: 'يومان (48 ساعة)', raw: str };
    if (['اسبوع', 'أسبوع', 'week', '1w'].includes(str)) return { ms: 7 * 86400 * 1000, isLifetime: false, label: 'أسبوع واحد (7 أيام)', raw: str };
    if (['اسبوعين', 'أسبوعين', '2w'].includes(str)) return { ms: 14 * 86400 * 1000, isLifetime: false, label: 'أسبوعان (14 يوم)', raw: str };
    if (['شهر', 'month', '1m', '1mo'].includes(str)) return { ms: 30 * 86400 * 1000, isLifetime: false, label: 'شهر واحد (30 يوم)', raw: str };
    if (['شهرين', '2m', '2mo'].includes(str)) return { ms: 60 * 86400 * 1000, isLifetime: false, label: 'شهران (60 يوم)', raw: str };
    if (['سنة', 'سنه', 'عام', 'year', '1y'].includes(str)) return { ms: 365 * 86400 * 1000, isLifetime: false, label: 'سنة واحدة (365 يوم)', raw: str };
    if (['سنتين', 'عامين', '2y'].includes(str)) return { ms: 730 * 86400 * 1000, isLifetime: false, label: 'سنتان (730 يوم)', raw: str };

    // Regex match: number + unit
    const match = str.match(/^(\d+)\s*([a-zأ-ي]+)?$/i);
    if (match) {
        const num = parseInt(match[1], 10);
        const unit = (match[2] || 'd').toLowerCase();

        if (['h', 'hr', 'hrs', 'hour', 'hours', 'ساعة', 'ساعه', 'ساعات'].includes(unit)) {
            return { ms: num * 3600 * 1000, isLifetime: false, label: `${num} ساعة`, raw: str };
        }
        if (['d', 'day', 'days', 'يوم', 'ايام', 'أيام'].includes(unit)) {
            return { ms: num * 86400 * 1000, isLifetime: false, label: `${num} يوم`, raw: str };
        }
        if (['w', 'wk', 'wks', 'week', 'weeks', 'اسبوع', 'أسبوع', 'اسابيع', 'أسابيع'].includes(unit)) {
            return { ms: num * 7 * 86400 * 1000, isLifetime: false, label: `${num} أسبوع`, raw: str };
        }
        if (['m', 'mo', 'mos', 'mon', 'month', 'months', 'شهر', 'شهور', 'اشهر', 'أشهر'].includes(unit)) {
            return { ms: num * 30 * 86400 * 1000, isLifetime: false, label: `${num} شهر`, raw: str };
        }
        if (['y', 'yr', 'yrs', 'year', 'years', 'سنة', 'سنه', 'سنين', 'سنوات', 'عام', 'أعوام'].includes(unit)) {
            return { ms: num * 365 * 86400 * 1000, isLifetime: false, label: `${num} سنة`, raw: str };
        }
    }

    return null;
}

function formatRemainingTime(expiresAt) {
    if (!expiresAt || expiresAt === 'lifetime') return 'دائم ♾️ (غير محدد)';
    const remainingMs = expiresAt - Date.now();
    if (remainingMs <= 0) return 'منتهي الصلاحية ❌';

    const days = Math.floor(remainingMs / (24 * 3600 * 1000));
    const hours = Math.floor((remainingMs % (24 * 3600 * 1000)) / (3600 * 1000));
    const minutes = Math.floor((remainingMs % (3600 * 1000)) / (60 * 1000));

    const parts = [];
    if (days > 0) parts.push(`${days} يوم`);
    if (hours > 0) parts.push(`${hours} ساعة`);
    if (minutes > 0 && days === 0) parts.push(`${minutes} دقيقة`);
    return parts.join(' و ') || 'أقل من دقيقة';
}

function getApiKeys() {
    const db = getDB();
    if (!db.apiKeys) {
        db.apiKeys = {};
        saveDB(db);
    }
    return db.apiKeys;
}

function createApiKey({ durationStr = '1d', name = '', createdBy = 'Owner' } = {}) {
    const parsed = parseDuration(durationStr) || { ms: 86400 * 1000, isLifetime: false, label: 'يوم واحد (24 ساعة)', raw: '1d' };
    const db = getDB();
    if (!db.apiKeys) db.apiKeys = {};

    const rawKey = `ntl_sec_${crypto.randomBytes(16).toString('hex')}`;
    const expiresAt = parsed.isLifetime ? 'lifetime' : Date.now() + parsed.ms;

    const keyObj = {
        key: rawKey,
        name: name || `مفتاح API #${Object.keys(db.apiKeys).length + 1}`,
        createdAt: Date.now(),
        expiresAt,
        durationRaw: durationStr,
        durationLabel: parsed.label,
        totalUses: 0,
        lastUsedAt: null,
        createdBy,
        active: true
    };

    db.apiKeys[rawKey] = keyObj;
    saveDB(db);
    return { key: rawKey, keyObj, parsed };
}

function renewApiKey(key, durationStr) {
    const db = getDB();
    if (!db.apiKeys || !db.apiKeys[key]) return null;

    const currentObj = db.apiKeys[key];
    const durToUse = durationStr || currentObj.durationRaw || '30d';
    const parsed = parseDuration(durToUse) || { ms: 30 * 86400 * 1000, isLifetime: false, label: 'شهر واحد (30 يوم)', raw: '30d' };

    const expiresAt = parsed.isLifetime ? 'lifetime' : Date.now() + parsed.ms;
    currentObj.expiresAt = expiresAt;
    currentObj.durationRaw = durToUse;
    currentObj.durationLabel = parsed.label;
    currentObj.active = true;

    saveDB(db);
    return { keyObj: currentObj, parsed };
}

function editApiKeyDuration(key, durationStr) {
    const db = getDB();
    if (!db.apiKeys || !db.apiKeys[key]) return null;

    const currentObj = db.apiKeys[key];
    const parsed = parseDuration(durationStr);
    if (!parsed) return null;

    const expiresAt = parsed.isLifetime ? 'lifetime' : Date.now() + parsed.ms;
    currentObj.expiresAt = expiresAt;
    currentObj.durationRaw = durationStr;
    currentObj.durationLabel = parsed.label;
    currentObj.active = true;

    saveDB(db);
    return { keyObj: currentObj, parsed };
}

function deleteApiKey(key) {
    const db = getDB();
    if (!db.apiKeys || !db.apiKeys[key]) return false;
    delete db.apiKeys[key];
    saveDB(db);
    return true;
}

function validateApiKey(key) {
    if (!key || typeof key !== 'string') {
        return { valid: false, code: 'MISSING_SECRET_KEY', error: '❌ مفتاح API السري مفقود.' };
    }
    const cleanKey = key.trim();
    const db = getDB();
    const keys = db.apiKeys || {};
    const keyObj = keys[cleanKey];

    if (!keyObj || keyObj.active === false) {
        return { valid: false, code: 'INVALID_SECRET_KEY', error: '❌ مفتاح API السري غير صالح أو غير مسجل في النظام.' };
    }

    if (keyObj.expiresAt && keyObj.expiresAt !== 'lifetime' && Date.now() > keyObj.expiresAt) {
        return {
            valid: false,
            code: 'EXPIRED_SECRET_KEY',
            error: '❌ انتهت صلاحية مفتاح الـ API. يرجى تجديد المفتاح عبر البوت (-api تجديد).',
            keyObj
        };
    }

    return { valid: true, keyObj, key: cleanKey };
}

function recordApiKeyUsage(key) {
    try {
        const cleanKey = typeof key === 'string' ? key.trim() : '';
        const db = getDB();
        if (db.apiKeys && db.apiKeys[cleanKey]) {
            db.apiKeys[cleanKey].totalUses = (db.apiKeys[cleanKey].totalUses || 0) + 1;
            db.apiKeys[cleanKey].lastUsedAt = Date.now();
            saveDB(db);
        }
    } catch (e) {}
}

global.parseDuration = parseDuration;
global.formatRemainingTime = formatRemainingTime;
global.getApiKeys = getApiKeys;
global.createApiKey = createApiKey;
global.renewApiKey = renewApiKey;
global.editApiKeyDuration = editApiKeyDuration;
global.deleteApiKey = deleteApiKey;
global.validateApiKey = validateApiKey;
global.recordApiKeyUsage = recordApiKeyUsage;

// ==================== SCRIPT SEARCH MODULE ====================

const scriptSearchCache = new TTLCache({ ttlMs: 30 * 60 * 1000, max: 200 });

function buildScriptContainer(script, currentIndex, totalScripts, msgId, prefix) {
    const hasKey = script.key ? 'Yes' : 'No';
    const isTrusted = (script.verified || script.owner?.isVerified) ? 'Yes' : 'No';
    const title = script.title || 'Untitled';
    const gameName = script.game?.name || 'Roblox';
    const views = script.views || 0;
    const likes = script.likeCount || 0;
    const scriptCode = script.script || '';

    let imgUrl = null;
    if (script.image && typeof script.image === 'string') {
        imgUrl = script.image.startsWith('http') ? script.image : `https://scriptblox.com${script.image}`;
    } else if (script.game?.imageUrl && typeof script.game.imageUrl === 'string') {
        imgUrl = script.game.imageUrl.startsWith('http') ? script.game.imageUrl : `https://scriptblox.com${script.game.imageUrl}`;
    }

    const separator = '-#  ~~                                                                                                                                                                   ~~';

    const textContent =
        `### **${title}**\n` +
        `**${gameName}**\n` +
        `${separator}\n` +
        `>>> \n` +
        `**Views <:eye:1535978311887355946> : \`${views}\`**\n` +
        `**Likes <:like:1535979334370590760> : \`${likes}\`**\n` +
        `**Key <:key:1535983304249974915> : \`${hasKey}\`**\n` +
        `**Trusted <:Trust:1535979763284578354> : \`${isTrusted}\`**\n` +
        `${separator}\n` +
        `\`${scriptCode}\`\n` +
        `${separator}`;

    const container = new ContainerBuilder()
        .setAccentColor(0x2b2d31)
        .addTextDisplayComponents(td => td.setContent(textContent));

    if (imgUrl) {
        container.addMediaGalleryComponents(mg => mg.addItems(i => i.setURL(imgUrl)));
    }

    container.addTextDisplayComponents(td => td.setContent(separator));

    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setEmoji('1517590248501022791')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/hBvzFrqQP2'),
        new ButtonBuilder()
            .setCustomId(`script_guide_${msgId}`)
            .setLabel('Usage Guide')
            .setEmoji('1535980867539697714')
            .setStyle(ButtonStyle.Secondary)
    );

    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`script_nav_left_${msgId}`)
            .setEmoji('1535982052632035429')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentIndex <= 0),
        new ButtonBuilder()
            .setCustomId(`script_nav_right_${msgId}`)
            .setEmoji('1535982050455060520')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentIndex >= totalScripts - 1)
    );

    container.addActionRowComponents(row1);
    container.addTextDisplayComponents(td => td.setContent(separator));
    container.addActionRowComponents(row2);

    const footerText = `-# ${currentIndex + 1}/${totalScripts}`;
    container.addTextDisplayComponents(td => td.setContent(footerText));

    return container;
}

const scriptSearchApiCache = new TTLCache({ ttlMs: 10 * 60 * 1000, max: 100 });

async function handleScriptSearchMessage(message) {
    if (!message.guildId || message.author.bot) return false;

    const db = getDB();
    const scriptSys = db[message.guildId]?.scriptSystem;
    
    if (!scriptSys || !scriptSys.enabled || message.channelId !== scriptSys.channelId) {
        return false;
    }

    const prefix = scriptSys.prefix || 'سكربت';
    const content = message.content.trim();

    if (!content.toLowerCase().startsWith(prefix.toLowerCase())) {
        return false;
    }

    let rawQuery = content.slice(prefix.length).trim();
    if (!rawQuery) {
        return false;
    }

    const searchMsg = await message.channel.send({
        content: `<a:Search:1535951004552532008> | **Searching for \`${rawQuery}\`...**`
    }).catch(() => null);

    if (!searchMsg) return true;

    try {
        let filterKey = 'all';
        let cleanQuery = rawQuery;

        if (/بدون\s*مفتاح|keyless|no\s*key|بدون\s*كود/i.test(cleanQuery)) {
            filterKey = 'no';
            cleanQuery = cleanQuery.replace(/بدون\s*مفتاح|keyless|no\s*key|بدون\s*كود/gi, '').trim();
        } else if (/مفتاح|with\s*key|\bkey\b/i.test(cleanQuery)) {
            filterKey = 'yes';
            cleanQuery = cleanQuery.replace(/مفتاح|with\s*key|\bkey\b/gi, '').trim();
        }

        const effectiveQuery = cleanQuery || rawQuery;

        // إذا كان البحث باللغة العربية
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(effectiveQuery)) {
            await searchMsg.edit({
                content: `**اكتب اسم بلانجليزي يابشر جاي تتمنقل علي؟**`
            }).catch(() => {});
            return true;
        }

        const cleanQueryLower = effectiveQuery.toLowerCase();
        const cacheKey = `${filterKey}:${cleanQueryLower}`;
        const now = Date.now();

        if (scriptSearchApiCache.has(cacheKey)) {
            const cached = scriptSearchApiCache.get(cacheKey);
            if (now - cached.timestamp < 10 * 60 * 1000) {
                const finalScripts = cached.scripts;
                if (!finalScripts || finalScripts.length === 0) {
                    await searchMsg.edit({
                        content: `❌ | **No scripts found for \`${rawQuery}\`**`
                    }).catch(() => {});
                    return true;
                }
                scriptSearchCache.set(searchMsg.id, {
                    scripts: finalScripts,
                    currentIndex: 0,
                    prefix,
                    authorId: message.author.id,
                    channelId: message.channel.id
                });
                const container = buildScriptContainer(finalScripts[0], 0, finalScripts.length, searchMsg.id, prefix);
                await searchMsg.edit({
                    content: null,
                    components: [container.toJSON()],
                    flags: [MessageFlags.IsComponentsV2]
                }).catch(() => {});
                return true;
            }
        }

        let allScripts = [];
        const seen = new Set();
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

        const queryWords = cleanQueryLower.split(/\s+/).filter(w => w.length > 1);

        function getRelevanceScore(title, gameName, desc) {
            const t = (title || '').toLowerCase();
            const g = (gameName || '').toLowerCase();
            const d = (desc || '').toLowerCase();

            let score = 0;
            if (g === cleanQueryLower || t === cleanQueryLower) score += 250;
            if (g.includes(cleanQueryLower)) score += 180;
            if (t.includes(cleanQueryLower)) score += 120;

            if (queryWords.length > 0) {
                const matchCount = queryWords.filter(w => g.includes(w) || t.includes(w)).length;
                score += matchCount * 40;
                if (d.includes(cleanQueryLower)) score += 25;
            }

            // Prioritize map-specific scripts over generic hubs
            if (/hub|universal|all games|multi/i.test(t) && !g.includes(cleanQueryLower)) {
                score -= 30;
            }

            return Math.max(0, score);
        }

        // 1. Check manual scripts
        const manualScripts = getManualScripts();
        manualScripts.forEach(s => {
            const score = getRelevanceScore(s.title, s.game?.name, s.description);
            if (score > 0) {
                const uid = s.id || s.script;
                if (!seen.has(uid)) {
                    seen.add(uid);
                    allScripts.push({ ...s, score: score + 100 });
                }
            }
        });

        // 2. Massive multi-source parallel search across 30+ sources and pages
        const fetchPromises = [
            // ScriptBlox Pages 1 to 5
            ...[1, 2, 3, 4, 5].map(p =>
                axios.get(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(effectiveQuery)}&page=${p}`, {
                    headers: { 'User-Agent': userAgent },
                    timeout: 4000
                }).then(r => ({ type: 'scriptblox', data: r.data?.result?.scripts || [] })).catch(() => ({ type: 'scriptblox', data: [] }))
            ),
            // ScriptBlox Trending Pages 1 to 3
            ...[1, 2, 3].map(p =>
                axios.get(`https://scriptblox.com/api/script/trending?page=${p}`, {
                    headers: { 'User-Agent': userAgent },
                    timeout: 4000
                }).then(r => ({ type: 'scriptblox_trending', data: r.data?.result?.scripts || [] })).catch(() => ({ type: 'scriptblox_trending', data: [] }))
            ),
            // Rscripts Pages 1 to 5
            ...[1, 2, 3, 4, 5].map(p =>
                axios.get(`https://rscripts.net/api/v2/scripts?page=${p}&q=${encodeURIComponent(effectiveQuery)}`, {
                    headers: { 'User-Agent': userAgent },
                    timeout: 4000
                }).then(r => ({ type: 'rscripts', data: r.data?.scripts || [] })).catch(() => ({ type: 'rscripts', data: [] }))
            ),
            // WeAreDevs search
            axios.get(`https://wearedevs.net/api/scripts/search?s=${encodeURIComponent(effectiveQuery)}`, {
                headers: { 'User-Agent': userAgent },
                timeout: 4000
            }).then(r => ({ type: 'wad', data: r.data?.scripts || (Array.isArray(r.data) ? r.data : []) })).catch(() => ({ type: 'wad', data: [] })),

            // RobloxScripts API
            axios.get(`https://robloxscripts.com/api/v1/scripts?search=${encodeURIComponent(effectiveQuery)}`, {
                headers: { 'User-Agent': userAgent },
                timeout: 4000
            }).then(r => ({ type: 'robloxscripts', data: r.data?.scripts || r.data || [] })).catch(() => ({ type: 'robloxscripts', data: [] })),

            // ScriptBin search mirror
            axios.get(`https://scriptbin.cloud/api/search?q=${encodeURIComponent(effectiveQuery)}`, {
                headers: { 'User-Agent': userAgent },
                timeout: 4000
            }).then(r => ({ type: 'scriptbin', data: r.data?.results || r.data || [] })).catch(() => ({ type: 'scriptbin', data: [] }))
        ];

        const sourceResults = await Promise.all(fetchPromises);

        for (const res of sourceResults) {
            if (res.type === 'rscripts') {
                for (const s of res.data) {
                    const title = s.title || 'Untitled';
                    const gameTitle = s.game?.title || s.game?.name || '';
                    const score = getRelevanceScore(title, gameTitle, s.description);
                    if (score > 0) {
                        const scriptCode = s.rawScript
                            ? (s.rawScript.startsWith('http') ? `loadstring(game:HttpGet("${s.rawScript}"))()` : s.rawScript)
                            : '';
                        if (!scriptCode) continue;

                        const uid = s._id || s.slug || scriptCode;
                        if (!seen.has(uid)) {
                            seen.add(uid);
                            allScripts.push({
                                title,
                                game: { 
                                    name: gameTitle || "Roblox", 
                                    imageUrl: s.game?.imgurl || s.image || "" 
                                },
                                key: !!s.keySystem,
                                verified: true,
                                views: s.views || 0,
                                likeCount: s.likes || 0,
                                script: scriptCode,
                                image: s.image || s.game?.imgurl || "",
                                source: "Rscripts",
                                id: s._id || s.slug,
                                score
                            });
                        }
                    }
                }
            } else if (res.type === 'wad') {
                for (const s of res.data) {
                    const title = s.name || s.title || 'Untitled';
                    const score = getRelevanceScore(title, effectiveQuery, s.description);
                    if (score > 0) {
                        const scriptCode = s.raw
                            ? (s.raw.startsWith('http') ? `loadstring(game:HttpGet("${s.raw}"))()` : s.raw)
                            : '';
                        if (!scriptCode) continue;

                        const uid = s._id || s.id || scriptCode;
                        if (!seen.has(uid)) {
                            seen.add(uid);
                            allScripts.push({
                                title,
                                game: { name: effectiveQuery, imageUrl: "" },
                                key: false,
                                verified: true,
                                views: s.views || 0,
                                likeCount: 0,
                                script: scriptCode,
                                source: "WeAreDevs",
                                id: s._id || s.id,
                                score
                            });
                        }
                    }
                }
            } else if (res.type === 'scriptblox' || res.type === 'scriptblox_trending') {
                for (const s of res.data) {
                    const title = s.title || 'Untitled';
                    const gameTitle = s.game?.name || '';
                    const score = getRelevanceScore(title, gameTitle, '');
                    if (score > 0 && s.script) {
                        const uid = s._id || s.id || s.script;
                        if (!seen.has(uid)) {
                            seen.add(uid);
                            allScripts.push({
                                title,
                                game: { name: gameTitle || "Roblox", imageUrl: s.game?.imageUrl || "" },
                                key: !!s.key,
                                verified: !!(s.verified || s.owner?.isVerified),
                                views: s.views || 0,
                                likeCount: s.likeCount || 0,
                                script: s.script,
                                source: "ScriptBlox",
                                id: uid,
                                score
                            });
                        }
                    }
                }
            }
        }

        // Sort by relevance score desc, then popularity (views/likes)
        allScripts.sort((a, b) => (b.score || 0) - (a.score || 0) || (b.views || 0) - (a.views || 0));

        if (allScripts.length === 0) {
            return searchMsg.edit({ content: `❌ | **No scripts found for \`${rawQuery}\`**` }).catch(() => {});
        }

        let filteredScripts = [...allScripts];
        if (filterKey === 'no') {
            filteredScripts = filteredScripts.filter(s => s.key === false);
        } else if (filterKey === 'yes') {
            filteredScripts = filteredScripts.filter(s => s.key === true);
        }

        let finalScripts = filteredScripts.length > 0 ? filteredScripts : allScripts;

        scriptSearchApiCache.set(cacheKey, { scripts: finalScripts, timestamp: now });

        if (!finalScripts || finalScripts.length === 0) {
            await searchMsg.edit({
                content: `❌ | **No scripts found for \`${rawQuery}\`**`
            }).catch(() => {});
            return true;
        }

        scriptSearchCache.set(searchMsg.id, {
            scripts: finalScripts,
            currentIndex: 0,
            prefix,
            authorId: message.author.id,
            rawQuery
        });

        const container = buildScriptContainer(finalScripts[0], 0, finalScripts.length, searchMsg.id, prefix);

        await searchMsg.edit({
            content: null,
            components: [container.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        }).catch(() => {});

    } catch (err) {
        console.error('[Script Search Exception]:', err);
        await searchMsg.edit({
            content: `❌ | **An error occurred while searching for scripts. Please try again later.**`
        }).catch(() => {});
    }

    return true;
}

// ==================== VIDEO DOWNLOADER MODULE ====================

function isVideoBuffer(buf) {
    if (!buf || !Buffer.isBuffer(buf) || buf.length < 500) return false;
    // JPEG magic bytes: FF D8 FF
    if (buf[0] === 0xFF && buf[1] === 0xD8 && buf[2] === 0xFF) return false;
    // PNG magic bytes: 89 50 4E 47
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47) return false;
    // GIF magic bytes: GIF8
    if (buf.toString('utf8', 0, 4) === 'GIF8') return false;
    // WEBP magic bytes: RIFF...WEBP
    if (buf.toString('utf8', 0, 4) === 'RIFF' && buf.toString('utf8', 8, 12) === 'WEBP') return false;
    // HTML / JSON / XML / text error page check
    const head = buf.toString('utf8', 0, 100).toLowerCase();
    if (head.includes('<!doc') || head.includes('<html') || head.includes('{"') || head.includes('error')) return false;
    return true;
}

async function downloadTikTokNoWatermark(url) {
    if (!url || (!url.includes('tiktok.com') && !url.includes('vt.tiktok.com'))) return null;
    try {
        const res = await axios.post('https://www.tikwm.com/api/', new URLSearchParams({ url, hd: '1' }), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 15000
        });
        if (res.data && res.data.code === 0 && res.data.data) {
            let videoUrl = res.data.data.hdplay || res.data.data.play;
            if (videoUrl) {
                if (!videoUrl.startsWith('http')) videoUrl = 'https://www.tikwm.com' + videoUrl;
                const vRes = await axios.get(videoUrl, {
                    responseType: 'arraybuffer',
                    timeout: 25000,
                    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
                });
                const buf = Buffer.from(vRes.data);
                if (isVideoBuffer(buf)) {
                    return { buffer: buf, filename: 'tiktok_video.mp4' };
                }
            }
        }
    } catch (e) {
        console.error('[TikTok Downloader Error]:', e.message);
    }
    return null;
}

async function downloadInstagramSaveInsta(target_url) {
    if (!target_url) return null;

    // Helper 1: Try SaveInsta / SnapInsta API
    const trySaveInstaDomains = async () => {
        const session = axios.create({
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });
        const domains = ['https://saveinsta.to', 'https://snapinsta.to', 'https://saveinsta.app', 'https://snapinsta.app'];
        for (const domain of domains) {
            try {
                const r1 = await session.get(`${domain}/en/highlights`, { timeout: 6000 });
                const scriptMatch = r1.data.match(/<script[^>]*>var\s+k_url_search=\"[^\"]+\"(.*?)<\/script>/s);
                if (!scriptMatch) continue;

                const block = scriptMatch[1];
                const k_exp = (block.match(/k_exp\s*=\s*\"([^\"]+)\"/) || [])[1];
                const k_token = (block.match(/k_token\s*=\s*\"([^\"]+)\"/) || [])[1];
                if (!k_exp || !k_token) continue;

                const r2 = await session.post(`${domain}/api/userverify`, new URLSearchParams({ url: target_url }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Origin': domain,
                        'Referer': `${domain}/en/video`
                    },
                    timeout: 6000
                });

                const cftoken = r2.data?.token;
                if (!cftoken) continue;

                const payload = new URLSearchParams({ k_exp, k_token, q: target_url, t: 'media', lang: 'en', v: 'v2', cftoken });
                const r3 = await session.post(`${domain}/api/ajaxSearch`, payload, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Origin': domain,
                        'Referer': `${domain}/en/highlights`
                    },
                    timeout: 8000
                });

                if (r3.data?.data) {
                    const html = r3.data.data;
                    const urls = [...html.matchAll(/href=\"(https?:\/\/[^\"]+)\"/g)].map(m => m[1]);
                    // STRICT filtering: only video links/extensions, NO images
                    const videoUrls = urls.filter(u => {
                        const low = u.toLowerCase();
                        if (low.includes('.jpg') || low.includes('.jpeg') || low.includes('.png') || low.includes('.webp') || low.includes('.gif')) return false;
                        return low.includes('snapcdn') || low.includes('.mp4') || low.includes('dl.snap') || low.includes('token=') || low.includes('video');
                    });

                    for (const vUrl of videoUrls) {
                        try {
                            const vRes = await session.get(vUrl, { responseType: 'arraybuffer', timeout: 25000 });
                            const buf = Buffer.from(vRes.data);
                            if (isVideoBuffer(buf)) {
                                return { buffer: buf, filename: 'instagram_video.mp4' };
                            }
                        } catch (e) {}
                    }
                }
            } catch (e) {}
        }
        return null;
    };

    // Helper 2: Try SnapSave JS Decoder
    const trySnapSave = async () => {
        try {
            const res = await axios.post('https://snapsave.app/action.php', new URLSearchParams({ url: target_url }), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Origin': 'https://snapsave.app',
                    'Referer': 'https://snapsave.app/'
                },
                timeout: 8000
            });
            const scriptText = res.data;
            const match = scriptText.match(/}\s*\(\s*"(.*?)"\s*,\s*(\d+)\s*,\s*"(.*?)"\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*\)/s);
            if (match) {
                const [_, h, uStr, n, tStr, eStr] = match;
                const u = parseInt(uStr, 10), t = parseInt(tStr, 10), e = parseInt(eStr, 10);
                function _0xe96c(d, e, f) {
                    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/";
                    const hStr = charset.slice(0, e), iStr = charset.slice(0, f);
                    const j = d.split("").reverse().reduce((a, b, c) => {
                        if (hStr.indexOf(b) !== -1) return a + hStr.indexOf(b) * (Math.pow(e, c));
                        return a;
                    }, 0);
                    let k = "", temp = j;
                    while (temp > 0) { k = iStr[temp % f] + k; temp = Math.floor((temp - (temp % f)) / f); }
                    return k || "0";
                }
                let decoded = "";
                for (let i = 0; i < h.length; i++) {
                    let s = "";
                    while (h[i] !== n[e]) { s += h[i]; i++; }
                    for (let j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j);
                    decoded += String.fromCharCode(parseInt(_0xe96c(s, e, 10), 10) - t);
                }
                decoded = decodeURIComponent(escape(decoded));

                const urls = [...decoded.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
                const videoUrls = urls.filter(u => {
                    const low = u.toLowerCase();
                    if (low.includes('.jpg') || low.includes('.jpeg') || low.includes('.png') || low.includes('.webp')) return false;
                    return low.includes('.mp4') || low.includes('snapcdn') || low.includes('token=');
                });
                for (const vUrl of videoUrls) {
                    try {
                        const vRes = await axios.get(vUrl, { responseType: 'arraybuffer', timeout: 20000 });
                        const buf = Buffer.from(vRes.data);
                        if (isVideoBuffer(buf)) {
                            return { buffer: buf, filename: 'instagram_video.mp4' };
                        }
                    } catch (e) {}
                }
            }
        } catch (e) {}
        return null;
    };

    // Helper 3: Try Instagram Mirrors (kkclip, ddinstagram, fxinstagram)
    const tryMirrors = async () => {
        const shortcodeMatch = target_url.match(/\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
        if (!shortcodeMatch) return null;
        const shortcode = shortcodeMatch[2];

        const mirrors = [
            `https://kkclip.com/reel/${shortcode}`,
            `https://ddinstagram.com/reel/${shortcode}`,
            `https://fxinstagram.com/reel/${shortcode}`,
            `https://vxinstagram.com/reel/${shortcode}`,
            `https://kkclip.com/p/${shortcode}`,
            `https://ddinstagram.com/p/${shortcode}`
        ];

        const userAgents = [
            'TelegramBot (like TwitterBot/2.0)',
            'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
            'Twitterbot/1.0',
            'WhatsApp/2.21.12.21 A'
        ];

        for (const m of mirrors) {
            for (const ua of userAgents) {
                try {
                    const res = await axios.get(m, {
                        headers: { 'User-Agent': ua },
                        maxRedirects: 5,
                        timeout: 5000
                    });
                    if (res.status === 200 && res.data) {
                        const videoMatch = res.data.match(/<meta\s+property="og:video"\s+content="([^"]+)"/i) ||
                                           res.data.match(/<meta\s+property="og:video:secure_url"\s+content="([^"]+)"/i) ||
                                           res.data.match(/<meta\s+name="twitter:player:stream"\s+content="([^"]+)"/i) ||
                                           res.data.match(/<source\s+src="([^"]+\.mp4[^"]*)"/i);
                        if (videoMatch) {
                            let vUrl = videoMatch[1].replace(/&amp;/g, '&');
                            if (!vUrl.startsWith('http')) vUrl = 'https:' + vUrl;
                            const vRes = await axios.get(vUrl, {
                                responseType: 'arraybuffer',
                                timeout: 25000,
                                headers: { 'User-Agent': 'Mozilla/5.0' }
                            });
                            const buf = Buffer.from(vRes.data);
                            if (isVideoBuffer(buf)) {
                                return { buffer: buf, filename: 'instagram_video.mp4' };
                            }
                        }
                    }
                } catch (e) {}
            }
        }
        return null;
    };

    // Helper 4: Try instagram-url-direct package
    const tryIGDirectPkg = async () => {
        try {
            const { instagramGetUrl } = require('instagram-url-direct');
            const res = await instagramGetUrl(target_url);
            if (res && res.url_list && res.url_list.length > 0) {
                for (const vUrl of res.url_list) {
                    try {
                        const vRes = await axios.get(vUrl, { responseType: 'arraybuffer', timeout: 25000 });
                        const buf = Buffer.from(vRes.data);
                        if (isVideoBuffer(buf)) {
                            return { buffer: buf, filename: 'instagram_video.mp4' };
                        }
                    } catch (e) {}
                }
            }
        } catch (e) {}
        return null;
    };

    try {
        let res = await trySaveInstaDomains();
        if (res) return res;

        res = await trySnapSave();
        if (res) return res;

        res = await tryMirrors();
        if (res) return res;

        res = await tryIGDirectPkg();
        if (res) return res;
    } catch (e) {
        console.error('[Instagram Downloader Error]:', e.message);
    }

    return null;
}

async function downloadYouTubeVideo(url) {
    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) return null;
    try {
        let ytdl;
        try {
            ytdl = require('@distube/ytdl-core');
        } catch (err) {
            console.log('[YouTube Downloader Notice]: @distube/ytdl-core package not installed on host.');
            return null;
        }
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo', filter: 'videoandaudio' }) || ytdl.chooseFormat(info.formats, { quality: 'lowest' });
        if (format && format.url) {
            const vRes = await axios.get(format.url, {
                responseType: 'arraybuffer',
                timeout: 30000,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            const buf = Buffer.from(vRes.data);
            if (isVideoBuffer(buf)) {
                return { buffer: buf, filename: 'youtube_video.mp4' };
            }
        }
    } catch (e) {
        console.error('[YouTube Downloader Error]:', e.message);
    }
    return null;
}

async function processVideoDownload(url) {
    const lower = url.toLowerCase();
    if (lower.includes('tiktok.com')) {
        return await downloadTikTokNoWatermark(url);
    }
    if (lower.includes('instagram.com') || lower.includes('instagr.am')) {
        return await downloadInstagramSaveInsta(url);
    }
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
        return await downloadYouTubeVideo(url);
    }
    return null;
}

/**
 * Uploads a given image URL to ImgBB and returns the permanent direct URL.
 * Falls back to the original URL if IMGBB_KEY is not defined or upload fails.
 * 
 * @param {string} imageUrl The temporary Discord attachment URL or other image URL
 * @returns {Promise<string>} The permanent ImgBB image URL
 */
/**
 * Saves a given image URL locally to the uploads folder and returns the local dashboard URL.
 * 
 * @param {string} imageUrl The temporary Discord attachment URL
 * @returns {Promise<string>} The local dashboard image URL
 */
async function saveImageLocally(imageUrl) {
    if (!imageUrl) return imageUrl;
    
    try {
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'arraybuffer'
        });
        
        const buffer = Buffer.from(response.data);
        const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.png`;
        const uploadsDir = path.join(__dirname, 'uploads');
        
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, buffer);
        
        const baseUrl = process.env.APP_URL || 'https://ntldashboard.pages.dev';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const fileId = fileName.replace('.png', '');
        
        return `${cleanBaseUrl}/image-${fileId}`;
    } catch (error) {
        console.error('Error saving image locally:', error.message);
        return imageUrl; // Fallback to original URL
    }
}

async function uploadToImgBB(imageUrl) {
    if (!imageUrl) return imageUrl;
    
    // Clean and validate URL
    imageUrl = imageUrl.trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        return imageUrl;
    }
    
    // If it's already uploaded to ImgBB, do not re-upload
    if (imageUrl.includes('imgbb.com')) {
        return imageUrl;
    }

    const apiKey = process.env.IMGBB_KEY || 'E664c19272197ad9ccedf89cb063a601';

    try {
        console.log(`[ImgBB]: Downloading image from: ${imageUrl}`);
        const response = await axios.get(imageUrl, { 
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        
        const buffer = Buffer.from(response.data);
        const form = new FormData();
        form.append('image', buffer, { filename: 'upload.png' });

        console.log('[ImgBB]: Uploading buffer to ImgBB API...');
        const uploadResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
            headers: form.getHeaders(),
            timeout: 15000
        });

        if (uploadResponse.data && uploadResponse.data.data && uploadResponse.data.data.url) {
            const permanentUrl = uploadResponse.data.data.url;
            console.log(`[ImgBB]: Upload successful! Permanent URL: ${permanentUrl}`);
            return permanentUrl;
        } else {
            throw new Error('Invalid response structure from ImgBB API');
        }
    } catch (error) {
        console.error('❌ [ImgBB Error]: Failed to upload image to ImgBB:', error.message || error);
        return imageUrl;
    }
}

function ensureGuildData(guildId) {
    const db = getDB();
    if (!db[guildId]) db[guildId] = { panels: {}, tickets: {}, counter: 0 };
    if (!db[guildId].panels) db[guildId].panels = {};
    if (!db[guildId].tickets) db[guildId].tickets = {};
    if (db[guildId].counter === undefined) db[guildId].counter = 0;
    if (!db[guildId].protection) db[guildId].protection = {};
    const prot = db[guildId].protection;
    if (!prot.permissions) prot.permissions = { enabled: false, punishment: 'kick', punishmentDuration: '' };
    if (!prot.roles) prot.roles = { enabled: false, punishment: 'kick', punishmentDuration: '' };
    if (!prot.channels) prot.channels = { enabled: prot.antiChannelRaid ?? false, punishment: prot.channelPunishment || 'kick', punishmentDuration: '' };
    if (!prot.bots) prot.bots = { enabled: prot.antiBot ?? false, punishment: prot.botPunishment || 'ban', punishmentDuration: '' };
    if (!prot.links) prot.links = { enabled: prot.antiLinks ?? false, punishment: prot.linkPunishment || 'timeout', punishmentDuration: '1h', exemptedChannels: [], exemptedCategories: [], warnMessage: '⚠️ | {user} يمنع إرسال الروابط حفاظاً على أمن السيرفر!', warnDuration: 10 };
    if (!prot.links.exemptedChannels) prot.links.exemptedChannels = [];
    if (!prot.links.exemptedCategories) prot.links.exemptedCategories = [];
    if (prot.links.warnMessage === undefined) prot.links.warnMessage = '⚠️ | {user} يمنع إرسال الروابط حفاظاً على أمن السيرفر!';
    if (prot.links.warnDuration === undefined) prot.links.warnDuration = 10;
    if (!prot.spam) prot.spam = { enabled: prot.antiSpam ?? false, punishment: prot.spamPunishment || 'timeout', punishmentDuration: '10m' };
    if (!db[guildId].violations) db[guildId].violations = [];
    if (!db[guildId].suggestions) db[guildId].suggestions = {};
    if (db[guildId].musicEnabled === undefined) db[guildId].musicEnabled = false;
    if (!db[guildId].obfuscation) db[guildId].obfuscation = { enabled: false, channelId: null };
    if (!db[guildId].ai) {
        db[guildId].ai = {
            name: 'غير محدد',
            avatar: 'غير محدد',
            status: 'غير متصل',
            channelId: null,
            categoryId: null,
            trainingType: null,
            knowledge: [],
            autoTrainedData: ''
        };
    }
    saveDB(db);
    return db;
}

function toArabicDigits(num) {
    const id = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().replace(/[0-9]/g, w => id[+w]);
}

function formatToArabicTime(timeStr) {
    let [hours, minutes] = timeStr.split(':');
    hours = parseInt(hours);
    const period = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12 || 12;
    return `${toArabicDigits(hours)}:${toArabicDigits(minutes)} ${period}`;
}

function fetchPrayerTimings(city, country, method, targetUrl = null) {
    return new Promise((resolve, reject) => {
        let finalUrl = targetUrl || `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
        const urlObj = new URL(finalUrl);
        const options = {
            hostname: urlObj.hostname,
            path: urlObj.pathname + urlObj.search,
            method: 'GET',
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        };
        https.get(options, res => {
            if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
                let redirectUrl = res.headers.location;
                if (!redirectUrl.startsWith('http')) redirectUrl = 'https://api.aladhan.com' + redirectUrl;
                return fetchPrayerTimings(null, null, null, redirectUrl).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) return reject(new Error(`API Error: ${res.statusCode}`));
                try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

function getPrayerCountryMenu() {
    const menu = new StringSelectMenuBuilder().setCustomId('select_prayer_country').setPlaceholder('اختر الدولة لعرض مواقيت الصلاة...');
    arabCountries.forEach(c => menu.addOptions({ label: c.label, value: c.value, emoji: c.emoji }));
    return new ActionRowBuilder().addComponents(menu);
}

async function generateAzkarCard(title, text, ref) {
    const width = 850, height = 360;
    const canvas = createCanvas(width, height), ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#5f4268'); grad.addColorStop(1, '#3b203d');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(width/2, height/2, 190, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(width/2, height/2, 240, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; ctx.font = '14px Cairo';
    ctx.fillText('FD', 40, 55); ctx.fillText('FA', 40, 75); ctx.strokeRect(35, 38, 30, 45);
    ctx.fillText('FD', width-70, height-65); ctx.fillText('FB', width-70, height-45); ctx.strokeRect(width-75, height-82, 30, 45);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'; ctx.font = '20px Cairo'; ctx.textAlign = 'center';
    ctx.fillText(title, width/2, 65);
    ctx.fillStyle = '#ffffff'; ctx.font = '22px Cairo';
    const words = text.split(' ');
    let line = '', lines = [], maxWidth = 720;
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) { lines.push(line); line = words[n] + ' '; }
        else line = testLine;
    }
    lines.push(line);
    const lh = 42;
    let startY = (height/2) - ((lines.length - 1)*lh/2) + 10;
    for (let i = 0; i < lines.length; i++) ctx.fillText(lines[i].trim(), width/2, startY + (i*lh));
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'; ctx.font = '12px Cairo';
    ctx.fillText(`NTL BOT • أذكار وأدعية مأثورة • المرجع: ${ref}`, width/2, height-25);
    return canvas.toBuffer('image/png');
}

async function generatePrayerCard(timingsData, countryLabel) {
    const width = 850, height = 480;
    const canvas = createCanvas(width, height), ctx = canvas.getContext('2d');
    const timings = timingsData.data.timings, hijri = timingsData.data.date.hijri, gregorian = timingsData.data.date.gregorian;
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#100c1e'); grad.addColorStop(1, '#231631');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    [[100, 80, 1.5], [230, 40, 2], [320, 100, 1], [450, 50, 2.5], [540, 120, 1.5], [620, 70, 2], [780, 90, 1]].forEach(([x, y, r]) => {
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur = 15; ctx.shadowColor = 'rgba(255, 215, 0, 0.4)'; ctx.fillStyle = '#ffd700';
    ctx.beginPath(); ctx.arc(710, 100, 32, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = '#100c1e';
    ctx.beginPath(); ctx.arc(696, 100, 32, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = 'rgba(12, 8, 22, 0.9)';
    ctx.beginPath(); ctx.moveTo(0, height); ctx.lineTo(0, height-30); ctx.lineTo(80, height-30); ctx.lineTo(80, height-130); ctx.lineTo(88, height-145); ctx.lineTo(96, height-130); ctx.lineTo(96, height-30); ctx.lineTo(340, height-30); ctx.arc(425, height-30, 85, Math.PI, 0, false); ctx.lineTo(510, height-30); ctx.lineTo(750, height-30); ctx.lineTo(750, height-130); ctx.lineTo(758, height-145); ctx.lineTo(766, height-130); ctx.lineTo(766, height-30); ctx.lineTo(width, height-30); ctx.lineTo(width, height); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(14, 10, 24, 0.95)';
    ctx.beginPath(); ctx.arc(245, height-52, 9, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(245, height-43); ctx.quadraticCurveTo(232, height-40, 225, height-20); ctx.lineTo(260, height-20); ctx.quadraticCurveTo(256, height-35, 250, height-40); ctx.closePath(); ctx.fill();
    ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff'; ctx.font = '24px Cairo';
    ctx.fillText(`مواقيت الصلاة في ${countryLabel}`, width/2, 60);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; ctx.font = '14px Cairo';
    ctx.fillText(`التاريخ الهجري: ${toArabicDigits(hijri.day)} ${hijri.month.ar} ${toArabicDigits(hijri.year)} هـ   |   الموافق: ${toArabicDigits(gregorian.date)} م`, width/2, 95);
    const prayers = [{ name: 'الفجر', key: 'Fajr' }, { name: 'الشروق', key: 'Sunrise' }, { name: 'الظهر', key: 'Dhuhr' }, { name: 'العصر', key: 'Asr' }, { name: 'المغرب', key: 'Maghrib' }, { name: 'العشاء', key: 'Isha' }];
    const cw = 118, ch = 170, sx = 35, cy = 150, gap = 15;
    prayers.forEach((p, idx) => {
        const x = sx + idx * (cw + gap);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x, cy, cw, ch, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffd700'; ctx.font = '18px Cairo'; ctx.fillText(p.name, x + cw/2, cy + 45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; ctx.beginPath(); ctx.moveTo(x + 20, cy + 75); ctx.lineTo(x + cw - 20, cy + 75); ctx.stroke();
        ctx.fillStyle = '#ffffff'; ctx.font = '15px Cairo'; ctx.fillText(formatToArabicTime(timings[p.key]), x + cw/2, cy + 120);
    });
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'; ctx.font = '12px Cairo';
    ctx.fillText('NTL BOT • أذكار وأدعية مأثورة • المرجع المعتمد رسمياً', width/2, height-12);
    return canvas.toBuffer('image/png');
}

function startAzkarScheduler(guildId, channelId, intervalMinutes, roleId = null) {
    // تم إلغاء ميزة الأذكار نهائياً بطلب من المستخدم
}

function initAzkar() {
    // تم إلغاء ميزة الأذكار نهائياً بطلب من المستخدم
}

global.reloadAzkar = function(guildId) {
    // تم إلغاء ميزة الأذكار نهائياً بطلب من المستخدم
};

async function getExecutor(guild, actionType) {
    try {
        const auditLogs = await guild.fetchAuditLogs({ limit: 1, type: actionType }).catch(err => {
            console.error(`❌ [Audit Logs Fetch Error] Guild "${guild.name}" (${guild.id}): Missing "View Audit Log" (VIEW_AUDIT_LOG) permission! Details:`, err.message);
            return null;
        });
        if (!auditLogs) return null;
        const entry = auditLogs.entries.first();
        if (entry && (Date.now() - entry.createdTimestamp < 15000)) return entry.executor;
    } catch (e) {
        console.error(`❌ Exception fetching Audit Logs:`, e.message);
    }
    return null;
}

function parseDurationForTimeout(str) {
    const match = str.match(/^(\d+)([smhd])$/);
    if (!match) return 3600000;
    const num = parseInt(match[1]), unit = match[2];
    if (unit === 's') return num * 1000;
    if (unit === 'm') return num * 60 * 1000;
    if (unit === 'h') return num * 3600000;
    if (unit === 'd') return num * 86400000;
    return 3600000;
}

async function applyPunishment(guild, executor, protectConfig, actionName, targetName) {
    if (!executor) return;
    console.log(`🛡️ [Protection Event Triggered] Guild: "${guild.name}" (${guild.id}) | Action: "${actionName}" | Target: "${targetName}" | Executor: ${executor.username} (${executor.id})`);

    if (executor.id === guild.ownerId) {
        console.log(`🛡️ [Protection Bypassed] Executor is Server Owner (${executor.username})`);
        return;
    }
    if (executor.id === client.user.id) {
        console.log(`🛡️ [Protection Bypassed] Executor is Bot itself (${executor.username})`);
        return;
    }

    const db = getDB();
    const globalWhitelistedRoles = db[guild.id]?.protection?.whitelistedRoles || [];
    const localWhitelistedRoles = protectConfig?.whitelistedRoles || [];
    const allWhitelistedRoles = [...new Set([...globalWhitelistedRoles, ...localWhitelistedRoles])];

    const member = await guild.members.fetch(executor.id).catch(err => {
        console.error(`❌ [Protection Fetch Error] Could not fetch member ${executor.id}:`, err.message);
        return null;
    });

    if (member) {
        if (allWhitelistedRoles.length > 0) {
            const hasWhitelistedRole = member.roles.cache.some(r => allWhitelistedRoles.includes(r.id));
            if (hasWhitelistedRole) {
                console.log(`🛡️ [Protection Bypassed] Executor ${executor.username} has a whitelisted role.`);
                return;
            }
        }

        const pun = protectConfig?.punishment || 'kick';
        console.log(`🛡️ [Applying Punishment] User: ${executor.username} | Punishment Type: ${pun}`);

        let punishmentTaken = 'لا يوجد عقوبة مطبقة';
        if (pun === 'none' || pun === 'none_delete' || pun === 'warn') {
            punishmentTaken = 'بدون عقوبة (حذف الرسالة والتحذير فقط)';
            console.log(`🛡️ [Protection - No Punishment] User: ${executor.username} had their message deleted without extra punishment.`);
        } else if (pun === 'ban') {
            try {
                await member.ban({ reason: `NTL Protection: ${actionName}` });
                punishmentTaken = 'بان (الحظر النهائي)';
                console.log(`✅ [Protection Success] Banned user ${executor.username}`);
            } catch (err) {
                punishmentTaken = `فشل الحظر: ${err.message}`;
                console.error(`❌ [Protection Error] Failed to ban ${executor.username}: ${err.message}. (Ensure bot has Ban Members permission and is higher in role hierarchy)`);
            }
        } else if (pun === 'kick') {
            try {
                await member.kick(`NTL Protection: ${actionName}`);
                punishmentTaken = 'طرد';
                console.log(`✅ [Protection Success] Kicked user ${executor.username}`);
            } catch (err) {
                punishmentTaken = `فشل الطرد: ${err.message}`;
                console.error(`❌ [Protection Error] Failed to kick ${executor.username}: ${err.message}. (Ensure bot has Kick Members permission)`);
            }
        } else if (pun === 'timeout') {
            const durationStr = protectConfig?.punishmentDuration || '1h';
            const ms = parseDurationForTimeout(durationStr);
            try {
                await member.timeout(ms, `NTL Protection: ${actionName}`);
                punishmentTaken = `تايم اوت لمدة ${durationStr}`;
                console.log(`✅ [Protection Success] Timed out user ${executor.username} for ${durationStr}`);
            } catch (err) {
                punishmentTaken = `فشل التايم اوت: ${err.message}`;
                console.error(`❌ [Protection Error] Failed to timeout ${executor.username}: ${err.message}. (Ensure bot has Moderate Members permission)`);
            }
        } else {
            try {
                await member.timeout(60000, `NTL Protection: ${actionName}`);
                punishmentTaken = 'تايم اوت تلقائي لمدة دقيقة واحدة';
                console.log(`✅ [Protection Success] Auto-timed out user ${executor.username}`);
            } catch (err) {
                punishmentTaken = `فشل التايم اوت: ${err.message}`;
                console.error(`❌ [Protection Error] Failed auto-timeout ${executor.username}: ${err.message}`);
            }
        }

        if (!db[guild.id].violations) db[guild.id].violations = [];
        const violationId = `${Date.now()}`;
        db[guild.id].violations.unshift({
            id: violationId,
            userId: executor.id,
            username: executor.username,
            action: actionName,
            targetName: targetName || 'غير معروف',
            punishmentTaken,
            timestamp: Date.now()
        });
        saveDB(db);
    } else {
        console.warn(`⚠️ [Protection Warning] Member ${executor.username} (${executor.id}) not found in guild.`);
    }
}

async function notifyOwnerStealthAlert(guild, executor, actionTitle, protectionName, channel) {
    try {
        if (!guild) return;
        const owner = await guild.fetchOwner().catch(() => null);
        if (!owner) return;
        const channelMention = channel ? `<#${channel.id}> (\`#${channel.name}\`)` : 'غير محدد';
        const em = new EmbedBuilder()
            .setColor('#ff2a2a')
            .setTitle('🚨 تنبيه أمني عاجل | محاولة تعطيل / تعديل نظام الحماية')
            .setDescription(
                `قام أحد المشرفين/الأعضاء بمحاولة **${actionTitle}** في سيرفر **${guild.name}**.\n` +
                `🛡️ **الإجراء التلقائي المتخذ:** تم إبقاء الحماية نشطة بالكامل والعقوبة الأصلية كما هي في الخلفية سراً دون إشعاره لمنع تخريب السيرفر.`
            )
            .addFields(
                { name: '👤 المنفذ (Who):', value: `${executor} (\`${executor.tag || executor.username}\`)\n**ID:** \`${executor.id}\``, inline: true },
                { name: '🛡️ الحماية المستهدفة:', value: `**${protectionName}**`, inline: true },
                { name: '📍 الروم (Where):', value: channelMention, inline: true },
                { name: '⏰ التوقيت (When):', value: `<t:${Math.floor(Date.now() / 1000)}:F>\n<t:${Math.floor(Date.now() / 1000)}:R>`, inline: false }
            )
            .setThumbnail(executor.displayAvatarURL?.({ dynamic: true }) || null)
            .setFooter({ text: `NTL Stealth Protection • ${guild.name}`, iconURL: guild.iconURL() || undefined })
            .setTimestamp();

        await owner.send({ embeds: [em] }).catch(err => {
            console.error(`[Stealth Alert DM Failed] Owner ${owner.user?.tag} has DMs closed:`, err.message);
        });
    } catch (e) {
        console.error('[Stealth Alert Exception]:', e);
    }
}

function getProtectionEmbedAndComponents(guildId) {
    ensureGuildData(guildId);
    const db = getDB(), protect = db[guildId].protection || {};
    const em = enabled => enabled ? '<:On:1517609916607762432>' : '<:Off:1517609914271404173>';
    const linkPunishLabel = protect.links?.punishment === 'none' ? 'بدون عقوبة (حذف فقط)' : (protect.links?.punishment || 'timeout');
    const embed = new EmbedBuilder().setColor('#2b2d31').setDescription(
        `**__نظام حماية السيرفر<:Protection:1517593219008036864>__**\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.permissions?.enabled)} | حماية الصلاحيات <:Permission:1517597160051441847>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.roles?.enabled)} | حماية الرتب <:rOle:1517597814572453928>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.channels?.enabled)} | حماية الرومات <:Hastag:1516365641823551528>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.bots?.enabled)} | حماية من البوتات <:bot:1517608154245103778>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.links?.enabled)} | حماية الروابط <:Link:1517608662774845531>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `${em(protect.spam?.enabled)} | حماية السبام <:1000097362:1517609132373442713>\n` +
        `-#  ~~                                                                                                                                                                   ~~\n` +
        `**الرومات المستثناة:** ${protect.links?.exemptedChannels?.length > 0 ? protect.links.exemptedChannels.map(id => `<#${id}>`).join(', ') : 'لا يوجد'}\n` +
        `**الكاتاجوريات المستثناة:** ${protect.links?.exemptedCategories?.length > 0 ? protect.links.exemptedCategories.map(id => `<#${id}>`).join(', ') : 'لا يوجد'}\n` +
        `**عقوبة الروابط:** \`${linkPunishLabel}\` | **مدة التحذير:** \`${protect.links?.warnDuration ?? 10} ثواني\`\n` +
        `-#  ~~                                                                                                                                                                   ~~`
    );
    const r1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('protect_manage_permissions').setLabel('حماية الصلاحيات').setEmoji('1517597160051441847').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('protect_manage_roles').setLabel('حماية الرتب').setEmoji('1517597814572453928').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('protect_manage_channels').setLabel('حماية الرومات').setEmoji('1516365641823551528').setStyle(ButtonStyle.Secondary)
    );
    const r2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('protect_manage_bots').setLabel('حماية البوتات').setEmoji('1517608154245103778').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('protect_manage_links').setLabel('حماية الروابط').setEmoji('1517608662774845531').setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId('protect_manage_spam').setLabel('حماية السبام').setEmoji('1517609132373442713').setStyle(ButtonStyle.Secondary)
    );
    const vc = db[guildId].violations?.length || 0;
    const r3 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('protect_violations_list').setLabel(`المخالفات: ${vc}`).setEmoji('1517622633980493894').setStyle(ButtonStyle.Primary));
    return { embeds: [embed], components: [r1, r2, r3] };
}

function updateBotStatus() {
    try {
        const u = client?.user;
        if (!u) return;
        const serversCount = client.guilds?.cache?.size || 0;
        const usersCount = client.guilds?.cache?.reduce((acc, guild) => acc + (guild.memberCount || 0), 0) || 0;
        
        u.setPresence({
            activities: [{
                name: `Servers: ${serversCount} | Users: ${usersCount}`,
                type: ActivityType.Watching
            }],
            status: 'online'
        });
        console.log(`[Bot Status] Status updated: Servers: ${serversCount} | Users: ${usersCount}`);
    } catch (error) {
        console.error('[Bot Status Error]:', error);
    }
}

client.once('ready', async (readyClient) => {
    const botUser = readyClient?.user || client?.user;
    console.log(`✅ NTL Bot Online: ${botUser?.tag || botUser?.username || 'Connected'}`);

    // Initialize global video URL from database
    const db = getDB();
    if (db.globalVideoUrl) {
        globalVideoUrl = db.globalVideoUrl;
    }

    // Set bot status initially and every 5 minutes
    updateBotStatus();
    setInterval(updateBotStatus, 5 * 60 * 1000);

    setInterval(async () => {
        try {
            const currentDb = getDB();
            const now = Date.now();
            for (const [guildId, gData] of Object.entries(currentDb)) {
                if (!gData?.forumScript || !gData.forumScript.enabled || !gData.forumScript.threads) continue;
                
                const fData = gData.forumScript;
                const intervalMs = (fData.interval || 60) * 60 * 1000;
                
                if (now - (fData.lastPost || 0) >= intervalMs) {
                    fData.lastPost = now;
                    saveDB(currentDb);

                    const guild = client.guilds.cache.get(guildId);
                    if (!guild) continue;

                    const threads = Object.entries(fData.threads);
                    for (const [gameName, threadId] of threads) {
                        // Small delay between posts to avoid rate limits
                        await new Promise(r => setTimeout(r, 2000));
                        
                        try {
                            const thread = guild.channels.cache.get(threadId) || await guild.channels.fetch(threadId).catch(() => null);
                            if (!thread) continue;

                            const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';
                            const res = await axios.get(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(gameName)}&page=1`, { 
                                headers: { 'User-Agent': userAgent },
                                timeout: 5000
                            }).catch(() => null);

                            const scripts = (res?.data?.result?.scripts || []);
                            if (scripts.length === 0) continue;

                            const script = scripts[Math.floor(Math.random() * scripts.length)];
                            const hasKey = script.key ? 'نعم' : 'لا';
                            const isTrusted = (script.verified || script.owner?.isVerified) ? 'نعم' : 'لا';
                            const title = script.title || 'بدون عنوان';
                            const views = script.views || 0;
                            const likes = script.likeCount || 0;
                            const scriptCode = script.script || '```lua\n-- No script content available\n```';
                            
                            // Improved Image Fetching Logic
                            let imgUrl = null;
                            if (script.image && typeof script.image === 'string' && script.image.length > 5) {
                                imgUrl = script.image.startsWith('http') ? script.image : `https://scriptblox.com${script.image}`;
                            } else if (script.game?.imageUrl && typeof script.game.imageUrl === 'string' && script.game.imageUrl.length > 5) {
                                imgUrl = script.game.imageUrl.startsWith('http') ? script.game.imageUrl : `https://scriptblox.com${script.game.imageUrl}`;
                            }

                            // Fallback to game-specific images if script image is missing or invalid
                            if (!imgUrl || imgUrl.includes('placeholder')) {
                                const gameImageMap = {
                                    'Blox Fruits': 'https://tr.rbxcdn.com/181af50917e335508c903820468e2f89/768/432/Image/Png',
                                    'Brookhaven RP': 'https://tr.rbxcdn.com/f044d081f964a35017df20b5774a1f6a/768/432/Image/Png',
                                    'Adopt Me!': 'https://tr.rbxcdn.com/f69a531d054d852077e6820541d8e154/768/432/Image/Png',
                                    'Murder Mystery 2': 'https://tr.rbxcdn.com/94916a2979313a35017df20b5774a1f6a/768/432/Image/Png',
                                    'Pet Simulator 99': 'https://tr.rbxcdn.com/f981a1d1d1d1d1d1d1d1d1d1d1d1d1d1/768/432/Image/Png',
                                    'Doors': 'https://tr.rbxcdn.com/97800747444c922a445033c468e2f8c0/768/432/Image/Png',
                                    'BedWars': 'https://tr.rbxcdn.com/b2829141088710201088710201088710/768/432/Image/Png',
                                    'Arsenal': 'https://tr.rbxcdn.com/83273273273273273273273273273273/768/432/Image/Png'
                                };
                                imgUrl = gameImageMap[gameName] || null;
                            }

                            const embed = new EmbedBuilder()
                                .setAuthor({ name: script.owner?.username || 'Unknown Developer', iconURL: script.owner?.profilePicture ? (script.owner.profilePicture.startsWith('http') ? script.owner.profilePicture : `https://scriptblox.com${script.owner.profilePicture}`) : null })
                                .setTitle(title)
                                .setURL(`https://scriptblox.com/script/${script.slug}`)
                                .setDescription(
                                    `>>> **المشاهدات <:eye:1535978311887355946> : \`${views}\`**\n` +
                                    `**الإعجابات <:like:1535979334370590760> : \`${likes}\`**\n` +
                                    `**مفتاح <:key:1535983304249974915> : \`${hasKey}\`**\n` +
                                    `**موثوق <:Trust:1535979763284578354> : \`${isTrusted}\`**`
                                )
                                .addFields({ name: '📜 Script Code', value: scriptCode.length > 1000 ? scriptCode.substring(0, 1000) + '...' : scriptCode })
                                .setColor(0x2b2d31)
                                .setTimestamp();

                            if (imgUrl) {
                                embed.setImage(imgUrl);
                            }

                            await thread.send({
                                embeds: [embed]
                            }).catch(() => {});
                        } catch (err) {
                            console.error(`[Forum Script Post Error] for ${gameName}:`, err.message);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('[Forum Script Worker Error]:', err);
        }
    }, 60 * 1000); // Check every minute

    // Support AI Inactivity Reminder
    setInterval(async () => {
        try {
            const currentDb = getDB();
            const now = Date.now();
            for (const [guildId, gData] of Object.entries(currentDb)) {
                if (!gData?.tickets) continue;
                for (const [chId, ticket] of Object.entries(gData.tickets)) {
                    if (!ticket.supportAiEnabled) continue;
                    const guild = client.guilds.cache.get(guildId);
                    if (!guild) continue;
                    const ch = guild.channels.cache.get(chId);
                    if (!ch) continue;

                    const lastActivity = ticket.lastAiActivity || ticket.createdAt || now;
                    const diffHours = (now - lastActivity) / (1000 * 60 * 60);

                    // Send reminder after 1 hour if not reminded yet
                    if (diffHours >= 1 && (!ticket.aiRemindCount || ticket.aiRemindCount === 0)) {
                        ticket.aiRemindCount = 1;
                        saveDB(currentDb);
                        await ch.send(`🔔 <@${ticket.creatorId}> **تذكير من ذكاء الدعم الفني:** مضت ساعة دون رد، هل ما زلت بحاجة لمساعدة في هذه التذكرة؟`).catch(() => {});
                    } else if (diffHours >= 24 && ticket.aiRemindCount >= 1) {
                        // Close ticket after 24 hours of inactivity
                        await ch.send(`🔒 **سيتم إغلاق التذكرة حذقاً وقائياً لعدم التفاعل لمدة 24 ساعة.**`).catch(() => {});
                        setTimeout(() => ch.delete().catch(() => {}), 5000);
                    }
                }
            }
        } catch (err) {
            console.error('[Support AI Inactivity Check Error]:', err);
        }
    }, 15 * 60 * 1000);

    const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/cairo/static/Cairo-SemiBold.ttf';
    if (fs.existsSync('./Cairo.ttf')) {
        const stats = fs.statSync('./Cairo.ttf');
        const content = fs.readFileSync('./Cairo.ttf', 'utf8').substring(0, 100);
        if (stats.size < 20000 || content.startsWith('<')) fs.unlinkSync('./Cairo.ttf');
    }
    if (!fs.existsSync('./Cairo.ttf')) {
        const file = fs.createWriteStream('./Cairo.ttf');
        https.get(fontUrl, res => {
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                try { GlobalFonts.registerFromPath('./Cairo.ttf', 'Cairo'); } catch(e){}
                initAzkar();
            });
        });
    } else {
        try { GlobalFonts.registerFromPath('./Cairo.ttf', 'Cairo'); } catch(e){}
        initAzkar();
    }

    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: [
                {
                    name: 'setup_obfuscation',
                    description: 'إعداد وتفعيل نظام تشفير سكربتات الـ Lua',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'channel',
                            description: 'الروم المعتمد لتلقي السكربتات وتشفيرها',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        },
                        {
                            name: 'status',
                            description: 'تفعيل أو تعطيل نظام التشفير في السيرفر',
                            type: 5,
                            required: false
                        }
                    ]
                },
                { name: 'ai', description: 'لوحة التحكم وإعدادات الذكاء الاصطناعي والمساعد الذكي', default_member_permissions: PermissionFlagsBits.Administrator.toString() },
                { name: 'setup_ticket', description: 'إعداد نظام التكتات المتطور', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'ephemeral', description: 'تحديد ما إذا كنت تريد إخفاء الرسالة عن الآخرين', type: 5, required: false }] },
                { name: 'setup_suggestion', description: 'إعداد وتنشيط نظام الاقتراحات المطور', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'channel', description: 'الروم المعتمد لإرسال ونشر الاقتراحات فيه', type: 7, channel_types: [ChannelType.GuildText], required: true }, { name: 'title', description: 'عنوان الرسالة أو اللوحة الخاصة بنظام الاقتراحات', type: 3, required: true }, { name: 'description', description: 'تفاصيل ووصف اللوحة الإرشادية للاقتراحات', type: 3, required: true }, { name: 'image_url', description: 'رابط صورة مخصصة لإيمبد الاقتراحات من الاستوديو (اختياري)', type: 3, required: false }, { name: 'use_server_icon', description: 'تفعيل خيار استخدام لوجو السيرفر كصورة أساسية بالرسالة', type: 5, required: false }] },
                { 
                    name: 'protection', 
                    description: 'لوحة التحكم وإدارة نظام الحماية الذاتي للسيرفر ضد التخريب', 
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(), 
                    options: [
                        { name: 'ephemeral', description: 'تحديد ما إذا كنت تريد إخفاء الرسالة عن الآخرين', type: 5, required: false },
                        { name: 'whitelist_channel', description: 'إضافة روم مستثنى من حماية الروابط', type: 7, channel_types: [ChannelType.GuildText], required: false },
                        { name: 'remove_whitelist', description: 'إزالة روم من قائمة المستثنيات من حماية الروابط', type: 7, channel_types: [ChannelType.GuildText], required: false },
                        { name: 'whitelist_category', description: 'إضافة كاتاجوري (فئة) مستثناة بالكامل من حماية الروابط', type: 7, channel_types: [ChannelType.GuildCategory], required: false },
                        { name: 'remove_category', description: 'إزالة كاتاجوري من قائمة المستثنيات من حماية الروابط', type: 7, channel_types: [ChannelType.GuildCategory], required: false },
                        { 
                            name: 'link_punishment', 
                            description: 'تحديد عقوبة إرسال الروابط (بما فيها بدون عقوبة)', 
                            type: 3, 
                            required: false,
                            choices: [
                                { name: 'بدون عقوبة (حذف الرابط والتحذير فقط)', value: 'none' },
                                { name: 'تايم اوت (Timeout)', value: 'timeout' },
                                { name: 'طرد (Kick)', value: 'kick' },
                                { name: 'بان (Ban)', value: 'ban' }
                            ]
                        },
                        { name: 'warn_message', description: 'تخصيص نص رسالة التحذير (استخدم {user} لمنشن العضو)', type: 3, required: false },
                        { name: 'warn_duration', description: 'مدة بقاء رسالة التحذير بالثواني قبل حذفها (مثال: 10)', type: 4, required: false, min_value: 1, max_value: 120 }
                    ] 
                },
                {
                    name: 'bypass',
                    description: 'تخطي الروابط واختصارات المفاتيح وحلها تلقائياً',
                    options: [
                        {
                            name: 'link',
                            description: 'الرابط المراد تخطيه',
                            type: 3,
                            required: true
                        }
                    ]
                },
                {
                    name: 'key',
                    description: 'إعداد وتفعيل أو تعطيل نظام تخطي المفاتيح والروابط',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'on',
                            description: 'تفعيل نظام تخطي المفاتيح وتحديد الروم المخصص له',
                            type: 1,
                            options: [
                                {
                                    name: 'channel',
                                    description: 'الروم المعتمد لتلقي طلبات تخطي المفاتيح',
                                    type: 7,
                                    channel_types: [ChannelType.GuildText],
                                    required: true
                                },
                                {
                                    name: 'method',
                                    description: 'طريقة عمل النظام (أمر /bypass، إرسال رابط مباشر، أو كليهما)',
                                    type: 3,
                                    required: true,
                                    choices: [
                                        { name: 'أمر /bypass فقط', value: 'command' },
                                        { name: 'إرسال رابط فقط', value: 'link' },
                                        { name: 'كليهما', value: 'both' }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'off',
                            description: 'تعطيل نظام تخطي المفاتيح بالكامل',
                            type: 1
                        }
                    ]
                },
                {
                    name: 'video',
                    description: 'إعداد وتفعيل نظام تنزيل الفيديوهات من وسائل التواصل بدون علامة مائية',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'downloader',
                            description: 'اختر حالة النظام',
                            type: 3,
                            required: true,
                            choices: [
                                { name: 'on', value: 'on' },
                                { name: 'off', value: 'off' }
                            ]
                        },
                        {
                            name: 'channel',
                            description: 'الروم المحدد لتنزيل الفيديوهات (اختياري)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                },
                {
                    name: 'trade',
                    description: 'إعداد ونظام التبادل المطور',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'setup',
                            description: 'إعداد وتنشيط نظام التبادل في روم محدد',
                            type: 1,
                            options: [
                                {
                                    name: 'enabled',
                                    description: 'تفعيل أو تعطيل نظام التبادل',
                                    type: 5,
                                    required: true
                                },
                                {
                                    name: 'channel',
                                    description: 'الروم المخصص للتبادل',
                                    type: 7,
                                    channel_types: [ChannelType.GuildText],
                                    required: false
                                },
                                {
                                    name: 'log_channel',
                                    description: 'روم السجلات (Log) لحفظ العمليات',
                                    type: 7,
                                    channel_types: [ChannelType.GuildText],
                                    required: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'script',
                    description: 'إعداد ونظام البحث عن السكربتات',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'setup',
                            description: 'إعداد وتنشيط نظام البحث عن السكربتات في روم محدد',
                            type: 1,
                            options: [
                                {
                                    name: 'channel',
                                    description: 'الروم المخصص للبحث عن السكربتات',
                                    type: 7,
                                    channel_types: [ChannelType.GuildText],
                                    required: true
                                },
                                {
                                    name: 'prefix',
                                    description: 'البريفيكس المستخدم للبحث (مثال: سكربت أو !سكربت)',
                                    type: 3,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'forum',
                    description: 'إعداد ونظام نشر السكربتات التلقائي في المنتدى',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'script',
                            description: 'إعداد وتنشيط نظام نشر السكربتات في Forum Channel',
                            type: 1,
                            options: [
                                {
                                    name: 'category',
                                    description: 'اختر الكاتاجوري (الفئة) التي تريد إنشاء المنتدى تحتها (اختياري)',
                                    type: 7,
                                    channel_types: [ChannelType.GuildCategory],
                                    required: false
                                },
                                {
                                    name: 'interval',
                                    description: 'المدة الزمنية الفاصلة بين كل منشور (اختياري)',
                                    type: 3,
                                    required: false,
                                    choices: [
                                        { name: 'دقيقة واحدة (بريميوم)', value: '1' },
                                        { name: 'ربع ساعة', value: '15' },
                                        { name: 'نصف ساعة', value: '30' },
                                        { name: 'ساعة', value: '60' },
                                        { name: 'يوم كامل', value: '1440' }
                                    ]
                                },
                                {
                                    name: 'status',
                                    description: 'تفعيل أو تعطيل النظام',
                                    type: 5,
                                    required: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'lira',
                    description: 'عرض رصيدك من الليرة أو تحويل الليرات لأعضاء آخرين',
                    options: [
                        {
                            name: 'user',
                            description: 'الشخص المراد تحويل الليرات إليه',
                            type: 6,
                            required: false
                        },
                        {
                            name: 'amount',
                            description: 'عدد الليرات المراد تحويلها (بدون فواصل وبالأرقام الإنجليزية)',
                            type: 4,
                            required: false,
                            min_value: 1
                        }
                    ]
                },
                {
                    name: 'tickets',
                    description: 'عرض أو إدارة إحصائيات التذاكر المستلمة للأعضاء والدعم الفني',
                    options: [
                        {
                            name: 'show',
                            description: 'عرض عدد التذاكر المستلمة لعضو',
                            type: 1,
                            options: [
                                {
                                    name: 'user',
                                    description: 'العضو المراد عرض عدد تذاكره المستلمة',
                                    type: 6,
                                    required: false
                                }
                            ]
                        },
                        {
                            name: 'add',
                            description: 'إضافة عدد تذاكر لعضو (للإدارة فقط)',
                            type: 1,
                            options: [
                                {
                                    name: 'user',
                                    description: 'العضو',
                                    type: 6,
                                    required: true
                                },
                                {
                                    name: 'amount',
                                    description: 'العدد المراد إضافته',
                                    type: 4,
                                    required: true,
                                    min_value: 1
                                }
                            ]
                        },
                        {
                            name: 'remove',
                            description: 'إزالة عدد تذاكر من عضو (للإدارة فقط)',
                            type: 1,
                            options: [
                                {
                                    name: 'user',
                                    description: 'العضو',
                                    type: 6,
                                    required: true
                                },
                                {
                                    name: 'amount',
                                    description: 'العدد المراد إزالته',
                                    type: 4,
                                    required: true,
                                    min_value: 1
                                }
                            ]
                        },
                        {
                            name: 'reset',
                            description: 'تصفير تذاكر عضو بالكامل (للإدارة فقط)',
                            type: 1,
                            options: [
                                {
                                    name: 'user',
                                    description: 'العضو',
                                    type: 6,
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'activate-premium',
                    description: 'تفعيل أو إلغاء تفعيل اشتراك البريميوم لسيرفر معين عبر المعرف (خاص بمالك البوت)',
                    options: [
                        {
                            name: 'server_id',
                            description: 'معرف السيرفر (Guild ID) المراد تفعيل البريميوم له',
                            type: 3,
                            required: true
                        },
                        {
                            name: 'action',
                            description: 'تفعيل أو إلغاء التفعيل',
                            type: 3,
                            required: false,
                            choices: [
                                { name: 'تفعيل (Activate)', value: 'activate' },
                                { name: 'إلغاء (Deactivate)', value: 'deactivate' }
                            ]
                        },
                        {
                            name: 'duration',
                            description: 'مدة البريميوم (اختياري، افتراضي مدى الحياة)',
                            type: 3,
                            required: false,
                            choices: [
                                { name: 'مدى الحياة (Lifetime)', value: 'lifetime' },
                                { name: '30 يوم', value: '30days' },
                                { name: '7 أيام', value: '7days' }
                            ]
                        }
                    ]
                },
                {
                    name: 'server-customize',
                    description: 'تخصيص بيانات البوت في هذا السيرفر (اسم، نبذة، بنر، صورة من الاستوديو) - للسيرفرات المميزة (Premium)',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'name',
                            description: 'اسم البوت الجديد في السيرفر (اختياري)',
                            type: 3,
                            required: false
                        },
                        {
                            name: 'bio',
                            description: 'نبذة البوت التعريفية Bio (اختياري)',
                            type: 3,
                            required: false
                        },
                        {
                            name: 'banner',
                            description: 'بنر البوت (اختياري)',
                            type: 3,
                            required: false
                        },
                        {
                            name: 'image',
                            description: 'صورة البوت الجديدة مرفوعة من الاستوديو/المعرض (اختياري)',
                            type: 11,
                            required: false
                        }
                    ]
                },
                {
                    name: 'language',
                    description: 'تغيير لغة البوت / Change bot language / Cambiar idioma del bot',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
                    options: [
                        {
                            name: 'set',
                            description: 'اختر لغة البوت / Select language / Seleccionar idioma',
                            type: 3,
                            required: true,
                            choices: [
                                { name: 'العربية (Arabic)', value: 'ar' },
                                { name: 'English (الإنجليزية)', value: 'en' },
                                { name: 'Español (الإسبانية)', value: 'es' }
                            ]
                        }
                    ]
                },
                {
                    name: 'hypesquad',
                    description: 'تغيير أو إزالة شارة HypeSquad لحساب ديسكورد',
                    options: [
                        {
                            name: 'token',
                            description: 'توكن حساب الديسكورد المراد تعديل شارته',
                            type: 3,
                            required: true
                        }
                    ]
                },
                // --- 9 Moderation Slash Commands (أوامر الإشراف بالسلاش) ---
                {
                    name: 'lock',
                    description: '🔒 قفل القناة ومنع الأعضاء من إرسال الرسائل فيها',
                    options: [
                        {
                            name: 'channel',
                            description: 'القناة المراد قفلها (افتراضياً: القناة الحالية)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                },
                {
                    name: 'unlock',
                    description: '🔓 فتح القناة والسماح للأعضاء بإرسال الرسائل',
                    options: [
                        {
                            name: 'channel',
                            description: 'القناة المراد فتحها (افتراضياً: القناة الحالية)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                },
                {
                    name: 'ban',
                    description: '🔨 حظر عضو نهائياً من السيرفر',
                    options: [
                        {
                            name: 'user',
                            description: 'العضو المراد حظره',
                            type: 6,
                            required: true
                        },
                        {
                            name: 'reason',
                            description: 'سبب الحظر (اختياري)',
                            type: 3,
                            required: false
                        }
                    ]
                },
                {
                    name: 'unban',
                    description: '🤝 إلغاء حظر عضو من السيرفر عبر الآيدي',
                    options: [
                        {
                            name: 'user_id',
                            description: 'آيدي العضو المراد فك الحظر عنه',
                            type: 3,
                            required: true
                        }
                    ]
                },
                {
                    name: 'timeout',
                    description: '⏳ إسكات مؤقت لعضو (تايم أوت) مع زر إعفاء حصري للمشرف',
                    options: [
                        {
                            name: 'user',
                            description: 'العضو المراد إسكاته',
                            type: 6,
                            required: true
                        },
                        {
                            name: 'duration',
                            description: 'المدة (مثال: 10m أو 1h أو 1d أو 1w) - افتراضياً 10m',
                            type: 3,
                            required: false
                        },
                        {
                            name: 'reason',
                            description: 'سبب الإسكات (اختياري)',
                            type: 3,
                            required: false
                        }
                    ]
                },
                {
                    name: 'untimeout',
                    description: '🔊 إلغاء الإسكات عن عضو فورياً',
                    options: [
                        {
                            name: 'user',
                            description: 'العضو المراد إلغاء إسكاته',
                            type: 6,
                            required: true
                        }
                    ]
                },
                {
                    name: 'hide',
                    description: '👁️‍🗨️ إخفاء القناة تماماً عن رتبة @everyone',
                    options: [
                        {
                            name: 'channel',
                            description: 'القناة المراد إخفاؤها (افتراضياً: القناة الحالية)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                },
                {
                    name: 'unhide',
                    description: '👁️ إظهار القناة لجميع الأعضاء ورتبة @everyone',
                    options: [
                        {
                            name: 'channel',
                            description: 'القناة المراد إظهارها (افتراضياً: القناة الحالية)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                },
                {
                    name: 'message',
                    description: '📢 إرسال رسالة باسم البوت في روم محدد',
                    options: [
                        {
                            name: 'text',
                            description: 'نص الرسالة المراد إرسالها',
                            type: 3,
                            required: true
                        },
                        {
                            name: 'channel',
                            description: 'القناة المراد الإرسال فيها (افتراضياً: الروم الحالي)',
                            type: 7,
                            channel_types: [ChannelType.GuildText],
                            required: false
                        }
                    ]
                }
            ]
        });
    } catch (e) { console.error(e); }
});

async function sendTicketActionLog(channel, userId, actionType, extraData = {}) {
    try {
        const container = new ContainerBuilder().setAccentColor(0x00d2ff);
        let text = '';
        
        const line = '-#  ~~                                                                                                                                                                   ~~';
        
        if (actionType === 'claim') {
            text = `### <:claim:1516357850207879209> تم استلام التذكرة\n${line}\n• **مستلم التذكرة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
            
            if (extraData.tid || channel.id) {
                const buttonTid = extraData.tid || channel.id;
                container.addActionRowComponents((actionRow) =>
                    actionRow.setComponents(
                        new ButtonBuilder()
                            .setCustomId(`claim_request_${buttonTid}`)
                            .setLabel('Claim Request')
                            .setEmoji('1516360207847129183')
                            .setStyle(ButtonStyle.Secondary)
                    )
                );
            }
        } else if (actionType === 'summon') {
            text = `### <:summon:1516361062037848125> تم إرسال استدعاء لصاحب التذكرة\n${line}\n• **بواسطة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
        } else if (actionType === 'reset') {
            text = `### <:reset:1516390093504385074> تم إعادة تعيين صلاحيات التذكرة\n${line}\n• **بواسطة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
        } else if (actionType === 'add') {
            text = `### <:add:1516360871939411988> تم إضافة عضو للتذكرة\n${line}\n• **العضو المضاف:** <@${extraData.targetUserId}>\n• **بواسطة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
        } else if (actionType === 'remove') {
            text = `### <:remove:1516361202522001448> تم إزالة عضو من التذكرة\n${line}\n• **العضو المزال:** <@${extraData.targetUserId}>\n• **بواسطة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
        } else if (actionType === 'rename') {
            text = `### 📝 تم تغيير اسم التذكرة\n${line}\n• **الاسم الجديد:** \`${extraData.newName}\`\n• **بواسطة:** <@${userId}>\n${line}`;
            container.addTextDisplayComponents((td) => td.setContent(text));
        }
        
        await channel.send({
            components: [container.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        });
    } catch (err) {
        console.error("Error sending ticket action log:", err);
    }
}

function getTicketHelper(guildId, channelId, tid) {
    const db = getDB();
    const guildData = db[guildId] || { panels: {}, tickets: {} };
    const tickets = guildData.tickets || {};

    let ticketInfo = (tid ? tickets[tid] : null) || (channelId ? tickets[channelId] : null);
    if (!ticketInfo) {
        ticketInfo = Object.values(tickets).find(t => (tid && t.id === tid) || (channelId && t.id === channelId));
    }

    if (!ticketInfo && channelId) {
        const defaultPanelId = Object.keys(guildData.panels || {})[0] || null;
        ticketInfo = {
            id: channelId,
            creatorId: null,
            panelId: defaultPanelId,
            claimerId: null,
            createdAt: Date.now(),
            guildId: guildId
        };
        if (!guildData.tickets) guildData.tickets = {};
        guildData.tickets[channelId] = ticketInfo;
        saveDB(db);
    }

    let panel = null;
    if (ticketInfo && ticketInfo.panelId) {
        panel = guildData.panels?.[ticketInfo.panelId] || null;
    }
    if (!panel && guildData.panels && Object.keys(guildData.panels).length > 0) {
        panel = Object.values(guildData.panels)[0] || null;
    }

    return { ticketInfo, panel, db };
}

function checkIsSupportMember(member, panel) {
    if (!member) return false;

    if (member.permissions && typeof member.permissions.has === 'function') {
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return true;
    }

    if (!panel || !panel.roles || !Array.isArray(panel.roles) || panel.roles.length === 0) {
        return false;
    }

    let memberRoleIds = [];
    if (Array.isArray(member.roles)) {
        memberRoleIds = member.roles;
    } else if (member.roles && member.roles.cache) {
        memberRoleIds = Array.from(member.roles.cache.keys());
    }

    return panel.roles.some(rId => memberRoleIds.includes(String(rId)));
}

function getTicketComponents(ticketInfo, guildId = null) {
    const isClaimed = ticketInfo.claimerId !== null;
    const claimEmoji = isClaimed ? '1516360207847129183' : '1516357850207879209';
    const claimLabel = isClaimed ? 'طلب إستلام' : 'إستلام التذكرة';
    
    const db = getDB();
    const gId = guildId || ticketInfo.guildId;
    let hasReviewOption = false;
    if (gId && ticketInfo.panelId) {
        const panel = db[gId]?.panels?.[ticketInfo.panelId];
        if (panel && panel.reviewsEnabled) {
            hasReviewOption = true;
        }
    }

    const options = [
        { label: 'Claimer Info', value: 'info', emoji: { id: '1516357850207879209' } },
        { label: 'Add Member', value: 'add', emoji: { id: '1516360871939411988' } },
        { label: 'Remove Member', value: 'remove', emoji: { id: '1516361202522001448' } },
        { label: 'Summon Creator', value: 'summon', emoji: { id: '1516361062037848125' } },
        { label: 'Rename Ticket', value: 'rename', emoji: { id: '1516358499905306715' } }
    ];

    if (hasReviewOption) {
        options.push({ label: 'Review claimed', value: 'review', emoji: { id: '1526300631571234846' } });
    }

    options.push({ label: 'Reset', value: 'reset', emoji: { id: '1516390093504385074' } });

    const menu = new StringSelectMenuBuilder().setCustomId(`ticket_mgmt_${ticketInfo.id}`).setPlaceholder('خيارات إدارة التذكرة...')
        .addOptions(options);
    const btns = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`claim_${ticketInfo.id}`).setLabel(claimLabel).setEmoji(claimEmoji).setStyle(isClaimed ? ButtonStyle.Secondary : ButtonStyle.Primary),
        new ButtonBuilder().setCustomId(`delete_req_${ticketInfo.id}`).setLabel('Delete').setEmoji('1516357693328330782').setStyle(ButtonStyle.Danger)
    );
    return [new ActionRowBuilder().addComponents(menu), btns];
}

function buildWelcomeContainer(panel, chName, ticketInfo, creatorId) {
    const welcomeText = (panel && panel.welcome && typeof panel.welcome === 'string' && panel.welcome.trim().length > 0)
        ? panel.welcome
        : 'مرحباً بك في التذكرة! تفضل بكتابة استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.';

    const rolesArr = (panel && panel.roles && Array.isArray(panel.roles) && panel.roles.length > 0)
        ? panel.roles.filter(Boolean)
        : (panel && panel.supportRole ? [panel.supportRole] : []);
    const supportMentions = rolesArr.length > 0 ? rolesArr.map(r => `<@&${r}>`).join(' | ') : '@طاقم الدعم';

    const line = '-#  ~~                                                                                                                                                                   ~~';
    const mentionPrefix = creatorId ? `مرحباً بك <@${creatorId}> | طاقم الدعم: ${supportMentions}\n` : '';
    const contentText = `${mentionPrefix}### 🎫 **تذكرة جديدة | ${chName}**\n${line}\n${welcomeText}\n${line}\n-# لإغلاق التذكرة أو إدارتها، استخدم القائمة المنسدلة والأزرار أدناه.`;

    let color = 0x2b2d31;
    if (panel && panel.color) {
        if (typeof panel.color === 'string') color = parseInt(panel.color.replace('#', ''), 16) || 0x2b2d31;
        else if (typeof panel.color === 'number') color = panel.color;
    }

    const container = new ContainerBuilder()
        .setAccentColor(color)
        .addTextDisplayComponents(td => td.setContent(contentText));

    const displayWelcomeImgUrl = getAbsoluteUrl(panel?.welcome_img || 'لايوجد');
    if (displayWelcomeImgUrl && displayWelcomeImgUrl !== 'لايوجد' && displayWelcomeImgUrl.startsWith('http')) {
        container.addMediaGalleryComponents(mg => mg.addMedia(displayWelcomeImgUrl));
    }

    const ticketComps = getTicketComponents(ticketInfo, ticketInfo.guildId || (panel && panel.guildId));
    if (ticketComps && Array.isArray(ticketComps)) {
        ticketComps.forEach(row => {
            container.addActionRowComponents(row);
        });
    }

    return container;
}

async function updateTicketWelcomeMessage(channel, ticketInfo, panel) {
    try {
        if (!channel || !ticketInfo) return;
        const messages = await channel.messages.fetch({ limit: 50 }).catch(() => null);
        if (!messages) return;
        
        const ticketNumberStr = ticketInfo.ticketNum || (channel.name ? (channel.name.match(/\d+/) ? channel.name.match(/\d+/)[0] : ticketInfo.id) : ticketInfo.id);
        const chName = `ticket-${ticketNumberStr}`;
        
        const welcomeMsg = messages.find(m => m.author.id === client.user.id && (
            (m.flags && (m.flags.bitfield & MessageFlags.IsComponentsV2) !== 0) ||
            (m.embeds && m.embeds.length > 0) ||
            (m.content && (m.content.includes('مرحباً بك') || m.content.includes('طاقم الدعم')))
        ));

        if (welcomeMsg) {
            const p = panel || getDB()[channel.guild.id]?.panels?.[ticketInfo.panelId] || {};
            const container = buildWelcomeContainer(p, chName, ticketInfo, ticketInfo.creatorId);
            await welcomeMsg.edit({
                embeds: [],
                components: [container.toJSON()],
                flags: [MessageFlags.IsComponentsV2]
            }).catch((err) => {
                console.error('Failed to update welcome msg:', err);
            });
        }
    } catch (e) {
        console.error('Error updating welcome message:', e);
    }
}

async function updatePanelEmbed(interaction, panelId) {
    try {
        ensureGuildData(interaction.guildId);
        const db = getDB();
        const panel = db[interaction.guildId].panels[panelId];
        if (!panel) {
            await interaction.editReply({ content: '❌ تعذر العثور على البانل المحدد.' }).catch(() => {});
            return;
        }
        let btnsDisplay = 'لايوجد';
        if (panel.buttons && panel.buttons.length > 0) {
            btnsDisplay = panel.buttons.map(b => {
                const cat = b.category || panel.category;
                return `[${b.emoji ? `\\<:${b.emoji}\\>` : ''} ${b.name}] (قسم: ${cat ? `<#${cat}>` : 'لم يحدد'})`;
            }).join('\n');
        }
        const displayTypeText = panel.displayType === 'select' ? 'قائمة منسدلة (Select Menu)' : 'أزرار عادية (Buttons)';
        
        // Resolve relative URLs for panel image and welcome image
        const displayImgUrl = getAbsoluteUrl(panel.img || 'لايوجد');
        const displayWelcomeImgUrl = getAbsoluteUrl(panel.welcome_img || 'لايوجد');

        const imgDisplayStr = (displayImgUrl && displayImgUrl !== 'لايوجد') ? (displayImgUrl.startsWith('data:') ? '[صورة مرفوعة (Base64)]' : (displayImgUrl.length > 80 ? displayImgUrl.substring(0, 77) + '...' : displayImgUrl)) : 'لايوجد';
        const welcomeImgDisplayStr = (displayWelcomeImgUrl && displayWelcomeImgUrl !== 'لايوجد') ? (displayWelcomeImgUrl.startsWith('data:') ? '[صورة مرفوعة (Base64)]' : (displayWelcomeImgUrl.length > 80 ? displayWelcomeImgUrl.substring(0, 77) + '...' : displayWelcomeImgUrl)) : 'لايوجد';

        const embed = new EmbedBuilder().setColor('#2b2d31').setDescription(
            `**اعدادات البانل *${panel.name}* **\n\n` +
            `**عنوان البانل:** ${panel.title || 'غير محدد'}\n` +
            `**الوصف:** ${panel.desc || 'غير محدد'}\n` +
            `**صورة البانل:** ${imgDisplayStr}\n` +
            `**صورة الترحيب:** ${welcomeImgDisplayStr}\n` +
            `**رسالة الترحيب:** ${panel.welcome || 'مرحباً بك'}\n` +
            `**طريقة العرض المتوفرة:** ${displayTypeText}\n` +
            `**رتب الدعم الفني:** ${panel.roles?.length > 0 ? panel.roles.map(r => `<@&${r}>`).join(' ') : 'لايوجد'}\n` +
            `**الأزرار المضافة:**\n${btnsDisplay}`
        );
        if (displayImgUrl && displayImgUrl !== 'لايوجد' && (displayImgUrl.startsWith('http://') || displayImgUrl.startsWith('https://'))) {
            embed.setImage(displayImgUrl);
        }
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`edit_texts_${panelId}`).setLabel('تعديل الوصف والعناوين').setEmoji('1516365639760085033').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`edit_roles_${panelId}`).setLabel('تحديد رتب الدعم').setEmoji('1516394714415366174').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`edit_images_${panelId}`).setLabel('تعديل الصور').setEmoji('1516575747425439975').setStyle(ButtonStyle.Secondary)
        );
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`select_btn_cat_${panelId}`).setLabel('تحديد كاتاجوري التكتات').setEmoji('1516365641823551528').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`edit_buttons_${panelId}`).setLabel('تعديل الازرار').setEmoji('1516425996793024552').setStyle(ButtonStyle.Secondary)
        );
        const row3 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`log_channel_${panelId}`).setLabel('روم اللوق').setEmoji('1526297382898237511').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`review_settings_${panelId}`).setLabel('اعدادات التقييم').setEmoji('1526300631571234846').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`panel_ai_settings_${panelId}`).setLabel('ذكاء التذكرة (AI)').setEmoji('🤖').setStyle(ButtonStyle.Primary)
        );
        const row4 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`send_panel_${panelId}`).setLabel('أرسال').setEmoji('1516530946180907099').setStyle(ButtonStyle.Success)
        );
        await interaction.editReply({ content: '', embeds: [embed], components: [row1, row2, row3, row4] });
    } catch (error) {
        console.error('Error in updatePanelEmbed:', error);
        if (interaction && interaction.editReply) {
            await interaction.editReply({ content: `⚠️ **فشل عرض إعدادات البانل:** ${error.message}` }).catch(() => {});
        }
    }
}

function updateReviewSettingsMessage(interaction, pid) {
    const localDb = getDB();
    const panel = localDb[interaction.guildId]?.panels?.[pid];
    if (!panel) return { content: '**<:No:1516534087161221233> | تعذر العثور على البانل المحدد.**' };

    const isEnabled = panel.reviewsEnabled || false;
    const rChannel = panel.reviewChannelId ? `<#${panel.reviewChannelId}>` : '`غير محدد`';

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('⭐️ اعدادات نظام التقييمات')
        .setDescription(`إليك تفاصيل حالة نظام التقييمات للبانل الحالي:\n\n` +
                        `• **حالة النظام:** ${isEnabled ? '🟢 مفعل' : '🔴 معطل'}\n` +
                        `• **روم التقييمات:** ${rChannel}\n\n` +
                        `⚠️ **ملاحظة:** لا يمكن تفعيل نظام التقييمات حتى يتم اختيار روم مخصص للتقييمات أولاً.`);

    const row1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`review_enable_${pid}`).setLabel('تفعيل النظام').setEmoji('1516534090751279257').setStyle(ButtonStyle.Success).setDisabled(isEnabled),
        new ButtonBuilder().setCustomId(`review_disable_${pid}`).setLabel('تعطيل النظام').setEmoji('1516534087161221233').setStyle(ButtonStyle.Danger).setDisabled(!isEnabled)
    );

    const channelSelect = new ChannelSelectMenuBuilder()
        .setCustomId(`set_review_channel_${pid}`)
        .setPlaceholder('اختر روم التقييمات...')
        .addChannelTypes(ChannelType.GuildText);

    const row2 = new ActionRowBuilder().addComponents(channelSelect);

    return { content: '', embeds: [embed], components: [row1, row2] };
}

client.on('guildCreate', async guild => {
    try {
        console.log(`[Guild Join]: New server joined: ${guild.name} (${guild.id})`);

        // Fetch owner safely
        const owner = await guild.fetchOwner().catch(() => null);
        if (!owner) {
            console.error(`[Guild Join Error]: Could not fetch owner for guild ${guild.name}`);
            return;
        }

        // Try to generate an invite link
        let inviteUrl = 'لا يمكن إنشاؤه لعدم توفر الصلاحيات في الرومات الأساسية.';
        try {
            let channel = guild.channels.cache.find(c => 
                c.type === ChannelType.GuildText && 
                c.permissionsFor(guild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
            );
            if (!channel) {
                const channels = await guild.channels.fetch().catch(() => null);
                channel = channels?.find(c => 
                    c.type === ChannelType.GuildText && 
                    c.permissionsFor(guild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
                );
            }
            if (channel) {
                const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
                if (invite) inviteUrl = invite.url;
            }
        } catch (err) {
            console.error('[Guild Join Error] Failed to generate invite:', err);
        }

        // Build a beautiful message to send to the server owner
        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle('✨ شكراً لك على إضافة البوت لسيرفرك!')
            .setDescription(
                `أهلاً بك عزيزي **${owner.user.username}**،\n` +
                `نسعد ونتشرف جداً بانضمام البوت إلى سيرفرك المتميز بكل حب وإخلاص. ❤️\n\n` +
                `📊 **معلومات سيرفرك المسجلة لدينا:**\n` +
                `• **اسم السيرفر:** \`${guild.name}\`\n` +
                `• **عدد الأعضاء:** \`${guild.memberCount}\` عضو\n` +
                `• **رابط السيرفر المباشر:** ${inviteUrl}\n\n` +
                `نتمنى لك تجربة ممتعة ومميزة مع خدمات البوت المتنوعة والمتكاملة!`
            )
            .setThumbnail(guild.iconURL({ dynamic: true }) || undefined)
            .setFooter({ text: `${client.user.username} | دعم متميز وإخلاص دائم`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();

        await owner.send({ embeds: [embed] }).catch((err) => {
            console.error(`[Guild Join DM Fail] Could not DM owner ${owner.user.id}:`, err.message || err);
        });
        
        // Send to setup channel if configured
        try {
            const db = getDB();
            if (db.setupChannelId) {
                const setupChan = await client.channels.fetch(db.setupChannelId).catch(() => null);
                if (setupChan) {
                    await setupChan.send(`**السيرفر الجديد:** ${guild.name}\n**الأعضاء:** ${guild.memberCount}\n**رابط الدعوة:** ${inviteUrl}`);
                }
            }
        } catch (e) {
            console.error('Failed to notify setup channel:', e);
        }

        // Update bot status
        updateBotStatus();
    } catch (e) {
        console.error('[Guild Join Error] Handler exception:', e);
    }
});

client.on('guildDelete', async guild => {
    try {
        console.log(`[Guild Leave]: Server left: ${guild.name} (${guild.id})`);
        updateBotStatus();
    } catch (e) {
        console.error('[Guild Leave Error] Handler exception:', e);
    }
});

client.on('channelDelete', async channel => {
    if (!channel.guild) return;
    const db = getDB();
    const tickets = db[channel.guild.id]?.tickets || {};
    const ticketInfo = tickets[channel.id] || Object.values(tickets).find(t => t.id === channel.id);
    if (ticketInfo && ticketInfo.claimerId && !ticketInfo.counted) {
        ticketInfo.counted = true;
        if (!db[channel.guild.id]) db[channel.guild.id] = {};
        if (!db[channel.guild.id].staffTickets) db[channel.guild.id].staffTickets = {};
        db[channel.guild.id].staffTickets[ticketInfo.claimerId] = (db[channel.guild.id].staffTickets[ticketInfo.claimerId] || 0) + 1;
        saveDB(db);
    }
    const protect = db[channel.guild.id]?.protection?.channels;
    if (protect && protect.enabled) {
        const exec = await getExecutor(channel.guild, 12);
        if (exec && exec.id !== client.user.id && exec.id !== channel.guild.ownerId) {
            await applyPunishment(channel.guild, exec, protect, 'حذف روم', channel.name);
            try {
                await channel.guild.channels.create({
                    name: channel.name,
                    type: channel.type,
                    parent: channel.parentId,
                    permissionOverwrites: channel.permissionOverwrites.cache.map(o => ({ id: o.id, allow: o.allow.toArray(), deny: o.deny.toArray(), type: o.type }))
                });
            } catch(e){}
        }
    }
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    if (!newChannel.guild) return;
    const db = getDB();
    const protect = db[newChannel.guild.id]?.protection?.channels;
    if (protect && protect.enabled) {
        if (bypassEvents.has(newChannel.id)) { bypassEvents.delete(newChannel.id); return; }
        const exec = await getExecutor(newChannel.guild, 11);
        if (exec && exec.id !== client.user.id && exec.id !== newChannel.guild.ownerId) {
            await applyPunishment(newChannel.guild, exec, protect, 'تعديل روم وصلاحياته', newChannel.name);
            bypassEvents.add(newChannel.id);
            try {
                const overwrites = oldChannel.permissionOverwrites.cache.map(o => ({ id: o.id, allow: o.allow.toArray(), deny: o.deny.toArray(), type: o.type }));
                await newChannel.edit({ name: oldChannel.name, parentId: oldChannel.parentId, permissionOverwrites: overwrites });
            } catch (e) { bypassEvents.delete(newChannel.id); }
        }
    }
});

client.on('roleDelete', async role => {
    const db = getDB();
    const protect = db[role.guild.id]?.protection?.roles;
    if (protect && protect.enabled) {
        const exec = await getExecutor(role.guild, 32);
        if (exec && exec.id !== client.user.id && exec.id !== role.guild.ownerId) {
            await applyPunishment(role.guild, exec, protect, 'حذف رتبة', role.name);
            try {
                await role.guild.roles.create({ name: role.name, color: role.color, hoist: role.hoist, permissions: role.permissions, mentionable: role.mentionable, position: role.position });
            } catch(e){}
        }
    }
});

client.on('roleUpdate', async (oldRole, newRole) => {
    const db = getDB();
    const protect = db[newRole.guild.id]?.protection?.roles;
    if (protect && protect.enabled) {
        if (bypassEvents.has(newRole.id)) { bypassEvents.delete(newRole.id); return; }
        const exec = await getExecutor(newRole.guild, 31);
        if (exec && exec.id !== client.user.id && exec.id !== newRole.guild.ownerId) {
            await applyPunishment(newRole.guild, exec, protect, 'تعديل رتبة وصلاحياتها', newRole.name);
            bypassEvents.add(newRole.id);
            try {
                await newRole.edit({ name: oldRole.name, color: oldRole.color, hoist: oldRole.hoist, permissions: oldRole.permissions, mentionable: oldRole.mentionable });
            } catch(e) { bypassEvents.delete(newRole.id); }
        }
    }
});

client.on('channelCreate', async channel => {
    if (!channel.guild) return;
    const db = getDB();
    const protect = db[channel.guild.id]?.protection?.channels;
    if (protect && protect.enabled) {
        if (bypassEvents.has(channel.id)) { bypassEvents.delete(channel.id); return; }
        const exec = await getExecutor(channel.guild, 10);
        if (exec && exec.id !== client.user.id && exec.id !== channel.guild.ownerId) {
            await applyPunishment(channel.guild, exec, protect, 'إنشاء روم غير مصرح به', channel.name);
            bypassEvents.add(channel.id);
            try { await channel.delete('NTL Channel Protection'); } catch(e) { bypassEvents.delete(channel.id); }
        }
    }
});

client.on('roleCreate', async role => {
    if (!role.guild) return;
    const db = getDB();
    const protect = db[role.guild.id]?.protection?.roles;
    if (protect && protect.enabled) {
        if (bypassEvents.has(role.id)) { bypassEvents.delete(role.id); return; }
        const exec = await getExecutor(role.guild, 30);
        if (exec && exec.id !== client.user.id && exec.id !== role.guild.ownerId) {
            await applyPunishment(role.guild, exec, protect, 'إنشاء رتبة غير مصرح بها', role.name);
            bypassEvents.add(role.id);
            try { await role.delete('NTL Role Protection'); } catch(e) { bypassEvents.delete(role.id); }
        }
    }
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (!newMember.guild) return;
    const db = getDB();
    const protect = db[newMember.guild.id]?.protection?.permissions;
    if (protect && protect.enabled) {
        const oldAdmin = oldMember.permissions.has(PermissionFlagsBits.Administrator);
        const newAdmin = newMember.permissions.has(PermissionFlagsBits.Administrator);
        const oldManageGuild = oldMember.permissions.has(PermissionFlagsBits.ManageGuild);
        const newManageGuild = newMember.permissions.has(PermissionFlagsBits.ManageGuild);
        const oldManageRoles = oldMember.permissions.has(PermissionFlagsBits.ManageRoles);
        const newManageRoles = newMember.permissions.has(PermissionFlagsBits.ManageRoles);
        const oldManageChannels = oldMember.permissions.has(PermissionFlagsBits.ManageChannels);
        const newManageChannels = newMember.permissions.has(PermissionFlagsBits.ManageChannels);

        const dangerousGained = (!oldAdmin && newAdmin) || (!oldManageGuild && newManageGuild) || (!oldManageRoles && newManageRoles) || (!oldManageChannels && newManageChannels);

        if (dangerousGained) {
            const exec = await getExecutor(newMember.guild, 25);
            if (exec && exec.id !== client.user.id && exec.id !== newMember.guild.ownerId) {
                await applyPunishment(newMember.guild, exec, protect, 'منح صلاحيات إدارية خطيرة لعضو', newMember.user.username);
                try {
                    await newMember.roles.set(oldMember.roles.cache.map(r => r.id), 'NTL Permissions Protection Revert');
                } catch(e) {}
            }
        }
    }
});

// Welcome Card Template Drawing Engine
function drawTemplateBackground(ctx, templateId, width, height) {
    ctx.save();
    switch (templateId) {
        case 'template_2': { // Red Nebula Wave
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#0a0104');
            bgGrad.addColorStop(0.5, '#1e030b');
            bgGrad.addColorStop(1, '#3b0615');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, height * 0.75);
            ctx.bezierCurveTo(width * 0.25, height * 0.4, width * 0.5, height * 0.95, width, height * 0.6);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            const wGrad = ctx.createLinearGradient(0, height * 0.5, width, height);
            wGrad.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
            wGrad.addColorStop(1, 'rgba(185, 28, 28, 0.6)');
            ctx.fillStyle = wGrad;
            ctx.fill();
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
            break;
        }
        case 'template_3': { // Cyber Yellow Arc
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#080805');
            bgGrad.addColorStop(1, '#1c1b05');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.4)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(width * 0.23, height * 0.5, 140, -Math.PI * 0.3, Math.PI * 0.7);
            ctx.stroke();

            ctx.strokeStyle = '#facc15';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(width * 0.45, 80);
            ctx.lineTo(width * 0.9, 80);
            ctx.stroke();
            ctx.restore();
            break;
        }
        case 'template_4': { // Red Cyber Grid
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#0a0204');
            bgGrad.addColorStop(1, '#200308');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(220, 38, 38, 0.15)';
            ctx.lineWidth = 1.5;
            for (let x = 0; x < width; x += 40) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
            ctx.restore();
            break;
        }
        case 'template_5': { // Golden Olive Topo
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#0e1204');
            bgGrad.addColorStop(1, '#262c07');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(202, 138, 4, 0.35)';
            ctx.lineWidth = 2;
            for (let r = 80; r <= 320; r += 40) {
                ctx.beginPath();
                ctx.arc(width * 0.23, height * 0.5, r, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
            break;
        }
        case 'template_6': { // Ramadan Golden Crescent
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#140d05');
            bgGrad.addColorStop(1, '#341f09');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
            ctx.shadowColor = '#f59e0b';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.arc(width * 0.85, 120, 60, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(width * 0.85 - 20, 105, 55, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            break;
        }
        case 'template_7': { // Cyan Tech Matrix
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#011116');
            bgGrad.addColorStop(1, '#052e3d');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
            ctx.lineWidth = 2;
            ctx.strokeRect(30, 30, width - 60, height - 60);
            ctx.strokeStyle = '#22d3ee';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(25, 60); ctx.lineTo(25, 25); ctx.lineTo(60, 25);
            ctx.moveTo(width - 60, 25); ctx.lineTo(width - 25, 25); ctx.lineTo(width - 25, 60);
            ctx.moveTo(25, height - 60); ctx.lineTo(25, height - 25); ctx.lineTo(60, height - 25);
            ctx.moveTo(width - 60, height - 25); ctx.lineTo(width - 25, height - 25); ctx.lineTo(width - 25, height - 60);
            ctx.stroke();
            ctx.restore();
            break;
        }
        case 'template_8': { // Beige Islamic Floral
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#fef7e2');
            bgGrad.addColorStop(1, '#fde08b');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(146, 64, 14, 0.4)';
            ctx.lineWidth = 3;
            ctx.strokeRect(25, 25, width - 50, height - 50);
            ctx.strokeRect(35, 35, width - 70, height - 70);
            ctx.restore();
            break;
        }
        case 'template_9': { // Dark Violet Flora
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#11061c');
            bgGrad.addColorStop(1, '#2c0d59');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
            for (let i = 0; i < 6; i++) {
                ctx.beginPath();
                ctx.ellipse(width * 0.8, 100 + i * 50, 80, 25, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            break;
        }
        case 'template_10': { // Neon Cyber Wing
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#01170c');
            bgGrad.addColorStop(1, '#054433');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(50, height - 50);
            ctx.lineTo(width * 0.45, height - 50);
            ctx.lineTo(width * 0.55, 50);
            ctx.lineTo(width - 50, 50);
            ctx.stroke();
            ctx.restore();
            break;
        }
        case 'template_11': { // Crimson Crystals
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#150209');
            bgGrad.addColorStop(1, '#3f0415');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = 'rgba(225, 29, 72, 0.25)';
            ctx.beginPath();
            ctx.moveTo(100, 50); ctx.lineTo(200, 20); ctx.lineTo(160, 120); ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(width - 120, height - 40); ctx.lineTo(width - 40, height - 100); ctx.lineTo(width - 150, height - 120); ctx.closePath(); ctx.fill();
            ctx.restore();
            break;
        }
        case 'template_12': { // Purple Banner 3D
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#19052d');
            bgGrad.addColorStop(1, '#4c1077');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = 'rgba(147, 51, 234, 0.35)';
            ctx.beginPath();
            ctx.moveTo(0, height * 0.6);
            ctx.bezierCurveTo(width * 0.3, height * 0.3, width * 0.7, height * 0.8, width, height * 0.5);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            break;
        }
        case 'template_13': { // Dark Smoke Minimal
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#090a0f');
            bgGrad.addColorStop(1, '#181920');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 40, width - 80, height - 80);
            ctx.restore();
            break;
        }
        case 'template_14': { // Burgundy Wave Ribbon
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#1c0307');
            bgGrad.addColorStop(1, '#3b070f');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = 'rgba(153, 27, 27, 0.4)';
            ctx.beginPath();
            ctx.moveTo(0, 100);
            ctx.bezierCurveTo(width * 0.4, 250, width * 0.6, 50, width, 200);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            break;
        }
        case 'template_15': { // Red Gamer Bar
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#0c0202');
            bgGrad.addColorStop(1, '#1e0404');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(30, 30, 8, height - 60);
            ctx.fillRect(width - 38, 30, 8, height - 60);
            ctx.restore();
            break;
        }
        case 'template_1':
        default: { // Dark Cyber Wave / Blue Neon
            const bgGrad = ctx.createLinearGradient(0, 0, width, height);
            bgGrad.addColorStop(0, '#030712');
            bgGrad.addColorStop(0.5, '#0f172a');
            bgGrad.addColorStop(1, '#1e1b4b');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
            ctx.lineWidth = 1.5;
            for (let x = 0; x < width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
            }
            for (let y = 0; y < height; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
            }

            ctx.beginPath();
            ctx.moveTo(0, height * 0.7);
            ctx.bezierCurveTo(width * 0.3, height * 0.5, width * 0.7, height * 0.9, width, height * 0.65);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            const waveGrad = ctx.createLinearGradient(0, height * 0.5, width, height);
            waveGrad.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
            waveGrad.addColorStop(1, 'rgba(30, 58, 138, 0.5)');
            ctx.fillStyle = waveGrad;
            ctx.fill();
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
            break;
        }
    }
    ctx.restore();
}

// Render Welcome Card
async function renderWelcomeCard(member, config = {}) {
    const width = 1024;
    const height = 500;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const templateId = config.templateId || 'template_1';
    const bgType = config.backgroundType || 'template';

    // 1. Background
    if (bgType === 'custom' && config.customBackgroundUrl) {
        try {
            const bgImg = await loadImage(config.customBackgroundUrl);
            // Proportional cover drawing to never distort or compress the image aspect ratio
            const imgRatio = bgImg.width / bgImg.height;
            const canvasRatio = width / height;
            let drawW, drawH, drawX, drawY;
            if (imgRatio > canvasRatio) {
                drawH = height;
                drawW = height * imgRatio;
                drawX = (width - drawW) / 2;
                drawY = 0;
            } else {
                drawW = width;
                drawH = width / imgRatio;
                drawX = 0;
                drawY = (height - drawH) / 2;
            }
            ctx.drawImage(bgImg, drawX, drawY, drawW, drawH);
        } catch (e) {
            console.warn('[Welcome Custom BG Load Failed]:', e.message);
            drawTemplateBackground(ctx, templateId, width, height);
        }
    } else {
        drawTemplateBackground(ctx, templateId, width, height);
    }

    // 2. Avatar
    const avX = Number(config.avatarX ?? 512);
    const avY = Number(config.avatarY ?? 150);
    const avRadius = Number(config.avatarRadius ?? 90);
    const borderWidth = Number(config.avatarBorderWidth ?? 4);
    const borderColor = config.avatarBorderColor || '#3b82f6';

    let avatarImg = null;
    try {
        const avatarUrl = member.displayAvatarURL ? member.displayAvatarURL({ extension: 'png', size: 512 }) : (member.user?.displayAvatarURL ? member.user.displayAvatarURL({ extension: 'png', size: 512 }) : null);
        if (avatarUrl) {
            avatarImg = await loadImage(avatarUrl);
        }
    } catch (e) {
        console.warn('[Welcome Avatar Load Failed]:', e.message);
    }

    if (avatarImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX, avY, avRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, avX - avRadius, avY - avRadius, avRadius * 2, avRadius * 2);
        ctx.restore();
    } else {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX, avY, avRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.floor(avRadius)}px Cairo, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const initial = (member.displayName || member.user?.username || 'U')[0].toUpperCase();
        ctx.fillText(initial, avX, avY);
        ctx.restore();
    }

    if (borderWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(avX, avY, avRadius, 0, Math.PI * 2);
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = borderColor;
        ctx.shadowColor = borderColor;
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
    }

    // 3. Text Lines
    const formatText = (txt) => {
        if (!txt) return '';
        return txt
            .replace(/\(user\)/gi, member.user ? member.user.username : (member.displayName || 'العضو'))
            .replace(/\(Mentionuser\)/gi, `@${member.user ? member.user.username : (member.displayName || 'العضو')}`)
            .replace(/\(Server\)/gi, member.guild?.name || 'السيرفر')
            .replace(/\(Guildmember\)/gi, String(member.guild?.memberCount || '1'));
    };

    const drawLine = (text, x, y, fontName, size, color, align) => {
        if (!text) return;
        const formatted = formatText(text);
        ctx.save();
        ctx.font = `bold ${size}px "${fontName || 'Cairo'}", sans-serif`;
        ctx.fillStyle = color || '#ffffff';
        ctx.textAlign = align || 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 3;
        ctx.fillText(formatted, x, y);
        ctx.restore();
    };

    if (config.text1 !== undefined && config.text1 !== '') {
        drawLine(config.text1, Number(config.text1X ?? 512), Number(config.text1Y ?? 295), config.text1Font || 'Cairo', Number(config.text1Size ?? 34), config.text1Color || '#ffffff', config.text1Align || 'center');
    }

    if (config.text2 !== undefined && config.text2 !== '') {
        drawLine(config.text2, Number(config.text2X ?? 512), Number(config.text2Y ?? 365), config.text2Font || 'Cairo', Number(config.text2Size ?? 44), config.text2Color || '#38bdf8', config.text2Align || 'center');
    }

    if (config.text3 !== undefined && config.text3 !== '') {
        drawLine(config.text3, Number(config.text3X ?? 512), Number(config.text3Y ?? 420), config.text3Font || 'Tajawal', Number(config.text3Size ?? 22), config.text3Color || '#94a3b8', config.text3Align || 'center');
    }

    return canvas.toBuffer('image/png');
}

// Handle Welcome Member Event / Test
async function handleWelcomeMember(member, isTest = false, testData = null) {
    const db = getDB();
    const welcome = testData || db[member.guild.id]?.welcome;
    if (!welcome) return { success: false, error: 'نظام الترحيب غير مفعل أو غير مضبوط.' };
    if (!isTest && !welcome.enabled) return { success: false, error: 'نظام الترحيب معطل.' };

    const channelId = welcome.channelId;
    if (!channelId) return { success: false, error: 'لم يتم تحديد روم الترحيب.' };

    const channel = member.guild.channels.cache.get(channelId) || await member.guild.channels.fetch(channelId).catch(() => null);
    if (!channel) return { success: false, error: 'تعذر العثور على روم الترحيب في السيرفر.' };

    const formatVars = (str) => {
        if (!str) return '';
        return str
            .replace(/\(user\)/gi, member.user ? member.user.username : (member.displayName || 'العضو'))
            .replace(/\(Mentionuser\)/gi, `<@${member.id}>`)
            .replace(/\(Server\)/gi, member.guild.name)
            .replace(/\(Guildmember\)/gi, String(member.guild.memberCount || 1));
    };

    const displayMode = welcome.displayMode || 'text_image';
    let imageAttachment = null;

    const needsImage = ['image_only', 'text_image', 'embed_image', 'text_embed_image'].includes(displayMode);
    if (needsImage) {
        try {
            const buffer = await renderWelcomeCard(member, welcome);
            if (buffer) {
                imageAttachment = new AttachmentBuilder(buffer, { name: 'welcome.png' });
            }
        } catch (imgErr) {
            console.error('[Welcome Card Render Error]:', imgErr);
        }
    }

    const rawMessageText = welcome.messageText || 'مرحباً بك يا (Mentionuser) في سيرفر (Server)! نورتنا وأنت العضو رقم (Guildmember) 🎉';
    const formattedText = formatVars(rawMessageText);

    let embed = null;
    let container = null;
    const needsEmbed = ['embed_only', 'text_embed', 'embed_image', 'text_embed_image'].includes(displayMode);

    if (needsEmbed) {
        const embTitle = formatVars(welcome.embedTitle || '🎉 مرحباً بك في السيرفر!');
        const embDesc = formatVars(welcome.embedDesc || 'أهلاً وسهلاً بك (Mentionuser) في **(Server)**\nنتمنى لك قضاء وقت ممتع معنا!\nأنت العضو رقم **#(Guildmember)** في مجتمعنا.');
        const embColor = welcome.embedColor || '#5865F2';
        const embFooter = formatVars(welcome.embedFooter || `سيرفر ${member.guild.name}`);

        if (welcome.isV2) {
            try {
                container = new ContainerBuilder();
                if (embColor) {
                    try { container.setAccentColor(parseInt(embColor.replace('#', ''), 16)); } catch(e) {}
                }
                if (embTitle) {
                    container.addTextDisplayComponents(td => td.setContent(`## ${embTitle}`));
                    container.addSeparatorComponents(s => s.setDivider(true));
                }
                if (embDesc) {
                    const separatorRegex = /\{type:\s*18\}|--- \[ خط فاصل \] ---|^\s*---\s*$/gm;
                    if (separatorRegex.test(embDesc)) {
                        const parts = embDesc.split(separatorRegex);
                        parts.forEach((part, pIdx) => {
                            if (part.trim()) container.addTextDisplayComponents(td => td.setContent(part.trim()));
                            if (pIdx < parts.length - 1) container.addSeparatorComponents(s => s.setDivider(true));
                        });
                    } else {
                        container.addTextDisplayComponents(td => td.setContent(embDesc));
                    }
                }
                if (imageAttachment && ['embed_image', 'text_embed_image'].includes(displayMode)) {
                    container.addMediaGalleryComponents(mg => mg.addItems('attachment://welcome.png'));
                }
                if (embFooter) {
                    container.addSeparatorComponents(s => s.setDivider(true));
                    container.addTextDisplayComponents(td => td.setContent(`-# ${embFooter}`));
                }
            } catch(e) {
                console.warn('V2 Welcome Container Fallback:', e);
                container = null;
            }
        }

        if (!container) {
            embed = new EmbedBuilder().setColor(embColor);
            if (embTitle && embTitle.trim()) embed.setTitle(embTitle.trim());
            if (embDesc && embDesc.trim()) embed.setDescription(embDesc.trim());

            if (embFooter) embed.setFooter({ text: embFooter });
            if (welcome.embedThumbnail === 'avatar') {
                const av = member.user ? member.user.displayAvatarURL({ size: 256 }) : member.displayAvatarURL({ size: 256 });
                embed.setThumbnail(av);
            } else if (welcome.embedThumbnail === 'server' && member.guild.iconURL()) {
                embed.setThumbnail(member.guild.iconURL({ size: 256 }));
            }
            if (imageAttachment && ['embed_image', 'text_embed_image'].includes(displayMode)) {
                embed.setImage('attachment://welcome.png');
            }
        }
    }

    const sendPayload = {};

    if (['text_only', 'text_image', 'text_embed', 'text_embed_image'].includes(displayMode)) {
        if (formattedText) sendPayload.content = formattedText;
    }

    if (imageAttachment) {
        sendPayload.files = [imageAttachment];
    }

    if (container) {
        sendPayload.components = [container.toJSON()];
        
    } else if (embed) {
        sendPayload.embeds = [embed];
    }

    await channel.send(sendPayload);
    return { success: true, channelName: channel.name };
}

global.handleWelcomeMember = handleWelcomeMember;
global.renderWelcomeCard = renderWelcomeCard;

client.on('guildMemberAdd', async member => {
    if (!member.user.bot) {
        try {
            // Trigger Welcome System
            handleWelcomeMember(member).catch(err => console.error('[Welcome Trigger Error]:', err));

            const db = getDB();
            if (!db.liraClaimedMembers) db.liraClaimedMembers = {};
            if (!db.liraClaimedMembers[member.id]) {
                db.liraClaimedMembers[member.id] = true;
                saveDB(db);
                const reward = 50;
                setUserLira(member.id, getUserLira(member.id) + reward);
                member.send({
                    content: `<:Lira:1536827269396308118> **مرحباً بك! لقد حصلت على \`$${reward}\` ليرة كمكافأة انضمام للسيرفر!**`
                }).catch(() => {});
            }
        } catch (e) {}
        return;
    }

    const db = getDB();
    const protect = db[member.guild.id]?.protection?.bots;
    if (protect && protect.enabled) {
        await member.ban({ reason: 'NTL Bot Protection' }).catch(() => null);
        const exec = await getExecutor(member.guild, 28);
        if (exec && exec.id !== member.guild.ownerId) {
            await applyPunishment(member.guild, exec, protect, 'إدخال بوت غير مصرح به', member.user.username);
            const owner = await member.guild.fetchOwner().catch(() => null);
            if (owner) {
                const embed = new EmbedBuilder().setColor('Red').setTitle('⚠️ تنبيه نظام الحماية').setDescription(`تم حظر البوت المضاف تلقائياً لحماية الخادم.\n\n**البوت:** ${member.user.username}\n**الداعي:** <@${exec.id}>\n**الإجراء:** حظر البوت وتطبيق العقوبة.`);
                await owner.send({ embeds: [embed] }).catch(() => {});
            }
        }
    }
});

async function sendAIResponse(message, cleanResponse, aiConfig) {
    // Strip out or replace @everyone and @here just in case to avoid any potential pinging
    let safeContent = cleanResponse
        .replace(/@everyone/g, '@\u200beveryone')
        .replace(/@here/g, '@\u200bhere');
    
    // Also remove/strip any role pings <@&roleId> to protect against role pinging
    safeContent = safeContent.replace(/<@&(\d+)>/g, '@role');

    if (safeContent.length > 1950) {
        safeContent = safeContent.substring(0, 1950) + '...';
    }

    try {
        await message.reply({
            content: safeContent,
            allowedMentions: { parse: ['users'], repliedUser: true }
        });
    } catch (err) {
        console.warn('Direct reply failed, sending to channel:', err.message);
        await message.channel.send({
            content: `<@${message.author.id}> ${safeContent}`,
            allowedMentions: { parse: ['users'] }
        }).catch(console.error);
    }
}

function hasSwearWords(text) {
    if (!text) return false;
    const badWords = [
        'كلب', 'حمار', 'تفو', 'يلعن', 'شرموط', 'منيوك', 'قحبة', 'حثالة', 'غبي', 'كس اخت', 
        'ابن الكلب', 'ولد الكلب', 'بنت الكلب', 'خرا', 'زق', 'حيوان', 'جحش', 'تيس', 'منحط', 
        'سافل', 'حقير', 'تفه', 'انقلع', 'امشي يا', 'يا فاشل', 'يا زبالة', 'كول هوا', 'كل تراب',
        'مغفل', 'ابن الحرام', 'قواد', 'عرص'
    ];
    const cleanText = text.toLowerCase();
    return badWords.some(word => cleanText.includes(word));
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // --- Trade System Logic ---
    if (message.guildId) {
        ensureGuildData(message.guildId);
        const db = getDB();
        const tradeCfg = db[message.guildId]?.trade;
        if (tradeCfg?.enabled && message.channelId === tradeCfg.channelId) {
            await message.delete().catch(() => {});

            let webhook = await message.channel.fetchWebhooks().then(whs => whs.find(wh => wh.name === 'TradeWebhook')).catch(() => null);
            if (!webhook) {
                webhook = await message.channel.createWebhook({
                    name: 'TradeWebhook',
                    avatar: client.user.displayAvatarURL(),
                    reason: 'NTL Trade System'
                }).catch(() => null);
            }

            if (webhook) {
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`trade_offer_${message.author.id}_${message.id}`)
                        .setLabel('تقديم عرض')
                        .setEmoji('1543288039302758470')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setEmoji('1511327391669026916')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://discord.gg/hBvzFrqQP2')
                );

                await webhook.send({
                    content: message.content,
                    username: message.member.displayName,
                    avatarURL: message.author.displayAvatarURL(),
                    components: [row]
                });

                if (tradeCfg.logChannelId) {
                    const logCh = message.guild.channels.cache.get(tradeCfg.logChannelId);
                    if (logCh) {
                        const logEmbed = new EmbedBuilder()
                            .setColor('#2b2d31')
                            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
                            .setTitle('رسالة تبادل جديدة')
                            .setDescription(message.content?.trim() ? message.content : '*(رسالة بدون محتوى نصي / مرفق فقط)*')
                            .setFooter({ text: `User ID: ${message.author.id}` })
                            .setTimestamp();
                        await logCh.send({ embeds: [logEmbed] });
                    }
                }
            }
            return;
        }
    }
    // --- End Trade System Logic ---

    // Real-time Ticket Log Creator (Filtered instantly via Set)
    if (message.guildId && activeTicketChannels.has(message.channelId)) {
        const db = getDB();
        const ticket = db[message.guildId]?.tickets?.[message.channelId];
        if (ticket) {
            if (!ticket.logs) ticket.logs = [];
            if (ticket.logs.length > 100) ticket.logs.shift(); // Limit log size
            ticket.logs.push({
                id: message.id,
                type: 'create',
                author: {
                    id: message.author.id,
                    username: message.author.username,
                    avatar: message.author.displayAvatarURL()
                },
                content: message.content || '',
                timestamp: message.createdTimestamp,
                attachments: message.attachments.map(a => a.url)
            });
            saveDB(db);
        }
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (!newMessage.guildId || !activeTicketChannels.has(newMessage.channelId)) return;

    if (newMessage.partial) {
        try {
            await newMessage.fetch();
        } catch (err) {}
    }
    if (oldMessage.partial) {
        try {
            await oldMessage.fetch().catch(() => {});
        } catch (err) {}
    }

    const db = getDB();
    const ticket = db[newMessage.guildId]?.tickets?.[newMessage.channelId];
    if (ticket) {
        if (!ticket.logs) ticket.logs = [];
        const existing = ticket.logs.find(l => l.id === newMessage.id);
        if (existing) {
            if (existing.type !== 'edit') {
                existing.oldContent = existing.content || '';
            }
            existing.type = 'edit';
            existing.content = newMessage.content || '';
            existing.newContent = newMessage.content || '';
        } else {
            if (ticket.logs.length > 100) ticket.logs.shift();
            ticket.logs.push({
                id: newMessage.id,
                type: 'edit',
                author: {
                    id: newMessage.author?.id || 'Unknown',
                    username: newMessage.author?.username || 'Unknown',
                    avatar: newMessage.author?.displayAvatarURL?.() || 'https://discord.com/assets/c09a8043c34371a301990a180ecac357.png'
                },
                oldContent: oldMessage.content || '',
                newContent: newMessage.content || '',
                content: newMessage.content || '',
                timestamp: newMessage.editedTimestamp || Date.now()
            });
        }
        saveDB(db);
    }
});

client.on('messageDelete', async message => {
    if (!message.guildId || !activeTicketChannels.has(message.channelId)) return;

    const db = getDB();
    const ticket = db[message.guildId]?.tickets?.[message.channelId];
    if (ticket) {
        if (!ticket.logs) ticket.logs = [];
        const existing = ticket.logs.find(l => l.id === message.id);
        if (existing) {
            existing.type = 'delete';
        } else {
            if (ticket.logs.length > 100) ticket.logs.shift();
            ticket.logs.push({
                id: message.id,
                type: 'delete',
                author: {
                    id: message.author?.id || 'Unknown',
                    username: message.author?.username || 'Unknown',
                    avatar: message.author?.displayAvatarURL?.() || 'https://discord.com/assets/c09a8043c34371a301990a180ecac357.png'
                },
                content: message.content || '',
                timestamp: Date.now()
            });
        }
        saveDB(db);
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (isUserBlacklisted(message.author.id)) return;
    
    // --- Sticky Channel Auto Panels System (بانلات الرومات التلقائية المتجددة مع كل رسالة) ---
    if (message.guildId && !message.author.bot) {
        try {
            const db = getDB();
            const stickyPanels = db[message.guildId]?.stickyPanels;
            if (Array.isArray(stickyPanels) && stickyPanels.length > 0) {
                const activePanel = stickyPanels.find(p => p && p.enabled && p.channelId === message.channelId);
                if (activePanel && (activePanel.content || activePanel.title)) {
                    const oldMsgId = activePanel.lastMessageId;
                    if (oldMsgId && oldMsgId !== message.id) {
                        message.channel.messages.fetch(oldMsgId).then(oldMsg => {
                            if (oldMsg && oldMsg.deletable) {
                                oldMsg.delete().catch(() => {});
                            }
                        }).catch(() => {});
                    }

                    const sendPayload = {};
                    if (activePanel.embed !== false) {
                        const embed = new EmbedBuilder()
                            .setColor(activePanel.color || '#5865f2');
                        if (activePanel.title) embed.setTitle(activePanel.title);
                        if (activePanel.content) embed.setDescription(activePanel.content);
                        if (activePanel.imageUrl && activePanel.imageUrl.startsWith('http')) embed.setImage(activePanel.imageUrl);
                        if (activePanel.footer) embed.setFooter({ text: activePanel.footer });
                        sendPayload.embeds = [embed];
                    } else {
                        sendPayload.content = activePanel.title ? `**${activePanel.title}**\n\n${activePanel.content}` : activePanel.content;
                    }

                    message.channel.send(sendPayload).then(newMsg => {
                        if (newMsg) {
                            activePanel.lastMessageId = newMsg.id;
                            saveDB(db);
                        }
                    }).catch(err => {
                        console.error('[Sticky Panel Send Error]:', err.message);
                    });
                }
            }
        } catch (stickyErr) {
            console.error('[Sticky Panel Error]:', stickyErr);
        }
    }

    // --- Lua Obfuscation System ---
    if (message.guildId) {
        const db = getDB();
        const obfCfg = db[message.guildId]?.obfuscation;
        if (obfCfg?.enabled && message.channelId === obfCfg.channelId) {
            let luaCode = '';
            let fileName = 'obfuscated.txt';

            // 1. Check for attachments
            const luaAttachment = message.attachments.find(a => a.name.endsWith('.lua') || a.name.endsWith('.txt'));
            if (luaAttachment) {
                try {
                    const response = await axios.get(luaAttachment.url);
                    luaCode = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
                    fileName = luaAttachment.name.replace('.lua', '_obf.txt').replace('.txt', '_obf.txt');
                } catch (err) {
                    console.error('[Obfuscation Download Error]:', err);
                }
            } else {
                // 2. Check for code blocks in content
                const codeBlockMatch = message.content.match(/```(?:lua)?\s*([\s\S]+?)```/i);
                if (codeBlockMatch) {
                    luaCode = codeBlockMatch[1];
                } else if (message.content.trim().startsWith('--') || message.content.includes('function') || message.content.includes('local ')) {
                    // Fallback: Check if it looks like lua
                    luaCode = message.content;
                }
            }

            if (luaCode) {
                const typing = message.channel.sendTyping();
                const obfuscated = obfuscateLua(luaCode);
                const buffer = Buffer.from(obfuscated, 'utf-8');
                const attachment = new AttachmentBuilder(buffer, { name: fileName });
                
                await message.reply({ 
                    content: `<:encryption:1544403685763850332> |**Your lua deobfuscators script**`, 
                    files: [attachment] 
                }).catch(console.error);
                
                // Optional: Delete original message if it's just code
                if (luaCode.length > 10) {
                    await message.delete().catch(() => {});
                }
                return;
            }
        }
    }

    // --- Moderation Commands & Shortcuts System (نظام الإشراف الشامل والاختصارات) ---
    if (message.guildId && message.guild) {
        try {
            const db = getDB();
            const modConfig = db[message.guildId]?.moderation;
            const defaultCmds = {
                lock: { enabled: true, name: "lock", shortcuts: ["lock", "قفل"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ManageChannels" },
                unlock: { enabled: true, name: "unlock", shortcuts: ["unlock", "فتح"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ManageChannels" },
                ban: { enabled: true, name: "ban", shortcuts: ["ban", "b", "حظر"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "BanMembers" },
                unban: { enabled: true, name: "unban", shortcuts: ["unban", "فك_حظر", "فك_البان"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "BanMembers" },
                timeout: { enabled: true, name: "timeout", shortcuts: ["tm", "timeout", "mute", "اسكت"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ModerateMembers" },
                untimeout: { enabled: true, name: "untimeout", shortcuts: ["untimeout", "untm", "تكلم", "الغاء_الاسكات"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ModerateMembers" },
                hide: { enabled: true, name: "hide", shortcuts: ["hide", "اخفاء"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ManageChannels" },
                unhide: { enabled: true, name: "unhide", shortcuts: ["unhide", "اظهار"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ManageChannels" },
                message: { enabled: true, name: "message", shortcuts: ["msg", "message", "رسالة", "قول"], allowedRoles: [], allowedUsers: [], deniedRoles: [], deniedUsers: [], defaultPermission: "ManageMessages" }
            };

            const activeCmds = modConfig?.commands || defaultCmds;
            const rawContent = message.content.trim();
            const parts = rawContent.split(/\s+/);
            const triggerWord = parts[0].toLowerCase();
            const strippedWord = triggerWord.replace(/^[-!/.]/, '');

            let matchedCmdKey = null;
            let matchedCmd = null;

            for (const [key, cmd] of Object.entries(activeCmds)) {
                if (!cmd || cmd.enabled === false) continue;
                const shortcuts = (cmd.shortcuts || []).map(s => (s || '').toLowerCase());
                if (shortcuts.includes(triggerWord) || shortcuts.includes(strippedWord)) {
                    matchedCmdKey = key;
                    matchedCmd = cmd;
                    break;
                }
            }

            if (matchedCmdKey && matchedCmd) {
                const member = message.member;
                const isDeniedUser = matchedCmd.deniedUsers?.some(u => u === message.author.id || u === message.author.username);
                const isDeniedRole = matchedCmd.deniedRoles?.some(rId => member?.roles.cache.has(rId));

                if (!isDeniedUser && !isDeniedRole) {
                    const isOwner = message.author.id === message.guild.ownerId || message.author.id === '1179133837930938470';
                    const isAdmin = member?.permissions?.has(PermissionsBitField.Flags.Administrator);

                    const hasAllowedRoles = matchedCmd.allowedRoles && matchedCmd.allowedRoles.length > 0;
                    const hasAllowedUsers = matchedCmd.allowedUsers && matchedCmd.allowedUsers.length > 0;

                    let hasPermission = false;
                    if (isOwner || isAdmin) {
                        hasPermission = true;
                    } else if (hasAllowedRoles || hasAllowedUsers) {
                        if (hasAllowedUsers && (matchedCmd.allowedUsers.includes(message.author.id) || matchedCmd.allowedUsers.includes(message.author.username))) {
                            hasPermission = true;
                        }
                        if (hasAllowedRoles && matchedCmd.allowedRoles.some(rId => member?.roles.cache.has(rId))) {
                            hasPermission = true;
                        }
                    } else {
                        const permMap = {
                            timeout: PermissionsBitField.Flags.ModerateMembers,
                            untimeout: PermissionsBitField.Flags.ModerateMembers,
                            ban: PermissionsBitField.Flags.BanMembers,
                            unban: PermissionsBitField.Flags.BanMembers,
                            lock: PermissionsBitField.Flags.ManageChannels,
                            unlock: PermissionsBitField.Flags.ManageChannels,
                            hide: PermissionsBitField.Flags.ManageChannels,
                            unhide: PermissionsBitField.Flags.ManageChannels,
                            message: PermissionsBitField.Flags.ManageMessages
                        };
                        const reqPerm = permMap[matchedCmdKey] || PermissionsBitField.Flags.ManageMessages;
                        hasPermission = member?.permissions?.has(reqPerm);
                    }

                    if (hasPermission) {
                        const args = parts.slice(1);

                        // If invoked without arguments on help-supported commands: send Components V2 info embed
                        if (args.length === 0 && ['timeout', 'untimeout', 'ban', 'unban'].includes(matchedCmdKey)) {
                            const helpPayload = buildModHelpPayload(matchedCmdKey, matchedCmd, message.author.id);
                            if (helpPayload) await message.channel.send(helpPayload).catch(() => {});
                            return;
                        }

                        // Execution with parameters:
                        if (matchedCmdKey === 'timeout') {
                            const targetUser = message.mentions.users.first() || (args[0] && await client.users.fetch(args[0].replace(/[<@!>]/g, '')).catch(() => null));
                            if (!targetUser) {
                                return message.reply({ content: `❌ **يرجى تحديد العضو والمدة!** مثال: \`${matchedCmd.shortcuts[0] || 'tm'} @someone 10m\`` }).catch(() => {});
                            }

                            const targetMember = await message.guild.members.fetch(targetUser.id).catch(() => null);
                            if (!targetMember) {
                                return message.reply({ content: `❌ **العضو غير موجود في السيرفر!**` }).catch(() => {});
                            }

                            if (!targetMember.moderatable) {
                                return message.reply({ content: `❌ **لا يمكن للبوت إسكات هذا العضو (رتبته أعلى من البوت أو يملك صلاحيات عليا)!**` }).catch(() => {});
                            }

                            const durationStr = args[1] || '10m';
                            const match = durationStr.match(/^(\d+)([smhdw])$/i);
                            let durationMs = 10 * 60 * 1000;

                            if (match) {
                                const count = parseInt(match[1]);
                                const unit = match[2].toLowerCase();
                                if (unit === 's') durationMs = count * 1000;
                                else if (unit === 'm') durationMs = count * 60 * 1000;
                                else if (unit === 'h') durationMs = count * 60 * 60 * 1000;
                                else if (unit === 'd') durationMs = count * 24 * 60 * 60 * 1000;
                                else if (unit === 'w') durationMs = count * 7 * 24 * 60 * 60 * 1000;
                            }

                            const reason = args.slice(2).join(' ') || 'إسكات مؤقت بواسطة المشرف';

                            try {
                                await targetMember.timeout(durationMs, `${reason} | بواسطة ${message.author.tag}`);
                                const endTimestamp = Math.floor((Date.now() + durationMs) / 1000);

                                await message.channel.send(buildTimeoutPayload(targetMember.id, endTimestamp, message.author.id));
                            } catch (timeoutErr) {
                                message.reply({ content: `❌ فشل تطبيق الإسكات: ${timeoutErr.message}` }).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'untimeout') {
                            const targetUser = message.mentions.users.first() || (args[0] && await client.users.fetch(args[0].replace(/[<@!>]/g, '')).catch(() => null));
                            if (!targetUser) return message.reply('❌ يرجى تحديد العضو لإلغاء الإسكات.');

                            const targetMember = await message.guild.members.fetch(targetUser.id).catch(() => null);
                            if (!targetMember) return message.reply('❌ العضو غير متواجد بالسيرفر.');

                            try {
                                await targetMember.timeout(null, `إلغاء الإسكات بواسطة ${message.author.tag}`);
                                const untimeoutEmbed = new EmbedBuilder()
                                    .setColor('#10b981')
                                    .setDescription(`<:time:1525620369879339168> — **تم إلغاء إسكات الـ<@${targetMember.id}> بواسطة \`${message.author.username}\`**`);

                                await message.channel.send({
                                    embeds: [untimeoutEmbed],
                                    allowedMentions: { parse: [] }
                                });
                            } catch (err) {
                                message.reply(`❌ فشل إلغاء الإسكات: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'ban') {
                            const targetUser = message.mentions.users.first() || (args[0] && await client.users.fetch(args[0].replace(/[<@!>]/g, '')).catch(() => null));
                            if (!targetUser) return message.reply('❌ يرجى تحديد العضو لعمل حظر (Ban).');

                            const reason = args.slice(1).join(' ') || 'مخالفة القوانين';
                            try {
                                await message.guild.members.ban(targetUser.id, { reason: `${reason} | بواسطة ${message.author.tag}` });
                                const bar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                                const banEmbed = new EmbedBuilder()
                                    .setColor('#ef4444')
                                    .setDescription(`<:Bann:1556246670671609887> — **تم حظر الـ<@${targetUser.id}> من السيرفر**\n${bar}\n**السبب:** ${reason}`);

                                await message.channel.send({ embeds: [banEmbed], allowedMentions: { parse: [] } });
                            } catch (err) {
                                message.reply(`❌ فشل حظر العضو: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'unban') {
                            const targetId = args[0] ? args[0].replace(/[<@!>]/g, '') : null;
                            if (!targetId) return message.reply('❌ يرجى كتابة آيدي العضو لفك الحظر عنه.');

                            try {
                                await message.guild.bans.remove(targetId, `إلغاء حظر بواسطة ${message.author.tag}`);
                                const unbanEmbed = new EmbedBuilder()
                                    .setColor('#10b981')
                                    .setDescription(`<:Bann:1556246670671609887> — **تم إلغاء حظر الـ<@${targetId}> بواسطة \`${message.author.username}\`**`);

                                await message.channel.send({ embeds: [unbanEmbed], allowedMentions: { parse: [] } });
                            } catch (err) {
                                message.reply(`❌ فشل فك الحظر: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'lock') {
                            const targetChannel = message.mentions.channels.first() || message.channel;
                            try {
                                await targetChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
                                    SendMessages: false
                                }, { reason: `قفل الروم بواسطة ${message.author.tag}` });

                                const lockEmbed = new EmbedBuilder()
                                    .setColor('#f59e0b')
                                    .setDescription(`🔒 — **تم قفل الروم بنجاح <#${targetChannel.id}>**`);

                                await message.channel.send({ embeds: [lockEmbed] });
                            } catch (err) {
                                message.reply(`❌ فشل قفل الروم: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'unlock') {
                            const targetChannel = message.mentions.channels.first() || message.channel;
                            try {
                                await targetChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
                                    SendMessages: null
                                }, { reason: `فتح الروم بواسطة ${message.author.tag}` });

                                const unlockEmbed = new EmbedBuilder()
                                    .setColor('#10b981')
                                    .setDescription(`🔓 — **تم فتح الروم بنجاح <#${targetChannel.id}>**`);

                                await message.channel.send({ embeds: [unlockEmbed] });
                            } catch (err) {
                                message.reply(`❌ فشل فتح الروم: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'hide') {
                            const targetChannel = message.mentions.channels.first() || message.channel;
                            try {
                                await targetChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
                                    ViewChannel: false
                                }, { reason: `إخفاء الروم بواسطة ${message.author.tag}` });

                                const hideEmbed = new EmbedBuilder()
                                    .setColor('#8b5cf6')
                                    .setDescription(`👁️‍🗨️ — **تم إخفاء الروم بنجاح <#${targetChannel.id}>**`);

                                await message.channel.send({ embeds: [hideEmbed] });
                            } catch (err) {
                                message.reply(`❌ فشل إخفاء الروم: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'unhide') {
                            const targetChannel = message.mentions.channels.first() || message.channel;
                            try {
                                await targetChannel.permissionOverwrites.edit(message.guild.roles.everyone, {
                                    ViewChannel: null
                                }, { reason: `إظهار الروم بواسطة ${message.author.tag}` });

                                const unhideEmbed = new EmbedBuilder()
                                    .setColor('#10b981')
                                    .setDescription(`👁️ — **تم إظهار الروم بنجاح <#${targetChannel.id}>**`);

                                await message.channel.send({ embeds: [unhideEmbed] });
                            } catch (err) {
                                message.reply(`❌ فشل إظهار الروم: ${err.message}`).catch(() => {});
                            }
                            return;
                        }

                        if (matchedCmdKey === 'message') {
                            const targetChannel = message.mentions.channels.first() || message.channel;
                            const msgText = message.mentions.channels.first() ? args.slice(1).join(' ') : args.join(' ');
                            if (!msgText) return message.reply('❌ يرجى كتابة نص الرسالة المراد إرسالها.');

                            try {
                                await targetChannel.send(msgText);
                                await message.delete().catch(() => {});
                            } catch (err) {
                                message.reply(`❌ فشل إرسال الرسالة: ${err.message}`).catch(() => {});
                            }
                            return;
                        }
                    }
                }
            }
        } catch (modErr) {
            console.error('[Moderation System Error]:', modErr);
        }
    }

    if (message.content.startsWith('-سكربت')) {
        try {
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            
            if (!isOwner) {
                console.log(`[Script Command]: Access denied for ${message.author.tag} (${message.author.id})`);
                return;
            }

            const args = message.content.slice(7).trim().split('|').map(a => a.trim());
            const action = args[0];
            const scripts = getManualScripts();

            console.log(`[Script Command]: Action: ${action}, Args Count: ${args.length}`);

            if (action === 'إضافة') {
                if (args.length < 6) return message.reply('❌ تنسيق خاطئ. مثال:\n`-سكربت إضافة | موثوق | بدون مفتاح | Blox Fruits | Redz Hub | loadstring(...)()`');
                const isTrusted = args[1] === 'موثوق';
                const hasKey = args[2] === 'مفتاح';
                const gameName = args[3];
                const scriptName = args[4];
                const scriptCode = args[5];

                scripts.push({
                    title: scriptName,
                    game: { name: gameName, imageUrl: "" },
                    key: hasKey,
                    verified: isTrusted,
                    views: 0,
                    likeCount: 0,
                    script: scriptCode,
                    source: "Manual",
                    id: "manual_" + Date.now()
                });
                saveManualScripts(scripts);
                return message.reply(`✅ **تم إضافة السكربت \`${scriptName}\` بنجاح!**`);
            } else if (action === 'حذف') {
                const name = args[1];
                if (!name) return message.reply('❌ يرجى كتابة اسم السكربت المراد حذفه.');
                const filtered = scripts.filter(s => s.title !== name);
                if (filtered.length === scripts.length) return message.reply('❌ لم يتم العثور على سكربت بهذا الاسم.');
                saveManualScripts(filtered);
                return message.reply(`✅ **تم حذف السكربت \`${name}\` بنجاح!**`);
            } else if (action === 'تعديل') {
                const name = args[1];
                if (!name) return message.reply('❌ يرجى كتابة اسم السكربت المراد تعديله.');
                const index = scripts.findIndex(s => s.title === name);
                if (index === -1) return message.reply('❌ لم يتم العثور على سكربت بهذا الاسم.');
                
                if (args[2]) scripts[index].verified = args[2] === 'موثوق';
                if (args[3]) scripts[index].key = args[3] === 'مفتاح';
                if (args[4]) scripts[index].game.name = args[4];
                if (args[5]) scripts[index].title = args[5];
                if (args[6]) scripts[index].script = args[6];

                saveManualScripts(scripts);
                return message.reply(`✅ **تم تعديل السكربت \`${name}\` بنجاح!**`);
            } else {
                return message.reply('❓ الأوامر المتاحة:\n`-سكربت إضافة | موثوق | بدون مفتاح | الماب | الاسم | الكود`\n`-سكربت حذف | الاسم`\n`-سكربت تعديل | الاسم | موثوق/غير موثوق | مفتاح/بدون مفتاح | الماب الجديد | الاسم الجديد | الكود الجديد`');
            }
        } catch (e) {
            console.error(e);
            return message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    }

    if (message.content.startsWith('-صور')) {
        if (message.attachments.size === 0) {
            return message.reply('❌ | يرجى إرفاق صور مع الرسالة لرفعها.');
        }

        const msg = await message.reply('⏳ | جاري رفع الصور، يرجى الانتظار...');
        const urls = [];

        for (const [id, attachment] of message.attachments) {
            // Check if it's an image
            if (attachment.contentType && attachment.contentType.startsWith('image/')) {
                const imgUrl = await saveImageLocally(attachment.url);
                if (imgUrl) {
                    urls.push(imgUrl);
                }
            } else if (attachment.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                // Fallback check by extension
                const imgUrl = await saveImageLocally(attachment.url);
                if (imgUrl) {
                    urls.push(imgUrl);
                }
            }
        }

        if (urls.length === 0) {
            return msg.edit('❌ | فشل رفع الصور، تأكد من أنها صور صالحة.');
        }

        const response = urls.map((url, index) => `**الصورة ${index + 1}:**\n${url}`).join('\n\n');
        await msg.edit(`✅ | تم رفع الصور بنجاح:\n\n${response}`);
        return;
    }

    if (message.content.trim().startsWith('-بيانات')) {
        try {
            await client.application.fetch().catch(() => {});
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            if (!isOwner) {
                return;
            }

            const dbFile = path.join(__dirname, 'db.json');
            if (!fs.existsSync(dbFile)) {
                return message.reply('❌ ملف البيانات غير موجود.').catch(() => {});
            }

            const attachment = new AttachmentBuilder(dbFile, { name: 'ticket_db.json' });
            return message.reply({
                content: '📁 **إليك ملف البيانات كامل (ticket_db.json):**',
                files: [attachment]
            }).catch(() => {});
        } catch (e) {
            console.error('[Data Command Error]:', e);
            return message.reply('❌ حدث خطأ أثناء إرسال ملف البيانات.').catch(() => {});
        }
    }

    if (message.content.startsWith('-بلاك')) {
        try {
            await client.application.fetch();
            if (message.author.id !== client.application.owner.id && message.author.id !== '1179133837930938470') return;
            
            const args = message.content.split(' ');
            const targetId = args[1];
            if (!targetId) return message.reply('❌ يرجى كتابة ايدي الشخص. مثال: `-بلاك 123456789`');

            const db = getDB();
            if (!db.blacklist) db.blacklist = [];
            
            if (db.blacklist.includes(targetId)) {
                db.blacklist = db.blacklist.filter(id => id !== targetId);
                saveDB(db);
                return message.reply(`✅ **تم إزالة الشخص \`${targetId}\` من البلاك ليست.**`);
            } else {
                db.blacklist.push(targetId);
                saveDB(db);
                return message.reply(`✅ **تم إضافة الشخص \`${targetId}\` إلى البلاك ليست بنجاح.**`);
            }
        } catch (e) {
            console.error(e);
            return message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    }

    // --- Set Premium Support Role (Owner Only) ---
    if (message.content.startsWith('-رتبة_البريميوم') || message.content.startsWith('-set_premium_role') || message.content.startsWith('-رتبة_الدعم_بريميوم')) {
        try {
            await client.application.fetch().catch(() => {});
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            if (!isOwner) {
                return message.reply('❌ **هذا الأمر مخصص حصرياً لمالك البوت (Bot Owner) لتحديد رتبة الدعم المصرح لها بإعطاء البريميوم.**');
            }

            const args = message.content.trim().split(/\s+/);
            const roleArg = args[1];
            const SUPPORT_ROLE_ID = '1554929723476545647';
            const db = getDB();

            if (!roleArg || roleArg === 'عرض' || roleArg === 'show') {
                const currentRoleId = db.premiumAuthorizedRoleId || SUPPORT_ROLE_ID;
                return message.reply(
                    `👑 **إعدادات رتبة إعطاء البريميوم الحالية:**\n` +
                    `• **الرتبة المعتمدة:** <@&${currentRoleId}> (\`${currentRoleId}\`)\n` +
                    `• **لتغيير الرتبة:** \`-رتبة_البريميوم <ID_الرتبة أو المنشن>\``
                );
            }

            if (['افتراضي', 'reset', 'default'].includes(roleArg.toLowerCase())) {
                db.premiumAuthorizedRoleId = SUPPORT_ROLE_ID;
                saveDB(db);
                return message.reply(`✅ **تمت إعادة ضبط رتبة إعطاء البريميوم إلى رتبة الدعم الافتراضية:** <@&${SUPPORT_ROLE_ID}>`);
            }

            const cleanRoleId = roleArg.replace(/[<@&>]/g, '').trim();
            if (!/^\d{17,20}$/.test(cleanRoleId)) {
                return message.reply('❌ **يرجى إدخال أيدي رتبة صحيح أو منشن للرتبة.**\nمثال: `-رتبة_البريميوم 1554929723476545647`');
            }

            db.premiumAuthorizedRoleId = cleanRoleId;
            saveDB(db);

            const em = new EmbedBuilder()
                .setColor('#10b981')
                .setTitle('✅ تم تحديث رتبة الدعم المصرح لها بإعطاء البريميوم')
                .setDescription(
                    `تم بنجاح تفويض الرتبة التالية لإعطاء وتفعيل اشتراك البريميوم بالسيرفرات:\n\n` +
                    `🎖️ **الرتبة المعتمدة:** <@&${cleanRoleId}>\n` +
                    `🆔 **الآيدي:** \`${cleanRoleId}\`\n\n` +
                    `💡 *أعضاء هذه الرتبة بسيرفر الدعم يمكنهم الآن إعطاء وتفعيل البريميوم لأي سيرفر.*`
                )
                .setFooter({ text: 'NTL System', iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            return message.reply({ embeds: [em] });
        } catch (e) {
            console.error(e);
            return message.reply(`❌ حدث خطأ: \`${e.message}\``);
        }
    }

    if (message.content.startsWith('-بريميوم') || message.content.startsWith('-premium')) {
        try {
            await client.application.fetch().catch(() => {});
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));

            const db = getDB();
            const SUPPORT_GUILD_ID = '1179136470750068766';
            const SUPPORT_ROLE_ID = '1554929723476545647';
            const authorizedRoleId = db.premiumAuthorizedRoleId || SUPPORT_ROLE_ID;

            let hasSupportRole = false;
            if (message.member?.roles?.cache?.has(authorizedRoleId)) {
                hasSupportRole = true;
            } else {
                try {
                    const supportGuild = client.guilds.cache.get(SUPPORT_GUILD_ID) || await client.guilds.fetch(SUPPORT_GUILD_ID).catch(() => null);
                    if (supportGuild) {
                        const supportMember = await supportGuild.members.fetch(message.author.id).catch(() => null);
                        if (supportMember?.roles?.cache?.has(authorizedRoleId)) {
                            hasSupportRole = true;
                        }
                    }
                } catch (e) {}
            }

            if (!isOwner && !hasSupportRole) {
                return message.reply('❌ **ليس لديك صلاحية إعطاء البريميوم! هذا الأمر مخصص لمالك البوت ورتبة الدعم المعتمدة فقط.**');
            }

            const args = message.content.trim().split(/\s+/);
            const targetGuildId = args[1];
            const durationArg = args[2] || 'lifetime';

            if (!targetGuildId) return message.reply('❌ يرجى كتابة ايدي السيرفر. مثال: `-بريميوم 123456789 30d`');

            ensureGuildData(targetGuildId);
            if (!db[targetGuildId]) db[targetGuildId] = {};
            
            if (['سحب', 'remove', 'off', 'disable'].includes(durationArg.toLowerCase())) {
                db[targetGuildId].premium = { expiresAt: 0, revokedAt: Date.now(), revokedBy: message.author.id };
                saveDB(db);
                return message.reply(`✅ **تم سحب البريميوم من السيرفر \`${targetGuildId}\` بنجاح.**`);
            }

            const parsed = parseDuration(durationArg);
            const expiresAt = parsed ? (parsed.isLifetime ? 'lifetime' : Date.now() + parsed.ms) : 'lifetime';
            const durLabel = parsed ? parsed.label : 'مدى الحياة (Lifetime)';

            db[targetGuildId].premium = {
                expiresAt,
                activatedAt: Date.now(),
                activatedBy: message.author.id,
                activatedByTag: message.author.tag,
                durationLabel: durLabel
            };
            saveDB(db);

            const em = new EmbedBuilder()
                .setColor('#f59e0b')
                .setTitle('🌟 تم تفعيل اشتراك البريميوم بنجاح (NTL Premium)')
                .setDescription(
                    `تم بنجاح تفعيل صلاحيات البريميوم الكاملة للسيرفر:\n\n` +
                    `🏛️ **أيدي السيرفر:** \`${targetGuildId}\`\n` +
                    `⏳ **المدة:** **${durLabel}**\n` +
                    `👤 **المنفذ:** <@${message.author.id}>\n` +
                    `📅 **تاريخ التفعيل:** <t:${Math.floor(Date.now() / 1000)}:F>`
                )
                .setFooter({ text: 'NTL Premium Engine', iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            return message.reply({ embeds: [em] });
        } catch (e) {
            console.error(e);
            return message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    }

    if (message.content.startsWith('-سيرفر') || message.content.startsWith('-server')) {
        try {
            await client.application.fetch().catch(() => {});
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            if (!isOwner) {
                return; // Only owner can use this
            }

            const args = message.content.trim().split(/\s+/);
            const targetGuildId = args[1] || message.guild?.id;

            if (!targetGuildId) {
                return message.reply('❌ **يرجى كتابة أيدي السيرفر.**\nمثال: `-سيرفر 123456789012345678`');
            }

            const guild = client.guilds.cache.get(targetGuildId) || await client.guilds.fetch(targetGuildId).catch(() => null);
            const db = getDB();
            const gData = db[targetGuildId] || {};

            const isPrem = isGuildPremium(targetGuildId);
            const premiumStr = isPrem ? '🌟 **مفعل (Premium)**' : '⚪ **غير مفعل (Free)**';

            // Server details
            const serverName = guild ? guild.name : (gData.name || 'سيرفر غير مسجل / غير معروف');
            const ownerMention = guild ? `<@${guild.ownerId}> (\`${guild.ownerId}\`)` : (gData.ownerId ? `<@${gData.ownerId}>` : 'غير متوفر');
            const membersCount = guild ? guild.memberCount : 'غير متوفر';
            const channelsCount = guild ? guild.channels.cache.size : 'غير متوفر';
            const rolesCount = guild ? guild.roles.cache.size : 'غير متوفر';
            const botInGuildStr = guild ? '✅ متواجد داخل السيرفر' : '❌ البوت غير متواجد حالياً';

            // Protection Data
            const prot = gData.protection || {};
            const protList = [
                `• **حماية البوتات (Anti-Bots):** ${prot.bots?.enabled ? `✅ مفعل (العقاب: \`${prot.bots?.punishment || 'ban'}\`)` : '❌ معطل'}`,
                `• **حماية الروابط (Anti-Links):** ${prot.links?.enabled ? `✅ مفعل (العقاب: \`${prot.links?.punishment || 'timeout'}\` | مستثنى: ${prot.links?.exemptedChannels?.length || 0} روم)` : '❌ معطل'}`,
                `• **حماية السبام (Anti-Spam):** ${prot.spam?.enabled ? `✅ مفعل (العقاب: \`${prot.spam?.punishment || 'timeout'}\`)` : '❌ معطل'}`,
                `• **حماية الرتب (Anti-Roles):** ${prot.roles?.enabled ? `✅ مفعل (العقاب: \`${prot.roles?.punishment || 'kick'}\`)` : '❌ معطل'}`,
                `• **حماية الرومات (Anti-Channels):** ${prot.channels?.enabled ? `✅ مفعل (العقاب: \`${prot.channels?.punishment || 'kick'}\`)` : '❌ معطل'}`,
                `• **حماية الصلاحيات (Anti-Permissions):** ${prot.permissions?.enabled ? `✅ مفعل (العقاب: \`${prot.permissions?.punishment || 'kick'}\`)` : '❌ معطل'}`
            ].join('\n');

            // Ticket Panels & Published Embeds
            const panels = gData.panels || {};
            const panelKeys = Object.keys(panels);
            let panelsSummary = '❌ لا توجد بانلات تذاكر منشورة';
            if (panelKeys.length > 0) {
                panelsSummary = panelKeys.map((pKey, i) => {
                    const p = panels[pKey];
                    const ch = p.channelId ? `<#${p.channelId}>` : 'غير محدد';
                    const title = p.title || p.name || 'بدون عنوان';
                    const btns = p.buttons && p.buttons.length > 0 ? p.buttons.map(b => `[${b.label || 'زر'}]`).join(' ') : 'افتراضي';
                    const roles = p.allowedRoles && p.allowedRoles.length > 0 ? p.allowedRoles.map(r => `<@&${r}>`).join(', ') : 'الكل';
                    return `**${i + 1}. بانل \`${p.name || pKey}\`:**\n  - **الروم:** ${ch}\n  - **العنوان:** ${title}\n  - **الأزرار:** ${btns}\n  - **الرتب المسؤولة:** ${roles}`;
                }).join('\n\n');
            }

            // Tickets Status
            const tickets = gData.tickets || {};
            const openTickets = Object.values(tickets).filter(t => !t.closed).length;
            const totalTickets = gData.counter || Object.keys(tickets).length;

            // AI System
            const aiData = gData.ai || {};
            const aiSummary = [
                `• **الاسم:** ${aiData.name || 'غير محدد'}`,
                `• **الحالة:** ${aiData.status || 'غير متصل'}`,
                `• **الروم المخصص:** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}`,
                `• **الفئة:** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}`,
                `• **التفعيل في التذاكر:** ${aiData.ticketAiEnabled ? '✅ مفعل' : '❌ معطل'}`,
                `• **البيانات المدربة:** ${aiData.knowledge?.length || 0} معلومة`
            ].join('\n');

            // Script System
            const scriptSys = gData.scriptSystem || {};
            const scriptSummary = scriptSys.enabled 
                ? `✅ مفعل (الروم: ${scriptSys.channelId ? `<#${scriptSys.channelId}>` : 'غير محدد'} | البريفيكس: \`${scriptSys.prefix || 'script'}\`)`
                : '❌ معطل';

            // Bypass Configuration
            const bypassMethod = gData.bypassMethod || gData.deltaMethod || 'تلقائي (عبر إرسال الرابط)';
            const bypassSummary = `• **طريقة التخطي:** \`${bypassMethod}\`\n• **إجمالي التخطي المسجل:** ${gData.bypassedCount || 0}`;

            // Other Modules
            const otherModules = [
                `• **نظام التبادل (Trade):** ${gData.tradeChannelId ? `✅ مفعل في <#${gData.tradeChannelId}>` : '❌ غير محدد'}`,
                `• **نظام الترحيب (Welcome):** ${gData.welcomeChannel ? `✅ مفعل في <#${gData.welcomeChannel}>` : '❌ غير محدد'}`,
                `• **الرتبة التلقائية (Auto-Role):** ${gData.autorole ? `<@&${gData.autorole}>` : '❌ غير محدد'}`,
                `• **روم السجلات (Logs):** ${gData.logChannel ? `<#${gData.logChannel}>` : '❌ غير محدد'}`,
                `• **نظام الموسيقى:** ${gData.musicEnabled ? '✅ مفعل' : '❌ معطل'}`,
                `• **نظام التعتيم (Obfuscation):** ${gData.obfuscation?.enabled ? `✅ مفعل في <#${gData.obfuscation.channelId}>` : '❌ معطل'}`
            ].join('\n');

            const embed = new EmbedBuilder()
                .setColor(0x38bdf8)
                .setTitle(`📊 تقرير فحص السيرفر | ${serverName}`)
                .setDescription(
                    `🆔 **أيدي السيرفر:** \`${targetGuildId}\`\n` +
                    `👑 **مالك السيرفر:** ${ownerMention}\n` +
                    `🤖 **حالة البوت:** ${botInGuildStr}\n` +
                    `💎 **حالة البريميوم:** ${premiumStr}\n` +
                    `👥 **الأعضاء:** \`${membersCount}\` | 📁 **الرومات:** \`${channelsCount}\` | 🏷️ **الرتب:** \`${rolesCount}\`\n\n` +
                    `-# ──────────────────────────────────────────`
                )
                .addFields(
                    { name: '🛡️ أنظمة الحماية والأمان', value: protList, inline: false },
                    { name: `🎫 نظام التذاكر (${openTickets} مفتوحة / ${totalTickets} إجمالي)`, value: panelsSummary.length > 1024 ? panelsSummary.slice(0, 1020) + '...' : panelsSummary, inline: false },
                    { name: '🤖 المساعد الذكي (AI)', value: aiSummary, inline: false },
                    { name: '📜 نظام البحث عن السكربتات', value: scriptSummary, inline: false },
                    { name: '⚡ نظام التخطي (Bypass)', value: bypassSummary, inline: false },
                    { name: '⚙️ باقي الميزات والأنظمة المفعّلة', value: otherModules, inline: false }
                )
                .setFooter({ text: `طلب بواسطة مالك البوت: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                .setTimestamp();

            if (guild && guild.iconURL()) {
                embed.setThumbnail(guild.iconURL({ dynamic: true }));
            }

            return message.reply({ embeds: [embed] });
        } catch (e) {
            console.error('[Server Inspector Error]:', e);
            return message.reply(`❌ **حدث خطأ أثناء فحص السيرفر:** \`${e.message}\``);
        }
    }

    // --- Bot & Dashboard Secret API Key Management Command (-api / -مفتاح_api) ---
    const isApiCommand = message.content.startsWith('-api') || 
                         message.content.startsWith('-مفتاح_api') || 
                         message.content.startsWith('-api_key') || 
                         message.content.startsWith('-apikey') || 
                         message.content.startsWith('-secret') || 
                         message.content.startsWith('-api-key') || 
                         message.content.startsWith('-مفاتيح');
    if (isApiCommand) {
        try {
            await client.application.fetch().catch(() => {});
            const devId = '1179133837930938470';
            const isOwner = message.author.id === devId || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            if (!isOwner) {
                return message.reply('❌ **هذا الأمر مخصص حصرياً لمالك البوت (Bot Owner) لإدارة مفاتيح الـ API السرية.**');
            }

            const cleanContent = message.content.trim();
            // Match the command prefix used
            const prefixMatch = cleanContent.match(/^(-api|-مفتاح_api|-api_key|-apikey|-secret|-api-key|-مفاتيح)\s*/i);
            const rawArgs = prefixMatch ? cleanContent.slice(prefixMatch[0].length).trim() : '';
            const args = rawArgs.split(/\s+/).filter(Boolean);
            const sub = (args[0] || '').toLowerCase();

            // 1. HELP / GUIDE
            if (!sub || ['مساعدة', 'help', 'شرح', 'اوامر', 'دليل', '?'].includes(sub)) {
                const em = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle('🔐 بوابة إدارة مفاتيح الـ API السرية (NTL Secret Keys)')
                    .setDescription(
                        `أهلاً بك يا مالك البوت! يمكنك عبر هذه الأوامر إنشاء وإدارة مفاتيح API سرية للداشبورد ومحرك التخطي مع تخصيص مدة الصلاحية بكل دقة.\n\n` +
                        `📌 **الرابط الرئيسي للـ API:**\n` +
                        `\`POST /api/bypass\` أو \`GET /api/bypass\`\n\n` +
                        `🛡️ **طرق إرسال المفتاح:**\n` +
                        `• في الـ Header: \`x-api-key: ntl_sec_...\`\n` +
                        `• في الـ Header: \`Authorization: Bearer ntl_sec_...\`\n` +
                        `• في الـ Query: \`?secret_key=ntl_sec_...&url=...\`\n` +
                        `• في الـ Body (JSON): \`{"secret_key": "...", "url": "..."}\``
                    )
                    .addFields(
                        {
                            name: '➕ 1. إنشاء مفتاح جديد (Create Key)',
                            value: '`-api انشاء [المدة] [الاسم]`\n' +
                                   '• **ساعات:** `-api انشاء 1h` أو `-api انشاء 12h`\n' +
                                   '• **أيام:** `-api انشاء 1d` أو `-api انشاء 7d`\n' +
                                   '• **أسابيع:** `-api انشاء 1w` أو `-api انشاء 2w`\n' +
                                   '• **شهور:** `-api انشاء 1m` أو `-api انشاء 3m`\n' +
                                   '• **سنين:** `-api انشاء 1y` أو `-api انشاء 2y`\n' +
                                   '• **دائم:** `-api انشاء دائم` أو `-api انشاء lifetime`\n' +
                                   '💡 *مثال:* `-api انشاء 7d مفتاح عميل خاص`',
                            inline: false
                        },
                        {
                            name: '🔄 2. تجديد مفتاح (Renew Key)',
                            value: '`-api تجديد <المفتاح> [المدة]`\n' +
                                   '💡 *مثال:* `-api تجديد ntl_sec_123 30d` أو `-api تجديد ntl_sec_123 دائم`',
                            inline: false
                        },
                        {
                            name: '⏱️ 3. تعديل مدة المفتاح (Edit Duration)',
                            value: '`-api تعديل <المفتاح> <المدة>`\n' +
                                   'تغيير المدة ليصبح أقصر أو أطول (مثال: من شهر إلى ساعتين).\n' +
                                   '💡 *مثال:* `-api تعديل ntl_sec_123 2h`',
                            inline: false
                        },
                        {
                            name: '🗑️ 4. حذف مفتاح (Delete Key)',
                            value: '`-api حذف <المفتاح>`\n' +
                                   'حذف وإلغاء صلاحية المفتاح فورياً بحيث يرفضه الـ API مباشرة.\n' +
                                   '💡 *مثال:* `-api حذف ntl_sec_123`',
                            inline: false
                        },
                        {
                            name: '📋 5. قائمة المفاتيح & معلومات مفتاح',
                            value: '• `-api قائمة` : عرض جميع المفاتيح وحالتها وعدد استخداماتها.\n' +
                                   '• `-api معلومات <المفتاح>` : فحص تفاصيل مفتاح محدد.\n' +
                                   '• `-api فحص <المفتاح>` : فحص صلاحية المفتاح.\n' +
                                   '• `-api تجربة <المفتاح> <الرابط>` : اختبار تخطي رابط عبر المفتاح مباشرة.',
                            inline: false
                        }
                    )
                    .setFooter({ text: 'NTL API Gateway & Security Engine', iconURL: client.user.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 2. CREATE KEY (انشاء / create / new / add / توليد)
            if (['انشاء', 'إنشاء', 'create', 'new', 'add', 'توليد', 'اضافة', 'إضافة'].includes(sub)) {
                const durationArg = args[1] || '1d';
                const nameArg = args.slice(2).join(' ') || '';

                const parsed = parseDuration(durationArg);
                if (!parsed) {
                    return message.reply(
                        `❌ **المدة المحددة غير صالحة:** \`${durationArg}\`\n\n` +
                        `📌 **صيغ المدة المدعومة:**\n` +
                        `• ساعات: \`1h\`, \`2h\`, \`12h\`, \`ساعة\`, \`ساعتين\`, \`3 ساعات\`\n` +
                        `• أيام: \`1d\`, \`7d\`, \`30d\`, \`يوم\`, \`يومين\`, \`3 ايام\`\n` +
                        `• أسابيع: \`1w\`, \`2w\`, \`أسبوع\`, \`أسبوعين\`\n` +
                        `• شهور: \`1m\`, \`3m\`, \`6m\`, \`شهر\`, \`شهرين\`, \`3 شهور\`\n` +
                        `• سنين: \`1y\`, \`2y\`, \`سنة\`, \`سنتين\`\n` +
                        `• دائم: \`دائم\`, \`lifetime\`, \`forever\`, \`infinity\``
                    );
                }

                const result = createApiKey({ durationStr: durationArg, name: nameArg, createdBy: message.author.tag });
                const expiryDisplay = parsed.isLifetime ? 'دائم ♾️ (بدون انتهاء)' : `<t:${Math.floor(result.keyObj.expiresAt / 1000)}:F>\n⏳ <t:${Math.floor(result.keyObj.expiresAt / 1000)}:R>`;

                const em = new EmbedBuilder()
                    .setColor('#22c55e')
                    .setTitle('✅ تم توليد مفتاح API سري جديد بنجاح')
                    .setDescription(
                        `تم إنشاء وحفظ المفتاح السري في النظام بنجاح. يمكنك الآن استخدامه في استدعاءات الـ API.\n\n` +
                        `🔑 **المفتاح السري (Secret Key):**\n\`\`\`\n${result.key}\n\`\`\``
                    )
                    .addFields(
                        { name: '🏷️ اسم / وصف المفتاح:', value: `\`${result.keyObj.name}\``, inline: true },
                        { name: '⏱️ المدة المحددة:', value: `\`${parsed.label}\``, inline: true },
                        { name: '🟢 الحالة:', value: '`نشط وشغال (Active)`', inline: true },
                        { name: '📅 تاريخ الانتهاء:', value: expiryDisplay, inline: false },
                        {
                            name: '📡 نقطة النهاية (API Endpoint):',
                            value: '`POST /api/bypass`\n`POST /api/v1/bypass`',
                            inline: true
                        },
                        {
                            name: '🛡️ الـ Header المطلوب:',
                            value: `\`x-api-key: ${result.key}\``,
                            inline: true
                        },
                        {
                            name: '💻 مثال كود cURL للاستخدام السريع:',
                            value: `\`\`\`bash\ncurl -X POST "https://ais-dev-nf2ud627ekhulmnvnun3pw-299732191787.europe-west1.run.app/api/bypass" \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: ${result.key}" \\\n  -d '{"url": "YOUR_DELTA_OR_PLATO_LINK"}'\n\`\`\``,
                            inline: false
                        }
                    )
                    .setFooter({ text: `تم الإنشاء بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 3. RENEW KEY (تجديد / renew)
            if (['تجديد', 'renew', 'extend', 'تمديد'].includes(sub)) {
                const targetKey = args[1];
                if (!targetKey) {
                    return message.reply('❌ **يرجى تحديد المفتاح المراد تجديده.**\n💡 *مثال:* `-api تجديد ntl_sec_xxxx 30d`');
                }
                const durationArg = args[2] || '30d';
                const renewed = renewApiKey(targetKey, durationArg);
                if (!renewed) {
                    return message.reply(`❌ **لم يتم العثور على المفتاح:** \`${targetKey}\`\nتأكد من كتابة المفتاح بشكل صحيح أو استخدم \`-api قائمة\` لعرض المفاتيح.`);
                }

                const expiryDisplay = renewed.parsed.isLifetime ? 'دائم ♾️ (بدون انتهاء)' : `<t:${Math.floor(renewed.keyObj.expiresAt / 1000)}:F>\n⏳ <t:${Math.floor(renewed.keyObj.expiresAt / 1000)}:R>`;

                const em = new EmbedBuilder()
                    .setColor('#06b6d4')
                    .setTitle('🔄 تم تجديد وتفعيل مفتاح الـ API بنجاح')
                    .setDescription(`تم إعادة تعيين صلاحية المفتاح \`${targetKey}\` بنجاح.`)
                    .addFields(
                        { name: '🏷️ اسم المفتاح:', value: `\`${renewed.keyObj.name}\``, inline: true },
                        { name: '⏱️ المدة الجديدة:', value: `\`${renewed.parsed.label}\``, inline: true },
                        { name: '🟢 الحالة:', value: '`نشط وشغال (Active)`', inline: true },
                        { name: '📅 تاريخ الانتهاء الجديد:', value: expiryDisplay, inline: false },
                        { name: '📊 إجمالي الاستخدامات حتى الآن:', value: `\`${renewed.keyObj.totalUses || 0}\` طلب`, inline: true }
                    )
                    .setFooter({ text: `تم التجديد بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 4. EDIT DURATION (تعديل / edit / update / تقصير / تمديد)
            if (['تعديل', 'edit', 'update', 'تغيير', 'تقصير'].includes(sub)) {
                const targetKey = args[1];
                const newDurationArg = args[2];
                if (!targetKey || !newDurationArg) {
                    return message.reply('❌ **تنسيق خاطئ.**\n💡 *الاستخدام:* `-api تعديل <المفتاح> <المدة_الجديدة>`\n*مثال:* `-api تعديل ntl_sec_xxxx 2h` أو `-api تعديل ntl_sec_xxxx 7d`');
                }

                const edited = editApiKeyDuration(targetKey, newDurationArg);
                if (!edited) {
                    return message.reply(`❌ **فشل التعديل:** إما أن المفتاح غير موجود أو أن صيغة المدة \`${newDurationArg}\` غير صالحة.`);
                }

                const expiryDisplay = edited.parsed.isLifetime ? 'دائم ♾️ (بدون انتهاء)' : `<t:${Math.floor(edited.keyObj.expiresAt / 1000)}:F>\n⏳ <t:${Math.floor(edited.keyObj.expiresAt / 1000)}:R>`;

                const em = new EmbedBuilder()
                    .setColor('#f59e0b')
                    .setTitle('⏱️ تم تعديل مدة صلاحية المفتاح بنجاح')
                    .setDescription(`تم تغيير مدة المفتاح \`${targetKey}\` إلى المدة المحددة الجديدة.`)
                    .addFields(
                        { name: '🏷️ اسم المفتاح:', value: `\`${edited.keyObj.name}\``, inline: true },
                        { name: '⏱️ المدة الجديدة:', value: `\`${edited.parsed.label}\``, inline: true },
                        { name: '📅 تاريخ الانتهاء الجديد:', value: expiryDisplay, inline: false }
                    )
                    .setFooter({ text: `تم التعديل بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 5. DELETE KEY (حذف / delete / remove / del / الغاء)
            if (['حذف', 'delete', 'remove', 'del', 'الغاء', 'إلغاء'].includes(sub)) {
                const targetKey = args[1];
                if (!targetKey) {
                    return message.reply('❌ **يرجى تحديد المفتاح المراد حذفه.**\n💡 *مثال:* `-api حذف ntl_sec_xxxx`');
                }

                const deleted = deleteApiKey(targetKey);
                if (!deleted) {
                    return message.reply(`❌ **لم يتم العثور على المفتاح:** \`${targetKey}\``);
                }

                const em = new EmbedBuilder()
                    .setColor('#ef4444')
                    .setTitle('🗑️ تم حذف وإلغاء مفتاح الـ API بنجاح')
                    .setDescription(`تم مسح المفتاح \`${targetKey}\` نهائياً من قاعدة البيانات.\nأي استدعاء للـ API باستخدام هذا المفتاح سيتم رفضه فورياً برمز \`403 Forbidden\`.`)
                    .setFooter({ text: `تم الحذف بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 6. LIST KEYS (قائمة / list / all / مفاتيح / عرض)
            if (['قائمة', 'قائمه', 'list', 'all', 'مفاتيح', 'عرض', 'keys'].includes(sub)) {
                const keys = getApiKeys();
                const keyEntries = Object.values(keys);

                if (keyEntries.length === 0) {
                    return message.reply('📭 **لا توجد أي مفاتيح API مسجلة حالياً.**\nيمكنك إنشاء أول مفتاح باستخدام: `-api انشاء 7d`');
                }

                const activeCount = keyEntries.filter(k => k.expiresAt === 'lifetime' || (k.expiresAt && Date.now() < k.expiresAt)).length;
                const expiredCount = keyEntries.length - activeCount;

                const em = new EmbedBuilder()
                    .setColor('#6366f1')
                    .setTitle(`📋 قائمة مفاتيح الـ API السرية (${keyEntries.length})`)
                    .setDescription(`إجمالي المفاتيح: **${keyEntries.length}** | النشطة: **🟢 ${activeCount}** | المنتهية: **🔴 ${expiredCount}**\n-# ──────────────────────────────────────────`);

                // Split into fields if needed
                const chunks = [];
                for (let i = 0; i < keyEntries.length; i += 5) {
                    chunks.push(keyEntries.slice(i, i + 5));
                }

                chunks.slice(0, 5).forEach((group, groupIdx) => {
                    const text = group.map((k, idx) => {
                        const isExp = k.expiresAt !== 'lifetime' && k.expiresAt && Date.now() > k.expiresAt;
                        const statusIcon = isExp ? '🔴 منتهي' : '🟢 نشط';
                        const remaining = formatRemainingTime(k.expiresAt);
                        const maskedKey = k.key.length > 18 ? `${k.key.slice(0, 12)}...${k.key.slice(-4)}` : k.key;
                        const lastUsedStr = k.lastUsedAt ? `<t:${Math.floor(k.lastUsedAt / 1000)}:R>` : 'لم يُستخدم بعد';

                        return `**${groupIdx * 5 + idx + 1}. \`${k.name || 'مفتاح بدون اسم'}\`** [${statusIcon}]\n` +
                               `• **المفتاح:** \`${k.key}\`\n` +
                               `• **المدة / المتبقي:** \`${remaining}\`\n` +
                               `• **الاستخدامات:** \`${k.totalUses || 0}\` طلب | **آخر استخدام:** ${lastUsedStr}\n`;
                    }).join('\n');

                    em.addFields({ name: `المجموعة (${groupIdx + 1})`, value: text, inline: false });
                });

                em.setFooter({ text: `طلب بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                  .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 7. KEY INFO (معلومات / info / فحص / check)
            if (['معلومات', 'info', 'فحص', 'check', 'تفاصيل'].includes(sub)) {
                const targetKey = args[1];
                if (!targetKey) {
                    return message.reply('❌ **يرجى إدخال المفتاح المراد فحصه.**\n💡 *مثال:* `-api معلومات ntl_sec_xxxx`');
                }

                const keys = getApiKeys();
                const k = keys[targetKey.trim()];
                if (!k) {
                    return message.reply(`❌ **المفتاح \`${targetKey}\` غير موجود في النظام.**`);
                }

                const isExp = k.expiresAt !== 'lifetime' && k.expiresAt && Date.now() > k.expiresAt;
                const statusStr = isExp ? '🔴 منتهي الصلاحية (Expired)' : '🟢 نشط وصالح (Active)';
                const expiryDisplay = k.expiresAt === 'lifetime' ? 'دائم ♾️' : `<t:${Math.floor(k.expiresAt / 1000)}:F>\n⏳ <t:${Math.floor(k.expiresAt / 1000)}:R>`;
                const createdDisplay = `<t:${Math.floor(k.createdAt / 1000)}:F> (<t:${Math.floor(k.createdAt / 1000)}:R>)`;
                const lastUsedDisplay = k.lastUsedAt ? `<t:${Math.floor(k.lastUsedAt / 1000)}:F> (<t:${Math.floor(k.lastUsedAt / 1000)}:R>)` : 'لم يُستخدم بعد';

                const em = new EmbedBuilder()
                    .setColor(isExp ? '#ef4444' : '#22c55e')
                    .setTitle('🔍 تفاصيل مفتاح الـ API')
                    .setDescription(`🔑 **المفتاح الكامل:**\n\`\`\`\n${k.key}\n\`\`\``)
                    .addFields(
                        { name: '🏷️ الاسم / الوصف:', value: `\`${k.name || 'بدون اسم'}\``, inline: true },
                        { name: '🚦 الحالة:', value: statusStr, inline: true },
                        { name: '⏱️ المتبقي من الصلاحية:', value: `\`${formatRemainingTime(k.expiresAt)}\``, inline: true },
                        { name: '📅 تاريخ الإنشاء:', value: createdDisplay, inline: false },
                        { name: '📅 تاريخ الانتهاء:', value: expiryDisplay, inline: false },
                        { name: '📊 عدد الطلبات المستلمة:', value: `\`${k.totalUses || 0}\` طلب`, inline: true },
                        { name: '🕒 آخر استدعاء للـ API:', value: lastUsedDisplay, inline: true },
                        { name: '👤 المنشئ:', value: `\`${k.createdBy || 'المالك'}\``, inline: true }
                    )
                    .setFooter({ text: `فحص المفتاح بواسطة: ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
                    .setTimestamp();

                return message.reply({ embeds: [em] });
            }

            // 8. TEST BYPASS VIA KEY (-api تجربة <المفتاح> <الرابط>)
            if (['تجربة', 'test', 'تخطي', 'bypass'].includes(sub)) {
                const targetKey = args[1];
                const targetUrl = args[2];
                if (!targetKey || !targetUrl) {
                    return message.reply('❌ **تنسيق خاطئ.**\n💡 *الاستخدام:* `-api تجربة <المفتاح> <الرابط>`');
                }

                const validation = validateApiKey(targetKey);
                if (!validation.valid) {
                    return message.reply(`❌ **المفتاح غير صالح:** ${validation.error}`);
                }

                const waitMsg = await message.reply('⏳ **جاري تجربة استدعاء الـ API ومحاكاة طلب التخطي بالمفتاح...**');
                const startTime = Date.now();
                const resBypass = await bypassDeltaLink(targetUrl.trim());
                const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

                recordApiKeyUsage(targetKey);

                if (resBypass && resBypass.bypassedLink) {
                    const em = new EmbedBuilder()
                        .setColor('#10b981')
                        .setTitle('✅ نجحت تجربة الـ API مع المفتاح!')
                        .setDescription(`تم التحقق من المفتاح وتخطي الرابط بنجاح.\n\n🔑 **النتيجة (Bypassed Result):**\n\`\`\`\n${resBypass.bypassedLink}\n\`\`\``)
                        .addFields(
                            { name: '⏱️ زمن الاستجابة:', value: `\`${timeTaken}s\``, inline: true },
                            { name: '🔑 المفتاح المستخدم:', value: `\`${targetKey.slice(0, 14)}...\``, inline: true },
                            { name: '📊 إجمالي استخدامات المفتاح:', value: `\`${(validation.keyObj.totalUses || 0) + 1}\` طلب`, inline: true }
                        )
                        .setTimestamp();

                    return waitMsg.edit({ content: null, embeds: [em] });
                } else {
                    return waitMsg.edit(`❌ **فشل التخطي:** ${resBypass?.error || 'تعذر تخطي هذا الرابط حالياً.'}\n(لكن تم التحقق من المفتاح بنجاح)`);
                }
            }

            return message.reply('❓ **أمر غير معروف.** أرسل `-api` لعرض جميع أوامر إدارة المفاتيح وصيغ الاستخدام.');
        } catch (e) {
            console.error('[API Command Error]:', e);
            return message.reply(`❌ **حدث خطأ أثناء تنفيذ الأمر:** \`${e.message}\``);
        }
    }

    if (message.content.startsWith('-مفتاح')) {
        try {
            await client.application.fetch();
            const isOwner = message.author.id === '1179133837930938470' || 
                            (client.application?.owner && (message.author.id === client.application.owner.id || message.author.id === client.application.owner.ownerId));
            if (!isOwner) {
                return; // Only owner can use this
            }
            const args = message.content.split(/\s+/);
            const newApiKey = args.slice(1).join(' ').trim();
            if (!newApiKey) {
                const currentKey = getBaconApiKey();
                return message.reply(`🔑 **مفتاح Bacon Bypass API الحالي:**\n\`${currentKey || 'لا يوجد'}\`\n\n📌 **لتحديث المفتاح أرسل:**\n\`-مفتاح <المفتاح_الجديد>\``);
            }
            setBaconApiKey(newApiKey);
            return message.reply(`✅ **تم تحديث وحفظ مفتاح Bypass API بنجاح!**\n🔑 **المفتاح الجديد:** \`${newApiKey}\``);
        } catch (e) {
            console.error(e);
            return message.reply('❌ حدث خطأ أثناء تحديث المفتاح.');
        }
    }

    if (message.content.startsWith('-قالب')) {
        try {
            await client.application.fetch();
            const ownerId = client.application.owner?.ownerId || client.application.owner?.id;
            if (message.author.id !== ownerId && !message.member?.permissions.has('Administrator')) {
                return message.reply('❌ هذا الأمر مخصص لمالك البوت فقط.');
            }

            const args = message.content.slice(5).trim();
            const urls = args.split(',').map(u => u.trim()).filter(u => u.startsWith('http'));
            const attachments = Array.from(message.attachments.values()).map(a => a.url);
            const allLinks = [...urls, ...attachments];

            if (allLinks.length === 0) {
                return message.reply('❌ يرجى إرفاق صور أو وضع روابط مفصولة بفاصلة (,) بعد الأمر.');
            }

            const templatesPath = path.join(__dirname, 'assets', 'templates');
            if (!fs.existsSync(templatesPath)) fs.mkdirSync(templatesPath, { recursive: true });

            let successCount = 0;
            const axios = require('axios');

            await message.reply(`⏳ جاري تحميل ${allLinks.length} قالب...`);

            for (const link of allLinks) {
                try {
                    const response = await axios.get(link, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
                        },
                        responseType: 'arraybuffer',
                        timeout: 15000
                    });
                    const contentType = response.headers['content-type'] || '';
                    let ext = 'jpg';
                    if (contentType.includes('png') || link.toLowerCase().endsWith('.png')) ext = 'png';
                    else if (contentType.includes('gif') || link.toLowerCase().endsWith('.gif')) ext = 'gif';
                    else if (contentType.includes('webp') || link.toLowerCase().endsWith('.webp')) ext = 'webp';

                    const fileName = `template-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
                    fs.writeFileSync(path.join(templatesPath, fileName), response.data);
                    successCount++;
                } catch (err) {
                    console.error(`Failed to download template from ${link}:`, err.message);
                }
            }

            return message.channel.send(`✅ تم إضافة ${successCount} قالب بنجاح إلى الموقع.\nيمكنك الآن رؤيتها في لوحة التحكم.`);
        } catch (err) {
            console.error('Template command error:', err);
            return message.reply('❌ حدث خطأ أثناء تنفيذ الأمر.');
        }
    }

    if (message.content === '+تسطيب') {
        try {
            await client.application.fetch();
            const ownerId = client.application.owner?.ownerId || client.application.owner?.id;
            
            // Allow if owner, or fallback to Admin if owner not fetched properly
            if (message.author.id === ownerId || message.member?.permissions.has('Administrator')) {
                const db = getDB();
                db.setupChannelId = message.channel.id;
                saveDB(db);
                
                await message.reply('✅ تم تعيين هذه الروم كغرفة استلام دعوات السيرفرات (Setup Room).\nجاري جلب جميع السيرفرات الحالية...');
                
                let serversList = [];
                for (const [guildId, guild] of client.guilds.cache) {
                    try {
                        let invite = null;
                        const defaultChannel = guild.systemChannel || guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(guild.members.me).has('CreateInstantInvite'));
                        if (defaultChannel) {
                            invite = await defaultChannel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
                        }
                        serversList.push(`**${guild.name}** (${guild.memberCount} members)\n${invite ? invite.url : 'لا يوجد صلاحية لإنشاء دعوة'}`);
                    } catch (err) {
                        serversList.push(`**${guild.name}**\nError generating invite`);
                    }
                }
                
                // Send in chunks to avoid 2000 chars limit
                let currentMsg = '';
                for (const line of serversList) {
                    if (currentMsg.length + line.length > 1900) {
                        await message.channel.send(currentMsg);
                        currentMsg = '';
                    }
                    currentMsg += line + '\n\n';
                }
                if (currentMsg.length > 0) {
                    await message.channel.send(currentMsg);
                }
            } else {
                await message.reply('❌ هذا الأمر مخصص لمالك البوت فقط.');
            }
        } catch (err) {
            console.error('Setup command error:', err);
        }
        return;
    }

    // Auto Responses Check
    if (message.guildId && message.content) {
        const localDb = getDB();
        const autoRespData = localDb[message.guildId]?.autoResponses;
        const autoResponsesList = Array.isArray(autoRespData) ? autoRespData : (autoRespData && typeof autoRespData === 'object' ? Object.values(autoRespData) : []);

        if (autoResponsesList.length > 0) {
            const msgText = message.content.trim().toLowerCase();
            for (const resp of autoResponsesList) {
                if (!resp || !resp.keyword) continue;
                const kw = resp.keyword.trim().toLowerCase();
                const isMatch = (msgText === kw);

                if (isMatch) {
                    // Check target role
                    if (resp.targetRole && resp.targetRole !== 'everyone' && resp.targetRole !== '') {
                        if (!message.member?.roles?.cache?.has(resp.targetRole)) {
                            continue;
                        }
                    }

                    if (resp.replyType === 'text_reaction') {
                        if (resp.replyText) await message.reply(resp.replyText).catch(() => {});
                        if (resp.reactionEmoji) await message.react(resp.reactionEmoji).catch(() => {});
                    } else if (resp.replyType === 'embed' && resp.embedId) {
                        const savedEmbed = localDb[message.guildId]?.customEmbeds?.[resp.embedId];
                        if (savedEmbed) {
                            const embed = new EmbedBuilder()
                                .setTitle(savedEmbed.title || null)
                                .setDescription((savedEmbed.desc || savedEmbed.description || '...').replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n'))
                                .setColor(savedEmbed.color || '#5865F2');

                            const imgUrl = getAbsoluteUrl(savedEmbed.img || savedEmbed.imageUrl);
                            if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                embed.setImage(imgUrl);
                            }
                            if (savedEmbed.footer) embed.setFooter({ text: savedEmbed.footer });

                            await message.reply({ embeds: [embed] }).catch(() => {});
                        } else if (resp.replyText) {
                            await message.reply(resp.replyText).catch(() => {});
                        }
                    } else {
                        if (resp.replyText) await message.reply(resp.replyText).catch(() => {});
                        if (resp.reactionEmoji) await message.react(resp.reactionEmoji).catch(() => {});
                    }
                    break; // match first trigger
                }
            }
        }
    }

    const trimmed = message.content.trim();
    const lowerTrimmed = trimmed.toLowerCase();

    // Lira prefix command (#lira or #ليرة)
    if (lowerTrimmed === '#lira' || lowerTrimmed === '#ليرة' || lowerTrimmed.startsWith('#lira ') || lowerTrimmed.startsWith('#ليرة ')) {
        const args = trimmed.split(/\s+/);
        let targetUser = message.mentions.users.first();
        if (!targetUser && args.length > 1) {
            for (let i = 1; i < args.length; i++) {
                if (/^\d{17,20}$/.test(args[i])) {
                    targetUser = await client.users.fetch(args[i]).catch(() => null);
                    if (targetUser) break;
                }
            }
        }

        let amount = null;
        for (let i = 1; i < args.length; i++) {
            const cleanArg = args[i].replace(/,/g, '');
            if (/^\d+$/.test(cleanArg) && cleanArg !== targetUser?.id) {
                amount = parseInt(cleanArg, 10);
                break;
            }
        }

        await handleLiraCommand({
            sender: message.author,
            channel: message.channel,
            targetUser: targetUser,
            amount: amount,
            isInteraction: false,
            interaction: null
        });
        return;
    }

    if (lowerTrimmed.startsWith('-فيديو ')) {
        try {
            await client.application.fetch();
            const ownerId = client.application.owner?.ownerId || client.application.owner?.id;
            if (message.author.id === ownerId || message.member?.permissions.has('Administrator')) {
                const videoUrl = trimmed.split(/\s+/)[1];
                if (!videoUrl || !videoUrl.startsWith('http')) {
                    return message.reply('❌ **يرجى توفير رابط فيديو صالح.**').catch(() => {});
                }
                globalVideoUrl = videoUrl;
                const db = getDB();
                db.globalVideoUrl = videoUrl;
                saveDB(db);
                return message.reply(`✅ **تم تحديث رابط الفيديو بنجاح:** ${videoUrl}`).catch(() => {});
            }
        } catch (err) {}
        return;
    }

    // Owner / Admin Lira Add Command (!ليرة or !addlira or #addlira)
    if (lowerTrimmed.startsWith('!ليرة') || lowerTrimmed.startsWith('!addlira') || lowerTrimmed.startsWith('#addlira')) {
        const isOwnerOrAdmin = message.member?.permissions?.has(PermissionFlagsBits.Administrator) || message.author.id === message.guild?.ownerId;
        if (!isOwnerOrAdmin) return;

        const args = trimmed.split(/\s+/);
        let targetUserId = message.mentions.users.first()?.id;
        let amount = null;

        for (let i = 1; i < args.length; i++) {
            const clean = args[i].replace(/,/g, '');
            if (!targetUserId && /^\d{17,20}$/.test(clean)) {
                targetUserId = clean;
            } else if (/^\d+$/.test(clean) && clean !== targetUserId) {
                amount = parseInt(clean, 10);
            }
        }

        if (targetUserId && amount && amount > 0) {
            const current = getUserLira(targetUserId);
            const newBal = current + amount;
            setUserLira(targetUserId, newBal);
            return message.reply(`<:Yea:1516534090751279257> **تم إضافة \`$${amount}\` ليرة لحساب <@${targetUserId}>. الرصيد الجديد: \`$${newBal}\` ليرة.**`).catch(() => {});
        } else {
            return message.reply('❌ **الاستخدام:** `!ليرة <آيدي_الشخص_أو_المنشن> <العدد>`').catch(() => {});
        }
    }

    // Owner / Admin Lira Remove Command (!ازالة or !إزالة or !remlira or #remlira)
    if (lowerTrimmed.startsWith('!ازالة') || lowerTrimmed.startsWith('!إزالة') || lowerTrimmed.startsWith('!remlira') || lowerTrimmed.startsWith('#remlira')) {
        const isOwnerOrAdmin = message.member?.permissions?.has(PermissionFlagsBits.Administrator) || message.author.id === message.guild?.ownerId;
        if (!isOwnerOrAdmin) return;

        const args = trimmed.split(/\s+/);
        let targetUserId = message.mentions.users.first()?.id;
        let amount = null;

        for (let i = 1; i < args.length; i++) {
            const clean = args[i].replace(/,/g, '');
            if (!targetUserId && /^\d{17,20}$/.test(clean)) {
                targetUserId = clean;
            } else if (/^\d+$/.test(clean) && clean !== targetUserId) {
                amount = parseInt(clean, 10);
            }
        }

        if (targetUserId && amount && amount > 0) {
            const current = getUserLira(targetUserId);
            const newBal = Math.max(0, current - amount);
            setUserLira(targetUserId, newBal);
            return message.reply(`<:Yea:1516534090751279257> **تم إزالة \`$${amount}\` ليرة من حساب <@${targetUserId}>. الرصيد الجديد: \`$${newBal}\` ليرة.**`).catch(() => {});
        } else {
            return message.reply('❌ **الاستخدام:** `!ازالة <آيدي_الشخص_أو_المنشن> <العدد>`').catch(() => {});
        }
    }

    // Tickets Prefix Commands (!tickets, +tickets, -tickets, !تكتات, +تكتات, /tickets)
    const isTicketsCmd = lowerTrimmed.startsWith('!tickets') || lowerTrimmed.startsWith('+tickets') || lowerTrimmed.startsWith('-tickets') || lowerTrimmed.startsWith('!تكتات') || lowerTrimmed.startsWith('+تكتات') || lowerTrimmed.startsWith('tickets ') || lowerTrimmed === 'tickets' || lowerTrimmed.startsWith('/tickets');
    if (isTicketsCmd && message.guildId) {
        ensureGuildData(message.guildId);
        const db = getDB();
        if (!db[message.guildId].staffTickets) {
            db[message.guildId].staffTickets = {};
        }

        const args = trimmed.split(/\s+/);
        // Possible subcommands: add, remove, reset
        const sub = args[1]?.toLowerCase();

        if (sub === 'add' || sub === 'اضافة' || sub === 'إضافة') {
            if (!message.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return message.reply('**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**').catch(() => {});
            }
            let targetUser = message.mentions.users.first();
            let amount = 1;
            for (let i = 2; i < args.length; i++) {
                if (/^\d{17,20}$/.test(args[i]) && !targetUser) {
                    targetUser = await client.users.fetch(args[i]).catch(() => null);
                } else if (/^\d+$/.test(args[i])) {
                    amount = parseInt(args[i], 10);
                }
            }
            if (!targetUser) return message.reply('❌ **الاستخدام:** `!tickets add @العضو <العدد>`').catch(() => {});
            const current = db[message.guildId].staffTickets[targetUser.id] || 0;
            const newCount = current + amount;
            db[message.guildId].staffTickets[targetUser.id] = newCount;
            saveDB(db);
            return message.reply(`<:Yea:1516534090751279257> |** تمت إضافة \`${amount}\` تذكرة إلى <@${targetUser.id}>. المجموع الآن: \`${newCount}\` تذكرة.**`).catch(() => {});
        }

        if (sub === 'remove' || sub === 'ازالة' || sub === 'إزالة' || sub === 'حذف') {
            if (!message.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return message.reply('**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**').catch(() => {});
            }
            let targetUser = message.mentions.users.first();
            let amount = 1;
            for (let i = 2; i < args.length; i++) {
                if (/^\d{17,20}$/.test(args[i]) && !targetUser) {
                    targetUser = await client.users.fetch(args[i]).catch(() => null);
                } else if (/^\d+$/.test(args[i])) {
                    amount = parseInt(args[i], 10);
                }
            }
            if (!targetUser) return message.reply('❌ **الاستخدام:** `!tickets remove @العضو <العدد>`').catch(() => {});
            const current = db[message.guildId].staffTickets[targetUser.id] || 0;
            const newCount = Math.max(0, current - amount);
            db[message.guildId].staffTickets[targetUser.id] = newCount;
            saveDB(db);
            return message.reply(`<:Yea:1516534090751279257> |** تمت إزالة \`${amount}\` تذكرة من <@${targetUser.id}>. المجموع الآن: \`${newCount}\` تذكرة.**`).catch(() => {});
        }

        if (sub === 'reset' || sub === 'تصفير') {
            if (!message.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return message.reply('**<:No:1516534087161221233> | هذا الأمر مخصص فقط للإدارة (Administrator)!**').catch(() => {});
            }
            let targetUser = message.mentions.users.first();
            if (!targetUser && args[2]) {
                const match = args[2].match(/\d+/);
                if (match) targetUser = await client.users.fetch(match[0]).catch(() => null);
            }
            if (!targetUser) return message.reply('❌ **الاستخدام:** `!tickets reset @العضو`').catch(() => {});
            db[message.guildId].staffTickets[targetUser.id] = 0;
            saveDB(db);
            return message.reply(`<:Yea:1516534090751279257> |** تم تصفير عدد تذاكر <@${targetUser.id}> بنجاح.**`).catch(() => {});
        }

        // View count
        let targetUser = message.mentions.users.first();
        if (!targetUser && args[1]) {
            const match = args[1].match(/\d+/);
            if (match) targetUser = await client.users.fetch(match[0]).catch(() => null);
        }
        if (!targetUser) targetUser = message.author;

        const count = db[message.guildId].staffTickets[targetUser.id] || 0;
        return message.reply(`<:Ticket:1539415274741043230> |** لقد إستلم <@${targetUser.id}> \`${count}\` تذكرة**`).catch(() => {});
    }

    // !رول Administrator command
    if (trimmed.startsWith('!رول') && message.guildId) {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return;

        const args = trimmed.split(/\s+/);
        if (args.length < 3) {
            return message.reply('❌ **الرجاء استخدام الصيغة الصحيحة:** `!رول @العضو <جزء من اسم الرتبة>`').catch(() => {});
        }

        let targetMember = message.mentions.members.first();
        if (!targetMember) {
            const matchId = args[1].match(/\d+/);
            if (matchId) {
                targetMember = await message.guild.members.fetch(matchId[0]).catch(() => null);
            }
        }

        if (!targetMember) {
            return message.reply('❌ **لم يتم العثور على هذا العضو في السيرفر!**').catch(() => {});
        }

        const userArgIndex = trimmed.indexOf(args[1]);
        const partialRoleName = trimmed.slice(userArgIndex + args[1].length).trim();

        if (!partialRoleName) {
            return message.reply('❌ **يرجى تحديد جزء من اسم الرتبة المُراد إعطاؤها أو إزالتها.**').catch(() => {});
        }

        const role = message.guild.roles.cache.find(r => 
            r.name.toLowerCase().includes(partialRoleName.toLowerCase()) && r.name !== '@everyone'
        );

        if (!role) {
            return message.reply(`❌ **لم يتم العثور على أي رتبة تطابق: \`${partialRoleName}\`**`).catch(() => {});
        }

        const botMember = message.guild.members.me;
        if (role.position >= botMember.roles.highest.position) {
            return message.reply('❌ **لا يمكنني التحكم بهذه الرتبة لأنها أعلى من رتبة البوت أو مساوية لها.**').catch(() => {});
        }

        const hasRole = targetMember.roles.cache.has(role.id);

        if (hasRole) {
            await targetMember.roles.remove(role).catch(err => {
                console.error('[!رول remove error]:', err);
                return null;
            });
            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setDescription(`✅ **تم إزالة الرتبة بنجاح**\n\n• **العضو:** ${targetMember}\n• **الرتبة:** ${role}`);
            return message.reply({ embeds: [embed] }).catch(() => {});
        } else {
            await targetMember.roles.add(role).catch(err => {
                console.error('[!رول add error]:', err);
                return null;
            });
            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setDescription(`✅ **تم إعطاء الرتبة بنجاح**\n\n• **العضو:** ${targetMember}\n• **الرتبة:** ${role}`);
            return message.reply({ embeds: [embed] }).catch(() => {});
        }
    }

    if (message.author.id === '1179133837930938470') {
        const trimmed = message.content.trim();

        if (trimmed === '-مجاني') {
            const db = getDB();
            if (!db._settings) db._settings = {};
            db._settings.aiFreeMode = true;
            saveDB(db);
            return message.reply('🌐 **تم تفعيل الوضع المجاني للذكاء الاصطناعي بنجاح!**\nالآن أصبح الذكاء الاصطناعي مجانياً ومتاحاً لجميع السيرفرات دون استثناء.').catch(() => {});
        }

        if (trimmed === '-بريميوم') {
            const db = getDB();
            if (!db._settings) db._settings = {};
            db._settings.aiFreeMode = false;
            saveDB(db);
            return message.reply('👑 **تم إعادة نظام البريميوم للذكاء الاصطناعي بنجاح!**\nالسيرفرات التي تمتلك اشتراك بريميوم فقط هي من يمكنها استخدام ميزات الذكاء الاصطناعي، مع احتفاظ السيرفرات المفعلة باشتراكها.').catch(() => {});
        }
        
        if (trimmed === '-سيرفر') {
            const guilds = Array.from(client.guilds.cache.values());
            if (guilds.length === 0) {
                return message.reply('❌ البوت ليس متصلاً بأي سيرفر حالياً.').catch(() => {});
            }

            const msg = await message.reply('🔄 جاري توليد روابط الدعوة لجميع السيرفرات...').catch(() => {});

            const list = [];
            for (const guild of guilds) {
                let inviteUrl = 'تعذر إنشاء رابط دعوة (صلاحيات ناقصة)';
                try {
                    const channel = guild.channels.cache.find(c => 
                        c.type === ChannelType.GuildText && 
                        c.permissionsFor(guild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
                    );
                    if (channel) {
                        const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
                        if (invite) inviteUrl = invite.url;
                    } else {
                        const anyChannel = guild.channels.cache.find(c => 
                            c.permissionsFor(guild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
                        );
                        if (anyChannel) {
                            const invite = await anyChannel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
                            if (invite) inviteUrl = invite.url;
                        }
                    }
                } catch (e) {
                    console.error(`Failed to create invite for guild ${guild.name}:`, e.message || e);
                }
                list.push(`• **${guild.name}** (ID: \`${guild.id}\`) - الأعضاء: ${guild.memberCount}\n🔗 الرابط: ${inviteUrl}`);
            }

            let currentMessage = '👑 **قائمة السيرفرات المشترك بها البوت:**\n\n';
            for (const item of list) {
                if ((currentMessage + item).length > 1900) {
                    await message.author.send(currentMessage).catch(() => {});
                    currentMessage = '';
                }
                currentMessage += item + '\n\n';
            }
            if (currentMessage) {
                await message.author.send(currentMessage).catch(() => {});
            }

            if (msg) {
                await msg.edit('✅ تم إرسال قائمة السيرفرات وروابط الدعوة إلى الخاص بنجاح.').catch(() => {});
            }
            return;
        }

        if (trimmed.startsWith('!سيرفر')) {
            const args = trimmed.split(/\s+/);
            const targetGuildId = args[1];
            const durationInput = args[2];

            if (!targetGuildId) {
                return message.reply('❌ **الرجاء تحديد آيدي السيرفر!**\nمثال: `!سيرفر 123456789012345678 1month`').catch(() => {});
            }

            const db = getDB();
            if (!db[targetGuildId]) db[targetGuildId] = {};

            const guild = client.guilds.cache.get(targetGuildId);

            if (!durationInput || durationInput === '0' || durationInput === 'off' || durationInput === 'stop' || durationInput === 'delete') {
                db[targetGuildId].premium = null;
                saveDB(db);
                return message.reply(`✅ **تم إيقاف البريميوم بنجاح عن سيرفر: ${guild ? guild.name : targetGuildId}**`).catch(() => {});
            }

            let msToAdd = 0;
            let displayDuration = '';

            const match = durationInput.match(/^(\d+)\s*(day|month|year|d|m|y)s?$/i);
            if (match) {
                const amount = parseInt(match[1]);
                const unit = match[2].toLowerCase();

                if (unit === 'day' || unit === 'd') {
                    msToAdd = amount * 24 * 60 * 60 * 1000;
                    displayDuration = `${amount} يوم`;
                } else if (unit === 'month' || unit === 'm') {
                    msToAdd = amount * 30 * 24 * 60 * 60 * 1000;
                    displayDuration = `${amount} شهر`;
                } else if (unit === 'year' || unit === 'y') {
                    msToAdd = amount * 365 * 24 * 60 * 60 * 1000;
                    displayDuration = `${amount} سنة`;
                }
            } else if (durationInput === 'lifetime' || durationInput === 'مؤبد' || durationInput === 'forever') {
                msToAdd = 'lifetime';
                displayDuration = 'مؤبد (Lifetime)';
            }

            if (msToAdd === 0) {
                return message.reply('❌ **الرجاء كتابة مدة صحيحة!**\nأمثلة: `1day`, `1month`, `1year`, `lifetime` أو `0` لإيقافه.').catch(() => {});
            }

            const expiresAt = msToAdd === 'lifetime' ? 'lifetime' : Date.now() + msToAdd;
            db[targetGuildId].premium = { expiresAt };
            saveDB(db);

            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle('👑 تفعيل اشتراك بريميوم')
                .setDescription(
                    `🎉 **تم تفعيل ميزات البريميوم بنجاح لهذا السيرفر!**\n\n` +
                    `• **اسم السيرفر:** ${guild ? guild.name : 'غير متصل بالبوت حالياً'}\n` +
                    `• **آيدي السيرفر:** \`${targetGuildId}\`\n` +
                    `• **المدة:** ${displayDuration}\n` +
                    `• **تاريخ الانتهاء:** ${expiresAt === 'lifetime' ? 'مؤبد' : new Date(expiresAt).toLocaleString('ar-EG')}`
                );

            return message.reply({ embeds: [embed] }).catch(() => {});
        }

        if (trimmed.startsWith('$سيرفر')) {
            const args = trimmed.split(/\s+/);
            const targetGuildId = args[1];

            if (!targetGuildId) {
                return message.reply('❌ **الرجاء تحديد آيدي السيرفر!**\nمثال: `$سيرفر 123456789012345678`').catch(() => {});
            }

            const targetGuild = client.guilds.cache.get(targetGuildId) || await client.guilds.fetch(targetGuildId).catch(() => null);
            if (!targetGuild) {
                return message.reply('❌ **لم يتم العثور على السيرفر! تأكد من أن البوت موجود فيه.**').catch(() => {});
            }

            let inviteUrl = '';
            try {
                let channel = targetGuild.channels.cache.find(c => 
                    c.type === ChannelType.GuildText && 
                    c.permissionsFor(targetGuild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
                );
                
                if (!channel) {
                    const channels = await targetGuild.channels.fetch().catch(() => null);
                    channel = channels?.find(c => 
                        c.type === ChannelType.GuildText && 
                        c.permissionsFor(targetGuild.members.me)?.has(PermissionFlagsBits.CreateInstantInvite)
                    );
                }

                if (channel) {
                    const invite = await channel.createInvite({ maxAge: 0, maxUses: 0 }).catch(() => null);
                    if (invite) inviteUrl = invite.url;
                }
            } catch (err) {
                console.error('Invite generation failed:', err);
            }

            if (!inviteUrl) {
                return message.reply('❌ **فشل في إنشاء رابط دعوة للسيرفر! يرجى التأكد من صلاحيات البوت هناك.**').catch(() => {});
            }

            const iconUrl = targetGuild.iconURL({ extension: 'png', size: 128 });
            if (!iconUrl) {
                return message.reply('❌ **السيرفر المستهدف لا يملك أيقونة (لوجو)! يجب أن يحتوي السيرفر على لوجو لإنشاء الزر التلقائي.**').catch(() => {});
            }

            const loadingMsg = await message.reply('🔄 **جاري إنشاء الأيموجي المخصص ورابط الدعم للسيرفر...**').catch(() => {});

            const emojiGuildId = '1219990589894824057';
            const emojiGuild = client.guilds.cache.get(emojiGuildId) || await client.guilds.fetch(emojiGuildId).catch(() => null);
            if (!emojiGuild) {
                if (loadingMsg) await loadingMsg.delete().catch(() => {});
                return message.reply('❌ **السيرفر المحدد لإنشاء الأيموجيات (1219990589894824057) غير موجود أو البوت ليس فيه!**').catch(() => {});
            }

            let customEmoji = null;
            try {
                customEmoji = await emojiGuild.emojis.create({
                    attachment: iconUrl,
                    name: `support_${targetGuild.id}`
                }).catch((err) => {
                    console.error('Failed to create emoji in support server:', err);
                    return null;
                });
            } catch (e) {
                console.error(e);
            }

            if (!customEmoji) {
                if (loadingMsg) await loadingMsg.delete().catch(() => {});
                return message.reply('❌ **فشل في إنشاء الأيموجي في السيرفر المخصص! تأكد من صلاحيات إدارة الأيموجي للبوت هناك ومن وجود مساحة للأيموجيات.**').catch(() => {});
            }

            const db = getDB();
            if (!db.supportServers) db.supportServers = [];

            db.supportServers = db.supportServers.filter(s => s.guildId !== targetGuild.id);
            db.supportServers.push({
                guildId: targetGuild.id,
                guildName: targetGuild.name,
                inviteUrl: inviteUrl,
                emojiId: customEmoji.id,
                botName: client.user.username
            });

            saveDB(db);

            const embed = new EmbedBuilder()
                .setColor('#57f287')
                .setTitle('✅ تم إضافة السيرفر الداعم بنجاح')
                .setDescription(
                    `• **اسم السيرفر:** ${targetGuild.name}\n` +
                    `• **آيدي السيرفر:** \`${targetGuild.id}\`\n` +
                    `• **رابط الدعوة:** ${inviteUrl}\n` +
                    `• **الأيموجي المخصص:** <:${customEmoji.name}:${customEmoji.id}>\n` +
                    `• **البوت المضاف له:** ${client.user.username}`
                );

            if (loadingMsg) {
                await loadingMsg.edit({ content: '🎉 **تم تسجيل السيرفر الداعم بنجاح!**', embeds: [embed] }).catch(() => {});
            } else {
                await message.reply({ embeds: [embed] }).catch(() => {});
            }
            return;
        }
    }

    if (!message.guildId) return;
    const state = activeStates.get(message.author.id);
    const db = getDB();

    if (state) {
        // 1. AI Avatar Image Upload Handler
        if (state.type === 'ai_upload_avatar') {
            const att = message.attachments.first();
            if (!att || !att.contentType?.startsWith('image/')) {
                return message.reply('❌ يرجى إرسال صورة صالحة كملف مرفق.').then(m => setTimeout(() => m.delete().catch(()=>{}), 5000));
            }
            
            const finalUrl = (att.proxyURL || att.url).trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
            
            // Upload to ImgBB
            const permanentUrl = await uploadToImgBB(finalUrl);
            
            // Update the db
            db[message.guildId].ai.avatar = permanentUrl;
            saveDB(db);
            
            await message.delete().catch(() => {});
            activeStates.delete(message.author.id);
            
            const successMsg = await message.channel.send('✅ **تم تحديث صورة الذكاء الاصطناعي بنجاح!**');
            setTimeout(() => successMsg.delete().catch(() => {}), 5000);
            
            // Edit the main panel if we can!
            try {
                if (state.channelId && state.messageId) {
                    const channel = client.channels.cache.get(state.channelId);
                    if (channel) {
                        const origMsg = await channel.messages.fetch(state.messageId).catch(() => null);
                        if (origMsg && origMsg.embeds[0]) {
                            const newEmbed = EmbedBuilder.from(origMsg.embeds[0])
                                .setDescription(
                                    `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${db[message.guildId].ai.name}\n` +
                                    `-#  ~~                                                                                                                                                                  ~~\n` +
                                    `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** [انقر لعرض الصورة](${permanentUrl})\n` +
                                    `-#  ~~                                                                                                                                                                  ~~\n` +
                                    `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${db[message.guildId].ai.status}\n` +
                                    `-#  ~~                                                                                                                                                                  ~~\n` +
                                    `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${db[message.guildId].ai.channelId ? `<#${db[message.guildId].ai.channelId}>` : 'غير محدد'}\n` +
                                    `-#  ~~                                                                                                                                                                  ~~\n` +
                                    `**كاتاجوري المساعد 📁 :** ${db[message.guildId].ai.categoryId ? `<#${db[message.guildId].ai.categoryId}>` : 'غير محدد'}\n` +
                                    `-#  ~~                                                                                                                                                                  ~~\n` +
                                    `**نوع التدريب <:training:1521452247270293524> :** ${db[message.guildId].ai.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (db[message.guildId].ai.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}`
                                );
                            await origMsg.edit({ embeds: [newEmbed] }).catch(() => {});
                        }
                    }
                }
            } catch (e) {
                console.error('Error updating main AI message on image upload:', e);
            }
            return;
        }

        const panel = db[message.guildId]?.panels?.[state.panelId];
        if (panel) {
            // 2. Panel Image / Welcome Image Upload Handler
            if (state.type === 'upload_image') {
                let savedUrl = null;
                let originalName = 'image.png';
                const att = message.attachments.first();
                if (att) {
                    savedUrl = (att.url || att.proxyURL).trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
                    originalName = att.name || 'image.png';
                } else {
                    const urlRegex = /(https?:\/\/[^\s]+)/gi;
                    const match = message.content.match(urlRegex);
                    if (match) {
                        savedUrl = match[0].trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
                        try {
                            const parsed = new URL(savedUrl);
                            originalName = path.basename(parsed.pathname) || 'image.png';
                        } catch (e) {}
                    }
                }

                if (!savedUrl) {
                    return message.reply('**<:No:1516534087161221233> | يرجى إرسال صورة صالحة كملف مرفق أو رابط صورة مباشر!**').then(m => setTimeout(() => m.delete().catch(()=>{}), 5000));
                }

                try {
                    // Upload to ImgBB
                    const permanentUrl = await uploadToImgBB(savedUrl);

                    if (state.imgType === 'welcome') panel.welcome_img = permanentUrl;
                    else panel.img = permanentUrl;
                    saveDB(db);

                    await message.delete().catch(() => {});
                    activeStates.delete(message.author.id);

                    const isEphem = db[message.guildId]?.setup_ephemeral ?? true;
                    if (!isEphem) {
                        const success = await message.channel.send('✅ تم إضافة الصورة وحفظها بنجاح!');
                        setTimeout(() => success.delete().catch(() => {}), 3000);
                    }

                    let updated = false;
                    if (state.channelId && state.messageId) {
                        const channel = client.channels.cache.get(state.channelId);
                        if (channel) {
                            const origMsg = await channel.messages.fetch(state.messageId).catch(() => null);
                            if (origMsg) {
                                await updatePanelEmbed({
                                    guildId: message.guildId,
                                    editReply: async d => {
                                        await origMsg.edit(d).catch(() => {});
                                    }
                                }, state.panelId);
                                updated = true;
                            }
                        }
                    }
                    if (!updated) {
                        if (!isEphem) {
                            await updatePanelEmbed({ guildId: message.guildId, editReply: d => message.channel.send(d), replied: true }, state.panelId);
                        } else {
                            await message.author.send({ content: '✅ **تم إضافة الصورة وحفظها بنجاح!** يرجى كتابة `/setup_ticket` في السيرفر لمتابعة الإعدادات بشكل مخفي تماماً.' }).catch(() => {});
                        }
                    }
                } catch (err) {
                    console.error('Failed to update image:', err);
                    return message.reply('**<:No:1516534087161221233> | فشل تحديث وحفظ الصورة، يرجى المحاولة مرة أخرى لاحقاً!**').then(m => setTimeout(() => m.delete().catch(()=>{}), 5000));
                }
                return;
            }

            // 3. Button Emoji Upload Handler
            if (state.type === 'upload_emoji') {
                const content = message.content.trim(), match = content.match(/<?(?:a)?:(?<name>\w+):(?<id>\d+)>/);
                let val = match ? match[2] : content;
                if (!panel.buttons) panel.buttons = [];
                panel.buttons.push({ name: state.btnName, category: null, emoji: val });
                saveDB(db);
                await message.delete().catch(() => {});
                activeStates.delete(message.author.id);

                const isEphem = db[message.guildId]?.setup_ephemeral ?? true;
                if (!isEphem) {
                    const success = await message.channel.send(`✅ تم إضافة الزر **"${state.btnName}"** مع الإيموجي بنجاح!`);
                    setTimeout(() => success.delete().catch(() => {}), 3000);
                    await updatePanelEmbed({ guildId: message.guildId, editReply: d => message.channel.send(d), replied: true }, state.panelId);
                } else {
                    await message.author.send({ content: `✅ **تم إضافة الزر "${state.btnName}" مع الإيموجي بنجاح!** يرجى كتابة \`/setup_ticket\` في السيرفر لمتابعة الإعدادات بشكل مخفي تماماً.` }).catch(() => {});
                }
                return;
            }
        }
    }

    // نظام تخطي الروابط التلقائي المباشر في الروم المخصص (Link Auto-Bypasser)
    const keyConfig = db[message.guildId]?.deltaKeys;
    if (keyConfig && keyConfig.enabled && message.channelId === keyConfig.channelId) {
        if (keyConfig.method === 'link' || keyConfig.method === 'both') {
            const urlRegex = /(https?:\/\/[^\s]+)/gi;
            const urls = message.content.match(urlRegex);
            if (urls) {
                const deltaLink = urls[0];
                if (deltaLink) {
                    // حذف رسالة المستخدم فوراً لحمايتها والحفاظ على الترتيب
                    // await message.delete().catch(() => {}); // سيتم الحذف لاحقاً لضمان وصول رسالة التحميل

                    // التحقق مما إذا كان المستخدم يمتلك طلباً قيد المعالجة بالفعل
                    if (activeBypassUsers.has(message.author.id)) {
                        const waitMsg = await message.channel.send({
                            content: `<@${message.author.id}> ⚠️ **يرجى الانتظار لحين الانتهاء من رابطك الأول قبل إرسال رابط جديد!**`
                        }).catch(() => null);
                        if (waitMsg) {
                            setTimeout(() => {
                                waitMsg.delete().catch(() => {});
                            }, 4000);
                        }
                        await message.delete().catch(() => {}); // حذفها في هذه الحالة أيضاً
                        return;
                    }

                    const startTime = performance.now();
                    activeBypassUsers.add(message.author.id);

                    // إرسال رسالة انتظار تمنشن العضو داخل الحاوية دون نص عادي لتفادي الأخطاء ومخالفات API
                    const loadingContainer = new ContainerBuilder()
                        .setAccentColor(0x2b2d31)
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `# Processing your link <a:Reset:1516390093504385074>`
                            )
                        );

                    const replyMsg = await message.channel.send({
                        components: [loadingContainer.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch((err) => {
                        console.error('[Delta Auto-Bypass loading message send error]:', err);
                        return null;
                    });

                    // الآن يمكن حذف رسالة المستخدم بأمان
                    await message.delete().catch(() => {});

                    try {
                        const { bypassedLink, error, isUnsupported, isPlatoRelay, isGoogleAuthError } = await bypassDeltaLink(deltaLink, message.author);
                        const timeTaken = getDynamicBypassTime(startTime);

                        if (isGoogleAuthError || isPlatoRelay) {
                            activeBypassUsers.delete(message.author.id);
                            const { container, row, description } = buildLoginErrorContainer();

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(async () => {
                                    await replyMsg.edit({
                                        content: `### <:No:1516534087161221233> Need to login\n${description}`,
                                        components: [row]
                                    }).catch(() => {});
                                });
                            } else {
                                await message.channel.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(async () => {
                                    await message.channel.send({
                                        content: `### <:No:1516534087161221233> Need to login\n${description}`,
                                        components: [row]
                                    }).catch(() => {});
                                });
                            }
                            return;
                        }

                        if (isUnsupported) {
                            activeBypassUsers.delete(message.author.id);
                            const shortUrl = deltaLink.length > 30 ? deltaLink.slice(0, 30) + '...' : deltaLink;
                            const container = new ContainerBuilder()
                                .setAccentColor(0xff4d4d) // Red
                                .addTextDisplayComponents((textDisplay) =>
                                    textDisplay.setContent(
                                        `### رابط غير مدعوم <:No:1516534087161221233>\n` +
                                        `Unsupported link "${shortUrl}"\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                    )
                                )
                                .addActionRowComponents((actionRow) =>
                                    actionRow.setComponents(
                                        new ButtonBuilder()
                                            .setLabel('Support Server')
                                            .setEmoji('1511327391669026916')
                                            .setStyle(ButtonStyle.Link)
                                            .setURL('https://discord.gg/hBvzFrqQP2')
                                    )
                                );

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            }
                            return;
                        }

                        if (bypassedLink) {
                            // Notify owner
                            const ownerId = '1179133837930938470';
                            const owner = await client.users.fetch(ownerId).catch(() => null);
                            if (owner) {
                                const logEmbed = new EmbedBuilder()
                                    .setColor('#2b2d31')
                                    .setTitle('🔔 إشعار تخطي جديد (تلقائي)')
                                    .setDescription(`**المستخدم:** <@${message.author.id}> (${message.author.tag})\n**السيرفر:** ${message.guild.name}\n**الروم:** <#${message.channelId}>\n**الرابط:** \`${deltaLink}\``)
                                    .setTimestamp();
                                await owner.send({ embeds: [logEmbed] }).catch(() => {});
                            }

                            const { container, row1, row2 } = buildKeyBypassContainer(bypassedLink, timeTaken);

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(async () => {
                                    await replyMsg.edit({
                                        content: `\`${bypassedLink}\``,
                                        components: [row1, row2]
                                    }).catch(() => {});
                                });
                            } else {
                                await message.channel.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(async () => {
                                    await message.channel.send({
                                        content: `\`${bypassedLink}\``,
                                        components: [row1, row2]
                                    }).catch(() => {});
                                });
                            }

                            // إرسال رسالة نصية منفصلة بعد الايمبد وتتم إزالتها تلقائياً بعد 3 ثواني
                            message.channel.send({
                                content: `<:Yea:1516534090751279257> | Your key has been extracted <@${message.author.id}>`
                            }).then(m => setTimeout(() => m.delete().catch(() => {}), 3000)).catch(() => {});
                        } else if (isUnsupported || error === 'UNSUPPORTED_LINK') {
                            const shortUrl = deltaLink.length > 30 ? deltaLink.slice(0, 30) + '...' : deltaLink;
                            const container = new ContainerBuilder()
                                .setAccentColor(0xff4d4d) // Red
                                .addTextDisplayComponents((textDisplay) =>
                                    textDisplay.setContent(
                                        `### رابط غير مدعوم <:No:1516534087161221233>\n` +
                                        `Unsupported link "${shortUrl}"\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                    )
                                );

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            }
                        } else {
                            const container = new ContainerBuilder()
                                .setAccentColor(0xff4d4d) // Red
                                .addTextDisplayComponents((textDisplay) =>
                                    textDisplay.setContent(
                                        `### فشل التخطي <:No:1516534087161221233>\n` +
                                        `${error || 'فشلت جميع محاولات التخطي لهذا الرابط.'}\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                    )
                                );

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container.toJSON()],
                                    flags: [MessageFlags.IsComponentsV2]
                                }).catch(() => {});
                            }
                        }
                    } catch (apiError) {
                        console.error('[Delta Auto-Bypass fetch exception]:', apiError);
                        const timeTaken = getDynamicBypassTime(startTime);
                        const container = new ContainerBuilder()
                            .setAccentColor(0xff4d4d) // Red
                            .addTextDisplayComponents((textDisplay) =>
                                textDisplay.setContent(
                                    `### فشل التخطي <:No:1516534087161221233>\n` +
                                    `عذراً، حدث خطأ غير متوقع أثناء معالجة الرابط.\n` +
                                    `-#  ~~                                                                                                                                                                   ~~\n` +
                                    `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                )
                            );

                        if (replyMsg) {
                            await replyMsg.edit({
                                components: [container.toJSON()],
                                flags: [MessageFlags.IsComponentsV2]
                            }).catch(() => {});
                        } else {
                            await message.channel.send({
                                components: [container.toJSON()],
                                flags: [MessageFlags.IsComponentsV2]
                            }).catch(() => {});
                        }
                    } finally {
                        activeBypassUsers.delete(message.author.id);
                    }
                    return; // إنهاء الإجراء لعدم تنفيذ باقي مستمعي الرسائل
                }
            }
        }
    }

    // نظام تنزيل الفيديوهات التلقائي (TikTok, Instagram, YouTube)
    const videoDownloaderConfig = db[message.guildId]?.videoDownloader;
    if (videoDownloaderConfig && videoDownloaderConfig.enabled) {
        if (!videoDownloaderConfig.channelId || message.channelId === videoDownloaderConfig.channelId) {
            const videoUrlRegex = /(https?:\/\/(?:www\.|vt\.|vm\.|v\.)?(?:tiktok\.com|instagram\.com|instagr\.am|youtube\.com|youtu\.be)\/[^\s]+)/gi;
            const matches = message.content.match(videoUrlRegex);
            if (matches && matches[0]) {
                const videoUrl = matches[0];
                const statusMsg = await message.channel.send("⏳ **جاري تحميل الفيديو وإرساله بدون علامة مائية...**").catch(() => null);

                try {
                    const downloadResult = await processVideoDownload(videoUrl);
                    if (downloadResult && downloadResult.buffer) {
                        const fileMb = downloadResult.buffer.length / (1024 * 1024);
                        if (fileMb > 8) {
                            if (statusMsg) await statusMsg.edit(`❌ **حجم الفيديو كبير جداً (${fileMb.toFixed(1)}MB). حد الرفع المسموح للسيرفر هو 8MB.**`).catch(() => {});
                        } else {
                            const supportBtn = new ButtonBuilder()
                                .setEmoji('1511327391669026916')
                                .setStyle(ButtonStyle.Link)
                                .setURL('https://discord.gg/hBvzFrqQP2');
                            const row = new ActionRowBuilder().addComponents(supportBtn);

                            try {
                                await message.channel.send({
                                    content: `<:Yea:1516534090751279257> |** completed**\n<@${message.author.id}>`,
                                    files: [{
                                        attachment: downloadResult.buffer,
                                        name: downloadResult.filename || 'video.mp4'
                                    }],
                                    components: [row]
                                });
                                if (statusMsg) await statusMsg.delete().catch(() => {});
                            } catch (sendErr) {
                                if (sendErr.code === 40005 || sendErr.status === 413) {
                                    if (statusMsg) await statusMsg.edit(`❌ **حجم الفيديو كبير جداً (${fileMb.toFixed(1)}MB). تجاوز الحد المسموح برعه في هذا السيرفر.**`).catch(() => {});
                                } else {
                                    throw sendErr;
                                }
                            }
                        }
                    } else {
                        if (statusMsg) await statusMsg.edit("❌ **تعذر تحميل الفيديو، يرجى التأكد من أن الرابط مباشر وعام.**").catch(() => {});
                    }
                } catch (err) {
                    console.error('[Video Downloader Error]:', err);
                    if (statusMsg) await statusMsg.edit("❌ **حدث خطأ أثناء معالجة وتحميل الفيديو.**").catch(() => {});
                }
            }
        }
    }


    const protectLink = db[message.guildId]?.protection?.links;
    if (protectLink && protectLink.enabled && message.author.id !== message.guild.ownerId && !message.member?.permissions.has(PermissionFlagsBits.Administrator)) {
        const isBotInteraction = message.mentions.users.some(u => u.bot) || Boolean(message.reference);
        const secondBotAiChan = db[message.guildId]?.secondBot_ai?.channelId;
        const secondBotAiCat = db[message.guildId]?.secondBot_ai?.categoryId;
        const exemptCats = Array.from(new Set(['1508608008312324198', '1539402144048877720', secondBotAiCat, ...(Array.isArray(protectLink.exemptedCategories) ? protectLink.exemptedCategories : [])].filter(Boolean)));
        const exemptChans = Array.from(new Set(['1521436136420020275', secondBotAiChan, ...(Array.isArray(protectLink.exemptedChannels) ? protectLink.exemptedChannels : [])].filter(Boolean)));
        const isExemptedChannel = exemptChans.includes(message.channelId);
        const isExemptedCategory = message.channel?.parentId && exemptCats.includes(message.channel.parentId);
        const isExempted = isExemptedChannel || isExemptedCategory || isBotInteraction;

        if (!isExempted && /(https?:\/\/[^\s]+|:\/\/[^\s]+)/gi.test(message.content)) {
            await message.delete().catch(() => {});
            
            const defaultRedirectNotice = 
`**يرجى إرسال الرابط هنا https://discord.com/channels/1179136470750068766/1521436136420020275**
-#  ~~                                                                                                                                                                   ~~
**Please send link here https://discord.com/channels/1179136470750068766/1521436136420020275**`;
            const rawWarnMsg = (message.guildId === '1179136470750068766' || !protectLink.warnMessage) ? defaultRedirectNotice : protectLink.warnMessage;
            const warnText = rawWarnMsg
                .replace(/{user}/g, `<@${message.author.id}>`)
                .replace(/{username}/g, message.author.username || '')
                .replace(/{channel}/g, `<#${message.channelId}>`);
            
            const warnDurationSec = typeof protectLink.warnDuration === 'number' ? protectLink.warnDuration : 10;
            
            const msg = await message.channel.send(warnText).catch(() => null);
            if (msg && warnDurationSec > 0) {
                setTimeout(() => msg.delete().catch(() => {}), warnDurationSec * 1000);
            }
            
            if (protectLink.punishment !== 'none' && protectLink.punishment !== 'none_delete') {
                await applyPunishment(message.guild, message.author, protectLink, 'إرسال رابط غير مسموح به', message.content.substring(0, 50));
            }
            return;
        }
    }
    const protectSpam = db[message.guildId]?.protection?.spam;
    if (protectSpam && protectSpam.enabled && message.author.id !== message.guild.ownerId) {
        const now = Date.now();
        if (!userMessageCache.has(message.author.id)) userMessageCache.set(message.author.id, []);
        const cache = userMessageCache.get(message.author.id);
        cache.push({ id: message.id, time: now });
        const recent = cache.filter(m => now - m.time < 3000);
        userMessageCache.set(message.author.id, recent);
        if (recent.length >= 3) {
            const ids = recent.map(m => m.id);
            try { await message.channel.bulkDelete(ids).catch(async () => { for (const id of ids) { const m = await message.channel.messages.fetch(id).catch(() => null); if (m) await m.delete().catch(()=>{}); } }); } catch(e){}
            const warn = await message.channel.send(`⚠️ | ${message.author} يمنع السبام نهائياً! تم كتمك لحماية الشات.`);
            setTimeout(() => warn.delete().catch(() => {}), 5000);
            await applyPunishment(message.guild, message.author, protectSpam, 'سبام مفرط', 'إرسال رسائل متعددة بسرعة عالية');
            return;
        }
    }

    // Check Script Search
    if (message.guildId && !message.author.bot) {
        const scriptHandled = await handleScriptSearchMessage(message);
        if (scriptHandled) return;
    }

    // Check Support AI inside ticket channels
    if (message.guildId && !message.author.bot) {
        const ticket = db[message.guildId]?.tickets?.[message.channelId];
        const panel = ticket?.panelId ? db[message.guildId]?.panels?.[ticket.panelId] : null;
        const panelAiEnabled = panel ? (panel.supportAiEnabled === true) : false;

        if (ticket && ticket.supportAiEnabled === true && panelAiEnabled) {
            const handled = await handleSupportAiInTicketMessage(message, ticket);
            if (handled) return;
        }

        // Support AI Command: +ذكاء [panelId]
        const trimmedContent = message.content.trim();
        if (trimmedContent.startsWith('+ذكاء')) {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== message.guild.ownerId) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص للإداريين فقط!**').catch(() => {});
            }

            const args = trimmedContent.split(/\s+/);
            const panels = db[message.guildId]?.panels || {};
            const panelKeys = Object.keys(panels);

            if (panelKeys.length === 0) {
                return message.reply('❌ **لا توجد أي لوحات/بانلات تذاكر أنشئت في هذا السيرفر بعد.** يمكنك إنشاء بانل أولاً عبر `/setup_ticket`.').catch(() => {});
            }

            let panelId = args[1];
            if (!panelId) {
                if (panelKeys.length === 1) {
                    panelId = panelKeys[0];
                } else {
                    const list = panelKeys.map(k => `• **${k}** (${panels[k].title || 'بدون عنوان'})`).join('\n');
                    return message.reply(`❓ **يرجى تحديد ايدي البانل المُراد ربط ذكاء الدعم الفني به:**\n\n${list}\n\n**الصيغة:** \`+ذكاء [ايدي البانل]\``).catch(() => {});
                }
            }

            if (!panels[panelId]) {
                return message.reply(`❌ **لم يتم العثور على بانل بالأيدي \`${panelId}\`.** الأيديهات المتاحة هي: ${panelKeys.join(', ')}`).catch(() => {});
            }

            db[message.guildId].supportAiPanelId = panelId;
            if (panels[panelId]) {
                panels[panelId].supportAiEnabled = true;
            }
            saveDB(db);

            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle('🤖 تم تفعيل ذكاء الدعم الفني للبانل')
                .setDescription(
                    `✅ **تم ربط البانل \`${panelId}\` (${panels[panelId].title || 'تذاكر الدعم'}) بذكاء الدعم الفني بنجاح!**\n\n` +
                    `• أي تذكرة يتم فتحها عبر هذا البانل سيتولى ذكاء الدعم الفني المتابعة والرد الفوري فيها.\n` +
                    `• لإيقاف الذكاء الاصطناعي داخل أي تذكرة، يمكن لأعضاء الدعم كتابة: \`-توقف\``
                );

            return message.reply({ embeds: [embed] }).catch(() => {});
        }

        if (trimmedContent === '-توقف' || trimmedContent === '-توقف الذكاء') {
            if (ticket && ticket.supportAiEnabled) {
                ticket.supportAiEnabled = false;
                saveDB(db);
                return message.reply('🛑 **تم إيقاف الذكاء الاصطناعي في هذه التذكرة بنجاح.**\nسيتولى فريق الدعم البشري المتابعة معكم الآن.').catch(() => {});
            }
        }

        if (trimmedContent === '-تشغيل' || trimmedContent === '-تفعيل') {
            if (ticket && !ticket.supportAiEnabled) {
                ticket.supportAiEnabled = true;
                saveDB(db);
                return message.reply('🤖 **تم إعادة تفعيل الذكاء الاصطناعي في هذه التذكرة بنجاح!**').catch(() => {});
            }
        }

        // Owner-only Premium Toggle Command
        const OWNER_ID = '1179133837930938470';
        if (trimmedContent.startsWith('-بريميوم')) {
            if (message.author.id !== OWNER_ID) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص لصاحب البوت فقط!**').catch(() => {});
            }
            const args = trimmedContent.split(/\s+/);
            const targetGuildId = args[1];
            
            if (!targetGuildId) {
                return message.reply('❌ **يرجى كتابة ايدي السيرفر!**\nمثال: `-بريميوم 123456789012345678`').catch(() => {});
            }

            if (!db[targetGuildId]) db[targetGuildId] = {};
            
            const isCurrentlyPrem = isGuildPremium(targetGuildId);
            
            if (isCurrentlyPrem) {
                db[targetGuildId].premium = null;
                saveDB(db);
                return message.reply(`✅ **تم إلغاء تفعيل البريميوم للسيرفر:** \`${targetGuildId}\``).catch(() => {});
            } else {
                db[targetGuildId].premium = { expiresAt: 'lifetime', activatedAt: Date.now() };
                saveDB(db);
                return message.reply(`💎 **تم تفعيل البريميوم (مدى الحياة) للسيرفر:** \`${targetGuildId}\` بنجاح.`).catch(() => {});
            }
        }

        if (trimmedContent.startsWith('-مفتاح')) {
            if (message.author.id !== OWNER_ID) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص لصاحب البوت فقط!**').catch(() => {});
            }
            const args = trimmedContent.split(/\s+/);
            const newApiKey = args.slice(1).join(' ').trim();
            if (!newApiKey) {
                const currentKey = getBaconApiKey();
                return message.reply(`🔑 **مفتاح Bacon Bypass API الحالي:**\n\`${currentKey || 'لا يوجد'}\`\n\n📌 **لتحديث المفتاح أرسل:**\n\`-مفتاح <المفتاح_الجديد>\``).catch(() => {});
            }
            setBaconApiKey(newApiKey);
            return message.reply(`✅ **تم تحديث وحفظ مفتاح Bypass API بنجاح!**\n🔑 **المفتاح الجديد:** \`${newApiKey}\``).catch(() => {});
        }

        if (trimmedContent === '-مجاني') {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== OWNER_ID) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص للإداريين فقط!**').catch(() => {});
            }
            db.globalAiFree = true;
            saveDB(db);
            return message.reply('🎉 **تم تحويل الذكاء الاصطناعي إلى نظام مجاني متاح لجميع السيرفرات!**\nيمكن لجميع السيرفرات الآن التفاعل مع الذكاء الاصطناعي بدون قيود.').catch(() => {});
        }
    }

    // AI Conversation Interceptor
    const aiConfig = db[message.guildId]?.ai;
    
    // Only proceed if AI is enabled and active in this guild
    const isAiActive = aiConfig && (aiConfig.status === 'متصل' || aiConfig.enabled === true);
    if (!isAiActive) {
        return;
    }

    const isAdmin = message.member?.permissions.has(PermissionFlagsBits.Administrator);
    const aiRuleTrimmed = message.content.trim();
    if (isAdmin && (aiRuleTrimmed.startsWith('تعلم:') || aiRuleTrimmed.startsWith('قاعدة:'))) {
        let newRule = aiRuleTrimmed.replace(/^(تعلم:|قاعدة:)/, '').trim();
        if (newRule) {
            if (!aiConfig.knowledge) aiConfig.knowledge = [];
            aiConfig.knowledge.push(newRule);
            if (!db[message.guildId]) db[message.guildId] = {};
            db[message.guildId].ai = aiConfig;
            saveDB(db);
            return message.reply(`🧠 **علمت بالملي! تم إضافة قاعدة جديدة لقواعد البيانات الخاصة بي:**\n> *${newRule}*`).catch(() => {});
        }
    }

    const validChannelId = (aiConfig.channelId && /^\d+$/.test(aiConfig.channelId)) ? aiConfig.channelId : null;
    const validCategoryId = (aiConfig.categoryId && /^\d+$/.test(aiConfig.categoryId)) ? aiConfig.categoryId : null;
    const inAIChannel = (validChannelId && message.channelId === validChannelId);
    const inAICategory = (validCategoryId && message.channel.parentId === validCategoryId);
    const isBotMentioned = client.user ? message.mentions.users.has(client.user.id) : false;
    const isInsulted = hasSwearWords(message.content);

    // If specific AI channel or category is configured, AI MUST ONLY respond inside that channel/category!
    if (validChannelId || validCategoryId) {
        if (!inAIChannel && !inAICategory) {
            return;
        }
    } else {
        // If NO channel/category is specified, ONLY respond if explicitly mentioned
        if (!isBotMentioned) {
            return;
        }
    }

    // Check if it's a direct reply to a text message by the bot
    let isReplyToBot = false;
    if (message.reference && message.reference.messageId) {
        try {
            const repliedMsg = await message.channel.messages.fetch(message.reference.messageId).catch(() => null);
            if (repliedMsg && client.user && repliedMsg.author.id === client.user.id) {
                // Ignore replies to embeds, tickets, azkar, suggestions, logs, etc.
                const hasNoEmbeds = !repliedMsg.embeds || repliedMsg.embeds.length === 0;
                if (hasNoEmbeds) {
                    isReplyToBot = true;
                }
            }
        } catch (e) {}
    }

    let shouldRespond = false;
    if (inAIChannel || inAICategory || isBotMentioned || isReplyToBot) {
        shouldRespond = true;
    }
    if (!shouldRespond) return;

    if (shouldRespond) {
            // Trigger typing indicator
            await message.channel.sendTyping().catch(() => {});

            let userPrompt = message.content;
            if (isBotMentioned && client.user) {
                userPrompt = userPrompt.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
            }
            if (!userPrompt || userPrompt.trim().length === 0) {
                userPrompt = "مرحبا";
            }

            // Fetch last 10 messages from the channel for conversation context
            let promptToUse = userPrompt;
            try {
                const recentMessages = await message.channel.messages.fetch({ limit: 10 }).catch(() => null);
                if (recentMessages && recentMessages.size > 0) {
                    const sorted = Array.from(recentMessages.values()).reverse();
                    let historyLines = [];
                    sorted.forEach(m => {
                        if (m.id === message.id) return;
                        if (m.author.bot && client.user && m.author.id !== client.user.id && !m.webhookId) return;
                        const isSelf = (client.user && m.author.id === client.user.id) || m.webhookId;
                        const senderName = isSelf ? "Bot" : m.author.username;
                        const cleanMsg = client.user ? m.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim() : m.content.trim();
                        if (cleanMsg) {
                            historyLines.push(`${senderName}: ${cleanMsg}`);
                        }
                    });
                    if (historyLines.length > 0) {
                        promptToUse = `[محادثة سابقة]:\n${historyLines.join('\n')}\n\n[رسالة ${message.author.username} الأخيرة]:\n${userPrompt}\n\n(أجب مباشرة باختصار وذكاء وبدون أي مقدمات أو تحيات مكررة)`;
                    }
                }
            } catch (err) {
                console.error("Failed to build chat history context:", err);
            }

            try {
                if (!isGuildPremium(message.guildId)) {
                    return message.reply({ content: '❌ **هذه الميزة متاحة فقط للسيرفرات المشتركة في باقة البريميوم!**' });
                }
                const isAdmin = message.member?.permissions.has(PermissionFlagsBits.Administrator);
                const systemPrompt = buildAISystemPrompt(message.guild, aiConfig, isAdmin, isInsulted);
                const rawResponse = await callGeminiAPI(systemPrompt, promptToUse, [], message.guildId);

                let cleanResponse = rawResponse;

                // Parse and strip reactions
                const reactionsToApply = [];
                const reactionRegex = /\[REACT(?:ION)?(?::\s*([^\]]+))?\]/gi;
                let rMatch;
                while ((rMatch = reactionRegex.exec(rawResponse)) !== null) {
                    if (rMatch[1]) reactionsToApply.push(rMatch[1].trim());
                }
                cleanResponse = cleanResponse.replace(/\[REACT(?:ION)?[^\]]*\]/gi, '').trim();

                // Parse and strip actions
                const actions = [];
                const actionRegex = /\[ACTION:\s*([^\]]+)\]/gi;
                let match;
                while ((match = actionRegex.exec(rawResponse)) !== null) {
                    actions.push(match[1].trim());
                }
                cleanResponse = cleanResponse.replace(/\[ACTION[^\]]*\]/gi, '').trim();

                // Strip hallucinated words like "emoji_1234" or [REACT]
                cleanResponse = cleanResponse.replace(/\bemoji_\d+\b/gi, '');

                // Clean up incomplete/broken custom Discord emojis (e.g. <:info:12345 or <:info or <: or <a: or unclosed brackets)
                cleanResponse = cleanResponse.replace(/<a?:\w+(?::\d+)?(?!>)/g, '');
                cleanResponse = cleanResponse.replace(/<a?:\w*$/g, '');
                cleanResponse = cleanResponse.replace(/<a?::\d+>/g, '');
                cleanResponse = cleanResponse.replace(/<:\w+:\s*>/g, '');

                // Filter out custom emojis that don't exist in guild/client cache
                cleanResponse = cleanResponse.replace(/<(a)?:(\w+):(\d+)>/g, (fullMatch, isAnimated, emojiName, emojiId) => {
                    const existsInGuild = message.guild.emojis.cache.has(emojiId);
                    const existsInClient = client.emojis.cache.has(emojiId);
                    return (existsInGuild || existsInClient) ? fullMatch : '';
                });

                if (cleanResponse) {
                    await sendAIResponse(message, cleanResponse, aiConfig);
                }

                // Apply any parsed reactions on the user's message (only 50% of the time to keep it natural and avoid spam)
                if (reactionsToApply.length > 0 && Math.random() < 0.5) {
                    for (const react of reactionsToApply) {
                        try {
                            let emojiToReact = react;
                            if (react.includes(':')) {
                                const idMatch = react.match(/:(\d+)>/);
                                if (idMatch) emojiToReact = idMatch[1];
                            } else {
                                const foundEmoji = message.guild.emojis.cache.find(e => e.name === react || e.id === react);
                                if (foundEmoji) emojiToReact = foundEmoji.id;
                            }
                            await message.react(emojiToReact).catch(() => {});
                        } catch (reactErr) {
                            console.error('Failed to react to message:', reactErr);
                        }
                    }
                }

                // Process actions only if user is Admin
                if (isAdmin) {
                    const findTargetMember = async (guild, query) => {
                        if (!query) return null;
                        const cleanQuery = query.replace(/[<@!>]/g, '').trim();
                        if (/^\d+$/.test(cleanQuery)) {
                            const m = await guild.members.fetch(cleanQuery).catch(() => null);
                            if (m) return m;
                        }
                        return guild.members.cache.find(m => 
                            m.user.username.toLowerCase() === cleanQuery.toLowerCase() ||
                            m.displayName.toLowerCase() === cleanQuery.toLowerCase() ||
                            m.user.tag.toLowerCase() === cleanQuery.toLowerCase()
                        ) || null;
                    };

                    const findTargetRole = (guild, query) => {
                        if (!query) return null;
                        const cleanQuery = query.replace(/[<@&>]/g, '').trim();
                        if (/^\d+$/.test(cleanQuery)) {
                            const r = guild.roles.cache.get(cleanQuery);
                            if (r) return r;
                        }
                        return guild.roles.cache.find(r => 
                            r.name.toLowerCase() === cleanQuery.toLowerCase() ||
                            r.id === cleanQuery
                        ) || null;
                    };

                    for (const action of actions) {
                        try {
                            console.log(`[AI ACTION EXECUTED]: ${action}`);
                            if (action === 'HIDE_CHANNEL' || action === 'LOCK_CHANNEL') {
                                const everyone = message.guild.roles.everyone;
                                await message.channel.permissionOverwrites.edit(everyone, { ViewChannel: false, SendMessages: false }).catch(console.error);
                            } else if (action === 'SHOW_CHANNEL' || action === 'UNLOCK_CHANNEL') {
                                const everyone = message.guild.roles.everyone;
                                await message.channel.permissionOverwrites.edit(everyone, { ViewChannel: true, SendMessages: true }).catch(console.error);
                            } else if (action.startsWith('GIVE_ROLE')) {
                                const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
                                const rMatch = action.match(/role:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/role:\s*(\S+)/);
                                const userQuery = uMatch ? uMatch[1] : null;
                                const roleQuery = rMatch ? rMatch[1] : null;
                                if (userQuery && roleQuery) {
                                    const member = await findTargetMember(message.guild, userQuery);
                                    const role = findTargetRole(message.guild, roleQuery);
                                    if (member && role) {
                                        await member.roles.add(role).catch(console.error);
                                    }
                                }
                            } else if (action.startsWith('REMOVE_ROLE')) {
                                const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
                                const rMatch = action.match(/role:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/role:\s*(\S+)/);
                                const userQuery = uMatch ? uMatch[1] : null;
                                const roleQuery = rMatch ? rMatch[1] : null;
                                if (userQuery && roleQuery) {
                                    const member = await findTargetMember(message.guild, userQuery);
                                    const role = findTargetRole(message.guild, roleQuery);
                                    if (member && role) {
                                        await member.roles.remove(role).catch(console.error);
                                    }
                                }
                            } else if (action.startsWith('CREATE_CHANNEL')) {
                                const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
                                if (nMatch) {
                                    const chName = nMatch[1];
                                    await message.guild.channels.create({ name: chName, type: ChannelType.GuildText }).catch(console.error);
                                }
                            } else if (action.startsWith('DELETE_CHANNEL')) {
                                const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
                                if (nMatch) {
                                    const chIdentifier = nMatch[1];
                                    const targetChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === chIdentifier.toLowerCase() || c.id === chIdentifier);
                                    if (targetChannel) await targetChannel.delete().catch(console.error);
                                }
                            } else if (action.startsWith('CREATE_ROLE')) {
                                const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
                                if (nMatch) {
                                    const rName = nMatch[1];
                                    await message.guild.roles.create({ name: rName }).catch(console.error);
                                }
                            } else if (action.startsWith('DELETE_ROLE')) {
                                const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
                                if (nMatch) {
                                    const rIdentifier = nMatch[1];
                                    const targetRole = findTargetRole(message.guild, rIdentifier);
                                    if (targetRole) await targetRole.delete().catch(console.error);
                                }
                            } else if (action.startsWith('LEARN')) {
                                const ruleMatch = action.match(/rule:\s*["']?([^"']+)["']?/);
                                if (ruleMatch) {
                                    const rule = ruleMatch[1];
                                    if (!aiConfig.knowledge) aiConfig.knowledge = [];
                                    aiConfig.knowledge.push(rule);
                                    db[message.guildId].ai.knowledge = aiConfig.knowledge;
                                    saveDB(db);
                                    console.log(`[AI LEARNING]: Saved new rule: "${rule}"`);
                                }
                            }
                        } catch (actErr) {
                            console.error('Error executing parsed AI action:', actErr);
                        }
                    }
                } else if (actions.length > 0) {
                    console.log(`[AI SECURITY BLOCKED]: Non-admin user tried to trigger actions: ${actions.join(', ')}`);
                }
            } catch (aiErr) {
                console.error('[AI Chat Exception]:', aiErr);
                await message.reply('⚠️ عذراً، واجهت مشكلة في الاتصال بسيرفرات الذكاء الاصطناعي حالياً.').catch(() => {});
            }
            return;
        }

});

client.on('interactionCreate', async interaction => {
    if (isUserBlacklisted(interaction.user.id)) {
        return interaction.reply({ content: '❌ **أنت محظور من استخدام البوت!**', ephemeral: true }).catch(() => {});
    }
    const isTranscriptRelated = interaction.customId && interaction.customId.startsWith('view_transcript_');
    const isTradeRelated = interaction.customId && interaction.customId.startsWith('trade_');
    const isDeltaRelated = (interaction.isChatInputCommand() && (interaction.commandName === 'bypass' || interaction.commandName === 'delta' || interaction.commandName === 'hypesquad')) || 
                           (interaction.customId && (interaction.customId === 'toggle_bypass_btn' || interaction.customId.startsWith('bypass_') || interaction.customId.startsWith('modal_bypass_') || interaction.customId.startsWith('copy_bypass_') || interaction.customId === 'supported_sites_btn' || interaction.customId.startsWith('supported_sites_') || interaction.customId === 'error_translation_btn'));

    // Check if bot is present in the guild (if guildId is present)
    const botInGuild = interaction.guildId ? interaction.client.guilds.cache.has(interaction.guildId) : false;

    if (interaction.guildId) {
        if (!botInGuild && !isDeltaRelated) {
            return interaction.reply({
                content: '❌ **البوت غير متواجد في هذا السيرفر!** يرجى دعوة البوت أولاً للتمكن من استخدام ميزاته وأوامره.',
                ephemeral: true
            });
        }
    } else {
        // No guildId (e.g. DM or user-installed outside guild)
        if (!isDeltaRelated && !isTranscriptRelated && !isTradeRelated) {
            return interaction.reply({
                content: '❌ **لا يمكن استخدام هذا الأمر هنا!** هذا الأمر يتطلب وجود البوت في سيرفر ديسكورد.',
                ephemeral: true
            });
        }
    }

    if (interaction.guildId && botInGuild) {
        ensureGuildData(interaction.guildId);
    }
    const db = getDB();

    // Handle Exemption (Untimeout) Button Click from Timeout Message
    if (interaction.isButton() && interaction.customId && interaction.customId.startsWith('untimeout_')) {
        const parts = interaction.customId.split('_');
        const targetId = parts[1];
        const moderatorId = parts[2];

        // الزر للمشرف الذي أعطى الإسكات فقط
        if (interaction.user.id !== moderatorId) {
            return interaction.reply({
                content: `❌ **عذراً! لا يمكن الضغط على هذا الزر إلا من قبل المشرف الذي قام بالإسكات (<@${moderatorId}>).**`,
                ephemeral: true
            }).catch(() => {});
        }

        try {
            const targetMember = await interaction.guild.members.fetch(targetId).catch(() => null);
            if (targetMember) {
                await targetMember.timeout(null, `تم الإعفاء بواسطة ${interaction.user.tag}`).catch(() => {});
            }

            await interaction.update(buildExemptedPayload(targetId, interaction.user.username));
        } catch (err) {
            console.error('[Untimeout Button Error]:', err);
            interaction.reply({ content: `❌ حدث خطأ أثناء إعفاء العضو: ${err.message}`, ephemeral: true }).catch(() => {});
        }
        return;
    }

    // Helper to check for admin-only button/menu/modal interactions
    const checkIsAdminInteraction = (inter) => {
        const customId = inter.customId;
        if (!customId) return false;
        
        if (customId.startsWith('copy_bypass_') || customId === 'supported_sites_btn' || customId.startsWith('supported_sites_') || customId === 'error_translation_btn') {
            return false;
        }
        if (customId === 'publish_suggestion_prompt_btn' || customId === 'submit_suggestion_modal') {
            return false;
        }
        if (customId.startsWith('open_ticket_') || 
            customId.startsWith('ticket_panel_btn_') ||
            customId.startsWith('ticket_panel_select_') ||
            customId.startsWith('claim_') || 
            customId.startsWith('reclaim_') || 
            customId.startsWith('delete_req_') || 
            customId.startsWith('del_confirm_') || 
            customId === 'del_cancel' ||
            customId.startsWith('rename_modal_') ||
            customId.startsWith('ticket_mgmt_') ||
            customId.startsWith('view_transcript_') ||
            customId.startsWith('ticket_actions_') ||
            customId.startsWith('add_member_to_') ||
            customId.startsWith('remove_member_from_')) {
            return false;
        }
        if (customId.startsWith('music_pause_') || customId.startsWith('music_next_') || customId.startsWith('music_prev_')) {
            return false;
        }
        return customId === 'main_setup_menu' ||
               customId === 'select_panel_to_edit' ||
               customId === 'select_panel_to_delete' ||
               customId === 'modal_create_panel_init' ||
               customId.startsWith('ai_') ||
               customId.startsWith('ticket_ai_') ||
               customId.startsWith('panel_ai_') ||
               customId.startsWith('edit_panel_') ||
               customId.startsWith('set_display_') ||
               customId.startsWith('edit_texts_') ||
               customId.startsWith('edit_roles_') ||
               customId.startsWith('edit_images_') ||
               customId.startsWith('set_img_type_') ||
               customId.startsWith('save_img_src_') ||
               customId.startsWith('edit_buttons_') ||
               customId.startsWith('btn_opt_') ||
               customId.startsWith('btn_emoji_choice_') ||
               customId.startsWith('select_btn_') ||
               customId.startsWith('send_panel_') ||
               customId.startsWith('modal_panel_') ||
               customId.startsWith('modal_edit_texts_') ||
               customId.startsWith('modal_add_btn_name_') ||
               customId.startsWith('protect_') ||
               customId.startsWith('set_punishment_') ||
               customId.startsWith('modal_timeout_duration_') ||
               customId === 'select_violation_detailed';
    };

    // Block non-admins from admin interactions (Buttons, select menus, modal submits)
    if (checkIsAdminInteraction(interaction)) {
        if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ هذه الإجراءات مخصصة للمسؤولين فقط (Administrator).', ephemeral: true });
        }
    }

    // نظام منع العبث بالأزرار عشوائياً (Throttling / Interaction Cooldown)
    const customIdForProtect = interaction.customId || '';
    const isProtect = customIdForProtect.startsWith('protect_') || 
                      customIdForProtect.startsWith('set_punishment_') || 
                      customIdForProtect.startsWith('modal_timeout_duration_') || 
                      customIdForProtect === 'select_violation_detailed';

    if (interaction.isButton() && interaction.customId === 'error_translation_btn') {
        const arText = 
`الطريقة الأولى (الأساسية):
 * انسخ رابط المفتاح وافتحه في Google.
 * انتظر 5 ثوانٍ ثم اضغط Continue.
 * سجل الدخول عبر Google.
 * ارجع للبوت واستخدم نفس رابط المفتاح.
الطريقة الثانية (إذا لم ينجح التخطي):
 * كرر نفس الخطوات، وبعد تسجيل الدخول بـ Google وتحويلك لموقع المهام:
 * اضغط النقاط الثلاث (أعلى اليسار) واضغط نسخ الرابط.
 * ارجع للبوت واستخدم الرابط الجديد الذي نسخته.`;

        return await interaction.reply({
            content: arText,
            ephemeral: true
        }).catch(() => {});
    }

    if (interaction.isButton() && interaction.customId.startsWith('copy_bypass_')) {
        const keyId = interaction.customId.replace('copy_bypass_', '');
        let key = bypassKeysCache.get(keyId);

        if (!key && interaction.message) {
            const rawContent = JSON.stringify(interaction.message.components || '') + ' ' + (interaction.message.content || '');
            const match = rawContent.match(/`([^`\n]+)`/);
            if (match) key = match[1];
        }

        if (!key) {
            return await interaction.reply({
                content: '❌ **تعذر نسخ المفتاح، يرجى إعادة تخطي الرابط.**',
                ephemeral: true
            }).catch(() => {});
        }

        return await interaction.reply({
            content: key,
            ephemeral: true
        }).catch(() => {});
    }

    if (interaction.isButton() && (interaction.customId === 'supported_sites_btn' || interaction.customId.startsWith('supported_sites_'))) {
        const modal = new ModalBuilder()
            .setCustomId('supported_sites_modal')
            .setTitle('خدمات الروابط المدعومة 💻');

        const keySystemsInput = new TextInputBuilder()
            .setCustomId('key_systems_input')
            .setLabel('نظام المفاتيح')
            .setStyle(TextInputStyle.Paragraph)
            .setValue('auth.platorelay.com')
            .setRequired(false);

        const adsInput = new TextInputBuilder()
            .setCustomId('ads_input')
            .setLabel('رابط إعلاني')
            .setStyle(TextInputStyle.Paragraph)
            .setValue(
`linkvertise.com
lootlabs.gg (loot-link.com)
lockr.net (lockr.so)
boostellar (bstlar.com)
rekonise.com
linkunlocker.com
link4Sub.com
linkify.im (go.linkify.ru)
sub4unlock.io
mboost.me
bstshrt.com
shrink.pe (lnbz.la)
fly.inc`
            )
            .setRequired(false);

        const pasteInput = new TextInputBuilder()
            .setCustomId('paste_input')
            .setLabel('لصق')
            .setStyle(TextInputStyle.Paragraph)
            .setValue(
`pastebin.com
paste-drop.com
pastefy.app
rentry.co
paster.so
pastelua.com`
            )
            .setRequired(false);

        modal.addComponents(
            new ActionRowBuilder().addComponents(keySystemsInput),
            new ActionRowBuilder().addComponents(adsInput),
            new ActionRowBuilder().addComponents(pasteInput)
        );

        return await interaction.showModal(modal).catch(async () => {
            const fallbackList = 
`**خدمات الروابط المدعومة 💻**
**نظام المفاتيح:**
auth.platorelay.com

**رابط إعلاني:**
linkvertise.com, lootlabs.gg, lockr.net, boostellar, rekonise.com, linkunlocker.com, link4Sub.com, linkify.im, sub4unlock.io, mboost.me, bstshrt.com, shrink.pe, fly.inc

**لصق:**
pastebin.com, paste-drop.com, pastefy.app, rentry.co, paster.so, pastelua.com`;

            await interaction.reply({ content: fallbackList, ephemeral: true }).catch(() => {});
        });
    }

    if (interaction.isModalSubmit() && interaction.customId === 'supported_sites_modal') {
        return await interaction.deferUpdate().catch(() => {});
    }

    if (interaction.isButton() && interaction.customId.startsWith('trade_offer_')) {
        const parts = interaction.customId.split('_');
        const traderId = parts[2];
        const messageId = parts[3];

        if (interaction.user.id === traderId) {
            return await interaction.reply({ content: '❌ **لا يمكنك تقديم عرض لنفسك!**', ephemeral: true });
        }

        ensureGuildData(interaction.guildId);
        const db = getDB();
        if (!db[interaction.guildId].tradeOffers) db[interaction.guildId].tradeOffers = {};
        if (db[interaction.guildId].tradeOffers[messageId] && db[interaction.guildId].tradeOffers[messageId].includes(interaction.user.id)) {
            return await interaction.reply({ content: '❌ **لقد قمت بتقديم عرض لهذا المنشور مسبقاً!** لا يمكنك تقديم أكثر من عرض واحد لنفس المنشور.', ephemeral: true });
        }

        const modal = new ModalBuilder()
            .setCustomId(`trade_modal_${traderId}_${messageId}`)
            .setTitle('تقديم عرض تبادل');

        const offerInput = new TextInputBuilder()
            .setCustomId('trade_offer_content')
            .setLabel('اكتب عرضك هنا (بدون روابط)')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(1000);

        modal.addComponents(new ActionRowBuilder().addComponents(offerInput));
        return await interaction.showModal(modal);
    }

    if (interaction.isButton() && interaction.customId.startsWith('hs_')) {
        await interaction.deferReply({ ephemeral: true });
        const token = client.hypesquadTokens?.get(interaction.user.id);
        if (!token) {
            return await interaction.editReply({ content: '❌ انتهت صلاحية الجلسة أو لم تقم بإدخال التوكن. أعد استخدام أمر `/hypesquad`.' });
        }

        const action = interaction.customId;
        const logChannelId = '1522399039151407146';
        const logChannel = client.channels.cache.get(logChannelId) || await client.channels.fetch(logChannelId).catch(() => null);

        if (action === 'hs_remove') {
            try {
                const res = await axios.delete(
                    'https://discord.com/api/v9/hypesquad/online',
                    {
                        headers: {
                            'Authorization': token,
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    }
                );
                if (res.status === 204 || res.status === 200) {
                    if (logChannel) {
                        await logChannel.send({
                            content: `👤 **مستخدم:** <@${interaction.user.id}> (${interaction.user.tag})\n❌ **العملية:** إزالة شارة HypeSquad\n⏰ **الوقت:** <t:${Math.floor(Date.now() / 1000)}:R>`
                        }).catch(() => {});
                    }
                    return await interaction.editReply({ content: '✅ **تم إزالة شارة HypeSquad بنجاح!**' });
                }
            } catch (e) {
                if (e.response) {
                    let msg = `❌ فشل الطلب: ${e.response.status}`;
                    if (e.response.status === 401) msg = '❌ التوكن غير صالح (Invalid token)';
                    if (e.response.status === 429) msg = '❌ تم حظرك مؤقتاً بسبب كثرة الطلبات (Rate limited)';
                    return await interaction.editReply({ content: msg });
                } else {
                    return await interaction.editReply({ content: `❌ حدث خطأ: ${e.message}` });
                }
            }
        } else {
            const houseMap = {
                'hs_1': { id: 1, name: 'Bravery', emoji: '<:Bravery:1553466984862326936>' },
                'hs_2': { id: 2, name: 'Brilliance', emoji: '<:Brilliance:155346990046216262>' },
                'hs_3': { id: 3, name: 'Balance', emoji: '<:Balance:1553466987349545101>' }
            };
            const houseInfo = houseMap[action];
            if (!houseInfo) return await interaction.editReply({ content: '❌ اختيار غير معروف.' });

            try {
                const res = await axios.post(
                    'https://discord.com/api/v9/hypesquad/online',
                    { house_id: houseInfo.id },
                    {
                        headers: {
                            'Authorization': token,
                            'Content-Type': 'application/json',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        }
                    }
                );
                if (res.status === 204 || res.status === 200) {
                    if (logChannel) {
                        await logChannel.send({
                            content: `👤 **مستخدم:** <@${interaction.user.id}> (${interaction.user.tag})\n🛡️ **العملية:** تفعيل بيت ${houseInfo.emoji} **${houseInfo.name}**\n⏰ **الوقت:** <t:${Math.floor(Date.now() / 1000)}:R>`
                        }).catch(() => {});
                    }
                    return await interaction.editReply({ content: `✅ ${houseInfo.emoji} **تم تفعيل بيت ${houseInfo.name} بنجاح!**` });
                }
            } catch (e) {
                if (e.response) {
                    let msg = `❌ فشل الطلب: ${e.response.status}`;
                    if (e.response.status === 401) msg = '❌ التوكن غير صالح (Invalid token)';
                    if (e.response.status === 429) msg = '❌ تم حظرك مؤقتاً بسبب كثرة الطلبات (Rate limited)';
                    return await interaction.editReply({ content: msg });
                } else {
                    return await interaction.editReply({ content: `❌ حدث خطأ: ${e.message}` });
                }
            }
        }
    }

    if (interaction.isButton() && (interaction.customId.startsWith('trade_accept_') || interaction.customId.startsWith('trade_reject_'))) {
        const isAccept = interaction.customId.includes('accept');
        const offererId = interaction.customId.split('_')[2];
        const traderId = interaction.user.id;

        const embed = EmbedBuilder.from(interaction.message.embeds[0]);
        embed.setColor(isAccept ? '#2ecc71' : '#e74c3c');
        
        const offerer = await client.users.fetch(offererId).catch(() => null);
        if (isAccept) {
            await interaction.update({ content: `✅ **تم قبول العرض! يمكنك التواصل مع <@${offererId}> الآن.**`, embeds: [embed], components: [] });
            if (offerer) {
                await offerer.send({ content: `✅ **لقد قبل <@${traderId}> عرضك في سيرفر ${interaction.guild?.name || 'Discord'}! يمكنك التواصل معه الآن.**` }).catch(() => {});
            }
        } else {
            await interaction.update({ content: `❌ **تم رفض العرض.**`, embeds: [embed], components: [] });
            if (offerer) {
                await offerer.send({ content: `❌ **للأسف، تم رفض عرضك من قبل <@${traderId}> في سيرفر ${interaction.guild?.name || 'Discord'}.**` }).catch(() => {});
            }
        }
        return;
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('trade_modal_')) {
        const parts = interaction.customId.split('_');
        const traderId = parts[2];
        const messageId = parts[3];
        const offerContent = interaction.fields.getTextInputValue('trade_offer_content');

        const linkRegex = /https?:\/\/\S+|discord\.gg\/\S+|gg\.\/\S+|bit\.ly\/\S+/i;
        if (linkRegex.test(offerContent)) {
            return await interaction.reply({ content: '❌ **ممنوع إرسال روابط في العرض!**', ephemeral: true });
        }

        const trader = await client.users.fetch(traderId).catch(() => null);
        if (trader) {
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`trade_accept_${interaction.user.id}`)
                    .setLabel('قبول')
                    .setEmoji('1516534090751279257')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`trade_reject_${interaction.user.id}`)
                    .setLabel('رفض')
                    .setEmoji('1516534087161221233')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setLabel('التواصل مع الشخص').setStyle(ButtonStyle.Link).setURL(`https://discord.com/users/${interaction.user.id}`)
            );

            const tradeEmbed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle('<:Bell:1543621714540372050> عرض جديد')
                .setDescription(`-# ~~                                                                                                                                                                   ~~\n\n**الشخص <:PErson:1516382944510607511>: <@${interaction.user.id}>**\n-# ~~                                                                                                                                                                   ~~\n**العرض <:Boxs:1543624050322964500>:\n${offerContent}**`);

            await trader.send({
                embeds: [tradeEmbed],
                components: [row]
            }).catch(async () => {
                return await interaction.reply({ content: '❌ **فشل إرسال العرض للشخص (ربما الخاص مغلق لديه).**', ephemeral: true });
            });

            // Track offer to prevent duplicates
            ensureGuildData(interaction.guildId);
            const db = getDB();
            if (!db[interaction.guildId].tradeOffers) db[interaction.guildId].tradeOffers = {};
            if (!db[interaction.guildId].tradeOffers[messageId]) db[interaction.guildId].tradeOffers[messageId] = [];
            db[interaction.guildId].tradeOffers[messageId].push(interaction.user.id);
            saveDB(db);

            if (db[interaction.guildId]?.trade?.logChannelId) {
                const logCh = interaction.guild.channels.cache.get(db[interaction.guildId].trade.logChannelId);
                if (logCh) {
                    const logEmbed = new EmbedBuilder()
                        .setColor('#2b2d31')
                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        .setTitle('تقديم عرض جديد')
                        .setDescription(`**من:** <@${interaction.user.id}>\n**إلى:** <@${traderId}>\n**العرض:**\n${offerContent}`)
                        .setTimestamp();
                    await logCh.send({ embeds: [logEmbed] });
                }
            }

            return await interaction.reply({ content: '✅ **تم إرسال عرضك بنجاح! بانتظار الرد من الشخص.**', ephemeral: true });
        } else {
            return await interaction.reply({ content: '❌ **لم نتمكن من العثور على صاحب التبادل.**', ephemeral: true });
        }
    }

    if (interaction.isButton() || interaction.isStringSelectMenu()) {

        // تطبيق ليميت وتباطؤ في الرد لحماية البوت من التعطل
        const now = Date.now();
        const cooldownTime = 1500; // ثانيتان كحد أقصى بين الضغطات المتتالية
        const userCooldown = interactionCooldowns.get(interaction.user.id);
        if (userCooldown && (now - userCooldown < cooldownTime)) {
            return interaction.reply({
                content: '⚠️ **يرجى عدم العبث بالبوت والضغط على الأزرار بشكل متكرر وسريع!** تم إبطاء الاستجابة لحماية النظام من التشنج والتعطل.',
                ephemeral: true
            });
        }
        interactionCooldowns.set(interaction.user.id, now);
    }

    if (interaction.isButton() && interaction.customId.startsWith('translation_btn:')) {
        const embedId = interaction.customId.split(':')[1];
        const db = getDB();
        if (!db.translations || !db.translations[embedId]) {
            return interaction.reply({ content: '❌ **عذراً، لم يتم العثور على بيانات الترجمة لهذا المنشور.**', ephemeral: true }).catch(() => {});
        }

        const data = db.translations[embedId];
        const trans = data.en || data.ar;

        try {
            const embed = new EmbedBuilder()
                .setTitle(trans.title || 'Translation')
                .setDescription(trans.desc || 'No translation provided.')
                .setColor(0x5865f2)
                .setFooter({ text: '🌐 Translated Embed • إيمبد مترجم' });
            
            if (data.img && data.img.startsWith('http')) {
                embed.setImage(data.img);
            }

            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (err) {
            console.error('[Translation Ephemeral Reply Error]:', err);
            interaction.reply({ content: '❌ **فشل عرض الترجمة حالياً.**', ephemeral: true }).catch(() => {});
        }
        return;
    }

    if (interaction.isButton() && (interaction.customId.startsWith('custom_embed_btn_') || interaction.customId.startsWith('custom_embed_btn:'))) {
        let embedId = '';
        let btnIdx = 0;
        if (interaction.customId.startsWith('custom_embed_btn:')) {
            const parts = interaction.customId.split(':');
            embedId = parts[1];
            btnIdx = parseInt(parts[2], 10);
        } else {
            const rest = interaction.customId.substring('custom_embed_btn_'.length);
            const lastUnderscore = rest.lastIndexOf('_');
            if (lastUnderscore !== -1) {
                embedId = rest.substring(0, lastUnderscore);
                btnIdx = parseInt(rest.substring(lastUnderscore + 1), 10);
            } else {
                btnIdx = parseInt(rest, 10);
            }
        }

        const localDb = getDB();
        const customEmbeds = localDb[interaction.guildId]?.customEmbeds || {};
        let targetEmbed = customEmbeds[embedId];
        if (!targetEmbed) {
            targetEmbed = Object.values(customEmbeds).find(e => e.id === embedId || String(e.id) === String(embedId));
        }

        if (targetEmbed && targetEmbed.buttons && targetEmbed.buttons[btnIdx]) {
            const btnConfig = targetEmbed.buttons[btnIdx];
            if (btnConfig.action === 'give_role' && btnConfig.roleId) {
                const role = interaction.guild?.roles.cache.get(btnConfig.roleId);
                if (!role) {
                    return interaction.reply({ content: '❌ الرتبة المحددة لهذا الزر غير موجودة بالسيرفر.', ephemeral: true });
                }
                if (interaction.member.roles.cache.has(btnConfig.roleId)) {
                    await interaction.member.roles.remove(btnConfig.roleId).catch(() => {});
                    return interaction.reply({ content: `➖ تم إزالة رتبة **${role.name}** منك بنجاح!`, ephemeral: true });
                } else {
                    await interaction.member.roles.add(btnConfig.roleId).catch(() => {});
                    return interaction.reply({ content: `✅ تم منحك رتبة **${role.name}** بنجاح! 🎉`, ephemeral: true });
                }
            } else if (btnConfig.action === 'reply_text' || btnConfig.replyMessage) {
                return interaction.reply({ content: btnConfig.replyMessage || 'أهلاً بك! تم النقر على الزر بنجاح.', ephemeral: true });
            }
        }
        return interaction.reply({ content: '✅ تم النقر على الزر بنجاح.', ephemeral: true });
    }

    if (interaction.isChatInputCommand()) {
        // --- Moderation Slash Commands Handlers ---
        const modSlashCmds = ['lock', 'unlock', 'ban', 'unban', 'timeout', 'untimeout', 'hide', 'unhide', 'message'];
        if (modSlashCmds.includes(interaction.commandName)) {
            const cmdKey = interaction.commandName;
            const modConfig = db[interaction.guildId]?.moderation?.commands?.[cmdKey];

            let allowed = true;
            let rejectMsg = '';

            if (modConfig) {
                if (modConfig.enabled === false) {
                    allowed = false;
                    rejectMsg = '❌ هذا الأمر معطل حالياً في إعدادات السيرفر.';
                } else if (modConfig.deniedRoles && modConfig.deniedRoles.length > 0 && interaction.member?.roles?.cache) {
                    if (modConfig.deniedRoles.some(rId => interaction.member.roles.cache.has(rId))) {
                        allowed = false;
                        rejectMsg = '❌ رتبتك ممنوعة من استخدام هذا الأمر.';
                    }
                }
                
                if (allowed && modConfig.allowedRoles && modConfig.allowedRoles.length > 0 && interaction.member?.roles?.cache) {
                    if (!modConfig.allowedRoles.some(rId => interaction.member.roles.cache.has(rId)) && !interaction.member.permissions?.has(PermissionFlagsBits.Administrator)) {
                        allowed = false;
                        rejectMsg = '❌ ليس لديك الرتبة المصرح لها باستخدام هذا الأمر.';
                    }
                }
            }

            if (allowed && (!modConfig?.allowedRoles || modConfig.allowedRoles.length === 0)) {
                if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                    if (cmdKey === 'ban' || cmdKey === 'unban') {
                        if (!interaction.member?.permissions?.has(PermissionFlagsBits.BanMembers)) {
                            allowed = false;
                            rejectMsg = '❌ تحتاج لصلاحية حظر الأعضاء (Ban Members) لاستخدام هذا الأمر.';
                        }
                    } else if (cmdKey === 'timeout' || cmdKey === 'untimeout') {
                        if (!interaction.member?.permissions?.has(PermissionFlagsBits.ModerateMembers)) {
                            allowed = false;
                            rejectMsg = '❌ تحتاج لصلاحية إدارة الأعضاء (Moderate Members) لاستخدام هذا الأمر.';
                        }
                    } else if (cmdKey === 'lock' || cmdKey === 'unlock' || cmdKey === 'hide' || cmdKey === 'unhide') {
                        if (!interaction.member?.permissions?.has(PermissionFlagsBits.ManageChannels)) {
                            allowed = false;
                            rejectMsg = '❌ تحتاج لصلاحية إدارة القنوات (Manage Channels) لاستخدام هذا الأمر.';
                        }
                    } else if (cmdKey === 'message') {
                        if (!interaction.member?.permissions?.has(PermissionFlagsBits.ManageMessages)) {
                            allowed = false;
                            rejectMsg = '❌ تحتاج لصلاحية إدارة الرسائل (Manage Messages) لاستخدام هذا الأمر.';
                        }
                    }
                }
            }

            if (!allowed) {
                return interaction.reply({ content: rejectMsg || '❌ ليس لديك الصلاحية لاستخدام هذا الأمر.', ephemeral: true });
            }

            // Command Implementations
            if (cmdKey === 'lock') {
                const targetChannel = interaction.options.getChannel('channel') || interaction.channel;
                try {
                    await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        SendMessages: false
                    }, { reason: `قفل الروم بواسطة ${interaction.user.tag}` });

                    const lockEmbed = new EmbedBuilder()
                        .setColor('#f59e0b')
                        .setDescription(`🔒 — **تم قفل الروم بنجاح <#${targetChannel.id}>**`);

                    return interaction.reply({ embeds: [lockEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل قفل الروم: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'unlock') {
                const targetChannel = interaction.options.getChannel('channel') || interaction.channel;
                try {
                    await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        SendMessages: null
                    }, { reason: `فتح الروم بواسطة ${interaction.user.tag}` });

                    const unlockEmbed = new EmbedBuilder()
                        .setColor('#10b981')
                        .setDescription(`🔓 — **تم فتح الروم بنجاح <#${targetChannel.id}>**`);

                    return interaction.reply({ embeds: [unlockEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل فتح الروم: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'ban') {
                const targetUser = interaction.options.getUser('user');
                const reason = interaction.options.getString('reason') || 'مخالفة القوانين';
                try {
                    await interaction.guild.members.ban(targetUser.id, { reason: `${reason} | بواسطة ${interaction.user.tag}` });
                    const bar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                    const banEmbed = new EmbedBuilder()
                        .setColor('#ef4444')
                        .setDescription(`<:Bann:1556246670671609887> — **تم حظر الـ<@${targetUser.id}> من السيرفر**\n${bar}\n**السبب:** ${reason}`);

                    return interaction.reply({ embeds: [banEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل حظر العضو: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'unban') {
                const targetId = interaction.options.getString('user_id').replace(/[<@!>]/g, '').trim();
                try {
                    await interaction.guild.bans.remove(targetId, `إلغاء حظر بواسطة ${interaction.user.tag}`);
                    const unbanEmbed = new EmbedBuilder()
                        .setColor('#10b981')
                        .setDescription(`<:Bann:1556246670671609887> — **تم إلغاء حظر الـ<@${targetId}> بواسطة \`${interaction.user.username}\`**`);

                    return interaction.reply({ embeds: [unbanEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل إلغاء الحظر: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'timeout') {
                const targetUser = interaction.options.getUser('user');
                const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
                if (!targetMember) return interaction.reply({ content: '❌ العضو غير متواجد بالسيرفر.', ephemeral: true });

                const durationStr = interaction.options.getString('duration') || '10m';
                const reason = interaction.options.getString('reason') || 'إسكات مؤقت بواسطة المشرف';

                let durationMs = 10 * 60 * 1000;
                const match = durationStr.match(/^(\d+)([smhdw])$/i);
                if (match) {
                    const count = parseInt(match[1]);
                    const unit = match[2].toLowerCase();
                    if (unit === 's') durationMs = count * 1000;
                    else if (unit === 'm') durationMs = count * 60 * 1000;
                    else if (unit === 'h') durationMs = count * 60 * 60 * 1000;
                    else if (unit === 'd') durationMs = count * 24 * 60 * 60 * 1000;
                    else if (unit === 'w') durationMs = count * 7 * 24 * 60 * 60 * 1000;
                }

                try {
                    await targetMember.timeout(durationMs, `${reason} | بواسطة ${interaction.user.tag}`);
                    const endTimestamp = Math.floor((Date.now() + durationMs) / 1000);
                    const bar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬';
                    const timeoutEmbed = new EmbedBuilder()
                        .setColor('#2b2d31')
                        .setDescription(`<:time:1525620369879339168> — **تم إسكات الـ<@${targetMember.id}> لمدة <t:${endTimestamp}:R>**\n${bar}`);

                    const exemptionBtn = new ButtonBuilder()
                        .setCustomId(`untimeout_${targetMember.id}_${interaction.user.id}`)
                        .setLabel('إعفاء الشخص')
                        .setEmoji('1556254572333506660')
                        .setStyle(ButtonStyle.Secondary);

                    const row = new ActionRowBuilder().addComponents(exemptionBtn);

                    return interaction.reply({ embeds: [timeoutEmbed], components: [row] });
                } catch (timeoutErr) {
                    return interaction.reply({ content: `❌ فشل تطبيق الإسكات: ${timeoutErr.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'untimeout') {
                const targetUser = interaction.options.getUser('user');
                const targetMember = await interaction.guild.members.fetch(targetUser.id).catch(() => null);
                if (!targetMember) return interaction.reply({ content: '❌ العضو غير متواجد بالسيرفر.', ephemeral: true });

                try {
                    await targetMember.timeout(null, `إلغاء الإسكات بواسطة ${interaction.user.tag}`);
                    const untimeoutEmbed = new EmbedBuilder()
                        .setColor('#10b981')
                        .setDescription(`<:time:1525620369879339168> — **تم إلغاء إسكات الـ<@${targetMember.id}> بواسطة \`${interaction.user.username}\`**`);

                    return interaction.reply({ embeds: [untimeoutEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل إلغاء الإسكات: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'hide') {
                const targetChannel = interaction.options.getChannel('channel') || interaction.channel;
                try {
                    await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        ViewChannel: false
                    }, { reason: `إخفاء الروم بواسطة ${interaction.user.tag}` });

                    const hideEmbed = new EmbedBuilder()
                        .setColor('#8b5cf6')
                        .setDescription(`👁️‍🗨️ — **تم إخفاء الروم بنجاح <#${targetChannel.id}>**`);

                    return interaction.reply({ embeds: [hideEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل إخفاء الروم: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'unhide') {
                const targetChannel = interaction.options.getChannel('channel') || interaction.channel;
                try {
                    await targetChannel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        ViewChannel: null
                    }, { reason: `إظهار الروم بواسطة ${interaction.user.tag}` });

                    const unhideEmbed = new EmbedBuilder()
                        .setColor('#10b981')
                        .setDescription(`👁️ — **تم إظهار الروم بنجاح <#${targetChannel.id}>**`);

                    return interaction.reply({ embeds: [unhideEmbed] });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل إظهار الروم: ${err.message}`, ephemeral: true });
                }
            }

            if (cmdKey === 'message') {
                const targetChannel = interaction.options.getChannel('channel') || interaction.channel;
                const msgText = interaction.options.getString('text');

                try {
                    await targetChannel.send({ content: msgText });
                    return interaction.reply({ content: `✅ تم إرسال الرسالة بنجاح في <#${targetChannel.id}>!`, ephemeral: true });
                } catch (err) {
                    return interaction.reply({ content: `❌ فشل إرسال الرسالة: ${err.message}`, ephemeral: true });
                }
            }
        }

        // Enforce Administrator check for admin slash commands
        const adminCommands = ['setup_ticket', 'setup_suggestion', 'protection', 'ai', 'key', 'video', 'script', 'setup_obfuscation'];
        if (adminCommands.includes(interaction.commandName)) {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: '❌ هذا الأمر مخصص للمسؤولين فقط (Administrator).', ephemeral: true });
            }
        }
        // ===== أوامر السلاش: كل أمر في ملف مستقل داخل مجلد commands/ =====
        {
            const __cmd = commands.get(interaction.commandName);
            if (__cmd) {
                return await __cmd.execute(interaction, {
                    get ContainerBuilder() { return ContainerBuilder; },
                    get client() { return client; },
                    get db() { return db; },
                    get ensureGuildData() { return ensureGuildData; },
                    get getDB() { return getDB; },
                    get getProtectionEmbedAndComponents() { return getProtectionEmbedAndComponents; },
                    get handleLiraCommand() { return handleLiraCommand; },
                    get isGuildPremium() { return isGuildPremium; },
                    get saveDB() { return saveDB; }
                });
            }
        }

        if (interaction.commandName === 'bypass' || interaction.commandName === 'delta') {
            const deltaLink = interaction.options.getString('link');
            const botInGuild = interaction.guildId ? interaction.client.guilds.cache.has(interaction.guildId) : false;

            if (botInGuild) {
                if (!db[interaction.guildId]) db[interaction.guildId] = {};
                const keyConfig = db[interaction.guildId].deltaKeys;

                if (keyConfig && keyConfig.enabled === false) {
                    return interaction.reply({ content: '❌ **عذراً، نظام المفاتيح معطل في هذا السيرفر. يمكنك تفعيله باستخدام أمر `/key on`.**', ephemeral: true });
                }

                if (keyConfig && keyConfig.enabled && keyConfig.channelId && interaction.channelId !== keyConfig.channelId) {
                    return interaction.reply({ content: `❌ **عذراً، يرجى استخدام هذا الأمر فقط في الروم المخصص: <#${keyConfig.channelId}>**`, ephemeral: true });
                }
            }

            if (activeBypassUsers.has(interaction.user.id)) {
                return interaction.reply({ content: '❌ **يرجى الانتظار لحين الانتهاء من رابطك الأول قبل إرسال رابط جديد!**', ephemeral: true });
            }

            activeBypassUsers.add(interaction.user.id);

            const loadingContainer = new ContainerBuilder()
                .setAccentColor(0x2b2d31)
                .addTextDisplayComponents((textDisplay) =>
                    textDisplay.setContent(
                        `# Extracting your key <a:Reset:1516390093504385074>`
                    )
                );

            try {
                await interaction.reply({
                    components: [loadingContainer.toJSON()],
                    flags: [MessageFlags.IsComponentsV2]
                });
            } catch (replyErr) {
                console.warn('[Bypass initial reply fallback]:', replyErr.message);
                await interaction.reply({
                    content: '# Extracting your key <a:Reset:1516390093504385074>'
                }).catch(() => {});
            }

            const startTime = performance.now();
            try {
                const { bypassedLink, error, isUnsupported, isPlatoRelay, isGoogleAuthError } = await bypassDeltaLink(deltaLink, interaction.user);
                const timeTaken = getDynamicBypassTime(startTime);

                if (isGoogleAuthError || isPlatoRelay) {
                    activeBypassUsers.delete(interaction.user.id);
                    const { container, row, description } = buildLoginErrorContainer();

                    await interaction.editReply({
                        components: [container.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch(async () => {
                        await interaction.editReply({
                            content: `### <:No:1516534087161221233> Need to login\n${description}`,
                            components: [row]
                        }).catch(() => {});
                    });
                    return;
                }

                if (isUnsupported) {
                    activeBypassUsers.delete(interaction.user.id);
                    const shortUrl = deltaLink.length > 30 ? deltaLink.slice(0, 30) + '...' : deltaLink;
                    const container = new ContainerBuilder()
                        .setAccentColor(0xff4d4d) // Red
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `### رابط غير مدعوم <:No:1516534087161221233>\n` +
                                `Unsupported link "${shortUrl}"\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                            )
                        )
                        .addActionRowComponents((actionRow) =>
                            actionRow.setComponents(
                                new ButtonBuilder()
                                    .setLabel('Support Server')
                                    .setEmoji('1511327391669026916')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL('https://discord.gg/hBvzFrqQP2')
                            )
                        );

                    return interaction.editReply({
                        components: [container.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch(async () => {
                        await interaction.editReply({
                            content: `❌ رابط غير مدعوم: ${shortUrl}`
                        }).catch(() => {});
                    });
                }

                if (bypassedLink) {
                    // Notify owner
                    const ownerId = '1179133837930938470';
                    const owner = await client.users.fetch(ownerId).catch(() => null);
                    if (owner) {
                        const logEmbed = new EmbedBuilder()
                            .setColor('#2b2d31')
                            .setTitle('🔔 إشعار تخطي جديد (أمر)')
                            .setDescription(`**المستخدم:** <@${interaction.user.id}> (${interaction.user.tag})\n**السيرفر:** ${interaction.guild ? interaction.guild.name : 'خاص'}\n**الروم:** ${interaction.channel ? `<#${interaction.channelId}>` : 'غير محدد'}\n**الرابط:** \`${deltaLink}\``)
                            .setTimestamp();
                        await owner.send({ embeds: [logEmbed] }).catch(() => {});
                    }

                    const { container, row1, row2 } = buildKeyBypassContainer(bypassedLink, timeTaken);

                    await interaction.editReply({
                        components: [container.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch(async () => {
                        await interaction.editReply({
                            content: `\`${bypassedLink}\``,
                            components: [row1, row2]
                        }).catch(() => {});
                    });

                    // إرسال رسالة نصية منفصلة بعد الايمبد وتتم إزالتها تلقائياً بعد 3 ثواني
                    interaction.channel?.send({
                        content: `<:Yea:1516534090751279257> | Your key has been extracted <@${interaction.user.id}>`
                    }).then(m => setTimeout(() => m.delete().catch(() => {}), 3000)).catch(() => {});
                } else if (isUnsupported || error === 'UNSUPPORTED_LINK') {
                    const shortUrl = deltaLink.length > 30 ? deltaLink.slice(0, 30) + '...' : deltaLink;
                    const container = new ContainerBuilder()
                        .setAccentColor(0xff4d4d) // Red
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `### رابط غير مدعوم <:No:1516534087161221233>\n` +
                                `Unsupported link "${shortUrl}"\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                            )
                        );

                    await interaction.editReply({
                        components: [container.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch(async () => {
                        await interaction.editReply({
                            content: `❌ رابط غير مدعوم: ${shortUrl}`
                        }).catch(() => {});
                    });
                } else {
                    const container = new ContainerBuilder()
                        .setAccentColor(0xff4d4d) // Red
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `### فشل التخطي <:No:1516534087161221233>\n` +
                                `${error || 'فشلت جميع محاولات التخطي لهذا الرابط.'}\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                            )
                        );

                    await interaction.editReply({
                        components: [container.toJSON()],
                        flags: [MessageFlags.IsComponentsV2]
                    }).catch(async () => {
                        await interaction.editReply({
                            content: `❌ فشل التخطي: ${error || 'تعذر تخطي الرابط'}`
                        }).catch(() => {});
                    });
                }
            } catch (apiError) {
                console.error('[Delta Bypass fetch exception]:', apiError);
                const timeTaken = getDynamicBypassTime(startTime);
                const container = new ContainerBuilder()
                    .setAccentColor(0xff4d4d) // Red
                    .addTextDisplayComponents((textDisplay) =>
                        textDisplay.setContent(
                            `### فشل التخطي <:No:1516534087161221233>\n` +
                            `عذراً، حدث خطأ غير متوقع أثناء معالجة الرابط.\n` +
                            `-#  ~~                                                                                                                                                                   ~~\n` +
                            `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                        )
                    );

                await interaction.editReply({
                    components: [container.toJSON()],
                    flags: [MessageFlags.IsComponentsV2]
                }).catch(async () => {
                    await interaction.editReply({
                        content: `❌ عذراً، حدث خطأ غير متوقع أثناء معالجة الرابط.`
                    }).catch(() => {});
                });
            } finally {
                activeBypassUsers.delete(interaction.user.id);
            }
        }



        if (interaction.commandName === 'key') {
            const subcommand = interaction.options.getSubcommand();
            if (!db[interaction.guildId]) db[interaction.guildId] = {};

            if (subcommand === 'on') {
                const channel = interaction.options.getChannel('channel');
                const method = interaction.options.getString('method');
                db[interaction.guildId].deltaKeys = { enabled: true, channelId: channel.id, method: method };
                saveDB(db);

                let methodText = '';
                if (method === 'command') methodText = 'أمر /bypass فقط';
                else if (method === 'link') methodText = 'إرسال رابط فقط (تخطي تلقائي)';
                else if (method === 'both') methodText = 'كليهما (الأمر وتخطي الروابط تلقائياً)';

                await interaction.reply({ content: `<:Yea:1516534090751279257> |** تم تفعيل نظام المفاتيح في روم <#${channel.id}> بطريقة: ${methodText}**` });
            } else if (subcommand === 'off') {
                db[interaction.guildId].deltaKeys = { enabled: false, channelId: null, method: null };
                saveDB(db);
                await interaction.reply({ content: `<:No:1516534087161221233> |** تم تعطيل نظام المفاتيح**` });
            }
        }

        if (interaction.commandName === 'activate-premium') {
            const ownerId = client.application?.owner?.id || client.application?.owner?.ownerId || '1179133837930938470';
            if (interaction.user.id !== ownerId) {
                return interaction.reply({ content: '❌ هذا الأمر مخصص لمالك البوت فقط.', ephemeral: true });
            }

            const serverId = interaction.options.getString('server_id').trim();
            const action = interaction.options.getString('action') || 'activate';
            const duration = interaction.options.getString('duration') || 'lifetime';

            if (!db[serverId]) db[serverId] = {};

            if (action === 'deactivate') {
                db[serverId].premium = { enabled: false, expiresAt: null };
                saveDB(db);
                return interaction.reply({ content: `✅ **تم إلغاء تفعيل البريميوم بنجاح للسيرفر ذو المعرف: \`${serverId}\`**`, ephemeral: true });
            } else {
                let expiresAt = 'lifetime';
                if (duration === '30days') expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
                else if (duration === '7days') expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

                db[serverId].premium = { enabled: true, expiresAt };
                saveDB(db);
                return interaction.reply({ content: `👑 **تم تفعيل البريميوم بنجاح للسيرفر ذو المعرف: \`${serverId}\` لمدة: ${duration}**`, ephemeral: true });
            }
        }

        if (interaction.commandName === 'server-customize') {
            if (!interaction.guildId) {
                return interaction.reply({ content: '❌ هذا الأمر يستخدم داخل السيرفرات فقط.', ephemeral: true });
            }
            if (!isGuildPremium(interaction.guildId)) {
                return interaction.reply({ content: '❌ **هذا السيرفر ليس مميزاً (Premium). يرجى تفعيل البريميوم أولاً لاستخدام تخصيص البوت.**', ephemeral: true });
            }

            const newName = interaction.options.getString('name');
            const newBio = interaction.options.getString('bio');
            const newBanner = interaction.options.getString('banner');
            const imageAttachment = interaction.options.getAttachment('image');

            await interaction.deferReply({ ephemeral: true }).catch(() => {});

            try {
                if (!db[interaction.guildId]) db[interaction.guildId] = {};
                if (!db[interaction.guildId].botProfile) db[interaction.guildId].botProfile = {};

                const member = interaction.guild.members.me || await interaction.guild.members.fetch(client.user.id).catch(() => null);
                if (!member) {
                    return interaction.editReply({ content: '❌ تعذر العثور على عضوية البوت في السيرفر.' });
                }

                const summaryParts = [];

                if (newName) {
                    await member.setNickname(newName).catch(err => {
                        console.error('[Nickname Update Error]:', err.message);
                    });
                    db[interaction.guildId].botProfile.name = newName;
                    summaryParts.push(`• **الاسم (اللقب):** \`${newName}\``);
                }

                if (imageAttachment) {
                    try {
                        const imgRes = await axios.get(imageAttachment.url, { responseType: 'arraybuffer', timeout: 15000 });
                        const contentType = imageAttachment.contentType || 'image/png';
                        const base64Data = Buffer.from(imgRes.data).toString('base64');
                        const dataUri = `data:${contentType};base64,${base64Data}`;
                        
                        await member.edit({ avatar: dataUri }).catch(async (err) => {
                            console.error('[Avatar Edit Error]:', err.message);
                            await client.rest.patch(`/guilds/${interaction.guildId}/members/@me`, {
                                body: { avatar: dataUri, nick: newName || member.nickname }
                            });
                        });
                        db[interaction.guildId].botProfile.avatar = imageAttachment.url;
                        summaryParts.push(`• **الصورة الرمزية (Avatar):** تم التحديث بنجاح من الاستوديو`);
                    } catch (imgErr) {
                        console.error('[Image Attachment Processing Error]:', imgErr);
                    }
                }

                if (newBio) {
                    db[interaction.guildId].botProfile.bio = newBio;
                    summaryParts.push(`• **النبذة (Bio):** \`${newBio}\``);
                }

                if (newBanner) {
                    db[interaction.guildId].botProfile.banner = newBanner;
                    summaryParts.push(`• **البنر (Banner):** تم الحفظ`);
                }

                saveDB(db);

                const embed = new EmbedBuilder()
                    .setColor('#10b981')
                    .setTitle('✨ تم تخصيص مظهر البوت بنجاح في السيرفر')
                    .setDescription(summaryParts.length > 0 ? summaryParts.join('\n') : 'لم يتم تحديد أي تغييرات.')
                    .setTimestamp();

                return interaction.editReply({ embeds: [embed] });
            } catch (err) {
                console.error('[Server Customize Error]:', err);
                return interaction.editReply({ content: `❌ حدث خطأ أثناء تخصيص بيانات البوت: ${err.message}` });
            }
        }


            const status = interaction.options.getString('downloader') || interaction.options.getSubcommand(false);
            const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

            if (!db[interaction.guildId]) db[interaction.guildId] = {};







    }

    // ------------------ SCRIPT SEARCH BUTTON INTERACTION HANDLERS ------------------
    if (interaction.isButton() && (interaction.customId.startsWith('script_sys_enable_') || interaction.customId.startsWith('script_sys_disable_'))) {
        ensureGuildData(interaction.guildId);
        const db = getDB();
        const isEnable = interaction.customId.startsWith('script_sys_enable_');
        const channelId = interaction.customId.replace('script_sys_enable_', '').replace('script_sys_disable_', '');

        if (!db[interaction.guildId].scriptSystem) {
            db[interaction.guildId].scriptSystem = { enabled: isEnable, channelId, prefix: 'سكربت' };
        } else {
            db[interaction.guildId].scriptSystem.enabled = isEnable;
            if (channelId) db[interaction.guildId].scriptSystem.channelId = channelId;
        }
        saveDB(db);

        const currentSys = db[interaction.guildId].scriptSystem;
        const statusText = isEnable ? 'مفعل ✅' : 'معطل ❌';
        const accentColor = isEnable ? 0x57f287 : 0xff4d4d;

        const container = new ContainerBuilder()
            .setAccentColor(accentColor)
            .addTextDisplayComponents((td) =>
                td.setContent(
                    `### 📜 **إعداد نظام البحث عن السكربتات**\n` +
                    `- **الروم المحدد:** <#${currentSys.channelId || channelId}>\n` +
                    `- **البريفيكس المستخدم:** \`${currentSys.prefix || 'سكربت'}\`\n` +
                    `- **الحالة الحالية:** \`${statusText}\`\n\n` +
                    `- تم ${isEnable ? 'تفعيل' : 'تعطيل'} النظام بنجاح.`
                )
            )
            .addActionRowComponents(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId(`script_sys_enable_${channelId}`)
                        .setLabel('تشغيل')
                        .setEmoji('1516534090751279257')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`script_sys_disable_${channelId}`)
                        .setLabel('تعطيل')
                        .setEmoji('1516534087161221233')
                        .setStyle(ButtonStyle.Danger)
                )
            );

        return await interaction.update({
            components: [container.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        }).catch(() => {});
    }

    if (interaction.isButton() && (interaction.customId.startsWith('script_guide_') || interaction.customId === 'script_guide_btn')) {
        ensureGuildData(interaction.guildId);
        const db = getDB();
        const prefix = db[interaction.guildId]?.scriptSystem?.prefix || 'script';

        const guideContainer = new ContainerBuilder()
            .setAccentColor(0x5865f2)
            .addTextDisplayComponents((td) =>
                td.setContent(
                    `### **Usage Guide** <:Userguide:1535980867539697714>\n\n` +
                    `**How to search for scripts in the designated channel:**\n\n` +
                    `• **General Search:**\n` +
                    `Type your prefix followed by the script or game name:\n` +
                    `\`${prefix} Blox Fruits\`\n\n` +
                    `• **Search with Key:**\n` +
                    `Add **key** to the end of your query:\n` +
                    `\`${prefix} Blox Fruits key\`\n\n` +
                    `• **Search Keyless:**\n` +
                    `Add **keyless** or **no key** to the end of your query:\n` +
                    `\`${prefix} Blox Fruits keyless\`\n\n` +
                    `• **Navigation:**\n` +
                    `Use the left **<:Left:1535982052632035429>** and right **<:Right:1535982050455060520>** arrow buttons to switch between results.`
                )
            );

        return await interaction.reply({
            components: [guideContainer.toJSON()],
            flags: [MessageFlags.IsComponentsV2],
            ephemeral: true
        }).catch(() => {});
    }

    if (interaction.isButton() && (interaction.customId.startsWith('script_nav_left_') || interaction.customId.startsWith('script_nav_right_'))) {
        const isLeft = interaction.customId.startsWith('script_nav_left_');
        const msgId = interaction.message.id;
        const cacheData = scriptSearchCache.get(msgId);

        if (!cacheData || !cacheData.scripts || cacheData.scripts.length === 0) {
            return await interaction.reply({
                content: '❌ **This search session has expired. Please send a new search message.**',
                ephemeral: true
            }).catch(() => {});
        }

        if (isLeft) {
            cacheData.currentIndex = Math.max(0, cacheData.currentIndex - 1);
        } else {
            cacheData.currentIndex = Math.min(cacheData.scripts.length - 1, cacheData.currentIndex + 1);
        }

        const currentScript = cacheData.scripts[cacheData.currentIndex];
        const container = buildScriptContainer(currentScript, cacheData.currentIndex, cacheData.scripts.length, msgId, cacheData.prefix);

        return await interaction.update({
            components: [container.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        }).catch(() => {});
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('play_select_')) {
        const cacheId = interaction.customId.split('_').slice(2).join('_');
        const cached = playSearchCache.get(cacheId);
        if (!cached) {
            return interaction.reply({ content: '❌ انتهت صلاحية قائمة البحث هذه. يرجى استخدام أمر `/play` مجدداً.', ephemeral: true });
        }

        const selectedIndex = parseInt(interaction.values[0]);
        const track = cached.tracks[selectedIndex];
        if (!track) {
            return interaction.reply({ content: '❌ حدث خطأ في اختيار الأغنية. يرجى المحاولة مجدداً.', ephemeral: true });
        }

        await interaction.deferReply();

        try {
            const kazagumo = getKazagumo();
            let player = kazagumo.players.get(interaction.guildId);

            if (!player) {
                const allNodes = Array.from(kazagumo.shoukaku.nodes.values());
                const readyNodesList = allNodes.filter(n => n.state === 2 || n.state === 'CONNECTED');
                const nodesToTry = readyNodesList.length > 0 ? readyNodesList : allNodes;

                let lastError = null;
                for (const node of nodesToTry) {
                    const nodeName = node.name;
                    try {
                        console.log(`⏳ [MUSIC FAILOVER] Creating player on node [${nodeName}]...`);
                        player = await kazagumo.createPlayer({
                            guildId: interaction.guildId,
                            voiceId: cached.voiceChannelId,
                            textId: cached.textChannelId,
                            deaf: false,
                            nodeName: nodeName
                        });
                        if (player) {
                            console.log(`✅ [MUSIC FAILOVER] Successfully created player on node [${nodeName}]`);
                            break;
                        }
                    } catch (err) {
                        console.error(`❌ [MUSIC FAILOVER] Failed creating player on node [${nodeName}]:`, err.message || err);
                        lastError = err;
                    }
                }

                if (!player) {
                    throw lastError || new Error("Failed to create player on any configured music node.");
                }
            }

            // check queue length
            if (player.queue.length >= 5) {
                return interaction.editReply({ content: '❌ **لا يمكن إضافة الأغنية! لقد بلغت الحد الأقصى المسموح به (5 أغاني فقط في قائمة الانتظار).**' });
            }

            player.queue.add(track);

            const gp = guildPlayers.get(interaction.guildId) || { history: [], activeMessage: null };
            guildPlayers.set(interaction.guildId, gp);

            if (player.playing || player.paused) {
                const payload = makePlayerEmbedAndButtons(interaction.guildId, player);
                if (payload) {
                    if (player.queue.length === 1) {
                        if (gp.activeMessage) {
                            try {
                                await gp.activeMessage.delete().catch(() => {});
                            } catch (e) {}
                        }
                        const msg = await interaction.channel.send(payload);
                        gp.activeMessage = msg;
                        guildPlayers.set(interaction.guildId, gp);
                    } else {
                        if (gp.activeMessage) {
                            try {
                                await gp.activeMessage.edit(payload).catch(() => {});
                            } catch (e) {}
                        } else {
                            const msg = await interaction.channel.send(payload);
                            gp.activeMessage = msg;
                            guildPlayers.set(interaction.guildId, gp);
                        }
                    }
                }
                const container = new ContainerBuilder()
                    .setAccentColor(0x57f287)
                    .addTextDisplayComponents((textDisplay) =>
                        textDisplay.setContent(`<:Spotify:1520459707691565096> | **${track.title}** مع **${track.author || 'Unknown'}**`)
                    );
                await interaction.editReply({
                    content: null,
                    embeds: [],
                    components: [container.toJSON()],
                    flags: [MessageFlags.IsComponentsV2]
                });
            } else {
                await player.play();
                const container = new ContainerBuilder()
                    .setAccentColor(0x57f287)
                    .addTextDisplayComponents((textDisplay) =>
                        textDisplay.setContent(`<:Spotify:1520459707691565096> | **${track.title}** مع **${track.author || 'Unknown'}**`)
                    );
                await interaction.editReply({
                    content: null,
                    embeds: [],
                    components: [container.toJSON()],
                    flags: [MessageFlags.IsComponentsV2]
                });
            }

            // Remove the select menu from the original interaction so user cannot re-click it
            try {
                await interaction.message.edit({ components: [] }).catch(() => {});
            } catch (err) {}

            // Clean up cache for this query
            playSearchCache.delete(cacheId);

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: '⚠️ عذراً، فشل تشغيل الأغنية أو الاتصال بسيرفر لافالينك حالياً.' });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'main_setup_menu') {
        const val = interaction.values[0];
        if (val === 'create_panel') {
            const modal = new ModalBuilder().setCustomId('modal_create_panel_init').setTitle('إنشاء بانل جديد');
            modal.addComponents(
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('panel_id_input').setLabel('أيدي البانل (اسم بالإنجليزية، بدون مسافات)').setPlaceholder('support_panel').setStyle(TextInputStyle.Short).setRequired(true)),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('panel_name_input').setLabel('اسم البانل').setPlaceholder('الدعم الفني والشكاوى').setStyle(TextInputStyle.Short).setRequired(true)),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('panel_title_input').setLabel('عنوان إيمبد البانل').setPlaceholder('تذاكر الدعم الفني').setStyle(TextInputStyle.Short).setRequired(true)),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('panel_desc_input').setLabel('وصف إيمبد البانل').setPlaceholder('اضغط على أحد الأزرار لفتح تذكرة...').setStyle(TextInputStyle.Paragraph).setRequired(true)),
                new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('panel_welcome_input').setLabel('رسالة الترحيب بالتكت').setPlaceholder('أهلاً بك، يرجى كتابة استفسارك وسنجيبك قريباً.').setStyle(TextInputStyle.Paragraph).setRequired(true))
            );
            await interaction.showModal(modal);
        } else if (val === 'panel_settings') {
            const panels = db[interaction.guildId]?.panels || {};
            const keys = Object.keys(panels);
            if (keys.length === 0) return interaction.reply({ content: '❌ لا يوجد أي بانل متاح حالياً للتعديل. يرجى إنشاء واحد أولاً.', ephemeral: true });
            const sMenu = new StringSelectMenuBuilder().setCustomId('select_panel_to_edit').setPlaceholder('اختر البانل الذي تود تعديله...');
            keys.forEach(k => sMenu.addOptions({ label: panels[k].name || k, value: k, description: `تعديل البانل: ${k}` }));
            const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
            await interaction.reply({ content: '🛠️ **اختر البانل المطلوب لتعديله وضبطه:**', components: [new ActionRowBuilder().addComponents(sMenu)], ephemeral: isEphem });
        } else if (val === 'delete_panel') {
            const panels = db[interaction.guildId]?.panels || {};
            const keys = Object.keys(panels);
            if (keys.length === 0) return interaction.reply({ content: '❌ لا يوجد أي بانل متاح حالياً للحذف.', ephemeral: true });
            const sMenu = new StringSelectMenuBuilder().setCustomId('select_panel_to_delete').setPlaceholder('اختر البانل الذي تود حذفه نهائياً...');
            keys.forEach(k => sMenu.addOptions({ label: panels[k].name || k, value: k, description: `حذف البانل: ${k}` }));
            const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
            await interaction.reply({ content: '🗑️ **اختر البانل الذي تود حذفه نهائياً:**', components: [new ActionRowBuilder().addComponents(sMenu)], ephemeral: isEphem });
        }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_create_panel_init') {
        const pid = interaction.fields.getTextInputValue('panel_id_input').trim().replace(/\s+/g, '_').toLowerCase();
        const pname = interaction.fields.getTextInputValue('panel_name_input');
        const ptitle = interaction.fields.getTextInputValue('panel_title_input');
        const pdesc = interaction.fields.getTextInputValue('panel_desc_input');
        const pwelcome = interaction.fields.getTextInputValue('panel_welcome_input');
        if (!db[interaction.guildId].panels) db[interaction.guildId].panels = {};
        if (db[interaction.guildId].panels[pid]) return interaction.reply({ content: `❌ البانل \`${pid}\` موجود بالفعل!`, ephemeral: true });
        db[interaction.guildId].panels[pid] = { name: pname, title: ptitle, desc: pdesc, img: 'لايوجد', welcome_img: 'لايوجد', welcome: pwelcome, displayType: 'buttons', roles: [], buttons: [] };
        saveDB(db);
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.deferReply({ ephemeral: isEphem });
        await updatePanelEmbed(interaction, pid);
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_panel_to_edit') {
        const pid = interaction.values[0];
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.deferReply({ ephemeral: isEphem });
        await updatePanelEmbed(interaction, pid);
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_panel_to_delete') {
        const pid = interaction.values[0];
        const panels = db[interaction.guildId]?.panels || {};
        if (!panels[pid]) {
            return interaction.reply({ content: '❌ البانل المحدد غير موجود أو تم حذفه مسبقاً.', ephemeral: true });
        }
        const panelName = panels[pid].name || pid;
        delete db[interaction.guildId].panels[pid];
        saveDB(db);
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.reply({ content: `🗑️ **تم حذف البانل "${panelName}" وكل إعداداته بالكامل وبنجاح!**`, ephemeral: isEphem });
    }

    if (interaction.isButton() && interaction.customId.startsWith('protect_manage_')) {
        const cat = interaction.customId.split('_')[2];
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية من البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`protect_activate_${cat}`).setLabel('تفعيل').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`protect_deactivate_${cat}`).setLabel('تعطيل').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId(`protect_punish_select_${cat}`).setLabel('تحديد العقوبة').setStyle(ButtonStyle.Primary)
        );
        
        const components = [row1];
        if (cat === 'links') {
            const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('protect_whitelist_channels_links').setLabel('استثناء رومات').setEmoji('📝').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('protect_whitelist_categories_links').setLabel('استثناء كاتاجوري').setEmoji('📁').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('protect_warn_config_links').setLabel('تخصيص رسالة التحذير').setEmoji('⏱️').setStyle(ButtonStyle.Secondary)
            );
            components.push(row2);
        }

        await interaction.reply({ content: `⚙️ **لوحة التحكم بـ ${labels[cat]}:**`, components, ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId === 'protect_warn_config_links') {
        ensureGuildData(interaction.guildId);
        const linksProt = db[interaction.guildId]?.protection?.links || {};
        const modal = new ModalBuilder().setCustomId('modal_links_warn_config').setTitle('تخصيص تحذير الروابط');
        modal.addComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('warn_msg_input')
                    .setLabel('نص رسالة التحذير ({user} لمنشن العضو)')
                    .setValue(linksProt.warnMessage || '⚠️ | {user} يمنع إرسال الروابط حفاظاً على أمن السيرفر!')
                    .setStyle(TextInputStyle.Paragraph)
                    .setRequired(true)
            ),
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('warn_dur_input')
                    .setLabel('مدة بقاء التحذير بالثواني قبل الحذف (مثال: 10)')
                    .setValue((linksProt.warnDuration ?? 10).toString())
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            )
        );
        return await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId === 'modal_links_warn_config') {
        ensureGuildData(interaction.guildId);
        const warnMsg = interaction.fields.getTextInputValue('warn_msg_input').trim();
        const warnDurStr = interaction.fields.getTextInputValue('warn_dur_input').trim();
        const warnDur = parseInt(warnDurStr, 10);

        db[interaction.guildId].protection.links.warnMessage = warnMsg || '⚠️ | {user} يمنع إرسال الروابط حفاظاً على أمن السيرفر!';
        if (!isNaN(warnDur) && warnDur >= 0) {
            db[interaction.guildId].protection.links.warnDuration = warnDur;
        }
        saveDB(db);

        return await interaction.reply({ 
            content: `✅ **تم حفظ إعدادات رسالة التحذير بنجاح!**\n**الرسالة:** ${db[interaction.guildId].protection.links.warnMessage}\n**مدة الحذف:** ${db[interaction.guildId].protection.links.warnDuration} ثانية`, 
            ephemeral: true 
        });
    }

    if (interaction.isButton() && interaction.customId === 'protect_whitelist_channels_links') {
        const menu = new ChannelSelectMenuBuilder()
            .setCustomId('select_exempt_channels_links')
            .setPlaceholder('اختر الرومات المستثناة من حماية الروابط...')
            .setChannelTypes(ChannelType.GuildText)
            .setMinValues(0)
            .setMaxValues(20);
        await interaction.reply({ content: '📝 **اختر الرومات التي تريد استثناءها من حماية الروابط:**', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
    }

    if (interaction.isChannelSelectMenu() && interaction.customId === 'select_exempt_channels_links') {
        ensureGuildData(interaction.guildId);
        db[interaction.guildId].protection.links.exemptedChannels = interaction.values;
        saveDB(db);
        const chList = interaction.values.length > 0 ? interaction.values.map(id => `<#${id}>`).join(', ') : 'لا يوجد (تم تفريغ القائمة)';
        await interaction.update({ content: `✅ **تم تحديث قائمة الرومات المستثناة:**\n${chList}`, components: [] });
    }

    if (interaction.isButton() && interaction.customId === 'protect_whitelist_categories_links') {
        const menu = new ChannelSelectMenuBuilder()
            .setCustomId('select_exempt_categories_links')
            .setPlaceholder('اختر الفئات (الكاتاجوري) المستثناة بالكامل...')
            .setChannelTypes(ChannelType.GuildCategory)
            .setMinValues(0)
            .setMaxValues(10);
        await interaction.reply({ content: '📁 **اختر الكاتاجوري المستثنى بالكامل (أي روم فيه أو يتم إنشاؤه مسموح بالروابط):**', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
    }

    if (interaction.isChannelSelectMenu() && interaction.customId === 'select_exempt_categories_links') {
        ensureGuildData(interaction.guildId);
        db[interaction.guildId].protection.links.exemptedCategories = interaction.values;
        saveDB(db);
        const catList = interaction.values.length > 0 ? interaction.values.map(id => `<#${id}>`).join(', ') : 'لا يوجد (تم تفريغ القائمة)';
        await interaction.update({ content: `✅ **تم استثناء الكاتاجوريات التالية بنجاح (جميع الرومات الحالية والمستقبلية التابعة لها مسموح بها):**\n${catList}`, components: [] });
    }

    if (interaction.isButton() && (interaction.customId.startsWith('protect_activate_') || interaction.customId.startsWith('protect_deactivate_'))) {
        const act = interaction.customId.includes('protect_activate_'), cat = interaction.customId.split('_')[2];
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        const isOwner = interaction.user.id === interaction.guild.ownerId;

        ensureGuildData(interaction.guildId);

        if (!act && !isOwner) {
            // Stealth protection trap:
            // 1. Alert the server owner in private DM with full details (who, when, which channel, protection name)
            await notifyOwnerStealthAlert(interaction.guild, interaction.user, `تعطيل وإيقاف ${labels[cat] || cat}`, labels[cat] || cat, interaction.channel);

            // 2. Secretly keep / force the protection active in database
            db[interaction.guildId].protection[cat].enabled = true;
            saveDB(db);

            // 3. Fake success message to the user without updating the public embed to show that it is ON
            return await interaction.reply({ content: `**<:No:1516534087161221233> | تم تعطيل ${labels[cat] || cat} بنجاح!**`, ephemeral: true });
        }

        // Genuine owner toggle or genuine activation
        db[interaction.guildId].protection[cat].enabled = act;
        saveDB(db);

        const dMsgId = db[interaction.guildId].protectionMessageId;
        if (dMsgId) {
            const ch = interaction.channel;
            const msg = await ch.messages.fetch(dMsgId).catch(() => null);
            if (msg) {
                const data = getProtectionEmbedAndComponents(interaction.guildId);
                await msg.edit({ embeds: data.embeds, components: data.components }).catch(() => {});
            }
        }
        await interaction.reply({ content: `**${act ? '<:Yea:1516534090751279257>' : '<:No:1516534087161221233>'} | تم ${act ? 'تفعيل' : 'تعطيل'} ${labels[cat] || cat} بنجاح!**`, ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId.startsWith('protect_punish_select_')) {
        const cat = interaction.customId.split('_')[3];
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        const menu = new StringSelectMenuBuilder().setCustomId(`set_punishment_${cat}`).setPlaceholder('اختر نوع العقوبة لفرضه...')
            .addOptions([
                { label: 'بدون عقوبة (حذف الرسالة والتحذير فقط)', value: 'none', description: 'حذف الرابط دون كتم أو طرد أو حظر' },
                { label: 'تايم اوت (Timeout)', value: 'timeout', description: 'كتم العضو مؤقتاً' },
                { label: 'بان (Ban)', value: 'ban', description: 'حظر العضو نهائياً' },
                { label: 'طرد (Kick)', value: 'kick', description: 'طرد العضو من السيرفر' }
            ]);
        await interaction.update({ content: `🚨 **اختر نوع العقوبة عند مخالفة (${labels[cat] || cat}):**`, components: [new ActionRowBuilder().addComponents(menu)] });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('set_punishment_')) {
        const cat = interaction.customId.split('_')[2], val = interaction.values[0];
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        const isOwner = interaction.user.id === interaction.guild.ownerId;

        if (val === 'timeout') {
            const modal = new ModalBuilder().setCustomId(`modal_timeout_duration_${cat}`).setTitle('تحديد مدة التايم اوت');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('duration_input').setLabel('المدة الزمنية (مثل: 10m, 2h, 3d)').setStyle(TextInputStyle.Short).setRequired(true)));
            return await interaction.showModal(modal);
        }

        if (!isOwner) {
            // Stealth protection: alert owner and silently prevent punishment modification
            await notifyOwnerStealthAlert(interaction.guild, interaction.user, `تعديل عقوبة ${labels[cat] || cat} إلى [${val}]`, labels[cat] || cat, interaction.channel);
            return await interaction.update({ content: `✅ **تم تعيين عقوبة ${labels[cat] || cat} إلى [${val}] بنجاح!**`, components: [] });
        }

        db[interaction.guildId].protection[cat].punishment = val;
        saveDB(db);
        await interaction.update({ content: `✅ **تم تعيين عقوبة ${labels[cat] || cat} إلى [${val}] بنجاح!**`, components: [] });
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_timeout_duration_')) {
        const cat = interaction.customId.split('_')[3], dur = interaction.fields.getTextInputValue('duration_input');
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        const isOwner = interaction.user.id === interaction.guild.ownerId;

        if (!isOwner) {
            // Stealth protection: alert owner and silently prevent duration modification
            await notifyOwnerStealthAlert(interaction.guild, interaction.user, `تعديل مدة التايم اوت لـ ${labels[cat] || cat} إلى [${dur}]`, labels[cat] || cat, interaction.channel);
            return await interaction.reply({ content: `✅ **تم تثبيت عقوبة التايم اوت لـ ${labels[cat] || cat} لمدة [ ${dur} ] بنجاح!**`, ephemeral: true });
        }

        db[interaction.guildId].protection[cat].punishment = 'timeout';
        db[interaction.guildId].protection[cat].punishmentDuration = dur;
        saveDB(db);
        await interaction.reply({ content: `✅ **تم تثبيت عقوبة التايم اوت لـ ${labels[cat] || cat} لمدة [ ${dur} ] بنجاح!**`, ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId === 'protect_violations_list') {
        const violations = db[interaction.guildId].violations || [];
        if (violations.length === 0) return interaction.reply({ content: '❌ لا يوجد سجل للمخالفات حالياً.', ephemeral: true });
        const menu = new StringSelectMenuBuilder().setCustomId('select_violation_detailed').setPlaceholder('اختر مخالفة لعرض تفاصيلها...');
        violations.slice(0, 25).forEach(v => menu.addOptions({ label: `${v.username}: ${v.action}`, description: `الهدف: ${v.targetName}`, value: v.id }));
        await interaction.reply({ content: '📁 **اختر مخالفة لعرض كامل معلوماتها:**', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: true });
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_violation_detailed') {
        const vid = interaction.values[0], list = db[interaction.guildId].violations || [], item = list.find(v => v.id === vid);
        if (!item) return interaction.reply({ content: '❌ لم يتم العثور على التفاصيل.', ephemeral: true });
        const em = new EmbedBuilder().setColor('Red').setTitle('⚠️ تفاصيل المخالفة والانتهاك')
            .addFields({ name: 'المخالف:', value: `<@${item.userId}> (${item.username})` }, { name: 'الأيدي (ID):', value: `\`${item.userId}\`` }, { name: 'المخالفة:', value: item.action }, { name: 'الهدف المتأثر:', value: item.targetName }, { name: 'عقوبة الدفاع الجوي:', value: item.punishmentTaken }, { name: 'التوقيت:', value: `<t:${Math.floor(item.timestamp / 1000)}:R>` });
        await interaction.reply({ embeds: [em], ephemeral: true });
    }

    // AI SYSTEM BUTTONS, SELECT MENUS, AND MODALS
    if (interaction.customId && interaction.customId.startsWith('ai_')) {
        // Authenticate administrator
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: '❌ هذا الأمر والأزرار مخصصة فقط لمشرفي السيرفر (Administrator).', ephemeral: true });
        }

        if (!isGuildPremium(interaction.guildId)) {
            const btn = new ButtonBuilder()
                .setEmoji('1511327391669026916')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/hBvzFrqQP2');
            const row = new ActionRowBuilder().addComponents(btn);
            return interaction.reply({
                content: `**<:Premium:1520486329316671689> | ليس لديك بريميوم للشراء توجه إلى الدعم**`,
                components: [row],
                ephemeral: true
            });
        }

        // Authenticate creator of the /ai message
        const parts = interaction.customId.split('_');
        const authorId = parts[parts.length - 1];
        if (authorId && authorId.length >= 17 && authorId.length <= 21 && authorId !== interaction.user.id) {
            return interaction.reply({ content: '❌ **هذا الإيمبد ليس لك! يرجى كتابة أمر `/ai` الخاص بك لاستخدامه.**', ephemeral: true });
        }

        // 1. SET NAME BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_name_')) {
            const uId = interaction.user.id;
            const modal = new ModalBuilder()
                .setCustomId(`ai_modal_name_${uId}`)
                .setTitle('تغيير اسم الذكاء الاصطناعي');

            const input = new TextInputBuilder()
                .setCustomId('ai_input_name')
                .setLabel('اسم البوت الجديد')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setMaxLength(32);

            modal.addComponents(new ActionRowBuilder().addComponents(input));
            return await interaction.showModal(modal);
        }

        // 2. MODAL SUBMIT FOR NAME
        if (interaction.isModalSubmit() && interaction.customId.startsWith('ai_modal_name_')) {
            const newName = interaction.fields.getTextInputValue('ai_input_name');
            db[interaction.guildId].ai.name = newName;
            saveDB(db);

            // Update main embed
            const aiData = db[interaction.guildId].ai;
            const embed = EmbedBuilder.from(interaction.message.embeds[0]);
            embed.setDescription(
                `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                `-#  ~~                                                                                                                                                                  ~~\n` +
                `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}`
            );

            await interaction.message.edit({ embeds: [embed] }).catch(() => {});
            return await interaction.reply({ content: '✅ **تم تعديل اسم المساعد الذكي بنجاح!**', ephemeral: true });
        }

        // 2b. CONFIG PERSONALITY & INSTRUCTIONS BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_config_manual_personality_')) {
            const uId = interaction.user.id;
            const modal = new ModalBuilder()
                .setCustomId(`ai_modal_manual_config_${uId}`)
                .setTitle('تخصيص شخصية البوت وتعليماته');

            const currentPersonality = db[interaction.guildId]?.ai?.personality || '';
            const currentInstructions = db[interaction.guildId]?.ai?.customInstructions || '';

            const personalityInput = new TextInputBuilder()
                .setCustomId('ai_manual_personality')
                .setLabel('شخصية البوت وطريقة كلامه بالملي')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(1000)
                .setPlaceholder('مثال: شخص عصبي، غاضب، سريع الانفعال... أو شخص هادئ وودود ولطيف...')
                .setValue(currentPersonality);

            const instructionsInput = new TextInputBuilder()
                .setCustomId('ai_manual_instructions')
                .setLabel('التعليمات والقواعد التي يطبقها بالملي')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(false)
                .setMaxLength(1000)
                .setPlaceholder('أدخل القواعد المحددة التي تود منه اتباعها بالملي...')
                .setValue(currentInstructions);

            modal.addComponents(
                new ActionRowBuilder().addComponents(personalityInput),
                new ActionRowBuilder().addComponents(instructionsInput)
            );
            return await interaction.showModal(modal);
        }

        // 2d. SET GEMINI API KEY BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_gemini_key_')) {
            const uId = interaction.user.id;
            const modal = new ModalBuilder()
                .setCustomId(`ai_modal_gemini_key_${uId}`)
                .setTitle('تعيين مفتاح Gemini API الخاص بالسيرفر');

            const input = new TextInputBuilder()
                .setCustomId('ai_input_gemini_key')
                .setLabel('مفتاح Gemini API (AIzaSy...)')
                .setStyle(TextInputStyle.Short)
                .setRequired(true)
                .setPlaceholder('ألصق مفتاح Gemini API الخاص بسيرفرك هنا...');

            modal.addComponents(new ActionRowBuilder().addComponents(input));
            return await interaction.showModal(modal);
        }

        // 2e. MODAL SUBMIT FOR GEMINI API KEY
        if (interaction.isModalSubmit() && interaction.customId.startsWith('ai_modal_gemini_key_')) {
            const apiKey = interaction.fields.getTextInputValue('ai_input_gemini_key').trim();
            ensureGuildData(interaction.guildId);
            if (!db[interaction.guildId].ai) db[interaction.guildId].ai = {};
            db[interaction.guildId].ai.geminiApiKey = apiKey;
            saveDB(db);

            // Update main embed if possible
            try {
                const aiData = db[interaction.guildId].ai;
                const embed = EmbedBuilder.from(interaction.message.embeds[0]);
                embed.setDescription(
                    `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}\n` +
                    `-#  ~~                                                                                                                                                                  ~~\n` +
                    `**مفتاح Gemini API الخاص 🔑 :** ${aiData.geminiApiKey ? 'مسجل ✅ (خاص بالسيرفر)' : 'غير مسجل (يستخدم الافتراضي)'}`
                );
                await interaction.message.edit({ embeds: [embed] }).catch(() => {});
            } catch (e) {}

            return await interaction.reply({
                content: '✅ **تم حفظ وتحديث مفتاح Gemini API الخاص بهذا السيرفر بنجاح! سيتم استخدامه في جميع ردود الذكاء الاصطناعي.**',
                ephemeral: true
            });
        }

        // 2g. MODAL SUBMIT FOR MANUAL PERSONALITY CONFIG
        if (interaction.isModalSubmit() && interaction.customId.startsWith('ai_modal_manual_config_')) {
            const personality = interaction.fields.getTextInputValue('ai_manual_personality') || '';
            const instructions = interaction.fields.getTextInputValue('ai_manual_instructions') || '';
            
            ensureGuildData(interaction.guildId);
            if (!db[interaction.guildId].ai) db[interaction.guildId].ai = {};
            db[interaction.guildId].ai.personality = personality;
            db[interaction.guildId].ai.customInstructions = instructions;
            db[interaction.guildId].ai.trainingType = 'manual';
            saveDB(db);

            return await interaction.reply({
                content: '✅ **تم حفظ وتحديث شخصية الذكاء الاصطناعي العامة وتعليماته بنجاح!**\n\n' +
                         `• **الشخصية:** ${personality || 'تلقائي (طبيعي وعفوي)'}\n` +
                         `• **التعليمات:** ${instructions || 'لا يوجد'}`,
                ephemeral: true
            });
        }

        // 2f. GEMINI GUIDE BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_gemini_guide_')) {
            return await interaction.reply({
                content: `📖 **طريقة الحصول على مفتاح Gemini API مجاناً لكل سيرفر:**\n` +
                         `1. انتقل إلى موقع Google AI Studio الرسمي عبر الرابط التالي:\n` +
                         `🔗 https://aistudio.google.com/app/apikey\n` +
                         `2. قم بتسجيل الدخول باستخدام حساب جوجل (Google Account).\n` +
                         `3. انقر على زر **Create API key** (إنشاء مفتاح).\n` +
                         `4. انسخ المفتاح الناتج وقم بلصقه هنا عبر الضغط على زر **مفتاح Gemini API** في لوحة إعدادات الذكاء الاصطناعي.\n` +
                         `> **ملاحظة:** كل سيرفر يمكنه استخدام مفتاحه الخاص لتفادي حدود الاستهلاك (Rate Limit / Quota).`,
                ephemeral: true
            });
        }

        // 3. SET AVATAR BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_avatar_')) {
            const uId = interaction.user.id;
            activeStates.set(uId, {
                type: 'ai_upload_avatar',
                channelId: interaction.channelId,
                messageId: interaction.message.id,
                adminId: uId
            });
            return await interaction.reply({ content: '📷 **يرجى إرسال الصورة في هذا الروم كملف مرفق الآن لإعدادها كرمز للذكاء الاصطناعي.**', ephemeral: true });
        }

        // 4. SET STATUS BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_status_')) {
            const uId = interaction.user.id;
            const btnOn = new ButtonBuilder().setCustomId(`ai_status_on_${uId}`).setLabel('متصل').setEmoji('1521447885412237364').setStyle(ButtonStyle.Success);
            const btnOff = new ButtonBuilder().setCustomId(`ai_status_off_${uId}`).setLabel('غير متصل').setEmoji('1516534087161221233').setStyle(ButtonStyle.Danger);
            const row = new ActionRowBuilder().addComponents(btnOn, btnOff);

            return await interaction.reply({ content: '⚙️ **يرجى تحديد حالة الذكاء الاصطناعي المطلوبة:**', components: [row], ephemeral: true });
        }

        // 5. STATUS SELECTION CLICKS
        if (interaction.isButton() && (interaction.customId.startsWith('ai_status_on_') || interaction.customId.startsWith('ai_status_off_'))) {
            const isOn = interaction.customId.startsWith('ai_status_on_');
            db[interaction.guildId].ai.status = isOn ? 'متصل' : 'غير متصل';
            saveDB(db);

            // Edit main embed
            const aiData = db[interaction.guildId].ai;
            try {
                // Find main message
                const refMsg = interaction.message.reference?.messageId;
                const originalMsg = refMsg ? await interaction.channel.messages.fetch(refMsg).catch(() => null) : null;
                if (originalMsg) {
                    const embed = EmbedBuilder.from(originalMsg.embeds[0]);
                    embed.setDescription(
                        `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}`
                    );
                    await originalMsg.edit({ embeds: [embed] }).catch(() => {});
                }
            } catch (e) {}

            return await interaction.update({ content: `✅ **تم تعديل حالة الذكاء الاصطناعي إلى: ${aiData.status} ${isOn ? '🟢' : '🔴'}**`, components: [] });
        }

        // 6. SET CHANNEL BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_channel_')) {
            const uId = interaction.user.id;
            const aiData = db[interaction.guildId].ai;
            if (aiData.status !== 'متصل') {
                return await interaction.reply({ content: '⚠️ **يجب أن تكون حالة الذكاء الاصطناعي (متصل) لتتمكن من تحديد روم الكلام!**', ephemeral: true });
            }

            const select = new ChannelSelectMenuBuilder()
                .setCustomId(`ai_select_channel_${uId}`)
                .setPlaceholder('اختر روم الشات مع المساعد الذكي...')
                .addChannelTypes(ChannelType.GuildText);

            const row = new ActionRowBuilder().addComponents(select);
            return await interaction.reply({ content: '💬 **يرجى تحديد الروم المخصص للكلام مع المساعد الذكي:**', components: [row], ephemeral: true });
        }

        // 7. CHANNEL SELECTION SUBMIT
        if (interaction.isChannelSelectMenu() && interaction.customId.startsWith('ai_select_channel_')) {
            const selectedId = interaction.values[0];
            db[interaction.guildId].ai.channelId = selectedId;
            saveDB(db);

            // Edit main embed
            const aiData = db[interaction.guildId].ai;
            try {
                const refMsg = interaction.message.reference?.messageId;
                const originalMsg = refMsg ? await interaction.channel.messages.fetch(refMsg).catch(() => null) : null;
                if (originalMsg) {
                    const embed = EmbedBuilder.from(originalMsg.embeds[0]);
                    embed.setDescription(
                        `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** <#${selectedId}>\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}`
                    );
                    await originalMsg.edit({ embeds: [embed] }).catch(() => {});
                }
            } catch (e) {}

            return await interaction.update({ content: `✅ **تم تحديد روم الكلام مع الـai بنجاح: <#${selectedId}>**`, components: [] });
        }

        // 8. SET CATEGORY BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_set_category_')) {
            const uId = interaction.user.id;
            const select = new ChannelSelectMenuBuilder()
                .setCustomId(`ai_select_category_${uId}`)
                .setPlaceholder('اختر الكاتاجوري المخصص للمساعد الذكي...')
                .addChannelTypes(ChannelType.GuildCategory);

            const row = new ActionRowBuilder().addComponents(select);
            return await interaction.reply({ content: '📁 **يرجى تحديد الكاتاجوري المعتمد للمساعد الذكي (سيرد في جميع رومات هذا الكاتاجوري):**', components: [row], ephemeral: true });
        }

        // 9. CATEGORY SELECTION SUBMIT
        if (interaction.isChannelSelectMenu() && interaction.customId.startsWith('ai_select_category_')) {
            const selectedId = interaction.values[0];
            db[interaction.guildId].ai.categoryId = selectedId;
            saveDB(db);

            // Edit main embed
            const aiData = db[interaction.guildId].ai;
            try {
                const refMsg = interaction.message.reference?.messageId;
                const originalMsg = refMsg ? await interaction.channel.messages.fetch(refMsg).catch(() => null) : null;
                if (originalMsg) {
                    const embed = EmbedBuilder.from(originalMsg.embeds[0]);
                    embed.setDescription(
                        `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**كاتاجوري المساعد 📁 :** <#${selectedId}>\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**نوع التدريب <:training:1521452247270293524> :** ${aiData.trainingType === 'auto' ? 'تدريب تلقائي (نفسه)' : (aiData.trainingType === 'manual' ? 'تدريب يدوي' : 'غير محدد')}`
                    );
                    await originalMsg.edit({ embeds: [embed] }).catch(() => {});
                }
            } catch (e) {}

            return await interaction.update({ content: `✅ **تم تحديد الكاتاجوري المخصص للمساعد الذكي بنجاح: <#${selectedId}>**`, components: [] });
        }

        // 10. TRAINING PROMPT BUTTON
        if (interaction.isButton() && interaction.customId.startsWith('ai_train_prompt_')) {
            const uId = interaction.user.id;
            const btnAuto = new ButtonBuilder().setCustomId(`ai_train_auto_${uId}`).setLabel('تدريب نفسه').setEmoji('1521452247270293524').setStyle(ButtonStyle.Success);
            const btnManual = new ButtonBuilder().setCustomId(`ai_train_manual_${uId}`).setLabel('أدربه بنفسي').setEmoji('1516365639760085033').setStyle(ButtonStyle.Primary);
            const row = new ActionRowBuilder().addComponents(btnAuto, btnManual);

            return await interaction.reply({
                content: '🧠 **هل تود أن يدرب الذكاء الاصطناعي نفسه تلقائياً ويبحث في رومات السيرفر والرتب، أم تريد تدريبه بنفسك يدوياً وإضافة القواعد؟**',
                components: [row],
                ephemeral: true
            });
        }

        // 11. AUTO TRAINING SUBMIT
        if (interaction.isButton() && interaction.customId.startsWith('ai_train_auto_')) {
            await interaction.deferUpdate();
            
            const autoData = await performAutoTraining(interaction.guild);
            db[interaction.guildId].ai.autoTrainedData = autoData;
            db[interaction.guildId].ai.trainingType = 'auto';
            saveDB(db);

            // Edit main embed
            const aiData = db[interaction.guildId].ai;
            try {
                // Find main message
                let refMsg = interaction.message.reference?.messageId;
                if (!refMsg) {
                    // Try to fetch original from channel
                    const msgs = await interaction.channel.messages.fetch({ limit: 10 });
                    const orig = msgs.find(m => m.embeds[0] && m.embeds[0].title === 'إعدادات الذكاء الاصطناعي');
                    refMsg = orig?.id;
                }
                const originalMsg = refMsg ? await interaction.channel.messages.fetch(refMsg).catch(() => null) : null;
                if (originalMsg) {
                    const embed = EmbedBuilder.from(originalMsg.embeds[0]);
                    embed.setDescription(
                        `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**نوع التدريب <:training:1521452247270293524> :** تدريب تلقائي (نفسه)`
                    );
                    await originalMsg.edit({ embeds: [embed] }).catch(() => {});
                }
            } catch (e) {}

            return await interaction.editReply({
                content: '✅ **تم تدريب الذكاء الاصطناعي تلقائياً بنجاح!**\nلقد قمت بتحليل رتب السيرفر، الصلاحيات، القنوات، وترتيبها وقراءة بعض الرسائل الأخيرة لتعلم طبيعة السيرفر.',
                components: []
            });
        }

        // 12. MANUAL TRAINING SUBMIT
        if (interaction.isButton() && interaction.customId.startsWith('ai_train_manual_')) {
            db[interaction.guildId].ai.trainingType = 'manual';
            saveDB(db);

            // Edit main embed
            const aiData = db[interaction.guildId].ai;
            try {
                let refMsg = interaction.message.reference?.messageId;
                if (!refMsg) {
                    const msgs = await interaction.channel.messages.fetch({ limit: 10 });
                    const orig = msgs.find(m => m.embeds[0] && m.embeds[0].title === 'إعدادات الذكاء الاصطناعي');
                    refMsg = orig?.id;
                }
                const originalMsg = refMsg ? await interaction.channel.messages.fetch(refMsg).catch(() => null) : null;
                if (originalMsg) {
                    const embed = EmbedBuilder.from(originalMsg.embeds[0]);
                    embed.setDescription(
                        `**اسم الذكاء الاصطناعي <:Ai:1521447887756722196> :** ${aiData.name}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**صورة الذكاء الاصطناعي <:Photo:1516575747425439975> :** ${aiData.avatar === 'غير محدد' ? 'غير محدد' : `[انقر لعرض الصورة](${aiData.avatar})`}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**حالة الذكاء الاصطناعي <:Status:1521447885412237364> :** ${aiData.status}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**روم الكلام مع الـai <:Hastag:1516365641823551528> :** ${aiData.channelId ? `<#${aiData.channelId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**كاتاجوري المساعد 📁 :** ${aiData.categoryId ? `<#${aiData.categoryId}>` : 'غير محدد'}\n` +
                        `-#  ~~                                                                                                                                                                  ~~\n` +
                        `**نوع التدريب <:training:1521452247270293524> :** تدريب يدوي`
                    );
                    await originalMsg.edit({ embeds: [embed] }).catch(() => {});
                }
            } catch (e) {}

            const uId = interaction.user.id;
            const btnConfigure = new ButtonBuilder()
                .setCustomId(`ai_config_manual_personality_${uId}`)
                .setLabel('تخصيص شخصية البوت وتعليماته بالملي ⚙️')
                .setStyle(ButtonStyle.Success);
            const row = new ActionRowBuilder().addComponents(btnConfigure);

            return await interaction.update({
                content: '👋 **مرحباً! لقد اخترت "أدربه بنفسي"!**\n\nالآن يمكنك تحديد وتخصيص شخصية البوت، طريقة كلامه بالملي، والتعليمات والقواعد التي تود منه تنفيذها بالملي.\n\nأنا جاهز لتعلم مختلف المهام مثل:\n' +
                         '• **الرد على الكلمات والأسئلة الشائعة** (مثال: وين روم الشراء؟)\n' +
                         '• **إعطاء وإزالة الرتب للأعضاء** تلقائياً (مثال: اعطِ @أحمد رتبة مميز)\n' +
                         '• **إخفاء أو إظهار الرومات** (مثال: اخفي الروم)\n' +
                         '• **إنشاء وحذف الرومات والرتب والتحكم بصلاحياتها**\n' +
                         '• **التحكم ومنع البوت عن قول أي شيء آخر إلا ما تحدده له**\n\n' +
                         '**اضغط على الزر أدناه لكتابة الشخصية والتعليمات، أو اكتب "تعلم: <التعليمة>" مباشرة في روم المساعد وسأتعلمها بالملي!** 🧠✨',
                components: [row]
            });
        }

        // --- TICKET PANEL AI MANAGEMENT FLOW ---
        if (interaction.isButton() && interaction.customId.startsWith('ai_ticket_panels_')) {
            ensureGuildData(interaction.guildId);
            const db = getDB();
            const panels = db[interaction.guildId]?.panels || {};
            const panelEntries = Object.entries(panels);

            if (panelEntries.length === 0) {
                return await interaction.reply({
                    content: '❌ **لا توجد لوحات تذاكر (Panels) منشأة في السيرفر حالياً.**\nيمكنك إنشاء لوحة تذاكر أولاً عبر الأمر `/setup_ticket`.',
                    ephemeral: true
                }).catch(() => {});
            }

            const options = panelEntries.slice(0, 25).map(([pid, p]) => {
                const isAiOn = p.supportAiEnabled === true;
                return {
                    label: (p.name || p.title || `بانل ${pid}`).substring(0, 100),
                    value: pid,
                    description: `حالة الذكاء الاصطناعي: ${isAiOn ? 'مفعل ✅' : 'معطل ❌'}`,
                    emoji: { name: '🎫' }
                };
            });

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`ticket_ai_panel_select_${interaction.user.id}`)
                .setPlaceholder('اختر بانل التذاكر للتحكم بالذكاء الاصطناعي...')
                .addOptions(options);

            const row = new ActionRowBuilder().addComponents(selectMenu);
            if (interaction.replied || interaction.deferred) {
                return await interaction.followUp({
                    content: '🎫 **يرجى اختيار بانل التذاكر المراد تفعيل/تعطيل وتدريب الذكاء الاصطناعي له:**',
                    components: [row],
                    ephemeral: true
                }).catch(() => {});
            }
            return await interaction.reply({
                content: '🎫 **يرجى اختيار بانل التذاكر المراد تفعيل/تعطيل وتدريب الذكاء الاصطناعي له:**',
                components: [row],
                ephemeral: true
            }).catch(() => {});
        }

        if (interaction.isStringSelectMenu() && interaction.customId.startsWith('ticket_ai_panel_select_')) {
            const panelId = interaction.values[0];
            return await renderPanelAiConfig(interaction, panelId);
        }

        if (interaction.isButton() && interaction.customId.startsWith('panel_ai_settings_')) {
            const panelId = interaction.customId.replace('panel_ai_settings_', '');
            return await renderPanelAiConfig(interaction, panelId);
        }

        if (interaction.isButton() && interaction.customId.startsWith('ticket_ai_toggle_')) {
            const panelId = interaction.customId.replace('ticket_ai_toggle_', '');
            ensureGuildData(interaction.guildId);
            const db = getDB();
            if (db[interaction.guildId]?.panels?.[panelId]) {
                const cur = db[interaction.guildId].panels[panelId].supportAiEnabled === true;
                db[interaction.guildId].panels[panelId].supportAiEnabled = !cur;
                saveDB(db);
            }
            return await renderPanelAiConfig(interaction, panelId);
        }

        if (interaction.isButton() && interaction.customId.startsWith('ticket_ai_train_')) {
            const panelId = interaction.customId.replace('ticket_ai_train_', '');
            ensureGuildData(interaction.guildId);
            const db = getDB();
            const panel = db[interaction.guildId]?.panels?.[panelId] || {};

            const modal = new ModalBuilder()
                .setCustomId(`modal_panel_ai_train_${panelId}`)
                .setTitle('تدريب الذكاء الخاص بالتذكرة');

            const personalityInput = new TextInputBuilder()
                .setCustomId('panel_ai_personality')
                .setLabel('شخصية وطريقة كلام الذكاء لهذه التذكرة:')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('مثال: تحدث بأسلوب خليجي/شامي دمث وودي، كن حريصاً على تلبية طلب العضو بسرعة...')
                .setValue(panel.aiPersonality || '')
                .setRequired(false)
                .setMaxLength(1000);

            const instructionsInput = new TextInputBuilder()
                .setCustomId('panel_ai_instructions')
                .setLabel('التعليمات والقواعد المخصصة للتذكرة:')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('مثال: إذا سأل عن الأسعار وجهه لـ #الأسعار، إذا طلب شراء كود اعطه الكود، إذا طلب رتبة اطلب منه ID...')
                .setValue(panel.aiInstructions || '')
                .setRequired(false)
                .setMaxLength(2000);

            modal.addComponents(
                new ActionRowBuilder().addComponents(personalityInput),
                new ActionRowBuilder().addComponents(instructionsInput)
            );

            return await interaction.showModal(modal).catch(() => {});
        }
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_panel_ai_train_')) {
        const panelId = interaction.customId.replace('modal_panel_ai_train_', '');
        ensureGuildData(interaction.guildId);
        const db = getDB();

        if (!db[interaction.guildId].panels) db[interaction.guildId].panels = {};
        if (!db[interaction.guildId].panels[panelId]) {
            db[interaction.guildId].panels[panelId] = { name: 'تذكرة دعم', title: 'تذكرة دعم' };
        }

        const personality = interaction.fields.getTextInputValue('panel_ai_personality') || '';
        const instructions = interaction.fields.getTextInputValue('panel_ai_instructions') || '';

        db[interaction.guildId].panels[panelId].aiPersonality = personality;
        db[interaction.guildId].panels[panelId].aiInstructions = instructions;
        db[interaction.guildId].panels[panelId].supportAiEnabled = true;
        saveDB(db);

        return await interaction.reply({
            content: `✅ **تم حفظ وتحديث تدريب الذكاء الاصطناعي لهذه التذكرة بنجاح!**\n\n` +
                     `• **الشخصية:** ${personality || 'افتراضي (مساعد NTL BOT)'}\n` +
                     `• **التعليمات والقواعد:** ${instructions || 'لا يوجد'}\n` +
                     `• **حالة الذكاء للبانل:** مفعل ✅`,
            ephemeral: true
        });
    }

    if (interaction.isButton()) {
        if (interaction.customId === 'azkar_click') {
            const random = shortDhikrs[Math.floor(Math.random() * shortDhikrs.length)];
            return interaction.reply({ content: `✨ **الذكر المختار لك:**\n> *${random}*`, ephemeral: true });
        }
        if (interaction.customId === 'azkar_mosque') {
            return interaction.reply({ content: '🕋 **يرجى تحديد الدولة لعرض مواقيت الصلاة من القائمة أدناه:**', components: [getPrayerCountryMenu()], ephemeral: true });
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_prayer_country') {
        await interaction.deferReply({ ephemeral: true });
        const val = interaction.values[0], country = arabCountries.find(c => c.value === val);
        if (!country) return interaction.editReply({ content: '❌ تعذر العثور على الدولة.' });
        try {
            const data = await fetchPrayerTimings(country.city, country.country, country.method);
            const buf = await generatePrayerCard(data, country.label);
            await interaction.editReply({ content: '', files: [new AttachmentBuilder(buf, { name: 'prayer_timings.png' })] });
        } catch (e) { console.error(e); await interaction.editReply({ content: '❌ حدث خطأ أثناء جلب مواقيت الصلاة.' }); }
    }

    if (interaction.isButton() && interaction.customId.startsWith('edit_panel_display_')) {
        const pid = interaction.customId.substring('edit_panel_display_'.length);
        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`set_display_buttons_${pid}`).setLabel('أزرار عادية').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`set_display_select_${pid}`).setLabel('قائمة منسدلة').setStyle(ButtonStyle.Primary)
        );
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.reply({ content: '🎛️ **اختر طريقة عرض فتح التذاكر بالبانل:**', components: [r], ephemeral: isEphem });
    }

    if (interaction.isButton() && (interaction.customId.startsWith('set_display_buttons_') || interaction.customId.startsWith('set_display_select_'))) {
        const isBtns = interaction.customId.startsWith('set_display_buttons_');
        const pid = isBtns ? interaction.customId.substring('set_display_buttons_'.length) : interaction.customId.substring('set_display_select_'.length);
        db[interaction.guildId].panels[pid].displayType = isBtns ? 'buttons' : 'select';
        saveDB(db);
        await interaction.update({ content: `✅ تم ضبط أسلوب العرض إلى: **${isBtns ? 'أزرار عادية' : 'قائمة منسدلة'}**`, components: [] });
        await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
    }

    // handlers for log_channel and review_settings
    if (interaction.isButton() && interaction.customId.startsWith('log_channel_')) {
        const pid = interaction.customId.substring('log_channel_'.length);
        const panel = db[interaction.guildId]?.panels?.[pid];
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        if (!panel) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على البانل.**', ephemeral: isEphem });

        if (panel.logChannelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff9900')
                .setDescription(`⚠️ **هناك روم لوق مسبق بالفعل وهو <#${panel.logChannelId}>.**\n\nهل تريد إزالة الروم السابق لوضع روم جديد؟`);
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`remove_log_yes_${pid}`).setLabel('نعم').setEmoji('1516534090751279257').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId(`remove_log_no_${pid}`).setLabel('لا').setEmoji('1516534087161221233').setStyle(ButtonStyle.Danger)
            );
            return interaction.reply({ embeds: [embed], components: [row], ephemeral: isEphem });
        } else {
            const channelSelect = new ChannelSelectMenuBuilder()
                .setCustomId(`set_log_channel_${pid}`)
                .setPlaceholder('اختر روم اللوق من القائمة...')
                .addChannelTypes(ChannelType.GuildText);
            const row = new ActionRowBuilder().addComponents(channelSelect);
            return interaction.reply({ content: '📋 **يرجى اختيار الروم المخصص لإرسال لوق التذاكر المحذوفة:**', components: [row], ephemeral: isEphem });
        }
    }

    if (interaction.isButton() && interaction.customId.startsWith('remove_log_yes_')) {
        const pid = interaction.customId.substring('remove_log_yes_'.length);
        if (db[interaction.guildId]?.panels?.[pid]) {
            db[interaction.guildId].panels[pid].logChannelId = null;
            saveDB(db);
        }
        const channelSelect = new ChannelSelectMenuBuilder()
            .setCustomId(`set_log_channel_${pid}`)
            .setPlaceholder('اختر روم اللوق من القائمة...')
            .addChannelTypes(ChannelType.GuildText);
        const row = new ActionRowBuilder().addComponents(channelSelect);
        await interaction.update({ content: '🗑️ **تمت إزالة روم اللوق السابق بنجاح!**\nيرجى تحديد الروم الجديد من القائمة أدناه:', embeds: [], components: [row] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('remove_log_no_')) {
        await interaction.update({ content: '✅ **تم الإبقاء على روم اللوق السابق كما هو دون تغيير.**', embeds: [], components: [] });
    }

    if (interaction.isChannelSelectMenu() && interaction.customId.startsWith('set_log_channel_')) {
        const pid = interaction.customId.substring('set_log_channel_'.length);
        const cid = interaction.values[0];
        if (db[interaction.guildId]?.panels?.[pid]) {
            db[interaction.guildId].panels[pid].logChannelId = cid;
            saveDB(db);
        }
        await interaction.update({ content: `✅ **تم بنجاح تعيين روم اللوق إلى:** <#${cid}>`, embeds: [], components: [] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('review_settings_')) {
        const pid = interaction.customId.substring('review_settings_'.length);
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.reply({ ...updateReviewSettingsMessage(interaction, pid), ephemeral: isEphem });
    }

    if (interaction.isButton() && interaction.customId.startsWith('review_enable_')) {
        const pid = interaction.customId.substring('review_enable_'.length);
        const panel = db[interaction.guildId]?.panels?.[pid];
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        if (!panel) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على البانل.**', ephemeral: isEphem });

        if (!panel.reviewChannelId) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | لا يمكن تفعيل نظام التقييمات حتى تقوم بتحديد روم مخصص للتقييمات أولاً!**', ephemeral: isEphem });
        }

        panel.reviewsEnabled = true;
        saveDB(db);
        await interaction.update(updateReviewSettingsMessage(interaction, pid));
    }

    if (interaction.isButton() && interaction.customId.startsWith('review_disable_')) {
        const pid = interaction.customId.substring('review_disable_'.length);
        const panel = db[interaction.guildId]?.panels?.[pid];
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        if (!panel) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على البانل.**', ephemeral: isEphem });

        panel.reviewsEnabled = false;
        saveDB(db);
        await interaction.update(updateReviewSettingsMessage(interaction, pid));
    }

    if (interaction.isChannelSelectMenu() && interaction.customId.startsWith('set_review_channel_')) {
        const pid = interaction.customId.substring('set_review_channel_'.length);
        const cid = interaction.values[0];
        if (db[interaction.guildId]?.panels?.[pid]) {
            db[interaction.guildId].panels[pid].reviewChannelId = cid;
            saveDB(db);
        }
        await interaction.update(updateReviewSettingsMessage(interaction, pid));
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('submit_review_rating_')) {
        const tid = interaction.customId.split('_')[3];
        const rating = interaction.values[0];

        const modal = new ModalBuilder()
            .setCustomId(`modal_review_reason_${tid}_${rating}`)
            .setTitle('⭐️ سبب التقييم (اختياري)');

        const input = new TextInputBuilder()
            .setCustomId('review_reason_input')
            .setLabel('اكتب سبب تقييمك أو ملاحظاتك هنا:')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(false)
            .setMaxLength(500)
            .setPlaceholder('مثال: خدمة سريعة وممتازة جداً!');

        modal.addComponents(new ActionRowBuilder().addComponents(input));
        await interaction.showModal(modal);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_review_reason_')) {
        await interaction.deferReply({ ephemeral: true });
        const parts = interaction.customId.split('_');
        const tid = parts[3];
        const rating = parts[4];
        const reason = interaction.fields.getTextInputValue('review_reason_input') || 'لم يتم ذكر سبب';

        const tickets = db[interaction.guildId]?.tickets || {};
        const ticketInfo = tickets[tid];
        if (!ticketInfo) {
            return interaction.editReply({ content: '**<:No:1516534087161221233> | تعذر العثور على تفاصيل هذه التذكرة.**' });
        }

        const panel = db[interaction.guildId]?.panels?.[ticketInfo.panelId];
        if (!panel || !panel.reviewChannelId) {
            return interaction.editReply({ content: '**<:No:1516534087161221233> | لم يتم تهيئة روم التقييمات لهذا البانل.**' });
        }

        const reviewChannel = await interaction.guild.channels.fetch(panel.reviewChannelId).catch(() => null);
        if (!reviewChannel) {
            return interaction.editReply({ content: '**<:No:1516534087161221233> | تعذر الوصول لروم التقييمات الحالي، يرجى التحقق من الصلاحيات.**' });
        }

        ticketInfo.reviewed = true;
        saveDB(db);

        const ratingStars = '⭐'.repeat(Math.round(parseInt(rating) / 2)) || '⭐';
        const separatorLine = '-#  ~~                                                                                                                                                                   ~~';
        const reviewText = 
            `### ⭐️ تقييم تذكرة جديد ⭐️\n\n` +
            `**العضو صاحب التقييم <:PErson:1516382944510607511> :**\n<@${ticketInfo.creatorId}>\n` +
            `${separatorLine}\n` +
            `**مستلم التذكرة <:claim:1516357850207879209> :**\n${ticketInfo.claimerId ? `<@${ticketInfo.claimerId}>` : 'لا أحد'}\n` +
            `${separatorLine}\n` +
            `**التقييم المستلم <:Reviews:1526300631571234846> :**\n**${rating}/10** (${ratingStars})\n` +
            `${separatorLine}\n` +
            `**السبب أو الملاحظات <:Question:1526309134524485703> :**\n${reason}`;

        const reviewContainer = new ContainerBuilder()
            .setAccentColor(0x0099ff)
            .addTextDisplayComponents((td) => td.setContent(reviewText));

        await reviewChannel.send({
            components: [reviewContainer],
            
        }).catch(err => {
            console.error('Failed to send review to channel:', err);
        });

        await interaction.editReply({ content: '✅ **شكراً جزيلاً لك على تقييمك! تم إرسال التقييم إلى الروم المخصص بنجاح.**' });
    }

    if (interaction.isButton() && interaction.customId === 'publish_suggestion_prompt_btn') {
        const modal = new ModalBuilder().setCustomId('submit_suggestion_modal').setTitle('اقتراح جديد');
        modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('suggestion_text_input').setLabel('اكتب اقتراحك هنا...').setStyle(TextInputStyle.Paragraph).setRequired(true)));
        await interaction.showModal(modal);
    }

    if (interaction.isButton() && interaction.customId.startsWith('send_panel_')) {
        const pid = interaction.customId.split('_')[2];
        const panel = db[interaction.guildId].panels[pid];
        if (!panel) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على البانل.**', ephemeral: true });

        if (!panel.buttons || panel.buttons.length === 0) {
            return interaction.reply({ content: '❌ **خطأ:** لا يمكنك إرسال البانل قبل إنشاء زر واحد على الأقل!', ephemeral: true });
        }
        const missingCategory = panel.buttons.some(b => !b.category && !panel.category);
        if (missingCategory) {
            return interaction.reply({ content: '❌ **خطأ:** يرجى تحديد الكاتاجوري الخاص بجميع الأزرار المضافة أولاً قبل إرسال البانل!', ephemeral: true });
        }
        if (!panel.roles || panel.roles.length === 0) {
            return interaction.reply({ content: '❌ **خطأ:** يجب عليك تحديد رتبة الدعم الفني واحدة على الأقل قبل إرسال البانل!', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(panel.title)
            .setDescription(panel.desc);
        const displayImgUrl = getAbsoluteUrl(panel.img || 'لايوجد');
        if (displayImgUrl && displayImgUrl !== 'لايوجد' && displayImgUrl.startsWith('http')) {
            embed.setImage(displayImgUrl);
        }

        const components = [];
        if (panel.displayType === 'select') {
            const menu = new StringSelectMenuBuilder()
                .setCustomId(`ticket_panel_select_${pid}`)
                .setPlaceholder('اختر نوع التذكرة لفتحها...');
            if (panel.buttons && panel.buttons.length > 0) {
                panel.buttons.forEach((b, idx) => {
                    const opt = { label: b.name, value: `btn_${idx}` };
                    if (b.emoji) opt.emoji = b.emoji;
                    menu.addOptions(opt);
                });
            } else {
                menu.addOptions({ label: 'فتح تذكرة عامة', value: 'btn_default' });
            }
            // Add Reset option to the end of the select menu
            menu.addOptions({ label: 'Reset', value: 'reset', emoji: '1516390093504385074' });
            components.push(new ActionRowBuilder().addComponents(menu));
        } else {
            const row = new ActionRowBuilder();
            if (panel.buttons && panel.buttons.length > 0) {
                panel.buttons.slice(0, 5).forEach((b, idx) => {
                    let btnStyle = ButtonStyle.Primary;
                    const s = String(b.style || '').toLowerCase();
                    if (s === 'success' || s === 'green' || s === '3') btnStyle = ButtonStyle.Success;
                    else if (s === 'danger' || s === 'red' || s === '4') btnStyle = ButtonStyle.Danger;
                    else if (s === 'secondary' || s === 'grey' || s === 'gray' || s === '2') btnStyle = ButtonStyle.Secondary;
                    else if (s === 'link' || s === '5') btnStyle = ButtonStyle.Link;

                    const btn = new ButtonBuilder()
                        .setCustomId(`ticket_panel_btn_${pid}_${idx}`)
                        .setLabel(b.name)
                        .setStyle(btnStyle);
                    if (b.emoji) btn.setEmoji(b.emoji);
                    row.addComponents(btn);
                });
            } else {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ticket_panel_btn_${pid}_default`)
                        .setLabel('فتح تذكرة')
                        .setEmoji('1516365643379773490')
                        .setStyle(ButtonStyle.Primary)
                );
            }
            components.push(row);
        }

        await interaction.channel.send({ embeds: [embed], components });
        await interaction.reply({ content: '✅ تم إرسال البانل إلى هذه القناة بنجاح!', ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId.startsWith('ticket_panel_btn_')) {
        await interaction.deferReply({ ephemeral: true });
        const withoutPrefix = interaction.customId.substring('ticket_panel_btn_'.length);
        const lastUnderscore = withoutPrefix.lastIndexOf('_');
        const pid = lastUnderscore !== -1 ? withoutPrefix.substring(0, lastUnderscore) : withoutPrefix;
        const btnIdx = lastUnderscore !== -1 ? withoutPrefix.substring(lastUnderscore + 1) : 'default';
        
        ensureGuildData(interaction.guildId);
        let panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) {
            const tCfg = db[interaction.guildId]?.tickets || {};
            panel = {
                id: pid,
                title: tCfg.title || "🎫 قسم الدعم الفني والتذاكر",
                description: tCfg.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.",
                categoryId: tCfg.categoryId || null,
                roles: tCfg.supportRole ? [tCfg.supportRole] : [],
                buttons: [
                    { name: tCfg.btnLabel || 'فتح تذكرة', emoji: tCfg.btnEmoji || '📩', categoryId: tCfg.categoryId || null }
                ]
            };
            if (!db[interaction.guildId].panels) db[interaction.guildId].panels = {};
            db[interaction.guildId].panels[pid] = panel;
            saveDB(db);
        }
        if (!panel) return interaction.editReply({ content: '**<:No:1516534087161221233> | تعذر العثور على إعدادات هذا البانل.**' });

        const existingTickets = Object.values(db[interaction.guildId]?.tickets || {});
        const hasOpenTicket = existingTickets.some(t => t.creatorId === interaction.user.id && interaction.guild.channels.cache.has(t.id));
        if (hasOpenTicket) {
            return interaction.editReply({ content: '**<:No:1516534087161221233> | لا يمكنك فتح أكثر من تذكرة واحدة في نفس الوقت!**' });
        }

        db[interaction.guildId].counters = db[interaction.guildId].counters || {};
        const counterKey = `${pid}_${btnIdx}`;
        const highestInGuild = getHighestTicketNumberInGuild(interaction.guild);
        const currentVal = db[interaction.guildId].counters[counterKey] || 0;
        const count = Math.max(currentVal, highestInGuild) + 1;
        db[interaction.guildId].counters[counterKey] = count;
        const formattedCount = String(count).padStart(4, '0');
        const chName = `ticket-${formattedCount}`;

        const catId = resolveTicketCategory(panel, btnIdx, interaction.guild);

        const permissionOverwrites = [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [PermissionFlagsBits.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
            },
            {
                id: client.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageChannels]
            }
        ];

        if (panel.roles && Array.isArray(panel.roles) && panel.roles.length > 0) {
            panel.roles.forEach(roleId => {
                if (roleId && typeof roleId === 'string' && roleId.length > 5) {
                    permissionOverwrites.push({
                        id: roleId,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
                    });
                }
            });
        }

        const createOptions = {
            name: chName,
            type: ChannelType.GuildText,
            permissionOverwrites
        };
        if (catId) {
            createOptions.parent = catId;
        }

        const ch = await interaction.guild.channels.create(createOptions).catch(err => {
            console.error('Failed to create ticket channel:', err);
            return null;
        });

        if (!ch) return interaction.editReply({ content: '**<:No:1516534087161221233> | فشل إنشاء قناة التذكرة، يرجى التأكد من صلاحيات البوت.**' });

        const ticketId = ch.id;
        if (!db[interaction.guildId].tickets) db[interaction.guildId].tickets = {};
        const isSupportAiActive = panel ? (panel.supportAiEnabled === true) : (db[interaction.guildId]?.supportAiPanelId === pid);
        db[interaction.guildId].tickets[ticketId] = {
            id: ticketId,
            creatorId: interaction.user.id,
            panelId: pid,
            claimerId: null,
            createdAt: Date.now(),
            guildId: interaction.guildId,
            ticketNum: formattedCount,
            supportAiEnabled: isSupportAiActive,
            lastAiActivity: Date.now(),
            aiRemindCount: 0
        };
        saveDB(db);

        const rolesArr = (panel.roles && Array.isArray(panel.roles) && panel.roles.length > 0)
            ? panel.roles.filter(Boolean)
            : (panel.supportRole ? [panel.supportRole] : []);
        const supportMentions = rolesArr.length > 0 ? rolesArr.map(r => `<@&${r}>`).join(' | ') : '@طاقم الدعم';

        const welcomeContainer = buildWelcomeContainer(panel, chName, { id: ticketId, claimerId: null, guildId: interaction.guildId, panelId: pid }, interaction.user.id);

        await ch.send({
            components: [welcomeContainer.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        });
        await interaction.editReply({ content: `<:Hastag:1516365641823551528> | تم إنشاء تذكرتك بنجاح: ${ch}` });

        if (isSupportAiActive && isGuildPremium(interaction.guildId)) {
            setTimeout(async () => {
                try {
                    await ch.sendTyping().catch(() => {});
                    const systemPrompt = `أنت "مساعد الدعم الفني الذكي" الخاص بسيرفر "${interaction.guild.name}".
 تلقيت للتو تذكرة جديدة تم فتحها بواسطة العضو <@${interaction.user.id}>.
 رحب بالعضو بحرارة بأسلوب أنيق ومباشر، واطلب منه كتابة تفاصيل استفساره أو طلبه لتقوم بإجابته أو ضبط وإعداد البوت له فوراً.`;
                    const greeting = await callGeminiAPI(systemPrompt, `العضو ${interaction.user.username} فتح تذكرة جديدة.`, [], interaction.guildId);
                    if (greeting) {
                        await ch.send(greeting).catch(() => {});
                    }
                } catch (e) {
                    console.error('Failed to send initial Support AI greeting:', e);
                }
            }, 1200);
        }
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('ticket_panel_select_')) {
        const val = interaction.values[0];
        if (val === 'reset') {
            await interaction.deferUpdate().catch(() => {});
            return;
        }

        await interaction.deferReply({ ephemeral: true });
        const pid = interaction.customId.substring('ticket_panel_select_'.length);
        const btnIdx = val.startsWith('btn_') ? val.split('_')[1] : 'default';

        ensureGuildData(interaction.guildId);
        let panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) {
            const tCfg = db[interaction.guildId]?.tickets || {};
            panel = {
                id: pid,
                title: tCfg.title || "🎫 قسم الدعم الفني والتذاكر",
                description: tCfg.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.",
                categoryId: tCfg.categoryId || null,
                roles: tCfg.supportRole ? [tCfg.supportRole] : [],
                buttons: [
                    { name: tCfg.btnLabel || 'فتح تذكرة', emoji: tCfg.btnEmoji || '📩', categoryId: tCfg.categoryId || null }
                ]
            };
            if (!db[interaction.guildId].panels) db[interaction.guildId].panels = {};
            db[interaction.guildId].panels[pid] = panel;
            saveDB(db);
        }
        if (!panel) return interaction.editReply({ content: '**<:No:1516534087161221233> | تعذر العثور على إعدادات هذا البانل.**' });

        const existingTickets = Object.values(db[interaction.guildId]?.tickets || {});
        const hasOpenTicket = existingTickets.some(t => t.creatorId === interaction.user.id && interaction.guild.channels.cache.has(t.id));
        if (hasOpenTicket) {
            return interaction.editReply({ content: '**<:No:1516534087161221233> | لا يمكنك فتح أكثر من تذكرة واحدة في نفس الوقت!**' });
        }

        db[interaction.guildId].counters = db[interaction.guildId].counters || {};
        const counterKey = `${pid}_${btnIdx}`;
        const highestInGuild = getHighestTicketNumberInGuild(interaction.guild);
        const currentVal = db[interaction.guildId].counters[counterKey] || 0;
        const count = Math.max(currentVal, highestInGuild) + 1;
        db[interaction.guildId].counters[counterKey] = count;
        const formattedCount = String(count).padStart(4, '0');
        const chName = `ticket-${formattedCount}`;

        const catId = resolveTicketCategory(panel, btnIdx, interaction.guild);

        const permissionOverwrites = [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [PermissionFlagsBits.ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
            },
            {
                id: client.user.id,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageChannels]
            }
        ];

        if (panel.roles && Array.isArray(panel.roles) && panel.roles.length > 0) {
            panel.roles.forEach(roleId => {
                if (roleId && typeof roleId === 'string' && roleId.length > 5) {
                    permissionOverwrites.push({
                        id: roleId,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
                    });
                }
            });
        }

        const createOptions = {
            name: chName,
            type: ChannelType.GuildText,
            permissionOverwrites
        };
        if (catId) {
            createOptions.parent = catId;
        }

        const ch = await interaction.guild.channels.create(createOptions).catch(err => {
            console.error('Failed to create ticket channel:', err);
            return null;
        });

        if (!ch) return interaction.editReply({ content: '**<:No:1516534087161221233> | فشل إنشاء قناة التذكرة، يرجى التأكد من صلاحيات البوت.**' });

        const ticketId = ch.id;
        if (!db[interaction.guildId].tickets) db[interaction.guildId].tickets = {};
        const isSupportAiActiveSelect = panel ? (panel.supportAiEnabled === true) : (db[interaction.guildId]?.supportAiPanelId === pid);
        db[interaction.guildId].tickets[ticketId] = {
            id: ticketId,
            creatorId: interaction.user.id,
            panelId: pid,
            claimerId: null,
            createdAt: Date.now(),
            guildId: interaction.guildId,
            ticketNum: formattedCount,
            supportAiEnabled: isSupportAiActiveSelect,
            lastAiActivity: Date.now(),
            aiRemindCount: 0
        };
        saveDB(db);

        const rolesArrSelect = (panel.roles && Array.isArray(panel.roles) && panel.roles.length > 0)
            ? panel.roles.filter(Boolean)
            : (panel.supportRole ? [panel.supportRole] : []);
        const supportMentionsSelect = rolesArrSelect.length > 0 ? rolesArrSelect.map(r => `<@&${r}>`).join(' | ') : '@طاقم الدعم';

        const welcomeContainerSelect = buildWelcomeContainer(panel, chName, { id: ticketId, claimerId: null, guildId: interaction.guildId, panelId: pid }, interaction.user.id);

        await ch.send({
            components: [welcomeContainerSelect.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        });
        await interaction.editReply({ content: `<:Hastag:1516365641823551528> | تم إنشاء تذكرتك بنجاح: ${ch}` });

        if (isSupportAiActiveSelect && isGuildPremium(interaction.guildId)) {
            setTimeout(async () => {
                try {
                    await ch.sendTyping().catch(() => {});
                    const systemPrompt = `أنت "مساعد الدعم الفني لـ NTL BOT" في سيرفر "${interaction.guild.name}".
 تلقيت للتو تذكرة جديدة تم فتحها بواسطة العضو <@${interaction.user.id}>.
 رحب بالعضو بحرارة بأسلوب أنيق ومباشر كـ "مساعد الدعم الفني لـ NTL BOT"، واطلب منه كتابة تفاصيل استفساره أو طلبه لتقوم بإجابته أو ضبط وإعداد البوت له فوراً.`;
                    const greeting = await callGeminiAPI(systemPrompt, `العضو ${interaction.user.username} فتح تذكرة جديدة.`, [], interaction.guildId);
                    if (greeting) {
                        await ch.send(greeting).catch(() => {});
                    }
                } catch (e) {
                    console.error('Failed to send initial Support AI greeting:', e);
                }
            }, 1200);
        }
    }

    if (interaction.isModalSubmit() && interaction.customId === 'submit_suggestion_modal') {
        await interaction.deferReply({ ephemeral: true });
        const text = interaction.fields.getTextInputValue('suggestion_text_input');
        try {
            const config = db[interaction.guildId]?.suggestions;
            if (!config || !config.channelId) return interaction.editReply({ content: '❌ نظام الاقتراحات غير مهيأ بالكامل.' });
            const ch = await interaction.guild.channels.fetch(config.channelId).catch(() => null);
            if (!ch) return interaction.editReply({ content: '❌ لم يتم العثور على روم الاقتراحات.' });
            let webhooks = await ch.fetchWebhooks();
            let wh = webhooks.find(w => w.owner.id === client.user.id);
            if (!wh) wh = await ch.createWebhook({ name: 'NTL Suggestions', avatar: client.user.displayAvatarURL() });
            const em = new EmbedBuilder().setColor('#2b2d31').setDescription(`**إقتراح <:PErson:1516382944510607511>: <@${interaction.user.id}>**\n-#  ~~                                                                                                                                                                   ~~\n\n${text}`);
            const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('publish_suggestion_prompt_btn').setLabel('نشر إقتراح').setEmoji('1517591602049056829').setStyle(ButtonStyle.Success), new ButtonBuilder().setEmoji('1517590248501022791').setURL('https://discord.gg/qZtbA27mH2').setStyle(ButtonStyle.Link));
            const msg = await wh.send({ username: interaction.user.username, avatarURL: interaction.user.displayAvatarURL({ dynamic: true }), embeds: [em], components: [row], wait: true });
            const thread = await msg.startThread({ name: `نقاش - اقتراح ${interaction.user.username}`, autoArchiveDuration: 1440 }).catch(()=>{});
            if (thread) {
                // Ensure everyone can speak (by default they can, but we can try to force it if restricted)
                await thread.members.add(interaction.user.id).catch(() => {});
            }
            await interaction.editReply({ content: '✅ تم إرسال اقتراحك ونشره بنجاح!' });
        } catch(e) { console.error(e); await interaction.editReply({ content: '❌ حدث خطأ أثناء إرسال الاقتراح.' }); }
        return;
    }

    if (interaction.isButton() && interaction.customId.startsWith('edit_texts_')) {
        const pid = interaction.customId.split('_')[2], p = db[interaction.guildId].panels[pid];
        const m = new ModalBuilder().setCustomId(`modal_edit_texts_${pid}`).setTitle('تعديل نصوص البانل');
        m.addComponents(
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('p_title').setLabel('العنوان الجديد').setStyle(TextInputStyle.Short).setValue(p.title).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('p_desc').setLabel('الوصف الجديد').setStyle(TextInputStyle.Paragraph).setValue(p.desc).setRequired(true)),
            new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('p_welcome').setLabel('رسالة الترحيب الجديدة').setStyle(TextInputStyle.Paragraph).setValue(p.welcome).setRequired(true))
        );
        await interaction.showModal(m);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_edit_texts_')) {
        const pid = interaction.customId.split('_')[3];
        db[interaction.guildId].panels[pid].title = interaction.fields.getTextInputValue('p_title');
        db[interaction.guildId].panels[pid].desc = interaction.fields.getTextInputValue('p_desc');
        db[interaction.guildId].panels[pid].welcome = interaction.fields.getTextInputValue('p_welcome');
        saveDB(db);
        await interaction.deferUpdate();
        await updatePanelEmbed(interaction, pid);
    }

    if (interaction.isButton() && interaction.customId.startsWith('edit_roles_')) {
        const pid = interaction.customId.split('_')[2];
        const rMenu = new RoleSelectMenuBuilder().setCustomId(`save_roles_${pid}`).setPlaceholder('اختر رتب الدعم الفني للبوت...').setMinValues(1).setMaxValues(10);
        const isEphem = db[interaction.guildId]?.setup_ephemeral ?? true;
        await interaction.reply({ content: '👤 **يرجى تحديد الرتب التي ينبغي أن تستلم التذاكر:**', components: [new ActionRowBuilder().addComponents(rMenu)], ephemeral: isEphem });
    }

    if (interaction.isRoleSelectMenu() && interaction.customId.startsWith('save_roles_')) {
        const pid = interaction.customId.split('_')[2];
        db[interaction.guildId].panels[pid].roles = interaction.values;
        saveDB(db);
        await interaction.deferUpdate();
        await updatePanelEmbed(interaction, pid);
    }

    if (interaction.isButton() && interaction.customId.startsWith('edit_images_')) {
        const pid = interaction.customId.split('_')[2];
        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`set_img_type_welcome_${pid}`).setLabel('للترحيب').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`set_img_type_panel_${pid}`).setLabel('لالبانل').setStyle(ButtonStyle.Primary)
        );
        await interaction.update({ content: '📸 **تعديل الصورة لأي إيمبد؟**', embeds: [], components: [r] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('set_img_type_')) {
        const parts = interaction.customId.split('_'), type = parts[3], pid = parts[4];
        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`save_img_src_guild_${pid}_${type}`).setLabel('صورة السيرفر').setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId(`save_img_src_upload_${pid}_${type}`).setLabel('صورة من الاستوديو').setStyle(ButtonStyle.Secondary)
        );
        await interaction.update({ content: '📥 **تريد استخدام صورة السيرفر أم صورة مخصصة؟**', components: [r] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('save_img_src_')) {
        const parts = interaction.customId.split('_'), src = parts[3], pid = parts[4], type = parts[5];
        if (src === 'guild') {
            const icon = interaction.guild.iconURL({ size: 1024 });
            if (!icon) return interaction.reply({ content: '❌ لا توجد صورة رمزية للسيرفر.', ephemeral: true });
            if (type === 'welcome') db[interaction.guildId].panels[pid].welcome_img = icon;
            else db[interaction.guildId].panels[pid].img = icon;
            saveDB(db);
            await interaction.deferUpdate();
            await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
        } else {
            activeStates.set(interaction.user.id, {
                type: 'upload_image',
                panelId: pid,
                imgType: type,
                messageId: interaction.message.id,
                channelId: interaction.channelId
            });
            await interaction.update({ content: '💬 **يرجى إرسال الصورة في هذا الشات ليقوم الكاميرا بمعاينتها وحفظها.**', components: [] });
        }
    }

    if (interaction.isButton() && interaction.customId.startsWith('edit_buttons_')) {
        const pid = interaction.customId.split('_')[2];
        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`btn_opt_add_${pid}`).setLabel('إضافة زر').setEmoji('1516365643379773490').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`btn_opt_remove_${pid}`).setLabel('إزالة زر').setEmoji('1516426882944467144').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId(`btn_opt_color_${pid}`).setLabel('تغيير لون الزر').setEmoji('🎨').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`edit_panel_display_${pid}`).setLabel('تحديد العرض للزر').setEmoji('1517268988873277571').setStyle(ButtonStyle.Secondary)
        );
        await interaction.update({ content: '🎛 *اختر تعديل أزرار الدعم بالتذاكر:*', embeds: [], components: [r] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('btn_opt_add_')) {
        const pid = interaction.customId.split('_')[3];
        const m = new ModalBuilder().setCustomId(`modal_add_btn_name_${pid}`).setTitle('إضافة زر جديد');
        m.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('btn_name').setLabel('اسم الزر الجديد').setStyle(TextInputStyle.Short).setRequired(true)));
        await interaction.showModal(m);
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_add_btn_name_')) {
        const pid = interaction.customId.split('_')[4], name = interaction.fields.getTextInputValue('btn_name');
        activeStates.set(interaction.user.id, { type: 'pending_button', panelId: pid, btnName: name });
        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`btn_emoji_choice_yes_${pid}`).setLabel('نعم').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`btn_emoji_choice_no_${pid}`).setLabel('لا').setStyle(ButtonStyle.Danger)
        );
        await interaction.reply({ content: `❓ هل تريد إرفاق إيموجي مخصص مضاف مع الزر **"${name}"**؟`, components: [r], ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId.startsWith('btn_emoji_choice_no_')) {
        const pid = interaction.customId.split('_')[4], st = activeStates.get(interaction.user.id);
        if (!st) return interaction.reply({ content: '❌ حدث خطأ، يرجى إعادة المحاولة.', ephemeral: true });
        const p = db[interaction.guildId].panels[pid];
        if (!p.buttons) p.buttons = [];
        p.buttons.push({ name: st.btnName, category: null, emoji: null });
        saveDB(db);
        activeStates.delete(interaction.user.id);
        await interaction.update({ content: `✅ تم إضافة الزر **"${st.btnName}"** بدون إيموجي بنجاح!`, components: [] });
        await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
    }

    if (interaction.isButton() && interaction.customId.startsWith('btn_emoji_choice_yes_')) {
        const pid = interaction.customId.split('_')[4], st = activeStates.get(interaction.user.id);
        if (!st) return interaction.reply({ content: '❌ حدث خطأ في معالجة الطلب.', ephemeral: true });
        st.type = 'upload_emoji'; activeStates.set(interaction.user.id, st);
        await interaction.update({ content: '💬 **يرجى إرسال الإيموجي المطلوب في الشات (إيموجي عادي أو مخصص من ديسكورد).**', components: [] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('select_btn_cat_')) {
        const pid = interaction.customId.split('_')[3];
        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) return interaction.reply({ content: '❌ تعذر العثور على البانل.', ephemeral: true });

        const select = new StringSelectMenuBuilder()
            .setCustomId(`select_btn_for_cat_${pid}`)
            .setPlaceholder('اختر الزر أو الإعداد الافتراضي لتحديد الكاتاجوري...');

        select.addOptions({
            label: 'التصنيف الافتراضي للبانل ككل',
            value: 'default',
            description: 'تحديد الكاتاجوري الافتراضي لكافة أزرار هذا البانل'
        });

        if (panel.buttons && panel.buttons.length > 0) {
            panel.buttons.forEach((b, idx) => {
                select.addOptions({
                    label: b.name,
                    value: String(idx),
                    description: `تحديد الكاتاجوري الخاص بزر: ${b.name}`
                });
            });
        }

        const row = new ActionRowBuilder().addComponents(select);
        return await interaction.reply({ 
            content: '📁 **يرجى تحديد الخيار المطلوب لتعديل الكاتاجوري الخاص به:**', 
            components: [row], 
            ephemeral: true 
        });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('select_btn_for_cat_')) {
        const pid = interaction.customId.split('_')[4];
        const btnIdx = interaction.values[0];

        const select = new ChannelSelectMenuBuilder()
            .setCustomId(`save_btn_cat_${pid}_${btnIdx}`)
            .setPlaceholder('اختر الكاتاجوري المخصص للتذاكر...')
            .addChannelTypes(ChannelType.GuildCategory);

        const row = new ActionRowBuilder().addComponents(select);
        return await interaction.update({ 
            content: '📁 **يرجى تحديد الكاتاجوري المطلوب من القائمة المنسدلة:**', 
            components: [row] 
        });
    }

    if (interaction.isChannelSelectMenu() && interaction.customId.startsWith('save_btn_cat_')) {
        const parts = interaction.customId.split('_');
        const pid = parts[3];
        const btnIdx = parts[4];
        const selectedId = interaction.values[0];

        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) return interaction.reply({ content: '❌ حدث خطأ، لم يتم العثور على البانل.', ephemeral: true });

        if (btnIdx === 'default') {
            panel.category = selectedId;
            if (panel.buttons && panel.buttons.length > 0) {
                panel.buttons.forEach(b => {
                    b.category = selectedId;
                });
            }
        } else {
            const idx = parseInt(btnIdx, 10);
            if (panel.buttons && panel.buttons[idx]) {
                panel.buttons[idx].category = selectedId;
            }
        }
        saveDB(db);

        await interaction.update({ content: '✅ تم ضبط كاتاجوري التذاكر بنجاح!', components: [] });
        await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
    }

    if (interaction.isButton() && interaction.customId.startsWith('btn_opt_remove_')) {
        const pid = interaction.customId.split('_')[3];
        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) return interaction.reply({ content: '❌ تعذر العثور على البانل.', ephemeral: true });
        
        if (!panel.buttons || panel.buttons.length === 0) {
            return interaction.reply({ content: '❌ **لا يوجد أي أزرار مضافة في هذا البانل لإزالتها!**', ephemeral: true });
        }
        
        const select = new StringSelectMenuBuilder()
            .setCustomId(`btn_remove_select_${pid}`)
            .setPlaceholder('اختر الزر المراد حذفه وإزالته...');
            
        panel.buttons.forEach((b, idx) => {
            select.addOptions({
                label: b.name,
                value: String(idx),
                description: `حذف الزر: ${b.name}`
            });
        });
        
        const row = new ActionRowBuilder().addComponents(select);
        await interaction.update({ content: '🗑️ **اختر الزر الذي تريد حذفه وإزالته نهائياً:**', components: [row] });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('btn_remove_select_')) {
        const pid = interaction.customId.split('_')[3];
        const btnIdx = parseInt(interaction.values[0], 10);
        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel || !panel.buttons) return interaction.reply({ content: '❌ حدث خطأ، لم يتم العثور على البانل أو الأزرار.', ephemeral: true });
        
        const removed = panel.buttons.splice(btnIdx, 1);
        saveDB(db);
        
        await interaction.update({ content: `✅ **تم إزالة وحذف الزر "${removed[0].name}" بنجاح!**`, components: [] });
        await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
    }

    if (interaction.isButton() && interaction.customId.startsWith('btn_opt_color_')) {
        const pid = interaction.customId.split('_')[3];
        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel) return interaction.reply({ content: '❌ تعذر العثور على البانل.', ephemeral: true });
        
        if (!panel.buttons || panel.buttons.length === 0) {
            return interaction.reply({ content: '❌ **لا يوجد أي أزرار مضافة في هذا البانل لتغيير لونها!**', ephemeral: true });
        }
        
        const select = new StringSelectMenuBuilder()
            .setCustomId(`btn_color_select_${pid}`)
            .setPlaceholder('اختر الزر المراد تغيير لونه...');
            
        panel.buttons.forEach((b, idx) => {
            select.addOptions({
                label: b.name,
                value: String(idx),
                description: `اللون الحالي: ${b.style || 'Primary (أزرق)'}`
            });
        });
        
        const row = new ActionRowBuilder().addComponents(select);
        await interaction.update({ content: '🎨 **اختر الزر الذي تريد تغيير لونه:**', components: [row] });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('btn_color_select_')) {
        const pid = interaction.customId.split('_')[3];
        const btnIdx = interaction.values[0];
        
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`set_btn_style_${pid}_${btnIdx}_Primary`).setLabel('أزرق (Primary)').setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`set_btn_style_${pid}_${btnIdx}_Success`).setLabel('أخضر (Success)').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`set_btn_style_${pid}_${btnIdx}_Danger`).setLabel('أحمر (Danger)').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId(`set_btn_style_${pid}_${btnIdx}_Secondary`).setLabel('رمادي (Secondary)').setStyle(ButtonStyle.Secondary)
        );
        
        await interaction.update({ content: '🎨 **اختر اللون الجديد للزر:**', components: [row] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('set_btn_style_')) {
        const parts = interaction.customId.split('_');
        const pid = parts[3];
        const btnIdx = parseInt(parts[4], 10);
        const style = parts[5];
        
        const panel = db[interaction.guildId]?.panels?.[pid];
        if (!panel || !panel.buttons || !panel.buttons[btnIdx]) return interaction.reply({ content: '❌ حدث خطأ، لم يتم العثور على الزر.', ephemeral: true });
        
        panel.buttons[btnIdx].style = style;
        saveDB(db);
        
        await interaction.update({ content: `✅ **تم تغيير لون الزر "${panel.buttons[btnIdx].name}" إلى (${style}) بنجاح!**`, components: [] });
        await updatePanelEmbed({ guildId: interaction.guildId, editReply: async d => { if (interaction.replied || interaction.deferred) return interaction.editReply(d).catch(()=>{}); else return interaction.reply({...d, fetchReply:true}).catch(()=>{}); }, replied: true }, pid);
    }

    // 1. Claim Button Handler
    if (interaction.isButton() && interaction.customId.startsWith('claim_') && !interaction.customId.startsWith('claim_accept_') && !interaction.customId.startsWith('claim_reject_') && !interaction.customId.startsWith('claim_request_')) {
        const tid = interaction.customId.split('_')[1];
        const { ticketInfo, panel, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك استلام تذكرتك الخاصة**`, ephemeral: true });
        }

        const isSupport = checkIsSupportMember(interaction.member, panel);
        const isAdmin = interaction.member.permissions && interaction.member.permissions.has(PermissionFlagsBits.Administrator);
        if (!isSupport && !isAdmin) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية استلام هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        const currentClaimer = ticketInfo.claimerId;
        
        if (!currentClaimer) {
            // First Claim -> Direct
            ticketInfo.claimerId = interaction.user.id;
            saveDB(localDb);
            await updateTicketWelcomeMessage(interaction.channel, ticketInfo, panel);

            const claimContainer = new ContainerBuilder()
                .setAccentColor(0x57f287)
                .addTextDisplayComponents(td => td.setContent(
                    `### <:claim:1516357850207879209> تم إستلام التذكرة\n` +
                    `-#  ~~                                                                                                                                                                   ~~\n` +
                    `• **مستلم التذكرة:** <@${interaction.user.id}>\n` +
                    `-#  ~~                                                                                                                                                                   ~~`
                ))
                .addActionRowComponents(actionRow => 
                    actionRow.setComponents(
                        new ButtonBuilder()
                            .setCustomId(`claim_${ticketInfo.id}`)
                            .setLabel('طلب إستلام')
                            .setEmoji('1516360207847129183')
                            .setStyle(ButtonStyle.Secondary)
                    )
                );

            return interaction.reply({
                components: [claimContainer.toJSON()],
                flags: [MessageFlags.IsComponentsV2]
            }).catch(() => {});
        } else if (currentClaimer === interaction.user.id) {
            // Unclaim
            ticketInfo.claimerId = null;
            saveDB(localDb);
            await updateTicketWelcomeMessage(interaction.channel, ticketInfo, panel);
            return interaction.reply({ content: '✅ **تم إلغاء استلام التذكرة بنجاح.**', ephemeral: true });
        } else {
            // Request Claim from current claimer
            const line = '-#  ~~                                                                                                                                                                   ~~';
            const requestText = `### <:Claimrequest:1516360207847129183> طلب إستلام تذكرة\n${line}\n• **المستلم الحالي:** <@${currentClaimer}>\n• **مقدم الطلب:** <@${interaction.user.id}>\n${line}`;

            const claimReqContainer = new ContainerBuilder()
                .setAccentColor(0x00d2ff)
                .addTextDisplayComponents(td => td.setContent(requestText))
                .addActionRowComponents(actionRow =>
                    actionRow.setComponents(
                        new ButtonBuilder()
                            .setCustomId(`claim_accept_${ticketInfo.id}_${interaction.user.id}`)
                            .setEmoji('1516534090751279257')
                            .setStyle(ButtonStyle.Success),
                        new ButtonBuilder()
                            .setCustomId(`claim_reject_${ticketInfo.id}_${interaction.user.id}`)
                            .setEmoji('1516534087161221233')
                            .setStyle(ButtonStyle.Danger)
                    )
                );

            await interaction.channel.send({
                components: [claimReqContainer.toJSON()],
                flags: [MessageFlags.IsComponentsV2]
            }).catch(() => {});

            return interaction.reply({ content: '✅ **تم إرسال طلب استلام التذكرة إلى المستلم الحالي بنجاح.**', ephemeral: true });
        }
    }

    // Claim Request Accept/Reject Handlers
    if (interaction.isButton() && (interaction.customId.startsWith('claim_accept_') || interaction.customId.startsWith('claim_reject_'))) {
        const isAccept = interaction.customId.startsWith('claim_accept_');
        const parts = interaction.customId.split('_');
        const tid = parts[2];
        const requesterId = parts[3];

        const { ticketInfo, panel, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const isCreator = ticketInfo.creatorId && interaction.user.id === ticketInfo.creatorId;
        const isCurrentClaimer = ticketInfo.claimerId && interaction.user.id === ticketInfo.claimerId;
        const isRequester = requesterId && interaction.user.id === requesterId;
        const isAdmin = interaction.member.permissions && interaction.member.permissions.has(PermissionFlagsBits.Administrator);

        // User requested: "الي يقبل فقط مستلم التذكرة" (Only the current claimer can accept)
        // If it was not claimed yet, then maybe owner? But now first claim is direct.
        // So this logic applies mostly for transfers.
        if (!isCurrentClaimer && !isAdmin) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | هذا الطلب مخصص لمستلم التذكرة الحالي للقبول أو الرفض.**', ephemeral: true });
        }

        const line = '-#  ~~                                                                                                                                                                   ~~';
        if (isAccept) {
            ticketInfo.claimerId = requesterId;
            saveDB(localDb);
            await updateTicketWelcomeMessage(interaction.channel, ticketInfo, panel);

            const acceptContainer = new ContainerBuilder()
                .setAccentColor(0x57f287)
                .addTextDisplayComponents(td => td.setContent(
                    `### <:claim:1516357850207879209> تم إستلام التذكرة\n` +
                    `${line}\n` +
                    `• **مستلم التذكرة الجديد:** <@${requesterId}>\n` +
                    `• **تمت الموافقة بواسطة:** <@${interaction.user.id}>\n` +
                    `${line}`
                ))
                .addActionRowComponents(actionRow => 
                    actionRow.setComponents(
                        new ButtonBuilder()
                            .setCustomId(`claim_${ticketInfo.id}`)
                            .setLabel('طلب إستلام')
                            .setEmoji('1516360207847129183')
                            .setStyle(ButtonStyle.Secondary)
                    )
                );

            await interaction.update({
                components: [acceptContainer.toJSON()],
                flags: [MessageFlags.IsComponentsV2]
            }).catch(() => {});
        } else {
            const rejectContainer = new ContainerBuilder()
                .setAccentColor(0xed4245)
                .addTextDisplayComponents(td => td.setContent(
                    `### <:No:1516534087161221233> تم رفض طلب استلام التذكرة\n${line}\n• **مقدم الطلب:** <@${requesterId}>\n• **تم الرفض بواسطة:** <@${interaction.user.id}>\n${line}`
                ));

            await interaction.update({
                components: [rejectContainer.toJSON()],
                flags: [MessageFlags.IsComponentsV2]
            }).catch(() => {});
        }
        return;
    }

    if (interaction.isButton() && interaction.customId.startsWith('claim_request_')) {
        const tid = interaction.customId.split('_')[2];
        const { ticketInfo, panel, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية استلام هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك استلام تذكرتك الخاصة**`, ephemeral: true });
        }

        if (ticketInfo.claimerId === interaction.user.id) {
            return interaction.reply({ content: '❌ أنت مستلم هذه التذكرة بالفعل!', ephemeral: true });
        }

        const line = '-#  ~~                                                                                                                                                                   ~~';
        const requestText = `### <:Claimrequest:1516360207847129183> طلب إستلام تذكرة\n${line}\n• **مستلم التذكرة:** ${ticketInfo.claimerId ? `<@${ticketInfo.claimerId}>` : 'لا أحد'}\n• **طلب الإستلام:** <@${interaction.user.id}>\n${line}`;

        const claimReqContainer = new ContainerBuilder()
            .setAccentColor(0x00d2ff)
            .addTextDisplayComponents(td => td.setContent(requestText))
            .addActionRowComponents(actionRow =>
                actionRow.setComponents(
                    new ButtonBuilder()
                        .setCustomId(`claim_accept_${ticketInfo.id}_${interaction.user.id}`)
                        .setEmoji('1516534090751279257')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId(`claim_reject_${ticketInfo.id}_${interaction.user.id}`)
                        .setEmoji('1516534087161221233')
                        .setStyle(ButtonStyle.Danger)
                )
            );

        await interaction.channel.send({
            components: [claimReqContainer.toJSON()],
            flags: [MessageFlags.IsComponentsV2]
        });

        await interaction.reply({ content: '✅ **تم إرسال طلب استلام التذكرة إلى صاحب التذكرة بنجاح.**', ephemeral: true });
    }

    // 2. Ticket Management Dropdown Handler
    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('ticket_mgmt_')) {
        const tid = interaction.customId.split('_')[2];
        const { ticketInfo, panel, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const val = interaction.values[0];

        if (val === 'reset') {
            await interaction.deferUpdate().catch(() => {});
            return;
        }

        if (val === 'review') {
            if (ticketInfo.creatorId && ticketInfo.creatorId !== interaction.user.id) {
                return interaction.reply({ content: '**<:No:1516534087161221233> | هذا الخيار مخصص فقط لصاحب التذكرة!**', ephemeral: true });
            }
            if (!ticketInfo.claimerId) {
                return interaction.reply({ content: '**<:No:1516534087161221233> | لا يمكنك تقييم التذكرة وهي غير مستلمة من أي إداري.**', ephemeral: true });
            }
            if (ticketInfo.reviewed) {
                return interaction.reply({ content: '**<:No:1516534087161221233> | لقد قمت بتقييم هذه التذكرة بالفعل مسبقاً!**', ephemeral: true });
            }

            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId(`submit_review_rating_${ticketInfo.id}`)
                .setPlaceholder('اختر تقييمك من 0 إلى 10...')
                .addOptions(
                    Array.from({ length: 11 }, (_, i) => ({
                        label: `${i}/10`,
                        value: String(i),
                        description: i >= 8 ? 'ممتاز جداً' : i >= 5 ? 'مقبول' : 'سيء جداً'
                    }))
                );

            const row = new ActionRowBuilder().addComponents(selectMenu);
            return interaction.reply({ content: '⭐️ **يرجى اختيار التقييم المناسب من القائمة:**', components: [row], ephemeral: true });
        }

        // Permission & Creator check
        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية لإدارة هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            if (val === 'add') {
                return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك إضافة شخص إلى التذكرة**`, ephemeral: true });
            }
            if (val === 'remove') {
                return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك إزالة شخص من التذكرة**`, ephemeral: true });
            }
            if (val === 'rename') {
                return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك تغيير اسم التذكرة**`, ephemeral: true });
            }
            if (val === 'summon') {
                return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك استدعاء نفسك**`, ephemeral: true });
            }
            if (val === 'reset') {
                return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك إعادة تعيين صلاحيات التذكرة**`, ephemeral: true });
            }
        }

        if (val === 'info') {
            if (ticketInfo.claimerId) {
                return interaction.reply({ content: `ℹ️ **التذكرة مستلمة بواسطة:** <@${ticketInfo.claimerId}>`, ephemeral: true });
            } else {
                return interaction.reply({ content: 'ℹ️ **هذه التذكرة غير مستلمة حتى الآن.**', ephemeral: true });
            }
        }

        if (val === 'add') {
            const userSelect = new UserSelectMenuBuilder()
                .setCustomId(`add_member_to_${ticketInfo.id}`)
                .setPlaceholder('اختر العضو المراد إضافته للتذكرة...');
            return interaction.reply({ content: '👤 **اختر العضو لإضافته إلى التذكرة:**', components: [new ActionRowBuilder().addComponents(userSelect)], ephemeral: true });
        }

        if (val === 'remove') {
            const userSelect = new UserSelectMenuBuilder()
                .setCustomId(`remove_member_from_${ticketInfo.id}`)
                .setPlaceholder('اختر العضو المراد إزالته من التذكرة...');
            return interaction.reply({ content: '👤 **اختر العضو لإزالته من التذكرة:**', components: [new ActionRowBuilder().addComponents(userSelect)], ephemeral: true });
        }

        if (val === 'summon') {
            // Summon Creator
            const guild = interaction.guild;
            const creator = ticketInfo.creatorId ? await guild.members.fetch(ticketInfo.creatorId).catch(() => null) : null;
            if (creator) {
                const ticketNumberStr = ticketInfo.ticketNum || (interaction.channel?.name ? (interaction.channel.name.match(/\d+/) ? interaction.channel.name.match(/\d+/)[0] : ticketInfo.id) : ticketInfo.id);
                const creatorDMEmbed = new EmbedBuilder()
                    .setColor('#00d2ff')
                    .setTitle(`__استدعاء من سيرفر ${guild.name}__`)
                    .setDescription(`**لقد تم استدعاؤك إلى تذكرتك المفتوحة في سيرفر ${guild.name}**\n\n` +
                                    `• **رقم التذكرة:** \`#${ticketNumberStr}\`\n` +
                                    `• **المستدعي:** <@${interaction.user.id}>\n\n` +
                                    `اضغط على الزر أدناه للانتقال السريع إلى التذكرة.`)
                    .setThumbnail(guild.iconURL({ dynamic: true }) || 'https://discord.com/assets/c09a8043c34371a301990a180ecac357.png');

                const dmRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('الانتقال إلى التذكرة')
                        .setURL(interaction.channel.url)
                        .setStyle(ButtonStyle.Link)
                );

                await creator.send({ embeds: [creatorDMEmbed], components: [dmRow] }).catch(() => {});
            }

            await interaction.reply({ content: `🔔 تم إرسال استدعاء لصاحب التذكرة في الخاص وقناة التذكرة بنجاح.`, ephemeral: true });
            
            // Log in the ticket channel with components v2
            await sendTicketActionLog(interaction.channel, interaction.user.id, 'summon');
            return;
        }

        if (val === 'rename') {
            const modal = new ModalBuilder().setCustomId(`rename_modal_${ticketInfo.id}`).setTitle('تعديل اسم التذكرة');
            modal.addComponents(new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('new_name')
                    .setLabel('اسم التذكرة الجديد')
                    .setValue(interaction.channel.name)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true)
            ));
            return interaction.showModal(modal);
        }


    }

    // 3. User Select Menu - Add Member
    if (interaction.isUserSelectMenu() && interaction.customId.startsWith('add_member_to_')) {
        const tid = interaction.customId.split('_')[3];
        const { ticketInfo, panel } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية لإدارة هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك إضافة شخص إلى التذكرة**`, ephemeral: true });
        }

        const targetUserId = interaction.values[0];

        if (targetUserId === interaction.user.id) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | لا يمكنك إضافة نفسك إلى التذكرة!**', ephemeral: true });
        }

        await interaction.channel.permissionOverwrites.edit(targetUserId, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true,
            AttachFiles: true,
            EmbedLinks: true
        });
        await interaction.reply({ content: `✅ تم إضافة العضو <@${targetUserId}> إلى التذكرة بنجاح!`, ephemeral: true });

        await sendTicketActionLog(interaction.channel, interaction.user.id, 'add', { targetUserId });
    }

    // 4. User Select Menu - Remove Member
    if (interaction.isUserSelectMenu() && interaction.customId.startsWith('remove_member_from_')) {
        const tid = interaction.customId.split('_')[3];
        const { ticketInfo, panel } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية لإدارة هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك إزالة صاحب التذكرة**`, ephemeral: true });
        }

        const targetUserId = interaction.values[0];

        if (targetUserId === interaction.user.id) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | لا يمكنك إزالة نفسك من التذكرة!**', ephemeral: true });
        }

        await interaction.channel.permissionOverwrites.delete(targetUserId).catch(() => {
            return interaction.channel.permissionOverwrites.edit(targetUserId, { ViewChannel: false });
        });
        await interaction.reply({ content: `✅ تم إزالة العضو <@${targetUserId}> من التذكرة بنجاح!`, ephemeral: true });

        await sendTicketActionLog(interaction.channel, interaction.user.id, 'remove', { targetUserId });
    }

    // 5. View Transcript Button Handler (Works in DM or Guild)
    if (interaction.isButton() && interaction.customId.startsWith('view_transcript_')) {
        const parts = interaction.customId.split('_');
        const gid = parts[2];
        const tid = parts[3];
        
        const localDb = getDB();
        const ticketInfo = localDb[gid]?.tickets?.[tid];
        if (!ticketInfo) {
            return interaction.reply({ content: '❌ تعذر العثور على سجل هذه التذكرة أو أنه قد تم حذفه.', ephemeral: true });
        }
        
        const ticketNumberStr = ticketInfo.ticketNum || tid;
        const channelName = `ticket-${ticketNumberStr}`;
        const htmlContent = generateTranscriptHTML(ticketInfo, channelName);
        
        await interaction.reply({
            files: [new AttachmentBuilder(Buffer.from(htmlContent), { name: `${channelName}.html` })],
            ephemeral: true
        });
    }

    if (interaction.isButton() && interaction.customId.startsWith('delete_req_')) {
        const tid = interaction.customId.split('_')[2];
        
        try {
            const msgs = await interaction.channel.messages.fetch({ limit: 50 });
            const oldConf = msgs.filter(m => m.author.id === client.user.id && m.embeds.some(e => e.description && e.description.includes('هل أنت متأكد من حذف هذه التذكرة')));
            for (const m of oldConf.values()) {
                await m.delete().catch(() => {});
            }
        } catch (e) {
            console.error('Error deleting old delete confirmation:', e);
        }

        const r = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`del_confirm_${tid}`).setEmoji('1516534090751279257').setStyle(ButtonStyle.Success), 
            new ButtonBuilder().setCustomId('del_cancel').setEmoji('1516534087161221233').setStyle(ButtonStyle.Danger)
        );
        
        await interaction.reply({ 
            content: `<@${interaction.user.id}>`, 
            embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`<:dLete:1516357693328330782> | هل أنت متأكد من حذف هذه التذكرة؟`)], 
            components: [r] 
        }).catch(async () => {
            await interaction.channel.send({
                content: `<@${interaction.user.id}>`, 
                embeds: [new EmbedBuilder().setColor('#ff0000').setDescription(`<:dLete:1516357693328330782> | هل أنت متأكد من حذف هذه التذكرة؟`)], 
                components: [r]
            });
        });
    }

    if (interaction.isButton() && interaction.customId.startsWith('del_confirm_')) {
        await interaction.deferUpdate().catch(() => {});
        const tid = interaction.customId.split('_')[2];
        const { ticketInfo, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        
        if (ticketInfo) {
            const creatorId = ticketInfo.creatorId;
            const claimerId = ticketInfo.claimerId;
            const createdAt = ticketInfo.createdAt;
            const closedAt = Date.now();
            const closerId = interaction.user.id;
            
            // Count ticket for staff claimer (if still claimed when closed)
            if (claimerId && !ticketInfo.counted) {
                ticketInfo.counted = true;
                if (!localDb[interaction.guildId]) localDb[interaction.guildId] = {};
                if (!localDb[interaction.guildId].staffTickets) localDb[interaction.guildId].staffTickets = {};
                localDb[interaction.guildId].staffTickets[claimerId] = (localDb[interaction.guildId].staffTickets[claimerId] || 0) + 1;
                saveDB(localDb);
            }
            
            const ticketNumberStr = ticketInfo.ticketNum || (interaction.channel?.name ? (interaction.channel.name.match(/\d+/) ? interaction.channel.name.match(/\d+/)[0] : tid) : tid);
            const channelName = `ticket-${ticketNumberStr}`;
            
            const separatorLine = '-#  ~~                                                                                                                                                                   ~~';
            const embedDesc = `تم فتح التذكرة بواسطة <:PErson:1516382944510607511> :\n<@${creatorId}>\n${separatorLine}\nمستلم التذكرة <:claim:1516357850207879209> :\n${claimerId ? `<@${claimerId}>` : 'لا أحد'}\n${separatorLine}\nتم إغلاق التذكرة بواسطة <:dLete:1516357693328330782> :\n<@${closerId}>\n${separatorLine}\nوقت إنشاء التذكرة <:time:1525620369879339168> :\n<t:${Math.floor(createdAt / 1000)}:F>\n${separatorLine}\nوقت إغلاق التذكرة <:time:1525620369879339168> :\n<t:${Math.floor(closedAt / 1000)}:F>`;
            
            let files = [];
            const fs = require('fs');
            const scrollImagePath = path.join(process.cwd(), 'src/assets/images/ticket_scroll_1783845727490.jpg');
            if (fs.existsSync(scrollImagePath)) {
                const fileBuffer = fs.readFileSync(scrollImagePath);
                files.push(new AttachmentBuilder(fileBuffer, { name: 'ticket_scroll.jpg' }));
            }
            
            // Generate transcript and attach it directly as a file
            const htmlContent = generateTranscriptHTML(ticketInfo, channelName);
            const transcriptFileName = `ticket-${ticketNumberStr}.html`;
            files.push(new AttachmentBuilder(Buffer.from(htmlContent), { name: transcriptFileName }));
            
            const dmEmbed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle(`تفاصيل غلق التذكرة | ${channelName}`)
                .setDescription(embedDesc);
                
            if (fs.existsSync(scrollImagePath)) {
                dmEmbed.setImage('attachment://ticket_scroll.jpg');
            }
            
            const creator = await interaction.guild.members.fetch(creatorId).catch(() => null);
            if (creator) {
                await creator.send({ embeds: [dmEmbed], files }).catch(err => {
                    console.error('Failed to send DM to ticket creator:', err);
                });
            }

            const panel = db[interaction.guildId]?.panels?.[ticketInfo.panelId];
            if (panel && panel.logChannelId) {
                const logChannel = await interaction.guild.channels.fetch(panel.logChannelId).catch(() => null);
                if (logChannel) {
                    let logFiles = [...files]; // Send the same attachment array (including the transcript)
                    await logChannel.send({ embeds: [dmEmbed], files: logFiles }).catch(err => {
                        console.error('Failed to send log to log channel:', err);
                    });
                }
            }
        }

        await interaction.editReply({ content: 'سيتم حذف التذكرة خلال عشر ثواني...', embeds: [], components: [] }).catch(() => {});
        setTimeout(() => interaction.channel.delete().catch(()=>{}), 10000);
    }

    if (interaction.isButton() && interaction.customId === 'del_cancel') await interaction.message.delete().catch(()=>{});

    if (interaction.isModalSubmit() && interaction.customId.startsWith('rename_modal_')) {
        const tid = interaction.customId.split('_')[2];
        const { ticketInfo, panel } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '❌ تعذر العثور على معلومات هذه التذكرة.', ephemeral: true });

        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '❌ ليس لديك صلاحية لتعديل اسم هذه التذكرة.', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك تغيير اسم التذكرة**`, ephemeral: true });
        }

        const newName = interaction.fields.getTextInputValue('new_name');
        await interaction.channel.setName(newName);
        await interaction.reply({ content: `تم تعديل الاسم للروم بنجاح!`, ephemeral: true });

        await sendTicketActionLog(interaction.channel, interaction.user.id, 'rename', { newName });
    }
});

async function renderPanelAiConfig(interaction, panelId) {
    ensureGuildData(interaction.guildId);
    const db = getDB();
    const panel = db[interaction.guildId]?.panels?.[panelId];
    if (!panel) {
        const replyObj = { content: '❌ **تعذر العثور على بانل التذاكر المحدد.**', ephemeral: true };
        if (interaction.replied || interaction.deferred) return await interaction.followUp(replyObj).catch(() => {});
        return await interaction.reply(replyObj).catch(() => {});
    }

    const isAiEnabled = panel.supportAiEnabled === true;
    const personality = panel.aiPersonality || 'افتراضي (مساعد دمث ولبيق لـ NTL BOT)';
    const instructions = panel.aiInstructions || 'لا توجد تعليمات مخصصة';

    const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(`🤖 إعدادات الذكاء الاصطناعي لـ: ${panel.name || panel.title || panelId}`)
        .setDescription(
            `**حالة الذكاء الاصطناعي للتذكرة:** ${isAiEnabled ? 'مفعل ✅' : 'معطل ❌'}\n` +
            `-#  ~~                                                                                                                                                                  ~~\n` +
            `**شخصية وطريقة كلام المساعد:**\n${personality}\n` +
            `-#  ~~                                                                                                                                                                  ~~\n` +
            `**تعليمات وقواعد التذكرة التدريبية:**\n${instructions}`
        );

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`ticket_ai_toggle_${panelId}`)
            .setLabel(isAiEnabled ? 'تعطيل الذكاء للبانل' : 'تفعيل الذكاء للبانل')
            .setEmoji(isAiEnabled ? '🛑' : '✅')
            .setStyle(isAiEnabled ? ButtonStyle.Danger : ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId(`ticket_ai_train_${panelId}`)
            .setLabel('تدريب الذكاء الخاص بالتذكرة')
            .setEmoji('🧠')
            .setStyle(ButtonStyle.Primary)
    );

    try {
        if (interaction.deferred || interaction.replied) {
            return await interaction.editReply({ content: '', embeds: [embed], components: [row] }).catch(() => {});
        } else if (interaction.isStringSelectMenu() || interaction.isButton()) {
            return await interaction.update({ content: '', embeds: [embed], components: [row] }).catch(() => {});
        } else {
            return await interaction.reply({ content: '', embeds: [embed], components: [row], ephemeral: true }).catch(() => {});
        }
    } catch (err) {
        console.error('Error in renderPanelAiConfig:', err);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch(() => {});
        } else {
            await interaction.followUp({ embeds: [embed], components: [row], ephemeral: true }).catch(() => {});
        }
    }
}

async function performAutoTraining(guild) {
    let trainingText = `اسم السيرفر: ${guild.name} (ID: ${guild.id})\n`;
    trainingText += `مالك السيرفر (Owner ID): ${guild.ownerId}\n`;
    trainingText += `إجمالي الأعضاء: ${guild.memberCount}\n\n`;

    const roles = Array.from(guild.roles.cache.values())
        .filter(r => r.name !== '@everyone')
        .slice(0, 30)
        .map(r => `@${r.name} (ID: ${r.id} - أدمين: ${r.permissions.has(PermissionFlagsBits.Administrator) ? 'نعم' : 'لا'})`)
        .join('\n');
    trainingText += `الرتب المتاحة وصلاحياتها:\n${roles}\n\n`;

    const channels = Array.from(guild.channels.cache.values())
        .slice(0, 40)
        .map(c => `#${c.name} (ID: ${c.id})`)
        .join('\n');
    trainingText += `قنوات ورومات السيرفر:\n${channels}\n`;

    return trainingText;
}

function cleanAiResponseOutput(rawResponse, guild) {
    if (!rawResponse) return { cleanText: '', actions: [], reactions: [] };

    let text = rawResponse;

    // 1. Extract actions
    const actions = [];
    const actionRegex = /\[ACTION:\s*([^\]]+)\]/gi;
    let match;
    while ((match = actionRegex.exec(rawResponse)) !== null) {
        actions.push(match[1].trim());
    }
    text = text.replace(/\[ACTION[^\]]*\]/gi, '').trim();

    // 2. Extract reactions
    const reactions = [];
    const reactionRegex = /\[REACT(?:ION)?(?::\s*([^\]]+))?\]/gi;
    let rMatch;
    while ((rMatch = reactionRegex.exec(rawResponse)) !== null) {
        if (rMatch[1] && rMatch[1].trim()) {
            reactions.push(rMatch[1].trim());
        }
    }
    text = text.replace(/\[REACT(?:ION)?[^\]]*\]/gi, '').trim();

    // Clean up empty tags or leftover tags
    text = text.replace(/\[ACTION\]/gi, '');
    text = text.replace(/\[REACTION\]/gi, '');
    text = text.replace(/\[REACT\]/gi, '');

    // 3. Remove unknown-user or undefined mentions
    text = text.replace(/<@!?unknown-user>/gi, '');
    text = text.replace(/@unknown-user/gi, '');
    text = text.replace(/<@!?undefined>/gi, '');
    text = text.replace(/@undefined/gi, '');

    // 4. Strip hallucinated emoji tokens
    text = text.replace(/\bemoji_\d+\b/gi, '');

    // 5. Filter custom Discord emojis against cache
    if (guild && guild.emojis) {
        text = text.replace(/<(a)?:(\w+):(\d+)>/g, (fullMatch, isAnimated, emojiName, emojiId) => {
            const existsInGuild = guild.emojis.cache.has(emojiId);
            const existsInClient = global.discordClient?.emojis?.cache?.has(emojiId);
            return (existsInGuild || existsInClient) ? fullMatch : '';
        });
    } else {
        text = text.replace(/<a?:\w+:\d+>/g, '');
    }

    // 6. Clean up broken or leftover emoji syntax fragments
    text = text.replace(/<a?:\w+(?::\d+)?(?!>)/g, '');
    text = text.replace(/<a?:\w*$/g, '');
    text = text.replace(/<a?::\d+>/g, '');
    text = text.replace(/<:\w+:\s*>/g, '');
    text = text.replace(/<:\d+>/g, '');
    text = text.replace(/<\d+>/g, '');
    text = text.replace(/(?:\b|\s)\d+>/g, '');

    // 7. Strip echoed headers/history lines
    text = text.replace(/^(?:سجل الحوار[^\n]*|آخر دردشة[^\n]*|سجل المحادثة[^\n]*|الرسالة الجديدة من العضو[^\n]*|سياق الرسائل[^\n]*)\n?/gmi, '');
    text = text.replace(/^(?:•|-|\*)\s*(?:أنت|العضو|\w+)\s*\([^)]*\)\s*:\s*/gmi, '');
    text = text.replace(/^(?:أنت|\w+)\s*\((?:NTL BOT|البوت|أنتم|المساعد الذكي)\)\s*:\s*/gmi, '');
    text = text.replace(/^(?:أنت|البوت|العضو)\s*:\s*/gmi, '');

    if (text.includes('الرسالة الجديدة من العضو') || text.includes('سجل الحوار في التذكرة') || text.includes('آخر دردشة في هذا الروم')) {
        const parts = text.split(/(?:الرسالة الجديدة من العضو|سجل الحوار في التذكرة|آخر دردشة في هذا الروم)[^\n]*\n?/i);
        text = parts[parts.length - 1];
    }

    text = text.replace(/\n{3,}/g, '\n\n').trim();

    return { cleanText: text, actions, reactions };
}

async function applyReactionToMessage(message, reactionEmoji) {
    if (!message || !reactionEmoji) return;
    try {
        let emojiToReact = reactionEmoji;
        if (reactionEmoji.includes(':')) {
            const idMatch = reactionEmoji.match(/:(\d+)>/);
            if (idMatch) emojiToReact = idMatch[1];
        } else {
            const foundEmoji = message.guild?.emojis?.cache?.find(e => e.name === reactionEmoji || e.id === reactionEmoji);
            if (foundEmoji) emojiToReact = foundEmoji.id;
        }
        await message.react(emojiToReact).catch(() => {});
    } catch (e) {
        console.error('Failed to react to message:', e);
    }
}

function buildAISystemPrompt(guild, aiConfig, isAdmin) {
    let prompt = `أنت مساعد ذكي، طبيعي جداً، عفوي ومباشر. تحدث كإنسان حقيقي وبراحتك تماماً.\n`;
    prompt += `اسمك الحالي: "${aiConfig.name || 'NTL Bot'}".\n\n`;
    
    prompt += `[قواعد حاسمة وإلزامية في الأسلوب وطريقة الكلام - التزام صارم]:\n`;
    prompt += `1. **تكلم بلهجة "مكس" (سعودي، شامي، عراقي)**: تكلم بلهجة عامية بحتة ومزيج من هذه اللهجات الثلاث. استخدم كلمات شعبية ما يعرفها إلا "ولاد البلد" (مثل: وش دعوة، شكو ماكو، شو القصة، يا بعد حيي، عيوني أنت، لسا، هيك، يا زلمة).\n`;
    prompt += `2. **منع الفصحى منعاً باتاً**: يمنع منعاً باتاً استخدام أي كلمة باللغة العربية الفصحى أو الكلمات "المثقفة" الزائدة. تحدث بأسلوب شوارعي نظيف وعفوي جداً.\n`;
    prompt += `3. **الاختصار الذكي (سطر إلى 3 أسطر)**: اجعل ردودك مختصرة ومفيدة جداً. اكتفِ بالشرح في سطر أو سطرين، وبحد أقصى 3 أسطر فقط. لا تطل الكلام أبداً.\n`;
    prompt += `4. **استخدام الإيموجيات**: استعمل الإيموجيات (العادية أو الخاصة بالسيرفر) بشكل طبيعي وجذاب في ثنايا كلامك لإضفاء روح على المحادثة.\n`;
    prompt += `5. **الدخول في صلب الموضوع**: أجب مباشرة وبدون مقدمات رسمية مملة أو تحيات مكررة.\n`;
    
    if (!aiConfig.trainingType) {
        prompt += `6. تتحدث بأسلوب "مكس" عامي عراقي وسعودي وشامي، سريع البديهة وبدون رسميات.\n\n`;
    } else if (aiConfig.trainingType === 'manual') {
        prompt += `[الشخصية والتعليمات المحددة يدوياً]:\n${aiConfig.personality || 'شخص ذكي، طبيعي، عفوي ومفيد.'}\n\n`;
        if (aiConfig.customInstructions) {
            prompt += `[التعليمات الخاصة]:\n${aiConfig.customInstructions}\n\n`;
        }
    } else {
        prompt += `3. تتحدث بأسلوب "مكس" عامي عراقي وسعودي وشامي.\n\n`;
    }

    prompt += `استخدام الإيموجيات والرياكشن:\n`;
    prompt += `1. يمكنك التفاعل بوضع رياكشن بالرموز التعبيرية على رسالة العضو بإضافة هذا السطر تماماً في نهاية رسالتك: [REACTION: ايموجي] (مثال: [REACTION: 👍] أو [REACTION: 😂]).\n`;

    if (guild.emojis && guild.emojis.cache.size > 0) {
        prompt += `2. إيموجيات السيرفر المتاحة:\n`;
        guild.emojis.cache.first(25).forEach(e => {
            prompt += `- <:${e.name}:${e.id}>\n`;
        });
        prompt += `\n`;
    }

    if (aiConfig.knowledge && aiConfig.knowledge.length > 0) {
        prompt += `معلومات خاصة بالسيرفر تلتزم بها:\n`;
        aiConfig.knowledge.forEach((k, idx) => {
            prompt += `${idx + 1}. ${k}\n`;
        });
        prompt += `\n`;
    }
    
    if (isAdmin) {
        prompt += `المستخدم الحالي هو مسؤول (Administrator) في السيرفر.\n`;
        prompt += `إذا طلب منك إجراءً إدارياً، نفذه واكتب كود الإجراء في نهاية ردك:\n`;
        prompt += `- [ACTION: GIVE_ROLE user:"USER_ID_OR_NAME" role:"ROLE_ID_OR_NAME"]\n`;
        prompt += `- [ACTION: REMOVE_ROLE user:"USER_ID_OR_NAME" role:"ROLE_ID_OR_NAME"]\n`;
        prompt += `- [ACTION: HIDE_CHANNEL] / [ACTION: SHOW_CHANNEL]\n`;
        prompt += `- [ACTION: CREATE_CHANNEL name:"اسم القناة"]\n`;
        prompt += `- [ACTION: DELETE_CHANNEL name:"اسم القناة"]\n`;
        prompt += `- [ACTION: CREATE_ROLE name:"اسم الرتبة"]\n`;
        prompt += `- [ACTION: DELETE_ROLE name:"اسم الرتبة"]\n\n`;
    }
    
    prompt += `قواعد عامة حاسمة:\n`;
    prompt += `1. يمنع منشن الجميع (@everyone / @here) مطلقاً.\n`;
    prompt += `2. يمنع منعاً باتاً طباعة سياق الدردشة أو عناوين التنسيق الداخلي. أرسل ردك المباشر والنهائي فقط.\n\n`;
    
    return prompt;
}

function httpRequest(url, options, postData) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });
        req.on('error', (e) => reject(e));
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}

async function extractImagePartsFromMessage(message) {
    const parts = [];
    if (!message || !message.attachments || message.attachments.size === 0) return parts;
    const axios = require('axios');
    for (const [, att] of message.attachments) {
        const contentType = att.contentType || '';
        const url = att.url || '';
        if (contentType.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(url)) {
            try {
                const res = await axios.get(url, { responseType: 'arraybuffer' });
                const base64 = Buffer.from(res.data).toString('base64');
                parts.push({
                    inlineData: {
                        mimeType: contentType || 'image/png',
                        data: base64
                    }
                });
            } catch (err) {
                console.error('Failed to download image attachment for AI:', err);
            }
        }
    }
    return parts;
}

async function deployTicketPanel(guild, targetChannelId, roleIds = [], title = 'نظام تذاكر الدعم الفني', desc = 'اضغط على القائمة المنسدلة أدناه لفتح تذكرة جديدة والتواصل مع فريق الدعم الفني.') {
    ensureGuildData(guild.id);
    const db = getDB();
    if (!db[guild.id].panels) db[guild.id].panels = {};

    const targetChan = guild.channels.cache.get(targetChannelId) || await guild.channels.fetch(targetChannelId).catch(() => null);
    if (!targetChan) throw new Error(`لم يتم العثور على القناة المحددة (${targetChannelId}) في السيرفر.`);

    const pid = `panel_ai_${Date.now()}`;
    const panelObj = {
        id: pid,
        name: title,
        title: title,
        desc: desc,
        welcome: 'أهلاً بك في تذكرة الدعم الفني! يرجى كتابة استفسارك أو طلبك وستتم إجابتك فوراً.',
        displayType: 'select',
        roles: roleIds.length > 0 ? roleIds : [],
        buttons: [{ name: 'دعم فني', category: targetChan.parentId || null, emoji: null }]
    };

    db[guild.id].panels[pid] = panelObj;
    db[guild.id].supportAiPanelId = pid;
    saveDB(db);

    const embed = new EmbedBuilder()
        .setColor('#2b2d31')
        .setTitle(panelObj.title)
        .setDescription(panelObj.desc);

    const menu = new StringSelectMenuBuilder()
        .setCustomId(`ticket_panel_select_${pid}`)
        .setPlaceholder('اختر نوع التذكرة لفتحها...')
        .addOptions([
            { label: 'دعم فني', value: 'btn_0' },
            { label: 'إعادة ضبط (Reset)', value: 'reset', emoji: '1516390093504385074' }
        ]);

    const row = new ActionRowBuilder().addComponents(menu);
    const sentMsg = await targetChan.send({ embeds: [embed], components: [row] });

    panelObj.channelId = targetChan.id;
    panelObj.messageId = sentMsg.id;
    saveDB(db);

    return { panelId: pid, channel: targetChan };
}

async function executeSupportAiAction(action, guild, channel, author) {
    const findTargetMember = async (g, query) => {
        if (!query) return null;
        const cleanQuery = query.replace(/[<@!>]/g, '').trim();
        if (/^\d+$/.test(cleanQuery)) {
            const m = await g.members.fetch(cleanQuery).catch(() => null);
            if (m) return m;
        }
        return g.members.cache.find(m => 
            m.user.username.toLowerCase() === cleanQuery.toLowerCase() ||
            m.displayName.toLowerCase() === cleanQuery.toLowerCase()
        ) || null;
    };

    const findTargetRole = (g, query) => {
        if (!query) return null;
        const cleanQuery = query.replace(/[<@&>]/g, '').trim();
        if (/^\d+$/.test(cleanQuery)) {
            const r = g.roles.cache.get(cleanQuery);
            if (r) return r;
        }
        return g.roles.cache.find(r => 
            r.name.toLowerCase() === cleanQuery.toLowerCase() ||
            r.id === cleanQuery
        ) || null;
    };

    if (action === 'HIDE_CHANNEL' || action === 'LOCK_CHANNEL') {
        const everyone = guild.roles.everyone;
        await channel.permissionOverwrites.edit(everyone, { ViewChannel: false, SendMessages: false }).catch(console.error);
    } else if (action === 'SHOW_CHANNEL' || action === 'UNLOCK_CHANNEL') {
        const everyone = guild.roles.everyone;
        await channel.permissionOverwrites.edit(everyone, { ViewChannel: true, SendMessages: true }).catch(console.error);
    } else if (action.startsWith('GIVE_ROLE')) {
        const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
        const rMatch = action.match(/role:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/role:\s*(\S+)/);
        const uQ = uMatch ? uMatch[1] : null;
        const rQ = rMatch ? rMatch[1] : null;
        if (uQ && rQ) {
            const member = await findTargetMember(guild, uQ);
            const role = findTargetRole(guild, rQ);
            if (member && role) await member.roles.add(role).catch(console.error);
        }
    } else if (action.startsWith('REMOVE_ROLE')) {
        const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
        const rMatch = action.match(/role:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/role:\s*(\S+)/);
        const uQ = uMatch ? uMatch[1] : null;
        const rQ = rMatch ? rMatch[1] : null;
        if (uQ && rQ) {
            const member = await findTargetMember(guild, uQ);
            const role = findTargetRole(guild, rQ);
            if (member && role) await member.roles.remove(role).catch(console.error);
        }
    } else if (action.startsWith('CREATE_CHANNEL')) {
        const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
        if (nMatch) {
            await guild.channels.create({ name: nMatch[1], type: ChannelType.GuildText }).catch(console.error);
        }
    } else if (action.startsWith('DELETE_CHANNEL')) {
        const nMatch = action.match(/name:\s*["']?([^"']+)["']?/) || action.match(/channel:\s*["']?([^"']+)["']?/);
        if (nMatch) {
            const chIdentifier = nMatch[1];
            const targetChannel = guild.channels.cache.find(c => c.name.toLowerCase() === chIdentifier.toLowerCase() || c.id === chIdentifier);
            if (targetChannel) await targetChannel.delete().catch(console.error);
        }
    } else if (action.startsWith('CREATE_ROLE')) {
        const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
        if (nMatch) {
            await guild.roles.create({ name: nMatch[1] }).catch(console.error);
        }
    } else if (action.startsWith('DELETE_ROLE')) {
        const nMatch = action.match(/name:\s*["']?([^"']+)["']?/);
        if (nMatch) {
            const targetRole = findTargetRole(guild, nMatch[1]);
            if (targetRole) await targetRole.delete().catch(console.error);
        }
    } else if (action.startsWith('MUTE_USER')) {
        const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
        const dMatch = action.match(/duration:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/time:\s*(\S+)/);
        if (uMatch) {
            const member = await findTargetMember(guild, uMatch[1]);
            const durMinutes = dMatch ? parseInt(dMatch[1], 10) : 10;
            if (member && member.moderatable) {
                await member.timeout(durMinutes * 60 * 1000, 'Support AI Timeout').catch(console.error);
            }
        }
    } else if (action.startsWith('BAN_USER')) {
        const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
        if (uMatch) {
            const member = await findTargetMember(guild, uMatch[1]);
            if (member && member.bannable) {
                await member.ban({ reason: 'Support AI Ban' }).catch(console.error);
            }
        }
    } else if (action.startsWith('KICK_USER')) {
        const uMatch = action.match(/user:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/user:\s*(\S+)/);
        if (uMatch) {
            const member = await findTargetMember(guild, uMatch[1]);
            if (member && member.kickable) {
                await member.kick('Support AI Kick').catch(console.error);
            }
        }
    } else if (action.startsWith('CLEAR_MESSAGES')) {
        const cMatch = action.match(/count:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/(\d+)/);
        const count = cMatch ? Math.min(parseInt(cMatch[1], 10), 100) : 10;
        await channel.bulkDelete(count, true).catch(console.error);
    } else if (action.startsWith('CREATE_TICKET_PANEL') || action.startsWith('SETUP_TICKET') || action.startsWith('SETUP_TICKETS')) {
        const cMatch = action.match(/channel:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/channelId:\s*["']?([^"'\s,\]]+)["']?/);
        const rMatch = action.match(/role:\s*["']?([^"'\s,\]]+)["']?/) || action.match(/roleId:\s*["']?([^"'\s,\]]+)["']?/);
        const tMatch = action.match(/title:\s*["']?([^"']+)["']?/);
        const gMatch = action.match(/guild:\s*["']?([^"'\s,\]]+)["']?/);

        const targetGuildId = gMatch ? gMatch[1] : guild.id;
        const targetGuild = global.discordClient?.guilds?.cache?.get(targetGuildId) || guild;
        const targetChanId = cMatch ? cMatch[1] : channel.id;
        const roleId = rMatch ? rMatch[1] : null;
        const title = tMatch ? tMatch[1] : 'نظام تذاكر الدعم الفني';

        const roleObj = roleId ? findTargetRole(targetGuild, roleId) : null;
        const roleIds = roleObj ? [roleObj.id] : (roleId ? [roleId] : []);

        try {
            await deployTicketPanel(targetGuild, targetChanId, roleIds, title);
            await channel.send(`✅ **تم إنشاء لوحة التذاكر (Ticket Panel) بنجاح وإرسالها إلى القناة <#${targetChanId}> وتفعيل ذكاء الدعم الفني عليها تلقائياً!**`).catch(() => {});
        } catch (e) {
            await channel.send(`❌ **فشل إنشاء لوحة التذاكر:** ${e.message}`).catch(() => {});
        }
    }
}

async function handleSupportAiInTicketMessage(message, ticket) {
    if (!ticket || !ticket.supportAiEnabled) return false;
    
    // ميزة ذكاء التذاكر حصرية لمشتركي البريميوم
    if (!isGuildPremium(message.guildId)) return false;

    const content = message.content.trim();

    // 1. Check for pause command
    if (content === '-توقف' || content === '-توقف الذكاء') {
        ticket.supportAiEnabled = false;
        const db = getDB();
        if (db[message.guildId]?.tickets?.[message.channelId]) {
            db[message.guildId].tickets[message.channelId].supportAiEnabled = false;
            saveDB(db);
        }
        await message.reply('🛑 **تم إيقاف الذكاء الاصطناعي في هذه التذكرة بنجاح.**\nسيتولى فريق الدعم البشري المتابعة معكم الآن.').catch(() => {});
        return true;
    }

    // Update last activity timestamp
    ticket.lastAiActivity = Date.now();
    ticket.aiRemindCount = 0;

    await message.channel.sendTyping().catch(() => {});

    // Fetch conversation history in ticket channel (up to 15 messages, excluding current message)
    let chatHistoryText = `سجل الحوار في التذكرة حتى الآن:\n`;
    let messageCount = 0;
    try {
        const recent = await message.channel.messages.fetch({ limit: 15 }).catch(() => null);
        if (recent && recent.size > 0) {
            const sorted = Array.from(recent.values()).reverse();
            sorted.forEach(m => {
                if (m.id === message.id) return; // Skip current message from history block
                if (m.author.bot && m.author.id !== client.user.id) return;
                const senderName = m.author.id === client.user.id ? `أنت (${client.user.username})` : m.author.username;
                const cleanMsg = m.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
                if (cleanMsg) {
                    chatHistoryText += `- ${senderName}: ${cleanMsg}\n`;
                    messageCount++;
                }
            });
        }
    } catch (e) {}

    if (messageCount === 0) chatHistoryText = '';

    const imageParts = await extractImagePartsFromMessage(message);

    const db = getDB();
    const aiConfig = db[message.guildId]?.ai || {};
    const panel = db[message.guildId]?.panels?.[ticket.panelId] || {};

    let systemPrompt = `أنت "مساعد الدعم الفني لـ NTL BOT" (NTL BOT Support AI) المخصص لتكتات وسيرفرات الدعم الفني.\n`;
    systemPrompt += `اسمك ولقبك الرسمي: "مساعد الدعم الفني لـ NTL BOT".\n\n`;

    systemPrompt += `[معلومات وهيكلية السيرفر والحسابات]:\n`;
    systemPrompt += `- اسم السيرفر: "${message.guild.name}" (ID: ${message.guild.id})\n`;
    systemPrompt += `- مالك السيرفر (Owner ID): ${message.guild.ownerId}\n`;

    const rolesInfo = Array.from(message.guild.roles.cache.values())
        .filter(r => r.name !== '@everyone')
        .slice(0, 25)
        .map(r => `@${r.name} (ID: ${r.id} - أدمن: ${r.permissions.has(PermissionFlagsBits.Administrator) ? 'نعم' : 'لا'})`)
        .join(', ');
    systemPrompt += `- رومات وصلاحيات السيرفر: ${rolesInfo}\n`;

    const channelsInfo = Array.from(message.guild.channels.cache.values())
        .slice(0, 35)
        .map(c => {
            let purpose = 'عامة';
            const n = c.name.toLowerCase();
            if (n.includes('welcome') || n.includes('ترحيب')) purpose = 'ترحيب بالأعضاء الجدد';
            else if (n.includes('rule') || n.includes('قوانين')) purpose = 'قوانين وإرشادات السيرفر';
            else if (n.includes('buy') || n.includes('shop') || n.includes('store') || n.includes('شراء') || n.includes('أسعار')) purpose = 'متجر والأسعار والشراء';
            else if (n.includes('ticket') || n.includes('support') || n.includes('دعم') || n.includes('تكت')) purpose = 'لوحات الدعم والتذاكر';
            else if (n.includes('bypass') || n.includes('key') || n.includes('مفاتيح') || n.includes('تخطي')) purpose = 'خدمة تخطي الروابط والمفاتيح';
            else if (n.includes('azkar') || n.includes('أذكار')) purpose = 'نظام الأذكار التلقائية';
            else if (n.includes('suggest') || n.includes('اقتراح')) purpose = 'لوحة الاقتراحات';
            return `#${c.name} (ID: ${c.id} - ${purpose})`;
        })
        .join(', ');
    systemPrompt += `- القنوات والفروع بالسيرفر: ${channelsInfo}\n\n`;

    systemPrompt += `[تدريب وشخصية التذكرة الحالية (${panel.name || panel.title || 'تذكرة الدعم'})]:\n`;
    if (panel.aiPersonality) {
        systemPrompt += `• أسلوب وشخصية المحادثة لهذه التذكرة:\n${panel.aiPersonality}\n`;
    } else {
        systemPrompt += `• أسلوب الكلام: تحدث بأسلوب طبيعي جداً، عفوي، وبراحتك تماماً بلهجة عامية "مكس" (عراقي، سعودي، شامي). ممنوع الفصحى نهائياً. استخدم كلمات شعبية وكن صديقاً للعضو وابتعد عن الرسميات.\n`;
    }
    systemPrompt += `• قوانين الرد حاسمة: يمنع تجاوز الرد لـ 3 أسطر كحد أقصى. اكتفِ بسطر أو سطرين للشرح. استعمل الإيموجيات بشكل طبيعي وجذاب في كلامك. ممنوع الفصحى.\n`;
    if (panel.aiInstructions) {
        systemPrompt += `• التعليمات والقواعد الخاصة والتدريبية لهذه التذكرة (تلتزم بها بالملي):\n${panel.aiInstructions}\n\n`;
    }

    if (aiConfig.trainingType === 'manual' || aiConfig.personality || aiConfig.customInstructions) {
        systemPrompt += `[تعليمات وقواعد الذكاء العامة بالسيرفر]:\n`;
        if (aiConfig.personality) systemPrompt += `- الشخصية العامة: ${aiConfig.personality}\n`;
        if (aiConfig.customInstructions) systemPrompt += `- التعليمات العامة: ${aiConfig.customInstructions}\n\n`;
    }

    systemPrompt += `[معرفة ودليل عمل أوامر NTL BOT الشاملة]:\n`;
    systemPrompt += `أنت خبير ومعلم بكافة أوامر ومميزات NTL BOT وتعرف تفاصيل عملها وتجيب على العضو بدقة عند سؤاله عنها:\n`;
    systemPrompt += `1. **/setup_ticket**: إعداد ونشر نظام التذاكر المتطور (Ticket Panels). يتضمن تخصيص العنوان والوصف، صورة البانل وصورة الترحيب، رتب الدعم الفني، كاتاجوري القنوات، روم اللوق، ونظام التقييمات والترانسكريبت واستلام التذاكر (Claim/Unclaim). كما يتضمن زر "ذكاء التذكرة (AI)" لتفعيل وتدريب الذكاء لكل بانل بشكل مستقل.\n`;
    systemPrompt += `2. **/setup_azkar**: إعداد ونشر نظام الأذكار والأحاديث والأدعية التلقائية بروم محدد، وتحديد الفاصل الزمني (كل 5 إلى 720 دقيقة)، ومنشن رتبة معينة عند نشر الذكر.\n`;
    systemPrompt += `3. **/setup_suggestion**: إعداد ونشر لوحة الاقتراحات التفاعلية بروم مخصص، مع عنوان ووصف وصورة مخصصة أو شعار السيرفر، وأزرار للتصويت والتعليق.\n`;
    systemPrompt += `4. **/protection**: لوحة الحماية والوقاية التلقائية للسيرفر من السبام، الروابط الخبيثة، التكرار، الطرد الجماعي، البان الجماعي، وتخريب الرومات والرتب.\n`;
    systemPrompt += `5. **/music**: تفعيل أو تعطيل ونظام تشغيل الأغاني والصوتيات عالية الجودة في الرومات الصوتية.\n`;
    systemPrompt += `6. **/ai**: إعداد وتدريب المساعد الذكي الاصطناعي للسيرفر، وتغيير اسمه وصورته وحالته ورومه وكاتاجوريه، وتدريب ذكاء التذاكر والبانلات.\n`;
    systemPrompt += `7. **/bypass / نظام المفاتيح**: خدمات التخطي التلقائي لروابط الإعلانات والمفاتيح المباشرة مثل Delta, Lootlabs, Linkvertise, Platoboost / PlatoRelay.\n`;
    systemPrompt += `8. **/support**: عرض السيرفرات الداعمة وقائمة المواقع والروابط المدعومة.\n`;
    systemPrompt += `9. **الأوامر الإدارية والمباشرة**: إعطاء/سحب الرتب، البان، الطرد، الميوت، مسح الرسائل، إخفاء/إظهار القنوات، إنشاء/حذف الرومات والرتب.\n\n`;

    systemPrompt += `⚠️ **قوانين صارمة وحاسمة لتفادي الأخطاء:**\n`;
    systemPrompt += `1. **يُمنع منعاً باتاً تكرار الترحيب** أو القول "يا هلا ومرحبتين" أو منشن العضو في كل رسالة! رحب بالعضو مرة واحدة فقط في البداية، وفي بقية المحادثة ادخل في صلب الموضوع مباشرة دون أي ترحيب مكرر.\n`;
    systemPrompt += `2. **تلتزم بالتعليمات التدريبية المحددة لك بالملي** إذا زودتك الإدارة بتعليمات خاصة (مثلاً: إذا طلب العضو شراء رتبة وجهه لـ #الأسعار، أو إذا طلب رابط اعطه الرابط)، أجب بدقة وطبق القاعدة بالملي.\n`;
    systemPrompt += `3. **تنفيذ الإجراءات البرمجية [ACTION: ...]**: عند الحاجة لتنفيذ أمر برمجياً بناءً على طلب صريح وواضح من المستخدم، ادرج الكود المناسب بنهاية ردك. هام جدا: يمنع منعا باتا كتابة أكواد ACTION في الردود العادية أو الاستفسارات:\n`;
    systemPrompt += `   - [ACTION: CREATE_TICKET_PANEL channel:"CHANNEL_ID" role:"ROLE_ID" title:"عنوان البانل"]\n`;
    systemPrompt += `   - [ACTION: SETUP_AZKAR guild:"GUILD_ID" channel:"CHANNEL_ID" interval:"MINUTES"]\n`;
    systemPrompt += `   - [ACTION: CLOSE_TICKET]\n`;
    systemPrompt += `   - [ACTION: REMIND_USER]\n`;
    systemPrompt += `   - [ACTION: GIVE_ROLE user:"USER_ID" role:"ROLE_ID_OR_NAME"]\n`;
    systemPrompt += `   - [ACTION: REMOVE_ROLE user:"USER_ID" role:"ROLE_ID_OR_NAME"]\n`;
    systemPrompt += `   - [ACTION: CREATE_CHANNEL name:"CHANNEL_NAME"] / [ACTION: DELETE_CHANNEL name:"NAME_OR_ID"]\n`;
    systemPrompt += `   - [ACTION: CREATE_ROLE name:"ROLE_NAME"] / [ACTION: DELETE_ROLE name:"NAME_OR_ID"]\n`;
    systemPrompt += `   - [ACTION: HIDE_CHANNEL] / [ACTION: SHOW_CHANNEL]\n`;
    systemPrompt += `   - [ACTION: MUTE_USER user:"USER_ID" duration:"MINUTES"]\n`;
    systemPrompt += `   - [ACTION: BAN_USER user:"USER_ID"] / [ACTION: KICK_USER user:"USER_ID"]\n`;
    systemPrompt += `   - [ACTION: CLEAR_MESSAGES count:"NUMBER"]\n`;
    systemPrompt += `4. يمكنك التفاعل بوضع رياكشن على رسالة العضو ببرمجة السطر التالي في النهاية: [REACTION: ايموجي_عادي].\n`;

    if (message.guild.emojis && message.guild.emojis.cache.size > 0) {
        systemPrompt += `6. إيموجيات السيرفر المخصصة التي يمكنك استخدامها:\n`;
        message.guild.emojis.cache.first(30).forEach(e => {
            systemPrompt += `- <:${e.name}:${e.id}>\n`;
        });
    }

    systemPrompt += `\n7. ⚠️ **قاعدة صارمة ومطلقة**: يمنع منعاً باتاً ونهائياً إعطاء مخرجات تحتوي على سياق الدردشة أو عناوين مثل "سجل الحوار" أو "الرسالة الجديدة من العضو". أرسل ردك المباشر والنهائي فقط الموجه للعضو!\n`;

    const userPrompt = `${chatHistoryText}\n\nالرسالة الجديدة من العضو ${message.author.username} (<@${message.author.id}>):\n${message.content}`;

    try {
        const rawResponse = await callGeminiAPI(systemPrompt, userPrompt, imageParts, message.guildId);
        const { cleanText, actions, reactions } = cleanAiResponseOutput(rawResponse, message.guild);

        if (cleanText) {
            await message.channel.send(cleanText).catch(() => {});
        }

        // Apply reactions
        if (reactions.length > 0) {
            for (const react of reactions) {
                await applyReactionToMessage(message, react);
            }
        }

        // Process Actions for Support AI
        for (const action of actions) {
            try {
                if (action === 'CLOSE_TICKET') {
                    await message.channel.send('🔒 **جاري إغلاق هذه التذكرة وحذف القناة خلال 5 ثوانٍ...**').catch(() => {});
                    setTimeout(() => message.channel.delete().catch(() => {}), 5000);
                } else if (action === 'REMIND_USER') {
                    await message.channel.send(`<@${ticket.creatorId}> 🔔 **تذكير:** نحن بانتظار ردك لمتابعة استفسارك!`).catch(() => {});
                } else if (action.startsWith('SETUP_AZKAR')) {
                    const gMatch = action.match(/guild:\s*["']?([^"'\s,\]]+)["']?/);
                    const cMatch = action.match(/channel:\s*["']?([^"'\s,\]]+)["']?/);
                    const iMatch = action.match(/interval:\s*["']?([^"'\s,\]]+)["']?/);

                    const targetGuildId = gMatch ? gMatch[1] : message.guildId;
                    const targetChanId = cMatch ? cMatch[1] : message.channelId;
                    const interval = iMatch ? parseInt(iMatch[1], 10) : 30;

                    const targetGuild = client.guilds.cache.get(targetGuildId) || message.guild;
                    const memberInTarget = await targetGuild.members.fetch(message.author.id).catch(() => null);
                    const isTargetAdmin = memberInTarget && (memberInTarget.permissions.has(PermissionFlagsBits.Administrator) || targetGuild.ownerId === message.author.id);

                    if (!isTargetAdmin) {
                        await message.channel.send(`❌ **عذراً <@${message.author.id}>، لا تمتلك صلاحيات الأدمنستريتور (Administrator) في السيرفر المستهدف (${targetGuild.name}) لتعديل إعدادات الأذكار.**`).catch(() => {});
                    } else {
                        const db = getDB();
                        if (!db[targetGuildId]) db[targetGuildId] = {};
                        db[targetGuildId].azkar = { channelId: targetChanId, interval, enabled: true };
                        saveDB(db);
                        await message.channel.send(`✅ **تم تفعيل وتحديد روم الأذكار (<#${targetChanId}>) كل ${interval} دقيقة لسيرفر \`${targetGuild.name}\` بنجاح!**`).catch(() => {});
                    }
                } else {
                    if (message.member.permissions.has(PermissionFlagsBits.Administrator) || message.guild.ownerId === message.author.id) {
                        await executeSupportAiAction(action, message.guild, message.channel, message.author);
                    } else {
                        await message.channel.send(`❌ **عذراً، يتطلب تنفيذ هذا الإجراء صلاحيات إدارية (Administrator).**`).catch(() => {});
                    }
                }
            } catch (actErr) {
                console.error('[Support AI Action Error]:', actErr);
            }
        }
        return true;
    } catch (err) {
        console.error('[Support AI Exception]:', err);
        return false;
    }
}

async function callGeminiAPI(systemPrompt, userPrompt, imageParts = [], guildId = null) {
    try {
        const prompt = `${systemPrompt}\n\n${userPrompt}`;
        const response = await askAI(prompt);
        
        let content = response;
        // Strip any thinking blocks that might leak (just in case)
        content = content.replace(/<think>[\s\S]*?<\/think>/gi, '');
        content = content.replace(/^Thinking Process:[\s\S]*?(\n\n|$)/gi, '');
        content = content.replace(/^\*\*Thinking Process:\*\*[\s\S]*?(\n\n|$)/gi, '');
        return content.trim();
    } catch (error) {
        console.error("[AI Engine Error]:", error.message);
        return `❌ حدث خطأ في محرك الذكاء الاصطناعي: ${error.message}`;
    }
}

function generateTranscriptHTML(ticketInfo, channelName) {
    const logs = ticketInfo.logs || [];
    let messageHtml = '';

    logs.forEach(log => {
        const timeStr = new Date(log.timestamp).toLocaleString('ar-EG');
        const avatarUrl = log.author?.avatar || 'https://discord.com/assets/c09a8043c34371a301990a180ecac357.png';
        
        if (log.type === 'create') {
            let attachHtml = '';
            if (log.attachments && log.attachments.length > 0) {
                log.attachments.forEach(url => {
                    attachHtml += `<br><img class="attachment" src="${url}" alt="Attachment">`;
                });
            }
            messageHtml += `
            <div class="message">
                <img class="avatar" src="${avatarUrl}" alt="Avatar">
                <div class="msg-body">
                    <div class="msg-header">
                        <span class="username">${log.author?.username || 'Unknown'}</span>
                        <span class="timestamp">${timeStr}</span>
                    </div>
                    <div class="content">${log.content || ''}${attachHtml}</div>
                </div>
            </div>`;
        } else if (log.type === 'edit') {
            messageHtml += `
            <div class="message message-edit">
                <img class="avatar" src="${avatarUrl}" alt="Avatar">
                <div class="msg-body">
                    <div class="msg-header">
                        <span class="username">${log.author?.username || 'Unknown'}</span>
                        <span class="timestamp">${timeStr}</span>
                    </div>
                    <div class="content">
                        <div>${log.newContent || ''}</div>
                        <div class="edit-info">✍️ تم تعديل الرسالة بواسطة العضو</div>
                        <div class="old-content">المحتوى القديم: ${log.oldContent || ''}</div>
                    </div>
                </div>
            </div>`;
        } else if (log.type === 'delete') {
            messageHtml += `
            <div class="message message-delete">
                <img class="avatar" src="${avatarUrl}" alt="Avatar">
                <div class="msg-body">
                    <div class="msg-header">
                        <span class="username">${log.author?.username || 'Unknown'}</span>
                        <span class="timestamp">${timeStr}</span>
                    </div>
                    <div class="content">
                        <span class="deleted-content">${log.content || ''}</span>
                        <div class="delete-info">🗑️ تم حذف هذه الرسالة بواسطة العضو</div>
                    </div>
                </div>
            </div>`;
        }
    });

    const template = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>سجل تذكرة - ${channelName}</title>
    <style>
        body {
            background-color: #1e1f22;
            color: #dbdee1;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background-color: #2b2d31;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .header {
            border-bottom: 1px solid #3f4147;
            padding-bottom: 15px;
            margin-bottom: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            color: #f2f3f5;
            font-size: 24px;
        }
        .header p {
            color: #949ba4;
            margin: 5px 0 0;
            font-size: 14px;
        }
        .message-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .message {
            display: flex;
            gap: 15px;
            padding: 10px;
            border-radius: 6px;
            transition: background-color 0.2s;
        }
        .message:hover {
            background-color: #313338;
        }
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #3f4147;
            object-fit: cover;
        }
        .msg-body {
            flex-grow: 1;
        }
        .msg-header {
            display: flex;
            align-items: baseline;
            gap: 10px;
            margin-bottom: 4px;
        }
        .username {
            font-weight: 600;
            color: #f2f3f5;
            font-size: 15px;
        }
        .timestamp {
            font-size: 11px;
            color: #949ba4;
        }
        .content {
            font-size: 14px;
            line-height: 1.5;
            word-break: break-word;
            white-space: pre-wrap;
        }
        .message-edit {
            border-left: 3px solid #f0b232;
            background-color: rgba(240, 178, 50, 0.05);
        }
        .edit-info {
            font-size: 12px;
            color: #f0b232;
            margin-top: 5px;
            font-weight: 500;
        }
        .old-content {
            color: #949ba4;
            text-decoration: line-through;
            font-size: 13px;
            margin-top: 2px;
        }
        .message-delete {
            border-left: 3px solid #f23f43;
            background-color: rgba(242, 63, 67, 0.05);
        }
        .delete-info {
            font-size: 12px;
            color: #f23f43;
            margin-top: 5px;
            font-weight: 500;
        }
        .deleted-content {
            text-decoration: line-through;
            color: #949ba4;
        }
        .attachment {
            margin-top: 8px;
            max-width: 300px;
            max-height: 300px;
            border-radius: 4px;
            border: 1px solid #3f4147;
        }
      /* Global Glass Style */
    .module-tab, .bg-slate-800, .bg-slate-900, .bg-slate-950, aside, nav {
      background: rgba(15, 23, 42, 0.7) !important;
      backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    button:not(.no-glass), .btn, input, select, textarea {
      background: rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(8px) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
  </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>سجل المحادثات للتذكرة</h1>
            <p>رقم التذكرة: ${channelName} | تاريخ الإنشاء: ${new Date(ticketInfo.createdAt).toLocaleString('ar-EG')}</p>
        </div>
        <div class="message-list">
            ${messageHtml || '<p style="text-align: center; color: #949ba4;">لا توجد رسائل مسجلة في هذه التذكرة.</p>'}
        </div>
    </div>
</body>
</html>`;
    return template;
}

function tryGeminiFallback(systemPrompt, userPrompt, resolve, reject) {
    callGeminiAPI(systemPrompt, userPrompt).then(resolve).catch(reject);
}

// ==========================================
// قائمة البوتات الإضافية المراد تشغيلها من index.js
// أضف مسارات أية ملفات بوتات أُخرى تريد تشغيلها هنا
// مثال: const OTHER_BOT_FILES = ['./otherBot.js', './bot2.js'];
// ==========================================
const OTHER_BOT_FILES = ['./secondBot.js'];

function startAdditionalBots() {
    let botFilesToRun = [...OTHER_BOT_FILES];

    // دعم جلب القائمة أيضاً من config.json إن وجدت
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (Array.isArray(config.additionalBots)) {
                config.additionalBots.forEach(file => {
                    if (!botFilesToRun.includes(file)) botFilesToRun.push(file);
                });
            }
        }
    } catch (e) {}

    if (botFilesToRun.length === 0) return;

    for (const botFile of botFilesToRun) {
        try {
            const fullPath = path.resolve(process.cwd(), botFile);
            if (fs.existsSync(fullPath)) {
                console.log(`🤖 [Secondary Bot Loader]: Starting secondary bot file: ${botFile}`);
                require(fullPath);
            } else {
                console.warn(`⚠️ [Secondary Bot Loader]: Bot file not found: ${botFile}`);
            }
        } catch (err) {
            console.error(`❌ [Secondary Bot Loader]: Error while starting bot file (${botFile}):`, err);
        }
    }
}

async function startBot() {
    // تشغيل البوتات الإضافية المحددة في قائمة OTHER_BOT_FILES
    startAdditionalBots();

    BOT_TOKEN = getCleanBotToken();

    if (!BOT_TOKEN) {
        console.warn("⚠️ [NTL Bot Warning]: BOT_TOKEN is empty in environment and config.json.");
        return;
    }

    const intentTiers = [
        { label: 'Standard (Guilds + GuildMessages)', intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] },
        { label: 'Full (MessageContent + Guilds + GuildMessages)', intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] },
        { label: 'Minimal Safe (Guilds only)', intents: [GatewayIntentBits.Guilds] }
    ];

    console.log("🔑 Attempting to log in to Discord client (Bot 1)...");
    for (let i = 0; i < intentTiers.length; i++) {
        const tier = intentTiers[i];
        try {
            client.options.intents = new IntentsBitField(tier.intents);
            await client.login(BOT_TOKEN);
            console.log(`✅ [Bot 1 Online]: Logged in successfully (${tier.label}).`);
            return;
        } catch (err) {
            const errStr = (err?.message || String(err)).toLowerCase();
            if (errStr.includes('disallowed') || errStr.includes('intent') || errStr.includes('privileged')) {
                console.warn(`⚠️ [Bot 1]: Privileged intents disabled in Developer Portal. Retrying with ${intentTiers[i + 1]?.label || 'safe minimal intents'}...`);
                try { client.destroy(); } catch (e) {}
            } else {
                console.warn("⚠️ [Discord Bot Notice]: Login attempted. Continuing process gracefully:", err?.message || err);
                break;
            }
        }
    }
}

// معالجات الأخطاء العالمية لحماية البوت من التوقف والانهيار
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ تم اعتراض رفض غير ممسوك (Unhandled Rejection):', reason);
});

process.on('uncaughtException', (err, origin) => {
    console.error('⚠️ تم اعتراض استثناء غير متوقع (Uncaught Exception):', err);
});

startBot();
