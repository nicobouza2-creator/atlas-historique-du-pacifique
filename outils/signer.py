#!/usr/bin/env python3
"""Mention d'auteur dans tous les PDF et Word de l'atlas :  python3 signer.py <dépôt> [--verifier]

© 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA, avec l'assistance de Claude (Anthropic). CC BY-NC-ND 4.0.

- PDF (pdf/, fiches/, seq/) : une ligne en bas de chaque page, une ligne verticale dans la marge de gauche,
  et les propriétés du fichier (auteur, sujet, mots-clés, droits).
- Word (docx/) : une ligne dans le pied de page de chaque section et les propriétés du document.
Sans effet sur un fichier déjà signé (marque /AtlasAuteur dans le PDF, mot-clé « signé » dans le Word) :
on peut le relancer après chaque régénération des dossiers. pack.py l'appelle avant de faire les paquets.
--verifier : ne modifie rien, liste les fichiers non signés (code de sortie 1 s'il y en a)."""
import io, os, sys

NOM = 'Nicolas BOUZA'
LIGNE = '© 2026 Nicolas BOUZA — idée, conception et réalisation, avec l’assistance de Claude (Anthropic) — licence CC BY-NC-ND 4.0, usage en classe, pas d’usage commercial'
MARGE = 'Atlas — © 2026 Nicolas BOUZA, avec l’assistance de Claude (Anthropic) — CC BY-NC-ND 4.0'
SUJET = 'Idée, conception et réalisation : Nicolas BOUZA, avec l’assistance de Claude (Anthropic). © 2026 Nicolas BOUZA, CC BY-NC-ND 4.0.'
MOTS = 'Nicolas BOUZA; atlas historique; Nouvelle-Calédonie; CC BY-NC-ND 4.0; signé'
DOSSIERS_PDF = ('pdf', 'fiches', 'seq')


def calque(w, h):
    from reportlab.pdfgen import canvas
    b = io.BytesIO(); c = canvas.Canvas(b, pagesize=(w, h))
    c.setFillColorRGB(0.33, 0.37, 0.42); c.setFont('Helvetica', 6.3)
    c.drawCentredString(w / 2, 6.5, LIGNE)
    c.saveState(); c.translate(9, h / 2); c.rotate(90); c.setFont('Helvetica', 5.8); c.drawCentredString(0, 0, MARGE); c.restoreState()
    c.save(); b.seek(0)
    from pypdf import PdfReader
    return PdfReader(b).pages[0]


def pdf_signe(path):
    from pypdf import PdfReader
    try: return '/AtlasAuteur' in (PdfReader(path).metadata or {})
    except Exception: return False


def signer_pdf(path):
    from pypdf import PdfReader, PdfWriter
    r = PdfReader(path)
    w = PdfWriter(clone_from=r)
    cache = {}
    for p in w.pages:
        box = p.mediabox; k = (round(float(box.width)), round(float(box.height)))
        if k not in cache: cache[k] = calque(float(box.width), float(box.height))
        p.merge_page(cache[k]); p.compress_content_streams()
    old = dict(r.metadata or {})
    meta = {k: v for k, v in old.items() if k in ('/Title', '/CreationDate')}
    if not meta.get('/Title') or str(meta.get('/Title')).endswith('.html'):
        meta['/Title'] = 'Atlas — ' + os.path.splitext(os.path.basename(path))[0]
    meta.update({'/Author': NOM, '/Subject': SUJET, '/Keywords': MOTS, '/Creator': 'Atlas — ' + NOM + ', avec l’assistance de Claude (Anthropic)',
                 '/Producer': 'Atlas — ' + NOM, '/Copyright': '© 2026 Nicolas BOUZA — CC BY-NC-ND 4.0', '/AtlasAuteur': NOM})
    w.add_metadata(meta)
    try: w.compress_identical_objects(remove_duplicates=True, remove_unreferenced=True)
    except TypeError: w.compress_identical_objects()
    tmp = path + '.tmp'
    with open(tmp, 'wb') as f: w.write(f)
    os.replace(tmp, path)


def docx_signe(path):
    import docx
    try: return 'signé' in (docx.Document(path).core_properties.keywords or '')
    except Exception: return False


def signer_docx(path):
    import docx
    from docx.shared import Pt, RGBColor
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    d = docx.Document(path)
    vus = set()
    for s in d.sections:
        for ft in (s.footer, s.first_page_footer if s.different_first_page_header_footer else None):
            if ft is None or ft.is_linked_to_previous and len(vus): continue
            if id(ft._element) in vus: continue
            vus.add(id(ft._element))
            p = ft.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(LIGNE); r.font.size = Pt(7); r.font.color.rgb = RGBColor(0x55, 0x5F, 0x6B)
    cp = d.core_properties
    cp.author = NOM; cp.last_modified_by = NOM; cp.subject = SUJET; cp.keywords = MOTS
    cp.comments = SUJET; cp.category = 'Atlas — ' + NOM
    if not cp.title: cp.title = 'Atlas — ' + os.path.splitext(os.path.basename(path))[0]
    tmp = path + '.tmp.docx'; d.save(tmp); os.replace(tmp, path)


def fichiers(repo):
    for dd in DOSSIERS_PDF:
        p = os.path.join(repo, dd)
        if os.path.isdir(p):
            for f in sorted(os.listdir(p)):
                if f.endswith('.pdf'): yield os.path.join(p, f), 'pdf'
    p = os.path.join(repo, 'docx')
    if os.path.isdir(p):
        for f in sorted(os.listdir(p)):
            if f.endswith('.docx'): yield os.path.join(p, f), 'docx'


def main(repo, verifier=False):
    manque, faits = [], 0
    for path, kind in fichiers(repo):
        ok = pdf_signe(path) if kind == 'pdf' else docx_signe(path)
        if ok: continue
        if verifier: manque.append(path); continue
        (signer_pdf if kind == 'pdf' else signer_docx)(path); faits += 1
    if verifier:
        for m in manque: print('non signé :', m)
        return len(manque)
    print('signés :', faits)
    return 0


if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if len(a) != 1: sys.exit(__doc__)
    sys.exit(1 if main(a[0], '--verifier' in sys.argv) else 0)
