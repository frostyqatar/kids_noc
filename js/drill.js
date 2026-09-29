/* Offshore drill mini-game. Loaded after narrator.js. */
/* ─── Let's drill mini-game (slide 6) ───────────────────────────── */
const DG_SLIDE=5;
const dgEls={
  wrap:$('#dwrap'),world:$('#dworld'),slider:$('#dslider'),knob:$('#dknob'),fill:$('#dfill'),
  foot:$('#dfoot'),prompt:$('#dprompt'),arrow:$('#darrow'),gauge:$('#dgauge'),cap:$('#dgcap'),
  meter:$('#dgmeter'),unit:$('#dgunit'),banner:$('#dbanner'),bannerT:$('#dbannerT'),bannerB:$('#dbannerB'),
  chips:$('#dchips'),resGlow:$('#dresGlow'),gasLbl:$('#dgasLbl'),oilLbl:$('#doilLbl'),
  colRect:$('#dgColRect'),oilCol:$('#doilCol'),oilHead:$('#doilHead'),
  stringLine:$('#dstringLine'),stringT:$('#dstringT'),bit:$('#dbit'),bitGlow:$('#dbitGlow'),
  depthTag:$('#ddepthTag'),depthTagTxt:$('#ddepthTagTxt'),
  oilFill:$('#doilFill'),oilWave:$('#doilWave'),gasFill:$('#dgasFill'),gasWave:$('#dgasWave'),
  oilGlow:$('#doilGlow'),gasGlow:$('#dgasGlow'),
  ship:$('#dship'),shipBob:$('#dshipBob'),wake:$('#dwake'),shipTxt:$('#dshipTxt'),
  cargo:$('#dcargo'),cargoWave:$('#dcargoWave'),cargoLamps:$$('.dcargolamp'),
  hose:$('#dhose'),hoseFlow:$('#dhoseFlow'),hosePath:$('#dhosePath'),
  heli:$('#dheli'),heliBody:$('#dheliBody'),heliTxt:$('#dheliTxt'),heliRotor:$('#dheliRotor'),heliBlur:$('#dheliBlur'),
  refLabel:$('#drefLabel'),
  labels:$('#dglabels'),
  wave1:$('#dwave1'),wave2:$('#dwave2'),waveA:$('#dwaveA'),waveB:$('#dwaveB'),
  slugs:$('#dslugs'),bubbles:$('#dgbubbles'),headGlow:$('#doilHeadGlow'),ripple:$('#dripple'),
  fx:$('#dfx'),badge:$('#dlbadge'),life:$('#dlife')
};
const DG={running:false,started:false,phase:'drill',v:0,target:0,drillP:0,liftP:0,phaseT:0,t:0,last:0,
  drilling:false,lifting:false,
  shipX:820,sink:0,sinkGoal:0,acc:0,ready:0,readyShown:false,sailWait:0,shipFlip:1,
  kickT:0,hitSeabed:false,hitRock:false,gate:false,taps:0,tapped:null,
  heli:{x:220,y:106,tx:220,ty:106,mode:'parked',rotor:0,sx:1,sxApplied:1},
  prompt:'',promptN:undefined,arrow:'',foot:'',gaugeCap:'dg_depth',meter:'0',unit:'m',
  banner:null,bannerCb:null};
const DG_BIT_TOP=140,DG_BIT_BOT=452,DG_COL_TOP=132,DG_COL_BOT=360;
const DG_CAM={x:320,y:280,h:560},DG_CAMT={x:320,y:280,h:560};
/* freesound_community-water-waves-71875.mp3 — measured CBR duration (ffprobe N/A; MPEG frame scan + bitrate) */
const DG_WAVE_SEC=21.624;
const DG_APPROACH_START=0.7;
const DG_APPROACH_END=DG_APPROACH_START+DG_WAVE_SEC; /* 22.324 */
const DG_HOSE_END=DG_APPROACH_END+0.6; /* 22.924 — short pause then cargo fill */
const DG_FILL_SEC=12;
const DG_SAIL_SEC=DG_WAVE_SEC;
function dgClamp(v,a,b){return v<a?a:(v>b?b:v);}
function dgLerp(a,b,t){return a+(b-a)*t;}
function dgEase(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}
function dgWavePath(y,amp,ph){
  let d='M -900 '+y,x;
  for(x=-860;x<=1780;x+=80){d+=' L '+x+' '+(y+Math.sin(x*0.032+ph)*amp).toFixed(1);}
  return d;
}
function dgFit(x0,y0,w0,h0){
  const r=dgEls.wrap.getBoundingClientRect();
  const a=Math.max(.5,r.width/Math.max(1,r.height));
  const h=Math.max(h0,w0/a);
  return {x:x0+w0/2,y:y0+h0/2,h:h};
}
const DG_REG={
  drill:function(){return dgFit(150,6,340,556);},
  found:function(){return dgFit(160,398,320,166);},
  lift:function(){return dgFit(205,58,230,502);},
  collect:function(){return dgFit(320,10,300,230);},
  load:function(){return dgFit(140,10,560,330);},
  sail:function(){return dgFit(-20,60,700,340);}
};
function dgCam(reg){const t=reg();DG_CAMT.x=t.x;DG_CAMT.y=t.y;DG_CAMT.h=t.h;}
function dgView(){
  const r=dgEls.wrap.getBoundingClientRect();
  const a=Math.max(.4,r.width/Math.max(1,r.height));
  const w=DG_CAM.h*a;
  dgEls.world.setAttribute('viewBox',(DG_CAM.x-w/2).toFixed(1)+' '+(DG_CAM.y-DG_CAM.h/2).toFixed(1)+' '+w.toFixed(1)+' '+DG_CAM.h.toFixed(1));
}
function dgRender(){
  dgEls.prompt.textContent=DG.prompt?tr(DG.prompt,DG.promptN):'';
  dgEls.arrow.className='arrow'+(DG.arrow==='up'?' up':'');
  dgEls.arrow.textContent=DG.arrow;
  dgEls.foot.textContent=DG.foot?tr(DG.foot):'';
  dgEls.foot.classList.toggle('show',!!DG.foot);
  dgEls.cap.textContent=tr(DG.gaugeCap||'dg_depth');
  dgEls.unit.textContent=DG.unit==='%'?'%':tr('dg_m');
  if(DG.banner){
    dgEls.bannerT.textContent=tr(DG.banner.title);
    dgEls.bannerB.hidden=!DG.banner.btn;
    if(DG.banner.btn) dgEls.bannerB.textContent=tr(DG.banner.btn);
  }
}
function dgPrompt(key,arrow){DG.prompt=key;DG.promptN=undefined;DG.arrow=arrow||'';dgRender();}
function dgPromptN(key,n,arrow){DG.prompt=key;DG.promptN=n;DG.arrow=arrow||'';dgRender();}
function dgFoot(key){DG.foot=key||'';dgRender();}
function dgGauge(cap,val,unit){DG.gaugeCap=cap;DG.meter=val;DG.unit=unit;
  dgEls.cap.textContent=tr(cap);dgEls.meter.textContent=val;
  dgEls.unit.textContent=unit==='%'?'%':tr('dg_m');
  dgEls.gauge.classList.add('show');
}
function dgGaugeHide(){dgEls.gauge.classList.remove('show');}
function dgBanner(title,btn,cb){DG.banner={title:title,btn:btn||''};DG.bannerCb=cb||null;dgRender();dgEls.banner.classList.add('show');}
function dgHideBanner(){DG.banner=null;DG.bannerCb=null;dgEls.banner.classList.remove('show');}
dgEls.bannerB.addEventListener('click',function(){const cb=DG.bannerCb;if(cb){cb();}else{dgHideBanner();}});
function dgChips(done,active){
  const items=dgEls.chips.children;
  for(let i=0;i<items.length;i++){
    items[i].classList.toggle('done',i<done);
    items[i].classList.toggle('on',i===active);
    const b=items[i].querySelector('i');
    if(b) b.textContent=i<done?'\u2713':String(i+1);
  }
}
function dgBit(by){
  let jit=0,sway=0;
  if(DG.phase==='drill'&&DG.drilling){
    const amp=(by>436?2:(by>392?1.5:1))*(1+DG.kickT*1.4);
    jit=Math.sin(DG.t*44)*amp+(Math.random()*2-1)*amp*0.5;
    sway=Math.sin(DG.t*14)*(1.4+DG.kickT*3);
  }
  const yy=by+jit;
  const top=Math.max(56,yy-2);
  dgEls.stringLine.setAttribute('y2',top.toFixed(1));
  dgEls.stringT.setAttribute('y2',top.toFixed(1));
  dgEls.bit.setAttribute('transform','translate(320 '+yy.toFixed(1)+') rotate('+sway.toFixed(2)+' 0 -30)');
  const hot=by>396;
  dgEls.bitGlow.setAttribute('opacity',hot?(0.5+Math.sin(DG.t*10)*0.25).toFixed(2):'0');
  const show=(by>190&&DG.phase==='drill');
  dgEls.depthTag.setAttribute('opacity',show?'1':'0');
  if(show){
    dgEls.depthTag.setAttribute('transform','translate(338 '+(yy-2).toFixed(1)+')');
    dgEls.depthTagTxt.textContent=Math.round(DG.drillP*500)+' '+tr('dg_m');
  }
}
function dgOilColumn(p){
  p=dgClamp(p,0,1);
  const top=dgLerp(DG_COL_BOT,DG_COL_TOP,p),h=Math.max(0,DG_COL_BOT-top);
  dgEls.oilCol.setAttribute('y',top.toFixed(1));
  dgEls.oilCol.setAttribute('height',h.toFixed(1));
  dgEls.colRect.setAttribute('y',top.toFixed(1));
  dgEls.colRect.setAttribute('height',h.toFixed(1));
  if(h>6){
    dgEls.oilHead.setAttribute('d','M315 '+top.toFixed(1)+' q 2.5 -3.5 5 0 q 2.5 3.5 5 0 L325 '+(top+8).toFixed(1)+' L315 '+(top+8).toFixed(1)+' Z');
    dgEls.oilHead.setAttribute('opacity','1');
  } else dgEls.oilHead.setAttribute('opacity','0');
}
function dgSurfPath(x,w,y){
  return 'M '+x+' '+y.toFixed(1)+' q '+(w/4)+' -2.4 '+(w/2)+' 0 q '+(w/4)+' 2.4 '+(w/2)+' 0 L '+(x+w)+' '+(y+6).toFixed(1)+' L '+x+' '+(y+6).toFixed(1)+' Z';
}
function dgBuildFlow(){
  if(dgEls.slugs.childElementCount) return;
  const NS='http://www.w3.org/2000/svg';
  for(let i=0;i<3;i++){
    const r=document.createElementNS(NS,'rect');
    r.setAttribute('x','-5');r.setAttribute('y','-14');r.setAttribute('width','10');r.setAttribute('height','28');
    r.setAttribute('rx','5');r.setAttribute('fill','url(#dgSlug)');r.setAttribute('stroke','#5A3410');
    r.setAttribute('stroke-width','1');r.setAttribute('opacity','0');
    dgEls.slugs.appendChild(r);
  }
  for(let i=0;i<8;i++){
    const c=document.createElementNS(NS,'circle');
    c.setAttribute('r','2.5');c.setAttribute('fill','url(#dgBubble)');c.setAttribute('opacity','0');
    dgEls.bubbles.appendChild(c);
  }
}
function dgFlowBits(p){
  for(let i=0;i<dgEls.slugs.children.length;i++){
    const s=dgEls.slugs.children[i],t=p*1.06-i*0.22;
    if(t>0&&t<=1.02){
      const y=dgLerp(DG_COL_BOT,DG_COL_TOP,t);
      s.setAttribute('transform','translate(320 '+y.toFixed(1)+')');
      s.setAttribute('opacity',dgClamp(Math.min(t*6,(1.02-t)*8),0,1).toFixed(2));
    } else s.setAttribute('opacity','0');
  }
  for(let i=0;i<dgEls.bubbles.children.length;i++){
    const b=dgEls.bubbles.children[i],tb=p*1.32-i*0.1;
    if(tb>0&&tb<=1){
      const y=dgLerp(DG_COL_BOT,DG_COL_TOP+2,tb);
      const x=320+Math.sin(i*2.1)*3+Math.sin(DG.t*2.4+i)*1.4;
      b.setAttribute('transform','translate('+x.toFixed(1)+' '+y.toFixed(1)+')');
      b.setAttribute('r',(1.8+(i%3)+tb*1.4).toFixed(1));
      b.setAttribute('opacity',dgClamp(Math.min(tb*5,(1-tb)*6),0,1).toFixed(2));
    } else b.setAttribute('opacity','0');
  }
  const top=dgLerp(DG_COL_BOT,DG_COL_TOP,p),h=Math.max(0,DG_COL_BOT-top);
  if(h>8){
    dgEls.headGlow.setAttribute('transform','translate(320 '+top.toFixed(1)+')');
    dgEls.headGlow.setAttribute('opacity','0.8');
  } else dgEls.headGlow.setAttribute('opacity','0');
}
function dgTanks(o,g){
  o=dgClamp(o,0,1);g=dgClamp(g,0,1);
  const oy=110-o*44,gy=110-g*34;
  dgEls.oilFill.setAttribute('y',oy.toFixed(1));dgEls.oilFill.setAttribute('height',(o*44).toFixed(1));
  dgEls.gasFill.setAttribute('y',gy.toFixed(1));dgEls.gasFill.setAttribute('height',(g*34).toFixed(1));
  dgEls.oilWave.setAttribute('d',o>0.02?dgSurfPath(380,24,oy):'');
  dgEls.gasWave.setAttribute('d',g>0.02?dgSurfPath(412,24,gy):'');
  dgEls.oilGlow.setAttribute('opacity',(o>0.02&&o<.995)?'0.8':'0');
  dgEls.gasGlow.setAttribute('opacity',(g>0.02&&g<.995)?'0.8':'0');
}
function dgCargoFill(v){
  v=dgClamp(v,0,1);
  const top=24-v*17;
  dgEls.cargo.setAttribute('y',top.toFixed(1));
  dgEls.cargo.setAttribute('height',(24-top).toFixed(1));
  dgEls.cargoWave.setAttribute('d',v>0.02?dgSurfPath(8,184,top):'');
  for(let i=0;i<dgEls.cargoLamps.length;i++){
    dgEls.cargoLamps[i].setAttribute('opacity',dgClamp(v*3.3-i*0.9,0,1).toFixed(2));
  }
}
function dgShipTransform(){
  const cx=99,s=DG.shipFlip<0?-1:1;
  dgEls.shipTxt.setAttribute('transform',s<0?'translate('+cx+' 0) scale(-1 1) translate(-'+cx+' 0)':'');
  return 'translate('+DG.shipX.toFixed(1)+' '+(176+DG.sink).toFixed(1)+') translate('+cx+' 0) scale('+s+' 1) translate(-'+cx+' 0)';
}
function dgHeliStep(dt){
  const H=DG.heli;
  const flying=H.mode==='toShip'||H.mode==='follow'||H.mode==='home';
  if(H.mode==='parked'){H.tx=220;H.ty=106+Math.sin(DG.t*1.6)*1.2;}
  else if(H.mode==='toShip'){H.tx=DG.shipX+70;H.ty=142;if(Math.abs(H.tx-H.x)<6&&Math.abs(H.ty-H.y)<6)H.mode='follow';}
  else if(H.mode==='follow'){H.tx=DG.shipX+85;H.ty=140+Math.sin(DG.t*1.8)*3;}
  else if(H.mode==='home'){H.tx=220;H.ty=106;if(Math.abs(H.tx-H.x)<4&&Math.abs(H.ty-H.y)<4){H.mode='parked';}}
  const k=Math.min(1,dt*(flying?1.5:3));
  H.x+=(H.tx-H.x)*k;H.y+=(H.ty-H.y)*k;
  if(Math.abs(H.tx-H.x)>1.2) H.sx=(H.tx-H.x)>0?-1:1;
  if(H.sx!==H.sxApplied){
    H.sxApplied=H.sx;
    dgEls.heliBody.setAttribute('transform',H.sx<0?'scale(-1 1)':'');
    dgEls.heliTxt.setAttribute('transform',H.sx<0?'scale(-1 1)':'');
  }
  H.rotor+=(flying?0.9:0.22)*dt;
  const tilt=dgClamp((H.tx-H.x)*0.5,-10,10);
  dgEls.heli.setAttribute('transform','translate('+H.x.toFixed(1)+' '+H.y.toFixed(1)+') rotate('+tilt.toFixed(1)+') scale(.9)');
  dgEls.heliRotor.setAttribute('transform','rotate('+(Math.sin(H.rotor*26)*4).toFixed(1)+' 0 -13.8)');
  dgEls.heliBlur.setAttribute('opacity',(flying?0.3:0.12).toFixed(2));
  /* Sound only while escorting the tanker — cut it when the ship arrives. */
  H.air=H.mode==='toShip'||H.mode==='follow';
}
const dgParts=[],dgPool=[];
function dgSpawn(type,x,y,o){
  if(dgParts.length>64) return;
  o=o||{};
  let c=dgPool.pop();
  if(!c){c=document.createElementNS('http://www.w3.org/2000/svg','circle');dgEls.fx.appendChild(c);}
  c.setAttribute('r',(o.r||3).toFixed(1));
  if(type==='bubble'){c.setAttribute('fill','none');c.setAttribute('stroke','#FFFFFF');c.setAttribute('stroke-width','2');}
  else if(type==='dust'){c.setAttribute('fill',o.fill||'#C9A46A');c.setAttribute('stroke','none');}
  else {c.setAttribute('fill',o.fill||'#FFE9A8');c.setAttribute('stroke','none');}
  c.setAttribute('opacity','0');
  dgParts.push({el:c,x:x,y:y,vx:o.vx||0,vy:o.vy||0,g:o.g||0,life:0,max:o.max||1,op:o.op==null?0.9:o.op,grow:o.grow||0});
}
function dgPartsStep(dt){
  for(let i=dgParts.length-1;i>=0;i--){
    const p=dgParts[i];
    p.life+=dt;
    if(p.life>=p.max){dgPool.push(p.el);p.el.setAttribute('opacity','0');dgParts.splice(i,1);continue;}
    p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;
    const t=p.life/p.max;
    p.el.setAttribute('transform','translate('+p.x.toFixed(1)+' '+p.y.toFixed(1)+') scale('+(1+p.grow*t).toFixed(2)+')');
    p.el.setAttribute('opacity',(p.op*(1-t*t)).toFixed(2));
  }
}
function dgBurst(x,y,type,n){
  for(let i=0;i<n;i++){
    const a=Math.random()*6.283,sp=40+Math.random()*80;
    if(type==='spark') dgSpawn('spark',x,y,{r:1.8+Math.random()*2.2,vx:Math.cos(a)*sp*.7,vy:Math.sin(a)*sp*.7-20,max:.5+Math.random()*.4});
    else if(type==='bubble') dgSpawn('bubble',x+(Math.random()*2-1)*8,y,{r:2+Math.random()*4,vy:-30-Math.random()*40,vx:(Math.random()*2-1)*20,max:1.1+Math.random()});
    else if(type==='dust') dgSpawn('dust',x+(Math.random()*2-1)*8,y,{r:2+Math.random()*3.4,vy:-20-Math.random()*36,vx:(Math.random()*2-1)*70,g:70,max:.7+Math.random()*.6});
  }
}
function dgDrillFX(by){
  if(by<360){
    dgSpawn('bubble',320+(Math.random()*2-1)*8,by-6,{r:2+Math.random()*3,vy:-36-Math.random()*30,vx:(Math.random()*2-1)*14,max:1+Math.random(),op:.85});
    if(Math.abs(by-170)<14&&Math.random()<.5) dgSpawn('foam',320+(Math.random()*2-1)*14,170,{r:3+Math.random()*4,fill:'#FFFFFF',op:.45,vy:-10,vx:(Math.random()*2-1)*22,grow:1,max:1.1+Math.random()});
  } else {
    dgSpawn('dust',320+(Math.random()*2-1)*8,by-4,{r:2+Math.random()*3,fill:by>440?'#9C8B74':'#C9A46A',vy:-18-Math.random()*26,vx:(Math.random()*2-1)*50,g:60,max:.6+Math.random()*.5});
    if(by>434&&Math.random()<.55) dgSpawn('spark',320+(Math.random()*2-1)*6,by,{r:1.6+Math.random()*1.6,vx:(Math.random()*2-1)*60,vy:-20-Math.random()*30,g:90,max:.4+Math.random()*.3});
  }
}
let dgDrag=false;
function dgPaint(){
  const h=Math.max(80,dgEls.slider.getBoundingClientRect().height);
  const max=Math.max(40,h-64),y=28+DG.v*max;
  dgEls.knob.style.top=y.toFixed(1)+'px';
  dgEls.fill.style.height=(DG.v*max).toFixed(1)+'px';
  dgEls.slider.setAttribute('aria-valuenow',String(Math.round(DG.v*100)));
  const active=(DG.phase==='drill'||DG.phase==='lift')&&!dgEls.slider.classList.contains('locked');
  dgEls.slider.classList.toggle('ready',active&&DG.v<0.02);
  dgEls.slider.classList.toggle('working',active&&DG.v>0.03);
}
function dgSliderSet(enabled){
  dgEls.slider.classList.toggle('locked',!enabled);
  dgEls.slider.setAttribute('tabindex',enabled?'0':'-1');
  DG.v=0;DG.target=0;dgPaint();
}
function dgInput(clientY){
  if(DG.phase!=='drill'&&DG.phase!=='lift') return;
  const r=dgEls.slider.getBoundingClientRect(),max=Math.max(40,r.height-64);
  DG.v=dgClamp((clientY-r.top-28)/max,0,1);
  DG.target=Math.max(DG.target,DG.v);
  dgPaint();
}
dgEls.slider.addEventListener('pointerdown',function(e){
  if(dgEls.slider.classList.contains('locked'))return;
  e.preventDefault();dgDrag=true;dgEls.slider.classList.add('dragging');
  try{dgEls.slider.setPointerCapture(e.pointerId);}catch(err){}
  dgInput(e.clientY);
});
dgEls.slider.addEventListener('pointermove',function(e){if(!dgDrag)return;e.preventDefault();dgInput(e.clientY);});
function dgPointerUp(e){if(!dgDrag)return;dgDrag=false;dgEls.slider.classList.remove('dragging');try{dgEls.slider.releasePointerCapture(e.pointerId);}catch(err){}}
dgEls.slider.addEventListener('pointerup',dgPointerUp);
dgEls.slider.addEventListener('pointercancel',dgPointerUp);
dgEls.slider.addEventListener('keydown',function(e){
  if(DG.phase!=='drill'&&DG.phase!=='lift')return;
  let v=DG.v,used=true;
  if(e.key==='ArrowDown'||e.key==='ArrowRight'||e.key==='PageDown')v=DG.v+0.1;
  else if(e.key==='ArrowUp'||e.key==='ArrowLeft'||e.key==='PageUp')v=DG.v-0.1;
  else if(e.key==='Home')v=0;
  else if(e.key==='End')v=1;
  else if(e.key===' '||e.key==='Enter')v=DG.v+0.2;
  else used=false;
  if(!used)return;
  e.preventDefault();
  DG.v=dgClamp(v,0,1);DG.target=Math.max(DG.target,DG.v);dgPaint();
});
['touchstart','touchmove','touchend','touchcancel'].forEach(function(t){
  dgEls.slider.addEventListener(t,function(e){e.stopPropagation();},{passive:true});
});
/* tap a sea creature or plant: pop it, name it, tell a little fact */
function dgTapLife(g){
  if(!g) return;
  clearTimeout(dgTapLife.pop); clearTimeout(dgTapLife.hide);
  dgEls.world.querySelectorAll('.dlife.tap').forEach(function(n){ n.classList.remove('tap'); });
  void g.getBoundingClientRect();
  g.classList.add('tap');
  dgTapLife.pop=setTimeout(function(){ g.classList.remove('tap'); },700);
  playSfx('sparkle');
  const key=g.dataset.ia, b=dgEls.badge;
  if(!key||!b) return;
  b.innerHTML='<b>'+tr(key)+'</b><span>'+tr(key+'_f')+'</span>';
  b.classList.remove('below');
  b.classList.add('show');
  dgPlaceBadge(g);
  dgTapLife.hide=setTimeout(function(){ b.classList.remove('show','below'); },3600);
  if(DG.gate&&DG.phase==='drill'&&DG.tapped&&!DG.tapped.has(key)){
    DG.tapped.add(key);DG.taps++;
    if(DG.taps>=3) dgUnlockDrill();
    else dgPromptN('dg_p_tap_n',DG.taps,'👆');
  }
}
dgEls.world.addEventListener('click',function(e){
  const t=e.target&&e.target.closest?e.target.closest('.dlife'):null;
  if(t) dgTapLife(t);
});
dgEls.world.addEventListener('keydown',function(e){
  const t=e.target&&e.target.closest?e.target.closest('.dlife'):null;
  if(!t) return;
  if(e.key===' '||e.key==='Enter'){ e.preventDefault(); dgTapLife(t); }
});

/* Name bubble: wrap the fact, and flip below the animal if it would leave the picture. */
function dgPlaceBadge(g){
  const b=dgEls.badge, r=g.getBoundingClientRect(), w=dgEls.wrap.getBoundingClientRect();
  const pad=8, bw=b.offsetWidth, bh=b.offsetHeight;
  const cx=(r.left+r.right)/2-w.left;
  const left=dgClamp(cx, bw/2+pad, Math.max(bw/2+pad, w.width-bw/2-pad));
  let top=r.top-w.top;
  b.classList.remove('below');
  if(top-bh<pad){
    b.classList.add('below');
    top=dgClamp(r.bottom-w.top+6, pad, Math.max(pad, w.height-bh-pad));
  }
  b.style.left=left.toFixed(1)+'px';
  b.style.top=top.toFixed(1)+'px';
}
/* ─── living sea life ───
   Swimmers split left and right of the drill shaft, each keeping its own depth.
   Plants sit on the seabed. Bodies push apart when they touch. */
const DL_SEA_TOP=188, DL_SEA_BOT=338, DL_BED=356, DL_SHAFT_L=292, DL_SHAFT_R=348;
/* Game sizes: same order as real animals, big enough for kids to see.
   A 12 m whale shark is about 90 units; the ship hull is 198. */
const REAL_M={
  dl_plankton:2.5, dl_dolphin:2, dl_whaleshark:12, dl_seabream:0.9,
  dl_hammerhead:4, dl_turtle:1.1, dl_angelfish:0.45, dl_hamour:1,
  dl_butterfly:0.22, dl_seasnake:1.2, dl_ray:1.5, dl_brittlestar:0.25,
  dl_algae:0.55, dl_sponge:0.35, dl_oyster:0.15, dl_coral:0.45
};
function dgLifeUnits(meters){
  // Kids visibility: compress real-world span so reef fish/plants stay
  // ~70–80% of hammerhead, whale still largest but well under the ship (~198).
  const whale=100, min=58;
  const t=Math.sqrt(Math.max(0,meters)/12);
  return min+(whale-min)*t;
}
function dgLifeScale(id,b){
  const len=Math.max(b.width,b.height,1);
  return dgLifeUnits(REAL_M[id]||1)/len;
}
function dgLifePad(el,cx,cy,k){
  const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
  c.setAttribute('cx',cx); c.setAttribute('cy',cy);
  c.setAttribute('r',(18/Math.max(0.04,k)).toFixed(2));
  c.setAttribute('fill','#000'); c.setAttribute('fill-opacity','0');
  c.setAttribute('pointer-events','all');
  el.appendChild(c);
}
const DLIFE_INFO=[
  {id:'dl_plankton',    side:-1, depth:0.06, sp:8,  turn:0.6,  r:16, face:false, vy:0.35, bob:4,   bobF:0.5},
  {id:'dl_dolphin',     side:1,  depth:0.10, sp:26, turn:1.1,  r:26, face:true,  vy:0.4,  bob:2.5, bobF:1.1},
  {id:'dl_whaleshark',  side:-1, depth:0.28, sp:11, turn:0.5,  r:40, face:true,  vy:0.35, bob:3,   bobF:0.5},
  {id:'dl_seabream',    side:1,  depth:0.32, sp:16, turn:1.2,  r:16, face:true,  vy:0.4,  bob:2.5, bobF:1},
  {id:'dl_hammerhead',  side:1,  depth:0.52, sp:22, turn:0.85, r:24, face:true,  vy:0.4,  bob:3,   bobF:0.7},
  {id:'dl_turtle',      side:-1, depth:0.52, sp:13, turn:0.9,  r:22, face:true,  vy:0.45, bob:2.5, bobF:0.8},
  {id:'dl_angelfish',   side:1,  depth:0.72, sp:10, turn:1.6,  r:20, face:true,  vy:0.45, bob:3,   bobF:1.1},
  {id:'dl_hamour',      side:-1, depth:0.74, sp:16, turn:1,    r:20, face:true,  vy:0.45, bob:3,   bobF:0.9},
  {id:'dl_butterfly',   side:-1, depth:0.90, sp:10, turn:1.5,  r:20, face:true,  vy:0.4,  bob:3,   bobF:1.3},
  {id:'dl_seasnake',    side:1,  depth:0.88, sp:18, turn:1.3,  r:16, face:true,  vy:0.3,  bob:2,   bobF:1.6},
  {id:'dl_ray',         side:-1, depth:0.98, sp:15, turn:0.9,  r:22, face:true,  vy:0.22, bob:3,   bobF:0.6},
  {id:'dl_brittlestar', side:1,  depth:0.98, sp:7,  turn:1.1,  r:14, face:false, vy:0.12, bob:1,   bobF:1.2}
];
const DLIFE_PLANTS=[
  {id:'dl_algae',  side:-1, t:0.22},
  {id:'dl_sponge', side:-1, t:0.70},
  {id:'dl_oyster', side:1,  t:0.30},
  {id:'dl_coral',  side:1,  t:0.74}
];
const dgLife=[],dgSta=[];
let dgLifeBuilt=false;
function dgWrap(a){ while(a>Math.PI)a-=Math.PI*2; while(a<-Math.PI)a+=Math.PI*2; return a; }
function dgLifeHolder(el){ let h=el; while(h.parentNode&&h.parentNode!==dgEls.life) h=h.parentNode; return h; }
function dgLifeXform(holder,cx,cy,x,y,rot,sx,k){
  k=k||1;
  holder.setAttribute('transform','translate('+(x-cx).toFixed(1)+' '+(y-cy).toFixed(1)+') translate('+cx.toFixed(1)+' '+cy.toFixed(1)+') rotate('+(rot||0).toFixed(2)+') scale('+((sx||1)*k).toFixed(3)+' '+k.toFixed(3)+') translate('+(-cx).toFixed(1)+' '+(-cy).toFixed(1)+')');
}
function dgLifeInit(){
  if(dgLifeBuilt) return; dgLifeBuilt=true;
  DLIFE_INFO.forEach(function(cfg){
    const el=dgEls.life.querySelector('[data-ia="'+cfg.id+'"]'); if(!el) return;
    const holder=dgLifeHolder(el), b=el.getBBox();
    Array.prototype.forEach.call(holder.querySelectorAll('[style]'),function(n){ n.removeAttribute('style'); });
    const k=dgLifeScale(cfg.id,b), cx=b.x+b.width/2, cy=b.y+b.height/2;
    cfg.k=k;
    cfg.r=Math.max(3,Math.min(b.width,b.height)*k*0.42);
    dgLifePad(el,cx,cy,k);
    cfg.box=[0,DL_SEA_TOP,0,DL_SEA_BOT];
    dgLife.push({cfg:cfg,holder:holder,cx:cx,cy:cy,halfW:(b.width/2)*k,
      homeX:0,homeY:0,x:0,y:0,tx:0,ty:0,
      ang:(Math.random()*2-1)*0.4,vx:0,vy:0,sx:cfg.side,wait:0,seed:Math.random()*9});
  });
  DLIFE_PLANTS.forEach(function(p){
    const el=dgEls.life.querySelector('[data-ia="'+p.id+'"]'); if(!el) return;
    const holder=dgLifeHolder(el), b=el.getBBox();
    const k=dgLifeScale(p.id,b), cx=b.x+b.width/2, cy=b.y+b.height/2;
    dgLifePad(el,cx,cy,k);
    dgSta.push({side:p.side,t:p.t,holder:holder,cx:cx,cy:cy,k:k,
      bottom:b.y+b.height,r:Math.max(3,Math.min(b.width,b.height)*k*0.42),x:0,y:0});
  });
  dgLifeRezone();
  dgLifeReset();
}
/* open water on either side of the drill, matching the drill camera */
function dgLifeZones(){
  const r=dgEls.wrap.getBoundingClientRect();
  const a=Math.max(.5,r.width/Math.max(1,r.height));
  const h=Math.max(556,340/a), w=h*a;
  return {lx:320-w/2+28,rx:320+w/2-28,top:DL_SEA_TOP,bot:DL_SEA_BOT};
}
function dgLifeLane(side,halfW,water){
  const inset=Math.min(Math.max(14,halfW*0.9),100);
  let lo=side<0?water.lx+10:DL_SHAFT_R+inset;
  let hi=side<0?DL_SHAFT_L-inset:water.rx-10;
  if(hi<lo){ if(side<0) lo=hi; else hi=lo; }
  return [lo,hi];
}
function dgLifeAssign(c,water){
  const lane=dgLifeLane(c.cfg.side,c.halfW||c.cfg.r,water);
  c.cfg.box=[lane[0],water.top,lane[1],water.bot];
  c.homeX=(lane[0]+lane[1])/2;
  c.homeY=water.top+(water.bot-water.top)*c.cfg.depth;
}
function dgPlacePlants(water){
  dgSta.forEach(function(p){
    const lane=dgLifeLane(p.side,18,water);
    const x=lane[0]+(lane[1]-lane[0])*p.t;
    const y=DL_BED-(p.bottom-p.cy)*(p.k||1);
    p.x=x; p.y=y;
    dgLifeXform(p.holder,p.cx,p.cy,x,y,0,1,p.k);
  });
}
function dgLifeRezone(){
  if(!dgLifeBuilt) return;
  const water=dgLifeZones();
  dgLife.forEach(function(c){
    dgLifeAssign(c,water);
    const b=c.cfg.box;
    c.x=dgClamp(c.x,b[0],b[2]);
    c.y=dgClamp(c.y,b[1],b[3]);
  });
  dgPlacePlants(water);
}
function dgLifeClamp(c){
  const b=c.cfg.box;
  c.x=dgClamp(c.x,b[0],b[2]);
  c.y=dgClamp(c.y,b[1],b[3]);
}
/* push overlapping bodies apart; plants stay put */
function dgLifeSeparate(){
  for(let i=0;i<dgLife.length;i++){
    const a=dgLife[i];
    for(let j=i+1;j<dgLife.length;j++){
      const b2=dgLife[j], min=a.cfg.r+b2.cfg.r+6;
      let dx=b2.x-a.x, dy=b2.y-a.y, d=Math.hypot(dx,dy);
      if(d>=min) continue;
      if(d<0.001){ dx=(b2.cfg.side-a.cfg.side)||1; dy=(b2.cfg.depth-a.cfg.depth)||0.2; d=Math.hypot(dx,dy); }
      const nx=dx/d, ny=dy/d, push=(min-d)/2+0.25;
      a.x-=nx*push; a.y-=ny*push;
      b2.x+=nx*push; b2.y+=ny*push;
      a.ang+=dgWrap(Math.atan2(-ny,-nx)-a.ang)*0.35;
      b2.ang+=dgWrap(Math.atan2(ny,nx)-b2.ang)*0.35;
    }
    dgSta.forEach(function(s){
      const min=a.cfg.r+s.r+4;
      let dx=a.x-s.x, dy=a.y-s.y, d=Math.hypot(dx,dy);
      if(d>=min) return;
      if(d<0.001){ dx=a.cfg.side; dy=-1; d=Math.hypot(dx,dy); }
      a.x+=dx/d*(min-d); a.y+=dy/d*(min-d);
    });
  }
  dgLife.forEach(dgLifeClamp);
}
function dgLifeReset(){
  dgLife.forEach(function(c){
    const b=c.cfg.box, span=Math.max(8,b[2]-b[0]);
    c.x=dgClamp(c.homeX+(Math.random()*2-1)*span*0.28,b[0],b[2]);
    c.y=c.homeY;
    c.tx=c.x; c.ty=c.y;
    c.ang=(c.cfg.side>0?0:Math.PI)+(Math.random()*2-1)*0.3;
    c.vx=Math.cos(c.ang)*c.cfg.sp; c.vy=0; c.wait=1+Math.random()*2; c.sx=c.cfg.side;
  });
  for(let n=0;n<8;n++) dgLifeSeparate();
  dgLife.forEach(function(c){ dgLifeXform(c.holder,c.cx,c.cy,c.x,c.y,0,c.sx,c.cfg.k); });
}
function dgLifeAway(c,x,y,rad,out){
  const dx=c.x-x, dy=c.y-y, d=Math.hypot(dx,dy);
  if(d<0.001){ out.x+=0.7; return; }
  if(d<rad){ const w=(rad-d)/rad; out.x+=dx/d*w; out.y+=dy/d*w; }
}
function dgLifeStep(dt){
  if(!dgLifeBuilt) return;
  const t=DG.t;
  dgLife.forEach(function(c){
    const b=c.cfg.box;
    c.wait-=dt;
    if(c.wait<=0||(Math.abs(c.tx-c.x)<12&&Math.abs(c.ty-c.y)<8)){
      c.wait=3.5+Math.random()*5;
      c.tx=b[0]+Math.random()*(b[2]-b[0]);
      c.ty=dgClamp(c.homeY+(Math.random()*2-1)*14,b[1],b[3]);
    }
    const dx=c.tx-c.x, dy=c.ty-c.y, dd=Math.hypot(dx,dy)||1;
    const avoid={x:0,y:(c.homeY-c.y)/70};
    if(c.cfg.side<0) avoid.x-=Math.max(0,c.x-(DL_SHAFT_L-c.cfg.r-24))/40;
    else avoid.x+=Math.max(0,(DL_SHAFT_R+c.cfg.r+24)-c.x)/40;
    dgLife.forEach(function(o){ if(o===c) return; dgLifeAway(c,o.x,o.y,c.cfg.r+o.cfg.r+10,avoid); });
    dgSta.forEach(function(s){ dgLifeAway(c,s.x,s.y,c.cfg.r+s.r+8,avoid); });
    const want=Math.atan2(dy/dd+avoid.y*2.4,dx/dd+avoid.x*2.4);
    c.ang+=dgClamp(dgWrap(want-c.ang),-c.cfg.turn*dt,c.cfg.turn*dt);
    c.vx=Math.cos(c.ang)*c.cfg.sp;
    c.vy=Math.sin(c.ang)*c.cfg.sp*c.cfg.vy+(c.homeY-c.y)*0.45;
    c.x+=c.vx*dt; c.y+=c.vy*dt;
  });
  for(let n=0;n<3;n++) dgLifeSeparate();
  dgLife.forEach(function(c){
    if(c.cfg.face&&Math.abs(c.vx)>4) c.sx=c.vx>0?1:-1;
    const bob=Math.sin(t*c.cfg.bobF+c.seed)*c.cfg.bob;
    const rot=-dgClamp(c.vy*1.4,-14,14)*c.sx;
    dgLifeXform(c.holder,c.cx,c.cy,c.x,c.y+bob,rot,c.sx,c.cfg.k);
  });
}
function dgStartFlow(){
  DG.phase='drill';DG.phaseT=0;DG.ready=0;DG.readyShown=false;
  DG.gate=true;DG.taps=0;DG.tapped=new Set();
  dgCam(DG_REG.drill);
  dgSliderSet(false);
  dgChips(0,0);
  dgPromptN('dg_p_tap_n',0,'👆');
  dgFoot('');
  dgEls.life.classList.add('dl-hint');
  dgGauge('dg_depth','0','m');
  dgEls.labels.classList.add('on');
}
function dgUnlockDrill(){
  if(!DG.gate) return;
  DG.gate=false;
  dgSliderSet(true);
  dgPrompt('');
  dgFoot('dg_pull');
  dgEls.life.classList.remove('dl-hint');
  playSfx('sparkle');
}
function dgHardReset(){
  dgHideBanner();
  loopStopAll();
  DG.drillP=0;DG.liftP=0;DG.shipX=820;DG.sink=0;DG.sinkGoal=0;DG.acc=0;DG.shipFlip=1;
  DG.ready=0;DG.readyShown=false;DG.sailWait=0;
  DG.kickT=0;DG.hitSeabed=false;DG.hitRock=false;DG.gate=false;DG.taps=0;DG.tapped=new Set();
  dgEls.life.classList.remove('dl-hint');
  dgEls.depthTag.setAttribute('opacity','0');
  DG.heli.mode='parked';DG.heli.x=220;DG.heli.y=106;DG.heli.rotor=0;DG.heli.sx=1;DG.heli.sxApplied=1;
  dgEls.heliBody.setAttribute('transform','');
  dgEls.heliTxt.setAttribute('transform','');
  dgBuildFlow();
  dgBit(DG_BIT_TOP);dgOilColumn(0);dgTanks(0,0);dgFlowBits(0);dgCargoFill(0);
  dgEls.resGlow.setAttribute('opacity','0');
  dgEls.gasLbl.setAttribute('opacity','0');dgEls.oilLbl.setAttribute('opacity','0');
  dgEls.ship.setAttribute('opacity','0');dgEls.wake.setAttribute('opacity','0');
  dgEls.ship.setAttribute('transform',dgShipTransform());
  dgEls.hose.classList.remove('on');
  dgEls.ship.classList.remove('sailing');
  dgEls.refLabel.classList.remove('on');
  dgEls.bitGlow.setAttribute('opacity','0');
  dgEls.world.classList.remove('drilling','lifting');
  dgEls.ripple.classList.add('off');
  dgEls.badge.classList.remove('show');
  dgEls.world.querySelectorAll('.dlife.tap').forEach(function(n){ n.classList.remove('tap'); });
  dgLifeReset();
  dgStartFlow();
}
function dgFound(){
  DG.phase='found';DG.phaseT=0;
  dgEls.depthTag.setAttribute('opacity','0');
  dgEls.resGlow.setAttribute('opacity','.85');
  dgEls.gasLbl.setAttribute('opacity','1');
  dgEls.oilLbl.setAttribute('opacity','1');
  dgChips(1,1);
  dgPrompt('dg_p_found');
  dgEls.labels.classList.add('on');
  dgSliderSet(false);
  dgCam(DG_REG.found);
  dgGauge('dg_depth','500','m');
  playSfx('sparkle');
  dgBurst(320,470,'spark',20);
  dgBurst(320,486,'bubble',8);
  dgBanner('dg_b_found','dg_b_found_cta',dgToLift);
}
function dgToLift(){
  dgHideBanner();
  DG.phase='lift';DG.phaseT=0;DG.liftP=0;
  dgSliderSet(true);
  dgChips(2,2);
  dgPrompt('');
  dgFoot('dg_pull2');
  dgEls.labels.classList.add('on');
  dgCam(DG_REG.lift);
  dgGauge('dg_rising','0','%');
}
function dgLoadStart(){
  DG.phase='load';DG.phaseT=0;DG.ready=0;DG.readyShown=false;DG.sailWait=0;
  DG.sink=0;DG.sinkGoal=0;
  dgSliderSet(false);
  dgEls.world.classList.remove('lifting');
  dgEls.ripple.classList.add('off');
  dgChips(3,3);
  dgPrompt('dg_p_load');
  dgFoot('');
  dgEls.labels.classList.remove('on');
  dgCam(DG_REG.load);
  dgGauge('dg_loading','0','%');
  DG.shipX=820;
  DG.shipFlip=-1;
  dgEls.ship.classList.remove('sailing');
  dgEls.ship.setAttribute('opacity','1');
  dgEls.ship.setAttribute('transform',dgShipTransform());
  dgEls.wake.setAttribute('opacity','1');
  dgEls.hose.classList.remove('on');
  dgEls.refLabel.classList.remove('on');
  dgCargoFill(0);
  shipHorn(1); /* the tanker is coming in */
  playSfx('sparkle');
}
function dgSail(){
  dgHideBanner();
  DG.phase='sail';DG.phaseT=0;
  dgChips(4,4);
  dgPrompt('dg_p_sail');
  dgFoot('');
  dgGaugeHide();
  dgEls.hose.classList.remove('on');
  dgEls.wake.setAttribute('opacity','1');
  dgEls.ship.classList.add('sailing');
  dgEls.refLabel.classList.add('on');
  DG.heli.mode='follow';
  DG.shipFlip=1;
  DG.sinkGoal=0;
  shipHorn(2); /* setting sail: twice */
  playSfx('whoosh');
}
function dgDone(){
  DG.phase='done';DG.phaseT=0;
  dgChips(5,-1);
  dgPrompt('dg_p_done');
  dgEls.labels.classList.remove('on');
  dgBanner('dg_b_done','dg_again',dgHardReset);
  DG.heli.mode='home';
  DG.heli.air=false;
  loopSet('heli',false);
  playSfx('win');
  confetti(70);
}
function dgUpdate(dt){
  DG.t+=dt;
  DG.drilling=false;DG.lifting=false;
  const k=Math.min(1,dt*4.2);
  DG_CAM.x+=(DG_CAMT.x-DG_CAM.x)*k;
  DG_CAM.y+=(DG_CAMT.y-DG_CAM.y)*k;
  DG_CAM.h+=(DG_CAMT.h-DG_CAM.h)*k;
  dgView();
  dgEls.wave1.setAttribute('d',dgWavePath(170,3,DG.t*1.4));
  dgEls.wave2.setAttribute('d',dgWavePath(174,2.2,DG.t*1.9+2));
  dgEls.waveA.setAttribute('d',dgWavePath(170,4,DG.t*1.4)+' L 1780 300 L -900 300 Z');
  dgEls.waveB.setAttribute('d',dgWavePath(173,5.5,DG.t*1.1+3)+' L 1780 330 L -900 330 Z');
  if(DG.phase==='drill'){
    let moving=false;
    DG.kickT=Math.max(0,DG.kickT-dt);
    if(DG.drillP<DG.target){DG.drillP=Math.min(DG.target,DG.drillP+dt*0.15);moving=true;}
    DG.drilling=moving;
    const by=dgLerp(DG_BIT_TOP,DG_BIT_BOT,DG.drillP);
    if(!DG.hitSeabed&&by>362){DG.hitSeabed=true;DG.kickT=0.5;dgBurst(320,362,'dust',12);}
    if(!DG.hitRock&&by>396){DG.hitRock=true;DG.kickT=0.3;dgBurst(320,396,'spark',8);}
    dgBit(by);
    dgGauge('dg_depth',String(Math.round(DG.drillP*500)),'m');
    dgEls.world.classList.toggle('drilling',moving);
    dgEls.world.classList.remove('lifting');
    dgEls.ripple.classList.add('off');
    if(moving){
      DG.acc+=dt;
      if(DG.acc>0.09){DG.acc=0;dgDrillFX(by);}
      if(DG.drillP>0.05) dgPrompt('dg_p_drilling');
    }
    if(DG.drillP>=0.995){DG.drillP=1;dgBit(DG_BIT_BOT);dgEls.world.classList.remove('drilling');dgFound();}
  } else if(DG.phase==='found'){
    DG.phaseT+=dt;
    dgEls.world.classList.remove('lifting');
    dgEls.ripple.classList.add('off');
    if(DG.phaseT>7&&DG.bannerCb) dgToLift();
  } else if(DG.phase==='lift'){
    let moving=false;
    if(DG.liftP<DG.target){DG.liftP=Math.min(DG.target,DG.liftP+dt*0.09);moving=true;}
    DG.lifting=moving;
    const t=DG.liftP;
    const riseT=dgClamp(t/0.62,0,1);
    const fillT=dgClamp((t-0.62)/0.38,0,1);
    dgOilColumn(riseT);
    dgFlowBits(riseT);
    dgTanks(fillT,fillT*0.92);
    dgGauge('dg_rising',String(Math.round(t*100)),'%');
    dgEls.world.classList.toggle('lifting',moving);
    dgEls.ripple.classList.toggle('off',!(riseT>0.02&&riseT<0.98));
    if(fillT<=0.001){
      const colTop=dgLerp(DG_COL_BOT,DG_COL_TOP,riseT);
      DG_CAMT.x=320;
      DG_CAMT.y=dgClamp(colTop-30,210,470);
      DG_CAMT.h=300;
    } else {
      DG_CAMT.x=400;DG_CAMT.y=92;DG_CAMT.h=190;
    }
    if(moving){
      DG.acc+=dt;
      const colTop=dgLerp(DG_COL_BOT,DG_COL_TOP,riseT);
      if(DG.acc>0.08){
        DG.acc=0;
        if(Math.abs(colTop-170)<30) dgSpawn('foam',320+(Math.random()*2-1)*16,170,{r:3+Math.random()*4,fill:'#FFFFFF',op:.5,vy:-12,vx:(Math.random()*2-1)*20,grow:1,max:1.1+Math.random()});
        if(riseT>0.05&&riseT<0.98) dgSpawn('bubble',320+(Math.random()*2-1)*6,colTop+8,{r:1.6+Math.random()*2,vy:-30-Math.random()*24,vx:(Math.random()*2-1)*10,max:.8+Math.random()*.6,op:.8});
        if(fillT>0.02) dgSpawn('spark',392+(Math.random()*2-1)*10,64+Math.random()*30,{r:1.4+Math.random()*1.4,vx:(Math.random()*2-1)*14,vy:-14-Math.random()*14,max:.5+Math.random()*.4});
      }
      if(t>0.15) dgPrompt('dg_p_rising');
    }
    if(DG.liftP>=0.995){DG.liftP=1;dgOilColumn(1);dgFlowBits(1);dgTanks(1,0.92);dgLoadStart();}
  } else if(DG.phase==='load'){
    DG.phaseT+=dt;
    if(DG.phaseT>=DG_APPROACH_START&&DG.phaseT<DG_APPROACH_END){
      const p=dgClamp((DG.phaseT-DG_APPROACH_START)/DG_WAVE_SEC,0,1);
      DG.shipX=dgLerp(820,436,dgEase(p));
      if(Math.random()<0.3) dgSpawn('foam',DG.shipX+8,178,{r:3+Math.random()*4,fill:'#FFFFFF',op:.5,vx:-20-Math.random()*24,vy:-4,grow:1.1,max:1.2+Math.random()});
    } else if(DG.phaseT>=DG_APPROACH_END&&DG.phaseT<DG_HOSE_END){
      if(!dgEls.hose.classList.contains('on')){dgEls.hose.classList.add('on');dgPrompt('dg_p_fill');}
    } else if(DG.phaseT>=DG_HOSE_END){
      const k=dgClamp((DG.phaseT-DG_HOSE_END)/DG_FILL_SEC,0,1);
      dgEls.hose.classList.add('on');
      dgCargoFill(k);
      dgTanks(1-k,(1-k)*0.92);
      DG.sinkGoal=k*6;
      dgGauge('dg_loading',String(Math.round(k*100)),'%');
      if(Math.random()<0.28) dgSpawn('foam',DG.shipX+10+Math.random()*118,178,{r:3+Math.random()*4,fill:'#FFFFFF',op:.45,vx:-16-Math.random()*20,vy:-3,grow:1.1,max:1.2+Math.random()});
      if(Math.random()<0.22) dgSpawn('spark',509+(Math.random()*2-1)*8,166+(Math.random()*2-1)*4,{r:1.2+Math.random()*1.2,vx:(Math.random()*2-1)*10,vy:-10-Math.random()*10,max:.5+Math.random()*.4});
      if(DG.heli.mode!=='toShip'&&DG.heli.mode!=='follow') DG.heli.mode='toShip';
      if(k>=1){
        if(!DG.readyShown){DG.readyShown=true;dgBanner('dg_b_ready','dg_sail',dgSail);}
        DG.sailWait+=dt;
        if(DG.sailWait>5.5) dgSail();
      }
    }
    DG.sink+=(DG.sinkGoal-DG.sink)*Math.min(1,dt*2.2);
  } else if(DG.phase==='sail'){
    DG.phaseT+=dt;
    const p=Math.min(1,DG.phaseT/DG_SAIL_SEC);
    DG.shipX=dgLerp(436,1340,dgEase(p));
    if(Math.random()<0.3) dgSpawn('foam',DG.shipX-4,182,{r:3+Math.random()*4,fill:'#FFFFFF',op:.5,vx:-24-Math.random()*24,vy:-3,grow:1.2,max:1.2+Math.random()});
    DG_CAMT.x=dgClamp(DG.shipX+70,430,1370);DG_CAMT.y=150;DG_CAMT.h=300;
    DG.sink+=(0-DG.sink)*Math.min(1,dt*2);
    if(p>=1) dgDone();
  }
  dgEls.ship.setAttribute('transform',dgShipTransform());
  dgEls.shipBob.setAttribute('transform','translate(0 '+(Math.sin(DG.t*2.4)*1.4).toFixed(1)+')');
  dgHeliStep(dt);
  dgPartsStep(dt);
  dgLifeStep(dt);
  loopSet('drill',DG.phase==='drill'&&DG.drilling);
  loopSet('suck',(DG.phase==='lift'&&DG.lifting)||(DG.phase==='load'&&DG.phaseT>=DG_APPROACH_END&&!DG.readyShown));
  loopSet('heli',!!DG.heli.air);
  const shipMoving=(DG.phase==='load'&&DG.phaseT>=DG_APPROACH_START&&DG.phaseT<DG_APPROACH_END)||DG.phase==='sail';
  loopSet('waves',shipMoving);
  if(!soundOn||(DG.phase!=='load'&&DG.phase!=='sail')) shipStop();
}
function dgStart(){
  if(DG.running)return;
  DG.running=true;DG.last=performance.now();
  dgPaint();
}
function dgStop(){DG.running=false;loopStopAll();}
function dgSync(i){
  if(i===DG_SLIDE){if(!DG.started){DG.started=true;dgLifeInit();dgHardReset();}dgStart();}
  else dgStop();
}
function dgTick(now){
  if(DG.running){
    const dt=Math.min(0.05,Math.max(0,(now-DG.last)/1000));
    DG.last=now;
    dgUpdate(dt);
  }
  requestAnimationFrame(dgTick);
}
requestAnimationFrame(dgTick);
window.addEventListener('resize',function(){if(DG.running)dgPaint(); if(qatraCur.i>=0) placeQatra(qatraCur.i,qatraCur.k,false); dgLifeRezone();});
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ if(qatraCur.i>=0) placeQatra(qatraCur.i,qatraCur.k,false); });
