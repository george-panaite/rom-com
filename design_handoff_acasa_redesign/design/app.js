/* ============================================================
   GHID OLANDA — "Acasă" · app logic
   ============================================================ */
document.documentElement.classList.add("js");

const I = {
  arr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  tip:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 4 .8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/></svg>',
  warn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 9.5 21 3M21 3l-6.5 18a.55.55 0 0 1-1 0l-3.5-7-7-3.5a.55.55 0 0 1 0-1Z"/></svg>',
  admin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9v.01M9 12v.01M9 15v.01"/></svg>',
  sanatate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.9Z"/></svg>',
  business:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18M3 9l2-5h14l2 5M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M9 13h6"/></svg>',
};

const GUIDES = [
  {
    slug:"bsn", cat:"Administrativ", cc:"admin", icon:I.admin,
    title:"Înregistrare la primărie și numărul BSN",
    summary:"Primul pas când ajungi în Olanda. Fără BSN nu poți munci, deschide cont sau face asigurare.",
    authority:"Gemeente", cost:"Gratuit", duration:"30-45 min", difficulty:"Mediu",
    standfirst:"Primul pas pentru oricine se mută aici. Fără BSN, viața în Olanda stă pe loc. Iată exact cum îl obții.",
    body:`
<p>Dacă te muți în Olanda ca să muncești, studiezi sau locuiești, primul lucru pe care îl ai de făcut este să te înregistrezi la primăria locală, adică <span class="nl">Gemeente</span>. De aici primești numărul <span class="nl">BSN</span> (Burgerservicenummer), codul tău personal în sistemul olandez.</p>
<p>Fără un BSN nu poți semna un contract de muncă legal, nu poți deschide un cont bancar, nu poți încheia o asigurare de sănătate și nu poți cere alocații (<span class="nl">toeslagen</span>).</p>
<h2><span class="num">1</span>Alege tipul de înregistrare</h2>
<p>Depinde cât stai. Sub 4 luni te înregistrezi ca nerezident în <span class="nl">RNI</span> la una dintre cele 19 primării cu ghișeu special (Eindhoven, Venlo, Rotterdam, Amsterdam, Utrecht) și primești BSN pe loc.</p>
<p>Peste 4 luni ești obligat prin lege să te înscrii în <span class="nl">BRP</span> la primăria localității unde locuiești, în termen de <strong>5 zile</strong> de la sosire.</p>
<h2><span class="num">2</span>Pregătește documentele</h2>
<ol>
<li><strong>Act de identitate valabil.</strong> Pașaport sau carte de identitate. Permisul de conducere nu este acceptat.</li>
<li><strong>Dovada adresei.</strong> Un contract de închiriere (<span class="nl">huurcontract</span>) sau o declarație a proprietarului (<span class="nl">verklaring de inwoning</span>).</li>
<li><strong>Acte de stare civilă.</strong> Certificat de naștere și, dacă e cazul, de căsătorie.</li>
</ol>
<div class="callout tip"><div class="ct">${I.tip} Sfat util</div>Certificatele românești în format european (multilingv, albastru sau verde) sunt acceptate direct, fără traducere și fără apostilă. Modelul vechi trebuie tradus autorizat și apostilat.</div>
<h2><span class="num">3</span>Atenție la „fără înregistrare”</h2>
<p>Pe grupurile de Facebook vezi des camere oferite cu mențiunea <span class="nl">geen inschrijving</span>, adică „fără înregistrare”.</p>
<div class="callout warning"><div class="ct">${I.warn} Capcană frecventă</div>Închirierea fără posibilitatea de înregistrare este <strong>ilegală</strong>. Nu vei putea obține BSN pe termen lung, riști amenzi, iar angajatorul îți poate aplica taxa de urgență de aproximativ 52% (<span class="nl">anoniementarief</span>).</div>
<h2><span class="num">4</span>Ce urmează după BSN</h2>
<ul>
<li>Deschizi un cont bancar olandez.</li>
<li>Creezi un <span class="nl">DigiD</span>, identitatea ta digitală pentru toate instituțiile.</li>
<li>Închei asigurarea de sănătate obligatorie în maximum 4 luni.</li>
</ul>`,
    sources:[["Rijksoverheid, despre BSN","#"],["Gemeente, inschrijving BRP","#"],["RNI, lista celor 19 primării","#"]],
    qa:[["M","Se poate face programarea RNI online sau doar la telefon?","3 răspunsuri, acum 2 zile"],["I","Cât durează între programare și primirea efectivă a BSN-ului?","5 răspunsuri, acum 1 săpt."]],
  },
  {
    slug:"asigurare", cat:"Sănătate", cc:"sanatate", icon:I.sanatate,
    title:"Asigurarea de sănătate (Zorgverzekering)",
    summary:"Asigurarea medicală este obligatorie. Cum o alegi și cum ceri subvenția lunară.",
    authority:"Asigurători", cost:"€140-165 / lună", duration:"obligatoriu în 4 luni", difficulty:"Ușor",
    standfirst:"Sistemul e privat, dar obligatoriu. Costă mai puțin decât crezi. Iată cum funcționează.",
    body:`
<p>În Olanda, sănătatea se bazează pe asigurări private obligatorii. Toți cei care locuiesc sau muncesc legal aici trebuie să încheie o asigurare de bază (<span class="nl">basisverzekering</span>) în termen de <strong>4 luni</strong> de la înregistrare.</p>
<h2><span class="num">1</span>Riscul propriu (eigen risico)</h2>
<p>În fiecare an, primii <strong>€385</strong> de costuri medicale îi suporți tu. Abia după acest prag intervine asigurarea.</p>
<div class="callout note"><div class="ct">${I.note} Bun de știut</div>Vizitele la medicul de familie (<span class="nl">huisarts</span>) și îngrijirea copiilor sub 18 ani sunt gratuite și nu intră în riscul propriu.</div>
<h2><span class="num">2</span>Subvenția lunară (Zorgtoeslag)</h2>
<p>Cu un venit mic spre mediu, statul îți rambursează o parte din costul asigurării prin <span class="nl">Zorgtoeslag</span>. Se cere online la <span class="nl">Belastingdienst</span> cu DigiD.</p>
<h2><span class="num">3</span>Cum alegi asigurătorul</h2>
<ul>
<li>Compară pe site-uri independente (Independer, Zorgkiezer).</li>
<li>Poți schimba asigurătorul o dată pe an, până pe 31 decembrie.</li>
<li>Verifică dacă acoperă medicul și farmacia din zona ta.</li>
</ul>
<div class="callout tip"><div class="ct">${I.tip} Sfat util</div>Pachetul de bază este identic prin lege la toți asigurătorii. Diferă doar prețul și serviciile suplimentare, așa că nu plăti pentru opțiuni (<span class="nl">aanvullend</span>) de care nu ai nevoie.</div>`,
    sources:[["Rijksoverheid, Zorgverzekering","#"],["Belastingdienst, Zorgtoeslag","#"]],
    qa:[["G","Merită asigurarea suplimentară pentru dentist?","7 răspunsuri, acum 4 zile"]],
  },
  {
    slug:"kvk", cat:"Business", cc:"business", icon:I.business,
    title:"Înregistrare ca freelancer (ZZP) la KVK",
    summary:"Vrei să lucrezi pe cont propriu. Programare la KVK, taxe și TVA explicate simplu.",
    authority:"KVK", cost:"€80,10", duration:"1-2 săptămâni", difficulty:"Mediu",
    standfirst:"Zugrav, electrician, programator sau livrator. Statutul de ZZP îți deschide munca pe cont propriu. Iată drumul.",
    body:`
<p>Ca să lucrezi pe cont propriu în Olanda te înregistrezi ca întreprindere individuală (<span class="nl">Eenmanszaak</span>). Statutul tău devine <span class="nl">ZZP</span> (Zelfstandige Zonder Personeel), adică independent fără angajați.</p>
<h2><span class="num">1</span>Pașii înregistrării</h2>
<ol>
<li>Ai deja BSN și o adresă înregistrată la primărie.</li>
<li>Pregătești un nume de firmă și descrii activitatea (codul <span class="nl">SBI</span>).</li>
<li>Faci o programare online la <span class="nl">KVK</span> (Camera de Comerț).</li>
<li>Te prezinți cu actul de identitate și plătești taxa unică de <strong>€80,10</strong>.</li>
</ol>
<div class="callout tip"><div class="ct">${I.tip} Sfat util</div>Vei primi numărul KVK pe loc și, în câteva zile, un cod de TVA (<span class="nl">btw-id</span>) de la Belastingdienst.</div>
<h2><span class="num">2</span>Taxe și TVA</h2>
<p>Ca ZZP plătești impozit pe venit (<span class="nl">inkomstenbelasting</span>) și, de regulă, TVA (<span class="nl">btw</span>) de 21% sau 9%. Există deduceri importante pentru antreprenori: <span class="nl">zelfstandigenaftrek</span> și <span class="nl">startersaftrek</span> în primii ani.</p>
<div class="callout warning"><div class="ct">${I.warn} Nu uita</div>Păstrează facturile și extrasele minimum 7 ani. Declarațiile de TVA se depun trimestrial, iar întârzierile aduc amenzi.</div>`,
    sources:[["KVK, inschrijven","#"],["Belastingdienst, btw voor zzp","#"],["KVK, SBI-codes","#"]],
    qa:[["V","Pot fi ZZP și angajat în același timp?","4 răspunsuri, acum 6 zile"],["C","Cât pun deoparte pentru taxe din fiecare factură?","9 răspunsuri, acum 3 zile"]],
  },
];

/* ---------- HOME: filters + list ---------- */
const CATS = ["Toate", ...new Set(GUIDES.map(g=>g.cat))];
let activeCat = "Toate";

function renderFilters(){
  document.getElementById("filters").innerHTML = CATS.map(c=>
    `<button class="filter ${c===activeCat?"active":""}" data-cat="${c}">${c}</button>`).join("");
}
function renderList(){
  const list = GUIDES.filter(g=>activeCat==="Toate"||g.cat===activeCat);
  document.getElementById("guides").innerHTML = list.map(g=>`
    <div class="grow" data-open="${g.slug}">
      <div class="gicon ${g.cc}">${g.icon}</div>
      <div class="mid"><div class="cat">${g.cat}</div><h3>${g.title}</h3><p>${g.summary}</p></div>
      <div class="end">
        <div class="facts"><div class="v">${g.cost}</div><div class="l">${g.duration}</div></div>
        <div class="go">${I.arr}</div>
      </div>
    </div>`).join("");
}

/* ---------- ARTICLE ---------- */
function renderArticle(slug){
  const g = GUIDES.find(x=>x.slug===slug); if(!g) return;
  document.getElementById("view-article").innerHTML = `
    <div class="article">
      <div class="wrap" style="max-width:var(--prose)"><a class="back-link" data-nav="home">${I.back} Înapoi la ghiduri</a></div>
      <div class="wrap">
        <header class="art-head">
          <div class="top"><span class="art-cat ${g.cc}">${g.cat}</span><span class="when">Actualizat 13 iunie 2026</span></div>
          <h1>${g.title}</h1>
          <p class="standfirst">${g.standfirst}</p>
        </header>
        <section class="fisa">
          <div class="fisa-bar">${I.file} Fișă procedură</div>
          <div class="fisa-grid">
            <div class="fisa-cell"><div class="l">Instituție</div><div class="v">${g.authority}</div></div>
            <div class="fisa-cell"><div class="l">Cost oficial</div><div class="v">${g.cost}</div></div>
            <div class="fisa-cell"><div class="l">Timp</div><div class="v">${g.duration}</div></div>
            <div class="fisa-cell"><div class="l">Dificultate</div><div class="v">${g.difficulty}</div></div>
          </div>
        </section>
        <article class="prose">${g.body}</article>
        <div class="sources">
          <div class="l">Surse oficiale</div>
          ${g.sources.map(s=>`<a data-src>${I.ext} ${s[0]}</a>`).join("")}
        </div>
        <div class="art-ana" data-nav="ana">
          <div class="ana-face">A</div>
          <div class="txt"><h4>Ai un caz specific?</h4><p>Ana cunoaște acest ghid și îți răspunde pe loc, în limba română.</p></div>
          <button class="btn btn-ink">Întreabă pe Ana <span class="arr">${I.arr}</span></button>
        </div>
        <section class="qa">
          <span class="eyebrow">Din comunitate, în curând</span>
          <div class="rows">
            ${g.qa.map(q=>`<div class="row"><div class="av">${q[0]}</div><div><div class="q">${q[1]}</div><div class="meta">${q[2]}</div></div></div>`).join("")}
          </div>
        </section>
      </div>
    </div>`;
}

/* ---------- ANA CHAT ---------- */
const SUGS = [
  "Tocmai am ajuns. De unde încep?",
  "Cum obțin BSN-ul cât mai repede?",
  "Ce-mi trebuie pentru asigurarea de sănătate?",
  "Cum mă înregistrez ca ZZP la KVK?",
];
function anaAnswer(q){
  const t = q.toLowerCase();
  if(t.includes("ajuns")||t.includes("încep")||t.includes("incep")||t.includes("unde"))
    return `<p>Bun venit! Iată ordinea care îți simplifică totul:</p><ol><li>Înregistrare la primărie (<span class="nl">Gemeente</span>) și primești <strong>BSN</strong>.</li><li>Cont bancar olandez.</li><li><span class="nl">DigiD</span>, identitatea digitală.</li><li>Asigurare de sănătate, în maximum 4 luni.</li></ol><p>Începe cu primul pas: <a data-open="bsn">Înregistrare la primărie și BSN</a>.</p><div class="mini-note">Informațiile sunt orientative și nu înlocuiesc instituțiile oficiale.</div>`;
  if(t.includes("bsn")||t.includes("primări")||t.includes("primari"))
    return `<p>Pentru <strong>BSN</strong> te înregistrezi la <span class="nl">Gemeente</span>:</p><ol><li>Faci o programare la primăria localității tale.</li><li>Aduci act de identitate și dovada adresei (<span class="nl">huurcontract</span>).</li><li>Stai sub 4 luni? Folosești ghișeul <span class="nl">RNI</span> și primești BSN pe loc.</li></ol><p>Ghidul complet: <a data-open="bsn">Înregistrare la primărie și BSN</a>.</p>`;
  if(t.includes("asigur")||t.includes("sănăt")||t.includes("sanat")||t.includes("zorg"))
    return `<p>Asigurarea de bază (<span class="nl">basisverzekering</span>) este <strong>obligatorie</strong> în 4 luni de la înregistrare.</p><ul><li>Risc propriu anual: €385.</li><li>Cu venit mic, ceri subvenția <span class="nl">Zorgtoeslag</span>.</li><li>Medicul de familie (<span class="nl">huisarts</span>) este gratuit.</li></ul><p>Detalii aici: <a data-open="asigurare">Asigurarea de sănătate</a>.</p>`;
  if(t.includes("kvk")||t.includes("zzp")||t.includes("firm")||t.includes("freelanc"))
    return `<p>Ca <strong>ZZP</strong> te înregistrezi la <span class="nl">KVK</span>:</p><ol><li>Pregătești numele firmei și codul de activitate (SBI).</li><li>Programare online la KVK.</li><li>Plătești taxa unică de €80,10 și primești numărul KVK.</li></ol><p>Ghidul: <a data-open="kvk">Înregistrare ca ZZP la KVK</a>.</p>`;
  return `<p>Sunt aici pentru pașii din Olanda: <strong>BSN</strong>, asigurare de sănătate, deschiderea unei firme (<span class="nl">KVK / ZZP</span>) și altele. Cu ce te pot ajuta?</p>`;
}

let anaMsgs = [], anaSeeded = false, anaTyping = false;
function renderAna(seed){
  document.getElementById("view-ana").innerHTML = `
    <div class="ana-view"><div class="wrap"><div class="ana-shell">
      <div class="ana-hero">
        <div class="ana-face">A</div>
        <h1>Salut, sunt <em>Ana</em>.</h1>
        <p>Asistenta ta digitală pentru viața în Olanda. Întreabă-mă orice despre acte sau primii pași și îți răspund în română.</p>
      </div>
      <div class="chat">
        <div class="chat-stream" id="stream"></div>
        <div class="chat-input"><form id="anaForm">
          <input id="anaInput" placeholder="Scrie întrebarea ta..." autocomplete="off">
          <button class="chat-send" id="anaSend" type="submit" disabled>${I.send}</button>
        </form></div>
      </div>
      <p class="ana-disclaim">Ana folosește un sistem AI (conform EU AI Act). Răspunsurile sunt orientative și nu înlocuiesc asistența oficială a instituțiilor statului.</p>
    </div></div></div>`;
  const input = document.getElementById("anaInput"), send = document.getElementById("anaSend");
  input.addEventListener("input", ()=>{ send.disabled = !input.value.trim(); });
  document.getElementById("anaForm").addEventListener("submit", e=>{ e.preventDefault(); anaSend(input.value); input.value=""; send.disabled=true; });
  drawStream();
  if(seed && !anaSeeded){ anaSeeded = true; anaSend(`Am citit ghidul „${seed}” și aș vrea câteva lămuriri.`); }
}
function drawStream(){
  const s = document.getElementById("stream"); if(!s) return;
  if(anaMsgs.length===0){
    s.innerHTML = `<div class="chat-empty"><div class="l">Întrebări frecvente</div><div class="sugs">${SUGS.map(x=>`<button class="sug" data-sug="${x}">${x}<span>${I.arr}</span></button>`).join("")}</div></div>`;
    return;
  }
  s.innerHTML = anaMsgs.map(m=> m.role==="user"
    ? `<div class="msg user"><div class="m-av">Tu</div><div class="bubble">${m.html}</div></div>`
    : `<div class="msg ana"><div class="m-av">A</div><div class="bubble">${m.html}</div></div>`).join("")
    + (anaTyping ? `<div class="msg ana"><div class="m-av">A</div><div class="bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>` : "");
  s.scrollTop = s.scrollHeight;
}
function anaSend(text){
  if(!text.trim()) return;
  anaMsgs.push({role:"user", html:text.replace(/</g,"&lt;")});
  anaTyping = true; drawStream();
  setTimeout(()=>{ anaTyping=false; anaMsgs.push({role:"ana", html:anaAnswer(text)}); drawStream(); }, 950);
}

/* ---------- ROUTER ---------- */
function show(view){
  ["home","article","ana"].forEach(v=>{ document.getElementById("view-"+v).hidden = (v!==view); });
  document.getElementById("foot").style.display = view==="ana" ? "none" : "";
  document.querySelectorAll("nav.menu a[data-nav]").forEach(a=>a.classList.toggle("active", a.dataset.nav===view));
  window.scrollTo(0,0);
  requestAnimationFrame(armReveals);
}
function go(view, arg){
  if(view==="article") renderArticle(arg);
  if(view==="ana"){ if(!arg){ anaSeeded=false; anaMsgs=[]; } renderAna(arg); }
  show(view);
}

/* ---------- REVEALS ---------- */
function armReveals(){
  const els = [...document.querySelectorAll(".reveal:not(.in)")];
  if(!els.length) return;
  const io = new IntersectionObserver((ents)=>{
    ents.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add("in"), i*70); io.unobserve(e.target); } });
  }, {threshold:.12});
  els.forEach(el=>io.observe(el));
  // Safety net: if IntersectionObserver never fires (some embedded/preview
  // environments), reveal everything so the page is never left blank.
  setTimeout(()=>{ els.forEach(el=>el.classList.add("in")); }, 500);
}

/* ---------- CLICK DELEGATION ---------- */
document.addEventListener("click", e=>{
  const open = e.target.closest("[data-open]");
  if(open){ e.preventDefault(); go("article", open.dataset.open); return; }
  const sug = e.target.closest("[data-sug]");
  if(sug){ anaSend(sug.dataset.sug); return; }
  const cat = e.target.closest("[data-cat]");
  if(cat){ activeCat = cat.dataset.cat; renderFilters(); renderList(); return; }
  const nav = e.target.closest("[data-nav]");
  if(nav){ e.preventDefault(); go(nav.dataset.nav, nav.dataset.nav==="ana"?null:undefined); return; }
  if(e.target.closest("[data-src]")) e.preventDefault();
  const scr = e.target.closest("[data-scroll]");
  if(scr){ document.getElementById(scr.dataset.scroll).scrollIntoView({behavior:"smooth"}); }
});

/* ---------- INIT ---------- */
renderFilters();
renderList();
armReveals();
