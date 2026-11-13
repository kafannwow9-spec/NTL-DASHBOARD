import { getSession, json } from '../../_lib/auth.js';
export async function onRequest({ request, env }) {
  const s = await getSession(request, env);
  return s ? json({ authenticated: true, user: s.user, adminGuilds: s.adminGuilds }) : json({ authenticated: false });
}
