/* NTL Dashboard — الأنظمة الجديدة: تقييم التذاكر + تقييمات الخدمة + البلاغات + إصلاح تحميل البانلات */
(function () {
  const $ = (id) => document.getElementById(id);
  const E = (s) => escapeHtml(s == null ? '' : String(s));
  const fmt = (t) => t ? new Date(t).toLocaleString('ar', { dateStyle: 'medium', timeStyle: 'short' }) : '-';
  const gid = () => (typeof selectedGuild !== 'undefined' && selectedGuild && selectedGuild.id) || null;
  const data = () => window.ntlGuildData || { channels: [], categories: [], roles: [], members: [] };

  /* ---------- البانلات القديمة (من أوامر ديسكورد) → صيغة الداشبورد ---------- */
  window.ntlNormalizePanels = function (raw) {
    const out = {};
    Object.keys(raw || {}).forEach((id) => {
      const p = raw[id]; if (!p || typeof p !== 'object') return;
      p.id = id;
      p.title = p.title || p.name || id;
      p.description = p.description != null ? p.description : (p.desc || '');
      p.desc = p.description;
      p.categoryId = p.categoryId || p.category || '';
      p.category = p.categoryId;
      p.displayType = p.displayType || 'buttons';
      p.roles = Array.isArray(p.roles) ? p.roles : [];
      p.buttons = (Array.isArray(p.buttons) ? p.buttons : []).map((b) => Object.assign({}, b, {
        name: b.name || b.label || 'تذكرة', categoryId: b.categoryId || b.category || '', category: b.categoryId || b.category || ''
      }));
      out[id] = p;
    });
    return out;
  };
  window.ntlPanelsForSave = function () { return currentPanels; };

  /* ---------- أدوات واجهة ---------- */
  const chanOpts = (sel) => '<option value="">— اختر روم —</option>' + data().channels.map((c) => `<option value="${E(c.id)}" ${c.id === sel ? 'selected' : ''}># ${E(c.name)}</option>`).join('');
  const catOpts = (sel) => '<option value="">— بدون —</option>' + data().categories.map((c) => `<option value="${E(c.id)}" ${c.id === sel ? 'selected' : ''}>${E(c.name)}</option>`).join('');
  const who = (id, name) => { if (name) return E(name); const m = (data().members || []).find((x) => x.id === id); return m ? E(m.displayName) : `<span class="font-mono text-[10px] opacity-70">${E(id)}</span>`; };
  const card = (inner, cls = '') => `<div class="ntl-card ${cls}">${inner}</div>`;
  const stat = (label, val, color = 'text-white') => `<div class="ntl-stat"><span class="ntl-stat-label">${label}</span><b class="${color}">${val}</b></div>`;
  const empty = (t) => `<div class="ntl-empty"><i data-lucide="inbox" class="w-8 h-8"></i><p>${t}</p></div>`;
  const loading = (el) => { el.innerHTML = '<div class="ntl-skeleton"></div><div class="ntl-skeleton"></div><div class="ntl-skeleton short"></div>'; };
  const btn = (cls, label, onclick, icon) => `<button type="button" onclick="${onclick}" class="ntl-btn ${cls}">${icon ? `<i data-lucide="${icon}" class="w-4 h-4"></i>` : ''}<span>${label}</span></button>`;

  async function call(path, body) {
    const id = gid(); if (!id) { showToast('اختر سيرفراً أولاً', 'error'); return null; }
    try {
      const res = await apiFetch(`/api/${path}/${id}`, body ? { method: 'POST', body: JSON.stringify(body) } : {});
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j.success === false) { showToast(j.error || 'تعذر تنفيذ الطلب', 'error'); return null; }
      return j;
    } catch (e) { showToast('تعذر الاتصال بالسيرفر', 'error'); return null; }
  }
  const done = () => { if (window.lucide) lucide.createIcons(); };

  /* ================= تقييم التذاكر ================= */
  async function loadRatings() {
    const root = $('ratings-root'); if (!root) return; loading(root);
    const j = await call('ticket-ratings'); if (!j) { root.innerHTML = empty('تعذر تحميل البيانات'); return done(); }
    const rows = j.panels.length ? j.panels.map((p) => `
      <div class="ntl-row" data-panel="${E(p.id)}">
        <div class="flex-1 min-w-0"><b class="block truncate">${E(p.title)}</b><span class="text-[10px] opacity-50 font-mono">${E(p.id)}</span></div>
        <select class="ntl-input rt-chan" style="max-width:220px">${chanOpts(p.reviewChannelId)}</select>
        <label class="ntl-switch"><input type="checkbox" class="rt-on" ${p.reviewsEnabled ? 'checked' : ''}><i></i><span>مفعّل</span></label>
        ${btn('primary', 'حفظ', `ntlRatingSave('${E(p.id)}', this)`, 'save')}
      </div>`).join('') : empty('لا توجد بانلات تذاكر. أنشئ بانل من تبويب التذاكر أولاً.');
    const list = j.ratings.length ? j.ratings.map((r) => `
      <div class="ntl-row">
        <div class="ntl-badge ${r.rating >= 7 ? 'ok' : r.rating <= 4 ? 'bad' : 'mid'}">${r.rating}/10</div>
        <div class="flex-1 min-w-0"><div class="text-xs">${who(r.userId)} ${r.claimerId ? '← المستلم: ' + who(r.claimerId) : ''}</div><p class="text-xs opacity-70 break-words">${E(r.reason)}</p></div>
        <span class="text-[10px] opacity-50 whitespace-nowrap">${fmt(r.createdAt)}</span>
        <button class="ntl-icon-btn" title="حذف" onclick="ntlRatingDelete('${E(r.id)}')"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>`).join('') : empty('لا توجد تقييمات بعد. تظهر هنا بعد أن يقيّم الأعضاء تذاكرهم.');
    root.innerHTML = `
      <div class="ntl-stats">${stat('إجمالي التقييمات', j.stats.total)}${stat('المتوسط', j.stats.avg + ' / 10', 'text-amber-300')}${stat('إيجابي (7+)', j.stats.positive, 'text-emerald-300')}${stat('سلبي (4-)', j.stats.negative, 'text-rose-300')}</div>
      ${card(`<h3 class="ntl-h"><i data-lucide="settings-2" class="w-4 h-4"></i> إعدادات التقييم لكل بانل</h3><p class="ntl-sub">عند إغلاق التذكرة يُطلب من العضو تقييمها، ويُرسل التقييم إلى الروم المحدد.</p>${rows}`)}
      ${card(`<div class="flex items-center justify-between"><h3 class="ntl-h"><i data-lucide="star" class="w-4 h-4"></i> آخر التقييمات</h3>${j.ratings.length ? btn('danger', 'مسح الكل', 'ntlRatingClear()', 'trash') : ''}</div>${list}`)}`;
    done();
  }
  window.ntlRatingSave = async function (panelId, el) {
    const row = el.closest('.ntl-row');
    const r = await call('ticket-ratings', { action: 'save-panel', panelId, reviewChannelId: row.querySelector('.rt-chan').value, reviewsEnabled: row.querySelector('.rt-on').checked });
    if (r) { showToast('تم حفظ إعدادات التقييم', 'success'); loadRatings(); }
  };
  window.ntlRatingDelete = async function (id) { if (await call('ticket-ratings', { action: 'delete-rating', ratingId: id })) loadRatings(); };
  window.ntlRatingClear = async function () { if (confirm('مسح كل تقييمات التذاكر؟')) { if (await call('ticket-ratings', { action: 'clear-ratings' })) loadRatings(); } };

  /* ================= تقييمات الخدمة (Reviews) ================= */
  const PERIODS = [['once', 'مرة واحدة فقط'], ['hour', 'كل ساعة'], ['day', 'كل يوم'], ['week', 'كل أسبوع'], ['month', 'كل شهر']];
  async function loadReviews() {
    const root = $('reviews-root'); if (!root) return; loading(root);
    const j = await call('reviews'); if (!j) { root.innerHTML = empty('تعذر تحميل البيانات'); return done(); }
    const t = j.stats.total || 1;
    const bars = j.stats.dist.map((n, i) => `<div class="ntl-bar"><span>${i + 1}★</span><div><i style="width:${(n / t * 100).toFixed(0)}%"></i></div><em>${n}</em></div>`).join('');
    const list = j.entries.length ? j.entries.map((e) => `
      <div class="ntl-row">
        <div class="ntl-badge ${e.stars > 2 ? 'ok' : 'bad'}">${e.stars}★</div>
        <div class="flex-1 min-w-0"><div class="text-xs font-bold">${E(e.username || e.userId)}</div><p class="text-xs opacity-70 break-words">${E(e.reason)}</p></div>
        <span class="text-[10px] opacity-50 whitespace-nowrap">${fmt(e.createdAt)}</span>
        <button class="ntl-icon-btn" title="حذف" onclick="ntlReviewDelete('${E(e.id)}')"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>`).join('') : empty('لا توجد تقييمات بعد.');
    root.innerHTML = `
      <div class="ntl-stats">${stat('إجمالي التقييمات', j.stats.total)}${stat('المتوسط', j.stats.avg + ' ★', 'text-amber-300')}${stat('راضون', j.stats.satisfied, 'text-emerald-300')}${stat('غير راضين', j.stats.dissatisfied, 'text-rose-300')}</div>
      <div class="grid lg:grid-cols-2 gap-4">
        ${card(`<h3 class="ntl-h"><i data-lucide="settings-2" class="w-4 h-4"></i> إعدادات لوحة التقييم</h3>
          <label class="ntl-label">روم اللوحة</label><select id="rv-chan" class="ntl-input">${chanOpts(j.config.channelId)}</select>
          <label class="ntl-label">إعادة التقييم</label><select id="rv-period" class="ntl-input">${PERIODS.map(([v, l]) => `<option value="${v}" ${v === j.config.allowRepeat ? 'selected' : ''}>${l}</option>`).join('')}</select>
          <div class="flex flex-wrap gap-2 mt-4">${btn('primary', 'حفظ', "ntlReviewAct('save')", 'save')}${btn('success', j.config.messageId ? 'إعادة نشر اللوحة' : 'نشر اللوحة', "ntlReviewAct('publish')", 'send')}${btn('ghost', 'تحديث اللوحة', "ntlReviewAct('refresh')", 'refresh-cw')}${btn('danger', 'تصفير التقييمات', "ntlReviewReset()", 'trash')}</div>`)}
        ${card(`<h3 class="ntl-h"><i data-lucide="bar-chart-3" class="w-4 h-4"></i> توزيع النجوم</h3>${bars}`)}
      </div>
      ${card(`<h3 class="ntl-h"><i data-lucide="message-square-heart" class="w-4 h-4"></i> آخر التقييمات</h3>${list}`)}`;
    done();
  }
  window.ntlReviewAct = async function (action) {
    const body = { action, channelId: $('rv-chan').value || undefined, allowRepeat: $('rv-period').value };
    if (await call('reviews', body)) { showToast(action === 'publish' ? 'تم نشر اللوحة' : 'تم', 'success'); loadReviews(); }
  };
  window.ntlReviewDelete = async function (id) { if (await call('reviews', { action: 'delete-entry', entryId: id })) loadReviews(); };
  window.ntlReviewReset = async function () { if (confirm('حذف كل التقييمات؟ لا يمكن التراجع.')) { if (await call('reviews', { action: 'reset' })) loadReviews(); } };

  /* ================= البلاغات (Reports) ================= */
  const TYPES = { religion: 'سياسة ودين', insult: 'سب وشتم', racism: 'عنصرية' };
  const ST = { pending: ['قيد المراجعة', 'mid'], accepted: ['مقبول', 'ok'], rejected: ['مرفوض', 'bad'] };
  async function loadReports() {
    const root = $('reports-root'); if (!root) return; loading(root);
    const j = await call('reports'); if (!j) { root.innerHTML = empty('تعذر تحميل البيانات'); return done(); }
    const c = j.config;
    const roles = data().roles.map((r) => `<label class="ntl-chip"><input type="checkbox" class="rp-role" value="${E(r.id)}" ${c.roles.includes(r.id) ? 'checked' : ''}><span>${E(r.name)}</span></label>`).join('') || '<p class="ntl-sub">لا توجد رتب.</p>';
    const list = j.reports.length ? j.reports.map((r) => `
      <div class="ntl-row">
        <div class="ntl-badge ${ST[r.status] ? ST[r.status][1] : 'mid'}">${ST[r.status] ? ST[r.status][0] : E(r.status)}</div>
        <div class="flex-1 min-w-0">
          <div class="text-xs"><b>${TYPES[r.type] || E(r.type)}</b> — من ${who(r.reporterId)} ضد ${r.targetIds.map((x) => who(x)).join('، ')}</div>
          <p class="text-xs opacity-70 break-words">${E(r.reason)}</p>
          ${r.punishment ? `<p class="text-[11px] text-emerald-300">العقوبة: ${E(r.punishment)}</p>` : ''}
          ${r.evidenceCount ? `<span class="text-[10px] opacity-50">${r.evidenceCount} دليل</span>` : ''}
        </div>
        <span class="text-[10px] opacity-50 whitespace-nowrap">${fmt(r.createdAt)}</span>
        <button class="ntl-icon-btn" title="حذف" onclick="ntlReportDelete('${E(r.id)}')"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>`).join('') : empty('لا توجد بلاغات.');
    root.innerHTML = `
      <div class="ntl-stats">${stat('الإجمالي', j.stats.total)}${stat('قيد المراجعة', j.stats.pending, 'text-amber-300')}${stat('مقبولة', j.stats.accepted, 'text-emerald-300')}${stat('مرفوضة', j.stats.rejected, 'text-rose-300')}</div>
      ${card(`<div class="flex items-center justify-between flex-wrap gap-2"><h3 class="ntl-h"><i data-lucide="siren" class="w-4 h-4"></i> إعدادات النظام <span class="ntl-badge ${c.enabled ? 'ok' : 'bad'}">${c.enabled ? 'مفعّل' : 'معطّل'}</span></h3>
        <div class="flex gap-2">${c.enabled ? btn('danger', 'تعطيل وحذف اللوحة', "ntlReportAct('disable')", 'power') : btn('success', 'تفعيل', "ntlReportAct('enable')", 'power')}</div></div>
        <div class="grid md:grid-cols-3 gap-3 mt-3">
          <div><label class="ntl-label">روم لوحة البلاغات</label><select id="rp-panel" class="ntl-input">${chanOpts(c.panelChannelId)}</select></div>
          <div><label class="ntl-label">روم استلام البلاغات</label><select id="rp-chan" class="ntl-input">${chanOpts(c.reportsChannelId)}</select></div>
          <div><label class="ntl-label">كاتاجوري قنوات النقاش</label><select id="rp-cat" class="ntl-input">${catOpts(c.ticketsCategoryId)}</select></div>
        </div>
        <label class="ntl-switch mt-3"><input type="checkbox" id="rp-ar" ${c.acceptReject ? 'checked' : ''}><i></i><span>نظام القبول والرفض (أزرار accept / reject)</span></label>
        <label class="ntl-label mt-3">رتب الإدارة (تُمنشن وتملك صلاحية القبول والرفض)</label><div class="ntl-chips">${roles}</div>
        <div class="flex flex-wrap gap-2 mt-4">${btn('primary', 'حفظ', "ntlReportAct('save')", 'save')}${btn('success', c.published ? 'إعادة نشر اللوحة' : 'تفعيل ونشر اللوحة', "ntlReportAct('publish')", 'send')}</div>`)}
      ${card(`<div class="flex items-center justify-between"><h3 class="ntl-h"><i data-lucide="list" class="w-4 h-4"></i> البلاغات</h3>${j.reports.length ? btn('danger', 'مسح الكل', 'ntlReportClear()', 'trash') : ''}</div>${list}`)}`;
    done();
  }
  window.ntlReportAct = async function (action) {
    const body = { action };
    if ($('rp-panel')) Object.assign(body, {
      panelChannelId: $('rp-panel').value, reportsChannelId: $('rp-chan').value, ticketsCategoryId: $('rp-cat').value,
      acceptReject: $('rp-ar').checked, roles: [...document.querySelectorAll('.rp-role:checked')].map((x) => x.value)
    });
    if (await call('reports', body)) { showToast('تم', 'success'); loadReports(); }
  };
  window.ntlReportDelete = async function (id) { if (await call('reports', { action: 'delete-report', reportId: id })) loadReports(); };
  window.ntlReportClear = async function () { if (confirm('حذف كل البلاغات؟')) { if (await call('reports', { action: 'clear-reports' })) loadReports(); } };

  /* ---------- ربط التبويبات ---------- */
  const loaders = { Ratings: loadRatings, Reviews: loadReviews, Reports: loadReports };
  let current = null;
  window.ntlOnTab = function (tab) { current = tab; if (loaders[tab] && window.guildDataLoaded) loaders[tab](); };
  window.ntlAfterGuildLoad = function () { if (loaders[current]) loaders[current](); };
})();
