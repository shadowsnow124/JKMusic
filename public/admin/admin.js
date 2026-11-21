/* ============================================================
   JKMusic CMS
   - Sign in with Google (only emails in JK_ADMIN_EMAILS)
   - Edits one Firestore document: site/content  { json: "<all content>" }
   - The public site (cms.js) reads that document and shows it
   - Photos upload to Firebase Storage (needs the Blaze plan)
   ============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, query, orderBy, limit, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const $ = s => document.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (k === "html") e.innerHTML = v;
    else e.setAttribute(k, v === true ? "" : v);
  }
  kids.flat().forEach(k => k != null && e.append(k.nodeType ? k : document.createTextNode(k)));
  return e;
};
const clone = v => JSON.parse(JSON.stringify(v ?? null));
const tt = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v.en || v.th || "") : (v ?? "");
const src = v => !v ? "" : /^(https?:|data:|blob:)/.test(v) ? v : "../" + v.replace(/^\.?\//, "");
const isBi = v => v && typeof v === "object" && !Array.isArray(v) && Object.keys(v).length > 0 &&
  Object.keys(v).every(k => k === "en" || k === "th") && Object.values(v).every(x => typeof x === "string");

function toast(msg, bad = false) {
  const t = $("#toast"); t.textContent = msg; t.className = "toast show" + (bad ? " bad" : "");
  clearTimeout(toast.tm); toast.tm = setTimeout(() => t.className = "toast", bad ? 6000 : 3000);
}

/* ---------- Firebase ---------- */
const CFG = window.JK_FIREBASE || {};
const ADMINS = (window.JK_ADMIN_EMAILS || []).map(s => s.toLowerCase());
const gateMsg = $("#gateMsg");

if (!CFG.apiKey || /PASTE/.test(CFG.apiKey) || /PASTE/.test(CFG.appId || "")) {
  gateMsg.innerHTML = "Almost ready. Paste your Firebase web settings into <code>firebase-config.js</code>, then reload this page. The setup guide (CMS-SETUP.md) shows where to find them.";
  throw new Error("Firebase config missing");
}

const fb = initializeApp(CFG);
const auth = getAuth(fb);
const db = getFirestore(fb);
let storage = null;
try { storage = getStorage(fb); } catch (e) { console.warn("Storage not available", e); }
const contentRef = doc(db, "site", "content");
const historyCol = collection(db, "site", "content", "history");

let USER = null;
let C = null;          // the content being edited
let dirty = false;
let current = "business";

$("#signIn").addEventListener("click", async () => {
  try { await signInWithPopup(auth, new GoogleAuthProvider()); }
  catch (e) { toast("Sign-in didn't finish: " + (e.code || e.message), true); }
});
$("#signOutGate").addEventListener("click", () => signOut(auth));
$("#userBtn").addEventListener("click", () => {
  if (dirty && !confirm("You have changes that are not saved. Sign out anyway?")) return;
  signOut(auth);
});

onAuthStateChanged(auth, async user => {
  USER = user;
  if (!user) {
    $("#app").hidden = true; $("#gate").hidden = false;
    gateMsg.textContent = "Sign in to edit your website.";
    $("#signIn").hidden = false; $("#signOutGate").hidden = true;
    return;
  }
  if (!ADMINS.includes((user.email || "").toLowerCase())) {
    $("#app").hidden = true; $("#gate").hidden = false;
    gateMsg.innerHTML = `<b>${user.email}</b> isn't allowed to edit this website. Sign in with the owner's Google account.`;
    $("#signIn").hidden = true; $("#signOutGate").hidden = false;
    return;
  }
  $("#gate").hidden = true; $("#app").hidden = false;
  $("#userMail").textContent = user.email;
  $("#userPic").src = user.photoURL || "../images/logo.png";
  await load();
});

/* ---------- content: seed from data.js, load, save ---------- */
function defaultFaq() {
  const from = PACKAGES[0] ? tt(PACKAGES[0].price) : "";
  const steps = (UI.about?.steps || []).map(s => `${tt(s.b)} ${tt(s.t)}`.trim()).join(" → ");
  const stepsTh = (UI.about?.steps || []).map(s => `${s.b?.th || tt(s.b)} ${s.t?.th || ""}`.trim()).join(" → ");
  return [
    { q: { en: "What's included in a package?", th: "แพ็กเกจรวมอะไรบ้าง?" }, a: clone(UI.packages?.foot) || { en: "", th: "" } },
    { q: { en: "How much does it cost?", th: "ราคาเริ่มต้นเท่าไหร่?" },
      a: { en: `Packages start at ${from} per queue. Venue, distance and event length can change the final price, so we always send an exact quote first.`,
           th: `แพ็กเกจเริ่มต้นที่ ${from} ต่อคิว ราคาจริงขึ้นอยู่กับสถานที่ ระยะทาง และระยะเวลางาน เราจะส่งใบเสนอราคาที่แน่นอนให้ก่อนเสมอ` } },
    { q: { en: "How do I book?", th: "จองคิวอย่างไร?" }, a: { en: steps, th: stepsTh } },
    { q: { en: "Will someone run the sound during the event?", th: "มีคนคุมเสียงระหว่างงานไหม?" },
      a: { en: "Yes. Every package includes an engineer who stays on site to set up, sound-check and run the mix.",
           th: "มีครับ ทุกแพ็กเกจมีซาวด์เอนจิเนียร์อยู่หน้างาน ดูแลตั้งแต่ติดตั้ง เช็คเสียง จนจบงาน" } },
    { q: { en: "What's the fastest way to reach you?", th: "ติดต่อช่องทางไหนเร็วที่สุด?" },
      a: { en: `Message us on LINE (${BUSINESS.line}) or call ${BUSINESS.phone}.`, th: `ทัก LINE (${BUSINESS.line}) หรือโทร ${BUSINESS.phone}` } }
  ];
}
function seed() {
  return {
    BUSINESS: clone(BUSINESS),
    HERO_SLIDES: typeof HERO_SLIDES !== "undefined" ? clone(HERO_SLIDES) : [],
    PACKAGES: clone(PACKAGES),
    INVENTORY: clone(INVENTORY),
    PORTFOLIO: clone(PORTFOLIO),
    FAQ: defaultFaq(),
    UI: clone(UI),
    UI_EXTRA: typeof UI_DEFAULTS !== "undefined" ? clone(UI_DEFAULTS) : {}
  };
}

async function load() {
  $("#panel").innerHTML = '<p style="color:var(--mut)">Loading…</p>';
  try {
    const snap = await getDoc(contentRef);
    const base = seed();
    if (snap.exists() && snap.data().json) {
      C = Object.assign(base, JSON.parse(snap.data().json));
      const by = snap.data().updatedBy, at = snap.data().updatedAt?.toDate?.();
      setStatus(at ? `Published ${at.toLocaleString()}` : "Published", "saved");
      showBanner("");
    } else {
      C = base;
      showBanner("This is your website's current content, copied from data.js. Nothing is in the CMS yet. Check it over, then press <b>Save &amp; publish</b> once to start using the CMS.");
      setDirty(true);
    }
  } catch (e) {
    console.error(e);
    $("#panel").innerHTML = "";
    showBanner(`Couldn't read the CMS (${e.code || e.message}). Check that Firestore is turned on and the rules from CMS-SETUP.md are published.`);
    C = seed();
  }
  buildSide();
  show(current);
}

async function save() {
  if (!C || !USER) return;
  const btn = $("#saveBtn"); btn.disabled = true; btn.textContent = "Publishing…";
  try {
    const json = JSON.stringify(C);
    await setDoc(contentRef, { json, updatedAt: serverTimestamp(), updatedBy: USER.email });
    addDoc(historyCol, { json, at: serverTimestamp(), by: USER.email }).catch(() => {});
    setDirty(false);
    setStatus("Published just now", "saved");
    showBanner("");
    toast("Published. Your website now shows the changes.");
  } catch (e) {
    console.error(e);
    toast("Couldn't publish: " + (e.code || e.message), true);
    btn.disabled = false;
  } finally { btn.textContent = "Save & publish"; }
}
$("#saveBtn").addEventListener("click", save);
document.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); if (dirty) save(); } });
addEventListener("beforeunload", e => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });

function setDirty(v) {
  dirty = v; $("#saveBtn").disabled = !v;
  if (v) setStatus("Unsaved changes", "dirty");
}
function setStatus(txt, cls) { const s = $("#status"); s.textContent = txt; s.className = "status " + (cls || ""); }
function showBanner(html) { const b = $("#banner"); b.innerHTML = html; b.hidden = !html; }
const changed = () => setDirty(true);

/* ---------- photo upload ---------- */
async function compress(file) {
  if (!/^image\//.test(file.type)) throw new Error("Please choose an image file.");
  if (file.type === "image/png" && file.size < 900 * 1024) return { blob: file, type: "image/png", ext: "png" };
  const bmp = await createImageBitmap(file);
  const max = 1800, k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const cv = Object.assign(document.createElement("canvas"), { width: Math.round(bmp.width * k), height: Math.round(bmp.height * k) });
  cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
  const blob = await new Promise(r => cv.toBlob(r, "image/jpeg", .86));
  return { blob, type: "image/jpeg", ext: "jpg" };
}
async function upload(file) {
  if (!storage) throw new Error("Photo storage isn't set up yet.");
  const { blob, type, ext } = await compress(file);
  const name = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "photo";
  const r = ref(storage, `uploads/${Date.now()}-${name}.${ext}`);
  await uploadBytes(r, blob, { contentType: type, cacheControl: "public,max-age=31536000" });
  return await getDownloadURL(r);
}
function pickFile(multiple = false) {
  return new Promise(res => {
    const i = el("input", { type: "file", accept: "image/*", multiple });
    i.addEventListener("change", () => res([...i.files]));
    i.click();
  });
}
function uploadError(e) {
  console.error(e);
  const code = e.code || "";
  if (/unauthorized|402|403|bucket|unknown|no-default-bucket|retry-limit/.test(code + " " + e.message))
    toast("Photo upload isn't available yet. Turn on Storage (needs the Blaze plan) and publish the storage rules, see CMS-SETUP.md.", true);
  else toast("Upload failed: " + (code || e.message), true);
}

/* ---------- field builders: each edits holder[key] ---------- */
const F = {
  text: (label, o = {}) => ({ t: "text", label, ...o }),
  long: (label, o = {}) => ({ t: "text", long: true, label, ...o }),
  bi: (label, o = {}) => ({ t: "bi", label, ...o }),
  biLong: (label, o = {}) => ({ t: "bi", long: true, label, ...o }),
  img: (label, o = {}) => ({ t: "img", label, ...o }),
  bool: (label, o = {}) => ({ t: "bool", label, ...o }),
  select: (label, options, o = {}) => ({ t: "select", label, options, ...o }),
  list: (label, of, o = {}) => ({ t: "list", label, of, ...o }),
  obj: (label, fields, o = {}) => ({ t: "obj", label, fields, ...o })
};

function field(s, holder, key) {
  const wrap = el("div", { class: "field" });
  const lab = s.label ? el("label", { class: "label" }, s.label, s.hint ? el("small", {}, s.hint) : null) : null;
  if (lab && s.t !== "bool" && s.t !== "list" && s.t !== "obj") wrap.append(lab);

  if (s.t === "text") {
    const v = holder[key] ?? "";
    const inp = s.long ? el("textarea", { rows: 3 }) : el("input", { type: s.type || "text", placeholder: s.placeholder || "" });
    inp.value = v;
    inp.addEventListener("input", () => { holder[key] = inp.value; changed(); s.onInput && s.onInput(); });
    wrap.append(inp);
  }
  else if (s.t === "bi") {
    let v = holder[key];
    if (!v || typeof v !== "object") v = { en: v ?? "", th: v ?? "" };
    const row = el("div", { class: "bi" });
    // while English and Thai are the same (prices, model names), typing English updates Thai too
    let linked = (v.en ?? "") === (v.th ?? "") && (v.en ?? "") !== "";
    const inputs = {};
    ["en", "th"].forEach(lang => {
      const inp = s.long ? el("textarea", { rows: 3 }) : el("input", { type: "text" });
      inp.value = v[lang] ?? "";
      inputs[lang] = inp;
      inp.addEventListener("input", () => {
        const cur = (holder[key] && typeof holder[key] === "object") ? holder[key] : { en: v.en ?? "", th: v.th ?? "" };
        cur[lang] = inp.value;
        if (lang === "th") linked = false;
        else if (linked) { cur.th = inp.value; inputs.th.value = inp.value; }
        holder[key] = cur; changed(); s.onInput && s.onInput();
      });
      row.append(el("div", { class: "lang" }, inp, el("span", {}, lang === "en" ? "EN" : "ไทย")));
    });
    wrap.append(row);
  }
  else if (s.t === "bool") {
    const inp = el("input", { type: "checkbox" }); inp.checked = !!holder[key];
    inp.addEventListener("change", () => { holder[key] = inp.checked; changed(); s.onInput && s.onInput(); });
    wrap.append(el("label", { class: "check" }, inp, s.label));
  }
  else if (s.t === "select") {
    const sel = el("select");
    const opts = [...new Set([...(typeof s.options === "function" ? s.options() : s.options), holder[key]].filter(Boolean))];
    opts.forEach(o => sel.append(el("option", { value: o }, o)));
    sel.value = holder[key] ?? opts[0];
    sel.addEventListener("change", () => { holder[key] = sel.value; changed(); s.onInput && s.onInput(); });
    wrap.append(sel);
  }
  else if (s.t === "img") {
    wrap.append(imageField(holder, key, s));
  }
  else if (s.t === "obj") {
    if (s.label) wrap.append(el("div", { class: "group-title" }, s.label));
    if (!holder[key] || typeof holder[key] !== "object") holder[key] = {};
    const box = el("div", { class: s.label ? "group" : "" });
    renderFields(box, s.fields, holder[key]);
    wrap.append(box);
  }
  else if (s.t === "list") {
    if (lab) wrap.append(lab);
    if (!Array.isArray(holder[key])) holder[key] = [];
    wrap.append(listField(s, holder[key]));
  }
  return wrap;
}

function renderFields(box, fields, obj) {
  fields.forEach(([key, s]) => {
    if (s.row) { // two fields side by side
      const g = el("div", { class: "grid2" });
      s.row.forEach(([k2, s2]) => g.append(field(s2, obj, k2)));
      box.append(g);
    } else box.append(field(s, obj, key));
  });
}

function imageField(holder, key, s) {
  const thumb = el("div", { class: "thumb" });
  const inp = el("input", { type: "text", placeholder: "images/… or https://…" });
  const paint = () => {
    const v = holder[key];
    thumb.style.backgroundImage = v ? `url("${src(v)}")` : "";
    thumb.textContent = v ? "" : "No photo";
  };
  inp.value = holder[key] ?? "";
  inp.addEventListener("input", () => { holder[key] = inp.value.trim(); paint(); changed(); s.onInput && s.onInput(); });
  const up = el("button", { class: "btn ghost sm", type: "button", onclick: async () => {
    const [file] = await pickFile(); if (!file) return;
    up.disabled = true; up.textContent = "Uploading…";
    try { const url = await upload(file); holder[key] = url; inp.value = url; paint(); changed(); s.onInput && s.onInput(); toast("Photo uploaded. Press Save & publish to use it."); }
    catch (e) { uploadError(e); }
    finally { up.disabled = false; up.textContent = "Upload photo"; }
  } }, "Upload photo");
  const clear = el("button", { class: "btn ghost sm", type: "button", onclick: () => { holder[key] = ""; inp.value = ""; paint(); changed(); } }, "Remove");
  paint();
  thumb.addEventListener("error", () => {});
  return el("div", { class: "img-field" }, thumb,
    el("div", { class: "img-side" }, inp, el("div", { class: "img-actions" }, up, clear),
      el("span", { class: "upload-note" }, "Photos from your phone are resized automatically.")));
}

/* lists of simple values, photos, or cards */
function listField(s, arr) {
  const box = el("div");
  const draw = () => {
    box.innerHTML = "";
    const of = s.of;
    const move = (i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; changed(); draw(); s.onChange && s.onChange(); };
    const del = i => { if (of.t === "obj" && !confirm(`Delete "${tt(s.title ? s.title(arr[i]) : "") || "this item"}"?`)) return; arr.splice(i, 1); changed(); draw(); s.onChange && s.onChange(); };

    if (of.t === "img") {
      const grid = el("div", { class: "chips-list" });
      arr.forEach((v, i) => {
        const th = el("div", { class: "thumb" }); th.style.backgroundImage = `url("${src(v)}")`;
        grid.append(el("div", { class: "tile" }, th, el("div", { class: "row" },
          el("button", { class: "icon-btn", type: "button", title: "Move left", disabled: i === 0, onclick: () => move(i, -1) }, "←"),
          el("button", { class: "icon-btn", type: "button", title: "Move right", disabled: i === arr.length - 1, onclick: () => move(i, 1) }, "→"),
          el("button", { class: "icon-btn", type: "button", title: "Remove", onclick: () => del(i) }, "✕"))));
      });
      box.append(grid);
      const upl = el("button", { class: "btn ghost sm", type: "button", onclick: async () => {
        const files = await pickFile(true); if (!files.length) return;
        upl.disabled = true;
        for (const [n, f] of files.entries()) {
          upl.textContent = `Uploading ${n + 1}/${files.length}…`;
          try { arr.push(await upload(f)); changed(); } catch (e) { uploadError(e); break; }
        }
        upl.disabled = false; upl.textContent = "Upload photos"; draw(); s.onChange && s.onChange();
      } }, "Upload photos");
      const byPath = el("button", { class: "btn ghost sm", type: "button", onclick: () => {
        const p = prompt("Photo path or link (for example images/events/IMG_6320.JPG):"); if (!p) return;
        arr.push(p.trim()); changed(); draw(); s.onChange && s.onChange();
      } }, "Add by path");
      box.append(el("div", { class: "add-row" }, upl, byPath));
      return;
    }

    if (of.t === "text" || of.t === "bi") {
      const list = el("div", { class: "simple-list" });
      arr.forEach((v, i) => {
        const f = field({ ...of, label: "" }, arr, i);
        f.classList.add("grow"); f.style.marginBottom = "0";
        list.append(el("div", { class: "simple-row" }, f,
          el("button", { class: "icon-btn", type: "button", title: "Move up", disabled: i === 0, onclick: () => move(i, -1) }, "↑"),
          el("button", { class: "icon-btn", type: "button", title: "Move down", disabled: i === arr.length - 1, onclick: () => move(i, 1) }, "↓"),
          el("button", { class: "icon-btn", type: "button", title: "Remove", onclick: () => del(i) }, "✕")));
      });
      box.append(list);
      box.append(el("div", { class: "add-row" }, el("button", { class: "btn ghost sm", type: "button", onclick: () => {
        arr.push(of.t === "bi" ? { en: "", th: "" } : ""); changed(); draw();
        box.querySelectorAll("input, textarea")[box.querySelectorAll(".simple-row").length * (of.t === "bi" ? 2 : 1) - (of.t === "bi" ? 2 : 1)]?.focus();
      } }, s.addLabel || "+ Add line")));
      return;
    }

    // cards
    const list = el("div", { class: "list" });
    arr.forEach((item, i) => {
      const card = el("div", { class: "item" + (s._open === i ? " open" : "") });
      const mini = s.thumb ? el("span", { class: "mini" }) : null;
      const ttl = el("div", { class: "ttl" }, el("b"), el("span"));
      const paintHead = () => {
        ttl.firstChild.textContent = tt(s.title(item)) || "Untitled";
        ttl.lastChild.textContent = s.sub ? tt(s.sub(item)) : "";
        if (mini) mini.style.backgroundImage = s.thumb(item) ? `url("${src(s.thumb(item))}")` : "";
      };
      const head = el("div", { class: "item-head", onclick: e => { if (e.target.closest(".tools")) return; card.classList.toggle("open"); s._open = card.classList.contains("open") ? i : null; } },
        el("span", { class: "chev" }, "›"), mini, ttl,
        el("div", { class: "tools" },
          el("button", { class: "icon-btn", type: "button", title: "Move up", disabled: i === 0, onclick: () => move(i, -1) }, "↑"),
          el("button", { class: "icon-btn", type: "button", title: "Move down", disabled: i === arr.length - 1, onclick: () => move(i, 1) }, "↓"),
          el("button", { class: "icon-btn", type: "button", title: "Duplicate", onclick: () => { arr.splice(i + 1, 0, clone(item)); s._open = i + 1; changed(); draw(); s.onChange && s.onChange(); } }, "⧉"),
          el("button", { class: "icon-btn", type: "button", title: "Delete", onclick: () => del(i) }, "✕")));
      const body = el("div", { class: "item-body" });
      const fields = of.fields.map(([k, fs]) => [k, { ...fs, onInput: paintHead }]);
      renderFields(body, fields, item);
      paintHead();
      card.append(head, body);
      list.append(card);
    });
    box.append(list);
    box.append(el("div", { class: "add-row" }, el("button", { class: "btn ghost sm", type: "button", onclick: () => {
      arr.push(s.template ? s.template() : {}); s._open = arr.length - 1; changed(); draw(); s.onChange && s.onChange();
      box.querySelector(".item.open")?.scrollIntoView({ behavior: "smooth", block: "center" });
    } }, s.addLabel || "+ Add")));
  };
  draw();
  return box;
}

/* generic editor for the website text tree (UI / UI_EXTRA) */
const NAMES = {
  nav: "Menu", hero: "Opening screen", stats: "Numbers", statsLong: "Numbers", packages: "Packages", inventory: "Gear", categories: "Gear categories",
  portfolio: "Past events", about: "Why us & steps", footer: "Footer", intro: "Intro heading", worries: "Worries (tape notes)", process: "Booking steps",
  fastwork: "Fastwork badge", faq: "FAQ section", contact: "Contact section", win: "Event sheet window", pkgStats: "Package card labels",
  brands: "Brand row", services: "Service cards", figs: "Drawings (FIG)", points: "Reasons", steps: "Steps", words: "Changing words", notes: "Tape notes"
};
const nice = k => NAMES[k] || String(k).replace(/([a-z])([A-Z0-9])/g, "$1 $2").replace(/^./, c => c.toUpperCase());

function treeField(holder, key, label) {
  const v = holder[key];
  if (isBi(v)) return field(F.bi(label, { long: (v.en || "").length > 70 }), holder, key);
  if (typeof v === "string" || typeof v === "number") return field(F.text(label, { long: String(v).length > 70 }), holder, key);
  if (typeof v === "boolean") return field(F.bool(label), holder, key);
  if (Array.isArray(v)) {
    if (v.every(x => typeof x === "string")) return field(F.list(label, F.text("")), holder, key);
    if (v.every(isBi)) return field(F.list(label, F.bi("")), holder, key);
    if (v.length && !isBi(v[0]) && typeof v[0] === "object" && !Array.isArray(v[0]) && v.every(x => isBi(x) === false && typeof x === "object")) {
      const keys = Object.keys(v[0]);
      const of = F.obj("", keys.map(k => [k, isBi(v[0][k]) ? F.bi(nice(k)) : F.text(nice(k))]));
      return field(F.list(label, of, { title: it => it[keys[0]], template: () => Object.fromEntries(keys.map(k => [k, isBi(v[0][k]) ? { en: "", th: "" } : ""])) }), holder, key);
    }
    // anything else (like pairs): show each entry as a group
    const box = el("div", { class: "field" }, el("label", { class: "label" }, label));
    const g = el("div", { class: "group" });
    v.forEach((x, i) => {
      if (Array.isArray(x)) { const row = el("div", { class: "grid2" }); x.forEach((_, j) => row.append(treeField(x, j, ""))); g.append(row); }
      else g.append(treeField(v, i, `${i + 1}`));
    });
    box.append(g); return box;
  }
  if (v && typeof v === "object") {
    const d = el("details", { class: "tree" }, el("summary", {}, label));
    const body = el("div", { class: "tree-body" });
    Object.keys(v).forEach(k => body.append(treeField(v, k, nice(k))));
    d.append(body); return d;
  }
  return el("div");
}

/* ---------- sections ---------- */
const catOptions = () => Object.keys((C.UI && C.UI.categories) || {}).filter(k => k !== "All").concat(["Speakers", "Amplifiers", "Mixers", "Microphones", "Lighting", "Accessories"]);
const blankBi = () => ({ en: "", th: "" });

const SECTIONS = {
  business: {
    name: "Business & contact", desc: "Your name, headline, numbers and how customers reach you.",
    render: p => {
      const b = C.BUSINESS;
      const card1 = el("div", { class: "card" }); renderFields(card1, [
        ["name", F.text("Business name")],
        ["logo", F.img("Logo")],
        ["tagline", F.bi("Main headline", { hint: "shown at the top of the opening screen" })],
        ["subtitle", F.biLong("Short description under the headline")],
        ["_n", { row: [["yearsExperience", F.bi("Years of experience", { hint: "e.g. 30 ปี" })], ["eventsDone", F.bi("Events done", { hint: "e.g. 200 งาน" })]] }]
      ], b);
      const card2 = el("div", { class: "card" }); renderFields(card2, [
        ["_c", { row: [["phone", F.text("Phone", { type: "tel" })], ["line", F.text("LINE ID", { placeholder: "@jkmusic" })]] }],
        ["email", F.text("Email", { type: "email" })],
        ["hours", F.bi("Opening hours")],
        ["address", F.bi("Address or service area", { hint: "optional" })]
      ], b);
      const card3 = el("div", { class: "card" }); renderFields(card3, [
        ["fastwork", F.text("Fastwork link", { type: "url" })],
        ["facebook", F.text("Facebook link", { type: "url" })],
        ["instagram", F.text("Instagram link", { type: "url" })],
        ["youtube", F.text("YouTube link", { type: "url" })]
      ], b);
      p.append(card1, card2, card3);
    }
  },
  hero: {
    name: "Opening photos", desc: "Photos that float on the opening screen and appear in the background of the contact section. The first four are used on the opening screen.",
    render: p => { const c = el("div", { class: "card" }); c.append(field(F.list("", F.img("")), C, "HERO_SLIDES")); p.append(c); }
  },
  packages: {
    name: "Packages", desc: "Your ready-made sets. Drag order with the arrows; the one marked Most Popular is highlighted.",
    count: () => C.PACKAGES.length,
    render: p => p.append(field(F.list("", F.obj("", [
      ["name", F.bi("Package name")],
      ["forWho", F.bi("Who it's for", { hint: "e.g. Weddings · 100–400 guests" })],
      ["_p", { row: [["price", F.bi("Price", { hint: "e.g. ฿5,500" })], ["priceNote", F.bi("Price note", { hint: "e.g. per queue" })]] }],
      ["featured", F.bool("Most Popular (highlight this package)")],
      ["image", F.img("Photo", { hint: "optional, an event photo is used if empty" })],
      ["includes", F.list("What's included", F.bi(""), { addLabel: "+ Add item" })],
      ["best", F.biLong("Best for")]
    ]), { title: it => it.name, sub: it => [tt(it.price), it.featured ? "Most Popular" : ""].filter(Boolean).join("  ·  "), thumb: it => it.image,
      addLabel: "+ Add package",
      template: () => ({ name: blankBi(), forWho: blankBi(), price: blankBi(), priceNote: { en: "per queue", th: "ต่อคิว" }, featured: false, image: "", includes: [], best: blankBi() }) }), C, "PACKAGES"))
  },
  inventory: {
    name: "Gear", desc: "Everything in your inventory. Each item opens a popup with its specs on the website.",
    count: () => C.INVENTORY.length,
    render: p => p.append(field(F.list("", F.obj("", [
      ["_g", { row: [["name", F.text("Name", { hint: "brand + model" })], ["category", F.select("Category", catOptions)]] }],
      ["image", F.img("Photo")],
      ["desc", F.biLong("Short description")],
      ["specs", F.list("Specifications", F.bi(""), { addLabel: "+ Add spec" })]
    ]), { title: it => it.name, sub: it => it.category, thumb: it => it.image, addLabel: "+ Add gear",
      template: () => ({ name: "", category: "Speakers", image: "", desc: blankBi(), specs: [] }) }), C, "INVENTORY"))
  },
  portfolio: {
    name: "Past events", desc: "Jobs you've done. The first photo is the cover; extra photos show in the popup gallery.",
    count: () => C.PORTFOLIO.length,
    render: p => p.append(field(F.list("", F.obj("", [
      ["title", F.bi("Event name")],
      ["_e", { row: [["event", F.bi("Type of event")], ["location", F.bi("Location")]] }],
      ["year", F.text("Year")],
      ["image", F.img("Cover photo")],
      ["gallery", F.list("More photos", F.img(""))],
      ["setup", F.list("System used", F.bi(""), { addLabel: "+ Add line" })],
      ["tags", F.list("Tags", F.bi(""), { addLabel: "+ Add tag", hint: "e.g. 200 guests, Live band" })]
    ]), { title: it => it.title, sub: it => [tt(it.event), tt(it.location), it.year].filter(Boolean).join(", "), thumb: it => it.image,
      addLabel: "+ Add event",
      template: () => ({ title: blankBi(), event: blankBi(), location: blankBi(), year: String(new Date().getFullYear()), image: "", gallery: [], setup: [], tags: [] }) }), C, "PORTFOLIO"))
  },
  faq: {
    name: "FAQ", desc: "Questions and answers shown near the bottom of the page.",
    count: () => C.FAQ.length,
    render: p => p.append(field(F.list("", F.obj("", [["q", F.bi("Question")], ["a", F.biLong("Answer")]]),
      { title: it => it.q, addLabel: "+ Add question", template: () => ({ q: blankBi(), a: blankBi() }) }), C, "FAQ"))
  },
  text: {
    name: "Website text", desc: "Menu names, section titles, buttons and other wording. Each part opens to show the English and Thai text.",
    render: p => Object.keys(C.UI).forEach(k => p.append(treeField(C.UI, k, nice(k))))
  },
  extra: {
    name: "More text", desc: "Wording for the newer parts of the page: the changing headline words, tape notes, event-sheet window, booking steps and contact section.",
    render: p => Object.keys(C.UI_EXTRA).forEach(k => p.append(treeField(C.UI_EXTRA, k, nice(k))))
  },
  backup: {
    name: "Backup & history", desc: "Every publish is saved. Restore an older version, or download a copy for safekeeping.",
    render: async p => {
      const actions = el("div", { class: "card" },
        el("div", { class: "field" }, el("label", { class: "label" }, "Download"),
          el("div", { class: "img-actions" },
            el("button", { class: "btn ghost sm", type: "button", onclick: () => download("jkmusic-content.json", JSON.stringify(C, null, 2), "application/json") }, "Download backup (.json)"),
            el("button", { class: "btn ghost sm", type: "button", onclick: () => download("data.js", toDataJs(C), "text/javascript") }, "Download as data.js"))),
        el("div", { class: "field" }, el("label", { class: "label" }, "Restore from a file"),
          el("button", { class: "btn ghost sm", type: "button", onclick: importJson }, "Open backup (.json)")),
        el("div", { class: "field" }, el("label", { class: "label" }, "Start over"),
          el("button", { class: "btn danger sm", type: "button", onclick: () => {
            if (!confirm("Replace everything in the editor with the content from data.js? Nothing changes on the website until you publish.")) return;
            C = seed(); changed(); show(current); toast("Loaded data.js. Press Save & publish to use it.");
          } }, "Load content from data.js")));
      const hist = el("div", { class: "history" }, el("p", { style: "color:var(--mut)" }, "Loading history…"));
      p.append(actions, el("h3", { style: "font-weight:600;margin:24px 0 10px" }, "Published versions"), hist);
      try {
        const snaps = await getDocs(query(historyCol, orderBy("at", "desc"), limit(20)));
        hist.innerHTML = "";
        if (snaps.empty) hist.append(el("p", { style: "color:var(--mut)" }, "No versions yet. They appear here each time you publish."));
        snaps.forEach(s => {
          const d = s.data(); const at = d.at?.toDate?.();
          hist.append(el("div", { class: "row" }, el("span", {}, at ? at.toLocaleString() : "Just now", " ", el("small", {}, d.by || "")),
            el("button", { class: "btn ghost sm", type: "button", onclick: () => {
              if (dirty && !confirm("Your unsaved changes will be replaced. Continue?")) return;
              C = Object.assign(seed(), JSON.parse(d.json)); changed(); show("business");
              toast("Older version loaded. Check it, then press Save & publish to put it live.");
            } }, "Restore")));
        });
      } catch (e) { hist.innerHTML = ""; hist.append(el("p", { style: "color:var(--mut)" }, "History isn't available: " + (e.code || e.message))); }
    }
  }
};

function download(name, text, type) {
  const a = el("a", { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  document.body.append(a); a.click(); a.remove();
}
async function importJson() {
  const i = el("input", { type: "file", accept: ".json,application/json" });
  i.addEventListener("change", async () => {
    try {
      const data = JSON.parse(await i.files[0].text());
      if (!data.BUSINESS || !data.PACKAGES) throw new Error("This doesn't look like a JKMusic backup.");
      C = Object.assign(seed(), data); changed(); show("business"); toast("Backup loaded. Press Save & publish to put it live.");
    } catch (e) { toast(e.message, true); }
  });
  i.click();
}
function toDataJs(c) {
  const j = v => JSON.stringify(v, null, 2);
  return `/* JKMusic content, exported from the CMS on ${new Date().toLocaleString()} */
const HERO_SLIDES = ${j(c.HERO_SLIDES)};
const SLIDE_SECONDS = 7;

const BUSINESS = ${j(c.BUSINESS)};

const PACKAGES = ${j(c.PACKAGES)};

const INVENTORY = ${j(c.INVENTORY)};

const PORTFOLIO = ${j(c.PORTFOLIO)};

const UI = ${j(c.UI)};

const FAQ = ${j(c.FAQ)};
`;
}

function buildSide() {
  const side = $("#side"); side.innerHTML = "";
  const groups = [["business", "hero"], ["packages", "inventory", "portfolio", "faq"], ["text", "extra"], ["backup"]];
  groups.forEach((g, gi) => {
    if (gi) side.append(el("hr"));
    g.forEach(id => {
      const s = SECTIONS[id];
      side.append(el("button", { class: id === current ? "on" : "", "data-id": id, onclick: () => { show(id); side.classList.remove("open"); } },
        s.name, s.count ? el("small", {}, String(s.count())) : null));
    });
  });
}
$("#menuBtn").addEventListener("click", () => $("#side").classList.toggle("open"));

function show(id) {
  current = id;
  buildSide();
  document.querySelectorAll("#side button").forEach(b => b.classList.toggle("on", b.dataset.id === id));
  const s = SECTIONS[id];
  const panel = $("#panel"); panel.innerHTML = "";
  panel.append(el("div", { class: "panel-head" }, el("div", {}, el("h2", {}, s.name), el("p", {}, s.desc))));
  const body = el("div"); panel.append(body);
  s.render(body);
  scrollTo({ top: 0 });
}
