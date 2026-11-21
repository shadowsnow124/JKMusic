/* ============================================================
   JKMUSIC — loads the latest content from the CMS (Firebase Firestore)
   before the page draws. If the CMS can't be reached, the site uses
   data.js as a backup, so it never shows a blank page.
   ============================================================ */
(function () {
  const PROJECT = (window.JK_FIREBASE && window.JK_FIREBASE.projectId) || "jkmusic-work";
  const URL = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/site/content`;
  const CACHE = "jk_cms_cache_v1";

  /* replace the contents of the objects/arrays from data.js in place */
  const replaceObj = (target, src) => { if (!src || typeof src !== "object") return; Object.keys(target).forEach(k => delete target[k]); Object.assign(target, src); };
  const replaceArr = (target, src) => { if (!Array.isArray(src)) return; target.length = 0; src.forEach(x => target.push(x)); };

  function apply(c) {
    try {
      if (c.BUSINESS) replaceObj(BUSINESS, c.BUSINESS);
      if (c.PACKAGES) replaceArr(PACKAGES, c.PACKAGES);
      if (c.INVENTORY) replaceArr(INVENTORY, c.INVENTORY);
      if (c.PORTFOLIO) replaceArr(PORTFOLIO, c.PORTFOLIO);
      if (c.HERO_SLIDES && typeof HERO_SLIDES !== "undefined") replaceArr(HERO_SLIDES, c.HERO_SLIDES);
      if (c.UI) replaceObj(UI, c.UI);
      if (c.UI_EXTRA && typeof UI_DEFAULTS !== "undefined") replaceObj(UI_DEFAULTS, Object.assign({}, UI_DEFAULTS, c.UI_EXTRA));
      if (Array.isArray(c.FAQ) && c.FAQ.length) window.JK_FAQ = c.FAQ;
    } catch (e) { console.warn("CMS content could not be applied", e); }
  }

  function start() {
    if (window.__jkStarted) return; window.__jkStarted = true;
    const s = document.createElement("script"); s.src = "app.js"; document.body.appendChild(s);
  }

  /* 1) use the last saved copy straight away (fast repeat visits) */
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE) || "null"); } catch (e) {}
  if (cached && cached.content) apply(cached.content);

  /* 2) fetch the newest version; wait at most 1.5 s on first visit */
  const ctrl = "AbortController" in window ? new AbortController() : null;
  const timer = setTimeout(() => { if (ctrl) ctrl.abort(); start(); }, cached ? 600 : 1500);

  fetch(URL, { signal: ctrl ? ctrl.signal : undefined, cache: "no-store" })
    .then(r => r.ok ? r.json() : null)
    .then(doc => {
      const json = doc && doc.fields && doc.fields.json && doc.fields.json.stringValue;
      if (!json) return;
      const content = JSON.parse(json);
      const stamp = doc.updateTime;
      if (!cached || cached.stamp !== stamp) {
        try { localStorage.setItem(CACHE, JSON.stringify({ stamp, content })); } catch (e) {}
        if (window.__jkStarted) { location.reload(); return; } // newer content arrived after the page drew
        apply(content);
      }
    })
    .catch(() => {})
    .finally(() => { clearTimeout(timer); start(); });
})();
