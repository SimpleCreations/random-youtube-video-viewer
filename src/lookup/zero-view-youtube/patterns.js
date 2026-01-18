export const PATTERNS = [
  // IMG XXXX (0000-9999) [IMG 3201]
  [
    { type: "STRING", value: "IMG " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // MVI XXXX (Camera)
  [
    { type: "STRING", value: "MVI " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // MOV XXXX (Camera)
  [
    { type: "STRING", value: "MOV " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // 100 XXXX (Camera)
  [
    { type: "STRING", value: "100 " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // SAM XXXX (Camera)
  [
    { type: "STRING", value: "SAM " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // DSC XXXX (Camera)
  [
    { type: "STRING", value: "DSC " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // SDV XXXX (Camera)
  [
    { type: "STRING", value: "SDV " },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // DSCFXXXX (Camera)
  [
    { type: "STRING", value: "DSCF" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // DSCNXXXX (Camera)
  [
    { type: "STRING", value: "DSCN" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // PICTXXXX (Camera)
  [
    { type: "STRING", value: "PICT" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // MAQ0XXXX (Camera)
  [
    { type: "STRING", value: "MAQ0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // FILEXXXX (Dashcam)
  [
    { type: "STRING", value: "FILE" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // GOPRXXXX (GoPro)
  [
    { type: "STRING", value: "GOPR" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // GP01XXXX (GoPro)
  [
    { type: "STRING", value: "GP01" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // GX01XXXX (GoPro)
  [
    { type: "STRING", value: "GX01" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // DJI XXXX (0000-2000) (Drone)
  [
    { type: "STRING", value: "DJI " },
    { type: "NUMBER", min: 0, max: 2000, length: 4 },
  ],

  // HNI 0XXX (000-100) (Nintendo DS)
  [
    { type: "STRING", value: "HNI 0" },
    { type: "NUMBER", min: 0, max: 100, length: 3 },
  ],

  // WA0XXX (000-999) (Misc)
  [
    { type: "STRING", value: "WA0" },
    { type: "NUMBER", min: 0, max: 999, length: 3 },
  ],

  // MOL0XX (A-F, 0-9) [MOL0E5] (Camera)
  [
    { type: "STRING", value: "MOL0" },
    { type: "NUMBER", min: 0x0, max: 0xff, length: 2, base: 16 },
  ],

  // MOL0XX (00-99)
  [
    { type: "STRING", value: "MOL0" },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
  ],

  // P100XXXX (0000-1999) (Camera)
  [
    { type: "STRING", value: "P100" },
    { type: "NUMBER", min: 0, max: 1999, length: 4 },
  ],

  // VTS XX X (00-99 0-9) (DVD)
  [
    { type: "STRING", value: "VTS " },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
    { type: "STRING", value: " " },
    { type: "NUMBER", min: 0, max: 9, length: 1 },
  ],

  // VTS XXX 1 (000-999) (DVD)
  [
    { type: "STRING", value: "VTS " },
    { type: "NUMBER", min: 0, max: 999, length: 3 },
    { type: "STRING", value: " 1" },
  ],

  // VTS 01 XXX (000-999) (DVD)
  [
    { type: "STRING", value: "VTS 01 " },
    { type: "NUMBER", min: 0, max: 999, length: 3 },
  ],

  // “My Slideshow XX” (00-99) (Video Editor)
  [
    { type: "STRING", value: "My Slideshow " },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
  ],

  // “My Stupeflix Video XXXX” (0000-1050)
  [
    { type: "STRING", value: "My Stupeflix Video " },
    { type: "NUMBER", min: 0, max: 1050, length: 4 },
  ],

  // YYYYMMDD (20250826)
  [{ type: "DATE", format: "YYYYMMDD" }],

  // WIN YYYYMMDD (>2013)
  [
    { type: "STRING", value: "WIN " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2014-01-01T00:00:00.000Z"),
    },
  ],

  // VID YYYYMMDD (>2008)
  [
    { type: "STRING", value: "VID " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2009-01-01T00:00:00.000Z"),
    },
  ],

  // Capture YYYYMMDD (>2008)
  [
    { type: "STRING", value: "Capture " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2009-01-01T00:00:00.000Z"),
    },
  ],

  // InShot YYYYMMDD (>2016)
  [
    { type: "STRING", value: "InShot " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2017-01-01T00:00:00.000Z"),
    },
  ],

  // PXL YYYYMMDD (>2020)
  [
    { type: "STRING", value: "PXL " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2021-01-01T00:00:00.000Z"),
    },
  ],

  // AUD-YYYYMMDD (>2017)
  [
    { type: "STRING", value: "AUD-" },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2018-01-01T00:00:00.000Z"),
    },
  ],

  // WhatsApp Video YYYY MM DD (>2015)
  [
    { type: "STRING", value: "WhatsApp Video " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2016-01-01T00:00:00.000Z"),
    },
  ],

  // Desktop YYYY MM DD (Game Capture)
  [
    { type: "STRING", value: "Desktop " },
    { type: "DATE", format: "YYYY MM DD" },
  ],

  // WP YYYYMMDD (Misc) (>2011)
  [
    { type: "STRING", value: "WP " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2012-01-01T00:00:00.000Z"),
    },
  ],

  // “Video YYYYMMDD” (Misc) (>2012)
  [
    { type: "STRING", value: "Video " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2013-01-01T00:00:00.000Z"),
    },
  ],

  // KakaoTalk Video YYYY MM (Misc) (>2012)
  [
    { type: "STRING", value: "KakaoTalk Video " },
    {
      type: "DATE",
      format: "YYYY MM",
      min: new Date("2013-01-01T00:00:00.000Z"),
    },
  ],

  // AVSEQXX (00-99) (Misc)
  [
    { type: "STRING", value: "AVSEQ" },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
  ],

  // AVSEQXX.DAT (00-99) (Misc)
  [
    { type: "STRING", value: "AVSEQ" },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
    { type: "STRING", value: ".DAT" },
  ],

  // MOVIXXXX (0000-1050) (Drone / Dashcam)
  [
    { type: "STRING", value: "MOVI" },
    { type: "NUMBER", min: 0, max: 1050, length: 4 },
  ],

  // GMTYYYYMMDD (Zoom)
  [
    { type: "STRING", value: "GMT" },
    { type: "DATE", format: "YYYYMMDD" },
  ],

  // SVM AXXXX (0000-1000) (Camera)
  [
    { type: "STRING", value: "SVM A" },
    { type: "NUMBER", min: 0, max: 1000, length: 4 },
  ],

  // KVIDXXXX (0000-1000) (Camera)
  [
    { type: "STRING", value: "KVID" },
    { type: "NUMBER", min: 0, max: 1000, length: 4 },
  ],

  // M2U0XXXX (0000-9999) (Camcorder)
  [
    { type: "STRING", value: "M2U0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // GH01XXXX (GoPro)
  [
    { type: "STRING", value: "GH01" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // “Month DD, YYYY”
  [{ type: "DATE", format: "MMMM DD, YYYY" }],

  // MAH0XXXX
  [
    { type: "STRING", value: "MAH0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // CIMGXXXX
  [
    { type: "STRING", value: "CIMG" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // IMGPXXXX
  [
    { type: "STRING", value: "IMGP" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // VideoXXXX
  [
    { type: "STRING", value: "Video" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // MOV0XXXX
  [
    { type: "STRING", value: "MOV0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // MUSIC0X.DAT (1–9)
  [
    { type: "STRING", value: "MUSIC0" },
    { type: "NUMBER", min: 1, max: 9, length: 1 },
    { type: "STRING", value: ".DAT" },
  ],

  // REC XXXX (0000–1000)
  [
    { type: "STRING", value: "REC " },
    { type: "NUMBER", min: 0, max: 1000, length: 4 },
  ],

  // AVI00XXX (000–100)
  [
    { type: "STRING", value: "AVI00" },
    { type: "NUMBER", min: 0, max: 100, length: 3 },
  ],

  // AVI 0XXX (001–150)
  [
    { type: "STRING", value: "AVI 0" },
    { type: "NUMBER", min: 1, max: 150, length: 3 },
  ],

  // 4XXX (AAA–FFF, 000–999) → hex 0x000–0xFFF
  [
    { type: "STRING", value: "4" },
    { type: "NUMBER", min: 0x0, max: 0xfff, length: 3, base: 16 },
  ],

  // Trim 4XXX
  [
    { type: "STRING", value: "Trim 4" },
    { type: "NUMBER", min: 0x0, max: 0xfff, length: 3, base: 16 },
  ],

  // Copy 4XXX
  [
    { type: "STRING", value: "Copy 4" },
    { type: "NUMBER", min: 0x0, max: 0xfff, length: 3, base: 16 },
  ],

  // Video 4XXX
  [
    { type: "STRING", value: "Video 4" },
    { type: "NUMBER", min: 0x0, max: 0xfff, length: 3, base: 16 },
  ],

  // M4H0XXXX
  [
    { type: "STRING", value: "M4H0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // M4V0XXXX
  [
    { type: "STRING", value: "M4V0" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // SDC1XXXX
  [
    { type: "STRING", value: "SDC1" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // SANYXXXX
  [
    { type: "STRING", value: "SANY" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // HPIMXXXX
  [
    { type: "STRING", value: "HPIM" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // GEDCXXXX
  [
    { type: "STRING", value: "GEDC" },
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
  ],

  // XXXX.mp4
  [
    { type: "NUMBER", min: 0, max: 9999, length: 4 },
    { type: "STRING", value: ".mp4" },
  ],

  // VID0XXXX (0000–5000)
  [
    { type: "STRING", value: "VID0" },
    { type: "NUMBER", min: 0, max: 5000, length: 4 },
  ],

  // DSC 0XXXX
  [
    { type: "STRING", value: "DSC 0" },
    { type: "NUMBER", min: 0, max: 5000, length: 4 },
  ],

  // CAM0XXXX
  [
    { type: "STRING", value: "CAM0" },
    { type: "NUMBER", min: 0, max: 5000, length: 4 },
  ],

  // AMBAXXXX (0001–5000)
  [
    { type: "STRING", value: "AMBA" },
    { type: "NUMBER", min: 1, max: 5000, length: 4 },
  ],

  // HDV XXXX (0001–5000)
  [
    { type: "STRING", value: "HDV " },
    { type: "NUMBER", min: 1, max: 5000, length: 4 },
  ],

  // DSCIXXXX (0001–4000)
  [
    { type: "STRING", value: "DSCI" },
    { type: "NUMBER", min: 1, max: 4000, length: 4 },
  ],

  // SNV3XXXX (0001–3000)
  [
    { type: "STRING", value: "SNV3" },
    { type: "NUMBER", min: 1, max: 3000, length: 4 },
  ],

  // MOVXXXXA (0000–3000)
  [
    { type: "STRING", value: "MOV" },
    { type: "NUMBER", min: 0, max: 3000, length: 4 },
    { type: "STRING", value: "A" },
  ],

  // Zi6 XXXX (0001–2000)
  [
    { type: "STRING", value: "Zi6 " },
    { type: "NUMBER", min: 1, max: 2000, length: 4 },
  ],

  // ClipXXXX (0000–2000)
  [
    { type: "STRING", value: "Clip" },
    { type: "NUMBER", min: 0, max: 2000, length: 4 },
  ],

  // YDXJXXXX (0001–2000)
  [
    { type: "STRING", value: "YDXJ" },
    { type: "NUMBER", min: 1, max: 2000, length: 4 },
  ],

  // 0XXXX.MTS
  [
    { type: "STRING", value: "0" },
    { type: "NUMBER", min: 0, max: 2000, length: 4 },
    { type: "STRING", value: ".MTS" },
  ],

  // SSPXXXXX (0001–2000)
  [
    { type: "STRING", value: "SSP" },
    { type: "NUMBER", min: 1, max: 2000, length: 5 },
  ],

  // 00XXXXA (0001–2000)
  [
    { type: "STRING", value: "00" },
    { type: "NUMBER", min: 1, max: 2000, length: 4 },
    { type: "STRING", value: "A" },
  ],

  // IMAGXXXX
  [
    { type: "STRING", value: "IMAG" },
    { type: "NUMBER", min: 0, max: 2000, length: 4 },
  ],

  // CXXXX
  [
    { type: "STRING", value: "C" },
    { type: "NUMBER", min: 0, max: 2000, length: 4 },
  ],

  // SUNPXXXX (0000–1500)
  [
    { type: "STRING", value: "SUNP" },
    { type: "NUMBER", min: 0, max: 1500, length: 4 },
  ],

  // Picture XXX (001–1220)
  [
    { type: "STRING", value: "Picture " },
    { type: "NUMBER", min: 1, max: 1220, length: 3 },
  ],

  // PC10XXXX (0001–1050)
  [
    { type: "STRING", value: "PC10" },
    { type: "NUMBER", min: 1, max: 1050, length: 4 },
  ],

  // PTDCXXXX (0000–1000)
  [
    { type: "STRING", value: "PTDC" },
    { type: "NUMBER", min: 0, max: 1000, length: 4 },
  ],

  // ВидеоXXXX
  [
    { type: "STRING", value: "Видео" },
    { type: "NUMBER", min: 0, max: 1000, length: 4 },
  ],

  // VCLPXXXX (0001–1000)
  [
    { type: "STRING", value: "VCLP" },
    { type: "NUMBER", min: 1, max: 1000, length: 4 },
  ],

  // FHDXXXX (0001–1000)
  [
    { type: "STRING", value: "FHD" },
    { type: "NUMBER", min: 1, max: 1000, length: 4 },
  ],

  // Moto_0XXX (000–999)
  [
    { type: "STRING", value: "Moto_0" },
    { type: "NUMBER", min: 0, max: 999, length: 3 },
  ],

  // WEB_0XXX (001–999)
  [
    { type: "STRING", value: "WEB_0" },
    { type: "NUMBER", min: 1, max: 999, length: 3 },
  ],

  // P1XX0XXX (01–35) (001–999)
  [
    { type: "STRING", value: "P1" },
    { type: "NUMBER", min: 1, max: 35, length: 2 },
    { type: "STRING", value: "0" },
    { type: "NUMBER", min: 1, max: 999, length: 3 },
  ],

  // im000XXX (001–899)
  [
    { type: "STRING", value: "im000" },
    { type: "NUMBER", min: 1, max: 899, length: 3 },
  ],

  // ZOOM0XXX (001–800)
  [
    { type: "STRING", value: "ZOOM0" },
    { type: "NUMBER", min: 1, max: 800, length: 3 },
  ],

  // SV A0XXX (001–600)
  [
    { type: "STRING", value: "SV A0" },
    { type: "NUMBER", min: 1, max: 600, length: 3 },
  ],

  // Videoplayback XXX (1–500)
  [
    { type: "STRING", value: "Videoplayback " },
    { type: "NUMBER", min: 1, max: 500, length: 3 },
  ],

  // GEDV0XXX (001–500)
  [
    { type: "STRING", value: "GEDV0" },
    { type: "NUMBER", min: 1, max: 500, length: 3 },
  ],

  // “0001 0XXX” (019–500)
  [
    { type: "STRING", value: "0001 0" },
    { type: "NUMBER", min: 19, max: 500, length: 3 },
  ],

  // ACTP0XXX (001–400)
  [
    { type: "STRING", value: "ACTP0" },
    { type: "NUMBER", min: 1, max: 400, length: 3 },
  ],

  // PAXX0XXX (00–30) (001–499)
  [
    { type: "STRING", value: "PA" },
    { type: "NUMBER", min: 0, max: 30, length: 2 },
    { type: "STRING", value: "0" },
    { type: "NUMBER", min: 1, max: 499, length: 3 },
  ],

  // PBXX0XXX (00–30) (001–499)
  [
    { type: "STRING", value: "PB" },
    { type: "NUMBER", min: 0, max: 30, length: 2 },
    { type: "STRING", value: "0" },
    { type: "NUMBER", min: 1, max: 499, length: 3 },
  ],

  // IM000XXX (000–400)
  [
    { type: "STRING", value: "IM000" },
    { type: "NUMBER", min: 0, max: 400, length: 3 },
  ],

  // MAV 0XXX (000–399)
  [
    { type: "STRING", value: "MAV 0" },
    { type: "NUMBER", min: 0, max: 399, length: 3 },
  ],

  // MOVIE 0XXX (000–300)
  [
    { type: "STRING", value: "MOVIE 0" },
    { type: "NUMBER", min: 0, max: 300, length: 3 },
  ],

  // ANMR0XXX (000–300)
  [
    { type: "STRING", value: "ANMR0" },
    { type: "NUMBER", min: 0, max: 300, length: 3 },
  ],

  // Snímek XXX (001–300)
  [
    { type: "STRING", value: "Snímek " },
    { type: "NUMBER", min: 1, max: 300, length: 3 },
  ],

  // DIGI0XXX (001–300)
  [
    { type: "STRING", value: "DIGI0" },
    { type: "NUMBER", min: 1, max: 300, length: 3 },
  ],

  // ASF 0XXX (001–300)
  [
    { type: "STRING", value: "ASF 0" },
    { type: "NUMBER", min: 1, max: 300, length: 3 },
  ],

  // VXX0XXX (00–50) (101–300)
  [
    { type: "STRING", value: "V" },
    { type: "NUMBER", min: 0, max: 50, length: 2 },
    { type: "STRING", value: "0" },
    { type: "NUMBER", min: 101, max: 300, length: 3 },
  ],

  // IONX0XXX (001–250)
  [
    { type: "STRING", value: "IONX0" },
    { type: "NUMBER", min: 1, max: 250, length: 3 },
  ],

  // VICO0XXX (001–250)
  [
    { type: "STRING", value: "VICO0" },
    { type: "NUMBER", min: 1, max: 250, length: 3 },
  ],

  // ArcSoft VideoXXX (1-249)
  [
    { type: "STRING", value: "ArcSoft Video" },
    { type: "NUMBER", min: 1, max: 249, length: 3 },
  ],

  // PRMS0XXX (001-200)
  [
    { type: "STRING", value: "PRMS0" },
    { type: "NUMBER", min: 1, max: 200, length: 3 },
  ],

  // SMOV0XXX (001-200)
  [
    { type: "STRING", value: "SMOV0" },
    { type: "NUMBER", min: 1, max: 200, length: 3 },
  ],

  // RCA 0XXX (001-200)
  [
    { type: "STRING", value: "RCA 0" },
    { type: "NUMBER", min: 1, max: 200, length: 3 },
  ],

  // MOVA0XXX (001-200)
  [
    { type: "STRING", value: "MOVA0" },
    { type: "NUMBER", min: 1, max: 200, length: 3 },
  ],

  // “Sequence XXX” (001-200)
  [
    { type: "STRING", value: "Sequence " },
    { type: "NUMBER", min: 1, max: 200, length: 3 },
  ],

  // WideoXXX (000-199)
  [
    { type: "STRING", value: "Wideo" },
    { type: "NUMBER", min: 0, max: 199, length: 3 },
  ],

  // MAX 0XXX (001-150)
  [
    { type: "STRING", value: "MAX 0" },
    { type: "NUMBER", min: 1, max: 150, length: 3 },
  ],

  // MDGC0XXX (001-150)
  [
    { type: "STRING", value: "MDGC0" },
    { type: "NUMBER", min: 1, max: 150, length: 3 },
  ],

  // PCDV0XXX (001-150)
  [
    { type: "STRING", value: "PCDV0" },
    { type: "NUMBER", min: 1, max: 150, length: 3 },
  ],

  // HD0 0XXX (000-120)
  [
    { type: "STRING", value: "HD0 0" },
    { type: "NUMBER", min: 0, max: 120, length: 3 },
  ],

  // “Filmato 0XXX” (001-120)
  [
    { type: "STRING", value: "Filmato 0" },
    { type: "NUMBER", min: 1, max: 120, length: 3 },
  ],

  // “Il mio filmato X” (1-100)
  [
    { type: "STRING", value: "Il mio filmato " },
    { type: "NUMBER", min: 1, max: 100, length: 1 },
  ],

  // LOOP0XXX (001-100)
  [
    { type: "STRING", value: "LOOP0" },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
  ],

  // MAX 0XXX (001-100)
  [
    { type: "STRING", value: "MAX 0" },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
  ],

  // SMDC0XXX (001-100)
  [
    { type: "STRING", value: "SMDC0" },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
  ],

  // HUNT0XXX (001-100)
  [
    { type: "STRING", value: "HUNT0" },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
  ],

  // ACXS0XXX (001-100)
  [
    { type: "STRING", value: "ACXS0" },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
  ],

  // MVC XXXV (001-100)  -> XXX digits, V literal
  [
    { type: "STRING", value: "MVC " },
    { type: "NUMBER", min: 1, max: 100, length: 3 },
    { type: "STRING", value: "V" },
  ],

  // MA0 00XX (00-99)
  [
    { type: "STRING", value: "MA0 00" },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
  ],

  // MMF00XX (00-99)
  [
    { type: "STRING", value: "MMF00" },
    { type: "NUMBER", min: 0, max: 99, length: 2 },
  ],

  // G01000XX (10-99)
  [
    { type: "STRING", value: "G01000" },
    { type: "NUMBER", min: 10, max: 99, length: 2 },
  ],

  // PCXX00XX (00-30) (01-99)  -> two separate 2-digit fields
  [
    { type: "STRING", value: "PC" },
    { type: "NUMBER", min: 0, max: 30, length: 2 },
    { type: "STRING", value: "00" },
    { type: "NUMBER", min: 1, max: 99, length: 2 },
  ],

  // “Sequence XX X” (01-99) (1-3)
  [
    { type: "STRING", value: "Sequence " },
    { type: "NUMBER", min: 1, max: 99, length: 2 },
    { type: "STRING", value: " " },
    { type: "NUMBER", min: 1, max: 3, length: 1 },
  ],

  // “My Project X” (0-50)
  [
    { type: "STRING", value: "My Project " },
    { type: "NUMBER", min: 0, max: 50, length: 1 },
  ],

  // "Kazam Screencast 000XX" (01-50)
  [
    { type: "STRING", value: "Kazam Screencast 000" },
    { type: "NUMBER", min: 1, max: 50, length: 2 },
  ],

  // CADDX0000XX (01-50)
  [
    { type: "STRING", value: "CADDX0000" },
    { type: "NUMBER", min: 1, max: 50, length: 2 },
  ],

  // ZOE 00XX (01-50)
  [
    { type: "STRING", value: "ZOE 00" },
    { type: "NUMBER", min: 1, max: 50, length: 2 },
  ],

  // “QuickCapture Video - Month D, YYYY” (>2007, <2013)
  [
    { type: "STRING", value: "QuickCapture Video - " },
    {
      type: "DATE",
      format: "MMMM D, YYYY",
      min: new Date("2008-01-01T00:00:00.000Z"),
      max: new Date("2012-12-31T23:59:59.999Z"),
    },
  ],

  // Webcam YYYYMMDD (>2007, <2010)
  [
    { type: "STRING", value: "Webcam " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2008-01-01T00:00:00.000Z"),
      max: new Date("2009-12-31T23:59:59.999Z"),
    },
  ],

  // Webcam Recorded Video - Month D, YYYY (>2008, <2010)
  [
    { type: "STRING", value: "Webcam Recorded Video - " },
    {
      type: "DATE",
      format: "MMMM D, YYYY",
      min: new Date("2009-01-01T00:00:00.000Z"),
      max: new Date("2009-12-31T23:59:59.999Z"),
    },
  ],

  // Webcam video Month D, YYYY (>2010, <2012)
  [
    { type: "STRING", value: "Webcam video " },
    {
      type: "DATE",
      format: "MMMM D, YYYY",
      min: new Date("2011-01-01T00:00:00.000Z"),
      max: new Date("2011-12-31T23:59:59.999Z"),
    },
  ],

  // “Project of DD Mth 2011 PDT”
  // Interpreting "Mth" as a 3-letter month name; fixed year 2011; " PDT" literal
  [
    { type: "STRING", value: "Project of " },
    {
      type: "DATE",
      format: "DD MMM 2011",
      min: new Date("2011-01-01T00:00:00.000Z"),
      max: new Date("2011-12-31T23:59:59.999Z"),
    },
    { type: "STRING", value: " PDT" },
  ],

  // Webcam video from Month D, YYYY (>2011, <2016)
  [
    { type: "STRING", value: "Webcam video from " },
    {
      type: "DATE",
      format: "MMMM D, YYYY",
      min: new Date("2012-01-01T00:00:00.000Z"),
      max: new Date("2015-12-31T23:59:59.999Z"),
    },
  ],

  // SCR YYYYMMDD (>2014, <2018)
  [
    { type: "STRING", value: "SCR " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2015-01-01T00:00:00.000Z"),
      max: new Date("2017-12-31T23:59:59.999Z"),
    },
  ],

  // Flipagram Month YYYY (>2013, <2019)
  [
    { type: "STRING", value: "Flipagram " },
    {
      type: "DATE",
      format: "MMMM YYYY",
      min: new Date("2014-01-01T00:00:00.000Z"),
      max: new Date("2018-12-31T23:59:59.999Z"),
    },
  ],

  // Iw3mp YYYYMMDD (>2008, <2020)
  [
    { type: "STRING", value: "Iw3mp " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2009-01-01T00:00:00.000Z"),
      max: new Date("2019-12-31T23:59:59.999Z"),
    },
  ],

  // "AR.Drone 2.0 Video: YYYY” (>2015, <2021)
  [
    { type: "STRING", value: "AR.Drone 2.0 Video: " },
    {
      type: "DATE",
      format: "YYYY",
      min: new Date("2016-01-01T00:00:00.000Z"),
      max: new Date("2020-12-31T23:59:59.999Z"),
    },
  ],

  // WA VID YYYYMMDD (>2018, <2023)
  [
    { type: "STRING", value: "WA VID " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2019-01-01T00:00:00.000Z"),
      max: new Date("2022-12-31T23:59:59.999Z"),
    },
  ],

  // XRecorder DDMMYYYY (>2021, <2024)
  [
    { type: "STRING", value: "XRecorder " },
    {
      type: "DATE",
      format: "DDMMYYYY",
      min: new Date("2022-01-01T00:00:00.000Z"),
      max: new Date("2023-12-31T23:59:59.999Z"),
    },
  ],

  // CODWAWMP YYYY MM DD (>2008, <2023)
  [
    { type: "STRING", value: "CODWAWMP " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2009-01-01T00:00:00.000Z"),
      max: new Date("2022-12-31T23:59:59.999Z"),
    },
  ],

  // Hl2 YYYY MM DD (>2008, <2023)
  [
    { type: "STRING", value: "Hl2 " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2009-01-01T00:00:00.000Z"),
      max: new Date("2022-12-31T23:59:59.999Z"),
    },
  ],

  // Grand Theft Auto 5 YYYY MM DD (>2008)
  [
    { type: "STRING", value: "Grand Theft Auto 5 " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2009-01-01T00:00:00.000Z"),
    },
  ],

  // Javaw YYYY MM DD (>2009)
  [
    { type: "STRING", value: "Javaw " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2010-01-01T00:00:00.000Z"),
    },
  ],

  // Chrome YYYY MM DD (>2010)
  [
    { type: "STRING", value: "Chrome " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2011-01-01T00:00:00.000Z"),
    },
  ],

  // Bandicam YYYY MM DD (>2010)
  [
    { type: "STRING", value: "Bandicam " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2011-01-01T00:00:00.000Z"),
    },
  ],

  // Screen Recording YYYY MM DD (>2012)
  [
    { type: "STRING", value: "Screen Recording " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2013-01-01T00:00:00.000Z"),
    },
  ],

  // YouCut YYYYMMDD (>May 2018)
  [
    { type: "STRING", value: "YouCut " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2018-06-01T00:00:00.000Z"),
    },
  ],

  // Km YYYYMMDD (>2021)
  [
    { type: "STRING", value: "Km " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2022-01-01T00:00:00.000Z"),
    },
  ],

  // Simplescreenrecorder YYYY MM DD (>2023)
  [
    { type: "STRING", value: "Simplescreenrecorder " },
    {
      type: "DATE",
      format: "YYYY MM DD",
      min: new Date("2024-01-01T00:00:00.000Z"),
    },
  ],

  // 720p YYMMDD (>2023)
  [
    { type: "STRING", value: "720p " },
    {
      type: "DATE",
      format: "YYMMDD",
      min: new Date("2024-01-01T00:00:00.000Z"),
    },
  ],

  // XRecorder YYYYMMDD (>2024)
  [
    { type: "STRING", value: "XRecorder " },
    {
      type: "DATE",
      format: "YYYYMMDD",
      min: new Date("2025-01-01T00:00:00.000Z"),
    },
  ],
];
