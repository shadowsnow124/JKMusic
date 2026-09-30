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
  "images/event/IMG_6276.JPG",
  "images/event/IMG_6282.JPG",
  "images/event/IMG_6307.JPG",
  "images/event/IMG_6310.JPG",
  "images/event/IMG_6320.JPG",
];
const SLIDE_SECONDS = 7; // how long each slide stays up before crossfading

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
    name: "JBL PRX715",
    category: "Speakers",
    image: "images/gear/jbl-prx715.jpg",
    specs: [
      { en: "15\" woofer 2000W Peak", th: "ดอกวูฟเฟอร์ 15 นิ้ว 2000 วัตต์พีค" },
      { en: "136 dB SPL", th: "136 เดซิเบล" },
      { en: "Freq Response (±3 dB): 58.1 Hz - 17.2 kHz", th: "การตอบสนองความถื่ (±3 dB): 58.1 Hz - 17.2 kHz" }
    ],
    desc: {
      en: "15-inch Two-Way Full-Range Main System/Floor Monitor",
      th: "ลำโพงแอคทีฟ 2 ทาง 15 นิ้ว พร้อมแอมป์ Class-D ในตัว"
    }
  },
  {
    name: "VL Audio VIVA715D",
    category: "Speakers",
    image: "images/gear/vl-audio-viva715d.png",
    specs: [
      { en: "15\" woofer 1600W Peak", th: "ดอกวูฟเฟอร์ 15 นิ้ว 1600 วัตต์พีค" },
      { en: "134 dB SPL", th: "134 เดซิเบล" },
      { en: "Freq Response: 45 Hz – 20 kHz", th: "การตอบสนองความถื่: 45 Hz – 20 kHz" }
    ],
    desc: {
      en: "15-inch 2-way powered loudspeaker with Class-D amplifier.",
      th: "ลำโพงแอคทีฟ 2 ทาง 15 นิ้ว พร้อมแอมป์ Class-D ในตัว"
    }
  },
  {
    name: "Wharfedale Pro SH1564",
    category: "Speakers",
    image: "images/gear/wharfedale-sh1564.jpg",
    specs: [
      { en: "15\" woofer 4000W Peak", th: "ดอกวูฟเฟอร์ 15 นิ้ว 4000 วัตต์พีค" },
      { en: "132 dB SPL (1w @ 1m): 99 dB SPL", th: "132 เดซิเบล (1w @ 1m): 99 เดซิเบล SPL" },
      { en: "Freq Response: 50Hz - 20kHz", th: "การตอบสนองความถื่: 50Hz - 20kHz" }
    ],
    desc: {
      en: "Passive 15-inch 2-way speaker cabinet for use with an external amp.",
      th: "ตู้ลำโพงพาสซีฟ 2 ทาง 15 นิ้ว ใช้งานคู่กับแอมป์ภายนอก"
    }
  },
  {
    name: "JBL SRX715",
    category: "Speakers",
    image: "images/gear/jbl-srx715.jpg",
    specs: [
      { en: "15\" woofer 3200W Peak", th: "ดอกวูฟเฟอร์ 15 นิ้ว 3200 วัตต์พีค" },
      { en: "131 dB SPL (1w @ 1m): 96 dB SPL", th: "131 เดซิเบล (1w @ 1m): 96 เดซิเบล SPL" },
      { en: "Freq Response (±3 dB): 53 Hz – 20 kHz", th: "การตอบสนองความถื่ (±3 dB): 53 Hz – 20 kHz" }
    ],
    desc: {
      en: "Passive 15-inch 2-way top for touring-grade sound reinforcement.",
      th: "ตู้ลำโพงพาสซีฟ 2 ทาง 15 นิ้ว สำหรับงานระดับทัวร์ริ่ง"
    }
  },
  {
    name: "Audiocenter MA12",
    category: "Speakers",
    image: "images/gear/audiocenter-ma12.jpg",
    specs: [
      { en: "12\" woofer 1600W Peak", th: "ดอกวูฟเฟอร์ 12 นิ้ว 1600 วัตต์พีค" },
      { en: "131 dB SPL", th: "131 เดซิเบล" },
      { en: "Freq Response (-6 dB): 50Hz - 20kHz", th: "การตอบสนองความถื่ (-6 dB): 50Hz - 20kHz" }
    ],
    desc: {
      en: "Compact 12-inch 2-way powered loudspeaker for mid-size stages.",
      th: "ลำโพงแอคทีฟ 2 ทาง 12 นิ้ว ขนาดกะทัดรัด เหมาะกับเวทีขนาดกลาง"
    }
  },
  {
    name: "De acoustic H212",
    category: "Speakers",
    image: "images/gear/de-acoustic-h212.jpg",
    specs: [
      { en: "12\" woofer 2000W Peak", th: "ดอกวูฟเฟอร์ 12 นิ้ว 2000 วัตต์พีค" },
      { en: "117 dB SPL (1w @ 1m): 99 dB SPL", th: "117 เดซิเบล (1w @ 1m): 99 เดซิเบล SPL" },
      { en: "Freq Response (±3 dB): 53 Hz – 19 kHz", th: "การตอบสนองความถื่ (±3 dB): 53 Hz – 19 kHz" }
    ],
    desc: {
      en: "Horn-loaded dual-12 speaker built for high output at long throw.",
      th: "ลำโพงฮอร์นคู่ 12 นิ้ว ให้เสียงดังและไปได้ไกล"
    }
  },
  {
    name: "VL AUDIO Veda II VD-12L",
    category: "Speakers",
    image: "images/gear/vl-audio-veda-12.png",
    specs: [
      { en: "12\" woofer 1600W Peak", th: "ดอกวูฟเฟอร์ 12 นิ้ว 1600 วัตต์พีค" },
      { en: "134 dB SPL", th: "134  เดซิเบล" },
      { en: "Freq Response (-3 dB): 58Hz – 16kHz", th: "การตอบสนองความถื่ (-3 dB): 58Hz – 16kHz" }
    ],
    desc: {
      en: "12-inch 2-way powered loudspeaker with Class-D amplifier.",
      th: "ลำโพงแอคทีฟ 2 ทาง 12 นิ้ว พร้อมแอมป์ Class-D ในตัว"
    }
  },
  {
    name: "KANE TW10",
    category: "Speakers",
    image: "images/gear/kane-tw10.jpg",
    specs: [
      { en: "10\" woofer 700W Prog", th: "ดอกวูฟเฟอร์ 10 นิ้ว 700 วัตต์โปรแกรม" },
      { en: "129 dB SPL (1w @ 1m): 112 dB SPL", th: "129 เดซิเบล (1w @ 1m): 112 เดซิเบล SPL" },
      { en: "Freq Response: 60Hz - 18kHz", th: "การตอบสนองความถื่: 60Hz - 18kHz" }
    ],
    desc: {
      en: "10-inch 2-way loudspeaker.",
      th: "ลำโพง 2 ทาง 10 นิ้ว"
    }
  },
  {
    name: "Audiocenter MA118",
    category: "Speakers",
    image: "images/gear/audiocenter-ma118.jpg",
    specs: [
      { en: "18\" subwoofer 2000W Peak", th: "ซับวูฟเฟอร์แอคทีฟ 18 นิ้ว 2000 วัตต์พีค" },
      { en: "134 dB SPL", th: " 134 เดซิเบล" },
      { en: "Freq Response: 32 Hz – 150 Hz", th: "การตอบสนองความถื่: 32 Hz – 150 Hz" }
    ],
    desc: {
      en: "18-inch powered subwoofer with onboard DSP for deep, controlled bass.",
      th: "ซับวูฟเฟอร์แอคทีฟ 18 นิ้ว มี DSP ในตัว ให้เสียงเบสลึกและควบคุมได้ดี"
    }
  },
  {
    name: "Yamaha DXS12Mkii",
    category: "Speakers",
    image: "images/gear/yamaha-dxs12mkii.jpg",
    specs: [
      { en: "12\" subwoofer 1020W Peak", th: "ซับวูฟเฟอร์แอคทีฟ 12 นิ้ว 1020 วัตต์พีค" },
      { en: "134 dB SPL", th: "134 เดซิเบล" },
      { en: "Freq Response: 42 Hz – 150 Hz", th: "การตอบสนองความถื่: 42 Hz – 150 Hz" }
    ],
    desc: {
      en: "Compact 12-inch powered subwoofer, easy to transport and stack.",
      th: "ซับวูฟเฟอร์แอคทีฟ 12 นิ้ว ขนาดกะทัดรัด ขนย้ายและวางซ้อนง่าย"
    }
  },
  {
    name: "Wharfedale Pro Delta-X18B",
    category: "Speakers",
    image: "images/gear/wharfedale-deltax18b.jpg",
    specs: [
      { en: "18\" subwoofer 3200W Peak", th: "ซับวูฟเฟอร์พาสซีฟ 18 นิ้ว 3200 วัตต์พีค" },
      { en: "134 dB SPL", th: "134 เดซิเบล" },
      { en: "Freq Response (±3 dB): 38 Hz – 1.5 kHz", th: "การตอบสนองความถื่ (±3 dB): 38 Hz – 1.5 kHz" }
    ],
    desc: {
      en: "Passive 18-inch subwoofer for heavy low-end reinforcement.",
      th: "ซับวูฟเฟอร์พาสซีฟ 18 นิ้ว เสริมเสียงเบสหนักแน่น"
    }
  },
  {
    name: "Yamaha T5n",
    category: "Amplifiers",
    image: "images/gear/yamaha-t5n.jpg",
    specs: [
      { en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" },
      { en: "1400W @ 8Ω / ch", th: "1400 วัตต์ @ 8Ω / ชาแนล" },
      { en: "2500W @ 4Ω / ch", th: "2500 วัตต์ @ 4Ω / ชาแนล" },
    ],
    desc: {
      en: "2-channel power amplifier for driving passive tops or subs.",
      th: "แอมป์ขยายเสียง 2 ชาแนล สำหรับขับลำโพงพาสซีฟหรือซับ"
    }
  },
  {
    name: "TDK TD26",
    category: "Amplifiers",
    image: "images/gear/tdk-td26.jpg",
    specs: [
      { en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" },
      { en: "2700W @ 8Ω / ch", th: "2700 วัตต์ @ 8Ω / ชาแนล" },
      { en: "5000W @ 4Ω / ch", th: "5000 วัตต์ @ 4Ω / ชาแนล" },
    ],
    desc: {
      en: "2-channel power amplifier for driving passive tops or subs.",
      th: "แอมป์ขยายเสียง 2 ชาแนล สำหรับขับลำโพงพาสซีฟหรือซับ"
    }
  },
  {
    name: "QSC GX5",
    category: "Amplifiers",
    image: "images/gear/qsc-gx5.jpg",
    specs: [
      { en: "2-channel power amp", th: "แอมป์ 2 ชาแนล" },
      { en: "500W @ 8Ω / ch", th: "500 วัตต์ @ 8Ω / ชาแนล" },
      { en: "700W @ 4Ω / ch", th: "700 วัตต์ @ 4Ω / ชาแนล" },
    ],
    desc: {
      en: "Compact 2-channel power amplifier, great for smaller rigs.",
      th: "แอมป์ขยายเสียง 2 ชาแนล ขนาดกะทัดรัด เหมาะกับชุดเครื่องเสียงขนาดเล็ก"
    }
  },
  {
    name: "Dynacord CMS1600-2",
    category: "Mixers",
    image: "images/gear/dynacord-cms1600-2.jpg",
    specs: [
      { en: "12 Mono / 4 Stereo Channels", th: "" },
      { en: "3-band EQ", th: "" },
      { en: "Dual independent 24-bit stereo digital effect processors", th: "-" }
    ],
    desc: {
      en: "16-channel analogue mixer with built-in effects for live sound.",
      th: "มิกเซอร์อนาล็อก 16 ช่อง มีเอฟเฟกต์ในตัว เหมาะกับงานเสียงสด"
    }
  },
  {
    name: "Mackie ProFX16v2",
    category: "Mixers",
    image: "images/gear/mackie-profx16v2.jpg",
    specs: [
      { en: "8 Mono / 4 Stereo Channels", th: "" },
      { en: "3-band (High: 12 kHz, Low: 80 Hz)", th: "" },
      { en: "Built-in USB 1.1 interface (Type B)", th: "-" }
    ],
    desc: {
      en: "16-channel mixer with onboard effects and a USB audio interface.",
      th: "มิกเซอร์ 16 ช่อง มีเอฟเฟกต์และอินเทอร์เฟซ USB ในตัว"
    }
  },
  {
    name: "Shure SLX4",
    category: "Microphones",
    image: "images/gear/shure-slx4.jpg",
    specs: [
      { en: "Up to 24 MHz bandwidth", th: "" },
      { en: "960 selectable frequencies", th: "-" },
      { en: "Operating Range: 100m (300ft) under typical conditions ", th: "-" }
    ],
    desc: {
      en: "Reliable UHF wireless receiver for handheld or lapel mic systems.",
      th: "ตัวรับสัญญาณไร้สายระบบ UHF ที่เชื่อถือได้ ใช้กับชุดไมค์ถือหรือหนีบปก"
    }
  },
  {
    name: "Shure SLX24/BETA58",
    category: "Microphones",
    image: "images/gear/shure-slx24.jpg",
    specs: [
      { en: "Frequency Response: 50Hz - 15kHz ", th: "" },
      { en: "THD: 0.5%", th: "-" },
      { en: "Operating Range: 100m (300ft) under typical conditions ", th: "-" }
    ],
    desc: {
      en: "The world's most popular vocal microphone — durable and reliable.",
      th: "ไมค์เสียงร้องที่นิยมที่สุดในโลก ทนทานและเชื่อถือได้"
    }
  },
  {
    name: "Behringer SL 75C",
    category: "Microphones",
    image: "images/gear/behringer-sl75c.jpg",
    specs: [
      { en: "Frequency Response: 40Hz - 15kHz ", th: "" },
      { en: "Sens: -54 ± 2dBV/Pa", th: "-" },
      { en: "Maximum SPL: 150 dB", th: "-" }
    ],
    desc: {
      en: "Dynamic instrument and vocal microphone.",
      th: "ไมโครโฟนไดนามิกสำหรับเครื่องดนตรีและเสียงร้อง"
    }
  },
  {
    name: "Behringer C-2",
    category: "Microphones",
    image: "images/gear/behringer-c2.jpg",
    specs: [
      { en: "Frequency Response: 20Hz - 20kHz ", th: "" },
      { en: "Sens: -41 ± 2dBV/Pa (8.9mV/Pa)", th: "-" },
      { en: "Maximum SPL: 136 dB", th: "-" }
    ],
    desc: {
      en: "Studio condenser microphones for instruments and live sound.",
      th: "ไมโครโฟนคอนเดนเซอร์สตูดิโอสำหรับเครื่องดนตรีและงานเสียงสด"
    }
  },
  {
    name: "Dbx 166a",
    category: "Accessories",
    image: "images/gear/dbx-166a.jpg",
    specs: [
      { en: "Frequency Response: 20Hz - 20kHz(±0.5dB) ", th: "" },
      { en: "Dynamic Range: >113 dB", th: "-" },
      { en: "THD + Noise: <0.2%", th: "-" }
    ],
    desc: {
      en: "2-channel compressor/limiter/gate for cleaning up live mixes.",
      th: "คอมเพรสเซอร์/ลิมิตเตอร์/เกต 2 ชาแนล ช่วยจัดการเสียงมิกซ์สดให้เนียนขึ้น"
    }
  },
  {
    name: "Lexicon MPX-1",
    category: "Accessories",
    image: "images/gear/lexicon-mpx1.jpg",
    specs: [
      { en: "200 factory presets / 50 user program locations", th: "-" },
      { en: "Frequency Response: 20Hz - 20kHz(±1dB) ", th: "" },
      { en: "THD + Noise: <0.01%", th: "-" }
    ],
    desc: {
      en: "multi-effects processor and hardware reverb unit",
      th: "-"
    }
  },
  {
    name: "Behringer VX2000",
    category: "Accessories",
    image: "images/gear/behringer-vx2000.jpg",
    specs: [
      { en: "Tube Emulation: Authentic solid-state tube/tape saturation simulation circuitry", th: "โปรเซสเซอร์ช่องเสียงร้อง" },
      { en: "Built-in dynamic expander", th: "-" },
      { en: "Optical compression circuit for transparent", th: "-" }
    ],
    desc: {
      en: "All-in-one vocal channel processor for a polished live vocal sound.",
      th: "โปรเซสเซอร์ช่องเสียงร้องแบบครบวงจร ให้เสียงร้องสดที่คมชัดและเป็นมืออาชีพ"
    }
  },
  {
    name: "Behringer MDX4600",
    category: "Accessories",
    image: "images/gear/behringer-mdx4600.jpg",
    specs: [
      { en: "Frequency Response: 10Hz - 80kHz(±0.5dB) ", th: "" },
      { en: "Dynamic Range: >115 dB(20Hz - 20kHz)", th: "-" },
      { en: "THD + Noise: <0.008% (1kHz at +10dBu)", th: "-" }
    ],
    desc: {
      en: "4-channel expander/gate/compressor/peak limiter.",
      th: "เอ็กซ์ปันเดอร์/เกต/คอมเพรสเซอร์/พีคลิมิตเตอร์ 4 ชาแนล"
    }
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