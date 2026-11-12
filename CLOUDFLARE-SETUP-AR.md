# إعداد إصلاح NTL Dashboard على Cloudflare Pages

## 1) متغيرات البيئة المطلوبة
من Cloudflare Dashboard افتح Pages > مشروع ntldashboard > Settings > Variables and Secrets وأضف:

- `DISCORD_CLIENT_ID`: `1405179057628254259` (أو Client ID الصحيح لتطبيق البوت).
- `DISCORD_CLIENT_SECRET`: Client Secret من Discord Developer Portal (Secret، وليس Public Key).
- `DISCORD_REDIRECT_URI`: `https://ntldashboard.pages.dev/auth/callback`
- `NTL_SESSION_SECRET`: سلسلة عشوائية قوية طويلة (32 بايت على الأقل).
- `NTL_BOT_SECRET`: السر الجديد الذي تضبطه أيضًا على خادم البوت الخارجي كـ `BOT_SECRET`.

أضف المتغيرات في Production، وأضفها في Preview فقط إذا كنت تختبر Preview. لا تضع أي Secret داخل ملفات HTML أو JavaScript.

## 2) إعداد Discord OAuth2
في Discord Developer Portal > OAuth2 > Redirects أضف حرفيًا:
`https://ntldashboard.pages.dev/auth/callback`

## 3) تدوير السر المكشوف سابقًا
كان سر API القديم موجودًا داخل ملفات JavaScript عامة. اعتبره مكشوفًا: غيّره إلى قيمة جديدة في خادم البوت، ثم ضع القيمة الجديدة نفسها في Cloudflare كـ `NTL_BOT_SECRET`. لا تعِد استخدام السر القديم.

## 4) النشر
ارفع محتويات هذا المشروع إلى GitHub ثم انتظر نشر Cloudflare Pages. مجلد `functions/` يجب أن يبقى في جذر المستودع كي تعمل وظائف OAuth والجلسات.

## ما الذي تغيّر؟
- إزالة قائمة السيرفرات التجريبية بالكامل.
- OAuth Authorization Code يتم على الخادم، ولا يُحفظ Discord access token في localStorage.
- جلسة موقعة داخل Cookie آمنة HttpOnly.
- السيرفرات المعروضة هي فقط تقاطع سيرفرات البوت مع السيرفرات التي لدى المستخدم فيها صلاحية Owner أو Administrator أو Manage Server.
- تسجيل الخروج ينهي Cookie الجلسة.
- إزالة سر API من الواجهة الأمامية ونقله إلى Secret في Cloudflare.

ملاحظة: وظائف Cloudflare الجديدة تحتاج هذه المتغيرات قبل أن يعمل تسجيل الدخول. لا يمكن إتمام OAuth دون Client Secret وRedirect URI مطابقين في Discord.
