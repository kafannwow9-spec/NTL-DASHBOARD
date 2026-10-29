const express = require('express');
const { fetchKey } = require('./plato.js');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>تخطي روابط PlatoBoost</h2>
        <form action="/bypass" method="POST">
            <input type="text" name="url" style="width: 400px;" placeholder="ألصق رابط البلاطو هنا..." required />
            <button type="submit">إرسال</button>
        </form>
    `);
});

app.post('/bypass', async (req, res) => {
    const targetUrl = req.body.url;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.write('<h3>[*] جاري محاولة الفحص...</h3>');
    
    try {
        const result = await fetchKey(targetUrl);
        if (result && result.key) {
            res.write(`<h3 style="color: green;">[+] تم بنجاح! المفتاح هو:</h3>`);
            res.write(`<textarea style="width:300px;height:50px;">${result.key}</textarea>`);
        } else {
            res.write('<p>[-] لم يتم العثور على المفتاح تلقائياً.</p>');
        }
    } catch (e) {
        // إذا ظهر خطأ التحقق البشري، نعرض للمستخدم الرابط الأصلي ليفتحه يدوياً ويتخطى التحقق مرة واحدة
        res.write(`<p style="color: red;">[-] النظام يطلب تحققاً بشرياً (Google/Discord).</p>`);
        res.write(`<p>يرجى فتح هذا الرابط في متصفح هاتفك، إتمام التحقق، ثم إعادة المحاولة:</p>`);
        res.write(`<a href="${targetUrl}" target="_blank">اضغط هنا لفتح رابط التحقق يدويّاً</a>`);
    }
    res.end();
});

app.listen(PORT, () => {
    console.log(`[+] السيرفر يعمل على http://localhost:${PORT}`);
});

