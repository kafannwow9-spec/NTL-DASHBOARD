const enc = new TextEncoder();

function toBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(value));
  return toBase64Url(new Uint8Array(sig));
}

export async function onRequest({ request, env }) {
  const reqUrl = new URL(request.url);
  const isSecure = reqUrl.protocol === 'https:';
  const clientId = env.DISCORD_CLIENT_ID || '1405179057628254259';
  const redirectUri = env.DISCORD_REDIRECT_URI || `${reqUrl.origin}/auth/callback`;

  if (!env.DISCORD_CLIENT_SECRET || !env.NTL_SESSION_SECRET) {
    return new Response(
      'إعدادات OAuth غير مكتملة. أضف DISCORD_CLIENT_SECRET وNTL_SESSION_SECRET في Cloudflare Pages Settings > Variables and Secrets.',
      { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } }
    );
  }

  const ts = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  const statePayload = `${ts}.${nonce}`;
  const stateSig = await sign(statePayload, env.NTL_SESSION_SECRET);
  const state = `${statePayload}.${stateSig}`;

  const authorizeUrl = `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20guilds&state=${encodeURIComponent(state)}`;

  const secureAttr = isSecure ? 'Secure; ' : '';
  const headers = new Headers({
    Location: authorizeUrl,
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  headers.append('Set-Cookie', `ntl_oauth_state=${state}; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=900`);

  return new Response(null, { status: 302, headers });
}
