/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Atlas du collège — volet « Le monde depuis 1945 » (3e). Écrit dans une autre conversation, directement dans l'artefact claude.ai ;
   récupéré le 17/11/2026 depuis la version publiée (code minifié remis en forme : les noms de variables courts viennent de là).
   Même format que v-colonies.js : chapitres, étapes (ph), questions (q), fiche séance (fs). */
/* Identifiant « monde45 » et non « monde » : « monde » est déjà le volet « Peupler la Terre » de l'atlas du Pacifique,
   dont le mode facile, le quiz et la galerie (facile.js, galerie.js) se seraient accrochés à ce volet-ci. */
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
    function EU(e) {
        return l(e, 16, 50, 1.6);
    }
    function PA(e) {
        return l(e, 150, 8, .62);
    }
    function NC(e) {
        return l(e, 165.6, -21.2, 13);
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
    function R(e, n, a, i) {
        return t([ e ], n, a, null == i ? .62 : i, 2);
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
    function v(e, a, i, s, r) {
        return (r = r || {}).ship = !0, r.sp = "vapeur", n(e, a, i, 3, s, r);
    }
    var US = "lap", SU = "pol", CN = "zh", NEU = "neo", FR = "fra", GB = "gbr", NL = "ned", BE = "ott", PT = "ere", AU = "aus", NZ = "ere", CON = "ame", ASSO = "esp", NUK = "ame", WAR = "ense", RU = "vide", CN2 = "esp", ATOLL = "mis", GRIS = "vide";
    var SIX = "kan", E73 = "mis", E81 = "ame", E95 = "jade", E04 = "lap";
    var I = [ 166.44, -22.27 ];
    var RIDEAU = [ [ 10.9, 54.2 ], [ 10.8, 53.6 ], [ 11.3, 52.9 ], [ 10.6, 52 ], [ 10.2, 51.4 ], [ 10, 50.6 ], [ 11.9, 50.4 ], [ 12.2, 50.3 ], [ 13.8, 48.8 ], [ 16.9, 48.6 ], [ 16.5, 47.6 ], [ 16.1, 46.8 ], [ 13.7, 45.6 ] ];
    var RDA = [ [ 10.9, 54 ], [ 11.6, 54.2 ], [ 13, 54.6 ], [ 14.2, 53.9 ], [ 14.4, 53.3 ], [ 14.1, 52.8 ], [ 14.6, 52.5 ], [ 14.7, 51.8 ], [ 15, 51.1 ], [ 14.3, 50.9 ], [ 13, 50.4 ], [ 12.2, 50.3 ], [ 11.9, 50.4 ], [ 10.5, 50.4 ], [ 10, 50.6 ], [ 10.2, 51.4 ], [ 10.6, 52 ], [ 11.3, 52.9 ], [ 10.8, 53.6 ] ];
    var MEDCUBA = [ [ 33.5, 44.6 ], [ 31, 43 ], [ 29.1, 41.2 ], [ 26.4, 40.1 ], [ 25, 38 ], [ 22, 36 ], [ 17, 35.5 ], [ 11.5, 37.3 ], [ 6, 37.8 ], [ 0, 36.5 ], [ -5.6, 35.95 ], [ -12, 35 ], [ -30, 30 ], [ -50, 26 ], [ -68, 24 ], [ -75, 23.5 ], [ -79.5, 23.2 ] ];
    var PACVN = [ [ -122.4, 37.8 ], [ -140, 30 ], [ -160, 22 ], [ 178, 18 ], [ 160, 16 ], [ 144.8, 13.4 ], [ 125, 12 ], [ 109, 10.5 ], [ 106.8, 10.6 ] ];
    var URSS = "UKR BLR MDA EST LVA LTU GEO ARM AZE KAZ UZB TKM KGZ TJK";
    var EST = "POL CZE SVK HUN ROU BGR";
    var B = [ {
        short: "1945-1962 : un monde bipolaire",
        col: "lap",
        dur: 60,
        when: [ 1945, 1962 ],
        dates: "1945 – 1962",
        proj: "plan",
        cam: [ u(0), u(8), EU(9), EU(26), l(27, 127, 38, 3.4), l(36, 127, 38, 3.4), EU(37), EU(46), l(47, -78, 27, 1.8), l(56, -78, 27, 1.8), u(57), u(60) ],
        zones: m([ p("USA", US, 2), p("RUS " + URSS, SU, 2), p("GBR FRA BEL NLD LUX ITA NOR DNK ISL PRT CAN", US, 11, .5), p("GRC TUR", US, 12, .45), p(EST + " ALB", SU, 12, .55), p("DEU", US, 20, .5), R(RDA, SU, 21, .65), p("CHN", CN, 25, .5), p("MNG", SU, 25, .5), p("PRK", SU, 28, .6), p("KOR", US, 28, .55), p("JPN TWN PHL AUS NZL", US, 34, .4), p("CUB", SU, 47, .65), b(-78, 23.5, 4.5, US, 51, .3) ]),
        routes: [ n(GRIS, 10, 13, 2.4, RIDEAU, {
            dash: !0,
            straight: !0,
            step: .3
        }), n(US, 19, 23, 2.4, [ [ 8.68, 50.11 ], [ 13.4, 52.52 ] ], {
            dash: !0
        }), n(US, 19.5, 23, 2.4, [ [ 10, 53.55 ], [ 13.4, 52.52 ] ], {
            dash: !0
        }), n(SU, 29, 31, 2.6, [ [ 125.75, 39.03 ], [ 127, 37.6 ], [ 128.6, 35.9 ], [ 129, 35.2 ] ], {}), n(US, 31, 33, 2.6, [ [ 126.6, 37.45 ], [ 126, 38.6 ], [ 125.6, 39.5 ], [ 124.8, 40.1 ] ], {}), n(CN, 33, 35, 2.6, [ [ 124.4, 40.1 ], [ 125.7, 39 ], [ 126.9, 37.6 ] ], {}), v(SU, 48, 53, MEDCUBA, {}) ],
        labels: [ a(1, -122.42, 37.77, "San Francisco", {
            mark: "ville",
            gold: !0,
            sub: "création de l’ONU, juin 1945",
            dx: 10,
            al: "left",
            end: 8
        }), a(2, -98, 40, "États-Unis", {
            nomark: !0,
            big: !0,
            end: 9
        }), a(2.5, 70, 60, "URSS", {
            nomark: !0,
            big: !0,
            end: 9
        }), a(4, -77.04, 38.9, "Washington", {
            mark: "ville",
            sub: "le président Truman",
            dx: 10,
            al: "left",
            end: 8
        }), a(10, 13.5, 47.3, "Rideau de fer", {
            nomark: !0,
            sub: "1946-1989",
            dx: 10,
            al: "left",
            end: 26
        }), a(11, 1.5, 46.5, "Europe de l’Ouest", {
            nomark: !0,
            sub: "aidée par le plan Marshall",
            end: 17
        }), a(12, 25, 48.5, "Europe de l’Est", {
            nomark: !0,
            sub: "démocraties populaires",
            end: 17
        }), a(18, 13.4, 52.52, "Berlin", {
            mark: "ville",
            gold: !0,
            sub: "blocus, 1948-1949",
            dx: 10,
            al: "left",
            end: 37
        }), a(20, 8.68, 50.11, "Francfort", {
            mark: "ville",
            sub: "départ du pont aérien",
            dx: -10,
            al: "right",
            end: 26
        }), a(22, 7.1, 50.73, "Bonn", {
            mark: "ville",
            sub: "capitale de la RFA, 1949",
            dx: -10,
            al: "right",
            dy: -14,
            end: 46
        }), a(23, 37.6, 55.75, "Moscou", {
            mark: "ville",
            sub: "bombe atomique soviétique, 1949",
            dx: 10,
            al: "left",
            end: 46
        }), a(28, 125.75, 39.03, "Pyongyang", {
            mark: "ville",
            sub: "Corée du Nord, communiste",
            dx: -10,
            al: "right",
            end: 37
        }), a(28.5, 126.98, 37.57, "Séoul", {
            mark: "ville",
            sub: "Corée du Sud, alliée des États-Unis",
            dx: 10,
            al: "left",
            end: 37
        }), a(36, 126.68, 37.95, "Panmunjom", {
            mark: "site",
            gold: !0,
            sub: "armistice, juillet 1953",
            dx: -10,
            al: "right",
            dy: 12,
            end: 37
        }), a(38, 21, 52.23, "Varsovie", {
            mark: "ville",
            sub: "pacte de Varsovie, 1955",
            dx: 10,
            al: "left",
            end: 46
        }), a(40, 19.04, 47.5, "Budapest", {
            mark: "ville",
            sub: "révolte écrasée, 1956",
            dx: 10,
            al: "left",
            end: 46
        }), a(42, 63.3, 45.9, "Baïkonour", {
            mark: "site",
            sub: "Spoutnik, 1957",
            dx: 10,
            al: "left",
            end: 46
        }), a(44, 13.4, 52.52, "Mur de Berlin", {
            mark: "site",
            gold: !0,
            sub: "13 août 1961",
            dx: 10,
            al: "left",
            end: 46
        }), a(47, -82.37, 23.13, "La Havane", {
            mark: "ville",
            sub: "Castro au pouvoir, 1959",
            dx: -10,
            al: "right",
            end: 57
        }), a(49, -77.04, 38.9, "Washington", {
            mark: "ville",
            sub: "le président Kennedy",
            dx: 10,
            al: "left",
            end: 57
        }), a(51, -73.5, 24.5, "Blocus américain", {
            nomark: !0,
            sub: "octobre 1962",
            end: 57
        }) ],
        pulses: [ i(18, 13.4, 52.52, "#ff6b57", !0), i(29, 127, 38, "#ff6b57", !0), i(50, -79.5, 22, "#ff6b57", !0) ],
        ph: [ s(0, "1945 : deux superpuissances", "En 1945, l’Europe est ruinée. Deux vainqueurs dominent le monde : les États-Unis, une démocratie au système capitaliste, et l’URSS de Staline, un régime communiste à parti unique. En juin 1945, à San Francisco, 50 pays signent la charte de l’ONU pour préserver la paix.", "eur"), s(9, "1947 : le monde se coupe en deux", "En 1947, le président américain Truman veut « endiguer » le communisme ; le plan Marshall aide l’Europe de l’Ouest à se reconstruire. L’URSS impose des régimes communistes en Europe de l’Est, les « démocraties populaires ». Un « rideau de fer » sépare désormais les deux Europe : c’est le début de la guerre froide.", "lap"), s(18, "1948-1949 : Berlin, première crise", "L’Allemagne vaincue est occupée par les quatre vainqueurs, Berlin aussi. En juin 1948, Staline bloque les routes vers Berlin-Ouest ; pendant près d’un an, les Américains ravitaillent la ville par un pont aérien. En 1949 naissent deux Allemagnes : la RFA à l’ouest, la RDA à l’est. La même année, l’OTAN est créée, l’URSS a la bombe atomique et la Chine devient communiste.", "pol"), s(27, "1950-1953 : une guerre chaude en Corée", "En juin 1950, la Corée du Nord communiste envahit la Corée du Sud. Les États-Unis interviennent avec des troupes de l’ONU ; la Chine envoie des centaines de milliers de « volontaires » aider le Nord. L’armistice de 1953 laisse la Corée coupée en deux, à peu près sur la ligne de départ. Cette guerre fait des millions de morts.", "zh"), s(37, "Deux blocs face à face", "Chaque bloc a son alliance militaire : l’OTAN (1949) à l’ouest, le pacte de Varsovie (1955) à l’est. En 1956, l’armée soviétique écrase la révolte de Budapest. Les deux Grands se lancent dans la course aux armes nucléaires et à l’espace (Spoutnik, 1957). En août 1961, la RDA construit le mur de Berlin pour empêcher ses habitants de fuir à l’Ouest.", "pol"), s(47, "Octobre 1962 : la crise de Cuba", "À Cuba, Fidel Castro a pris le pouvoir en 1959 et s’est allié à l’URSS. En octobre 1962, les Américains découvrent que les Soviétiques y installent des missiles nucléaires. Le président Kennedy organise un blocus de l’île. Le monde frôle la guerre nucléaire, puis Khrouchtchev retire ses missiles. En 1963, un « téléphone rouge » relie Washington et Moscou.", "ense") ],
        photos: [ { id: "yalta1945", t0: 1, t1: 8, pos: "tr", rot: 2, fit: "" }, { id: "coree1951", t0: 28, t1: 35, pos: "tr", rot: 2, fit: "" }, { id: "berlin1961", t0: 38, t1: 45, pos: "tr", rot: 2, fit: "contain" }, { id: "cuba1962", t0: 48, t1: 56, pos: "tr", rot: 2, fit: "contain" } ],
        legend: [ [ US, "Bloc de l’Ouest : États-Unis et alliés" ], [ SU, "Bloc de l’Est : URSS et alliés" ], [ CN, "Chine communiste (1949)" ] ],
        mots: [ [ "Guerre froide", "Affrontement entre les États-Unis et l’URSS, de 1947 à 1991, sans guerre directe entre eux." ], [ "Superpuissance", "État qui domine le monde par son armée, son économie et son influence : les États-Unis et l’URSS." ], [ "Bloc", "Ensemble de pays rassemblés autour d’une superpuissance." ], [ "Rideau de fer", "Frontière fermée qui coupe l’Europe en deux pendant la guerre froide." ], [ "Endiguement", "Politique américaine qui veut empêcher le communisme de s’étendre." ], [ "Dissuasion nucléaire", "Posséder l’arme atomique pour décourager l’adversaire d’attaquer." ] ],
        q: [ [ "Quels sont les deux camps de la guerre froide ?", "Le bloc de l’Ouest, autour des États-Unis, et le bloc de l’Est, autour de l’URSS." ], [ "Pourquoi parle-t-on de guerre « froide » ?", "Les deux superpuissances ne se combattent jamais directement : elles s’affrontent par des crises, par leurs alliés et par la course aux armements." ], [ "Que se passe-t-il à Berlin en 1948-1949, puis en 1961 ?", "Le blocus de Berlin-Ouest par l’URSS, contourné par un pont aérien ; puis la construction du mur de Berlin." ], [ "Pourquoi la crise de Cuba est-elle si dangereuse ?", "Des missiles nucléaires soviétiques sont installés tout près des États-Unis : le monde frôle la guerre nucléaire." ] ],
        wiki: [ "Guerre froide", "Blocus de Berlin", "Guerre de Corée", "Crise des missiles de Cuba" ],
        src: [ [ "La conférence de San Francisco, charte signée le 26 juin 1945 — Organisation des Nations unies", "https://www.un.org/en/node/130983" ], [ "Le plan Marshall, discours du 5 juin 1947 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1945-1952/marshall-plan" ], [ "La doctrine Truman, discours du 12 mars 1947 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1945-1952/truman-doctrine" ], [ "Le pont aérien de Berlin, 1948-1949 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1945-1952/berlin-airlift" ], [ "L’armistice de Corée, 27 juillet 1953 — Archives nationales des États-Unis (Prologue)", "https://www.archives.gov/publications/prologue/2003/summer/korean-war-armistice" ], [ "La crise des missiles de Cuba, octobre 1962 — Archives nationales des États-Unis (Prologue)", "https://www.archives.gov/publications/prologue/2002/fall/cuban-missiles.html" ] ],
        fs: {
            niv: "3e",
            pb: "Comment le monde se divise-t-il en deux blocs après 1945 ?",
            but: "Faire comprendre la naissance de la guerre froide et ses crises, sans affrontement direct entre les deux Grands.",
            notions: [ "guerre froide", "bloc", "rideau de fer", "dissuasion nucléaire" ],
            comp: [ "Se repérer dans l’espace : localiser les lieux des crises sur un planisphère", "Analyser et comprendre un document : identifier le point de vue de chaque camp" ],
            meth: "Carte animée commentée, puis croquis simple des deux blocs et des crises.",
            accroche: "Photographie du mur de Berlin : « Pourquoi construire un mur au milieu d’une ville ? »",
            act: [ "Carte animée, étapes 1 et 2 : colorier les deux blocs sur un planisphère muet ; nommer les deux superpuissances.", "Étapes 3 à 5 : compléter un tableau des crises (Berlin, Corée, Cuba) : date, lieu, camps, issue.", "Étape « crise de Cuba » : expliquer pourquoi la guerre reste « froide »." ],
            fin: "Après 1945, les États-Unis et l’URSS s’opposent : c’est la guerre froide. Le monde se divise en deux blocs, séparés en Europe par le rideau de fer. Les crises (Berlin, Corée, Cuba) font craindre une guerre nucléaire, mais les deux Grands ne s’affrontent jamais directement.",
            suite: "Chapitre suivant : de la détente à la fin de l’URSS."
        }
    }, {
        short: "De la détente à la fin de l’URSS",
        col: "pol",
        dur: 60,
        when: [ 1962, 1991 ],
        dates: "1962 – 1991",
        proj: "plan",
        cam: [ u(0), u(8), l(9, 140, 18, .8), l(12, 140, 18, .8), l(13, 106, 15, 3), l(19, 106, 15, 3), l(20, -175, -5, .75), l(31, -175, -5, .75), l(32, 55, 42, 1.4), l(39, 55, 42, 1.4), EU(40), EU(49), l(50, 60, 52, .9), l(56, 60, 52, .9), u(57), u(60) ],
        zones: m([ p("USA", US, 0), p("CAN GBR FRA BEL NLD LUX ITA NOR DNK ISL PRT GRC TUR", US, 0, .45), p("JPN KOR AUS NZL", US, 0, .4), p("DEU", US, 0, .5), p("RUS", SU, 0), g(p(URSS, SU, 0), {
            t2: 50,
            t3: 53
        }), g(p(EST, SU, 0, .55), {
            t2: 42,
            t3: 45
        }), g(R(RDA, SU, 0, .65), {
            t2: 43,
            t3: 45
        }), p("CUB", SU, 0, .6), p("CHN", CN, 0, .45), p("VNM", SU, 17, .55), g(p("AFG", SU, 33, .5), {
            t2: 46,
            t3: 48
        }), p(EST, NEU, 44, .4), p(URSS, NEU, 51, .45), b(165.4, 11.6, 2.2, NUK, 21, .75), b(-157.4, 1.9, 2, NUK, 23, .75), b(131.6, -30.2, 2, NUK, 23.5, .65), b(-138.9, -21.9, 2.4, NUK, 25, .8) ]),
        routes: [ n(US, 10, 13, 2.4, PACVN, {
            dash: !0
        }) ],
        labels: [ a(1, -77.04, 38.9, "Washington", {
            mark: "ville",
            sub: "téléphone rouge, 1963",
            dx: -10,
            al: "right",
            end: 8
        }), a(2, 37.6, 55.75, "Moscou", {
            mark: "ville",
            sub: "accords SALT, 1972",
            dx: 10,
            al: "left",
            end: 8
        }), a(4, 14.42, 50.08, "Prague", {
            mark: "ville",
            sub: "printemps écrasé, 1968",
            dx: -10,
            al: "right",
            dy: 12,
            end: 8
        }), a(10, -122.42, 37.77, "San Francisco", {
            mark: "port",
            sub: "départ des soldats",
            dx: 10,
            al: "left",
            end: 12
        }), a(14, 105.85, 21.03, "Hanoï", {
            mark: "ville",
            sub: "Viêt Nam du Nord, communiste",
            dx: 10,
            al: "left",
            end: 19
        }), a(15, 106.7, 10.78, "Saïgon", {
            mark: "ville",
            gold: !0,
            sub: "prise par le Nord, avril 1975",
            dx: 10,
            al: "left",
            end: 19
        }), a(21, 165.4, 11.6, "Bikini", {
            mark: "site",
            sub: "États-Unis, 1946-1958",
            dx: 10,
            al: "left",
            end: 31
        }), a(23, -157.4, 1.9, "Kiritimati", {
            mark: "site",
            sub: "Royaume-Uni puis États-Unis, 1957-1962",
            dx: 10,
            al: "left",
            end: 31
        }), a(23.5, 131.6, -30.2, "Maralinga", {
            mark: "site",
            sub: "Royaume-Uni, 1956-1957",
            dx: 10,
            al: "left",
            end: 31
        }), a(25, -138.9, -21.85, "Moruroa", {
            mark: "site",
            gold: !0,
            sub: "France, 1966-1996",
            dx: 10,
            al: "left",
            end: 31
        }), a(27, -159.78, -21.23, "Rarotonga", {
            mark: "ville",
            sub: "traité de zone dénucléarisée, 1985",
            dx: -10,
            al: "right",
            end: 31
        }), a(28, 174.76, -36.85, "Auckland", {
            mark: "port",
            sub: "Rainbow Warrior coulé, 1985",
            dx: 10,
            al: "left",
            end: 31
        }), a(33, 69.17, 34.53, "Kaboul", {
            mark: "ville",
            gold: !0,
            sub: "invasion soviétique, décembre 1979",
            dx: 10,
            al: "left",
            end: 40
        }), a(41, 18.65, 54.35, "Gdańsk", {
            mark: "port",
            sub: "syndicat Solidarność, 1980",
            dx: 10,
            al: "left",
            end: 50
        }), a(43, 13.4, 52.52, "Berlin", {
            mark: "ville",
            gold: !0,
            sub: "chute du mur, 9 novembre 1989",
            dx: -10,
            al: "right",
            end: 50
        }), a(45, 14.42, 50.08, "Prague", {
            mark: "ville",
            sub: "« révolution de velours », 1989",
            dx: 10,
            al: "left",
            end: 50
        }), a(51, 37.6, 55.75, "Moscou", {
            mark: "ville",
            gold: !0,
            sub: "fin de l’URSS, décembre 1991",
            dx: 10,
            al: "left",
            end: 57
        }), a(52, 31, 49, "Ukraine", {
            nomark: !0,
            sub: "indépendante, 1991",
            end: 57
        }), a(52.5, 67, 48, "Kazakhstan", {
            nomark: !0,
            end: 57
        }) ],
        pulses: [ i(15, 106.7, 10.78, "#ff6b57", !0), i(25, -138.9, -21.85, "#ffd166", !0), i(43, 13.4, 52.52, "#ffd166", !0) ],
        ph: [ s(0, "Après Cuba, la détente", "Après la crise de Cuba, les deux Grands cherchent à éviter la guerre nucléaire : « téléphone rouge » (1963), traités qui limitent les essais nucléaires puis les armements (accords SALT, 1972). C’est la détente. Mais la rivalité continue : en 1968, les chars soviétiques écrasent le « printemps de Prague ».", "eur"), s(9, "La guerre du Viêt Nam", "Pour empêcher le communisme de gagner le Viêt Nam du Sud, les États-Unis y envoient jusqu’à plus de 500 000 soldats (1965-1973). Malgré les bombardements et le napalm, ils ne gagnent pas ; aux États-Unis et dans le monde, beaucoup protestent. Les Américains se retirent en 1973 ; en avril 1975, le Nord prend Saïgon et réunifie le pays sous un régime communiste.", "lap"), s(20, "Le Pacifique, terrain d’essais nucléaires", "Les puissances testent leurs bombes loin de chez elles : les États-Unis aux îles Marshall (Bikini) et jusqu’en 1962, le Royaume-Uni en Australie et à Kiritimati, la France à Moruroa et Fangataufa, en Polynésie française (193 essais, 1966-1996). Des habitants et des travailleurs exposés en subissent encore les conséquences. En 1985, les pays du Forum créent à Rarotonga une zone dénucléarisée ; la même année, des agents secrets français coulent le Rainbow Warrior de Greenpeace à Auckland.", "ame"), s(32, "Le retour des tensions", "En décembre 1979, l’URSS envahit l’Afghanistan ; elle s’y enlise pendant dix ans. Le président américain Reagan relance la course aux armements. Mais l’économie soviétique s’épuise : les magasins sont vides, le système est à bout de souffle.", "pol"), s(40, "1989 : la chute du mur", "En 1985, Gorbatchev prend la tête de l’URSS : il veut réformer le pays et n’envoie plus ses chars en Europe de l’Est. En Pologne, le syndicat Solidarność, né en 1980, gagne les élections de 1989. Le 9 novembre 1989, le mur de Berlin s’ouvre. Les régimes communistes d’Europe de l’Est tombent les uns après les autres ; l’Allemagne est réunifiée le 3 octobre 1990.", "neo"), s(50, "1991 : la fin de l’URSS", "Les républiques soviétiques réclament leur indépendance. En décembre 1991, l’URSS disparaît : quinze États la remplacent, dont la Russie et l’Ukraine. La guerre froide est finie ; les États-Unis restent la seule superpuissance.", "eur") ],
        photos: [ { id: "vietnam1965", t0: 10, t1: 18, pos: "tr", rot: 2, fit: "" }, { id: "bikini1946", t0: 21, t1: 30, pos: "tr", rot: 2, fit: "contain" }, { id: "reagangorbatchev1987", t0: 41, t1: 45, pos: "tr", rot: 2, fit: "" }, { id: "reunification1990", t0: 45, t1: 50, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ US, "Bloc de l’Ouest" ], [ SU, "Bloc de l’Est" ], [ NEU, "Pays sortis du bloc de l’Est (1989-1991)" ], [ NUK, "Sites d’essais nucléaires" ], [ "ere", "Port", "port" ] ],
        mots: [ [ "Détente", "Période où les deux Grands cherchent à réduire les risques de guerre nucléaire." ], [ "Essai nucléaire", "Explosion d’une bombe atomique pour la tester." ], [ "Zone dénucléarisée", "Région où les armes et les essais nucléaires sont interdits par traité." ], [ "Démocratie populaire", "Nom des régimes communistes d’Europe de l’Est contrôlés par l’URSS." ], [ "Chute du mur", "Ouverture du mur de Berlin le 9 novembre 1989, symbole de la fin de la guerre froide." ], [ "Effondrement de l’URSS", "Disparition de l’Union soviétique en décembre 1991, remplacée par quinze États." ] ],
        q: [ [ "Qu’appelle-t-on la détente ?", "La période où les deux Grands cherchent à limiter les risques de guerre nucléaire (téléphone rouge, accords de limitation des armements)." ], [ "Pourquoi les États-Unis font-ils la guerre au Viêt Nam ?", "Pour empêcher le communisme de s’étendre au Viêt Nam du Sud." ], [ "Quelles puissances ont fait des essais nucléaires dans le Pacifique ?", "Les États-Unis, le Royaume-Uni et la France (en Polynésie française, de 1966 à 1996)." ], [ "Que se passe-t-il le 9 novembre 1989 ?", "Le mur de Berlin s’ouvre : c’est le symbole de la fin de la guerre froide." ] ],
        wiki: [ "Détente (guerre froide)", "Guerre du Viêt Nam", "Essais nucléaires français", "Chute du mur de Berlin" ],
        src: [ [ "Les essais nucléaires en Polynésie française : 193 essais de 1966 à 1996 (rapport n° 640, synthèse) — Sénat", "https://www.senat.fr/rap/l25-640/l25-640-syn.pdf" ], [ "L’effondrement de l’Union soviétique, 1989-1992 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1989-1992/collapse-soviet-union" ], [ "L’invasion soviétique de l’Afghanistan, décembre 1979 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1977-1980/soviet-invasion-afghanistan" ], [ "Les élections législatives polonaises de 1989 — Réseau européen Mémoire et Solidarité (ENRS)", "https://enrs.eu/news/polish-legislative-elections-of-1989" ], [ "Le pic des troupes américaines au Viêt Nam (avril 1969) — Vietnam War Commemoration, département de la Défense américain", "https://vietnamwar50th.com/1969-1971_vietnamization/Peak-U-S-Troop-Levels" ], [ "Les essais américains de l’opération Dominic (1962) à Kiritimati et Johnston — Département de l’Énergie américain (OSTI)", "https://www.osti.gov/servlets/purl/1324547" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la guerre froide se poursuit-elle, jusque dans le Pacifique, avant de prendre fin en 1991 ?",
            but: "Faire comprendre l’alternance de détente et de tensions, la place du Pacifique dans la course aux armements, puis l’effondrement du bloc de l’Est.",
            notions: [ "détente", "essai nucléaire", "chute du mur", "fin de l’URSS" ],
            comp: [ "Se repérer dans le temps : construire une frise des grandes étapes de la guerre froide", "Raisonner : expliquer pourquoi la guerre froide s’achève" ],
            meth: "Frise chronologique collective, puis étude de cas régionale sur les essais nucléaires.",
            accroche: "Carte des sites d’essais du Pacifique : « Pourquoi faire exploser des bombes au milieu de l’océan ? »",
            act: [ "Carte animée, étapes 1 et 2 : placer sur la frise la détente et la guerre du Viêt Nam.", "Étape « Le Pacifique, terrain d’essais nucléaires » : localiser Bikini, Kiritimati, Moruroa ; relever qui teste, quand, et les conséquences pour les habitants.", "Étapes 5 et 6 : expliquer en trois phrases comment la guerre froide se termine (1989-1991)." ],
            fin: "Après 1962, la détente alterne avec des tensions (Viêt Nam, Afghanistan). Le Pacifique sert de terrain d’essais nucléaires aux États-Unis, au Royaume-Uni et à la France, jusqu’en 1996. En 1989, le mur de Berlin tombe ; en 1991, l’URSS disparaît : la guerre froide est finie.",
            suite: "Chapitre suivant : les décolonisations en Asie et en Afrique."
        }
    }, {
        short: "Les décolonisations en Asie et en Afrique",
        col: "neo",
        dur: 60,
        when: [ 1945, 1975 ],
        dates: "1945 – 1975",
        proj: "plan",
        cam: [ u(0), u(7), l(8, 95, 15, 1.1), l(15, 95, 15, 1.1), l(16, 105, 16, 3), l(23, 105, 16, 3), l(24, 100, 5, 1.2), l(27, 100, 5, 1.2), l(28, 12, 5, 1.15), l(37, 12, 5, 1.15), l(38, 4, 38, 3), l(49, 4, 38, 3), l(50, 18, -5, 1.1), l(55, 18, -5, 1.1), u(56), u(60) ],
        zones: m([ p("FRA", FR, 1, .6), p("GBR", GB, 1, .6), p("NLD", NL, 1, .6), p("BEL", BE, 1, .6), p("PRT", PT, 1, .6), g(p("VNM LAO KHM", FR, 1), {
            t2: 22,
            t3: 23
        }), g(p("MAR TUN", FR, 1), {
            t2: 29,
            t3: 30
        }), g(p("DZA", FR, 1), {
            t2: 47,
            t3: 48
        }), g(p("GIN", FR, 1), {
            t2: 32,
            t3: 33
        }), g(p("SEN MLI CIV BFA NER BEN MRT TCD CAF COG GAB CMR TGO MDG", FR, 1), {
            t2: 35,
            t3: 36
        }), g(p("IND PAK BGD", GB, 1), {
            t2: 12,
            t3: 13
        }), g(p("MMR LKA", GB, 1), {
            t2: 13,
            t3: 14
        }), g(p("SDN", GB, 1), {
            t2: 29,
            t3: 30
        }), g(p("GHA MYS", GB, 1), {
            t2: 31,
            t3: 32
        }), g(p("NGA SOM", GB, 1), {
            t2: 35,
            t3: 36
        }), g(p("TZA UGA KEN SLE ZMB MWI GMB BWA LSO", GB, 1), {
            t2: 49,
            t3: 50
        }), g(p("IDN", NL, 1), {
            t2: 10,
            t3: 11
        }), g(p("COD", BE, 1), {
            t2: 35,
            t3: 36
        }), g(p("RWA BDI", BE, 1), {
            t2: 49,
            t3: 50
        }), g(p("AGO MOZ GNB", PT, 1), {
            t2: 53,
            t3: 54
        }), p("IDN", NEU, 10.5), p("IND PAK BGD", NEU, 12.5), p("MMR LKA", NEU, 13.5), p("VNM LAO KHM", NEU, 22.5), p("SDN MAR TUN", NEU, 29.5), p("GHA MYS", NEU, 31.5), p("GIN", NEU, 32.5), p("SEN MLI CIV BFA NER BEN MRT TCD CAF COG GAB CMR TGO MDG NGA SOM COD", NEU, 35.5), p("DZA", NEU, 47.5), p("TZA UGA KEN SLE ZMB MWI GMB BWA LSO RWA BDI", NEU, 49.5), p("AGO MOZ GNB", NEU, 53.5) ]),
        routes: [ v(FR, 47, 50, [ [ 3.06, 36.8 ], [ 4, 39 ], [ 5.35, 43.3 ] ], {}) ],
        labels: [ a(1, 5.41, 36.19, "Sétif", {
            mark: "site",
            sub: "répression, mai 1945",
            dx: 10,
            al: "left",
            end: 7
        }), a(2, 47, -19, "Madagascar", {
            nomark: !0,
            sub: "insurrection, 1947",
            end: 7
        }), a(9, 106.85, -6.2, "Djakarta", {
            mark: "ville",
            gold: !0,
            sub: "Indonésie, 1945-1949",
            dx: 10,
            al: "left",
            end: 15
        }), a(12, 77.2, 28.6, "New Delhi", {
            mark: "ville",
            gold: !0,
            sub: "Inde, 15 août 1947",
            dx: 10,
            al: "left",
            end: 15
        }), a(12.5, 69, 29, "Pakistan", {
            nomark: !0,
            sub: "1947",
            end: 15
        }), a(17, 105.85, 21.03, "Hanoï", {
            mark: "ville",
            sub: "Hô Chi Minh proclame l’indépendance, 1945",
            dx: 10,
            al: "left",
            end: 23
        }), a(19, 103.02, 21.39, "Diên Biên Phu", {
            mark: "site",
            gold: !0,
            sub: "7 mai 1954",
            dx: -10,
            al: "right",
            end: 23
        }), a(21, 107.5, 17, "17e parallèle", {
            nomark: !0,
            sub: "Viêt Nam coupé en deux, 1954",
            dx: 10,
            al: "left",
            end: 23
        }), a(24, 107.6, -6.9, "Bandung", {
            mark: "ville",
            gold: !0,
            sub: "conférence, avril 1955",
            dx: 10,
            al: "left",
            end: 28
        }), a(29, -6.84, 34.02, "Rabat", {
            mark: "ville",
            sub: "Maroc, 1956",
            dx: -10,
            al: "right",
            end: 37
        }), a(29.3, 10.18, 36.8, "Tunis", {
            mark: "ville",
            sub: "Tunisie, 1956",
            dx: 10,
            al: "left",
            end: 37
        }), a(30, 32.55, 30, "Suez", {
            mark: "port",
            sub: "crise, 1956",
            dx: 10,
            al: "left",
            end: 37
        }), a(31, -.19, 5.6, "Accra", {
            mark: "ville",
            sub: "Ghana, 1957",
            dx: 10,
            al: "left",
            end: 37
        }), a(32, -13.7, 9.5, "Conakry", {
            mark: "ville",
            sub: "Guinée, 1958",
            dx: -10,
            al: "right",
            end: 37
        }), a(35, -17.44, 14.69, "Dakar", {
            mark: "ville",
            sub: "Sénégal, 1960",
            dx: -10,
            al: "right",
            end: 37
        }), a(35.5, 15.3, -4.3, "Léopoldville", {
            mark: "ville",
            sub: "Congo, 1960",
            dx: 10,
            al: "left",
            end: 37
        }), a(36, 47.5, -18.9, "Tananarive", {
            mark: "ville",
            sub: "Madagascar, 1960",
            dx: 10,
            al: "left",
            end: 37
        }), a(39, 3.06, 36.75, "Alger", {
            mark: "ville",
            gold: !0,
            sub: "guerre, 1954-1962",
            dx: -10,
            al: "right",
            end: 50
        }), a(41, 6.5, 35.3, "Aurès", {
            mark: "site",
            sub: "1er novembre 1954",
            dx: 10,
            al: "left",
            end: 50
        }), a(45, 6.59, 46.4, "Évian", {
            mark: "site",
            gold: !0,
            sub: "accords, 18 mars 1962",
            dx: 10,
            al: "left",
            end: 50
        }), a(48, 5.37, 43.3, "Marseille", {
            mark: "port",
            sub: "arrivée des rapatriés, 1962",
            dx: 10,
            al: "left",
            end: 50
        }), a(50, 36.82, -1.29, "Nairobi", {
            mark: "ville",
            sub: "Kenya, 1963",
            dx: 10,
            al: "left",
            end: 56
        }), a(53, 13.23, -8.84, "Luanda", {
            mark: "ville",
            sub: "Angola, 1975",
            dx: -10,
            al: "right",
            end: 56
        }), a(53.5, 32.59, -25.97, "Maputo", {
            mark: "ville",
            sub: "Mozambique, 1975",
            dx: 10,
            al: "left",
            end: 56
        }) ],
        pulses: [ i(12, 77.2, 28.6, "#ffd166", !0), i(19, 103.02, 21.39, "#ff6b57", !0), i(24, 107.6, -6.9, "#ffd166", !0), i(45, 6.59, 46.4, "#ffd166", !0) ],
        ph: [ s(0, "1945 : des empires ébranlés", "En 1945, l’Europe domine encore une grande partie du monde. Mais la guerre a affaibli les métropoles, et les peuples colonisés, qui ont combattu, réclament leurs droits. La charte de l’ONU reconnaît le droit des peuples à disposer d’eux-mêmes ; les États-Unis et l’URSS sont hostiles aux empires coloniaux. La France réprime durement les manifestations de Sétif (mai 1945) et l’insurrection de Madagascar (1947).", "eur"), s(8, "L’Asie, la première", "En Indonésie, les nationalistes proclament l’indépendance dès 1945 ; les Pays-Bas la reconnaissent en 1949, après une guerre. En Inde, Gandhi mène une lutte non violente contre les Britanniques. Les 14 et 15 août 1947 naissent deux États, le Pakistan et l’Inde ; la partition provoque des violences terribles et l’exode de millions de personnes.", "neo"), s(16, "La guerre d’Indochine (1946-1954)", "En septembre 1945, Hô Chi Minh, chef communiste du Viêt-minh, proclame l’indépendance du Viêt Nam. La France refuse : la guerre dure de 1946 à 1954. En mai 1954, l’armée française est battue à Diên Biên Phu. Les accords de Genève confirment l’indépendance du Laos et du Cambodge et coupent le Viêt Nam en deux. La décolonisation rejoint la guerre froide.", "fra"), s(24, "1955 : la naissance du tiers-monde", "En avril 1955, à Bandung, en Indonésie, 29 pays d’Asie et d’Afrique condamnent le colonialisme et refusent de choisir entre les deux blocs. On parle désormais de « tiers-monde », puis de pays non alignés.", "neo"), s(28, "L’Afrique indépendante", "Le Maroc et la Tunisie deviennent indépendants en 1956, le Ghana en 1957, la Guinée en 1958. En 1960, « année de l’Afrique », 17 pays africains accèdent à l’indépendance, dont 14 anciennes colonies françaises, le plus souvent par la négociation. Au Congo belge, l’indépendance est suivie d’une guerre civile.", "afr"), s(38, "La guerre d’Algérie (1954-1962)", "L’Algérie, conquise à partir de 1830, forme trois départements français et compte environ un million d’Européens. Le 1er novembre 1954, le FLN déclenche une guerre d’indépendance. La guerre est terrible : attentats, torture, populations déplacées. Les accords d’Évian (18 mars 1962) y mettent fin ; l’Algérie devient indépendante le 5 juillet 1962. Près d’un million de pieds-noirs et des harkis partent pour la France.", "fra"), s(50, "Construire de nouveaux États", "Les nouveaux États doivent tout construire : une administration, une armée, des écoles, une économie souvent dépendante de l’ancienne métropole. Les frontières héritées de la colonisation créent des conflits ; beaucoup de pays connaissent des partis uniques et des coups d’État. Les dernières colonies portugaises (Angola, Mozambique) deviennent indépendantes en 1975.", "neo") ],
        photos: [ { id: "gandhi1931", t0: 9, t1: 15, pos: "tr", rot: 2, fit: "contain" }, { id: "hochiminh1946", t0: 17, t1: 23, pos: "tr", rot: 2, fit: "contain" } ],
        legend: [ [ FR, "Empire français" ], [ GB, "Empire britannique" ], [ NL, "Empire néerlandais" ], [ BE, "Empire belge" ], [ PT, "Empire portugais" ], [ NEU, "États devenus indépendants" ], [ "ere", "Port", "port" ] ],
        mots: [ [ "Décolonisation", "Processus par lequel une colonie devient un État indépendant." ], [ "Indépendance", "Situation d’un État qui se gouverne lui-même." ], [ "Tiers-monde", "Ensemble des pays pauvres, souvent anciennement colonisés, qui ne veulent appartenir à aucun des deux blocs." ], [ "Non-alignement", "Refus de choisir entre le bloc de l’Ouest et le bloc de l’Est." ], [ "FLN", "Front de libération nationale : mouvement qui mène la guerre d’indépendance de l’Algérie." ], [ "Pieds-noirs", "Nom donné aux Européens d’Algérie, partis pour la France en 1962." ] ],
        q: [ [ "Pourquoi les empires coloniaux sont-ils ébranlés après 1945 ?", "Les métropoles sont affaiblies par la guerre, les colonisés réclament leurs droits, l’ONU, les États-Unis et l’URSS sont hostiles à la colonisation." ], [ "Citer deux décolonisations obtenues par la guerre.", "L’Indochine (1946-1954) et l’Algérie (1954-1962) ; l’Indonésie aussi." ], [ "Qu’est-ce que la conférence de Bandung ?", "La réunion, en 1955, de 29 pays d’Asie et d’Afrique qui condamnent le colonialisme : la naissance du tiers-monde." ], [ "Pourquoi 1960 est-elle appelée « l’année de l’Afrique » ?", "Parce que 17 pays africains deviennent indépendants cette année-là." ] ],
        wiki: [ "Décolonisation", "Guerre d’Indochine", "Conférence de Bandung", "Guerre d’Algérie" ],
        src: [ [ "Charte des Nations unies, chapitre I, article 1 (texte en français) — Organisation des Nations unies", "https://www.un.org/fr/about-us/un-charter/chapter-1" ], [ "70e anniversaire de la fin de la guerre d’Indochine (Diên Biên Phu, 7 mai 1954 ; accords de Genève, 21 juillet 1954) — Chemins de mémoire, ministère des Armées", "https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/guerre-dindochine/70e-anniversaire-fin-guerre-dindochine" ], [ "1962 : la fin de la guerre d’Algérie (accords d’Évian, cessez-le-feu, indépendance) — Chemins de mémoire, ministère des Armées", "https://www.cheminsdememoire.gouv.fr/en/node/8523" ], [ "La conférence de Bandung, 1955 — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1953-1960/bandung-conf" ], [ "1960, l’année de l’Afrique : 17 pays indépendants, dont 14 anciennes colonies françaises — Afrique Renouveau, Organisation des Nations unies", "https://africarenewal.un.org/en/magazine/weighing-half-century-independence" ], [ "1947 : indépendance et partition de l’Inde (14 et 15 août 1947) — Open University", "https://www5.open.ac.uk/research-projects/making-britain/node/480" ] ],
        fs: {
            niv: "3e",
            pb: "Comment les colonies d’Asie et d’Afrique deviennent-elles des États indépendants ?",
            but: "Faire distinguer décolonisations négociées et décolonisations par la guerre, et montrer les difficultés des nouveaux États.",
            notions: [ "décolonisation", "indépendance", "tiers-monde", "non-alignement" ],
            comp: [ "Se repérer dans le temps et dans l’espace : situer les grandes vagues de décolonisation", "Analyser et comprendre un document : extraire des informations d’une carte" ],
            meth: "Lecture de la carte animée par vagues (Asie, puis Afrique), puis tableau comparatif de deux cas : l’Inde et l’Algérie.",
            accroche: "Carte des empires en 1945, puis du monde en 1975 : « Qu’est-ce qui a changé ? »",
            act: [ "Carte animée, étapes 1 à 4 : colorier sur un planisphère les pays indépendants avant 1955, puis avant 1962.", "Comparer l’Inde (1947) et l’Algérie (1962) dans un tableau : métropole, moyens de lutte, date, conséquences.", "Étape « Construire de nouveaux États » : relever deux difficultés des nouveaux États." ],
            fin: "Après 1945, les peuples colonisés obtiennent leur indépendance, d’abord en Asie, puis en Afrique. Certaines décolonisations sont négociées (Inde, Afrique noire), d’autres passent par la guerre (Indochine, Algérie). À Bandung, en 1955, les nouveaux États affirment le tiers-monde. Ils doivent ensuite tout construire.",
            suite: "Chapitre suivant : les décolonisations dans le Pacifique."
        }
    }, {
        short: "Les décolonisations dans le Pacifique",
        col: "kan",
        dur: 60,
        when: [ 1945, 1994 ],
        dates: "1945 – 1994",
        proj: "plan",
        cam: [ PA(0), PA(7), l(8, -170, -16, 3), l(14, -170, -16, 3), l(15, 165, -15, 1.2), l(27, 165, -15, 1.2), l(28, 167.5, -16.5, 7), l(42, 167.5, -16.5, 7), l(43, 155, 8, 1.6), l(49, 155, 8, 1.6), l(50, -172, -20, 1.6), l(56, -172, -20, 1.6), PA(57), PA(60) ],
        zones: m([ p("AUS", AU, 1, .3), p("NZL", NZ, 1, .3), p("NCL PYF", FR, 1, .7), b(-176.2, -13.3, 1, FR, 1, .7), g(p("WSM", NZ, 1), {
            t2: 9,
            t3: 10
        }), g(b(-159.8, -21.2, 1.4, NZ, 1, .6), {
            t2: 13,
            t3: 14
        }), g(b(-169.87, -19.05, 1, NZ, 1, .6), {
            t2: 21,
            t3: 22
        }), g(b(166.93, -.53, 1, AU, 1, .6), {
            t2: 16,
            t3: 17
        }), g(p("PNG", AU, 1), {
            t2: 21,
            t3: 22
        }), g(p("FJI", GB, 1), {
            t2: 17,
            t3: 18
        }), g(b(-175.2, -21.2, 1.3, GB, 1, .6), {
            t2: 17,
            t3: 18
        }), g(p("SLB", GB, 1), {
            t2: 25,
            t3: 26
        }), g(b(179.2, -8.5, 1.2, GB, 1, .6), {
            t2: 25,
            t3: 26
        }), g(b(173, 1.4, 1.5, GB, 1, .6), {
            t2: 25.5,
            t3: 26.5
        }), g(p("VUT", CON, 1), {
            t2: 38,
            t3: 39
        }), g(b(158.2, 6.9, 2, US, 1, .6), {
            t2: 45,
            t3: 46
        }), g(b(171.2, 7.1, 2, US, 1, .6), {
            t2: 45,
            t3: 46
        }), g(b(134.5, 7.5, 1.2, US, 1, .6), {
            t2: 46,
            t3: 47
        }), b(144.8, 13.4, .8, US, 1, .7), p("WSM", NEU, 9.5), b(-159.8, -21.2, 1.4, ASSO, 13.5, .6), b(166.93, -.53, 1, NEU, 16.5, .7), p("FJI", NEU, 17.5), b(-175.2, -21.2, 1.3, NEU, 17.5, .6), p("PNG", NEU, 21.5), b(-169.87, -19.05, 1, ASSO, 21.5, .6), p("SLB", NEU, 25.5), b(179.2, -8.5, 1.2, NEU, 25.5, .6), b(173, 1.4, 1.5, NEU, 26, .6), p("VUT", NEU, 38.5), b(158.2, 6.9, 2, ASSO, 45.5, .6), b(171.2, 7.1, 2, ASSO, 45.5, .6), b(134.5, 7.5, 1.2, ASSO, 46.5, .6) ]),
        routes: [ n(NEU, 39.5, 41.5, 2.4, [ [ 147.2, -9.5 ], [ 155, -12 ], [ 163, -15 ], [ 167.2, -15.5 ] ], {
            dash: !0
        }) ],
        labels: [ a(1, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "siège de la Commission du Pacifique Sud, 1949",
            dx: -10,
            al: "right",
            end: 7
        }), a(2, 134, -25, "Australie", {
            nomark: !0,
            end: 7
        }), a(2.5, 172, -41, "Nouvelle-Zélande", {
            nomark: !0,
            dx: 10,
            end: 7
        }), a(3, -155.5, 19.6, "Hawaï", {
            nomark: !0,
            sub: "américaine",
            end: 7
        }), a(9, -171.76, -13.83, "Apia", {
            mark: "ville",
            gold: !0,
            sub: "Samoa, 1er janvier 1962",
            dx: 10,
            al: "left",
            end: 14
        }), a(12, -159.78, -21.23, "Rarotonga", {
            mark: "ville",
            sub: "îles Cook, libre association, 1965",
            dx: 10,
            al: "left",
            end: 14
        }), a(16, 166.93, -.53, "Nauru", {
            mark: "ville",
            sub: "1968, l’île du phosphate",
            dx: 10,
            al: "left",
            end: 27
        }), a(17, 178.44, -18.14, "Suva", {
            mark: "ville",
            sub: "Fidji, 10 octobre 1970",
            dx: -10,
            al: "right",
            end: 27
        }), a(17.5, -175.2, -21.14, "Nuku’alofa", {
            mark: "ville",
            sub: "Tonga, 1970",
            dx: 10,
            al: "left",
            end: 27
        }), a(19, 174.78, -41.29, "Wellington", {
            mark: "ville",
            sub: "Forum du Pacifique Sud, 1971",
            dx: 10,
            al: "left",
            end: 27
        }), a(21, 147.18, -9.44, "Port Moresby", {
            mark: "ville",
            gold: !0,
            sub: "Papouasie-Nouvelle-Guinée, 1975",
            dx: -10,
            al: "right",
            end: 27
        }), a(21.5, -169.92, -19.06, "Niue", {
            mark: "ville",
            sub: "libre association, 1974",
            dx: 10,
            al: "left",
            end: 27
        }), a(25, 159.95, -9.43, "Honiara", {
            mark: "ville",
            sub: "Salomon, 1978",
            dx: -10,
            al: "right",
            end: 27
        }), a(25.5, 179.2, -8.52, "Funafuti", {
            mark: "ville",
            sub: "Tuvalu, 1978",
            dx: 10,
            al: "left",
            end: 27
        }), a(26, 172.98, 1.42, "Tarawa", {
            mark: "ville",
            sub: "Kiribati, 1979",
            dx: 10,
            al: "left",
            end: 27
        }), a(29, 169.6, -14.6, "Nouvelles-Hébrides", {
            nomark: !0,
            sub: "condominium franco-britannique, 1906-1980",
            end: 37
        }), a(30, 168.32, -17.73, "Port-Vila", {
            mark: "ville",
            sub: "capitale du condominium",
            dx: 10,
            al: "left",
            end: 37
        }), a(34, 167.17, -15.52, "Luganville", {
            mark: "ville",
            sub: "Santo, rébellion de 1980",
            dx: -10,
            al: "right",
            end: 42
        }), a(38, 168.32, -17.73, "Port-Vila", {
            mark: "ville",
            gold: !0,
            sub: "indépendance, 30 juillet 1980",
            dx: 10,
            al: "left",
            end: 42
        }), a(44, 158.16, 6.92, "Palikir", {
            mark: "ville",
            sub: "États fédérés de Micronésie, 1986",
            dx: 10,
            al: "left",
            end: 49
        }), a(44.5, 171.38, 7.09, "Majuro", {
            mark: "ville",
            sub: "îles Marshall, 1986",
            dx: 10,
            al: "left",
            end: 49
        }), a(45, 144.8, 13.45, "Guam", {
            mark: "site",
            sub: "reste américaine",
            dx: 10,
            al: "left",
            end: 49
        }), a(46.5, 134.62, 7.5, "Palaos", {
            mark: "ville",
            sub: "1994",
            dx: 10,
            al: "left",
            end: 49
        }), a(51, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "Nouvelle-Calédonie, TOM en 1946",
            dx: -10,
            al: "right",
            end: 57
        }), a(51.5, -149.57, -17.54, "Papeete", {
            mark: "ville",
            sub: "Polynésie française, TOM en 1946",
            dx: 10,
            al: "left",
            end: 57
        }), a(52, -176.17, -13.28, "Mata-Utu", {
            mark: "ville",
            sub: "Wallis-et-Futuna, TOM en 1961",
            dx: 10,
            al: "left",
            end: 57
        }) ],
        pulses: [ i(9, -171.76, -13.83, "#ffd166", !0), i(38, 168.32, -17.73, "#ffd166", !0), i(51, I[0], I[1], "#ffd166", !0) ],
        ph: [ s(0, "1945 : un océan d’empires", "En 1945, toutes les îles du Pacifique sont gouvernées par des puissances extérieures : Royaume-Uni, France, Australie, Nouvelle-Zélande, États-Unis. L’ONU leur demande de conduire ces territoires vers l’autonomie. En 1947, ces puissances créent la Commission du Pacifique Sud, installée à Nouméa depuis 1949 (aujourd’hui la Communauté du Pacifique).", "eur"), s(8, "1962 : les Samoa ouvrent la voie", "Les Samoa occidentales, administrées par la Nouvelle-Zélande, deviennent le 1er janvier 1962 le premier État insulaire indépendant du Pacifique. D’autres archipels choisissent la libre association : les îles Cook (1965) se gouvernent elles-mêmes, mais restent liées à la Nouvelle-Zélande.", "kan"), s(15, "1968-1979 : une vague d’indépendances", "Nauru (1968), riche de son phosphate, puis les Fidji et les Tonga (1970) deviennent pleinement indépendants. En 1971, les États indépendants fondent le Forum du Pacifique Sud. Suivent la Papouasie-Nouvelle-Guinée (1975), les Salomon et Tuvalu (1978), Kiribati (1979). Ces indépendances sont presque toujours négociées, sans guerre.", "neo"), s(28, "Le Vanuatu, un État né en 1980", "Depuis 1906, les Nouvelles-Hébrides sont un condominium : la France et le Royaume-Uni les gouvernent ensemble, avec deux administrations, deux polices, deux systèmes d’écoles. Le Vanua’aku Pati du prêtre anglican Walter Lini réclame l’indépendance. Le Vanuatu devient indépendant le 30 juillet 1980, avec trois langues officielles : bichelamar, anglais et français. Une rébellion déclenchée à Santo en mai est arrêtée en août avec l’aide de soldats de Papouasie-Nouvelle-Guinée.", "ame"), s(43, "Indépendants, mais associés", "Certains territoires choisissent la libre association : ils se gouvernent eux-mêmes, mais confient leur défense à une ancienne puissance. Ainsi les îles Cook et Niue avec la Nouvelle-Zélande ; les États fédérés de Micronésie et les îles Marshall (1986), puis les Palaos (1994) avec les États-Unis, qui y gardent des bases militaires. Guam et Hawaï restent américaines.", "esp"), s(50, "Les territoires français du Pacifique", "La Nouvelle-Calédonie et la Polynésie française deviennent des territoires d’outre-mer (TOM) en 1946, Wallis-et-Futuna en 1961. En 1946, l’indigénat est supprimé : les Kanak deviennent citoyens français et obtiennent peu à peu le droit de vote, pour tous en 1957. En 1986, l’ONU réinscrit la Nouvelle-Calédonie sur la liste des territoires à décoloniser (la Polynésie française en 2013). La suite de l’histoire calédonienne est étudiée au thème 3.", "fra") ],
        photos: [ { id: "vanuatuiss", t0: 29, t1: 36, pos: "tr", rot: 2, fit: "" }, { id: "cps", t0: 44, t1: 49, pos: "tr", rot: 2, fit: "" }, { id: "drapeauxnc", t0: 51, t1: 58, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ GB, "Royaume-Uni" ], [ AU, "Australie" ], [ NZ, "Nouvelle-Zélande" ], [ US, "États-Unis" ], [ FR, "France" ], [ CON, "Condominium franco-britannique" ], [ NEU, "États indépendants" ], [ ASSO, "États en libre association" ] ],
        mots: [ [ "Décolonisation", "Processus par lequel une colonie devient un État indépendant." ], [ "Condominium", "Territoire gouverné ensemble par deux pays : les Nouvelles-Hébrides par la France et le Royaume-Uni." ], [ "Libre association", "Statut d’un État qui se gouverne lui-même mais reste lié à une ancienne puissance, souvent pour sa défense." ], [ "Territoire d’outre-mer (TOM)", "Territoire français éloigné de la métropole, doté d’une organisation particulière." ], [ "Forum des îles du Pacifique", "Organisation régionale fondée en 1971 (Forum du Pacifique Sud) qui rassemble les États du Pacifique." ], [ "Bichelamar", "Langue commune du Vanuatu, née de l’anglais et des langues locales." ] ],
        q: [ [ "Quel est le premier État insulaire indépendant du Pacifique ?", "Les Samoa occidentales, le 1er janvier 1962." ], [ "Qu’est-ce qu’un condominium ? Donner un exemple.", "Un territoire gouverné par deux pays : les Nouvelles-Hébrides, par la France et le Royaume-Uni." ], [ "Quand le Vanuatu devient-il indépendant ?", "Le 30 juillet 1980." ], [ "Que deviennent la Nouvelle-Calédonie et la Polynésie française en 1946 ?", "Des territoires d’outre-mer (TOM) ; l’indigénat est supprimé et les Kanak deviennent citoyens." ] ],
        wiki: [ "Décolonisation de l’Océanie", "Nouvelles-Hébrides", "Forum des îles du Pacifique", "Communauté du Pacifique" ],
        src: [ [ "Apia et l’indépendance des Samoa occidentales, 1er janvier 1962 — ministère néo-zélandais des Affaires étrangères (MFAT)", "https://www.mfat.govt.nz/en/about-us/mfat75/75-our-story/apia" ], [ "Histoire de la Communauté du Pacifique : fondée en 1947, siège à Nouméa depuis 1949 — Communauté du Pacifique (CPS)", "https://www.spc.int/about-us/history" ], [ "Le premier Forum du Pacifique Sud, Wellington, 5-7 août 1971 (extrait) — ministère australien des Affaires étrangères (DFAT)", "https://www.dfat.gov.au/sites/default/files/pif_extract.pdf" ], [ "Vanuatu, une brève histoire (condominium de 1906, indépendance du 30 juillet 1980, révolte de Santo) — Radio New Zealand", "https://www.rnz.co.nz/collections/nff-vanuatu/about-vanuatu" ], [ "Histoire de la Nouvelle-Calédonie, module 3, chapitre 22 (1946 : citoyenneté, TOM ; 1957 : suffrage universel) — Direction de l’enseignement de la Nouvelle-Calédonie (DENC)", "https://denc.gouv.nc/sites/default/files/documents/histoire_module3_chapitre22.pdf" ], [ "Résolution 41/41 A de l’Assemblée générale, 2 décembre 1986 (Nouvelle-Calédonie) — Organisation des Nations unies", "https://digitallibrary.un.org/record/126352/files/A_RES_41_41-EN.pdf" ] ],
        fs: {
            niv: "3e",
            pb: "Comment les îles du Pacifique deviennent-elles des États, et pourquoi certaines restent-elles liées à une puissance ?",
            but: "Étude de cas régionale : montrer une décolonisation surtout négociée, ses différents statuts, et l’exemple du Vanuatu voisin.",
            notions: [ "décolonisation", "condominium", "libre association", "territoire d’outre-mer" ],
            comp: [ "Se repérer dans l’espace : localiser les États du Pacifique et leur ancienne puissance", "Coopérer et mutualiser : travail en groupes sur un archipel" ],
            meth: "Étude de cas : groupes d’élèves sur un archipel (Samoa, Fidji, Vanuatu, Papouasie-Nouvelle-Guinée, Micronésie), mise en commun sur une carte du Pacifique.",
            accroche: "Les drapeaux de quelques États du Pacifique : « Depuis quand ces pays existent-ils ? »",
            act: [ "Carte animée, étapes 1 à 3 : compléter une frise des indépendances du Pacifique (1962-1994).", "Groupes : pour un archipel, trouver l’ancienne puissance, la date et le statut (indépendant ou libre association).", "Étape « Le Vanuatu » : expliquer ce qu’est un condominium et comment le pays devient indépendant ; comparer avec la Nouvelle-Calédonie, restée française." ],
            fin: "Dans le Pacifique, la décolonisation commence en 1962 avec les Samoa et se fait presque toujours par la négociation. Certains archipels deviennent indépendants (Fidji, Papouasie-Nouvelle-Guinée, Vanuatu en 1980), d’autres choisissent la libre association. La Nouvelle-Calédonie, la Polynésie française et Wallis-et-Futuna restent françaises.",
            suite: "Chapitre suivant : le projet européen."
        }
    }, {
        short: "Le projet européen",
        col: "kan",
        dur: 60,
        when: [ 1950, 2020 ],
        dates: "1950 – aujourd’hui",
        proj: "plan",
        cam: [ EU(0), EU(7), l(8, 6, 48.5, 3.2), l(17, 6, 48.5, 3.2), EU(18), EU(53), NC(54), NC(60) ],
        zones: m([ g(p(EST + " EST LVA LTU", GRIS, 1, .35), {
            t2: 36,
            t3: 38
        }), g(R(RDA, GRIS, 1, .4), {
            t2: 28,
            t3: 29
        }), p("FRA DEU ITA BEL NLD LUX", SIX, 9), p("IRL DNK", E73, 20), g(p("GBR", E73, 20), {
            t2: 50,
            t3: 52
        }), p("GBR", GRIS, 51, .4), p("GRC", E81, 24), p("ESP PRT", E81, 25), p("AUT FIN SWE", E95, 33), p("POL CZE SVK HUN SVN EST LVA LTU CYP", E04, 37), b(14.4, 35.9, .5, E04, 37, .8), p("ROU BGR", E04, 39), p("HRV", E04, 41), p("NCL", ASSO, 54, .6) ]),
        routes: [],
        labels: [ a(1, 25, 50.5, "Bloc de l’Est", {
            nomark: !0,
            sub: "communiste jusqu’en 1989",
            end: 36
        }), a(8, 2.32, 48.86, "Paris", {
            mark: "ville",
            gold: !0,
            sub: "déclaration Schuman, 9 mai 1950",
            dx: -10,
            al: "right",
            end: 17
        }), a(9, 7.1, 50.73, "Bonn", {
            mark: "ville",
            sub: "RFA",
            dx: 10,
            al: "left",
            end: 17
        }), a(10, 12.5, 41.9, "Rome", {
            mark: "ville",
            gold: !0,
            sub: "traités de Rome, 25 mars 1957",
            dx: 10,
            al: "left",
            end: 28
        }), a(12, 4.35, 50.85, "Bruxelles", {
            mark: "ville",
            sub: "Commission européenne",
            dx: -10,
            al: "right",
            dy: -10,
            end: 17
        }), a(13, 7.75, 48.58, "Strasbourg", {
            mark: "ville",
            sub: "Parlement européen",
            dx: 10,
            al: "left",
            end: 17
        }), a(14, 6.13, 49.61, "Luxembourg", {
            mark: "ville",
            sub: "Cour de justice",
            dx: 10,
            al: "left",
            dy: -12,
            end: 17
        }), a(20, -5, 56, "Royaume-Uni, Irlande, Danemark", {
            nomark: !0,
            sub: "1973",
            end: 28
        }), a(24, 22, 39, "Grèce", {
            nomark: !0,
            sub: "1981",
            end: 33
        }), a(25, -4.5, 40, "Espagne, Portugal", {
            nomark: !0,
            sub: "1986",
            end: 33
        }), a(29, 5.69, 50.85, "Maastricht", {
            mark: "ville",
            gold: !0,
            sub: "traité, 1992 : l’Union européenne",
            dx: -10,
            al: "right",
            end: 35
        }), a(30, 13.4, 52.52, "Berlin", {
            mark: "ville",
            sub: "Allemagne réunifiée, 1990",
            dx: 10,
            al: "left",
            end: 35
        }), a(33, 20, 63, "Autriche, Finlande, Suède", {
            nomark: !0,
            sub: "1995",
            end: 40
        }), a(34, 8.68, 50.11, "Francfort", {
            mark: "ville",
            sub: "Banque centrale européenne : l’euro, 2002",
            dx: 10,
            al: "left",
            end: 46
        }), a(37, 25, 55.5, "Dix nouveaux membres", {
            nomark: !0,
            sub: "2004",
            end: 46
        }), a(39, 25, 44, "Roumanie, Bulgarie", {
            nomark: !0,
            sub: "2007",
            end: 46
        }), a(41, 16, 45.4, "Croatie", {
            nomark: !0,
            sub: "2013",
            dy: 12,
            end: 46
        }), a(47, -.13, 51.5, "Londres", {
            mark: "ville",
            gold: !0,
            sub: "Brexit, 31 janvier 2020",
            dx: -10,
            al: "right",
            end: 53
        }), a(48, 4.35, 50.85, "Bruxelles", {
            mark: "ville",
            sub: "27 États membres",
            dx: 10,
            al: "left",
            end: 53
        }), a(55, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "pays et territoire d’outre-mer associé à l’UE",
            dx: -10,
            al: "right",
            zmin: 6
        }) ],
        pulses: [ i(8, 2.32, 48.86, "#ffd166", !0), i(29, 5.69, 50.85, "#ffd166", !0), i(47, -.13, 51.5, "#ff6b57", !0) ],
        ph: [ s(0, "Après 1945 : unir l’Europe pour la paix", "Après deux guerres mondiales, des Européens veulent unir leurs pays pour rendre la guerre impossible. Le 9 mai 1950, le ministre français Robert Schuman, inspiré par Jean Monnet, propose de mettre en commun le charbon et l’acier de la France et de l’Allemagne de l’Ouest. L’Europe de l’Est, sous domination soviétique, ne peut pas participer.", "eur"), s(8, "1951-1957 : l’Europe des Six", "En 1951, six pays (France, RFA, Italie, Belgique, Pays-Bas, Luxembourg) créent la CECA. En 1957, les traités de Rome fondent la Communauté économique européenne (CEE) : un marché commun où les marchandises circulent peu à peu sans droits de douane. La politique agricole commune suit en 1962. Les institutions s’installent à Bruxelles, Strasbourg et Luxembourg.", "kan"), s(18, "1973-1986 : l’Europe s’agrandit", "Le Royaume-Uni, l’Irlande et le Danemark entrent en 1973, la Grèce en 1981, l’Espagne et le Portugal en 1986 : ces trois pays sortent de dictatures, et l’Europe les aide à consolider leur démocratie. Depuis 1979, les citoyens élisent directement le Parlement européen.", "mis"), s(28, "1992 : l’Union européenne", "Après la réunification de l’Allemagne (1990), le traité de Maastricht (1992) crée l’Union européenne et une citoyenneté européenne. Les accords de Schengen suppriment peu à peu les contrôles aux frontières intérieures. L’Autriche, la Finlande et la Suède entrent en 1995. L’euro devient la monnaie commune : les pièces et les billets circulent depuis le 1er janvier 2002.", "jade"), s(36, "2004-2013 : l’Europe réunifiée", "Après la fin du bloc de l’Est, d’anciens pays communistes rejoignent l’Union : dix pays entrent en 2004 (dont la Pologne et les pays baltes), la Roumanie et la Bulgarie en 2007, la Croatie en 2013. L’Union compte alors 28 membres. En 2012, elle reçoit le prix Nobel de la paix.", "lap"), s(46, "Débats, crises et Brexit", "La construction européenne fait débat : en 2005, les Français rejettent par référendum un projet de Constitution européenne. Des crises financières et migratoires divisent les membres. En 2016, les Britanniques votent pour quitter l’Union : le Brexit est effectif le 31 janvier 2020. L’Union compte aujourd’hui 27 États.", "vide"), s(54, "Et la Nouvelle-Calédonie ?", "La Nouvelle-Calédonie ne fait pas partie du territoire de l’Union : c’est un « pays et territoire d’outre-mer » (PTOM) associé, qui reçoit des aides européennes. On y paie en francs CFP, une monnaie liée à l’euro. Les Calédoniens de nationalité française sont citoyens européens et votent aux élections européennes.", "esp") ],
        photos: [ { id: "schuman1929", t0: 1, t1: 7, pos: "tr", rot: 2, fit: "contain" }, { id: "parlementeu", t0: 29, t1: 35, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ SIX, "Les Six fondateurs (1951-1957)" ], [ E73, "Entrés en 1973" ], [ E81, "Entrés en 1981-1986" ], [ E95, "Entrés en 1995" ], [ E04, "Entrés en 2004-2013" ], [ GRIS, "Bloc de l’Est (jusqu’en 1989) ; Royaume-Uni, sorti en 2020" ], [ ASSO, "Nouvelle-Calédonie, PTOM associé à l’UE" ] ],
        mots: [ [ "Construction européenne", "Rapprochement progressif des pays européens depuis 1950." ], [ "CEE", "Communauté économique européenne, créée en 1957 par les traités de Rome." ], [ "Union européenne (UE)", "Union d’États européens créée en 1992 par le traité de Maastricht ; 27 membres aujourd’hui." ], [ "Euro", "Monnaie commune de la plupart des pays de l’UE, en pièces et billets depuis 2002." ], [ "Élargissement", "Entrée de nouveaux pays dans la construction européenne." ], [ "PTOM", "Pays et territoire d’outre-mer : territoire lié à un État membre et associé à l’UE, comme la Nouvelle-Calédonie." ] ],
        q: [ [ "Pourquoi des Européens décident-ils de s’unir après 1945 ?", "Pour rendre la guerre impossible entre eux et reconstruire l’Europe." ], [ "Quels sont les six pays fondateurs ?", "France, RFA, Italie, Belgique, Pays-Bas, Luxembourg." ], [ "Que crée le traité de Maastricht en 1992 ?", "L’Union européenne et la citoyenneté européenne ; il prépare l’euro." ], [ "La Nouvelle-Calédonie fait-elle partie de l’Union européenne ?", "Non : c’est un PTOM associé à l’UE ; on y utilise le franc CFP, mais les Calédoniens de nationalité française sont citoyens européens." ] ],
        wiki: [ "Construction européenne", "Déclaration Schuman", "Traité de Maastricht", "Pays et territoires d’outre-mer" ],
        src: [ [ "Déclaration du 9 mai 1950 (texte intégral) — Fondation Robert Schuman", "https://www.robert-schuman.eu/fr/declaration-du-9-mai-1950" ], [ "L’histoire de l’Union européenne, 1970-1979 (élargissement de 1973, élection du Parlement européen en 1979) — Union européenne", "https://european-union.europa.eu/principles-countries-history/history-eu/1970-79_fr" ], [ "L’histoire de l’Union européenne, 1990-1999 (traité de Maastricht, Schengen, élargissement de 1995) — Union européenne", "https://european-union.europa.eu/principles-countries-history/history-eu/1990-99_fr" ], [ "L’histoire de l’Union européenne, 2000-2009 (euro en 2002, élargissements de 2004 et 2007, rejet du traité constitutionnel) — Union européenne", "https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_fr" ], [ "L’histoire de l’Union européenne, 2010-2019 (prix Nobel de la paix 2012, Croatie 2013, Brexit) — Union européenne", "https://european-union.europa.eu/principles-countries-history/history-eu/2010-19_fr" ], [ "L’Union européenne et la Nouvelle-Calédonie (PTOM, citoyenneté européenne) — Service européen pour l’action extérieure", "https://www.eeas.europa.eu/eeas/l%E2%80%99union-europ%C3%A9enne-et-la-nouvelle-cal%C3%A9donie_fr" ] ],
        fs: {
            niv: "3e",
            pb: "Comment la construction européenne s’affirme-t-elle depuis 1950, et quel lien a-t-elle avec la Nouvelle-Calédonie ?",
            but: "Faire comprendre les étapes de la construction européenne (approfondissement, élargissements), ses débats, et la situation particulière de la Nouvelle-Calédonie.",
            notions: [ "construction européenne", "Union européenne", "élargissement", "euro" ],
            comp: [ "Se repérer dans le temps et dans l’espace : réaliser une carte des élargissements", "Pratiquer différents langages : réaliser une frise chronologique légendée" ],
            meth: "Carte animée, puis carte des élargissements et frise à deux niveaux (approfondissement / élargissement).",
            accroche: "Un billet en euros et un billet en francs CFP : « Pourquoi deux monnaies, et quel lien entre elles ? »",
            act: [ "Carte animée, étapes 1 et 2 : expliquer le projet de 1950 et nommer les Six.", "Étapes 3 à 6 : colorier sur une carte muette les élargissements avec la légende de l’atlas ; placer Maastricht, l’euro et le Brexit sur la frise.", "Étape « Et la Nouvelle-Calédonie ? » : rédiger trois phrases sur les liens entre la Nouvelle-Calédonie et l’UE." ],
            fin: "Depuis 1950, des pays européens s’unissent pour garantir la paix et la prospérité : CECA (1951), CEE (1957), Union européenne (1992), euro (2002). L’Union passe de 6 à 28 membres, puis 27 après le Brexit (2020). La Nouvelle-Calédonie lui est associée comme PTOM ; les Calédoniens de nationalité française sont citoyens européens.",
            suite: "Chapitre suivant : enjeux et conflits depuis 1989."
        }
    }, {
        short: "Enjeux et conflits depuis 1989",
        col: "ense",
        dur: 60,
        when: [ 1989, 2026 ],
        dates: "1989 – aujourd’hui",
        proj: "plan",
        cam: [ u(0), u(3), l(4, 46, 31, 2.6), l(9, 46, 31, 2.6), l(10, 22, 22, 1.2), l(19, 22, 22, 1.2), u(20), u(24), l(25, 52, 33, 1.8), l(30, 52, 33, 1.8), l(31, 80, 42, .9), l(40, 80, 42, .9), l(41, 150, -8, 2), l(51, 150, -8, 2), l(52, 175, -5, .9), l(60, 175, -5, .9) ],
        zones: m([ p("USA", US, 1, .45), g(p("IRQ KWT", WAR, 4, .55), {
            t2: 9,
            t3: 10
        }), g(p("SVN HRV BIH SRB MNE MKD XKX", WAR, 11, .55), {
            t2: 30,
            t3: 32
        }), g(p("RWA", WAR, 14, .6), {
            t2: 30,
            t3: 32
        }), g(p("AFG", WAR, 24, .55), {
            t2: 39,
            t3: 41
        }), g(p("IRQ", WAR, 26, .55), {
            t2: 39,
            t3: 41
        }), g(p("SYR", WAR, 28, .55), {
            t2: 39,
            t3: 41
        }), p("CHN", CN2, 32, .5), p("RUS", RU, 33, .5), p("UKR", WAR, 35, .6), g(b(155.4, -6.3, 1.6, WAR, 42, .7), {
            t2: 52,
            t3: 54
        }), g(p("TLS", WAR, 45, .55), {
            t2: 52,
            t3: 54
        }), g(p("FJI", WAR, 47, .45), {
            t2: 52,
            t3: 54
        }), g(p("SLB", WAR, 49, .5), {
            t2: 52,
            t3: 54
        }), b(173, 1.4, 2, ATOLL, 55, .6), b(179.2, -8.5, 1.5, ATOLL, 55, .6), b(171.2, 7.1, 1.8, ATOLL, 55.5, .6) ]),
        routes: [ n(US, 6, 8, 2.6, [ [ 44, 24 ], [ 46.5, 28.2 ], [ 47.9, 29.4 ] ], {}), n(RU, 36, 38, 2.6, [ [ 36.2, 50 ], [ 33, 50.3 ], [ 30.8, 50.45 ] ], {}), n(CN2, 53, 56, 2.2, [ [ 116.4, 39.9 ], [ 130, 20 ], [ 150, 0 ], [ 159.95, -9.43 ] ], {
            dash: !0
        }) ],
        labels: [ a(1, -98, 40, "États-Unis", {
            nomark: !0,
            big: !0,
            sub: "seule superpuissance",
            end: 4
        }), a(5, 47.98, 29.37, "Koweït", {
            mark: "ville",
            gold: !0,
            sub: "envahi par l’Irak, août 1990",
            dx: 10,
            al: "left",
            end: 9
        }), a(6, 44.37, 33.31, "Bagdad", {
            mark: "ville",
            sub: "l’Irak de Saddam Hussein",
            dx: -10,
            al: "right",
            end: 9
        }), a(11, 18.41, 43.86, "Sarajevo", {
            mark: "ville",
            sub: "assiégée, 1992-1996",
            dx: -10,
            al: "right",
            end: 19
        }), a(12, 19.3, 44.1, "Srebrenica", {
            mark: "site",
            gold: !0,
            sub: "génocide, juillet 1995",
            dx: 10,
            al: "left",
            end: 19
        }), a(13, 21.17, 42.67, "Kosovo", {
            mark: "site",
            sub: "guerre, 1999",
            dx: 10,
            al: "left",
            dy: 14,
            end: 19
        }), a(15, 30.06, -1.95, "Kigali", {
            mark: "ville",
            gold: !0,
            sub: "génocide des Tutsi, 1994",
            dx: 10,
            al: "left",
            end: 19
        }), a(20, -74, 40.71, "New York", {
            mark: "ville",
            gold: !0,
            sub: "11 septembre 2001",
            dx: 10,
            al: "left",
            end: 24
        }), a(25, 69.17, 34.53, "Kaboul", {
            mark: "ville",
            sub: "guerre, 2001-2021",
            dx: 10,
            al: "left",
            end: 30
        }), a(26, 44.37, 33.31, "Bagdad", {
            mark: "ville",
            sub: "invasion américaine, 2003",
            dx: -10,
            al: "right",
            end: 30
        }), a(28, 36.29, 33.51, "Damas", {
            mark: "ville",
            sub: "guerre civile, 2011-2024",
            dx: -10,
            al: "right",
            dy: 12,
            end: 30
        }), a(32, 116.4, 39.9, "Pékin", {
            mark: "ville",
            gold: !0,
            sub: "la Chine, 2e puissance mondiale",
            dx: 10,
            al: "left",
            end: 40
        }), a(34, 37.6, 55.75, "Moscou", {
            mark: "ville",
            sub: "la Russie de Poutine",
            dx: 10,
            al: "left",
            end: 40
        }), a(35, 34.1, 44.95, "Crimée", {
            mark: "site",
            sub: "annexée par la Russie, 2014",
            dx: 10,
            al: "left",
            dy: 12,
            end: 40
        }), a(36, 30.52, 50.45, "Kiev", {
            mark: "ville",
            gold: !0,
            sub: "invasion russe, 24 février 2022",
            dx: -10,
            al: "right",
            end: 40
        }), a(42, 155.5, -6.3, "Bougainville", {
            mark: "site",
            gold: !0,
            sub: "guerre 1988-1998, référendum 2019",
            dx: 10,
            al: "left",
            end: 52
        }), a(45, 125.57, -8.56, "Dili", {
            mark: "ville",
            sub: "Timor oriental, indépendant en 2002",
            dx: 10,
            al: "left",
            end: 52
        }), a(47, 178.44, -18.14, "Suva", {
            mark: "ville",
            sub: "coups d’État, 1987-2006",
            dx: -10,
            al: "right",
            end: 52
        }), a(49, 159.95, -9.43, "Honiara", {
            mark: "ville",
            sub: "intervention régionale, 2003-2017",
            dx: -10,
            al: "right",
            dy: 12,
            end: 52
        }), a(53, 159.95, -9.43, "Honiara", {
            mark: "ville",
            sub: "accord de sécurité avec la Chine, 2022",
            dx: -10,
            al: "right"
        }), a(54, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "présence française",
            dx: -10,
            al: "right"
        }), a(55, 173, 1.4, "Kiribati", {
            mark: "site",
            sub: "atolls menacés par la montée des eaux",
            dx: 10,
            al: "left"
        }), a(55.5, 179.2, -8.52, "Tuvalu", {
            mark: "site",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(5, 47.98, 29.37, "#ff6b57", !0), i(20, -74, 40.71, "#ff6b57", !0), i(36, 30.52, 50.45, "#ff6b57", !0), i(42, 155.5, -6.3, "#ffd166", !0) ],
        ph: [ s(0, "1991 : un nouvel ordre mondial ?", "La guerre froide finie, les États-Unis sont la seule superpuissance. En août 1990, l’Irak de Saddam Hussein envahit le Koweït. Avec l’accord de l’ONU, une coalition d’environ 35 pays menée par les États-Unis libère le Koweït en 1991 : on espère un monde où l’ONU garantirait la paix.", "lap"), s(10, "Les années 1990 : guerres et génocides", "La Yougoslavie éclate : de 1991 à 1995, des guerres opposent Serbes, Croates et Bosniaques ; Sarajevo est assiégée et, en juillet 1995, environ 8 000 hommes et garçons bosniaques sont massacrés à Srebrenica. Au Rwanda, en 1994, environ un million de personnes, en grande majorité des Tutsi, sont exterminées en trois mois. L’ONU n’empêche pas ces génocides ; des tribunaux internationaux jugent ensuite des responsables.", "ense"), s(20, "Depuis 2001 : le terrorisme islamiste", "Le 11 septembre 2001, des terroristes d’Al-Qaïda lancent des avions contre New York et Washington : près de 3 000 morts. Les États-Unis attaquent l’Afghanistan (2001), puis l’Irak (2003). Le terrorisme frappe aussi l’Europe, comme à Paris le 13 novembre 2015. Au Moyen-Orient, la guerre civile en Syrie (2011-2024) favorise l’organisation État islamique.", "ense"), s(31, "Un monde multipolaire", "La Chine devient la deuxième puissance économique du monde et renforce son armée. La Russie de Vladimir Poutine veut retrouver son influence : elle annexe la Crimée en 2014, puis envahit l’Ukraine le 24 février 2022. La guerre revient en Europe. Plusieurs puissances se disputent désormais le monde.", "esp"), s(41, "Le Pacifique connaît aussi des conflits", "À Bougainville, en Papouasie-Nouvelle-Guinée, une guerre éclate en 1988 autour de la mine de cuivre de Panguna ; elle fait des milliers de morts jusqu’en 1998. En 2019, près de 98 % des votants y choisissent l’indépendance, dont la mise en œuvre est négociée avec la Papouasie-Nouvelle-Guinée. Le Timor oriental devient indépendant en 2002, après des violences. Les Fidji connaissent des coups d’État (1987, 2000, 2006) ; aux Salomon, une force régionale menée par l’Australie rétablit l’ordre (2003-2017).", "ense"), s(52, "Un océan convoité et menacé", "Le Pacifique devient un enjeu entre grandes puissances : la Chine y multiplie les aides et signe en 2022 un accord de sécurité avec les Salomon ; les États-Unis et l’Australie renforcent leurs alliances (accord AUKUS, 2021). La France y est présente par la Nouvelle-Calédonie et la Polynésie française. Le réchauffement climatique fait monter les océans : des atolls comme Kiribati et Tuvalu sont menacés.", "mis") ],
        photos: [ { id: "onu", t0: 1, t1: 8, pos: "tr", rot: 2, fit: "" }, { id: "srebrenica", t0: 11, t1: 18, pos: "tr", rot: 2, fit: "" }, { id: "wtc2001", t0: 21, t1: 29, pos: "tr", rot: 2, fit: "" }, { id: "usinechine", t0: 32, t1: 39, pos: "tr", rot: 2, fit: "" }, { id: "pam", t0: 53, t1: 59, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ US, "États-Unis" ], [ WAR, "Guerres et conflits" ], [ CN2, "Chine" ], [ RU, "Russie" ], [ ATOLL, "Atolls menacés par la montée des eaux" ] ],
        mots: [ [ "Génocide", "Extermination volontaire et organisée d’un peuple." ], [ "Terrorisme", "Usage de la violence contre des civils pour terroriser et imposer ses idées." ], [ "Hyperpuissance", "Superpuissance sans rival : les États-Unis après 1991." ], [ "Monde multipolaire", "Monde dominé par plusieurs puissances (États-Unis, Chine, Russie, Union européenne…)." ], [ "Référendum d’autodétermination", "Vote par lequel une population choisit son avenir politique." ], [ "Montée des eaux", "Élévation du niveau des océans, causée par le réchauffement climatique." ] ],
        q: [ [ "Quelle est la seule superpuissance après 1991 ?", "Les États-Unis." ], [ "Citer deux génocides des années 1990.", "Le génocide des Tutsi au Rwanda (1994) et celui de Srebrenica, en Bosnie (1995)." ], [ "Que se passe-t-il le 11 septembre 2001 ?", "Des attentats d’Al-Qaïda frappent New York et Washington : près de 3 000 morts." ], [ "Citer un conflit et un enjeu du Pacifique depuis 1989.", "Par exemple la guerre de Bougainville ; la rivalité entre la Chine et les États-Unis, ou la montée des eaux qui menace les atolls." ] ],
        wiki: [ "Guerre du Golfe", "Génocide des Tutsi au Rwanda", "Attentats du 11 septembre 2001", "Conflit de Bougainville" ],
        src: [ [ "La guerre du Golfe, 1990-1991 (invasion du Koweït, résolution 678, coalition) — Office of the Historian, département d’État américain", "https://history.state.gov/milestones/1989-1992/gulf-war" ], [ "Le génocide de 1994 contre les Tutsi au Rwanda : plus d’un million de morts — Programme de sensibilisation, Organisation des Nations unies", "https://www.un.org/en/preventgenocide/rwanda" ], [ "Le génocide de Srebrenica, juillet 1995 — Mécanisme international appelé à exercer les fonctions résiduelles des Tribunaux pénaux (MIFRTP)", "https://www.irmct.org/srebrenica/en/" ], [ "Résumé du rapport de la Commission sur le 11 septembre 2001 — ministère de la Justice des États-Unis (OJP)", "https://www.ojp.gov/ncjrs/virtual-library/abstracts/911-commission-report-executive-summary" ], [ "Référendum de Bougainville, 23 novembre-7 décembre 2019 : 97,7 % pour l’indépendance — IFES (Fondation internationale pour les systèmes électoraux)", "https://www.ifes.org/news/bougainville-referendum-results-announced" ], [ "La Chine et les îles Salomon signent un accord de sécurité, avril 2022 — Radio New Zealand", "https://www.rnz.co.nz/news/world/465534/china-and-solomon-islands-sign-security-pact" ] ],
        fs: {
            niv: "3e",
            pb: "Quels enjeux et quels conflits marquent le monde depuis 1989, y compris dans le Pacifique ?",
            but: "Faire comprendre le passage d’un monde bipolaire à un monde multipolaire et instable, avec un cas régional dans le Pacifique.",
            notions: [ "génocide", "terrorisme", "monde multipolaire", "référendum d’autodétermination" ],
            comp: [ "Se repérer dans l’espace : localiser les principaux conflits depuis 1989", "Raisonner, justifier une démarche : expliquer pourquoi le monde est devenu multipolaire" ],
            meth: "Carte des conflits complétée au fil de la carte animée, puis étude de cas : Bougainville.",
            accroche: "Une de journal du 12 septembre 2001 : « Que s’est-il passé, et pourquoi ce jour a-t-il changé le monde ? »",
            act: [ "Carte animée, étapes 1 à 4 : placer sur un planisphère les conflits (Koweït, Yougoslavie, Rwanda, Afghanistan, Ukraine) avec leur date.", "Étape « Un monde multipolaire » : relever les puissances qui s’affirment après 2000.", "Étude de cas Bougainville : causes de la guerre, référendum de 2019 ; puis lister les enjeux du Pacifique (rivalités, climat)." ],
            fin: "Après 1991, les États-Unis restent seuls, mais le monde n’est pas pacifié : guerres et génocides des années 1990, terrorisme islamiste depuis 2001, affirmation de la Chine et de la Russie, guerre en Ukraine. Le Pacifique connaît aussi des conflits (Bougainville) et devient un enjeu entre puissances, menacé par la montée des eaux.",
            suite: "Évaluation de fin de séquence : voir l’Espace collège."
        }
    } ];
    e.add({
        id: "monde45",
        title: "Le monde depuis 1945",
        tag: "6 chapitres · XXe-XXIe siècles · 3e",
        col: "lap",
        proj: "plan",
        sub: "Guerre froide et fin de l’URSS, décolonisations en Asie, en Afrique et dans le Pacifique, construction européenne, conflits et enjeux depuis 1989, jusque dans le Pacifique.",
        frise: {
            from: 1945,
            to: 2026,
            lin: !0,
            ticks: [ [ 1945, "1945", 1 ], [ 1955, "1955" ], [ 1962, "1962", 1 ], [ 1975, "1975" ], [ 1989, "1989", 1 ], [ 2001, "2001" ], [ 2013, "2013" ], [ 2022, "2022", 1 ] ]
        },
        info: "<p><b>Collège, 3e, histoire, programme adapté à la Nouvelle-Calédonie</b> : thème 2 « Le monde depuis 1945 ». Les quatre sous-thèmes du programme sont couverts : un monde bipolaire au temps de la guerre froide (chapitres 1 et 2), décolonisations et construction de nouveaux États (chapitres 3 et 4, avec l’exemple du Pacifique et du Vanuatu), affirmation et mise en œuvre du projet européen (chapitre 5), enjeux et conflits dans le monde après 1989 (chapitre 6, avec un cas dans le Pacifique). L’évolution politique de la Nouvelle-Calédonie depuis 1946 relève du thème 3 (atlas du Pacifique, volet « Histoire de la Nouvelle-Calédonie », chapitre 9).</p><p><b>Cartes</b> : schémas, avec les frontières des pays actuels (Natural Earth, domaine public). Les limites d’époque (blocs, RDA) sont simplifiées ; les petits archipels sont figurés par des cercles.</p><p><b>Chiffres</b> : ordres de grandeur, arrondis ; les bilans humains varient selon les sources.</p><p><b>Sujets sensibles</b> : génocides, guerre d’Algérie et essais nucléaires peuvent toucher directement des familles d’élèves ; l’enseignant choisit les témoignages adaptés à sa classe.</p>",
        chapters: B
    });
}();