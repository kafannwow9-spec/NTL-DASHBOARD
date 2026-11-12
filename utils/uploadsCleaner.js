// uploadsCleaner.js
// تنظيف دوري لمجلد uploads حتى لا يمتلئ القرص.
// القاعدة: لا يُحذف أي ملف مذكور داخل قاعدة البيانات (لوحات/إيمبد تستخدمه).
// الملفات غير المستخدمة تُحذف بعد maxAgeHours، وإذا تجاوز الحجم الكلي الحد
// تُحذف الأقدم أولاً (غير المستخدمة فقط).

const fs = require('fs');
const path = require('path');

function startUploadsCleaner({
    dir = path.join(process.cwd(), 'uploads'),
    maxAgeHours = 48,          // عمر الملف غير المستخدم قبل حذفه
    maxTotalMB = 300,          // الحد الأقصى لحجم المجلد
    intervalMinutes = 30,      // كل كم دقيقة يعمل التنظيف
    getReferenceText = async () => ''  // دالة ترجع نص قاعدة البيانات للبحث فيه
} = {}) {

    async function clean() {
        try {
            if (!fs.existsSync(dir)) return;

            const refText = await getReferenceText();
            const now = Date.now();
            const names = await fs.promises.readdir(dir);

            const files = [];
            for (const name of names) {
                const full = path.join(dir, name);
                try {
                    const st = await fs.promises.stat(full);
                    if (!st.isFile()) continue;
                    const id = name.replace(/\.[^.]+$/, '');
                    files.push({ name, full, size: st.size, mtime: st.mtimeMs, used: refText.includes(id) });
                } catch (_) {}
            }

            let deleted = 0, freed = 0;
            const remove = async (f) => {
                try {
                    await fs.promises.unlink(f.full);
                    deleted++; freed += f.size; f.gone = true;
                } catch (_) {}
            };

            // 1) حذف غير المستخدم والقديم
            const maxAgeMs = maxAgeHours * 3600 * 1000;
            for (const f of files) {
                if (!f.used && now - f.mtime > maxAgeMs) await remove(f);
            }

            // 2) إذا ما زال الحجم أكبر من الحد: احذف الأقدم من غير المستخدم
            let total = files.filter(f => !f.gone).reduce((s, f) => s + f.size, 0);
            const limit = maxTotalMB * 1024 * 1024;
            if (total > limit) {
                const candidates = files.filter(f => !f.gone && !f.used).sort((a, b) => a.mtime - b.mtime);
                for (const f of candidates) {
                    if (total <= limit) break;
                    await remove(f);
                    total -= f.size;
                }
            }

            if (deleted > 0) {
                console.log(`[UploadsCleaner] حُذف ${deleted} ملف، تم تحرير ${(freed / 1048576).toFixed(1)} MB`);
            }
        } catch (e) {
            console.error('[UploadsCleaner Error]:', e.message);
        }
    }

    clean();
    const timer = setInterval(clean, intervalMinutes * 60 * 1000);
    if (timer.unref) timer.unref();
    return { clean, stop: () => clearInterval(timer) };
}

module.exports = { startUploadsCleaner };
