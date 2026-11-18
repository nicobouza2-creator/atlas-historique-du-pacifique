/* node legende_rapport.js <depot> leg-ecole.json [leg-college.json] : légendes sans élément dessiné / éléments sans légende */
const fs=require('fs'),REPO=process.argv[2],D=Object.assign({},...process.argv.slice(3).map(f=>JSON.parse(fs.readFileSync(f))));
const CO=eval('('+fs.readFileSync(REPO+'/js/engine.js','utf8').match(/var CO=(\{[^}]*\})/)[1]+')');
const SY=eval('('+fs.readFileSync(REPO+'/js/engine.js','utf8').match(/var SYMS=(\{[^}]*\})/)[1]+')');
const R=c=>String(CO[c]||c).toLowerCase();
let A=[],B=[],n=0;
for(const v in D)D[v].forEach(ch=>{n++;
  const lc=new Set(ch.legend.filter(l=>!SY[l[2]]).map(l=>R(l[0])));
  const lsym=new Set(ch.legend.filter(l=>SY[l[2]]).map(l=>l[2]));
  const pc={},zc={},rc={},rd={};for(const k in (ch.pc||{}))pc[R(k)]=1;for(const k in ch.zc)zc[R(k)]=1;for(const k in ch.rc)rc[R(k)]=1;for(const k in ch.rdash)rd[R(k)]=1;
  ch.legend.forEach(l=>{
    if(SY[l[2]]){if(!ch.marks[l[2]])A.push(`${v}-${ch.ci} « ${ch.short} » : légende « ${l[1]} » (symbole ${l[2]}) mais aucun symbole ${l[2]} sur la carte`);return;}
    const c=R(l[0]);
    if(l[2]===true||l[2]==='dash'){if(!rd[c]&&!rc[c]&&!zc[c]&&!pc[c])A.push(`${v}-${ch.ci} « ${ch.short} » : légende « ${l[1]} » (pointillé) sans tracé de cette couleur`);return;}
    if(!zc[c]&&!rc[c]&&!pc[c])A.push(`${v}-${ch.ci} « ${ch.short} » : légende « ${l[1]} » sans zone ni tracé de cette couleur (${c})`);
  });
  const miss=[...new Set([...Object.keys(zc),...Object.keys(rc)])].filter(c=>!lc.has(c));
  if(ch.legend.length&&miss.length)B.push(`${v}-${ch.ci} « ${ch.short} » : couleurs dessinées sans légende : ${miss.join(', ')} (zones ${Object.keys(zc).filter(c=>miss.includes(c)).length}, tracés ${Object.keys(rc).filter(c=>miss.includes(c)).length})`);
  const ms=Object.keys(ch.marks).filter(m=>SY[m]&&m!=='ville'&&!lsym.has(m));
  if(ch.legend.length&&ms.length)B.push(`${v}-${ch.ci} « ${ch.short} » : symboles dessinés sans légende : ${ms.join(', ')}`);
  if(!ch.legend.length&&(Object.keys(zc).length||Object.keys(rc).length))B.push(`${v}-${ch.ci} « ${ch.short} » : AUCUNE légende alors que ${Object.keys(zc).length} couleurs de zone et ${Object.keys(rc).length} de tracé sont dessinées`);
});
console.log('chapitres',n,'\n\nLÉGENDE SANS ÉLÉMENT',A.length,'\n'+A.join('\n'),'\n\nÉLÉMENT SANS LÉGENDE',B.length,'\n'+B.join('\n'));
