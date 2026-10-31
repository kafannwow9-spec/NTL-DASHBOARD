const enc = new TextEncoder();
const dec = new TextDecoder();
const MAX_CHUNKS = 8;

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.get('Cookie') || '')
      .split(';')
      .map(v => v.trim())
      .filter(Boolean)
      .map(v => {
        const i = v.indexOf('=');
        return i === -1 ? [v, ''] : [v.slice(0, i), v.slice(i + 1)];
      })
  );
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (str.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function verify(value, sig, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  return crypto.subtle.verify('HMAC', key, fromBase64Url(sig), enc.encode(value));
}

function reassembleCookieToken(c) {
  if (!c.ntl_session) return '';
  let combined = c.ntl_session;
  for (let i = 1; i <= MAX_CHUNKS; i++) {
    const part = c[`ntl_session_${i}`];
    if (!part) break;
    combined += part;
  }
  return combined;
}

async function parseVerifiedToken(raw, secret) {
  if (!raw || !secret) return null;
  const dotIdx = raw.lastIndexOf('.');
  if (dotIdx < 1) return null;
  const payload = raw.slice(0, dotIdx);
  const sig = raw.slice(dotIdx + 1);
  if (!sig) return null;
  const valid = await verify(payload, sig, secret);
  if (!valid) return null;
  const data = JSON.parse(dec.decode(fromBase64Url(payload)));
  if (!data || typeof data.exp !== 'number' || data.exp < Date.now() / 1000) return null;

  if (data.u) {
    const user = {
      id: data.u.id,
      username: data.u.un,
      global_name: data.u.gn,
      avatar: data.u.av
    };
    const adminGuilds = Array.isArray(data.g)
      ? data.g.map(item =>
          Array.isArray(item)
            ? { id: item[0], name: item[1], icon: item[2] || null, owner: true, permissions: '40' }
            : item
        )
      : [];
    return { user, adminGuilds };
  }

  if (data.user) {
    return { user: data.user, adminGuilds: Array.isArray(data.adminGuilds) ? data.adminGuilds : [] };
  }

  return null;
}

export async function onRequest({ request, env }) {
  const noStoreHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
  };

  if (!env.NTL_SESSION_SECRET) {
    return Response.json({ authenticated: false }, { headers: noStoreHeaders });
  }

  const c = parseCookies(request);
  const candidates = [
    reassembleCookieToken(c),
    (request.headers.get('X-NTL-Session') || '').trim()
  ].filter(Boolean);

  for (const token of candidates) {
    try {
      const parsed = await parseVerifiedToken(token, env.NTL_SESSION_SECRET);
      if (parsed && parsed.user) {
        return Response.json(
          {
            authenticated: true,
            user: parsed.user,
            adminGuilds: parsed.adminGuilds
          },
          { headers: noStoreHeaders }
        );
      }
    } catch {
      // Try next candidate
    }
  }

  return Response.json({ authenticated: false }, { headers: noStoreHeaders });
}
