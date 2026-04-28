// patch_i18n_infra.js
// 1. Add LANG const + switchLang() + CSS + toggle button in main-tabs
// 2. Add _e(zh,en) helper
// 3. Patch static HTML section titles / buttons via JS init
const fs = require('fs');
const FILE = 'index.html';
let raw = fs.readFileSync(FILE, 'utf8');
const hasCRLF = raw.includes('\r\n');
let h = hasCRLF ? raw.replace(/\r\n/g, '\n') : raw;

// ── 1. ADD LANG CSS (after .vtm-controls .vtm-close rule) ────────────────────
const LANG_CSS = `
        /* 🌐 Language toggle */
        #lang-toggle {
            position: fixed; top: 14px; right: 100px; z-index: 3000;
            background: rgba(255,255,255,0.92); border: 1.5px solid #a1887f;
            color: #5d4037; padding: 5px 13px; border-radius: 16px;
            font-size: 12px; font-weight: 800; cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
            transition: background 0.15s, transform 0.12s;
            letter-spacing: 0.5px;
        }
        #lang-toggle:hover { background: #efebe9; transform: translateY(-1px); }
        #lang-toggle.en-active { background: #1565c0; color: #fff; border-color: #1565c0; }
`;
const CSS_ANCHOR = '        #vtm-zoom-label { color: #fff; font-weight: 800; font-size: 13px; min-width: 54px; text-align: center; }';
if (!h.includes(CSS_ANCHOR)) { console.error('CSS_ANCHOR not found'); process.exit(1); }
h = h.replace(CSS_ANCHOR, CSS_ANCHOR + '\n' + LANG_CSS);

// ── 2. ADD LANG TOGGLE BUTTON HTML (after ui-controls 🔄 button) ─────────────
const BTN_ANCHOR = '    <!-- 🔖 主視圖書籤頁籤（無底條） -->';
const LANG_BTN = `    <button id="lang-toggle" onclick="switchLang()" title="Switch Language / 切換語言">🌐 EN</button>
`;
if (!h.includes(BTN_ANCHOR)) { console.error('BTN_ANCHOR not found'); process.exit(1); }
h = h.replace(BTN_ANCHOR, LANG_BTN + BTN_ANCHOR);

// ── 3. ADD LANG CONST + switchLang() + _e() near JOURNAL_KEY ─────────────────
const JS_ANCHOR = '            const JOURNAL_KEY = \'COFFEE_JOURNAL\';';
const LANG_JS = `
            // ===== 🌐 i18n: Language switch =====
            const LANG = localStorage.getItem('COFFEE_LANG') || 'zh';
            window.switchLang = function() {
                localStorage.setItem('COFFEE_LANG', LANG === 'zh' ? 'en' : 'zh');
                location.reload();
            };
            // _e(zh, en): pick text by current language
            function _e(zh, en) { return LANG === 'en' ? en : zh; }
            // Apply lang toggle button state & all static-HTML i18n
            (function _applyStaticI18N() {
                const btn = document.getElementById('lang-toggle');
                if (btn) {
                    btn.textContent = LANG === 'en' ? '🌐 中文' : '🌐 EN';
                    if (LANG === 'en') btn.classList.add('en-active');
                }
                if (LANG !== 'en') return;
                // App title
                const appTitle = document.querySelector('.app-title');
                if (appTitle) appTitle.innerHTML = '☕ Coffee Tasting Workbench <span class="app-subtitle">Origin × Roast × Brew × Taste</span>';
                // Main tabs
                const tabWb = document.querySelector('.tab-workbench .mt-text');
                const tabLh = document.querySelector('.tab-learning .mt-text');
                if (tabWb) tabWb.textContent = 'Workbench';
                if (tabLh) tabLh.textContent = 'Learning Hub';
                // Learning center title
                const lvTitle = document.getElementById('lv-title');
                if (lvTitle) lvTitle.textContent = '🎓 Learning Hub';
                // wb-section summaries
                const summaryMap = {
                    '🌱 配置（豆源 × 烘焙 × 沖煮）': '🌱 Setup (Origin × Roast × Brew)',
                    '🎯 預期對位': '🎯 Expected Flavors',
                    '👅 品嚐': '👅 Tasting',
                    '⚙️ 分析與規劃': '⚙️ Analysis & Planning',
                    '💾 杯測日誌': '💾 Cupping Journal',
                    '🧠 AI 延伸': '🧠 AI Insights'
                };
                document.querySelectorAll('.wb-section > summary').forEach(s => {
                    const en = summaryMap[s.textContent.trim()];
                    if (en) s.textContent = en;
                });
                // Wheel hint
                const hint = document.getElementById('wheel-hint');
                if (hint) hint.textContent = '💡 Click outer flavor wheel segments → add to tasted list';
                // Config section labels
                const labelMap = {
                    '產區國家': 'Origin Country',
                    '海拔高度': 'Altitude',
                    '咖啡品種': 'Variety',
                    '土壤類型': 'Soil Type',
                    '處理法': 'Processing',
                    '烘焙度': 'Roast Level',
                    '沖煮方式': 'Brew Method',
                    '濾杯': 'Dripper',
                    '手法': 'Technique'
                };
                document.querySelectorAll('.cfg-label, .config-label, label').forEach(el => {
                    const en = labelMap[el.textContent.trim()];
                    if (en) el.textContent = en;
                });
                // Match score label
                const matchLabel = document.querySelector('.score-label');
                if (matchLabel) matchLabel.textContent = 'Match Score';
                // Buttons - use data-i18n-en if present, or match text
                const btnMap = {
                    '🎲 盲測練習': '🎲 Blind Test',
                    '💧 沖煮建議': '💧 Brew Guide',
                    '🔥 烘焙校對': '🔥 Roast Check',
                    '💾 存檔': '💾 Save',
                    '📜 查看歷史': '📜 History',
                    '🗑️ 清紀錄': '🗑️ Clear Log',
                    '🔍 喝起來怪怪？反查沖煮問題': '🔍 Diagnose Brew Issues',
                    '📋 烘焙計畫單': '📋 Roast Plan',
                    '📈 曲線設計器': '📈 Curve Designer',
                    '🎴 學習卡': '🎴 Flashcards',
                    '🔗 分享配置': '🔗 Share Config',
                    '💡 洞察分析': '💡 Insights',
                    '📊 杯測儀表板': '📊 Dashboard',
                    '✅ 儲存記錄': '✅ Save Record',
                    '❌ 取消': '❌ Cancel',
                    '🔆 風味輪篩選': '🔆 Flavor Filter',
                    '🗒️ 筆記': '🗒️ Notes'
                };
                document.querySelectorAll('button').forEach(b => {
                    const en = btnMap[b.textContent.trim()];
                    if (en) b.textContent = en;
                });
                // Learning center tiles
                document.querySelectorAll('.lv-tile-title').forEach(el => {
                    const map = { '📚 沖煮百科': '📚 Coffee Encyclopedia', '🎴 學習卡練習': '🎴 Flashcard Practice', '📊 學習進度': '📊 Learning Progress' };
                    const en = map[el.textContent.trim()];
                    if (en) el.textContent = en;
                });
                document.querySelectorAll('.lv-tile-desc').forEach(el => {
                    const map = {
                        '75 個主題・全文圖解': '75 topics · illustrated',
                        '4 選 1 · SRS 間隔複習': 'Multiple choice · SRS review',
                        '掌握度 · 學習曲線': 'Mastery · learning curve'
                    };
                    const trimmed = el.textContent.trim();
                    if (map[trimmed]) el.textContent = map[trimmed];
                });
            })();

`;
if (!h.includes(JS_ANCHOR)) { console.error('JS_ANCHOR not found'); process.exit(1); }
h = h.replace(JS_ANCHOR, LANG_JS + JS_ANCHOR);

// ── 4. PATCH ENCYCLOPEDIA CATEGORY TAB LABELS ────────────────────────────────
// The ency tabs are rendered by encySwitchCat / buildEncyCatTabs - patch category titles
const ENCY_CAT_ANCHOR = "const ENCYCLOPEDIA = {";
const ENCY_CAT_PATCH = `
            // i18n: category labels for encyclopedia tabs
            const ENCY_CAT_LABELS_EN = {
                history: 'History', variety: 'Varieties', process: 'Processing',
                roast: 'Roast Levels', dripper: 'Drippers', brew: 'Brew Methods', method: 'Techniques'
            };
`;
if (!h.includes(ENCY_CAT_ANCHOR)) { console.error('ENCY_CAT_ANCHOR not found'); process.exit(1); }
h = h.replace(ENCY_CAT_ANCHOR, ENCY_CAT_PATCH + ENCY_CAT_ANCHOR);

// ── 5. PATCH encySwitchCat to use EN labels ───────────────────────────────────
// Find where tabs are rendered (ency tab label display)
const TAB_RENDER = "document.querySelectorAll('.ency-tab').forEach(t => {";
if (h.includes(TAB_RENDER)) {
    h = h.replace(TAB_RENDER,
        "document.querySelectorAll('.ency-tab').forEach(t => { if (LANG === 'en' && ENCY_CAT_LABELS_EN[t.dataset.cat]) t.querySelector('.et-label, .ency-tab-label') && (t.querySelector('.et-label') || t).childNodes[t.childNodes.length-1].textContent = ENCY_CAT_LABELS_EN[t.dataset.cat] || ''; ");
}

// ── 6. PATCH showEncyDetail to use _en fields ─────────────────────────────────
// Find subtitle display in showEncyDetail
const DETAIL_SUBTITLE = "const subtitle = it.subtitle || '';";
if (h.includes(DETAIL_SUBTITLE)) {
    h = h.replace(DETAIL_SUBTITLE,
        "const subtitle = (LANG === 'en' && it.subtitle_en) ? it.subtitle_en : (it.subtitle || '');");
}
const DETAIL_TAGLINE = "const tagline = it.tagline || '';";
if (h.includes(DETAIL_TAGLINE)) {
    h = h.replace(DETAIL_TAGLINE,
        "const tagline = (LANG === 'en' && it.tagline_en) ? it.tagline_en : (it.tagline || '');");
}

// Patch tips rendering
const TIPS_RENDER = "(it.tips || []).map(tip => `";
if (h.includes(TIPS_RENDER)) {
    h = h.replace(TIPS_RENDER,
        "((LANG === 'en' && it.tips_en) ? it.tips_en : (it.tips || [])).map(tip => `");
}

// Patch origin rendering
const ORIGIN_RENDER = "(it.origin || []).map(o => `";
if (h.includes(ORIGIN_RENDER)) {
    h = h.replace(ORIGIN_RENDER,
        "((LANG === 'en' && it.origin_en) ? it.origin_en : (it.origin || [])).map(o => `");
}

// Patch specs rendering
const SPECS_RENDER = "(it.specs || []).map(s => `";
if (h.includes(SPECS_RENDER)) {
    h = h.replace(SPECS_RENDER,
        "((LANG === 'en' && it.specs_en) ? it.specs_en : (it.specs || [])).map(s => `");
}

// Patch ency list tagline display
const LIST_TAGLINE = "_escHtml(it.tagline)";
if (h.includes(LIST_TAGLINE)) {
    h = h.replace(new RegExp(LIST_TAGLINE, 'g'),
        "(LANG === 'en' && it.tagline_en ? _escHtml(it.tagline_en) : _escHtml(it.tagline))");
}

// Patch ency list name display
const LIST_NAME = "_escHtml(it.name)";
if (h.includes(LIST_NAME)) {
    h = h.replace(new RegExp(LIST_NAME, 'g'),
        "(LANG === 'en' && it.name_en ? _escHtml(it.name_en) : _escHtml(it.name))");
}

// ── 7. PATCH analysis viewer titles ───────────────────────────────────────────
// The analysis viewer title / badge use hardcoded strings -- patch key ones
h = h.replace("title: '洞察分析',\n                    badgeText: `需 ≥5 杯",
               "title: _e('洞察分析','Insights'),\n                    badgeText: `${_e('需 ≥5 杯','Need ≥5 cups')}");

// ── WRITE ──────────────────────────────────────────────────────────────────────
if (hasCRLF) h = h.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, h, 'utf8');
console.log('✅ patch_i18n_infra.js done');
