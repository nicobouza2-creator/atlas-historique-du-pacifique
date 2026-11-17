# Pages (couverture, fonds, pieds de page) et construction en deux passes (sommaire avec numéros de page).
import sys
from gen import *

def footer(c, doc, label):
    c.setFont('Atk', 8.3); c.setFillColor(MUTED)
    c.drawString(M, 9 * mm, 'Dossier d’enquête %s · %s · %s' % (doc.code, clean(doc.ch['short']), NOMT(doc.vol)))
    c.drawRightString(W - M, 9 * mm, 'page %d / %s' % (c.getPageNumber(), doc.total or '…'))
    if label:
        c.setFillColor(colors.HexColor('#eef0f2')); c.rect(0, H - 12 * mm, W, 12 * mm, fill=1, stroke=0)
        c.setFillColor(INK); c.setFont('AtkB', 9.5); c.drawString(M, H - 7.8 * mm, label)
        c.setFont('Stamp', 9.5); c.setFillColor(RED); c.drawRightString(W - M, H - 7.8 * mm, doc.code)

def bg_paper(c, doc):
    c.setFillColor(colors.HexColor('#fdfbf5')); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor('#e2d8c0')); c.setLineWidth(0.5); c.line(M, H - 12 * mm, W - M, H - 12 * mm)
    c.setFont('Type', 9.5); c.setFillColor(MUTED); c.drawString(M, H - 10 * mm, 'PIÈCES DU DOSSIER %s' % doc.code)
    c.setFont('Stamp', 9); c.setFillColor(RED); c.drawRightString(W - M, H - 10 * mm, 'CONFIDENTIEL')
    footer(c, doc, '')
def bg_P(c, doc): footer(c, doc, 'CAHIER DE L’ENQUÊTEUR · ' + CAH(doc.vol)[0].upper())
def bg_C(c, doc): footer(c, doc, 'CAHIER DE L’ENQUÊTEUR · ' + CAH(doc.vol)[1].upper())
def bg_K(c, doc): footer(c, doc, 'CORRIGÉ · POUR L’ENSEIGNANT (à ne pas distribuer)')

def draw_cover(c, doc):
    e, ch, r = doc.E, doc.ch, rng(doc.code)
    c.setFillColor(KRAFT); c.rect(0, 0, W, H, fill=1, stroke=0)
    for i in range(1400):
        c.setFillColor(colors.Color(0.42, 0.28, 0.1, alpha=r.random() * 0.28)); c.circle(r.random() * W, r.random() * H, r.random() * 0.8, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#b48d55')); c.roundRect(W - 82 * mm, H - 24 * mm, 64 * mm, 34 * mm, 5 * mm, fill=1, stroke=0)
    c.setFillColor(INK); c.setFont('Stamp', 15); c.drawCentredString(W - 50 * mm, H - 15 * mm, doc.code)
    lx, lw, lh = 20 * mm, W - 40 * mm, 118 * mm; ly = H - 40 * mm - lh
    c.setFillColor(colors.HexColor('#00000030', hasAlpha=True)); c.rect(lx + 2 * mm, ly - 2 * mm, lw, lh, fill=1, stroke=0)
    c.setFillColor(colors.HexColor('#fdfaf2')); c.setStrokeColor(colors.HexColor('#8a6d3b')); c.setLineWidth(1.3); c.rect(lx, ly, lw, lh, fill=1, stroke=1)
    c.setLineWidth(0.5); c.rect(lx + 2.5 * mm, ly + 2.5 * mm, lw - 5 * mm, lh - 5 * mm, fill=0, stroke=1)
    c.setStrokeColor(colors.HexColor('#8d949c')); c.setLineWidth(2.2); c.roundRect(lx + 12 * mm, ly + lh - 14 * mm, 7 * mm, 28 * mm, 3.5 * mm, stroke=1, fill=0)
    c.roundRect(lx + 13.6 * mm, ly + lh - 9 * mm, 3.8 * mm, 19 * mm, 1.9 * mm, stroke=1, fill=0)
    c.setFillColor(MUTED); c.setFont('AtkB', 9.5); c.drawCentredString(W / 2, ly + lh - 11 * mm, NOM(doc.vol) + ' · BUREAU DES ENQUÊTES' + (' HISTORIQUES' if doc.vol in HIST else ''))
    c.setFillColor(INK); c.setFont('Stamp', 31); c.drawCentredString(W / 2, ly + lh - 28 * mm, 'DOSSIER D’ENQUÊTE')
    c.setFont('Type', 13.5); c.drawCentredString(W / 2, ly + lh - 38 * mm, 'Affaire n° %s  ·  %s' % (doc.code, clean(ch['dates'], 'Type')))
    p = Paragraph(esc(ch['short']), S('ct', 'AtkB', 21, 25, BROWN, alignment=TA_CENTER)); ph = p.wrap(lw - 24 * mm, 40 * mm)[1]
    p.drawOn(c, lx + 12 * mm, ly + lh - 46 * mm - ph)
    q = Paragraph('« ' + esc(e['q']) + ' »', S('cq', 'AtkI', 14.5, 19, INK, alignment=TA_CENTER)); qh = q.wrap(lw - 30 * mm, 50 * mm)[1]
    q.drawOn(c, lx + 15 * mm, ly + lh - 52 * mm - ph - qh)
    c.setFont('Atk', 11.5); c.setFillColor(INK); y = ly + 22 * mm
    c.drawString(lx + 10 * mm, y, 'Enquêteur / enquêtrice : ____________________________'); c.drawString(lx + lw - 58 * mm, y, 'Classe : ___________')
    y -= 10 * mm; c.drawString(lx + 10 * mm, y, 'Date : ______________'); c.drawString(lx + 70 * mm, y, 'Niveau :')
    c.setFont('DJ', 13); c.drawString(lx + 88 * mm, y, '☐'); c.drawString(lx + 128 * mm, y, '☐')
    c.setFont('Atk', 11.5); c.drawString(lx + 94 * mm, y, NIV(doc.vol)[0]); c.drawString(lx + 134 * mm, y, NIV(doc.vol)[1])
    pid = next((d['id'] for pg in e['pg'] for d in (pg['d'] if isinstance(pg['d'], list) else [pg['d']]) if d['k'] == 'img'), None)
    if pid:
        from PIL import Image as PI
        im = PI.open(imgpath(pid)); ar = im.width / im.height; iw = 92 * mm; ih = min(iw / ar, 66 * mm); iw = ih * ar if ih == 66 * mm else iw
        c.saveState(); c.translate(24 * mm, 40 * mm); c.rotate(-4)
        c.setFillColor(colors.HexColor('#00000030', hasAlpha=True)); c.rect(1.5 * mm, -1.5 * mm, iw + 8 * mm, ih + 16 * mm, fill=1, stroke=0)
        c.setFillColor(colors.white); c.rect(0, 0, iw + 8 * mm, ih + 16 * mm, fill=1, stroke=0); c.drawImage(imgpath(pid), 4 * mm, 12 * mm, iw, ih)
        c.setFont('Hand', 12); c.setFillColor(INK); c.drawString(5 * mm, 4.5 * mm, 'pièce à conviction ?')
        c.setFillColor(colors.HexColor('#f3e39acc', hasAlpha=True)); c.saveState(); c.translate((iw + 8 * mm) / 2, ih + 15 * mm); c.rotate(4)
        c.rect(-12 * mm, -3 * mm, 24 * mm, 6 * mm, fill=1, stroke=0); c.restoreState(); c.restoreState()
    stamp(c, W - 50 * mm, 92 * mm, 'À ÉLUCIDER', 26, -14)
    c.setFont('Type', 10.5); c.setFillColor(INK)
    c.drawRightString(W - 18 * mm, 30 * mm, 'Contenu : %d pièces · cahier de l’enquêteur' % doc.npieces)
    c.drawRightString(W - 18 * mm, 24 * mm, ('(parcours guidé et autonome)' if doc.vol in COLLEGE else '(primaire et collège)') + ' · corrigé pour l’enseignant')

def story(vol, ci, book):
    ch = D['vols'][vol]['chapters'][ci]; e = D['vols'][vol]['enq'][ci]; ex = X['%s-%d' % (vol, ci)]; key = code(vol, ci)
    pgs = e['pg']; has_map = any(d['k'] == 'map' for pg in pgs for d in (pg['d'] if isinstance(pg['d'], list) else [pg['d']]))
    pieces = [(pg['t'], pg['d']) for pg in pgs]; n_ex = len(pieces) + 1
    n_map = None if has_map else n_ex + 1; n_last = (n_map or n_ex) + 1
    sto = [NextPageTemplate('paper'), PageBreak()]
    hyp = e['h'] + ['Je ne sais pas encore']
    sto += [Sheet('tapuscrit', 'ORDRE DE MISSION N° ' + key,
                  'Objet : enquête sur « %s » (%s).\nEnquêteur, enquêtrice,\nUne question reste à élucider : « %s »\nCe dossier contient %d pièces : photographies, textes, cartes et tableaux. Étudie chacune d’elles, réponds aux questions de ton cahier, note les indices, puis rédige ton rapport d’enquête.\nLe chef du Bureau des enquêtes%s'
                  % (ch['short'], ch['dates'], e['q'], n_last, ' historiques' if vol in HIST else ''), '', 'CONFIDENTIEL'), Spacer(1, 6 * mm),
            Paragraph('Avant d’ouvrir les pièces, coche ton hypothèse :', ST['h2'])]
    sto += [Paragraph(BOX + '&nbsp; ' + esc(h), ST['opt']) for h in hyp]
    sto += [Spacer(1, 5 * mm), Sheet('fiche', 'La méthode de l’enquêteur : 5 questions à poser à chaque pièce',
            METH[vol in HIST] + '\nPeut-on lui faire confiance ? (est-ce un point de vue ? faut-il le comparer à une autre pièce ?)')]
    toc = [['Pièce n° %d' % (i + 1), t, 'p%d' % (i + 1)] for i, (t, d) in enumerate(pieces)] + [['Pièce n° %d' % n_ex, ex['t'], 'p%d' % n_ex]]
    if n_map: toc.append(['Pièce n° %d' % n_map, 'Carte de l’atlas', 'p%d' % n_map])
    toc += [['Pièce n° %d' % n_last, 'Pli cacheté : note de synthèse et lexique', 'p%d' % n_last], ['Cahier', CAH(vol)[0], 'cP'], ['Cahier', CAH(vol)[1], 'cC'], ['Enseignant', 'Corrigé (à ne pas distribuer)', 'K']]
    rows = [[Paragraph('<b>%s</b>' % a, ST['card']), Paragraph(esc(b), ST['card']), Paragraph('page %s' % book.get(k, '…'), ST['card'])] for a, b, k in toc]
    t = Table(rows, colWidths=[30 * mm, FW - 52 * mm, 22 * mm]); t.setStyle(TableStyle([('LINEBELOW', (0, 0), (-1, -1), 0.4, colors.HexColor('#d8ccb0'))]))
    sto += [CondPageBreak(70 * mm), Paragraph('Sommaire du dossier', ST['h2']), t, PageBreak()]
    for i, (t_, d) in enumerate(pieces):
        ds = d if isinstance(d, list) else [d]; fl = [Anchor('p%d' % (i + 1), book), PieceTag(i + 1, t_), Spacer(1, 3 * mm)]
        for dd in ds: fl += doc_flow(dd, vol, ci, ch, len(ds) > 1) + [Spacer(1, 4 * mm)]
        sto += [CondPageBreak(95 * mm), KeepTogether(fl[:3] + fl[3:5])] + fl[5:] + [Spacer(1, 4 * mm)]
    sto += [CondPageBreak(110 * mm), Anchor('p%d' % n_ex, book), PieceTag(n_ex, ex['t']), Spacer(1, 3 * mm)] + extra_flow(ex) + [Spacer(1, 6 * mm)]
    if n_map:
        sto += [PageBreak(), Anchor('p%d' % n_map, book), PieceTag(n_map, 'Carte de l’atlas'), Spacer(1, 3 * mm)] + doc_flow({'k': 'map'}, vol, ci, ch, False)
    synth = '\n'.join('%s : %s' % (clean(p['era']), clean(p['txt'])) for p in ch['ph'])
    sto += [PageBreak(), Anchor('p%d' % n_last, book), PieceTag(n_last, 'Pli cacheté : la note de synthèse de l’atlas'), Spacer(1, 2 * mm),
            Paragraph('<i>À n’ouvrir qu’après avoir étudié toutes les autres pièces.</i>', ST['small']), Spacer(1, 3 * mm),
            Sheet('archive', 'Note de synthèse · ' + ch['short'], synth, ('Récit de l’atlas d’histoire du collège.' if vol in COLLEGE else 'Récit de l’atlas historique du Pacifique.'), 'À OUVRIR EN DERNIER')]
    if ch['mots']: sto += [Spacer(1, 5 * mm), KeepTogether(ledger('Lexique de l’enquêteur', ['Mot', 'Ce que ça veut dire'], ch['mots'], '', FW))]
    if ch.get('src'):   # d’où viennent les informations du chapitre
        sto += [Spacer(1, 5 * mm), KeepTogether([Paragraph('D’où viennent ces informations ?', ST['h2'])] +
                [Paragraph('• %s<br/><font name="AtkI" size="8" color="#5b6470">%s</font>' % (esc(a), esc(b)), S('srcl', 'Atk', 10, 13, spaceAfter=3)) for a, b in ch['src']])]
    corr = {'p': [], 'c': []}
    for lv, tpl, anc in [('p', 'cahP', 'cP'), ('c', 'cahC', 'cC')]:
        sto += [NextPageTemplate(tpl), PageBreak(), Anchor(anc, book), Spacer(1, 4 * mm),
                Paragraph('Cahier de l’enquêteur · ' + CAH(vol)[lv != 'p'].lower(), ST['h1']),
                Paragraph('Nom : ______________________________ &nbsp;&nbsp; Dossier ' + key, ST['body']), Spacer(1, 3 * mm)]
        n = 0
        for i, pg in enumerate(pgs):
            hd = Paragraph('Pièce n° %d · %s' % (i + 1, esc(pg['t'])), ST['h2'])
            for j, q in enumerate(pg.get(lv) or pg.get('p') or []): n += 1; sto += qpaper(q, n, key + lv, corr[lv], head=hd if j == 0 else None)
        n += 1; sto += qpaper(ex['q' + lv], n, key + lv, corr[lv], head=Paragraph('Pièce n° %d · %s' % (n_ex, esc(ex['t'])), ST['h2']))
        sto += [CondPageBreak(90 * mm)] + indices_block(e, n_ex) + [CondPageBreak(120 * mm)]
        rh = Paragraph('Mon rapport d’enquête', ST['h2'])
        f = e['f']
        if lv == 'p':
            n += 1; sto += qpaper({'k': 'trou', 'q': f['p'], 'w': f['w']}, n, key, corr[lv], 'Complète le résumé de l’enquête. Aide-toi de ton carnet d’indices.', head=rh)
            sto += [Paragraph('Mon hypothèse de départ était juste : &nbsp; %s oui &nbsp;&nbsp; %s non &nbsp;&nbsp; %s en partie' % (BOX, BOX, BOX), ST['body']), Spacer(1, 3 * mm),
                    Paragraph('La pièce qui m’a le plus aidé : n° ______ , parce que ______________________________', ST['body'])]
        else:
            n += 1; sto += qpaper({'k': 'qcm', 'q': 'Quelle conclusion répond le mieux à la question de l’enquête ?', 'a': f['c']}, n, key, corr[lv], head=rh)
            n += 1; sto += qpaper({'k': 'libre', 'q': 'Rédige ta réponse à la question de l’enquête (4 à 6 lignes). Cite au moins deux pièces (« d’après la pièce n°… »).', 'm': f['r']}, n, key, corr[lv])
            sto += [Lines(3), Paragraph('Mon hypothèse de départ était juste : &nbsp; %s oui &nbsp;&nbsp; %s non &nbsp;&nbsp; %s en partie' % (BOX, BOX, BOX), ST['body'])]
    sto += [NextPageTemplate('corr'), PageBreak(), Anchor('K', book), Spacer(1, 4 * mm), Paragraph('Corrigé · pour l’enseignant', ST['h1']),
            Paragraph('<b>Réponse à la question de l’enquête :</b> ' + esc(e['f']['r']), ST['body'])]
    for lv, lab in [('p', 'Cahier ' + CAH(vol)[0].lower()), ('c', 'Cahier ' + CAH(vol)[1].lower())]:
        sto.append(Paragraph(lab, ST['h2']))
        sto += [Paragraph('<b>%d.</b> %s' % (n, esc(a)), S('ca', 'Atk', 10.5, 14, spaceAfter=3)) for n, a in corr[lv]]
    sto += [Paragraph('Indices attendus', ST['h2'])] + [Paragraph('<b>Pièce %d :</b> %s' % (i + 1, esc(pg['i'])), S('ci', 'Atk', 10.5, 14, spaceAfter=3)) for i, pg in enumerate(pgs)]
    sto += [Paragraph('<b>Pièce %d :</b> à partir de « %s »' % (n_ex, esc(ex['t'])), S('ci2', 'Atk', 10.5, 14))]
    return sto, n_last

def build(vol, ci):
    book = {}; total = None
    for _ in range(2):
        buf = io.BytesIO() if total is None else OUT + '%s-%02d.pdf' % (vol, ci + 1)
        doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=18 * mm, bottomMargin=16 * mm,
                              title='Dossier d’enquête %s · %s' % (code(vol, ci), D['vols'][vol]['chapters'][ci]['short']), author='Nicolas BOUZA')
        doc.vol = vol; doc.code = code(vol, ci); doc.ch = D['vols'][vol]['chapters'][ci]; doc.E = D['vols'][vol]['enq'][ci]; doc.total = total
        fr = Frame(M, 16 * mm, FW, H - 34 * mm, id='f', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        doc.addPageTemplates([PageTemplate('cover', [fr], onPage=draw_cover), PageTemplate('paper', [fr], onPage=bg_paper),
                              PageTemplate('cahP', [fr], onPage=bg_P), PageTemplate('cahC', [fr], onPage=bg_C), PageTemplate('corr', [fr], onPage=bg_K)])
        sto, doc.npieces = story(vol, ci, book)
        doc.build([Spacer(1, 1)] + sto)
        total = doc.page
    return total

COLLEGE = {'colonies', 'guerres', 'monde45', 'republique'}   # volets de l’atlas du collège : autre nom d’atlas, deux parcours au lieu de deux niveaux
def NOM(vol): return 'ATLAS D’HISTOIRE — COLLÈGE' if vol in COLLEGE else 'ATLAS HISTORIQUE DU PACIFIQUE'
def NIV(vol): return ('Parcours guidé', 'Parcours autonome') if vol in COLLEGE else ('École primaire', 'Collège')
def CAH(vol): return ('Parcours guidé', 'Parcours autonome') if vol in COLLEGE else ('Niveau école primaire', 'Niveau collège')
HIST = {'pacifique', 'caledonie', 'monde', 'decouvertes', 'colonies', 'guerres', 'monde45', 'republique'}   # volets d’histoire : en-tête « historiques », méthode du témoin
METH = {True: 'Qui l’a fait ? (un témoin, un savant, un voyageur, l’atlas…)\nQuand ? (au moment des faits, ou bien plus tard ?)\nQu’est-ce que c’est ? (photo, carte, texte, tableau, objet…)\nPour quoi faire ? (raconter, expliquer, convaincre, garder une trace…)',
        False: 'Qui l’a fait ? (un témoin, un savant, un organisme officiel, l’atlas…)\nQuand ? (au moment des faits, ou bien plus tard ?)\nQu’est-ce que c’est ? (photo, carte, texte, tableau, graphique…)\nPour quoi faire ? (raconter, expliquer, informer, convaincre…)'}

if __name__ == '__main__':
    # python3 gen_build.py emc        -> un volet ;  python3 gen_build.py emc 3 -> une enquête
    vols = [sys.argv[1]] if len(sys.argv) > 1 else list(D['vols'])
    todo = [(v, c) for v in vols for c in range(len(D['vols'][v]['enq'])) if '%s-%d' % (v, c) in X]
    if len(sys.argv) > 2: todo = [(sys.argv[1], int(sys.argv[2]))]
    for v, c in todo: print(v, c, build(v, c), 'pages', flush=True)
