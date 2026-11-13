// بوابة الداشبورد → البوت. هي الطريق الوحيد للـ API.
//  1) تتحقق من جلسة ديسكورد الموقعة  2) تسمح فقط بمسارات معروفة
//  3) تتأكد أن السيرفر ضمن سيرفرات المستخدم  4) تمنع الطلبات الخارجية (Origin)
//  5) توقّع الطلب بـ HMAC (السر لا يُرسل أبداً)  6) تفلتر قوائم السيرفرات
import { getSession, json, hmacHex, sha256Hex } from '../_lib/auth.js';

const G = '([0-9]{16,21})';
const ROUTES = [
  ['GET',  /^bot-guilds$/, 'list'], ['GET', /^guilds$/, 'list'], ['POST', /^guilds\/check$/, 'check'],
  ['GET',  /^templates$/], ['POST', /^upload-image$/, 'upload'], ['POST', /^translate$/],
  ['GET',  new RegExp(`^guild-settings/${G}$`), 'guild'], ['POST', new RegExp(`^save-guild-settings/${G}$`), 'guild'],
  ['POST', new RegExp(`^test-welcome/${G}$`), 'guild'], ['POST', new RegExp(`^broadcast/${G}$`), 'guild'],
  ['GET',  new RegExp(`^logs/${G}$`), 'guild'],
  ['GET',  new RegExp(`^reviews/${G}$`), 'guild'], ['POST', new RegExp(`^reviews/${G}$`), 'guild'],
  ['GET',  new RegExp(`^reports/${G}$`), 'guild'], ['POST', new RegExp(`^reports/${G}$`), 'guild'],
  ['GET',  new RegExp(`^ticket-ratings/${G}$`), 'guild'], ['POST', new RegExp(`^ticket-ratings/${G}$`), 'guild'],
];

export async function onRequest({ request, env, params }) {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();
  if (method === 'OPTIONS') return new Response(null, { status: 403 }); // لا CORS: الموقع نفس الأصل فقط

  // حماية CSRF / منع الطلبات من خارج الداشبورد
  const sfs = request.headers.get('Sec-Fetch-Site');
  if (sfs && sfs !== 'same-origin') return json({ success: false, error: 'forbidden' }, 403);
  if (method !== 'GET') {
    const origin = request.headers.get('Origin');
    if (!origin || origin !== url.origin) return json({ success: false, error: 'forbidden' }, 403);
  }

  const botSecret = env.NTL_BOT_SECRET;
  if (!botSecret || botSecret.length < 24 || !env.NTL_SESSION_SECRET) {
    return json({ success: false, error: 'الإعدادات الأمنية غير مكتملة (NTL_BOT_SECRET / NTL_SESSION_SECRET).' }, 503);
  }
  const session = await getSession(request, env);
  if (!session) return json({ success: false, error: 'سجّل الدخول أولاً' }, 401);

  const path = (params.catchall || []).join('/');
  let match = null, guildId = null;
  for (const [m, re, kind] of ROUTES) {
    if (m !== method) continue;
    const r = re.exec(path);
    if (r) { match = { kind }; guildId = r[1] || null; break; }
  }
  if (!match) return json({ success: false, error: 'not found' }, 404);

  const allowed = new Set(session.adminGuilds.map(g => g.id));
  if (match.kind === 'guild' && !allowed.has(guildId)) {
    return json({ success: false, error: 'لا تملك صلاحية إدارة هذا السيرفر' }, 403);
  }

  // قراءة الجسم بحد أقصى
  let body = new Uint8Array(0);
  if (method !== 'GET') {
    const limit = match.kind === 'upload' ? 12 * 1024 * 1024 : 2 * 1024 * 1024;
    const buf = new Uint8Array(await request.arrayBuffer());
    if (buf.length > limit) return json({ success: false, error: 'الطلب كبير جداً' }, 413);
    body = buf;
    if (match.kind === 'check') {   // لا نثق بقائمة السيرفرات القادمة من المتصفح
      body = new TextEncoder().encode(JSON.stringify({ userGuilds: session.adminGuilds }));
    }
  }

  const base = (env.BOT_API_URL || 'http://us-lax02.altare.global:25147').replace(/\/+$/, '');
  const target = `${base}/api/${path}${url.search}`;
  const apiPath = `/api/${path}${url.search}`;
  const ts = String(Math.floor(Date.now() / 1000));
  const nonce = [...crypto.getRandomValues(new Uint8Array(12))].map(b => b.toString(16).padStart(2, '0')).join('');
  const uid = session.user.id;
  const sig = await hmacHex(['v1', ts, nonce, method, apiPath, uid, await sha256Hex(body)].join('\n'), botSecret);

  const headers = new Headers({ 'x-ntl-ts': ts, 'x-ntl-nonce': nonce, 'x-ntl-uid': uid, 'x-ntl-sig': sig });
  if (method !== 'GET') headers.set('Content-Type', 'application/json');

  let resp;
  try {
    resp = await fetch(target, { method, headers, body: method === 'GET' ? undefined : body, redirect: 'manual', signal: AbortSignal.timeout(15000) });
  } catch {
    return json({ success: false, error: 'تعذر الاتصال بالبوت' }, 502);
  }

  let text = await resp.text();
  if (match.kind === 'list' || match.kind === 'check') {   // لا نكشف إلا سيرفرات المستخدم
    try {
      const d = JSON.parse(text);
      for (const k of ['guilds', 'activeGuilds', 'allAdminGuilds', 'unaddedGuilds']) {
        if (Array.isArray(d[k])) d[k] = d[k].filter(g => allowed.has(String(g.id)));
      }
      text = JSON.stringify(d);
    } catch { /* ignore */ }
  }
  return new Response(text, { status: resp.status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
}
