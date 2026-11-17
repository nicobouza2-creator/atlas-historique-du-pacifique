/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Atlas du collège — volet « La République depuis 1944 » (3e). Écrit dans une autre conversation, directement dans l'artefact claude.ai ;
   récupéré le 17/11/2026 depuis la version publiée (code minifié remis en forme : les noms de variables courts viennent de là).
   Même format que v-colonies.js : chapitres, étapes (ph), questions (q), fiche séance (fs). */
!function() {
    "use strict";
    var e = window.ATLAS, n = e.r, a = e.L, i = e.Pu, s = e.Ph, t = e.Rg, o = window.PAYS || {};
    function l(e, n, a, i) {
        return {
            t: e,
            lon: n,
            lat: a,
            z: i
        };
    }
    function u(e) {
        return l(e, 20, 12, .46);
    }
    function FR(e) {
        return l(e, 2.5, 46.6, 4.2);
    }
    function NCW(e) {
        return l(e, 166.1, -21.2, 10);
    }
    function p(e, n, a, i) {
        var s = [];
        return e.split(" ").forEach(function(e) {
            o[e] && (s = s.concat(o[e]));
        }), s.length ? t(s, n, a, null == i ? .62 : i, 2) : null;
    }
    function m(e) {
        return e.filter(Boolean);
    }
    function g(e, n) {
        return e && Object.keys(n).forEach(function(a) {
            e[a] = n[a];
        }), e;
    }
    function b(e, n, a, i, s, r) {
        var t, o = [];
        for (t = 0; t < 20; t++) {
            var l = t / 20 * 2 * Math.PI, u = e + a * Math.cos(l) / Math.cos(n * Math.PI / 180), d = n + a * Math.sin(l);
            o.push([ u > 180 ? u - 360 : u < -180 ? u + 360 : u, d ]);
        }
        return {
            k: "poly",
            ring: o,
            col: i,
            a: null == r ? .6 : r,
            t0: s,
            fade: 2,
            nostroke: !0
        };
    }
    var F = "fra", DOM = "jade", TOM = "kan", UF = "ere", NEU = "neo", SRC = "esp", CRI = "ense", NCC = "kan";
    var I = [ 166.44, -22.27 ], PAR = [ 2.35, 48.85 ];
    var B = [ {
        short: "1944-1947 : refonder la République",
        col: "fra",
        dur: 60,
        when: [ 1944, 1947 ],
        dates: "1944 – 1947",
        proj: "plan",
        cam: [ FR(0), FR(41), u(42), u(51), FR(52), FR(60) ],
        zones: m([ p("FRA", F, 1, .45), p("SEN MLI GIN CIV BFA NER BEN MRT TCD CAF COG GAB CMR TGO MDG DZA MAR TUN VNM LAO KHM", UF, 43, .3), b(-61.55, 16.2, 1.4, DOM, 43, .85), b(-61, 14.65, 1.2, DOM, 43, .85), b(-53, 4, 2.6, DOM, 43, .6), b(55.5, -21.1, 1.4, DOM, 43, .85), p("NCL PYF", TOM, 44, .75), b(-149.5, -17.6, 2.6, TOM, 44, .6) ]),
        routes: [],
        labels: [ a(1, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            gold: !0,
            sub: "libérée, 25 août 1944",
            dx: 10,
            al: "left",
            end: 9
        }), a(3, -.7, 49.28, "Bayeux", {
            mark: "ville",
            sub: "de Gaulle y est acclamé, 14 juin 1944",
            dx: -10,
            al: "right",
            end: 9
        }), a(11, 2.6, 46.2, "Premier vote des femmes", {
            nomark: !0,
            big: !0,
            sub: "élections municipales, 29 avril 1945",
            end: 19
        }), a(14, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "33 femmes élues députées, octobre 1945",
            dx: 10,
            al: "left",
            end: 19
        }), a(21, 2.24, 48.83, "Boulogne-Billancourt", {
            mark: "site",
            sub: "Renault nationalisé, 1945",
            dx: -10,
            al: "right",
            end: 30
        }), a(22, 2.83, 50.43, "Bassin minier", {
            mark: "site",
            sub: "mines de charbon nationalisées",
            dx: 10,
            al: "left",
            end: 30
        }), a(24, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "procès de Pétain, été 1945",
            dx: 10,
            al: "left",
            end: 30
        }), a(32, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "référendum : la IVe République, octobre 1946",
            dx: 10,
            al: "left",
            end: 41
        }), a(34, -.7, 49.28, "Bayeux", {
            mark: "ville",
            gold: !0,
            sub: "discours de De Gaulle, 16 juin 1946",
            dx: -10,
            al: "right",
            end: 41
        }), a(43, -61.55, 16.2, "Guadeloupe", {
            mark: "ville",
            sub: "département, 1946",
            dx: 10,
            al: "left",
            end: 51
        }), a(43.5, -61, 14.65, "Martinique", {
            mark: "ville",
            dx: 10,
            al: "left",
            dy: 12,
            end: 51
        }), a(44, -53, 4, "Guyane", {
            mark: "ville",
            dx: 10,
            al: "left",
            end: 51
        }), a(44.5, 55.5, -21.1, "La Réunion", {
            mark: "ville",
            sub: "département, 1946",
            dx: 10,
            al: "left",
            end: 51
        }), a(45, -17.44, 14.69, "Dakar", {
            mark: "ville",
            sub: "Lamine Guèye, député du Sénégal",
            dx: -10,
            al: "right",
            end: 51
        }), a(46, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "territoire d’outre-mer, 1946",
            dx: -10,
            al: "right",
            end: 51
        }), a(53, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "les ministres communistes renvoyés, mai 1947",
            dx: 10,
            al: "left"
        }), a(54, 2.83, 50.43, "Bassin minier", {
            mark: "site",
            sub: "grandes grèves, 1947-1948",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(1, PAR[0], PAR[1], "#ffd166", !0), i(11, 2.6, 46.6, "#ffd166", !0), i(46, I[0], I[1], "#ffd166", !0) ],
        ph: [ s(0, "1944 : la Libération", "Paris est libéré le 25 août 1944. Le Gouvernement provisoire de la République française (GPRF), dirigé par le général de Gaulle, rétablit la République et ses libertés. Il s’appuie sur le programme du Conseil national de la Résistance (mars 1944), qui veut une démocratie plus juste, politique mais aussi sociale.", "fra"), s(10, "Les femmes deviennent citoyennes", "Depuis l’ordonnance du 21 avril 1944, les Françaises peuvent voter et être élues. Elles votent pour la première fois aux élections municipales du 29 avril 1945. En octobre 1945, 33 femmes entrent à l’Assemblée. Le suffrage devient enfin vraiment universel.", "cat"), s(20, "Reconstruire, protéger, juger", "La France est ruinée. L’État nationalise de grandes entreprises (Renault, les mines de charbon, l’électricité et le gaz, de grandes banques). En octobre 1945, la Sécurité sociale protège les travailleurs contre la maladie, les accidents et la vieillesse. Les collaborateurs sont jugés : c’est l’épuration ; Pétain est condamné à mort, sa peine est commuée en prison à vie.", "mis"), s(31, "1946 : la IVe République", "En octobre 1945, les Français refusent par référendum le retour à la IIIe République. De Gaulle, qui veut un président fort, démissionne en janvier 1946 et défend ses idées à Bayeux. La Constitution de la IVe République, adoptée en octobre 1946, donne l’essentiel du pouvoir à l’Assemblée. Son préambule garantit de nouveaux droits : égalité des femmes et des hommes, droit de grève, droit à la santé et à l’instruction.", "fra"), s(42, "1946 : de nouveaux citoyens outre-mer", "L’empire devient l’Union française. La loi Lamine Guèye (mai 1946) fait de tous les habitants de l’outre-mer des citoyens ; le travail forcé et l’indigénat sont supprimés. La Guadeloupe, la Martinique, la Guyane et La Réunion deviennent des départements. La Nouvelle-Calédonie et la Polynésie deviennent des territoires d’outre-mer (TOM) ; les Kanak deviennent citoyens et obtiennent peu à peu le droit de vote.", "kan"), s(52, "1947 : la fin de l’union", "L’union de la Libération ne dure pas. En mai 1947, au début de la guerre froide, les ministres communistes sont renvoyés du gouvernement ; de grandes grèves éclatent dans les mines et les usines. La IVe République reste pourtant celle qui a fondé la protection sociale moderne.", "eur") ],
        photos: [ { id: "champs1944", t0: 1, t1: 9, pos: "tr", rot: 2, fit: "" }, { id: "vote1945", t0: 11, t1: 18, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ F, "France métropolitaine" ], [ DOM, "Départements d’outre-mer (1946)" ], [ TOM, "Territoires d’outre-mer (1946)" ], [ UF, "Autres territoires de l’Union française" ] ],
        mots: [ [ "GPRF", "Gouvernement provisoire de la République française (1944-1946), dirigé d’abord par de Gaulle." ], [ "CNR", "Conseil national de la Résistance : il rédige en 1944 un programme de réformes pour l’après-guerre." ], [ "Suffrage universel", "Droit de vote pour tous les citoyens adultes : en France, il inclut les femmes depuis 1944." ], [ "Sécurité sociale", "Système qui protège les travailleurs et leur famille contre la maladie, les accidents, la vieillesse." ], [ "Nationalisation", "Passage d’une entreprise privée sous le contrôle de l’État." ], [ "Union française", "Nom donné en 1946 à l’ensemble formé par la France et ses territoires d’outre-mer." ] ],
        q: [ [ "Depuis quand les Françaises ont-elles le droit de vote ?", "Depuis l’ordonnance du 21 avril 1944 ; elles votent pour la première fois le 29 avril 1945." ], [ "Citer deux réformes sociales de la Libération.", "La Sécurité sociale (1945), les nationalisations (Renault, mines, électricité)." ], [ "Pourquoi de Gaulle quitte-t-il le pouvoir en 1946 ?", "Il veut un président fort, alors que les partis veulent une Assemblée puissante." ], [ "Que change l’année 1946 pour les Kanak ?", "L’indigénat est supprimé : ils deviennent citoyens français et obtiennent peu à peu le droit de vote." ] ],
        wiki: [ "Libération de la France", "Droit de vote des femmes en France", "Sécurité sociale en France", "Loi Lamine Guèye" ],
        src: [ [ "Le 29 avril 1945, les Françaises votent — Éduscol (ministère de l’Éducation nationale)", "https://eduscol.education.gouv.fr/6594/le-29-avril-1945-les-francaises-votent" ], [ "Qu’en est-il du droit de vote des femmes ? — Vie-publique.fr", "https://www.vie-publique.fr/fiches/23925-quen-est-il-du-droit-de-vote-des-femmes" ], [ "Les 33 femmes élues députées en 1945 — Assemblée nationale", "https://www2.assemblee-nationale.fr/decouvrir-l-assemblee/histoire/le-suffrage-universel/la-conquete-de-la-citoyennete-politique-des-femmes/les-33-femmes-elues-deputees-pour-la-premiere-fois-en-1945" ], [ "La Constitution du 27 octobre 1946 — Élysée", "https://www.elysee.fr/la-presidence/la-constitution-du-27-octobre-1946" ], [ "Nationalisation des usines Renault en 1945 — Conseil d’État", "https://conseil-etat.fr/site/actualites/nationalisation-des-usines-renault-en-1945" ], [ "Le programme du CNR : élaboration et mise en application — ministère des Armées, Chemins de mémoire", "https://www.defense.gouv.fr/chemins-memoire/actualites/programme-du-cnr-elaboration-mise-application" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la République est-elle refondée et la démocratie élargie à la Libération ?",
            but: "Faire comprendre que la Libération refonde une République plus démocratique (vote des femmes, citoyenneté outre-mer) et plus sociale (Sécurité sociale).",
            notions: [ "GPRF", "suffrage universel", "Sécurité sociale", "citoyenneté" ],
            comp: [ "Analyser et comprendre un document : extraire des informations d’un texte officiel", "Se repérer dans le temps : situer les réformes de 1944-1947" ],
            meth: "Étude d’extraits du programme du CNR et du préambule de 1946, puis carte animée.",
            accroche: "Une affiche électorale de 1945 montrant des femmes qui votent : « Que se passe-t-il de nouveau ? »",
            act: [ "Carte animée, étapes 1 à 3 : relever trois changements de la Libération (vote des femmes, Sécurité sociale, nationalisations).", "Lire un extrait du préambule de 1946 : souligner les nouveaux droits.", "Étape « de nouveaux citoyens outre-mer » : expliquer ce que 1946 change pour les Kanak." ],
            fin: "À la Libération, la République est rétablie et refondée. Les femmes votent pour la première fois en 1945 ; les habitants de l’outre-mer, dont les Kanak, deviennent citoyens en 1946. L’État crée la Sécurité sociale et nationalise de grandes entreprises. La IVe République est fondée en 1946.",
            suite: "Chapitre suivant : la République gaullienne."
        }
    }, {
        short: "1958-1969 : la République gaullienne",
        col: "fra",
        dur: 60,
        when: [ 1958, 1969 ],
        dates: "1958 – 1969",
        proj: "plan",
        cam: [ FR(0), FR(8), l(9, 3, 41, 2.6), l(18, 3, 41, 2.6), FR(19), FR(28), l(29, 3, 38, 1.9), l(40, 3, 38, 1.9), FR(41), FR(60) ],
        zones: m([ p("FRA", F, 1, .45), g(p("DZA", F, 9, .45), {
            t2: 33,
            t3: 35
        }), p("DZA", NEU, 34, .45) ]),
        routes: [],
        labels: [ a(1, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "plus de vingt gouvernements en douze ans",
            dx: 10,
            al: "left",
            end: 8
        }), a(10, 3.06, 36.75, "Alger", {
            mark: "ville",
            gold: !0,
            sub: "émeute du 13 mai 1958",
            dx: 10,
            al: "left",
            end: 18
        }), a(12, 4.88, 48.22, "Colombey-les-Deux-Églises", {
            mark: "ville",
            sub: "de Gaulle attend son retour",
            dx: 10,
            al: "left",
            end: 18
        }), a(15, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "de Gaulle au pouvoir, 1er juin 1958",
            dx: -10,
            al: "right",
            end: 18
        }), a(20, 2.6, 46.2, "Référendum du 28 septembre 1958", {
            nomark: !0,
            big: !0,
            sub: "79 % de oui à la nouvelle Constitution",
            end: 28
        }), a(23, PAR[0], PAR[1], "Paris, palais de l’Élysée", {
            mark: "ville",
            gold: !0,
            sub: "de Gaulle président, janvier 1959",
            dx: 10,
            al: "left",
            end: 28
        }), a(30, .17, 26.7, "Reggane", {
            mark: "site",
            sub: "première bombe atomique française, 1960",
            dx: 10,
            al: "left",
            end: 40
        }), a(31, 6.59, 46.4, "Évian", {
            mark: "site",
            sub: "fin de la guerre d’Algérie, mars 1962",
            dx: 10,
            al: "left",
            end: 40
        }), a(33, 2.25, 48.78, "Le Petit-Clamart", {
            mark: "site",
            sub: "attentat contre de Gaulle, août 1962",
            dx: -10,
            al: "right",
            end: 40
        }), a(36, 3.06, 36.75, "Alger", {
            mark: "ville",
            sub: "Algérie indépendante, juillet 1962",
            dx: 10,
            al: "left",
            end: 40
        }), a(42, 2.21, 48.9, "Nanterre", {
            mark: "site",
            sub: "révolte étudiante, mars 1968",
            dx: -10,
            al: "right",
            end: 50
        }), a(43, 2.34, 48.85, "Quartier latin", {
            mark: "site",
            gold: !0,
            sub: "barricades, 10-11 mai 1968",
            dx: 10,
            al: "left",
            end: 50
        }), a(45, -1.62, 47.18, "Nantes", {
            mark: "ville",
            sub: "première usine occupée, 14 mai 1968",
            dx: -10,
            al: "right",
            end: 50
        }), a(47, 2.6, 46, "Grève générale", {
            nomark: !0,
            big: !0,
            sub: "des millions de grévistes",
            end: 50
        }), a(52, 4.88, 48.22, "Colombey-les-Deux-Églises", {
            mark: "ville",
            gold: !0,
            sub: "de Gaulle s’y retire en 1969 ; il y meurt en 1970",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(10, 3.06, 36.75, "#ff6b57", !0), i(20, 2.6, 46.6, "#ffd166", !0), i(43, 2.34, 48.85, "#ff6b57", !0) ],
        ph: [ s(0, "La IVe République, un régime instable", "La IVe République reconstruit le pays, mais ses gouvernements tombent sans cesse : plus de vingt en douze ans. Elle s’enlise dans les guerres coloniales, en Indochine puis en Algérie.", "eur"), s(9, "Mai 1958 : la crise algérienne", "Le 13 mai 1958, à Alger, des partisans de l’Algérie française, soutenus par des généraux, s’emparent du siège du gouvernement général et réclament le retour du général de Gaulle. Pour éviter la guerre civile, le président de la République l’appelle : le 1er juin 1958, de Gaulle devient chef du gouvernement.", "pol"), s(19, "1958 : la Ve République", "Une nouvelle Constitution, préparée par Michel Debré, est approuvée par référendum le 28 septembre 1958, avec 79 % de oui. Elle renforce le président : il nomme le Premier ministre, peut dissoudre l’Assemblée, organiser des référendums et, en cas de crise grave, prendre des pouvoirs exceptionnels (article 16). De Gaulle est élu président en décembre 1958.", "fra"), s(29, "De Gaulle, président", "De Gaulle met fin à la guerre d’Algérie (accords d’Évian, 1962) et échappe à plusieurs attentats de l’OAS. En octobre 1962, un référendum décide que le président sera élu au suffrage universel direct ; en 1965, de Gaulle est réélu face à François Mitterrand. Il veut une France indépendante : bombe atomique (1960), sortie du commandement intégré de l’OTAN (1966).", "fra"), s(41, "Mai 68", "En mai 1968, les étudiants se révoltent contre une société qu’ils jugent autoritaire ; des barricades se dressent au Quartier latin. Les ouvriers les suivent : une grève générale paralyse le pays. Les accords de Grenelle augmentent fortement le salaire minimum. De Gaulle dissout l’Assemblée et gagne les élections de juin 1968, mais la société réclame plus de liberté.", "ense"), s(51, "1969 : le départ du général", "En avril 1969, les Français rejettent par référendum un projet de réforme des régions et du Sénat. De Gaulle démissionne aussitôt et se retire à Colombey-les-Deux-Églises, où il meurt en novembre 1970. Les institutions qu’il a fondées lui survivent.", "eur") ],
        photos: [ { id: "assemblee", t0: 20, t1: 27, pos: "tr", rot: 2, fit: "" }, { id: "degaulle1963", t0: 30, t1: 36, pos: "tr", rot: 2, fit: "contain" } ],
        legend: [ [ F, "France" ], [ NEU, "Algérie indépendante (1962)" ] ],
        mots: [ [ "Ve République", "Régime politique de la France depuis 1958." ], [ "Constitution", "Texte qui fixe l’organisation des pouvoirs et les droits des citoyens." ], [ "Référendum", "Vote par lequel les citoyens répondent par oui ou par non à une question." ], [ "Suffrage universel direct", "Les citoyens élisent eux-mêmes, sans intermédiaire : le président, depuis 1962." ], [ "Gaullisme", "Idées du général de Gaulle : un État fort et une France indépendante." ], [ "Mai 68", "Révolte étudiante et grève générale de mai-juin 1968." ] ],
        q: [ [ "Pourquoi la IVe République est-elle fragile ?", "Les gouvernements changent sans cesse et elle n’arrive pas à régler la guerre d’Algérie." ], [ "Comment de Gaulle revient-il au pouvoir en 1958 ?", "Après la crise du 13 mai 1958 à Alger, il est appelé à la tête du gouvernement le 1er juin." ], [ "Quels pouvoirs la Constitution de 1958 donne-t-elle au président ?", "Il nomme le Premier ministre, peut dissoudre l’Assemblée, organiser des référendums, prendre des pouvoirs exceptionnels (article 16)." ], [ "Que change le référendum de 1962 ?", "Le président est désormais élu au suffrage universel direct." ] ],
        wiki: [ "Crise de mai 1958", "Constitution française du 4 octobre 1958", "Référendum français de 1962", "Mai 68" ],
        src: [ [ "Les référendums de la Ve République et leurs résultats — Vie-publique.fr", "https://www.vie-publique.fr/fiches/23970-les-referendums-de-la-ve-republique-et-leurs-resultats" ], [ "Naissance de la Constitution de 1958 — Élysée", "https://www.elysee.fr/la-presidence/naissance-de-la-constitution-de-195" ], [ "Proclamation des résultats du scrutin du 21 décembre 1958 — Élysée", "https://www.elysee.fr/la-presidence/proclamation-des-resultats-du-scrutin-du-21-decembre-195" ], [ "Cinquième République, la période gaullienne : mai-juin 1968 — Encyclopædia Universalis", "https://www.universalis.fr/encyclopedie/cinquieme-republique-la-periode-gaullienne-1958-1969/6-mai-juin-1968/" ], [ "Cinquième République, la période gaullienne : la crise de 1962 — Encyclopædia Universalis", "https://www.universalis.fr/encyclopedie/cinquieme-republique-la-periode-gaullienne-1958-1969/3-la-crise-de-1962/" ], [ "En 1969, le référendum qui chasse de Gaulle de l’Élysée — Public Sénat", "https://www.publicsenat.fr/actualites/politique/en-1969-le-referendum-qui-chasse-de-gaulle-de-l-elysee-140357" ] ],
        fs: {
            niv: "3e",
            pb: "Comment de Gaulle fonde-t-il une République au pouvoir exécutif fort ?",
            but: "Faire comprendre la naissance de la Ve République, le rôle central du président et la crise de Mai 68.",
            notions: [ "Ve République", "Constitution", "référendum", "suffrage universel direct" ],
            comp: [ "Analyser et comprendre un document : lire un schéma des institutions", "Raisonner : expliquer pourquoi le président est au cœur du régime" ],
            meth: "Schéma des institutions de 1958 à compléter, à partir des étapes de la carte animée.",
            accroche: "Les résultats du référendum de 1958 en métropole et en Nouvelle-Calédonie : « Pourquoi tant de oui ? »",
            act: [ "Carte animée, étapes 1 et 2 : expliquer pourquoi la IVe République s’effondre en 1958.", "Compléter le schéma des institutions : président, gouvernement, Parlement, citoyens ; ajouter la réforme de 1962.", "Étape « Mai 68 » : relever qui proteste, pourquoi, et comment le pouvoir répond." ],
            fin: "En 1958, la crise algérienne ramène de Gaulle au pouvoir. La Constitution de la Ve République renforce le président, élu au suffrage universel direct depuis 1962. De Gaulle met fin à la guerre d’Algérie et défend l’indépendance de la France. Après Mai 68, il démissionne en 1969 ; ses institutions demeurent.",
            suite: "Chapitre suivant : alternances et cohabitations."
        }
    }, {
        short: "1969-2002 : alternances et cohabitations",
        col: "mis",
        dur: 60,
        when: [ 1969, 2002 ],
        dates: "1969 – 2002",
        proj: "plan",
        cam: [ FR(0), FR(60) ],
        zones: m([ p("FRA", F, 1, .45) ]),
        routes: [ n(F, 13, 16, 2.6, [ [ 2.37, 48.84 ], [ 3.9, 47.3 ], [ 4.84, 45.76 ] ], {
            dash: !0
        }) ],
        labels: [ a(1, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "Pompidou président, 1969-1974",
            dx: 10,
            al: "left",
            end: 10
        }), a(4, 7.56, 47.9, "Fessenheim", {
            mark: "site",
            sub: "centrale nucléaire, 1977",
            dx: 10,
            al: "left",
            end: 10
        }), a(6, 2.6, 46, "Majorité à 18 ans", {
            nomark: !0,
            big: !0,
            sub: "1974, sous Giscard d’Estaing",
            end: 10
        }), a(12, 2.37, 48.85, "Paris, Bastille", {
            mark: "ville",
            gold: !0,
            sub: "victoire de Mitterrand, 10 mai 1981",
            dx: 10,
            al: "left",
            end: 22
        }), a(15, 4.84, 45.76, "Lyon", {
            mark: "ville",
            sub: "premier TGV depuis Paris, 1981",
            dx: 10,
            al: "left",
            end: 22
        }), a(24, 5.37, 43.3, "Marseille", {
            mark: "ville",
            gold: !0,
            sub: "Gaston Defferre, maire et ministre",
            dx: 10,
            al: "left",
            end: 32
        }), a(25, 3.06, 50.63, "Lille", {
            mark: "ville",
            sub: "conseil régional",
            dx: 10,
            al: "left",
            end: 32
        }), a(25.5, -1.68, 48.11, "Rennes", {
            mark: "ville",
            sub: "conseil régional",
            dx: -10,
            al: "right",
            end: 32
        }), a(26, 1.44, 43.6, "Toulouse", {
            mark: "ville",
            sub: "conseil régional",
            dx: -10,
            al: "right",
            end: 32
        }), a(26.5, 7.75, 48.58, "Strasbourg", {
            mark: "ville",
            sub: "conseil régional",
            dx: 10,
            al: "left",
            end: 32
        }), a(34, 2.316, 48.871, "Élysée", {
            mark: "site",
            gold: !0,
            sub: "le président (Mitterrand)",
            dx: -10,
            al: "right",
            dy: -10,
            end: 42
        }), a(35, 2.32, 48.855, "Matignon", {
            mark: "site",
            gold: !0,
            sub: "le Premier ministre (Chirac, 1986-1988)",
            dx: 10,
            al: "left",
            dy: 10,
            end: 42
        }), a(44, 2.6, 46, "Trois cohabitations", {
            nomark: !0,
            big: !0,
            sub: "1986-1988, 1993-1995, 1997-2002",
            end: 51
        }), a(47, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "référendum sur le quinquennat, 2000",
            dx: 10,
            al: "left",
            end: 51
        }), a(53, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            gold: !0,
            sub: "21 avril 2002 : un choc électoral",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(12, 2.37, 48.85, "#ffd166", !0), i(35, 2.32, 48.855, "#ffd166", !0) ],
        ph: [ s(0, "Après de Gaulle", "Georges Pompidou (1969-1974) poursuit la modernisation : autoroutes, industrie, programme nucléaire. Valéry Giscard d’Estaing, élu en 1974, abaisse la majorité à 18 ans, fait voter la loi Veil (1975) et crée le collège unique. Le pouvoir reste à droite depuis 1958.", "mis"), s(11, "10 mai 1981 : l’alternance", "François Mitterrand, candidat socialiste, est élu président : pour la première fois sous la Ve République, la gauche arrive au pouvoir. Les institutions résistent à ce changement, preuve de leur solidité. Réformes : abolition de la peine de mort (1981, Robert Badinter), cinquième semaine de congés payés, retraite à 60 ans, nationalisations, radios libres.", "pol"), s(23, "La décentralisation", "Les lois Defferre (1982) donnent plus de pouvoirs aux communes, aux départements et aux régions, dirigés par des élus ; les conseils régionaux sont élus pour la première fois en 1986. L’État n’est plus le seul à décider de tout depuis Paris.", "jade"), s(33, "1986 : la première cohabitation", "En 1986, la droite gagne les élections législatives : Mitterrand doit nommer Premier ministre Jacques Chirac, son adversaire. Le président garde surtout la défense et la politique étrangère, le gouvernement conduit la politique intérieure. La Constitution fonctionne même quand président et majorité s’opposent. Mitterrand est réélu en 1988.", "kan"), s(43, "Cohabitations et quinquennat", "Deux autres cohabitations suivent : 1993-1995 (Édouard Balladur, sous Mitterrand), 1997-2002 (Lionel Jospin, sous Jacques Chirac, élu président en 1995). En 2000, un référendum réduit le mandat présidentiel de sept à cinq ans : c’est le quinquennat. La loi sur la parité (2000) pousse les partis à présenter autant de femmes que d’hommes.", "mis"), s(52, "Depuis 2002", "Le 21 avril 2002, le candidat d’extrême droite Jean-Marie Le Pen arrive au second tour ; Jacques Chirac est réélu très largement. Depuis, Nicolas Sarkozy (2007), François Hollande (2012) puis Emmanuel Macron (2017, réélu en 2022) ont été élus. L’abstention progresse et le fonctionnement des institutions reste débattu.", "eur") ],
        photos: [ { id: "pompidou1970", t0: 1, t1: 5, pos: "tr", rot: 2, fit: "" }, { id: "giscard1978", t0: 6, t1: 10, pos: "tr", rot: 2, fit: "contain" } ],
        legend: [ [ F, "France" ] ],
        mots: [ [ "Alternance", "Passage du pouvoir d’un camp politique à un autre, à la suite d’élections." ], [ "Cohabitation", "Situation où le président et la majorité de l’Assemblée sont de camps opposés." ], [ "Décentralisation", "Transfert de pouvoirs de l’État vers les collectivités élues (communes, départements, régions)." ], [ "Quinquennat", "Mandat de cinq ans du président, depuis 2002." ], [ "Parité", "Égalité du nombre de femmes et d’hommes, ici parmi les candidats aux élections." ], [ "Abolition de la peine de mort", "Loi de 1981 qui supprime la peine de mort en France." ] ],
        q: [ [ "Pourquoi l’élection de 1981 est-elle importante ?", "C’est la première alternance de la Ve République : la gauche arrive au pouvoir, et les institutions fonctionnent." ], [ "Qu’est-ce qu’une cohabitation ? Donner un exemple.", "Un président et un Premier ministre de camps opposés : Mitterrand et Chirac (1986-1988)." ], [ "Que change la décentralisation ?", "Les collectivités élues (régions, départements, communes) ont plus de pouvoirs." ], [ "Qu’est-ce que le quinquennat ?", "Le mandat de cinq ans du président, adopté par référendum en 2000." ] ],
        wiki: [ "Élection présidentielle française de 1981", "Cohabitation en France", "Lois Defferre", "Quinquennat présidentiel en France" ],
        src: [ [ "Le 9 octobre 1981, la peine de mort est abolie en France — info.gouv.fr", "https://www.info.gouv.fr/index.php/actualite/le-9-octobre-1981-la-peine-de-mort-est-abolie-en-france" ], [ "Les lois Defferre, premières lois de décentralisation — Vie-publique.fr", "https://www.vie-publique.fr/eclairage/38438-les-lois-defferre-premieres-lois-de-decentralisation" ], [ "Conseil des ministres du 25 mars 1982 : les ordonnances — Vie-publique.fr", "https://www.vie-publique.fr/discours/153385-cm-25-mars-1982-ordonnances" ], [ "Les cohabitations — Vie-publique.fr", "https://www.vie-publique.fr/parole-dexpert/270319-les-cohabitations" ], [ "Les référendums de la Ve République et leurs résultats (quinquennat, 2000) — Vie-publique.fr", "https://www.vie-publique.fr/fiches/23970-les-referendums-de-la-ve-republique-et-leurs-resultats" ], [ "Une présidentielle hors norme (2002) — Larousse, Journal de l’année", "https://www.larousse.fr/archives/journaux_annee/2003/25/une_presidentielle_hors_norme" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la Ve République s’adapte-t-elle à l’alternance et à la cohabitation ?",
            but: "Montrer la solidité et la souplesse des institutions de 1958 : alternance de 1981, cohabitations, réformes (décentralisation, quinquennat).",
            notions: [ "alternance", "cohabitation", "décentralisation", "quinquennat" ],
            comp: [ "Se repérer dans le temps : construire une frise des présidents et des cohabitations", "Pratiquer différents langages : rédiger un paragraphe argumenté" ],
            meth: "Frise des présidents et des Premiers ministres, colorée selon les camps, à partir de la carte animée.",
            accroche: "Photos de la place de la Bastille, le soir du 10 mai 1981 : « Pourquoi cette joie ? »",
            act: [ "Carte animée, étapes 1 et 2 : placer sur la frise les présidents de 1969 à 2002 et repérer l’alternance de 1981.", "Étapes 4 et 5 : colorier les périodes de cohabitation ; expliquer qui fait quoi.", "Rédiger : « Montre que la Ve République a su s’adapter. »" ],
            fin: "Après de Gaulle, la Ve République connaît l’alternance en 1981 avec l’élection de François Mitterrand, puis trois cohabitations entre 1986 et 2002. Les institutions s’adaptent : décentralisation (1982), quinquennat (2000), parité (2000). Elles montrent ainsi leur solidité.",
            suite: "Chapitre suivant : la société française des années 1950 aux années 1980."
        }
    }, {
        short: "La société française, des Trente Glorieuses à la crise",
        col: "afr",
        dur: 60,
        when: [ 1950, 1985 ],
        dates: "1950 – 1985",
        proj: "plan",
        cam: [ FR(0), FR(31), l(32, 2, 41, 2.2), l(42, 2, 41, 2.2), FR(43), FR(60) ],
        zones: m([ p("FRA", F, 1, .4), g(p("PRT ESP ITA", SRC, 33, .45), {
            t2: 42,
            t3: 44
        }), g(p("DZA MAR TUN", SRC, 33, .45), {
            t2: 42,
            t3: 44
        }), b(6, 49.25, .7, CRI, 44, .6), b(2.9, 50.45, .6, CRI, 45, .6) ]),
        routes: [ n(SRC, 33, 36, 2.4, [ [ -8.6, 41.15 ], [ -3, 43 ], [ PAR[0], PAR[1] ] ], {}), n(SRC, 33.5, 36.5, 2.4, [ [ 3.06, 36.8 ], [ 5.37, 43.3 ], [ 4.85, 45.76 ], [ PAR[0], PAR[1] ] ], {}), n(SRC, 34, 37, 2.4, [ [ 9.2, 45.46 ], [ 7, 47.5 ], [ 6.1, 49.2 ] ], {}), n(SRC, 34.5, 37.5, 2.4, [ [ -7.6, 33.6 ], [ -5.8, 35.8 ], [ -2, 43.3 ], [ 2.83, 50.43 ] ], {}) ],
        labels: [ a(1, -.62, 43.41, "Lacq", {
            mark: "site",
            sub: "gaz naturel, 1951",
            dx: 10,
            al: "left",
            end: 9
        }), a(2, 2.24, 48.83, "Boulogne-Billancourt", {
            mark: "site",
            sub: "usines Renault",
            dx: -10,
            al: "right",
            end: 9
        }), a(3, 6.8, 47.51, "Sochaux", {
            mark: "site",
            sub: "usines Peugeot",
            dx: 10,
            al: "left",
            end: 9
        }), a(11, 2.38, 49, "Sarcelles", {
            mark: "ville",
            gold: !0,
            sub: "grand ensemble, à partir de 1955",
            dx: 10,
            al: "left",
            end: 20
        }), a(13, 2.8, 45.3, "Exode rural", {
            nomark: !0,
            big: !0,
            sub: "les campagnes se vident",
            end: 20
        }), a(22, 2.32, 48.64, "Sainte-Geneviève-des-Bois", {
            mark: "site",
            sub: "premier hypermarché, 1963",
            dx: 10,
            al: "left",
            end: 31
        }), a(25, 7.27, 43.7, "Côte d’Azur", {
            mark: "site",
            sub: "vacances d’été au soleil",
            dx: 10,
            al: "left",
            end: 31
        }), a(33, -8, 39.5, "Portugal", {
            nomark: !0,
            end: 42
        }), a(33.2, 3, 29, "Algérie", {
            nomark: !0,
            end: 42
        }), a(33.4, -6, 32, "Maroc", {
            nomark: !0,
            end: 42
        }), a(33.6, 12.8, 42.6, "Italie", {
            nomark: !0,
            end: 42
        }), a(36, 2.21, 48.9, "Nanterre", {
            mark: "site",
            sub: "bidonvilles, années 1960",
            dx: -10,
            al: "right",
            end: 42
        }), a(44, 5.76, 49.52, "Longwy", {
            mark: "ville",
            gold: !0,
            sub: "fermeture des aciéries, 1979",
            dx: 10,
            al: "left",
            end: 52
        }), a(45, 2.83, 50.43, "Bassin minier", {
            mark: "site",
            sub: "les mines ferment",
            dx: -10,
            al: "right",
            end: 52
        }), a(54, 2.06, 49.04, "Cergy-Pontoise", {
            mark: "ville",
            sub: "ville nouvelle, années 1970",
            dx: -10,
            al: "right"
        }) ],
        pulses: [ i(11, 2.38, 49, "#ffd166", !0), i(44, 5.76, 49.52, "#ff6b57", !0) ],
        ph: [ s(0, "Les Trente Glorieuses", "De 1945 à 1973, l’économie française grandit d’environ 5 % par an : ce sont les « Trente Glorieuses ». Le chômage est très faible. L’industrie se modernise : automobile (Renault, Peugeot), gaz de Lacq, électricité, puis nucléaire.", "afr"), s(10, "Une société qui change", "Après la guerre, les naissances explosent : c’est le baby-boom. Les paysans quittent les campagnes pour les villes : ils représentaient plus d’un tiers des actifs en 1946, environ un sur dix en 1975. Les villes grandissent ; on construit des grands ensembles, comme à Sarcelles, pour loger les familles.", "mis"), s(21, "La société de consommation", "Les ménages s’équipent : réfrigérateur, machine à laver, télévision, voiture. Les supermarchés se multiplient ; le premier hypermarché ouvre en 1963. Avec la troisième (1956) puis la quatrième semaine de congés payés (1969), les départs en vacances deviennent courants. La jeunesse invente sa propre culture : rock, yé-yé, mode.", "kan"), s(32, "Les immigrés, bâtisseurs de la France", "Pour construire les routes, les logements et faire tourner les usines et les mines, la France fait venir des travailleurs d’Italie, d’Espagne, du Portugal, d’Algérie, du Maroc et de Tunisie. Beaucoup vivent d’abord dans des bidonvilles, comme à Nanterre. En 1974, la France suspend l’immigration de travail ; le regroupement familial est autorisé en 1976.", "esp"), s(43, "1973 : la crise", "Les chocs pétroliers de 1973 et 1979 font flamber le prix de l’énergie. La croissance ralentit et le chômage augmente : environ 2 millions de chômeurs au début des années 1980. Les mines, la sidérurgie de Lorraine et le textile du Nord ferment des usines ; à Longwy, en 1979, les ouvriers luttent contre la fermeture des aciéries.", "ense"), s(53, "Des réponses politiques", "L’État agit : salaire minimum (SMIC, 1970), indemnisation du chômage, aménagement du territoire et villes nouvelles (Cergy-Pontoise, Évry…), puis revenu minimum d’insertion (RMI, 1988). Mais la crise dure et les inégalités se creusent.", "mis") ],
        photos: [],
        legend: [ [ F, "France" ], [ SRC, "Principaux pays d’origine des immigrés" ], [ CRI, "Régions industrielles en crise" ] ],
        mots: [ [ "Trente Glorieuses", "Période de forte croissance économique, de 1945 à 1973." ], [ "Baby-boom", "Forte hausse des naissances après la Seconde Guerre mondiale." ], [ "Exode rural", "Départ des habitants des campagnes vers les villes." ], [ "Société de consommation", "Société où l’achat de biens et de loisirs occupe une place centrale." ], [ "Grand ensemble", "Quartier de grands immeubles construit rapidement à la périphérie des villes." ], [ "Choc pétrolier", "Forte hausse du prix du pétrole (1973, 1979) qui déclenche une crise économique." ] ],
        q: [ [ "Que sont les Trente Glorieuses ?", "La période de forte croissance de 1945 à 1973, avec très peu de chômage." ], [ "Citer deux transformations de la société pendant cette période.", "Le baby-boom, l’exode rural, la croissance des villes, la société de consommation." ], [ "Pourquoi la France fait-elle venir des travailleurs immigrés ?", "Pour construire les routes et les logements et faire tourner les usines et les mines." ], [ "Quelles sont les conséquences de la crise de 1973 ?", "Croissance ralentie, chômage en hausse, fermeture d’usines (mines, sidérurgie, textile)." ] ],
        wiki: [ "Trente Glorieuses", "Baby-boom", "Société de consommation", "Premier choc pétrolier" ],
        src: [ [ "Histoire des migrations et diversité des origines géographiques des immigrés — Insee", "https://www.insee.fr/fr/statistiques/6793226" ], [ "Évolution de la consommation des ménages depuis 1960 — Insee", "https://insee.fr/fr/statistiques/fichier/1372376/CONSO09c.PDF" ], [ "50 ans de consommation — Ministère de l’Économie, Facileco", "https://www.economie.gouv.fr/facileco/50-ans-consommation" ], [ "Évolution du chômage — Insee", "https://www.insee.fr/fr/statistiques/8376836" ], [ "Chronologie : les lois sur l’immigration depuis 1974 — Vie-publique.fr", "https://www.vie-publique.fr/eclairage/20162-chronologie-les-lois-sur-limmigration-depuis-1974" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la société française se transforme-t-elle des années 1950 aux années 1980 ?",
            but: "Faire comprendre la croissance des Trente Glorieuses, ses effets sur la vie quotidienne, le rôle des immigrés, puis la crise.",
            notions: [ "Trente Glorieuses", "exode rural", "société de consommation", "immigration" ],
            comp: [ "Analyser et comprendre un document : lire un graphique (taux d’équipement des ménages)", "Se repérer dans l’espace : localiser les régions qui se développent et celles en crise" ],
            meth: "Carte animée, puis courte enquête : interroger un grand-parent sur son enfance (équipement, vacances, travail).",
            accroche: "Une publicité des années 1960 pour un réfrigérateur : « Qu’est-ce qui change dans la maison ? »",
            act: [ "Carte animée, étapes 1 à 3 : relever trois signes de la croissance et de la société de consommation.", "Étape « Les immigrés » : indiquer les pays d’origine et les emplois occupés.", "Étape « 1973 : la crise » : expliquer pourquoi des régions industrielles déclinent." ],
            fin: "Pendant les Trente Glorieuses (1945-1973), la France connaît une forte croissance : baby-boom, exode rural, villes nouvelles, société de consommation. Les immigrés participent largement à cette croissance. Après les chocs pétroliers, la crise apporte le chômage et le déclin des vieilles régions industrielles.",
            suite: "Chapitre suivant : femmes et hommes, nouveaux enjeux et réponses politiques."
        }
    }, {
        short: "Femmes et hommes : nouveaux enjeux, réponses politiques",
        col: "cat",
        dur: 60,
        when: [ 1944, 1985 ],
        dates: "1945 – 1985",
        proj: "plan",
        cam: [ FR(0), FR(50), NCW(51), NCW(60) ],
        zones: m([ p("FRA", F, 1, .4), p("NCL", NCC, 51, .5) ]),
        routes: [],
        labels: [ a(1, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "33 femmes élues députées, 1945",
            dx: 10,
            al: "left",
            end: 9
        }), a(4, 2.6, 46, "La « femme au foyer »", {
            nomark: !0,
            big: !0,
            sub: "modèle des années 1950",
            end: 9
        }), a(12, 2.6, 46, "1965", {
            nomark: !0,
            big: !0,
            sub: "travailler et ouvrir un compte sans l’accord du mari",
            end: 19
        }), a(21, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "naissance du Mouvement de libération des femmes, 1970",
            dx: 10,
            al: "left",
            end: 29
        }), a(31, 2.6, 46.2, "Des lois nouvelles", {
            nomark: !0,
            big: !0,
            sub: "contraception 1967, majorité à 18 ans 1974, loi Veil 1975",
            end: 40
        }), a(33, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            gold: !0,
            sub: "Simone Veil défend sa loi à l’Assemblée, 1974",
            dx: 10,
            al: "left",
            end: 40
        }), a(42, 2.6, 46, "Égalité professionnelle", {
            nomark: !0,
            big: !0,
            sub: "loi Roudy, 1983",
            end: 50
        }), a(44, PAR[0], PAR[1], "Paris", {
            mark: "ville",
            sub: "moins de 6 % de députées en 1986",
            dx: 10,
            al: "left",
            end: 50
        }), a(52, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "la ville grandit avec le boom du nickel",
            dx: -10,
            al: "right"
        }), a(54, 166.21, -21.61, "Thio", {
            mark: "site",
            sub: "mines de nickel",
            dx: 10,
            al: "left"
        }), a(56, I[0], I[1], "Mélanésia 2000", {
            nomark: !0,
            sub: "festival kanak, Nouméa, 1975",
            dy: 18,
            dx: -10,
            al: "right"
        }) ],
        pulses: [ i(33, PAR[0], PAR[1], "#ffd166", !0), i(52, I[0], I[1], "#ffd166", !0) ],
        ph: [ s(0, "Citoyennes, mais pas encore égales", "Depuis 1944, les femmes votent, et le préambule de 1946 proclame l’égalité des femmes et des hommes. Pourtant, dans les années 1950, le modèle dominant reste celui de la « femme au foyer » ; une femme mariée a besoin de l’accord de son mari pour exercer un métier ou ouvrir un compte en banque.", "cat"), s(10, "Les femmes au travail", "De plus en plus de femmes travaillent, surtout dans les services : bureaux, enseignement, santé, commerce. La loi de 1965 leur permet de travailler et d’ouvrir un compte sans l’autorisation du mari. En 1972, la loi pose le principe « à travail égal, salaire égal ».", "mis"), s(20, "Mai 68 et la jeunesse", "Mai 68 exprime le désir de liberté d’une jeunesse nombreuse. Des mouvements féministes, comme le Mouvement de libération des femmes (1970), réclament l’égalité réelle et le droit pour les femmes de décider de leur vie.", "ense"), s(30, "Des lois qui changent la vie", "La loi Neuwirth autorise la contraception (1967). En 1970, l’autorité parentale remplace la « puissance paternelle ». En 1974, la majorité passe de 21 à 18 ans. En 1975, la loi défendue par Simone Veil autorise l’interruption volontaire de grossesse (IVG), le divorce par consentement mutuel est créé et la mixité se généralise dans les écoles.", "kan"), s(41, "Les années 1980 : des égalités encore à conquérir", "La peine de mort est abolie en 1981 ; en 1982, la loi cesse de punir l’homosexualité ; la loi Roudy (1983) impose l’égalité professionnelle. Mais les inégalités demeurent : salaires plus faibles, peu de femmes en politique (moins de 6 % de députées en 1986). Il faut attendre 1991 pour une première femme Première ministre, Édith Cresson, et 2000 pour la loi sur la parité.", "cat"), s(51, "En Nouvelle-Calédonie aussi", "Après 1946, les Kanak, libérés de l’indigénat, peuvent circuler, s’installer en ville, scolariser davantage leurs enfants. Le boom du nickel (1969-1972) attire des travailleurs de Wallis-et-Futuna, de Tahiti et de métropole : Nouméa grandit très vite. En 1975, le festival Mélanésia 2000, organisé notamment par Jean-Marie Tjibaou, affirme la fierté de la culture kanak.", "kan") ],
        photos: [ { id: "vote1945", t0: 1, t1: 8, pos: "tr", rot: 2, fit: "" }, { id: "veil", t0: 31, t1: 39, pos: "tr", rot: 2, fit: "contain" } ],
        legend: [ [ F, "France" ], [ NCC, "Nouvelle-Calédonie" ] ],
        mots: [ [ "Égalité femmes-hommes", "Principe selon lequel les femmes et les hommes ont les mêmes droits." ], [ "Féminisme", "Mouvement qui lutte pour l’égalité entre les femmes et les hommes." ], [ "Contraception", "Moyens d’éviter une grossesse, autorisés en France en 1967 (loi Neuwirth)." ], [ "Loi Veil", "Loi de 1975 qui autorise l’interruption volontaire de grossesse (IVG)." ], [ "Majorité civile", "Âge à partir duquel on est juridiquement adulte : 18 ans depuis 1974." ], [ "Mixité", "Fait que filles et garçons soient ensemble à l’école." ] ],
        q: [ [ "Que change la loi de 1965 pour les femmes mariées ?", "Elles peuvent travailler et ouvrir un compte en banque sans l’autorisation de leur mari." ], [ "Citer deux lois des années 1970 qui changent la vie des Français.", "La majorité à 18 ans (1974), la loi Veil (1975), le divorce par consentement mutuel (1975)." ], [ "Les femmes sont-elles égales aux hommes dans les années 1980 ? Justifier.", "Pas encore : salaires plus faibles, très peu de femmes en politique." ], [ "Qu’est-ce qui change en Nouvelle-Calédonie après 1946 ?", "Les Kanak, libérés de l’indigénat, circulent librement ; avec le boom du nickel, Nouméa grandit." ] ],
        wiki: [ "Condition des femmes en France", "Loi Neuwirth", "Loi Veil", "Mélanésia 2000" ],
        src: [ [ "Histoire des droits des femmes, chronologie 1945-2026 — Vie-publique.fr", "https://www.vie-publique.fr/eclairage/19590-histoire-des-droits-des-femmes-chronologie-1945-2026" ], [ "« La femme mariée avait le statut de mineure… » (loi du 13 juillet 1965) — info.gouv.fr", "https://www.info.gouv.fr/actualite/la-femme-mariee-avait-le-statut-de-mineure-au-meme-titre-que-les-enfants" ], [ "La loi du 17 janvier 1975 : le dossier législatif — Assemblée nationale", "https://www2.assemblee-nationale.fr/14/evenements/2015/anniversaire-loi-veil/la-loi-du-17-janvier-1975/le-dossier-legislatif" ], [ "Représentation politique — Insee Références (2022)", "https://www.insee.fr/fr/statistiques/6047773" ], [ "La fierté kanak retrouvée (Mélanésia 2000) — Les Nouvelles Calédoniennes", "https://www.lnc.nc/article/pays/culture/la-fierte-kanak-retrouvee" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la place des femmes et des hommes dans la société évolue-t-elle des années 1950 aux années 1980, et comment le pouvoir politique y répond-il ?",
            but: "Montrer les transformations sociales et culturelles (travail des femmes, jeunesse) et les lois qui y répondent, en France et en Nouvelle-Calédonie.",
            notions: [ "égalité femmes-hommes", "féminisme", "majorité civile", "mixité" ],
            comp: [ "Se repérer dans le temps : construire une frise des lois", "Analyser et comprendre un document : confronter deux documents" ],
            meth: "Frise des lois à compléter, puis étude d’un extrait du discours de Simone Veil à l’Assemblée (26 novembre 1974).",
            accroche: "Deux photographies de classe, l’une des années 1950 (non mixte), l’autre des années 1980 (mixte) : « Qu’est-ce qui a changé ? »",
            act: [ "Carte animée, étapes 1 et 2 : relever ce qu’une femme mariée ne pouvait pas faire avant 1965.", "Compléter une frise des lois de 1944 à 1983 (vote, travail, contraception, majorité, loi Veil, égalité professionnelle).", "Étape « En Nouvelle-Calédonie aussi » : relever deux changements de la société calédonienne." ],
            fin: "Des années 1950 aux années 1980, la société change : les femmes travaillent davantage, la jeunesse réclame plus de liberté. Les lois suivent : droits des femmes mariées (1965), contraception (1967), majorité à 18 ans (1974), loi Veil (1975), égalité professionnelle (1983). En Nouvelle-Calédonie, la fin de l’indigénat et le boom du nickel transforment aussi la société.",
            suite: "Chapitre suivant : la Nouvelle-Calédonie depuis 1946."
        }
    }, {
        short: "La Nouvelle-Calédonie depuis 1946",
        col: "kan",
        dur: 60,
        when: [ 1946, 2026 ],
        dates: "1946 – aujourd’hui",
        proj: "plan",
        cam: [ NCW(0), NCW(60) ],
        zones: m([ p("NCL", NCC, 1, .45) ]),
        routes: [],
        labels: [ a(1, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "chef-lieu du territoire d’outre-mer, 1946",
            dx: -10,
            al: "right",
            end: 9
        }), a(4, 165.6, -21.3, "Fin de l’indigénat", {
            nomark: !0,
            big: !0,
            sub: "1946",
            end: 9
        }), a(11, 166.21, -21.61, "Thio", {
            mark: "site",
            sub: "mines de nickel",
            dx: 10,
            al: "left",
            end: 19
        }), a(13, I[0], I[1], "Nouméa", {
            mark: "ville",
            sub: "boom du nickel, 1969-1972",
            dx: -10,
            al: "right",
            end: 19
        }), a(21, I[0], I[1], "Nouméa", {
            mark: "ville",
            sub: "Mélanésia 2000, 1975",
            dx: -10,
            al: "right",
            end: 29
        }), a(23, 165.5, -21.57, "Bourail", {
            mark: "ville",
            sub: "l’Union calédonienne choisit l’indépendance, 1977",
            dx: -10,
            al: "right",
            end: 29
        }), a(31, 164.9, -20.73, "Hienghène", {
            mark: "site",
            sub: "embuscade de Wan’yaat, 5 décembre 1984",
            dx: -10,
            al: "right",
            end: 40
        }), a(33, 165.83, -21.71, "La Foa", {
            mark: "site",
            sub: "mort d’Éloi Machoro, janvier 1985",
            dx: 10,
            al: "left",
            end: 40
        }), a(36, 166.55, -20.55, "Ouvéa", {
            mark: "site",
            gold: !0,
            sub: "grotte de Gossanah, avril-mai 1988",
            dx: 10,
            al: "left",
            end: 40
        }), a(41, 165.05, -20.9, "Province Nord", {
            nomark: !0,
            end: 50
        }), a(41.5, 166.35, -21.95, "Province Sud", {
            nomark: !0,
            end: 50
        }), a(42, 167.4, -20.35, "Province des îles Loyauté", {
            nomark: !0,
            end: 50
        }), a(44, 166.55, -20.55, "Ouvéa", {
            mark: "site",
            sub: "Tjibaou et Yeiwéné assassinés, 4 mai 1989",
            dx: 10,
            al: "left",
            dy: 12,
            end: 50
        }), a(46, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "accord de Nouméa, 5 mai 1998",
            dx: -10,
            al: "right",
            end: 50
        }), a(52, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "référendums de 2018, 2020 et 2021",
            dx: -10,
            al: "right"
        }) ],
        pulses: [ i(4, 165.6, -21.3, "#ffd166", !0), i(36, 166.55, -20.55, "#ff6b57", !0), i(46, I[0], I[1], "#ffd166", !0) ],
        ph: [ s(0, "1946-1957 : de l’indigénat à la citoyenneté", "En 1946, la Nouvelle-Calédonie devient un territoire d’outre-mer ; l’indigénat est supprimé et les Kanak deviennent citoyens. Le droit de vote s’étend peu à peu, à tous en 1957. En 1953 naît l’Union calédonienne, dont la devise est « Deux couleurs, un seul peuple ». La loi-cadre Defferre (1956) donne au territoire un conseil de gouvernement élu sur place (1957).", "kan"), s(10, "1958-1975 : nickel et recul de l’autonomie", "En 1958, la Nouvelle-Calédonie vote oui à la Constitution et reste un TOM. Les lois de 1963 et 1969 réduisent son autonomie ; l’État contrôle les mines. Le boom du nickel (1969-1972) attire des milliers de travailleurs ; en 1972, dans une lettre, le Premier ministre Pierre Messmer souhaite une immigration massive pour empêcher une revendication nationaliste kanak de l’emporter.", "mis"), s(20, "1975-1984 : la revendication indépendantiste", "Le festival Mélanésia 2000 (1975) affirme la culture kanak. En 1977, l’Union calédonienne choisit l’indépendance ; les partis indépendantistes s’unissent en 1979. En 1981, Pierre Declercq, secrétaire général de l’Union calédonienne, est assassiné. En 1984, ils fondent le FLNKS (Front de libération nationale kanak et socialiste), dirigé par Jean-Marie Tjibaou, et boycottent les élections de novembre.", "ense"), s(30, "1984-1988 : les « Événements »", "Le territoire frôle la guerre civile. Le 5 décembre 1984, dix Kanak, dont deux frères de Tjibaou, sont tués dans une embuscade près de Hienghène. En janvier 1985, Éloi Machoro est abattu par le GIGN. En avril 1988, à Ouvéa, quatre gendarmes sont tués et d’autres pris en otage dans une grotte ; l’assaut du 5 mai 1988 fait 21 morts, 19 Kanak et 2 militaires.", "pol"), s(40, "1988-1998 : les accords de la paix", "Le 26 juin 1988, Jean-Marie Tjibaou et Jacques Lafleur se serrent la main : les accords de Matignon, négociés avec le Premier ministre Michel Rocard, créent trois provinces et un « rééquilibrage » en faveur du Nord et des îles ; l’accord d’Oudinot (20 août 1988) les complète. Le 4 mai 1989, Tjibaou et Yeiwéné Yeiwéné sont assassinés à Ouvéa. L’accord de Nouméa (5 mai 1998) reconnaît « les ombres de la période coloniale », crée une citoyenneté calédonienne, transfère des compétences et prévoit jusqu’à trois consultations.", "jade"), s(51, "2018-2021 : trois référendums, et après ?", "Aux référendums de 2018 et 2020, le « non » à l’indépendance l’emporte (56,7 %, puis 53,3 %). En 2021, il obtient 96,5 %, mais les partis indépendantistes ont appelé à ne pas voter et contestent le résultat. En mai 2024, un projet de réforme du corps électoral déclenche de graves violences, qui font des morts. L’accord de Bougival (2025) divise les indépendantistes : le FLNKS le rejette. Aux provinciales du 28 juin 2026, aucun camp n’a la majorité au Congrès (28 sièges sur 54) : 24 pour les non-indépendantistes, 26 pour les listes indépendantistes.", "kan") ],
        photos: [ { id: "doniambo", t0: 11, t1: 18, pos: "tr", rot: 2, fit: "" }, { id: "drapeauxnc", t0: 41, t1: 49, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ NCC, "Nouvelle-Calédonie" ] ],
        mots: [ [ "Indigénat", "Régime juridique colonial imposé aux Kanak jusqu’en 1946 (travail forcé, interdiction de circuler librement)." ], [ "Revendication indépendantiste", "Volonté d’une partie de la population, surtout kanak, d’obtenir l’indépendance." ], [ "FLNKS", "Front de libération nationale kanak et socialiste, fondé en 1984." ], [ "Accords de Matignon", "Accords de 1988 qui ramènent la paix et créent les trois provinces." ], [ "Accord de Nouméa", "Accord de 1998 qui organise le transfert de compétences et les consultations sur l’avenir du pays." ], [ "Rééquilibrage", "Politique qui vise à réduire les inégalités entre le Sud et le Nord et les îles." ] ],
        q: [ [ "Que change l’année 1946 pour les Kanak ?", "La fin de l’indigénat : ils deviennent citoyens et obtiennent peu à peu le droit de vote." ], [ "Pourquoi parle-t-on des « Événements » (1984-1988) ?", "Une période de violences graves entre indépendantistes et anti-indépendantistes, jusqu’au drame d’Ouvéa." ], [ "Que créent les accords de Matignon (1988) ?", "Trois provinces et une politique de rééquilibrage ; ils ramènent la paix." ], [ "Combien de référendums sur l’indépendance ont eu lieu, et quand ?", "Trois : en 2018, 2020 et 2021." ] ],
        wiki: [ "Union calédonienne", "Événements en Nouvelle-Calédonie", "Accords de Matignon (1988)", "Accord de Nouméa" ],
        src: [ [ "Nouvelle-Calédonie : 3e référendum d’autodétermination, 12 décembre 2021 — Vie-publique.fr", "https://www.vie-publique.fr/eclairage/18649-nouvelle-caledonie-3e-referendum-dautodetermination-12-decembre-2021" ], [ "Référendum en Nouvelle-Calédonie : le non l’emporte (2021) — Public Sénat", "https://www.publicsenat.fr/actualites/politique/referendum-en-nouvelle-caledonie-le-non-a-l-independance-l-emporte-a-191563" ], [ "22 avril - 5 mai 1988 : la prise d’otages d’Ouvéa — Hérodote", "https://www.herodote.net/22_avril_5_mai_1988-evenement-19880422.php" ], [ "5 mai - 26 juin 1988 : les accords de Matignon — Hérodote", "https://www.herodote.net/5_mai_26_juin_1988-evenement-19880505.php" ], [ "Le FLNKS confirme le rejet de Bougival — Les Nouvelles Calédoniennes (2025)", "https://www.lnc.nc/article/nouvelle-caledonie/politique/le-flnks-confirme-le-rejet-de-bougival-et-fixe-a-2027-l-accession-a-la-pleine-souverainete" ], [ "Provinciales : à quoi va ressembler le futur Congrès — Les Nouvelles Calédoniennes (2026)", "https://www.lnc.nc/article/infographie-provinciales-a-quoi-va-ressembler-le-futur-congres" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la Nouvelle-Calédonie évolue-t-elle politiquement depuis 1946 ?",
            but: "Faire comprendre les grandes étapes : citoyenneté (1946), revendication indépendantiste, Événements, accords de paix, consultations. Sujet sensible : présenter les faits, laisser la place aux mémoires des familles sans les opposer.",
            notions: [ "indigénat", "revendication indépendantiste", "accords de Matignon et de Nouméa", "rééquilibrage" ],
            comp: [ "Se repérer dans le temps : construire une frise de 1946 à aujourd’hui", "Analyser et comprendre un document : décrire et expliquer une photographie historique" ],
            meth: "Frise chronologique, puis analyse de la photographie de la poignée de main du 26 juin 1988 ; prolongement possible avec l’atlas du Pacifique (« Histoire de la Nouvelle-Calédonie », chapitre 9) et l’EMC.",
            accroche: "La poignée de main Tjibaou-Lafleur (26 juin 1988) : « Qui sont ces deux hommes et pourquoi cette photo est-elle célèbre ? »",
            act: [ "Carte animée, étapes 1 et 2 : relever ce que 1946 change, puis ce qui réduit l’autonomie.", "Étapes 3 et 4 : expliquer en quelques phrases pourquoi la violence éclate dans les années 1980.", "Étapes 5 et 6 : compléter la frise (1988, 1989, 1998, 2018, 2020, 2021) et expliquer ce que prévoient les accords." ],
            fin: "Depuis 1946, les Kanak sont citoyens. Après une période de recul de l’autonomie et le boom du nickel, la revendication indépendantiste s’affirme et le territoire connaît des violences graves (1984-1988). Les accords de Matignon (1988) et de Nouméa (1998) ramènent la paix et organisent l’avenir ; trois référendums ont eu lieu (2018, 2020, 2021). L’avenir institutionnel reste en discussion.",
            suite: "Évaluation de fin de séquence : voir l’Espace collège."
        }
    } ];
    e.add({
        id: "republique",
        title: "La République depuis 1944",
        tag: "6 chapitres · XXe-XXIe siècles · 3e",
        col: "fra",
        proj: "plan",
        sub: "Françaises et Français dans une République repensée : la Libération, la Ve République de De Gaulle à la cohabitation, la société des Trente Glorieuses, femmes et hommes, et la Nouvelle-Calédonie depuis 1946.",
        frise: {
            from: 1944,
            to: 2026,
            lin: !0,
            ticks: [ [ 1944, "1944", 1 ], [ 1958, "1958", 1 ], [ 1968, "1968" ], [ 1981, "1981", 1 ], [ 1988, "1988" ], [ 1998, "1998", 1 ], [ 2021, "2021" ] ]
        },
        info: "<p><b>Collège, 3e, histoire, programme adapté à la Nouvelle-Calédonie</b> : thème 3 « Françaises et Français dans une République repensée ». Les quatre sous-thèmes sont couverts : 1944-1947, refonder la République (chapitre 1) ; la Ve République, de la République gaullienne à l’alternance et à la cohabitation (chapitres 2 et 3) ; femmes et hommes dans la société des années 1950 aux années 1980, en France et en Nouvelle-Calédonie (chapitres 4 et 5) ; la Nouvelle-Calédonie depuis 1946 (chapitre 6, à compléter avec l’atlas du Pacifique, volet « Histoire de la Nouvelle-Calédonie », chapitre 9, et l’EMC).</p><p><b>Cartes</b> : schémas, avec les frontières des pays actuels (Natural Earth, domaine public). Les provinces calédoniennes sont seulement nommées, sans limites tracées.</p><p><b>Chiffres</b> : ordres de grandeur, arrondis ; résultats officiels pour les référendums.</p><p><b>Sujets sensibles</b> : les Événements de 1984-1988, le drame d’Ouvéa et les violences de 2024 touchent directement des familles d’élèves. Les faits sont présentés sans jugement ; l’actualité institutionnelle (accord de Bougival en 2025, élections provinciales de 2026) évolue vite : elle est à mettre à jour par l’enseignant.</p>",
        chapters: B
    });
}();