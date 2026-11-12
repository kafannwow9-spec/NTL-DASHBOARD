const enc = new TextEncoder();
const CHUNK_SIZE = 3200;
const MAX_CHUNKS = 8;
const SESSION_MAX_AGE = 604800; // 7 days

function toBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
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

async function sign(value, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return toBase64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(value))));
}

async function verifySignature(value, sig, secret) {
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    return await crypto.subtle.verify('HMAC', key, fromBase64Url(sig), enc.encode(value));
  } catch {
    return false;
  }
}

async function isValidOAuthState(state, cookieState, secret) {
  if (!state) return false;
  if (cookieState && state === cookieState) return true;
  const parts = state.split('.');
  if (parts.length !== 3) return false;
  const [tsStr, nonce, sig] = parts;
  const ts = Number(tsStr);
  if (!Number.isFinite(ts) || !nonce || !sig) return false;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - ts) > 900) return false;
  return await verifySignature(`${tsStr}.${nonce}`, sig, secret);
}

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

function isAdminOrManagerGuild(g) {
  if (!g) return false;
  if (g.owner === true) return true;
  try {
    const perms = BigInt(String(g.permissions ?? g.permissions_new ?? '0'));
    return (perms & 40n) !== 0n;
  } catch {
    return false;
  }
}

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const isSecure = url.protocol === 'https:';
  const secureAttr = isSecure ? 'Secure; ' : '';
  const c = parseCookies(request);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const oauthError = url.searchParams.get('error');
  const redirectUri = env.DISCORD_REDIRECT_URI || `${url.origin}/auth/callback`;
  const clearState = `ntl_oauth_state=; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=0`;

  if (oauthError) {
    const cancelHeaders = new Headers({
      Location: '/',
      'Cache-Control': 'no-store'
    });
    cancelHeaders.append('Set-Cookie', clearState);
    return new Response(null, { status: 302, headers: cancelHeaders });
  }

  if (!env.DISCORD_CLIENT_SECRET || !env.NTL_SESSION_SECRET) {
    return new Response('إعدادات تسجيل الدخول غير مكتملة على Cloudflare.', {
      status: 503,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'Set-Cookie': clearState
      }
    });
  }

  const stateOk = await isValidOAuthState(state, c.ntl_oauth_state, env.NTL_SESSION_SECRET);
  if (!code || !stateOk) {
    return new Response('فشل التحقق من طلب تسجيل الدخول. أعد المحاولة من الموقع.', {
      status: 400,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'Set-Cookie': clearState
      }
    });
  }

  try {
    const uaHeaders = {
      'User-Agent': 'NTL-Dashboard (https://ntldashboard.pages.dev, 1.0)',
      'Accept': 'application/json'
    };

    const tokenRes = await fetch('https://discord.com/api/v10/oauth2/token', {
      method: 'POST',
      headers: {
        ...uaHeaders,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        client_id: env.DISCORD_CLIENT_ID || '1405179057628254259',
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      })
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text().catch(() => '');
      throw new Error(`Discord token exchange failed (${tokenRes.status}): ${errText.slice(0, 120)}`);
    }

    const token = await tokenRes.json();
    const authHeaders = {
      ...uaHeaders,
      Authorization: `Bearer ${token.access_token}`
    };

    const [uRes, gRes] = await Promise.all([
      fetch('https://discord.com/api/v10/users/@me', { headers: authHeaders }),
      fetch('https://discord.com/api/v10/users/@me/guilds', { headers: authHeaders })
    ]);

    if (!uRes.ok || !gRes.ok) {
      throw new Error('Discord profile or guild permissions could not be verified');
    }

    const user = await uRes.json();
    const guilds = await gRes.json();
    const adminGuilds = Array.isArray(guilds) ? guilds.filter(isAdminOrManagerGuild) : [];

    // Compact UTF-8 session structure to stay well below browser 4KB per-cookie limits
    const compactSession = {
      u: {
        id: String(user.id),
        un: user.username || 'User',
        gn: user.global_name || null,
        av: user.avatar || null
      },
      g: adminGuilds.map(g => [
        String(g.id),
        String(g.name || 'Server').slice(0, 80),
        g.icon || ''
      ]),
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE
    };

    const payload = toBase64Url(enc.encode(JSON.stringify(compactSession)));
    const signature = await sign(payload, env.NTL_SESSION_SECRET);
    const signedToken = `${payload}.${signature}`;

    const chunks = [];
    for (let i = 0; i < signedToken.length; i += CHUNK_SIZE) {
      chunks.push(signedToken.slice(i, i + CHUNK_SIZE));
    }

    const outHeaders = new Headers({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private'
    });

    chunks.forEach((chunk, index) => {
      const cookieName = index === 0 ? 'ntl_session' : `ntl_session_${index}`;
      outHeaders.append(
        'Set-Cookie',
        `${cookieName}=${chunk}; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE}`
      );
    });

    for (let i = chunks.length; i <= MAX_CHUNKS; i++) {
      const staleName = i === 0 ? 'ntl_session' : `ntl_session_${i}`;
      if (c[staleName] !== undefined) {
        outHeaders.append(
          'Set-Cookie',
          `${staleName}=; HttpOnly; ${secureAttr}SameSite=Lax; Path=/; Max-Age=0`
        );
      }
    }

    outHeaders.append('Set-Cookie', clearState);

    // Return a 200 first-party HTML document so mobile/desktop browsers reliably commit
    // cookies after Discord's cross-site POST redirect before navigating to '/'.
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="1;url=/">
  <title>جاري تسجيل الدخول... | NTL Dashboard</title>
  <style>
    body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#05060a; color:#f8fafc; font-family:system-ui,-apple-system,sans-serif; }
    .card { text-align:center; padding:28px; }
    .spin { width:38px; height:38px; border:3px solid rgba(99,102,241,0.25); border-top-color:#6366f1; border-radius:50%; animation:s 0.7s linear infinite; margin:0 auto 14px; }
    @keyframes s { to { transform:rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div class="spin"></div>
    <p style="font-size:14px;color:#cbd5e1;margin:0">تم تسجيل الدخول بنجاح، جاري فتح لوحة التحكم...</p>
  </div>
  <script>
    (function() {
      var signed = ${JSON.stringify(signedToken)};
      try { sessionStorage.setItem('ntl_signed_session', signed); } catch (e) {}
      try { localStorage.setItem('ntl_signed_session', signed); } catch (e) {}
      if (window.opener && !window.opener.closed) {
        try {
          window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', sessionToken: signed }, '*');
          window.close();
          return;
        } catch (e) {}
      }
      window.location.replace('/');
    })();
  </script>
</body>
</html>`;

    return new Response(html, { status: 200, headers: outHeaders });
  } catch (e) {
    return new Response(`تعذر تسجيل الدخول عبر Discord: ${e.message}`, {
      status: 401,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'Set-Cookie': clearState
      }
    });
  }
}
