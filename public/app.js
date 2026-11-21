/* ============================================================
   JKMUSIC — page logic. Content lives in data.js.
   ============================================================ */
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const set = (sel, prop, val) => { const el = $(sel); if (el) el[prop] = val; };
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- state ---------- */
let LANG = localStorage.getItem("jk_lang") || "en";
let CAT2 = "All";
let SHOW_ALL = false;
const INV_LIMIT = 12;

const t = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[LANG] ?? v.en) : v;

const pick = (root, p) => p.split(".").reduce((o, k) => o?.[k], root);
const raw = p => pick(UI, p) ?? pick(UI_DEFAULTS, p);
const ui = p => t(raw(p)) ?? "";

const PH_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="2.5" width="14" height="19" rx="2"/><circle cx="12" cy="14.5" r="3.6"/><circle cx="12" cy="7" r="1.6"/></svg>`;
const img = (src, alt, extra = "") =>
  `<img src="${src}" alt="${alt}" loading="lazy" ${extra}
    onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',innerHTML:PH_SVG}))">`;
const lineUrl = () => {
  const id = String(BUSINESS.line);
  return "https://line.me/R/ti/p/" + (id.startsWith("@") ? id : "~" + id.replace(/^~/, ""));
};
const num = v => parseInt(String(t(v)).replace(/[^\d]/g, ""), 10) || t(v);
const EVENT_PICS = () => [...new Set([...(typeof HERO_SLIDES !== "undefined" ? HERO_SLIDES : []), ...PORTFOLIO.map(p => p.image)])];

const ICONS = [
  `<path d="M4 7h16M4 12h16M4 17h10"/>`,
  `<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>`,
  `<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5"/>`,
  `<path d="M3 12h4l2-6 4 12 2-6h6"/>`,
  `<path d="M7 7h10v10H7z"/><path d="M10 11h4M10 14h2"/>`
].map(p => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`);
/* ---------- FAQ (define const FAQ = [...] in data.js to replace) ---------- */
function faqItems() {
  if (window.JK_FAQ && window.JK_FAQ.length) return window.JK_FAQ;
  if (typeof FAQ !== "undefined" && FAQ.length) return FAQ;
  const from = PACKAGES[0] ? t(PACKAGES[0].price) : "";
  const steps = UI.about.steps.map(s => `${t(s.b)} ${t(s.t)}`.trim()).join(" → ");
  return [
    { q: { en: "What's included in a package?", th: "แพ็กเกจรวมอะไรบ้าง?" },
      a: UI.packages.foot },
    { q: { en: "How much does it cost?", th: "ราคาเริ่มต้นเท่าไหร่?" },
      a: { en: `Packages start at ${from} per queue. Venue, distance and event length can change the final price, so we always send an exact quote first.`,
           th: `แพ็กเกจเริ่มต้นที่ ${from} ต่อคิว ราคาจริงขึ้นอยู่กับสถานที่ ระยะทาง และระยะเวลางาน เราจะส่งใบเสนอราคาที่แน่นอนให้ก่อนเสมอ` } },
    { q: { en: "How do I book?", th: "จองคิวอย่างไร?" },
      a: { en: steps, th: steps } },
    { q: { en: "Will someone run the sound during the event?", th: "มีคนคุมเสียงระหว่างงานไหม?" },
      a: { en: "Yes. Every package includes an engineer who stays on site to set up, sound-check and run the mix.",
           th: "มีครับ ทุกแพ็กเกจมีซาวด์เอนจิเนียร์อยู่หน้างาน ดูแลตั้งแต่ติดตั้ง เช็คเสียง จนจบงาน" } },
    { q: { en: "What's the fastest way to reach you?", th: "ติดต่อช่องทางไหนเร็วที่สุด?" },
      a: { en: `Message us on LINE (${BUSINESS.line}) or call ${BUSINESS.phone}. We answer ${t(BUSINESS.hours)}.`,
           th: `ทัก LINE (${BUSINESS.line}) หรือโทร ${BUSINESS.phone} เวลาทำการ ${t(BUSINESS.hours)}` } }
  ];
}

function renderInventory() {
  const list = CAT2 === "All" ? INVENTORY : INVENTORY.filter(i => i.category === CAT2);
  const shown = SHOW_ALL ? list : list.slice(0, INV_LIMIT);
  set("#inventoryShowcaseGrid", "innerHTML", shown.map(i => `
    <article class="gear" data-inv="${INVENTORY.indexOf(i)}" tabindex="0" role="button" aria-label="${t(i.name)}">
      <div class="thumb">${img(i.image, t(i.name))}<span class="tag">${t(UI.categories[i.category]) || i.category}</span></div>
      <h3>${t(i.name)}</h3>
      <p>${t(i.desc)}</p>
    </article>`).join(""));
  set("#invMore", "innerHTML", list.length <= INV_LIMIT ? "" :
    `<button class="btn ghost" id="invMoreBtn">${SHOW_ALL
      ? t({ en: "Show less", th: "ย่อลง" })
      : t({ en: `Show all ${list.length} items`, th: `ดูทั้งหมด ${list.length} รายการ` })}</button>`);
}

/* ---------- popups ---------- */
function openModal(id) { $(id).classList.add("open"); document.body.style.overflow = "hidden"; }
function closeModals() { $$(".modal.open").forEach(m => m.classList.remove("open")); document.body.style.overflow = ""; }

function openSpec(idx) {
  const i = INVENTORY[idx]; if (!i) return;
  set("#specImg", "innerHTML", `<div data-full="${i.image}" data-cap="${t(i.name)}" style="width:100%;height:100%">${img(i.image, t(i.name))}</div>`);
  set("#specCat", "textContent", t(UI.categories[i.category]) || i.category);
  set("#specTitle", "textContent", t(i.name));
  set("#specDesc", "textContent", t(i.desc));
  set("#specHead", "textContent", t({ en: "Specifications", th: "สเปกสินค้า" }));
  set("#specList", "innerHTML", (i.specs || []).map(s => `<li>${t(s)}</li>`).join(""));
  set("#specCta", "textContent", t({ en: "Request a quote", th: "ขอใบเสนอราคา" }));
  openModal("#specModal");
}

function openEvent(idx) {
  const p = PORTFOLIO[idx]; if (!p) return;
  const pics = [p.image, ...(p.gallery || [])].filter(Boolean);
  set("#evtTrack", "innerHTML", pics.map(src => `<div class="evt-slide">${img(src, t(p.title))}</div>`).join(""));
  $("#evtTrack").scrollLeft = 0;
  set("#evtDots", "innerHTML", pics.map((_, n) => `<i class="${n ? "" : "on"}" data-go="${n}"></i>`).join(""));
  const multi = pics.length > 1;
  ["#evtPrev", "#evtNext", "#evtDots", "#evtCount"].forEach(s => $(s).hidden = !multi);
  set("#evtCount", "textContent", `1 / ${pics.length}`);
  set("#evtCat", "textContent", t(p.event));
  set("#evtTitle", "textContent", t(p.title));
  set("#evtMeta", "textContent", `${t(p.location)}, ${p.year}`);
  set("#evtTags", "innerHTML", (p.tags || []).map(x => `<span>${t(x)}</span>`).join(""));
  set("#evtHead", "textContent", t({ en: "Setup used", th: "ระบบและอุปกรณ์ที่ใช้" }));
  set("#evtSetup", "innerHTML", (p.setup || []).map(s => `<li>${t(s)}</li>`).join(""));
  $("#evtHead").style.display = (p.setup || []).length ? "" : "none";
  set("#evtCta", "textContent", t({ en: "Request a quote", th: "ขอใบเสนอราคา" }));
  openModal("#evtModal");
}
const evtIndex = () => { const tr = $("#evtTrack"); return Math.round(tr.scrollLeft / (tr.clientWidth || 1)); };
function evtGo(n) {
  const tr = $("#evtTrack"); const to = Math.max(0, Math.min(tr.children.length - 1, n));
  tr.scrollTo({ left: to * tr.clientWidth, behavior: "smooth" });
}
$("#evtTrack").addEventListener("scroll", () => {
  const n = evtIndex();
  $$("#evtDots i").forEach((d, k) => d.classList.toggle("on", k === n));
  set("#evtCount", "textContent", `${n + 1} / ${$("#evtTrack").children.length}`);
}, { passive: true });


/* ---------- hero floating cards ---------- */
const SLOTS = [ // x%, y%, width px, rotate, aspect — four photos on the right
  [64, 30, 190, -5, "4/5"], [87, 24, 210, 4, "4/3"],
  [70, 70, 220, 3, "4/3"], [91, 66, 170, -4, "4/5"]
];
function buildFloat() {
  const ev = EVENT_PICS();
  $("#floatLayer").innerHTML = SLOTS.map((s, n) => `
    <div class="fcard" data-fx="${s[0]}" data-fy="${s[1]}"
      style="--x:${s[0]}%;--y:${s[1]}%;--w:${s[2]}px;--r:${s[3]}deg;--ar:${s[4]};--d:${7 + n}s;--dl:${-n * 0.9}s">
      <div class="fcard-in">${img(ev[n % ev.length], "", 'loading="eager"')}</div>
    </div>`).join("");
}

/* ---------- rotating word ---------- */
const Rot = {
  i: 0, timer: null,
  start() {
    clearInterval(this.timer);
    const el = $("#heroRot .rot-word"), words = ui("hero.words");
    this.i = 0; el.textContent = words[0];
    if (REDUCED || !Array.isArray(words)) return;
    this.timer = setInterval(() => {
      el.classList.add("out");
      setTimeout(() => {
        this.i = (this.i + 1) % words.length;
        el.textContent = words[this.i];
        el.classList.remove("out"); el.classList.add("in");
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("in")));
      }, 420);
    }, 2600);
  }
};

/* ---------- master render ---------- */
function render() {
  document.documentElement.lang = LANG;
  document.body.classList.toggle("th", LANG === "th");
  set("#langTxt", "textContent", LANG === "en" ? "TH" : "EN");

  $$("[data-ui]").forEach(el => el.textContent = ui(el.dataset.ui));
  $$("[data-nav]").forEach(el => el.textContent = ui("nav." + el.dataset.nav));

  set("#logoImg", "src", BUSINESS.logo);
  set("#logoName", "textContent", BUSINESS.name);
  set("#heroSub", "textContent", t(BUSINESS.tagline));
  set("#heroLine1", "textContent", ui("hero.line1"));
  set("#heroTag", "textContent", t(BUSINESS.subtitle));
  set("#heroCta1", "textContent", t(UI.hero.cta1));
  set("#heroCta2", "textContent", t(UI.hero.cta2));
  set("#footName", "textContent", BUSINESS.name);
  set("#footName2", "textContent", BUSINESS.name);
  set("#footAddr", "textContent", BUSINESS.address ? t(BUSINESS.address) : ui("footer.tagline"));
  set("#year", "textContent", new Date().getFullYear());
  document.title = `${BUSINESS.name} — ${t(BUSINESS.tagline)}`;
  Rot.start();

  ["#fwFloatBtn", "#finalFw"].forEach(s => set(s, "href", BUSINESS.fastwork));
  ["#finalLine", "#faqLine"].forEach(s => set(s, "href", lineUrl()));
  set("#fwIcon", "src", BUSINESS.fastworkIcon.dark);

  /* intro with photos inside the sentence */
  const pics = EVENT_PICS().slice(0, 3).map(s => `<img src="${s}" alt="">`).join("");
  set("#introTitle", "innerHTML", ui("intro.title")
    .replace("{years}", `<em>${num(BUSINESS.yearsExperience)}+</em>`)
    .replace("{events}", `<em>${num(BUSINESS.eventsDone)}+</em>`)
    .replace("{photos}", `<span class="inl">${pics}</span>`));

  set("#stats", "innerHTML", [
    [num(BUSINESS.yearsExperience) + "+", ui("statsLong.years")],
    [num(BUSINESS.eventsDone) + "+",      ui("statsLong.events")],
    [PACKAGES.length,                      ui("statsLong.packages")]
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join(""));

  renderWin();
  renderPackages();

  set("#notes", "innerHTML", raw("worries.notes").map(n => `<div class="note">${t(n)}</div>`).join(""));
  set("#aboutPoints", "innerHTML", UI.about.points.map((p, i) => `
    <article><span class="ico">${ICONS[i % ICONS.length]}</span><p>${t(p)}</p></article>`).join(""));

  const invCats = ["All", ...new Set(INVENTORY.map(i => i.category))];
  set("#invFilters", "innerHTML", invCats.map(c =>
    `<button class="chip${c === CAT2 ? " on" : ""}" data-cat="${c}" role="tab" aria-selected="${c === CAT2}">${t(UI.categories[c]) || c}</button>`).join(""));
  renderInventory();

  set("#portfolioGrid", "innerHTML", PORTFOLIO.map((p, idx) => `
    <article class="work" data-evt="${idx}" tabindex="0" role="button" aria-label="${t(p.title)}">
      <div class="thumb">${img(p.image, t(p.title))}</div>
      <div class="work-meta">
        <span class="cat">${t(p.event)}</span>
        <h3>${t(p.title)}</h3>
        <p>${t(p.location)}, ${p.year}</p>
        <div class="tags">${(p.tags || []).map(x => `<span>${t(x)}</span>`).join("")}</div>
      </div>
    </article>`).join(""));

  const hi = raw("process.hi") || [];
  set("#aboutSteps", "innerHTML", UI.about.steps.map((s, i) => {
    let h = t(s.b); const w = hi[i] && t(hi[i]);
    if (w && h.includes(w)) h = h.replace(w, `<b>${w}</b>`);
    return `<div class="frow">
      <div class="fmock">${stepMock(i)}</div>
      <div class="ftext"><span class="num">${i + 1}</span><h3>${h}</h3><p>${t(s.t).replace(/^[—–-]\s*/, "")}</p></div>
    </div>`;
  }).join(""));

  set("#faqList", "innerHTML", faqItems().map((f, i) => `
    <div class="faq-item${i === 0 ? " open" : ""}">
      <button class="faq-q" aria-expanded="${i === 0}"><span>${t(f.q)}</span><i class="pm" aria-hidden="true"></i></button>
      <div class="faq-a"><div><p>${t(f.a)}</p></div></div>
    </div>`).join(""));

  set("#contactInfo", "innerHTML", `
    <li><span class="k">${t({ en: "Phone", th: "โทร" })}</span><a class="v" href="tel:${BUSINESS.phone.replace(/\s/g, "")}">${BUSINESS.phone}</a></li>
    <li><span class="k">LINE</span><a class="v" href="${lineUrl()}" target="_blank" rel="noopener">${BUSINESS.line}</a></li>
    <li><span class="k">${t({ en: "Email", th: "อีเมล" })}</span><a class="v" href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
    <li><span class="k">${t({ en: "Hours", th: "เวลาทำการ" })}</span><span class="v">${t(BUSINESS.hours)}</span></li>`);
  set("#qrBox", "innerHTML", [
    ["LINE", "images/qr-line.png", t({ en: "Scan to add us", th: "สแกนเพิ่มเพื่อน" })],
    ["Fastwork", "images/qr-fastwork.png", t({ en: "Scan to hire us", th: "สแกนเพื่อจ้างงาน" })]
  ].map(([name, src, cap]) => `<div class="qr-card"><h3>${name}</h3>${img(src, name + " QR code")}<p>${cap}</p></div>`).join(""));
  set("#socials", "innerHTML", [["Facebook", BUSINESS.facebook], ["Instagram", BUSINESS.instagram], ["YouTube", BUSINESS.youtube]]
    .filter(([, u]) => u).map(([n, u]) => `<a target="_blank" rel="noopener" href="${u}">${n}</a>`).join(""));

  const bg = EVENT_PICS();
  set("#finalBg", "innerHTML", Array.from({ length: 15 }, (_, n) => `<div style="background-image:url('${bg[n % bg.length]}')"></div>`).join(""));

  Seen.watch();
}

/* ---------- the event-sheet window ---------- */
function renderWin() {
  const pkg = PACKAGES.find(p => p.featured) || PACKAGES[0];
  const W = k => ui("win." + k);
  set("#win", "innerHTML", `
    <div class="win-bar"><i></i><i></i><i></i><span>${W("title")}</span><em>${W("sample")}</em></div>
    <div class="win-body">
      <aside class="win-side">
        <div class="win-brand"><img src="${BUSINESS.logo}" alt=""><b>${BUSINESS.name}</b></div>
        ${raw("win.side").map((s, i) => `<span class="${i ? "" : "on"}">${t(s)}</span>`).join("")}
      </aside>
      <div class="win-main">
        <div class="win-head">
          <div><p class="win-crumb">${W("date")} / ${t(pkg.name)}</p><h3>${W("event")}</h3>
          <p class="win-meta">${W("venue")}<span>${W("guests")}</span></p></div>
          <span class="win-status"><i></i>${W("status")}</span>
        </div>
        <div class="win-cols">
          <div class="win-box"><h4>${W("gearT")}</h4><ul>${pkg.includes.slice(0, 5).map(x => `<li><i></i>${t(x)}</li>`).join("")}</ul></div>
          <div class="win-box"><h4>${W("runT")}</h4><ol>${raw("win.run").map(([tm, l]) => `<li><b>${tm}</b>${t(l)}</li>`).join("")}</ol></div>
        </div>
      </div>
      <aside class="win-act"><h4>${W("actT")}</h4>
        ${raw("win.act").map((s, i) => `<p style="--i:${i}"><i></i>${t(s)}</p>`).join("")}
      </aside>
    </div>`);
}

/* ---------- packages: pinned showcase ---------- */
function pkgStats(p) {
  const inc = p.includes.map(i => t(i));
  const out = [];
  const fw = t(p.forWho); const g = fw.includes("·") ? fw.split("·").pop().trim().replace(/guests|คน/gi, "").trim() : "";
  if (g) out.push([g, ui("pkgStats.guests")]);
  const mx = inc.find(s => /mixer|มิกเซอร์/i.test(s)); const mxn = mx && mx.match(/(\d+)/);
  if (mxn) out.push([mxn[1] + " ch", ui("pkgStats.mixer")]);
  const mc = inc.find(s => /wireless|ไมค์ลอย/i.test(s)); const mcn = mc && mc.match(/(\d+)/);
  if (mcn) out.push([mcn[1], ui("pkgStats.mics")]);
  return out.slice(0, 3);
}
function renderPackages() {
  const ev = EVENT_PICS();
  set("#pinList", "innerHTML", PACKAGES.map((p, i) =>
    `<li class="${i ? "" : "on"}"><button data-pin="${i}" aria-label="${t(p.name)}">
       <span class="led"></span>
       <span class="fader"><span class="cap"></span></span>
       <span class="ch">${t(p.name)}</span><small>${t(p.price)}</small>
     </button></li>`).join(""));
  set("#pinCards", "innerHTML", PACKAGES.map((p, i) => {
    const st = pkgStats(p);
    return `<article class="pcard${i ? "" : " on"}" data-card="${i}">
      <div class="pcard-photo">${img(p.image && !/packages\//.test(p.image) ? p.image : ev[i % ev.length], t(p.name))}
        ${p.featured ? `<span class="pcard-badge">${t(UI.packages.badge)}</span>` : ""}</div>
      <div class="pcard-body">
        <div class="pcard-top"><span class="pcard-ico"><img src="${BUSINESS.logo}" alt=""></span>
          <div><h3>${t(p.name)}</h3><p class="pcard-for">${t(p.forWho)}</p></div></div>
        ${st.length ? `<div class="pcard-stats">${st.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join("")}</div>` : `<div style="height:16px"></div>`}
        <ul class="pcard-list">${p.includes.map(x => `<li>${t(x)}</li>`).join("")}</ul>
        <p class="pcard-best"><b>${t(UI.packages.best)}</b> ${t(p.best)}</p>
        <div class="pcard-foot">
          <div class="pcard-price"><b>${t(p.price)}</b><span>${t(p.priceNote)}</span></div>
          <a href="#contact" class="btn${p.featured ? " brass" : ""}">${t(UI.packages.cta)}</a>
        </div>
      </div>
    </article>`;
  }).join(""));
  sizePin();
}
const pinMobile = () => matchMedia("(max-width:900px)").matches;
function sizePin() { $("#pinTrack").style.height = pinMobile() ? "" : `${PACKAGES.length * 70 + 40}vh`; }
let PIN_I = 0;
function setPin(i) {
  if (i === PIN_I) return; PIN_I = i;
  $$("#pinList li").forEach((li, k) => li.classList.toggle("on", k === i));
  $$("#pinCards .pcard").forEach((c, k) => c.classList.toggle("on", k === i));
}
function pinScroll() {
  if (pinMobile()) return;
  const tr = $("#pinTrack"), r = tr.getBoundingClientRect();
  const span = tr.offsetHeight - innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / (span || 1)));
  setPin(Math.min(PACKAGES.length - 1, Math.floor(p * PACKAGES.length)));
}
function pinGo(i) {
  if (pinMobile()) return;
  const tr = $("#pinTrack"); const span = tr.offsetHeight - innerHeight;
  scrollTo({ top: tr.offsetTop + span * ((i + 0.5) / PACKAGES.length), behavior: "smooth" });
}

/* ---------- process mock cards ---------- */
function stepMock(i) {
  const pkg = PACKAGES.find(p => p.featured) || PACKAGES[0];
  return [
    `<div class="bubble me">${t({ en: "Hi! Sound for a wedding, 200 guests, 14 Feb?", th: "สวัสดีครับ งานแต่ง 200 คน วันที่ 14 ก.พ. ครับ" })}</div>
     <div class="bubble">${t({ en: "Sure! Where's the venue?", th: "ได้เลยครับ จัดที่ไหนครับ?" })}</div>
     <div class="bubble me">${t({ en: "A hotel ballroom in Bangkok", th: "ห้องจัดเลี้ยงโรงแรม กรุงเทพฯ ครับ" })}</div>`,
    `<div class="mini"><span class="lbl">${t({ en: "Quotation", th: "ใบเสนอราคา" })}</span><b>${t(pkg.name)}</b>
       <span class="big">${t(pkg.price)}</span>
       <div class="row"><span>${t(pkg.forWho).split("·").pop().trim()}</span><span>${t(pkg.priceNote)}</span></div></div>`,
    `<div class="cal">${Array.from({ length: 14 }, (_, n) => `<i class="${n === 9 ? "pick" : ""}">${n + 5}</i>`).join("")}</div>
     <div class="toast"><span class="tick">✓</span>${t({ en: "Date locked", th: "ยืนยันวันแล้ว" })}</div>`,
    `<div class="meter">${Array.from({ length: 14 }, (_, n) => `<i style="height:${30 + ((n * 37) % 70)}%;animation-delay:${(n % 5) * 0.12}s"></i>`).join("")}</div>
     <div class="toast"><span class="tick">✓</span>${t({ en: "Sound check done. Enjoy!", th: "เช็คเสียงเรียบร้อย สนุกได้เลย!" })}</div>`
  ][i] || "";
}

/* ---------- reveal once when in view (notes + step rows only) ---------- */
const Seen = {
  io: "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("seen"); Seen.io.unobserve(e.target); }
  }), { threshold: .25 }) : null,
  watch() { $$(".notes, .frow").forEach(el => this.io ? this.io.observe(el) : el.classList.add("seen")); }
};

/* ---------- scroll effects: hero blur + cards spreading, nav, pin ---------- */
let ticking = false;
function onScroll() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    $("#nav").classList.toggle("solid", y > 30);
    if (!REDUCED && y < vh * 1.2) {
      const p = Math.min(1, y / (vh * .75));
      const core = $("#heroCore");
      core.style.filter = `blur(${p * 10}px)`;
      core.style.opacity = 1 - p * 1.1;
      core.style.transform = `scale(${1 - p * .06})`;
      $("#scrollCue").style.opacity = 1 - p * 3;
      $$(".fcard").forEach(c => {
        const dx = (+c.dataset.fx - 50) / 50, dy = (+c.dataset.fy - 50) / 50;
        c.style.transform = `translate(calc(-50% + ${dx * p * 40}vw), calc(-50% + ${dy * p * 30}vh)) rotate(var(--r)) scale(${1 + p * .25})`;
      });
    }
    const win = $("#win");
    if (win && !REDUCED) {
      const r = win.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * .85)));
      win.style.transform = `perspective(1600px) rotateX(${(1 - p) * 14}deg) scale(${.92 + p * .08})`;
      win.style.opacity = .35 + p * .65;
      win.classList.toggle("live", p > .75);
    }
    pinScroll();
  });
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (chip) {
    CAT2 = chip.dataset.cat; SHOW_ALL = false;
    $$("#invFilters .chip").forEach(c => { const on = c.dataset.cat === CAT2; c.classList.toggle("on", on); c.setAttribute("aria-selected", on); });
    renderInventory();
  }
  if (e.target.closest("#invMoreBtn")) { SHOW_ALL = !SHOW_ALL; renderInventory(); }

  const pin = e.target.closest("[data-pin]"); if (pin) pinGo(+pin.dataset.pin);

  const q = e.target.closest(".faq-q");
  if (q) { const item = q.parentElement; const open = !item.classList.contains("open");
    item.classList.toggle("open", open); q.setAttribute("aria-expanded", open); }

  if (e.target.closest("#specClose, #evtClose, #specCta, #evtCta") || e.target.classList.contains("modal")) closeModals();
  if (e.target.closest("#evtPrev")) evtGo(evtIndex() - 1);
  if (e.target.closest("#evtNext")) evtGo(evtIndex() + 1);
  const dot = e.target.closest("#evtDots i"); if (dot) evtGo(+dot.dataset.go);

  const row = $("#portfolioGrid"), step = () => (row.firstElementChild?.offsetWidth || 400) + 18;
  if (e.target.closest("#workPrev")) row.scrollBy({ left: -step(), behavior: "smooth" });
  if (e.target.closest("#workNext")) row.scrollBy({ left: step(), behavior: "smooth" });

  const work = e.target.closest(".work"); if (work) openEvent(+work.dataset.evt);
  const gear = e.target.closest(".gear"); if (gear) openSpec(+gear.dataset.inv);

  const full = e.target.closest("[data-full]");
  if (full && !gear) {
    set("#lbImg", "src", full.dataset.full);
    set("#lbCap", "textContent", full.dataset.cap || "");
    $("#lightbox").classList.add("open");
  } else if (e.target.closest("#lightbox")) $("#lightbox").classList.remove("open");

  const burger = e.target.closest("#burger");
  if (burger) { const open = $("#menu").classList.toggle("open"); burger.setAttribute("aria-expanded", open); }
  if (e.target.closest("#menu a")) { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", false); }

  if (e.target.closest("#langBtn")) { LANG = LANG === "en" ? "th" : "en"; localStorage.setItem("jk_lang", LANG); PIN_I = 0; render(); pinScroll(); }
  if (e.target.closest("#fwClose")) { $("#fwFloat").classList.add("hide"); sessionStorage.setItem("jk_fw_hide", "1"); }
});

document.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".work, .gear")) { e.preventDefault(); e.target.click(); }
  if (e.key === "Escape") {
    if ($("#lightbox").classList.contains("open")) $("#lightbox").classList.remove("open");
    else closeModals();
  }
  if ($("#evtModal").classList.contains("open")) {
    if (e.key === "ArrowRight") evtGo(evtIndex() + 1);
    if (e.key === "ArrowLeft") evtGo(evtIndex() - 1);
  }
});

addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", () => { sizePin(); onScroll(); });

/* ---------- boot ---------- */
try {
  if (typeof BUSINESS === "undefined") throw new Error("data.js did not load — check that it sits next to index.html");
  buildFloat();
  render();
  onScroll();
  if (sessionStorage.getItem("jk_fw_hide")) $("#fwFloat").classList.add("hide");
} catch (err) {
  document.body.insertAdjacentHTML("afterbegin",
    `<pre style="position:fixed;inset:0;z-index:999;background:#300;color:#fbb;padding:40px;font:13px/1.6 monospace;white-space:pre-wrap;overflow:auto">⚠️ ${err.message}\n\n${err.stack || ""}</pre>`);
}
