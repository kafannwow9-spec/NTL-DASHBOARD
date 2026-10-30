export async function onRequest({ request, env }) {
  const clientId = env.DISCORD_CLIENT_ID || '1405179057628254259';
  const redirectUri = env.DISCORD_REDIRECT_URI || `${new URL(request.url).origin}/auth/callback`;
  if (!env.DISCORD_CLIENT_SECRET || !env.NTL_SESSION_SECRET) {
    return new Response('إعدادات OAuth غير مكتملة. أضف DISCORD_CLIENT_SECRET وNTL_SESSION_SECRET في Cloudflare Pages Settings > Variables and Secrets.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const state = crypto.randomUUID();
  const headers = new Headers({ Location: `https://discord.com/oauth2/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20guilds&state=${encodeURIComponent(state)}` });
  headers.append('Set-Cookie', `ntl_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`);
  return new Response(null, { status: 302, headers });
}
