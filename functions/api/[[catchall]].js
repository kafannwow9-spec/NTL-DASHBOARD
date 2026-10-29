export async function onRequest(context) {
  const { request, params } = context;
  
  // 1. Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Bot-Secret, X-Ntl-Secret",
      }
    });
  }

  // 2. Extract the actual path after /api/
  const pathArray = params.catchall || [];
  const pathString = pathArray.join('/');
  
  // 3. Construct the target backend URL exactly like the curl command
  const targetUrl = `http://fi12.bot-hosting.cloud:25405/api/${pathString}`;
  const url = new URL(request.url);
  const fetchUrl = targetUrl + url.search;

  // 4. Clone headers and remove Cloudflare/Browser specific headers that might cause issues
  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('origin');
  headers.delete('referer');

  // Inject authentication secrets for the bot backend API
  headers.set('X-Bot-Secret', '38dj38nr89oq');
  headers.set('X-NTL-Secret', '38dj38nr89oq');
  headers.set('Authorization', 'Bearer 38dj38nr89oq');

  const fetchOptions = {
    method: request.method,
    headers: headers,
    redirect: 'follow',
    signal: AbortSignal.timeout(12000)
  };

  // 5. Pass the body if it's a POST/PUT request
  if (!['GET', 'HEAD'].includes(request.method)) {
    fetchOptions.body = request.body;
  }

  // 6. Execute the fetch (server-side proxy)
  try {
    const response = await fetch(fetchUrl, fetchOptions);
    
    // 7. Return the response back to the dashboard with CORS headers
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, targetUrl: fetchUrl }), {
      status: 502,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Bot-Secret, X-Ntl-Secret"
      }
    });
  }
}
