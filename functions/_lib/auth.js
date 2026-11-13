// أدوات مشتركة: قراءة الجلسة الموقعة (Cookie فقط، HttpOnly) + HMAC
const enc = new TextEncoder();
const dec = new TextDecoder();
export const MAX_CHUNKS = 8;

export function parseCookies(request) {
  return Object.fromEntries((request.headers.get('Cookie') || '').split(';').map(v => v.trim()).filter(Boolean)
    .map(v => { const i = v.indexOf('='); return i === -1 ? [v, ''] : [v.slice(0, i), v.slice(i + 1)]; }));
}
export function toB64Url(bytes) {
  let b = ''; for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]);
  return btoa(b).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}
export function fromB64Url(str) {
  const p = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const bin = atob(p); const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
export async function hmacKey(secret, usages) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, usages);
}
export async function signB64(value, secret) {
  return toB64Url(new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret, ['sign']), enc.encode(value))));
}
export async function hmacHex(value, secret) {
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret, ['sign']), enc.encode(value)));
  return [...sig].map(b => b.toString(16).padStart(2, '0')).join('');
}
export async function sha256Hex(buf) {
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
  return [...h].map(b => b.toString(16).padStart(2, '0')).join('');
}
function cookieToken(c) {
  if (!c.ntl_session) return '';
  let t = c.ntl_session;
  for (let i = 1; i <= MAX_CHUNKS; i++) { if (!c[`ntl_session_${i}`]) break; t += c[`ntl_session_${i}`]; }
  return t;
}
/** يرجع {user, adminGuilds} أو null */
export async function getSession(request, env) {
  if (!env.NTL_SESSION_SECRET) return null;
  const raw = cookieToken(parseCookies(request));
  const dot = raw.lastIndexOf('.');
  if (dot < 1) return null;
  const payload = raw.slice(0, dot), sig = raw.slice(dot + 1);
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(env.NTL_SESSION_SECRET, ['verify']), fromB64Url(sig), enc.encode(payload));
    if (!ok) return null;
    const d = JSON.parse(dec.decode(fromB64Url(payload)));
    if (!d || typeof d.exp !== 'number' || d.exp < Date.now() / 1000 || !d.u) return null;
    return {
      user: { id: String(d.u.id), username: d.u.un, global_name: d.u.gn, avatar: d.u.av },
      adminGuilds: (Array.isArray(d.g) ? d.g : []).filter(Array.isArray)
        .map(i => ({ id: String(i[0]), name: i[1], icon: i[2] || null, owner: true, permissions: '40' }))
    };
  } catch { return null; }
}
export const json = (obj, status = 200, extra = {}) => new Response(JSON.stringify(obj), {
  status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra }
});
