import subprocess,time,sys,hashlib
from playwright.sync_api import sync_playwright
srv=subprocess.Popen(['python3','-m','http.server','8765'],cwd='/home/claude/repo',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1)
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox']); pg=b.new_page(viewport={'width':1400,'height':950},accept_downloads=True)
    pg.route('**/d3.min.js', lambda r: r.fulfill(path='/home/claude/tools/d3.min.js'))
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8765/index.html'); pg.wait_for_timeout(2500)
    ids=pg.evaluate('ATLAS.api.vols().map(v=>v.id)')
    for vol,ci in (('decouvertes',6),('mondial',10),('geonc',2)):
        vi=ids.index(vol); pg.evaluate(f'ATLAS.api.volet({vi},{ci})'); pg.wait_for_timeout(300); pg.evaluate(f'__enq({ci})'); pg.wait_for_timeout(500)
        for kind in ('Word','PDF'):
            with pg.expect_download() as dl: pg.evaluate("[...document.querySelectorAll('.enq-box button')].find(b=>/%s/.test(b.textContent)).click()"%kind)
            dl.value.save_as('/tmp/t.bin'); ext='docx' if kind=='Word' else 'pdf'
            ok=open('/tmp/t.bin','rb').read()==open('/home/claude/repo/%s/%s-%02d.%s'%(ext,vol,ci+1,ext),'rb').read()
            print(vol,ci,kind,dl.value.suggested_filename,'identique' if ok else 'DIFFERENT')
        pg.evaluate('__enqClose()'); pg.wait_for_timeout(200)
    b.close()
srv.terminate(); print('erreurs JS :', errs)
