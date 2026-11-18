/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Atlas animé — moteur. Les chapitres sont dans v-monde.js, v-pacifique.js, v-decouvertes.js.
   Chaque fichier appelle ATLAS.add({id,title,tag,sub,col,proj,frise,info,chapters:[…]}). */
(function(){
'use strict';
var GEO=window.GEO,DEEPG=window.DEEPG,IMG=window.IMG||{};
var CO={afr:'#f59e0b',aus:'#2dd4bf',lap:'#b794f6',pol:'#ff6b57',kan:'#ffd166',pap:'#f472b6',xet:'#86efac',mis:'#7cb7ff',eur:'#e8edf2',sand:'#f0dc9a',jade:'#5eead4',cat:'#ff9ecb',
  ere:'#d6a56c',nean:'#8fd3ff',ice:'#eaf6ff',ame:'#fb7185',neo:'#a3e635',late:'#f472b6',dense:'#ff5d5d',vide:'#9fb3c8',
  zh:'#ff8a8a',por:'#4ade80',esp:'#fbbf24',fra:'#7cb7ff',ned:'#fb923c',gbr:'#f4a8e0',epi:'#e8b04a',ott:'#c084fc',deni:'#c99bff',flo:'#34d399',mix:'#ff7ab6'};
var TH_DARK={light:false,bg:'#050f1c',sea0:'#17557f',sea1:'#071d33',flat:['#0c2f4f','#134a72','#0c2f4f'],land:'#cdbb8c',coast:'rgba(60,45,15,.55)',cw:0.6,grat:'rgba(160,210,255,.10)',ink:'#f4f0e6',sub:'#d3e6f7',halo:'rgba(6,20,36,.92)',gold:'#ffd166',mk:'#061424',casing:null,ocean:'rgba(160,214,255,.9)',cont:'rgba(255,244,214,.82)',line:'rgba(255,209,102,.7)',linet:'rgba(255,221,150,.95)'};
var TH_LIGHT={light:true,bg:'#ffffff',sea0:'#eef5fb',sea1:'#dcebf6',flat:['#e9f2f9','#e9f2f9','#e9f2f9'],land:'#f6f1e3',coast:'rgba(60,55,45,.95)',cw:1,grat:'rgba(40,80,120,.16)',ink:'#12202e',sub:'#3a4b5c',halo:'rgba(255,255,255,.96)',gold:'#7a4a00',mk:'#12202e',casing:'rgba(20,30,40,.8)',ocean:'rgba(40,90,140,.85)',cont:'rgba(90,70,30,.8)',line:'rgba(150,100,0,.8)',linet:'rgba(110,70,0,.95)'};
var TH=TH_DARK,EXPORT=false,BARE=false;
var GOLD='#ffd166',FONT='"Lexend","Segoe UI",system-ui,sans-serif',RAD=Math.PI/180;
function rgba(h,a){var n=parseInt(h.slice(1),16);return 'rgba('+(n>>16)+','+((n>>8)&255)+','+(n&255)+','+a+')';}
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function sstep(x){x=clamp(x,0,1);return x*x*(3-2*x);}
function fr(n){return Math.round(n).toLocaleString('fr-FR');}

var canvas=document.getElementById('c'),ctx=canvas.getContext('2d'),elStage=document.getElementById('stage');
var LBOX=[],LTXT=[],AVOID=null,W=0,H=0,DPR=1,center=[0,0],camNow={lon:0,lat:0,z:1},R=100,KPX=100;
var PROJ={globe:d3.geoOrthographic().clipAngle(90).precision(0.5),plan:d3.geoEqualEarth().precision(0.5),merc:d3.geoMercator().precision(0.5)};
var projKind='globe',projection=PROJ.globe;
var path=d3.geoPath(projection,ctx);
var GRAT30=d3.geoGraticule().step([30,30])(),GRAT15=d3.geoGraticule().step([15,15])(),GRAT5=d3.geoGraticule().step([5,5])();
var DEEP={type:'MultiPolygon',coordinates:DEEPG.coordinates};
function bindCtx(c){ctx=c;path=d3.geoPath(projection,ctx);}
function setProj(kind){
  if(kind===projKind)return;
  projKind=kind;projection=PROJ[kind];
  path=d3.geoPath(projection,ctx);
  elStage.classList.toggle('flat',kind!=='globe');
}

/* ---------- Terres : polygones, centroïdes, sélection ---------- */
var LP=GEO.world.coordinates.concat(GEO.detail.coordinates);
var ALL={type:'MultiPolygon',coordinates:LP};
var LINFO=LP.map(function(p){
  var g={type:'Polygon',coordinates:p},c=d3.geoCentroid(g),r=0,ring=p[0],i,step=1;
  for(i=0;i<ring.length;i+=step){var d=d3.geoDistance(c,ring[i]);if(d>r)r=d;}
  return {c:c,r:r,n:ring.length};
});
/* Niveaux de détail : contours simplifiés selon le zoom. Moins de points à projeter
   à chaque image = animation fluide ; à fort zoom (ou à l'export) on garde le tracé complet. */
var TOL=[0.02,0.06,0.15,0.35],LPL=[],DEEPL=[],TIER=-1;
function dpRing(ring,tol){
  var n=ring.length;if(n<=5)return ring;
  var keep=new Uint8Array(n),st=[0,n-1],t2=tol*tol,i,j;keep[0]=keep[n-1]=1;
  while(st.length){
    var b=st.pop(),a=st.pop();if(b-a<2)continue;
    var A=ring[a],B=ring[b],dx=B[0]-A[0],dy=B[1]-A[1],L2=dx*dx+dy*dy,mx=-1,mi=-1;
    for(i=a+1;i<b;i++){
      var P=ring[i],ex,ey;
      if(L2===0){ex=P[0]-A[0];ey=P[1]-A[1];}
      else{var u=((P[0]-A[0])*dx+(P[1]-A[1])*dy)/L2;u=u<0?0:u>1?1:u;ex=A[0]+u*dx-P[0];ey=A[1]+u*dy-P[1];}
      var d=ex*ex+ey*ey;if(d>mx){mx=d;mi=i;}
    }
    if(mx>t2){keep[mi]=1;st.push(a,mi,mi,b);}
  }
  var out=[];for(j=0;j<n;j++)if(keep[j])out.push(ring[j]);
  if(out.length<4)out=[ring[0],ring[Math.floor(n/3)],ring[Math.floor(2*n/3)],ring[n-1]];
  return out;
}
function simp(polys,tol){return polys.map(function(p){return p.map(function(rg){return dpRing(rg,tol);});});}
function lpT(){if(TIER<0)return LP;return LPL[TIER]||(LPL[TIER]=simp(LP,TOL[TIER]));}
function deepT(){if(TIER<0)return DEEP;return DEEPL[TIER]||(DEEPL[TIER]={type:'MultiPolygon',coordinates:simp(DEEP.coordinates,TOL[TIER])});}
function tierFor(){
  var tol=0.7*57.2958/(KPX*DPR),k;
  for(k=TOL.length-1;k>=0;k--)if(TOL[k]<=tol)return k;
  return -1;
}
var ALLT={};
function visibleLand(){
  var half,src=lpT();
  if(projKind==='globe')half=Math.min(Math.PI/2,Math.asin(Math.min(1,Math.hypot(W,H)/2/R)))+0.05;
  else{half=Math.hypot(W,H)/2/(KPX*0.5)+0.08;if(half>2.4)return ALLT[TIER]||(ALLT[TIER]={type:'MultiPolygon',coordinates:src});}
  var out=[],i;
  for(i=0;i<LP.length;i++){var I=LINFO[i];if(I.n>3000||d3.geoDistance(center,I.c)<=half+I.r+0.05)out.push(src[i]);}
  return {type:'MultiPolygon',coordinates:out};
}
/* sélections de terres : on garde les numéros des polygones, la géométrie suit le niveau de détail */
var pickCache={};
function idxGeo(ix){var g=ix._g||(ix._g={});return g[TIER]||(g[TIER]=(function(){var src=lpT();return {type:'MultiPolygon',coordinates:ix.map(function(i){return src[i];})};})());}
function pickPts(pts){
  var k='p'+JSON.stringify(pts);if(pickCache[k])return pickCache[k];
  var out=[];
  LP.forEach(function(p,n){var g={type:'Polygon',coordinates:p};for(var i=0;i<pts.length;i++){if(d3.geoContains(g,pts[i])){out.push(n);break;}}});
  return pickCache[k]=out;
}
function pickC(c,r){
  var k='c'+c+'_'+r;if(pickCache[k])return pickCache[k];
  var out=[];LP.forEach(function(p,i){if(LINFO[i].n<3000&&d3.geoDistance(c,LINFO[i].c)*57.2958<=r)out.push(i);});
  return pickCache[k]=out;
}
function pickMulti(m){
  var k='m'+JSON.stringify(m);if(pickCache[k])return pickCache[k];
  var out=[];
  LP.forEach(function(p,i){if(LINFO[i].n>=3000)return;for(var j=0;j<m.length;j++){if(d3.geoDistance([m[j][0],m[j][1]],LINFO[i].c)*57.2958<=m[j][2]){out.push(i);break;}}});
  return pickCache[k]=out;
}
function polyGeo(ring){
  /* plusieurs anneaux (données officielles de nc-geo.js) : un MultiPolygon, chaque anneau orienté comme un polygone simple */
  if(Array.isArray(ring[0][0]))return {type:'MultiPolygon',coordinates:ring.map(function(r){return polyGeo(r).coordinates;})};
  var f=ring[0],l=ring[ring.length-1];if(f[0]!==l[0]||f[1]!==l[1])ring=ring.concat([f]);
  var g={type:'Polygon',coordinates:[ring]};
  if(d3.geoArea(g)>2*Math.PI)g={type:'Polygon',coordinates:[ring.slice().reverse()]};
  return g;
}
var LAGOON=(function(){
  var out=[];
  LP.forEach(function(p,i){var c=LINFO[i].c;if(LINFO[i].n<3000&&c[0]>163.5&&c[0]<168.6&&c[1]>-23&&c[1]<-19.4)out.push(p);});
  return {type:'MultiPolygon',coordinates:out};
})();

/* ---------- Itinéraires ---------- */
function densify(wps,step){
  var out=[];
  for(var i=0;i<wps.length-1;i++){
    var a=wps[i],b=wps[i+1],it=d3.geoInterpolate(a,b);
    var dist=d3.geoDistance(a,b)*180/Math.PI,n=Math.max(2,Math.ceil(dist/step));
    for(var k=0;k<n;k++)out.push(it(k/n));
  }
  out.push(wps[wps.length-1]);return out;
}
function smooth(wps){
  var P=[wps[0].slice()],i,k;
  for(i=1;i<wps.length;i++){var pl=P[i-1][0],d=((wps[i][0]-pl+540)%360)-180;P.push([pl+d,wps[i][1]]);}
  var out=[];
  function cr(a,b,c,d,u){var u2=u*u,u3=u2*u;return 0.5*((2*b)+(-a+c)*u+(2*a-5*b+4*c-d)*u2+(-a+3*b-3*c+d)*u3);}
  for(i=0;i<P.length-1;i++){
    var p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];
    for(k=0;k<8;k++){var u=k/8;out.push([cr(p0[0],p1[0],p2[0],p3[0],u),cr(p0[1],p1[1],p2[1],p3[1],u)]);}
  }
  out.push(P[P.length-1]);return out;
}
function wiggle(pts,amp,freq,phase){
  var N=pts.length;
  return pts.map(function(p,i){
    var s=i/(N-1),a=pts[Math.max(0,i-1)],b=pts[Math.min(N-1,i+1)];
    var dx=((b[0]-a[0]+540)%360)-180,dy=b[1]-a[1],L=Math.hypot(dx,dy)||1;dx/=L;dy/=L;
    var off=amp*Math.sin(Math.PI*s)*Math.sin(2*Math.PI*freq*s+phase);
    return [p[0]-dy*off,p[1]+dx*off];
  });
}
/* r(couleur, début, fin, épaisseur, points, options)
   options : straight, step, amp/freq/phase, taper, dash, boat (pirogue), ship (navire à voiles), sea (doit rester en mer),
   nohead (ligne sans pointe : tropique, câble, limite — tout ce qui n’a pas de sens de parcours) */
function r(col,t0,t1,w,wps,opt){
  opt=opt||{};
  var pts=opt.straight?densify(wps,opt.step||0.15):densify(smooth(wps),opt.step||1.2);
  if(opt.amp)pts=wiggle(pts,opt.amp,opt.freq||2,opt.phase||0);
  return {col:CO[col]||col,t0:t0,t1:t1,w:w,pts:pts,taper:!!opt.taper,boat:!!opt.boat,ship:!!opt.ship,sp:opt.sp||null,dash:!!opt.dash,sea:!!(opt.boat||opt.ship||opt.sea)&&!opt.river&&!opt.nosea,thin:!!opt.thin,nohead:!!opt.nohead,snap:opt.snap};
}
function L(t,lon,lat,text,o){o=o||{};o.t=t;o.lon=lon;o.lat=lat;o.text=text;return o;}
function Pu(t,lon,lat,col,loop){return {t:t,lon:lon,lat:lat,col:col,loop:!!loop};}
function Ph(t,era,txt,col,unc){return {t:t,era:era,txt:txt,c:col,unc:!!unc};}
/* mode « Facile » : texte simplifié (fa) quand l'option est cochée ; *mot* = mot-clé en gras */
var LCK={};
function lc(c,force){if((!TH.light&&!force)||typeof c!=='string'||c.charAt(0)!=='#'||c.length!==7)return c;if(LCK[c])return LCK[c];var n=parseInt(c.slice(1),16),R=n>>16,G=(n>>8)&255,B=n&255,Lm=(0.299*R+0.587*G+0.114*B)/255,k=clamp((Lm-0.75)*3,0,0.7),T=[59,90,120];return LCK[c]='#'+[R,G,B].map(function(v,i){return ('0'+Math.round(v*(1-k)+T[i]*k).toString(16)).slice(-2);}).join('');}
var NUMS=null;
var EMO=/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu,HIDELAB=false;
function phT(p){return opt.easy&&p.fa?p.fa:p.txt;}
function plainT(p){return phT(p).replace(/\*/g,'');}
function sayT(p){return p.era+'. '+plainT(p);}
function Sh(id,t0,t1,pos,rot,fit){return {id:id,t0:t0,t1:t1,pos:pos,rot:rot||0,fit:fit||''};}
function Lz(multi,col,t0,a,fade){return {k:'land',multi:multi,col:col,a:a==null?0.5:a,t0:t0,fade:fade||1.5};}
/* zone régionale : toutes les terres situées dans un contour (ring) ou un cercle (circ:[lon,lat,rayon°]) */
function Rg(ring,col,t0,a,fade,grow){var z={k:'reg',col:col,a:a==null?0.55:a,t0:t0,fade:fade||1.5};if(typeof ring[0]==='number')z.circ=ring;else z.ring=ring;if(grow)z.grow=grow;return z;}

/* ---------- Volets ---------- */
var VOLS=[],VI=-1,VOL=null,CH=[];
var cur={ci:0,t:0},playing=false,last=0,free=null,tool='none',stepHold=false,VIS=ALL,hover=null;
var opt={proj:'auto',speed:1,auto:false,step:false,labels:true,photos:true,names:false,lines:false,scale:true,coord:false,big:false,voice:false,easy:false,frise:true,sprites:true,communes:true,reperes:true};
try{var sv=JSON.parse(localStorage.getItem('atlas-hg-opts')||'null');if(sv)Object.keys(opt).forEach(function(k){if(typeof sv[k]===typeof opt[k])opt[k]=sv[k];});}catch(e){}
function saveOpt(){try{localStorage.setItem('atlas-hg-opts',JSON.stringify(opt));}catch(e){}}

/* ---------- Caméra ---------- */
/* Trajectoire de caméra continue : spline monotone (pas d'arrêt à chaque point clé, pas de
   dépassement), départ et arrivée en douceur. Les grands sauts entre chapitres dézooment à mi-course. */
var FLY=2.4,flyFrom=null,camK=null,camKK='';
function wrap180(x){return ((x%360)+540)%360-180;}
function monoTan(T,V){
  var n=V.length,m=[],d=[],i;
  for(i=0;i<n;i++)m.push(0);
  for(i=0;i<n-1;i++)d.push((V[i+1]-V[i])/(T[i+1]-T[i]));
  for(i=1;i<n-1;i++){
    if(d[i-1]*d[i]<=0)continue;
    var h0=T[i]-T[i-1],h1=T[i+1]-T[i];
    m[i]=3*(h0+h1)/((2*h1+h0)/d[i-1]+(h1+2*h0)/d[i]);
  }
  return m;
}
function fitZ(m){
  m=Math.max(0.002,m);
  return projKind==='globe'?0.40/(0.46*Math.sin(Math.min(1.4,m*1.25))):(Math.min(W,H)*0.40)/(m*1.25*W*0.4436*0.8616);
}
function camKeys(ci){
  var C=CH[ci].cam,f=flyFrom,i;
  var key=VI+'|'+ci+'|'+(f?f.lon.toFixed(4)+','+f.lat.toFixed(4)+','+f.z.toFixed(4):'-')+'|'+projKind+'|'+W+'x'+H;
  if(key===camKK)return camK;
  var K=[];
  if(f){K.push({t:0,lon:f.lon,lat:f.lat,z:f.z});K.push({t:FLY,lon:C[0].lon,lat:C[0].lat,z:C[0].z});}
  else K.push({t:0,lon:C[0].lon,lat:C[0].lat,z:C[0].z});
  for(i=1;i<C.length;i++)K.push({t:Math.max(C[i].t,K[K.length-1].t+0.4),lon:C[i].lon,lat:C[i].lat,z:C[i].z});
  var T=K.map(function(k){return k.t;}),X=[K[0].lon],Y=K.map(function(k){return k.lat;}),Zl=K.map(function(k){return Math.log(k.z);});
  for(i=1;i<K.length;i++)X.push(X[i-1]+wrap180(K[i].lon-X[i-1]));
  var bump=0;
  if(f&&K.length>1){
    var dist=d3.geoDistance([f.lon,f.lat],[C[0].lon,C[0].lat]);
    bump=Math.log(Math.max(zMin(),fitZ(dist/2)))-Math.min(Zl[0],Zl[1]);if(bump>-0.15)bump=0;
  }
  camKK=key;camK={T:T,X:X,Y:Y,Zl:Zl,mx:monoTan(T,X),my:monoTan(T,Y),mz:monoTan(T,Zl),bump:bump,fly:!!f};
  return camK;
}
function camAt(ci,tt){
  var k=camKeys(ci),T=k.T,n=T.length-1,i;
  if(n<1||tt<=T[0])return {lon:wrap180(k.X[0]),lat:k.Y[0],z:Math.exp(k.Zl[0])};
  if(tt>=T[n])return {lon:wrap180(k.X[n]),lat:k.Y[n],z:Math.exp(k.Zl[n])};
  for(i=0;i<n;i++)if(tt<T[i+1])break;
  var h=T[i+1]-T[i],s=(tt-T[i])/h,s2=s*s,s3=s2*s,h00=2*s3-3*s2+1,h10=s3-2*s2+s,h01=-2*s3+3*s2,h11=s3-s2;
  function H(V,M){return h00*V[i]+h10*h*M[i]+h01*V[i+1]+h11*h*M[i+1];}
  var zl=H(k.Zl,k.mz);
  if(i===0&&k.fly&&k.bump<0){var sb=Math.sin(Math.PI*s);zl+=k.bump*sb*sb;}
  return {lon:wrap180(H(k.X,k.mx)),lat:clamp(H(k.Y,k.my),-89,89),z:Math.exp(zl)};
}
function applyCam(c){
  camNow=c;center=[c.lon,c.lat];
  var cx=W/2,cy=H/2;
  if(projKind==='globe'){
    R=Math.min(W,H)*0.46*Math.max(0.9,c.z);KPX=R;
    projection.scale(R).translate([cx,cy]).rotate([-c.lon,-c.lat,0]);
  }else{
    var k0=W*0.4436*c.z;KPX=k0*0.8616;R=KPX;
    projection.scale(projKind==='plan'?k0:KPX).translate([cx,cy]).rotate([-c.lon,0,0]);
    var p=projection([c.lon,clamp(c.lat,-82,82)]),ty=cy+(cy-p[1]),lim=projKind==='merc'?84:90;
    projection.translate([cx,ty]);
    var yT=projection([c.lon,lim])[1],yB=projection([c.lon,-lim])[1];
    if(yB-yT<=H)ty+=(H-(yT+yB))/2;else if(yT>0)ty-=yT;else if(yB<H)ty+=H-yB;
    projection.translate([cx,ty]);
  }
}
function zMin(){return projKind==='globe'?0.9:0.42;}
function fitCam(pts){
  var c=d3.geoCentroid({type:'MultiPoint',coordinates:pts}),m=0.04;
  pts.forEach(function(p){m=Math.max(m,d3.geoDistance(c,p));});
  var z=projKind==='globe'?0.40/(0.46*Math.sin(Math.min(1.4,m*1.25))):(Math.min(W,H)*0.40)/(m*1.25*W*0.4436*0.8616);
  return {lon:c[0],lat:c[1],z:clamp(z,zMin(),14)};
}

/* ---------- Dessin ---------- */
var STARS=[],seed=7;
function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647;}
for(var si=0;si<70;si++)STARS.push([rnd(),rnd(),rnd()<0.2?2:1]);

function resize(){
  var rc=canvas.getBoundingClientRect();
  DPR=Math.min(window.devicePixelRatio||1,2);
  var w=Math.max(200,Math.round(rc.width)),h=Math.max(140,Math.round(rc.height));
  if(w===W&&h===H&&canvas.width===Math.round(W*DPR)&&canvas.height===Math.round(H*DPR))return;
  W=w;H=h;
  canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);
  ctx.setTransform(DPR,0,0,DPR,0,0);
  sizeLayers();
  render();
}
/* pointe de flèche au bout d'un tracé (sens du trajet) */
function arrowHead(x,y,ang,s,col){
  ctx.save();ctx.translate(x,y);ctx.rotate(ang);
  ctx.fillStyle=col;ctx.strokeStyle=TH.mk;ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(s*0.65,0);ctx.lineTo(-s*0.55,-s*0.6);ctx.lineTo(-s*0.25,0);ctx.lineTo(-s*0.55,s*0.6);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
}
function drawBoat(x,y,dir,s,col){
  ctx.save();ctx.translate(x,y);ctx.scale(dir*s,s);
  ctx.lineJoin='round';ctx.strokeStyle='#061424';ctx.lineWidth=1.6/s;
  ctx.fillStyle='#f4f0e6';
  ctx.beginPath();ctx.moveTo(1,-14);ctx.lineTo(10,-4);ctx.lineTo(1,-4);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle=col;
  ctx.beginPath();ctx.moveTo(-12,-3);ctx.quadraticCurveTo(0,7,12,-4);ctx.lineTo(10,-2);ctx.quadraticCurveTo(0,3,-10,-1);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(0,-14);ctx.stroke();
  ctx.beginPath();ctx.moveTo(-5,1);ctx.lineTo(-5,7);ctx.moveTo(4,1);ctx.lineTo(4,7);ctx.stroke();
  ctx.beginPath();ctx.ellipse(0,8,9,1.8,0,0,6.2832);ctx.fillStyle=col;ctx.fill();ctx.stroke();
  ctx.restore();
}
function drawShip(x,y,dir,s,col){
  ctx.save();ctx.translate(x,y);ctx.scale(dir*s,s);
  ctx.lineJoin='round';ctx.strokeStyle='#061424';ctx.lineWidth=1.5/s;
  ctx.fillStyle=col;
  ctx.beginPath();ctx.moveTo(-12,-1);ctx.lineTo(13,-1);ctx.lineTo(9,6);ctx.lineTo(-9,6);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-5,-1);ctx.lineTo(-5,-15);ctx.moveTo(5,-1);ctx.lineTo(5,-18);ctx.stroke();
  ctx.fillStyle='#f4f0e6';
  ctx.beginPath();ctx.moveTo(-10,-13);ctx.quadraticCurveTo(-3,-9,-1,-13);ctx.lineTo(-1,-4);ctx.quadraticCurveTo(-4,-1.5,-10,-4);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(1,-16);ctx.quadraticCurveTo(7,-12,10,-16);ctx.lineTo(10,-4);ctx.quadraticCurveTo(6,-1.5,1,-4);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.restore();
}
var SPR={},SPR_NAMES={radeau:'Radeau de bambou',balancier:'Pirogue à balancier',polynesien:'Pirogue double polynésienne',kanak:'Pirogue double kanak',drakkar:'Drakkar viking',jonque:'Jonque chinoise',boutre:'Boutre de l’océan Indien',goelette:'Goélette de commerce',caravelle:'Caravelle portugaise',nao:'Caraque (nao)',nef:'Nef française de Cartier',galion:'Galion espagnol',flute:'Flûte hollandaise',fregate:'Frégate française',endeavour:'L’Endeavour de Cook',troismats:'Trois-mâts du XIXe siècle',vapeur:'Navire à vapeur',liberty:'Navire de transport (1942)',mineralier:'Minéralier (transport du minerai)',conteneurs:'Porte-conteneurs'};
/* Les 20 bateaux d'origine ont un fichier img/b-<clé>.png. Les autres sprites viennent de js/sprites.js (window.BOATS), chargé après le démarrage :
   bateaux récents, s- = ce qui se déplace sur terre ou dans les airs, l- = lieux, m- = monuments, <clé>-f2 = 2e image d'une animation. */
var SPR_OLD={},SPR_REQ={};Object.keys(SPR_NAMES).forEach(function(k){SPR_OLD[k]=1;});
var SPR_PLUS={'baleinier':'Baleinier','cablier':'Navire câblier (pose les câbles)','chaland':'Chaland de minerai','cuirasse':'Cuirassé','migrants':'Bateau de migrants','porteavions':'Porte-avions','sousmarin':'Sous-marin','ferry':'Navire rapide vers les îles','paquebot':'Paquebot','cargo':'Cargo','marchand18':'Navire marchand du XVIIIe siècle','galere':'Galère marchande de Venise','barge':'Barge de débarquement','thonier':'Thonier','s-erectus':'Homo erectus','s-sapiens':'Homo sapiens','s-neandertal':'Néandertaliens','s-beringie':'Chasseurs de l’âge de glace','s-paysans':'Premiers paysans','s-caravane':'Caravane de chameaux','s-refugies':'Familles sur les routes','s-immigres':'Travailleurs immigrés','s-poilu':'Soldat français (1915)','s-allemand14':'Soldat allemand (1914)','s-tirailleur':'Tirailleur','s-bataillon-pacifique':'Soldat du Bataillon du Pacifique','s-gi':'Soldat américain','s-japonais':'Soldat japonais','s-soldat-chinois':'Soldat chinois (1950)','s-char1917':'Char Renault FT (1917)','s-char1940':'Char de 1940','s-char-sovietique':'Char soviétique','s-char-moderne':'Char d’aujourd’hui','s-missile':'Camion lance-missile','s-train':'Train à vapeur','s-tgv':'TGV (1981)','s-camion-minier':'Camion de mine','s-pickup':'Pick-up','s-avion':'Avion de ligne','s-biplan':'Avion biplan','s-bombardier':'Bombardier américain','s-chasseur-jp':'Avion de chasse japonais','s-dakota':'Avion de transport (1948)','s-cyclone':'Cyclone','l-aeroport':'Aéroport','l-aerodrome':'Aérodrome militaire (1942)','l-atoll':'Atoll','l-bagne':'Pénitencier (bagne)','l-banquise':'Glace','l-barrage':'Barrage','l-base-us':'Base américaine','l-bataille':'Bataille, combats','l-cafeiere':'Plantation de café','l-campement':'Campement','l-canal':'Canal','l-centrale-nucleaire':'Centrale nucléaire','l-champignon':'Explosion atomique','l-cocoteraie':'Cocoteraie','l-comptoir':'Comptoir de commerce','l-cyclone':'Cyclone','l-debarquement':'Débarquement','l-desert':'Désert','l-epave':'Épave','l-ferme-crevettes':'Ferme de crevettes','l-foret':'Forêt','l-fort':'Fort','l-fouille-lapita':'Fouille archéologique','l-fusee':'Fusée','l-grand-ensemble':'Grand ensemble','l-grande-case':'Grande case','l-grotte':'Grotte','l-hypermarche':'Hypermarché','l-mairie':'Mairie','l-mangrove':'Mangrove','l-mine':'Mine','l-mission':'Mission','l-monument':'Monument','l-montagne':'Montagne','l-mur-berlin':'Mur de Berlin','l-onu':'Siège de l’ONU','l-parlement-europeen':'Parlement européen','l-pearl-harbor':'Pearl Harbor (1941)','l-plage':'Plage','l-plantation':'Plantation','l-port-conteneurs':'Port à conteneurs','l-recif':'Récif de corail','l-rethondes':'Wagon de l’armistice','l-station':'Station d’élevage','l-tranchee':'Tranchée','l-tribu':'Tribu','l-urne':'Vote','l-usine':'Usine','l-usine-armement':'Usine d’armement','l-village-iroquoien':'Village iroquoien','l-village-neolithique':'Village des premiers paysans','l-ville':'Grande ville','l-volcan':'Volcan','l-wharf':'Wharf (quai de chargement)','m-arc-triomphe':'Arc de triomphe','m-assemblee':'Assemblée nationale','m-bastille':'Colonne de la Bastille','m-belem':'Tour de Belém','m-big-ben':'Big Ben','m-brandebourg':'Porte de Brandebourg','m-burj-khalifa':'Burj Khalifa','m-cathedrale-noumea':'Cathédrale de Nouméa','m-chichen-itza':'Chichén Itzá','m-christ-rio':'Christ de Rio','m-cite-interdite':'Cité interdite','m-coeur-voh':'Cœur de Voh','m-colisee':'Colisée','m-elysee':'Palais de l’Élysée','m-hiroshima':'Dôme d’Hiroshima','m-kremlin':'Place Rouge','m-liberte':'Statue de la Liberté','m-maison-blanche':'Maison-Blanche','m-moai':'Moaï','m-mont-saint-michel':'Mont-Saint-Michel','m-muraille':'Grande Muraille','m-notre-dame':'Notre-Dame de Paris','m-opera-sydney':'Opéra de Sydney','m-pagode-nankin':'Tour de porcelaine de Nankin','m-pearl-harbor':'Mémorial de Pearl Harbor','m-phare-amedee':'Phare Amédée','m-pyramides':'Pyramides','m-sainte-sophie':'Sainte-Sophie','m-senat':'Sénat','m-stonehenge':'Stonehenge','m-taj-mahal':'Taj Mahal','m-tiki':'Tiki','m-tjibaou':'Centre culturel Tjibaou','m-tour-eiffel':'Tour Eiffel','m-tour-tokyo':'Tour de Tokyo','m-venise':'Venise','m-versailles':'Château de Versailles'};
Object.keys(SPR_PLUS).forEach(function(k){SPR_NAMES[k]=SPR_PLUS[k];});
function sprSrc(k){var B=window.BOATS;return (B&&B[k])||(SPR_OLD[k]?'img/b-'+k+'.png':null);}
function sprGet(k){var im=SPR[k];if(im)return im;if(SPR_REQ[k])return null;var src=sprSrc(k);if(!src)return null;SPR_REQ[k]=1;im=new Image();im.onload=function(){SPR[k]=im;schedule();};im.onerror=function(){};im.src=src;return null;}
/* 'a|b' : le premier sprite qui existe (a peut être un sprite pas encore dessiné, b le remplace en attendant) ; rend la clé prête à dessiner, sinon null */
function sprAny(s){if(!s)return null;var a=s.indexOf('|')<0?[s]:s.split('|'),i;for(i=0;i<a.length;i++){if(SPR[a[i]])return a[i];if(sprSrc(a[i])){sprGet(a[i]);return null;}}return null;}
function sprLoad(){if(window.BOATS&&window.BOATS['s-avion'])return;var e=document.createElement('script');e.src='js/sprites.js';e.async=true;document.head.appendChild(e);}
function sprKind(k){return k==='s-cyclone'?'tour':/^s-(avion|biplan|bombardier|chasseur|dakota)/.test(k)?'air':/^s-(train|tgv|camion|char|missile|pickup)/.test(k)?'roue':/^s-/.test(k)?'pas':/^[lm]-/.test(k)?'lieu':'mer';}
/* sprite au bout d'un trajet : il regarde dans le sens de la marche et bouge un peu (roulis d'un bateau, pas d'un marcheur, vol d'un avion) */
function drawSpr(key,x,y,dir,ang,sc,tt){
  var im=SPR[key],kind=sprKind(key),ph=EXPORT?0:tt*6.2832,f2=EXPORT?null:sprGet(key+'-f2'),ref=im,bw,bh,dy=0,rot=0,i,u;
  if(f2&&Math.floor(tt*3.4)%2)im=f2;
  if(kind==='mer'){bw=46*sc;bh=bw*ref.height/ref.width;}
  else{var q=Math.sqrt(clamp(ref.width/ref.height,0.5,2.8)),s0=(kind==='tour'?44:kind==='pas'?38:34)*sc;bw=s0*q;bh=s0/q;}
  ctx.save();ctx.translate(x,y);
  if(kind==='tour'){ctx.rotate(EXPORT?0:tt*1.5);ctx.globalAlpha=0.92;ctx.drawImage(im,-bw/2,-bh/2,bw,bh);ctx.restore();return;}
  if(kind==='air'){ctx.fillStyle='rgba(8,20,36,.22)';ctx.beginPath();ctx.ellipse(0,3*sc,bw*0.3,bh*0.14,0,0,6.2832);ctx.fill();}
  if(kind==='mer'&&!EXPORT){ctx.strokeStyle='#fff';ctx.lineWidth=1.3*sc;ctx.lineCap='round';
    for(i=0;i<3;i++){u=((tt*0.55+i/3)%1+1)%1;ctx.globalAlpha=(1-u)*0.5;ctx.beginPath();ctx.arc(-dir*(bw*0.42+u*bw*0.42),bh*0.2,2.6*sc*(0.6+u),0.25,2.9);ctx.stroke();}ctx.globalAlpha=1;}
  if(kind==='roue'&&!EXPORT){ctx.fillStyle='#e6dccb';for(i=0;i<3;i++){u=((tt*0.9+i/3)%1+1)%1;ctx.globalAlpha=(1-u)*0.42;ctx.beginPath();ctx.arc(-dir*(bw*0.52+u*10*sc),-2*sc-u*5*sc,(1.8+u*3)*sc,0,6.2832);ctx.fill();}ctx.globalAlpha=1;}
  ctx.scale(dir,1);
  if(kind==='mer'){dy=Math.sin(ph*0.45)*1.1*sc;rot=Math.sin(ph*0.45+1)*0.04;ctx.translate(0,dy);ctx.rotate(rot);ctx.drawImage(im,-bw/2,-bh*0.74,bw,bh);}
  else if(kind==='air'){var d=dir>0?ang:-(Math.atan2(Math.sin(ang-Math.PI),Math.cos(ang-Math.PI)));d=Math.atan2(Math.sin(d),Math.cos(d));ctx.translate(0,-11*sc+Math.sin(ph*0.35)*1.4*sc);ctx.rotate(clamp(d,-0.55,0.55));ctx.drawImage(im,-bw/2,-bh/2,bw,bh);}
  else if(kind==='roue'){ctx.translate(0,Math.sin(ph*2.6)*0.45*sc);ctx.drawImage(im,-bw/2,-bh*0.94,bw,bh);}
  else{dy=-Math.abs(Math.sin(ph*0.85))*2.2*sc;rot=Math.sin(ph*0.85)*0.03;ctx.translate(0,dy);ctx.rotate(rot);ctx.drawImage(im,-bw/2,-bh*0.94,bw,bh);}
  ctx.restore();
}
/* petite image posée sur un lieu (étiquette avec ic:'clé') : taille liée à celle du texte, surface égale d'un sprite à l'autre */
function icDim(Lb,fs){
  if(!Lb.ic||!opt.sprites||NUMS||BARE)return null;
  var k=sprAny(Lb.ic);if(!k)return null;
  var im=SPR[k],q=Math.sqrt(clamp(im.width/im.height,0.55,1.8)),h0=fs*2.35*clamp(0.92+0.06*Math.sqrt(Math.max(1,camNow.z||1)),0.92,1.45)*((Lb.gold||Lb.big)?1.15:1);
  return {k:k,im:im,w:h0*q,h:h0/q};
}
var PUFF={'l-usine':[0.46,0.02],'l-volcan':[0.36,0],'l-centrale-nucleaire':[0.4,0.08]};
function drawIcon(I,q,Lb){
  var tt=cur.t,s=1,rot=0,u,c1=1.70158,i;
  if(!EXPORT){u=clamp((tt-Lb.t)/0.55,0,1);s=u>=1?1:1+(c1+1)*Math.pow(u-1,3)+c1*Math.pow(u-1,2);if(I.k==='l-bataille')rot=Math.sin(tt*5+Lb.lon)*0.07;}
  if(s<=0.02)return;
  var w=I.w*s,h=I.h*s,by=q[1]+I.h*0.2,a0=ctx.globalAlpha;
  ctx.save();
  if(I.k==='s-cyclone'){ctx.translate(q[0],q[1]);ctx.rotate(EXPORT?0:tt*1.5);ctx.drawImage(I.im,-w/2,-h/2,w,h);}
  else{ctx.translate(q[0],by);if(rot)ctx.rotate(rot);ctx.drawImage(I.im,-w/2,-h,w,h);}
  ctx.restore();
  var pf=PUFF[I.k];
  if(pf&&!EXPORT&&s>=1){var r=I.h*0.1,px=q[0]+(pf[0]-0.5)*I.w,py=by-I.h*(1-pf[1]);ctx.save();ctx.fillStyle='#ece7de';
    for(i=0;i<3;i++){u=((tt*0.42+i/3)%1+1)%1;ctx.globalAlpha=a0*(1-u)*0.55;ctx.beginPath();ctx.arc(px+Math.sin((u+i)*5)*r*0.6,py-u*r*3.4,r*(0.55+u),0,6.2832);ctx.fill();}ctx.restore();}
}
/* js/sprmap.js : quel sprite sur quel trajet (r : n° de trajet, ou '*' pour tous les trajets sans bateau) et sur quel lieu
   (l : tout le volet, lc : un chapitre ; '' = pas d'image dans ce chapitre) */
function sprMap(v){var M=(window.SPRMAP||{})[v.id];if(!M)return;(v.chapters||[]).forEach(function(c,ci){var R=M.r&&M.r[ci],LC=(M.lc&&M.lc[ci])||{},LV=M.l||{};
  if(R)(c.routes||[]).forEach(function(rt,i){var k=R[i]||(!(rt.boat||rt.ship)&&R['*']);if(k)rt.sp=k;});
  (c.labels||[]).forEach(function(l){if(l.ic)return;var k=LC[l.text]!==undefined?LC[l.text]:LV[l.text];if(k)l.ic=k;});});}
/* Arrivées : un trajet qui vise un lieu nommé (à moins de 60 km de son dernier point) finit sur ce lieu, pas à côté.
   Un trajet de mer s'arrête à la côte (jamais sur la terre). Un trajet sans lieu proche (départ, sortie de carte) n'est pas touché ;
   `snap:false` dans r(…) empêche l'ajustement. */
function onLand(p){for(var j=0;j<LP.length;j++){if(d3.geoDistance(p,LINFO[j].c)>LINFO[j].r+0.01)continue;if(d3.geoContains({type:'Polygon',coordinates:LP[j]},p))return true;}return false;}
function snapArrivals(v){(v.chapters||[]).forEach(function(c){
  var labs=(c.labels||[]).filter(function(l){return l.lon!=null&&l.lat!=null&&l.text;});if(!labs.length)return;
  (c.routes||[]).forEach(function(rt){
    if(rt.nohead||rt.snap===false||!rt.pts||rt.pts.length<2)return;
    var E=rt.pts[rt.pts.length-1],best=null,bd=1e9;
    labs.forEach(function(l){var d=d3.geoDistance(E,[l.lon,l.lat])*6371;if(d<bd){bd=d;best=l;}});
    if(!best||bd<3||bd>60)return;
    var it=d3.geoInterpolate(E,[best.lon,best.lat]),last=null,k,q;
    for(k=1;k<=60;k++){q=it(k/60);if(rt.sea&&onLand(q))break;last=q;}
    if(!last||d3.geoDistance(E,last)*6371<3)return;
    rt.pts=rt.pts.concat(densify([E,last],0.15).slice(1));rt._snap=true;
  });});}
function sprKey(rt){return rt.sp||(rt.ship?'nao':'balancier');}
function projPts(pts,n,frac){
  var sp=[],prev=null,flat=projKind!=='globe',i;
  function add(p){
    if(flat){var dl=((p[0]-center[0]+540)%360)-180;if(prev!==null&&Math.abs(dl-prev)>180)sp.push(null);prev=dl;sp.push(projection(p));}
    else sp.push(d3.geoDistance(p,center)>1.553?null:projection(p));
  }
  for(i=0;i<=n;i++)add(pts[i]);
  if(frac>0&&n<pts.length-1)add(d3.geoInterpolate(pts[n],pts[n+1])(frac));
  return sp;
}
function drawRoute(rt,tt,K){
  var p=(tt-rt.t0)/(rt.t1-rt.t0);
  if(p<=0)return;
  if(FULLR)p=1;   /* carte-document : un trajet commencé est dessiné en entier */
  var e=p>=1?1:0.5-0.5*Math.cos(Math.PI*p);
  var N=rt.pts.length,f=e*(N-1),n=Math.min(N-1,Math.floor(f)),frac=f-n,i;
  var sp=projPts(rt.pts,n,frac);
  var w=rt.w*K,M=sp.length;
  ctx.lineCap='round';ctx.lineJoin='round';
  function trace(){ctx.beginPath();var pen=false;for(var j=0;j<M;j++){var q=sp[j];if(!q){pen=false;continue;}if(!pen){ctx.moveTo(q[0],q[1]);pen=true;}else ctx.lineTo(q[0],q[1]);}}
  ctx.setLineDash([]);
  if(TH.casing){if(!rt.taper){if(rt.dash)ctx.setLineDash([7*K,6*K]);ctx.strokeStyle=TH.casing;ctx.lineWidth=w+2.2;trace();ctx.stroke();ctx.setLineDash([]);}}
  var RC=lc(rt.col);
  if(false){}else if(!rt.thin){ctx.strokeStyle=rgba(RC,.22);ctx.lineWidth=w*2.6;trace();ctx.stroke();}
  ctx.strokeStyle=RC;
  if(rt.taper){
    for(i=1;i<M;i++){
      var a=sp[i-1],b=sp[i];if(!a||!b)continue;
      ctx.lineWidth=Math.max(1.6,w*(1-0.62*(i/(N-1))));
      ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
    }
  }else{
    ctx.lineWidth=w;if(rt.dash)ctx.setLineDash([7*K,6*K]);trace();ctx.stroke();ctx.setLineDash([]);
  }
  var tip=sp[M-1],prev=null;
  if(tip){
    for(i=M-2;i>=0;i--){if(!sp[i])break;if(Math.hypot(tip[0]-sp[i][0],tip[1]-sp[i][1])>=4){prev=sp[i];break;}}
    if(prev){
      var ang=Math.atan2(tip[1]-prev[1],tip[0]-prev[0]);
      var sea=rt.boat||rt.ship,sk=(sea||(rt.sp&&p<1&&opt.sprites))?sprAny(sprKey(rt)):null;   /* sprite : bateau, ou trajet à pied, en train, en avion… (js/sprmap.js) */
      if(sea||sk){
        var cs=Math.cos(ang),dir=rt._dir||(cs>=0?1:-1);if(cs>0.3)dir=1;else if(cs<-0.3)dir=-1;if(!EXPORT)rt._dir=dir;
        var sc=clamp(0.85*K*(0.8+0.12*Math.sqrt(Math.max(1,camNow.z))),0.8,2);
        if(p<1){
          if(sk)drawSpr(sk,tip[0],tip[1],dir,ang,sc,tt);
          else if(rt.ship)drawShip(tip[0],tip[1],dir,sc,RC);else drawBoat(tip[0],tip[1],dir,sc,RC);
        }
        else if(!rt.nohead)arrowHead(tip[0],tip[1],ang,(8+rt.w*1.6)*K,RC);   /* trajet terminé (carte figée, PDF, Word) : une pointe, pour que le sens se lise */
      }else if(!rt.nohead)arrowHead(tip[0],tip[1],ang,(8+rt.w*1.6)*K,RC);
    }
  }
}
function zoneAlpha(z,tt){
  var a=(z.a==null?0.55:z.a)*sstep((tt-z.t0)/(z.fade||1));
  if(z.t3!=null)a*=1-sstep((tt-z.t2)/(z.t3-z.t2));
  return a;
}
function growGeo(z,tt){
  var rr=z.grow.r0+(z.grow.r1-z.grow.r0)*sstep((tt-z.t0)/(z.grow.d||6));
  return d3.geoCircle().center(z.grow.c).radius(rr)();
}
function drawZone(z,tt){
  var a=zoneAlpha(z,tt);if(a<0.01)return;
  var col=lc(CO[z.col]||z.col);
  if(z.k==='poly'){
    var pg=z._g||(z._g=polyGeo(z.ring));
    ctx.beginPath();path(pg);ctx.fillStyle=rgba(col,a*0.7);ctx.fill();
    if(!z.nostroke){ctx.setLineDash([8,6]);ctx.strokeStyle=rgba(col,Math.min(1,a*1.6));ctx.lineWidth=2.2;ctx.stroke();ctx.setLineDash([]);}
    return;
  }
  if(z.k==='mer'){
    if(!z._g){var cs=[];for(var la=z.lat0;la<=z.lat1;la+=2)cs.push([z.lon,la]);z._g={type:'LineString',coordinates:cs};}
    ctx.save();ctx.beginPath();path(z._g);ctx.setLineDash([10,7]);ctx.strokeStyle=rgba(col,Math.min(1,a));ctx.lineWidth=2.6;ctx.stroke();ctx.restore();
    return;
  }
  /* dessin direct (découpe + remplissage) : plus de calque intermédiaire à recomposer */
  ctx.save();
  if(z.k==='land'){
    if(!z._geo)z._geo=z.pts?pickPts(z.pts):z.multi?pickMulti(z.multi):pickC(z.cen,z.rad);
    if(z._pk!==CK){z._p2=p2d(idxGeo(z._geo));z._pk=CK;}
    if(z.mask){if(!z._mk)z._mk=polyGeo(z.mask);ctx.beginPath();path(z._mk);ctx.clip();}
  }else if(z.k==='shelf'){
    ctx.beginPath();path(d3.geoCircle().center(z.c).radius(z.r)());ctx.clip();
  }
  if(z.grow){ctx.beginPath();path(growGeo(z,tt));ctx.clip();}
  ctx.globalAlpha=a;ctx.fillStyle=col;
  if(z.k==='land')ctx.fill(z._p2);else if(z.k==='shelf')ctx.fill(deepPath(),'evenodd');
  ctx.restore();
}
/* toutes les zones régionales en une seule passe (un seul tracé des terres) */
function drawRegs(Z,tt){
  var any=false,i;
  for(i=0;i<Z.length;i++){
    var z=Z[i];if(z.k!=='reg')continue;
    var a=zoneAlpha(z,tt);if(a<0.01)continue;
    if(!any){ctx.save();ctx.clip(landPath());any=true;}
    if(!z._mk)z._mk=z.circ?d3.geoCircle().center([z.circ[0],z.circ[1]]).radius(z.circ[2])():polyGeo(z.ring);
    ctx.save();
    if(z.grow){ctx.beginPath();path(growGeo(z,tt));ctx.clip();}
    ctx.globalAlpha=a;ctx.fillStyle=lc(CO[z.col]||z.col);ctx.beginPath();path(z._mk);ctx.fill();
    ctx.restore();
  }
  if(any)ctx.restore();
  return any;
}
function drawZones(Z,tt){
  var any=false;
  for(var i=0;i<Z.length;i++){var z=Z[i];if(z.k==='shelf'||z.k==='reg')continue;if(zoneAlpha(z,tt)>=0.01){drawZone(z,tt);any=true;}}
  return any;
}
/* Fond de carte mis en cache : quand la caméra et les zones ne bougent plus, on recopie l'image
   déjà prête au lieu de tout recalculer. Les terres projetées sont gardées dans un Path2D réutilisé
   (remplissage, côtes, masque des régions) : une seule projection par image au lieu de trois. */
var BASE=(function(){var c=document.createElement('canvas');return {c:c,x:c.getContext('2d'),key:null};})(),prevBK=null;
var LANDP=null,landK=null,DEEPP=null,deepK=null,CK='';
function sizeLayers(){BASE.c.width=canvas.width;BASE.c.height=canvas.height;BASE.key=null;prevBK=null;}
function withCtx(c,fn){var s=ctx,sp=path;ctx=c;path=d3.geoPath(projection,c);try{return fn();}finally{ctx=s;path=sp;}}
function p2d(geo){var p=new Path2D();if(EXPORT)d3.geoPath(projection,pAdapt(p))(geo);else fastPath(geo.coordinates,p);return p;}
/* Projection rapide des polygones : chaque sommet garde ses valeurs pré-calculées (vecteur unitaire,
   termes Equal Earth / Mercator). Par image, il ne reste qu'une rotation et une mise à l'échelle.
   Les polygones coupés par l'horizon (globe) ou par le bord du planisphère passent par d3. */
var EQ1=1.340264,EQ2=-0.081106,EQ3=0.000893,EQ4=0.003796,EQM=Math.sqrt(3)/2,MLIM=1.48442;
function ringPre(rg){
  if(rg._fp)return rg._fp;
  var n=rg.length,L=new Float64Array(n),X=new Float64Array(n*3),EX=new Float64Array(n),EY=new Float64Array(n),MY=new Float64Array(n),i,sx=0,sy=0,sz=0;
  for(i=0;i<n;i++){
    var lam=rg[i][0]*RAD,phi=rg[i][1]*RAD,cp=Math.cos(phi),a=cp*Math.cos(lam),b=cp*Math.sin(lam),c=Math.sin(phi);
    L[i]=lam;X[3*i]=a;X[3*i+1]=b;X[3*i+2]=c;sx+=a;sy+=b;sz+=c;
    var l=Math.asin(EQM*c),l2=l*l,l6=l2*l2*l2;
    EX[i]=Math.cos(l)/(EQM*(EQ1+3*EQ2*l2+l6*(7*EQ3+9*EQ4*l2)));EY[i]=l*(EQ1+EQ2*l2+l6*(EQ3+EQ4*l2));
    MY[i]=Math.log(Math.tan(Math.PI/4+clamp(phi,-MLIM,MLIM)/2));
  }
  var sn=Math.hypot(sx,sy,sz)||1,mn=1;sx/=sn;sy/=sn;sz/=sn;
  for(i=0;i<n;i++){var d=X[3*i]*sx+X[3*i+1]*sy+X[3*i+2]*sz;if(d<mn)mn=d;}
  return rg._fp={n:n,L:L,X:X,EX:EX,EY:EY,MY:MY,big:mn<0.2};
}
function fastPath(polys,p){
  var tr=projection.translate(),k=projection.scale(),tx=tr[0],ty=tr[1],ro=projection.rotate();
  var glob=projKind==='globe',merc=projKind==='merc',dl=ro[0]*RAD,dp=ro[1]*RAD;
  var cl=Math.cos(dl),sl=Math.sin(dl),cp=Math.cos(dp),sp=Math.sin(dp),PI=Math.PI,TAU=2*PI;
  var slow=[],i,j,m;
  for(i=0;i<polys.length;i++){
    var poly=polys[i],st=0,vis=0,hid=0,big=false;
    for(j=0;j<poly.length&&st===0;j++){
      var f=ringPre(poly[j]),n=f.n,X=f.X,L=f.L;
      if(f.big)big=true;
      if(glob){
        for(m=0;m<n;m++){var x1=X[3*m]*cl-X[3*m+1]*sl,xp=x1*cp-X[3*m+2]*sp;if(xp>1e-6)vis++;else hid++;}
      }else{
        var prev=null;
        for(m=0;m<n;m++){var lp=L[m]+dl;if(lp>PI)lp-=TAU;else if(lp<-PI)lp+=TAU;if(prev!==null&&Math.abs(lp-prev)>PI){st=2;break;}prev=lp;}
      }
    }
    if(st===0&&glob){if(vis===0){if(!big)continue;st=2;}else if(hid>0)st=2;}
    if(st===2){slow.push(poly);continue;}
    for(j=0;j<poly.length;j++){
      var g=ringPre(poly[j]),nn=g.n,XX=g.X,LL=g.L,EX=g.EX,YY=merc?g.MY:g.EY;
      for(m=0;m<nn;m++){
        var sxp,syp;
        if(glob){var a=XX[3*m],b=XX[3*m+1],c=XX[3*m+2],xx=a*cl-b*sl,yy=a*sl+b*cl;sxp=tx+k*yy;syp=ty-k*(c*cp+xx*sp);}
        else{var lq=LL[m]+dl;if(lq>PI)lq-=TAU;else if(lq<-PI)lq+=TAU;sxp=tx+k*(merc?lq:lq*EX[m]);syp=ty-k*YY[m];}
        if(m===0)p.moveTo(sxp,syp);else p.lineTo(sxp,syp);
      }
    }
  }
  /* Path2D.closePath est très lent sur un long tracé : on referme les anneaux avec un lineTo */
  if(slow.length)d3.geoPath(projection,pAdapt(p))({type:'MultiPolygon',coordinates:slow});
}
function pAdapt(p){return {x0:0,y0:0,moveTo:function(x,y){this.x0=x;this.y0=y;p.moveTo(x,y);},lineTo:function(x,y){p.lineTo(x,y);},closePath:function(){p.lineTo(this.x0,this.y0);},arc:function(x,y,r,a,b){p.moveTo(x+r,y);p.arc(x,y,r,a,b);}};}
function landPath(){if(landK!==CK){VIS=visibleLand();LANDP=p2d(VIS);landK=CK;}return LANDP;}
/* fonds marins profonds + un grand rectangle : rempli en pair-impair, cela donne « tout sauf les grands fonds » */
function deepPath(){if(deepK!==CK){var p=new Path2D();p.rect(-50,-50,W+100,H+100);if(EXPORT)d3.geoPath(projection,pAdapt(p))(deepT());else fastPath(deepT().coordinates,p);DEEPP=p;deepK=CK;}return DEEPP;}
function zKey(Z,tt){
  var s='',i;
  for(i=0;i<Z.length;i++){var z=Z[i],a=zoneAlpha(z,tt);
    s+=a<0.01?'0,':Math.round(a*60)+(z.grow?'g'+sstep((tt-z.t0)/(z.grow.d||6)).toFixed(3):'')+',';}
  return s;
}
function camKey(){var c=camNow;return projKind+c.lon.toFixed(3)+','+c.lat.toFixed(3)+','+c.z.toFixed(4)+'|'+W+'x'+H+'@'+DPR+(TH.light?'L':'D')+TIER;}
function hidden(p,lim){return projKind==='globe'&&d3.geoDistance(p,center)>lim;}
function drawPulses(P,tt,K){
  P.forEach(function(p){
    var age=tt-p.t;if(age<0)return;
    if(p.loop)age=age%1.8;else if(age>1.6)return;
    if(hidden([p.lon,p.lat],1.45))return;
    var q=projection([p.lon,p.lat]);if(!q)return;
    var life=p.loop?1.8:1.6;
    ctx.globalAlpha=Math.max(0,1-age/life);ctx.strokeStyle=CO[p.col]||p.col;ctx.lineWidth=2.5*K;
    ctx.beginPath();ctx.arc(q[0],q[1],(5+age*20)*K,0,6.2832);ctx.stroke();ctx.globalAlpha=1;
  });
}
function labelVisible(Lb,tt){
  var a=Math.min(1,(tt-Lb.t)/0.6);
  if(Lb.end)a*=clamp((Lb.end+0.8-tt)/0.8,0,1);
  if(a<=0)return 0;
  if(Lb.zmin&&camNow.z<Lb.zmin)return 0;
  if(Lb.zmax&&camNow.z>Lb.zmax)return 0;
  if(hidden([Lb.lon,Lb.lat],1.42))return 0;
  return a;
}
function drawOneLabel(Lb,a,fs,o){
  var P=lpos(Lb,fs,o);if(!P)return;var q=P.q;
  var gold=!!Lb.gold,x=P.x,y=P.y,size=P.size;
  ctx.globalAlpha=a;
  var mk=Lb.mark||(Lb.nomark?'none':'dot');
  ctx.fillStyle=gold?TH.gold:TH.ink;ctx.strokeStyle=TH.mk;ctx.lineWidth=1.5;
  if(P.ic){drawIcon(P.ic,q,Lb);mk='none';}
  if(mk==='dot'){ctx.beginPath();ctx.arc(q[0],q[1],gold?5:3.2,0,6.2832);ctx.fill();ctx.stroke();}
  else if(mk==='site'){ctx.save();ctx.translate(q[0],q[1]);ctx.rotate(Math.PI/4);ctx.fillStyle=GOLD;ctx.fillRect(-4.5,-4.5,9,9);ctx.strokeRect(-4.5,-4.5,9,9);ctx.restore();}
  else if(mk==='star'){ctx.save();ctx.translate(q[0],q[1]);ctx.fillStyle='#ff9ecb';ctx.beginPath();for(var k=0;k<10;k++){var rr=k%2?3:7,an=-Math.PI/2+k*Math.PI/5;ctx.lineTo(rr*Math.cos(an),rr*Math.sin(an));}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
  else if(SYMS[mk]){drawSym(ctx,mk,q[0],q[1],1,TH.mk);ctx.fillStyle=gold?TH.gold:TH.ink;}
  ctx.textAlign=P.al;ctx.strokeStyle=TH.halo;ctx.lineWidth=4;
  ctx.font='600 '+size+'px '+FONT;ctx.fillStyle=gold?TH.gold:TH.ink;
  ctx.strokeText(Lb.text,x,y);ctx.fillText(Lb.text,x,y);
  if(Lb.sub){var y2=y+fs*1.1;ctx.font='400 '+(fs*0.84)+'px '+FONT;ctx.fillStyle=gold?TH.gold:TH.sub;ctx.strokeText(Lb.sub,x,y2);ctx.fillText(Lb.sub,x,y2);}
  ctx.globalAlpha=1;
}
/* symboles de carte (géographie) : mine, usine, port, barrage, ville ; s = échelle (1 sur la carte) */
var SYMS={mine:'#e8590c',usine:'#7048e8',port:'#1c7ed6',barrage:'#0b7285',ville:'#f4f0e6',projet:'#868e96',aero:'#0ca678'};
function drawSym(c,k,x,y,s,stroke){
  c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=1.5;c.strokeStyle=stroke||'#12202e';c.fillStyle=SYMS[k];c.lineJoin='round';
  if(k==='mine'){c.beginPath();c.moveTo(0,-7);c.lineTo(6.5,5);c.lineTo(-6.5,5);c.closePath();c.fill();c.stroke();}
  else if(k==='usine'||k==='projet'){c.beginPath();c.rect(-6,-2,12,8);c.rect(2,-8,3,6);c.fill();c.stroke();}
  else if(k==='port'){c.beginPath();c.arc(0,0,6,0,6.2832);c.fill();c.stroke();c.strokeStyle='#fff';c.lineWidth=1.6;c.beginPath();c.moveTo(0,-3.5);c.lineTo(0,3.5);c.moveTo(-2.5,-1.5);c.lineTo(2.5,-1.5);c.moveTo(-3,1.5);c.quadraticCurveTo(0,5,3,1.5);c.stroke();}
  else if(k==='barrage'){c.beginPath();c.rect(-7,-3,14,6);c.fill();c.stroke();}
  else if(k==='ville'){c.beginPath();c.rect(-4,-4,8,8);c.fill();c.stroke();}
  else if(k==='aero'){c.beginPath();c.moveTo(0,-8);c.lineTo(1.6,-2);c.lineTo(7,1.5);c.lineTo(7,3.2);c.lineTo(1.6,1.4);c.lineTo(1.2,5.5);c.lineTo(3,7);c.lineTo(-3,7);c.lineTo(-1.2,5.5);c.lineTo(-1.6,1.4);c.lineTo(-7,3.2);c.lineTo(-7,1.5);c.lineTo(-1.6,-2);c.closePath();c.fill();c.stroke();}
  c.restore();
}
function symSVG(k){
  var f=SYMS[k],s='<svg viewBox="-9 -9 18 18" width="18" height="18" aria-hidden="true"><g stroke="#12202e" stroke-width="1.5" stroke-linejoin="round" fill="'+f+'">';
  if(k==='mine')s+='<path d="M0-7L6.5 5H-6.5Z"/>';
  else if(k==='usine'||k==='projet')s+='<path d="M-6-2h12v8h-12zM2-8h3v6h-3z"/>';
  else if(k==='port')s+='<circle r="6"/><path d="M0-3.5V3.5M-2.5-1.5H2.5M-3 1.5Q0 5 3 1.5" stroke="#fff" fill="none" stroke-width="1.6"/>';
  else if(k==='barrage')s+='<rect x="-7" y="-3" width="14" height="6"/>';
  else if(k==='aero')s+='<path d="M0-8L1.6-2L7 1.5V3.2L1.6 1.4L1.2 5.5L3 7H-3L-1.2 5.5L-1.6 1.4L-7 3.2V1.5L-1.6-2Z"/>';
  else s+='<rect x="-4" y="-4" width="8" height="8"/>';
  return s+'</g></svg>';
}
/* position d'une étiquette : décalage propre (ou o = {dx,dy,al} proposé par le placement automatique), gardée dans le cadre */
function lpos(Lb,fs,o){
  var q=projection([Lb.lon,Lb.lat]);if(!q||q[0]<16||q[0]>W-16||q[1]<12||q[1]>H-12)return null;
  var size=Lb.big?fs*1.3:fs,key=fs+'|'+size;
  if(Lb._wk!==key){ctx.font='600 '+size+'px '+FONT;var w0=ctx.measureText(Lb.text).width;if(Lb.sub){ctx.font='400 '+(fs*0.84)+'px '+FONT;w0=Math.max(w0,ctx.measureText(Lb.sub).width);}Lb._w=w0;Lb._wk=key;}
  var dx=o?o.dx:(Lb.dx||0),dy=o?o.dy:(Lb.dy||0),al=o?o.al:(Lb.al||'center');
  var I=icDim(Lb,fs);   /* petite image sur le lieu : le texte s'écarte pour la laisser voir */
  if(I){if(al==='left')dx=Math.max(dx,I.w*0.5+4);else if(al==='right')dx=Math.min(dx,-(I.w*0.5+4));else if(dy<0)dy=Math.min(dy,-(I.h*0.8+size*0.6+(Lb.sub?fs*1.15:0)));else dy=Math.max(dy,I.h*0.2+size*0.6+2);}
  var w=Lb._w,x2=q[0]+dx,y2=q[1]+dy,bx0=al==='left'?x2:al==='right'?x2-w:x2-w/2,sh=0;
  if(bx0<4)sh=4-bx0;else if(bx0+w>W-4)sh=W-4-bx0-w;
  var b=[bx0+sh,y2-size*0.6,bx0+sh+w,y2+size*0.6+(Lb.sub?fs*1.05:0)];
  if(I)b=[Math.min(b[0],q[0]-I.w/2),Math.min(b[1],q[1]-I.h*0.8),Math.max(b[2],q[0]+I.w/2),Math.max(b[3],q[1]+I.h*0.2)];
  return {q:q,x:x2+sh,y:y2,al:al,size:size,b:b,ic:I};
}
function labelBox(Lb,fs,o){var P=lpos(Lb,fs,o);return P?P.b:null;}
/* écran : quand deux noms se chevauchent, le plus important (or, gros) puis le plus récent reste net, l'autre s'estompe en douceur */
function drawLabels(LB,tt){
  var fs=clamp(Math.min(W,H*1.3)/40,10.5,15),vis=[],placed=[];
  ctx.lineJoin='round';ctx.textBaseline='middle';
  LB.forEach(function(Lb){var a=labelVisible(Lb,tt);if(a>0)vis.push({L:Lb,a:a,f:1,b:Lb.text?labelBox(Lb,fs):null});});
  vis.slice().sort(function(x,y){return ((y.L.gold?2:0)+(y.L.big?1:0))-((x.L.gold?2:0)+(x.L.big?1:0))||y.L.t-x.L.t;}).forEach(function(v){
    if(!v.b)return;
    function hit(b){for(var i=0;i<placed.length;i++){var o=placed[i];if(b[0]<o.b[2]+2&&b[2]>o.b[0]-2&&b[1]<o.b[3]+2&&b[3]>o.b[1]-2)return o;}return null;}
    if(v.L._o&&!v.L.nomark){var ob=labelBox(v.L,fs,v.L._o);if(ob){v.b=ob;v.o=v.L._o;}}
    var h=hit(v.b);
    if(h&&!v.L.nomark&&!v.L.fixed){
      var sz=v.L.big?fs*1.3:fs,C=[{dx:10,dy:4,al:'left'},{dx:-10,dy:4,al:'right'},{dx:0,dy:-sz*1.1,al:'center'},{dx:0,dy:sz*1.5,al:'center'}];
      for(var k=0;k<C.length;k++){var nb=labelBox(v.L,fs,C[k]);if(nb&&!hit(nb)){v.o=v.L._o=C[k];v.b=nb;h=null;break;}}
    }
    for(var i=0;i<placed.length&&h;i++){var o=placed[i];if(v.b[0]<o.b[2]+2&&v.b[2]>o.b[0]-2&&v.b[1]<o.b[3]+2&&v.b[3]>o.b[1]-2)v.f=Math.min(v.f,1-0.62*o.a);}
    if(v.f>0.6)placed.push(v);
  });
  vis.sort(function(x,y){return x.f-y.f;}).forEach(function(v){drawOneLabel(v.L,v.a*v.f,fs,v.o);});
  LBOX=placed.map(function(v){return v.b;});LTXT=placed.map(function(v){return v.L.text;});
}
/* export imprimé : tous les lieux encore valables à la fin du chapitre (zoom ignoré), sans chevauchement ;
   carte muette : pastilles numérotées, noms rangés dans NUMS */
function drawLabelsX(LB,tt){
  var fs=clamp(Math.min(W,H*1.3)/40,10.5,15),boxes=[],seen={};LBOX=boxes;LTXT=[];
  ctx.lineJoin='round';ctx.textBaseline='middle';
  function free(b){if(b[0]<2||b[1]<2||b[2]>W-2||b[3]>H-2)return false;for(var i=0;i<boxes.length;i++){var o=boxes[i];if(b[0]<o[2]+3&&b[2]>o[0]-3&&b[1]<o[3]+3&&b[3]>o[1]-3)return false;}return true;}
  function gone(Lb){return !!(Lb.end&&Lb.end+0.8<tt);}
  var anch=[];
  var L2=LB.filter(function(Lb){if(tt<Lb.t||!Lb.text)return false;if(gone(Lb)&&!DOCL)return false;if(hidden([Lb.lon,Lb.lat],1.42))return false;var q=projection([Lb.lon,Lb.lat]);return q&&q[0]>=10&&q[0]<=W-10&&q[1]>=10&&q[1]<=H-10;});
  L2.sort(function(a,b){return (gone(a)?1:0)-(gone(b)?1:0)||((b.gold?2:0)+(b.big?1:0))-((a.gold?2:0)+(a.big?1:0))||(a.nomark?1:0)-(b.nomark?1:0)||b.t-a.t;});
  L2.forEach(function(Lb){
    if(seen[Lb.text])return;
    var q=projection([Lb.lon,Lb.lat]),x=q[0]+(Lb.nomark?(Lb.dx||0):0),y=q[1]+(Lb.nomark?(Lb.dy||0):0);
    if(NUMS){
      var r=fs*0.85,bb=[x-r,y-r,x+r,y+r];if(!free(bb))return;
      seen[Lb.text]=1;boxes.push(bb);NUMS.push(Lb.text);
      ctx.fillStyle='#fff';ctx.strokeStyle='#12202e';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fill();ctx.stroke();
      ctx.fillStyle='#12202e';ctx.font='700 '+(fs*0.95)+'px '+FONT;ctx.textAlign='center';ctx.fillText(String(NUMS.length),x,y+0.5);
      return;
    }
    var size=Lb.big?fs*1.3:fs;ctx.font='600 '+size+'px '+FONT;var w=ctx.measureText(Lb.text).width;
    if(Lb.sub){ctx.font='400 '+(fs*0.84)+'px '+FONT;w=Math.max(w,ctx.measureText(Lb.sub).width);}
    function boxOf(o){var x2=q[0]+(o.dx||0),y2=q[1]+(o.dy||0),al=o.al||'center',bx0=al==='left'?x2:al==='right'?x2-w:x2-w/2;return [bx0,y2-size*0.6,bx0+w,y2+size*0.6+(Lb.sub?fs*1.05:0)];}
    var b=boxOf(Lb);
    if(!free(b)&&DOCL){
      /* carte-document : avant de renoncer à un nom, on essaie les autres côtés du point */
      var sh=Lb.sub?fs*1.05:0,alt=Lb.nomark?[{dx:Lb.dx||0,dy:(Lb.dy||0)-size*1.5-sh,al:Lb.al},{dx:Lb.dx||0,dy:(Lb.dy||0)+size*1.5+sh,al:Lb.al}]
        :[{dx:10,dy:0,al:'left'},{dx:-10,dy:0,al:'right'},{dx:0,dy:-(size*0.6+sh+10),al:'center'},{dx:0,dy:size*0.6+10,al:'center'},{dx:10,dy:-(size*0.6+sh+4),al:'left'},{dx:-10,dy:size*0.6+8,al:'right'}];
      for(var ai=0;ai<alt.length;ai++){var b2=boxOf(alt[ai]);if(free(b2)){var c={},kk;for(kk in Lb)c[kk]=Lb[kk];c.dx=alt[ai].dx;c.dy=alt[ai].dy;c.al=alt[ai].al;Lb=c;b=b2;break;}}
    }
    if(!free(b))return;
    if(gone(Lb)&&anch.some(function(a){return Math.hypot(a[0]-q[0],a[1]-q[1])<16;}))return;   /* remplacé depuis par un autre nom au même endroit */
    anch.push(q);
    seen[Lb.text]=1;LTXT.push(Lb.text);boxes.push(b);if(!Lb.nomark)boxes.push([q[0]-5,q[1]-5,q[0]+5,q[1]+5]);
    drawOneLabel(Lb,1,fs);
  });
}
/* repères géographiques */
var NAMES=[['OCÉAN PACIFIQUE',-150,3,1],['OCÉAN PACIFIQUE',160,22,1],['OCÉAN ATLANTIQUE',-38,26,1],['OCÉAN ATLANTIQUE',-16,-22,1],['OCÉAN INDIEN',78,-24,1],['OCÉAN ARCTIQUE',-150,80,1],['OCÉAN AUSTRAL',95,-58,1],['OCÉAN AUSTRAL',-120,-60,1],
  ['AFRIQUE',19,9,0],['EUROPE',18,51,0],['ASIE',92,46,0],['AMÉRIQUE DU NORD',-102,45,0],['AMÉRIQUE DU SUD',-58,-14,0],['OCÉANIE',134,-25,0],['ANTARCTIQUE',60,-78,0]];
var GLINES=[[0,'Équateur'],[23.44,'Tropique du Cancer'],[-23.44,'Tropique du Capricorne'],[66.56,'Cercle polaire arctique'],[-66.56,'Cercle polaire antarctique']].map(function(d){
  var cs=[];for(var lo=-180;lo<=180;lo+=3)cs.push([lo,d[0]]);return {lat:d[0],name:d[1],g:{type:'LineString',coordinates:cs}};
});
var GREEN=(function(){var cs=[];for(var la=-88;la<=88;la+=2)cs.push([0,la]);return {type:'LineString',coordinates:cs};})();
function drawGeoLines(){
  var fs=clamp(W/52,10,13);
  ctx.save();ctx.lineWidth=1.3;ctx.textBaseline='middle';ctx.textAlign='left';ctx.font='600 '+fs+'px '+FONT;
  GLINES.forEach(function(g){
    ctx.beginPath();path(g.g);ctx.setLineDash(g.lat===0?[]:[6,5]);ctx.strokeStyle=TH.line;ctx.stroke();
    for(var d=-170;d<=170;d+=5){
      var p=[center[0]+d,g.lat];if(hidden(p,1.3))continue;
      var q=projection(p);if(!q||q[0]<10||q[0]>W-150||q[1]<12||q[1]>H-12)continue;
      ctx.setLineDash([]);ctx.strokeStyle=TH.halo;ctx.lineWidth=3.5;ctx.strokeText(g.name,q[0]+4,q[1]-fs*0.75);
      ctx.fillStyle=TH.linet;ctx.fillText(g.name,q[0]+4,q[1]-fs*0.75);ctx.lineWidth=1.3;break;
    }
  });
  ctx.beginPath();path(GREEN);ctx.setLineDash([2,5]);ctx.strokeStyle=TH.line;ctx.stroke();
  ctx.restore();
}
function drawNames(avoid,txt){
  if(camNow.z>5)return;
  var low=(txt||[]).map(function(t){return String(t).toLowerCase();});
  var fs=clamp(W/46,10.5,15);
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
  NAMES.forEach(function(n){
    var p=[n[1],n[2]];if(hidden(p,1.25))return;
    var q=projection(p);if(!q||q[0]<40||q[0]>W-40||q[1]<14||q[1]>H-14)return;
    ctx.font=(n[3]?'italic 400 ':'700 ')+fs+'px '+FONT;
    if(avoid){   /* carte-document : pas de repère par-dessus un nom du chapitre, ni en double */
      if(low.indexOf(n[0].toLowerCase())>=0)return;
      var hw=ctx.measureText(n[0]).width/2+4,bb=[q[0]-hw,q[1]-fs*0.7,q[0]+hw,q[1]+fs*0.7];
      if(avoid.some(function(o){return bb[0]<o[2]&&bb[2]>o[0]&&bb[1]<o[3]&&bb[3]>o[1];}))return;
    }
    ctx.strokeStyle=TH.halo;ctx.lineWidth=3;ctx.strokeText(n[0],q[0],q[1]);
    ctx.fillStyle=n[3]?TH.ocean:TH.cont;ctx.fillText(n[0],q[0],q[1]);
  });
  ctx.restore();
}
/* repères au zoom : communes de Nouvelle-Calédonie (limites entre communes + noms), dès que la Grande Terre est assez grande à l'écran.
   Communes ACTUELLES (Géorep, BDADMIN-NC) : sur une carte du passé, ce sont des repères pour se situer. */
var COMG=null,COMSEEN=false,FULLR=false;
/* DOCL : carte-document (enquête, PDF, Word). C'est une carte de bilan : les noms qui ont disparu en cours d'animation y reviennent
   (s'il reste de la place, et jamais par-dessus le nom qui les a remplacés), avec les continents et les océans. */
var DOCL=false,SNAPN=[];   /* SNAPN : noms réellement écrits sur la dernière carte exportée (api.snapNames) */
function comOn(){
  var C=window.NCG&&NCG.communes;if(!C||!opt.communes||BARE||KPX<9500)return null;
  if(d3.geoDistance(center,[165.9,-21.3])>0.07+0.75*Math.max(W,H)/KPX)return null;
  return C;
}
function drawComLines(){
  var C=comOn();if(!C)return;
  if(!COMG)COMG={type:'MultiLineString',coordinates:C.b};COMSEEN=true;
  ctx.save();ctx.beginPath();path(COMG);ctx.setLineDash([5,4]);ctx.lineWidth=KPX>20000?1.4:1;
  ctx.strokeStyle=TH.light?'rgba(70,60,45,.5)':'rgba(255,255,255,.4)';ctx.stroke();ctx.restore();
}
function drawComNames(){
  var C=comOn();if(!C||KPX<12000)return;
  var fs=clamp(KPX/1700,9.5,14),boxes=LBOX.slice(),i;
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';ctx.font='italic 600 '+fs+'px '+FONT;
  C.n.forEach(function(c){
    for(i=0;i<LTXT.length;i++){var t=LTXT[i]||'';if(t===c[0]||t.indexOf(c[0]+' ')===0||t.indexOf(c[0]+',')===0)return;}
    var q=projection([c[1],c[2]]);if(!q||q[0]<24||q[0]>W-24||q[1]<12||q[1]>H-12)return;
    var w=ctx.measureText(c[0]).width,b=[q[0]-w/2-4,q[1]-fs*0.72,q[0]+w/2+4,q[1]+fs*0.72];
    for(i=0;i<boxes.length;i++){var o=boxes[i];if(o&&b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1])return;}
    boxes.push(b);
    ctx.globalAlpha=0.92;ctx.strokeStyle=TH.halo;ctx.lineWidth=3;ctx.strokeText(c[0],q[0],q[1]);
    ctx.fillStyle=TH.light?'#5a4f3c':'#d2dbe6';ctx.fillText(c[0],q[0],q[1]);
  });
  ctx.restore();
}
/* repères du monde au zoom : noms des pays ACTUELS et grandes villes, dès que la carte est assez grande (hors zone des communes de NC).
   Données : js/reperes-monde.js (outils/geo/reperes_monde.js). Sur une carte du passé, ce sont des repères pour se situer. */
var WORLDSEEN=false;
function drawWorldRef(){
  var D=window.REPM;if(!D||!opt.reperes||BARE||EXPORT||KPX<330||comOn())return;
  var fs=clamp(KPX/900,10,14.5),boxes=LBOX.slice(),i,k=KPX/57.2958;
  function free(b){for(i=0;i<boxes.length;i++){var o=boxes[i];if(o&&b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1])return false;}return true;}
  ctx.save();ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineJoin='round';
  D.p.slice().sort(function(a,b){return b[3]-a[3];}).forEach(function(c){
    if(hidden([c[1],c[2]],1.3))return;
    ctx.font='italic 600 '+fs+'px '+FONT;var w=ctx.measureText(c[0]).width;
    if(c[3]*k<w*0.85&&KPX<4500)return;
    var q=projection([c[1],c[2]]);if(!q||q[0]<30||q[0]>W-30||q[1]<14||q[1]>H-14)return;
    var b=[q[0]-w/2-4,q[1]-fs*0.72,q[0]+w/2+4,q[1]+fs*0.72];if(!free(b))return;
    boxes.push(b);WORLDSEEN=true;
    ctx.globalAlpha=0.9;ctx.strokeStyle=TH.halo;ctx.lineWidth=3;ctx.strokeText(c[0],q[0],q[1]);
    ctx.fillStyle=TH.light?'#5a4f3c':'#d2dbe6';ctx.fillText(c[0],q[0],q[1]);
  });
  if(KPX>=900){
    var fv=Math.max(9.5,fs-2);ctx.font='600 '+fv+'px '+FONT;ctx.textAlign='left';
    D.v.forEach(function(c){
      if(hidden([c[1],c[2]],1.3))return;
      var q=projection([c[1],c[2]]);if(!q||q[0]<30||q[0]>W-60||q[1]<14||q[1]>H-14)return;
      var w=ctx.measureText(c[0]).width,b=[q[0]-4,q[1]-fv*0.7,q[0]+w+12,q[1]+fv*0.7];if(!free(b))return;
      boxes.push(b);WORLDSEEN=true;
      ctx.globalAlpha=0.95;ctx.fillStyle=TH.light?'#3d3426':'#f4f0e6';ctx.strokeStyle=TH.halo;ctx.lineWidth=2.5;
      ctx.beginPath();ctx.arc(q[0],q[1],2.6,0,6.2832);ctx.fill();
      ctx.strokeText(c[0],q[0]+6,q[1]);ctx.fillText(c[0],q[0]+6,q[1]);
    });
  }
  ctx.restore();
}
function drawScale(){
  var c2=[center[0]+0.4/Math.max(0.2,Math.cos(center[1]*RAD)),clamp(center[1],-82,82)],c1=[center[0],clamp(center[1],-82,82)];
  var p0=projection(c1),p1=projection(c2);if(!p0||!p1)return;
  var km=d3.geoDistance(c1,c2)*6371,ppk=Math.hypot(p1[0]-p0[0],p1[1]-p0[1])/km;if(!(ppk>0))return;
  var target=Math.min(110,W*0.22)/ppk,pow=Math.pow(10,Math.floor(Math.log(target)/Math.LN10)),m=target/pow,nice=(m>=5?5:m>=2?2:1)*pow,len=nice*ppk;
  var x0=W/2-len/2,y=H-13;
  if(AVOID&&AVOID.isConnected&&AVOID.offsetHeight&&!EXPORT){var ra=AVOID.getBoundingClientRect(),rk=canvas.getBoundingClientRect();if(ra.top<rk.bottom)y=Math.max(30,Math.min(y,ra.top-rk.top-10));}
  /* l'échelle ne cache pas un nom : autre position en bas, sinon un peu plus haut */
  var cx=W/2;(function(){
    function hit(xc,yy){var b=[xc-len/2-6,yy-24,xc+len/2+6,yy+4];for(var i=0;i<LBOX.length;i++){var o=LBOX[i];if(o&&b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1])return true;}return false;}
    if(!LBOX.length||!hit(cx,y))return;
    var c=[W/2-len-60,W/2+len+60,W*0.18,W*0.62],k,d;
    for(k=0;k<c.length;k++)if(c[k]-len/2>8&&c[k]+len/2<W-70&&!hit(c[k],y)){cx=c[k];return;}
    for(d=8;d<=64;d+=8)if(!hit(cx,y-d)){y-=d;return;}
  })();
  x0=cx-len/2;
  ctx.save();ctx.lineCap='butt';
  ctx.strokeStyle=TH.halo;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x0,y);ctx.lineTo(x0+len,y);ctx.stroke();
  ctx.strokeStyle=TH.ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x0,y-5);ctx.lineTo(x0,y);ctx.lineTo(x0+len,y);ctx.lineTo(x0+len,y-5);ctx.stroke();
  ctx.font='600 11.5px '+FONT;ctx.textAlign='center';ctx.textBaseline='alphabetic';
  var tx=fr(nice)+' km'+(projKind==='globe'?'':' (au centre)');
  ctx.strokeStyle=TH.halo;ctx.lineWidth=3.5;ctx.strokeText(tx,cx,y-8);ctx.fillStyle=TH.ink;ctx.fillText(tx,cx,y-8);
  ctx.restore();
}
function fmtCoord(p){
  function f(v,a,b){return Math.abs(v).toFixed(1).replace('.',',')+'° '+(v>=0?a:b);}
  return f(p[1],'N','S')+' · '+f(p[0],'E','O');
}
function drawCoord(){
  if(!hover)return;
  var q=projection(hover);if(!q||hidden(hover,1.55))return;
  ctx.save();ctx.strokeStyle=GOLD;ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(q[0]-9,q[1]);ctx.lineTo(q[0]+9,q[1]);ctx.moveTo(q[0],q[1]-9);ctx.lineTo(q[0],q[1]+9);ctx.stroke();
  var tx=fmtCoord(hover);ctx.font='600 13px '+FONT;var tw=ctx.measureText(tx).width+16;
  var bx=clamp(q[0]+12,4,W-tw-4),by=clamp(q[1]-30,4,H-28);
  ctx.fillStyle='rgba(6,20,36,.92)';ctx.fillRect(bx,by,tw,24);ctx.strokeStyle=GOLD;ctx.lineWidth=1;ctx.strokeRect(bx+0.5,by+0.5,tw-1,23);
  ctx.fillStyle='#f4f0e6';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(tx,bx+8,by+12.5);
  ctx.restore();
}
/* outils : mesure et jeu */
var meas={a:null,b:null},quiz=null;
function drawMarker(p,col){
  if(hidden(p,1.55))return null;var q=projection(p);if(!q)return null;
  ctx.save();ctx.fillStyle=col;ctx.strokeStyle='#061424';ctx.lineWidth=2;ctx.beginPath();ctx.arc(q[0],q[1],6.5,0,6.2832);ctx.fill();ctx.stroke();ctx.restore();return q;
}
function drawGeodesic(a,b,col){
  var pts=densify([a,b],1.5),sp=projPts(pts,pts.length-1,0),pen=false,j;
  ctx.save();ctx.lineCap='round';ctx.setLineDash([2,7]);ctx.lineWidth=3.2;ctx.strokeStyle=col;ctx.beginPath();
  for(j=0;j<sp.length;j++){var q=sp[j];if(!q){pen=false;continue;}if(!pen){ctx.moveTo(q[0],q[1]);pen=true;}else ctx.lineTo(q[0],q[1]);}
  ctx.stroke();ctx.restore();
}
function drawTools(){
  if(tool==='measure'){
    if(meas.a&&meas.b)drawGeodesic(meas.a,meas.b,'#ffffff');
    if(meas.a)drawMarker(meas.a,GOLD);if(meas.b)drawMarker(meas.b,GOLD);
  }else if(tool==='quiz'&&quiz&&quiz.answered){
    var t=quiz.target,tp=[t.lon,t.lat];
    if(quiz.click){drawGeodesic(quiz.click,tp,quiz.good?'#86efac':'#ff8a8a');drawMarker(quiz.click,quiz.good?'#86efac':'#ff8a8a');}
    drawMarker(tp,GOLD);
    var fs=clamp(Math.min(W,H*1.3)/38,11,16);ctx.textBaseline='middle';ctx.lineJoin='round';
    drawOneLabel({lon:t.lon,lat:t.lat,text:t.text,gold:true,nomark:true,dy:-16,big:true},1,fs);
  }
}

function render(){
  if(!W||!VOL)return;
  var ch=CH[cur.ci],tt=cur.t;
  var want=opt.proj==='auto'?(ch.proj||VOL.proj||'globe'):opt.proj;
  if(want!==projKind)setProj(want);
  applyCam(free||camAt(cur.ci,tt));
  var K=clamp(Math.min(W,H*1.25)/420,0.8,1.6),flat=projKind!=='globe';
  TIER=EXPORT?-1:tierFor();
  var Z=BARE?[]:(ch.zones||[]);
  CK=camKey();
  var under=function(){drawBase(ch,Z,tt,flat);drawLand();drawRegs(Z,tt);drawZones(Z,tt);drawComLines();
    if(TH.light&&Z.length){ctx.strokeStyle=TH.coast;ctx.lineWidth=TH.cw;ctx.stroke(landPath());}};
  if(EXPORT)under();
  else{
    var bk=CK+'|'+(opt.communes?'c':'')+'|'+zKey(Z,tt)+'|'+((ch.lagoon!=null&&tt>=ch.lagoon)?Math.round(sstep((tt-ch.lagoon)/1.5)*60):'-');
    if(bk===BASE.key)ctx.drawImage(BASE.c,0,0,W,H);
    else if(bk===prevBK){BASE.key=bk;BASE.x.setTransform(DPR,0,0,DPR,0,0);withCtx(BASE.x,under);ctx.drawImage(BASE.c,0,0,W,H);}
    else under();
    prevBK=bk;
  }
  if(opt.lines)drawGeoLines();
  if(!BARE)drawChLines(ch,tt);
  if(!BARE){(ch.routes||[]).forEach(function(rt){drawRoute(rt,tt,K);});if(!EXPORT)drawPulses(ch.pulses||[],tt,K);}
  if(opt.names&&!DOCL)drawNames();
  if(!BARE&&opt.labels&&tool!=='quiz'&&!HIDELAB)(EXPORT?drawLabelsX:drawLabels)(ch.labels||[],tt);else{LBOX=[];LTXT=[];}
  if(DOCL&&!BARE)drawNames(LBOX,LTXT);
  if(tool!=='quiz'&&!HIDELAB){drawComNames();drawWorldRef();}
  if(!EXPORT)drawTools();
  if(opt.scale)drawScale();
  if(opt.coord&&!EXPORT)drawCoord();
}
/* lignes fixes d'un chapitre (frontières…) : {ml:[[[lon,lat],…],…], col, t0, t1, w, dash} */
function drawChLines(ch,tt){(ch.lines||[]).forEach(function(l){var a=sstep((tt-l.t0)/1.5)*(l.t1?1-sstep((tt-l.t1)/1.5):1);if(EXPORT&&l.t1)a=1;if(a<=0.01)return;
  ctx.save();ctx.globalAlpha=a;ctx.beginPath();path({type:'MultiLineString',coordinates:l.ml});ctx.strokeStyle=lc(CO[l.col]||l.col);ctx.lineWidth=l.w||1.4;if(l.dash)ctx.setLineDash(l.dash);ctx.stroke();ctx.restore();});}
function drawLand(){
  var p=landPath();
  ctx.fillStyle=TH.land;ctx.fill(p);
  ctx.strokeStyle=TH.coast;ctx.lineWidth=TH.cw;ctx.stroke(p);
  /* récifs (Natural Earth 10 m) : visibles seulement quand on zoome sur une région du Pacifique */
  if(GEO.reef&&camNow.z>=6&&!BARE){ctx.save();ctx.beginPath();path(GEO.reef);ctx.strokeStyle=TH.light?'rgba(13,120,110,.8)':'rgba(150,240,230,.6)';ctx.lineWidth=camNow.z>=30?1.6:1.1;ctx.stroke();ctx.restore();}
}
function drawBase(ch,Z,tt,flat){
  var c=camNow,cx=W/2,cy=H/2,i;
  ctx.clearRect(0,0,W,H);ctx.fillStyle=TH.bg;ctx.fillRect(0,0,W,H);
  var og;
  if(!flat){
    if(!TH.light){
      ctx.fillStyle='rgba(255,255,255,.55)';STARS.forEach(function(s){ctx.fillRect(s[0]*W,s[1]*H,s[2],s[2]);});
      if(R<Math.max(W,H)*0.75){
        var g=ctx.createRadialGradient(cx,cy,R*0.97,cx,cy,R*1.12);
        g.addColorStop(0,'rgba(90,180,255,.35)');g.addColorStop(1,'rgba(90,180,255,0)');
        ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R*1.12,0,6.2832);ctx.fill();
      }
    }
    og=ctx.createRadialGradient(cx-R*0.35,cy-R*0.4,R*0.05,cx,cy,R*1.05);
    og.addColorStop(0,TH.sea0);og.addColorStop(1,TH.sea1);
  }else{
    og=ctx.createLinearGradient(0,0,0,H);og.addColorStop(0,TH.flat[0]);og.addColorStop(0.5,TH.flat[1]);og.addColorStop(1,TH.flat[2]);
  }
  ctx.beginPath();path({type:'Sphere'});ctx.fillStyle=og;ctx.fill();
  if(TH.light){ctx.strokeStyle='rgba(60,55,45,.6)';ctx.lineWidth=1;ctx.stroke();}
  if(c.z<6){ctx.beginPath();path(c.z<0.9?GRAT30:c.z<2.2?GRAT15:GRAT5);ctx.strokeStyle=TH.grat;ctx.lineWidth=0.7;ctx.stroke();}
  for(i=0;i<Z.length;i++)if(Z[i].k==='shelf')drawZone(Z[i],tt);
  if(!BARE&&ch.lagoon!=null&&tt>=ch.lagoon){
    var la=sstep((tt-ch.lagoon)/1.5),kmpx=R/6371;
    ctx.save();ctx.lineJoin='round';
    ctx.beginPath();path(LAGOON);ctx.strokeStyle='rgba(94,234,212,'+(0.2*la)+')';ctx.lineWidth=Math.max(5,26*kmpx);ctx.stroke();
    ctx.strokeStyle='rgba(150,245,230,'+(0.26*la)+')';ctx.lineWidth=Math.max(2.5,10*kmpx);ctx.stroke();
    ctx.restore();
  }
}
var pending=false;
function schedule(){if(playing||pending)return;pending=true;requestAnimationFrame(function(){pending=false;render();});}

/* ---------- Interface ---------- */
function $(id){return document.getElementById(id);}
var elEra=$('era'),elTxt=$('txt'),elCap=$('cap'),elUnc=$('unc'),elPlay=$('play'),elSeek=$('seek'),elTime=$('time'),
    elChips=$('chips'),elLegend=$('legend'),elPhotos=$('photos'),elTabs=$('tabs'),elFrise=$('frise'),elFiche=$('fiche'),elTb=$('tb'),elFit=$('zfit'),
    phIdx=-1,lastSec=-1,chipEls=[],polEls=[],segEls=[],tabEls=[];
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}

function voletThumb(v){
  var k,j,ph,im;
  for(k=0;k<v.chapters.length;k++){ph=v.chapters[k].photos||[];for(j=0;j<ph.length;j++){im=IMG[ph[j].id];if(im&&(im.u||im.f))return im.u||im.f;}}
  return null;
}
function buildTabs(){
  elTabs.innerHTML='';tabEls=[];
  VOLS.forEach(function(v,i){
    var b=el('button','tab');b.type='button';b.style.setProperty('--c',CO[v.col]||v.col);
    var th=voletThumb(v);if(th){var ig=document.createElement('img');ig.alt='';ig.loading='lazy';ig.decoding='async';ig.src=th;b.appendChild(ig);}
    var tx=el('span','tab-tx');tx.appendChild(el('span','tab-t',v.title));tx.appendChild(el('small','',v.tag));if(v.sub)tx.appendChild(el('span','tab-s',v.sub));b.appendChild(tx);
    b.addEventListener('click',function(){var same=i===VI;closeHome(true);if(same&&started){if(!playing&&!REDUCE)play();return;}started=true;setVolet(i,0,!REDUCE);if(REDUCE)showStill();});
    elTabs.appendChild(b);tabEls.push(b);
  });
}
/* menu d'entrée : choix du volet (au premier chargement sans #volet, et via le bouton du titre) */
var started=false,homeWas=false;
function openHome(){var h=$('home');if(!h)return;if(started)document.body.classList.add('started');homeWas=playing;pause();hush();h.hidden=false;document.body.classList.add('home-on');var b=tabEls[VI]||tabEls[0];if(b)try{b.focus({preventScroll:true});}catch(e){}}
function closeHome(pick){var h=$('home');if(!h||h.hidden)return;h.hidden=true;document.body.classList.remove('home-on');document.body.classList.add('started');if(pick)return;if(!started){started=true;if(REDUCE)showStill();else play();}else if(homeWas)play();}
/* mouvement réduit : pas de lecture automatique, on montre la carte de fin du chapitre (Lecture la rejoue) */
function showStill(){pause();cur.t=CH[cur.ci].dur;render();updateUI();}
function buildVolet(){
  elChips.innerHTML='';chipEls=[];elPhotos.innerHTML='';polEls=[];
  CH.forEach(function(ch,i){
    var b=el('button','chip');b.type='button';b.style.setProperty('--c',CO[ch.col]||ch.col);
    b.appendChild(el('b','',String(i+1)));b.appendChild(document.createTextNode(ch.short));
    b.addEventListener('click',function(){go(i,0,true);});
    elChips.appendChild(b);chipEls.push(b);
    (ch.photos||[]).forEach(function(s){
      var im=IMG[s.id];if(!im)return;
      var f=el('figure','pol p-'+s.pos+(s.fit==='contain'?' contain':''));f.style.setProperty('--rot',s.rot+'deg');
      var ig=document.createElement('img');ig.alt=im.c;ig.decoding='async';
      var fc=el('figcaption');fc.appendChild(document.createTextNode(im.c));fc.appendChild(el('small','',im.r));
      f.appendChild(ig);f.appendChild(fc);
      f.addEventListener('click',function(){togglePhoto(f);});
      elPhotos.appendChild(f);polEls.push({el:f,img:ig,src:im.u||im.f,ci:i,t0:s.t0,t1:s.t1,on:false,pos:s.pos,cur:s.pos});
    });
  });
  buildFrise();
  $('sub').textContent=VOL.sub||'';
  $('vinfo').innerHTML=VOL.info||'';
  tabEls.forEach(function(b,i){b.setAttribute('aria-current',i===VI?'true':'false');});
  var vt=$('vTitle');if(vt)vt.textContent=VOL.title;
}
function buildFrise(){
  elFrise.innerHTML='';segEls=[];
  var F=VOL.frise;if(!F){elFrise.hidden=true;return;}elFrise.hidden=false;
  function X(y){
    var v;
    if(F.lin)v=(y-F.from)/(F.to-F.from);
    else{var a=Math.log(F.ref-F.from),b=Math.log(F.ref-F.to);v=(a-Math.log(F.ref-y))/(a-b);}
    return 2+96*clamp(v,0,1);
  }
  elFrise.appendChild(el('div','fr-axis'));
  (F.ticks||[]).forEach(function(t){
    var x=X(t[0]),tk=el('div','fr-tick'+(t[2]?' fr-opt':'')),lb=el('div','fr-lab'+(t[2]?' fr-opt':''),t[1]);
    tk.style.left=x+'%';lb.style.left=clamp(x,5,95)+'%';elFrise.appendChild(tk);elFrise.appendChild(lb);
  });
  var rows=[-9,-9,-9];
  CH.forEach(function(ch,i){
    if(!ch.when){segEls.push(null);return;}
    var x0=X(ch.when[0]),x1=Math.max(X(ch.when[1]),x0+1.3),row=0,k;
    for(k=0;k<3;k++){if(rows[k]<=x0-0.4){row=k;break;}if(k===2){row=rows[0]<=rows[1]&&rows[0]<=rows[2]?0:rows[1]<=rows[2]?1:2;}}
    rows[row]=x1;
    var b=el('button','fr-seg');b.type='button';b.style.setProperty('--c',CO[ch.col]||ch.col);
    b.style.left=x0+'%';b.style.width=(x1-x0)+'%';b.style.top=(3+row*17)+'px';b.textContent=String(i+1);
    b.title=(i+1)+'. '+ch.short+(ch.dates?' — '+ch.dates:'');b.setAttribute('aria-label',b.title);
    b.addEventListener('click',function(){go(i,0,true);});
    elFrise.appendChild(b);segEls.push(b);
  });
}
var wasPlaying=false;
function togglePhoto(f){
  var b=f.classList.toggle('big');
  if(b){wasPlaying=playing;pause();}else if(wasPlaying){play();}
}
function updatePhotos(){
  var show=opt.photos&&tool!=='quiz';
  polEls.forEach(function(p){
    var on=show&&p.ci===cur.ci&&cur.t>=p.t0&&cur.t<p.t1;
    if(on&&!p.img.getAttribute('src'))p.img.src=p.src;
    if(on&&!p.on)placePhoto(p);
    if(on!==p.on){p.on=on;p.el.classList.toggle('on',on);if(!on)p.el.classList.remove('big');}
  });
}
/* photo qui apparaît : on garde le coin prévu, sauf s'il cache des lieux cités pendant son affichage
   et qu'un autre coin libre (tr, tl, bl ; br réservé aux boutons de zoom) en cache nettement moins */
function setCorner(p,c){if(p.cur===c)return;p.el.classList.remove('p-'+p.cur);p.el.classList.add('p-'+c);p.cur=c;}
function placePhoto(p){
  var ch=CH[p.ci];
  if(!ch||!opt.labels||HIDELAB||free||!W||!H||!elPhotos.clientWidth){setCorner(p,p.pos);return;}
  var used={};polEls.forEach(function(o){if(o!==p&&o.on&&o.ci===p.ci)used[o.cur]=1;});
  var cand=['tr','tl','bl'];if(p.pos==='br')cand.push('br');
  cand=cand.filter(function(c){return c===p.pos||!used[c];});
  if(cand.length<2){setCorner(p,cand[0]||p.pos);return;}
  var rc=canvas.getBoundingClientRect(),rp=elPhotos.getBoundingClientRect(),ox=rp.left-rc.left,oy=rp.top-rc.top;
  var pw=p.el.offsetWidth,ph=p.el.offsetHeight,cw=elPhotos.clientWidth,chh=elPhotos.clientHeight,mx=cw*0.025,my=chh*0.025;
  function rect(c){var x=c[1]==='l'?mx:cw-mx-pw,y=c[0]==='t'?my:chh-my-ph;return [ox+x-6,oy+y-6,ox+x+pw+6,oy+y+ph+6];}
  var R0={};cand.forEach(function(c){R0[c]=rect(c);});
  var sc={};cand.forEach(function(c){sc[c]=0;});
  var fs=clamp(Math.min(W,H*1.3)/40,10.5,15),save=camNow,span=Math.max(0.1,p.t1-p.t0);
  [0.15,0.5,0.85].forEach(function(f){
    var tt=p.t0+span*f;applyCam(camAt(p.ci,tt));
    (ch.labels||[]).forEach(function(Lb){
      if(!Lb.text||labelVisible(Lb,tt)<=0)return;
      var b=labelBox(Lb,fs),q=projection([Lb.lon,Lb.lat]),w=(Lb.gold||Lb.big)?3:1;
      cand.forEach(function(c){var r=R0[c];
        if(b&&b[0]<r[2]&&b[2]>r[0]&&b[1]<r[3]&&b[3]>r[1])sc[c]+=w;
        if(q&&!Lb.nomark&&q[0]>r[0]&&q[0]<r[2]&&q[1]>r[1]&&q[1]<r[3])sc[c]+=w;});
    });
  });
  applyCam(save);
  var best=p.pos,bs=sc[p.pos]!=null?sc[p.pos]:1e9;
  cand.forEach(function(c){if(sc[c]<bs-1){best=c;bs=sc[c];}});
  setCorner(p,best);
}
/* tous les documents d'un chapitre : ceux de l'animation (photos) puis la galerie (gal), sans doublon */
function chImgs(ch){
  var seen={},out=[];
  (ch.photos||[]).map(function(p){return p.id;}).concat(ch.gal||[]).forEach(function(id){if(IMG[id]&&!seen[id]){seen[id]=1;out.push(id);}});
  return out;
}
/* visionneuse plein écran (galerie) : flèches, Échap, clic hors de l'image */
var LB_EL=null,LB_LIST=[],LB_I=0,LB_WAS=false;
function openLight(list,i){
  LB_LIST=list;LB_I=i;
  if(!LB_EL){
    LB_EL=el('div','lightbox');LB_EL.setAttribute('role','dialog');LB_EL.setAttribute('aria-modal','true');
    LB_EL.innerHTML='<figure><img alt=""><figcaption><b></b><small></small><em></em></figcaption></figure><button type="button" class="lb-x" aria-label="Fermer">✕</button><button type="button" class="lb-p" aria-label="Document précédent">‹</button><button type="button" class="lb-n" aria-label="Document suivant">›</button>';
    LB_EL.addEventListener('click',function(e){var t=e.target;if(t.classList.contains('lb-p'))stepLight(-1);else if(t.classList.contains('lb-n'))stepLight(1);else if(t.tagName!=='IMG')closeLight();});
    document.addEventListener('keydown',function(e){if(!LB_EL||LB_EL.hidden)return;if(e.key==='Escape')closeLight();else if(e.key==='ArrowRight')stepLight(1);else if(e.key==='ArrowLeft')stepLight(-1);});
    (document.fullscreenElement||document.body).appendChild(LB_EL);
  }
  if(LB_EL.parentNode!==(document.fullscreenElement||document.body))(document.fullscreenElement||document.body).appendChild(LB_EL);
  if(LB_EL.hidden!==false){LB_WAS=playing;pause();}
  LB_EL.hidden=false;showLight();
}
function showLight(){
  var im=IMG[LB_LIST[LB_I]];if(!im)return;
  LB_EL.querySelector('img').src=im.u||im.f;LB_EL.querySelector('img').alt=im.c;
  LB_EL.querySelector('b').textContent=im.c;LB_EL.querySelector('small').textContent=im.r;
  LB_EL.querySelector('em').textContent=(LB_I+1)+' / '+LB_LIST.length;
}
function stepLight(d){LB_I=(LB_I+d+LB_LIST.length)%LB_LIST.length;showLight();}
function closeLight(){if(LB_EL){LB_EL.hidden=true;if(LB_WAS)play();}}
function wikiUrl(t){return 'https://fr.wikipedia.org/w/index.php?go=Go&search='+encodeURIComponent(t);}
function ficheText(ch){
  var s=VOL.title+' — '+(cur.ci+1)+'. '+ch.short+(ch.dates?' ('+ch.dates+')':'')+'\n\nLE RÉCIT\n';
  ch.ph.forEach(function(p){s+='• '+p.era+' : '+plainT(p)+(p.unc?' [hypothèse discutée]':'')+'\n';});
  if(ch.mots&&ch.mots.length){s+='\nMOTS-CLÉS\n';ch.mots.forEach(function(m){s+='• '+m[0]+' : '+m[1]+'\n';});}
  if(ch.q&&ch.q.length){s+='\nQUESTIONS\n';ch.q.forEach(function(q,i){s+=(i+1)+'. '+q[0]+'\n   → '+q[1]+'\n';});}
  var ph=chImgs(ch);
  if(ph.length){s+='\nDOCUMENTS\n';ph.forEach(function(id){s+='• '+IMG[id].c+' ('+IMG[id].r+')\n';});}
  if(ch.src&&ch.src.length){s+='\nSOURCES\n';ch.src.forEach(function(x){s+='• '+x[0]+' : '+x[1]+'\n';});}
  if(ch.wiki&&ch.wiki.length){s+='\nPOUR ALLER PLUS LOIN\n';ch.wiki.forEach(function(w){s+='• '+w+' : '+wikiUrl(w)+'\n';});}
  return s;
}
function buildFiche(){
  var ch=CH[cur.ci];elFiche.innerHTML='';
  elFiche.appendChild(el('h3','',(cur.ci+1)+'. '+ch.short));
  if(ch.dates)elFiche.appendChild(el('p','cred',ch.dates));
  elFiche.appendChild(el('h4','','Le récit'));
  var ol=el('ol');ch.ph.forEach(function(p){var li=el('li');li.appendChild(el('b','',p.era+' : '));li.appendChild(document.createTextNode(plainT(p)+(p.unc?' (hypothèse discutée)':'')));ol.appendChild(li);});
  elFiche.appendChild(ol);
  if(ch.mots&&ch.mots.length){
    elFiche.appendChild(el('h4','','Mots-clés'));var dl=el('dl');
    ch.mots.forEach(function(m){dl.appendChild(el('dt','',m[0]));dl.appendChild(el('dd','',m[1]));});elFiche.appendChild(dl);
  }
  if(ch.q&&ch.q.length){
    elFiche.appendChild(el('h4','','Questions pour la classe'));
    ch.q.forEach(function(q){var d=el('details'),s=el('summary','',q[0]);d.appendChild(s);d.appendChild(el('p','',q[1]));elFiche.appendChild(d);});
  }
  var bk={},bl=[],seul=true;
  function bAdd(s,mer){(s||'').split('|').some(function(k){if(bk[k])return true;if(SPR_NAMES[k]&&sprSrc(k)){bk[k]=1;bl.push(k);if(!mer)seul=false;return true;}return false;});}
  (ch.routes||[]).forEach(function(rt){if(rt.boat||rt.ship)bAdd(sprKey(rt),true);else if(rt.sp&&opt.sprites)bAdd(rt.sp,sprKind(rt.sp.split('|')[0])==='mer');});
  if(opt.sprites)(ch.labels||[]).forEach(function(l){if(l.ic)bAdd(l.ic,false);});
  if(bl.length){
    elFiche.appendChild(el('h4','',seul?'Bateaux du chapitre':'Les petites images de la carte'));var bx=el('div','boats');
    bl.forEach(function(k){var f=el('figure'),im=document.createElement('img');im.src=sprSrc(k);im.alt='';im.loading='lazy';f.appendChild(im);f.appendChild(el('figcaption','',SPR_NAMES[k]));bx.appendChild(f);});
    elFiche.appendChild(bx);
  }
  var gi=chImgs(ch);
  if(gi.length){
    elFiche.appendChild(el('h4','','Galerie du chapitre ('+gi.length+' documents)'));var gal=el('div','gal');
    gi.forEach(function(id,k){
      var im=IMG[id],b=el('button','gal-it');b.type='button';b.title=im.c;
      var ig=document.createElement('img');ig.loading='lazy';ig.decoding='async';ig.alt=im.c;ig.src=im.u||im.f;
      b.appendChild(ig);b.appendChild(el('span','',im.c));
      b.addEventListener('click',function(){openLight(gi,k);});gal.appendChild(b);
    });
    elFiche.appendChild(gal);
  }
  if(ch.src&&ch.src.length){
    elFiche.appendChild(el('h4','','Sources'));var u3=el('ul');
    ch.src.forEach(function(x){if(!/^https?:\/\//.test(x[1]||''))return;var li=el('li'),a=el('a','',x[0]);a.href=x[1];a.target='_blank';a.rel='noopener noreferrer';li.appendChild(a);u3.appendChild(li);});elFiche.appendChild(u3);
  }
  if(ch.wiki&&ch.wiki.length){
    elFiche.appendChild(el('h4','','Pour aller plus loin'));var u2=el('ul');
    ch.wiki.forEach(function(w){var li=el('li'),a=el('a','','Wikipédia : '+w);a.href=wikiUrl(w);a.target='_blank';a.rel='noopener noreferrer';li.appendChild(a);u2.appendChild(li);});elFiche.appendChild(u2);
  }
  var bt=el('button','','Copier la fiche (texte)');bt.type='button';
  var ta=el('textarea');ta.hidden=true;ta.readOnly=true;ta.setAttribute('aria-label','Texte de la fiche');
  bt.addEventListener('click',function(){
    var s=ficheText(ch);
    function fb(){ta.hidden=false;ta.value=s;ta.focus();ta.select();bt.textContent='Sélectionné : copie avec Ctrl+C';}
    try{navigator.clipboard.writeText(s).then(function(){bt.textContent='Fiche copiée ✓';},fb);}catch(e){fb();}
  });
  elFiche.appendChild(bt);elFiche.appendChild(ta);
}
function setChapterUI(){
  var ch=CH[cur.ci];
  chipEls.forEach(function(b,i){b.setAttribute('aria-current',i===cur.ci?'true':'false');});
  segEls.forEach(function(b,i){if(b)b.setAttribute('aria-current',i===cur.ci?'true':'false');});
  var cb=chipEls[cur.ci];if(cb&&elChips.scrollTo){elChips.scrollTo({left:cb.offsetLeft-elChips.clientWidth/2+cb.clientWidth/2,behavior:'smooth'});}
  elSeek.max=ch.dur;
  elLegend.innerHTML='';
  (ch.legend||[]).forEach(function(l){
    var li=el('li'),sy=SYMS[l[2]],sw=el('span','swatch'+(sy?' sym':l[2]?' dash':''));
    var c=CO[l[0]]||l[0];
    if(sy)sw.innerHTML=symSVG(l[2]);else{sw.style.background=c;sw.style.setProperty('--c',c);}
    li.appendChild(sw);li.appendChild(el('span','',l[1]));elLegend.appendChild(li);
  });
  buildFiche();
  phIdx=-1;lastSec=-1;resetDirs();syncPj();
  /* documents du chapitre chargés et décodés à l'avance : pas d'à-coup quand ils apparaissent */
  polEls.forEach(function(p){if(p.ci===cur.ci&&!p.img.getAttribute('src')){p.img.src=p.src;if(p.img.decode)p.img.decode().catch(function(){});}});
}
function resetDirs(){(CH[cur.ci].routes||[]).forEach(function(rt){rt._dir=0;});}
var REDUCE=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var uiPlay='',uiPrev=null,uiNext=null;
var spokeKey=null;
function speak(txt){
  try{
    if(!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;
    window.speechSynthesis.cancel();
    if(!txt)return;
    txt=txt.replace(EMO,'').replace(/≈/g,'environ ').replace(/av\. J\.-C\./g,'avant Jésus-Christ').replace(/apr\. J\.-C\./g,'après Jésus-Christ').replace(/(\d)\s*–\s*(\d)/g,'$1 à $2').replace(/[«»]/g,'').replace(/\s*:\s*/g,' : ');
    var u=new SpeechSynthesisUtterance(txt);u.lang='fr-FR';u.rate=0.95;
    var vs=window.speechSynthesis.getVoices()||[],v=vs.filter(function(x){return /^fr/i.test(x.lang);})[0];if(v)u.voice=v;
    window.speechSynthesis.speak(u);
  }catch(e){}
}
function phaseIdx(t){var ch=CH[cur.ci],idx=0,i;for(i=0;i<ch.ph.length;i++)if(t>=ch.ph[i].t)idx=i;return idx;}
function updateUI(){
  var ch=CH[cur.ci],idx=phaseIdx(cur.t);
  if(idx!==phIdx){
    phIdx=idx;var p=ch.ph[idx];
    elEra.textContent=p.era;if(opt.easy&&p.fa){elTxt.innerHTML=p.fa.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];}).replace(/\*([^*]+)\*/g,'<b>$1</b>');}else elTxt.textContent=p.txt;elCap.style.setProperty('--era',CO[p.c]||p.c);elUnc.hidden=!p.unc;
    if(playing&&!REDUCE&&elTxt.animate){try{elTxt.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:420,easing:'ease-out'});elEra.animate([{opacity:0.2},{opacity:1}],{duration:420,easing:'ease-out'});}catch(e){}}
    if(opt.voice&&(playing||spokeKey!==null))speak(sayT(p));
    spokeKey=VI+'-'+cur.ci+'-'+idx;
  }
  var sec=Math.floor(cur.t);
  if(sec!==lastSec){lastSec=sec;elTime.textContent=sec+' / '+Math.round(ch.dur)+' s';}
  elSeek.value=cur.t;
  var end=cur.t>=ch.dur,lastCh=cur.ci===CH.length-1;
  var pt=playing?'Pause':(end?(lastCh?'Tout rejouer':'Chapitre suivant ▶'):(stepHold?'Étape suivante ▶':'Lecture'));
  if(pt!==uiPlay){uiPlay=pt;elPlay.textContent=pt;syncPj();}
  if(uiPrev!==(cur.ci===0)){uiPrev=cur.ci===0;$('prev').disabled=uiPrev;}
  if(uiNext!==lastCh){uiNext=lastCh;$('next').disabled=lastCh;}
  updatePhotos();
}
function resetTools(){meas.a=meas.b=null;if(tool==='quiz')setTool('none');else if(tool==='measure')banner();}
function go(ci,t,keepPlay){
  var was=playing;
  flyFrom={lon:camNow.lon,lat:camNow.lat,z:camNow.z};
  cur.ci=clamp(ci,0,CH.length-1);cur.t=t||0;stepHold=false;setFree(null);hover=null;
  polEls.forEach(function(p){p.el.classList.remove('big');});
  resetTools();
  setChapterUI();render();updateUI();
  if(keepPlay){play();}else if(!was){pause();}
}
function setVolet(i,ci,keepPlay){
  if(i===VI&&ci==null)return;
  pause();
  VI=clamp(i,0,VOLS.length-1);VOL=VOLS[VI];CH=VOL.chapters;
  buildVolet();
  try{if(location.hash!=='#'+VOL.id)history.replaceState(null,'','#'+VOL.id);}catch(e){try{location.hash=VOL.id;}catch(e2){}}
  try{localStorage.setItem('atlas-hg-volet',VOL.id);}catch(e){}
  cur.ci=0;go(ci||0,0,!!keepPlay);
}
function frame(ts){
  if(!playing)return;
  var dt=clamp((ts-last)/1000,0,0.1)*opt.speed;last=ts;
  var ch=CH[cur.ci],t1=Math.min(ch.dur,cur.t+dt);
  if(opt.step){
    var i=phaseIdx(cur.t);
    if(i<ch.ph.length-1&&t1>=ch.ph[i+1].t){cur.t=ch.ph[i+1].t-0.001;playing=false;stepHold=true;render();updateUI();return;}
  }
  cur.t=t1;
  render();updateUI();
  if(cur.t>=ch.dur){
    if(opt.auto&&cur.ci<CH.length-1){go(cur.ci+1,0,true);return;}
    playing=false;updateUI();return;
  }
  requestAnimationFrame(frame);
}
function play(){
  var ch=CH[cur.ci];
  if(cur.t>=ch.dur){if(cur.ci<CH.length-1){go(cur.ci+1,0,true);return;}go(0,0,true);return;}
  if(stepHold){var i=phaseIdx(cur.t);if(i<ch.ph.length-1&&ch.ph[i+1].t-cur.t<0.01)cur.t=ch.ph[i+1].t;stepHold=false;}
  if(tool==='quiz')setTool('none');
  playing=true;last=performance.now();updateUI();requestAnimationFrame(frame);
}
function pause(){playing=false;if(VOL)updateUI();}
function hush(){try{if(window.speechSynthesis)window.speechSynthesis.cancel();}catch(e){}}
function stepNext(){
  var ch=CH[cur.ci],i=phaseIdx(cur.t+0.002);
  if(i<ch.ph.length-1){stepHold=false;cur.t=ch.ph[i+1].t;render();updateUI();if(!playing)play();}
  else if(cur.ci<CH.length-1)go(cur.ci+1,0,true);
}
function stepPrev(){
  var ch=CH[cur.ci],i=phaseIdx(cur.t);
  var t=(cur.t-ch.ph[i].t>1.2||i===0)?ch.ph[i].t:ch.ph[i-1].t;
  pause();stepHold=false;cur.t=t;resetDirs();render();updateUI();
}

/* ---------- Exploration libre, mesure, jeu ---------- */
function setFree(c){free=c;elFit.classList.toggle('on',!!c);elStage.classList.toggle('zoomed',!!c);}
function baseCam(){return free||{lon:camNow.lon,lat:camNow.lat,z:camNow.z};}
function panBy(dx,dy){
  var c=baseCam(),k=57.2958/KPX,cf=projKind==='globe'?Math.max(0.3,Math.cos(c.lat*RAD)):1;
  setFree({lon:c.lon-dx*k/cf,lat:clamp(c.lat+dy*k,-85,85),z:Math.max(c.z,zMin())});schedule();
}
var ZMAX=260;
/* zoom autour d'un point de l'écran (doigts, molette, double appui) : le lieu visé reste sous le doigt */
function zoomAt(f,x,y){
  var c=baseCam(),z=clamp(Math.max(c.z,zMin())*f,zMin(),ZMAX),p=(x==null)?null:invertPt(x,y);
  setFree({lon:c.lon,lat:c.lat,z:z});
  if(p)keepAt(p,x,y);
  schedule();
}
function keepAt(p,x,y){
  for(var i=0;i<2;i++){
    applyCam(free);var q=projection(p);if(!q||!isFinite(q[0])||!isFinite(q[1]))return;
    var k=57.2958/KPX,cf=projKind==='globe'?Math.max(0.3,Math.cos(free.lat*RAD)):1;
    free={lon:wrap180(free.lon-(x-q[0])*k/cf),lat:clamp(free.lat+(y-q[1])*k,-85,85),z:free.z};
  }
}
function zoomBy(f){zoomAt(f);}
function invertPt(x,y){
  var p=projection.invert([x,y]);if(!p||!isFinite(p[0])||!isFinite(p[1]))return null;
  var q=projection(p);if(!q||Math.hypot(q[0]-x,q[1]-y)>1.5)return null;
  if(hidden(p,1.5533))return null;
  return p;
}
function banner(html){
  if(html==null){
    if(tool==='measure')html='Clique sur deux points de la carte pour mesurer la distance.';
    else if(tool==='explore')html='Glisse pour déplacer la carte. Molette, deux doigts ou + / − pour zoomer.';
    else{elTb.hidden=true;elTb.innerHTML='';return;}
  }
  elTb.innerHTML=html;elTb.hidden=false;
}
/* temps de trajet affiché par l'outil Mesurer, selon le volet : [texte, vitesse, unité] */
var TRAVEL={monde:['À pied, à environ 25 km par jour',25,'j'],pacifique:['À la voile, à environ 150 km par jour',150,'j'],decouvertes:['À la voile, à environ 150 km par jour',150,'j'],caledonie:['À la voile, à environ 150 km par jour',150,'j'],
  geonc:['En voiture, à environ 70 km/h (la route est plus longue que le vol d’oiseau)',70,'h'],nickel:['En minéralier, à environ 550 km par jour',550,'j'],mondial:['En avion de ligne, à environ 850 km/h',850,'h']};
function measureDone(){
  var km=d3.geoDistance(meas.a,meas.b)*6371;
  var M=TRAVEL[VOL&&VOL.id]||TRAVEL.pacifique,n=km/M[1],dur;
  if(M[2]==='h'){if(n<1)dur=Math.max(5,Math.round(n*12)*5)+' min';else if(n<10){var hh=Math.round(n*2)/2;dur=Math.floor(hh)+' h'+(hh%1?' 30':'');}else dur=fr(n)+' h';}
  else{var d=Math.max(1,Math.round(n));dur=fr(d)+' jour'+(d>1?'s':'');}
  banner('Distance à vol d’oiseau : <b>'+fr(km<100?Math.round(km):Math.round(km/10)*10)+' km</b> (environ '+fr(km/1.852)+' milles marins).<br>'+M[0]+' : environ <b>'+dur+'</b>. <button type="button" id="mclr">Effacer</button>');
  $('mclr').addEventListener('click',function(){meas.a=meas.b=null;banner();schedule();});
}
function quizPool(){
  var seen={},out=[];
  (CH[cur.ci].labels||[]).forEach(function(l){if(l.nomark||seen[l.text])return;seen[l.text]=1;out.push({lon:l.lon,lat:l.lat,text:l.text});});
  return out;
}
function quizAsk(){
  var q=quiz;q.answered=false;q.click=null;
  if(!q.left.length){banner('Terminé : <b>'+q.score+' / '+q.n+'</b>. <button type="button" id="qre">Rejouer</button> <button type="button" id="qst">Fermer</button>');
    $('qre').addEventListener('click',quizStart);$('qst').addEventListener('click',function(){setTool('none');});schedule();return;}
  q.target=q.left.splice(Math.floor(Math.random()*q.left.length),1)[0];
  banner('Où est : <b>'+q.target.text.replace(/</g,'&lt;')+'</b> ? Clique sur la carte.'+(q.n?' <span>Trouvés : '+q.score+' sur '+q.n+'</span>':''));
  schedule();
}
function quizStart(){
  var pool=quizPool();
  if(pool.length<2){banner('Pas assez de lieux nommés dans ce chapitre pour jouer.');return;}
  pause();cur.t=CH[cur.ci].dur;
  var pts=pool.map(function(p){return [p.lon,p.lat];}),cam=fitCam(pts);
  if(projKind==='globe'){pool=pool.filter(function(p){return d3.geoDistance([p.lon,p.lat],[cam.lon,cam.lat])<1.25;});}
  setFree(cam);
  quiz={left:pool.slice(),score:0,n:0,target:null,answered:false,click:null,good:false};
  updateUI();quizAsk();
}
function quizAnswer(p){
  var q=quiz,t=[q.target.lon,q.target.lat],a=projection(p),b=projection(t);
  var px=a&&b?Math.hypot(a[0]-b[0],a[1]-b[1]):999,km=d3.geoDistance(p,t)*6371;
  q.click=p;q.answered=true;q.good=px<=Math.max(30,Math.min(W,H)*0.06);q.n++;if(q.good)q.score++;
  banner((q.good?'<b>Bravo !</b>':'Pas tout à fait : tu es à <b>'+fr(km<100?km:Math.round(km/10)*10)+' km</b>.')+' <button type="button" id="qnx">'+(q.left.length?'Lieu suivant ▶':'Voir le score')+'</button>');
  $('qnx').addEventListener('click',quizAsk);schedule();
}
function clickAt(x,y){
  var p=invertPt(x,y);
  if(tool==='measure'){
    if(!p)return;
    if(!meas.a||meas.b){meas.a=p;meas.b=null;banner('Premier point posé. Clique sur le second point.');}
    else{meas.b=p;measureDone();}
    schedule();
  }else if(tool==='quiz'){
    if(p&&quiz&&quiz.target&&!quiz.answered)quizAnswer(p);
  }else if(opt.coord){hover=p;schedule();}
}
var toolBtns=[].slice.call(document.querySelectorAll('[data-tool]'));
function setTool(t){
  if(t===tool)t='none';
  tool=t;quiz=null;meas.a=meas.b=null;
  if(tool==='measure')pause();
  ['explore','measure','quiz'].forEach(function(k){elStage.classList.toggle('t-'+k,tool===k);});
  toolBtns.forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-tool')===tool?'true':'false');});
  banner();
  if(tool==='quiz')quizStart();else if(VOL){updateUI();schedule();}
}
toolBtns.forEach(function(b){b.addEventListener('click',function(){setTool(b.getAttribute('data-tool'));});});

var ptrs={},drag=null,pinch=null,lastTap=null;
function pxy(e){var rc=canvas.getBoundingClientRect();return [e.clientX-rc.left,e.clientY-rc.top];}
canvas.addEventListener('pointerdown',function(e){
  var q=pxy(e);ptrs[e.pointerId]={x:q[0],y:q[1]};
  var can=tool==='explore'||(e.pointerType==='mouse'&&tool!=='quiz')||(!!free&&tool!=='quiz'&&tool!=='measure');
  drag={id:e.pointerId,x0:q[0],y0:q[1],x:q[0],y:q[1],moved:false,can:can};
  if(can){try{canvas.setPointerCapture(e.pointerId);}catch(err){}}
  var ids=Object.keys(ptrs);
  if(ids.length===2&&tool!=='quiz'&&tool!=='measure'){var a=ptrs[ids[0]],b=ptrs[ids[1]],mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:Math.max(baseCam().z,zMin()),p:invertPt(mx,my)};lastTap=null;
    try{canvas.setPointerCapture(e.pointerId);}catch(err){}}
});
canvas.addEventListener('pointermove',function(e){
  var q=pxy(e);if(ptrs[e.pointerId]){ptrs[e.pointerId].x=q[0];ptrs[e.pointerId].y=q[1];}
  var ids=Object.keys(ptrs);
  if(pinch&&ids.length===2){
    var a=ptrs[ids[0]],b=ptrs[ids[1]],c=baseCam();
    setFree({lon:c.lon,lat:c.lat,z:clamp(pinch.z*Math.hypot(a.x-b.x,a.y-b.y)/pinch.d,zMin(),ZMAX)});
    if(pinch.p)keepAt(pinch.p,(a.x+b.x)/2,(a.y+b.y)/2);
    if(drag)drag.moved=true;schedule();return;
  }
  if(drag&&drag.id===e.pointerId&&drag.can){
    if(!drag.moved&&Math.hypot(q[0]-drag.x0,q[1]-drag.y0)>5)drag.moved=true;
    if(drag.moved){panBy(q[0]-drag.x,q[1]-drag.y);drag.x=q[0];drag.y=q[1];}
  }else if(opt.coord&&e.pointerType==='mouse'&&!drag){hover=invertPt(q[0],q[1]);schedule();}
});
function pend(e){
  var d=drag,wasPinch=!!pinch;delete ptrs[e.pointerId];var left=Object.keys(ptrs);if(left.length<2)pinch=null;
  if(wasPinch){ /* un doigt reste posé : il reprend le déplacement sans saut */
    drag=left.length===1?{id:+left[0],x0:ptrs[left[0]].x,y0:ptrs[left[0]].y,x:ptrs[left[0]].x,y:ptrs[left[0]].y,moved:true,can:true}:null;return;}
  if(d&&d.id===e.pointerId){drag=null;
    if(!d.moved&&e.type==='pointerup'){
      var now=Date.now();
      if(lastTap&&now-lastTap.t<340&&Math.hypot(d.x0-lastTap.x,d.y0-lastTap.y)<30&&tool!=='quiz'&&tool!=='measure'){lastTap=null;zoomAt(2,d.x0,d.y0);return;}
      lastTap={t:now,x:d.x0,y:d.y0};clickAt(d.x0,d.y0);}}
}
canvas.addEventListener('pointerup',pend);canvas.addEventListener('pointercancel',pend);
/* molette : zoome la carte quand la page ne défile pas (grand écran, plein écran) ou que la carte est déjà zoomée ;
   Ctrl + molette et pincement du pavé tactile : toujours la carte, jamais la page */
canvas.addEventListener('wheel',function(e){
  var fixe=document.documentElement.scrollHeight<=window.innerHeight+2;
  if(!(e.ctrlKey||fixe||free||tool==='explore'||document.fullscreenElement||isPj()))return;
  e.preventDefault();var q=pxy(e),dy=e.deltaMode===1?e.deltaY*32:e.deltaY;
  zoomAt(Math.exp(-dy*(e.ctrlKey?0.012:0.0016)),q[0],q[1]);
},{passive:false});
/* deux doigts sur la carte : on empêche le navigateur de zoomer ou de faire défiler la page */
function twoF(e){if(e.touches&&e.touches.length>1&&e.cancelable)e.preventDefault();}
canvas.addEventListener('touchstart',twoF,{passive:false});canvas.addEventListener('touchmove',twoF,{passive:false});
['gesturestart','gesturechange'].forEach(function(n){canvas.addEventListener(n,function(e){e.preventDefault();},{passive:false});});
$('zin').addEventListener('click',function(){zoomBy(1.5);});
$('zout').addEventListener('click',function(){zoomBy(1/1.5);});
elFit.addEventListener('click',function(){setFree(null);schedule();});

/* ---------- Commandes ---------- */
elPlay.addEventListener('click',function(){if(playing){pause();hush();}else{if(opt.voice&&!stepHold){var ph0=CH[cur.ci].ph[phaseIdx(cur.t)];speak(sayT(ph0));}play();}});
$('restart').addEventListener('click',function(){go(cur.ci,0,true);});
$('prev').addEventListener('click',function(){go(cur.ci-1,0,true);});
$('next').addEventListener('click',function(){go(cur.ci+1,0,true);});
$('sprev').addEventListener('click',stepPrev);
$('snext').addEventListener('click',stepNext);
elSeek.addEventListener('input',function(){var t=parseFloat(elSeek.value)||0;if(t<cur.t)resetDirs();cur.t=t;stepHold=false;render();updateUI();});
/* Mode projection : plein écran avec seulement la carte et le texte du récit.
   Si le navigateur refuse le vrai plein écran (page intégrée), la page occupe toute la fenêtre. */
function isPj(){return document.body.classList.contains('pj');}
function setPj(on){
  document.body.classList.toggle('pj',on);
  var fb=$('fs');if(fb)fb.setAttribute('aria-pressed',on?'true':'false');
  syncPj();
}
function syncPj(){var b=$('pjPlay');if(b)b.textContent=playing?'❚❚ Pause':uiPlay;var c=$('pjCh');if(c&&VOL)c.textContent=VOL.title+' · '+(cur.ci+1)+'. '+CH[cur.ci].short;}
function toggleFs(){
  if(!isPj()){
    setPj(true);
    try{var a=$('app');if(a.requestFullscreen&&!document.fullscreenElement){var pr=a.requestFullscreen();if(pr&&pr.catch)pr.catch(function(){});}}catch(e){}
  }else{
    setPj(false);
    try{if(document.fullscreenElement)document.exitFullscreen();}catch(e){}
  }
}
$('fs').addEventListener('click',toggleFs);$('pjExit').addEventListener('click',toggleFs);
$('pjPrev').addEventListener('click',stepPrev);$('pjNext').addEventListener('click',stepNext);
$('pjPlay').addEventListener('click',function(){elPlay.click();});
document.addEventListener('fullscreenchange',function(){if(!document.fullscreenElement&&isPj())setPj(false);});
function syncOptUI(){
  [].forEach.call(document.querySelectorAll('[data-opt]'),function(i){i.checked=!!opt[i.getAttribute('data-opt')];});
  [].forEach.call(document.querySelectorAll('[data-proj]'),function(b){b.setAttribute('aria-pressed',b.getAttribute('data-proj')===opt.proj?'true':'false');});
  [].forEach.call(document.querySelectorAll('[data-speed]'),function(b){b.setAttribute('aria-pressed',parseFloat(b.getAttribute('data-speed'))===opt.speed?'true':'false');});
  document.body.classList.toggle('big-text',opt.big);document.body.classList.toggle('easy',opt.easy);document.body.classList.toggle('no-frise',!opt.frise);
}
[].forEach.call(document.querySelectorAll('[data-opt]'),function(i){i.addEventListener('change',function(){
  opt[i.getAttribute('data-opt')]=i.checked;if(i.getAttribute('data-opt')==='easy'){phIdx=-1;buildFiche();}if(i.getAttribute('data-opt')==='sprites')buildFiche();if(!opt.coord)hover=null;if(!opt.step)stepHold=false;if(!opt.voice)hush();else if(i.getAttribute('data-opt')==='voice'){var ph1=CH[cur.ci].ph[phaseIdx(cur.t)];speak(sayT(ph1));}saveOpt();syncOptUI();render();updateUI();});});
[].forEach.call(document.querySelectorAll('[data-proj]'),function(b){b.addEventListener('click',function(){opt.proj=b.getAttribute('data-proj');setFree(null);saveOpt();syncOptUI();render();});});
[].forEach.call(document.querySelectorAll('[data-speed]'),function(b){b.addEventListener('click',function(){opt.speed=parseFloat(b.getAttribute('data-speed'));saveOpt();syncOptUI();});});
document.addEventListener('keydown',function(e){
  var t=e.target,tg=t&&t.tagName,ty=String(t&&t.type||'').toLowerCase();
  if(e.ctrlKey||e.metaKey||e.altKey||e.defaultPrevented)return;
  if(tg==='TEXTAREA'||tg==='SELECT'||(t&&t.isContentEditable))return;
  if(tg==='INPUT'&&!/^(checkbox|radio|range)$/.test(ty))return;
  /* fenêtres ouvertes (accueil, activités, enquête, aperçu, image agrandie) : elles gèrent leurs touches */
  if(document.body.classList.contains('home-on')){if(e.code==='Escape'){e.preventDefault();closeHome();}return;}
  if(document.querySelector('.act-ov,.enq-ov,.act-layer')||!$('prev-ov').hidden||(LB_EL&&!LB_EL.hidden))return;
  /* un bouton ou une case reçus au clavier (Tab) gardent leur comportement normal ; après un clic à la souris, ui.js leur retire le focus */
  var native=tg==='BUTTON'||tg==='SUMMARY'||tg==='A'||(tg==='INPUT'&&ty!=='range');
  if(e.code==='Space'){if(native)return;e.preventDefault();playing?pause():play();}
  else if(e.code==='ArrowRight'||e.code==='PageDown'){if(tg==='INPUT'&&ty==='range')return;e.preventDefault();stepNext();}
  else if(e.code==='ArrowLeft'||e.code==='PageUp'){if(tg==='INPUT'&&ty==='range')return;e.preventDefault();stepPrev();}
  else if(e.code==='KeyF'){toggleFs();}
  else if(e.code==='Escape'&&isPj()){toggleFs();}
});
function voletFromHash(){
  var h=(location.hash||'').replace('#',''),i;
  for(i=0;i<VOLS.length;i++)if(VOLS[i].id===h)return i;
  return -1;
}
window.addEventListener('hashchange',function(){var i=voletFromHash();if(i>=0&&i!==VI)setVolet(i,0,false);});

/* ---------- Export : image et PDF (fond clair, prêt à imprimer) ---------- */
function projKindFor(ch){return opt.proj==='auto'?(ch.proj||VOL.proj||'globe'):opt.proj;}
function renderTo(w,h,scale,o){
  var cv=document.createElement('canvas');cv.width=Math.round(w*scale);cv.height=Math.round(h*scale);
  var c2=cv.getContext('2d');c2.setTransform(scale,0,0,scale,0,0);
  var sv={ctx:ctx,W:W,H:H,DPR:DPR,TH:TH,labels:opt.labels};
  W=w;H=h;DPR=scale;TH=o.dark?TH_DARK:TH_LIGHT;
  bindCtx(c2);opt.labels=o.labels!==false;BARE=!!o.bare;EXPORT=true;
  try{render();}
  finally{
    EXPORT=false;BARE=false;opt.labels=sv.labels;TH=sv.TH;W=sv.W;H=sv.H;DPR=sv.DPR;
    bindCtx(sv.ctx);
  }
  return cv;
}
function mapCanvas(ci,o){
  var keep={ci:cur.ci,t:cur.t,free:free,fly:flyFrom},ch=CH[ci],flat=projKindFor(ch)!=='globe';
  if(!o.current){cur.ci=ci;cur.t=o.t!=null?o.t:ch.dur;free=o.cam||null;flyFrom=null;}else{cur.t=ch.dur;flyFrom=null;}
  var cv;
  DOCL=!!o.doc;
  try{cv=renderTo(o.w||(flat?820:650),o.h||(flat?546:650),2,o);SNAPN=LTXT.slice();}
  finally{DOCL=false;cur.ci=keep.ci;cur.t=keep.t;free=keep.free;flyFrom=keep.fly;render();}
  return cv;
}
function wrap(c,text,maxW){
  var out=[],line='';
  String(text).split(/\s+/).forEach(function(w){var t=line?line+' '+w:w;if(c.measureText(t).width>maxW&&line){out.push(line);line=w;}else line=t;});
  if(line)out.push(line);return out;
}
/* page A4 paysage, 2480 x 1754 px. o.kind : 'lu' (noms + récit), 'muette' (sans noms), 'vierge' (fond seul) */
function composePage(ci,o){
  var ch=CH[ci],PW=2480,PH=1754,M=84,DISP='"Bricolage Grotesque","Trebuchet MS",sans-serif';
  var lu=o.kind==='lu',mut=o.kind==='muette',vie=o.kind==='vierge';
  NUMS=mut?[]:null;var map,nums;
  try{map=mapCanvas(ci,{labels:!vie,bare:vie,current:o.current});}finally{nums=NUMS||[];NUMS=null;}
  var flat=map.width>map.height,FOOT=PH-M-14;
  var pg=document.createElement('canvas');pg.width=PW;pg.height=PH;var c=pg.getContext('2d');
  c.fillStyle='#fff';c.fillRect(0,0,PW,PH);c.textBaseline='alphabetic';
  c.fillStyle='#5b6b7a';c.font='600 30px '+FONT;c.textAlign='left';c.fillText(VOL.title,M,M+6);
  c.textAlign='right';c.fillText(ch.dates||'',PW-M,M+6);c.textAlign='left';
  var title=(ci+1)+'. '+ch.short+(mut?' — carte muette':vie?' — fond de carte':''),fz=60;
  c.fillStyle='#12202e';do{c.font='700 '+fz+'px '+DISP;fz-=3;}while(c.measureText(title).width>PW-2*M&&fz>30);
  c.fillText(title,M,M+78);
  var y0=M+112,y=0,x1=0,cw=0;
  function head(t){y+=40;c.fillStyle='#8a5a00';c.font='700 30px '+DISP;c.fillText(t.toUpperCase(),x1,y);y+=10;c.fillStyle='#12202e';}
  function wl(t,size,w,bold){c.font=(bold?'700 ':'400 ')+size+'px '+FONT;return wrap(c,t,w);}
  /* récit : « époque : texte », époque en gras */
  var txt=ch.ph.map(function(p){return [p.era,plainT(p)];});
  function stepH(t,size,w){return wl(t[0]+' : '+t[1],size,w*0.96).length*size*1.36+size*0.5;}
  function drawStep(t,x,yy,size,w){
    var ls=wl(t[0]+' : '+t[1],size,w*0.96);
    ls.forEach(function(l,i){yy+=size*1.36;
      if(i===0&&l.indexOf(t[0]+' :')===0){var e=t[0]+' :';c.font='700 '+size+'px '+FONT;c.fillText(e,x,yy);var ew=c.measureText(e+' ').width;c.font='400 '+size+'px '+FONT;c.fillText(l.slice(e.length+1),x+ew,yy);}
      else{c.font='400 '+size+'px '+FONT;c.fillText(l,x,yy);}});
    return yy+size*0.5;
  }
  function legendH(w){var h=50;(ch.legend||[]).forEach(function(l){h+=10+Math.max(1,wl(l[1],27,w-86).length)*36;});return h;}
  function drawLegend(){
    var lg=vie?[]:(ch.legend||[]);head('Légende');
    lg.forEach(function(l){
      y+=46;var col=lc(CO[l[0]]||l[0],true);
      if(SYMS[l[2]]){drawSym(c,l[2],x1+32,y-12,2.4,'#12202e');}
      else if(l[2]){c.setLineDash([14,8]);c.lineWidth=8;c.strokeStyle=col;c.beginPath();c.moveTo(x1,y-10);c.lineTo(x1+64,y-10);c.stroke();c.setLineDash([]);}
      else{c.fillStyle=col;c.strokeStyle='#12202e';c.lineWidth=2;c.fillRect(x1,y-24,64,24);c.strokeRect(x1,y-24,64,24);}
      c.fillStyle='#12202e';c.font='400 27px '+FONT;
      if(mut){c.fillText('……………………………………',x1+82,y-2);}
      else{var ls=wl(l[1],27,cw-86);c.font='400 27px '+FONT;c.fillText(ls[0],x1+82,y-2);for(var k=1;k<ls.length;k++){y+=36;c.fillText(ls[k],x1+82,y-2);}}
    });
    if(vie){for(var b=0;b<5;b++){y+=56;c.strokeStyle='#12202e';c.lineWidth=2;c.strokeRect(x1,y-28,64,28);c.font='400 27px '+FONT;c.fillStyle='#12202e';c.fillText('……………………………………',x1+82,y-4);}}
  }
  function drawMots(limit){
    if(!(ch.mots&&ch.mots.length))return;
    if(y+120>limit)return;head('Mots-clés');
    ch.mots.forEach(function(m){var ls=wl(m[0]+' : '+m[1],25,cw);if(y+ls.length*34>limit)return;ls.forEach(function(l,i){y+=34;if(i===0){var e=m[0]+' :';c.font='700 25px '+FONT;c.fillText(e,x1,y);var ew=c.measureText(e+' ').width;c.font='400 25px '+FONT;c.fillText(l.slice(e.length+1),x1+ew,y);}else{c.font='400 25px '+FONT;c.fillText(l,x1,y);}});y+=8;});
  }
  var mw0=flat?1640:1300,mh0=flat?1092:1300,s=1,size=28;
  if(lu&&flat){
    /* planisphère : récit sur deux colonnes sous la carte ; on réduit la carte avant de réduire le texte */
    var gap=64,colW=(PW-2*M-gap)/2,ok=false,split=0;
    var tries=[];[1,0.95,0.9,0.85,0.8].forEach(function(a){[30,29,28,27,26].forEach(function(b){tries.push([a,b]);});});
    [0.8,0.75,0.7].forEach(function(a){[25,24,23,22].forEach(function(b){tries.push([a,b]);});});
    for(var i=0;i<tries.length&&!ok;i++){
      s=tries[i][0];size=tries[i][1];
      var hs=txt.map(function(t){return stepH(t,size,colW);}),tot=hs.reduce(function(a,b){return a+b;},0),acc=0,k=0;
      while(k<hs.length&&acc+hs[k]/2<tot/2){acc+=hs[k];k++;}
      var h1=acc,h2=tot-acc;if(Math.max(h1,h2)<=FOOT-(y0+mh0*s+30)){ok=true;split=k;}
    }
    var mw=mw0*s,mh=mh0*s;
    c.drawImage(map,M,y0,mw,mh);c.strokeStyle='#12202e';c.lineWidth=3;c.strokeRect(M,y0,mw,mh);
    x1=M+mw+46;cw=PW-M-x1;y=y0-6;drawLegend();drawMots(y0+mh);
    c.fillStyle='#12202e';var ya=y0+mh+22,yb=ya;
    txt.forEach(function(t,j){if(j<split)ya=drawStep(t,M,ya,size,colW);else yb=drawStep(t,M+colW+gap,yb,size,colW);});
  }else if(lu){
    /* globe : carte carrée, légende puis récit à droite */
    var ok2=false;
    var t2=[];[1,0.95,0.9,0.85].forEach(function(a){[30,29,28,27,26,25].forEach(function(b){t2.push([a,b]);});});
    [0.8,0.75].forEach(function(a){[24,23,22].forEach(function(b){t2.push([a,b]);});});
    for(var j=0;j<t2.length&&!ok2;j++){
      s=t2[j][0];size=t2[j][1];var cwj=PW-M-(M+mw0*s+46);
      var h=legendH(cwj)+60+txt.reduce(function(a,t){return a+stepH(t,size,cwj);},0);
      if(h<=FOOT-y0)ok2=true;
    }
    var mws=mw0*s;
    c.drawImage(map,M,y0,mws,mws);c.strokeStyle='#12202e';c.lineWidth=3;c.strokeRect(M,y0,mws,mws);
    x1=M+mws+46;cw=PW-M-x1;y=y0-6;drawLegend();
    head('Le récit');txt.forEach(function(t){y=drawStep(t,x1,y,size,cw);});
    drawMots(FOOT);
  }else{
    /* carte muette numérotée ou fond de carte : colonne de travail à droite */
    c.drawImage(map,M,y0,mw0,mh0);c.strokeStyle='#12202e';c.lineWidth=3;c.strokeRect(M,y0,mw0,mh0);
    x1=M+mw0+46;cw=PW-M-x1;y=y0+6;
    c.font='400 30px '+FONT;c.fillStyle='#12202e';
    c.fillText('Prénom : ……………………………',x1,y+20);y+=62;c.fillText('Date : ………………………………',x1,y+20);y+=34;
    drawLegend();
    if(mut&&nums.length){
      head('Nomme les lieux');var two=nums.length>6&&cw>600,lh=48;
      nums.forEach(function(n,k){var col=two?(k%2):0,row=two?Math.floor(k/2):k,xx=x1+col*(cw/2),yy=y+40+row*lh;
        c.fillStyle='#fff';c.strokeStyle='#12202e';c.lineWidth=2.5;c.beginPath();c.arc(xx+16,yy-9,16,0,6.2832);c.fill();c.stroke();
        c.fillStyle='#12202e';c.font='700 20px '+FONT;c.textAlign='center';c.fillText(String(k+1),xx+16,yy-2);c.textAlign='left';
        c.font='400 27px '+FONT;c.fillText(two?'…………………':'…………………………………',xx+42,yy);});
      y+=40+Math.ceil(nums.length/(two?2:1))*lh;
    }
    head('Consigne');c.font='400 27px '+FONT;
    for(var q=0;q<3&&y+60<FOOT;q++){y+=56;c.fillText('……………………………………………………',x1,y);}
  }
  c.fillStyle='#5b6b7a';c.font='400 21px '+FONT;c.textAlign='left';
  c.fillText('Atlas historique du Pacifique · tracés schématiques, dates approximatives pour les périodes anciennes · fond de carte Natural Earth, côtes de la NC © OpenStreetMap',M,PH-M+12);
  c.font='400 17px '+FONT;c.fillStyle='#8a97a3';c.fillText((window.ATLAS_AUTEUR?ATLAS_AUTEUR.ligne:'© 2026 Nicolas BOUZA · CC BY-NC-ND 4.0')+' · usage en classe, pas d’usage commercial',M,PH-M+38);
  return pg;
}
/* ---------- Carte-document des dossiers d'enquête ----------
   Une vraie carte à analyser, pas une image tirée de l'animation : titre, carte de fin de chapitre avec tous les noms,
   légende, puis un « zoom » par arrêt de la caméra (ce que l'animation a montré de près ou de loin), repéré par un numéro. */
function camStops(ci){
  var C=CH[ci].cam||[],n=C.length,out=[],i;if(n<2)return out;
  var E=C[n-1];
  function span(z){return 2.6/Math.max(0.5,z);}
  function same(a,b){return Math.abs(Math.log(a.z/b.z))<0.3&&d3.geoDistance([a.lon,a.lat],[b.lon,b.lat])<0.22*span(Math.max(a.z,b.z));}
  for(i=0;i<n-1;i++){
    var a=C[i],b=C[i+1];
    if(!same(a,b)||b.t-a.t<3||same(a,E))continue;
    if(out.some(function(o){return same(o,a);}))continue;
    out.push({lon:a.lon,lat:a.lat,z:a.z,t:b.t,len:b.t-a.t,inn:a.z>E.z*1.25});
  }
  if(out.length>4){out.sort(function(x,y){return y.len-x.len;});out=out.slice(0,4);}
  return out.sort(function(x,y){return x.t-y.t;});
}
/* Cadrage d'une carte-document : caméra de fin, sauf si elle coupe un tracé — alors on cadre tous les tracés du chapitre.
   Sert à la planche des dossiers (docCanvas) et à la carte montrée dans l'enquête à l'écran (api.snap) : la même carte des deux côtés. */
function docCam(ci){
  var ch=CH[ci],flat=projKindFor(ch)!=='globe';
  var dcam=null,dpts=[];
  (ch.routes||[]).forEach(function(rt){(rt.pts||[]).forEach(function(p){dpts.push(p);});});
  if(dpts.length>1){
    var kd={ci:cur.ci,t:cur.t,free:free,W:W,H:H,TH:TH,pk:projKind};
    try{
      cur.ci=ci;cur.t=ch.dur;free=null;W=flat?820:650;H=flat?546:650;
      if(projKindFor(ch)!==projKind)setProj(projKindFor(ch));
      applyCam(camAt(ci,ch.dur));
      var cut=dpts.some(function(p){var q=projection(p);return hidden(p,1.45)||!q||q[0]<6||q[0]>W-6||q[1]<6||q[1]>H-6;});
      if(cut){dcam=fitCam(dpts);applyCam(dcam);
        if(dpts.some(function(p){var q=projection(p);return hidden(p,1.45)||!q||q[0]<2||q[0]>W-2||q[1]<2||q[1]>H-2;}))dcam.z=Math.max(zMin(),dcam.z*0.85);}
    }finally{cur.ci=kd.ci;cur.t=kd.t;free=kd.free;W=kd.W;H=kd.H;}
  }
  return dcam;
}
function docCanvas(ci){
  var ch=CH[ci],PW=1640,DISP='"Bricolage Grotesque","Trebuchet MS",sans-serif',INK='#12202e';
  var flat=projKindFor(ch)!=='globe',stops=camStops(ci),parts=[],COM0=COMSEEN=false;
  var dcam=docCam(ci);
  var main=mapCanvas(ci,{labels:true,dark:false,cam:dcam||undefined,doc:true});
  /* position des zooms sur la carte principale (caméra de fin) */
  var keep={ci:cur.ci,t:cur.t,free:free,W:W,H:H,TH:TH};
  cur.ci=ci;cur.t=ch.dur;free=null;W=main.width/2;H=main.height/2;
  try{if(projKindFor(ch)!==projKind)setProj(projKindFor(ch));applyCam(dcam||camAt(ci,ch.dur));
    stops.forEach(function(sp){var q=hidden([sp.lon,sp.lat],1.4)?null:projection([sp.lon,sp.lat]);sp.q=(sp.inn&&q&&q[0]>20&&q[0]<W-20&&q[1]>20&&q[1]<H-20)?q:null;});
  }finally{cur.ci=keep.ci;cur.t=keep.t;free=keep.free;W=keep.W;H=keep.H;}
  FULLR=true;
  try{stops.forEach(function(sp){
    var k=0,j;for(j=0;j<ch.ph.length;j++)if(ch.ph[j].t<=sp.t-0.5)k=j;
    parts.push({cv:mapCanvas(ci,{labels:true,dark:false,t:sp.t,cam:{lon:sp.lon,lat:sp.lat,z:sp.z},w:600,h:400}),era:ch.ph[k]?ch.ph[k].era:'',sp:sp});
  });}finally{FULLR=false;}
  render();
  var m=document.createElement('canvas').getContext('2d');
  function lines(t,font,w){m.font=font;return wrap(m,t,w);}
  var title=ch.short,tf='700 46px '+DISP,TL=lines(title,tf,PW-(ch.dates?420:0));
  var lg=(ch.legend||[]).slice();if(COMSEEN)lg.push(['#6b6455','Limite de commune (communes d’aujourd’hui)',1]);
  var colW=(PW-40)/2,LF='400 28px '+FONT,rows=[],r;
  lg.forEach(function(l){rows.push({l:l,ls:lines(l[1],LF,colW-96)});});
  var half=Math.ceil(rows.length/2),hL=0,hR=0;
  rows.forEach(function(x,i){var h=14+x.ls.length*36;if(i<half)hL+=h;else hR+=h;});
  var legH=rows.length?(58+Math.max(hL,hR)+10):0;
  var mw=flat?PW:1300,mh=main.height*(mw/main.width),mx=(PW-mw)/2;
  var one=parts.length===1,iw=one?1040:(PW-40)/2,ih=iw*400/600,nrow=Math.ceil(parts.length/2);
  var hint=parts.some(function(P){return P.sp.q;});
  var yT=20+TL.length*54+16,yM=yT+10,yL=yM+mh+18,yI=yL+legH+(parts.length?16:0)+(hint?42:0);
  var PH=Math.ceil(yI+nrow*(ih+78)+10);
  var pg=document.createElement('canvas');pg.width=PW;pg.height=PH;var c=pg.getContext('2d');
  c.fillStyle='#fff';c.fillRect(0,0,PW,PH);c.textBaseline='alphabetic';c.fillStyle=INK;
  c.font=tf;TL.forEach(function(l,i){c.fillText(l,0,62+i*54);});
  if(ch.dates){c.font='600 30px '+FONT;c.fillStyle='#5b6b7a';c.textAlign='right';c.fillText(ch.dates,PW,58);c.textAlign='left';}
  c.fillStyle='#8a5a00';c.fillRect(0,yT-6,PW,4);
  c.drawImage(main,mx,yM,mw,mh);c.strokeStyle=INK;c.lineWidth=3;c.strokeRect(mx+1.5,yM+1.5,mw-3,mh-3);
  function badge(x,y,n,rad){c.fillStyle='#fff';c.strokeStyle='#b42318';c.lineWidth=4;c.beginPath();c.arc(x,y,rad,0,6.2832);c.fill();c.stroke();
    c.fillStyle='#b42318';c.font='700 '+Math.round(rad*1.15)+'px '+FONT;c.textAlign='center';c.fillText(String(n),x,y+rad*0.4);c.textAlign='left';}
  parts.forEach(function(P,i){if(P.sp.q)badge(mx+P.sp.q[0]*2*(mw/main.width),yM+P.sp.q[1]*2*(mw/main.width),i+1,22);});
  if(rows.length){
    c.fillStyle='#8a5a00';c.font='700 28px '+DISP;c.fillText('LÉGENDE',0,yL+34);
    var yy=[yL+58,yL+58];
    rows.forEach(function(x,i){
      var k=i<half?0:1,x0=k*(colW+40),y=yy[k]+34,l=x.l,col=lc(CO[l[0]]||l[0],true);
      if(SYMS[l[2]])drawSym(c,l[2],x0+32,y-11,2.4,INK);
      else if(l[2]){c.setLineDash([14,8]);c.lineWidth=8;c.strokeStyle=col;c.beginPath();c.moveTo(x0,y-10);c.lineTo(x0+64,y-10);c.stroke();c.setLineDash([]);}
      else{c.fillStyle=col;c.strokeStyle=INK;c.lineWidth=2;c.fillRect(x0,y-24,64,24);c.strokeRect(x0,y-24,64,24);}
      c.fillStyle=INK;c.font=LF;x.ls.forEach(function(t,j){c.fillText(t,x0+84,y-2+j*36);});
      yy[k]+=14+x.ls.length*36;
    });
  }
  if(hint){c.fillStyle='#5b6b7a';c.font='italic 400 24px '+FONT;c.fillText('Les numéros rouges de la grande carte montrent où se trouvent les zooms.',0,yI-16);}
  parts.forEach(function(P,i){
    var x0=one?(PW-iw)/2:(parts.length%2&&i===parts.length-1)?(PW-iw)/2:(i%2)*(iw+40),y0=yI+Math.floor(i/2)*(ih+78);
    badge(x0+24,y0+30,i+1,22);
    c.fillStyle=INK;c.font='700 28px '+FONT;var cap=(P.sp.inn?'Zoom':'Vue d’ensemble')+(P.era?' — '+P.era:'');
    c.fillText(lines(cap,c.font,iw-64)[0],x0+58,y0+40);
    c.drawImage(P.cv,x0,y0+60,iw,ih);c.strokeStyle=INK;c.lineWidth=2.5;c.strokeRect(x0+1,y0+61,iw-2,ih-2);
  });
  return pg;
}
function jpegBytes(cv){return new Promise(function(res,rej){cv.toBlob(function(b){if(!b){rej(new Error('image'));return;}var fr2=new FileReader();fr2.onload=function(){res(new Uint8Array(fr2.result));};fr2.onerror=rej;fr2.readAsArrayBuffer(b);},'image/jpeg',0.9);});}
/* mention d'auteur : en bas des cartes PNG (filigrane) et dans les propriétés de chaque PDF exporté (/Info) */
function signCanvas(cv){var a=window.ATLAS_AUTEUR,t=a?'© 2026 Nicolas BOUZA · '+a.titre+' · CC BY-NC-ND 4.0':'© 2026 Nicolas BOUZA · CC BY-NC-ND 4.0',x=cv.getContext('2d'),fs=Math.max(12,Math.round(cv.width/95));
  x.save();x.font='600 '+fs+'px '+FONT;var w=x.measureText(t).width;x.fillStyle='rgba(255,255,255,.78)';x.fillRect(cv.width-w-fs*1.6,cv.height-fs*2,w+fs*1.2,fs*1.6);
  x.fillStyle='#12202e';x.textBaseline='middle';x.fillText(t,cv.width-w-fs,cv.height-fs*1.2);x.restore();return cv;}
function pstr(s){var h='<FEFF';for(var i=0;i<s.length;i++)h+=('000'+s.charCodeAt(i).toString(16)).slice(-4);return h+'>';}
function buildPdf(pages){
  var parts=[],off=0,xref=[],enc=new TextEncoder(),i;
  function add(x){var u=typeof x==='string'?enc.encode(x):x;parts.push(u);off+=u.length;}
  function obj(n,body){xref[n]=off;add(n+' 0 obj\n'+body+'\nendobj\n');}
  add('%PDF-1.4\n%âãÏÓ\n');
  var kids=pages.map(function(p,k){return (3+k*3)+' 0 R';});
  obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
  obj(2,'<< /Type /Pages /Kids ['+kids.join(' ')+'] /Count '+pages.length+' >>');
  pages.forEach(function(p,k){
    var a=3+k*3,cs='q 841.89 0 0 595.28 0 0 cm /Im0 Do Q';
    obj(a,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Im0 '+(a+1)+' 0 R >> >> /Contents '+(a+2)+' 0 R >>');
    xref[a+1]=off;add((a+1)+' 0 obj\n<< /Type /XObject /Subtype /Image /Width '+p.w+' /Height '+p.h+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+p.jpg.length+' >>\nstream\n');add(p.jpg);add('\nendstream\nendobj\n');
    obj(a+2,'<< /Length '+cs.length+' >>\nstream\n'+cs+'\nendstream');
  });
  var a=window.ATLAS_AUTEUR||{},inf=3+pages.length*3;
  obj(inf,'<< /Title '+pstr((a.titre||'Atlas')+' — cartes')+' /Author '+pstr('Nicolas BOUZA')+' /Subject '+pstr((a.long||'Nicolas BOUZA')+' — © 2026 Nicolas BOUZA — CC BY-NC-ND 4.0')+
    ' /Keywords '+pstr('Nicolas BOUZA; atlas; histoire; Nouvelle-Calédonie; CC BY-NC-ND 4.0')+' /Creator '+pstr((a.titre||'Atlas')+' — Nicolas BOUZA, avec l’assistance de Claude (Anthropic)')+' /Producer '+pstr('Atlas — Nicolas BOUZA')+' >>');
  var total=inf+1,xo=off,t='xref\n0 '+total+'\n0000000000 65535 f \n';
  for(i=1;i<total;i++)t+=('0000000000'+xref[i]).slice(-10)+' 00000 n \n';
  add(t+'trailer\n<< /Size '+total+' /Root 1 0 R /Info '+inf+' 0 R >>\nstartxref\n'+xo+'\n%%EOF\n');
  return new Blob(parts,{type:'application/pdf'});
}
var DL=null,elExp=$('expMsg'),elPrev=$('prev-ov'),exporting=false;
function expMsg(t){if(elExp)elExp.textContent=t||'';}
function slug(t){return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);}
function preview(cv,why){
  if(!elPrev)return;
  var im=$('prev-img');im.src=cv.toDataURL('image/jpeg',0.88);
  $('prev-txt').textContent=why||'Clic droit (ou appui long) sur l’image, puis « Enregistrer l’image » ou « Copier l’image ».';
  elPrev.hidden=false;
}
function save(name,blob,cv){
  /* hors de claude.ai (GitHub Pages, fichier local) : téléchargement classique du navigateur */
  if(!DL&&!window.claude){
    try{
      var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.style.display='none';
      document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove();},5000);
      expMsg('Fichier téléchargé : '+name);return Promise.resolve();
    }catch(e){}
  }
  if(!DL){preview(cv,'L’enregistrement direct n’est pas disponible dans cette vue. Clic droit (ou appui long) sur l’image, puis « Enregistrer l’image ». Pour obtenir le PDF, ouvre l’atlas dans claude.ai.');expMsg('');return Promise.resolve();}
  return DL.save({filename:name,data:blob}).then(function(){expMsg('Fichier enregistré : '+name);},function(e){
    var code=e&&e.code;
    if(code==='declined')expMsg('Enregistrement annulé.');
    else if(code==='rate_limited')expMsg('Une fenêtre d’enregistrement est déjà ouverte. Réessaie dans un instant.');
    else{expMsg('Enregistrement impossible ici.');preview(cv);}
  });
}
function doExport(kind){
  if(exporting)return;exporting=true;pause();hush();
  var ci=cur.ci,ch=CH[ci],base='atlas-'+VOL.id+'-'+(ci+1)+'-'+slug(ch.short);
  function done(){exporting=false;}
  try{
    if(kind==='png'){
      var m=signCanvas(mapCanvas(ci,{labels:opt.labels,current:true}));
      m.toBlob(function(b){save(base+'.png',b,m).then(done,done);},'image/png');return;
    }
    if(kind==='volet'){
      var pages=[],k=0,first=null;
      (function next(){
        if(k>=CH.length){expMsg('Assemblage du PDF…');var blob=buildPdf(pages);save('atlas-'+VOL.id+'-toutes-les-cartes.pdf',blob,first).then(done,done);return;}
        expMsg('Préparation de la carte '+(k+1)+' / '+CH.length+'…');
        setTimeout(function(){
          try{var pg=composePage(k,{kind:'lu',current:false});if(!first)first=pg;jpegBytes(pg).then(function(j){pages.push({jpg:j,w:pg.width,h:pg.height});k++;next();},function(){expMsg('Export impossible.');done();});}
          catch(e){expMsg('Export impossible.');done();}
        },30);
      })();return;
    }
    expMsg('Préparation de la carte…');
    var pg1=composePage(ci,{kind:kind,current:true});
    jpegBytes(pg1).then(function(j){var blob=buildPdf([{jpg:j,w:pg1.width,h:pg1.height}]);return save(base+(kind==='lu'?'':'-'+kind)+'.pdf',blob,pg1);}).then(done,function(){expMsg('Export impossible.');done();});
  }catch(e){expMsg('Export impossible.');done();}
}
[].forEach.call(document.querySelectorAll('[data-exp]'),function(b){b.addEventListener('click',function(){doExport(b.getAttribute('data-exp'));});});
if(elPrev)$('prev-close').addEventListener('click',function(){elPrev.hidden=true;$('prev-img').removeAttribute('src');});
(function(){var n=0;(function tryUse(){
  if(window.claude&&typeof window.claude.use==='function'){try{window.claude.use('downloads').then(function(d){DL=d||null;},function(){});}catch(e){}}
  else if(n++<60)setTimeout(tryUse,250);
})();})();
window.__page=function(ci,kind){var pg=composePage(ci,{kind:kind||'lu',current:false});return pg.toDataURL('image/jpeg',0.85);};
window.__pdf=function(kind){var pages=[],i=0;function nx(){if(i>=CH.length)return Promise.resolve();var pg=composePage(i,{kind:kind||'lu',current:false});return jpegBytes(pg).then(function(j){pages.push({jpg:j,w:pg.width,h:pg.height});i++;return nx();});}
  return nx().then(function(){return buildPdf(pages);}).then(function(b){return new Promise(function(res){var f=new FileReader();f.onload=function(){res(f.result);};f.readAsDataURL(b);});});};

/* ---------- API pour les fichiers de chapitres ---------- */
var A=window.ATLAS={CO:CO,r:r,L:L,Pu:Pu,Ph:Ph,Sh:Sh,Lz:Lz,Rg:Rg,
  K:{AFRICA:[[-5.9,35.8],[3,37],[10,37.3],[11,33],[20,32.5],[30,31.3],[32.5,30],[34,27],[37,21],[39,16],[43.1,12.6],[51.5,12.2],[51,10],[48,5],[41,-2],[40.5,-10],[36,-19],[35.5,-24.5],[32.8,-28],[28,-33.5],[20,-35],[17.8,-32],[12,-17],[13.5,-9],[9,-1],[9.5,4],[4,6],[-4,5],[-8,4.3],[-13,8],[-17,14.7],[-17,21],[-13,27.5],[-9.8,31.5]],
     TRI:[[-155.5,19.6],[-109.4,-27.1],[173.5,-40.5],[-155.5,19.6]]},
  add:function(v){var F=(window.FACILE||{})[v.id],Q=(window.QCM||{})[v.id],G=(window.GAL||{})[v.id];(v.chapters||[]).forEach(function(c,ci){if(G&&G[ci])c.gal=(c.gal||[]).concat(G[ci]);if(F&&F[ci])(c.ph||[]).forEach(function(p,k){if(F[ci][k])p.fa=F[ci][k];});if(Q&&Q[ci])c.qcm=Q[ci];});(v.chapters||[]).forEach(function(c){(c.routes||[]).forEach(function(rt,i){var k=c.sps&&c.sps[i];if(k){rt.sp=k;if(!rt.ship)rt.boat=true;}else if((rt.boat||rt.ship)&&!rt.sp&&c.sp)rt.sp=c.sp;});});sprMap(v);snapArrivals(v);VOLS.push(v);},
  redraw:function(){schedule();try{if(VOL)buildFiche();}catch(e){}},
  start:function(){
    sprLoad();syncOptUI();buildTabs();
    var i=voletFromHash(),deep=i>=0;
    if(i<0){try{var id=localStorage.getItem('atlas-hg-volet');VOLS.forEach(function(v,k){if(v.id===id)i=k;});if(i>=0)document.body.classList.add('started');}catch(e){}}
    if(i<0)i=0;
    VI=i;VOL=VOLS[i];CH=VOL.chapters;
    var want=opt.proj==='auto'?(VOL.proj||'globe'):opt.proj;setProj(want);
    buildVolet();setChapterUI();
    try{history.replaceState(null,'','#'+VOL.id);}catch(e){}
    new ResizeObserver(resize).observe(canvas);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){render();});
    resize();updateUI();
    var hb=$('homeBtn');if(hb)hb.addEventListener('click',openHome);
    var hx=$('homeX');if(hx)hx.addEventListener('click',function(){closeHome();});
    if(!deep&&$('home')){openHome();homeWas=false;return;}
    started=true;
    if(REDUCE)showStill();else play();
  }};
/* accès pour les activités élèves (activites.js) */
A.api={vol:function(){return VOL;},chs:function(){return CH;},ci:function(){return cur.ci;},canvas:function(){return canvas;},
  pt:function(lon,lat){if(hidden([lon,lat],1.42))return null;var q=projection([lon,lat]);return q&&isFinite(q[0])?q:null;},
  showEnd:function(pts){pause();hush();setTool('none');cur.t=CH[cur.ci].dur;flyFrom=null;setFree(pts&&pts.length>1?fitCam(pts):null);render();updateUI();},
  hideLabels:function(b){HIDELAB=!!b;render();},release:function(){HIDELAB=false;AVOID=null;setFree(null);render();},
  avoid:function(e){AVOID=e||null;render();},
  go:function(ci){go(ci,0,false);},camNow:function(){return {lon:camNow.lon,lat:camNow.lat,z:camNow.z};},cam:function(c){setFree(c);render();},hush:hush,
  /* mode enquête (enquete.js) : jouer le chapitre, image de la carte en fin de chapitre, volets */
  play:function(){go(cur.ci,0,true);},
  snapDoc:function(ci){return docCanvas(ci).toDataURL('image/jpeg',0.88);},stops:camStops,
  snap:function(ci,o){o=o||{};var dc=o.doc!==false?docCam(ci):null,cv=mapCanvas(ci,{labels:o.labels!==false,dark:o.dark!==false,doc:o.doc!==false,cam:dc||undefined});return cv.toDataURL('image/jpeg',0.86);},
  snapNames:function(){return SNAPN.slice();},
  vols:function(){return VOLS;},volet:function(i,ci){setVolet(i,ci||0,false);},
  /* carte « Tout en même temps » (simul.js) : quitter le menu d'entrée, enregistrer un PDF de pages-canevas (A4 paysage) */
  leaveHome:function(){started=true;closeHome(true);},
  pdf:function(name,cvs){return Promise.all(cvs.map(function(cv){return jpegBytes(cv).then(function(j){return {w:cv.width,h:cv.height,jpg:j};});})).then(function(pp){return save(name,buildPdf(pp),cvs[0]);});},
  colors:function(){return CO;}};
/* aides pour les tests */
window.__go=function(vi,ci,t,o){playing=false;flyFrom=null;if(o)Object.keys(o).forEach(function(k){opt[k]=o[k];});if(vi!==VI){VI=vi;VOL=VOLS[vi];CH=VOL.chapters;buildVolet();}cur.ci=ci;cur.t=t<0?CH[ci].dur:t;setFree(null);syncOptUI();setChapterUI();render();updateUI();return W+'x'+H+' '+projKind;};
window.__camNow=function(){return {lon:camNow.lon,lat:camNow.lat,z:camNow.z};};window.__camPath=function(vi,ci,T){window.__go(vi,ci-1,-1);flyFrom={lon:camNow.lon,lat:camNow.lat,z:camNow.z};cur.ci=ci;setProj(projKindFor(CH[ci]));var o=[],t;for(t=0;t<=T;t+=1/60){var c=camAt(ci,t);o.push([c.lon,c.lat,Math.log(c.z)]);}flyFrom=null;return o;};window.__tool=setTool;window.__cam=function(c){setFree(c);render();return 1;};
window.__bench=function(vi,ci,n){window.__go(vi,ci,0);var ch=CH[ci],ts=[],k,t0;n=n||60;for(k=0;k<n;k++){cur.t=ch.dur*k/n;t0=performance.now();render();ts.push(performance.now()-t0);}ts.sort(function(a,b){return a-b;});var s=0;ts.forEach(function(x){s+=x;});return {avg:+(s/n).toFixed(1),p90:+ts[Math.floor(n*0.9)].toFixed(1),max:+ts[n-1].toFixed(1)};};
window.__info=function(){return VOLS.map(function(v){return v.id+':'+v.chapters.map(function(c){return Math.round(c.dur);}).join(',');});};
window.__hits=function(vid,ci,ri){var v=VOLS.filter(function(x){return x.id===vid;})[0],rt=v.chapters[ci].routes[ri],o=[],last=-9;rt.pts.forEach(function(p,k){for(var j=0;j<LP.length;j++){if(d3.geoDistance(p,LINFO[j].c)>LINFO[j].r+0.01)continue;if(d3.geoContains({type:'Polygon',coordinates:LP[j]},p)){if(k-last>1)o.push('|');o.push(p.map(function(x){return +x.toFixed(2);}).join(','));last=k;break;}}});return o.join(' ');};
window.__check=function(){
  var out=[];
  VOLS.forEach(function(v){v.chapters.forEach(function(ch,ci){(ch.routes||[]).forEach(function(rt,ri){
    if(!rt.sea)return;
    var hits=[];rt.pts.forEach(function(p,k){
      var on=false;for(var j=0;j<LP.length;j++){if(d3.geoDistance(p,LINFO[j].c)>LINFO[j].r+0.01)continue;if(d3.geoContains({type:'Polygon',coordinates:LP[j]},p)){on=true;break;}}
      if(on)hits.push(k);
    });
    if(hits.length){var ex=[hits[0],hits[Math.floor(hits.length/2)],hits[hits.length-1]].map(function(h){return rt.pts[h].map(function(x){return +x.toFixed(1);}).join(',');});
      out.push(v.id+' ch'+(ci+1)+' r'+ri+' : '+hits.length+'/'+rt.pts.length+' pts sur terre, ex. '+ex.join(' | '));}
  });});});
  return out;
};
})();
