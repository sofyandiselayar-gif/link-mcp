const {chromium}=require('playwright');
const FONTS='/home/user/link-mcp/fonts';const S=process.argv[2], OUT='/home/user/link-mcp/carousel-satoshi';
const ff=['Black:900','Bold:700','Medium:500'].map(x=>{const [n,w]=x.split(':');return `@font-face{font-family:'Satoshi';font-weight:${w};src:url('file://${FONTS}/Satoshi-${n}.woff2') format('woff2'),url('file://${FONTS}/Satoshi-${n}.otf') format('opentype')}`}).join('');
const css=ff+`*{margin:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:radial-gradient(circle at 50% 35%,#b3122a,#5a0615 75%);font-family:'Satoshi','Inter',sans-serif;font-weight:700;position:relative;overflow:hidden;color:#fff}
.c{position:absolute;top:0;width:90px;height:100%;background:repeating-linear-gradient(90deg,#7d0a1d 0 18px,#a00f26 18px 36px)}
.l{left:0}.r{right:0}
h1{font-weight:900;letter-spacing:0;word-spacing:4px;position:absolute;top:60px;left:120px;right:120px;text-align:center;color:#ffd24a;font-size:68px;line-height:1.1;text-shadow:4px 4px 0 #000}
.card{position:absolute;left:130px;right:130px;top:300px;height:700px;background:#faf9f3;border:10px solid #ffd24a;border-radius:24px;box-shadow:0 0 60px #ffd24a88;color:#111;overflow:hidden}
.card img{position:absolute;left:0;bottom:0;height:660px}
.bub{position:absolute;right:30px;top:40px;width:370px;background:#fff;border:5px solid #111;border-radius:20px;padding:22px;font-size:32px;line-height:1.25;text-align:center}
.list{position:absolute;right:30px;top:40px;width:380px;font-size:30px;line-height:1.45}
.big{position:absolute;right:30px;top:50px;width:380px;font-size:44px;line-height:1.2;text-align:center}
.cap{position:absolute;bottom:55px;left:120px;right:120px;text-align:center;font-size:40px;line-height:1.3;text-shadow:2px 2px 0 #000}
.pg{position:absolute;bottom:18px;width:100%;text-align:center;font-size:24px;color:#ffd24a}
.buzz{position:absolute;right:40px;top:255px;background:#ffd24a;color:#000;border:5px solid #000;border-radius:50%;width:140px;height:140px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:22px;transform:rotate(12deg);z-index:3;line-height:1.1}
.env{position:absolute;right:35px;bottom:40px}`;
const env=`<svg class="env" width="330" height="240" viewBox="0 0 330 240"><rect x="10" y="30" width="310" height="200" rx="8" fill="#fff" stroke="#111" stroke-width="6"/><polyline points="10,30 165,150 320,30" fill="none" stroke="#111" stroke-width="6"/><circle cx="165" cy="150" r="24" fill="#c8102e" stroke="#111" stroke-width="4"/></svg>`;
const slides=[
 {t:'<span style="font-size:56px">DUA NAMA. SATU AMPLOP.<br>SIAPA YANG LANJUT?</span>',body:`<div class="bub">Hmm... siapa yang lolos ya?</div>${env}`,cap:'Dua nama dalam amplop putih. Ini bukan pengumuman wakil presiden, ini babak final ajang pencarian bakat.',extra:'<div class="buzz">GOLDEN<br>BUZZER<br>11 DES</div>',pg:'Geser →'},
 {t:'LOWONGAN:<br>WAKIL PRESIDEN RI',body:`<div class="list">✔ Sehat jasmani<br>✔ Paham konstitusi<br>✔ Siap difoto di tiap acara<br>✔ Tahan komentar netizen 24/7</div>`,cap:'CV cuma 2 lembar, tapi yang screening 280 juta orang di kolom komentar.',pg:'2 / 6'},
 {t:'ISI AMPLOP<br>BIASANYA APA?',body:`<div class="bub">THR? Undangan nikah?</div><div class="big" style="top:230px">Kali ini isinya calon wakil presiden 😳</div>`,cap:'Hidup memang penuh kejutan.',pg:'3 / 6'},
 {t:'REAKSI NETIZEN +62',body:`<div class="bub">Dalam 5 menit saya sudah jadi ahli hukum tata negara!</div><div class="big" style="top:300px;font-size:36px">Gratis. Tanpa gelar.</div>`,cap:'"Katanya sih begini." "Katanya sih begitu." Sumbernya: tetangga sebelah.',pg:'4 / 6'},
 {t:'HITUNG MUNDUR<br>11 DESEMBER',body:`<div class="bub">Siap popcorn 🍿</div><div class="big" style="top:230px;font-size:38px">Pegawai: pura-pura kerja sambil buka berita</div>`,cap:'Hari sidang = semua orang mendadak jadi pengamat di grup WhatsApp keluarga.',pg:'5 / 6'},
 {t:'JADI...<br>MENURUTMU SIAPA?',body:`<div class="bub">Yang pasti, harga cabai tetap naik.</div>${env}`,cap:'Tulis tebakanmu di komentar & kirim ke teman yang paling sok tahu politik 😆',pg:'6 / 6'}
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const [i,s] of slides.entries()){
 const html=`<style>${css}</style><div class="c l"></div><div class="c r"></div><h1>${s.t}</h1>${s.extra||''}<div class="card"><img src="data:image/jpeg;base64,${require("fs").readFileSync(S+"/char.jpg").toString("base64")}">${s.body}</div><div class="cap">${s.cap}</div><div class="pg">${s.pg}</div>`;
 await p.setContent(html);await p.waitForTimeout(200);
 await p.screenshot({path:`${OUT}/slide-${i+1}.png`});}
await b.close();})();
