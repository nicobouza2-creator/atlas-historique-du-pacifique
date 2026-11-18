/* Contrôle « exercices sur carte » : pour chaque page d'enquête qui montre la carte de l'atlas, la réponse attendue se lit-elle sur la carte ?
   1) relevé (textes réellement dessinés sur la carte-document) :
        D3=<d3.min.js> OUT=ecole.json   python3 run.py '' cartes_releve.js
        D3=<d3.min.js> OUT=college.json PAGE=college.html python3 run.py '' cartes_releve.js
   2) node valider_cartes.js <dépôt> ecole.json college.json [rapport.md]
   ZOOM = lisible dans le dossier papier (zooms numérotés) mais pas sur la carte montrée à l'écran.
   OK = tous les noms propres et nombres de la réponse sont sur la carte ; PART = une partie ; HORS = aucun ; ? = rien à vérifier (question de réflexion).
   C'est un tri, pas un verdict : une page mixte (carte + photo, tableau, frise) peut poser des questions sur l'autre document.
   À corriger en priorité : les pages dont AUCUNE question « école » ou « collège » ne se lit sur la carte, et les couleurs de tracé sans légende. */
const fs=require('fs'),REPO=process.argv[2],D=Object.assign({},...process.argv.slice(3).filter(f=>/\.json$/.test(f)).map(f=>JSON.parse(fs.readFileSync(f)))),OUT=process.argv.slice(3).filter(f=>/\.md$/.test(f))[0];
const CO=eval('('+fs.readFileSync(REPO+'/js/engine.js','utf8').match(/var CO=(\{[^}]*\})/)[1]+')');
const norm=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[’'`]/g,"'").replace(/[  ]/g,' ').toLowerCase();
const STOP=new Set('le la les un une des du de dans sur parce car oui non il elle ils elles on en au aux a et ou par pour avec sans vers depuis entre plus moins tres qui que quoi ou ce cette ces son sa ses leur leurs c est sont ont pas ne se si comme environ pres avant apres pendant c\'est aucun aucune tous toutes tout chaque deux trois quatre cinq six dix vrai faux carte'.split(' '));
function toks(s){s=String(s);const out=[];
  (s.match(/\d[\d   ]*\d|\d/g)||[]).forEach(n=>out.push(n.replace(/[  ]/g,' ').trim()));
  (s.match(/[A-ZÀ-ÖØ-Þ][A-Za-zÀ-ÖØ-öø-ÿ’'-]{2,}/g)||[]).forEach(w=>{const n=norm(w).replace(/^(l'|d')/,'');if(!STOP.has(n)&&n.length>2)out.push(w.replace(/^(L|D|l|d)[’']/,''));});
  return [...new Set(out)];}
function ans(q){switch(q.k){case 'qcm':return [q.a[0]];case 'vf':return [q.q];case 'ordre':return q.a;case 'relie':return q.a.map(x=>x.join(' ')) ;case 'trou':return [q.q.replace(/\[|\]/g,'')];case 'libre':return [q.m];}return [];}
let rep=[],stat={pages:0,q:0,ok:0,zoom:0,part:0,none:0,nokey:0},zoom=[],orph=[],legIssues=[],sea=0,tot=0,vides=[];
for(const v in D)D[v].forEach(ch=>{
  const bag=norm(ch.drawn.join(' | ')),scr=norm((ch.ecran||ch.drawn).concat(ch.legend.map(l=>l[1]),[ch.short,ch.dates]).join(' | '));
  tot+=ch.routes.length;sea+=ch.routes.filter(r=>r.sea).length;
  const lc=new Set(ch.legend.map(l=>CO[l[0]]||l[0]));const miss=[...new Set(ch.routes.map(r=>r.col))].filter(c=>!lc.has(c));
  if(ch.routes.length&&miss.length)legIssues.push(`${v}-${ch.ci}: ${ch.routes.length} tracés, ${new Set(ch.routes.map(r=>r.col)).size} couleurs, ${ch.legend.length} entrées de légende, couleurs sans légende: ${miss.join(',')}`);
  if(!ch.enq)return;const mp=ch.enq.pages.filter(p=>p.map);
  if(!mp.length){orph.push(`${v}-${ch.ci} « ${ch.short} » (${ch.enq.pages.length} p., tracés ${ch.routes.length})`);return;}
  mp.forEach(p=>{stat.pages++;const lu={p:0,c:0};rep.push(`\n## ${v}-${ch.ci} p${p.pi} « ${p.t} » — ${ch.short} ${ch.dates?'('+ch.dates+')':''}`);
    ['p','c'].forEach(lv=>(p[lv]||[]).forEach(q=>{stat.q++;const A=ans(q),T=[...new Set(A.flatMap(toks))];const M=T.filter(t=>!bag.includes(norm(t)));
      let st=!T.length?'?':M.length===0?'OK':M.length===T.length?'HORS':'PART';const Z=T.filter(t=>bag.includes(norm(t))&&!scr.includes(norm(t)));if(st==='OK'&&Z.length){st='ZOOM';zoom.push(`${v}-${ch.ci} p${p.pi} ${lv.toUpperCase()} « ${q.q.slice(0,70)} » : ${Z.join(', ')}`);}if(st==='OK'||st==='PART'||st==='ZOOM')lu[lv]++;stat[{OK:'ok',ZOOM:'zoom',PART:'part',HORS:'none','?':'nokey'}[st]]++;
      rep.push(`${st} ${lv.toUpperCase()} ${q.k}: ${q.q}${q.k==='qcm'?' → '+q.a[0]+' ‖ '+q.a.slice(1).join(' / '):q.k==='vf'?' → '+(q.a?'V':'F'):q.k==='ordre'?' → '+q.a.join(' > '):q.k==='relie'?' → '+q.a.map(x=>x.join('=')).join(' ; '):q.k==='libre'?' → '+q.m:''}${M.length?'  ⟦absent: '+M.join(', ')+'⟧':''}`);}));
    if(!lu.p||!lu.c)vides.push(`${v}-${ch.ci} p${p.pi} « ${p.t} »${p.docs.length>1?' (page mixte : '+p.docs.join('+')+')':''} : aucune question ${!lu.p?'école':''}${!lu.p&&!lu.c?' ni ':''}${!lu.c?'collège':''} lisible sur la carte`);});
});
if(OUT)fs.writeFileSync(OUT,rep.join('\n'));
console.log(JSON.stringify(stat),'| tracés',tot,'mer',sea);console.log('\nENQUÊTES SANS PAGE CARTE',orph.length,'\n'+orph.join('\n'));console.log('\nCOULEURS DE TRACÉ SANS LÉGENDE',legIssues.length,'\n'+legIssues.join('\n'));console.log('\nRÉPONSES LISIBLES SUR UN ZOOM DU DOSSIER PAPIER MAIS PAS SUR LA CARTE À L’ÉCRAN',zoom.length,'\n'+zoom.join('\n'));console.log('\nPAGES CARTE SANS QUESTION LISIBLE SUR LA CARTE',vides.length,'\n'+vides.join('\n'));
console.log('chapitres',Object.keys(D).map(v=>v+':'+D[v].length).join(' '));
