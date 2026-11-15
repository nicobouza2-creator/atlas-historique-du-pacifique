"""Planche de contrôle visuelle : python3 planche.py sortie.jpg 'geonc:3:31' 'nickel:0:-1' …  (-1 = fin du chapitre)"""
import sys, os, json, base64, io, subprocess
from PIL import Image, ImageDraw
here = os.path.dirname(os.path.abspath(__file__))
liste = [[a.split(':')[0], int(a.split(':')[1]), float(a.split(':')[2])] for a in sys.argv[2:]]
js = 'window.__LISTE=' + json.dumps(liste) + ';' + open(os.path.join(here, 'planche.js'), encoding='utf-8').read()
env = dict(os.environ, OUT='/tmp/_planche.json')
subprocess.run([sys.executable, os.path.join(here, 'run.py'), '', '-', '1366', '768'], input=js, text=True, env=env, check=True, stdout=subprocess.DEVNULL)
R = json.load(open('/tmp/_planche.json'))
ims = []
for vol, ci, t, short, u in R:
    im = Image.open(io.BytesIO(base64.b64decode(u.split(',', 1)[1]))).convert('RGB'); im.thumbnail((520, 520))
    c = Image.new('RGB', (im.width, im.height + 26), (20, 24, 32)); c.paste(im, (0, 26))
    ImageDraw.Draw(c).text((6, 6), '%s %d t=%s · %s' % (vol, ci, t, short[:48]), fill=(240, 240, 240)); ims.append(c)
cols = 3; w = max(i.width for i in ims); h = max(i.height for i in ims); rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * w, rows * h), (10, 12, 16))
for k, i in enumerate(ims): sheet.paste(i, ((k % cols) * w, (k // cols) * h))
sheet.save(sys.argv[1], quality=82); print(sys.argv[1], len(ims), 'cartes')
