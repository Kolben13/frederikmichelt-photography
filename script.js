
const data = window.PORTFOLIO_DATA || [];
const grid = document.querySelector('[data-grid]');
const buttons = document.querySelectorAll('[data-filter]');
const lightbox = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox img');
const lbMeta = document.querySelector('.lightbox__meta');
let active = data.slice(); let current = 0;
function render(filter='All'){
  active = filter==='All' ? data : data.filter(x=>x.category===filter);
  grid.innerHTML = active.map((x,i)=>`<button class="tile reveal" data-i="${i}" aria-label="Open image ${i+1}"><img loading="lazy" src="${x.thumb}" alt="${x.category} by Frederik Michelt"><span>${x.category}</span></button>`).join('');
  grid.querySelectorAll('.tile').forEach(b=>b.addEventListener('click',()=>openLb(+b.dataset.i)));
  reveal();
}
function openLb(i){ current=i; lbImg.src=active[i].src; lbMeta.textContent=`${active[i].category} — Frederik Michelt Photography`; lightbox.classList.add('is-open'); document.body.style.overflow='hidden';}
function closeLb(){ lightbox.classList.remove('is-open'); document.body.style.overflow='';}
function step(n){ current=(current+n+active.length)%active.length; openLb(current);}
document.querySelector('[data-close]').onclick=closeLb; document.querySelector('[data-prev]').onclick=()=>step(-1); document.querySelector('[data-next]').onclick=()=>step(1);
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLb()});
window.addEventListener('keydown',e=>{if(!lightbox.classList.contains('is-open'))return; if(e.key==='Escape')closeLb(); if(e.key==='ArrowLeft')step(-1); if(e.key==='ArrowRight')step(1);});
buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active')); btn.classList.add('active'); render(btn.dataset.filter);}));
function reveal(){ const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in'); obs.unobserve(e.target)}})},{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>obs.observe(el)); }
render(); reveal();

// Deutsch / English language switch
const translations = {
  de: {
    navPortfolio:'Portfolio', navAbout:'Über mich', navContact:'Kontakt',
    heroTag:'Hero Shot · Nachtrennen', kicker:'Motorsport • Nürburgring • Storytelling',
    heroTitle:'Geschwindigkeit einzufangen ist leicht. Emotionen einzufangen ist alles.',
    heroText:'Motorsportfotografie mit Fokus auf Langstreckenrennen, Atmosphäre und die Momente zwischen grüner Flagge und Zieleinlauf.',
    viewPortfolio:'Portfolio ansehen', bookShoot:'Shooting anfragen',
    introTitle:'Gebaut aus Geschwindigkeit, Licht und Emotion.',
    introText:'Von nassen Nachtstints bis zu ruhigen Momenten im Fahrerlager verbindet das Portfolio Rennaction mit der menschlichen Seite des Motorsports.',
    statFocus:'Hauptfokus', statEndurance:'Langstrecke', statStories:'Rennsport-Geschichten', statTrack:'Strecke + Fahrerlager', statCoverage:'Komplette Begleitung',
    selectedTitle:'Ausgewählte Arbeiten', selectedText:'Eine kuratierte Auswahl ohne Duplikate – als visuelle Geschichte von Nachtrennen über Rennaction bis zum Leben im Fahrerlager.',
    filterAll:'Alle', filterTrack:'Rennaction', filterNight:'Nachtrennen', filterPaddock:'Fahrerlager', filterPortraits:'Porträts', filterDetails:'Details', filterAtmosphere:'Atmosphäre',
    aboutKicker:'Über mich', aboutText:'Ich bin Motorsportfotograf aus Deutschland mit Fokus auf Langstreckenrennen und den Nürburgring. Meine Arbeit zeigt nicht nur Geschwindigkeit, sondern auch Atmosphäre, Menschen und Geschichten hinter jedem Rennwochenende.',
    availability:'Verfügbar für Teams, Fahrer, Veranstaltungen und redaktionelle Projekte. Die Begleitung umfasst Rennaction, Nachtrennen, Fahrerlager-Geschichten, Porträts und Atmosphäre.',
    contactKicker:'Kontakt', contactTitle:'Lass uns deine nächste Rennsport-Geschichte erzählen.', contactText:'Für Eventbegleitung, Team-Shootings oder Fahrer-Content erreichst du mich per E-Mail oder Instagram.',
    copyright:'© 2026 Frederik Michelt Photography. Alle Rechte vorbehalten.'
  },
  en: {
    navPortfolio:'Portfolio', navAbout:'About', navContact:'Contact',
    heroTag:'Hero Shot · Wet Night Racing', kicker:'Motorsport • Nürburgring • Storytelling',
    heroTitle:'Capturing speed is easy. Capturing emotion is everything.',
    heroText:'Motorsport photography focused on endurance racing, atmosphere and the moments that happen between green flag and chequered flag.',
    viewPortfolio:'View Portfolio', bookShoot:'Book a shoot',
    introTitle:'Built around speed, light and emotion.',
    introText:'From wet night stints to quiet paddock moments, the portfolio combines track action with the human side of racing.',
    statFocus:'Primary focus', statEndurance:'Endurance', statStories:'Racing stories', statTrack:'Track + Paddock', statCoverage:'Complete coverage',
    selectedTitle:'Selected Work', selectedText:'A tighter, curated selection with no duplicates — built as a visual story from night racing to track action and paddock life.',
    filterAll:'All', filterTrack:'Track Action', filterNight:'Night Racing', filterPaddock:'Paddock', filterPortraits:'Portraits', filterDetails:'Details', filterAtmosphere:'Atmosphere',
    aboutKicker:'About', aboutText:'I am a motorsport photographer based in Germany, focused on endurance racing and the Nürburgring. My work captures not only speed, but also the atmosphere, people and stories behind every race weekend.',
    availability:'Available for teams, drivers, events and editorial projects. Coverage includes on-track action, night racing, paddock stories, portraits and atmosphere.',
    contactKicker:'Contact', contactTitle:'Let’s create your next racing story.', contactText:'For event coverage, team shoots or driver content, get in touch via email or Instagram.',
    copyright:'© 2026 Frederik Michelt Photography. All rights reserved.'
  }
};
const categoryLabels = {
  de:{'Track Action':'Rennaction','Night Racing':'Nachtrennen','Paddock':'Fahrerlager','Portraits':'Porträts','Details':'Details','Atmosphere':'Atmosphäre'},
  en:{'Track Action':'Track Action','Night Racing':'Night Racing','Paddock':'Paddock','Portraits':'Portraits','Details':'Details','Atmosphere':'Atmosphere'}
};
let currentLanguage = localStorage.getItem('fm-language') || 'de';
function applyLanguage(lang){
  currentLanguage = translations[lang] ? lang : 'de';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const value = translations[currentLanguage][el.dataset.i18n];
    if(value) el.textContent=value;
  });
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===currentLanguage));
  localStorage.setItem('fm-language',currentLanguage);
  document.title = currentLanguage==='de' ? 'Frederik Michelt Photography — Motorsport • Nürburgring • Storytelling' : 'Frederik Michelt Photography — Motorsport • Nürburgring • Storytelling';
  render(document.querySelector('[data-filter].active')?.dataset.filter || 'All');
}
document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>applyLanguage(btn.dataset.lang)));

// Replace render/open labels with localized category names.
const originalRender = render;
render = function(filter='All'){
  active = filter==='All' ? data : data.filter(x=>x.category===filter);
  grid.innerHTML = active.map((x,i)=>`<button class="tile reveal" data-i="${i}" aria-label="${currentLanguage==='de'?'Bild öffnen':'Open image'} ${i+1}"><img loading="lazy" src="${x.thumb}" alt="${categoryLabels[currentLanguage][x.category] || x.category} by Frederik Michelt"><span>${categoryLabels[currentLanguage][x.category] || x.category}</span></button>`).join('');
  grid.querySelectorAll('.tile').forEach(b=>b.addEventListener('click',()=>openLb(+b.dataset.i)));
  reveal();
};
openLb = function(i){ current=i; lbImg.src=active[i].src; lbMeta.textContent=`${categoryLabels[currentLanguage][active[i].category] || active[i].category} — Frederik Michelt Photography`; lightbox.classList.add('is-open'); document.body.style.overflow='hidden';};
applyLanguage(currentLanguage);
