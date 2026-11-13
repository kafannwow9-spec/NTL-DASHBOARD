import { MAX_CHUNKS } from '../../_lib/auth.js';
export async function onRequest({ request }) {
  const url = new URL(request.url);
  if (request.method !== 'POST' || request.headers.get('Origin') !== url.origin) {
    return new Response(JSON.stringify({ success: false }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }
  const h = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  const sec = url.protocol === 'https:' ? 'Secure; ' : '';
  h.append('Set-Cookie', `ntl_session=; HttpOnly; ${sec}SameSite=Lax; Path=/; Max-Age=0`);
  for (let i = 1; i <= MAX_CHUNKS; i++) h.append('Set-Cookie', `ntl_session_${i}=; HttpOnly; ${sec}SameSite=Lax; Path=/; Max-Age=0`);
  return new Response(JSON.stringify({ success: true }), { headers: h });
}
