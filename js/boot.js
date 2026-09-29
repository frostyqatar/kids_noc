/* Wires controls and opens the first slide. Loaded last. */
/* controls */
$('#lang').addEventListener('click',toggleLang);
$('#reset').addEventListener('click',resetAll);
$('#snd').addEventListener('click',()=>{
  soundOn=!soundOn;
  try{ localStorage.setItem('noc-kids-sound',soundOn?'on':'off'); }catch(e){}
  updateSound(); if(soundOn) playSfx('sparkle');
});
$('#prev').addEventListener('click',()=>go(cur-1));
$('#next').addEventListener('click',advance);
$('#start').addEventListener('click',()=>go(1));
$('#redrill').addEventListener('click',runDrill);
$('#party').addEventListener('click',()=>{playSfx('win'); confetti(120);});
const fsb=$('#fs');
if(!document.fullscreenEnabled) fsb.hidden=true;
function fsToggle(){try{ if(document.fullscreenElement) document.exitFullscreen(); else { const p=document.documentElement.requestFullscreen(); if(p&&p.catch) p.catch(()=>{}); } }catch(e){}}
fsb.addEventListener('click',fsToggle);

document.addEventListener('keydown',e=>{
  const rtl=lang==='ar', onBtn=e.target&&e.target.closest&&e.target.closest('button');
  if(e.key==='ArrowRight'){ if(rtl) go(cur-1); else advance(); }
  else if(e.key==='ArrowLeft'){ if(rtl) advance(); else go(cur-1); }
  else if(e.key==='PageDown'||(e.key===' '&&!onBtn)){e.preventDefault(); advance();}
  else if(e.key==='f'||e.key==='F') fsToggle();
  else if(e.key==='r'||e.key==='R') resetAll();
  else if(e.key==='PageUp') go(cur-1);
  else if(e.key==='Home') go(0);
  else if(e.key==='End') go(last);
  else if(e.key==='l'||e.key==='L') toggleLang();
});
let tx=0, ty=0; const stage=$('.stage');
stage.addEventListener('touchstart',e=>{const t=e.changedTouches[0]; tx=t.clientX; ty=t.clientY;},{passive:true});
stage.addEventListener('touchend',e=>{const t=e.changedTouches[0], dx=t.clientX-tx, dy=t.clientY-ty; if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){const fwd=lang==='ar'?dx>0:dx<0; if(fwd) advance(); else go(cur-1);}},{passive:true});

buildNarration();
applyLang();
go(0);
