window.quaderns ??= [];

{
  const p = text => ({ type: 'paragraph', text });
  const essencial = text => ({ ...p(text), core: true });
  const table = (headers, rows, rowHeadingWidth) => ({ type: 'table', headers, rows, rowHeadingWidth });
  const list = (...items) => ({ type: 'steps', items });
  const box = (kind, title, text) => ({ type: 'note', kind, title, text });
  const section = (id, title, ...blocks) => ({ id, title, blocks });

  const collection = Object.freeze({
    id: 'terra-i-mapes',
    title: 'La Terra i els mapes',
  });
  const worldMaps = [
    { type: 'mapa', title: 'El món en català', provider: 'ICGC', url: 'https://www.icgc.cat/ca/Eines-i-visors/Visors/Didactics-i-ludics/El-Mon-en-catala' },
    { type: 'mapa', title: 'Mapes físics i polítics del món', provider: 'IGN', url: 'https://www.ign.es/web/ign/portal/recursos-educativos' },
  ];

  function addTopic(code, chapter, details) {
    window.quaderns.push({
      id: chapter.id,
      code,
      lang: 'ca',
      title: chapter.title,
      collection,
      subject: 'Medi',
      cycle: 'p3',
      status: 'en-desenvolupament',
      theme: 'Geografia',
      difficulty: 'Intermèdia',
      ...details,
      chapters: [chapter],
    });
  }

  addTopic('M001', {
    id: 'planeta-terra',
    title: 'El planeta Terra',
    intro: 'Quan trepitgem el terra, només veiem una part molt petita del planeta. Sota els peus hi ha capes de roca i metall. A la superfície i al seu voltant hi trobem aigua, aire i éssers vius. Tots aquests elements es relacionen.',
    figures: [
      {
        id: 'capes', section: 'capes', anchor: 'lead', name: 'Les capes de la Terra', ratio: 23 / 14,
        alt: 'Tall de la Terra amb escorça, mantell, nucli extern i nucli intern.',
        caption: 'Tall esquemàtic de la Terra. El gruix de les capes no està dibuixat a escala.',
        position: 'right',
        variants: {
          pla: { src: 'illustracions/capes.png?v=0.1.44' },
          volum: { src: 'illustracions/m001/capes.png?v=0.1.44', alt: 'Esfera de la Terra amb una porció retirada que mostra l’escorça, el mantell, el nucli extern i el nucli intern.' },
          realista: { src: 'illustracions/m001/capes-realista.png?v=0.1.44', thumbnail: 'illustracions/m001/miniatures/capes-realista.png?v=0.1.44', alt: 'Terra en un cel estel·lar, amb un tall que mostra l’escorça, el mantell, el nucli extern i el nucli intern.' },
        },
      },
      {
        id: 'reserva-moviment', section: 'moviment', name: 'Moviment de les plaques', ratio: 23 / 14,
        alt: 'Tres límits entre plaques amb fletxes de separació, acostament i lliscament lateral.',
        caption: 'Les plaques tectòniques poden separar-se, acostar-se o lliscar de costat.',
        variants: {
          pla: { src: 'illustracions/m001/moviment-pla.png?v=0.1.44' },
          volum: { src: 'illustracions/m001/moviment-volum.png?v=0.1.44' },
          realista: { src: 'illustracions/m001/moviment-realista.png?v=0.1.44', thumbnail: 'illustracions/m001/miniatures/moviment-realista.png?v=0.1.44', alt: 'Tres vinyetes de roca en perspectiva. Les fletxes mostren dues plaques que se separen, dues que s’acosten i formen una serralada, i dues que llisquen de costat.' },
        },
      },
      {
        id: 'falla-san-andreas', section: 'moviment', name: 'La falla de San Andreas',
        src: 'illustracions/m001/falla-san-andreas.jpg', ratio: 1180 / 1704,
        alt: 'Vista aèria de la plana de Carrizo. La traça de la falla travessa l’escena entre les elevacions del terreny.',
        caption: 'La traça de la falla de San Andreas a la plana de Carrizo, a Califòrnia. És un exemple de límit on les plaques llisquen de costat.',
        credit: 'Scott Haefner · USGS · Domini públic',
      },
      {
        id: 'reserva-gravetat', section: 'gravetat', name: 'La gravetat de la Terra', ratio: 23 / 14,
        alt: 'Tres fletxes, des de diferents punts de la superfície, apunten cap al centre de la Terra.',
        caption: 'En qualsevol punt de la superfície, la gravetat atrau els objectes cap al centre de la Terra.',
        variants: {
          pla: { src: 'illustracions/m001/gravetat-pla.png?v=0.1.44' },
          volum: { src: 'illustracions/m001/gravetat-volum.png?v=0.1.44', thumbnail: 'illustracions/m001/miniatures/gravetat-volum.png?v=0.1.44', alt: 'Tres fletxes van des de tres pilotes fins al punt Centre, visible entre les dues cares del tall de la Terra.' },
          realista: { src: 'illustracions/m001/gravetat-realista.png?v=0.1.44', thumbnail: 'illustracions/m001/miniatures/gravetat-realista.png?v=0.1.44', alt: 'Tres fletxes van des de tres pilotes fins al punt Centre, visible entre les dues cares del tall de la Terra.' },
        },
      },
      {
        id: 'reserva-elements', section: 'elements', name: 'Els elements del planeta Terra', ratio: 23 / 14,
        alt: 'Paisatge amb un riu, roca, cel amb pluja i vegetació a la riba.',
        caption: 'El riu connecta l’aigua, les roques, l’aire i els éssers vius.',
        variants: {
          pla: { src: 'illustracions/m001/elements-pla.png?v=0.1.44' },
          volum: { src: 'illustracions/m001/elements-volum.png?v=0.1.44' },
          realista: { src: 'illustracions/m001/elements-realista.png?v=0.1.44', thumbnail: 'illustracions/m001/miniatures/elements-realista.png?v=0.1.44', alt: 'Paisatge de muntanya amb un vessant rocós, un riu, un cel amb pluja i plantes a la riba, retolats com a geosfera, hidrosfera, atmosfera i biosfera.' },
        },
      },
      {
        id: 'arrels-i-erosio', section: 'elements', name: 'Les arrels i l’erosió del sòl',
        src: 'illustracions/m001/arrels-i-erosio.png', ratio: 4 / 3,
        alt: 'Dues safates amb el mateix pendent reben pluja. Una té plantes amb arrels. A la safata sense plantes, l’aigua s’endú més partícules de terra.',
        caption: 'Dos vessants amb el mateix pendent reben la mateixa pluja. Compara la terra arrossegada i fixa’t en el paper de les arrels.',
        variants: {
          pla: { src: 'illustracions/m001/arrels-i-erosio.png', thumbnail: 'illustracions/m001/miniatures/arrels-i-erosio-pla.jpg' },
          volum: {
            src: 'illustracions/m001/arrels-i-erosio-volum.png', thumbnail: 'illustracions/m001/miniatures/arrels-i-erosio-volum.jpg',
            alt: 'Dos vessants de terra en relleu. El vessant amb plantes mostra les arrels i l’aigua del seu recipient és més clara que la del vessant sense plantes.',
          },
          realista: {
            src: 'illustracions/m001/arrels-i-erosio-realista.png', thumbnail: 'illustracions/m001/miniatures/arrels-i-erosio-realista.jpg', ratio: 3 / 2,
            alt: 'Dos talls de sòl. A dalt es veuen les arrels de les plantes i un recipient amb aigua clara. A baix, el sòl nu aboca aigua marronosa en un altre recipient.',
          },
        },
      },
    ],
    sections: [
      section('capes', 'Les capes del planeta Terra',
        essencial('La **geosfera** és la part rocosa i metàl·lica de la Terra. Té tres capes principals: l’**escorça**, el **mantell** i el **nucli**.'),
        p('Els científics estudien l’interior del planeta observant, entre altres pistes, com hi viatgen les vibracions dels terratrèmols. Aquestes canvien de velocitat i de direcció segons els materials que travessen.'),
        table(['Capa', 'Com és?'], [
          ['Escorça', 'És la capa de roca més exterior i més prima. Forma el sòl rocós dels continents i el fons dels oceans.'],
          ['Mantell', 'És la capa més gruixuda. Està format sobretot per roca sòlida molt calenta que es pot deformar lentament.'],
          ['Nucli', 'És al centre de la Terra i està format sobretot per ferro. La part externa és líquida i la part interna és sòlida.'],
        ], 24),
        box('ampliacio', 'Com sabem què hi ha a dins?', 'En un model, una vibració tarda **6 segons** a travessar un material i **9 segons** a travessar-ne un altre a la mateixa distància. Viatja més de pressa pel primer. Quan els detectors registren canvis en la velocitat de les vibracions dels terratrèmols, els científics poden buscar on canvien els materials.')),
      section('moviment', 'Hi ha moviment a les capes de la Terra?',
        essencial('La capa rígida de fora de la Terra està dividida en grans peces, les **plaques tectòniques**. Les plaques es mouen molt a poc a poc.'),
        p('L’escorça i la part més superficial i rígida del mantell formen la **litosfera**. Les plaques es mouen uns quants centímetres cada any, aproximadament el que poden créixer les ungles en un any.'),
        p('La calor interna de la Terra contribueix a moviments molt lents al mantell. A la superfície, algunes plaques se separen, d’altres xoquen i d’altres llisquen de costat. Amb el pas de milions d’anys, aquests moviments desplacen els continents i poden aixecar serralades.'),
        p('Quan les roques es desplacen de cop al llarg d’una fractura, el terra pot tremolar. En moltes zones on es troben plaques també es forma **magma**, roca fosa que, quan surt a la superfície en una erupció, s’anomena **lava**.'),
        box('curiositat', 'Un moviment lent que s’acumula', 'Si dues plaques se separen **4 cm cada any**, en **100 anys** la distància augmenta **400 cm**, o sigui, **4 metres**. A un ritme semblant durant un milió d’anys, serien 40 km.'),
        box('observa', 'Del moviment al mapa', 'Un mapa de plaques i un mapa de terratrèmols ens permeten comprovar si les zones amb molts terratrèmols coincideixen amb els límits de les plaques.')),
      section('gravetat', 'La gravetat de la Terra',
        essencial('Si deixes anar una pilota, cau per la **gravetat**. A qualsevol lloc de la Terra, «avall» apunta cap al centre de la Terra.'),
        p('La gravetat també manté l’aire a prop de la Terra i contribueix a mantenir la Lluna en òrbita. Al paisatge es nota quan l’aigua corre pendent avall i quan les pedres cauen d’un vessant.'),
        p('La **massa** indica quanta matèria té un objecte. El **pes** és la força amb què la gravetat l’atrau. Una motxilla portada a la Lluna té la mateixa massa que a la Terra, però el seu pes és aproximadament una sisena part del pes que té a la Terra.'),
        box('prova', 'Dibuixa cap on cau', 'Imagina dues persones en punts oposats del globus, cadascuna amb una pilota. Dibuixa una fletxa des de cada pilota cap al centre. En el paper les fletxes tenen sentits oposats. Per a totes dues persones, la pilota cau cap avall.')),
      section('elements', 'Els elements del planeta Terra',
        essencial('Les **roques**, l’**aigua**, l’**aire** i els **éssers vius** formen parts de la Terra que es relacionen.'),
        table(['Part del sistema', 'Què hi trobem?'], [
          ['Geosfera', 'Les roques i els minerals del planeta, des de la superfície fins al nucli.'],
          ['Hidrosfera', 'L’aigua del planeta, com la dels oceans, els rius, els llacs, les glaceres i el subsol.'],
          ['Atmosfera', 'La capa de gasos que envolta la Terra. L’aire que respirem en forma part.'],
          ['Biosfera', 'El conjunt dels éssers vius i els llocs de la Terra on hi ha vida.'],
        ]),
        p('Pensa en un riu. L’aigua que hi circula (hidrosfera) desgasta i transporta fragments de roca (geosfera). La pluja (que es forma a l’atmosfera) pot fer pujar el cabal, i el riu ofereix aigua i refugi a plantes i animals (biosfera).'),
        p('La relació també va en l’altre sentit. Les arrels ajuden a subjectar el sòl de la riba. Si es perd la vegetació, l’aigua pot arrossegar més terra. Un canvi en els éssers vius pot transformar el paisatge.'),
        box('ampliacio', 'I ara, on ho situem?', 'Si volguéssim assenyalar el naixement d’un riu o el lloc d’un terratrèmol en un globus, ens caldria una manera de dir en quin punt del planeta es troba.')),
    ],
  }, {
    figureStyles: [
      { id: 'pla', label: 'Esquema pla', description: 'Vistes planes, contorns nets i colors uniformes.' },
      { id: 'volum', label: 'Il·lustració amb volum', description: 'Perspectiva i ombres suaus per veure la profunditat.' },
      { id: 'realista', label: 'Il·lustració realista', description: 'Textura de roca, paisatge recreat i vistes de la Terra sobre un cel estel·lar.' },
    ],
    status: 'definitiu',
    description: 'Descobreix les capes de la Terra, el moviment de les plaques, la gravetat i com es relacionen l’aigua, l’aire, les roques i els éssers vius.',
    curriculum: [{ row: 'medi:terra', section: 'elements', note: 'Explica les capes i com s’influeixen les roques, l’aigua, l’aire i els éssers vius.' }],
    sources: [
      ['USGS · L’interior de la Terra', 'https://pubs.usgs.gov/gip/dynamic/inside.html'],
      ['USGS · Ones sísmiques P i S', 'https://www.usgs.gov/media/images/p-wave-and-s-wave-paths-through-earth'],
      ['USGS · El moviment de les plaques', 'https://pubs.usgs.gov/gip/dynamic/understanding.html'],
      ['USGS · Fotografia de la falla de San Andreas', 'https://www.usgs.gov/media/images/view-san-andreas-fault'],
      ['NASA · La Terra', 'https://science.nasa.gov/earth/facts/'],
      ['NASA · La gravetat i l’òrbita', 'https://science.nasa.gov/learn/basics-of-space-flight/chapter3-4/'],
      ['NASA · La gravetat a la Lluna', 'https://science.nasa.gov/moon/top-moon-questions/'],
      ['USGS · Conques hidrogràfiques', 'https://www.usgs.gov/water-science-school/science/watersheds-and-drainage-basins'],
      ['USGS · L’aigua que corre sobre el terreny', 'https://www.usgs.gov/water-science-school/science/runoff-surface-and-overland-water-runoff'],
      ['USGS · Vegetació i erosió de les ribes', 'https://water.usgs.gov/osw/techniques/bs/bs-assesswg.html'],
    ],
  });

  addTopic('M002', {
    id: 'coordenades',
    title: 'Les coordenades geogràfiques',
    intro: 'Una boia de l’Atlàntic envia un missatge amb dos nombres. Podem saber on és sense veure-la? Amb un mapa i les seves **coordenades geogràfiques**, sí.',
    figures: [
      {
        id: 'reserva-latitud', section: 'latitud', name: 'Els paral·lels en un globus', ratio: 2.35,
        alt: 'Globus amb l’equador marcat a 0° i el paral·lel de 20° N ressaltat. El tram ocult del paral·lel es mostra amb una línia discontínua.',
        caption: 'L’equador marca 0°. Els paral·lels del nord i del sud es fan més petits a mesura que s’acosten als pols.',
        variants: {
          pla: { src: 'illustracions/m002/parallels-pla.png' },
          volum: { src: 'illustracions/m002/parallels-volum.png' },
        },
      },
      {
        id: 'reserva-longitud', section: 'longitud', name: 'Els meridians en un globus', ratio: 2.35,
        alt: 'Globus amb arcs que uneixen els pols. El meridià de Greenwich marca 0°, amb el de 40° O a l’esquerra i el de 40° E a la dreta.',
        caption: 'Els meridians es troben als pols. El de Greenwich és la referència per comptar els graus cap a l’est i cap a l’oest.',
        variants: {
          pla: { src: 'illustracions/m002/meridians-pla.png' },
          volum: { src: 'illustracions/m002/meridians-volum.png' },
        },
      },
      {
        id: 'graella', section: 'localitzacio', name: 'Graella de les boies', ratio: 2, position: 'center',
        alt: 'Graella amb la longitud a dalt i la latitud a l’esquerra. Un traç discontinu guia fins a A, a 20° N i 40° O. B és una divisió a l’est d’A. C és una divisió al sud de l’equador i una a l’est de Greenwich.',
        caption: 'El traç discontinu guia fins a la boia A. Fes servir la mateixa graella per llegir les coordenades de B i C.',
        variants: {
          pla: { src: 'illustracions/m002/graella-boies.png', label: 'Graella esquemàtica' },
          volum: {
            src: 'illustracions/m002/graella-boies-planisferi.png', thumbnail: 'illustracions/m002/miniatures/graella-boies-planisferi.jpg', label: 'Amb planisferi',
            alt: 'Planisferi amb un sector de l’Atlàntic ampliat. El traç discontinu guia fins a A, a 20° N i 40° O. B és una divisió a l’est d’A i també és al mar. C és a terra, una divisió al sud de l’equador i una a l’est de Greenwich.',
          },
        },
      },
      {
        id: 'troba-la-flota-exemple', section: 'localitzacio', name: 'Exemple de Troba la flota', ratio: 2.05,
        src: 'illustracions/m002/troba-la-flota-exemple.png', visible: false,
        anchor: 'after', width: 100, position: 'center', wrap: false,
        alt: 'Graella sobre el mar amb dos vaixells. Un traç discontinu guia fins al vaixell 1, a 20° S i 40° E. El vaixell 2 és una divisió al nord de l’equador i dues a l’oest de Greenwich.',
        caption: 'El traç discontinu situa el vaixell 1 a 20° S, 40° E. Quines coordenades té el vaixell 2?',
      },
      {
        id: 'troba-la-flota', section: 'localitzacio', name: 'Troba la flota', ratio: 2.05,
        src: 'illustracions/m002/troba-la-flota.png',
        alt: 'Dues graelles buides, «La meva flota» i «Els meus intents». Van de 60° O a 60° E i de 40° N a 40° S en passos de 20°. L’equador i Greenwich tenen un traç més gruixut.',
        anchor: 'after', width: 100, position: 'center', wrap: false,
        caption: 'Troba la flota. Jugueu en parelles. Cadascú marca en secret tres vaixells en encreuaments diferents de la graella «La meva flota». Per torns, digueu unes coordenades, primer la latitud i després la longitud. L’altra persona respon «trobat» o «aigua». Anoteu el resultat a «Els meus intents». Guanya qui troba primer els tres vaixells.',
      },
    ],
    sections: [
      section('latitud', 'Amb els paral·lels coneixem la latitud',
        essencial('La **latitud** indica quants graus al nord o al sud de l’**equador** es troba un punt.'),
        p('Els **paral·lels** són línies imaginàries que fan la volta a la Terra d’est a oest. L’equador és el més llarg i divideix el planeta en els **hemisferis nord i sud**. Els altres paral·lels es fan més petits a mesura que ens acostem als pols.'),
        p('A l’equador, la latitud és de **0°**. Al pol nord és de **90° N** i al pol sud, de **90° S**. Tots els punts d’un mateix paral·lel tenen la mateixa latitud.'),
        box('curiositat', 'Un paral·lel, molts llocs', 'Dos vaixells són a **30° N**. Són al mateix paral·lel, però podrien ser molt lluny l’un de l’altre. Per situar cadascun amb precisió també ens cal la longitud.')),
      section('longitud', 'Amb els meridians coneixem la longitud',
        essencial('La **longitud** indica quants graus a l’est o a l’oest del **meridià de Greenwich** es troba un punt.'),
        p('Els **meridians** són línies imaginàries que van del pol nord al pol sud. Són més separats a l’equador i es troben als pols. El meridià de Greenwich, que passa prop de Londres, marca **0°**.'),
        p('La longitud es mesura fins a **180°** cap a cada costat de Greenwich. Escrivim **E** per a l’est i **O** per a l’oest. En mapes en anglès, hi trobaràs **W** per a l’oest (*west*).'),
        table(['Coordenada', 'Línies que seguim', 'On és el 0°?', 'Direccions'], [
          ['Latitud', 'Paral·lels', 'Equador', 'Nord (N) i sud (S)'],
          ['Longitud', 'Meridians', 'Meridià de Greenwich', 'Est (E) i oest (O)'],
        ])),
      section('localitzacio', 'Com es localitza un punt al mapa',
        essencial('Escrivim primer la **latitud** i després la **longitud**. El punt és on s’encreuen el paral·lel i el meridià corresponents.'),
        p('La boia **A** envia la seva posició, **20° N, 40° O**. Busca-la a la graella.'),
        list('Busca el paral·lel de **20° N** al nord de l’equador.',
          'Busca el meridià de **40° O** a l’oest de Greenwich.',
          'Segueix les dues línies fins que es creuin. En aquest punt hi ha la boia **A**.'),
        box('prova', 'Llegeix els punts B i C', 'Llegeix la longitud de **B** al marge de dalt. Quina boia és més a prop de Greenwich? Escriu les dues coordenades de **C**. Guia’t pels dos 0°.'),
        p('Per comprovar la posició d’un punt, segueix el paral·lel fins al marge esquerre i el meridià fins al de dalt. Si el punt cau entre dues línies numerades, pots estimar la coordenada.')),
    ],
  }, {
    figureStyles: [
      { id: 'pla', label: 'Esquema pla', description: 'Globus plans i graella esquemàtica.' },
      { id: 'volum', label: 'Il·lustració amb volum', description: 'Globus amb ombres i graella sobre un mapa de l’Atlàntic.' },
    ],
    status: 'definitiu',
    description: 'Fes servir els paral·lels i els meridians per llegir la latitud i la longitud i localitzar un punt al mapa.',
    curriculum: [{ row: 'medi:cartografia', section: 'localitzacio', note: 'Situa punts al mapa amb la latitud i la longitud.' }],
    sources: [
      ['NOAA · Latitud i longitud', 'https://oceanservice.noaa.gov/education/tutorial_nautical_charts/nautical_charts02_information_2b.html'],
      ['Natural Earth · Contorns de terra dels globus', 'https://www.naturalearthdata.com/downloads/110m-physical-vectors/110m-land/'],
      ['Natural Earth · Relleu i aigua del planisferi', 'https://www.naturalearthdata.com/downloads/50m-natural-earth-1/50m-natural-earth-i-with-shaded-relief-and-water/'],
    ],
  });

  addTopic('M003', {
    id: 'mapes-i-planols',
    title: 'Els mapes i els plànols geogràfics',
    intro: 'Has d’anar a la biblioteca d’un altre municipi. Hi vas en autobús i, quan baixes, continues a peu. Et servirà el mateix mapa per als dos trams?',
    figures: [
      {
        id: 'reserva-definicions', section: 'definicions', name: 'Del mapa del municipi al plànol del barri',
        ratio: 2.4, position: 'center',
        caption: 'El mapa situa el barri dins del municipi. El plànol mostra amb detall els carrers de la zona marcada al mapa.',
      },
      {
        id: 'barri', section: 'llegenda', name: 'Plànol del barri', ratio: 2.1, position: 'center',
        caption: 'Busca la fletxa del nord i compara els símbols del plànol amb els de la llegenda.',
      },
      {
        id: 'reserva-escala', section: 'escala', name: 'De l’escola a la biblioteca', ratio: 2.5, position: 'center',
        caption: 'El segment recte uneix l’escola i la biblioteca. L’altre traç segueix els carrers. Compara les dues distàncies amb la barra d’escala.',
      },
    ],
    sections: [
      section('definicions', 'Què són els mapes i els plànols?',
        essencial('Un **mapa** representa un territori en petit i sobre una superfície plana. Un **plànol** acostuma a mostrar amb més detall un espai més reduït.'),
        p('Un mapa del municipi pot mostrar carreteres i parades d’autobús. Quan baixes, el plànol et mostra els carrers i els edificis del barri vistos des de dalt. Així pots seguir el camí fins a la biblioteca.'),
        box('prova', 'Quin dibuix et convé?', 'Quin dibuix faries servir per trobar la parada d’autobús? Quin, per decidir en quin carrer has de girar?')),
      section('llegenda', 'Els mapes i els plànols porten una llegenda',
        essencial('La **llegenda** explica què signifiquen els símbols, les línies i els colors d’un mapa o un plànol.'),
        p('Al plànol del barri, **E** indica l’escola i **B**, la biblioteca. El parc es reconeix pel ratllat i el riu, per la banda amb vores ondulades. La fletxa amb una **N** ens indica cap on apunta el nord. En aquest plànol, el nord és a dalt.'),
        box('observa', 'Llegeix el plànol', 'Dels tres llocs, l’escola, la biblioteca i el parc, quin és a l’est del riu? Quin element del plànol et permet passar d’una riba a l’altra?'),
        p('Un color pot representar coses diferents. El verd pot indicar un parc aquí i poca altitud en un mapa físic. Els ratllats ajuden a llegir una còpia en blanc i negre.')),
      section('escala', 'Els mapes i els plànols es dibuixen a escala',
        essencial('L’**escala** relaciona una distància del dibuix amb la distància real que representa.'),
        box('prova', 'De l’escola a la biblioteca', 'Quants metres representa el segment recte? Compara’l amb la barra. Fes el mateix amb els tres trams del camí a peu i suma’n les distàncies.'),
        table(['Tipus d’escala', 'Com es llegeix?'], [
          ['Gràfica', 'És una barra amb trams numerats. En el plànol del barri, el tram de 0 a 50 representa 50 m reals.'],
          ['Numèrica', 'A escala 1:5.000, 1 cm del plànol equival a 5.000 cm reals, és a dir, 50 m. Per tant, 2 cm representen 100 m.'],
        ], 26),
        p('Si el plànol i la barra canvien de mida alhora, la barra continua sent útil. Per saber on neix el riu, ens convindrà un mapa que mostri més territori.')),
    ],
  }, {
    description: 'Distingeix un mapa d’un plànol i aprèn a llegir-ne la llegenda i l’escala per orientar-te i calcular distàncies.',
    curriculum: [{ row: 'medi:cartografia', section: 'escala', note: 'Interpreta la llegenda i compara distàncies en línia recta i per un itinerari amb l’escala gràfica.' }],
    sources: [
      ['ICGC · Escala cartogràfica', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Escala'],
      ['ICGC · Símbol cartogràfic', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Simbol-cartografic'],
    ],
  });

  addTopic('M004', {
    id: 'tipus-de-mapes',
    title: 'Els tipus de mapes',
    intro: 'Pots mirar un mateix territori per saber com és el relleu, per on passa una carretera o quines fronteres el divideixen. La pregunta que et fas t’ajuda a triar el mapa.',
    figures: [
      { id: 'planisferi-fisic', name: 'Planisferi físic', section: 'fisic', anchor: 'after', ratio: 2, position: 'center' },
      { id: 'planisferi-politic', name: 'Planisferi polític', section: 'politic', anchor: 'lead', ratio: 2, position: 'center' },
    ],
    sections: [
      section('tipus', 'Quins tipus de mapes hi ha?',
        table(['Tipus', 'Què destaca?', 'Quan ens pot servir?'], [
          ['Físic', 'Muntanyes, planes, rius i altres elements naturals.', 'Per descobrir per on passa una serralada.'],
          ['Polític', 'Fronteres, territoris, capitals i altres ciutats.', 'Per saber quins països comparteixen frontera.'],
          ['Topogràfic', 'El relleu amb detall, els camins i altres elements del terreny.', 'Per preparar una excursió i veure els pendents.'],
          ['Temàtic', 'Un tema concret, com les pluges, la població o el transport.', 'Per comparar on plou més o trobar una línia de tren.'],
        ]),
        p('Un mapa topogràfic pot mostrar el relleu amb **corbes de nivell**, línies que uneixen punts situats a la mateixa altitud. Quan són molt juntes, el terreny fa més pendent.'),
        box('prova', 'Tria els mapes de l’excursió', 'Per decidir si un recorregut és costerut, busca les corbes de nivell en un mapa topogràfic. Per saber si pots arribar al punt de sortida amb tren, consulta un mapa de la xarxa ferroviària i localitza-hi la parada més propera.')),
      section('atles', 'L’atles',
        p('Un **atles** és un conjunt de mapes organitzats per territoris, per temes o per tots dos criteris. Pot ser un llibre o un recurs digital. Si busques un lloc, l’índex de noms et pot indicar en quina pàgina i en quin sector de la graella el trobaràs.'),
        p('Per estudiar un riu, pots obrir un mapa físic per veure on neix i on desemboca. Després pots consultar un mapa polític per descobrir quins països travessa o separa.'),
        p('Si l’índex indica **pàgina 12, D4**, obre la pàgina 12 i busca la casella D4 a la graella del mapa. Al requadre et serà més fàcil trobar el nom del lloc. El mateix nom pot aparèixer a l’índex més d’una vegada si hi ha llocs amb noms iguals.')),
      section('lectura', 'Com es llegeix un mapa?',
        list('Llegeix el **títol**. Et diu quin territori i quin tema representa el mapa.',
          'Busca l’**orientació**. La fletxa del nord o la rosa dels vents t’ajuden a saber cap a on mires. En molts mapes el nord és a dalt.',
          'Consulta la **llegenda**. Interpreta els colors i els símbols que et fan falta.',
          'Comprova l’**escala** si necessites estimar distàncies. Fes servir les coordenades o la graella si vols situar un punt.',
          'Fixa’t en la **font i la data** si vols dades actualitzades, com una nova carretera o una ruta d’autobús.'),
        box('observa', 'Dos mapes de la mateixa línia', 'Un mapa antic i un de recent poden mostrar parades diferents. Si has d’agafar l’autobús avui, consulta el mapa vigent de l’operador i comprova si hi ha avisos de desviacions.')),
      section('fisic', 'El planisferi físic',
        p('Un **planisferi** o **mapamundi** representa tota la superfície terrestre en un pla. Com que la Terra és gairebé esfèrica, en passar-la a un full es deformen algunes mides, formes o distàncies. La manera de fer aquest pas s’anomena **projecció cartogràfica**.'),
        p('El **planisferi físic** mostra la distribució dels continents i oceans i destaca elements naturals com les serralades, els rius i les grans planes. La llegenda indica si els colors mostren l’altitud del terreny o la profunditat del mar. Per exemple, pots buscar la serralada dels Andes a l’oest d’Amèrica del Sud.'),
        p('Un color marró pot marcar terres altes i diversos blaus poden indicar profunditats del mar. Llegeix a la llegenda quins intervals representa cada color. Dos punts del mateix color poden tenir altituds diferents dins d’un mateix interval.')),
      section('politic', 'El planisferi polític',
        p('El **planisferi polític** mostra com s’organitza el territori del món en estats. Hi podem trobar els noms dels països, les fronteres, les capitals i algunes ciutats importants. Els colors ajuden a distingir països veïns i els punts o altres símbols indiquen les ciutats.'),
        box('observa', 'Dos mapes, un mateix lloc', 'Localitza els **Andes** al planisferi físic. Després busca la mateixa zona al polític i identifica dos països per on passa la serralada. Quina informació t’ha donat cadascun dels mapes?'),
        p('Una serralada pot travessar diversos països. Els Andes passen, per exemple, per Xile i el Perú. En comparar els dos planisferis, pots seguir la mateixa serralada encara que canviï el color del país.')),
    ],
  }, {
    description: 'Tria el mapa que et convé, consulta un atles i compara què mostren els planisferis físics i polítics.',
    curriculum: [{ row: 'medi:cartografia', section: 'lectura', note: 'Ensenya a triar i llegir mapes físics, polítics i temàtics.' }],
    resources: worldMaps,
    sources: [
      ['USGS · Com es fan servir les projeccions cartogràfiques', 'https://www.usgs.gov/faqs/how-are-different-map-projections-used'],
      ['ICGC · Cartografia topogràfica', 'https://www.icgc.cat/ca/Geoinformacio-i-mapes/Dades-i-productes/Geoinformacio-cartografica/Cartografia-topografica-11000'],
    ],
  });
}
