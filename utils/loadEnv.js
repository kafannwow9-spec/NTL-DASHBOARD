// utils/loadEnv.js — يقرأ ملف .env (بدون الحاجة لمكتبة dotenv).
// القيم الموجودة مسبقاً في process.env لا تُستبدل.
const fs = require('fs');
const path = require('path');

(function loadEnv() {
    const file = path.join(__dirname, '..', '.env');
    if (!fs.existsSync(file)) return;
    for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith('#')) continue;
        const i = line.indexOf('=');
        if (i < 1) continue;
        const key = line.slice(0, i).trim();
        let val = line.slice(i + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
        if (process.env[key] === undefined) process.env[key] = val;
    }
})();
