/* ============================================================
   JKMUSIC — extra website text (English + Thai)
   These are used when the same key is not in UI (data.js) or the CMS.
   The CMS copies them in on first setup, so you can edit them there.
   ============================================================ */
const UI_DEFAULTS = {
  nav: { faq: { en: "FAQ", th: "คำถามที่พบบ่อย" } },
  hero: {
    line1: { en: "Great sound for your", th: "เครื่องเสียงคุณภาพ สำหรับ" },
    words: { en: ["wedding", "party", "seminar", "concert", "company event"],
             th: ["งานแต่ง", "งานเลี้ยง", "งานสัมมนา", "คอนเสิร์ต", "งานบริษัท"] },
    scroll: { en: "Scroll down", th: "เลื่อนลง" }
  },
  intro: {
    title: { en: "{years} years, {events} events {photos} and a team that stays until the last song",
             th: "ประสบการณ์ {years} ปี ดูแลมาแล้ว {events} งาน {photos} ทีมเดิมที่อยู่กับคุณจนเพลงสุดท้าย" },
    sub: { en: "You tell us about the event. We bring the right system, set it up, and run it for you.",
           th: "บอกเราว่างานเป็นแบบไหน เราจัดระบบที่เหมาะ ติดตั้ง และคุมเสียงให้ตลอดงาน" }
  },
  statsLong: {
    years:    { en: "Years of live events", th: "ปีแห่งประสบการณ์" },
    events:   { en: "Events delivered",     th: "งานที่ดูแลแล้ว" },
    packages: { en: "Ready-made packages",  th: "แพ็กเกจสำเร็จรูป" }
  },
  pkgStats: { guests: { en: "Guests", th: "ผู้ร่วมงาน" }, mixer: { en: "Mixer", th: "มิกเซอร์" }, mics: { en: "Wireless mics", th: "ไมค์ลอย" } },
  worries: {
    title: { en: "Planning an event is stressful enough", th: "การจัดงานก็เหนื่อยพออยู่แล้ว" },
    sub: { en: "Sound shouldn't be one more thing to worry about.", th: "เรื่องเสียงไม่ควรเป็นอีกเรื่องที่คุณต้องกังวล" },
    notes: [
      { en: "Will it be loud enough for everyone at the back?", th: "คนที่นั่งหลังสุดจะได้ยินชัดไหม?" },
      { en: "What if the mic cuts out during the speech?", th: "ถ้าไมค์ดับตอนกล่าวเปิดงานล่ะ?" },
      { en: "I don't know which speakers I need.", th: "ไม่รู้ว่าต้องใช้ลำโพงแบบไหน" },
      { en: "Will it be set up before guests arrive?", th: "จะติดตั้งเสร็จก่อนแขกมาทันไหม?" },
      { en: "Is the price really the final price?", th: "ราคานี้คือราคาจริงหรือเปล่า?" }
    ],
    answer1: { en: "We don't just drop off speakers.", th: "เราไม่ได้แค่ส่งลำโพงแล้วกลับ" },
    answer2: { en: "We stay and run the whole show.", th: "เราอยู่ดูแลเสียงจนจบงาน" }
  },
  win: {
    title: { en: "Event sheet", th: "ใบงาน" },
    side: [ { en: "Events", th: "งาน" }, { en: "Packages", th: "แพ็กเกจ" }, { en: "Gear", th: "อุปกรณ์" }, { en: "Crew", th: "ทีมงาน" } ],
    event: { en: "Wedding reception", th: "งานเลี้ยงฉลองมงคลสมรส" },
    venue: { en: "Hotel ballroom, Bangkok", th: "ห้องจัดเลี้ยงโรงแรม กรุงเทพฯ" },
    date: { en: "Sat 14 Feb", th: "ส. 14 ก.พ." },
    guests: { en: "200 guests", th: "แขก 200 คน" },
    status: { en: "Confirmed", th: "ยืนยันแล้ว" },
    gearT: { en: "Gear list", th: "รายการอุปกรณ์" },
    runT: { en: "Run of show", th: "ลำดับงาน" },
    run: [ ["14:00", { en: "Load in & setup", th: "ขนของและติดตั้ง" }], ["16:00", { en: "Sound check", th: "เช็คเสียง" }],
           ["18:00", { en: "Doors open", th: "เปิดงาน" }], ["22:00", { en: "Pack down", th: "เก็บอุปกรณ์" }] ],
    actT: { en: "Activity", th: "ความเคลื่อนไหว" },
    act: [ { en: "Quote sent on LINE", th: "ส่งใบเสนอราคาทาง LINE" }, { en: "Deposit received, date locked", th: "รับมัดจำแล้ว ยืนยันวัน" },
           { en: "Truck loaded, on the way", th: "ขึ้นของแล้ว กำลังเดินทาง" }, { en: "Sound check done", th: "เช็คเสียงเรียบร้อย" } ],
    sample: { en: "Example", th: "ตัวอย่าง" }
  },
  process: {
    title: { en: "Booking takes four simple steps", th: "จองง่ายใน 4 ขั้นตอน" },
    hi: [ { en: "Tell us", th: "บอกเรา" }, { en: "package", th: "แพ็กเกจ" }, { en: "lock", th: "ยืนยัน" }, { en: "run the show", th: "จัดการทุกอย่าง" } ]
  },
  fastwork: { avail: { en: "Hire us on", th: "จ้างเราได้ที่" }, cta: { en: "Let's chat", th: "แชทเลย" } },
  faq: {
    title: { en: "Questions people ask us", th: "คำถามที่ลูกค้าถามบ่อย" },
    sub: { en: "Can't find your answer? Send us a message on LINE.", th: "ไม่เจอคำตอบที่ต้องการ? ทักมาคุยกันทาง LINE ได้เลย" },
    cta: { en: "Ask on LINE", th: "ถามทาง LINE" }
  },
  contact: {
    title: { en: "Your event deserves great sound.", th: "งานของคุณควรได้เสียงที่ดีที่สุด" },
    title2: { en: "Let's make sure it gets it.", th: "ให้เราดูแลเรื่องนี้" },
    sub: { en: "Send us the date, venue and guest count. We reply with a package and a clear quote.",
           th: "แจ้งวันที่ สถานที่ และจำนวนแขก เราจะแนะนำแพ็กเกจพร้อมใบเสนอราคาที่ชัดเจน" },
    line: { en: "Chat on LINE", th: "แชททาง LINE" },
    fw: { en: "Hire on Fastwork", th: "จ้างผ่าน Fastwork" }
  },
  footer: { tagline: { en: "Sound system rental, crew and setup.", th: "เช่าเครื่องเสียงพร้อมทีมงานและติดตั้ง" } }
};
