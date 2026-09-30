/* ============================================================
   JK.MUSIC — EDIT EVERYTHING IN THIS FILE ONLY
   Bilingual text:  { en: "English", th: "ไทย" }
   Same in both:    "just a plain string"
   ============================================================ */

/* ---------------- HERO SLIDESHOW ----------------
   Put your photos in an "images/hero/" folder next to index.html,
   named slide1.jpg, slide2.jpg, slide3.jpg (or edit the paths below
   to match your own filenames). Add or remove lines to change how
   many slides show. Landscape photos, ~1600px wide, work best.
-------------------------------------------------- */
const HERO_SLIDES = [
  "images/hero/slide1.jpg",
  "images/hero/slide2.jpg",
  "images/hero/slide3.jpg"
];
const SLIDE_SECONDS = 5; // how long each slide stays up before crossfading

const BUSINESS = {
  name: "JKMusic",
  logo: "images/logo.png",              // leave as-is; falls back to a mark if missing
  tagline:  { en: "Complete Sound System Packages", th: "บริการเช่าเครื่องเสียงครบชุด" },
  subtitle: { en: "Turnkey audio, lighting & crew — one price, zero stress",
              th: "บริการให้เช่าเครื่องเสียงระดับมืออาชีพประสบการณ์กว่า 30 ปี หากคุณกำลังมองหาทีมเครื่องเสียงที่ 'ไว้ใจได้' เราพร้อมดูแลคุณ" },
  phone: "+66 89 925 1914",
  line: "@jkmusic",
  email: "jakkrit.kan2510@gmail.com",
  hours:   { en: "Mon–Sun, 9:00 – 20:00", th: "จันทร์–อาทิตย์ 9:00 – 20:00 น." },
  facebook: "https://www.facebook.com/profile.php?id=61588769314954",
  instagram: "https://www.instagram.com/jk.music.karaoke/?utm_source=ig_web_button_share_sheet",
  youtube: "https://www.youtube.com/@JK-music-karaoke",
  fastwork: "https://fastwork.co/byob/eZmj4SQhIu?openExternalBrowser=1&source=byob",   // ← your Fastwork profile URL
  fastworkIcon: {                                        // one icon file per theme, both optional
    dark:  "images/fastwork-dark.png",                   // shown when the site is in dark mode
    light: "images/fastwork-light.png"                   // shown when the site is in light mode
  },
  yearsExperience: { en: "30 Year", th: "30 ปี" },
  eventsDone:      { en: "200 Events", th: "200 งาน" },
};

/* ---------------- PACKAGES (MAIN SERVICE) ----------------
   featured: true  ->  highlighted card + "Most Popular" badge
   Add a package  ->  copy one { ... } block and edit it.
---------------------------------------------------------- */
const PACKAGES = [
  {
    name: { en: "SET Event", th: "SET Event" },
    forWho: { en: "Small parties · Up to 100 guests", th: "งานเล็ก · ขนาดไม่เกิน 100 คน" },
    price: "฿4,500",
    priceNote: { en: "per queue", th: "ต่อคิว" },
    image: "images/packages/essential.jpg",
    featured: false,
    includes: [
      { en: "2× Column speakers on stands", th: "ลำโพงคอลัมน์ 2 ใบ พร้อมขาตั้ง" },
      { en: "1× 12\" subwoofer", th: "ซับวูฟเฟอร์ 12 นิ้ว 1 ใบ" },
      { en: "8-channel mixer", th: "มิกเซอร์ 8 ช่อง" },
      { en: "2× wireless microphones", th: "ไมค์ลอย 2 ตัว" },
      { en: "All cabling & power distro", th: "สายสัญญาณและระบบไฟ" },
      { en: "Delivery, setup & teardown", th: "ขนส่ง ติดตั้ง และรื้อถอน" },
      { en: "Engineer on site", th: "Engineer ดูแลระหว่างงาน" }
    ],
    best: { en: "Birthdays, small weddings, small office parties, folk songs, small seminars",
            th: "งานวันเกิด งานแต่งขนาดเล็ก งานเลี้ยงบริษัทขนาดเล็ก โฟล์คซอง งานสัมมนาขนาดเล็ก" }
  },
  {
    name: { en: "SET 2x2", th: "SET 2x2" },
    forWho: { en: "Weddings & corporate · 100–400 guests", th: "งานแต่ง งานบริษัท · 100–400 คน" },
    price: "฿5,500",
    priceNote: { en: "per queue", th: "ต่อคิว" },
    image: "images/packages/event-pro.jpg",
    featured: true,
    includes: [
      { en: "2× full-range speakers", th: "ลำโพง Full-range 2 ใบ" },
      { en: "2× 18\" subwoofer", th: "ซับวูฟเฟอร์ 18 นิ้ว 2 ใบ" },
      { en: "16-channel mixer", th: "มิกเซอร์ 16 ช่อง" },
      { en: "2× wireless microphones", th: "ไมค์ลอย 2 ตัว" },
      { en: "All cabling & power distro", th: "สายสัญญาณและระบบไฟ" },
      { en: "Delivery, setup & teardown", th: "ขนส่ง ติดตั้ง และรื้อถอน" },
      { en: "Engineer on site", th: "Engineer ดูแลระหว่างงาน" }
    ],
    best: { en: "Wedding receptions, conferences, product launches, gala dinners",
            th: "งานเลี้ยงฉลองมงคลสมรส งานสัมมนา งานเปิดตัวสินค้า งานกาล่าดินเนอร์" }
  },
  {
    name: { en: "SET 4x4", th: "SET 4x4" },
    forWho: { en: "Live shows · 400–600 guests", th: "งานแสดงสด · 400–600 คน" },
    price: { en: "From ฿7,500", th: "เริ่มต้น ฿7,500" },
    priceNote: { en: "per queue", th: "ต่อคิว" },
    image: "images/packages/concert.jpg",
    featured: false,
    includes: [
      { en: "4× full-range speakers", th: "ลำโพง Full-range 4 ใบ" },
      { en: "4× 18\" subwoofer", th: "ซับวูฟเฟอร์ 18 นิ้ว 4 ใบ" },
      { en: "16-channel mixer", th: "มิกเซอร์ 16 ช่อง" },
      { en: "4× wireless microphones", th: "ไมค์ลอย 4 ตัว" },
      { en: "All cabling & power distro", th: "สายสัญญาณและระบบไฟ" },
      { en: "Delivery, setup & teardown", th: "ขนส่ง ติดตั้ง และรื้อถอน" },
      { en: "Engineer on site", th: "Engineer ดูแลระหว่างงาน" }
    ],
    best: { en: "Mini Concerts, outdoor events, school/uni shows",
            th: "มินิคอนเสิร์ต งานกลางแจ้ง งานโรงเรียน/มหาวิทยาลัย" }
  },
  {
    name: { en: "Custom Build", th: "จัดชุดตามสั่ง" },
    forWho: { en: "Anything that doesn't fit a box", th: "งานที่ต้องออกแบบเฉพาะ" },
    price: { en: "Free quote", th: "ประเมินราคาฟรี" },
    priceNote: { en: "tailored to you", th: "ออกแบบเฉพาะงานคุณ" },
    image: "images/packages/custom.jpg",
    featured: false,
    includes: [
      { en: "Site visit & acoustic assessment", th: "เข้าสำรวจหน้างานและประเมินอะคูสติก" },
      { en: "System designed around your venue", th: "ออกแบบระบบให้เหมาะกับสถานที่" },
      { en: "Multi-day / multi-stage support", th: "รองรับงานหลายวัน / หลายเวที" },
      { en: "Recording & live stream audio feed", th: "ระบบบันทึกเสียงและส่งเสียงไลฟ์สตรีม" },
      { en: "Backup rig on standby", th: "อุปกรณ์สำรองพร้อมใช้" },
      { en: "Flexible crew scaling", th: "ปรับจำนวนทีมงานได้ตามงาน" },
      { en: "Rehearsal day included if needed", th: "รวมวันซ้อมหากต้องการ" },
      { en: "Written technical rider provided", th: "จัดทำเอกสาร Technical Rider ให้" }
    ],
    best: { en: "Multi-day festivals, touring support, unusual venues, hybrid events",
            th: "เทศกาลหลายวัน งานทัวร์ สถานที่พิเศษ งานไฮบริด" }
  }
];

/* ---------------- INVENTORY (SHOWCASE SECTION) ----------------
   Shown in the "Inventory" section as a browsable gallery — no
   price or Enquire button. Edit this list independently of RENTAL below.
   category must be one of: Speakers, Amplifiers, Mixers, Microphones, Lighting, Accessories
------------------------------------------------------------------ */
const INVENTORY = [
  {
    name: "JBL PRX715", category: "Speakers",
    image: "images/gear/jbl-prx715.jpg",
    specs: [{ en: "15\" woofer", th: "ดอก 15 นิ้ว" }, { en: "2000W Peak", th: "2000 วัตต์พีค" }, { en: "136 dB SPL", th: "136 ดีเบล" }],
    desc: { en: "15-inch 2-way powered loudspeaker with Class-D amplifier.", th: "ลำโพงแอคทีฟ 2 ทาง 15 นิ้ว พร้อมแอมป์ Class-D ในตัว" }
  },
  {
    name: "VL Audio VIVA715D", category: "Speakers",
    image: "images/gear/vl-audio-viva715d.jpg",
    specs: [{ en: "15\" woofer", th: "ดอก 15 นิ้ว" }, { en: "1400W Peak", th: "1400 วัตต์พีค" }, { en: "136 dB SPL", th: "136 ดีเบล" }],
    desc: { en: "15-inch 2-way powered loudspeaker with Class-D amplifier.", th: "ลำโพงแอคทีฟ 2 ทาง 15 นิ้ว พร้อมแอมป์ Class-D ในตัว" }
  },
  {
    name: "Audiocenter MA12", category: "Speakers",
    image: "images/gear/audiocenter-ma12.jpg",
    specs: [{ en: "12\" woofer", th: "ดอก 12 นิ้ว" }, { en: "1000W Peak", th: "1000 วัตต์พีค" }, { en: "Bi-amp Class-D", th: "ไบแอมป์ Class-D" }],
    desc: { en: "Compact 12-inch 2-way powered loudspeaker for mid-size stages.", th: "ลำโพงแอคทีฟ 2 ทาง 12 นิ้ว ขนาดกะทัดรัด เหมาะกับเวทีขนาดกลาง" }
  },
  {
    name: "Wharfedale Pro SH1564", category: "Speakers",
    image: "images/gear/wharfedale-sh1564.jpg",
    specs: [{ en: "15\" woofer", th: "ดอก 15 นิ้ว" }, { en: "500W Programme", th: "500 วัตต์ (Programme)" }, { en: "Passive 2-way", th: "พาสซีฟ 2 ทาง" }],
    desc: { en: "Passive 15-inch 2-way speaker cabinet for use with an external amp.", th: "ตู้ลำโพงพาสซีฟ 2 ทาง 15 นิ้ว ใช้งานคู่กับแอมป์ภายนอก" }
  },
  {
    name: "JBL SRX715", category: "Speakers",
    image: "images/gear/jbl-srx715.jpg",
    specs: [{ en: "15\" woofer", th: "ดอก 15 นิ้ว" }, { en: "800W Programme", th: "800 วัตต์ (Programme)" }, { en: "Passive 2-way", th: "พาสซีฟ 2 ทาง" }],
    desc: { en: "Passive 15-inch 2-way top for touring-grade sound reinforcement.", th: "ตู้ลำโพงพาสซีฟ 2 ทาง 15 นิ้ว สำหรับงานระดับทัวร์ริ่ง" }
  },
  {
    name: "De acoustic H212", category: "Speakers",
    image: "images/gear/de-acoustic-h212.jpg",
    specs: [{ en: "Dual 12\" woofers", th: "ดอก 12 นิ้ว คู่" }, { en: "Horn-loaded", th: "ระบบฮอร์น" }, { en: "High SPL output", th: "SPL สูง" }],
    desc: { en: "Horn-loaded dual-12 speaker built for high output at long throw.", th: "ลำโพงฮอร์นคู่ 12 นิ้ว ให้เสียงดังและไปได้ไกล" }
  },
  {
    name: "Audiocenter MA118", category: "Speakers",
    image: "images/gear/audiocenter-ma118.jpg",
    specs: [{ en: "18\" powered sub", th: "ซับแอคทีฟ 18 นิ้ว" }, { en: "High output DSP", th: "DSP กำลังขับสูง" }, { en: "Deep low end", th: "เสียงเบสลึก" }],
    desc: { en: "18-inch powered subwoofer with onboard DSP for deep, controlled bass.", th: "ซับวูฟเฟอร์แอคทีฟ 18 นิ้ว มี DSP ในตัว ให้เสียงเบสลึกและควบคุมได้ดี" }
  },
  {
    name: "Yamaha DXS12Mkii", category: "Speakers",
    image: "images/gear/yamaha-dxs12mkii.jpg",
    specs: [{ en: "12\" powered sub", th: "ซับแอคทีฟ 12 นิ้ว" }, { en: "1000W Class-D", th: "1000 วัตต์ Class-D" }, { en: "Compact footprint", th: "ขนาดกะทัดรัด" }],
    desc: { en: "Compact 12-inch powered subwoofer, easy to transport and stack.", th: "ซับวูฟเฟอร์แอคทีฟ 12 นิ้ว ขนาดกะทัดรัด ขนย้ายและวางซ้อนง่าย" }
  },
  {
    name: "Wharfedale Pro Delta-X18B", category: "Speakers",
    image: "images/gear/wharfedale-deltax18b.jpg",
    specs: [{ en: "18\" passive sub", th: "ซับพาสซีฟ 18 นิ้ว" }, { en: "High power handling", th: "รับกำลังวัตต์สูง" }, { en: "Bass reflex", th: "ระบบเบสรีเฟล็กซ์" }],
    desc: { en: "Passive 18-inch subwoofer for heavy low-end reinforcement.", th: "ซับวูฟเฟอร์พาสซีฟ 18 นิ้ว เสริมเสียงเบสหนักแน่น" }
  },
  {
    name: "Yamaha T5n", category: "Amplifiers",
    image: "images/gear/yamaha-t5n.jpg",
    specs: [{ en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" }, { en: "Class-D", th: "Class-D" }, { en: "Rack mount", th: "ติดตั้งแบบแร็ค" }],
    desc: { en: "2-channel power amplifier for driving passive tops or subs.", th: "แอมป์ขยายเสียง 2 ชาแนล สำหรับขับลำโพงพาสซีฟหรือซับ" }
  },
  {
    name: "TDK TD26", category: "Amplifiers",
    image: "images/gear/tdk-td26.jpg",
    specs: [{ en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" }, { en: "DSP built-in", th: "มี DSP ในตัว" }, { en: "Rack mount", th: "ติดตั้งแบบแร็ค" }],
    desc: { en: "Reliable rack-mount power amp with onboard DSP.", th: "แอมป์ขยายเสียงแบบติดแร็ค มี DSP ในตัว เสถียรใช้งานง่าย" }
  },
  {
    name: "QSC GX5", category: "Amplifiers",
    image: "images/gear/qsc-gx5.jpg",
    specs: [{ en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" }, { en: "500W @ 4Ω / ch", th: "500 วัตต์ @ 4Ω / ชาแนล" }, { en: "Class-H", th: "Class-H" }],
    desc: { en: "Compact 2-channel power amplifier, great for smaller rigs.", th: "แอมป์ขยายเสียง 2 ชาแนล ขนาดกะทัดรัด เหมาะกับชุดเครื่องเสียงขนาดเล็ก" }
  },
  {
    name: "Dynacord CMS1600-2", category: "Mixers",
    image: "images/gear/dynacord-cms1600-2.jpg",
    specs: [{ en: "16 channels", th: "16 ช่อง" }, { en: "Built-in effects", th: "เอฟเฟกต์ในตัว" }, { en: "Mono/stereo out", th: "เอาต์พุตโมโน/สเตอริโอ" }],
    desc: { en: "16-channel analogue mixer with built-in effects for live sound.", th: "มิกเซอร์อนาล็อก 16 ช่อง มีเอฟเฟกต์ในตัว เหมาะกับงานเสียงสด" }
  },
  {
    name: "Mackie ProFX16v2", category: "Mixers",
    image: "images/gear/mackie-profx16v2.jpg",
    specs: [{ en: "16 channels", th: "16 ช่อง" }, { en: "Built-in FX", th: "เอฟเฟกต์ในตัว" }, { en: "USB audio interface", th: "อินเทอร์เฟซ USB" }],
    desc: { en: "16-channel mixer with onboard effects and a USB audio interface.", th: "มิกเซอร์ 16 ช่อง มีเอฟเฟกต์และอินเทอร์เฟซ USB ในตัว" }
  },
  {
    name: "Shure SLX4", category: "Microphones",
    image: "images/gear/shure-slx4.jpg",
    specs: [{ en: "UHF wireless receiver", th: "ตัวรับสัญญาณไร้สาย UHF" }, { en: "Pairs with handheld/lapel", th: "ใช้คู่กับไมค์ถือ/หนีบปก" }, { en: "Rack mountable", th: "ติดตั้งแบบแร็คได้" }],
    desc: { en: "Reliable UHF wireless receiver for handheld or lapel mic systems.", th: "ตัวรับสัญญาณไร้สายระบบ UHF ที่เชื่อถือได้ ใช้กับชุดไมค์ถือหรือหนีบปก" }
  },
  {
    name: "Shure SM58", category: "Microphones",
    image: "images/gear/shure-sm58.jpg",
    specs: [{ en: "Dynamic cardioid", th: "ไดนามิก คาร์ดิออยด์" }, { en: "Vocal-tuned", th: "จูนมาเพื่อเสียงร้อง" }, { en: "Rugged build", th: "โครงสร้างทนทาน" }],
    desc: { en: "The world's most popular vocal microphone — durable and reliable.", th: "ไมค์เสียงร้องที่นิยมที่สุดในโลก ทนทานและเชื่อถือได้" }
  },
  {
    name: "Behringer BC1200", category: "Microphones",
    image: "images/gear/behringer-bc1200.jpg",
    specs: [{ en: "Boundary/condenser mic", th: "ไมค์คอนเดนเซอร์แบบวางพื้นผิว" }, { en: "Wide pickup pattern", th: "รับเสียงมุมกว้าง" }, { en: "Low profile", th: "ทรงเตี้ยไม่เกะกะ" }],
    desc: { en: "Low-profile boundary mic for panel discussions and conferences.", th: "ไมค์ทรงเตี้ยสำหรับงานสัมมนาและงานเสวนา" }
  },
  {
    name: "Dbx 166a", category: "Accessories",
    image: "images/gear/dbx-166a.jpg",
    specs: [{ en: "2-channel compressor/gate", th: "คอมเพรสเซอร์/เกต 2 ชาแนล" }, { en: "OverEasy compression", th: "ระบบ OverEasy" }, { en: "Analogue rack unit", th: "อุปกรณ์แร็คอนาล็อก" }],
    desc: { en: "2-channel compressor/limiter/gate for cleaning up live mixes.", th: "คอมเพรสเซอร์/ลิมิตเตอร์/เกต 2 ชาแนล ช่วยจัดการเสียงมิกซ์สดให้เนียนขึ้น" }
  },
  {
    name: "Behringer VX2000", category: "Accessories",
    image: "images/gear/behringer-vx2000.jpg",
    specs: [{ en: "Vocal channel processor", th: "โปรเซสเซอร์ช่องเสียงร้อง" }, { en: "Compression + EQ", th: "คอมเพรสชัน + EQ" }, { en: "Tube-style warmth", th: "ให้เสียงอุ่นแบบหลอด" }],
    desc: { en: "All-in-one vocal channel processor for a polished live vocal sound.", th: "โปรเซสเซอร์ช่องเสียงร้องแบบครบวงจร ให้เสียงร้องสดที่คมชัดและเป็นมืออาชีพ" }
  }
];

/* ---------------- RENTAL (INDIVIDUAL RENTAL SECTION) ----------------
   Shown in the "Individual Rental" section with price + Enquire button.
   Edit this list independently of INVENTORY above — add, remove, or
   reprice items here without touching the showcase.
   category must be one of: Speakers, Amplifiers, Mixers, Microphones, Lighting, Accessories
---------------------------------------------------------------------- */
const RENTAL = [
  {
    name: "JBL SRX835P", category: "Speakers", price: "฿1,500 / day",
    image: "images/gear/srx835p.jpg",
    specs: [{ en: "3-way powered", th: "แอคทีฟ 3 ทาง" }, { en: "2000W peak", th: "2000 วัตต์พีค" }, { en: "15\" woofer", th: "ดอก 15 นิ้ว" }],
    desc: { en: "Main speaker for crowds up to 800.", th: "ลำโพงหลักรองรับผู้ชมได้ถึง 800 คน" }
  },
  {
    name: "RCF SUB 8004-AS", category: "Speakers", price: "฿1,800 / day",
    image: "images/gear/rcf-sub.jpg",
    specs: [{ en: "18\" sub", th: "ซับ 18 นิ้ว" }, { en: "2500W RMS", th: "2500 วัตต์ RMS" }, { en: "30 Hz low end", th: "ลงลึกถึง 30 Hz" }],
    desc: { en: "Deep low end for EDM, live bands and outdoor shows.", th: "เสียงเบสลึกสำหรับ EDM วงดนตรีสด และงานกลางแจ้ง" }
  },
  {
    name: "Behringer X32 Compact", category: "Mixers", price: "฿1,600 / day",
    image: "images/gear/x32.jpg",
    specs: [{ en: "32 channels", th: "32 ช่อง" }, { en: "iPad control", th: "ควบคุมผ่าน iPad" }, { en: "USB recording", th: "บันทึกผ่าน USB" }],
    desc: { en: "Reliable digital console, easy to operate.", th: "มิกเซอร์ดิจิทัลที่เสถียรและใช้งานง่าย" }
  },
  {
    name: "Crown XTi 4002", category: "Amplifiers", price: "฿900 / day",
    image: "images/gear/crown-xti4002.jpg",
    specs: [{ en: "2× 1200W @ 4Ω", th: "2x 1200 วัตต์ @ 4Ω" }, { en: "DSP built-in", th: "มี DSP ในตัว" }, { en: "Rack mount", th: "ติดตั้งแบบแร็ค" }],
    desc: { en: "Reliable power amp for driving passive tops and subs.", th: "แอมป์ขยายเสียงเสถียร ขับลำโพงพาสซีฟและซับได้ดี" }
  },
  {
    name: "Lab Gruppen PLM 20000Q", category: "Amplifiers", price: "฿2,400 / day",
    image: "images/gear/labgruppen-plm.jpg",
    specs: [{ en: "4× 5000W", th: "4x 5000 วัตต์" }, { en: "Onboard processing", th: "มีระบบประมวลผลในตัว" }, { en: "Dante network audio", th: "รองรับ Dante" }],
    desc: { en: "High-power amplification for line arrays and large subs.", th: "แอมป์กำลังสูงสำหรับไลน์อาเรย์และซับขนาดใหญ่" }
  },
  {
    name: "Shure SM58 (Wired)", category: "Microphones", price: "฿150 / day",
    image: "images/gear/sm58.jpg",
    specs: [{ en: "Dynamic cardioid", th: "ไดนามิก คาร์ดิออยด์" }, { en: "Vocal-tuned", th: "จูนมาเพื่อเสียงร้อง" }, { en: "Stand included", th: "พร้อมขาตั้ง" }],
    desc: { en: "Industry-standard vocal mic — 20 in stock.", th: "ไมค์ร้องมาตรฐานอุตสาหกรรม — มีในสต็อก 20 ตัว" }
  },
  {
    name: "Shure BLX24 Wireless", category: "Microphones", price: "฿600 / day",
    image: "images/gear/blx24.jpg",
    specs: [{ en: "UHF wireless", th: "ไร้สายระบบ UHF" }, { en: "300 ft range", th: "ระยะ 90 เมตร" }, { en: "Dual channel", th: "2 ช่องสัญญาณ" }],
    desc: { en: "Clean wireless handheld for MCs and ceremonies.", th: "ไมค์ลอยเสียงใสสำหรับพิธีกรและงานพิธี" }
  },
  {
    name: "LED Par Package", category: "Lighting", price: "฿2,200 / day",
    image: "images/gear/led-par.jpg",
    specs: [{ en: "8× RGBW pars", th: "พาร์ RGBW 8 ดวง" }, { en: "DMX controller", th: "คอนโทรลเลอร์ DMX" }, { en: "Stands included", th: "พร้อมขาตั้ง" }],
    desc: { en: "Full-colour wash lighting with optional operator.", th: "ไฟวอชครบสี พร้อมช่างคุมไฟ (ถ้าต้องการ)" }
  },
  {
    name: "Moving Head Beam 230W", category: "Lighting", price: "฿900 / unit / day",
    image: "images/gear/moving-head.jpg",
    specs: [{ en: "16 gobos", th: "16 โกโบ" }, { en: "Fast pan/tilt", th: "แพน/ทิลต์รวดเร็ว" }, { en: "DMX-512", th: "DMX-512" }],
    desc: { en: "Sharp beam effects for stage and dancefloor.", th: "ลำแสงคมชัดสำหรับเวทีและฟลอร์เต้น" }
  },
  {
    name: { en: "Stage Truss & Rigging", th: "ทรัสและระบบแขวน" }, category: "Accessories",
    price: { en: "Quote on request", th: "สอบถามราคา" },
    image: "images/gear/truss.jpg",
    specs: [{ en: "Aluminium truss", th: "ทรัสอะลูมิเนียม" }, { en: "Certified rigging", th: "ระบบแขวนได้มาตรฐาน" }, { en: "Crew included", th: "รวมทีมติดตั้ง" }],
    desc: { en: "Safe certified structures for arrays and lighting.", th: "โครงสร้างปลอดภัยมาตรฐานสำหรับลำโพงและไฟ" }
  },
  {
    name: "Yamaha DXR15 Powered Speaker", category: "Speakers", price: "฿900 / day",
    image: "images/gear/dxr15.jpg",
    specs: [{ en: "15\" 2-way powered", th: "แอคทีฟ 2 ทาง 15 นิ้ว" }, { en: "1100W peak", th: "1100 วัตต์พีค" }, { en: "Lightweight", th: "น้ำหนักเบา" }],
    desc: { en: "Versatile speaker for smaller stages or as a monitor.", th: "ลำโพงอเนกประสงค์สำหรับเวทีขนาดเล็กหรือใช้เป็นมอนิเตอร์" }
  },
  {
    name: "Yamaha MG16XU Mixer", category: "Mixers", price: "฿700 / day",
    image: "images/gear/mg16xu.jpg",
    specs: [{ en: "16 channels", th: "16 ช่อง" }, { en: "Built-in effects", th: "เอฟเฟกต์ในตัว" }, { en: "USB audio interface", th: "อินเทอร์เฟซ USB" }],
    desc: { en: "Simple analogue mixer, great for small to mid-size events.", th: "มิกเซอร์อนาล็อกใช้งานง่าย เหมาะกับงานขนาดเล็กถึงกลาง" }
  },
  {
    name: "Shure SM58 (Wireless Handheld)", category: "Microphones", price: "฿500 / day",
    image: "images/gear/sm58-wireless.jpg",
    specs: [{ en: "UHF wireless", th: "ไร้สายระบบ UHF" }, { en: "Rechargeable pack", th: "แบตชาร์จได้" }, { en: "Single channel", th: "1 ช่องสัญญาณ" }],
    desc: { en: "Familiar SM58 tone without the cable.", th: "เสียง SM58 ที่คุ้นเคยแบบไร้สาย" }
  },
  {
    name: "Lapel (Lavalier) Mic", category: "Microphones", price: "฿400 / day",
    image: "images/gear/lapel.jpg",
    specs: [{ en: "Clip-on", th: "หนีบปกเสื้อ" }, { en: "UHF wireless", th: "ไร้สายระบบ UHF" }, { en: "Discreet", th: "ขนาดเล็กไม่เกะกะ" }],
    desc: { en: "Hands-free mic for MCs, officiants and presenters.", th: "ไมค์ระบบไร้มือจับ เหมาะสำหรับพิธีกรและผู้บรรยาย" }
  },
  {
    name: "Hazer / Fog Machine", category: "Lighting", price: "฿800 / day",
    image: "images/gear/hazer.jpg",
    specs: [{ en: "Water-based fluid", th: "น้ำยาสูตรน้ำ" }, { en: "DMX controllable", th: "ควบคุมผ่าน DMX" }, { en: "Adjustable output", th: "ปรับปริมาณควันได้" }],
    desc: { en: "Makes moving-head beams and lasers pop.", th: "ช่วยให้แสงมูฟวิ่งเฮดและเลเซอร์เห็นชัดขึ้น" }
  },
  {
    name: "Uplighting Set (8×)", category: "Lighting", price: "฿1,600 / day",
    image: "images/gear/uplights.jpg",
    specs: [{ en: "8× battery LED uplights", th: "ไฟอัพไลท์แบตเตอรี่ 8 ดวง" }, { en: "Wireless DMX", th: "DMX ไร้สาย" }, { en: "Colour-changing", th: "เปลี่ยนสีได้" }],
    desc: { en: "Wash walls and stages in colour — great for weddings.", th: "ให้แสงสีสวยงามตามผนังหรือเวที เหมาะกับงานแต่ง" }
  },
  {
    name: { en: "Cable & Power Distro Kit", th: "ชุดสายสัญญาณและจ่ายไฟ" }, category: "Accessories",
    price: { en: "฿500 / day", th: "฿500 / วัน" },
    image: "images/gear/cable-kit.jpg",
    specs: [{ en: "XLR & speaker cable", th: "สาย XLR และสายลำโพง" }, { en: "Power distro box", th: "กล่องจ่ายไฟ" }, { en: "Cable ramps", th: "แผ่นครอบสายกันสะดุด" }],
    desc: { en: "Everything to safely wire up a stage or booth.", th: "อุปกรณ์ครบชุดสำหรับเดินสายอย่างปลอดภัย" }
  },
  {
    name: { en: "Speaker Stand (Pair)", th: "ขาตั้งลำโพง (คู่)" }, category: "Accessories",
    price: { en: "฿150 / day", th: "฿150 / วัน" },
    image: "images/gear/stands.jpg",
    specs: [{ en: "Height adjustable", th: "ปรับความสูงได้" }, { en: "Steel base", th: "ฐานเหล็ก" }, { en: "Holds up to 50kg", th: "รับน้ำหนักได้ถึง 50 กก." }],
    desc: { en: "Sturdy stands for any powered speaker.", th: "ขาตั้งที่มั่นคงสำหรับลำโพงแอคทีฟ" }
  }
];
/* ---------------- PORTFOLIO / PAST EVENTS ---------------- */
const PORTFOLIO = [
  {
    title: { en: "Sunset Beach Festival", th: "ซันเซ็ต บีช เฟสติวัล" },
    event: { en: "Music Festival", th: "เทศกาลดนตรี" },
    location: { en: "Pattaya", th: "พัทยา" }, year: "2025",
    image: "images/events/beach-festival.jpg",
    tags: [{ en: "Concert Package", th: "แพ็กเกจคอนเสิร์ต" }, { en: "3000 guests", th: "ผู้ชม 3,000 คน" }, { en: "2 days", th: "2 วัน" }]
  },
  {
    title: { en: "K. Ploy & K. Nat Wedding", th: "งานแต่งคุณพลอย & คุณณัฐ" },
    event: { en: "Wedding", th: "งานแต่งงาน" },
    location: { en: "Bangkok", th: "กรุงเทพฯ" }, year: "2025",
    image: "images/events/wedding-ploy.jpg",
    tags: [{ en: "Event Pro Package", th: "แพ็กเกจอีเวนต์โปร" }, { en: "350 guests", th: "แขก 350 คน" }, { en: "Live band", th: "วงดนตรีสด" }]
  },
  {
    title: { en: "TechCorp Annual Summit", th: "งานประชุมประจำปี TechCorp" },
    event: { en: "Corporate", th: "งานองค์กร" },
    location: { en: "BITEC Bangna", th: "ไบเทค บางนา" }, year: "2024",
    image: "images/events/techcorp.jpg",
    tags: [{ en: "Event Pro Package", th: "แพ็กเกจอีเวนต์โปร" }, { en: "Wireless mics", th: "ไมค์ลอย" }, { en: "LED screen", th: "จอ LED" }]
  },
  {
    title: { en: "Rock Night Live", th: "ร็อกไนต์ ไลฟ์" },
    event: { en: "Concert", th: "คอนเสิร์ต" },
    location: { en: "Chiang Mai", th: "เชียงใหม่" }, year: "2024",
    image: "images/events/rock-night.jpg",
    tags: [{ en: "Concert Package", th: "แพ็กเกจคอนเสิร์ต" }, { en: "5 bands", th: "5 วง" }, { en: "Monitor mixing", th: "มิกซ์มอนิเตอร์" }]
  },
  {
    title: { en: "Songkran Street Party", th: "สงกรานต์ สตรีทปาร์ตี้" },
    event: { en: "Outdoor", th: "งานกลางแจ้ง" },
    location: { en: "Khao San Rd", th: "ถนนข้าวสาร" }, year: "2024",
    image: "images/events/songkran.jpg",
    tags: [{ en: "Custom Build", th: "จัดชุดตามสั่ง" }, { en: "DJ setup", th: "ชุดดีเจ" }, { en: "12-hour run", th: "ต่อเนื่อง 12 ชม." }]
  },
  {
    title: { en: "University Graduation", th: "งานรับปริญญา" },
    event: { en: "Ceremony", th: "งานพิธี" },
    location: { en: "Nakhon Pathom", th: "นครปฐม" }, year: "2023",
    image: "images/events/graduation.jpg",
    tags: [{ en: "Event Pro Package", th: "แพ็กเกจอีเวนต์โปร" }, { en: "1500 seats", th: "1,500 ที่นั่ง" }, { en: "Recording", th: "บันทึกเสียง" }]
  }
];

/* ---------------- SITE TEXT / LABELS ---------------- */
const UI = {
  nav: {
    packages:  { en: "Packages", th: "แพ็กเกจ" },
    inventory: { en: "Inventory", th: "คลังอุปกรณ์" },
    rental:    { en: "Individual Rental", th: "เช่ารายชิ้น" },
    portfolio: { en: "Portfolio", th: "ผลงาน" },
    about:     { en: "About", th: "เกี่ยวกับเรา" },
    quote:     { en: "Get a Quote", th: "ขอใบเสนอราคา" }
  },
  hero: {
    cta1: { en: "Request a Quote", th: "ขอใบเสนอราคา" },
    cta2: { en: "See Packages", th: "ดูแพ็กเกจ" }
  },
  stats: {
    years:    { en: "Experience", th: "ประสบการณ์" },
    events:   { en: "Delivered", th: "ดูแลแล้ว" },
    packages: { en: "Ready-Made Packages", th: "แพ็กเกจสำเร็จรูป" }
  },
  packages: {
    title: { en: "Our Packages", th: "แพ็กเกจของเรา" },
    sub:   { en: "Everything included — gear, crew, delivery and setup. Pick the size that fits your event.",
             th: "ครบจบในแพ็กเกจเดียว — อุปกรณ์ ทีมงาน ขนส่ง และติดตั้ง เลือกขนาดที่เหมาะกับงานคุณ" },
    badge: { en: "Most Popular", th: "ยอดนิยม" },
    best:  { en: "Best for:", th: "เหมาะกับ:" },
    cta:   { en: "Request Quote", th: "ขอใบเสนอราคา" },
    foot:  { en: "All packages include delivery, setup, teardown and on-site crew. Prices vary by venue, distance and event duration — contact us for an exact quote.",
             th: "ทุกแพ็กเกจรวมขนส่ง ติดตั้ง รื้อถอน และทีมงานประจำงาน ราคาอาจปรับตามสถานที่ ระยะทาง และระยะเวลางาน — ติดต่อเราเพื่อรับราคาที่แน่นอน" }
  },
  inventory: {
    title: { en: "Our Inventory", th: "คลังอุปกรณ์ของเรา" },
    sub:   { en: "A look at the professional-grade gear we own and maintain — everything you see here can be part of your event.",
             th: "อุปกรณ์ระดับมืออาชีพที่เราดูแลรักษาอย่างดี พร้อมนำไปใช้ในงานของคุณ" }
  },
  categories: {
    All:         { en: "All", th: "ทั้งหมด" },
    Speakers:    { en: "Speakers", th: "ลำโพง" },
    Amplifiers:  { en: "Amplifiers", th: "แอมป์" },
    Mixers:      { en: "Mixers", th: "มิกเซอร์" },
    Microphones: { en: "Microphones", th: "ไมโครโฟน" },
    Lighting:    { en: "Lighting", th: "ระบบแสง" },
    Accessories: { en: "Accessories", th: "อุปกรณ์เสริม" }
  },
  portfolio: {
    title: { en: "Past Events", th: "ผลงานที่ผ่านมา" },
    sub:   { en: "A look at some of the shows we've powered.", th: "ตัวอย่างงานที่เราดูแลระบบเสียงให้" }
  },
  about: {
    title: { en: "Why Book With Us", th: "ทำไมต้องเลือกเรา" },
    points: [
      { en: "Complete packages — no guessing what gear you need", th: "แพ็กเกจครบชุด — ไม่ต้องเดาว่าต้องใช้อุปกรณ์อะไร" },
      { en: "Professional-grade equipment from JBL, RCF, Yamaha & Shure", th: "อุปกรณ์ระดับมืออาชีพจาก JBL, RCF, Yamaha และ Shure" },
      { en: "Experienced sound engineers included with every package", th: "มีซาวด์เอนจิเนียร์มากประสบการณ์ทุกแพ็กเกจ" },
      { en: "Free site survey and system design for large events", th: "สำรวจหน้างานและออกแบบระบบฟรีสำหรับงานใหญ่" },
      { en: "Delivery, setup and teardown handled by our team", th: "ขนส่ง ติดตั้ง และรื้อถอนโดยทีมงานของเรา" },
      { en: "Backup equipment on site — the show never stops", th: "มีอุปกรณ์สำรองหน้างาน — งานไม่มีสะดุด" },
      { en: "Transparent pricing, no hidden charges", th: "ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง" }
    ],
    howTitle: { en: "How It Works", th: "ขั้นตอนการจอง" },
    steps: [
      { b: { en: "Tell us about your event", th: "แจ้งรายละเอียดงาน" },
        t: { en: "— date, venue, guest count.", th: "— วันที่ สถานที่ จำนวนแขก" } },
      { b: { en: "We recommend a package", th: "เราแนะนำแพ็กเกจ" },
        t: { en: "and send a clear quote.", th: "พร้อมส่งใบเสนอราคาที่ชัดเจน" } },
      { b: { en: "Confirm with a deposit", th: "ยืนยันด้วยเงินมัดจำ" },
        t: { en: "to lock your date.", th: "เพื่อจองวันของคุณ" } },
      { b: { en: "We deliver & run the show", th: "เราจัดการทุกอย่างหน้างาน" },
        t: { en: "— you enjoy it.", th: "— คุณสนุกกับงานได้เต็มที่" } }
    ]
  },

  footer: { rights: { en: "All rights reserved.", th: "สงวนลิขสิทธิ์" } }
};