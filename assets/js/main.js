const MAP_URL="ADD_GOOGLE_MAP_LINK_HERE";
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
// petals when Save the Date appears
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){o.disconnect();const p=$('petals');for(let i=0;i<26;i++){const s=document.createElement('i');s.style.cssText=`left:${Math.random()*100}%;animation-duration:${4+Math.random()*4}s;animation-delay:${Math.random()*2}s;opacity:${.5+Math.random()*.5}`;p.appendChild(s)}}},{threshold:.5}).observe($('std'));