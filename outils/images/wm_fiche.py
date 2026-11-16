# Wikimedia Commons sans l'API de recherche : pour chaque nom exact, lit la fiche (action=raw) et affiche licence, auteur, date.
# Usage : wm_fiche.py "Nom.jpg" ...   (pause entre deux requêtes)
import sys, re, time, urllib.request, urllib.parse
UA = {'User-Agent': 'atlas-classe/1.0 (usage scolaire; github nicobouza2-creator/atlas-historique-du-pacifique)'}
for n in sys.argv[1:]:
    u = 'https://commons.wikimedia.org/w/index.php?' + urllib.parse.urlencode({'title': 'File:' + n.replace(' ', '_'), 'action': 'raw'})
    try:
        t = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read().decode('utf8', 'replace')
        lic = sorted(set(m.group(1).strip() for m in re.finditer(r'\{\{\s*(PD[^}|\n]*|[Cc]c-[^}|\n]*|CC-[^}|\n]*|BArch-[A-Za-z]+|[Ss]elf\|[^}\n]*|FAL|Attribution[^}|\n]*|Kremlin[^}|\n]*|GFDL[^}|\n]*)', t)))
        g = lambda k: (re.search(r'\|\s*%s\s*=\s*(.+)' % k, t, re.I) or [None, ''])[1][:90]
        print('OK ', n, '|', ';'.join(lic)[:110], '|', g('author') or g('photographer'), '|', g('date'))
    except Exception as e:
        print('NON', n, '|', getattr(e, 'code', e))
    time.sleep(2.5)
