/* Slides, sound, gear, and questions. Loaded after copy.js. */
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const reduced=false;
let lang='en';
try{const s=localStorage.getItem('noc-kids-lang'); if(s==='ar'||s==='en') lang=s;}catch(e){}
const tr=(k,n)=>{const v=T[k]; if(!v) return k; let s=v[lang==='ar'?1:0]; if(n!==undefined) s=s.replace('{n}',n); return s;};

/* sound effects */
const SFX={
  whoosh:{src:'whoose.mp3', vol:.2, max:3},
  sparkle:{src:'sparkle.mp3', vol:.55, max:4},
  win:{src:'winning_board.mp3', vol:.1, max:2}
};
const sfxPools={};
Object.keys(SFX).forEach(k=>{const a=new Audio(SFX[k].src); a.preload='auto'; a.volume=SFX[k].vol; sfxPools[k]=[a];});
let soundOn=true;
try{ soundOn=localStorage.getItem('noc-kids-sound')!=='off'; }catch(e){}
function playSfx(k){
  if(!soundOn||!sfxPools[k]) return;
  const cfg=SFX[k], list=sfxPools[k];
  let a=list.find(x=>x.paused||x.ended);
  if(!a){
    if(list.length>=cfg.max) a=list[0];
    else{ a=new Audio(cfg.src); a.preload='auto'; a.volume=cfg.vol; list.push(a); }
  }
  try{ a.currentTime=0; }catch(e){}
  const p=a.play(); if(p&&p.catch) p.catch(()=>{});
}
function updateSound(){
  const b=$('#snd'); if(!b) return;
  b.textContent=soundOn?'🔊':'🔇';
  b.setAttribute('aria-pressed',String(soundOn));
  b.setAttribute('aria-label',tr(soundOn?'snd_off':'snd_on'));
}
/* phase loops (drilling, oil lift, ship horn, waves bed, heli) */
const LOOPS={
  drill:{src:'drill.mp3', vol:.3},
  suck:{src:'suck.mp3', vol:.45},
  ship:{src:'ship.mp3', vol:.28},
  waves:{src:'freesound_community-water-waves-71875.mp3', vol:.32, loop:false},
  heli:{src:'gd_salman-helicopter-ambience-353004.mp3', vol:.22}
};
const loopNodes={};
function loopSet(k,on){
  const cfg=LOOPS[k]; if(!cfg) return;
  let a=loopNodes[k];
  if(!on||!soundOn){
    if(a&&!a.paused){ try{a.pause();}catch(e){} try{a.currentTime=0;}catch(e){} }
    return;
  }
  if(!a){ a=new Audio(cfg.src); a.preload='auto'; a.loop=cfg.loop!==false; a.volume=cfg.vol; loopNodes[k]=a; }
  if(a.paused&&!a._fail){
    if(cfg.loop===false){ try{a.currentTime=0;}catch(e){} }
    const p=a.play();
    if(p&&p.catch) p.catch(()=>{a._fail=true; setTimeout(()=>{a._fail=false;},1500);});
  }
}
function loopStopAll(){ Object.keys(LOOPS).forEach(k=>{ if(k==='ship') shipStop(); else loopSet(k,false); }); }
/* ship horn: plays N times (no loop) with ease-in/out on each, SHIP.gap between plays */
const SHIP={gap:4000, fadeIn:600, fadeOut:800, node:null, on:false, fade:0, t1:0, t2:0};
function shipNode(){ if(!SHIP.node){ const a=new Audio(LOOPS.ship.src); a.preload='auto'; SHIP.node=a; } return SHIP.node; }
function shipRamp(to,ms,after){
  const a=shipNode(), from=a.volume, t0=performance.now();
  cancelAnimationFrame(SHIP.fade);
  const step=t=>{ const k=Math.min(1,(t-t0)/ms); a.volume=from+(to-from)*k; if(k<1) SHIP.fade=requestAnimationFrame(step); else if(after) after(); };
  SHIP.fade=requestAnimationFrame(step);
}
function shipPlayOne(a,afterEnd){
  try{ a.currentTime=0; }catch(e){}
  a.volume=0;
  const p=a.play(); if(p&&p.catch) p.catch(()=>{});
  shipRamp(LOOPS.ship.vol,SHIP.fadeIn);
  const fadeOut=()=>{ const dur=isFinite(a.duration)&&a.duration>0?a.duration:0;
    if(dur){ SHIP.t1=setTimeout(()=>{ if(SHIP.on) shipRamp(0,SHIP.fadeOut); },Math.max(0,dur*1000-SHIP.fadeOut)); }
    else { a.addEventListener('loadedmetadata',function once(){ a.removeEventListener('loadedmetadata',once); if(SHIP.on) fadeOut(); }); }
  };
  fadeOut();
  a.onended=()=>{ a.onended=null; if(afterEnd) afterEnd(); };
}
function shipHorn(times){
  if(!soundOn){ shipStop(); return; }
  const a=shipNode();
  clearTimeout(SHIP.t1); clearTimeout(SHIP.t2);
  cancelAnimationFrame(SHIP.fade);
  SHIP.on=true;
  let n=Math.max(1,times|0);
  const next=()=>{ if(n<=0||!SHIP.on) return; n--; shipPlayOne(a,()=>{ if(n>0&&SHIP.on) SHIP.t2=setTimeout(next,SHIP.gap); }); };
  next();
}
function shipStop(){
  SHIP.on=false;
  clearTimeout(SHIP.t1); clearTimeout(SHIP.t2);
  cancelAnimationFrame(SHIP.fade);
  const a=SHIP.node; if(!a) return;
  a.onended=null;
  if(!a.paused){ shipRamp(0,300,()=>{ try{a.pause(); a.currentTime=0;}catch(e){} }); }
  else { try{a.currentTime=0;}catch(e){} }
}

/* pools */
const poolBox=$('#pools');
for(let i=0;i<19;i++){const s=document.createElement('span'); s.className='pool'; s.style.setProperty('--i',i); s.textContent='🏊'; poolBox.appendChild(s);}

/* slides */
const slides=$$('.slide'), last=slides.length-1;
const depthEl=$('.depth-in'), mk=$('#mk'), dotsBox=$('.dots');
slides.forEach((s,i)=>{const b=document.createElement('button'); b.type='button'; b.className='dot'; b.addEventListener('click',()=>go(i)); dotsBox.appendChild(b);});
const dots=$$('.dots .dot');
let cur=-1;
let titleDone=false, titleRun=false; /* slide 0: must finish the first quote before leaving */
function go(i){
  i=Math.max(0,Math.min(last,i));
  if(i>cur && cur===0 && !titleDone){ if(!titleRun) startTitleTalk(); return; }
  if(i===cur) return;
  if(cur>=0){ playSfx('whoosh'); slides[cur].classList.remove('on'); }
  cur=i; if(i!==0){ titleDone=false; titleRun=false; } const s=slides[i]; s.classList.add('on'); s.scrollTop=0;
  const qh=narrHosts[i];
  if(qh&&SAY_ANCHORS[i]){ qh.classList.remove('enter'); void qh.offsetWidth; qh.classList.add('enter'); }
  placeQatra(i,0,false); /* snap her beside the first line while she is still invisible */
  const d=parseFloat(s.dataset.depth||'0');
  depthEl.style.setProperty('--d',d); mk.style.top=(d*100)+'%';
  updateNav();
  const k=s.dataset.k; if(k&&hooks[k]) hooks[k]();
  narrateSoon(i);
  dgSync(i);
}
function updateNav(){
  if(cur<0) return;
  dots.forEach((d,j)=>{d.classList.toggle('cur',j===cur); d.setAttribute('aria-label',tr('slide',j+1)); if(j===cur) d.setAttribute('aria-current','step'); else d.removeAttribute('aria-current');});
  const unrev=isUnrevealed(); $('#prev').disabled=cur===0; $('#next').disabled=cur===last&&!unrev; $('#nextT').textContent=tr(unrev?'reveal':'next'); $('#next').setAttribute('aria-label',tr(unrev?'reveal':'next'));
  $('#count').textContent=(cur+1)+' / '+(last+1);
}

/* drilling */
let drillRAF=0;
function runDrill(){
  const p=$('#well'), bit=$('#bit'), found=$('#found'), oil=$('#oilL');
  const L=p.getTotalLength();
  cancelAnimationFrame(drillRAF);
  found.classList.remove('show'); oil.classList.remove('glow');
  p.style.strokeDasharray=L; p.style.strokeDashoffset=L;
  const t0=performance.now(), dur=reduced?0:3200;
  function step(t){
    const k=dur?Math.min(1,(t-t0)/dur):1;
    const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    p.style.strokeDashoffset=L*(1-e);
    const pt=p.getPointAtLength(L*e); bit.setAttribute('cx',pt.x); bit.setAttribute('cy',pt.y);
    if(k<1) drillRAF=requestAnimationFrame(step);
    else{found.classList.add('show'); void oil.getBBox(); oil.classList.add('glow'); playSfx('sparkle');}
  }
  drillRAF=requestAnimationFrame(step);
}
/* counter */
function runCount(){
  const el=$('#bbl'), target=300000, t0=performance.now(), dur=reduced?0:1600;
  function f(t){const k=dur?Math.min(1,(t-t0)/dur):1; el.textContent=Math.round(target*(1-Math.pow(1-k,3))).toLocaleString('en-US'); if(k<1) requestAnimationFrame(f);}
  requestAnimationFrame(f);
}
/* confetti */
function confetti(n){
  if(reduced) return;
  const box=$('#confetti'), cols=['#FF7A1A','#FFC83D','#1BA9B5','#8A1538','#1F9D55','#ffffff'];
  for(let i=0;i<n;i++){
    const s=document.createElement('i');
    s.style.left=(Math.random()*100)+'%';
    s.style.background=cols[i%cols.length];
    s.style.setProperty('--dx',(Math.random()*180-90)+'px');
    s.style.setProperty('--r',(Math.random()*900-450)+'deg');
    s.style.animationDuration=(1.8+Math.random()*1.6)+'s';
    s.style.animationDelay=(Math.random()*.35)+'s';
    box.appendChild(s); setTimeout(()=>s.remove(),4200);
  }
}
const hooks={drill:runDrill, count:runCount, hero:()=>setTimeout(()=>{playSfx('win'); confetti(90);},600)};

/* safety gear */
const gearSet=new Set(), dress=$('#dress');
const GEAR=['hat','glasses','ears','vest','gloves','boots'];
$$('.gbtn').forEach(b=>b.addEventListener('click',()=>{
  document.getElementById('gears').classList.add('tapped');
  const g=b.dataset.g; if(gearSet.has(g)) gearSet.delete(g); else gearSet.add(g);
  const on=gearSet.has(g); b.setAttribute('aria-pressed',String(on)); dress.classList.toggle('g-'+g,on);
  playSfx('sparkle');
  updateGear(); if(on&&gearSet.size===6){ playSfx('win'); confetti(50); }
}));
function updateGear(){ $('#gcount').textContent=tr('g_count',gearSet.size); $('#gdone').textContent=gearSet.size===6?tr('g_done'):''; }

/* oil tiles */
$$('.tile').forEach(b=>b.addEventListener('click',()=>{b.setAttribute('aria-pressed','true'); b.classList.remove('wig'); void b.offsetWidth; b.classList.add('wig'); playSfx('sparkle');}));

/* prize questions */
function isUnrevealed(){const s=slides[cur]; return !!s && s.dataset.k==='q' && !s.classList.contains('revealed');}
function setRevBtn(s,on){
  const b=s.querySelector('.rev'); b.dataset.i=on?'hideAns':'revealBtn'; b.innerHTML=tr(b.dataset.i); b.setAttribute('aria-expanded',String(on));
}
function reveal(s,on){
  if(on===undefined) on=!s.classList.contains('revealed');
  s.classList.toggle('revealed',on);
  setRevBtn(s,on);
  if(on){ playSfx('sparkle'); confetti(110); }
  updateNav();
}
$$('.qslide').forEach(s=>{
  s.querySelector('.rev').addEventListener('click',()=>reveal(s));
  const h=s.querySelector('.hintb');
  h.addEventListener('click',()=>{const on=s.classList.toggle('hinted'); h.setAttribute('aria-expanded',String(on)); if(on) playSfx('sparkle');});
});
function advance(){ if(isUnrevealed()) reveal(slides[cur],true); else go(cur+1); }

/* RESET: hide all answers/hints + go back to the beginning */
function resetAll(){
  cancelAnimationFrame(drillRAF);
  $$('.qslide').forEach(s=>{
    s.classList.remove('revealed','hinted');
    setRevBtn(s,false);
    const h=s.querySelector('.hintb'); if(h) h.setAttribute('aria-expanded','false');
  });
  /* fresh start for the interactive bits too */
  gearSet.clear();
  document.getElementById('gears').classList.remove('tapped');
  $$('.gbtn').forEach(b=>b.setAttribute('aria-pressed','false'));
  GEAR.forEach(g=>dress.classList.remove('g-'+g));
  updateGear();
  $$('.tile').forEach(t=>t.setAttribute('aria-pressed','false'));
  $('#found').classList.remove('show');
  $('#oilL').classList.remove('glow');
  titleDone=false; titleRun=false;
  stopNarration();
  dgHardReset();
  if(cur===0){ updateNav(); narrateSoon(0); } else { go(0); }
  slides[0].scrollTop=0;
}
