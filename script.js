
const header=document.querySelector('[data-header]');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));
document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const filters=[...document.querySelectorAll('.filter')];
const tiles=[...document.querySelectorAll('.tile')];
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;tiles.forEach(t=>t.classList.toggle('hide',f!=='All'&&t.dataset.category!==f));}));
const lb=document.getElementById('lightbox'), lbImg=lb.querySelector('img'), lbText=lb.querySelector('p');let current=0;
function visibleTiles(){return tiles.filter(t=>!t.classList.contains('hide'))}
function openLb(tile){const list=visibleTiles();current=list.indexOf(tile);show(list[current]);lb.classList.add('open');lb.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function show(tile){lbImg.src=tile.dataset.full;lbImg.alt=tile.dataset.title;lbText.textContent=tile.dataset.title+' — '+tile.dataset.category}
function move(dir){const list=visibleTiles();current=(current+dir+list.length)%list.length;show(list[current])}
tiles.forEach(t=>t.addEventListener('click',()=>openLb(t)));
lb.querySelector('.close').onclick=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');document.body.style.overflow=''};
lb.querySelector('.prev').onclick=()=>move(-1);lb.querySelector('.next').onclick=()=>move(1);
lb.addEventListener('click',e=>{if(e.target===lb)lb.querySelector('.close').click()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.querySelector('.close').click();if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)});
