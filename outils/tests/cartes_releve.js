/* relevé déterministe : textes réellement dessinés sur la carte-document de chaque chapitre (la planche montrée dans l'enquête,
   à l'écran comme dans les dossiers PDF et Word) + pages « carte » des enquêtes. Résultat à passer à valider_cartes.js. */
var out={},vols=ATLAS.api.vols(),P=CanvasRenderingContext2D.prototype,ft=P.fillText,bag=null;
P.fillText=function(t){if(bag)bag.push(String(t));return ft.apply(this,arguments);};
for(var vi=0;vi<vols.length;vi++){var v=vols[vi],E=(window.ENQ||{})[v.id]||[];out[v.id]=[];
  for(var ci=0;ci<v.chapters.length;ci++){
    ATLAS.api.volet(vi,ci);await new Promise(r=>setTimeout(r,120));
    var ch=ATLAS.api.chs()[ci];bag=[];try{ATLAS.api.snapDoc(ci);}catch(e){bag.push('ERR '+e);}var drawn=bag;bag=null;
    var lg=(ch.legend||[]).map(l=>[l[0],l[1],l[2]||'']);
    var rts=(ch.routes||[]).map(r=>({col:r.col,sea:!!(r.boat||r.ship),sp:r.sp||'',dash:!!r.dash,a:r.pts[0].map(x=>+x.toFixed(1)),b:r.pts[r.pts.length-1].map(x=>+x.toFixed(1))}));
    var e=E[ci],pages=[];
    if(e)e.pg.forEach(function(p,pi){var ds=Array.isArray(p.d)?p.d:[p.d];var m=ds.filter(d=>d&&d.k==='map')[0];
      pages.push({pi:pi,t:p.t,map:m?(m.cap||'(sans légende)'):null,docs:ds.map(d=>d.k+(d.id?':'+d.id:'')),p:m?p.p:undefined,c:m?p.c:undefined,i:m?p.i:undefined});});
    out[v.id].push({ci:ci,short:ch.short,dates:ch.dates||'',drawn:drawn,labels:(ch.labels||[]).map(l=>l.text),legend:lg,routes:rts,nz:(ch.zones||[]).length,eras:(ch.ph||[]).map(x=>x.era),enq:e?{q:e.q,pages:pages}:null});
  }}
P.fillText=ft;return out;
