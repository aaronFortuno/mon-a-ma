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
    title: 'La Terra i les seves representacions',
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
    title: 'La Terra per dins i per fora',
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
      section('capes', 'De l’escorça al nucli',
        essencial('La **geosfera** és la part rocosa i metàl·lica de la Terra. Té tres capes principals: l’**escorça**, el **mantell** i el **nucli**.'),
        p('Els científics estudien l’interior del planeta observant, entre altres pistes, com hi viatgen les vibracions dels terratrèmols. Aquestes canvien de velocitat i de direcció segons els materials que travessen.'),
        table(['Capa', 'Com és?'], [
          ['Escorça', 'És la capa de roca més exterior i més prima. Forma el sòl rocós dels continents i el fons dels oceans.'],
          ['Mantell', 'És la capa més gruixuda. Està format sobretot per roca sòlida molt calenta que es pot deformar lentament.'],
          ['Nucli', 'És al centre de la Terra i està format sobretot per ferro. La part externa és líquida i la part interna és sòlida.'],
        ], 24),
        box('ampliacio', 'Com sabem què hi ha a dins?', 'En un model, una vibració tarda **6 segons** a travessar un material i **9 segons** a travessar-ne un altre a la mateixa distància. Viatja més de pressa pel primer. Quan els detectors registren canvis en la velocitat de les vibracions dels terratrèmols, els científics poden buscar on canvien els materials.')),
      section('moviment', 'Plaques en moviment',
        essencial('La capa rígida de fora de la Terra està dividida en grans peces, les **plaques tectòniques**. Les plaques es mouen molt a poc a poc.'),
        p('L’escorça i la part més superficial i rígida del mantell formen la **litosfera**. Les plaques es mouen uns quants centímetres cada any, aproximadament el que poden créixer les ungles en un any.'),
        p('La calor interna de la Terra contribueix a moviments molt lents al mantell. A la superfície, algunes plaques se separen, d’altres xoquen i d’altres llisquen de costat. Amb el pas de milions d’anys, aquests moviments desplacen els continents i poden aixecar serralades.'),
        p('Quan les roques es desplacen de cop al llarg d’una fractura, el terra pot tremolar. En moltes zones on es troben plaques també es forma **magma**, roca fosa que, quan surt a la superfície en una erupció, s’anomena **lava**.'),
        box('curiositat', 'Un moviment lent que s’acumula', 'Si dues plaques se separen **4 cm cada any**, en **100 anys** la distància augmenta **400 cm**, o sigui, **4 metres**. A un ritme semblant durant un milió d’anys, serien 40 km.'),
        box('observa', 'Del moviment al mapa', 'Un mapa de plaques i un mapa de terratrèmols ens permeten comprovar si les zones amb molts terratrèmols coincideixen amb els límits de les plaques.')),
      section('gravetat', 'La gravetat i el sentit d’avall',
        essencial('Si deixes anar una pilota, cau per la **gravetat**. A qualsevol lloc de la Terra, «avall» apunta cap al centre de la Terra.'),
        p('La gravetat també manté l’aire a prop de la Terra i contribueix a mantenir la Lluna en òrbita. Al paisatge es nota quan l’aigua corre pendent avall i quan les pedres cauen d’un vessant.'),
        p('La **massa** indica quanta matèria té un objecte. El **pes** és la força amb què la gravetat l’atrau. Una motxilla portada a la Lluna té la mateixa massa que a la Terra, però el seu pes és aproximadament una sisena part del pes que té a la Terra.'),
        box('prova', 'Dibuixa cap on cau', 'Imagina dues persones en punts oposats del globus, cadascuna amb una pilota. Dibuixa una fletxa des de cada pilota cap al centre. En el paper les fletxes tenen sentits oposats. Per a totes dues persones, la pilota cau cap avall.')),
      section('elements', 'Aigua, aire, roques i vida',
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
    title: 'Un lloc, dues coordenades',
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
      section('latitud', 'Latitud al nord i al sud',
        essencial('La **latitud** indica quants graus al nord o al sud de l’**equador** es troba un punt.'),
        p('Els **paral·lels** són línies imaginàries que fan la volta a la Terra d’est a oest. L’equador és el més llarg i divideix el planeta en els **hemisferis nord i sud**. Els altres paral·lels es fan més petits a mesura que ens acostem als pols.'),
        p('A l’equador, la latitud és de **0°**. Al pol nord és de **90° N** i al pol sud, de **90° S**. Tots els punts d’un mateix paral·lel tenen la mateixa latitud.'),
        box('curiositat', 'Un paral·lel, molts llocs', 'Dos vaixells són a **30° N**. Són al mateix paral·lel, però podrien ser molt lluny l’un de l’altre. Per situar cadascun amb precisió també ens cal la longitud.')),
      section('longitud', 'Longitud a l’est i a l’oest',
        essencial('La **longitud** indica quants graus a l’est o a l’oest del **meridià de Greenwich** es troba un punt.'),
        p('Els **meridians** són línies imaginàries que van del pol nord al pol sud. Són més separats a l’equador i es troben als pols. El meridià de Greenwich, que passa prop de Londres, marca **0°**.'),
        p('La longitud es mesura fins a **180°** cap a cada costat de Greenwich. Escrivim **E** per a l’est i **O** per a l’oest. En mapes en anglès, hi trobaràs **W** per a l’oest (*west*).'),
        table(['Coordenada', 'Línies que seguim', 'On és el 0°?', 'Direccions'], [
          ['Latitud', 'Paral·lels', 'Equador', 'Nord (N) i sud (S)'],
          ['Longitud', 'Meridians', 'Meridià de Greenwich', 'Est (E) i oest (O)'],
        ])),
      section('localitzacio', 'Trobar una posició a la graella',
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
    title: 'Del mapa al plànol',
    intro: 'Has d’anar a la biblioteca d’un altre municipi. Hi vas en autobús i, quan baixes, continues a peu. Et servirà el mateix mapa per als dos trams?',
    figures: [
      {
        id: 'reserva-definicions', section: 'definicions', name: 'Del mapa del municipi al plànol del barri',
        ratio: 2.4, position: 'center',
        alt: 'A l’esquerra, el mapa del municipi mostra la línia d’autobús i el requadre del barri. A la dreta, el plànol ampliat repeteix la parada i la biblioteca i hi dibuixa el tram a peu.',
        caption: 'El mapa situa el barri dins del municipi. El plànol mostra amb detall els carrers de la zona marcada al mapa.',
        variants: {
          pla: { src: 'illustracions/m003/municipi-i-barri.png', thumbnail: 'illustracions/m003/miniatures/municipi-i-barri.jpg' },
          atles: { src: 'illustracions/m003/municipi-i-barri-atles.png', thumbnail: 'illustracions/m003/miniatures/municipi-i-barri-atles.jpg' },
          aeria: { src: 'illustracions/m003/municipi-i-barri-aeria.png', thumbnail: 'illustracions/m003/miniatures/municipi-i-barri-aeria.jpg' },
        },
      },
      {
        id: 'barri', section: 'llegenda', name: 'Plànol del barri', ratio: 2.1, position: 'center',
        alt: 'Plànol zenital amb una fletxa del nord i una llegenda. L’escola i la biblioteca són a l’oest del riu, davant d’un parc a l’altra riba. Un pont enllaça les dues ribes i hi ha una parada prop de la biblioteca.',
        caption: 'Busca la fletxa del nord i compara els símbols del plànol amb els de la llegenda.',
        variants: {
          pla: { src: 'illustracions/m003/planol-barri.png', thumbnail: 'illustracions/m003/miniatures/planol-barri.jpg' },
          atles: { src: 'illustracions/m003/planol-barri-atles.png', thumbnail: 'illustracions/m003/miniatures/planol-barri-atles.jpg' },
          aeria: { src: 'illustracions/m003/planol-barri-aeria.png', thumbnail: 'illustracions/m003/miniatures/planol-barri-aeria.jpg' },
        },
      },
      {
        id: 'reserva-escala', section: 'escala', name: 'De l’escola a la biblioteca', ratio: 2.5, position: 'center',
        alt: 'Un traç discontinu uneix l’escola i la biblioteca en línia recta. El camí a peu fa tres trams, cap al nord, cap a l’est i cap al sud. La barra d’escala té dos trams iguals i indica 0, 50 i 100 m.',
        caption: 'El segment recte uneix l’escola i la biblioteca. L’altre traç segueix els carrers. Compara les dues distàncies amb la barra d’escala.',
        variants: {
          pla: { src: 'illustracions/m003/distancies-barri.png', thumbnail: 'illustracions/m003/miniatures/distancies-barri.jpg' },
          atles: { src: 'illustracions/m003/distancies-barri-atles.png', thumbnail: 'illustracions/m003/miniatures/distancies-barri-atles.jpg' },
          aeria: { src: 'illustracions/m003/distancies-barri-aeria.png', thumbnail: 'illustracions/m003/miniatures/distancies-barri-aeria.jpg' },
        },
      },
    ],
    sections: [
      section('definicions', 'El municipi i el barri des de dalt',
        essencial('Un **mapa** representa un territori en petit i sobre una superfície plana. Un **plànol** acostuma a mostrar amb més detall un espai més reduït.'),
        p('Un mapa del municipi pot mostrar carreteres i parades d’autobús. Quan baixes, el plànol et mostra els carrers i els edificis del barri vistos des de dalt. Així pots seguir el camí fins a la biblioteca.'),
        box('prova', 'Quin dibuix et convé?', 'Quin dibuix faries servir per trobar la parada d’autobús? Quin, per decidir en quin carrer has de girar?')),
      section('llegenda', 'La llegenda desxifra els símbols',
        essencial('La **llegenda** explica què signifiquen els símbols, les línies i els colors d’un mapa o un plànol.'),
        p('Al plànol del barri, **E** indica l’escola i **B**, la biblioteca. El parc es reconeix pel ratllat i el riu, per la banda amb vores ondulades. La fletxa amb una **N** ens indica cap on apunta el nord. En aquest plànol, el nord és a dalt.'),
        box('observa', 'Llegeix el plànol', 'Dels tres llocs, l’escola, la biblioteca i el parc, quin és a l’est del riu? Quin element del plànol et permet passar d’una riba a l’altra?'),
        p('Un color pot representar coses diferents. El verd pot indicar un parc aquí i poca altitud en un mapa físic. Els ratllats ajuden a llegir una còpia en blanc i negre.')),
      section('escala', 'De centímetres a metres amb l’escala',
        essencial('L’**escala** relaciona una distància del dibuix amb la distància real que representa.'),
        box('prova', 'De l’escola a la biblioteca', 'Quants metres representa el segment recte? Compara’l amb la barra. Fes el mateix amb els tres trams del camí a peu i suma’n les distàncies.'),
        table(['Tipus d’escala', 'Com es llegeix?'], [
          ['Gràfica', 'És una barra amb trams numerats. En el plànol del barri, el tram de 0 a 50 representa 50 m reals.'],
          ['Numèrica', 'A escala 1:5.000, 1 cm del plànol equival a 5.000 cm reals, és a dir, 50 m. Per tant, 2 cm representen 100 m.'],
        ], 26),
        p('Si el plànol i la barra canvien de mida alhora, la barra continua sent útil. Per saber on neix el riu, ens convindrà un mapa que mostri més territori.')),
    ],
  }, {
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i símbols sobre un fons clar.' },
      { id: 'atles', label: 'Atles escolar', description: 'Colors del sòl, carrers i parcel·les diferenciats.' },
      { id: 'aeria', label: 'Vista aèria il·lustrada', description: 'Teulades, capçades i ombres amb el barri vist des de dalt.' },
    ],
    status: 'definitiu',
    description: 'Distingeix un mapa d’un plànol i aprèn a llegir-ne la llegenda i l’escala per orientar-te i calcular distàncies.',
    curriculum: [{ row: 'medi:cartografia', section: 'escala', note: 'Interpreta la llegenda i compara distàncies en línia recta i per un itinerari amb l’escala gràfica.' }],
    sources: [
      ['ICGC · Escala cartogràfica', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Escala'],
      ['ICGC · Símbol cartogràfic', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Simbol-cartografic'],
    ],
  });

  addTopic('M004', {
    id: 'tipus-de-mapes',
    title: 'Un territori, molts mapes',
    intro: 'Imagina que prepares un viatge al Perú. Vols saber per on passen els Andes, quins països té al costat i en quines zones plou més. Quins mapes consultaries?',
    figures: [
      {
        id: 'quatre-mapes-peru', section: 'tipus', name: 'Quatre mapes del Perú', ratio: 13 / 8, position: 'center',
        alt: 'Quatre mapes del Perú mostren el relleu andí, els països veïns, les corbes de nivell al voltant de Cusco i la pluja mitjana de juliol.',
        caption: 'El mapa físic, el polític, el topogràfic i el temàtic responen preguntes diferents sobre un mateix territori.',
        variants: {
          pla: { src: 'illustracions/m004/quatre-mapes-peru-pla.png', thumbnail: 'illustracions/m004/miniatures/quatre-mapes-peru-pla.jpg' },
          atles: { src: 'illustracions/m004/quatre-mapes-peru-atles.png', thumbnail: 'illustracions/m004/miniatures/quatre-mapes-peru-atles.jpg' },
        },
      },
      {
        id: 'corbes-de-nivell', section: 'tipus', name: 'Corbes juntes i corbes separades', ratio: 26 / 17,
        src: 'illustracions/m004/corbes-de-nivell.png',
        alt: 'Vista superior i perfil d’un turó esquemàtic. Les corbes de nivell són més juntes al vessant A que al B.',
        caption: 'Cada corba marca una altitud. Compara l’espai entre corbes als vessants A i B. El perfil és esquemàtic i té l’escala vertical exagerada.',
      },
      {
        id: 'atles-andes-d4', section: 'atles', name: 'Del nom a la casella D4', ratio: 52 / 23, position: 'center', anchor: 'after',
        src: 'illustracions/m004/atles-andes-d4.png',
        alt: 'Una entrada de l’índex amb el nom Andes, pàgina 12, casella D4, i un mapa quadriculat d’Amèrica del Sud.',
        caption: 'En aquest atles d’exemple, l’índex t’envia a la pàgina 12 i t’indica la casella on comença la cerca.',
      },
      {
        id: 'llegendes-trac-puntejat', section: 'lectura', name: 'La mateixa línia, dos significats', ratio: 52 / 21, position: 'center', anchor: 'after',
        src: 'illustracions/m004/llegendes-trac-puntejat.png',
        alt: 'Dos mapes esquemàtics fan servir la mateixa línia de punts. Una llegenda la identifica com un camí i l’altra, com una frontera.',
        caption: 'La mateixa línia de punts pot tenir significats diferents. Què indica en cada exemple?',
      },
      {
        id: 'planisferi-fisic', name: 'Planisferi físic', section: 'fisic', anchor: 'after', ratio: 2, position: 'center',
        alt: 'Planisferi amb continents, oceans i colors d’altitud. Una línia guia assenyala els Andes a l’oest d’Amèrica del Sud.',
        caption: 'Busca els Andes a l’oest d’Amèrica del Sud i consulta la llegenda per interpretar els colors del relleu.',
        variants: {
          pla: { src: 'illustracions/m004/planisferi-fisic-pla.png', thumbnail: 'illustracions/m004/miniatures/planisferi-fisic-pla.jpg' },
          atles: { src: 'illustracions/m004/planisferi-fisic-atles.png', thumbnail: 'illustracions/m004/miniatures/planisferi-fisic-atles.jpg' },
        },
      },
      {
        id: 'canon-colca', section: 'fisic', name: 'El canó del Colca', ratio: 2200 / 1463,
        src: 'illustracions/m004/canon-colca.jpg',
        alt: 'Cim nevat entre núvols i vessants rocosos costeruts al canó del Colca.',
        caption: 'Vessants del canó del Colca, als Andes del Perú. Fixa’t en el pendent i en les canals que baixen per la muntanya.',
        credit: 'world-wide-gifts.com · Wikimedia Commons · CC BY-SA 2.0',
      },
      {
        id: 'comparativa-projeccions', section: 'fisic', name: 'Mercator i Equal Earth', ratio: 26 / 15,
        src: 'illustracions/m004/comparativa-projeccions.png', visible: false, anchor: 'after', width: 100, position: 'center', wrap: false,
        alt: 'Mercator i Equal Earth mostren Groenlàndia i Amèrica del Sud amb proporcions diferents. Groenlàndia sembla relativament més gran en Mercator.',
        caption: 'Compara la mida aparent de Groenlàndia i Amèrica del Sud en les dues projeccions.',
      },
      {
        id: 'planisferi-politic', name: 'Planisferi polític', section: 'politic', anchor: 'lead', ratio: 2, position: 'center',
        alt: 'Planisferi amb països, fronteres i capitals. El Perú, Xile i l’Argentina estan retolats a l’oest i al sud d’Amèrica del Sud.',
        caption: 'Localitza el Perú i Xile i compara aquesta zona amb la del planisferi físic.',
        variants: {
          pla: { src: 'illustracions/m004/planisferi-politic-pla.png', thumbnail: 'illustracions/m004/miniatures/planisferi-politic-pla.jpg' },
          atles: { src: 'illustracions/m004/planisferi-politic-atles.png', thumbnail: 'illustracions/m004/miniatures/planisferi-politic-atles.jpg' },
        },
      },
    ],
    sections: [
      section('tipus', 'Un mapa per a cada pregunta',
        essencial('Cada tipus de mapa destaca una informació diferent. La pregunta que et fas t’ajuda a triar el mapa.'),
        { ...table(['Tipus de mapa', 'Què destaca?'], [
          ['Físic', 'Muntanyes, planes, rius i altres elements naturals.'],
          ['Polític', 'Països, fronteres, capitals i altres ciutats.'],
          ['Topogràfic', 'El relleu amb detall, els camins i altres elements del terreny.'],
          ['Temàtic', 'Un tema concret, com la pluja, la població o el transport.'],
        ]), core: true },
        p('En un mapa **topogràfic**, les **corbes de nivell** uneixen punts que són a la mateixa altitud. En un mateix mapa, quan les corbes són molt juntes, el pendent és més fort. Et poden ajudar a preparar una caminada.'),
        box('prova', 'Quin mapa consultaries?', 'Tria un mapa per situar els Andes i un altre per descobrir quins països tenen frontera amb el Perú. Quin et serviria per saber en quines zones sol ploure més?')),
      section('atles', 'Trobar un lloc a l’atles',
        essencial('Un **atles** és un conjunt de mapes organitzats. Pot ser un llibre o un recurs digital.'),
        p('El **sumari** et permet trobar un mapa per territori o per tema, com ara un mapa físic d’Amèrica del Sud. L’**índex de noms** et permet buscar un lloc concret, per exemple la serralada dels Andes.'),
        p('Imagina que al costat del nom «Andes» hi diu **pàgina 12, D4**. Obre la pàgina 12 i busca la casella D4, on es troben la columna D i la fila 4. En un mapa amb graella, aquesta referència et diu en quina part del dibuix pots trobar el nom.')),
      section('lectura', 'Pistes per llegir un mapa',
        essencial('El **títol** et diu què mostra el mapa. La **llegenda** t’explica què volen dir els símbols i els colors.'),
        list('Llegeix el **títol** i comprova que el mapa cobreix la zona que busques. Un mapa centrat en el Perú acostuma a mostrar més detalls del país que un planisferi.',
          'Orienta’t amb la **fletxa del nord** o la rosa dels vents, si n’hi ha. Així podràs saber què queda a l’oest o a l’est.',
          'Consulta la **llegenda** abans d’interpretar un color o una línia. Una línia de punts, per exemple, pot marcar un camí o una frontera segons el mapa.',
          'Busca la **graella** per localitzar un lloc o l’**escala** per estimar una distància, segons què necessitis.',
          'Comprova la **font** i la **data**. Si vols saber quant ha plogut, mira també de quin període són les dades.')),
      section('fisic', 'Relleu i aigües al planisferi',
        essencial('Un **planisferi** és un mapa de tot el món. El **planisferi físic** destaca el relleu i les aigües.'),
        p('Hi pots localitzar continents, oceans, serralades, planes i grans rius. Els Andes són una serralada llarga que recorre l’oest d’Amèrica del Sud.'),
        p('En alguns mapes físics, cada color correspon a un **interval d’altitud**, és a dir, a un tram d’altures sobre el nivell del mar. Si un color indica de **2.000 a menys de 4.000 metres**, pot representar tant un lloc a 2.400 m com un de 3.700 m. La llegenda t’ajuda a interpretar-lo.')),
      section('politic', 'Països i fronteres al planisferi',
        essencial('El **planisferi polític** mostra els països i les fronteres. També hi podem trobar capitals i altres ciutats.'),
        p('Sovint es fan servir colors diferents per separar països veïns. La llegenda pot indicar quin símbol correspon a una capital. Per exemple, en un mapa que distingeixi les capitals, podràs identificar-hi Lima, la capital del Perú.'),
        box('observa', 'Els Andes en dos mapes', 'Amb els dos planisferis de la fitxa o d’un atles, segueix els Andes al mapa físic. Després busca la mateixa zona al mapa polític i localitza el Perú i Xile, dos països per on passa la serralada. Quina informació has tret de cada mapa?')),
    ],
  }, {
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Masses de color planes i línies nítides.' },
      { id: 'atles', label: 'Atles amb textura', description: 'Ombrejat suau del relleu i tintes més clares.' },
    ],
    description: 'Tria el mapa que et convé, consulta un atles i compara què mostren els planisferis físics i polítics.',
    curriculum: [{ row: 'medi:cartografia', section: 'lectura', note: 'Tria el mapa segons la pregunta, interpreta la llegenda i compara el relleu amb les fronteres.' }],
    resources: worldMaps,
    sources: [
      ['Natural Earth · Costes, països i límits', 'https://www.naturalearthdata.com/about/disputed-boundaries-policy/'],
      ['NOAA NCEI · Relleu ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['NOAA CoastWatch · Pluja mensual CHIRPS 2.0', 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/chirps20GlobalMonthlyP05.html'],
      ['Wikimedia Commons · Canó del Colca, CC BY-SA 2.0', 'https://commons.wikimedia.org/wiki/File:Colca_Canyon.jpg'],
      ['ICGC · Atles', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Atles'],
      ['ICGC · Planisferi', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Planisferi'],
      ['USGS · Com es fan servir les projeccions cartogràfiques', 'https://www.usgs.gov/faqs/how-are-different-map-projections-used'],
      ['ICGC · Cartografia topogràfica', 'https://www.icgc.cat/ca/Geoinformacio-i-mapes/Dades-i-productes/Geoinformacio-cartografica/Cartografia-topografica-11000'],
    ],
  });

  addTopic('M005', {
    id: 'sistema-solar',
    title: 'El nostre lloc al sistema solar',
    intro: 'Quan diem on vivim, podem començar pel carrer i anar ampliant el mapa. Més enllà del nostre planeta, també tenim una adreça: la Terra és al sistema solar, i el sistema solar és a la Via Làctia.',
    figures: [
      { id: 'via-lactia', section: 'galaxia', name: 'El sistema solar a la Via Làctia', ratio: 2.4, caption: 'El punt assenyala la zona de la Via Làctia on hi ha el sistema solar.' },
      { id: 'orbites-solars', section: 'sistema', name: 'Òrbites al voltant del Sol', ratio: 2.4, caption: 'Representació de les òrbites. Les mides i les distàncies s’han simplificat.' },
      { id: 'vuit-planetes', section: 'planetes', name: 'Els vuit planetes en ordre', ratio: 3.1, caption: 'L’ordre va de Mercuri a Neptú. La separació del dibuix no representa la distància real.' },
      { id: 'terra-lluna', section: 'terra-lluna', name: 'La Terra, la Lluna i la llum del Sol', ratio: 2.4, caption: 'Podem veure una part diferent de la meitat il·luminada de la Lluna segons la seva posició.' },
      { id: 'cossos-menors', section: 'altres-cossos', name: 'Un asteroide, un cometa i un planeta nan', ratio: 2.7, caption: 'Tres cossos del sistema solar representats per comparar els seus trets.' },
    ],
    sections: [
      section('galaxia', 'La Via Làctia, la nostra galàxia',
        essencial('Una **galàxia** és un gran conjunt d’estrelles, gas i pols. La **Via Làctia** és la galàxia on hi ha el Sol.'),
        p('La Via Làctia té forma de disc amb braços en espiral. El Sol és una de les seves estrelles i és en una zona allunyada del centre. Les estrelles que veiem escampades pel cel de nit són, en la gran majoria, estrelles de la nostra galàxia.'),
        box('prova', 'L’adreça de la Terra', 'Ordena de més petit a més gran: **Via Làctia**, **Terra** i **sistema solar**. Explica amb una frase què conté què.')),
      section('sistema', 'El Sol i els cossos que l’orbiten',
        essencial('El **sistema solar** està format pel Sol i els cossos que l’orbiten. El **Sol** és una estrella i emet llum pròpia.'),
        p('Una **òrbita** és el camí que segueix un cos al voltant d’un altre. La gravetat del Sol manté els planetes en òrbita. Els planetes reflecteixen la llum solar i, per això, alguns es poden veure al cel des de la Terra.'),
        p('En un dibuix podem exagerar la mida dels planetes per veure’ls bé. Abans de comparar mides o distàncies, comprova si el dibuix està fet a escala.')),
      section('planetes', 'Vuit planetes al voltant del Sol',
        essencial('De més a prop a més lluny del Sol, els planetes són **Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà i Neptú**.'),
        table(['Grup', 'Planetes', 'Com són?'], [
          ['Rocosos', 'Mercuri, Venus, Terra i Mart.', 'Més petits i amb una superfície sòlida.'],
          ['Gegants gasosos', 'Júpiter i Saturn.', 'Formats sobretot per hidrogen i heli.'],
          ['Gegants gelats', 'Urà i Neptú.', 'A més dels gasos, tenen una gran proporció de materials com l’aigua, el metà i l’amoníac al seu interior.'],
        ]),
        box('observa', 'A banda i banda de la Terra', 'Quin planeta té l’òrbita immediatament més a prop del Sol que la Terra? Quin la té immediatament més lluny? A quin grup pertanyen tots dos?')),
      section('terra-lluna', 'La Terra i la Lluna en moviment',
        essencial('La **Terra** gira sobre si mateixa i fa una volta al Sol en un any. La **Lluna** és el satèl·lit natural de la Terra i gira al seu voltant.'),
        p('Anomenem **rotació** el gir sobre un mateix eix. La Terra tarda unes 24 hores a fer-lo. Quan la nostra part de la Terra mira cap al Sol, és de dia. Unes hores després, la rotació ens porta a la part que queda a l’ombra.'),
        p('El Sol il·lumina una meitat de la Lluna. A mesura que la Lluna es mou en la seva òrbita, des de la Terra veiem una part més gran o més petita d’aquesta meitat. Això dona lloc a les **fases**. De lluna nova a lluna nova passen uns 29 dies i mig.')),
      section('altres-cossos', 'Asteroides, cometes i planetes nans',
        essencial('A més dels planetes i els satèl·lits, al sistema solar hi ha **asteroides**, **cometes** i **planetes nans**.'),
        table(['Cos', 'Una pista per reconèixer-lo'], [
          ['Asteroide', 'Sol ser rocós o metàl·lic. N’hi ha molts entre les òrbites de Mart i Júpiter.'],
          ['Cometa', 'Conté gels, pols i roca. Quan s’acosta al Sol, pot formar una cua de gas i pols.'],
          ['Planeta nan', 'Té una forma gairebé esfèrica i orbita el Sol. Comparteix la seva regió orbital amb altres cossos i no hi predomina com hi predomina un planeta. Plutó i Ceres en són exemples.'],
        ]),
        box('prova', 'Segueix la pista', 'Un cos que orbita el Sol desenvolupa una cua quan s’hi acosta. A quin grup el situaries? Quina pista t’ha fet decidir?')),
    ],
  }, {
    theme: 'Astronomia',
    description: 'Situa el sistema solar a la Via Làctia, compara els vuit planetes i explica la relació entre el Sol, la Terra i la Lluna.',
    curriculum: [{ row: 'medi:terra', section: 'terra-lluna', note: 'Situa la Terra al sistema solar i relaciona els moviments de la Terra i la Lluna amb el dia i la nit i les fases lunars.' }],
    sources: [
      ['NASA · El sistema solar', 'https://science.nasa.gov/solar-system/solar-system-facts/'],
      ['NASA · Els planetes', 'https://science.nasa.gov/solar-system/planets/'],
      ['NASA · Les fases de la Lluna', 'https://science.nasa.gov/moon/moon-phases/'],
    ],
  });

  addTopic('M006', {
    id: 'planisferi-fisic',
    title: 'Llegim el relleu del món',
    intro: 'Des del cel, una plana i una muntanya poden semblar del mateix color. En un planisferi físic podem fer servir els colors per representar l’altitud. Aprendrem a llegir aquest codi i a comparar llocs llunyans.',
    figures: [
      { id: 'altituds-del-mon', section: 'punts-altitud', anchor: 'lead', name: 'Planisferi d’altituds', ratio: 2, position: 'center',
        src: 'illustracions/m006/altituds-del-mon.png',
        alt: 'Mapa mundial amb quatre franges d’altitud a la llegenda i cinc punts marcats de la A a la E.',
        caption: 'Compara el color de sota cada punt amb la llegenda. Els intervals s’expressen en metres enters.',
        credit: 'Relleu de NOAA ETOPO1 i costes de Natural Earth. Elaboració pròpia.' },
      { id: 'reserva-relleu', section: 'relleu', name: 'Plana, altiplà i serralada', ratio: 2.6, visible: false },
      { id: 'reserva-colors-altitud', section: 'colors-altitud', name: 'Del perfil als colors d’altitud', ratio: 2.6, visible: false },
    ],
    sections: [
      section('relleu', 'Les formes del paisatge al mapa',
        essencial('Un **planisferi físic** representa el relleu i les aigües del món. Hi podem situar oceans, serralades i extenses zones planes.'),
        p('Una **plana** té poc desnivell. Un **altiplà** també és força pla, però es troba a una altitud elevada en relació amb l’entorn. Una **serralada** és un conjunt de muntanyes enllaçades. Al planisferi podem seguir les grans formes del relleu, però per estudiar un cim concret ens cal un mapa amb més detall.')),
      section('colors-altitud', 'Els colors indiquen intervals',
        essencial('L’**altitud** és l’altura d’un lloc respecte del nivell del mar. Cada color de la llegenda representa un **interval**, és a dir, un conjunt d’altituds.'),
        p('En aquest mapa, a mesura que pugem, passem dels verds als ocres i al marró fosc. En un altre mapa els colors poden canviar. Un punt que es troba a **2.000 m** entra al tram que comença a 2.000 m.'),
        box('observa', 'Altitud i pendent', 'Un altiplà pot ser molt alt i tenir poc pendent. Busca al mapa una zona extensa d’un color d’altitud alta. Què pots dir de l’altitud? Quina informació et faria falta per comprovar-ne el pendent?')),
      section('punts-altitud', 'Cinc punts per comparar',
        essencial('Per llegir un punt, busca el color del terreny al lloc marcat i comprova quin interval li correspon a la **llegenda**.'),
        list('Localitza **A**, a l’Amazònia, i **B**, al sud d’Àfrica. Anota l’interval d’altitud de cadascun.',
          'Busca **C**, a l’altiplà del Tibet, i **D**, a Groenlàndia. Quin punt correspon al tram més alt? Escriu com ho has sabut.',
          'Troba **E**, a l’interior d’Austràlia. Amb quin altre punt comparteix interval? Podem saber quin dels dos és més alt mirant només aquest mapa?')),
    ],
    solution: {
      intro: 'Respostes de referència per comentar la lectura dels intervals i els límits del planisferi.',
      sections: [
        section('colors-altitud', 'Com interpretem els colors?',
          p('Una zona d’un color d’altitud alta és dins del tram que indica la llegenda. Pot tenir pendent o ser força plana. Per comprovar-ho, convindria un mapa topogràfic més detallat, amb corbes de nivell.'),
          p('A Ampliació, 1.999 m cau al segon tram i 2.000 m al tercer. Dos colors diferents poden correspondre a altituds molt properes.')),
        section('punts-altitud', 'Cinc punts per comparar',
          list('A és al tram de menys de **500 m** i B va de **500 a menys de 2.000 m**.',
            'C és al tram de **4.000 m o més**. D va de **2.000 a menys de 4.000 m**. Per tant, C es troba en un interval més alt.',
            'E comparteix el tram de menys de **500 m** amb A. El color no permet ordenar-los dins del mateix interval.'),
          p('A Ampliació, per saber l’altitud sota el gel cal un model que representi la superfície del terreny coberta pel gel.')),
      ],
    },
  }, {
    description: 'Practica amb un planisferi acolorit per intervals d’altitud. Interpreta la llegenda i compara cinc punts del planeta.',
    curriculum: [{ row: 'medi:cartografia', section: 'punts-altitud', note: 'Interpreta els colors d’un planisferi físic i compara intervals d’altitud.' }],
    resources: worldMaps,
    sources: [
      ['ICGC · Planisferi', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Planisferi'],
      ['NOAA · Malla d’elevació ETOPO1', 'https://cwcgom.aoml.noaa.gov/erddap/griddap/etopo180.html'],
      ['Natural Earth · Costes de referència', 'https://www.naturalearthdata.com/downloads/110m-physical-vectors/'],
    ],
  });

  addTopic('M007', {
    id: 'planisferi-politic',
    title: 'Fronteres i colors al mapa',
    intro: 'Com podem distingir d’un cop d’ull dos països veïns? El planisferi polític fa visibles les fronteres, i els colors ens ajuden a seguir-les. Ho provarem amb un retall de mapa real i dos mapes per acolorir.',
    figures: [
      { id: 'planisferi-fronteres', section: 'fronteres', anchor: 'lead', name: 'Planisferi polític', ratio: 2, position: 'center',
        src: 'illustracions/m007/planisferi-fronteres.png',
        alt: 'Mapamundi amb països acolorits i fronteres. Un requadre al sud-oest d’Europa assenyala el detall de la península Ibèrica.',
        caption: 'Observa el requadre que situa la península Ibèrica i l’entorn. El detall ampliat apareix a l’apartat següent.',
        credit: 'Natural Earth 1:110.000.000. Elaboració pròpia.' },
      { id: 'fronteres-peninsula', section: 'veinat', anchor: 'lead', name: 'Fronteres a la península Ibèrica', ratio: 2.05, position: 'center',
        src: 'illustracions/m007/fronteres-peninsula.png',
        alt: 'Mapa retallat amb Portugal, Espanya i França, i les fronteres terrestres entre aquests països.',
        caption: 'Detall regional d’un mapa polític. El traç fosc a terra indica una frontera.',
        credit: 'Natural Earth 1:50.000.000, via World Atlas. Elaboració pròpia.' },
      { id: 'mapes-muts-quatre-colors', section: 'acoloreix', anchor: 'lead', name: 'Dos mapes muts per acolorir', ratio: 2.35, position: 'center',
        src: 'illustracions/m007/mapes-muts-quatre-colors.png',
        alt: 'Dos mapes imaginaris amb regions etiquetades. El primer té tres regions veïnes entre si. Al segon s’hi afegeix una regió central que toca les altres tres.',
        caption: 'Acoloreix només les regions amb lletres. També pots fer servir ratllats o escriure números dins de les regions.',
        credit: 'Elaboració pròpia.' },
    ],
    sections: [
      section('fronteres', 'Què ens diu una frontera?',
        essencial('Un **mapa polític** ens ajuda a localitzar països i a reconèixer els límits entre territoris. Una **frontera** separa dos territoris.'),
        p('Algunes fronteres segueixen un riu o una carena. D’altres travessen camps, boscos o pobles. Els colors distingeixen països i la llegenda ens ajuda a interpretar els traços. En un planisferi, alguns detalls són massa petits i podem consultar un mapa regional. Busca el requadre de la península Ibèrica al planisferi i localitza la mateixa zona al detall de l’apartat següent.')),
      section('veinat', 'Quines regions han de tenir colors diferents?',
        essencial('Dues regions són **veïnes** en aquest joc si comparteixen un tros de frontera. Si només es toquen en una punta, poden portar el mateix color.'),
        box('observa', 'Tres països a la vista', 'Al retall, segueix la frontera entre **Portugal i Espanya** i la d’**Espanya i França**. Portugal i França comparteixen cap tram de frontera? Què observes al dibuix?'),
        p('Acolorim cada regió sencera amb un color. Podem repetir un color en una altra regió si entre totes dues no hi ha cap tram de frontera compartit. El color només ens ajuda a seguir els límits.'),
        box('curiositat', 'El teorema dels quatre colors', 'En un mapa pla finit com els del joc, amb regions d’una sola peça, **quatre colors sempre són suficients** per distingir les regions veïnes. En alguns mapes en sobren i en d’altres els necessitem tots quatre.')),
      section('acoloreix', 'Tres colors o quatre?',
        essencial('Comença amb **tres colors**. Repeteix un color només quan les dues regions no comparteixin un tros de frontera.'),
        list('Acoloreix el **mapa 1** amb tres colors. Repassa les fronteres amb el dit i comprova que a banda i banda hi hagi colors diferents.',
          'Al **mapa 2**, posa un color a cadascuna de les regions de fora. Amb quines regions comparteix frontera la regió **D** del mig?',
          'Prova de trobar un color per a D amb els tres que tens. Si no n’hi ha cap de lliure, agafa un quart color. Explica per què el necessites.')),
    ],
    solution: {
      intro: 'Les lletres A, B, C i D indiquen les regions del mapa mut. Qualsevol canvi en l’ordre dels colors que conservi la regla de les fronteres és vàlid.',
      sections: [
        section('veinat', 'Tres països a la vista',
          p('Espanya comparteix frontera amb Portugal i França. Portugal i França no comparteixen cap tram de frontera.')),
        section('acoloreix', 'Tres colors o quatre?',
          p('Al mapa 1, A, B i C són veïnes entre si. Cal donar-los tres colors diferents. Al mapa 2, les tres regions de fora continuen sent veïnes entre si i **D** les toca totes tres amb un tram de frontera. Qualsevol dels tres colors ja es troba al costat de D, així que en cal un quart.'),
          p('A Ampliació, totes sis parelles de regions del mapa 2 comparteixen frontera. Si unim A i D, queden tres regions veïnes entre si. N’hi ha prou amb tres colors i cal fer-los servir tots tres.')),
      ],
    },
  }, {
    description: 'Segueix fronteres en un mapa real i descobreix per què alguns mapes es poden acolorir amb tres colors i d’altres en necessiten quatre.',
    curriculum: [{ row: 'medi:cartografia', section: 'fronteres', note: 'Identifica la funció de les fronteres i compara països veïns en una representació política del territori.' }],
    resources: worldMaps,
    sources: [
      ['Natural Earth · Capes administratives', 'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/'],
      ['Wolfram MathWorld · Teorema dels quatre colors', 'https://mathworld.wolfram.com/Four-ColorTheorem.html'],
    ],
  });
}
