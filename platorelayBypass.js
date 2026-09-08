const crypto = require('crypto');
const axios = require('axios');
const WebSocket = require('ws');

const DEFAULT_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";
const UA_ZW_SUFFIX = "\u200b\u2060\u200c";
const CLIENT_NAME = "platoboost webclient";
const CLIENT_VERSION = "5.3.2";

const SERVICE_LINKVERTISE = 1;
const SERVICE_LOOTLINKS = 2;
const SERVICE_LOOTLABS = 3;
const SERVICE_WORKINK = 4;

const ADLOCKER_HOST_HINTS = [
    "loot-link.com", "loot-links.com", "lootlink.org", "lootlinks.co", "lootlinks.com",
    "lootdest.info", "lootdest.org", "lootdest.com", "links-loot.com", "linksloot.net",
    "lootlabs.com", "lootlabs", "link-to.net", "linkvertise.com", "linkvertise.net",
    "direct-link.net", "linkvertise.download", "linkvertise.link", "work.ink",
    "workink.com", "boost.ink", "mboost.me", "socialwolvez.com", "rekonise.com", "sub2unlock.com"
];

const AUTH_HOST_HINTS = ["platorelay.com", "platoboost.com", "platoboost.app"];
const CAPTCHA_ORIGIN_DEFAULT = "https://captcha.platorelay.com";

class StageError extends Error {
    constructor(stage, message) {
        super(`[${stage}] ${message}`);
        this.stage = stage;
        this.message = message;
    }
}

// ==================== HELPERS ====================

function hostOf(url) {
    if (!url) return '';
    try {
        const u = new URL(url.startsWith('http') ? url : `https://${url}`);
        return (u.hostname || '').toLowerCase();
    } catch (e) {
        return '';
    }
}

function isAuthHost(url) {
    const h = hostOf(url);
    return AUTH_HOST_HINTS.some(x => h.includes(x));
}

function isAdlockerUrl(url) {
    if (!url) return false;
    const h = hostOf(url);
    if (ADLOCKER_HOST_HINTS.some(x => h.includes(x))) return true;
    if (h.includes('loot') && h.includes('link')) return true;
    if (h.includes('linkvertise') || h.endsWith('link-to.net')) return true;
    return false;
}

function apiBaseFromUrl(url) {
    if (!url) return "https://auth.platorelay.com/api";
    try {
        const u = new URL(url.trim());
        if (u.protocol && u.host && isAuthHost(url)) {
            return `${u.protocol}//${u.host}/api`;
        }
    } catch (e) {}
    return "https://auth.platorelay.com/api";
}

function originFromApi(apiBase) {
    try {
        const u = new URL(apiBase);
        return `${u.protocol}//${u.host}`;
    } catch (e) {
        return "https://auth.platorelay.com";
    }
}

function extractTicket(urlOrTicket) {
    if (!urlOrTicket || typeof urlOrTicket !== 'string') {
        throw new StageError("auth", "URL/ticket must be a non-empty string");
    }
    const s = urlOrTicket.trim();
    try {
        const u = new URL(s.startsWith('http') ? s : `https://auth.platorelay.com/a?d=${s}`);
        const d = u.searchParams.get('d');
        if (d) return d;
        const parts = u.pathname.split('/').filter(Boolean);
        if (parts.length > 0) {
            const last = parts[parts.length - 1];
            if (!['a', 'b', 'reset', 'api'].includes(last) && last.length >= 16) {
                return last;
            }
        }
    } catch (e) {}
    if (/^[A-Za-z0-9+/=_\-]{32,}$/.test(s)) {
        return s;
    }
    throw new StageError("auth", `Could not extract ticket from: ${s.slice(0, 100)}`);
}

function decodeB64Url(value) {
    if (!value) return null;
    try {
        let raw = decodeURIComponent(value).trim();
        const pad = (-raw.length) % 4;
        if (pad) raw += '='.repeat(pad);
        const text = Buffer.from(raw, 'base64').toString('utf8');
        if (text.startsWith('http://') || text.startsWith('https://')) {
            return text;
        }
    } catch (e) {}
    return null;
}

function extractEmbeddedReturnUrl(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        const keys = ["r", "url", "redirect", "destination", "target", "return", "dest", "link", "o", "redir", "continue", "callback", "next"];
        for (const key of keys) {
            const val = u.searchParams.get(key);
            if (!val) continue;
            if (val.startsWith('http://') || val.startsWith('https://')) {
                if (isAuthHost(val) || !isAdlockerUrl(val)) return val;
                const nested = extractEmbeddedReturnUrl(val);
                if (nested) return nested;
            }
            const decoded = decodeB64Url(val);
            if (decoded) return decoded;
        }
    } catch (e) {}
    return null;
}

function extractHash(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        const h = u.searchParams.get('hash') || u.searchParams.get('h');
        if (h) return h;
        if (u.hash && u.hash.includes('hash=')) {
            return u.hash.split('hash=')[1].split('&')[0];
        }
    } catch (e) {}
    return null;
}

function extractKeyFromAny(data) {
    if (!data) return null;
    if (typeof data === 'string') {
        const s = data.trim();
        if (["KEY_NOT_FOUND", "null", "None", "success", "true", "false"].includes(s)) return null;
        if (s.length >= 8 && s.length <= 128 && /^[A-Za-z0-9_\-]+$/.test(s)) return s;
        return null;
    }
    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            for (const item of data) {
                const k = extractKeyFromAny(item);
                if (k) return k;
            }
        } else {
            for (const field of ["key", "keyValue", "license", "licenseKey", "value"]) {
                if (data[field]) {
                    const k = extractKeyFromAny(data[field]);
                    if (k) return k;
                }
            }
            for (const v of Object.values(data)) {
                const k = extractKeyFromAny(v);
                if (k) return k;
            }
        }
    }
    return null;
}

function extractDestinationFromHtml(html) {
    if (!html) return null;
    const patterns = [
        /["'](?:destination|target|targetUrl|redirect|url|href)["']\s*:\s*["'](https?:\/\/[^"']+)["']/i,
        /["']tk["']\s*:\s*["']([^"']+)["']/i,
        /[?&]tk=([A-Za-z0-9_\-]+)/i,
        /(?:window\.location|location\.href)\s*=\s*["'](https?:\/\/[^"']+)["']/i,
        /content=["']0;\s*url=([^"']+)["']/i,
        /href=["'](https?:\/\/(?:auth\.platorelay\.com|gateway\.platoboost\.com)[^"']*)["']/i
    ];
    for (const pat of patterns) {
        const m = html.match(pat);
        if (m && m[1]) return m[1];
    }
    return null;
}

// ==================== AES-128-CTR FINGERPRINTING ====================

function ticketKeyIv(ticket, kind) {
    if (ticket.length < 33) {
        throw new StageError("auth", "Ticket too short for AES key derivation");
    }
    let ks, ivs;
    if (kind === "meta") {
        ks = ticket.slice(0, 16);
        ivs = ticket.slice(16, 32);
    } else if (kind === "stream") {
        ks = ticket.slice(1, 17);
        ivs = ticket.slice(17, 33);
    } else {
        throw new Error(kind);
    }
    return {
        key: Buffer.from(ks, 'latin1'),
        iv: Buffer.from(ivs, 'latin1')
    };
}

function aesCtrHex(plaintext, keyBuf, ivBuf) {
    const cipher = crypto.createCipheriv('aes-128-ctr', keyBuf, ivBuf);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function buildBrowserInfo(userAgent = DEFAULT_UA, opts = {}) {
    const ua = userAgent.endsWith(UA_ZW_SUFFIX) ? userAgent : userAgent + UA_ZW_SUFFIX;
    const ts = opts.nowMs || Date.now();
    const pdf = { name: "PDF Viewer", filename: "internal-pdf-viewer", description: "Portable Document Format" };
    const plugins = [
        "PDF Viewer", "Chrome PDF Viewer", "Chromium PDF Viewer",
        "Microsoft Edge PDF Viewer", "WebKit built-in PDF"
    ].map(n => ({ ...pdf, name: n }));

    return {
        browserInfo: [
            {
                name: "screen",
                data: {
                    width: opts.width || 1920,
                    height: opts.height || 1080,
                    availWidth: opts.width || 1920,
                    availHeight: (opts.height || 1080) - 40,
                    colorDepth: 24,
                    pixelDepth: 24,
                    orientation: { type: "landscape-primary", angle: 0 }
                }
            },
            {
                name: "navigator",
                data: {
                    userAgent: ua,
                    platform: opts.platform || "Win32",
                    maxTouchPoints: 0,
                    plugins: { length: plugins.length, item: plugins },
                    mimeTypes: {
                        length: 2,
                        item: [
                            { type: "application/pdf", description: "Portable Document Format", suffixes: "pdf" },
                            { type: "text/pdf", description: "Portable Document Format", suffixes: "pdf" }
                        ]
                    }
                }
            },
            { name: "performance", data: ts },
            { name: "history", data: { length: 1 } },
            { name: "webdriver", webdriver: false },
            {
                name: "connection",
                data: { effectiveType: "4g", downlink: 10.0, rtt: 50, saveData: false }
            }
        ]
    };
}

function buildMeta(ticket, browserInfo) {
    const payload = browserInfo || buildBrowserInfo();
    const { key, iv } = ticketKeyIv(ticket, "meta");
    return aesCtrHex(JSON.stringify(payload), key, iv);
}

function buildStream(ticket, nowMs) {
    const ts = nowMs || Date.now();
    const payload = { events: [{ event: 5, data: { time: ts, length: 0 } }] };
    const { key, iv } = ticketKeyIv(ticket, "stream");
    return aesCtrHex(JSON.stringify(payload), key, iv);
}

function buildStepBody(ticket, captcha, resolved = true) {
    return {
        captcha: captcha || null,
        meta: buildMeta(ticket),
        stream: buildStream(ticket),
        resolved: resolved
    };
}

// ==================== SHAPECAPTCHA SOLVER ====================

async function oneShotCaptcha(origin) {
    try {
        const res = await fetch(`${origin}/api/challenge`, {
            headers: {
                'User-Agent': DEFAULT_UA,
                'Origin': 'https://auth.platorelay.com',
                'Referer': 'https://auth.platorelay.com/',
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(8000)
        });
        if (!res.ok) return null;
        const ch = await res.json().catch(() => null);
        if (!ch || !ch.challenge_id) return null;

        const cid = ch.challenge_id;
        const w = ch.width || 400;
        const h = ch.height || 260;
        const ctype = (ch.type || 'click').toLowerCase();

        let x = Math.floor(w / 2);
        let y = Math.floor(h / 2);

        if (ch.piece_y) {
            y = ch.piece_y;
        }

        if (ctype === 'slide' || ctype === 'dualspin') {
            x = Math.floor(w * 0.5);
        } else {
            // slight random variation around center for click/coherence/driftodd
            x = Math.floor(w * 0.5 + (Math.random() * 20 - 10));
            y = Math.floor(h * 0.5 + (Math.random() * 20 - 10));
        }

        const ansRes = await fetch(`${origin}/api/answer`, {
            method: 'POST',
            headers: {
                'User-Agent': DEFAULT_UA,
                'Origin': 'https://auth.platorelay.com',
                'Referer': 'https://auth.platorelay.com/',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ challenge_id: cid, x, y }),
            signal: AbortSignal.timeout(8000)
        });

        if (!ansRes.ok) return null;
        const ansJson = await ansRes.json().catch(() => null);
        if (ansJson && ansJson.success && ansJson.token) {
            return String(ansJson.token);
        }
    } catch (e) {}
    return null;
}

async function solveShapeCaptcha(origin = CAPTCHA_ORIGIN_DEFAULT, workers = 5, maxTries = 15) {
    let attempts = 0;
    while (attempts < maxTries) {
        const tasks = Array.from({ length: workers }, () => oneShotCaptcha(origin));
        const results = await Promise.all(tasks);
        attempts += workers;
        const token = results.find(t => t && typeof t === 'string' && t.length > 5);
        if (token) return token;
        await new Promise(r => setTimeout(r, 200));
    }
    throw new StageError("captcha", `ShapeCaptcha failed after ${attempts} attempts`);
}

// ==================== LOOTLABS / LOOTDEST RESOLVER ====================

function decryptPublisherLink(encoded, keyLen = 5) {
    if (!encoded || typeof encoded !== 'string') return null;
    try {
        const raw = Buffer.from(encoded.trim(), 'base64');
        if (raw.length <= keyLen) return null;
        const key = raw.subarray(0, keyLen);
        const data = raw.subarray(keyLen);
        const outBuf = Buffer.alloc(data.length);
        for (let i = 0; i < data.length; i++) {
            outBuf[i] = data[i] ^ key[i % keyLen];
        }
        let outStr = outBuf.toString('latin1');
        return sanitizeDestination(outStr);
    } catch (e) {
        return null;
    }
}

function sanitizeDestination(url) {
    if (!url) return url;
    while (url.length > 0 && url.charCodeAt(url.length - 1) < 32) {
        url = url.slice(0, -1);
    }
    if (url.length > 0) {
        const pad = url.charCodeAt(url.length - 1);
        if (pad >= 1 && pad <= 16 && url.length >= pad) {
            let isPad = true;
            for (let i = url.length - pad; i < url.length; i++) {
                if (url.charCodeAt(i) !== pad) { isPad = false; break; }
            }
            if (isPad) url = url.slice(0, -pad);
        }
    }
    url = url.trim().replace(/[\x00-\x1F\x7F]+$/g, '').replace(/[\\"'"]+$/g, '');
    if (url.includes('%') && url.startsWith('http')) {
        try {
            const dec = decodeURIComponent(url);
            if (dec.startsWith('http')) url = dec;
        } catch (e) {}
    }
    return url;
}

function parsePageConfig(html) {
    const out = {};
    const mSess = html.match(/document\.session\s*=\s*['"]([^'"]+)['"]/);
    if (mSess) out.page_session = mSess[1];

    const regex = /p\['([^']+)'\]\s*=\s*(.+?);/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const key = match[1];
        let val = match[2].trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        } else if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (/^-?\d+$/.test(val)) val = parseInt(val, 10);
        else if (val === 'null') val = null;
        out[key] = val;
    }
    return out;
}

function solveWebglPow(uuid, difficulty = 0.001, maxNonce = 100000) {
    const t0 = Date.now();
    const hex8 = uuid.replace(/-/g, '').slice(0, 8);
    const challenge = parseInt(hex8, 16) / 4294967295.0;

    const powFract = (a, b) => {
        const n = 43758.5453 * Math.sin(12.9898 * a + 78.233 * b);
        return n - Math.floor(n);
    };

    for (let nonce = 0; nonce < maxNonce; nonce++) {
        let h = powFract(challenge, nonce);
        h = powFract(h, nonce + 1);
        h = powFract(h, nonce + 2);
        if (h < difficulty) {
            return { uuid, nonce, time: Date.now() - t0 };
        }
    }
    return { uuid, nonce: 0, time: 0 };
}

function botdKeyFromSession(session) {
    const letters = (session.match(/[A-Z]/g) || []).slice(0, 4).join('') || 'A';
    const raw = Buffer.from(session, 'utf8');
    const key = Buffer.from(letters, 'utf8');
    const xored = Buffer.alloc(raw.length);
    for (let i = 0; i < raw.length; i++) {
        xored[i] = raw[i] ^ key[i % key.length];
    }
    return xored.toString('base64');
}

function botdEncrypt(session, payload) {
    const b64KeyStr = botdKeyFromSession(session);
    const key = crypto.createHash('sha256').update(b64KeyStr, 'utf8').digest();
    const iv = crypto.randomBytes(12);
    const pt = Buffer.from(JSON.stringify(payload), 'utf8');
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const ct = cipher.update(pt);
    const finalCt = cipher.final();
    const tag = cipher.getAuthTag();
    const combined = Buffer.concat([iv, ct, finalCt, tag]);
    return combined.toString('base64');
}

function buildBotdProof(session) {
    const sol = solveWebglPow(session);
    const payload = {
        bot: false,
        botKind: null,
        timestamp: Date.now(),
        webGLSolution: sol
    };
    return {
        ...payload,
        encrypted: botdEncrypt(session, payload)
    };
}

async function resolveLootlabs(url, timeoutMs = 60000) {
    const sessionAxios = axios.create({
        headers: {
            'User-Agent': DEFAULT_UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9'
        },
        timeout: 15000
    });

    const res1 = await sessionAxios.get(url).catch(e => e.response || null);
    if (!res1 || !res1.data) {
        throw new StageError("lootlink", `Failed to fetch Lootlabs page: ${url}`);
    }

    const html = typeof res1.data === 'string' ? res1.data : String(res1.data);
    const cfg = parsePageConfig(html);
    const botds = cfg.page_session;

    if (!botds) {
        throw new StageError("lootlink", "No session found on Lootlabs page");
    }

    const pubEnc = cfg.PUBLISHER_LINK || cfg.publisher_link;
    if (pubEnc && typeof pubEnc === 'string') {
        const dest = decryptPublisherLink(pubEnc);
        if (dest && dest.startsWith('http') && !isAdlockerUrl(dest)) {
            return dest;
        }
    }

    const botdProof = buildBotdProof(botds);
    const key = cfg.KEY || "";
    const tid = cfg.TID;
    const cdn = cfg.CDN_DOMAIN;

    if (!key || tid === undefined || !cdn) {
        throw new StageError("lootlink", "Missing KEY/TID/CDN on Lootlabs page");
    }

    const cdnUrl = `https://${cdn}/?tid=${tid}&params_only=1`;
    const cdnRes = await sessionAxios.get(cdnUrl, { headers: { 'Referer': url } }).catch(() => null);
    if (!cdnRes || !cdnRes.data) {
        throw new StageError("lootlink", "Failed to fetch CDN parameters");
    }

    let params = [];
    try {
        let rawText = typeof cdnRes.data === 'string' ? cdnRes.data.trim() : JSON.stringify(cdnRes.data);
        if (rawText.startsWith('(')) rawText = rawText.slice(1);
        if (rawText.endsWith(';')) rawText = rawText.slice(0, -1);
        if (rawText.endsWith(')')) rawText = rawText.slice(0, -1);
        params = JSON.parse('[' + rawText + ']');
    } catch (e) {
        throw new StageError("lootlink", "Failed to parse CDN parameters");
    }

    const domains = {
        number_of_tasks: params[6] || 2,
        bl_tasks: params[7] || [],
        incentive_server_domain: params[9] || null,
        syncer_domain: params[29] || null,
        allow_unlocker: params[30] !== undefined ? params[30] : true
    };

    const syncer = domains.syncer_domain;
    const incentive = domains.incentive_server_domain;
    if (!syncer || !incentive) {
        throw new StageError("lootlink", "Missing syncer/incentive domains");
    }

    const apiSession = String(Math.floor(Math.random() * 9) + 1) + Array.from({ length: 17 }, () => Math.floor(Math.random() * 10)).join('');
    const tcBody = {
        tid,
        bl: Array.isArray(domains.bl_tasks) ? domains.bl_tasks : [domains.bl_tasks],
        session: apiSession,
        max_tasks: domains.number_of_tasks,
        design_id: 139,
        cur_url: url,
        doc_ref: "",
        tier_id: cfg.TIER_ID ? String(cfg.TIER_ID) : "",
        num_of_tasks: cfg.NUM_OF_TASKS ? String(cfg.NUM_OF_TASKS) : "",
        is_loot: true,
        rkey: key,
        cookie_id: String(Math.floor(100000000 + Math.random() * 900000000)),
        botds: botds,
        offer: "0",
        ver: "v1",
        test_unlocker_app: cfg.TEST_UNLOCKER_APP || -1,
        allow_unlocker: domains.allow_unlocker,
        show_unlocker: cfg.SHOW_UNLOCKER !== undefined ? cfg.SHOW_UNLOCKER : true,
        desktop_design: 0,
        unlocker_only: 0,
        additional_info: {},
        botd: botdProof
    };

    const tcRes = await sessionAxios.post(`https://${syncer}/tc`, tcBody, {
        headers: { 'Content-Type': 'application/json', 'Referer': url }
    }).catch(() => null);

    if (!tcRes || !tcRes.data) {
        throw new StageError("lootlink", "Failed to register task session (/tc)");
    }

    const tasksData = Array.isArray(tcRes.data) ? tcRes.data : (tcRes.data.tasks || tcRes.data.categories || []);
    if (!tasksData || tasksData.length === 0) {
        throw new StageError("lootlink", "No tasks returned from /tc");
    }

    const firstUrid = tasksData[0].urid || "0";
    const sub = parseInt(String(firstUrid).slice(-5) || "0", 10) % 3;
    const baseTask = `https://${sub}.${incentive}`;

    for (const t of tasksData) {
        if (t.urid && t.task_id) {
            fetch(`${baseTask}/st?uid=${encodeURIComponent(t.urid)}&cat=${encodeURIComponent(t.task_id)}`, {
                headers: { 'User-Agent': DEFAULT_UA, 'Referer': url }
            }).catch(() => {});
        }
    }

    return new Promise((resolvePromise, rejectPromise) => {
        let isDone = false;
        const urids = tasksData.map(t => t.urid).filter(Boolean).join(',');
        const cats = tasksData.map(t => t.task_id).filter(Boolean).join(',');
        const wsUrl = `wss://${sub}.${incentive}/c?uid=${encodeURIComponent(urids)}&cat=${encodeURIComponent(cats)}&key=${encodeURIComponent(key)}&session_id=${encodeURIComponent(apiSession)}&is_loot=1&tid=${tid}`;

        let ws = null;
        try {
            ws = new WebSocket(wsUrl, { headers: { 'User-Agent': DEFAULT_UA } });
        } catch (e) {}

        const timeoutTimer = setTimeout(() => {
            if (!isDone) {
                isDone = true;
                if (ws) try { ws.close(); } catch (e) {}
                rejectPromise(new StageError("lootlink", "Timeout waiting for Lootlabs publisher link via WebSocket"));
            }
        }, timeoutMs);

        if (ws) {
            ws.on('open', () => {
                const keepAlive = setInterval(() => {
                    if (isDone) { clearInterval(keepAlive); return; }
                    try { ws.send("0"); } catch (e) {}
                }, 10000);
            });

            ws.on('message', (msg) => {
                const str = msg.toString('utf8');
                if (str.startsWith('r:')) {
                    const enc = str.slice(2);
                    const dest = decryptPublisherLink(enc);
                    if (dest && dest.startsWith('http')) {
                        isDone = true;
                        clearTimeout(timeoutTimer);
                        try { ws.close(); } catch (e) {}
                        resolvePromise(dest);
                    }
                }
            });

            ws.on('error', () => {});
        }

        tasksData.forEach((t) => {
            if (t.urid) {
                setTimeout(() => {
                    if (isDone) return;
                    fetch(`${baseTask}/p?uid=${encodeURIComponent(t.urid)}`, {
                        headers: { 'User-Agent': DEFAULT_UA, 'Referer': url }
                    }).catch(() => {});
                }, Math.max(1000, (t.auto_complete_seconds || 5) * 1000));
            }
        });
    });
}

// ==================== ADLOCKER BYPASS ====================

async function bypassAdlocker(url, timeoutMs = 60000) {
    if (!url || typeof url !== 'string') {
        throw new StageError("lootlink", "Adlocker URL is empty");
    }

    const embedded = extractEmbeddedReturnUrl(url);
    if (embedded) {
        return {
            destination: embedded,
            returnTicketUrl: isAuthHost(embedded) ? embedded : null,
            hashToken: extractHash(embedded)
        };
    }

    if (url.includes('lootdest') || url.includes('lootlabs') || url.includes('loot-link') || url.includes('links-loot')) {
        const dest = await resolveLootlabs(url, timeoutMs);
        return {
            destination: dest,
            returnTicketUrl: isAuthHost(dest) ? dest : null,
            hashToken: extractHash(dest)
        };
    }

    // HTTP redirect follow
    let current = url;
    for (let hop = 0; hop < 6; hop++) {
        const res = await axios.get(current, {
            headers: { 'User-Agent': DEFAULT_UA },
            maxRedirects: 5,
            timeout: 10000,
            validateStatus: () => true
        }).catch(() => null);

        if (!res) break;
        const finalUrl = res.request?.res?.responseUrl || current;
        const emb = extractEmbeddedReturnUrl(finalUrl);
        if (emb) {
            return {
                destination: emb,
                returnTicketUrl: isAuthHost(emb) ? emb : null,
                hashToken: extractHash(emb)
            };
        }

        if (isAuthHost(finalUrl)) {
            return {
                destination: finalUrl,
                returnTicketUrl: finalUrl,
                hashToken: extractHash(finalUrl)
            };
        }

        if (typeof res.data === 'string') {
            const parsed = extractDestinationFromHtml(res.data);
            if (parsed && parsed.startsWith('http')) {
                current = parsed;
                continue;
            }
        }
        break;
    }

    throw new StageError("lootlink", `Could not resolve destination from: ${url.slice(0, 100)}`);
}

// ==================== PLATORELAY API CLIENT & SESSION FLOW ====================

class PlatoRelayClient {
    constructor(ticket, apiBase = "https://auth.platorelay.com/api") {
        this.ticket = ticket;
        this.apiBase = apiBase.replace(/\/+$/, '');
        this.origin = originFromApi(this.apiBase);
        this.axios = axios.create({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Client-Name': CLIENT_NAME,
                'X-Client-Version': CLIENT_VERSION,
                'User-Agent': DEFAULT_UA,
                'Origin': this.origin,
                'Referer': `${this.origin}/a?d=${ticket.slice(0, 80)}`
            },
            timeout: 20000
        });
    }

    async status() {
        try {
            const res = await this.axios.get(`${this.apiBase}/session/status?ticket=${this.ticket}`);
            const data = res.data;
            if (data && data.success !== false) {
                const inner = data.data || {};
                return {
                    key: inner.key ? String(inner.key) : null,
                    raw: data
                };
            }
        } catch (e) {}
        return { key: null, raw: null };
    }

    async metadata() {
        const res = await this.axios.get(`${this.apiBase}/session/metadata?ticket=${this.ticket}`).catch(e => {
            throw new StageError("auth", `Metadata request failed: ${e.message}`);
        });
        const data = res.data;
        if (!data || !data.success) {
            throw new StageError("auth", (data && data.message) || "metadata failed");
        }
        const inner = data.data || {};
        const profile = inner.activeRevenueProfile || {};
        return {
            name: String(inner.name || ''),
            service: parseInt(profile.service || SERVICE_LOOTLINKS, 10),
            checkpointCount: parseInt(profile.checkpointCount || 1, 10),
            completed: parseInt(inner.completed || 0, 10),
            raw: data
        };
    }

    async step(service, captchaToken = null, hashToken = null) {
        const body = buildStepBody(this.ticket, captchaToken, true);
        let url = `${this.apiBase}/session/step?ticket=${this.ticket}&service=${parseInt(service, 10)}`;
        if (hashToken) url += `&hash=${hashToken}`;

        const res = await this.axios.put(url, body).catch(e => {
            if (e.response && e.response.data) return e.response;
            throw new StageError("auth", `Step request failed: ${e.message}`);
        });

        const data = res.data || {};
        const msg = String(data.message || '').toLowerCase();
        const needsCaptcha = msg.includes('captcha');
        const alreadyExists = msg.includes('already exists');

        if (needsCaptcha) {
            console.log(`[PlatoRelay] Debug: Captcha requested by server. Attempting quick programmatic bypass...`);
            // Attempt to solve it immediately with a quick shape solver
            try {
                const quickToken = await solveShapeCaptcha(CAPTCHA_ORIGIN_DEFAULT, 3, 5);
                if (quickToken) {
                    console.log(`[PlatoRelay] Quick captcha token obtained, retrying step...`);
                    return this.step(service, quickToken, hashToken);
                }
            } catch (e) {
                console.log(`[PlatoRelay] Quick captcha bypass failed: ${e.message}`);
            }
        }

        if (data.success) {
            const inner = data.data || data;
            let stepUrl = null;
            if (typeof inner === 'object') {
                if (inner.data && typeof inner.data === 'object') stepUrl = inner.data.url;
                stepUrl = stepUrl || inner.url;
            }
            return { ok: true, url: stepUrl, message: data.message, needsCaptcha: false, alreadyExists: false, raw: data };
        }

        return { ok: false, url: null, message: data.message, needsCaptcha, alreadyExists, raw: data };
    }
}

async function fetchKey(urlOrTicket) {
    const ticket = extractTicket(urlOrTicket);
    const baseApi = apiBaseFromUrl(urlOrTicket.includes('://') ? urlOrTicket : `https://auth.platorelay.com/a?d=${ticket}`);
    let client = new PlatoRelayClient(ticket, baseApi);

    // Initial status check
    const st = await client.status();
    if (st.key && st.key !== "KEY_NOT_FOUND") {
        return { key: st.key, error: null };
    }

    const meta = await client.metadata();
    const service = meta.service;
    const maxHops = Math.max(meta.checkpointCount * 3 + 4, 8);
    let pendingRedirect = null;

    for (let hop = 0; hop < maxHops; hop++) {
        let redirectUrl = pendingRedirect;
        pendingRedirect = null;

        if (!redirectUrl) {
            // Run step
            let captchaToken = null;
            let stepRes = null;

            for (let attempt = 0; attempt < 6; attempt++) {
                stepRes = await client.step(service, captchaToken);
                if (stepRes.needsCaptcha) {
                    console.log(`[PlatoRelay] Captcha requested, solving...`);
                    captchaToken = await solveShapeCaptcha(CAPTCHA_ORIGIN_DEFAULT);
                    continue;
                }
                if (stepRes.ok || stepRes.alreadyExists) {
                    console.log(`[PlatoRelay] Step successful, proceeding to: ${stepRes.url?.slice(0, 50)}...`);
                    break;
                }

                const msg = String(stepRes.message || '').toLowerCase();
                if (msg.includes('rate limit') || msg.includes('slow down') || msg.includes('too fast')) {
                    await new Promise(r => setTimeout(r, 1500));
                    continue;
                }
                break;
            }

            // Only check status if step failed or we want to double check before redirecting
            if (!stepRes || !stepRes.ok) {
                const checkSt = await client.status();
                if (checkSt.key && checkSt.key !== "KEY_NOT_FOUND") {
                    return { key: checkSt.key, error: null };
                }
                if (stepRes && stepRes.message) {
                    throw new StageError("auth", stepRes.message);
                }
            }

            redirectUrl = stepRes ? stepRes.url : null;
        }

        if (!redirectUrl || redirectUrl.toLowerCase().includes('about:blank')) {
            const checkSt = await client.status();
            if (checkSt.key && checkSt.key !== "KEY_NOT_FOUND") {
                return { key: checkSt.key, error: null };
            }
            continue;
        }

        // Handle adlocker or auth redirect
        if (isAdlockerUrl(redirectUrl) || !isAuthHost(redirectUrl)) {
            const bypass = await bypassAdlocker(redirectUrl);
            const nextUrl = bypass.returnTicketUrl || bypass.destination;
            if (!nextUrl) {
                throw new StageError("lootlink", "Bypass produced no return destination");
            }

            if (isAuthHost(nextUrl)) {
                const nextTicket = extractTicket(nextUrl);
                client = new PlatoRelayClient(nextTicket, apiBaseFromUrl(nextUrl));
                const checkSt = await client.status();
                if (checkSt.key && checkSt.key !== "KEY_NOT_FOUND") {
                    return { key: checkSt.key, error: null };
                }
            } else {
                const ht = bypass.hashToken || extractHash(nextUrl);
                if (ht) {
                    await client.step(service, null, ht);
                    const checkSt = await client.status();
                    if (checkSt.key && checkSt.key !== "KEY_NOT_FOUND") {
                        return { key: checkSt.key, error: null };
                    }
                }
            }
        } else if (isAuthHost(redirectUrl)) {
            const ht = extractHash(redirectUrl);
            try {
                const nt = extractTicket(redirectUrl);
                if (nt && nt !== client.ticket) {
                    client = new PlatoRelayClient(nt, apiBaseFromUrl(redirectUrl));
                }
            } catch (e) {}

            if (ht) {
                await client.step(service, null, ht);
            }
            const checkSt = await client.status();
            if (checkSt.key && checkSt.key !== "KEY_NOT_FOUND") {
                return { key: checkSt.key, error: null };
            }
        }
    }

    const finalSt = await client.status();
    if (finalSt.key && finalSt.key !== "KEY_NOT_FOUND") {
        return { key: finalSt.key, error: null };
    }

    throw new StageError("finalize", "Key not issued or link expired");
}

module.exports = {
    fetchKey,
    solveShapeCaptcha,
    bypassAdlocker,
    resolveLootlabs,
    extractTicket,
    StageError
};
