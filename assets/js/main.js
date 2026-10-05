const MAP_URL="https://maps.app.goo.gl/kcBbwo3EMJDRyrHRA?g_st=ic";
const $=id=>document.getElementById(id);
$('map').href=MAP_URL;
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll('.r').forEach(el=>io.observe(el));
const v=$('v'),intro=$('intro'),au=$('au'),mu=$('mu');let done=false,on=false;
function setM(s){on=s;mu.textContent=s?'♪':'✕';mu.style.opacity=s?1:.6;s?au.play().catch(()=>{}):au.pause()}
function petals(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;const p=$('pt'),f=document.createDocumentFragment();
for(let i=0;i<14;i++){const s=document.createElement('i'),z=9+Math.random()*8,x=Math.random()*100;
s.style.cssText=`--x:${x}%;width:${z}px;height:${z*1.3}px;--o:${.35+Math.random()*.3};--dx:${(Math.random()-.5)*30}%;--rot:${180+Math.random()*360}deg;animation-duration:${14+Math.random()*10}s;animation-delay:${Math.random()*14}s`;f.appendChild(s)}p.appendChild(f)}
function end(){if(done)return;done=true;intro.classList.add('out');document.body.classList.remove('lock');scrollTo(0,0);petals();setTimeout(()=>intro.remove(),1000)}
$('open').addEventListener('click',()=>{$('open').classList.add('gone');mu.classList.add('show');setM(true);v.play().catch(end);setTimeout(end,12000)});
v.addEventListener('ended',end);v.addEventListener('error',end);
mu.addEventListener('click',()=>setM(!on));
