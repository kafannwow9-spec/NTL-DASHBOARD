const { askAI, SYSTEM_PROMPT_RULES } = require('./gemini.js');
const cloudscraper = require('cloudscraper');
const crypto = require('crypto');

const SERVER_ROOMS = {
    ticket: "1508607137289601146",
    key: "1521436136420020275",
    script: "1508606207068209223"
};

function extractCleanUrl(text) {
    if (!text || typeof text !== 'string') return null;
    const match = text.match(/https?:\/\/[^\s<>"`'()\[\]]+/i);
    if (!match) return null;
    let url = match[0].trim();
    url = url.replace(/[.,;:!?،)\]}>"']+$/, '');
    return url;
}

function cleanRoboticJunk(text) {
    if (!text) return "";
    let t = text;
    t = t.replace(/<think>[\s\S]*?<\/think>/gi, "");
    t = t.replace(/^(?:We cannot call tools|Thinking Process|The user wants|Let's think|The user asked|Instruction:)[\s\S]*?(?:Let's deliver\.?|Let's respond\.?|\n\n)/i, "");
    const arabicMatch = t.match(/[\u0600-\u06FF]/);
    if (arabicMatch && arabicMatch.index > 25) {
        const englishPrefix = t.slice(0, arabicMatch.index);
        if (/tools|concise|assistant|respond|deliver|instruction|sentences|user asked|cannot call/i.test(englishPrefix)) {
            t = t.slice(arabicMatch.index);
        }
    }
    t = t.replace(/أنا هنا لمساعدة? في مواضيع مفيدة[\s\S]*?(اقتراحات ممكنة:[\s\S]*?)?(\n\n|$)/gi, "");
    t = t.replace(/أنا هنا للمساعدة في مواضيع مفيدة[\s\S]*?(اقتراحات ممكنة:[\s\S]*?)?(\n\n|$)/gi, "");
    t = t.replace(/أنا مساعد ذكاء اصطناعي[\s\S]*?(\n\n|$)/gi, "");
    t = t.replace(/بكل بساطة: أنا هنا لمساعدة[\s\S]*?(\n\n|$)/gi, "");
    t = t.replace(/\[\d+\]/g, "");
    return t.trim();
}

const STATIC_READ_WRITE_TOKEN = "92f2999c-c6cb-4101-9a14-acda2032c9aa";
const STATIC_LAST_BACKEND_UUID = "93e74a8b-411d-4ac5-a87f-f0bafe09864c";

function singlePerplexityRequest(query) {
    return new Promise((resolve, reject) => {
        const frontendUuid = crypto.randomUUID ? crypto.randomUUID() : require('crypto').randomUUID();
        
        const payload = {
            params: {
                last_backend_uuid: STATIC_LAST_BACKEND_UUID,
                read_write_token: STATIC_READ_WRITE_TOKEN,
                attachments: [],
                language: "ar-SA",
                timezone: "Asia/Beirut",
                search_focus: "internet",
                sources: ["web"],
                frontend_uuid: frontendUuid,
                mode: "copilot",
                model_preference: "turbo",
                is_related_query: false,
                is_sponsored: false,
                prompt_source: "user",
                query_source: "followup",
                is_incognito: false,
                local_search_enabled: false,
                use_schematized_api: true,
                send_back_text_in_streaming_api: true,
                version: "2.18"
            },
            query_str: query
        };

        const cookieStr = `pplx.visitor-id=35633aff-8c8e-4049-a4c7-b007292ffab3; pplx.session-id=d13d5429-692d-44cc-9d0e-f42e96abd4f6;`;

        cloudscraper.post({
            uri: "https://www.perplexity.ai/rest/sse/perplexity_ask",
            headers: {
                "Accept": "application/json, text/event-stream",
                "Accept-Language": "ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7",
                "Content-Type": "application/json",
                "Cookie": cookieStr,
                "Origin": "https://www.perplexity.ai",
                "Referer": "https://www.perplexity.ai/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
            },
            json: payload,
            timeout: 20000
        }, (error, response, body) => {
            if (error) return reject(error);
            if (response && response.statusCode >= 400) return reject(new Error(`HTTP ${response.statusCode}`));

            try {
                let textBody = typeof body === 'string' ? body : JSON.stringify(body);
                let lastAnswer = null;
                const lines = textBody.split("\n");

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith("data: ")) {
                        const jsonStr = trimmed.slice(6);
                        try {
                            const parsed = JSON.parse(jsonStr);
                            const blocks = parsed.blocks || [];
                            if (blocks.length > 0) {
                                let ans = blocks[0].answer;
                                if (!ans && blocks[0].markdown_block) {
                                    const chunks = blocks[0].markdown_block.chunks || [];
                                    ans = chunks.join("");
                                }
                                if (ans) lastAnswer = ans;
                            }
                        } catch (e) {}
                    }
                }

                if (lastAnswer) {
                    resolve(lastAnswer);
                } else {
                    resolve(textBody);
                }
            } catch (err) {
                reject(err);
            }
        });
    });
}

/**
 * Main AI Query entrypoint using OpenRouter as primary with strict system rules
 */
async function askPerplexity(query) {
    if (!query || typeof query !== 'string' || !query.trim()) {
        return "أهلاً بك يا غالي! كيف أقدر أساعدك؟";
    }

    // 1. Primary Engine: OpenRouter with system rules
    try {
        const aiResponse = await askAI(query);
        if (aiResponse && aiResponse.trim().length > 0) {
            return aiResponse.trim();
        }
    } catch (err) {}

    // 2. Fallback: Perplexity Search
    try {
        const pplxAns = await singlePerplexityRequest(`أنت مساعد ذكي وودود، أجب باختصار في سطرين بأسلوب عربي طبيعي وسلس وبدون أي كلام روبوتي: ${query}`);
        if (pplxAns && pplxAns.trim().length > 0) {
            const cleaned = cleanRoboticJunk(pplxAns);
            if (cleaned.length > 3) return cleaned;
        }
    } catch (err2) {}

    return "أهلاً يا غالي! تفضل كيف أقدر أساعدك اليوم؟";
}

module.exports = {
    askPerplexity,
    extractCleanUrl,
    cleanRoboticJunk,
    SERVER_ROOMS,
    SYSTEM_PROMPT_RULES
};
