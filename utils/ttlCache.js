// utils/ttlCache.js — Map عادية لكنها تنظّف نفسها:
//  - كل عنصر ينتهي بعد ttlMs من آخر استخدام (get/set تجدّد المدة)
//  - لا يزيد عدد العناصر عن max (يُحذف الأقدم أولاً)
// تعمل كبديل مباشر لـ new Map() (نفس get/set/has/delete/size/entries ...).
class TTLCache extends Map {
    constructor({ ttlMs = 30 * 60 * 1000, max = 500 } = {}) {
        super();
        this.ttlMs = ttlMs;
        this.max = max;
        this._stamp = new Map();
        const t = setInterval(() => this.sweep(), Math.min(ttlMs, 5 * 60 * 1000));
        if (t.unref) t.unref();
    }
    _expired(key) {
        const t = this._stamp.get(key);
        return t !== undefined && Date.now() - t > this.ttlMs;
    }
    get(key) {
        if (!super.has(key)) return undefined;
        if (this._expired(key)) { this.delete(key); return undefined; }
        this._stamp.set(key, Date.now());
        return super.get(key);
    }
    has(key) {
        if (!super.has(key)) return false;
        if (this._expired(key)) { this.delete(key); return false; }
        return true;
    }
    set(key, value) {
        if (super.has(key)) super.delete(key); // لنقله إلى آخر الترتيب
        super.set(key, value);
        this._stamp.set(key, Date.now());
        while (this.size > this.max) {
            const oldest = this.keys().next().value;
            this.delete(oldest);
        }
        return this;
    }
    delete(key) { this._stamp.delete(key); return super.delete(key); }
    clear() { this._stamp.clear(); return super.clear(); }
    sweep() {
        for (const key of [...super.keys()]) if (this._expired(key)) this.delete(key);
    }
}
module.exports = { TTLCache };
