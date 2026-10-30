const enc = new TextEncoder();
function b64url(bytes) { let s=''; for (const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name:'HMAC', hash:'SHA-256' }, false, ['sign']);
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(value))));
}
function cookies(request) { return Object.fromEntries((request.headers.get('Cookie')||'').split(';').map(v=>v.trim()).filter(Boolean).map(v=>{const i=v.indexOf('=');return [v.slice(0,i),v.slice(i+1)]})); }
export async function onRequest({ request, env }) {
  const url = new URL(request.url), c = cookies(request), code = url.searchParams.get('code'), state = url.searchParams.get('state');
  const redirectUri = env.DISCORD_REDIRECT_URI || `${url.origin}/auth/callback`;
  const clearState = 'ntl_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0';
  if (!code || !state || !c.ntl_oauth_state || state !== c.ntl_oauth_state) return new Response('فشل التحقق من طلب تسجيل الدخول. أعد المحاولة من الموقع.', { status:400, headers:{'Set-Cookie':clearState} });
  if (!env.DISCORD_CLIENT_SECRET || !env.NTL_SESSION_SECRET) return new Response('إعدادات تسجيل الدخول غير مكتملة على Cloudflare.', {status:503, headers:{'Set-Cookie':clearState}});
  try {
    const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams({client_id:env.DISCORD_CLIENT_ID||'1405179057628254259', client_secret:env.DISCORD_CLIENT_SECRET, grant_type:'authorization_code', code, redirect_uri:redirectUri}) });
    if (!tokenRes.ok) throw new Error('Discord token exchange failed');
    const token = await tokenRes.json();
    const headers = { Authorization:`Bearer ${token.access_token}` };
    const [uRes,gRes] = await Promise.all([fetch('https://discord.com/api/v10/users/@me',{headers}),fetch('https://discord.com/api/v10/users/@me/guilds',{headers})]);
    if (!uRes.ok || !gRes.ok) throw new Error('Discord profile or guild permissions could not be verified');
    const user = await uRes.json(), guilds = await gRes.json();
    const adminGuilds = guilds.filter(g => g.owner === true || ((BigInt(g.permissions || '0') & 40n) !== 0n));
    const payload = b64url(enc.encode(JSON.stringify({ user, adminGuilds, exp:Math.floor(Date.now()/1000)+86400 })));
    const signature = await sign(payload, env.NTL_SESSION_SECRET);
    const cookie = `ntl_session=${payload}.${signature}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`;
    const outHeaders = new Headers({ Location:'/' }); outHeaders.append('Set-Cookie', cookie); outHeaders.append('Set-Cookie', clearState); return new Response(null,{status:302,headers:outHeaders});
  } catch (e) {
    return new Response(`تعذر تسجيل الدخول عبر Discord: ${e.message}`,{status:401,headers:{'Content-Type':'text/plain; charset=utf-8','Set-Cookie':clearState}});
  }
}
