const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const set = (sel, prop, val) => { const el = $(sel); if (el) el[prop] = val; };

/* ---------- state ---------- */
let LANG  = localStorage.getItem("jk_lang")  || "en";
let THEME = localStorage.getItem("jk_theme") || "dark";
let CAT2  = "All";
let SHOW_ALL = false;
const INV_LIMIT = 8;   // items shown before "Show all"

const t  = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[LANG] ?? v.en) : v;
const ui = p => t(p.split(".").reduce((o, k) => o?.[k], UI)) ?? "";

const img = (src, alt) =>
  `<img src="${src}" alt="${alt}" loading="lazy"
    onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:'🔊'}))">`;

/* ---------- theme ---------- */
function applyTheme() {
  document.documentElement.setAttribute("data-theme", THEME);
  set("#themeTxt", "textContent", THEME === "dark" ? "☀" : "☾");
  localStorage.setItem("jk_theme", THEME);
  const fw = $("#fwIcon");
  if (fw) fw.src = BUSINESS.fastworkIcon[THEME];
}

/* ---------- master render ---------- */
function render() {
  document.documentElement.lang = LANG;
  document.body.classList.toggle("th", LANG === "th");
  set("#langTxt", "textContent", LANG === "en" ? "TH" : "EN");

  $$("[data-ui]").forEach(el => el.textContent = ui(el.dataset.ui));
  $$("[data-nav]").forEach(el => el.textContent = t(UI.nav[el.dataset.nav]) || "");

  const logo = $("#logoImg");
  if (logo) logo.src = BUSINESS.logo;

  set("#logoName",  "textContent", BUSINESS.name);
  set("#heroSub",   "textContent", BUSINESS.name.toUpperCase());
  set("#heroTitle", "textContent", t(BUSINESS.tagline));
  set("#heroTag",   "textContent", t(BUSINESS.subtitle));
  set("#heroCta1",  "textContent", t(UI.hero.cta1));
  set("#heroCta2",  "textContent", t(UI.hero.cta2));
  set("#footName",  "textContent", BUSINESS.name);
  set("#footName2", "textContent", BUSINESS.name);
  set("#footAddr",  "textContent", t(BUSINESS.address));
  set("#year",      "textContent", new Date().getFullYear());
  set("#quoteForm", "action",      BUSINESS.formEndpoint);
  set("#fwFloat", "href", BUSINESS.fastwork);
  document.title = `${BUSINESS.name} — ${t(BUSINESS.tagline)}`;

  set("#fName",  "placeholder", t(UI.contact.namePh));
  set("#fVenue", "placeholder", t(UI.contact.venuePh));
  set("#fMsg",   "placeholder", t(UI.contact.detailsPh));

  set("#stats", "innerHTML", [
    [t(BUSINESS.yearsExperience) + "+", t(UI.stats.years)],
    [t(BUSINESS.eventsDone) + "+",      t(UI.stats.events)],
    [PACKAGES.length,                t(UI.stats.packages)]
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join(""));

  set("#contactInfo", "innerHTML", `
    <li>📞 <a href="tel:${BUSINESS.phone.replace(/\s/g, "")}">${BUSINESS.phone}</a></li>
    <li>✉️ <a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
    <li>💬 LINE: ${BUSINESS.line}</li>
    <li>📍 ${t(BUSINESS.address)}</li>
    <li>🕘 ${t(BUSINESS.hours)}</li>`);

  set("#socials", "innerHTML", `
    <a class="btn ghost sm" target="_blank" rel="noopener" href="https://wa.me/${BUSINESS.whatsapp}">WhatsApp</a>
    <a class="btn ghost sm" target="_blank" rel="noopener" href="${BUSINESS.facebook}">Facebook</a>
    <a class="btn ghost sm" target="_blank" rel="noopener" href="${BUSINESS.instagram}">Instagram</a>`);

  set("#packageGrid", "innerHTML", PACKAGES.map(p => `
    <article class="pkg${p.featured ? " featured" : ""}">
      ${p.featured ? `<span class="badge">${t(UI.packages.badge)}</span>` : ""}
      <div class="pkg-thumb" data-full="${p.image}" data-cap="${t(p.name)}">${img(p.image, t(p.name))}</div>
      <div class="pkg-body">
        <h3>${t(p.name)}</h3>
        <p class="pkg-for">${t(p.forWho)}</p>
        <div class="pkg-price"><b>${t(p.price)}</b><span>${t(p.priceNote)}</span></div>
        <ul class="pkg-list">${p.includes.map(i => `<li>${t(i)}</li>`).join("")}</ul>
        <p class="pkg-best"><b>${t(UI.packages.best)}</b> ${t(p.best)}</p>
        <a href="#contact" class="btn ${p.featured ? "" : "ghost "}full" data-pkg="${t(p.name)}">${t(UI.packages.cta)}</a>
      </div>
    </article>`).join(""));

  set("#pkgSelect", "innerHTML",
    PACKAGES.map(p => `<option>${t(p.name)}</option>`).join("") +
    `<option>${t(UI.contact.optIndividual)}</option><option>${t(UI.contact.optUnsure)}</option>`);

  const invCats = ["All", ...new Set(INVENTORY.map(i => i.category))];
  set("#invFilters", "innerHTML", invCats.map(c =>
    `<button class="chip${c === CAT2 ? " on" : ""}" data-cat="${c}">${t(UI.categories[c]) || c}</button>`).join(""));

  renderInventoryShowcase();

  set("#portfolioGrid", "innerHTML", PORTFOLIO.map(p => `
    <article class="card work" data-full="${p.image}" data-cap="${t(p.title)} — ${t(p.location)} ${p.year}">
      <div class="thumb">${img(p.image, t(p.title))}</div>
      <div class="body">
        <span class="tag flat">${t(p.event)}</span>
        <h3>${t(p.title)}</h3>
        <p class="meta">${t(p.location)} · ${p.year}</p>
        <div class="tags">${p.tags.map(x => `<span>${t(x)}</span>`).join("")}</div>
      </div>
    </article>`).join(""));

  set("#aboutPoints", "innerHTML", UI.about.points.map(p => `<li>${t(p)}</li>`).join(""));
  set("#aboutSteps",  "innerHTML", UI.about.steps.map(s => `<li><b>${t(s.b)}</b> ${t(s.t)}</li>`).join(""));
}

function renderInventoryShowcase() {
  const list = CAT2 === "All" ? INVENTORY : INVENTORY.filter(i => i.category === CAT2);
  const shown = SHOW_ALL ? list : list.slice(0, INV_LIMIT);
  set("#inventoryShowcaseGrid", "innerHTML", shown.map(i => `
    <article class="card">
      <div class="thumb" data-full="${i.image}" data-cap="${t(i.name)}">
        ${img(i.image, t(i.name))}
        <span class="tag">${t(UI.categories[i.category]) || i.category}</span>
      </div>
      <div class="body">
        <h3>${t(i.name)}</h3>
        <p class="desc">${t(i.desc)}</p>
      </div>
    </article>`).join(""));

  set("#invMore", "innerHTML", list.length <= INV_LIMIT ? "" :
    `<button class="btn ghost sm" id="invMoreBtn">${SHOW_ALL
      ? t({ en: "Show less", th: "ย่อลง" })
      : t({ en: `Show all (${list.length})`, th: `ดูทั้งหมด (${list.length})` })}</button>`);
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) {
    CAT2 = chip.dataset.cat;
    SHOW_ALL = false;
    $$("#invFilters .chip").forEach(c => c.classList.toggle("on", c.dataset.cat === CAT2));
    renderInventoryShowcase();
  }

  if (e.target.closest("#invMoreBtn")) { SHOW_ALL = !SHOW_ALL; renderInventoryShowcase(); }

  const pkg = e.target.closest("[data-pkg]");
  if (pkg) set("#pkgSelect", "value", pkg.dataset.pkg);

  const full = e.target.closest("[data-full]");
  if (full) {
    set("#lbImg", "src", full.dataset.full);
    set("#lbCap", "textContent", full.dataset.cap);
    $("#lightbox")?.classList.add("open");
  }

  if (e.target.closest("#lightbox")) $("#lightbox").classList.remove("open");
  if (e.target.closest("#menu a"))   $("#menu").classList.remove("open");

  if (e.target.closest("#burger"))  $("#menu")?.classList.toggle("open");
  if (e.target.closest("#themeBtn")) { THEME = THEME === "dark" ? "light" : "dark"; applyTheme(); }
  if (e.target.closest("#langBtn"))  { LANG = LANG === "en" ? "th" : "en"; localStorage.setItem("jk_lang", LANG); render(); }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") $("#lightbox")?.classList.remove("open");
});
addEventListener("scroll", () => $("#nav")?.classList.toggle("solid", scrollY > 40));

/* ---------- boot (with visible error reporting) ---------- */
try {
  if (typeof BUSINESS === "undefined") throw new Error("data.js did not load — check the file name and that it sits next to index.html");
  applyTheme();
  render();
} catch (err) {
  document.body.insertAdjacentHTML("afterbegin",
    `<pre style="position:fixed;inset:0;z-index:999;background:#300;color:#fbb;padding:40px;
     font:13px/1.6 monospace;white-space:pre-wrap;overflow:auto">⚠️ ${err.message}\n\n${err.stack || ""}</pre>`);
}

/* ---------- hero slideshow ---------- */
(function slideshow() {
  const box = $("#slides");
  if (!box || typeof HERO_SLIDES === "undefined" || !HERO_SLIDES.length) return;

  box.innerHTML = HERO_SLIDES
    .map((src, i) => `<div class="slide${i ? "" : " on"}" style="background-image:url('${src}')"></div>`)
    .join("");

  const slides = box.querySelectorAll(".slide");
  if (slides.length < 2) return;

  let i = 0;
  setInterval(() => {
    slides[i].classList.remove("on");
    i = (i + 1) % slides.length;
    slides[i].classList.add("on");
  }, (typeof SLIDE_SECONDS !== "undefined" ? SLIDE_SECONDS : 5) * 1000);
})();