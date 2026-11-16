# Library of Congress : pour chaque "clé|requête|fragment du chemin image", retrouve la notice, note droits/titre/auteur/date
# et télécharge l'image (version 1024 px si elle existe). Résultat : brut/<clé>.jpg + brut/loc.json
import sys, json, time, urllib.request, urllib.parse, os
UA = {'User-Agent': 'atlas-classe/1.0 (usage scolaire)'}
def get(u, raw=False):
    for i in range(3):
        try:
            d = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=60).read()
            return d if raw else json.loads(d)
        except Exception as e:
            err = e; time.sleep(8)
    raise err
out = json.load(open('brut/loc.json')) if os.path.exists('brut/loc.json') else {}
for line in open(sys.argv[1], encoding='utf8'):
    line = line.strip()
    if not line or line.startswith('#'): continue
    key, q, frag = line.split('|')
    if key in out and os.path.exists('brut/%s.jpg' % key): continue
    try:
        d = get('https://www.loc.gov/pictures/search/?' + urllib.parse.urlencode({'q': q, 'fo': 'json', 'c': 40}))
        r = next(x for x in d['results'] if frag in ((x.get('image') or {}).get('full') or ''))
        full = r['image']['full']; full = ('https:' + full) if full.startswith('//') else full
        item = r['links']['item']; item = ('https:' + item) if item.startswith('//') else item
        time.sleep(1.5); it = get(item + ('&' if '?' in item else '?') + 'fo=json')['item']
        base = full.replace('_150px.jpg', '').replace('r.jpg', '') if full.endswith(('r.jpg', '_150px.jpg')) else None
        data = None
        for u in ([base + 'v.jpg', base + 'r.jpg'] if base else [full]):
            try: time.sleep(1.5); data = get(u, raw=True); src = u; break
            except Exception: continue
        open('brut/%s.jpg' % key, 'wb').write(data)
        out[key] = {'title': it.get('title'), 'date': it.get('date') or it.get('created_published_date'), 'creators': [c.get('title') for c in (it.get('creators') or [])], 'rights': it.get('rights_information'), 'adv': it.get('rights_advisory'), 'page': item, 'src': src, 'medium': it.get('medium')}
        print('OK ', key, len(data), '|', (out[key]['rights'] or out[key]['adv'] or '?')[:60], '|', (it.get('title') or '')[:70])
    except StopIteration: print('INTROUVABLE', key, frag)
    except Exception as e: print('ERR', key, str(e)[:80])
    json.dump(out, open('brut/loc.json', 'w'), ensure_ascii=False, indent=1); time.sleep(1.5)
print('FIN')
