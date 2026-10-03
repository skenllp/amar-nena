const MAP_URL="https://maps.app.goo.gl/kcBbwo3EMJDRyrHRA?g_st=ic";
const $=id=>document.getElementById(id);
$('map').href=MAP_URL;
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.2});
document.querySelectorAll('.r').forEach(el=>io.observe(el));
const v=$('v'),intro=$('intro'),au=$('au'),mu=$('mu');let done=false,on=false;
function setM(s){on=s;mu.textContent=s?'♪':'✕';mu.style.opacity=s?1:.6;s?au.play().catch(()=>{}):au.pause()}
function end(){if(done)return;done=true;intro.classList.add('out');document.body.classList.remove('lock');scrollTo(0,0);$('foot').classList.add('show');setTimeout(()=>intro.remove(),1000)}
$('open').addEventListener('click',()=>{$('open').classList.add('gone');mu.classList.add('show');setM(true);v.play().catch(end);setTimeout(end,12000)});
v.addEventListener('ended',end);v.addEventListener('error',end);
mu.addEventListener('click',()=>setM(!on));
// countdown
const T=new Date('2026-11-15T17:00:00+05:30');
function tick(){let s=Math.max(0,(T-new Date())/1000|0);const f=[s/86400|0,s%86400/3600|0,s%3600/60|0,s%60];['d','hh','mm','ss'].forEach((k,i)=>$(k).textContent=f[i])}
tick();setInterval(tick,1000);
// petals
function burst(){const p=$('petals');for(let i=0;i<30;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;animation-duration:${4+Math.random()*4}s;animation-delay:${Math.random()*1.2}s;opacity:${.5+Math.random()*.5}`;p.appendChild(s)}}
// scratch to reveal
const cv=$('cv'),cx=cv.getContext('2d');let drawing=false,fin=false,mv=0;
function foil(){const r=devicePixelRatio||1,w=cv.offsetWidth,h=cv.offsetHeight;cv.width=w*r;cv.height=h*r;cx.setTransform(r,0,0,r,0,0);
const g=cx.createLinearGradient(0,0,w,h);g.addColorStop(0,'#E9C9C9');g.addColorStop(.5,'#F6E4D2');g.addColorStop(1,'#D9B98A');cx.fillStyle=g;cx.fillRect(0,0,w,h);
cx.strokeStyle='rgba(143,90,96,.35)';cx.strokeRect(8,8,w-16,h-16);cx.fillStyle='#8F5A60';cx.textAlign='center';cx.font='34px "Great Vibes",cursive';cx.fillText('Scratch here',w/2,h/2-2);cx.font='15px "Cormorant Garamond",serif';cx.fillText('to reveal the date  ✦',w/2,h/2+28)}
function pos(e){const b=cv.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}
function scratch(e){if(!drawing||fin)return;const[x,y]=pos(e);cx.globalCompositeOperation='destination-out';cx.beginPath();cx.arc(x,y,22,0,7);cx.fill();if(++mv%6==0)check()}
function check(){const r=devicePixelRatio||1,d=cx.getImageData(0,0,cv.width,cv.height).data;let c=0,n=0;for(let i=3;i<d.length;i+=64){n++;if(d[i]<20)c++}if(c/n>.45)reveal()}
function reveal(){if(fin)return;fin=true;cv.classList.add('done');$('hint').style.opacity=0;burst();navigator.vibrate&&navigator.vibrate(30)}
cv.addEventListener('pointerdown',e=>{drawing=true;cv.setPointerCapture(e.pointerId);scratch(e)});
cv.addEventListener('pointermove',scratch);
['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>drawing=false));
(document.fonts?document.fonts.ready:Promise.resolve()).then(foil);addEventListener('resize',()=>{if(!fin)foil()});
