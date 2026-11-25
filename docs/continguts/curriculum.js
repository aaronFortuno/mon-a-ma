window.curriculum = {
  cycles: [
    { id: 'p1', label: 'Cicle inicial', stage: 'Primària', years: '1r i 2n' },
    { id: 'p2', label: 'Cicle mitjà', stage: 'Primària', years: '3r i 4t' },
    { id: 'p3', label: 'Cicle superior', stage: 'Primària', years: '5è i 6è' },
    { id: 's1', label: '1r i 2n', stage: 'ESO', years: '1r i 2n' },
    { id: 's2', label: '3r i 4t', stage: 'ESO', years: '3r i 4t' },
  ],
  groups: [
    {
      id: 'medi',
      title: 'Coneixement del Medi',
      source: 'https://xtec.gencat.cat/web/.content/curriculum/primaria/curriculum-175-2022/Coneixement-del-Medi-Natural-Social-i-Cultural.pdf',
      rows: [
        ['indagacio', 'Cultura científica', 'Indagació científica', {
          p1: 'Observació de l’entorn, preguntes, mesures senzilles, experiments guiats i comunicació de descobertes.',
          p2: 'Proves i registres sistemàtics, instruments de mesura i interpretació de dades. Relació entre ciència, tecnologia i societat.',
          p3: 'Planificació d’investigacions, anàlisi i comunicació de dades, i valor de la ciència en la presa de decisions.',
        }],
        ['vida', 'Cultura científica', 'Vida i éssers vius', {
          p1: 'Necessitats i funcions dels éssers vius, adaptació a l’hàbitat i hàbits de cura personal i de l’entorn.',
          p2: 'Classificació de plantes i animals, funcions vitals, ecosistemes i hàbits de salut.',
          p3: 'Xarxes alimentàries, flux de matèria i energia, funcions vitals i salut física, emocional i social.',
        }],
        ['materia', 'Cultura científica', 'Matèria, forces i energia', {
          p1: 'Propietats dels materials, llum i so, canvis d’estat i resistència d’estructures.',
          p2: 'Propietats i transformacions de la matèria, fonts d’energia, forces i màquines.',
          p3: 'Densitat i flotabilitat, transformacions de la matèria, electricitat i forces que intervenen en el vol.',
        }],
        ['digital', 'Tecnologia i digitalització', 'Entorn digital d’aprenentatge', {
          p1: 'Ús guiat de dispositius i recursos digitals per cercar i comunicar informació.',
          p2: 'Cerca i organització d’informació, comunicació digital, seguretat i benestar.',
          p3: 'Estratègies de cerca, gestió i representació de dades, privadesa i convivència digital.',
        }],
        ['disseny', 'Tecnologia i digitalització', 'Disseny i pensament computacional', {
          p1: 'Construcció de solucions senzilles en equip i seqüències d’instruccions.',
          p2: 'Disseny, prototipatge, comprovació de solucions i iniciació a la programació.',
          p3: 'Descomposició de reptes, disseny i avaluació de prototips amb eines analògiques o digitals.',
        }],
        ['terra', 'Societats i territoris · Reptes del món actual', 'La Terra i les seves dinàmiques', {
          p1: 'Elements i moviments de la Terra, canvis estacionals i observació de l’entorn geològic pròxim.',
          p2: 'Relació entre la Terra i l’univers, dinàmiques de la superfície i efectes de l’aigua, el vent i altres agents.',
          p3: 'La Terra com a sistema: elements, interaccions i efectes sobre l’entorn i la vida quotidiana.',
        }],
        ['cartografia', 'Societats i territoris · Reptes del món actual', 'Cartografia i orientació', {
          p1: 'Itineraris, desplaçaments i ús inicial de referències espacials.',
          p2: 'Orientació i representació de l’espai amb mapes i plànols a diverses escales.',
          p3: 'Diversitat geogràfica de Catalunya, Espanya i Europa i representació del territori amb recursos cartogràfics analògics i digitals.',
        }],
        ['reptes', 'Societats i territoris · Reptes del món actual', 'Clima, població i reptes socials', {
          p1: 'Observació del temps atmosfèric, sostenibilitat en la vida diària i rols de gènere.',
          p2: 'Registre meteorològic, població i diversitat, reptes de sostenibilitat i equitat.',
          p3: 'Zones climàtiques, població i migracions, organització del territori, economia global i igualtat.',
        }],
        ['passat', 'Societats i territoris', 'Història i patrimoni', {
          p1: 'Pas del temps, memòria familiar i comunitària i patrimoni de l’entorn.',
          p2: 'Fonts històriques, prehistòria i edat antiga i canvis en la vida quotidiana local.',
          p3: 'Fonts i cronologia des de l’edat mitjana fins a l’actualitat, democratització i patrimoni.',
        }],
        ['civica', 'Societats i territoris', 'Ciutadania i convivència', {
          p1: 'Diversitat i convivència a l’entorn proper, acords i mobilitat segura.',
          p2: 'Convivència, diversitat cultural, entitats locals i participació.',
          p3: 'Drets humans i de la infància, cultura de pau, participació i institucions de l’Estat i de la UE.',
        }],
        ['ecosocial', 'Societats i territoris', 'Consciència ecosocial', {
          p1: 'Cura de l’entorn, ús responsable de l’aigua i de l’energia i prevenció de residus.',
          p2: 'Canvi climàtic, interdependència, impacte humà i consum responsable.',
          p3: 'Canvi climàtic, petjada ecològica, recursos limitats, economia i desigualtats.',
        }],
      ],
    },
    {
      id: 'socials',
      title: 'ESO · Ciències Socials',
      source: 'https://xtec.gencat.cat/web/.content/curriculum/eso/curriculum-175-2022/Ciencies-Socials.-Geografia-i-Historia.pdf',
      rows: [
        ['reptes', '', 'Reptes del món actual', { s1: 'Orientació, escales, eines geogràfiques i factors del clima, biodiversitat, població i desigualtats.', s2: 'Sostenibilitat global, interdependència entre països, recerca social, economia i migracions.' }],
        ['societats', '', 'Societats i territoris', { s1: 'Recerca amb fonts i estudi de les societats i els territoris des de la prehistòria fins a l’edat moderna.', s2: 'Esdeveniments i processos del món contemporani, canvis polítics, socials i econòmics, i memòria democràtica.' }],
        ['civica', '', 'Compromís cívic', { s1: 'Convivència, drets i diversitat, patrimoni, consum i ciutadania global.', s2: 'Ciutadania activa, drets, igualtat, cultura de pau, sostenibilitat i compromís democràtic.' }],
      ],
    },
    {
      id: 'bio',
      title: 'ESO · Biologia i Geologia',
      source: 'https://xtec.gencat.cat/ca/curriculum/eso/curriculum-175-2022/',
      note: 'Els sabers d’aquesta matèria s’agrupen de 1r a 3r i, separadament, a 4t. La columna de 3r i 4t reuneix les referències de tots dos cursos.',
      rows: [
        ['projecte', '', 'Projecte científic', { s1: 'Preguntes, hipòtesis, fonts, models i investigacions. Sabers de 1r a 3r.', s2: 'A 3r continua la recerca del tram de 1r a 3r. A 4t s’amplia amb control experimental i comunicació de resultats.' }],
        ['geologia', '', 'Geologia', { s1: 'Roques, minerals, geosfera i processos geològics. Sabers de 1r a 3r.', s2: 'A 3r es mantenen els sabers de 1r a 3r. A 4t s’estudien la tectònica i els riscos geològics.' }],
        ['cellula', '', 'La cèl·lula', { s1: 'Tipus de cèl·lules i observació microscòpica. Sabers de 1r a 3r.', s2: 'A 3r continua el bloc compartit de 1r a 3r. A 4t es treballen la mitosi i la meiosi.' }],
        ['vius', '', 'Éssers vius', { s1: 'Organismes, classificació i identificació d’espècies. Sabers de 1r a 3r.', s2: 'Identificació i classificació d’éssers vius dins del tram de 1r a 3r.' }],
        ['ecologia', '', 'Ecologia i sostenibilitat', { s1: 'Ecosistemes, interaccions i sostenibilitat. Sabers de 1r a 3r.', s2: 'Ecosistemes i sostenibilitat dins del tram de 1r a 3r.' }],
        ['cos', '', 'Cos humà', { s1: 'Aparells, sistemes i funcions de nutrició, relació i reproducció. Sabers de 1r a 3r.', s2: 'Anatomia i fisiologia dins del tram de 1r a 3r.' }],
        ['habits', '', 'Hàbits saludables', { s1: 'Alimentació, benestar, sexualitat i prevenció de conductes de risc. Sabers de 1r a 3r.', s2: 'Salut i hàbits dins del tram de 1r a 3r.' }],
        ['salut', '', 'Salut i malaltia', { s1: 'Malalties, defenses de l’organisme i prevenció. Sabers de 1r a 3r.', s2: 'Salut i prevenció dins del tram de 1r a 3r.' }],
        ['genetica', '', 'Genètica i evolució', { s2: 'A 4t s’estudien l’ADN, l’herència, les mutacions i l’evolució.' }],
        ['univers', '', 'La Terra en l’univers', { s2: 'A 4t s’estudien l’origen de l’univers, el sistema solar i les hipòtesis sobre l’origen de la vida.' }],
      ],
    },
    {
      id: 'fq',
      title: 'ESO · Física i Química',
      source: 'https://xtec.gencat.cat/web/.content/curriculum/eso/curriculum-175-2022/Fisica-i-Quimica.pdf',
      note: 'El decret diferencia els sabers de 1r a 3r dels de 4t. Les dues columnes serveixen per navegar el catàleg per franges.',
      rows: [
        ['metode', '', 'Habilitats científiques', { s1: 'Preguntes, experimentació, dades, treball segur i llenguatge científic.', s2: 'Investigació, models, entorns de treball i comunicació de resultats.' }],
        ['materia', '', 'Matèria', { s1: 'Composició, estats, mescles i models de partícules.', s2: 'Estructura atòmica, enllaços, compostos i concentració de dissolucions.' }],
        ['energia', '', 'Energia', { s1: 'Formes, fonts i transferències d’energia, temperatura i calor.', s2: 'Transferències i conservació d’energia, potència i implicacions ambientals.' }],
        ['interaccio', '', 'Interacció', { s1: 'Moviment, forces i efectes de la interacció entre cossos.', s2: 'Moviment i lleis de la dinàmica, incloses interaccions gravitatòries i forces en fluids.' }],
        ['canvi', '', 'Canvi', { s1: 'Canvis físics i químics, reaccions i conservació de la massa.', s2: 'Equacions químiques, proporcions i factors que determinen les reaccions.' }],
      ],
    },
    {
      id: 'tec',
      title: 'ESO · Tecnologia i Digitalització',
      source: 'https://xtec.gencat.cat/ca/curriculum/eso/curriculum-175-2022/',
      note: 'Aquest bloc correspon a Tecnologia i Digitalització de 1r a 3r. A 4t, Tecnologia i Digitalització són matèries diferenciades.',
      rows: [
        ['projectes', '', 'Resolució de problemes i projectes', { s1: 'Planificació, recerca, materials, estructures, mecanismes i circuits.', s2: 'Disseny i construcció de solucions dins del tram de 1r a 3r.' }],
        ['comunicacio', '', 'Comunicació d’idees', { s1: 'Representació tècnica, documentació i difusió de projectes.', s2: 'Comunicació tècnica dins del tram de 1r a 3r.' }],
        ['programacio', '', 'Programació i robòtica', { s1: 'Algorismes, programació, control i dispositius automatitzats.', s2: 'Programació i control dins del tram de 1r a 3r.' }],
        ['digital', '', 'Entorn digital d’aprenentatge', { s1: 'Dispositius, aplicacions, dades, comunicació i seguretat digital.', s2: 'Ús i gestió de l’entorn digital dins del tram de 1r a 3r.' }],
        ['sostenible', '', 'Tecnologia sostenible', { s1: 'Impacte dels productes i processos tecnològics i ús responsable dels recursos.', s2: 'Valoració de l’impacte tecnològic dins del tram de 1r a 3r.' }],
      ],
    },
  ],
};
