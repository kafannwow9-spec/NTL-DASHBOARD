# إعداد Cloudflare Pages (النسخة الآمنة)
Settings > Variables and Secrets (Production):
| المتغير | القيمة |
|---|---|
| `DISCORD_CLIENT_ID` | معرف التطبيق (لم يعد له قيمة افتراضية) |
| `DISCORD_CLIENT_SECRET` | **جديد** (بعد Reset من Developer Portal) |
| `DISCORD_REDIRECT_URI` | `https://ntldashboard.pages.dev/auth/callback` |
| `NTL_SESSION_SECRET` | نص عشوائي 32 بايت+ |
| `NTL_BOT_SECRET` | نفس `BOT_SECRET` في .env للبوت (24+ حرف) |
| `BOT_API_URL` | (اختياري) `http://us-lax02.altare.global:25147` |

لا يوجد أي سر احتياطي داخل الكود: إذا نقص متغير يتوقف الـ API برسالة 503.
الجلسة 24 ساعة، Cookie HttpOnly فقط (لا localStorage). كل طلب POST يُرفض إن لم يأتِ من نفس موقع الداشبورد.
