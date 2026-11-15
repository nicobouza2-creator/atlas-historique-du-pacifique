# Exporte data.json (chapitres + enquêtes + IMG) et les cartes claires de fin de chapitre (tous les volets si aucun n'est donné).
import sys, json, base64, subprocess, time
from playwright.sync_api import sync_playwright
repo=sys.argv[1]; vols=sys.argv[2:]; OUT='/home/claude/dossiers/'
srv=subprocess.Popen(['python3','-m','http.server','8765'],cwd=repo,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':1400,'height':950})
    pg.route('**/d3.min.js', lambda r: r.fulfill(path='/home/claude/tools/d3.min.js'))
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(2500)
    ids=pg.evaluate('ATLAS.api.vols().map(v=>v.id)'); vols=vols or ids
    D=pg.evaluate('''(vols)=>{var V={};ATLAS.api.vols().forEach(v=>{if(vols.indexOf(v.id)<0)return;
      V[v.id]={title:v.title,chapters:v.chapters.map(c=>({short:c.short,dates:c.dates,ph:(c.ph||[]).map(x=>({era:x.era,txt:x.txt})),mots:c.mots||[]})),enq:ENQ[v.id]};});
      return {vols:V,IMG:window.IMG};}''',vols)
    json.dump(D,open(OUT+'data.json','w'),ensure_ascii=False)
    for v in vols:
        vi=ids.index(v)
        for ci in range(len(D['vols'][v]['enq'])):
            pg.evaluate(f'ATLAS.api.volet({vi},{ci})'); pg.wait_for_timeout(300)
            url=pg.evaluate(f'ATLAS.api.snap({ci},{{dark:false}})')
            open(OUT+f'cartes/{v}-{ci}.jpg','wb').write(base64.b64decode(url.split(',',1)[1]))
    b.close()
srv.terminate(); print('ok', {v:len(D['vols'][v]['enq']) for v in vols})
