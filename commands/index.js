// commands/index.js — يحمّل كل ملفات الأوامر تلقائياً.
// لإضافة أمر جديد: أنشئ ملفاً هنا يصدّر { names: ['اسم_الأمر'], execute(interaction, ctx) }
const fs = require('fs');
const path = require('path');

const commands = new Map();
for (const file of fs.readdirSync(__dirname)) {
    if (file === 'index.js' || !file.endsWith('.js')) continue;
    try {
        const mod = require(path.join(__dirname, file));
        for (const name of mod.names) commands.set(name, mod);
    } catch (err) {
        // خطأ في ملف واحد لا يوقف باقي البوت
        console.error(`[Commands] فشل تحميل ${file}:`, err.message);
    }
}
module.exports = commands;
