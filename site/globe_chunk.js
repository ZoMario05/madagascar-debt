const LAND = [
 [[-168,66],[-162,70],[-156,71.3],[-140,69.6],[-128,70],[-115,68.5],[-95,71],[-85,69.5],[-80,63],[-94,59],[-88,56],[-82,52.5],[-79,55],[-77,60],[-70,59],[-64,60],[-61,56],[-56,52],[-60,47.5],[-65,45],[-70,43],[-71,41.5],[-74,40.5],[-76,38],[-76,35],[-80,32],[-81,30],[-80.5,25.5],[-82.5,27.5],[-84,30],[-89,30],[-94,29.5],[-97.5,26],[-97.5,22],[-95,18.5],[-91,18.5],[-90.5,21],[-87,21.5],[-88,16],[-84,15.5],[-83.5,11],[-81.5,9],[-79,9.5],[-77.5,8],[-80,7.5],[-83,8.5],[-86,11.5],[-88,13.5],[-92,14.5],[-95,16],[-100,17],[-105.5,20],[-106,23],[-109.5,26.5],[-112.5,29.5],[-114.7,31.7],[-117,32.5],[-120.5,34.5],[-122.5,37.5],[-124,40.5],[-124.5,43],[-124,46.5],[-124.7,48.4],[-123,49],[-127,51],[-130.5,54.5],[-133,57.5],[-137,58.5],[-142,60],[-147,61],[-152,59],[-155,57.5],[-158,56.5],[-162,55],[-165,54.5],[-158,58.5],[-162,60],[-165,62],[-165,64.5],[-168,66]],
 [[-73,78],[-60,82],[-35,83.5],[-20,82],[-18,77],[-22,72],[-24,69],[-32,68],[-40,65],[-43,60],[-48,61],[-52,65],[-54,69],[-58,75],[-66,76.5],[-73,78]],
 [[-62,66.5],[-68,70.5],[-78,72.8],[-85,70],[-80,67],[-77,64.5],[-71,62.8],[-65,63.5],[-62,66.5]],
 [[-118,69],[-105,68.5],[-101,70],[-106,73.5],[-117,73],[-118,69]],
 [[-77.5,8],[-75.5,10.8],[-71.5,12.4],[-68,10.5],[-62,10.7],[-60,8.5],[-57,6],[-52,5],[-50,1.5],[-48,-1],[-44.5,-2.5],[-40,-3],[-35.2,-5.5],[-35,-9],[-38.5,-13],[-39,-17.5],[-41,-22],[-44,-23],[-48,-26],[-48.5,-28.5],[-52,-32],[-54,-34.8],[-57.5,-35],[-57,-38],[-62,-39],[-65,-41],[-64.5,-43],[-67.5,-46],[-66,-48],[-69,-51],[-68.5,-53],[-71,-54],[-74,-52],[-75.5,-48],[-74,-44],[-73.5,-40],[-73.5,-37],[-71.5,-32],[-71.5,-26],[-70.5,-22],[-70.3,-18.3],[-75,-15.5],[-77,-12],[-79.5,-7.5],[-81.2,-5],[-80,-2],[-80.5,1],[-78.5,2.5],[-77.5,4],[-77.4,6.5],[-77.5,8]],
 [[-17,21],[-16,24],[-13,27.5],[-9.8,30],[-9.5,32.5],[-6,35.8],[-2,35.1],[2,36.6],[10,37.2],[11,33.5],[15,32.3],[20,30.8],[20,32.5],[25,31.8],[29,30.9],[32.3,31.3],[34,27.5],[37,22],[38.5,18],[41,14.5],[43.3,12.6],[45,10.5],[51.2,11.8],[51,10.4],[48,4.5],[44,0],[41,-2],[39.3,-5],[39.5,-8],[40.5,-11],[40.6,-15],[37,-17.5],[35,-21],[35.5,-24],[32.8,-26],[32.5,-28.5],[30,-31.5],[27,-33.7],[22,-34.2],[20,-34.8],[18.4,-34],[17.8,-31],[15.2,-27],[14.5,-23],[11.8,-17],[12.2,-14],[13.7,-11],[12.5,-6],[12,-5],[9.5,-1.5],[9.4,1],[9.8,3.5],[8.5,4.6],[5.8,4.3],[4.5,6.3],[1.5,6.2],[-2,4.8],[-4.5,5.2],[-7.5,4.4],[-9.5,5.5],[-11.5,6.9],[-13.3,8.5],[-15,10.9],[-16.7,12.5],[-17.5,14.7],[-16.5,16.5],[-16.2,19.5],[-17,21]],
 [[-9.5,37],[-9,39],[-9.3,43],[-8,43.7],[-1.7,43.4],[-1.3,46],[-4.6,48],[-1.5,48.7],[1.6,50.8],[4,51.5],[5,53.3],[8.5,53.6],[8.6,55.5],[8.2,57],[10.5,57.7],[10.8,56],[12.5,54.5],[14.3,53.9],[19,54.5],[21,56.8],[23.5,59.2],[28.5,59.8],[23.5,60.5],[21.5,61],[21,63],[25,65],[22,65.8],[18,62.5],[17.5,61],[18.8,59.5],[16.5,57],[15.5,56.1],[12.8,55.5],[11.2,58.4],[10,59],[7,58],[5,59],[5,61.5],[8,63.5],[13,66],[16,68.5],[20,70],[25,71],[31,70],[40,67.5],[41,66.5],[44,68.5],[53,68],[60,69.5],[68,69],[69,72.5],[73,72.5],[80,72.5],[87,74.5],[100,76.5],[104,77.7],[113,73.7],[127,73.5],[140,72.5],[150,71.5],[160,69.7],[170,70],[179.9,69],[179.9,65],[177,62.5],[170,60],[163,59.5],[162,57.5],[156.5,51.2],[155.5,55.5],[156,57.5],[152,59],[143,59.3],[137,54],[141,53],[141,48.5],[135,43.5],[131,42.6],[129.5,40.5],[129.4,36],[126.5,34.5],[126.2,37.5],[124.8,39.6],[121,40.8],[122.2,40],[121.5,37.5],[119,37.2],[120.8,36],[122,31],[121.5,28.5],[119.5,25.5],[116.5,22.9],[113.5,22.2],[110.5,20.5],[109,21.5],[106.5,20],[105.7,18.5],[108.8,15.5],[109.2,11.6],[107,10.4],[104.8,8.6],[103,10.5],[100.8,12.7],[99.2,10],[100.3,7.3],[103.4,4],[103.5,1.4],[101.3,2.8],[98.5,7.9],[98.2,13],[97.7,16.5],[94.3,16.2],[94,19],[92,21.5],[90.5,22],[88,21.6],[86.5,20],[85,19.3],[82.3,16.6],[80.3,15.8],[80,10.8],[78,8.1],[76.5,8.9],[74.5,14],[73,19],[72.6,21.3],[69,22.5],[67.4,24],[64,25.3],[61.5,25.1],[57.3,25.8],[56.4,27.1],[54,26.7],[51.5,27.9],[50.1,30.1],[48.6,29.9],[48,29.5],[50.1,26.1],[51.5,25.1],[51.6,24.2],[54,24.1],[56.3,26.2],[56.3,24],[58.8,22.9],[59.8,22.5],[57.8,19],[55.4,17.6],[52.2,15.7],[49.6,14.7],[45,12.8],[43.4,12.8],[42.7,15.7],[40.8,19.8],[38.5,23.6],[35.5,28],[34.6,28.1],[34.2,31.2],[35,32.8],[35.9,35.4],[35.8,36.8],[32,36.2],[30.5,36.4],[27.4,37],[26.3,39],[26.2,40.6],[28.8,41],[29.2,41.2],[31.7,41],[35.2,42],[38.3,40.9],[41.6,41.6],[39.7,43.3],[38.2,44.4],[36.7,45.3],[35,45.6],[33.5,44.5],[32.5,45.4],[30.8,46.6],[29.8,45.3],[28.7,44.3],[27.7,42.5],[28,41.6],[26.2,40.8],[23.5,40.2],[22.6,39.6],[23,38.2],[22,36.4],[21.1,37.9],[19.4,40.3],[19.5,41.8],[16.9,43.2],[13.6,45.1],[12.3,45.4],[12.6,44],[14,42.5],[16,41.4],[18.5,40.2],[16.5,39],[16.1,38],[15.6,38.2],[15.8,40],[14,40.8],[12.1,41.9],[10.2,43.9],[8.8,44.4],[7.4,43.7],[4.6,43.4],[3,43],[3.3,41.9],[0.8,41],[-0.3,39.3],[0.2,38.7],[-0.7,37.6],[-2.2,36.7],[-4.4,36.7],[-5.6,36],[-6.5,36.9],[-7.4,37.1],[-8.9,36.9],[-9.5,37]],
 [[130,31],[131.5,31.5],[132,33.8],[135,33.5],[137,34.5],[140,35],[140.8,38],[142,39.5],[141.5,41.4],[140,40.5],[139.8,38.5],[137,37],[135.5,35.7],[132.5,35.5],[130.9,34.2],[129.7,33.2],[130,31]],
 [[140,41.5],[141.5,42.5],[143.3,42],[145.5,43.3],[144,44.2],[141.8,45.4],[141.4,43.6],[140,42.5],[140,41.5]],
 [[-5.7,50],[1.4,51.2],[1.7,52.6],[0,53.5],[-1.5,55],[-2,56],[-1.8,57.6],[-3.5,58.6],[-5,58.6],[-6.2,57.5],[-5.6,56],[-4.9,55],[-3,54.8],[-3.2,53.4],[-4.6,53.3],[-4.5,52.2],[-5.2,51.7],[-3.3,51.4],[-5.7,50]],
 [[-6,52],[-6,54],[-7.5,55.3],[-8.5,54.5],[-10,53.5],[-9.8,51.6],[-8,51.6],[-6,52]],
 [[114,-22],[113.5,-26],[115,-34],[118,-35],[123,-34],[126,-32.3],[131,-31.5],[135,-34.5],[138,-35.5],[139.6,-37.5],[143.5,-38.8],[147,-38],[150,-37.5],[151.2,-34],[153,-31],[153.5,-28],[153,-25],[150.5,-22.5],[149,-20.5],[146,-18],[145.5,-15],[143.5,-14],[142.5,-10.7],[141.5,-13.5],[141.5,-17],[140,-17.7],[137,-16],[135.8,-15],[136.8,-12.2],[133,-11.3],[130.3,-12.2],[129,-15],[126.5,-14],[124.5,-16.5],[122.2,-18],[121,-19.6],[117,-20.6],[114,-22]],
 [[95.3,5.6],[97.5,5.2],[100.4,2.2],[104,-1],[106,-3.1],[105.8,-5.8],[104.6,-5.9],[102.3,-4],[100.3,-1],[98.6,1.8],[95.3,5.6]],
 [[109,1.5],[110,1.7],[111,1.5],[113,3.2],[115.5,5.2],[117.2,6.9],[119,5],[117.8,4.1],[118,1],[117.5,-0.8],[116.5,-3],[114.5,-4],[111,-3],[110,-1.5],[109,1.5]],
 [[105.2,-6.8],[108,-6.3],[111,-6.5],[114.5,-7.7],[114.5,-8.7],[111,-8.3],[106.5,-7.4],[105.2,-6.8]],
 [[131,-1.5],[134,-1],[138,-1.6],[141,-2.6],[145,-4.5],[147.5,-6],[150,-10.4],[146,-8.5],[143,-9.2],[141,-9.1],[138,-8.3],[135.5,-4.4],[132.5,-4],[131,-1.5]],
 [[79.8,9.8],[81.8,7.5],[81.2,6.1],[80,6],[79.8,9.8]],
 [[120,18.5],[122.3,18.4],[122,16],[124,13],[121.5,13.8],[120.6,14.5],[120,18.5]],
 [[122,7],[126.5,7.2],[126,9.2],[123.5,8.6],[122,7]],
 [[172.7,-34.5],[178.5,-37.7],[177,-39.5],[175,-41.5],[173.8,-39.3],[174.5,-37],[172.7,-34.5]],
 [[172.7,-40.5],[174.3,-41.7],[171.5,-44],[169,-46.6],[166.5,-46],[168.5,-44],[172.7,-40.5]],
 [[-24,65.5],[-22,66.4],[-16,66.5],[-13.5,65],[-18,63.4],[-22,63.8],[-24,65.5]],
 [[-84.9,21.9],[-80.5,23.1],[-75,20.1],[-77.7,19.9],[-81,21.7],[-84.9,21.9]],
 [[-74.4,18.5],[-72,19.9],[-68.4,18.6],[-71.5,17.6],[-74.4,18.5]],
 [[12.4,38],[15.6,38.3],[15.1,36.7],[12.4,38]],
 [[8.4,39.1],[9.7,39.2],[9.6,41],[8.2,40.9],[8.4,39.1]]
];

const MADA=[[49.26,-11.95],[49.6,-12.6],[49.95,-13.4],[50.17,-14.3],[50.48,-15.25],[50.25,-15.7],[49.85,-15.45],[49.65,-16.0],[49.85,-16.9],[49.5,-17.6],[49.38,-18.2],[49.05,-19.1],[48.75,-20.0],[48.45,-21.0],[48.0,-22.2],[47.7,-23.2],[47.35,-24.3],[47.05,-24.95],[46.6,-25.15],[45.9,-25.55],[45.15,-25.55],[44.55,-25.2],[44.05,-24.8],[43.7,-23.9],[43.6,-23.1],[43.25,-22.2],[43.35,-21.4],[43.7,-21.0],[44.25,-20.3],[44.45,-19.4],[44.25,-18.6],[44.05,-17.7],[44.4,-16.8],[44.9,-16.2],[45.6,-15.95],[46.3,-15.75],[46.9,-15.25],[47.4,-14.8],[47.9,-14.1],[48.0,-13.5],[48.4,-13.3],[48.75,-12.7],[49.26,-11.95]];
(function(){ const k=7.6, d=MADA.map(([x,y],i)=>`${i?'L':'M'}${((x-43.1)*k).toFixed(1)} ${((-y-11.9)*k).toFixed(1)}`).join('')+'Z'; document.getElementById('logo-path').setAttribute('d',d); })();

function inRing(x,y,ring){ let c=false; for(let i=0,j=ring.length-1;i<ring.length;j=i++){ const [xi,yi]=ring[i],[xj,yj]=ring[j]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) c=!c; } return c; }
const vec=(lat,lng)=>{ const p=lat*Math.PI/180,l=lng*Math.PI/180; return [Math.cos(p)*Math.cos(l),Math.cos(p)*Math.sin(l),Math.sin(p)]; };
const BOX=LAND.map(r=>{ let a=1e9,b=-1e9,c=1e9,d=-1e9; r.forEach(([x,y])=>{a=Math.min(a,x);b=Math.max(b,x);c=Math.min(c,y);d=Math.max(d,y);}); return [a,b,c,d]; });
const DOTS=[];
(function(){ const step=1.25;
  for(let lat=-58;lat<=84;lat+=step){ const cl=Math.cos(lat*Math.PI/180), ls=step/Math.max(cl,.18);
    for(let lng=-180+((lat*7)%ls); lng<180; lng+=ls){ let land=false;
      for(let k=0;k<LAND.length&&!land;k++){ const b=BOX[k]; if(lng<b[0]||lng>b[1]||lat<b[2]||lat>b[3]) continue; if(inRing(lng,lat,LAND[k])) land=true; }
      if(land&&!inRing(lng,lat,MADA)) DOTS.push(vec(lat,lng)); } } })();
const OCEAN=[]; for(let lat=-80;lat<=80;lat+=6){ const ls=6/Math.max(Math.cos(lat*Math.PI/180),.2); for(let lng=-180;lng<180;lng+=ls) OCEAN.push(vec(lat,lng)); }
const MADA_V=MADA.map(([x,y])=>vec(y,x));
const MDG_V=vec(MDG.lat,MDG.lng);
function slerpV(a,b,tt){ const d=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2]))); if(d<1e-6) return a; const s=Math.sin(d),w1=Math.sin((1-tt)*d)/s,w2=Math.sin(tt*d)/s; return [a[0]*w1+b[0]*w2,a[1]*w1+b[1]*w2,a[2]*w1+b[2]*w2]; }
function arcPoints(a,b){ const d=Math.acos(a[0]*b[0]+a[1]*b[1]+a[2]*b[2]), h=0.06+0.34*d/Math.PI, N=90, pts=[]; for(let i=0;i<=N;i++){ const tt=i/N,p=slerpV(a,b,tt),k=1+h*Math.sin(Math.PI*tt); pts.push([p[0]*k,p[1]*k,p[2]*k]); } return pts; }
LENDERS.forEach(l=>{ l.v=vec(l.lat,l.lng); l.arc=arcPoints(l.v,MDG_V); });

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
  draw(); requestAnimationFrame(frame);
}
function spin(ax,ay){ Q=qnorm(qmul(qmul(qaxis(1,0,0,ay),qaxis(0,1,0,ax)),Q)); skyA+=ax*0.05; skyB+=ay*0.05; }

function hexA(hex,a){ const n=parseInt(hex.slice(1),16); return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`; }
function draw(){
  const {cx,cy,r}=LY;
  const ox=-(sky.PW-W)/2+Math.sin(skyA)*(sky.PW-W)*0.45, oy=-(sky.PH-H)/2+Math.sin(skyB)*(sky.PH-H)*0.45;
  ctx.drawImage(sky,ox,oy,sky.PW,sky.PH);
  for(const s of stars){ const a=0.35+0.65*(0.5+0.5*Math.sin(time*0.001*s.sp+s.p)); const x=s.x+ox*s.d+(sky.PW-W)/2*(s.d-1), y=s.y+oy*s.d+(sky.PH-H)/2*(s.d-1);
    if(x<-4||y<-4||x>W+4||y>H+4) continue; ctx.fillStyle=`rgba(255,248,235,${(a*0.9).toFixed(2)})`; ctx.fillRect(x,y,s.s*0.6,s.s*0.6);
    if(s.s>2.2){ ctx.fillStyle=`rgba(255,248,235,${(a*0.25).toFixed(2)})`; ctx.fillRect(x-s.s,y+s.s*0.3-0.3,s.s*2.6,0.6); ctx.fillRect(x+s.s*0.3-0.3,y-s.s,0.6,s.s*2.6); } }
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
  const showAll=r>230;
  const ranked=[...LENDERS].sort((a,b)=>b.total-a.total).slice(0,7).map(l=>l.id);
  ctx.textBaseline='middle';
  for(const l of LENDERS){
    const q=proj(l.v); l.sx=q[0]; l.sy=q[1]; l.vis=q[2]>0.04; if(!l.vis) continue;
    const isSel=selected===l.id,isHov=hover===l.id,dim=selected&&selected!=='mdg'&&!isSel,col=TYPECOL[l.type];
    const rad=(2.6+4.6*Math.sqrt(l.total/maxT))*(isSel?1.4:1)*Math.min(1.3,Math.max(0.8,r/300));
    ctx.globalAlpha=dim?0.35:Math.min(1,0.4+q[2]);
    ctx.fillStyle=col; ctx.shadowColor=col; ctx.shadowBlur=isSel||isHov?18:8; ctx.beginPath(); ctx.arc(q[0],q[1],rad,0,7); ctx.fill(); ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(3,6,6,.85)'; ctx.lineWidth=1.4; ctx.stroke();
    if(isSel||isHov||(!dim&&(showAll||ranked.includes(l.id)))){
      ctx.font=`${isSel||isHov?700:600} ${isSel?13:12}px Manrope,system-ui,sans-serif`; ctx.textAlign=l.ta;
      const tx=q[0]+l.lx+(l.ta==='right'?-rad+2:l.ta==='left'?rad-2:0), ty=q[1]+l.ly;
      ctx.lineWidth=3.2; ctx.strokeStyle='rgba(2,4,4,.8)'; ctx.strokeText(l.s,tx,ty); ctx.fillStyle=isSel||isHov?'#ffffff':'rgba(244,239,228,.88)'; ctx.fillText(l.s,tx,ty); }
    ctx.globalAlpha=1;
  }
  if(mq[2]>0.05){ const px=cx+mq[0]*r,py=cy-mq[1]*r; ctx.font='700 13px Fraunces,Georgia,serif'; ctx.textAlign='left';
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
  renderPanel(); document.getElementById('panel').classList.add('open'); hideTip(); }
function closePanel(){ selected=null; document.getElementById('panel').classList.remove('open'); lastInteract=performance.now()-1200; }
function selectFromPage(id){ window.scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>select(id),350); }

