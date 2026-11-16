/* Planche de contrôle : renvoie les images de la carte pour une liste [volet, chapitre, instant]. Utiliser avec OUT=fichier.json */
ATLAS.api.leaveHome&&ATLAS.api.leaveHome();
var V=ATLAS.api.vols(),out=[];
for(const [id,ci,t] of window.__LISTE){
  var vi=V.findIndex(function(v){return v.id===id;});ATLAS.api.volet(vi,ci);
  window.__go(vi,ci,t<0?V[vi].chapters[ci].dur:t);await new Promise(function(r){setTimeout(r,500);});
  out.push([id,ci,t,V[vi].chapters[ci].short,ATLAS.api.canvas().toDataURL('image/jpeg',0.8)]);
}
return out;
