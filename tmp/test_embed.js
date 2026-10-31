const axios = require("axios");

async function testEmbedPage(shortcode) {
  const userAgents = [
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "WhatsApp/2.21.12.21 A"
  ];

  for (const ua of userAgents) {
    try {
      console.log("Testing UA:", ua.slice(0, 30));
      const res = await axios.get(`https://www.instagram.com/p/${shortcode}/embed/captioned/`, {
        headers: { "User-Agent": ua },
        timeout: 6000
      });
      console.log("Embed status:", res.status, "HTML len:", res.data.length);

      const videoMatches = [
        ...res.data.matchAll(/video_url["']?\s*:\s*["']([^"']+)["']/g),
        ...res.data.matchAll(/<video[^>]+src=["']([^"']+)["']/g),
        ...res.data.matchAll(/["'](https:\/\/[^"']+\.mp4[^"']*)["']/g)
      ].map(m => m[1].replace(/\\u0026/g, "&").replace(/\\/g, ""));

      console.log("Video matches found:", videoMatches.length);
      if (videoMatches.length > 0) {
        console.log("Sample match:", videoMatches[0]);
      }
    } catch(e) {
      console.log("Embed err:", e.message);
    }
  }
}

testEmbedPage("DCx2T8Kx5vR");
