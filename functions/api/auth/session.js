const enc = new TextEncoder();
function b64url(bytes) { let s=''; for (const b of bytes) s+=String.fromCharCode(b); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function cookies(request) { return Object.fromEntries((request.headers.get('Cookie')||'').split(';').map(v=>v.trim()).filter(Boolean).map(v=>{const i=v.indexOf('=');return [v.slice(0,i),v.slice(i+1)]})); }
async function verify(value, sig, secret) { const key=await crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['verify']); const bytes=Uint8Array.from(atob(sig.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0)); return crypto.subtle.verify('HMAC',key,bytes,enc.encode(value)); }
export async function onRequest({request,env}) {
 const raw=cookies(request).ntl_session||'', i=raw.lastIndexOf('.');
 if(i<1 || !env.NTL_SESSION_SECRET) return Response.json({authenticated:false},{headers:{'Cache-Control':'no-store'}});
 const payload=raw.slice(0,i), sig=raw.slice(i+1);
 try { if(!await verify(payload,sig,env.NTL_SESSION_SECRET)) throw 0; const data=JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-payload.length%4)%4))); if(data.exp<Date.now()/1000) throw 0; return Response.json({authenticated:true,user:data.user,adminGuilds:data.adminGuilds},{headers:{'Cache-Control':'no-store'}}); } catch { return Response.json({authenticated:false},{headers:{'Cache-Control':'no-store'}}); }
}
