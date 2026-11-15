"""Wikimedia Commons : python3 wm.py search "mots" | info Nom_fichier | get Nom_fichier sortie.jpg [500|960]"""
import sys, re, html, hashlib, subprocess, time, urllib.parse
UA = 'AtlasHG/1.0 (classe; nico.edu)'
def curl(url, out=None):
    cmd = ['curl', '-s', '-L', '-m', '40', '-A', UA, url] + (['-o', out, '-w', '%{http_code}'] if out else [])
    return subprocess.run(cmd, capture_output=True).stdout.decode('utf-8', 'replace')
def search(q):
    s = curl('https://commons.wikimedia.org/w/index.php?search=' + urllib.parse.quote_plus(q) + '&ns6=1&fulltext=1&limit=15')
    seen = []
    for f in re.findall(r'href="/wiki/File:([^"]+)"', s):
        f = urllib.parse.unquote(f)
        if f not in seen and not f.lower().endswith(('.pdf', '.djvu', '.ogg', '.webm', '.tif', '.tiff')): seen.append(f)
    return seen[:10]
def info(name):
    s = curl('https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(name))
    lic = sorted(set(m.strip() for m in re.findall(r'licensetpl_short[^>]*>([^<]+)<', s)))
    if not lic:
        lic = sorted(set(re.findall(r'(Public domain|domaine public|CC0|CC[- ]BY(?:-SA)?[- ]\d\.\d|PD-[A-Za-z0-9-]+)', s)))[:4]
    def row(k, n=300):
        i = s.find('>' + k)
        if i < 0: return ''
        t = re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', s[i + 1:i + 1500])))
        t = t[len(k):]
        for stop in [' Date ', ' Source ', ' Author ', ' Licensing', ' Permission', ' Other versions', ' Camera location']:
            j = t.find(stop)
            if j > 0: t = t[:j]
        return t.strip()[:n]
    aut, d, dt = row('Author', 120), row('Description', 220), row('Date', 60)
    return {'lic': lic, 'aut': aut, 'date': dt, 'desc': d}
def get(name, out, w=500):
    n = name.replace(' ', '_'); h = hashlib.md5(n.encode('utf-8')).hexdigest()
    q = urllib.parse.quote(n)
    url = f'https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{w}px-{q}'
    if n.lower().endswith('.svg'): url += '.png'
    for k in range(4):
        code = curl(url, out)
        if code == '200': return 'ok ' + url
        if code == '429': time.sleep(15 + 5 * k); continue
        if code in ('400', '404') and w != 960:  # image plus petite que 500 px : original
            code = curl(f'https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{q}', out)
            if code == '200': return 'ok original'
        return 'ERR ' + code
    return 'ERR 429'
if __name__ == '__main__':
    c = sys.argv[1]
    if c == 'search': print('\n'.join(search(sys.argv[2])))
    elif c == 'info': print(info(sys.argv[2]))
    elif c == 'get': print(get(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 500))
