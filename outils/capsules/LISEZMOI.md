# Capsules vidéo de l'atlas

© 2026 Nicolas BOUZA — idée, conception et réalisation, avec l'assistance de Claude (Anthropic) — CC BY-NC-ND 4.0.

Une capsule = la carte animée d'un volet, rendue par le vrai moteur de l'atlas, avec sprites, photos légendées, sous-titres incrustés et voix de synthèse. Rien ici n'est chargé par l'atlas.

## Capsule pilote : « Le nickel, de la montagne au monde » (≈ 54 s)
`capsule_nickel.py` — 8 scènes : titre, mine, convoyeur, bateau, côte Est → Doniambo, route vers l'Asie, usages (acier inoxydable, batteries), « À retenir ». Sources : volet Nickel, chapitre 4 (« De la montagne à la mer ») et chapitre 7 (« Le nickel voyage dans le monde »).

```
python3 -I capsule_nickel.py --depot <dépôt> --voix <dossier de la voix> --d3 <d3.min.js> \
        [--travail /tmp/cap-nickel] [--sortie video/capsule-nickel.mp4] [--essai]
```
- `--essai` : une image PNG par scène (milieu et fin) dans le dossier de travail, sans vidéo (≈ 20 s) : à lancer avant tout rendu complet.
- Sortie : `capsule-nickel.mp4` (1280×720, 20 images/s, H.264 + AAC, ≈ 3,5 Mo) et `capsule-nickel.srt` à côté.
- Prérequis : Python 3 (`playwright`, `piper-tts`, `pillow`), Chrome (`/usr/bin/google-chrome` ou dans le PATH), `ffmpeg`, d3 7.8.5 en local (`npm i d3@7.8.5` → `node_modules/d3/dist/d3.min.js`).
- Voix : `fr_FR-siwis-medium.onnx` + `.onnx.json` depuis https://huggingface.co/rhasspy/piper-voices/tree/main/fr/fr_FR/siwis/medium (même voix que les capsules de l'atlas des sciences), débit ralenti (`length_scale` 1,1).

## Comment ça marche
- Le scénario est le tableau `SCENES` : texte dit (= sous-titres), intervalle `a→b` de l'animation du chapitre déroulé pendant la scène, sprites (lieu, taille, entrée, décalage), photos (entrée, sortie, côté), pastille d'étape. La durée d'une scène = max(durée prévue, voix + 1 s) : changer un texte recale tout seul.
- Rendu image par image : `window.__go(volet, chapitre, t)` du moteur, puis calque HTML (classes et identifiants préfixés `cv-` / `cv_`, car le CSS de l'atlas a des classes `.sub`, `.chip`, `.card`…). Les photos intégrées à l'atlas sont masquées : on pose les nôtres, avec légende et crédit repris de `js/img.js` (Wikimedia Commons).
- Sprites posés sur les lieux : le moteur n'expose pas sa projection ; un crochet `window.__proj(lon, lat)` est injecté **à la volée** dans `engine.js` (le fichier du dépôt n'est pas modifié). Si `engine.js` change de structure, l'assertion sur `window.__camNow=` le signale.
- `assets/` : sprites utilisés (`l-mine`, `l-usine`, `l-wharf`, `l-port-conteneurs`, `s-camion-minier`, issus de la bibliothèque `atlas-sprites` du 17/11/2026 ; `b-mineralier` = `img/b-mineralier.png`). Les photos viennent de `img/`.
- Respellings pour la voix (dictionnaire `tts` d'une scène, sous-titres inchangés) : « côte Est » → « côte Èst » (sinon lu comme le verbe « est »), « Doniambo » → « Donniambo ».

## Vérifié (17/11/2026)
- Durée 54,0 s ; images contrôlées aux 8 scènes ; 0 erreur JS ; pic audio −1,4 dB.
- Voix contrôlée par transcription automatique (Whisper « small ») de la bande son du MP4 : les 10 phrases sont reconnues. « Doniambo » est reconnu à une voyelle près (« Doniambou ») et « Nouméa » à une lettre près : ce test ne remplace pas l'oreille de Nicolas.

## Pas vérifié / limites
- Aucune écoute humaine ; prononciation de « Doniambo » et « Nouméa » à contrôler.
- Compatibilité claude.ai (lecture du MP4 en blob, bouton d'enregistrement) : non testée pour cette capsule.
- Tracés de la carte et sprites : schématiques, comme dans l'atlas. Validation historique/géographique par Nicolas avant diffusion aux élèves.
- Actualité du chapitre Nickel (offre chinoise de mars 2026 ; audit du 16/11) : la capsule ne parle que des flux et des usages, pas de la situation industrielle récente.

## Idées de suite
- Version « texte facile » (champ `p` des étapes) ; capsules pour d'autres volets (même script, autre `SCENES`) ; photo d'ouverture à la place du fond uni de la première seconde.
