# Dossiers d'enquête en Word (.docx, modifiables) — même contenu et même numérotation que les PDF.
# Entrées : /home/claude/dossiers/data.json (export.py), extras.json (extract_extras.py), cartes/<volet>-<ci>.jpg ; images dans le dépôt.
# Usage : python3 gen_docx.py [volet [index]]
import json, sys, os, re, zlib, random
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from PIL import Image

REPO = '/home/claude/repo/'; DOS = '/home/claude/dossiers/'; OUT = DOS + 'docx/'; os.makedirs(OUT, exist_ok=True)
HIST = {'pacifique', 'caledonie', 'monde', 'decouvertes'}   # volets d’histoire : « historiques », méthode du témoin
METH = {True: ['Qui l’a fait ? (un témoin, un savant, un voyageur, l’atlas…)', 'Quand ? (au moment des faits, ou bien plus tard ?)', 'Qu’est-ce que c’est ? (photo, carte, texte, tableau, objet…)', 'Pour quoi faire ? (raconter, expliquer, convaincre, garder une trace…)'],
        False: ['Qui l’a fait ? (un témoin, un savant, un organisme officiel, l’atlas…)', 'Quand ? (au moment des faits, ou bien plus tard ?)', 'Qu’est-ce que c’est ? (photo, carte, texte, tableau, graphique…)', 'Pour quoi faire ? (raconter, expliquer, informer, convaincre…)']}
D = json.load(open(DOS + 'data.json')); IMG = D['IMG']; X = json.load(open(DOS + 'extras.json'))
PREFIX = {'pacifique': 'P', 'caledonie': 'NC', 'monde': 'PT', 'decouvertes': 'GD', 'geonc': 'GNC', 'nickel': 'NI', 'mondial': 'MO', 'emc': 'EMC'}
INK, BROWN, RED, MUTED = RGBColor(0x1b, 0x24, 0x30), RGBColor(0x6b, 0x41, 0x00), RGBColor(0xb3, 0x26, 0x1e), RGBColor(0x5b, 0x64, 0x70)
FONT = 'Arial'; KFONT = {'carnet': ('Segoe Print', False, 11), 'lettre': ('Georgia', True, 12), 'tapuscrit': ('Courier New', False, 11), 'officiel': ('Courier New', False, 11)}
EMO = re.compile('[\U0001F000-\U0001FAFF⌀-➿⬀-⯿️‍]')
def clean(t): return EMO.sub('', str(t)).replace(' ', ' ').strip()
def rng(key): return random.Random(zlib.crc32(key.encode('utf-8')))
BOX = '☐'

def code_of(vol, ci, pdf_code=None): return pdf_code or PREFIX.get(vol, 'X') + '-%02d' % (ci + 1)
def shade(cell, fill):
    tc = cell._tc.get_or_add_tcPr(); s = OxmlElement('w:shd'); s.set(qn('w:val'), 'clear'); s.set(qn('w:color'), 'auto'); s.set(qn('w:fill'), fill); tc.append(s)
def borders(table, color='C9B88F', sz=6):
    tb = table._tbl.tblPr; b = OxmlElement('w:tblBorders')
    for side in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        e = OxmlElement('w:' + side); e.set(qn('w:val'), 'single'); e.set(qn('w:sz'), str(sz)); e.set(qn('w:color'), color); b.append(e)
    tb.append(b)
def rule(p, color='B8C2CC'):
    pPr = p._p.get_or_add_pPr(); b = OxmlElement('w:pBdr'); e = OxmlElement('w:bottom')
    e.set(qn('w:val'), 'single'); e.set(qn('w:sz'), '6'); e.set(qn('w:space'), '1'); e.set(qn('w:color'), color); b.append(e); pPr.append(b)
def keep(p): p.paragraph_format.keep_with_next = True; return p
def field(run, instr):
    for t, v in (('begin', None), (None, instr), ('end', None)):
        if t: e = OxmlElement('w:fldChar'); e.set(qn('w:fldCharType'), t)
        else: e = OxmlElement('w:instrText'); e.set(qn('xml:space'), 'preserve'); e.text = v
        run._r.append(e)
def cant_split(row):
    trPr = row._tr.get_or_add_trPr(); e = OxmlElement('w:cantSplit'); e.set(qn('w:val'), 'true'); trPr.append(e)
def tight(t, together=True):
    rows = t.rows
    for k, r in enumerate(rows):
        cant_split(r)
        for c in r.cells:
            for p in c.paragraphs:
                p.paragraph_format.space_after = Pt(1); p.paragraph_format.line_spacing = 1.05
                if together and k < len(rows) - 1: p.paragraph_format.keep_with_next = True
def repeat_header(row):
    trPr = row._tr.get_or_add_trPr(); e = OxmlElement('w:tblHeader'); e.set(qn('w:val'), 'true'); trPr.append(e)

class Doc:
    def __init__(s, vol, ci):
        s.vol, s.ci = vol, ci; s.ch = D['vols'][vol]['chapters'][ci]; s.e = D['vols'][vol]['enq'][ci]; s.ex = X['%s-%d' % (vol, ci)]
        s.code = s.pdf_code() or code_of(vol, ci); s.d = Document(); s.setup()
    def pdf_code(s):
        try:
            import fitz; t = fitz.open(REPO + 'pdf/%s-%02d.pdf' % (s.vol, s.ci + 1)).metadata.get('title', '')
            m = re.search(r'enquête (\S+) ·', t); return m.group(1) if m else None
        except Exception: return None
    def setup(s):
        d = s.d; sec = d.sections[0]; sec.page_width, sec.page_height = Cm(21), Cm(29.7)
        for a in ('left_margin', 'right_margin'): setattr(sec, a, Cm(1.9))
        sec.top_margin, sec.bottom_margin = Cm(1.8), Cm(1.6)
        st = d.styles['Normal']; st.font.name = FONT; st.font.size = Pt(12); st.font.color.rgb = INK
        st.element.rPr.rFonts.set(qn('w:eastAsia'), FONT); st.paragraph_format.space_after = Pt(4); st.paragraph_format.line_spacing = 1.2
        for n, sz, col in (('Title', 24, INK), ('Heading 1', 18, INK), ('Heading 2', 14, BROWN), ('Heading 3', 12.5, BROWN)):
            h = d.styles[n]; h.font.name = FONT; h.font.size = Pt(sz); h.font.bold = True; h.font.color.rgb = col; h.font.italic = False
            rf = h.element.rPr.rFonts; [rf.set(qn('w:' + a), FONT) for a in ('ascii', 'hAnsi', 'eastAsia', 'cs')]
            h.paragraph_format.space_before = Pt(10); h.paragraph_format.space_after = Pt(4); h.paragraph_format.keep_with_next = True
        sec.different_first_page_header_footer = True
        f = sec.footer.paragraphs[0]; r = f.add_run('Dossier d’enquête %s · %s · Atlas historique du Pacifique        page ' % (s.code, clean(s.ch['short'])))
        r2 = f.add_run(); field(r2, 'PAGE'); f.add_run(' / '); r3 = f.add_run(); field(r3, 'NUMPAGES')
        for x in f.runs: x.font.size = Pt(8.5); x.font.color.rgb = MUTED
        d.core_properties.title = 'Dossier d’enquête %s · %s' % (s.code, clean(s.ch['short'])); d.core_properties.author = 'Atlas historique du Pacifique'
    # ---------- briques ----------
    def p(s, text='', size=None, bold=False, italic=False, color=None, align=None, font=None, after=None, indent=None):
        p = s._pb(s.d.add_paragraph())
        if text: s.run(p, text, size, bold, italic, color, font)
        if align: p.alignment = align
        if after is not None: p.paragraph_format.space_after = Pt(after)
        if indent: p.paragraph_format.left_indent = Cm(indent)
        return p
    def run(s, p, text, size=None, bold=False, italic=False, color=None, font=None):
        parts = re.split('(☐)', EMO.sub('', str(text)).replace(' ', ' '))
        for x in parts[:-1]:
            if x == '☐': s.run(p, '☐', size, bold, italic, color, 'Segoe UI Symbol')
            elif x: s.run(p, x, size, bold, italic, color, font)
        text = parts[-1]
        r = p.add_run(text); r.bold = bold; r.italic = italic
        if size: r.font.size = Pt(size)
        if color: r.font.color.rgb = color
        if font: r.font.name = font; r._r.get_or_add_rPr().get_or_add_rFonts().set(qn('w:hAnsi'), font)
        return r
    def h(s, text, lvl=2): return s._pb(s.d.add_heading(clean(text), lvl))
    def br(s): s.pb = True
    def _pb(s, p):
        if getattr(s, 'pb', False): p.paragraph_format.page_break_before = True; s.pb = False
        return p
    def lead(s):
        if getattr(s, 'pb', False): q = s.d.add_paragraph(); q.paragraph_format.space_after = Pt(0); s._pb(q)
    def lines(s, n=4):
        for _ in range(n): q = s.p(' ', after=8); rule(q)
    def picture(s, path, cap, cred, maxh=11.0, maxw=15.5):
        im = Image.open(path); ar = im.width / im.height; w = min(maxw, maxh * ar)
        q = s.p(align=WD_ALIGN_PARAGRAPH.CENTER, after=2); q.add_run().add_picture(path, width=Cm(w)); keep(q)
        c = s.p(align=WD_ALIGN_PARAGRAPH.CENTER, after=8); s.run(c, cap, 10.5, bold=True)
        if cred: c.add_run('\n'); s.run(c, cred, 8.5, italic=True, color=MUTED)
    def boxed(s, title, paras, fill='FBF8F1', kind=None, src='', badge='', title_color=BROWN):
        s.lead(); t = s.d.add_table(rows=1, cols=1); t.alignment = WD_TABLE_ALIGNMENT.CENTER; borders(t, 'D6CCB4'); c = t.rows[0].cells[0]; shade(c, fill)
        q = c.paragraphs[0]
        if badge: s.run(q, badge + '\n', 9, bold=True, color=RED)
        s.run(q, title, 12.5, bold=True, color=title_color); q.paragraph_format.space_after = Pt(6)
        f, it, sz = KFONT.get(kind, (None, False, 12))
        for x in paras:
            qq = c.add_paragraph(); s.run(qq, x, sz, italic=it, font=f); qq.paragraph_format.space_after = Pt(5)
        if src: qq = c.add_paragraph(); s.run(qq, src, 8.5, italic=True, color=MUTED)
        cant_split(t.rows[0]); s.p(after=4)
    def sticky(s, title, text):
        t = s.d.add_table(rows=1, cols=1); borders(t, 'E6D36A'); c = t.rows[0].cells[0]; shade(c, 'FFF1A0')
        q = c.paragraphs[0]; s.run(q, title + '\n', 10, bold=True); s.run(q, text, 12); cant_split(t.rows[0]); s.p(after=4)
    def table(s, title, cols, rows, src='', widths=None):
        if title: keep(s.p(title, 12.5, bold=True, color=BROWN))
        s.lead(); t = s.d.add_table(rows=1, cols=len(cols)); borders(t); repeat_header(t.rows[0])
        for i, x in enumerate(cols): c = t.rows[0].cells[i]; shade(c, 'E7DCC2'); s.run(c.paragraphs[0], x, 11, bold=True)
        for r in rows:
            cells = t.add_row().cells
            for i, x in enumerate(r): shade(cells[i], 'F8F3E6'); s.run(cells[i].paragraphs[0], x, 11)
        if widths:
            for row in t.rows:
                for i, w in enumerate(widths): row.cells[i].width = Cm(w)
        tight(t, len(rows) <= 14)
        if src: s.p(src, 8.5, italic=True, color=MUTED)
        else: s.p(after=2)
    def frise(s, title, items):
        keep(s.p(title, 12.5, bold=True, color=BROWN)); t = s.d.add_table(rows=0, cols=2); borders(t, 'E2D2B0')
        for dte, txt in items:
            c = t.add_row().cells; shade(c[0], 'F8F3E6'); shade(c[1], 'F8F3E6'); c[0].width, c[1].width = Cm(3.6), Cm(13.6)
            s.run(c[0].paragraphs[0], dte, 12, bold=True, color=RED); s.run(c[1].paragraphs[0], txt, 11.5)
        tight(t, len(items) <= 10); s.p(after=2)
    # ---------- documents ----------
    def doc(s, d, two):
        k = d['k']
        if k == 'img':
            im = IMG[d['id']]; s.picture(REPO + im['f'], d.get('cap') or im['c'], im['r'], 7.5 if two else 11)
        elif k == 'map':
            s.picture(DOS + 'cartes/%s-%d.jpg' % (s.vol, s.ci), d.get('cap') or 'Carte de l’atlas : « %s », à la fin de l’animation' % s.ch['short'],
                      'Atlas historique du Pacifique · fonds de carte Natural Earth (domaine public)', 8.5 if two else 12.5, 17)
        elif k == 'txt':
            s.boxed(d['t'], [x for x in str(d['txt']).split('\n') if x.strip()], 'F6F1E4', src=d.get('src', ''))
            if d.get('tp'): s.sticky('Note de l’enquêteur : la même chose, en plus court', d['tp'])
        elif k == 'tab': s.table(d['t'], d['cols'], d['rows'], d.get('src', ''))
        elif k == 'frise': s.frise(d['t'], d['items'])
    def extra(s):
        e = s.ex
        if e['kind'] == 'formulaire':
            if 'reconstitution' in e['src'].lower(): s.p('RECONSTITUTION PÉDAGOGIQUE', 10, bold=True, color=RED, align=WD_ALIGN_PARAGRAPH.RIGHT)
            keep(s.p(e['t'].upper(), 13, font='Courier New', bold=True))
            t = s.d.add_table(rows=0, cols=2); borders(t, '9AA3AD', 8)
            for a, b in e['fields']:
                c = t.add_row().cells; shade(c[0], 'EEF0F2'); c[0].width, c[1].width = Cm(4.4), Cm(12.8)
                s.run(c[0].paragraphs[0], a, 10.5, bold=True, color=MUTED); s.run(c[1].paragraphs[0], b, 11, font='Courier New')
            tight(t); s.p(e['src'], 8.5, italic=True, color=MUTED)
        else:
            fill = {'lettre': 'F2E4C4', 'carnet': 'FDFCF5'}.get(e['kind'], 'FFFFFF')
            s.boxed(e['t'], [x for x in e['txt'].split('\n') if x.strip()], fill, e['kind'], e['src'], 'PERSONNAGE FICTIF' if 'fictif' in e['src'].lower() else '',
                    INK if e['kind'] == 'fiche' else BROWN)
            if e.get('tp'): s.sticky(e.get('tp_title') or 'En mots simples', e['tp'])
    # ---------- questions ----------
    def q(s, q, n, key, corr, title=None):
        k = q['k']; keep(s.p('%d. %s' % (n, clean(title or (q['q'] if k != 'trou' else 'Complète avec les mots de la liste.'))), 12, bold=True, after=3))
        if k == 'qcm':
            opts = list(enumerate(q['a'])); rng(key + q['q']).shuffle(opts)
            for j, (i, t) in enumerate(opts):
                s.p('%s  %s. %s' % (BOX, 'ABCD'[j], clean(t)), indent=0.8, after=2)
                if i == 0: corr.append((n, '%s. %s' % ('ABCD'[j], t)))
        elif k == 'vf':
            s.p('Vrai ou faux ?      %s Vrai        %s Faux' % (BOX, BOX), indent=0.8); corr.append((n, ('Vrai' if q['a'] else 'Faux') + (' : ' + q['ex'] if q.get('ex') else '')))
        elif k == 'ordre':
            items = list(q['a']); rng(key + q['q']).shuffle(items)
            if items == q['a']: items = items[1:] + items[:1]
            s.p('Écris 1, 2, 3… dans les cases, du premier au dernier.', 10, italic=True, color=MUTED, indent=0.8, after=2)
            for t in items: s.p('[      ]   ' + clean(t), indent=0.8, after=3)
            corr.append((n, ' → '.join(q['a'])))
        elif k == 'trou':
            words = re.findall(r'\[([^\]]+)\]', q['q']); bank = list(dict.fromkeys(words + list(q.get('w', [])))); rng(key + q['q']).shuffle(bank)
            s.p(re.sub(r'\[([^\]]+)\]', '______________', clean(q['q'])), indent=0.8, after=4).paragraph_format.line_spacing = 1.7
            t = s.d.add_table(rows=1, cols=1); borders(t); c = t.rows[0].cells[0]; shade(c, 'F8F3E6')
            s.run(c.paragraphs[0], 'Mots à placer :  ', 11.5, bold=True); s.run(c.paragraphs[0], '  ·  '.join(clean(x) for x in bank), 11.5); s.p(after=2)
            corr.append((n, re.sub(r'\[([^\]]+)\]', lambda m: m.group(1).upper(), q['q'])))
        elif k == 'relie':
            R = [x[1] for x in q['a']]; rng(key + q['q']).shuffle(R)
            s.p('Relie chaque élément de gauche à celui qui va avec, à droite.', 10, italic=True, color=MUTED, indent=0.8, after=2)
            t = s.d.add_table(rows=0, cols=4)
            for (a, _), b in zip(q['a'], R):
                c = t.add_row().cells; s.run(c[0].paragraphs[0], a, 11.5); s.run(c[1].paragraphs[0], '●', 11.5); s.run(c[2].paragraphs[0], '●', 11.5); s.run(c[3].paragraphs[0], b, 11.5)
                c[1].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.RIGHT
                for i, w in enumerate((5.5, 2.2, 2.2, 7.3)): c[i].width = Cm(w)
            s.p(after=2); corr.append((n, ' ; '.join('%s = %s' % (a, b) for a, b in q['a'])))
        elif k == 'libre':
            s.lines(4); corr.append((n, 'Réponse possible : ' + q['m']))
        s.p(after=4)
    # ---------- assemblage ----------
    def build(s):
        ch, e, ex, key = s.ch, s.e, s.ex, s.code
        pgs = e['pg']; ds = lambda d: d if isinstance(d, list) else [d]
        has_map = any(d['k'] == 'map' for pg in pgs for d in ds(pg['d'])); n_ex = len(pgs) + 1
        n_map = None if has_map else n_ex + 1; n_last = (n_map or n_ex) + 1
        # couverture
        s.p('ATLAS HISTORIQUE DU PACIFIQUE · BUREAU DES ENQUÊTES' + (' HISTORIQUES' if s.vol in HIST else ''), 9.5, bold=True, color=MUTED, align=WD_ALIGN_PARAGRAPH.CENTER)
        s.p('DOSSIER D’ENQUÊTE', 30, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, after=2)
        s.p('Affaire n° %s  ·  %s' % (key, ch['dates']), 13, font='Courier New', align=WD_ALIGN_PARAGRAPH.CENTER, after=10)
        s.p(ch['short'], 21, bold=True, color=BROWN, align=WD_ALIGN_PARAGRAPH.CENTER, after=6)
        s.p('« %s »' % clean(e['q']), 15, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, after=12)
        pid = next((d['id'] for pg in pgs for d in ds(pg['d']) if d['k'] == 'img'), None)
        if pid: s.picture(REPO + IMG[pid]['f'], 'Pièce à conviction ?', '', 8.5)
        s.p('À ÉLUCIDER', 20, bold=True, color=RED, align=WD_ALIGN_PARAGRAPH.CENTER, after=12)
        s.p('Enquêteur / enquêtrice : ________________________     Classe : ___________', 12, after=8)
        s.p('Date : ______________      Niveau :   %s École primaire     %s Collège' % (BOX, BOX), 12, after=10)
        s.p('Contenu : %d pièces · cahier de l’enquêteur (primaire et collège) · corrigé pour l’enseignant' % n_last, 10.5, font='Courier New', color=MUTED, align=WD_ALIGN_PARAGRAPH.RIGHT)
        s.br()
        # ordre de mission
        s.boxed('ORDRE DE MISSION N° ' + key, ['Objet : enquête sur « %s » (%s).' % (ch['short'], ch['dates']), 'Enquêteur, enquêtrice,',
                 'Une question reste à élucider : « %s »' % e['q'],
                 'Ce dossier contient %d pièces : photographies, textes, cartes et tableaux. Étudie chacune d’elles, réponds aux questions de ton cahier, note les indices, puis rédige ton rapport d’enquête.' % n_last,
                 'Le chef du Bureau des enquêtes' + (' historiques' if s.vol in HIST else '')], 'FFFFFF', 'tapuscrit', badge='CONFIDENTIEL')
        s.h('Avant d’ouvrir les pièces, coche ton hypothèse :')
        for x in e['h'] + ['Je ne sais pas encore']: s.p('%s  %s' % (BOX, clean(x)), indent=0.8, after=2)
        s.p(after=4)
        s.boxed('La méthode de l’enquêteur : 5 questions à poser à chaque pièce', METH[s.vol in HIST] + ['Peut-on lui faire confiance ? (est-ce un point de vue ? faut-il le comparer à une autre pièce ?)'],
                'DBE9F6', title_color=INK)
        toc = [('Pièce n° %d' % (i + 1), pg['t']) for i, pg in enumerate(pgs)] + [('Pièce n° %d' % n_ex, ex['t'])]
        if n_map: toc.append(('Pièce n° %d' % n_map, 'Carte de l’atlas'))
        toc += [('Pièce n° %d' % n_last, 'Pli cacheté : note de synthèse et lexique'), ('Cahier', 'Niveau école primaire'), ('Cahier', 'Niveau collège'), ('Enseignant', 'Corrigé (à ne pas distribuer)')]
        s.h('Sommaire du dossier'); s.table('', ['', 'Contenu'], toc, widths=(3.4, 13.8)); s.br()
        # pièces
        for i, pg in enumerate(pgs):
            s.h('Pièce n° %d · %s' % (i + 1, pg['t'])); dd = ds(pg['d'])
            for d in dd: s.doc(d, len(dd) > 1)
        s.h('Pièce n° %d · %s' % (n_ex, ex['t'])); s.extra()
        if n_map: s.h('Pièce n° %d · Carte de l’atlas' % n_map); s.doc({'k': 'map'}, True)
        s.br(); s.h('Pièce n° %d · Pli cacheté : la note de synthèse des archives' % n_last)
        s.p('À n’ouvrir qu’après avoir étudié toutes les autres pièces.', 10, italic=True, color=MUTED)
        s.boxed('Note de synthèse · ' + ch['short'], ['%s : %s' % (clean(x['era']), clean(x['txt'])) for x in ch['ph']], 'F6F1E4', src='Récit de l’atlas historique du Pacifique.', badge='À OUVRIR EN DERNIER')
        if ch['mots']: s.table('Lexique de l’enquêteur', ['Mot', 'Ce que ça veut dire'], ch['mots'], widths=(5, 12.2))
        # cahiers
        corr = {'p': [], 'c': []}
        for lv in 'pc':
            s.br(); s.h('Cahier de l’enquêteur · ' + ('niveau école primaire' if lv == 'p' else 'niveau collège'), 1)
            s.p('Nom : ______________________________      Dossier ' + key, after=8); n = 0
            for i, pg in enumerate(pgs):
                s.h('Pièce n° %d · %s' % (i + 1, pg['t']), 3)
                for q in (pg.get(lv) or pg.get('p') or []): n += 1; s.q(q, n, key + lv, corr[lv])
            s.h('Pièce n° %d · %s' % (n_ex, ex['t']), 3); n += 1; s.q(ex['q' + lv], n, key + lv, corr[lv])
            s.h('Mon carnet d’indices'); s.p('Pour chaque pièce, écris en une phrase ce que tu as découvert.', 10, color=MUTED)
            t = s.d.add_table(rows=0, cols=2); borders(t, 'A8874A')
            for i in range(len(pgs) + 1):
                c = t.add_row().cells; shade(c[0], 'FBF3DC'); c[0].width, c[1].width = Cm(3.6), Cm(13.6)
                s.run(c[0].paragraphs[0], 'Indice n° %d\n' % (i + 1), 11.5, bold=True); s.run(c[0].paragraphs[0], 'pièce n° ____', 9, color=MUTED)
                s.run(c[1].paragraphs[0], '\n\n', 11)
            tight(t, False); s.p(after=4); s.h('Mon rapport d’enquête'); f = e['f']
            if lv == 'p':
                n += 1; s.q({'k': 'trou', 'q': f['p'], 'w': f['w']}, n, key, corr[lv], 'Complète le résumé de l’enquête. Aide-toi de ton carnet d’indices.')
                s.p('Mon hypothèse de départ était juste :   %s oui    %s non    %s en partie' % (BOX, BOX, BOX))
                s.p('La pièce qui m’a le plus aidé : n° ______ , parce que ______________________________')
            else:
                n += 1; s.q({'k': 'qcm', 'q': 'Quelle conclusion répond le mieux à la question de l’enquête ?', 'a': f['c']}, n, key, corr[lv])
                n += 1; s.q({'k': 'libre', 'q': 'Rédige ta réponse à la question de l’enquête (4 à 6 lignes). Cite au moins deux pièces (« d’après la pièce n°… »).', 'm': f['r']}, n, key, corr[lv])
                s.lines(3); s.p('Mon hypothèse de départ était juste :   %s oui    %s non    %s en partie' % (BOX, BOX, BOX))
        # corrigé
        s.br(); s.h('Corrigé · pour l’enseignant', 1)
        q = s.p(); s.run(q, 'Réponse à la question de l’enquête : ', bold=True); s.run(q, e['f']['r'])
        for lv, lab in (('p', 'Cahier niveau école primaire'), ('c', 'Cahier niveau collège')):
            s.h(lab)
            for n, a in corr[lv]: q = s.p(after=3); s.run(q, '%d. ' % n, 11, bold=True); s.run(q, a, 11)
        s.h('Indices attendus')
        for i, pg in enumerate(pgs): q = s.p(after=3); s.run(q, 'Pièce %d : ' % (i + 1), 11, bold=True); s.run(q, pg['i'], 11)
        q = s.p(); s.run(q, 'Pièce %d : ' % n_ex, 11, bold=True); s.run(q, 'à partir de « %s »' % ex['t'], 11)
        path = OUT + '%s-%02d.docx' % (s.vol, s.ci + 1); s.d.save(path); return path

if __name__ == '__main__':
    vols = [sys.argv[1]] if len(sys.argv) > 1 else list(D['vols'])
    todo = [(v, c) for v in vols for c in range(len(D['vols'][v]['enq']))]
    if len(sys.argv) > 2: todo = [(sys.argv[1], int(sys.argv[2]))]
    for v, c in todo: print(Doc(v, c).build(), flush=True)
