// Land: Natural Earth 1:50m land polygons (public domain, naturalearthdata.com, via world-atlas@2),
// sampled on the globe's dot grid below (1 bit per grid point, Madagascar excluded: it is drawn on its own).
const LANDMASK='AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAgAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAIcAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADAAAAAAAAAAACAAAAAAAAAAAAAAAAAOADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAOADAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA8AMAAAAAAAAAAAAAAAAAACAAEAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAADAAEAAAAAAAAAAA+AMAAAAAAAAAAAAAAAAAAIAAAAQAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAD+BwAAAAAAAAAAAAAAAAAAAB8AwAAAAAAAAAAAgP8BAAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAA/wMAAAAAAAAAAAAAAAAAAAD8AwAAAAAAAAAAAADgvwMAAAAAAAwAAAAAAAAADgD/AQAAAAAAAAAAAADA/wcAAAAAAPwBAAAAAAAA8AP/DwAAAAAAAAAAAAAA/n8AAAAAAIA/AAAAAAAAAP7z/wMAAAAAAAAAAAAAAP8/AAAAAADAfwAAAAAAAAD+//8HAAAAAAAAAAAAAAD4/wMAAAAAAP4HAAAAAAAA4P///wAAAAAAAAAAAAAAAP7/AQAAAADA/wMAAAAAAADw//9/AAAAAAAAAAAAAAAA/v8BAAAAAID/BwAAAAAAAOD///8BAAAAAAAAAAAAAADw/w8AAAAAAPx/AAAAAAAAAPz//z8AAAAAAAAAAAAAAAD8/wcAAAAAAP9/AAAAAAAAAP///w8AAAAAAAAAAAAAAAD4/38AAAAAAP7/AQAAAAAAAPz//z8AAAAAAAAAAAAAAADg//8HAAAAAPD/DwAAAAAAAID///8AEAAAAAAAAAAAAAAA/P//AQAAAAD+/wEAAAAAAACA//8/AAAAAAAAAAAAAAAAAPz//wEAAAAA/v8DAAAAAAAAAPj/PwAAAAAAAAAAAAAAAAD4//8HAAAAAPz/HwAAAAAAAADA//8AAAAFAAAAAAAAAAAAwP//fwAAAADA//8HAAAAAAAAAPh/HgAAAAAAAAAAAAAAAAD+//8fAAAAAPD//wMAAAAAAAAA+A8HAAgAAAAAAAAAAAAAgP///w8AAAAA8P//AwAAAAAAAACQHwMAAAAAAAAAAAAAAAAA////HwAAAADA//8HAAAAAAAAAAA+DAAAAAAAAAAAAAAAAAD+////AQAAAAD+/z8AAAAAAAAAABAgAAAAAAAAAAAAAAAAAOD///8fAAAAAOD//wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8DAAAAAP//HwAAAAAAAAAAAQAMAAAAAAAAAAAAAAAA4P////8AAAAAwP//BwAAAAAAADgAAJyBAgAAAAAAAAAAAAAA/P///z8AAAAA8P//AQAAAAAAwAQAAH9gAAAAAAAAAAAAAAAA/v///x8AAAAA+P//AQAAAAAAMAAAiD8EAAAAAAAAAAAAAAAA/v///w8AAAAA+P//AQAAAAAAMAAK4D8AAAAAAAAAAAAAAAAA/P//vwMAAAAA/P//AwAAAAAAeH0Ksw8AAAAAAAAAAAAAAAAA+P//dwAAAAAA+P//DwAAAAAA9PgYIAMAAAAAAAAAAAAAAAAI8P//NwAAAAAA8P//PwAAAAAAcPADQAAAAAAAAAAAAAAAAAAA8P//DwAAAAAA8P//fwAAAAAANPjzBAAAAAAAAAAAAAAAAAAA4P//DwAAAAAA8P///wAAAAAAeOADBAAAAAAAAAAAAAAAAAAAwP//BwAAAAAA8P///wMAAAAAbMADAAAAAAAAAAAAAAAAAAAAwP//AwAAAAAA+v///wMAAAAAM4ADAAAAAAAAAAAAAAAAAAAA4P//AAAAAPiH/////wMAAAAACIBBAAAAAAAAAAAAAAAAAAAA+P8DAAAAgP///////wAAAAMAAQAKAAAAAAAAAAAAAAAAAACw/j8AAAAA+P//////HwAANAAYAAABAAAAAAAAAAAAAAAAAIDJ/QMAAACA////////AwDAAAAggAAAAAAAAAAAAAAAAAAAAAz4IAAAAAD8//////88AAAcQIgHQAAAAAAAAAAAAAAAAAAAMIAAAAAAAPj//////wMAADgAIB8AAwAAAAAAAAAAAAAAAABwAAAAAAAA+P//////DQAAeACgP0ABAAAAAAAAAAAAAAAAAP4AAAAAAAD4//////88AAA8APAfQAAAAAAAAAAAAAAAAADAHwAAAAAAAP7/////nz8AgA8A/gMIAAAAAAAAAAAAAAAAwP8AAAAAAACA///////xHwD4A9gfgAEAAAAAAAAAAAAAAAC/B8gIAAAAAPz/////x/8BwD/AfwIEAAAAAAAAAAIAAACAPwyAAwAAAAD8/////+P/A+B/4D8DAAAAAAAAAIAAAAAAwA8GDAAAAAAA///////8/wD6P/wPAAAAAAAAAAAEAAAAAPwAYAAAAAAA8P/////P/x+w/+f/HwAAAAAAAAAAAAAAAPIDAAAAAAAAwP////+P/z/g/////wQAAAAAAAAAAAAAgPwDAAAAAAAAwP/////zPwP8////fwAAAAAAAAAAAAAAwH8ACAAAAAAA+P///z//gf//////BwAAAAAAAAAAAABA/gMwAAAAAADg////f/5j//////8fAAAAAAAAAAAAAAD/AxAAAAAAAMD////f//z//////w8AAAAAAAAAAAAA9P8IAwAAAAAA+P/////n//////9/AAAAAAAAAAAAAOT//wMAAAAAAPj/f///////////PwAAAAAAAAAAAAD///8BAAAAAAD+/+OA/////////wEBAAAAAAAAAADw//8fAAAAAADg/wMA/P///////wcCAAAAAAAAAAD8//9/AAAAAADA/wEA/P///////yEOAAAAAAAAAID///8PAAAAAADgHwDg////////D8MBAAAAAAAAAP///x8AAAAAAByQEP8//v////+P4QAAAAAAAADg////AwAAAADgAxD4//H/////DwYEAAAAAAAAwP///w8AAAAA8IPA+P/4/////68BAwAAAAAAAPz///8DAAAAAD/ILv+P/////38PAAAAAAAAAPD///8PAAAAAP9gPoTD//////8HAAAAAAAAAP7///8BAAAA4C/zAz7///////9wAAAAAAAA+P///xcAAAAA/vyDz///////fwQAAAAAAID/////BwAAAPD/n378//////8BAAAAAAAA////7wAAAAD8///+//////9/AAAAAAAA+P//f+MAAAD8//////////9/AAAAAAAA/f//fxIAAAD8//////////8XAAAAAAD4////HwAAAPP//////////wsAAAAAAP//f/8HAAD0/v////////8fEAAAAAD//3//DwAANP7/////////BwYACAD4///7HwAA0AD///////9/AAcAEAD8/z/8AwAACMD///////8DOACAAPz/H/gBAAAE5////////wEHAHDA/3/ADwAAEDr+//////8DBgAc+P8fcAIAAMCH////////IgDw//9/4AAGAMDz////////eQD///8HBjAAAN/////////3AP///wMCDgDA/////////0f8//+/Dw8cwL3//////3/2////WHhoAH/+///////g/98/xx8A8M////////j/g6vgBwD/6v////+Dv/WGwz8APkD///8/MICnD/4BECD///8AAPj04B8AgIj/IwAAMHnwBwAg+C0AAEAB8A8AEPgBAAB4hX8AQOBBAADB/gcAAAEAAGD/QQAAAADA/SEAAgAApD8AIAAAAG8BAAAAAAAMAAAAAA==';

// Madagascar coastline: Natural Earth 1:50m admin-0 countries (id 450)
const MADA=[[49.54,-12.43],[49.59,-12.54],[49.64,-12.64],[49.8,-12.88],[49.88,-12.97],[49.94,-13.07],[49.97,-13.27],[50.07,-13.58],[50.18,-14.04],[50.2,-14.51],[50.24,-14.73],[50.31,-14.94],[50.44,-15.15],[50.48,-15.39],[50.41,-15.63],[50.29,-15.86],[50.26,-15.9],[50.21,-15.96],[50.19,-15.96],[50.09,-15.9],[50.02,-15.8],[49.93,-15.57],[49.89,-15.46],[49.86,-15.44],[49.74,-15.45],[49.66,-15.52],[49.65,-15.57],[49.67,-15.7],[49.7,-15.81],[49.71,-15.93],[49.71,-16.08],[49.74,-16.12],[49.79,-16.16],[49.83,-16.26],[49.84,-16.49],[49.81,-16.6],[49.73,-16.7],[49.74,-16.76],[49.77,-16.81],[49.74,-16.85],[49.64,-16.89],[49.6,-16.93],[49.54,-17.03],[49.45,-17.24],[49.44,-17.35],[49.5,-17.67],[49.48,-17.9],[49.36,-18.34],[49.3,-18.54],[49.2,-18.79],[49.06,-19.12],[48.92,-19.53],[48.8,-19.95],[48.71,-20.21],[48.61,-20.46],[48.47,-20.9],[48.35,-21.35],[48.18,-21.84],[47.93,-22.39],[47.91,-22.46],[47.86,-22.75],[47.8,-22.99],[47.74,-23.23],[47.61,-23.63],[47.59,-23.76],[47.56,-23.87],[47.43,-24.12],[47.37,-24.22],[47.34,-24.32],[47.31,-24.44],[47.27,-24.56],[47.18,-24.79],[47.04,-24.98],[46.94,-25.05],[46.73,-25.15],[46.62,-25.17],[46.39,-25.17],[46.16,-25.23],[45.92,-25.34],[45.69,-25.47],[45.6,-25.53],[45.51,-25.56],[45.21,-25.57],[45.11,-25.54],[44.81,-25.33],[44.7,-25.3],[44.47,-25.27],[44.41,-25.25],[44.35,-25.23],[44.26,-25.12],[44.08,-25.02],[44.03,-25],[44.01,-24.93],[43.99,-24.86],[43.94,-24.79],[43.91,-24.64],[43.85,-24.54],[43.69,-24.36],[43.67,-24.3],[43.66,-24.11],[43.66,-23.98],[43.65,-23.74],[43.66,-23.63],[43.72,-23.53],[43.7,-23.42],[43.64,-23.31],[43.62,-23.19],[43.57,-23.08],[43.4,-22.89],[43.36,-22.79],[43.33,-22.69],[43.26,-22.38],[43.26,-22.28],[43.27,-22.05],[43.29,-21.93],[43.33,-21.85],[43.34,-21.79],[43.37,-21.74],[43.41,-21.7],[43.44,-21.65],[43.5,-21.36],[43.58,-21.29],[43.7,-21.25],[43.8,-21.18],[43.86,-21.08],[43.91,-20.87],[44.06,-20.66],[44.12,-20.55],[44.24,-20.38],[44.35,-20.15],[44.38,-20.03],[44.4,-19.92],[44.43,-19.67],[44.45,-19.55],[44.45,-19.43],[44.39,-19.3],[44.24,-19.07],[44.24,-19.03],[44.25,-18.86],[44.23,-18.74],[44.18,-18.62],[44.11,-18.5],[44.04,-18.29],[44.01,-17.93],[44.01,-17.8],[43.99,-17.69],[43.94,-17.58],[43.98,-17.39],[44.42,-16.7],[44.44,-16.62],[44.42,-16.41],[44.43,-16.29],[44.44,-16.24],[44.48,-16.22],[44.55,-16.2],[44.91,-16.17],[44.96,-16.15],[45.05,-16.1],[45.17,-15.98],[45.22,-15.95],[45.27,-15.96],[45.3,-16.01],[45.34,-16.04],[45.48,-15.99],[45.54,-15.98],[45.6,-15.99],[45.63,-15.95],[45.64,-15.88],[45.66,-15.84],[45.7,-15.81],[45.88,-15.8],[46,-15.78],[46.16,-15.74],[46.19,-15.75],[46.31,-15.9],[46.35,-15.92],[46.4,-15.93],[46.44,-15.9],[46.34,-15.81],[46.33,-15.77],[46.33,-15.71],[46.38,-15.6],[46.47,-15.51],[46.68,-15.38],[46.88,-15.23],[46.94,-15.22],[46.99,-15.24],[47.03,-15.42],[47.03,-15.45],[47.06,-15.46],[47.1,-15.43],[47.13,-15.36],[47.13,-15.3],[47.11,-15.24],[47.09,-15.19],[47.09,-15.15],[47.2,-15.04],[47.28,-14.94],[47.32,-14.82],[47.35,-14.77],[47.44,-14.7],[47.46,-14.71],[47.49,-14.76],[47.5,-14.82],[47.48,-14.87],[47.44,-14.93],[47.43,-14.99],[47.48,-15.01],[47.53,-14.99],[47.59,-14.86],[47.67,-14.74],[47.72,-14.68],[47.77,-14.64],[47.87,-14.65],[47.97,-14.67],[47.81,-14.55],[47.77,-14.37],[47.95,-14.07],[47.96,-14],[47.98,-13.98],[47.99,-13.96],[47.9,-13.86],[47.88,-13.81],[47.9,-13.73],[47.94,-13.66],[47.98,-13.61],[48.04,-13.6],[48.09,-13.62],[48.19,-13.71],[48.26,-13.72],[48.34,-13.64],[48.4,-13.54],[48.51,-13.47],[48.62,-13.43],[48.8,-13.27],[48.91,-12.94],[48.92,-12.84],[48.89,-12.72],[48.85,-12.61],[48.79,-12.47],[48.8,-12.44],[48.9,-12.46],[48.93,-12.44],[49.03,-12.32],[49.21,-12.08],[49.26,-12.08],[49.31,-12.12],[49.33,-12.19],[49.37,-12.24],[49.48,-12.35],[49.54,-12.43]];
(function(){ const k=7.6, d=MADA.map(([x,y],i)=>`${i?'L':'M'}${((x-43.1)*k).toFixed(1)} ${((-y-11.9)*k).toFixed(1)}`).join('')+'Z'; document.getElementById('logo-path').setAttribute('d',d); })();

function inRing(x,y,ring){ let c=false; for(let i=0,j=ring.length-1;i<ring.length;j=i++){ const [xi,yi]=ring[i],[xj,yj]=ring[j]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) c=!c; } return c; }
const vec=(lat,lng)=>{ const p=lat*Math.PI/180,l=lng*Math.PI/180; return [Math.cos(p)*Math.cos(l),Math.cos(p)*Math.sin(l),Math.sin(p)]; };
const DOTS=[];
(function(){ const step=1.25, bin=atob(LANDMASK); let i=0;
  for(let lat=-58;lat<=84;lat+=step){ const cl=Math.cos(lat*Math.PI/180), ls=step/Math.max(cl,.18);
    for(let lng=-180+((lat*7)%ls); lng<180; lng+=ls, i++){ if(bin.charCodeAt(i>>3)>>(i&7)&1) DOTS.push(vec(lat,lng)); } } })();
const OCEAN=[]; for(let lat=-80;lat<=80;lat+=6){ const ls=6/Math.max(Math.cos(lat*Math.PI/180),.2); for(let lng=-180;lng<180;lng+=ls) OCEAN.push(vec(lat,lng)); }
const MADA_V=MADA.map(([x,y])=>vec(y,x));
const MDG_V=vec(MDG.lat,MDG.lng);
function slerpV(a,b,tt){ const d=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))); if(d<1e-6) return a; const s=Math.sin(d),w1=Math.sin((1-tt)*d)/s,w2=Math.sin(tt*d)/s; return [a[0]*w1+b[0]*w2,a[1]*w1+b[1]*w2,a[2]*w1+b[2]*w2]; }
function arcPoints(a,b){ const d=Math.acos(a[0]*b[0]+a[1]*b[1]+a[2]*b[2]), h=0.06+0.34*d/Math.PI, N=90, pts=[]; for(let i=0;i<=N;i++){ const tt=i/N,p=slerpV(a,b,tt),k=1+h*Math.sin(Math.PI*tt); pts.push([p[0]*k,p[1]*k,p[2]*k]); } return pts; }
LENDERS.forEach(l=>{ l.v=vec(l.lat,l.lng); l.arc=arcPoints(l.v,MDG_V); l.ox=0; l.oy=0; });
// Lenders at the same city (e.g. World Bank and IMF in Washington) keep their true coordinates;
// only their dots are spread a few pixels apart on screen so both stay clickable.
(function(){ const done=new Set(); LENDERS.forEach(a=>{ if(done.has(a)) return;
  const g=LENDERS.filter(b=>!done.has(b)&&Math.acos(Math.min(1,a.v[0]*b.v[0]+a.v[1]*b.v[1]+a.v[2]*b.v[2]))<0.012);
  g.forEach(b=>done.add(b)); if(g.length<2) return; g.forEach((b,i)=>{ const t=Math.PI*2*i/g.length+Math.PI/4; b.ox=Math.cos(t); b.oy=Math.sin(t); }); }); })();

// ---------------- quaternion orientation ----------------
const qmul=(a,b)=>[a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3], a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2], a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1], a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]];
const qaxis=(x,y,z,ang)=>{ const s=Math.sin(ang/2); return [Math.cos(ang/2),x*s,y*s,z*s]; };
const qnorm=q=>{ const n=Math.hypot(...q); return q.map(v=>v/n); };
function qmat(q){ const [w,x,y,z]=q; return [1-2*(y*y+z*z),2*(x*y-w*z),2*(x*z+w*y), 2*(x*y+w*z),1-2*(x*x+z*z),2*(y*z-w*x), 2*(x*z-w*y),2*(y*z+w*x),1-2*(x*x+y*y)]; }
function matq(m){ const [a,b,c,d,e,f,g,h,i]=m, tr=a+e+i; let w,x,y,z;
  if(tr>0){ const s=Math.sqrt(tr+1)*2; w=s/4; x=(h-f)/s; y=(c-g)/s; z=(d-b)/s; }
  else if(a>e&&a>i){ const s=Math.sqrt(1+a-e-i)*2; w=(h-f)/s; x=s/4; y=(b+d)/s; z=(c+g)/s; }
  else if(e>i){ const s=Math.sqrt(1+e-a-i)*2; w=(c-g)/s; x=(b+d)/s; y=s/4; z=(f+h)/s; }
  else { const s=Math.sqrt(1+i-a-e)*2; w=(d-b)/s; x=(c+g)/s; y=(f+h)/s; z=s/4; }
  return qnorm([w,x,y,z]); }
function qslerp(a,b,tt){ let d=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]; if(d<0){ b=b.map(v=>-v); d=-d; } if(d>0.9995) return qnorm(a.map((v,i)=>v+(b[i]-v)*tt)); const th=Math.acos(d),s=Math.sin(th); return a.map((v,i)=>v*Math.sin((1-tt)*th)/s+b[i]*Math.sin(tt*th)/s); }
function qLook(lat,lon){
  const l0=lon*Math.PI/180,p0=lat*Math.PI/180,cl=Math.cos(l0),sl=Math.sin(l0),cp=Math.cos(p0),sp=Math.sin(p0);
  return matq([-sl,cl,0, -sp*cl,-sp*sl,cp, cp*cl,cp*sl,sp]); }
let Q=qLook(-8,30), M=qmat(Q), target=null;
const rotv=v=>[M[0]*v[0]+M[1]*v[1]+M[2]*v[2], M[3]*v[0]+M[4]*v[1]+M[5]*v[2], M[6]*v[0]+M[7]*v[1]+M[8]*v[2]];

// ---------------- canvas / sky ----------------
const cv=document.getElementById('space'), ctx=cv.getContext('2d'), tip=document.getElementById('tip');
let W=0,H=0,DPR=1, zoom=1, sky=null, stars=[], skyA=0, skyB=0;
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function rnd(seed){ let s=seed>>>0; return ()=>{ s=(s*1664525+1013904223)>>>0; return s/4294967296; }; }
function buildSky(){
  const r=rnd(7), PW=Math.ceil(W*1.5), PH=Math.ceil(H*1.5);
  sky=document.createElement('canvas'); sky.width=Math.ceil(PW*DPR); sky.height=Math.ceil(PH*DPR);
  const g=sky.getContext('2d'); g.scale(DPR,DPR);
  g.fillStyle='#020306'; g.fillRect(0,0,PW,PH);
  const ang=-0.42, cx=PW*0.5, cy=PH*0.55, bandW=Math.min(PW,PH)*0.22;
  const ux=Math.cos(ang), uy=Math.sin(ang), nx=-uy, ny=ux;
  const clouds=[['rgba(120,70,150,',0.06],['rgba(40,110,90,',0.05],['rgba(190,90,60,',0.045],['rgba(230,200,160,',0.05]];
  for(let i=0;i<70;i++){ const t1=(r()-.5)*PW*1.4, off=(r()+r()+r()-1.5)*bandW*0.8; const x=cx+ux*t1+nx*off, y=cy+uy*t1+ny*off, rad=bandW*(0.4+r()*1.2);
    const c=clouds[Math.floor(r()*clouds.length)]; const gr=g.createRadialGradient(x,y,0,x,y,rad); gr.addColorStop(0,c[0]+c[1]+')'); gr.addColorStop(1,c[0]+'0)'); g.fillStyle=gr; g.fillRect(x-rad,y-rad,rad*2,rad*2); }
  for(let i=0;i<9000;i++){ const t1=(r()-.5)*PW*1.5, off=(r()+r()+r()+r()-2)*bandW*0.55; const x=cx+ux*t1+nx*off, y=cy+uy*t1+ny*off; const a=0.08+r()*0.35; g.fillStyle=`rgba(255,${235+Math.floor(r()*20)},${215+Math.floor(r()*40)},${a})`; g.fillRect(x,y,r()<.9?0.7:1.1,r()<.9?0.7:1.1); }
  g.globalCompositeOperation='multiply';
  for(let i=0;i<26;i++){ const t1=(r()-.5)*PW*1.3, off=(r()-.5)*bandW*0.35; const x=cx+ux*t1+nx*off,y=cy+uy*t1+ny*off,rad=bandW*(0.2+r()*0.4); g.save(); g.translate(x,y); g.rotate(ang); g.scale(2.6,0.45); const gr=g.createRadialGradient(0,0,0,0,0,rad); gr.addColorStop(0,'rgba(20,16,18,0.32)'); gr.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=gr; g.fillRect(-rad,-rad,rad*2,rad*2); g.restore(); }
  g.globalCompositeOperation='source-over';
  for(let i=0;i<2600;i++){ const x=r()*PW,y=r()*PH,m=r(); const s=m<.97?0.6+r()*0.6:1.2+r()*1.2; const tint=r(); const col=tint<.15?'200,215,255':tint<.3?'255,215,180':'255,250,240';
    g.fillStyle=`rgba(${col},${(0.25+r()*0.6).toFixed(2)})`; g.beginPath(); g.arc(x,y,s/2,0,7); g.fill(); }
  for(let i=0;i<4;i++){ const x=r()*PW,y=r()*PH,rad=6+r()*10; g.save(); g.translate(x,y); g.rotate(r()*3); g.scale(1,0.35); const gr=g.createRadialGradient(0,0,0,0,0,rad); gr.addColorStop(0,'rgba(255,240,220,.5)'); gr.addColorStop(1,'rgba(255,240,220,0)'); g.fillStyle=gr; g.beginPath(); g.arc(0,0,rad,0,7); g.fill(); g.restore(); }
  stars=[]; for(let i=0;i<220;i++) stars.push({x:r()*PW,y:r()*PH,s:0.8+r()*1.8,p:r()*6.28,sp:0.6+r()*1.6,d:1.15+r()*0.5});
  sky.PW=PW; sky.PH=PH;
}
function resize(){ DPR=Math.min(window.devicePixelRatio||1,2); W=window.innerWidth; H=window.innerHeight; cv.width=W*DPR; cv.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); buildSky(); }

// ---------------- state ----------------
// touched: once the visitor has turned the globe, it stays exactly where they left it (no auto-spin, no moving on scroll)
let selected=null, hover=null, lastInteract=0, touched=false, atTop=true;
// FADE: globe opacity. 1 at the top of the page, eases down to GLOBE_DIM while reading the sections below
let GLOBE_DIM=innerWidth<760?0.25:0.45; let FADE=1; // phones: text sits right on the globe, so dim more
addEventListener('resize',()=>{ GLOBE_DIM=innerWidth<760?0.25:0.45; });
let LY=null;
function layout(){
  const mobile=W<760, panelOpen=!!selected&&!mobile;
  let base=mobile?Math.min(W*0.46,H*0.32):Math.min(W*0.33,H*0.40);
  let r=base*zoom;
  let cx=panelOpen?(W-Math.min(410,W*0.4)-44)/2+10:W/2, cy=H/2+(mobile?-H*0.04:0);
  if(mobile&&selected){ cy=H*0.21; r=Math.min(r,H*0.15); }
  return {cx,cy,r};
}
function proj(v){ const q=rotv(v); return [LY.cx+q[0]*LY.r, LY.cy-q[1]*LY.r, q[2]]; }
function visible(v,q){ if(q[2]>0) return true; const len2=v[0]*v[0]+v[1]*v[1]+v[2]*v[2]; return Math.hypot(q[0]-LY.cx,q[1]-LY.cy)/LY.r>1.0&&len2>1.0001; }

let time=0,last=performance.now(), vel={x:0,y:0};
function frame(now){
  const dt=Math.min(50,now-last); last=now; time+=dt;
  const want=layout(); if(!LY) LY={...want}; else { const k=1-Math.pow(0.88,dt/16); LY.cx+=(want.cx-LY.cx)*k; LY.cy+=(want.cy-LY.cy)*k; LY.r+=(want.r-LY.r)*k; }
  if(target){ Q=qslerp(Q,target,1-Math.pow(0.92,dt/16)); let d=Math.abs(Q[0]*target[0]+Q[1]*target[1]+Q[2]*target[2]+Q[3]*target[3]); if(d>0.99999) target=null; }
  else if(!dragging&&(Math.abs(vel.x)>1e-5||Math.abs(vel.y)>1e-5)){ spin(vel.x*dt,vel.y*dt); const f=Math.pow(0.94,dt/16); vel.x*=f; vel.y*=f; }
  else if(!touched&&atTop&&!dragging&&!selected&&!reduce&&now-lastInteract>2200){ Q=qnorm(qmul(Q,qaxis(0,0,1,dt*0.00009))); skyA+=dt*0.000012; }
  M=qmat(Q);
  { const sy=window.scrollY, h=window.innerHeight, p=Math.max(0,Math.min(1,(sy-h*0.15)/(h*0.6)));
    const want=selected?1:1-(1-GLOBE_DIM)*p; FADE+=(want-FADE)*(1-Math.pow(0.86,dt/16)); }
  draw(); requestAnimationFrame(frame);
}
function spin(ax,ay){ Q=qnorm(qmul(qmul(qaxis(1,0,0,ay),qaxis(0,1,0,ax)),Q)); skyA+=ax*0.05; skyB+=ay*0.05; }

function hexA(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function draw(){
  ctx.globalAlpha=1;
  const {cx,cy,r}=LY;
  const ox=-(sky.PW-W)/2+Math.sin(skyA)*(sky.PW-W)*0.45, oy=-(sky.PH-H)/2+Math.sin(skyB)*(sky.PH-H)*0.45;
  ctx.drawImage(sky,ox,oy,sky.PW,sky.PH);
  for(const s of stars){ const a=0.35+0.65*(0.5+0.5*Math.sin(time*0.001*s.sp+s.p)); const x=s.x+ox*s.d+(sky.PW-W)/2*(s.d-1), y=s.y+oy*s.d+(sky.PH-H)/2*(s.d-1);
    if(x<-4||y<-4||x>W+4||y>H+4) continue; ctx.fillStyle=`rgba(255,248,235,${(a*0.9).toFixed(2)})`; ctx.fillRect(x,y,s.s*0.6,s.s*0.6);
    if(s.s>2.2){ ctx.fillStyle=`rgba(255,248,235,${(a*0.25).toFixed(2)})`; ctx.fillRect(x-s.s,y+s.s*0.3-0.3,s.s*2.6,0.6); ctx.fillRect(x+s.s*0.3-0.3,y-s.s,0.6,s.s*2.6); } }
  ctx.globalAlpha=FADE; const LBL=Math.max(0,Math.min(1,(FADE-GLOBE_DIM)/(1-GLOBE_DIM)*1.6-0.6));
  let g=ctx.createRadialGradient(cx,cy,r*0.96,cx,cy,r*1.28);
  g.addColorStop(0,'rgba(61,220,132,0.30)'); g.addColorStop(0.35,'rgba(61,180,140,0.10)'); g.addColorStop(1,'rgba(61,220,132,0)');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r*1.28,0,7); ctx.fill();
  g=ctx.createRadialGradient(cx-r*0.38,cy-r*0.42,r*0.05,cx,cy,r*1.02);
  g.addColorStop(0,'#1d4a41'); g.addColorStop(0.45,'#0c2a25'); g.addColorStop(0.85,'#061613'); g.addColorStop(1,'#030b0a');
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,7); ctx.fill();
  ctx.strokeStyle='rgba(160,240,200,0.22)'; ctx.lineWidth=1; ctx.stroke();
  ctx.fillStyle='rgba(170,230,210,0.07)';
  for(const v of OCEAN){ const q=rotv(v); if(q[2]<=0) continue; ctx.fillRect(cx+q[0]*r-0.6,cy-q[1]*r-0.6,1.2,1.2); }
  const ds=Math.max(1.1,r/190);
  for(let k=0;k<DOTS.length;k++){ const q=rotv(DOTS[k]); if(q[2]<=0.0) continue;
    const light=0.55+0.45*(q[0]*-0.45+q[1]*0.5+q[2]*0.74); const a=Math.max(0.12,(0.25+0.75*q[2])*light);
    ctx.fillStyle=`rgba(244,236,214,${a.toFixed(3)})`; ctx.fillRect(cx+q[0]*r-ds/2,cy-q[1]*r-ds/2,ds,ds); }
  const mq=rotv(MDG_V);
  if(mq[2]>0){
    ctx.beginPath(); MADA_V.forEach((v,i)=>{ const q=rotv(v),x=cx+q[0]*r,y=cy-q[1]*r; i?ctx.lineTo(x,y):ctx.moveTo(x,y); }); ctx.closePath();
    const px=cx+mq[0]*r, py=cy-mq[1]*r, gr=ctx.createRadialGradient(px+r*0.01,py-r*0.01,0,px,py,r*0.14);
    gr.addColorStop(0,'rgba(240,255,246,.98)'); gr.addColorStop(0.35,'rgba(141,255,191,.95)'); gr.addColorStop(1,'rgba(30,170,90,.9)');
    ctx.shadowColor='rgba(61,220,132,1)'; ctx.shadowBlur=18+6*Math.sin(time*0.002); ctx.fillStyle=gr; ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(214,255,232,.75)'; ctx.lineWidth=0.8; ctx.stroke();
    for(let k=0;k<3;k++){ const ph=((time/2200)+k/3)%1; ctx.strokeStyle=`rgba(61,220,132,${((1-ph)*0.45).toFixed(3)})`; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(px,py,r*0.05+ph*r*0.16,0,7); ctx.stroke(); }
  }
  const maxT=Math.max(...LENDERS.map(l=>l.total)), sc=Math.max(0.55,r/300);
  for(const l of LENDERS){
    const isSel=selected===l.id, isHov=hover===l.id, dim=selected&&selected!=='mdg'&&!isSel, col=TYPECOL[l.type];
    const w=(0.7+3*Math.sqrt(l.total/maxT))*(isSel?1.6:1)*sc;
    const runs=[]; let cur=null;
    for(const v of l.arc){ const q=proj(v); if(visible(v,q)){ if(!cur){cur=[];runs.push(cur);} cur.push(q);} else cur=null; }
    for(const run of runs){ if(run.length<2) continue;
      ctx.beginPath(); run.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));
      ctx.setLineDash([]); ctx.lineCap='round'; ctx.strokeStyle=hexA(col,dim?0.05:(isSel||isHov?0.5:0.18)); ctx.lineWidth=Math.max(0.5,w*0.6); ctx.stroke();
      ctx.setLineDash([9*sc,15*sc]); ctx.lineDashOffset=-time*0.028*sc;
      ctx.strokeStyle=hexA(col,dim?0.1:(isSel?1:0.85)); ctx.lineWidth=w; if(!dim){ ctx.shadowColor=col; ctx.shadowBlur=isSel?14:5; }
      ctx.stroke(); ctx.shadowBlur=0; }
  }
  ctx.setLineDash([]);
  ctx.textBaseline='middle';
  const cands=[];
  for(const l of LENDERS){
    const q=proj(l.v), sp=7*Math.min(1.3,Math.max(0.8,r/300)); q[0]+=l.ox*sp; q[1]+=l.oy*sp; l.sx=q[0]; l.sy=q[1]; l.vis=q[2]>0.04; if(!l.vis) continue;
    const isSel=selected===l.id,isHov=hover===l.id,dim=selected&&selected!=='mdg'&&!isSel,col=TYPECOL[l.type];
    const rad=(2.6+4.6*Math.sqrt(l.total/maxT))*(isSel?1.4:1)*Math.min(1.3,Math.max(0.8,r/300));
    const a=(dim?0.35:Math.min(1,0.4+q[2]))*FADE;
    ctx.globalAlpha=a;
    ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=isSel||isHov?18:8; ctx.beginPath(); ctx.arc(q[0],q[1],rad,0,7); ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(3,6,6,.85)'; ctx.lineWidth=1.4; ctx.stroke();
    if(LBL>0.01&&(isSel||isHov||!dim)) cands.push({l,x:q[0],y:q[1],rad,a,isSel,isHov,pr:isSel?1e9:isHov?1e8:l.total});
  }
  // Labels: most important first; each tries a few spots around its dot and is skipped if every spot
  // would overlap a label already placed. Zooming in spreads the dots, so more names appear.
  const placed=[];
  if(mq[2]>0.05){ const px=cx+mq[0]*r+r*0.06+6,py=cy-mq[1]*r+r*0.03; placed.push([px-4,py-10,px+96,py+10]); }
  const hitBox=b=>placed.some(p=>b[0]<p[2]&&b[2]>p[0]&&b[1]<p[3]&&b[3]>p[1]);
  cands.sort((m,n)=>n.pr-m.pr);
  for(const c of cands){ const l=c.l;
    ctx.font=`${c.isSel||c.isHov?700:600} ${c.isSel?13:12}px Manrope,system-ui,sans-serif`;
    const w=ctx.measureText(l.s).width, h=15, g=c.rad+4;
    const spots=[[l.lx+(l.ta==='right'?-c.rad+2:l.ta==='left'?c.rad-2:0),l.ly,l.ta],[g,0,'left'],[-g,0,'right'],[0,-g-6,'center'],[0,g+6,'center']];
    for(const [dx,dy,ta] of spots){ const x=c.x+dx,y=c.y+dy, x0=ta==='right'?x-w:ta==='center'?x-w/2:x;
      const box=[x0-3,y-h/2,x0+w+3,y+h/2];
      if(hitBox(box)&&!(c.isSel||c.isHov)) continue;
      placed.push(box); ctx.globalAlpha=c.a*LBL; ctx.textAlign=ta;
      ctx.lineWidth=3.2; ctx.strokeStyle='rgba(2,4,4,.8)'; ctx.strokeText(l.s,x,y); ctx.fillStyle=c.isSel||c.isHov?'#ffffff':'rgba(244,239,228,.88)'; ctx.fillText(l.s,x,y);
      break; } }
  ctx.globalAlpha=FADE;
  if(mq[2]>0.05&&LBL>0.01){ ctx.globalAlpha=FADE*LBL; const px=cx+mq[0]*r,py=cy-mq[1]*r; ctx.font='700 13px Fraunces,Georgia,serif'; ctx.textAlign='left';
    ctx.lineWidth=3.2; ctx.strokeStyle='rgba(2,4,4,.8)'; ctx.strokeText('Madagascar',px+r*0.06+6,py+r*0.03); ctx.fillStyle='#bfffd8'; ctx.fillText('Madagascar',px+r*0.06+6,py+r*0.03); }
}

// ---------------- interaction ----------------
let dragging=false, down=null, moved=0, pointers=new Map(), pinch0=null, lastMove=null;
cv.addEventListener('pointerdown',e=>{
  pointers.set(e.pointerId,{x:e.clientX,y:e.clientY}); touched=true;
  if(pointers.size===2){ const [a,b]=[...pointers.values()]; pinch0={d:Math.hypot(a.x-b.x,a.y-b.y),z:zoom}; down=null; return; }
  down={x:e.clientX,y:e.clientY}; lastMove={x:e.clientX,y:e.clientY,t:performance.now()}; moved=0; dragging=true; target=null; vel={x:0,y:0};
  cv.setPointerCapture(e.pointerId); cv.classList.add('dragging'); lastInteract=performance.now();
});
cv.addEventListener('pointermove',e=>{
  if(pointers.has(e.pointerId)) pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(pinch0&&pointers.size===2){ const [a,b]=[...pointers.values()]; zoom=Math.max(0.22,Math.min(3.2,pinch0.z*Math.hypot(a.x-b.x,a.y-b.y)/pinch0.d)); return; }
  if(down&&LY){ const now=performance.now(), dx=e.clientX-lastMove.x, dy=e.clientY-lastMove.y, dtm=Math.max(1,now-lastMove.t);
    moved=Math.max(moved,Math.hypot(e.clientX-down.x,e.clientY-down.y)); const ax=dx/LY.r, ay=dy/LY.r; spin(ax,ay);
    vel={x:ax/dtm,y:ay/dtm}; lastMove={x:e.clientX,y:e.clientY,t:now}; lastInteract=now; hideTip(); return; }
  const h=hit(e.clientX,e.clientY); hover=h&&h.id!=='mdg'?h.id:null; cv.style.cursor=h?'pointer':'grab'; showTip(h,e.clientX,e.clientY);
});
function up(e){ pointers.delete(e.pointerId); if(pointers.size<2) pinch0=null; if(!down){ return; }
  dragging=false; cv.classList.remove('dragging');
  if(performance.now()-lastMove.t>80) vel={x:0,y:0};
  if(moved<6){ vel={x:0,y:0}; const h=hit(e.clientX,e.clientY); if(h) select(h.id); else if(selected) closePanel(); }
  down=null; }
cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',e=>{ pointers.delete(e.pointerId); pinch0=null; down=null; dragging=false; });
cv.addEventListener('pointerleave',()=>{ if(!down){ hover=null; hideTip(); } });
cv.addEventListener('wheel',e=>{ if(!e.ctrlKey) return; e.preventDefault(); touched=true; zoom=Math.max(0.22,Math.min(3.2,zoom*Math.exp(-e.deltaY*0.01))); },{passive:false});
cv.addEventListener('dblclick',e=>{ zoom=Math.min(3.2,zoom*1.5); });
document.getElementById('zin').onclick=()=>{ touched=true; zoom=Math.min(3.2,zoom*1.3); };
document.getElementById('zout').onclick=()=>{ touched=true; zoom=Math.max(0.22,zoom/1.3); };
document.getElementById('zreset').onclick=()=>{ zoom=1; target=qLook(-8,30); closePanel(); };
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closePanel(); if(e.target.tagName==='INPUT') return; if(e.key==='+'||e.key==='=') zoom=Math.min(3.2,zoom*1.2); if(e.key==='-') zoom=Math.max(0.22,zoom/1.2); });
function hit(x,y){ if(!LY) return null;
  let best=null,bd=16;
  for(const l of LENDERS){ if(!l.vis) continue; const d=Math.hypot(l.sx-x,l.sy-y); if(d<bd){bd=d;best=l;} }
  if(best) return best;
  const mq=proj(MDG_V); if(mq[2]>0&&Math.hypot(mq[0]-x,mq[1]-y)<Math.max(16,LY.r*0.07)) return {id:'mdg'};
  bd=7; for(const l of LENDERS){ for(let i=6;i<l.arc.length-6;i+=3){ const v=l.arc[i],q=proj(v); if(!visible(v,q)) continue; const d=Math.hypot(q[0]-x,q[1]-y); if(d<bd){bd=d;best=l;} } }
  return best; }
function showTip(h,x,y){ if(!h){ hideTip(); return; }
  if(h.id==='mdg') tip.innerHTML=`<b>Madagascar</b><span>${money(TOTAL)} · ${LENDERS.length} ${t('kLenders').toLowerCase()}</span>`;
  else tip.innerHTML=`<b>${esc(lname(h))}</b><span>${money(h.total)} · ${T[lang].tipLoans(h.loans.length)}</span>`;
  tip.style.left=Math.min(W-220,x+14)+'px'; tip.style.top=(y+14)+'px'; tip.style.opacity=1; }
function hideTip(){ tip.style.opacity=0; }
function select(id){
  selected=id; vel={x:0,y:0}; touched=true;
  if(id==='mdg'){ target=qLook(-8,35); }
  else { const l=byLender[id], m=slerpV(l.v,MDG_V,0.42); target=qLook(Math.asin(m[2])*57.2958, Math.atan2(m[1],m[0])*57.2958); }
  renderPanel(); document.getElementById('panel').classList.add('open'); document.body.classList.add('panel-open'); hideTip(); }
function closePanel(){ selected=null; document.getElementById('panel').classList.remove('open'); document.body.classList.remove('panel-open'); lastInteract=performance.now()-1200; }
function selectFromPage(id){ window.scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>select(id),350); }

