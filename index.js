const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, REST, Routes, ChannelSelectMenuBuilder, ChannelType, UserSelectMenuBuilder, RoleSelectMenuBuilder, PermissionFlagsBits, AttachmentBuilder, MessageFlags, ActivityType, Options } = require('discord.js');
const fs = require('fs');
const https = require('https');
const path = require('path');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
const axios = require('axios');
const FormData = require('form-data');
let messagesSentCount = 0;

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
            const builder = new MediaGalleryItemBuilder();
            callback(builder);
            this.data.items.push(builder.toJSON());
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

const playSearchCache = new Map();

// ضع التوكن الأساسي الخاص ببوتك ومفاتيح الذكاء الاصطناعي هنا
let BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) {
    try {
        const configPath = path.join(process.cwd(), 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            BOT_TOKEN = config.BOT_TOKEN;
        }
    } catch (err) {
        console.error("Error reading BOT_TOKEN from config.json:", err);
    }
}
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
let GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY || GEMINI_API_KEY === "MY_GEMINI_API_KEY" || GEMINI_API_KEY === "ضع_مفتاح_جيميني_هنا") {
    GEMINI_API_KEY = "AQ.Ab8RN6KVozdbkJNadA1PQhJIQDw4RG2dtFbL0QJ_lE1B7T3uSQ";
}
const CLOUDFLARE_ACCOUNT_ID = "4dcafd8dea7635f5c2b537f3ea08d0c8";
const CLOUDFLARE_API_TOKEN = "cfut_FjjN0KMnUPXzcpWkf9Pev5OWiOHE5R0LJOCRntU9660a673b";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
            interval: 3600,
            lifetime: 1800
        }
    }
});

global.discordClient = client;

const dbPath = './tickets_db.json';
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

function getDB() {
    if (!dbCache) loadDBSync();
    return dbCache;
}

const activeTicketChannels = new Set();
function updateTicketChannelsCache() {
    activeTicketChannels.clear();
    const db = getDB();
    for (const gId in db) {
        if (db[gId]?.tickets) {
            for (const chId in db[gId].tickets) {
                activeTicketChannels.add(chId);
            }
        }
    }
}
updateTicketChannelsCache();

let saveTimeout = null;
function saveDB(data) {
    if (data) dbCache = data;
    updateTicketChannelsCache();
    if (saveTimeout) return;
    saveTimeout = setTimeout(() => {
        saveTimeout = null;
        try {
            fs.writeFile(dbPath, JSON.stringify(dbCache), (err) => {
                if (err) console.error('[saveDB Write Error]:', err);
            });
        } catch (e) {
            console.error('[saveDB Exception]:', e);
        }
    }, 1000);
}

global.getDB = getDB;
global.saveDB = saveDB;

function isGuildPremium(guildId) {
    const database = getDB();
    if (database._settings?.aiFreeMode) return true;
    if (!database[guildId]) return false;
    const premium = database[guildId].premium;
    if (!premium || !premium.expiresAt) return false;
    if (premium.expiresAt === 'lifetime') return true;
    return Date.now() < premium.expiresAt;
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

        if (client && client.guilds && client.guilds.cache.has(guildId)) {
            guildObj = client.guilds.cache.get(guildId);
            if (guildObj) {
                guildObj.channels.cache.forEach(c => {
                    if (c.type === 0 || c.type === 'GUILD_TEXT') {
                        textChannels.push({ id: String(c.id), name: c.name });
                    } else if (c.type === 4 || c.type === 'GUILD_CATEGORY') {
                        categoryChannels.push({ id: String(c.id), name: c.name });
                    }
                });

                guildObj.roles.cache.forEach(r => {
                    if (r.name !== '@everyone' && !r.managed) {
                        guildRoles.push({ id: String(r.id), name: r.name, color: r.hexColor });
                    }
                });
            }
        }

        const db = getDB();
        const localData = db[guildId] || {};

        return sendJson(200, {
            success: true,
            hasBot: !!guildObj,
            stats: {
                memberCount: guildObj ? guildObj.memberCount : 14,
                channelsCount: textChannels.length,
                categoriesCount: categoryChannels.length,
                rolesCount: guildRoles.length
            },
            settings: {
                panels: localData.panels || {},
                tickets: localData.tickets || {},
                suggestions: localData.suggestions || {},
                azkar: localData.azkar || {},
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
                musicEnabled: localData.musicEnabled || false,
                deltaKeys: localData.deltaKeys || {}
            },
            channels: textChannels,
            categories: categoryChannels,
            roles: guildRoles
        });
    }

    // 3. POST /api/save-guild-settings/:guildId or /update-settings
    if ((pathname.startsWith('/api/save-guild-settings') || pathname === '/update-settings') && req.method === 'POST') {
        const payload = await getBody();
        const parts = pathname.split('/');
        const guildId = payload.guildId || parts[3] || parsedUrl.searchParams.get('guildId');

        if (!guildId) return sendJson(400, { success: false, error: 'Missing guildId' });

        const { panels, tickets, suggestions, azkar, protection, musicEnabled, deltaKeys, broadcastMessage, customEmbeds, autoResponses } = payload;
        const db = getDB();
        if (!db[guildId]) {
            db[guildId] = { panels: {}, tickets: {}, counter: 0 };
        }

        if (panels !== undefined) db[guildId].panels = panels;
        if (customEmbeds !== undefined) db[guildId].customEmbeds = customEmbeds;
        if (autoResponses !== undefined) db[guildId].autoResponses = autoResponses;
        if (tickets !== undefined) {
            db[guildId].tickets = tickets;
            if (!db[guildId].panels) db[guildId].panels = {};
            db[guildId].panels['p1'] = {
                id: 'p1',
                title: tickets.title || "🎫 قسم الدعم الفني والتذاكر",
                description: tickets.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.",
                categoryId: tickets.categoryId || null,
                roles: tickets.supportRole ? [tickets.supportRole] : [],
                buttons: [
                    { name: tickets.btnLabel || 'فتح تذكرة', emoji: tickets.btnEmoji || '📩', categoryId: tickets.categoryId || null }
                ]
            };
        }
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

                                if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                    const btnRow = new ActionRowBuilder();
                                    embData.buttons.slice(0, 5).forEach((btn, idx) => {
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
                                    container.addActionRowComponents(btnRow);
                                }

                                await chan.send({
                                    components: [container.toJSON()],
                                    flags: MessageFlags.IsComponentsV2
                                });
                            } catch (v2Error) {
                                console.warn('[V2 Send Fallback to Standard Embed]:', v2Error.message);
                                const cleanDesc = (embData.desc || embData.description || '')
                                    .replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
                                const embed = new EmbedBuilder()
                                    .setTitle(embData.title || null)
                                    .setDescription(cleanDesc || null)
                                    .setColor(embData.color || '#5865F2');

                                const imgUrl = getAbsoluteUrl(embData.img || embData.imageUrl);
                                if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                    embed.setImage(imgUrl);
                                }
                                if (embData.footer) {
                                    embed.setFooter({ text: embData.footer });
                                }

                                const msgPayload = { embeds: [embed] };

                                if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                    const btnRow = new ActionRowBuilder();
                                    embData.buttons.slice(0, 5).forEach((btn, idx) => {
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
                                    msgPayload.components = [btnRow];
                                }

                                await chan.send(msgPayload);
                            }
                        } else {
                            // Standard Embed
                            const cleanDesc = (embData.desc || embData.description || '')
                                .replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
                            const embed = new EmbedBuilder()
                                .setTitle(embData.title || null)
                                .setDescription(cleanDesc || null)
                                .setColor(embData.color || '#5865F2');

                            const imgUrl = getAbsoluteUrl(embData.img || embData.imageUrl);
                            if (imgUrl && imgUrl !== 'لايوجد' && imgUrl.startsWith('http')) {
                                embed.setImage(imgUrl);
                            }
                            if (embData.footer) {
                                embed.setFooter({ text: embData.footer });
                            }

                            const msgPayload = { embeds: [embed] };

                            if (embData.buttons && Array.isArray(embData.buttons) && embData.buttons.length > 0) {
                                const btnRow = new ActionRowBuilder();
                                embData.buttons.slice(0, 5).forEach((btn, idx) => {
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
                                container.addActionRowComponents(row);

                                await chan.send({
                                    components: [container.toJSON()],
                                    flags: MessageFlags.IsComponentsV2
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
                            await chan.send({ embeds: [embed], components: [row] });
                        }
                        deliveryLog = { status: "SENT", message: `تم إرسال لوحة التذاكر لقناة #${chan.name}` };
                    } else if (broadcastMessage.type === 'suggestion_panel') {
                        const embed = new EmbedBuilder()
                            .setColor(broadcastMessage.color || suggestions?.color || '#12a524')
                            .setTitle(broadcastMessage.title || suggestions?.title || "💡 صندوق الاقتراحات والتطوير")
                            .setDescription(broadcastMessage.description || suggestions?.description || "أهلاً بكم! يمكنك كتابة اقتراحك وطرح أفكارك لتطوير السيرفر هنا 💡");

                        const row = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId('publish_suggestion_prompt_btn')
                                .setLabel('نشر إقتراح')
                                .setEmoji('1517591602049056829')
                                .setStyle(ButtonStyle.Success)
                        );
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

const activeStates = new Map();
const activeClaims = new Set();
const azkarTimers = new Map();
const userMessageCache = new Map();
const bypassEvents = new Set();
const interactionCooldowns = new Map(); // للحد من العبث وضغط الأزرار العشوائي

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
const KEY_FILE = 'key.txt';
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
            signal: AbortSignal.timeout(8000)
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
                signal: AbortSignal.timeout(4000)
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
            signal: AbortSignal.timeout(6000)
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

async function bypassDeltaLink(deltaLink) {
    console.log(`[Delta Bypass] Processing bypass request for: ${deltaLink.slice(0, 60)}...`);
    const isPlatoRelay = deltaLink.toLowerCase().includes('platorelay') || deltaLink.toLowerCase().includes('platoboost');

    if (!isPlatoRelay) {
        return { bypassedLink: null, error: 'UNSUPPORTED_LINK', isUnsupported: true };
    }

    try {
        const { fetchKey } = require('./platorelayBypass.js');
        console.log(`[PlatoRelay Native Solver] Starting native solve for: ${deltaLink.slice(0, 60)}...`);
        const res = await fetchKey(deltaLink);
        if (res && res.key) {
            console.log(`[PlatoRelay Native Solver] Success! Key: ${res.key}`);
            return { bypassedLink: res.key, error: null };
        }
    } catch (nativeErr) {
        console.error(`[PlatoRelay Native Solver Notice]: ${nativeErr.message}`);
    }

    const result = await fetchWithNewApiKey(deltaLink, 'bypass_limited_9f82a1c4e7230b54d68e10fa');
    if (result && result.bypassedLink) {
        return result;
    }
    const awsRes = await fetchAwsBypassApi(deltaLink);
    if (awsRes && awsRes.bypassedLink) {
        return awsRes;
    }
    const oldRes = await fetchOldApi(deltaLink);
    if (oldRes && oldRes.bypassedLink) {
        return oldRes;
    }
    return {
        bypassedLink: null,
        error: 'bypass cancelled'
    };
}

// ==================== SCRIPT SEARCH MODULE ====================

const scriptSearchCache = new Map();

function mapArabicGameNameToEnglish(query) {
    const mappings = {
        'بلوكس فروت': 'Blox Fruits',
        'بلوكس فروتس': 'Blox Fruits',
        'بلور فروت': 'Blox Fruits',
        'بلوكس': 'Blox Fruits',
        'فاكهة': 'Blox Fruits',
        'بروكهافن': 'Brookhaven',
        'بيوت': 'Brookhaven',
        'ماب البيوت': 'Brookhaven',
        'ادوبت مي': 'Adopt Me',
        'أدوبت مي': 'Adopt Me',
        'ادوبت': 'Adopt Me',
        'أدوبت': 'Adopt Me',
        'موردر': 'Murder Mystery 2',
        'مردر': 'Murder Mystery 2',
        'مادر ميستري': 'Murder Mystery 2',
        'ميردر ميستري': 'Murder Mystery 2',
        'سجن': 'Jailbreak',
        'جيلبريك': 'Jailbreak',
        'ماب السجن': 'Jailbreak',
        'كينق ليجاسي': 'King Legacy',
        'كينج ليجاسي': 'King Legacy',
        'سترونجست': 'The Strongest Battlegrounds',
        'ذا سترونجست': 'The Strongest Battlegrounds',
        'اقوى رجل': 'The Strongest Battlegrounds',
        'بيدوارز': 'BedWars',
        'بيد ورز': 'BedWars',
        'دورس': 'Doors',
        'ابواب': 'Doors',
        'أبواب': 'Doors',
        'دونيت': 'PLS DONATE',
        'تبرع': 'PLS DONATE',
        'تبرعات': 'PLS DONATE',
        'تايكون': 'Tycoon',
        'تياكون': 'Tycoon',
        'فيش': 'Fisch',
        'سمك': 'Fisch',
        'بليد بول': 'Blade Ball',
        'انمي': 'Anime',
        'أنمي': 'Anime',
        'رايفالز': 'Rivals',
        'رايفلز': 'Rivals',
        'ريفالز': 'Rivals',
        'جراند بيس': 'Grand Piece Online',
        'ارسنال': 'Arsenal',
        'أرسنال': 'Arsenal',
        'شيندو': 'Shindo Life',
        'شيندو لايف': 'Shindo Life',
        'بيتبول': 'Pet Simulator 99',
        'بيت سيميليتر': 'Pet Simulator 99',
        'سول': "Sol's RNG",
        'أنمي ديفيندرز': 'Anime Defenders',
        'انمي ديفيندرز': 'Anime Defenders',
        'طيران': 'Fly',
        'سبيشال': 'Special',
        'سرعة': 'Speed',
        'اوتو فارم': 'Auto Farm',
        'أوتو فارم': 'Auto Farm',
        'هاب': 'Hub'
    };

    let result = query;
    for (const [ar, en] of Object.entries(mappings)) {
        if (result.includes(ar)) {
            result = result.replace(new RegExp(ar, 'gi'), en);
        }
    }
    return result;
}

function buildScriptContainer(script, currentIndex, totalScripts, msgId, prefix) {
    const hasKey = script.key ? 'نعم' : 'لا';
    const isTrusted = (script.verified || script.owner?.isVerified) ? 'نعم' : 'لا';
    const title = script.title || 'بدون عنوان';
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
        `**المشاهدات <:eye:1535978311887355946> : \`${views}\`**\n` +
        `**الإعجابات <:like:1535979334370590760> : \`${likes}\`**\n` +
        `**مفتاح <:key:1535983304249974915> : \`${hasKey}\`**\n` +
        `**موثوق <:Trust:1535979763284578354> : \`${isTrusted}\`**\n` +
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
            .setLabel('دليل الإستخدام')
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

const scriptSearchApiCache = new Map();

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
        content: `<a:Search:1535951004552532008> | **جاري البحث عن \`${rawQuery}\`**`
    }).catch(() => null);

    if (!searchMsg) return true;

    try {
        let filterKey = 'all';
        let cleanQuery = rawQuery;

        if (cleanQuery.includes('بدون مفتاح')) {
            filterKey = 'no';
            cleanQuery = cleanQuery.replace(/بدون مفتاح/gi, '').trim();
        } else if (cleanQuery.includes('مفتاح')) {
            filterKey = 'yes';
            cleanQuery = cleanQuery.replace(/مفتاح/gi, '').trim();
        }

        const mappedQuery = mapArabicGameNameToEnglish(cleanQuery);

        const cacheKey = `${filterKey}:${cleanQuery.toLowerCase()}`;
        const now = Date.now();
        if (scriptSearchApiCache.has(cacheKey)) {
            const cached = scriptSearchApiCache.get(cacheKey);
            if (now - cached.timestamp < 10 * 60 * 1000) {
                const finalScripts = cached.scripts;
                if (!finalScripts || finalScripts.length === 0) {
                    await searchMsg.edit({
                        content: `❌ | **لم يتم العثور على أي نتائج تطابق البحث عن \`${rawQuery}\`**`
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
                    components: [container],
                    flags: MessageFlags.IsComponentsV2
                }).catch(() => {});
                return true;
            }
        }

        const queriesToTry = [];
        if (mappedQuery) queriesToTry.push(mappedQuery);
        if (cleanQuery && cleanQuery !== mappedQuery && !queriesToTry.includes(cleanQuery)) {
            queriesToTry.push(cleanQuery);
        }

        // Fallback broad terms if query contains game names
        const knownGames = ['Blox Fruits', 'Brookhaven', 'Adopt Me', 'Murder Mystery 2', 'Jailbreak', 'King Legacy', 'The Strongest Battlegrounds', 'BedWars', 'Doors', 'PLS DONATE', 'Fisch', 'Blade Ball', 'Rivals', 'Grand Piece Online', 'Arsenal', 'Shindo Life', 'Pet Simulator 99'];
        for (const g of knownGames) {
            if ((mappedQuery.toLowerCase().includes(g.toLowerCase()) || cleanQuery.toLowerCase().includes(g.toLowerCase())) && !queriesToTry.includes(g)) {
                queriesToTry.push(g);
            }
        }

        let allScripts = [];
        const seen = new Set();

        for (const q of queriesToTry) {
            for (const page of [1, 2]) {
                try {
                    const searchUrl = `https://scriptblox.com/api/script/search?q=${encodeURIComponent(q)}&page=${page}`;
                    const response = await axios.get(searchUrl, {
                        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                        timeout: 2500
                    });
                    const scripts = response.data?.result?.scripts || [];
                    for (const s of scripts) {
                        const id = s._id || s.id || (s.title + s.script);
                        if (!seen.has(id)) {
                            seen.add(id);
                            allScripts.push(s);
                        }
                    }
                    if (scripts.length === 0) break; // No more pages for this query
                } catch (e) {
                    // Ignore single page fetch errors
                }
            }
            if (allScripts.length >= 30) break; // Sufficient results found
        }

        // FALLBACK LOCAL SCRIPT ENGINE IF ONLINE API IS BLOCKED OR RETURNED 0 RESULTS
        if (allScripts.length === 0) {
            const FALLBACK_ROBLOX_SCRIPTS = [
                {
                    title: "Redz Hub - Blox Fruits Auto Farm & Sea Event [Keyless]",
                    game: { name: "Blox Fruits", imageUrl: "https://scriptblox.com/images/script/1690000000.png" },
                    key: false,
                    verified: true,
                    views: 348900,
                    likeCount: 28400,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/realredz/BloxFruits/main/Source.lua"))()',
                    keywords: ["blox fruits", "بلوكس فروت", "فاكهة", "فارم", "ريدز", "redz", "بدون مفتاح", "keyless"]
                },
                {
                    title: "Hoho Hub v3 - Blox Fruits Full Auto Farm & Mirage",
                    game: { name: "Blox Fruits", imageUrl: "https://scriptblox.com/images/script/1690000001.png" },
                    key: true,
                    verified: true,
                    views: 289200,
                    likeCount: 19200,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/acsu123/HOHO_HUB/main/Loading_v3.lua"))()',
                    keywords: ["blox fruits", "بلوكس فروت", "هوهو", "hoho", "مفتاح", "mirage"]
                },
                {
                    title: "Brookhaven RP - Ice Hub Admin & Graphics & Car Fly [Keyless]",
                    game: { name: "Brookhaven RP", imageUrl: "https://scriptblox.com/images/script/1690000002.png" },
                    key: false,
                    verified: true,
                    views: 412000,
                    likeCount: 32100,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/IceMael7/IceHub/main/Brookhaven.lua"))()',
                    keywords: ["brookhaven", "بروكهافن", "بيوت", "ماب البيوت", "ادمن", "ايس", "ice", "بدون مفتاح"]
                },
                {
                    title: "Brookhaven RP - Solix Admin GUI & Vehicle Unlocks [Keyless]",
                    game: { name: "Brookhaven RP", imageUrl: "https://scriptblox.com/images/script/1690000003.png" },
                    key: false,
                    verified: true,
                    views: 295400,
                    likeCount: 25300,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/realsolix/solix/main/brookhaven.lua"))()',
                    keywords: ["brookhaven", "بروكهافن", "بيوت", "سوليكس", "solix", "بدون مفتاح"]
                },
                {
                    title: "King Legacy - Void Hub Auto Farm & Sea Beast",
                    game: { name: "King Legacy", imageUrl: "https://scriptblox.com/images/script/1690000004.png" },
                    key: false,
                    verified: true,
                    views: 192000,
                    likeCount: 15800,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/VoidHubOfficial/KingLegacy/main/source.lua"))()',
                    keywords: ["king legacy", "كينج ليجاسي", "ملك", "فارم", "فويد", "void", "بدون مفتاح"]
                },
                {
                    title: "MM2 Murder Mystery 2 - Eclipse Hub Silent Aim & ESP [Keyless]",
                    game: { name: "Murder Mystery 2", imageUrl: "https://scriptblox.com/images/script/1690000005.png" },
                    key: false,
                    verified: true,
                    views: 389000,
                    likeCount: 31000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Ethic/EclipseMM2/main/script.lua"))()',
                    keywords: ["murder mystery 2", "mm2", "ام ام 2", "جرائم", "قتل", "ايمبوت", "esp", "إكليبس", "eclipse", "بدون مفتاح"]
                },
                {
                    title: "Fisch - Speed Hub Auto Catch & Shake & Reel [Keyless]",
                    game: { name: "Fisch", imageUrl: "https://scriptblox.com/images/script/1690000006.png" },
                    key: false,
                    verified: true,
                    views: 510000,
                    likeCount: 42000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/speedhubx/fisch/main/source.lua"))()',
                    keywords: ["fisch", "فيش", "سمك", "صيد", "فارم", "سبيد", "speed", "بدون مفتاح"]
                },
                {
                    title: "Blade Ball - Auto Parry & Spammer & Target ESP [Keyless]",
                    game: { name: "Blade Ball", imageUrl: "https://scriptblox.com/images/script/1690000007.png" },
                    key: false,
                    verified: true,
                    views: 450000,
                    likeCount: 38000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/3345-c-a-t-s-u-s/-InfinityHub-/main/Main.lua"))()',
                    keywords: ["blade ball", "بليد بول", "كرة السيف", "صد تلقائي", "parry", "انفينيتي", "infinity", "بدون مفتاح"]
                },
                {
                    title: "Pet Simulator 99 - ZapHub Auto Egg & Farm [Keyless]",
                    game: { name: "Pet Simulator 99", imageUrl: "https://scriptblox.com/images/script/1690000008.png" },
                    key: false,
                    verified: true,
                    views: 290000,
                    likeCount: 22500,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/zaphub/pet-simulator-99/main/script.lua"))()',
                    keywords: ["pet simulator 99", "بيت سيميليتر", "حيوانات", "فارم", "زاب", "zap", "بدون مفتاح"]
                },
                {
                    title: "The Strongest Battlegrounds - Ultimate Moveset & Combo AI [Keyless]",
                    game: { name: "The Strongest Battlegrounds", imageUrl: "https://scriptblox.com/images/script/1690000009.png" },
                    key: false,
                    verified: true,
                    views: 280000,
                    likeCount: 24000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/strongest-bg/main/script.lua"))()',
                    keywords: ["strongest battlegrounds", "سترونجست", "قتال", "سيتاما", "كومبو", "بدون مفتاح"]
                },
                {
                    title: "BedWars - Vape V4 Auto Bridge & KillAura & Fly [Keyless]",
                    game: { name: "BedWars", imageUrl: "https://scriptblox.com/images/script/1690000010.png" },
                    key: false,
                    verified: true,
                    views: 620000,
                    likeCount: 51000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/7GrandDadPGN/VapeV4ForRoblox/main/NewMainScript.lua"))()',
                    keywords: ["bedwars", "بيدوارز", "سرير", "فايب", "vape", "killaura", "بدون مفتاح"]
                },
                {
                    title: "Universal - Infinite Yield Admin Commands & Fly & Speed [Keyless]",
                    game: { name: "Universal / All Games", imageUrl: "https://scriptblox.com/images/script/1690000011.png" },
                    key: false,
                    verified: true,
                    views: 1290000,
                    likeCount: 108000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()',
                    keywords: ["universal", "جميع الالعاب", "انفينيتي", "infinite yield", "طيران", "سرعة", "fly", "speed", "ادمن", "admin", "بدون مفتاح", "هوب"]
                },
                {
                    title: "Universal - Nameless Admin Commands [Keyless]",
                    game: { name: "Universal / All Games", imageUrl: "https://scriptblox.com/images/script/1690000012.png" },
                    key: false,
                    verified: true,
                    views: 530000,
                    likeCount: 41000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/FilteringEnabled/NamelessAdmin/main/Source"))()',
                    keywords: ["nameless", "ادمن", "طيران", "نيمليس", "بدون مفتاح"]
                },
                {
                    title: "Rivals - Silent Aim & Triggerbot & ESP [Keyless]",
                    game: { name: "Rivals", imageUrl: "https://scriptblox.com/images/script/1690000013.png" },
                    key: false,
                    verified: true,
                    views: 245000,
                    likeCount: 19000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/rivals-script/main/source.lua"))()',
                    keywords: ["rivals", "رايفالز", "رايفلز", "ايمبوت", "esp", "بدون مفتاح"]
                },
                {
                    title: "Doors - Blackking Hub Auto Complete & Floor 2 ESP [Keyless]",
                    game: { name: "Doors", imageUrl: "https://scriptblox.com/images/script/1690000014.png" },
                    key: false,
                    verified: true,
                    views: 375000,
                    likeCount: 29000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/KINGHUB01/BlackKing-obf/main/Doors.lua"))()',
                    keywords: ["doors", "دورز", "أبواب", "بلاكينج", "blackking", "بدون مفتاح"]
                },
                {
                    title: "Arsenal - Quotas Hub Aimbot & ESP & Wallhack [Keyless]",
                    game: { name: "Arsenal", imageUrl: "https://scriptblox.com/images/script/1690000015.png" },
                    key: false,
                    verified: true,
                    views: 410000,
                    likeCount: 35000,
                    script: 'loadstring(game:HttpGet("https://raw.githubusercontent.com/Quotas/Arsenal/main/script.lua"))()',
                    keywords: ["arsenal", "ارسنال", "أرسنال", "اسلحة", "ايمبوت", "بدون مفتاح"]
                }
            ];

            const searchTerms = [cleanQuery.toLowerCase(), mappedQuery ? mappedQuery.toLowerCase() : ''].filter(Boolean);
            
            for (const item of FALLBACK_ROBLOX_SCRIPTS) {
                const titleLower = item.title.toLowerCase();
                const gameLower = item.game.name.toLowerCase();
                const kwStr = item.keywords.join(' ').toLowerCase();

                const isMatch = searchTerms.some(term => 
                    titleLower.includes(term) || 
                    gameLower.includes(term) || 
                    kwStr.includes(term) ||
                    term.split(/\s+/).some(w => w.length > 2 && (titleLower.includes(w) || gameLower.includes(w) || kwStr.includes(w)))
                );

                if (isMatch || searchTerms.length === 0) {
                    allScripts.push(item);
                }
            }

            // If still no direct match, return top fallback items so user never sees empty screen
            if (allScripts.length === 0) {
                allScripts = FALLBACK_ROBLOX_SCRIPTS.slice(0, 10);
            }
        }

        // Score & sort scripts so specific map scripts appear FIRST and 50+/90+ multi-game hubs drop to the bottom
        const multiGameRegex = /(\b\d+\+\s*(games|maps|hubs|scripts|features)\b|\b(50|60|70|80|90|100|150|200)\s*\+|\bmulti\s*game|\ball\s*games|\buniversal\s*hub|\bevery\s*game|\bsupported\s*games)/i;

        function scoreScript(script) {
            const title = (script.title || '').toLowerCase();
            const gameName = (script.game?.name || '').toLowerCase();
            const targetEng = (mappedQuery || '').toLowerCase().trim();
            const targetAr = (cleanQuery || '').toLowerCase().trim();

            const isMultiGame = multiGameRegex.test(title) || multiGameRegex.test(gameName) || gameName === 'universal' || gameName === 'all games' || gameName === 'multi game' || gameName === 'roblox';

            let score = 0;

            const matchesGameName = (targetEng && gameName.includes(targetEng)) || (targetAr && gameName.includes(targetAr));
            const matchesTitle = (targetEng && title.includes(targetEng)) || (targetAr && title.includes(targetAr));

            if (matchesGameName) score += 2000;
            if (matchesTitle) score += 800;

            if (isMultiGame) {
                score -= matchesGameName ? 1500 : 4000;
            }

            if (script.verified || script.owner?.isVerified) score += 100;

            const views = script.views || 0;
            const likes = script.likeCount || 0;
            score += Math.min(views, 100000) / 2000 + Math.min(likes, 5000) / 100;

            return score;
        }

        allScripts.sort((a, b) => scoreScript(b) - scoreScript(a));

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
                content: `❌ | **لم يتم العثور على أي نتائج تطابق البحث عن \`${rawQuery}\`**`
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
            components: [container],
            flags: MessageFlags.IsComponentsV2
        }).catch(() => {});

    } catch (err) {
        console.error('[Script Search Exception]:', err);
        await searchMsg.edit({
            content: `❌ | **حدث خطأ أثناء البحث عن السكربت، يرجى المحاولة لاحقاً.**`
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

    const rawKey = process.env.IMGBB_KEY || '';
    const apiKey = rawKey.replace(/^IMGBB_KEY=\s*/i, '').replace(/["']/g, '').trim();
    if (!apiKey) {
        console.warn('⚠️ [ImgBB]: IMGBB_KEY is not defined in environment variables. Returning original URL.');
        return imageUrl;
    }

    try {
        console.log(`[ImgBB]: Downloading image from: ${imageUrl}`);
        const response = await axios.get(imageUrl, { 
            responseType: 'arraybuffer',
            timeout: 10000, // 10s download timeout
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const base64Image = Buffer.from(response.data).toString('base64');

        // Prepare multi-part form data with base64
        const form = new FormData();
        form.append('image', base64Image);

        console.log('[ImgBB]: Uploading base64 image to ImgBB API...');
        const uploadResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
            headers: form.getHeaders(),
            timeout: 15000 // 15s upload timeout
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
        return imageUrl; // Fallback to original URL on failure
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
    if (!prot.links) prot.links = { enabled: prot.antiLinks ?? false, punishment: prot.linkPunishment || 'timeout', punishmentDuration: '1h' };
    if (!prot.spam) prot.spam = { enabled: prot.antiSpam ?? false, punishment: prot.spamPunishment || 'timeout', punishmentDuration: '10m' };
    if (!db[guildId].violations) db[guildId].violations = [];
    if (!db[guildId].suggestions) db[guildId].suggestions = {};
    if (db[guildId].musicEnabled === undefined) db[guildId].musicEnabled = false;
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
    if (azkarTimers.has(guildId)) {
        clearInterval(azkarTimers.get(guildId));
        azkarTimers.delete(guildId);
    }
    const safeMinutes = Math.max(1, parseInt(intervalMinutes) || 30);
    const timer = setInterval(async () => {
        try {
            const guild = await client.guilds.fetch(guildId).catch(() => null);
            if (!guild) return;
            const channel = await guild.channels.fetch(channelId).catch(() => null);
            if (!channel) return;
            const randomAzkar = mainAzkarList[Math.floor(Math.random() * mainAzkarList.length)];
            const buffer = await generateAzkarCard(randomAzkar.title, randomAzkar.text, randomAzkar.ref);
            const attachment = new AttachmentBuilder(buffer, { name: 'azkar.png' });
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('azkar_click').setEmoji('1516425996793024552').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('azkar_mosque').setEmoji('1516897918496542760').setStyle(ButtonStyle.Secondary)
            );
            const embed = new EmbedBuilder().setColor('#815c84').setDescription(`✨ **${randomAzkar.title}**\n\n**المرجع:** ${randomAzkar.ref}\n\n*تأمل الذكر واستحضر النية والتسبيح 🌸*`).setImage('attachment://azkar.png');
            const payload = { embeds: [embed], files: [attachment], components: [row] };
            if (roleId) payload.content = roleId === guildId ? '@everyone' : `<@&${roleId}>`;
            await channel.send(payload);
        } catch (e) { console.error(e); }
    }, safeMinutes * 60 * 1000);
    azkarTimers.set(guildId, timer);
}

function initAzkar() {
    const db = getDB();
    for (const [gId, data] of Object.entries(db)) {
        if (data.azkar && data.azkar.enabled !== false && data.azkar.channelId) {
            startAzkarScheduler(gId, data.azkar.channelId, data.azkar.interval, data.azkar.roleId);
        }
    }
}

global.reloadAzkar = function(guildId) {
    const db = getDB();
    const data = db[guildId];
    if (data && data.azkar && data.azkar.enabled !== false && data.azkar.channelId) {
        startAzkarScheduler(guildId, data.azkar.channelId, data.azkar.interval, data.azkar.roleId);
    } else {
        if (azkarTimers.has(guildId)) {
            clearInterval(azkarTimers.get(guildId));
            azkarTimers.delete(guildId);
        }
    }
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

function parseDuration(str) {
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
        if (pun === 'ban') {
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
            const ms = parseDuration(durationStr);
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

function getProtectionEmbedAndComponents(guildId) {
    ensureGuildData(guildId);
    const db = getDB(), protect = db[guildId].protection || {};
    const em = enabled => enabled ? '<:On:1517609916607762432>' : '<:Off:1517609914271404173>';
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
        const serversCount = client.guilds.cache.size;
        const usersCount = client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount || 0), 0);
        
        client.user.setPresence({
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

client.once('ready', async () => {
    console.log(`✅ NTL Bot Online: ${client.user.tag}`);

    // Set bot status initially and every 5 minutes
    updateBotStatus();
    setInterval(updateBotStatus, 5 * 60 * 1000);

    // Support AI Inactivity Reminder / Auto-Close Check (Runs every 15 minutes)
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
                { name: 'setup_ticket', description: 'إعداد نظام التكتات المتطور', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'ephemeral', description: 'تحديد ما إذا كنت تريد إخفاء الرسالة عن الآخرين', type: 5, required: false }] },
                { name: 'setup_azkar', description: 'إعداد وتنشيط نظام الأذكار التلقائي في رومات محددة', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'channel', description: 'الروم الذي تود إرسال الأذكار فيه', type: 7, channel_types: [ChannelType.GuildText], required: true }, { name: 'interval', description: 'المدة الزمنية الفاصلة بين كل ذكر وتنبيه', type: 3, required: true, choices: [{ name: 'كل 5 دقائق', value: '5' }, { name: 'كل 10 دقائق', value: '10' }, { name: 'كل 20 دقيقة', value: '20' }, { name: 'كل 30 دقيقة', value: '30' }, { name: 'كل ساعة', value: '60' }, { name: 'كل ساعتين', value: '120' }, { name: 'كل 6 ساعات', value: '360' }, { name: 'كل 12 ساعة', value: '720' }] }, { name: 'role', description: 'الرتبة التي تود منشنها فور نزول الذكر (اختياري)', type: 8, required: false }] },
                { name: 'setup_suggestion', description: 'إعداد وتنشيط نظام الاقتراحات المطور', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'channel', description: 'الروم المعتمد لإرسال ونشر الاقتراحات فيه', type: 7, channel_types: [ChannelType.GuildText], required: true }, { name: 'title', description: 'عنوان الرسالة أو اللوحة الخاصة بنظام الاقتراحات', type: 3, required: true }, { name: 'description', description: 'تفاصيل ووصف اللوحة الإرشادية للاقتراحات', type: 3, required: true }, { name: 'image_url', description: 'رابط صورة مخصصة لإيمبد الاقتراحات من الاستوديو (اختياري)', type: 3, required: false }, { name: 'use_server_icon', description: 'تفعيل خيار استخدام لوجو السيرفر كصورة أساسية بالرسالة', type: 5, required: false }] },
                { name: 'protection', description: 'لوحة التحكم وإدارة نظام الحماية الذاتي للسيرفر ضد التخريب', default_member_permissions: PermissionFlagsBits.Administrator.toString(), options: [{ name: 'ephemeral', description: 'تحديد ما إذا كنت تريد إخفاء الرسالة عن الآخرين', type: 5, required: false }] },
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
                    name: 'ai',
                    description: 'إعداد وتدريب المساعد الذكي الاصطناعي للسيرفر',
                    default_member_permissions: PermissionFlagsBits.Administrator.toString()
                },
                {
                    name: 'support',
                    description: 'عرض السيرفرات الداعمة للبوت وقائمة المواقع والروابط المدعومة',
                    options: [
                        {
                            name: 'server',
                            description: 'عرض قائمة السيرفرات الداعمة للبوت',
                            type: 1
                        },
                        {
                            name: 'link',
                            description: 'عرض قائمة بجميع المواقع والروابط المدعومة للتخطي',
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
            flags: MessageFlags.IsComponentsV2
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
    const claimEmoji = isClaimed ? '1516360711633109052' : '1516357850207879209';
    const claimLabel = isClaimed ? 'Unclaim' : 'Claim';
    
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

client.on('guildMemberAdd', async member => {
    if (!member.user.bot) {
        try {
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
    try {
        // Strip out or replace @everyone and @here just in case to avoid any potential pinging
        let safeContent = cleanResponse
            .replace(/@everyone/g, '@\u200beveryone')
            .replace(/@here/g, '@\u200bhere');
        
        // Also remove/strip any role pings <@&roleId> to protect against role pinging
        safeContent = safeContent.replace(/<@&(\d+)>/g, '@role');

        // Strictly enforce 3 lines maximum
        let lines = safeContent.split('\n');
        if (lines.length > 3) {
            safeContent = lines.slice(0, 3).join('\n');
        }

        const targetChannel = message.channel.isThread() ? message.channel.parent : message.channel;
        
        if (targetChannel && typeof targetChannel.fetchWebhooks === 'function') {
            const webhooks = await targetChannel.fetchWebhooks().catch(() => null);
            let webhook = webhooks ? webhooks.find(w => w.owner.id === client.user.id) : null;
            
            const whName = (aiConfig.name && aiConfig.name.trim().length > 0) ? aiConfig.name.substring(0, 32) : 'مساعد ذكي';
            const finalAvatarURL = (aiConfig.avatar && aiConfig.avatar.startsWith('http')) ? aiConfig.avatar : client.user.displayAvatarURL({ extension: 'png', size: 256 });

            if (!webhook) {
                webhook = await targetChannel.createWebhook({
                    name: whName,
                    avatar: finalAvatarURL
                }).catch(() => null);
            }
            
            if (webhook) {
                await webhook.send({
                    content: safeContent,
                    username: whName,
                    avatarURL: finalAvatarURL,
                    threadId: message.channel.isThread() ? message.channel.id : undefined,
                    allowedMentions: { parse: ['users'] }
                });
                return;
            }
        }
    } catch (e) {
        console.error('Failed to send AI response via Webhook, falling back to standard reply:', e);
    }
    
    // Fallback: standard message reply with safe allowedMentions
    let safeContent = cleanResponse
        .replace(/@everyone/g, '@\u200beveryone')
        .replace(/@here/g, '@\u200bhere');
    safeContent = safeContent.replace(/<@&(\d+)>/g, '@role');

    // Strictly enforce 3 lines maximum
    let lines = safeContent.split('\n');
    if (lines.length > 3) {
        safeContent = lines.slice(0, 3).join('\n');
    }

    await message.reply({
        content: safeContent,
        allowedMentions: { parse: ['users'], repliedUser: true }
    }).catch(console.error);
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
                const isMatch = resp.matchType === 'exact' ? (msgText === kw) : (msgText.includes(kw));

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
                    await message.delete().catch(() => {});

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
                        return;
                    }

                    activeBypassUsers.add(message.author.id);

                    // إرسال رسالة انتظار تمنشن العضو داخل الحاوية دون نص عادي لتفادي الأخطاء ومخالفات API
                    const loadingContainer = new ContainerBuilder()
                        .setAccentColor(0x2b2d31)
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `# Extracting your key <a:Reset:1516390093504385074>`
                            )
                        );

                    const replyMsg = await message.channel.send({
                        components: [loadingContainer],
                        flags: MessageFlags.IsComponentsV2
                    }).catch((err) => {
                        console.error('[Delta Auto-Bypass loading message send error]:', err);
                        return null;
                    });

                    try {
                        const startTime = Date.now();
                        const { bypassedLink, error, isUnsupported } = await bypassDeltaLink(deltaLink);
                        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

                        if (bypassedLink) {
                            const container = new ContainerBuilder()
                                .setAccentColor(0x57f287) // Green
                                .addTextDisplayComponents((textDisplay) =>
                                    textDisplay.setContent(
                                        `### Key bypassed <:Yea:1516534090751279257>\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        ` **Key for phone <:Phone:1521152101475160094>:\n` +
                                        `\`${bypassedLink}\`\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `Key for pc <:Pc:1521152784320434236>:\n` +
                                        `\`\`\`${bypassedLink}\`\`\`**\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                    )
                                )
                                .addActionRowComponents((actionRow) =>
                                    actionRow.setComponents(
                                        new ButtonBuilder()
                                            .setEmoji('1511327391669026916')
                                            .setStyle(ButtonStyle.Link)
                                            .setURL('https://discord.gg/hBvzFrqQP2')
                                    )
                                );

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
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
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
                            }
                        } else {
                            const container = new ContainerBuilder()
                                .setAccentColor(0xff4d4d) // Red
                                .addTextDisplayComponents((textDisplay) =>
                                    textDisplay.setContent(
                                        `### التخطي ملغي <:No:1516534087161221233>\n` +
                                        `bypass cancelled\n` +
                                        `-#  ~~                                                                                                                                                                   ~~\n` +
                                        `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                    )
                                );

                            if (replyMsg) {
                                await replyMsg.edit({
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
                            } else {
                                await message.channel.send({
                                    components: [container],
                                    flags: MessageFlags.IsComponentsV2
                                }).catch(() => {});
                            }
                        }
                    } catch (apiError) {
                        console.error('[Delta Auto-Bypass fetch exception]:', apiError);
                        const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
                        const container = new ContainerBuilder()
                            .setAccentColor(0xff4d4d) // Red
                            .addTextDisplayComponents((textDisplay) =>
                                textDisplay.setContent(
                                    `### التخطي ملغي <:No:1516534087161221233>\n` +
                                    `bypass cancelled\n` +
                                    `-#  ~~                                                                                                                                                                   ~~\n` +
                                    `-# Request by ${message.author.username} - in ${timeTaken}s - عبر الرابط`
                                )
                            );

                        if (replyMsg) {
                            await replyMsg.edit({
                                components: [container],
                                flags: MessageFlags.IsComponentsV2
                            }).catch(() => {});
                        } else {
                            await message.channel.send({
                                components: [container],
                                flags: MessageFlags.IsComponentsV2
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
        if (/(https?:\/\/[^\s]+|:\/\/[^\s]+)/gi.test(message.content)) {
            await message.delete().catch(() => {});
            const msg = await message.channel.send(`⚠️ | ${message.author} يمنع إرسال الروابط حفاظاً على أمن السيرفر!`);
            setTimeout(() => msg.delete().catch(() => {}), 5000);
            await applyPunishment(message.guild, message.author, protectLink, 'إرسال رابط غير مسموح به', message.content.substring(0, 50));
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

        // Global Free / Premium AI Mode Commands
        if (trimmedContent === '-مجاني') {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== message.guild.ownerId) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص للإداريين فقط!**').catch(() => {});
            }
            db.globalAiFree = true;
            saveDB(db);
            return message.reply('🎉 **تم تحويل الذكاء الاصطناعي إلى نظام مجاني متاح لجميع السيرفرات!**\nيمكن لجميع السيرفرات الآن التفاعل مع الذكاء الاصطناعي بدون قيود.').catch(() => {});
        }

        if (trimmedContent === '-بريميوم') {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== message.guild.ownerId) {
                return message.reply('❌ **عذراً، هذا الأمر مخصص للإداريين فقط!**').catch(() => {});
            }
            db.globalAiFree = false;
            saveDB(db);
            return message.reply('💎 **تم إعادة الذكاء الاصطناعي إلى نظام البريميوم القديم.**\nالسيرفرات التي تمتلك اشتراك بريميوم مسبقاً ستظل محتفظة بخدمة الذكاء الاصطناعي وتستطيع استخدامه كالمعتاد.').catch(() => {});
        }
    }

    // AI Conversation Interceptor
    const aiConfig = db[message.guildId]?.ai;
    const isGlobalFree = db.globalAiFree || false;
    if (aiConfig && (aiConfig.status === 'متصل' || isGlobalFree)) {
        const isAdmin = message.member?.permissions.has(PermissionFlagsBits.Administrator);
        const trimmed = message.content.trim();
        if (isAdmin && (trimmed.startsWith('تعلم:') || trimmed.startsWith('قاعدة:'))) {
            let newRule = trimmed.replace(/^(تعلم:|قاعدة:)/, '').trim();
            if (newRule) {
                if (!aiConfig.knowledge) aiConfig.knowledge = [];
                aiConfig.knowledge.push(newRule);
                db[message.guildId].ai.knowledge = aiConfig.knowledge;
                saveDB(db);
                return message.reply(`🧠 **علمت بالملي! تم إضافة قاعدة جديدة لقواعد البيانات الخاصة بي:**\n> *${newRule}*`).catch(() => {});
            }
        }

        const validChannelId = (aiConfig.channelId && /^\d+$/.test(aiConfig.channelId)) ? aiConfig.channelId : null;
        const validCategoryId = (aiConfig.categoryId && /^\d+$/.test(aiConfig.categoryId)) ? aiConfig.categoryId : null;

        const inAIChannel = (validChannelId && message.channelId === validChannelId);
        const inAICategory = (validCategoryId && message.channel.parentId === validCategoryId);
        const isBotMentioned = message.mentions.users.has(client.user.id);
        const isInsulted = hasSwearWords(message.content);

        // Check if it's a reply to the bot
        let isReplyToBot = false;
        if (message.reference && message.reference.messageId) {
            try {
                const repliedMsg = await message.channel.messages.fetch(message.reference.messageId).catch(() => null);
                if (repliedMsg && repliedMsg.author.id === client.user.id) {
                    isReplyToBot = true;
                }
            } catch (e) {}
        }

        let shouldRespond = false;
        if (validChannelId || validCategoryId) {
            if (inAIChannel) {
                // Inside the dedicated AI channel, respond to every message
                shouldRespond = true;
            } else if (inAICategory) {
                // Inside the AI category, ONLY respond if the bot is explicitly mentioned or replied to
                if (isBotMentioned || isReplyToBot) {
                    shouldRespond = true;
                }
            } else {
                // In other channels, respond ONLY if explicitly mentioned or replied to
                if (isBotMentioned || isReplyToBot) {
                    shouldRespond = true;
                }
            }
        } else {
            // If neither is configured, respond ONLY if explicitly mentioned or replied to
            if (isBotMentioned || isReplyToBot) {
                shouldRespond = true;
            }
        }

        if (shouldRespond) {
            // Trigger typing indicator
            await message.channel.sendTyping().catch(() => {});

            let userPrompt = message.content;
            if (isBotMentioned) {
                userPrompt = userPrompt.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
            }

            // Fetch last 12 messages from the channel for conversation context
            let promptToUse = userPrompt;
            try {
                const recentMessages = await message.channel.messages.fetch({ limit: 12 }).catch(() => null);
                if (recentMessages && recentMessages.size > 0) {
                    // Reverse to chronological order (oldest first)
                    const sorted = Array.from(recentMessages.values()).reverse();
                    let chatHistoryText = "آخر دردشة في هذا الروم لفهم السياق العام وفكرة السيرفر:\n";
                    sorted.forEach(m => {
                        if (m.author.bot && m.author.id !== client.user.id) return; // Skip other bots
                        const senderName = m.author.id === client.user.id ? `أنت (${client.user.username})` : m.author.username;
                        const cleanMsg = m.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();
                        if (cleanMsg) {
                            chatHistoryText += `- ${senderName}: ${cleanMsg}\n`;
                        }
                    });
                    chatHistoryText += `\nالآن أجب باختصار وعفوية على الرسالة الجديدة من العضو ${message.author.username} (إذا أردت منشنته أو الإشارة إليه، استخدم الكود الخاص به فوراً: <@${message.author.id}>): ${userPrompt}`;
                    promptToUse = chatHistoryText;
                }
            } catch (err) {
                console.error("Failed to build chat history context:", err);
            }

            try {
                const isAdmin = message.member?.permissions.has(PermissionFlagsBits.Administrator);
                const systemPrompt = buildAISystemPrompt(message.guild, aiConfig, isAdmin, isInsulted);
                const rawResponse = await callGroqAPI(systemPrompt, promptToUse);

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
    }


});

client.on('interactionCreate', async interaction => {
    const isTranscriptRelated = interaction.customId && interaction.customId.startsWith('view_transcript_');
    const isDeltaRelated = (interaction.isChatInputCommand() && (interaction.commandName === 'bypass' || interaction.commandName === 'delta')) || 
                           (interaction.customId && (interaction.customId === 'toggle_bypass_btn' || interaction.customId.startsWith('bypass_') || interaction.customId.startsWith('modal_bypass_')));

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
        if (!isDeltaRelated && !isTranscriptRelated) {
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

    // Helper to check for admin-only button/menu/modal interactions
    const checkIsAdminInteraction = (inter) => {
        const customId = inter.customId;
        if (!customId) return false;
        
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
    if (isProtect) {
        if (customIdForProtect.includes('bots') && interaction.guild.ownerId !== interaction.user.id) {
            return interaction.reply({ content: '❌ تفعيل وإدارة حماية البوتات مخصصة حصرياً لمالك السيرفر (Owner).', ephemeral: true });
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
        // Enforce Administrator check for admin slash commands
        const adminCommands = ['setup_ticket', 'setup_azkar', 'setup_suggestion', 'protection', 'ai', 'key', 'video', 'script'];
        if (adminCommands.includes(interaction.commandName)) {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: '❌ هذا الأمر مخصص للمسؤولين فقط (Administrator).', ephemeral: true });
            }
        }
        if (interaction.commandName === 'setup_ticket') {
            const isEphem = interaction.options.getBoolean('ephemeral') ?? true;
            if (!db[interaction.guildId]) db[interaction.guildId] = {};
            db[interaction.guildId].setup_ephemeral = isEphem;
            saveDB(db);
            const menu = new StringSelectMenuBuilder().setCustomId('main_setup_menu').setPlaceholder('اختر من القائمة المنسدلة...')
                .addOptions(
                    { label: 'انشاء بانل', value: 'create_panel', emoji: { id: '1516365643379773490' } },
                    { label: 'اعدادات البانل', value: 'panel_settings', emoji: { id: '1516395313752182914' } },
                    { label: 'حذف بانل', value: 'delete_panel', emoji: { id: '1516357693328330782' } }
                );
            await interaction.reply({ content: '**اعدادات التكت يمكنك تسطيب التكت من الازرار <a:Gear:1516391965422387380>**', components: [new ActionRowBuilder().addComponents(menu)], ephemeral: isEphem });
        }
        if (interaction.commandName === 'setup_azkar') {
            const channel = interaction.options.getChannel('channel'), interval = parseInt(interaction.options.getString('interval')), role = interaction.options.getRole('role');
            if (!db[interaction.guildId]) db[interaction.guildId] = {};
            db[interaction.guildId].azkar = { channelId: channel.id, interval, roleId: role ? role.id : null };
            saveDB(db);
            startAzkarScheduler(interaction.guildId, channel.id, interval, role ? role.id : null);
            await interaction.reply({ content: `**<:Yea:1516534090751279257> | تم تسطيب الأذكار بنجاح**`, ephemeral: true });
        }
        if (interaction.commandName === 'setup_suggestion') {
            const ch = interaction.options.getChannel('channel'), title = interaction.options.getString('title'), desc = interaction.options.getString('description'), url = interaction.options.getString('image_url'), useIcon = interaction.options.getBoolean('use_server_icon') ?? false;
            db[interaction.guildId].suggestions = { channelId: ch.id, title, description: desc, imageUrl: url, useServerIcon: useIcon };
            saveDB(db);
            const em = new EmbedBuilder().setColor('#12a524').setTitle(title).setDescription(desc);
            if (url) em.setImage(url);
            else if (useIcon) { const icon = interaction.guild.iconURL({ size: 1024 }); if (icon) em.setImage(icon); }
            const r = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('publish_suggestion_prompt_btn').setLabel('نشر إقتراح').setEmoji('1517591602049056829').setStyle(ButtonStyle.Success));
            await ch.send({ embeds: [em], components: [r] });
            await interaction.reply({ content: '✅ تم إنشاء لوحة نظام الاقتراحات بنجاح!', ephemeral: true });
        }
        if (interaction.commandName === 'protection') {
            if (!interaction.member?.permissions?.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: '❌ هذا الأمر مخصص للمسؤولين فقط (Administrator).', ephemeral: true });
            const isEphem = interaction.options.getBoolean('ephemeral') ?? false;
            const data = getProtectionEmbedAndComponents(interaction.guildId);
            const reply = await interaction.reply({ ...data, ephemeral: isEphem, fetchReply: true });
            if (!isEphem) { db[interaction.guildId].protectionMessageId = reply.id; saveDB(db); }
        }

        if (interaction.commandName === 'bypass' || interaction.commandName === 'delta') {
            const deltaLink = interaction.options.getString('link');
            const botInGuild = interaction.guildId ? interaction.client.guilds.cache.has(interaction.guildId) : false;

            if (botInGuild) {
                if (!db[interaction.guildId]) db[interaction.guildId] = {};
                const keyConfig = db[interaction.guildId].deltaKeys;

                if (!keyConfig || keyConfig.enabled === false) {
                    return interaction.reply({ content: '❌ **عذراً، نظام المفاتيح غير مفعل في هذا السيرفر. يمكنك تفعيله من لوحة التحكم أو باستخدام أمر `/key on`.**', ephemeral: true });
                }

                if (keyConfig.channelId && interaction.channelId !== keyConfig.channelId) {
                    return interaction.reply({ content: `❌ **عذراً، يرجى استخدام هذا الأمر فقط في الروم المخصص: <#${keyConfig.channelId}>**`, ephemeral: true });
                }

                if (keyConfig.method === 'link') {
                    return interaction.reply({ content: `❌ **عذراً، نظام المفاتيح في هذا السيرفر مضبوط على "إرسال رابط فقط". يرجى إرسال الرابط مباشرة في الشات دون استخدام أمر \`/bypass\`!**`, ephemeral: true });
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

            await interaction.reply({
                components: [loadingContainer],
                flags: MessageFlags.IsComponentsV2
            });

            try {
                const startTime = Date.now();
                const { bypassedLink, error, isUnsupported } = await bypassDeltaLink(deltaLink);
                const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

                if (bypassedLink) {
                    const container = new ContainerBuilder()
                        .setAccentColor(0x57f287) // Green
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `### Key bypassed <:Yea:1516534090751279257>\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                ` **Key for phone <:Phone:1521152101475160094>:\n` +
                                `\`${bypassedLink}\`\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `Key for pc <:Pc:1521152784320434236>:\n` +
                                `\`\`\`${bypassedLink}\`\`\`**\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                            )
                        )
                        .addActionRowComponents((actionRow) =>
                            actionRow.setComponents(
                                new ButtonBuilder()
                                    .setEmoji('1511327391669026916')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL('https://discord.gg/hBvzFrqQP2')
                            )
                        );

                    await interaction.editReply({
                        components: [container],
                        flags: MessageFlags.IsComponentsV2
                    }).catch(() => {});

                    // إرسال رسالة نصية منفصلة بعد الايمبد وتتم إزالتها تلقائياً بعد 3 ثواني
                    interaction.channel.send({
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
                        components: [container],
                        flags: MessageFlags.IsComponentsV2
                    }).catch(() => {});
                } else {
                    const container = new ContainerBuilder()
                        .setAccentColor(0xff4d4d) // Red
                        .addTextDisplayComponents((textDisplay) =>
                            textDisplay.setContent(
                                `### التخطي ملغي <:No:1516534087161221233>\n` +
                                `bypass cancelled\n` +
                                `-#  ~~                                                                                                                                                                   ~~\n` +
                                `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                            )
                        );

                    await interaction.editReply({
                        components: [container],
                        flags: MessageFlags.IsComponentsV2
                    }).catch(() => {});
                }
            } catch (apiError) {
                console.error('[Delta Bypass fetch exception]:', apiError);
                const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
                const container = new ContainerBuilder()
                    .setAccentColor(0xff4d4d) // Red
                    .addTextDisplayComponents((textDisplay) =>
                        textDisplay.setContent(
                            `### التخطي ملغي <:No:1516534087161221233>\n` +
                            `bypass cancelled\n` +
                            `-#  ~~                                                                                                                                                                   ~~\n` +
                            `-# Request by ${interaction.user.username} - in ${timeTaken}s`
                        )
                    );

                await interaction.editReply({
                    components: [container],
                    flags: MessageFlags.IsComponentsV2
                }).catch(() => {});
            } finally {
                activeBypassUsers.delete(interaction.user.id);
            }
        }

        if (interaction.commandName === 'ai') {
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: '❌ هذا الأمر مخصص للإدارة فقط (Administrator).', ephemeral: true });
            }

            const isPremium = isGuildPremium(interaction.guildId);
            if (!isPremium) {
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

            // Ensure guild has DB and AI config initialized
            if (!db[interaction.guildId]) db[interaction.guildId] = {};
            const aiData = db[interaction.guildId].ai || {
                name: 'غير محدد',
                avatar: 'غير محدد',
                status: 'غير متصل',
                channelId: null,
                categoryId: null,
                trainingType: null,
                knowledge: [],
                autoTrainedData: ''
            };
            db[interaction.guildId].ai = aiData;
            saveDB(db);

            const embed = new EmbedBuilder()
                .setColor('#2b2d31')
                .setTitle('إعدادات الذكاء الاصطناعي')
                .setDescription(
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

            const uId = interaction.user.id;
            const row1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`ai_set_name_${uId}`).setLabel('اسم الذكاء الاصطناعي').setEmoji('1516365639760085033').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId(`ai_set_avatar_${uId}`).setLabel('صورة الذكاء الاصطناعي').setEmoji('1516575747425439975').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId(`ai_set_status_${uId}`).setLabel('تعديل حالة الذكاء').setEmoji('1521449964591517807').setStyle(ButtonStyle.Secondary)
            );

            const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`ai_set_channel_${uId}`).setLabel('روم الكلام مع الـai').setEmoji('1516365641823551528').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId(`ai_set_category_${uId}`).setLabel('تحديد كاتاجوري').setEmoji('📁').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId(`ai_train_prompt_${uId}`).setLabel('تدريب الذكاء الاصطناعي').setEmoji('1521452247270293524').setStyle(ButtonStyle.Danger)
            );

            const row3 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId(`ai_ticket_panels_${uId}`).setLabel('ذكاء التذاكر / AI بالتذاكر').setEmoji('🎫').setStyle(ButtonStyle.Primary)
            );

            await interaction.reply({ embeds: [embed], components: [row1, row2, row3] });
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

        if (interaction.commandName === 'support') {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'server') {
                const db = getDB();
                const supportServers = db.supportServers || [];

                const embed = new EmbedBuilder()
                    .setColor('#2b2d31')
                    .setTitle('السيرفرات الداعمة لهذا البوت:')
                    .setDescription(supportServers.length > 0 
                        ? 'اضغط على الأزرار أدناه للانضمام إلى السيرفرات الداعمة للبوت:' 
                        : 'لا توجد سيرفرات داعمة مسجلة حالياً.');

                const rows = [];
                if (supportServers.length > 0) {
                    let currentRow = new ActionRowBuilder();
                    supportServers.forEach((srv, index) => {
                        const btn = new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setURL(srv.inviteUrl)
                            .setLabel(`${srv.guildName} | ${srv.botName || client.user.username}`);

                        if (srv.emojiId) {
                            btn.setEmoji(srv.emojiId);
                        }

                        currentRow.addComponents(btn);

                        if (currentRow.components.length === 5 || index === supportServers.length - 1) {
                            rows.push(currentRow);
                            currentRow = new ActionRowBuilder();
                        }
                    });
                }

                await interaction.reply({
                    embeds: [embed],
                    components: rows,
                    ephemeral: true
                });
            } else if (subcommand === 'link') {
                const embed = new EmbedBuilder()
                    .setColor('#2b2d31')
                    .setTitle('🌐 المواقع والروابط المدعومة لنظام التخطي')
                    .setDescription('قائمة بجميع خدمات واختصارات الروابط التي يدعم البوت تجاوزها تلقائياً:')
                    .addFields(
                        {
                            name: '🔥 Popular Ad-link Services',
                            value: '• Linkvertise.com\n• Admaven (Lootlabs.gg / Lootlinks.com)\n• Paster.so, Paster.gg\n• Work.ink (جميع النطاقات)\n• Cuty.io, Cety.io\n• Boost.ink\n• Lockr.so\n• Mendationforc.info',
                            inline: false
                        },
                        {
                            name: '🔓 Social Unlock Sites',
                            value: '• Rekonise.com\n• Link-Unlock.com / Linkunlocker.com\n• Mboost.me, Bst.gg, Booo.st\n• Social-unlock.com / Socialwolvez.com\n• Sub2get.com / Sub2unlock.com / Sub2unlock.net\n• Sub4unlock.io / Subfinal.com\n• Unlocknow.net / Ytsubme.com',
                            inline: false
                        },
                        {
                            name: '📝 Paster Sites',
                            value: '• Justpaste.it / Paste-drop.com\n• Pastebin.com / Pastecanyon.com\n• Pastehill.com / Pastemode.com\n• Rentry.org',
                            inline: false
                        },
                        {
                            name: '✂️ URL Shorteners',
                            value: '• Bit.ly, Cl.gy, Goo.gl, Is.Gd\n• Rebrand.ly, Rkns.link, Shorter.me\n• T.co, T.ly, Tiny.cc, Tinylink.onl\n• Tinyurl.com, V.gd',
                            inline: false
                        }
                    )
                    .setFooter({ text: 'يمكنك إرسال أي رابط مدعوم أو استخدام الأمر /bypass لتخطيه مباشرة!' });

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        }

        if (interaction.commandName === 'video') {
            const status = interaction.options.getString('downloader') || interaction.options.getSubcommand(false);
            const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

            if (!db[interaction.guildId]) db[interaction.guildId] = {};

            if (status === 'on') {
                db[interaction.guildId].videoDownloader = {
                    enabled: true,
                    channelId: targetChannel.id
                };
                saveDB(db);
                return interaction.reply({
                    content: `<:Yea:1516534090751279257> |** تم تفعيل نظام تنزيل الفيديوهات بدون علامة مائية في روم <#${targetChannel.id}> **`,
                    ephemeral: true
                });
            } else {
                db[interaction.guildId].videoDownloader = {
                    enabled: false,
                    channelId: null
                };
                saveDB(db);
                return interaction.reply({
                    content: `<:No:1516534087161221233> |** تم إيقاف نظام تنزيل الفيديوهات بدون علامة مائية **`,
                    ephemeral: true
                });
            }
        }

        if (interaction.commandName === 'script') {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'setup') {
                const channel = interaction.options.getChannel('channel');
                const prefix = interaction.options.getString('prefix') || 'سكربت';

                ensureGuildData(interaction.guildId);
                const db = getDB();
                if (!db[interaction.guildId]) db[interaction.guildId] = {};
                db[interaction.guildId].scriptSystem = {
                    enabled: true,
                    channelId: channel.id,
                    prefix: prefix
                };
                saveDB(db);

                const container = new ContainerBuilder()
                    .setAccentColor(0x57f287)
                    .addTextDisplayComponents((td) =>
                        td.setContent(
                            `### 📜 **إعداد نظام البحث عن السكربتات**\n` +
                            `- **الروم المحدد:** <#${channel.id}>\n` +
                            `- **البريفيكس المستخدم:** \`${prefix}\`\n` +
                            `- **الحالة الحالية:** \`مفعل ✅\`\n\n` +
                            `- يمكنك استخدام زر التغيير بالأسفل لتشغيل أو تعطيل النظام في أي وقت.`
                        )
                    )
                    .addActionRowComponents(
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setCustomId(`script_sys_enable_${channel.id}`)
                                .setLabel('تشغيل')
                                .setEmoji('1516534090751279257')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId(`script_sys_disable_${channel.id}`)
                                .setLabel('تعطيل')
                                .setEmoji('1516534087161221233')
                                .setStyle(ButtonStyle.Danger)
                        )
                    );

                return await interaction.reply({
                    components: [container],
                    flags: MessageFlags.IsComponentsV2,
                    ephemeral: true
                }).catch(() => {});
            }
        }

        if (interaction.commandName === 'lira') {
            const targetUser = interaction.options.getUser('user');
            const amount = interaction.options.getInteger('amount');

            return await handleLiraCommand({
                sender: interaction.user,
                channel: interaction.channel,
                targetUser: targetUser,
                amount: amount,
                isInteraction: true,
                interaction: interaction
            });
        }
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
            components: [container],
            flags: MessageFlags.IsComponentsV2
        }).catch(() => {});
    }

    if (interaction.isButton() && (interaction.customId.startsWith('script_guide_') || interaction.customId === 'script_guide_btn')) {
        ensureGuildData(interaction.guildId);
        const db = getDB();
        const prefix = db[interaction.guildId]?.scriptSystem?.prefix || 'سكربت';

        const guideContainer = new ContainerBuilder()
            .setAccentColor(0x5865f2)
            .addTextDisplayComponents((td) =>
                td.setContent(
                    `### **دليل الإستخدام** <:Userguide:1535980867539697714>\n\n` +
                    `**طريقة البحث عن السكربتات في الروم المخصص:**\n\n` +
                    `• **البحث العادي (عشوائي / جميع السكربتات):**\n` +
                    `اكتب البريفيكس متبوعاً باسم الماب أو السكربت:\n` +
                    `\`${prefix} بلوكس فروت\`  أو  \`${prefix} Blox Fruits\`\n\n` +
                    `• **البحث عن سكربت بمفتاح فقط:**\n` +
                    `اكتب كلمة **مفتاح** في نهاية الطلب:\n` +
                    `\`${prefix} بلوكس فروت مفتاح\`\n\n` +
                    `• **البحث عن سكربت بدون مفتاح:**\n` +
                    `اكتب كلمة **بدون مفتاح** في نهاية الطلب:\n` +
                    `\`${prefix} بلوكس فروت بدون مفتاح\`\n\n` +
                    `• **التنقل بين نتائج السكربتات:**\n` +
                    `استخدم زر السهم الأيمن **<:Right:1535982050455060520>** والسهم الأيسر **<:Left:1535982052632035429>** للتبديل بين النتائج والصفحات.`
                )
            );

        return await interaction.reply({
            components: [guideContainer],
            flags: MessageFlags.IsComponentsV2,
            ephemeral: true
        }).catch(() => {});
    }

    if (interaction.isButton() && (interaction.customId.startsWith('script_nav_left_') || interaction.customId.startsWith('script_nav_right_'))) {
        const isLeft = interaction.customId.startsWith('script_nav_left_');
        const msgId = interaction.message.id;
        const cacheData = scriptSearchCache.get(msgId);

        if (!cacheData || !cacheData.scripts || cacheData.scripts.length === 0) {
            return await interaction.reply({
                content: '❌ **انتهت صلاحية جلسة البحث هذه. يرجى إرسال رسالة بحث جديدة.**',
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
            components: [container],
            flags: MessageFlags.IsComponentsV2
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
                    components: [container],
                    flags: MessageFlags.IsComponentsV2
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
                    components: [container],
                    flags: MessageFlags.IsComponentsV2
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
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`protect_activate_${cat}`).setLabel('تفعيل').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId(`protect_deactivate_${cat}`).setLabel('تعطيل').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId(`protect_punish_select_${cat}`).setLabel('تحديد العقوبة').setStyle(ButtonStyle.Primary)
        );
        await interaction.reply({ content: `⚙️ **لوحة التحكم بـ ${labels[cat]}:**`, components: [row], ephemeral: true });
    }

    if (interaction.isButton() && (interaction.customId.startsWith('protect_activate_') || interaction.customId.startsWith('protect_deactivate_'))) {
        const act = interaction.customId.includes('protect_activate_'), cat = interaction.customId.split('_')[2];
        db[interaction.guildId].protection[cat].enabled = act; saveDB(db);
        const labels = { permissions: 'حماية الصلاحيات', roles: 'حماية الرتب', channels: 'حماية الرومات', bots: 'حماية البوتات', links: 'حماية الروابط', spam: 'حماية السبام' };
        const dMsgId = db[interaction.guildId].protectionMessageId;
        if (dMsgId) {
            const ch = interaction.channel;
            const msg = await ch.messages.fetch(dMsgId).catch(() => null);
            if (msg) { const data = getProtectionEmbedAndComponents(interaction.guildId); await msg.edit({ embeds: data.embeds, components: data.components }).catch(()=>{}); }
        }
        await interaction.reply({ content: `**${act ? '<:Yea:1516534090751279257>' : '<:No:1516534087161221233>'} | تم ${act ? 'تفعيل' : 'تعطيل'} ${labels[cat]} بنجاح!**`, ephemeral: true });
    }

    if (interaction.isButton() && interaction.customId.startsWith('protect_punish_select_')) {
        const cat = interaction.customId.split('_')[3];
        const menu = new StringSelectMenuBuilder().setCustomId(`set_punishment_${cat}`).setPlaceholder('اختر نوع العقوبة لفرضه...')
            .addOptions([{ label: 'تايم اوت (Timeout)', value: 'timeout' }, { label: 'بان (Ban)', value: 'ban' }, { label: 'طرد (Kick)', value: 'kick' }]);
        await interaction.update({ content: '🚨 **اختر نوع العقوبة عند المخالفة:**', components: [new ActionRowBuilder().addComponents(menu)] });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('set_punishment_')) {
        const cat = interaction.customId.split('_')[2], val = interaction.values[0];
        if (val === 'timeout') {
            const modal = new ModalBuilder().setCustomId(`modal_timeout_duration_${cat}`).setTitle('تحديد مدة التايم اوت');
            modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('duration_input').setLabel('المدة الزمنية (مثل: 10m, 2h, 3d)').setStyle(TextInputStyle.Short).setRequired(true)));
            await interaction.showModal(modal);
        } else {
            db[interaction.guildId].protection[cat].punishment = val; saveDB(db);
            await interaction.update({ content: `✅ **تم تعيين عقوبة ${cat} إلى [${val}] بنجاح!**`, components: [] });
        }
    }

    if (interaction.isModalSubmit() && interaction.customId.startsWith('modal_timeout_duration_')) {
        const cat = interaction.customId.split('_')[3], dur = interaction.fields.getTextInputValue('duration_input');
        db[interaction.guildId].protection[cat].punishment = 'timeout';
        db[interaction.guildId].protection[cat].punishmentDuration = dur; saveDB(db);
        await interaction.reply({ content: `✅ **تم تثبيت عقوبة التايم اوت لـ ${cat} لمدة [ ${dur} ] بنجاح!**`, ephemeral: true });
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

        // 2c. MODAL SUBMIT FOR PERSONALITY & INSTRUCTIONS
        if (interaction.isModalSubmit() && interaction.customId.startsWith('ai_modal_manual_config_')) {
            const personality = interaction.fields.getTextInputValue('ai_manual_personality');
            const instructions = interaction.fields.getTextInputValue('ai_manual_instructions') || '';

            db[interaction.guildId].ai.personality = personality;
            db[interaction.guildId].ai.customInstructions = instructions;
            db[interaction.guildId].ai.trainingType = 'manual';
            saveDB(db);

            return await interaction.reply({
                content: '✅ **تم حفظ شخصية البوت وطريقة كلامه وتعليماته المخصصة بالملي!**\nسيلتزم البوت بشخصيته وقواعده الجديدة تماماً وبكل دقة في جميع الردود.',
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
            flags: MessageFlags.IsComponentsV2
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
                    const btn = new ButtonBuilder()
                        .setCustomId(`ticket_panel_btn_${pid}_${idx}`)
                        .setLabel(b.name)
                        .setStyle(ButtonStyle.Primary);
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

        if (panel.roles && panel.roles.length > 0) {
            panel.roles.forEach(roleId => {
                permissionOverwrites.push({
                    id: roleId,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
                });
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

        const welcomeText = (panel.welcome && typeof panel.welcome === 'string' && panel.welcome.trim().length > 0)
            ? panel.welcome
            : 'مرحباً بك في التذكرة! تفضل بكتابة استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.';
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`تذكرة جديدة | ${chName}`)
            .setDescription(welcomeText)
            .setFooter({ text: 'لإغلاق التذكرة، استخدم القائمة المنسدلة لإدارة التذكرة.' });
        const displayWelcomeImgUrl = getAbsoluteUrl(panel.welcome_img || 'لايوجد');
        if (displayWelcomeImgUrl && displayWelcomeImgUrl !== 'لايوجد' && displayWelcomeImgUrl.startsWith('http')) {
            welcomeEmbed.setImage(displayWelcomeImgUrl);
        }

        const row = getTicketComponents({ id: ticketId, claimerId: null, guildId: interaction.guildId, panelId: pid }, interaction.guildId);

        await ch.send({ content: `مرحباً بك <@${interaction.user.id}> | طاقم الدعم <@&${panel.roles?.[0] || ''}>`, embeds: [welcomeEmbed], components: row });
        await interaction.editReply({ content: `<:Hastag:1516365641823551528> | تم إنشاء تذكرتك بنجاح: ${ch}` });

        if (isSupportAiActive) {
            setTimeout(async () => {
                try {
                    await ch.sendTyping().catch(() => {});
                    const systemPrompt = `أنت "مساعد الدعم الفني الذكي" الخاص بسيرفر "${interaction.guild.name}".
تلقيت للتو تذكرة جديدة تم فتحها بواسطة العضو <@${interaction.user.id}>.
رحب بالعضو بحرارة بأسلوب أنيق ومباشر، واطلب منه كتابة تفاصيل استفساره أو طلبه لتقوم بإجابته أو ضبط وإعداد البوت له فوراً.`;
                    const greeting = await callGroqAPI(systemPrompt, `العضو ${interaction.user.username} فتح تذكرة جديدة.`);
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

        if (panel.roles && panel.roles.length > 0) {
            panel.roles.forEach(roleId => {
                permissionOverwrites.push({
                    id: roleId,
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.EmbedLinks]
                });
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

        const welcomeTextSelect = (panel.welcome && typeof panel.welcome === 'string' && panel.welcome.trim().length > 0)
            ? panel.welcome
            : 'مرحباً بك في التذكرة! تفضل بكتابة استفسارك وسيقوم فريق الدعم بالرد عليك في أقرب وقت.';
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`تذكرة جديدة | ${chName}`)
            .setDescription(welcomeTextSelect)
            .setFooter({ text: 'لإغلاق التذكرة، استخدم القائمة المنسدلة لإدارة التذكرة.' });
        const displayWelcomeImgUrl = getAbsoluteUrl(panel.welcome_img || 'لايوجد');
        if (displayWelcomeImgUrl && displayWelcomeImgUrl !== 'لايوجد' && displayWelcomeImgUrl.startsWith('http')) {
            welcomeEmbed.setImage(displayWelcomeImgUrl);
        }

        const row = getTicketComponents({ id: ticketId, claimerId: null, guildId: interaction.guildId, panelId: pid }, interaction.guildId);

        await ch.send({ content: `مرحباً بك <@${interaction.user.id}> | طاقم الدعم <@&${panel.roles?.[0] || ''}>`, embeds: [welcomeEmbed], components: row });
        await interaction.editReply({ content: `<:Hastag:1516365641823551528> | تم إنشاء تذكرتك بنجاح: ${ch}` });

        if (isSupportAiActiveSelect) {
            setTimeout(async () => {
                try {
                    await ch.sendTyping().catch(() => {});
                    const systemPrompt = `أنت "مساعد الدعم الفني لـ NTL BOT" في سيرفر "${interaction.guild.name}".
تلقيت للتو تذكرة جديدة تم فتحها بواسطة العضو <@${interaction.user.id}>.
رحب بالعضو بحرارة بأسلوب أنيق ومباشر كـ "مساعد الدعم الفني لـ NTL BOT"، واطلب منه كتابة تفاصيل استفساره أو طلبه لتقوم بإجابته أو ضبط وإعداد البوت له فوراً.`;
                    const greeting = await callGroqAPI(systemPrompt, `العضو ${interaction.user.username} فتح تذكرة جديدة.`);
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
            await msg.startThread({ name: `نقاش - اقتراح ${interaction.user.username}`, autoArchiveDuration: 1440 }).catch(()=>{});
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

    // 1. Claim Button Handler
    if (interaction.isButton() && interaction.customId.startsWith('claim_') && !interaction.customId.startsWith('claim_request_')) {
        const tid = interaction.customId.split('_')[1];
        const { ticketInfo, panel, db: localDb } = getTicketHelper(interaction.guildId, interaction.channelId, tid);
        if (!ticketInfo) return interaction.reply({ content: '**<:No:1516534087161221233> | تعذر العثور على معلومات هذه التذكرة.**', ephemeral: true });

        const isSupport = checkIsSupportMember(interaction.member, panel);
        if (!isSupport) {
            return interaction.reply({ content: '**<:No:1516534087161221233> | ليس لديك صلاحية استلام هذه التذكرة. هذا الخيار مخصص فقط لطاقم الدعم الفني.**', ephemeral: true });
        }

        if (ticketInfo.creatorId && ticketInfo.creatorId === interaction.user.id) {
            return interaction.reply({ content: `**<:No:1516534087161221233> | لا يمكنك استلام تذكرتك الخاصة**`, ephemeral: true });
        }

        const currentClaimer = ticketInfo.claimerId;
        if (currentClaimer === null) {
            ticketInfo.claimerId = interaction.user.id;
            saveDB(localDb);
            const comps = getTicketComponents(ticketInfo, interaction.guildId);
            await interaction.update({ components: comps });
            
            // Send components v2 claim message
            await sendTicketActionLog(interaction.channel, interaction.user.id, 'claim', { tid: ticketInfo.id });
        } else {
            if (currentClaimer !== interaction.user.id && !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                return interaction.reply({ content: '**<:No:1516534087161221233> | لا يمكنك إلغاء استلام تذكرة مستلمة بواسطة عضو آخر.**', ephemeral: true });
            }
            ticketInfo.claimerId = null;
            saveDB(localDb);
            const comps = getTicketComponents(ticketInfo, interaction.guildId);
            await interaction.update({ components: comps });
            // On unclaim: Bot should not write anything in chat
        }
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

        ticketInfo.claimerId = interaction.user.id;
        saveDB(localDb);

        const comps = getTicketComponents(ticketInfo, interaction.guildId);
        await interaction.message.edit({ components: [] }).catch(() => {}); // disable or remove buttons from the old message

        await sendTicketActionLog(interaction.channel, interaction.user.id, 'claim', { tid: ticketInfo.id });

        // Update the welcome embed components
        try {
            const welcomeMsgs = await interaction.channel.messages.fetch({ limit: 50 });
            const welcomeMsg = welcomeMsgs.find(m => m.author.id === client.user.id && m.embeds.some(e => e.title && e.title.includes('تذكرة جديدة')));
            if (welcomeMsg) {
                await welcomeMsg.edit({ components: comps }).catch(() => {});
            }
        } catch (err) {}

        await interaction.reply({ content: '✅ تم نقل استلام التذكرة إليك بنجاح!', ephemeral: true });
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
        const localDb = getDB();
        const tickets = localDb[interaction.guildId]?.tickets || {};
        const ticketInfo = tickets[tid];
        
        if (ticketInfo) {
            const creatorId = ticketInfo.creatorId;
            const claimerId = ticketInfo.claimerId;
            const createdAt = ticketInfo.createdAt;
            const closedAt = Date.now();
            const closerId = interaction.user.id;
            
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
    let prompt = `أنت عضو وإنسان طبيعي ذكي جداً وعفوي تعيش وتتحدث في سيرفر ديسكورد اسمه "${guild.name}".\n`;
    prompt += `اسمك الحالي والشخصي في السيرفر هو: "${aiConfig.name || 'NTL Bot'}".\n\n`;
    
    prompt += `الشخصية واللهجة وطريقة الكلام (توجيهات صارمة وتطبيق بالملي):\n`;
    if (!aiConfig.trainingType) {
        prompt += `1. شخصيتك هي: ذكاء اصطناعي ذكي، طريف، عالي اللباقة، سريع البديهة وعفوي.\n`;
        prompt += `2. تتحدث بأسلوب عربي عامي راقٍ يدمج اللمسات الدافئة والأنيقة من اللهجتين الخليجية والشامية (مثل: "يا هلا والله"، "أبشر بالخير"، "من عيوني"، "تكرم عينك"، "وش تامر عليه يا الغالي").\n`;
        prompt += `3. أجب بذكاء واختصار مفيد، وتفاعل بأسلوب ودي وعصري مع الأعضاء.\n\n`;
    } else if (aiConfig.trainingType === 'manual') {
        prompt += `لقد قام مشرف/مالك السيرفر بتحديد شخصيتك وطريقة كلامك يدوياً، وتلتزم بها بذكاء واحترافية فائقة دون أي انحراف:\n`;
        prompt += `[الشخصية وطريقة الكلام المحددة بالملي]:\n${aiConfig.personality || 'شخص ذكي، محترم، هادئ ومفيد.'}\n\n`;
        if (aiConfig.customInstructions) {
            prompt += `[التعليمات والقواعد الخاصة بالسيرفر التي يجب تطبيقها بالملي]:\n${aiConfig.customInstructions}\n\n`;
        }
        prompt += `1. التزم بالتعليمات والشخصية أعلاه بدقة عالية وبكل ذكاء واحترافية وفق ما يطلبه المستخدم تماماً.\n`;
        prompt += `2. الإجابة تكون واضحة، دقيقة، ومفيدة وتفي بغرض السؤال كلياً.\n\n`;
    } else {
        prompt += `1. شخصيتك هي: شخص ذكي، مرح، نشيط، محترم، عصري وسريع البديهة!\n`;
        prompt += `2. تتحدث بلهجة عربية عامية سلسة وجذابة تجمع بين اللهجة الخليجية الدافئة واللهجة الشامية الأنيقة (مثل: "يا هلا والله"، "أبشر بالخير"، "من عيوني"، "تكرم عينك"، "منور السيرفر").\n`;
        prompt += `3. أجب بذكاء وفطنة، وتجنب الردود الآلية المكررة والجافة.\n\n`;
    }

    prompt += `استخدام الإيموجيات والرياكشن:\n`;
    prompt += `1. يمكنك التفاعل بوضع رياكشن بالرموز التعبيرية على رسالة العضو بإضافة هذا السطر تماماً في نهاية رسالتك: [REACTION: ايموجي] (مثال: [REACTION: 👍] أو [REACTION: 😂] أو [REACTION: ❤️]).\n`;

    if (guild.emojis && guild.emojis.cache.size > 0) {
        prompt += `2. إيموجيات السيرفر المخصصة التي يمكنك استخدامها هكذا في ردودك للتعبير (انسخ الرمز بالكامل ومغلق دون تعديل): \n`;
        guild.emojis.cache.first(35).forEach(e => {
            prompt += `- <:${e.name}:${e.id}>\n`;
        });
        prompt += `\n`;
    }

    if (aiConfig.knowledge && aiConfig.knowledge.length > 0) {
        prompt += `معلومات خاصة وقواعد للسيرفر تلتزم بها:\n`;
        aiConfig.knowledge.forEach((k, idx) => {
            prompt += `${idx + 1}. ${k}\n`;
        });
        prompt += `\n`;
    }
    
    if (isAdmin) {
        prompt += `⚠️ المستخدم الحالي هو مسؤول (Administrator) في السيرفر وله كامل الصلاحيات الإدارية.\n`;
        prompt += `إذا طلب منك إجراءً إدارياً، وافق فوراً واكتب كود الإجراء في نهاية ردك:\n`;
        prompt += `- [ACTION: GIVE_ROLE user:"USER_ID_OR_NAME" role:"ROLE_ID_OR_NAME"]\n`;
        prompt += `- [ACTION: REMOVE_ROLE user:"USER_ID_OR_NAME" role:"ROLE_ID_OR_NAME"]\n`;
        prompt += `- [ACTION: HIDE_CHANNEL] / [ACTION: SHOW_CHANNEL]\n`;
        prompt += `- [ACTION: CREATE_CHANNEL name:"اسم القناة"]\n`;
        prompt += `- [ACTION: DELETE_CHANNEL name:"اسم القناة"]\n`;
        prompt += `- [ACTION: CREATE_ROLE name:"اسم الرتبة"]\n`;
        prompt += `- [ACTION: DELETE_ROLE name:"اسم الرتبة"]\n\n`;
    } else {
        prompt += `المستخدم الحالي عضو عادي ولا يمكنك تنفيذ إجراءات إدارية له.\n\n`;
    }
    
    prompt += `قواعد عامة حاسمة:\n`;
    prompt += `1. يمنع منشن الجميع (@everyone / @here) مطلقاً.\n`;
    prompt += `2. ⚠️ **قاعدة حاسمة ومطلقة**: يمنع منعاً باتاً ونهائياً إعطاء مخرجات تحتوي على سياق الدردشة أو عناوين مثل "سجل الحوار" أو "آخر دردشة" أو "أنت (NTL BOT)". أرسل ردك المباشر والنهائي فقط الموجه للعضو!\n\n`;
    
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
        systemPrompt += `• أسلوب الكلام: تحدث بلباقة، احترام، ذكاء، وااحترافية عالية باللغة العربية مع العضو <@${message.author.id}> بأسلوب دمث وخليجي/شامي أنيق.\n`;
    }
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
    systemPrompt += `3. **تنفيذ الإجراءات البرمجية [ACTION: ...]**: عند الحاجة لتنفيذ أمر برمجياً، ادرج الكود المناسب بنهاية ردك ليتم تنفيذه فعلياً:\n`;
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
        const rawResponse = await callGroqAPI(systemPrompt, userPrompt, imageParts);
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

async function callGroqAPI(systemPrompt, userPrompt, imageParts = []) {
    const geminiParts = [...imageParts, { text: userPrompt }];

    const rawKeys = [
        GEMINI_API_KEY,
        "AQ.Ab8RN6KVozdbkJNadA1PQhJIQDw4RG2dtFbL0QJ_lE1B7T3uSQ",
        "AQ.Ab8RN6KtZV-aITY38VEBjKJNUiShcMJPuYXJrg9xrLi4OyKaeQ",
        process.env.GEMINI_API_KEY_2
    ];
    const geminiKeys = [];
    for (let i = 0; i < rawKeys.length; i++) {
        const k = rawKeys[i];
        if (k && typeof k === 'string' && k.length > 10 && !geminiKeys.includes(k)) {
            geminiKeys.push(k);
        }
    }

    const geminiModels = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite"
    ];

    const providers = [];

    // 1. Google AI Gemini (Multiple Keys x Multiple Models)
    for (let kIdx = 0; kIdx < geminiKeys.length; kIdx++) {
        const key = geminiKeys[kIdx];
        for (const model of geminiModels) {
            providers.push({
                name: `Google AI (${model} - Key #${kIdx + 1})`,
                fn: async () => {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
                    const body = JSON.stringify({
                        systemInstruction: { parts: [{ text: systemPrompt }] },
                        contents: [{ parts: geminiParts }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
                    });
                    const res = await httpRequest(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
                    }, body);
                    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${res.data}`);
                    const json = JSON.parse(res.data);
                    if (json.candidates && json.candidates[0]?.content?.parts?.[0]?.text) {
                        return json.candidates[0].content.parts[0].text;
                    }
                    throw new Error(`Invalid schema: ${res.data}`);
                }
            });
        }
    }

    // 2. Groq API (if available)
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey && groqKey.length > 5) {
        providers.push({
            name: "Groq AI (Llama 3.3 70B)",
            fn: async () => {
                const url = `https://api.groq.com/openai/v1/chat/completions`;
                const body = JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userPrompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 1024
                });
                const res = await httpRequest(url, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${groqKey}`,
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(body)
                    }
                }, body);
                if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${res.data}`);
                const json = JSON.parse(res.data);
                if (json.choices && json.choices[0]?.message?.content) {
                    return json.choices[0].message.content;
                }
                throw new Error(`Groq error: ${res.data}`);
            }
        });
    }

    // 3. Cloudflare Workers AI (Last Emergency Backup)
    providers.push({
        name: "Cloudflare AI (Llama 3.1 8B - Backup)",
        fn: async () => {
            if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || CLOUDFLARE_API_TOKEN === 'ضع_توكن_كلاود_فلير_هنا') {
                throw new Error("Cloudflare AI is not configured.");
            }
            const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`;
            const body = JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            });
            const res = await httpRequest(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body)
                }
            }, body);
            if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${res.data}`);
            const json = JSON.parse(res.data);
            if (json.success && json.result && json.result.response) {
                return json.result.response;
            }
            throw new Error(`Cloudflare error: ${JSON.stringify(json.errors || json)}`);
        }
    });

    for (const provider of providers) {
        try {
            console.log(`[AI Pipeline] Trying ${provider.name}...`);
            const response = await provider.fn();
            console.log(`[AI Pipeline] Success with ${provider.name}!`);
            return response;
        } catch (error) {
            console.warn(`[AI Pipeline] ${provider.name} failed: ${error.message}`);
        }
    }

    throw new Error("جميع مزودي الذكاء الاصطناعي (Google AI / Groq / Cloudflare) فشلوا في توليد الإجابة.");
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
    callGroqAPI(systemPrompt, userPrompt).then(resolve).catch(reject);
}

// ==========================================
// قائمة البوتات الإضافية المراد تشغيلها من index.js
// أضف مسارات أية ملفات بوتات أُخرى تريد تشغيلها هنا
// مثال: const OTHER_BOT_FILES = ['./otherBot.js', './bot2.js'];
// ==========================================
const OTHER_BOT_FILES = [
    './secondBot.js'
];

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

    if (!BOT_TOKEN) {
        console.warn("⚠️ [NTL Bot Warning]: BOT_TOKEN is empty in environment and config.json. Discord Bot client will not start until configured.");
        return;
    }
    try {
        // تسجيل الدخول بالبوت
        console.log("🔑 Attempting to log in to Discord client...");
        await client.login(BOT_TOKEN);
    } catch (err) {
        console.error("❌ [Discord Bot Error]: Login failed. Please check if your BOT_TOKEN is valid:", err.message || err);
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
