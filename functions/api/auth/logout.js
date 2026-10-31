const MAX_CHUNKS = 8;

export async function onRequest({ request }) {
  const isSecure = new URL(request.url).protocol === 'https:';
  const secureAttr = isSecure ? 'Secure; ' : '';
  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  });
  headers.append('Set-Cookie', `ntl_session=; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=0`);
  for (let i = 1; i <= MAX_CHUNKS; i++) {
    headers.append('Set-Cookie', `ntl_session_${i}=; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=0`);
  }
  return Response.json({ success: true }, { headers });
}
