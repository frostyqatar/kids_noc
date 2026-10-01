/* Qatra narrator. Loaded after app.js. */
/* Qatra narrator */
const QATRA_INNER=
  '<path d="M60 12C60 12 20 62 20 95A40 40 0 0 0 100 95C100 62 60 12 60 12Z" fill="#2B1E16" stroke="#0A0705" stroke-width="3"/>'+
  '<ellipse cx="42" cy="74" rx="5" ry="11" fill="#fff" opacity=".35" transform="rotate(25 42 74)"/>'+
  '<g class="q-eye"><circle cx="46" cy="92" r="10" fill="#fff"/><g class="q-pupils"><circle cx="48" cy="94" r="5" fill="#12324A"/><circle cx="50" cy="91" r="1.6" fill="#fff"/></g></g>'+
  '<g class="q-eye"><circle cx="74" cy="92" r="10" fill="#fff"/><g class="q-pupils"><circle cx="76" cy="94" r="5" fill="#12324A"/><circle cx="78" cy="91" r="1.6" fill="#fff"/></g></g>'+
  '<ellipse cx="36" cy="108" rx="6" ry="3.5" fill="#FF8FA3" opacity=".8"/><ellipse cx="84" cy="108" rx="6" ry="3.5" fill="#FF8FA3" opacity=".8"/>'+
  '<path class="qm-shut" d="M50 110Q60 119 70 110" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'+
  '<g class="qm-open"><g class="qm-jaw"><g class="qm-shape"><ellipse cx="60" cy="112" rx="9" ry="7.5" fill="#5A1414"/><ellipse cx="60" cy="115" rx="5" ry="2.5" fill="#C0392B"/></g></g></g>'+
  '<g stroke="#0A0705" stroke-width="3"><path d="M34 58Q34 28 60 28Q86 28 86 58Z" fill="#FF7A1A"/><rect x="26" y="54" width="68" height="9" rx="4.5" fill="#FF7A1A"/></g>'+
  '<path d="M60 30V54" stroke="#C24E00" stroke-width="4"/>';
const QATRA_SVG='<svg class="qsvg" viewBox="0 0 120 150" aria-hidden="true">'+QATRA_INNER+'</svg>';
/* slide index -> { spot, bub, existing|anchor } ; slides 4 (safety) and 8 (drill game) intentionally omitted */
const NARR_CFG={
  0:{spot:'title',existing:true,bub:'br'},
  1:{spot:'cake',bub:'br'},
  2:{spot:'map',anchor:'svg.map',fit:'map',bub:'br'},
  3:{spot:'heli',anchor:'svg.art',bub:'br'},
  5:{spot:'platform',anchor:'svg.scene',bub:'br'},
  6:{spot:'sponge',bub:'sd'},
  7:{spot:'well',anchor:'svg.drill',bub:'br'},
  9:{spot:'mid',bub:'bc'},
  10:{spot:'tiles',bub:'sd'},
  11:{spot:'q',bub:'br'}, 12:{spot:'q',bub:'br'}, 13:{spot:'q',bub:'br'},
  14:{spot:'finale',existing:true,bub:'bc'}
};
/* slide index -> say-table key. Slides 4 (safety) and 8 (drilling game) have no narration.
   The T[...] copy keys and the voice-over file names both use this key, so they cannot drift apart. */
const SAY_KEY={0:'say0',1:'say1',2:'say2',3:'say3',5:'say6',6:'say7',7:'say8',9:'say9',10:'say10',11:'say11',12:'say12',13:'say13',14:'say14'};
/* Arabic quizzes play one clip for the question, the other lines are text-only */
const VO_AR_ONE={11:'hmm',12:'what_is_answer',13:'hmm'};
function voFile(i,k){
  const key=SAY_KEY[i]; if(!key) return null;
  if(lang==='ar'&&VO_AR_ONE[i]) return k===0?VO_AR_ONE[i]:null;
  return (lang==='ar'?'':'en/')+key+'-'+(k+1);
}
/* slide -> [data-i target per spoken line]; Qatra slides beside the sentence she is saying.
   Only used on slides where she sits over the artwork column, so she never covers text. */
const SAY_ANCHORS={
  1:['[data-i="s2_p"]','[data-i="s2_qe"]','[data-i="s2_te"]'],
  2:['[data-i="s3_p"]','[data-i="map_km"]','[data-i="s3_p2"]'],
  3:['[data-i="s4_p"]','[data-i="s4_p2"]','[data-i="s4_jobs"]'],
  5:['[data-i="s6_p"]','[data-i="s6_p"]','[data-i="s6_p2"]'],
  6:['[data-i="s7_1"]','[data-i="s7_2"]','[data-i="s7_3"]'],
  7:['[data-i="s8_p"]','[data-i="s8_p"]','[data-i="s8_rec"]'],
  9:['#bbl','[data-i="s9_p"]','[data-i="s9_p2"]'],
  10:['[data-i="o1"]','[data-i="o3"]','[data-i="o4"]'],
  11:['[data-i="p1_q"]','[data-i="p1_q"]','[data-i="p1_q"]'],
  12:['[data-i="p2_q"]','[data-i="p2_q"]','[data-i="p2_q"]'],
  13:['[data-i="p3_q"]','[data-i="p3_q"]','[data-i="p3_q"]']
};
const NARR_HOLD=4800, NARR_EVERY=5000, NARR_DELAY=3500; /* NARR_DELAY: skim time before she starts on a new slide */
const voCache={}; let narrAudio=null, voBlocked=false, voResumed=false, voStartedOnce=false;
function stopVo(){ if(narrAudio){ try{narrAudio.pause(); narrAudio.currentTime=0;}catch(e){} narrAudio=null; } }
/* Plays `file`. onEnd runs only when the clip actually finishes; onFail runs when
   audio can't play (autoplay blocked, missing file, etc.) so narration can fall back. */
function playVo(file,onEnd,onFail){
  if(!soundOn||!file) return false;
  let a=voCache[file];
  if(!a){ a=new Audio(file+'.mp3'); a.preload='auto'; voCache[file]=a; }
  if(a._onEnd){ a.removeEventListener('ended',a._onEnd); a.removeEventListener('error',a._onEnd); a.removeEventListener('playing',a._onPlay); a._onEnd=null; }
  stopVo();
  narrAudio=a;
  let started=false, settled=false;
  const cleanup=()=>{ a.removeEventListener('ended',end); a.removeEventListener('error',fail); a.removeEventListener('playing',mark); a._onEnd=null; };
  const end=()=>{ if(settled) return; settled=true; cleanup(); if(onEnd) onEnd(); };
  const fail=()=>{ if(settled||started) return; settled=true; voBlocked=true; cleanup(); if(onFail) onFail(); };
  const mark=()=>{ started=true; voStartedOnce=true; };
  a._onEnd=end; a._onPlay=mark;
  a.addEventListener('ended',end);
  a.addEventListener('error',fail);
  a.addEventListener('playing',mark);
  try{ a.currentTime=0; }catch(e){}
  const p=a.play();
  if(p&&p.catch) p.catch(fail);
  narrTimers.push(setTimeout(()=>{ if(!started) fail(); },6000));
  return true;
}
const narrHosts={}, narrSvgs={}, narrBubbles={}, narrLines={}; let narrTimers=[];
function buildNarration(){
  slides.forEach((slide,i)=>{
    const cfg=NARR_CFG[i]; if(!cfg) return;
    const panel=slide.querySelector('.panel'); if(!panel) return;
    const host=document.createElement('div'); host.className='qhost qhost--'+cfg.spot;
    const bubble=document.createElement('div'); bubble.className='qbubble '+cfg.bub; bubble.setAttribute('aria-live','polite');
    const line=document.createElement('p'); bubble.appendChild(line); host.appendChild(bubble);
    let svg;
    if(cfg.existing){
      svg=slide.querySelector('.hero-art .qatra')||slide.querySelector('.qatra-big');
      if(!svg) return;
      const use=svg.querySelector('use'); if(use){const g=document.createElementNS('http://www.w3.org/2000/svg','g'); g.innerHTML=QATRA_INNER; use.replaceWith(g);}
      let anchor;
      if(svg.classList.contains('qatra-big')){
        anchor=document.createElement('div'); anchor.className='qfig';
        svg.parentNode.insertBefore(anchor,svg); anchor.appendChild(svg);
      } else { anchor=svg.closest('.hero-art')||svg.parentElement; }
      anchor.appendChild(host);
    } else {
      host.classList.add('qhost--new');
      if(SAY_ANCHORS[i]) host.classList.add('qhost--slide');
      host.insertAdjacentHTML('beforeend',QATRA_SVG);
      const target=cfg.anchor?slide.querySelector(cfg.anchor):null;
      if(target){
        const wrap=document.createElement('div');
        wrap.className='qanchor'+(cfg.fit?' qanchor--'+cfg.fit:'');
        target.parentNode.insertBefore(wrap,target); wrap.appendChild(target); wrap.appendChild(host);
      } else panel.appendChild(host);
      svg=host.querySelector('svg');
    }
    narrHosts[i]=host; narrSvgs[i]=svg; narrBubbles[i]=bubble; narrLines[i]=line;
  });
}
function stopNarration(){
  narrTimers.forEach(id=>clearTimeout(id)); narrTimers=[];
  stopVo();
  Object.keys(narrHosts).forEach(k=>{
    narrHosts[k].classList.remove('speaking');
    if(narrSvgs[k]) narrSvgs[k].classList.remove('speaking');
    if(narrBubbles[k]) narrBubbles[k].classList.remove('on');
  });
  if(qatraHl){ qatraHl.classList.remove('qatrah'); qatraHl=null; }
}
let qatraCur={i:-1,k:0}, qatraHl=null;
/* Marker animation on the sentence she is currently explaining. */
function setQatraHighlight(el){
  if(!el) return;
  if(qatraHl&&qatraHl!==el){ qatraHl.classList.remove('qatrah'); qatraHl=null; }
  el.classList.remove('qatrah');
  void el.getBoundingClientRect(); /* restart the sweep */
  el.classList.add('qatrah');
  qatraHl=el;
}
/* Rects of all rendered text in a slide (so Qatra can avoid covering any of it). */
function qatraTextRects(box){
  const out=[];
  const walk=document.createTreeWalker(box,NodeFilter.SHOW_TEXT,null);
  let n;
  while((n=walk.nextNode())){
    if(!n.nodeValue||!n.nodeValue.trim()) continue;
    const pe=n.parentElement; if(!pe||(pe.closest&&pe.closest('.qhost'))) continue;
    const cs=getComputedStyle(pe);
    if(cs.visibility==='hidden'||cs.display==='none'||cs.opacity==='0') continue;
    try{
      const rg=document.createRange(); rg.selectNodeContents(n);
      const rs=rg.getClientRects();
      for(let j=0;j<rs.length;j++){ const r=rs[j]; if(r.width>1&&r.height>1) out.push(r); }
    }catch(e){}
  }
  return out;
}
/* Tight bounding box of the actual glyphs of one element (falls back to its box). */
function qatraGlyphRect(el){
  const rs=qatraTextRects(el);
  if(!rs.length){ const r=el.getBoundingClientRect(); return r.width>1?r:null; }
  let l=Infinity,t=Infinity,r2=-Infinity,b=-Infinity;
  rs.forEach(r=>{ l=Math.min(l,r.left); t=Math.min(t,r.top); r2=Math.max(r2,r.right); b=Math.max(b,r.bottom); });
  return {left:l,top:t,right:r2,bottom:b,width:r2-l,height:b-t};
}
function qatraOverlap(r,rects){
  let a=0;
  for(let j=0;j<rects.length;j++){
    const t=rects[j];
    const w=Math.min(r.right,t.right)-Math.max(r.left,t.left); if(w<=0) continue;
    const h=Math.min(r.bottom,t.bottom)-Math.max(r.top,t.top); if(h>0) a+=w*h;
  }
  return a;
}
/* Put Qatra right beside the sentence she is saying: try the free side of the glyph box,
   score candidates by how much text they would cover, then pick the cleanest one. */
function placeQatra(i,k,animate){
  const host=narrHosts[i]; if(!host) return;
  const list=SAY_ANCHORS[i]; if(!list) return;
  const sel=list[k]; if(!sel) return;
  let target=null;
  try{ target=slides[i].querySelector(sel); }catch(e){}
  if(!target) return;
  const anchor=host.offsetParent||host.parentElement; if(!anchor) return;
  const gr=qatraGlyphRect(target), sl=slides[i].getBoundingClientRect(), ar=anchor.getBoundingClientRect();
  if(!gr) return;
  const qw=host.offsetWidth||60, qh=host.offsetHeight||80, gap=14;
  const rtl=(lang==='ar');
  const rects=qatraTextRects(slides[i]);
  const cands=[
    {x:gr.right+gap,        y:gr.top+gr.height/2-qh/2, mode:'right',  p:rtl?1:0},
    {x:gr.left-qw-gap,      y:gr.top+gr.height/2-qh/2, mode:'left',   p:rtl?0:1},
    {x:gr.right-qw,         y:gr.top-qh-gap,           mode:'above',  p:2},
    {x:gr.right-qw,         y:gr.bottom+gap,           mode:'below',  p:3}
  ];
  let best=null;
  cands.forEach(c=>{
    const x=Math.max(sl.left+6,Math.min(c.x,sl.right-qw-6));
    const y=Math.max(sl.top+6,Math.min(c.y,sl.bottom-qh-6));
    const score=qatraOverlap({left:x,top:y,right:x+qw,bottom:y+qh},rects)+c.p*400;
    if(!best||score<best.score) best={score:score,x:x,y:y,mode:c.mode};
  });
  if(!best) return;
  const anim=(animate!==false);
  if(!anim) host.style.transition='none';
  host.style.left=(best.x-ar.left)+'px';
  host.style.top=(best.y-ar.top)+'px';
  host.style.right='auto'; host.style.bottom='auto'; host.style.transform='none';
  if(!anim){ void host.offsetWidth; host.style.transition=''; }
  if(anim) setQatraHighlight(target);
  const bub=narrBubbles[i];
  if(bub){
    bub.classList.remove('br','bl','bc','sd','bt');
    const below=(best.mode==='below')||(best.y-sl.top<120); /* no room above: bubble goes under her */
    bub.classList.add(below?'bt':((best.mode==='left')===(!rtl)?'br':'bl'));
  }
  qatraCur={i:i,k:k};
}
function narrate(i){
  stopNarration();
  const host=narrHosts[i], svg=narrSvgs[i], line=narrLines[i], bubble=narrBubbles[i];
  const v=T[SAY_KEY[i]]; if(!host||!line||!bubble||!v) return;
  const lines=v[lang==='ar'?1:0]||[]; if(!lines.length) return;
  let k=0;
  const titleAuto=(i===0); /* gated title slide: half-time gaps, then auto-advance */
  /* generous pauses so kids can digest each sentence before the next one */
  const GAP=titleAuto?2600:5600, RESTART=16000, AUTO_ADVANCE=2600;
  /* stop the mouth when the clip ends, but keep the bubble text up through the pause */
  const stopMouth=()=>{ host.classList.remove('speaking'); if(svg) svg.classList.remove('speaking'); };
  const step=()=>{
    line.textContent=lines[k];
    stopVo();
    placeQatra(i,k);
    bubble.classList.remove('on'); void bubble.offsetWidth; bubble.classList.add('on');
    host.classList.add('speaking'); if(svg) svg.classList.add('speaking');
    const next=()=>{
      k=(k+1)%lines.length;
      if(titleAuto && k===0){ titleDone=true; narrTimers.push(setTimeout(()=>go(1),AUTO_ADVANCE)); return; }
      if(i===0 && titleRun) titleDone=true; /* first quote done: Start becomes usable */
      narrTimers.push(setTimeout(step,k===0?RESTART:GAP));
    };
    const endLine=()=>{ stopMouth(); next(); };
    const file=voFile(i,k);
    if(!playVo(file,endLine,()=>narrTimers.push(setTimeout(endLine,NARR_HOLD)))) narrTimers.push(setTimeout(endLine,NARR_HOLD));
  };
  step();
}
function narrateSoon(i){
  stopNarration();
  if(i===0 && !titleRun) return; /* wait for Start/Next on the title slide */
  if(narrHosts[i]) narrTimers.push(setTimeout(()=>narrate(i),NARR_DELAY));
}
/* title slide: clicking Start/Next makes her talk; gate opens once the first quote ends */
function startTitleTalk(){ titleRun=true; titleDone=false; narrate(0); }

/* language */
function applyLang(){
  const r=document.documentElement; r.lang=lang; r.dir=lang==='ar'?'rtl':'ltr';
  $$('[data-i]').forEach(el=>{const v=tr(el.dataset.i); if(el instanceof SVGElement) el.textContent=v; else el.innerHTML=v;});
  $$('[data-ia]').forEach(el=>el.setAttribute('aria-label',tr(el.dataset.ia)));
  $('#lang').setAttribute('lang',lang==='ar'?'en':'ar');
  document.title=tr('doc_title');
  updateGear(); updateNav(); updateSound(); dgRender();
  dgEls.badge.classList.remove('show');
  titleDone=false; titleRun=false;
  if(cur>=0) narrateSoon(cur);
}
let langBusy=false;
function toggleLang(){
  const next=lang==='ar'?'en':'ar'; if(next===lang||langBusy) return;
  const app=document.querySelector('.app');
  const commit=()=>{ lang=next; try{localStorage.setItem('noc-kids-lang',lang);}catch(e){} applyLang(); };
  if(!app||reduced){ commit(); return; }
  langBusy=true;
  let done=false, timer=0;
  const finish=()=>{
    if(done) return; done=true;
    app.removeEventListener('transitionend',onEnd); clearTimeout(timer);
    commit();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ app.classList.remove('swap'); langBusy=false; }));
  };
  const onEnd=e=>{ if(e.target===app&&e.propertyName==='opacity') finish(); };
  app.addEventListener('transitionend',onEnd);
  timer=setTimeout(finish,600);
  app.classList.add('swap');
}
