const fs=require('fs');const S=process.argv[2];const {chromium}=require('playwright');
const OUT='/home/user/link-mcp/carousel-suit', FONTS='/home/user/link-mcp/fonts';
const b64=n=>'data:image/png;base64,'+fs.readFileSync(`${S}/sp/${n}.png`).toString('base64');
const ff=['Black:900','Bold:700','Medium:500'].map(x=>{const [n,w]=x.split(':');return `@font-face{font-family:'Satoshi';font-weight:${w};src:url('file://${FONTS}/Satoshi-${n}.woff2') format('woff2'),url('file://${FONTS}/Satoshi-${n}.otf') format('opentype')}`}).join('');
const css=ff+`*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:linear-gradient(160deg,#f3eee7,#e4ddd2);font-family:'Satoshi','Inter',sans-serif;color:#141414;position:relative;overflow:hidden}
.top{position:absolute;top:56px;left:80px;right:80px;display:flex;justify-content:space-between;font-weight:700;font-size:22px;letter-spacing:4px;text-transform:uppercase}
.bar{position:absolute;top:120px;left:80px;width:90px;height:10px;background:#e8a317}
h1{position:absolute;top:160px;left:80px;right:80px;font-weight:900;font-size:104px;line-height:.98;letter-spacing:-3px}
.char{position:absolute;left:70px;bottom:285px;height:540px}
.bub{position:absolute;right:80px;top:640px;width:420px;background:#fff;border:5px solid #141414;border-radius:28px;padding:26px 30px;font-weight:700;font-size:36px;line-height:1.25}
.bub:after{content:'';position:absolute;left:-30px;bottom:38px;border:18px solid transparent;border-right:30px solid #141414}
.note{position:absolute;right:80px;top:910px;width:420px;font-weight:500;font-size:34px;line-height:1.3}
.env{position:absolute;right:80px;top:830px}
.cap{position:absolute;left:80px;right:80px;bottom:80px;font-weight:700;font-size:38px;line-height:1.3;border-top:3px solid #141414;padding-top:28px}
.pg{position:absolute;bottom:34px;left:80px;right:80px;display:flex;justify-content:space-between;font-weight:500;font-size:22px;letter-spacing:3px;opacity:.7}`;
const env=`<svg class="env" width="330" height="230" viewBox="0 0 330 240"><rect x="10" y="30" width="310" height="200" rx="8" fill="#fff" stroke="#141414" stroke-width="6"/><polyline points="10,30 165,150 320,30" fill="none" stroke="#141414" stroke-width="6"/><circle cx="165" cy="150" r="24" fill="#e8a317" stroke="#141414" stroke-width="4"/></svg>`;
const slides=[
 {t:'Dua nama.<br>Satu amplop.<br>Siapa yang lanjut?',c:'thinking',bub:'Hmm... siapa yang lolos ya?',extra:env,cap:'Dua nama dalam amplop putih. Ini bukan pengumuman wakil presiden, ini babak final ajang pencarian bakat.'},
 {t:'Lowongan:<br>Wakil Presiden RI',c:'confident',bub:'Boleh lamar?',note:'✔ Sehat jasmani<br>✔ Paham konstitusi<br>✔ Siap difoto di tiap acara<br>✔ Tahan komentar netizen 24/7',cap:'CV cuma 2 lembar, tapi yang screening 280 juta orang di kolom komentar.'},
 {t:'Isi amplop<br>biasanya apa?',c:'shocked',bub:'THR? Undangan nikah?',note:'Kali ini isinya calon wakil presiden.',cap:'Hidup memang penuh kejutan.'},
 {t:'Reaksi<br>netizen +62',c:'smug',bub:'Lima menit lalu saya resmi jadi ahli hukum tata negara.',note:'Gratis. Tanpa gelar.',cap:'"Katanya sih begini." "Katanya sih begitu." Sumbernya: tetangga sebelah.'},
 {t:'Hitung mundur<br>11 Desember',c:'watch',bub:'Popcorn sudah siap.',note:'Pegawai: pura-pura kerja sambil buka berita.',cap:'Hari sidang = semua orang mendadak jadi pengamat di grup WhatsApp keluarga.'},
 {t:'Jadi,<br>menurutmu siapa?',c:'winking',bub:'Yang pasti, harga cabai tetap naik.',extra:env,cap:'Tulis tebakanmu di komentar & kirim ke teman yang paling sok tahu politik.'}
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const [i,s] of slides.entries()){
 const html=`<style>${css}</style><div class="top"><span>Politik Jenaka</span><span>0${i+1} / 06</span></div><div class="bar"></div><h1>${s.t}</h1><img class="char" src="${b64(s.c)}"><div class="bub">${s.bub}</div>${s.note?`<div class="note">${s.note}</div>`:''}${s.extra||''}<div class="cap">${s.cap}</div><div class="pg"><span>${i<5?'Geser →':''}</span><span></span></div>`;
 await p.setContent(html);await p.waitForTimeout(200);await p.screenshot({path:`${OUT}/slide-${i+1}.png`});}
await b.close();})();
