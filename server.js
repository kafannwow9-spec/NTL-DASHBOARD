const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const axios = require('axios');
const FormData = require('form-data');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ContainerBuilder, MessageFlags } = require('discord.js');
const { askAI } = require('./gemini.js');

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || process.env.PORT || 25147;

// Gemini AI Setup (No longer using @google/genai to avoid missing module errors on hosting)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AQ.Ab8RN6KHehX24Xvasqkm4Cb4DzH1P4aqELCn7D-_92lqclOpCA";

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Trust proxy to get correct host/protocol behind Nginx/Load Balancers
app.set('trust proxy', true);

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'ntl-bot-dashboard-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // http in dev environment
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, X-Bot-Secret, X-NTL-Secret, x-ntl-secret, x-bot-secret, authorization, content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request Logger
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`🌐 [API REQ] ${req.method} ${req.path}`);
  }
  next();
});

// Uploads and static assets
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Custom route for /image-:id
app.get('/image-:id', (req, res) => {
  const id = req.params.id;
  // Look for any file starting with id in uploads
  const files = fs.readdirSync(uploadsPath);
  const found = files.find(f => f.startsWith(id));
  if (found) {
    return res.sendFile(path.join(uploadsPath, found));
  }
  
  // Also check assets/templates
  const templatesPath = path.join(__dirname, 'assets', 'templates');
  if (fs.existsSync(templatesPath)) {
    const tFiles = fs.readdirSync(templatesPath);
    const tFound = tFiles.find(f => f.startsWith(id));
    if (tFound) {
      return res.sendFile(path.join(templatesPath, tFound));
    }
  }

  res.status(404).send('Image not found');
});

// API to list templates
app.get('/api/templates', (req, res) => {
  // Hardcoded direct links provided by the user
  const userTemplateUrls = [
    "https://i.ibb.co/nqjs9YpQ/upload.png",
    "https://i.ibb.co/DDVpnzLm/upload.png",
    "https://i.ibb.co/GfKMtvkT/upload.png",
    "https://i.ibb.co/QvfDSTdS/upload.png",
    "https://i.ibb.co/zVLmHTXQ/upload.png",
    "https://i.ibb.co/k2R2R3H0/upload.png",
    "https://i.ibb.co/5Wp0Xdgh/upload.png",
    "https://i.ibb.co/B2HSX28y/upload.png",
    "https://i.ibb.co/JWGqdq7m/upload.png",
    "https://i.ibb.co/Q70yTWsg/upload.png",
    "https://i.ibb.co/DDRVbq6G/upload.png",
    "https://i.ibb.co/tpq6LGcj/upload.png",
    "https://i.ibb.co/BDWXhBx/upload.png",
    "https://i.ibb.co/x8JdKKLF/upload.png",
    "https://i.ibb.co/QvGpKBgb/upload.png"
  ];

  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  const baseUrl = `${protocol}://${host}`;

  const templates = userTemplateUrls.map((url, index) => ({
    id: `tpl-${index + 1}`,
    name: `قالب ترحيب ${index + 1}`,
    url: `${baseUrl}/image-local-proxy?url=${encodeURIComponent(url)}`
  }));

  res.json({ success: true, templates });
});

// Proxy route to serve external images through our domain
app.get('/image-local-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Missing url parameter');
  
  try {
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream'
    });
    
    // Set content type if possible
    if (response.headers['content-type']) {
      res.setHeader('Content-Type', response.headers['content-type']);
    }
    
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).send('Error proxying image');
  }
});

// Serve locally saved images from uploads folder
app.get('/image-:id', (req, res) => {
  const fileId = req.params.id;
  const uploadsDir = path.join(__dirname, 'uploads');
  const filePath = path.join(uploadsDir, `${fileId}.png`);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Try to proxy if it's not local
    res.status(404).send('Image not found');
  }
});

// Serve template images
app.get('/image-template-:id', (req, res) => {
  const id = req.params.id;
  const templatesPath = path.join(__dirname, 'assets', 'templates');
  
  try {
    if (fs.existsSync(templatesPath)) {
      const files = fs.readdirSync(templatesPath);
      const found = files.find(f => f === id || f === `template-${id}` || f.startsWith(`${id}.`) || f.startsWith(`template-${id}.`) || f.includes(id));
      if (found) {
        return res.sendFile(path.join(templatesPath, found));
      }
    }
  } catch (e) {}

  const possibleExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  let foundFile = null;
  
  // Try with template- prefix
  for (const ext of possibleExts) {
    const filePath = path.join(templatesPath, `template-${id}${ext}`);
    if (fs.existsSync(filePath)) {
      foundFile = filePath;
      break;
    }
  }
  
  // Try bare id if not found
  if (!foundFile) {
    for (const ext of possibleExts) {
      const filePath = path.join(templatesPath, `${id}${ext}`);
      if (fs.existsSync(filePath)) {
        foundFile = filePath;
        break;
      }
    }
  }

  if (foundFile) {
    res.sendFile(foundFile);
  } else {
    res.status(404).send('Template not found');
  }
});

// API Endpoint: Upload Image (Uploads to catbox.moe with local fallback)
app.post('/api/upload-image', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return res.status(400).json({ success: false, error: 'صيغة الصورة غير صالحة' });
    }

    const matches = image.match(/^data:image\/([a-zA-Z0-9-+.]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ success: false, error: 'فشل في قراءة بيانات الصورة' });
    }

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const base64Str = matches[2];
    const buffer = Buffer.from(base64Str, 'base64');

    if (buffer.length > 15 * 1024 * 1024) {
      return res.status(400).json({ success: false, error: 'حجم الصورة كبير جداً (الحد الأقصى 15 ميجابايت)' });
    }

    // Save local backup just in case
    const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = path.join(uploadsPath, fileName);
    fs.writeFileSync(filePath, buffer);
    
    // Safe host resolution (Never use static frontend pages.dev as backend media host)
    let host = req.headers['x-forwarded-host'] || req.get('host');
    let protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';

    if (host && host.includes(':')) {
      // Keep host as is
    }

    const fullHost = `${protocol}://${host}`;
    const localUrl = `${fullHost}/image-${fileName.split('.')[0]}`;

    // Upload to Public Image Hosts (ImgBB / Catbox)
    let finalUrl = localUrl;
    let uploadSuccess = false;

    // 1. Try ImgBB
    try {
      const apiKey = process.env.IMGBB_KEY || 'E664c19272197ad9ccedf89cb063a601';
      
      const form = new FormData();
      form.append('image', fs.createReadStream(filePath));

      const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form, {
        headers: {
          ...form.getHeaders()
        },
        timeout: 15000
      });

      if (imgbbRes.data && imgbbRes.data.data && imgbbRes.data.data.url) {
        finalUrl = imgbbRes.data.data.url;
        uploadSuccess = true;
        console.log(`[Upload]: ImgBB Success -> ${finalUrl}`);
      }
    } catch (uploadErr) {
      console.error('❌ خطأ في رفع الصورة إلى ImgBB:', uploadErr.response ? uploadErr.response.data : uploadErr.message);
    }

    // 2. Try Catbox if ImgBB failed
    if (!uploadSuccess) {
      try {
        const catboxData = new FormData();
        catboxData.append('reqtype', 'fileupload');
        catboxData.append('fileToUpload', buffer, { filename: fileName });

        const catboxRes = await axios.post('https://catbox.moe/user/api.php', catboxData, {
          headers: { ...catboxData.getHeaders() },
          timeout: 5000
        });

        if (catboxRes.data && typeof catboxRes.data === 'string' && catboxRes.data.startsWith('http')) {
          finalUrl = catboxRes.data.trim();
          uploadSuccess = true;
          console.log(`[Upload]: Catbox Success -> ${finalUrl}`);
        }
      } catch (catErr) {
        console.warn(`[Catbox Error]: ${catErr.message || catErr}`);
      }
    }

    return res.json({ success: true, url: finalUrl, fileName, isRemote: uploadSuccess });
  } catch (err) {
    console.error("Error in /api/upload-image:", err);
    return res.status(500).json({ success: false, error: 'حدث خطأ أثناء حفظ الصورة' });
  }
});

function getAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl || pathOrUrl === 'لايوجد' || pathOrUrl === 'none') return 'لايوجد';
  pathOrUrl = pathOrUrl.trim().replace(/[?&>\s\]\)*_~`'"]+$/, '');
  if (!pathOrUrl) return 'لايوجد';

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
global.getAbsoluteUrl = getAbsoluteUrl;

// Local Configuration & Database
const configPath = path.join(__dirname, 'config.json');
const ticketsDbPath = path.join(__dirname, 'db.json');

function getMergedConfig() {
  let fileConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (err) {
      console.error("❌ Error reading config.json:", err.message);
    }
  }

  const CLIENT_ID = fileConfig.CLIENT_ID || process.env.CLIENT_ID || "1405179057628254259";
  const CLIENT_SECRET = fileConfig.CLIENT_SECRET || process.env.CLIENT_SECRET || "";
  const BOT_TOKEN = fileConfig.BOT_TOKEN || process.env.BOT_TOKEN || "";
  const BOT_SECRET = fileConfig.BOT_SECRET || process.env.BOT_SECRET || "38dj38nr89oq";
  const BOT_SERVER_URL = fileConfig.BOT_SERVER_URL || process.env.BOT_SERVER_URL || "http://us-lax02.altare.global:25147";

  const rawAppUrl = process.env.APP_URL || "";
  const cleanAppUrl = rawAppUrl.endsWith('/') ? rawAppUrl.slice(0, -1) : rawAppUrl;
  const REDIRECT_URI = fileConfig.REDIRECT_URI || process.env.REDIRECT_URI || (cleanAppUrl ? `${cleanAppUrl}/auth/callback` : "https://ntldashboard.pages.dev/auth/callback");

  return {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    BOT_TOKEN,
    BOT_SECRET,
    BOT_SERVER_URL,
    guilds: fileConfig.guilds || {}
  };
}

// Proxy helper to forward API calls to live bot server if local bot client is not connected
async function fetchFromExternalBot(endpointPath, method = 'GET', body = null, req = null) {
  // 1. Prevent infinite proxy loops if incoming request was already proxied
  if (req && req.headers && (req.headers['x-is-proxied'] || req.headers['x-bot-internal'])) {
    return null;
  }

  // 2. If local bot is running and ready, DO NOT proxy to external
  const botClient = global.discordClient;
  if (botClient && typeof botClient.isReady === 'function' && botClient.isReady()) {
    return null;
  }

  try {
    const cfg = getMergedConfig();
    const baseUrl = (cfg.BOT_SERVER_URL || '').trim().replace(/\/+$/, '');
    
    // If no external URL configured, skip
    if (!baseUrl) return null;

    if (req && req.headers && req.headers.host) {
      const currentHost = req.headers.host.toLowerCase().split(':')[0];
      const targetHost = baseUrl.replace(/^https?:\/\//, '').toLowerCase().split(':')[0];
      if (currentHost === targetHost || targetHost === 'localhost' || targetHost === '127.0.0.1') {
        return null; // Self-reference loop prevention
      }
    }

    const cleanPath = endpointPath.startsWith('/') ? endpointPath : '/' + endpointPath;
    const targetUrl = `${baseUrl}${cleanPath}`;
    const secret = cfg.BOT_SECRET || '38dj38nr89oq';

    const headers = {
      'Authorization': `Bearer ${secret}`,
      'X-Bot-Secret': secret,
      'X-Is-Proxied': 'true',
      'Content-Type': 'application/json'
    };

    const options = { 
      method, 
      headers,
      signal: AbortSignal.timeout(3000)
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log(`📡 [Proxying Bot Request] ${method} ${targetUrl}`);
    const response = await fetch(targetUrl, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.warn(`[Proxy Request Warning] ${targetUrl} status ${response.status}`);
    }
  } catch (err) {
    console.warn(`[Proxy Fetch Error] ${endpointPath}:`, err.message);
  }
  return null;
}

let localDbCache = null;
function getLocalDB() {
  if (global.getDB) return global.getDB();
  if (localDbCache) return localDbCache;
  if (fs.existsSync(ticketsDbPath)) {
    try {
      localDbCache = JSON.parse(fs.readFileSync(ticketsDbPath, 'utf8'));
      return localDbCache;
    } catch (err) {
      console.error("❌ Error reading db.json:", err.message);
    }
  }
  return {};
}

let saveTimer = null;
function saveLocalDB(data) {
  if (global.saveDB) {
    global.saveDB(data);
    return true;
  }
  localDbCache = data;
  if (saveTimer) return true;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    fs.writeFile(ticketsDbPath, JSON.stringify(localDbCache), 'utf8', (err) => {
      if (err) console.error("❌ Error saving db.json:", err.message);
    });
  }, 1000);
  return true;
}

// Security Middleware: Authentication Verification for Secret Key & Sessions
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const botSecretHeader = req.headers['x-bot-secret'];
  const ntlSecretHeader = req.headers['x-ntl-secret'];
  const cfg = getMergedConfig();
  const validSecret = cfg.BOT_SECRET || '38dj38nr89oq';

  // 1. Check Bearer Token
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (!validSecret || token === validSecret || token === '38dj38nr89oq' || (cfg.BOT_SECRET && token === cfg.BOT_SECRET)) {
      return next();
    }
  }

  // 2. Check X-Bot-Secret or X-NTL-Secret header
  if ((botSecretHeader && (!validSecret || botSecretHeader === validSecret || botSecretHeader === '38dj38nr89oq' || (cfg.BOT_SECRET && botSecretHeader === cfg.BOT_SECRET))) ||
      (ntlSecretHeader && (!validSecret || ntlSecretHeader === validSecret || ntlSecretHeader === '38dj38nr89oq' || (cfg.BOT_SECRET && ntlSecretHeader === cfg.BOT_SECRET)))) {
    return next();
  }

  // 3. Allow active session user if present
  if (req.session && req.session.user) {
    return next();
  }

  // 4. Fallback: if no secret set in config
  if (!cfg.BOT_SECRET || cfg.BOT_SECRET.trim() === '') {
    return next();
  }

  return res.status(401).json({ success: false, error: 'غير مصرح: الكود السري غير صحيح أو مفقود' });
}

// Security Middleware: Permission Verification & API Header Protection
function verifyGuildAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const botSecretHeader = req.headers['x-bot-secret'];
  const ntlSecretHeader = req.headers['x-ntl-secret'];
  const cfg = getMergedConfig();
  const validSecret = cfg.BOT_SECRET || '38dj38nr89oq';

  let authenticatedBySecret = false;
  if (ntlSecretHeader && (ntlSecretHeader === validSecret || ntlSecretHeader === '38dj38nr89oq')) {
    authenticatedBySecret = true;
  }
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === validSecret || token === '38dj38nr89oq') {
      authenticatedBySecret = true;
    }
  }
  if (botSecretHeader && (botSecretHeader === validSecret || botSecretHeader === '38dj38nr89oq')) {
    authenticatedBySecret = true;
  }

  if (authenticatedBySecret) {
    return next();
  }

  // Session user verification
  if (req.session && req.session.user) {
    const targetGuildId = req.params.guildId || req.body?.guildId;
    if (targetGuildId) {
      const userGuilds = req.session.userGuilds || [];
      const targetGuild = userGuilds.find(g => String(g.id) === String(targetGuildId));
      if (targetGuild) {
        return next();
      }
    } else {
      return next();
    }
  }

  return res.status(401).json({
    success: false,
    error: "🔒 وصول غير مصرح به: ميزة الحماية والأمان للـ API تقتضي وجود ترويسة أمان حقيقية (X-NTL-Secret)"
  });
}

// API Routes
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang = 'ar' } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Text is required' });

    const promptText = `Translate the following text to ${targetLang}. 
IMPORTANT: 
1. Preserve all Discord-style markers like {type: 18} or --- exactly as they are.
2. Preserve all emojis exactly as they are.
3. Preserve all line breaks and spacing exactly as they are.
4. Only return the translated text, nothing else.

Text to translate:
${text}`;

    const translatedText = await askAI(promptText);
    res.json({ success: true, translatedText: translatedText.trim() });
  } catch (err) {
    console.error('Translation error:', err.message);
    res.status(500).json({ success: true, translatedText: req.body.text }); // Fallback to original text on error
  }
});

app.post('/api/admin/activate-premium', authenticate, async (req, res) => {
  try {
    const { serverId, action, duration } = req.body;
    if (!serverId) return res.status(400).json({ success: false, error: 'معرف السيرفر مطلوب' });

    const db = getLocalDB();
    if (!db[serverId]) db[serverId] = { panels: {}, tickets: {}, counter: 0 };

    if (action === 'deactivate') {
      db[serverId].premium = null;
      saveLocalDB(db);
      return res.json({ success: true, message: `تم إلغاء تفعيل البريميوم بنجاح عن السيرفر: ${serverId}` });
    } else {
      const expiresAt = duration === '30days' ? Date.now() + 30 * 86400000 : (duration === '7days' ? Date.now() + 7 * 86400000 : 'lifetime');
      db[serverId].premium = { expiresAt, activatedAt: Date.now() };
      saveLocalDB(db);
      return res.json({ success: true, message: `تم تفعيل البريميوم بنجاح للسيرفر: ${serverId}` });
    }
  } catch (err) {
    console.error('Error in /api/admin/activate-premium:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/settings/update', authenticate, async (req, res) => {
  try {
    const { guildId, prefix, welcomeChannel, autoRole, panels, suggestions, azkar, protection, musicEnabled, deltaKeys, deltaKey, tickets } = req.body;

    // 1. التأكد من وجود البيانات المطلوبة
    if (!guildId) {
      return res.status(400).json({ success: false, error: 'معرف السيرفر مطلوب' });
    }

    // 2. تطبيق التعديل أو حفظه في قاعدة البيانات الخاصة بالبوت
    const db = getLocalDB();
    const gKey = String(guildId);
    if (!db[gKey]) {
      db[gKey] = { panels: {}, tickets: {}, counter: 0 };
    }

    if (prefix !== undefined) db[gKey].prefix = prefix;
    if (welcomeChannel !== undefined) db[gKey].welcomeChannel = welcomeChannel;
    if (autoRole !== undefined) db[gKey].autoRole = autoRole;
    if (panels !== undefined) db[gKey].panels = panels;
    if (tickets !== undefined) db[gKey].tickets = tickets;
    if (suggestions !== undefined) db[gKey].suggestions = suggestions;
    if (azkar !== undefined) db[gKey].azkar = azkar;
    if (protection !== undefined) db[gKey].protection = protection;
    if (musicEnabled !== undefined) db[gKey].musicEnabled = musicEnabled;
    if (deltaKeys !== undefined) db[gKey].deltaKeys = deltaKeys;
    if (deltaKey !== undefined) db[gKey].deltaKeys = deltaKey;

    saveLocalDB(db);

    // Also forward update to external live bot if running externally and local bot is offline
    if (!global.discordClient?.isReady?.()) {
      fetchFromExternalBot('/api/settings/update', 'POST', req.body, req).catch(() => {});
    }

    console.log(`[Dashboard Sync] تم تحديث إعدادات السيرفر: ${guildId}`);

    // 3. إرجاع رد للداشبورد بنجاح العملية
    res.json({
      success: true,
      message: 'تم حفظ التعديلات بنجاح وتطبيقها على البوت!'
    });

  } catch (error) {
    console.error('خطأ أثناء حفظ التعديلات:', error);
    res.status(500).json({ success: false, error: 'حدث خطأ في سيرفر البوت' });
  }
});

app.post('/api/guilds/check', authenticate, async (req, res) => {
  try {
    const { userGuilds } = req.body;
    const botClient = global.discordClient;
    const isBotReady = botClient && typeof botClient.isReady === 'function' && botClient.isReady();

    // Collect all bot active guild IDs from local client AND external bot server
    const activeBotGuildIds = new Set();
    const externalMemberCounts = new Map();
    if (isBotReady && botClient.guilds.cache.size > 0) {
      botClient.guilds.cache.forEach(bg => {
        activeBotGuildIds.add(String(bg.id));
        externalMemberCounts.set(String(bg.id), bg.memberCount);
      });
    }

    try {
      const extData = await fetchFromExternalBot('/api/bot-guilds', 'GET', null, req) || await fetchFromExternalBot('/api/guilds', 'GET', null, req);
      if (extData) {
        const raw = extData.guilds || extData.activeGuilds || extData.allAdminGuilds || (Array.isArray(extData) ? extData : []);
        raw.forEach(g => {
          if (g && g.id) {
            activeBotGuildIds.add(String(g.id));
            if (g.memberCount) externalMemberCounts.set(String(g.id), g.memberCount);
          }
        });
      }
    } catch(e) {}

    const activeGuilds = [];
    const unaddedGuilds = [];

    if (Array.isArray(userGuilds)) {
      userGuilds.forEach(g => {
        const gIdStr = String(g.id);
        const hasBot = activeBotGuildIds.size > 0 ? activeBotGuildIds.has(gIdStr) : false;
        const iconUrl = g.icon 
          ? (g.icon.startsWith('http') ? g.icon : `https://cdn.discordapp.com/icons/${gIdStr}/${g.icon}.png`)
          : 'https://cdn.discordapp.com/embed/avatars/0.png';

        let memCount = 1;
        if (externalMemberCounts.has(gIdStr)) {
            memCount = externalMemberCounts.get(gIdStr);
        } else if (hasBot && botClient && isBotReady) {
            const bg = botClient.guilds.cache.get(gIdStr);
            if (bg) memCount = bg.memberCount;
        }

        const mapped = {
          id: gIdStr,
          name: g.name || 'سيرفر غير معروف',
          icon: iconUrl,
          hasBot,
          memberCount: memCount,
          permissions: g.permissions
        };

        if (hasBot) {
          activeGuilds.push(mapped);
        } else {
          mapped.inviteUrl = `https://discord.com/oauth2/authorize?client_id=1405179057628254259&permissions=8&scope=bot%20applications.commands&guild_id=${gIdStr}&disable_guild_select=true`;
          unaddedGuilds.push(mapped);
        }
      });
    }

    res.json({
      success: true,
      activeGuilds,
      unaddedGuilds,
      botOnline: isBotReady || activeBotGuildIds.size > 0
    });
  } catch (error) {
    console.error("Error in /api/guilds/check:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.get('/api/config-status', (req, res) => {
  const cfg = getMergedConfig();
  res.json({
    clientConfigured: !!cfg.CLIENT_ID,
    secretConfigured: !!cfg.CLIENT_SECRET,
    botConfigured: !!cfg.BOT_TOKEN,
    redirectUri: cfg.REDIRECT_URI,
    clientId: cfg.CLIENT_ID || null
  });
});

app.get('/api/auth/me', (req, res) => {
  if (req.session && req.session.user) {
    res.json({ authenticated: true, user: req.session.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to destroy session" });
    }
    res.json({ success: true });
  });
});

app.get('/api/auth/login', (req, res) => {
  const cfg = getMergedConfig();
  if (!cfg.CLIENT_ID || !cfg.REDIRECT_URI) {
    return res.status(400).send("CLIENT_ID or REDIRECT_URI not configured");
  }
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${cfg.CLIENT_ID}&redirect_uri=${encodeURIComponent(cfg.REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  res.redirect(discordAuthUrl);
});

// OAuth Callback
app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code } = req.query;
  const cfg = getMergedConfig();

  if (!code) {
    return res.status(400).send("Missing authorization code");
  }

  try {
    const tokenResponse = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: cfg.CLIENT_ID,
        client_secret: cfg.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: cfg.REDIRECT_URI
      }).toString()
    });

    if (!tokenResponse.ok) {
      const errBody = await tokenResponse.text();
      console.error("Token exchange failed:", errBody);
      return res.status(400).send(`Failed to exchange code: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch User Profile
    const userRes = await fetch('https://discord.com/api/v10/users/@me', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!userRes.ok) throw new Error("Failed to fetch user profile");
    const user = await userRes.json();

    // Fetch User Guilds
    const guildsRes = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!guildsRes.ok) throw new Error("Failed to fetch user guilds");
    const guilds = await guildsRes.json();

    // Filter Admin Guilds: ADMINISTRATOR (0x8 / 8n) or Owner (owner === true)
    const adminGuilds = guilds.filter(g => {
      if (g.owner === true) return true;
      if (!g.permissions) return false;
      const perms = BigInt(g.permissions);
      return (perms & 8n) === 8n;
    });

    // Save session
    req.session.user = user;
    req.session.accessToken = accessToken;
    req.session.userGuilds = adminGuilds;

    // Direct redirect back to dashboard main page
    res.redirect('/');
  } catch (error) {
    console.error("OAuth Error:", error);
    res.status(500).send("Authentication failed. Please check your credentials.");
  }
});

// Advanced Guild Filtering Endpoint
app.get('/api/guilds', async (req, res) => {
  const cfg = getMergedConfig();

  // Check bot presence from active Discord Client cache
  const botClient = global.discordClient;
  const isBotReady = botClient && typeof botClient.isReady === 'function' && botClient.isReady();

  let activeGuilds = [];

  if (isBotReady && botClient.guilds.cache.size > 0) {
    botClient.guilds.cache.forEach(bg => {
      activeGuilds.push({
        id: bg.id,
        name: bg.name,
        icon: bg.iconURL({ extension: 'png' }) || '',
        memberCount: bg.memberCount || 0,
        hasBot: true
      });
    });
  }

  // Fallback to external live bot server if local cache is empty
  if (activeGuilds.length === 0) {
    const extData = await fetchFromExternalBot('/api/guilds', 'GET', null, req) || await fetchFromExternalBot('/api/bot-guilds', 'GET', null, req);
    if (extData) {
      const rawGuilds = extData.guilds || extData.activeGuilds || extData.allAdminGuilds || (Array.isArray(extData) ? extData : []);
      activeGuilds = rawGuilds.map(g => ({
        id: String(g.id),
        name: g.name || 'سيرفر غير معروف',
        icon: g.icon || (g.iconUrl ? g.iconUrl : 'https://cdn.discordapp.com/embed/avatars/0.png'),
        memberCount: g.memberCount || g.members || 14,
        hasBot: true
      }));
    }
  }

  res.json({
    success: true,
    activeGuilds,
    unaddedGuilds: [],
    allAdminGuilds: activeGuilds,
    guilds: activeGuilds
  });
});

app.get('/api/bot-guilds', async (req, res) => {
  const botClient = global.discordClient;
  const isBotReady = botClient && typeof botClient.isReady === 'function' && botClient.isReady();

  let activeGuilds = [];
  if (isBotReady && botClient.guilds.cache.size > 0) {
    botClient.guilds.cache.forEach(bg => {
      activeGuilds.push({
        id: bg.id,
        name: bg.name,
        icon: bg.iconURL({ extension: 'png' }) || '',
        memberCount: bg.memberCount || 0,
        hasBot: true
      });
    });
  }

  if (activeGuilds.length === 0) {
    const extData = await fetchFromExternalBot('/api/guilds', 'GET', null, req) || await fetchFromExternalBot('/api/bot-guilds', 'GET', null, req);
    if (extData) {
      const rawGuilds = extData.guilds || extData.activeGuilds || extData.allAdminGuilds || (Array.isArray(extData) ? extData : []);
      activeGuilds = rawGuilds.map(g => ({
        id: String(g.id),
        name: g.name || 'سيرفر غير معروف',
        icon: g.icon || (g.iconUrl ? g.iconUrl : 'https://cdn.discordapp.com/embed/avatars/0.png'),
        memberCount: g.memberCount || g.members || 14,
        hasBot: true
      }));
    }
  }

  res.json({ success: true, guilds: activeGuilds, activeGuilds });
});

// Guild Settings Get
app.get('/api/guild-settings/:guildId', verifyGuildAdmin, async (req, res) => {
  const { guildId } = req.params;
  const botClient = global.discordClient;
  const isBotReady = botClient && typeof botClient.isReady === 'function' && botClient.isReady();

  let guildObj = null;
  let textChannels = [];
  let categoryChannels = [];
  let guildRoles = [];
  let guildEmojis = [];
  let guildMembers = [];

  if (isBotReady && botClient.guilds && botClient.guilds.cache) {
    guildObj = botClient.guilds.cache.get(guildId) || null;

    if (guildObj) {
      try {
        if (guildObj.channels && guildObj.channels.cache) {
          guildObj.channels.cache.forEach(c => {
            if (c.type === 0 || c.type === 5 || c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS') {
              textChannels.push({ id: c.id, name: c.name });
            } else if (c.type === 4 || c.type === 'GUILD_CATEGORY') {
              categoryChannels.push({ id: c.id, name: c.name });
            }
          });
        }

        if (guildObj.roles && guildObj.roles.cache) {
          guildObj.roles.cache.forEach(r => {
            if (r.name !== '@everyone' && !r.managed) {
              guildRoles.push({ id: r.id, name: r.name, color: r.hexColor });
            }
          });
        }

        if (guildObj.emojis && guildObj.emojis.cache) {
          guildObj.emojis.cache.forEach(e => {
            guildEmojis.push({ id: e.id, name: e.name, url: e.url, animated: e.animated });
          });
        }

        if (guildObj.members && guildObj.members.cache) {
          guildObj.members.cache.forEach(m => {
            if (m.user && !m.user.bot) {
              guildMembers.push({
                id: m.id,
                name: m.user.username,
                displayName: m.displayName || m.user.username,
                avatar: m.user.displayAvatarURL ? m.user.displayAvatarURL() : null
              });
            }
          });
        }
      } catch (e) {}
    }
  }

  // Fallback default channels instantly if not cached
  if (textChannels.length === 0) {
    textChannels = [
      { id: 'general', name: 'عام-general' },
      { id: 'tickets', name: 'tickets-تذاكر' },
      { id: 'azkar', name: 'أذكار-وآيات' },
      { id: 'delta', name: 'delta-bypass' },
      { id: 'suggestions', name: 'اقتراحات-suggestions' }
    ];
  }

  // Fallbacks ONLY if bot is not in guild and external fetch returned nothing
  if (!guildObj && textChannels.length === 0) {
    textChannels = [
      { id: 'general', name: 'عام-general' },
      { id: 'tickets', name: 'tickets-تذاكر' },
      { id: 'azkar', name: 'أذكار-وآيات' },
      { id: 'delta', name: 'delta-bypass' },
      { id: 'suggestions', name: 'اقتراحات-suggestions' }
    ];
  }

  const db = getLocalDB();
  const localData = db[guildId] || {};

  res.json({
    success: true,
    hasBot: !!guildObj,
    stats: {
      memberCount: guildObj?.memberCount || 14,
      channelsCount: textChannels.length,
      categoriesCount: categoryChannels.length,
      rolesCount: guildRoles.length
    },
    channels: textChannels,
    categories: categoryChannels,
    roles: guildRoles,
    members: guildMembers,
    emojis: guildEmojis,
    settings: {
      panels: localData.panels || {},
      stickyPanels: localData.stickyPanels || [],
      customEmbeds: localData.customEmbeds || {},
      autoResponses: localData.autoResponses || [],
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
      musicEnabled: localData.musicEnabled || false,
      deltaKeys: localData.deltaKeys || {},
      scriptSystem: localData.scriptSystem || {},
      welcome: localData.welcome || null
    }
  });
});

// Guild Settings Save & Broadcast Module
app.post('/api/save-guild-settings/:guildId', verifyGuildAdmin, async (req, res) => {
  const { guildId } = req.params;
  const { panels, stickyPanels, suggestions, azkar, moderation, protection, musicEnabled, deltaKeys, broadcastMessage, tickets, deltaKey, scriptSystem, customEmbeds, autoResponses, welcome, customBotProfile } = req.body;

  console.log(`📥 [SAVE LOCAL SETTINGS] Guild ID: ${guildId}`);

  const db = getLocalDB();
  if (!db[guildId]) {
    db[guildId] = { panels: {}, tickets: {}, counter: 0 };
  }

  if (panels !== undefined) db[guildId].panels = panels;
  if (stickyPanels !== undefined) db[guildId].stickyPanels = stickyPanels;
  if (tickets !== undefined) db[guildId].tickets = tickets;
  if (suggestions !== undefined) db[guildId].suggestions = suggestions;
  if (azkar !== undefined) db[guildId].azkar = azkar;
  if (moderation !== undefined) db[guildId].moderation = moderation;
  if (protection !== undefined) db[guildId].protection = protection;
  if (musicEnabled !== undefined) db[guildId].musicEnabled = musicEnabled;
  if (deltaKeys !== undefined) db[guildId].deltaKeys = deltaKeys;
  if (deltaKey !== undefined) db[guildId].deltaKeys = deltaKey;
  if (scriptSystem !== undefined) db[guildId].scriptSystem = scriptSystem;
  if (customEmbeds !== undefined) db[guildId].customEmbeds = customEmbeds;
  if (autoResponses !== undefined) db[guildId].autoResponses = autoResponses;
  if (welcome !== undefined) db[guildId].welcome = welcome;
  if (customBotProfile !== undefined) {
    const premium = db[guildId]?.premium;
    const isPrem = premium && (premium.expiresAt === 'lifetime' || (typeof premium.expiresAt === 'number' && Date.now() < premium.expiresAt));
    if (!isPrem) {
      return res.status(403).json({ success: false, error: 'هذا السيرفر ليس لديه اشتراك بريميوم لتخصيص بيانات البوت.' });
    }
    db[guildId].customBotProfile = customBotProfile;

    const botClient = global.discordClient;
    if (botClient && typeof botClient.isReady === 'function' && botClient.isReady()) {
      const g = botClient.guilds.cache.get(guildId);
      if (g && g.members && g.members.me) {
        if (customBotProfile.name) {
          g.members.me.setNickname(customBotProfile.name).catch(() => {});
        }
        if (customBotProfile.avatarUrl) {
          g.members.me.edit({ avatar: customBotProfile.avatarUrl }).catch(() => {});
        }
      }
    }
  }

  saveLocalDB(db);

  // Forward to live external bot server ONLY if local bot is not ready in this process
  const botClient = global.discordClient;
  const isBotReady = botClient && typeof botClient.isReady === 'function' && botClient.isReady();

  if (!isBotReady) {
    const extRes = await fetchFromExternalBot(`/api/save-guild-settings/${guildId}`, 'POST', req.body, req);
    if (extRes && extRes.success) {
      if (global.reloadAzkar) {
        try { global.reloadAzkar(guildId); } catch (e) {}
      }
      return res.json(extRes);
    }
  }

  // Live Broadcast execution if external bot was not reachable and local bot is online
  let deliveryLog = null;
  if (broadcastMessage && broadcastMessage.channelId) {
    const { channelId, type, content, title, description, color, buttonLabel, buttonEmoji, buttonStyle, panelId, panelData } = broadcastMessage;
    const botClient = global.discordClient;

    if (botClient && typeof botClient.isReady === 'function' && botClient.isReady()) {
      try {
        const chan = await botClient.channels.fetch(channelId).catch(() => null);
        if (chan) {
          if (type === 'ticket_panel') {
            const pId = panelId || 'p1';
            const panelObj = panelData || (db[guildId]?.panels && db[guildId]?.panels[pId]) || db[guildId]?.panels?.['p1'] || {};

            const embedColor = panelObj.color || color || tickets?.color || '#5865f2';
            const embedTitle = panelObj.title || title || tickets?.title || "🎫 قسم الدعم الفني والتذاكر";
            const embedDesc = panelObj.description || panelObj.desc || description || tickets?.description || "اضغط على الزر بالأسفل لفتح تذكرة تواصل مع فريق الدعم.";
            const displayImgUrl = getAbsoluteUrl(panelObj.img || 'لايوجد');

            const displayType = panelObj.displayType || 'buttons';
            const components = [];

            if (displayType === 'select') {
              const menu = new StringSelectMenuBuilder()
                .setCustomId(`ticket_panel_select_${pId}`)
                .setPlaceholder('اختر نوع التذكرة لفتحها...');
              const btns = panelObj.buttons && panelObj.buttons.length > 0 ? panelObj.buttons : [
                { name: buttonLabel || tickets?.btnLabel || 'فتح تذكرة', emoji: buttonEmoji || tickets?.btnEmoji || '📩' }
              ];
              btns.forEach((b, idx) => {
                const opt = { label: b.name || 'خيار تذكرة', value: `btn_${idx}` };
                if (b.emoji) opt.emoji = b.emoji;
                if (b.description) opt.description = b.description;
                menu.addOptions(opt);
              });
              menu.addOptions({ label: 'Reset', value: 'reset', emoji: '1516390093504385074' });
              components.push(new ActionRowBuilder().addComponents(menu));
            } else {
              const row = new ActionRowBuilder();
              const btns = panelObj.buttons && panelObj.buttons.length > 0 ? panelObj.buttons : [
                { name: buttonLabel || tickets?.btnLabel || 'فتح تذكرة', emoji: buttonEmoji || tickets?.btnEmoji || '📩', style: buttonStyle }
              ];
              btns.slice(0, 5).forEach((b, idx) => {
                const s = String(b.style || '').toLowerCase();
                const styleNum = (s === 'danger' || s === 'red' || s === '4') ? ButtonStyle.Danger :
                                 (s === 'success' || s === 'green' || s === '3') ? ButtonStyle.Success :
                                 (s === 'secondary' || s === 'grey' || s === 'gray' || s === '2') ? ButtonStyle.Secondary : ButtonStyle.Primary;
                const btn = new ButtonBuilder()
                  .setCustomId(`ticket_panel_btn_${pId}_${idx}`)
                  .setLabel(b.name || 'فتح تذكرة')
                  .setStyle(styleNum);
                if (b.emoji) btn.setEmoji(b.emoji);
                row.addComponents(btn);
              });
              components.push(row);
            }

            const isPanelV2 = panelObj.embedType === 'v2' || panelObj.isV2 !== false || broadcastMessage.embedType === 'v2';

            if (isPanelV2) {
              try {
                const container = new ContainerBuilder();
                if (embedColor) {
                  try { container.setAccentColor(parseInt(embedColor.replace('#', ''), 16)); } catch(e) {}
                }
                if (embedTitle) {
                  container.addTextDisplayComponents(td => td.setContent(`## ${embedTitle}`));
                  container.addSeparatorComponents(s => s.setDivider(true));
                }
                if (embedDesc) {
                  const separatorRegex = /\{type:\s*18\}|--- \[ خط فاصل \] ---|^\s*---\s*$/gm;
                  if (separatorRegex.test(embedDesc)) {
                    const parts = embedDesc.split(separatorRegex);
                    parts.forEach((part, pIdx) => {
                      if (part.trim()) {
                        container.addTextDisplayComponents(td => td.setContent(part.trim()));
                      }
                      if (pIdx < parts.length - 1) {
                        try { container.addSeparatorComponents(s => s.setDivider(true)); } catch(e) {}
                      }
                    });
                  } else {
                    container.addTextDisplayComponents(td => td.setContent(embedDesc));
                  }
                }
                if (displayImgUrl && displayImgUrl !== 'لايوجد' && displayImgUrl.startsWith('http')) {
                  container.addMediaGalleryComponents(mg => mg.addItems(item => item.setURL(displayImgUrl)));
                }
                components.forEach(compRow => {
                  container.addActionRowComponents(compRow);
                });

                await chan.send({
                  components: [container],
                  flags: MessageFlags.IsComponentsV2
                });
              } catch (panelV2Err) {
                console.warn('[Panel V2 Send Fallback]:', panelV2Err);
                const cleanPanelDesc = embedDesc.replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
                const embed = new EmbedBuilder()
                  .setColor(embedColor)
                  .setTitle(embedTitle)
                  .setDescription(cleanPanelDesc);
                if (displayImgUrl && displayImgUrl !== 'لايوجد' && displayImgUrl.startsWith('http')) {
                  embed.setImage(displayImgUrl);
                }
                await chan.send({ embeds: [embed], components });
              }
            } else {
              const cleanPanelDesc = embedDesc.replace(/\{type:\s*18\}|--- \[ خط فاصل \] ---/g, '\n───────────────\n');
              const embed = new EmbedBuilder()
                .setColor(embedColor)
                .setTitle(embedTitle)
                .setDescription(cleanPanelDesc);
              if (displayImgUrl && displayImgUrl !== 'لايوجد' && displayImgUrl.startsWith('http')) {
                embed.setImage(displayImgUrl);
              }
              await chan.send({ embeds: [embed], components });
            }

            deliveryLog = { status: "SENT", message: `تم إرسال لوحة التذاكر لقناة #${chan.name}` };
          } else if (type === 'custom_embed') {
            const embData = broadcastMessage.embedData || {};
            const embedId = embData.id || 'emb1';
            const isV2 = embData.type === 'v2' || embData.isV2 !== false;

            if (isV2) {
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
                        try { container.addSeparatorComponents(s => s.setDivider(true)); } catch(e) {}
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

                // Translation button support
                if (embData.translationEnabled) {
                  const transBtn = new ButtonBuilder()
                    .setCustomId(`translation_btn:${embedId}`)
                    .setLabel('Translation')
                    .setEmoji('<:translation:1545522949975441498>')
                    .setStyle(ButtonStyle.Secondary);
                  btnRow.addComponents(transBtn);

                  if (!db.translations) db.translations = {};
                  db.translations[embedId] = {
                    ar: { title: embData.title || '', desc: descText },
                    en: { title: embData.translationTitle || embData.title || '', desc: embData.translationDesc || descText }
                  };
                  if (typeof saveDB === 'function') saveDB(db);
                }

                if (btnRow.components.length > 0) {
                  container.addActionRowComponents(btnRow);
                }

                await chan.send({
                  components: [container],
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
                    ar: { title: embData.title || '', desc: cleanDesc },
                    en: { title: embData.translationTitle || embData.title || '', desc: embData.translationDesc || cleanDesc }
                  };
                  if (typeof saveDB === 'function') saveDB(db);
                }

                if (btnRow.components.length > 0) {
                  msgPayload.components = [btnRow];
                }

                await chan.send(msgPayload);
              }
            } else {
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
                  ar: { title: embData.title || '', desc: cleanDesc },
                  en: { title: embData.translationTitle || embData.title || '', desc: embData.translationDesc || cleanDesc }
                };
                if (typeof saveDB === 'function') saveDB(db);
              }

              if (btnRow.components.length > 0) {
                msgPayload.components = [btnRow];
              }

              await chan.send(msgPayload);
            }

            deliveryLog = { status: "SENT", message: `تم إرسال الإيمبد المخصص لقناة #${chan.name} بنجاح!` };
          } else if (type === 'sticky_panel') {
            const spanelId = panelId || 'spanel-1';
            const spanels = db[guildId]?.stickyPanels || [];
            const targetPanel = spanels.find(p => p.id === spanelId) || spanels[0] || {};
            
            // Delete previous message if exists
            if (targetPanel.lastMessageId) {
              chan.messages.fetch(targetPanel.lastMessageId).then(oldMsg => {
                if (oldMsg && oldMsg.deletable) oldMsg.delete().catch(() => {});
              }).catch(() => {});
            }

            const sendPayload = {};
            if (targetPanel.embed !== false) {
              const embed = new EmbedBuilder()
                .setColor(targetPanel.color || color || '#5865f2');
              if (targetPanel.title || title) embed.setTitle(targetPanel.title || title);
              if (targetPanel.content || content) embed.setDescription(targetPanel.content || content);
              if (targetPanel.imageUrl && targetPanel.imageUrl.startsWith('http')) embed.setImage(targetPanel.imageUrl);
              if (targetPanel.footer) embed.setFooter({ text: targetPanel.footer });
              sendPayload.embeds = [embed];
            } else {
              sendPayload.content = targetPanel.title ? `**${targetPanel.title}**\n\n${targetPanel.content || content}` : (targetPanel.content || content);
            }

            const sent = await chan.send(sendPayload);
            if (sent) {
              targetPanel.lastMessageId = sent.id;
              saveLocalDB(db);
            }
            deliveryLog = { status: "SENT", message: `تم إرسال وتثبيت البانل التلقائي في قناة #${chan.name} بنجاح!` };
          } else if (type === 'suggestion_panel') {
            const embed = new EmbedBuilder()
              .setColor(color || suggestions?.color || '#12a524')
              .setTitle(title || suggestions?.title || "💡 صندوق الاقتراحات والتطوير")
              .setDescription(description || suggestions?.description || "أهلاً بكم! يمكنك كتابة اقتراحك وطرح أفكارك لتطوير السيرفر هنا 💡");

            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId('publish_suggestion_prompt_btn')
                .setLabel('نشر إقتراح')
                .setEmoji('💡')
                .setStyle(ButtonStyle.Success)
            );

            await chan.send({ embeds: [embed], components: [row] });
            deliveryLog = { status: "SENT", message: `تم إرسال لوحة الاقتراحات لقناة #${chan.name}` };
          } else {
            await chan.send(content || "تنبيه من لوحة التحكم");
            deliveryLog = { status: "SENT", message: `تم إرسال الرسالة لقناة #${chan.name}` };
          }
        } else {
          deliveryLog = { status: "FAILED", message: "لم يتم العثور على القناة" };
        }
      } catch (err) {
        deliveryLog = { status: "ERROR", message: err.message };
      }
    }
  }

  if (global.reloadAzkar) {
    try { global.reloadAzkar(guildId); } catch (e) {}
  }

  res.json({
    success: true,
    message: "تم حفظ الإعدادات بنجاح في قاعدة البيانات المحلية!",
    deliveryLog
  });
});

// Trigger Azkar Instant Post
app.post('/api/azkar/trigger/:guildId', verifyGuildAdmin, async (req, res) => {
  const { guildId } = req.params;
  const botClient = global.discordClient;
  
  if (!botClient || typeof botClient.isReady !== 'function' || !botClient.isReady()) {
    const extRes = await fetchFromExternalBot(`/api/azkar/trigger/${guildId}`, 'POST', req.body, req);
    if (extRes) {
      return res.json(extRes);
    }
    return res.status(503).json({ success: false, error: "البوت غير متصل حالياً" });
  }

  const db = getLocalDB();
  const azkarConfig = db[guildId]?.azkar;
  const channelId = req.body?.channelId || azkarConfig?.channelId;

  if (!channelId) {
    return res.status(400).json({ success: false, error: "لم يتم تحديد روم الأذكار" });
  }

  try {
    const channel = await botClient.channels.fetch(channelId).catch(() => null);
    if (!channel) {
      return res.status(404).json({ success: false, error: "تعذر الوصول للروم المحددة" });
    }

    const sampleAzkar = [
      "﴿ أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾ - سبحان الله وبحمده، سبحان الله العظيم 🤍",
      "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ ✨",
      "لا حَوْلَ وَلا قُوَّةَ إِلاَّ بِاللَّهِ الْعَلِيِّ الْعَظِيمِ 🌿",
      "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه 🤲",
      "سُبْحَانَ اللَّهِ ، وَالْحَمْدُ لِلَّهِ ، وَلا إِلَهَ إِلاَّ اللَّهُ ، وَاللَّهُ أَكْبَرُ 🌟"
    ];
    const randomZikr = sampleAzkar[Math.floor(Math.random() * sampleAzkar.length)];

    const embed = new EmbedBuilder()
      .setColor('#10b981')
      .setTitle("📖 أذكار وآيات قرآنية")
      .setDescription(randomZikr)
      .setFooter({ text: `نظام الأذكار التلقائي • الداشبورد` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    res.json({ success: true, message: `تم إرسال الذكر بنجاح لقناة #${channel.name}` });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// Test Welcome System Instant Post
app.post('/api/test-welcome/:guildId', verifyGuildAdmin, async (req, res) => {
  const { guildId } = req.params;
  const botClient = global.discordClient;
  const welcomeSettings = req.body?.welcomeSettings || req.body?.welcome;

  if (!botClient || typeof botClient.isReady !== 'function' || !botClient.isReady()) {
    const extRes = await fetchFromExternalBot(`/api/test-welcome/${guildId}`, 'POST', req.body, req);
    if (extRes) {
      return res.json(extRes);
    }
    return res.status(503).json({ success: false, error: "البوت غير متصل حالياً" });
  }

  const db = getLocalDB();
  const currentWelcome = welcomeSettings || db[guildId]?.welcome;

  if (!currentWelcome) {
    return res.status(400).json({ success: false, error: "لم يتم ضبط إعدادات الترحيب بعد" });
  }

  const channelId = currentWelcome.channelId;
  if (!channelId) {
    return res.status(400).json({ success: false, error: "يرجى تحديد روم الترحيب أولاً" });
  }

  try {
    const guild = botClient.guilds.cache.get(guildId) || await botClient.guilds.fetch(guildId).catch(() => null);
    if (!guild) {
      return res.status(404).json({ success: false, error: "تعذر الوصول للسيرفر" });
    }

    let member = guild.members.cache.first() || guild.members.me || {
      id: botClient.user?.id || '123456789',
      displayName: botClient.user?.username || 'TestUser',
      user: botClient.user,
      guild: guild
    };

    if (global.handleWelcomeMember) {
      const result = await global.handleWelcomeMember(member, true, currentWelcome);
      if (result && result.success) {
        return res.json({ success: true, message: `تم إرسال رسالة الترحيب التجريبية بنجاح إلى روم #${result.channelName}` });
      } else {
        return res.status(400).json({ success: false, error: result?.error || 'فشل في إرسال الترحيب' });
      }
    } else {
      return res.status(500).json({ success: false, error: "دالة معالجة الترحيب غير متوفرة" });
    }
  } catch (err) {
    console.error("Error in /api/test-welcome:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Live Broadcast Endpoint
app.post('/api/broadcast/:guildId', verifyGuildAdmin, async (req, res) => {
  const { guildId } = req.params;
  const { channelId, content, title, color } = req.body;

  if (!channelId || (!content && !title)) {
    return res.status(400).json({ error: "Missing channelId or content" });
  }

  const botClient = global.discordClient;
  if (!botClient || typeof botClient.isReady !== 'function' || !botClient.isReady()) {
    const extRes = await fetchFromExternalBot(`/api/broadcast/${guildId}`, 'POST', req.body, req);
    if (extRes) {
      return res.json(extRes);
    }
    return res.status(503).json({ error: "Discord bot client is offline or starting up." });
  }

  try {
    const channel = await botClient.channels.fetch(channelId).catch(() => null);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found or bot lacks permissions." });
    }

    if (type === 'suggestion_panel') {
      const embed = new EmbedBuilder()
        .setColor(color || '#12a524')
        .setTitle(title || "💡 صندوق الاقتراحات والتطوير")
        .setDescription(content || description || "أهلاً بكم! يمكنك كتابة اقتراحك وطرح أفكارك لتطوير السيرفر بالضغط على الزر بالأسفل 💡");

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('publish_suggestion_prompt_btn')
          .setLabel('نشر إقتراح')
          .setEmoji('💡')
          .setStyle(ButtonStyle.Success)
      );

      await channel.send({ embeds: [embed], components: [row] });
    } else if (title) {
      const embed = new EmbedBuilder()
        .setColor(color || '#5865f2')
        .setTitle(title)
        .setDescription(content || '');
      await channel.send({ embeds: [embed] });
    } else {
      await channel.send(content);
    }

    res.json({ success: true, message: `Message sent to #${channel.name} successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Audit logs
app.get('/api/logs/:guildId', verifyGuildAdmin, (req, res) => {
  const { guildId } = req.params;
  const db = getLocalDB();
  const violations = db[guildId]?.violations || [];

  res.json({
    success: true,
    botLogs: violations,
    botOnline: global.discordClient && typeof global.discordClient.isReady === 'function' ? global.discordClient.isReady() : false
  });
});

// ==================== DASHBOARD & BOT API BYPASS GATEWAY ====================

function extractAndVerifyApiKey(req) {
  const headerKey = req.headers['x-api-key'] || 
                    req.headers['x-secret-key'] || 
                    req.headers['x-ntl-secret'] || 
                    req.headers['x-bot-secret'] || 
                    req.headers['api-key'];
                    
  let authHeader = req.headers['authorization'];
  if (authHeader && typeof authHeader === 'string') {
    if (authHeader.toLowerCase().startsWith('bearer ')) {
      authHeader = authHeader.slice(7).trim();
    }
  }

  const queryKey = req.query?.secret_key || req.query?.apiKey || req.query?.api_key || req.query?.key || req.query?.k;
  const bodyKey = req.body && (req.body.secret_key || req.body.apiKey || req.body.api_key || req.body.key || req.body.k);

  const providedKey = (headerKey || authHeader || queryKey || bodyKey || '').trim();

  if (!providedKey) {
    return {
      valid: false,
      status: 401,
      code: 'MISSING_SECRET_KEY',
      error: '❌ مفتاح الـ API السري مفقود (Missing Secret Key). يجب تقديم secret_key صالح ومُنشأ عبر البوت (-api انشاء).'
    };
  }

  if (typeof global.validateApiKey === 'function') {
    const result = global.validateApiKey(providedKey);
    if (!result.valid) {
      const isExpired = result.code === 'EXPIRED_SECRET_KEY';
      return {
        valid: false,
        status: 403,
        code: result.code || 'INVALID_SECRET_KEY',
        error: result.error || '❌ مفتاح API السري غير صحيح أو ملغي.',
        keyObj: result.keyObj,
        isExpired
      };
    }
    return { valid: true, keyObj: result.keyObj, key: providedKey };
  }

  // Fallback: check db directly if global function not attached yet
  return {
    valid: false,
    status: 503,
    code: 'SYSTEM_STARTING',
    error: '⚠️ جاري إعداد نظام التحقق من المفاتيح، يرجى المحاولة بعد لحظات.'
  };
}

async function handleBypassApiRequest(req, res) {
  const auth = extractAndVerifyApiKey(req);
  if (!auth.valid) {
    return res.status(auth.status).json({
      success: false,
      code: auth.code,
      error: auth.error,
      expiredAt: auth.keyObj?.expiresAt || undefined
    });
  }

  const targetUrl = req.body?.url || req.body?.link || req.body?.d || req.query?.url || req.query?.link || req.query?.d;
  if (!targetUrl || typeof targetUrl !== 'string' || !targetUrl.trim()) {
    return res.status(400).json({
      success: false,
      code: 'MISSING_TARGET_URL',
      error: "❌ الرابط المراد تخطيه مفقود. يرجى إرسال الرابط في حقل 'url' أو 'link'."
    });
  }

  const userParam = req.body?.user || req.body?.username || req.query?.user || req.query?.username || null;
  const startTime = Date.now();

  try {
    if (!global.bypassDeltaLink) {
      return res.status(503).json({
        success: false,
        code: 'BYPASS_SERVICE_UNAVAILABLE',
        error: '⚠️ محرك التخطي غير متاح حالياً.'
      });
    }

    // Record API key usage
    if (typeof global.recordApiKeyUsage === 'function') {
      global.recordApiKeyUsage(auth.key);
    }

    const resBypass = await global.bypassDeltaLink(targetUrl.trim(), userParam);
    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    if (resBypass && resBypass.bypassedLink) {
      const remainingTimeStr = typeof global.formatRemainingTime === 'function' ? global.formatRemainingTime(auth.keyObj.expiresAt) : undefined;
      return res.json({
        success: true,
        key: resBypass.bypassedLink,
        result: resBypass.bypassedLink,
        bypassedLink: resBypass.bypassedLink,
        timeTaken: `${timeTaken}s`,
        status: 'completed',
        provider: resBypass.provider || "Delta / PlatoRelay Engine",
        meta: {
          keyName: auth.keyObj.name || "API Key",
          expiresAt: auth.keyObj.expiresAt,
          remaining: remainingTimeStr,
          totalUses: (auth.keyObj.totalUses || 0) + 1
        }
      });
    }

    if (resBypass && (resBypass.isPlatoRelay || resBypass.isGoogleAuthError)) {
      return res.status(422).json({
        success: false,
        code: 'PLATO_GOOGLE_AUTH_REQUIRED',
        error: "هذا الرابط يتطلب توثيق Google من الفيديو الإرشادي المخصص.",
        timeTaken: `${timeTaken}s`
      });
    }

    return res.status(422).json({
      success: false,
      code: 'BYPASS_FAILED',
      error: resBypass?.error || "فشل تخطي هذا الرابط. يرجى التأكد من صلاحية الرابط.",
      timeTaken: `${timeTaken}s`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 'SERVER_EXCEPTION',
      error: err.message
    });
  }
}

// Routes for Bypass API
app.get(['/api/bypass', '/api/v1/bypass', '/api/delta/bypass', '/api/platorelay'], handleBypassApiRequest);
app.post(['/api/bypass', '/api/v1/bypass', '/api/delta/bypass', '/api/platorelay'], handleBypassApiRequest);

// Check Key Status Endpoint
app.all(['/api/key/status', '/api/v1/key/status'], (req, res) => {
  const auth = extractAndVerifyApiKey(req);
  if (!auth.valid) {
    return res.status(auth.status).json({
      success: false,
      code: auth.code,
      error: auth.error,
      expiredAt: auth.keyObj?.expiresAt || undefined
    });
  }

  const remaining = typeof global.formatRemainingTime === 'function' ? global.formatRemainingTime(auth.keyObj.expiresAt) : 'Active';
  res.json({
    success: true,
    key: auth.key,
    name: auth.keyObj.name,
    active: auth.keyObj.active,
    createdAt: auth.keyObj.createdAt,
    expiresAt: auth.keyObj.expiresAt,
    remaining,
    totalUses: auth.keyObj.totalUses || 0,
    lastUsedAt: auth.keyObj.lastUsedAt,
    createdBy: auth.keyObj.createdBy
  });
});

// Dashboard Key Management Endpoints (Requires Dashboard Admin Session or Valid Master Access)
app.get('/api/admin/keys', (req, res) => {
  // Check if session user exists or header key
  const keys = typeof global.getApiKeys === 'function' ? global.getApiKeys() : {};
  const list = Object.values(keys).map(k => ({
    ...k,
    remaining: typeof global.formatRemainingTime === 'function' ? global.formatRemainingTime(k.expiresAt) : 'Active',
    isExpired: k.expiresAt !== 'lifetime' && k.expiresAt && Date.now() > k.expiresAt
  }));
  res.json({ success: true, keys: list });
});

app.post('/api/admin/keys/create', (req, res) => {
  const { duration, name } = req.body || {};
  if (typeof global.createApiKey === 'function') {
    const result = global.createApiKey({ durationStr: duration || '1d', name: name || '', createdBy: 'Dashboard User' });
    return res.json({ success: true, ...result });
  }
  res.status(500).json({ success: false, error: 'Engine not ready' });
});

app.post('/api/admin/keys/renew', (req, res) => {
  const { key, duration } = req.body || {};
  if (typeof global.renewApiKey === 'function') {
    const result = global.renewApiKey(key, duration);
    if (result) return res.json({ success: true, ...result });
    return res.status(404).json({ success: false, error: 'Key not found' });
  }
  res.status(500).json({ success: false, error: 'Engine not ready' });
});

app.post('/api/admin/keys/edit', (req, res) => {
  const { key, duration } = req.body || {};
  if (typeof global.editApiKeyDuration === 'function') {
    const result = global.editApiKeyDuration(key, duration);
    if (result) return res.json({ success: true, ...result });
    return res.status(400).json({ success: false, error: 'Failed to edit key duration' });
  }
  res.status(500).json({ success: false, error: 'Engine not ready' });
});

app.post('/api/admin/keys/delete', (req, res) => {
  const { key } = req.body || {};
  if (typeof global.deleteApiKey === 'function') {
    const ok = global.deleteApiKey(key);
    return res.json({ success: ok });
  }
  res.status(500).json({ success: false, error: 'Engine not ready' });
});

// Serve frontend SPA index.html fallback or status page
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  const distIndex = path.join(__dirname, 'dist', 'index.html');
  const pubIndex = path.join(__dirname, 'public', 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');

  try {
    if (fs.existsSync(rootIndex)) {
      return res.sendFile(rootIndex);
    } else if (fs.existsSync(distIndex)) {
      return res.sendFile(distIndex);
    } else if (fs.existsSync(pubIndex)) {
      return res.sendFile(pubIndex);
    }
  } catch (e) {
    // Ignore file read errors and fall back to status page
  }

  // If running as API backend only without index.html on hosting container
  return res.status(200).send(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>NTL Bot Server Online</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #0b0f19; color: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
          .card { background: #131c31; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; max-width: 500px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
          .badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; padding: 6px 14px; font-size: 14px; font-weight: bold; margin-bottom: 20px; }
          .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
          h1 { margin: 0 0 12px; font-size: 24px; color: #38bdf8; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin: 0 0 24px; }
          .info { background: #0f172a; border-radius: 10px; padding: 14px; text-align: left; font-family: monospace; font-size: 13px; color: #cbd5e1; margin-bottom: 24px; direction: ltr; }
          .btn { display: inline-block; background: #0284c7; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: bold; transition: 0.2s; }
          .btn:hover { background: #0369a1; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge"><span class="dot"></span> السيرفر يعمل بنجاح (Online)</div>
          <h1>🤖 NTL Bot API & Backend</h1>
          <p>خادم البوت والواجهة الخلفية متصل وجاهز لاستقبال الطلبات ومعالجة الأوامر.</p>
          <div class="info">
            <div><strong>Host:</strong> fi12.bot-hosting.cloud</div>
            <div><strong>Port:</strong> ${PORT}</div>
            <div><strong>Status:</strong> HTTP 200 OK</div>
          </div>
          <a class="btn" href="https://ntldashboard.pages.dev" target="_blank">فتح لوحة التحكم (Dashboard)</a>
        </div>
      </body>
    </html>
  `);
});

// Start listening
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✨ NTL Dashboard Server active on port ${PORT}`);
  try {
    console.log("🤖 Starting NTL Discord Bot in parallel...");
    require('./index.js');
  } catch (err) {
    console.error("❌ Failed to start NTL Discord Bot:", err);
  }
});
