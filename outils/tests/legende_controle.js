/* Contrôle « légende / image » : pour chaque chapitre, chaque entrée de légende correspond-elle à quelque chose de dessiné
   (zone, tracé, symbole), et chaque couleur ou symbole dessiné a-t-il une entrée ? Résultat JSON à passer à legende_rapport.js.
   D3=<d3.min.js> OUT=leg-ecole.json python3 run.py '' legende_controle.js   (idem PAGE=college.html) */
var CO=ATLAS.CO,out={},vols=ATLAS.api.vols();
function ncol(c){return String(c||'').toLowerCase();}
for(var vi=0;vi<vols.length;vi++){var v=vols[vi];out[v.id]=[];
  for(var ci=0;ci<v.chapters.length;ci++){
    ATLAS.api.volet(vi,ci);await new Promise(r=>setTimeout(r,60));
    var ch=ATLAS.api.chs()[ci];
    var zc={},rc={},rdash={},marks={},sprites=0;
    (ch.zones||[]).forEach(z=>{var c=z.col;if(c)zc[c]=(zc[c]||0)+1;});
    (ch.routes||[]).forEach(r=>{rc[r.col]=(rc[r.col]||0)+1;if(r.dash)rdash[r.col]=1;});
    (ch.labels||[]).forEach(l=>{var m=l.mark||(l.nomark?'none':'dot');marks[m]=(marks[m]||0)+1;});
    out[v.id].push({ci:ci,short:ch.short,legend:(ch.legend||[]).map(l=>[l[0],l[1],l[2]===undefined?'':l[2]]),zc:zc,rc:rc,rdash:rdash,marks:marks});
  }}
return out;
