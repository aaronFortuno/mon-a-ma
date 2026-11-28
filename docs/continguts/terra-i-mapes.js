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
        ], 26),
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
        ], 30),
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
        ], 22)),
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
        ], 29),
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
      {
        id: 'via-lactia', section: 'galaxia', name: 'El sistema solar a la Via Làctia', ratio: 2.4, position: 'center',
        alt: 'Reconstrucció en espiral de la Via Làctia, amb una barra central i un punt al braç d’Orió. Una ampliació identifica el Sol i la Terra.',
        caption: 'Reconstrucció de la Via Làctia vista des de dalt. El marcador situa la regió on hi ha el sistema solar.',
        variants: {
          pla: { src: 'illustracions/m005/via-lactia-pla.png', thumbnail: 'illustracions/m005/miniatures/via-lactia-pla.jpg' },
          atles: {
            src: 'illustracions/m005/via-lactia-atles.png', thumbnail: 'illustracions/m005/miniatures/via-lactia-atles.jpg',
            credit: 'Reconstrucció NASA/JPL-Caltech/R. Hurt (SSC/Caltech). Detall: NASA/GSFC/SDO i Apollo 17.',
          },
        },
      },
      {
        id: 'via-lactia-cel', section: 'galaxia', name: 'La Via Làctia des de la Terra', ratio: 14 / 9,
        src: 'illustracions/m005/via-lactia-cel.jpg',
        alt: 'Una banda d’estrelles s’alça sobre l’horitzó fosc de Bryce Canyon i el mirador de Sunrise Point.',
        caption: 'Des de la Terra veiem part del disc de la Via Làctia com una banda de llum al cel.',
        credit: 'NPS Photo / Keith Moore',
      },
      {
        id: 'orbites-solars', section: 'sistema', name: 'Òrbites al voltant del Sol', ratio: 2.4, position: 'center',
        alt: 'Dos esquemes al voltant del Sol. El primer amplia les òrbites de Mercuri, Venus, la Terra i Mart. El segon situa la zona interior dins de les òrbites de Júpiter, Saturn, Urà i Neptú.',
        caption: 'El requadre A correspon a la zona ampliada dels planetes rocosos. Les òrbites són aproximades, les posicions són exemples i les mides dels astres s’han ampliat.',
        variants: {
          pla: { src: 'illustracions/m005/orbites-solars-pla.png', thumbnail: 'illustracions/m005/miniatures/orbites-solars-pla.jpg' },
          atles: {
            src: 'illustracions/m005/orbites-solars-atles.png', thumbnail: 'illustracions/m005/miniatures/orbites-solars-atles.jpg',
            credit: 'Disc solar en fals color: NASA/GSFC/Solar Dynamics Observatory. Retrats planetaris: vegeu els crèdits de la fitxa.',
          },
        },
      },
      {
        id: 'vuit-planetes', section: 'planetes', name: 'Els vuit planetes en ordre', ratio: 3.1, position: 'center',
        alt: 'Mercuri, Venus, Terra, Mart, Júpiter, Saturn, Urà i Neptú en ordre, agrupats en quatre rocosos, dos gegants gasosos i dos gegants gelats.',
        caption: 'Els vuit planetes en ordre de distància al Sol. Les mides dels retrats i la separació entre planetes no són a escala.',
        variants: {
          pla: { src: 'illustracions/m005/vuit-planetes-pla.png', thumbnail: 'illustracions/m005/miniatures/vuit-planetes-pla.jpg' },
          atles: {
            src: 'illustracions/m005/vuit-planetes-atles.png', thumbnail: 'illustracions/m005/miniatures/vuit-planetes-atles.jpg',
            credit: 'Retrats de missions de la NASA. Urà i Neptú: Patrick Irwin/University of Oxford/NASA (CC BY 4.0).',
          },
        },
      },
      {
        id: 'terra-lluna', section: 'terra-lluna', name: 'La Terra, la Lluna i la llum del Sol', ratio: 2.4, position: 'center',
        alt: 'Quatre posicions de la Lluna al voltant de la Terra, totes il·luminades des del mateix costat. Quatre vinyetes numerades mostren com es veu cada fase des de la Terra.',
        caption: 'Veiem una part diferent de la meitat il·luminada de la Lluna al llarg de l’òrbita. Dibuix simplificat, sense escala. La inclinació de l’òrbita fa que habitualment no hi hagi eclipsi en lluna nova ni en lluna plena.',
        variants: {
          pla: { src: 'illustracions/m005/terra-lluna-pla.png', thumbnail: 'illustracions/m005/miniatures/terra-lluna-pla.jpg' },
          atles: {
            src: 'illustracions/m005/terra-lluna-atles.png', thumbnail: 'illustracions/m005/miniatures/terra-lluna-atles.jpg',
            credit: 'Vinyetes esquemàtiques amb mosaic de la Lluna: NASA’s Scientific Visualization Studio. Terra: NASA/Apollo 17.',
          },
        },
      },
      {
        id: 'sortida-terra', section: 'terra-lluna', name: 'Sortida de la Terra', ratio: 14 / 9,
        src: 'illustracions/m005/sortida-terra.jpg',
        alt: 'La Terra blava emergeix per sobre de l’horitzó rocós de la Lluna.',
        caption: 'La Terra apareix sobre l’horitzó de la Lluna en una fotografia feta des de l’Apollo 8 el 1968.',
        credit: 'NASA · Apollo 8 · William Anders',
      },
      {
        id: 'cossos-menors', section: 'altres-cossos', name: 'Un asteroide, un cometa i un planeta nan', ratio: 2.7, position: 'center',
        alt: 'Tres panells mostren l’asteroide irregular Bennu, el cometa NEOWISE amb una cua visible i el planeta nan Plutó de forma arrodonida.',
        caption: 'Bennu, NEOWISE i Plutó mostren tres tipus de cossos del sistema solar. Les imatges es mostren a escales diferents.',
        variants: {
          pla: { src: 'illustracions/m005/cossos-menors-pla.png', thumbnail: 'illustracions/m005/miniatures/cossos-menors-pla.jpg' },
          atles: {
            src: 'illustracions/m005/cossos-menors-atles.png', thumbnail: 'illustracions/m005/miniatures/cossos-menors-atles.jpg',
            credit: 'Bennu: NASA/Goddard/University of Arizona. NEOWISE: NASA/JSC, Expedició 63. Plutó: NASA/JHUAPL/SwRI.',
          },
        },
      },
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
        ], 28),
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
        ], 26),
        box('prova', 'Segueix la pista', 'Un cos que orbita el Sol desenvolupa una cua quan s’hi acosta. A quin grup el situaries? Quina pista t’ha fet decidir?')),
    ],
  }, {
    status: 'definitiu',
    theme: 'Astronomia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i retolació sobre blanc.' },
      { id: 'atles', label: 'Atles espacial', description: 'Observacions i reconstruccions en panells foscos.' },
    ],
    description: 'Situa el sistema solar a la Via Làctia, compara els vuit planetes i explica la relació entre el Sol, la Terra i la Lluna.',
    curriculum: [{ row: 'medi:terra', section: 'terra-lluna', note: 'Situa la Terra al sistema solar i relaciona els moviments de la Terra i la Lluna amb el dia i la nit i les fases lunars.' }],
    sources: [
      ['Crèdits i fonts de les il·lustracions', 'illustracions/m005/credits.txt'],
      ['JPL · Elements orbitals dels planetes', 'https://ssd.jpl.nasa.gov/planets/approx_pos.html'],
      ['NASA · El sistema solar', 'https://science.nasa.gov/solar-system/solar-system-facts/'],
      ['NASA · Els planetes', 'https://science.nasa.gov/solar-system/planets/'],
      ['NASA · Les fases de la Lluna', 'https://science.nasa.gov/moon/moon-phases/'],
    ],
  });

  addTopic('M006', {
    id: 'planisferi-fisic',
    title: 'Llegim el relleu del món',
    intro: 'Des del cel, una plana i una muntanya poden semblar del mateix color. En un planisferi físic podem fer servir els colors per representar l’altitud. Aprendrem a llegir aquest codi i a comparar llocs llunyans.',
    coverFigure: 'altituds-del-mon',
    figures: [
      {
        id: 'altituds-del-mon', section: 'punts-altitud', name: 'Planisferi d’altituds', ratio: 2280 / 1300,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa mundial amb quatre franges d’altitud a la llegenda i cinc punts de la A a la E.',
        caption: 'Compara el color de sota cada punt amb la llegenda. Els intervals s’expressen en metres enters.',
        credit: 'NOAA/NCEI ETOPO 2022, versió de superfície. Natural Earth, domini públic.',
        variants: {
          pla: { src: 'illustracions/m006/altituds-del-mon-pla.png', thumbnail: 'illustracions/m006/miniatures/altituds-del-mon-pla.jpg' },
          atles: { src: 'illustracions/m006/altituds-del-mon-atles.png', thumbnail: 'illustracions/m006/miniatures/altituds-del-mon-atles.jpg' },
        },
      },
      {
        id: 'reserva-relleu', section: 'relleu', name: 'Plana, altiplà i serralada', ratio: 2280 / 1030,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres talls mostren una plana baixa gairebé horitzontal, un altiplà amb superfície plana elevada i una serralada amb cims i valls.',
        caption: 'Esquemes de tres formes de relleu. La línia discontínua representa el mateix nivell de referència en tots tres dibuixos.',
        variants: {
          pla: { src: 'illustracions/m006/formes-del-relleu-pla.png', thumbnail: 'illustracions/m006/miniatures/formes-del-relleu-pla.jpg' },
          atles: { src: 'illustracions/m006/formes-del-relleu-atles.png', thumbnail: 'illustracions/m006/miniatures/formes-del-relleu-atles.jpg' },
        },
      },
      {
        id: 'reserva-colors-altitud', section: 'colors-altitud', name: 'Del perfil als colors d’altitud', ratio: 2280 / 1240,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tall lateral amb una escala de 0 a 5.000 metres. Línies i colors separen els intervals als 500, 2.000 i 4.000 metres.',
        caption: 'Perfil inventat amb els mateixos intervals de la llegenda del planisferi. Els canvis de color coincideixen amb els llindars d’altitud.',
        variants: {
          pla: { src: 'illustracions/m006/perfil-i-colors-d-altitud-pla.png', thumbnail: 'illustracions/m006/miniatures/perfil-i-colors-d-altitud-pla.jpg' },
          atles: { src: 'illustracions/m006/perfil-i-colors-d-altitud-atles.png', thumbnail: 'illustracions/m006/miniatures/perfil-i-colors-d-altitud-atles.jpg' },
        },
      },
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
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Practica amb un planisferi acolorit per intervals d’altitud. Interpreta la llegenda i compara cinc punts del planeta.',
    curriculum: [{ row: 'medi:cartografia', section: 'punts-altitud', note: 'Interpreta els colors d’un planisferi físic i compara intervals d’altitud.' }],
    resources: worldMaps,
    sources: [
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['ICGC · Planisferi', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Planisferi'],
      ['Natural Earth · Costes de referència', 'https://www.naturalearthdata.com/downloads/110m-physical-vectors/'],
    ],
  });

  addTopic('M007', {
    id: 'planisferi-politic',
    title: 'Fronteres i colors al mapa',
    intro: 'Com podem distingir d’un cop d’ull dos països veïns? El planisferi polític fa visibles les fronteres, i els colors ens ajuden a seguir-les. Ho provarem amb un retall de mapa real i dos mapes per acolorir.',
    coverFigure: 'planisferi-fronteres',
    figures: [
      {
        id: 'planisferi-fronteres', section: 'fronteres', name: 'Planisferi polític', ratio: 2280 / 1230,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapamundi amb països acolorits. Un requadre assenyala la zona de la península Ibèrica i un traç discontinu identifica els límits disputats.',
        caption: 'Observa el requadre que situa la península Ibèrica i l’entorn. El detall ampliat apareix a l’apartat següent.',
        credit: 'Natural Earth a 1:110 milions. Natural Earth, domini públic.',
        variants: {
          pla: { src: 'illustracions/m007/planisferi-fronteres-pla.png', thumbnail: 'illustracions/m007/miniatures/planisferi-fronteres-pla.jpg' },
          atles: { src: 'illustracions/m007/planisferi-fronteres-atles.png', thumbnail: 'illustracions/m007/miniatures/planisferi-fronteres-atles.jpg' },
        },
      },
      {
        id: 'fronteres-peninsula', section: 'veinat', name: 'Fronteres a la península Ibèrica', ratio: 2280 / 1210,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa regional amb Portugal, Espanya i França retolats. Les línies contínues a terra n’assenyalen les fronteres.',
        caption: 'Detall regional d’un mapa polític. Segueix les fronteres a terra i compara quins països comparteixen algun tram.',
        credit: 'Natural Earth a 1:50 milions. Natural Earth, domini públic.',
        variants: {
          pla: { src: 'illustracions/m007/fronteres-peninsula-pla.png', thumbnail: 'illustracions/m007/miniatures/fronteres-peninsula-pla.jpg' },
          atles: { src: 'illustracions/m007/fronteres-peninsula-atles.png', thumbnail: 'illustracions/m007/miniatures/fronteres-peninsula-atles.jpg' },
        },
      },
      {
        id: 'mapes-muts-quatre-colors', section: 'acoloreix', name: 'Dos mapes muts per acolorir', ratio: 2280 / 980,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos mapes imaginaris per pintar. El primer té tres regions veïnes entre si. El segon hi afegeix la regió central D, que toca les tres regions exteriors.',
        caption: 'Acoloreix les regions amb lletres. També pots fer servir ratllats o escriure números dins de les regions.',
        variants: {
          pla: { src: 'illustracions/m007/mapes-muts-quatre-colors-pla.png', thumbnail: 'illustracions/m007/miniatures/mapes-muts-quatre-colors-pla.jpg' },
          atles: { src: 'illustracions/m007/mapes-muts-quatre-colors-atles.png', thumbnail: 'illustracions/m007/miniatures/mapes-muts-quatre-colors-atles.jpg' },
        },
      },
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
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Segueix fronteres en un mapa real i descobreix per què alguns mapes es poden acolorir amb tres colors i d’altres en necessiten quatre.',
    curriculum: [{ row: 'medi:cartografia', section: 'fronteres', note: 'Identifica la funció de les fronteres i compara països veïns en una representació política del territori.' }],
    resources: worldMaps,
    sources: [
      ['Natural Earth · Capes administratives', 'https://www.naturalearthdata.com/downloads/50m-cultural-vectors/'],
      ['Wolfram MathWorld · Teorema dels quatre colors', 'https://mathworld.wolfram.com/Four-ColorTheorem.html'],
    ],
  });

  addTopic('M008', {
    id: 'muntanyes-i-rius-europa',
    title: 'De les muntanyes als grans rius d’Europa',
    intro: 'En un mapa d’Europa, els colors del relleu i les línies dels rius expliquen coses diferents. Podem llegir-los junts i seguir l’aigua fins on arriba.',
    figures: [
      {
        id: 'relleu-europa', section: 'alps', name: 'Mapa del relleu d’Europa', ratio: 2280 / 1815,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa físic d’Europa amb els Alps, el Caucas i la Gran Plana Europea, i amb el mar Negre i el mar Caspi retolats.',
        caption: 'Els Alps i el Caucas destaquen per l’altitud. La Gran Plana Europea ocupa una extensió àmplia de terres més baixes.',
        credit: 'NOAA/NCEI ETOPO 2022 i Natural Earth.',
        variants: {
          pla: { src: 'illustracions/m008/relleu-europa-pla.png', thumbnail: 'illustracions/m008/miniatures/relleu-europa-pla.jpg' },
          atles: { src: 'illustracions/m008/relleu-europa-atles.png', thumbnail: 'illustracions/m008/miniatures/relleu-europa-atles.jpg' },
        },
      },
      {
        id: 'danubi-i-volga', section: 'danubi', name: 'Dos rius, dues desembocadures', ratio: 2280 / 1815,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Mapa amb el Danubi en línia contínua fins al mar Negre i el Volga en línia discontínua fins al mar Caspi. Un requadre mostra Viena, Bratislava, Budapest i Belgrad.',
        caption: 'Ressegueix el Danubi fins al mar Negre i el Volga fins al Caspi. El requadre amplia el tram del Danubi on hi ha quatre capitals.',
        credit: 'Natural Earth i NOAA/NCEI ETOPO 2022.',
        variants: {
          pla: { src: 'illustracions/m008/danubi-i-volga-pla.png', thumbnail: 'illustracions/m008/miniatures/danubi-i-volga-pla.jpg' },
          atles: { src: 'illustracions/m008/danubi-i-volga-atles.png', thumbnail: 'illustracions/m008/miniatures/danubi-i-volga-atles.jpg' },
        },
      },
      {
        id: 'valls-i-planes', section: 'alps', name: 'Una vall alpina i una plana extensa', ratio: 1200 / 755,
        width: 50, position: 'right', wrap: true, anchor: 'paragraph-1',
        alt: 'Un riu corre entre vessants alts en una vall alpina. A la plana europea, un riu fa corbes entre terres de poc pendent.',
        caption: 'Esquemes de dos paisatges. Compara el pendent dels vessants i el recorregut dels rius.',
        variants: {
          pla: { src: 'illustracions/m008/valls-i-planes-pla.png', thumbnail: 'illustracions/m008/miniatures/valls-i-planes-pla.jpg' },
          atles: { src: 'illustracions/m008/valls-i-planes-atles.png', thumbnail: 'illustracions/m008/miniatures/valls-i-planes-atles.jpg' },
        },
      },
    ],
    sections: [
      section('alps', 'Els Alps al cor d’Europa',
        essencial('Els **Alps** són una gran serralada de l’Europa central i meridional.'),
        p('S’estenen per diversos països, com França, Suïssa, Itàlia i Àustria. Entre les muntanyes hi ha valls per on baixen rius, i a les parts altes encara hi ha glaceres.')),
      section('caucas', 'Muntanyes entre dos mars',
        essencial('El **Caucas** s’estén entre el mar Negre i el mar Caspi.'),
        p('Alguns mapes fan passar per aquesta serralada el límit convencional entre Europa i Àsia. Per entendre què inclou un mapa d’Europa, convé fixar-se en aquest límit.')),
      section('plana', 'La Gran Plana Europea',
        essencial('La **Gran Plana Europea** és una extensa zona de relleu generalment baix i poc accidentat.'),
        p('Ocupa bona part del nord i l’est d’Europa. Les planes també poden tenir turons, valls i pantans. Al mapa físic, busca zones baixes que s’estenen de manera contínua.')),
      section('danubi', 'El Danubi, camí del mar Negre',
        essencial('El **Danubi** neix a Alemanya i desemboca al **mar Negre**.'),
        p('Pel camí passa per ciutats com Viena, Bratislava, Budapest i Belgrad. A prop de la desembocadura es divideix en diversos braços i forma un delta.')),
      section('volga', 'El Volga arriba al Caspi',
        essencial('El **Volga** travessa la part europea de Rússia i desemboca al **mar Caspi**.'),
        p('El Caspi és una gran massa d’aigua interior. Tot i que el nom diu «mar», les seves aigües no tenen sortida natural cap a l’oceà. Això el diferencia del mar Negre, comunicat amb la Mediterrània per estrets i mars intermedis.'),
        box('prova', 'Dos rius, dues sortides', 'En un atles físic, ressegueix el Danubi i el Volga. Anota el continent, el lloc de desembocadura de cadascun i una diferència entre els dos mars.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Franges de color i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Relleu modelat i detalls de paisatge.' },
    ],
    description: 'Situa els Alps, el Caucas i la Gran Plana Europea i compara el recorregut del Danubi amb el del Volga.',
    curriculum: [{ row: 'medi:cartografia', section: 'volga', note: 'Situa els Alps, el Caucas i la Gran Plana Europea i compara el recorregut del Danubi amb el del Volga.' }],
    sources: [
      ['NOAA/NCEI · Model de relleu ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Natural Earth · Rius i eixos dels llacs', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/'],
      ['ICGC · El món en català', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/Didactics-i-ludics/El-Mon-en-catala'],
    ],
  });

  addTopic('M009', {
    id: 'relleu-espanya',
    title: 'De la Meseta al relleu de les illes',
    intro: 'Si féssim un viatge des del centre de la península fins a la costa i les illes, passaríem per altiplans, serralades i depressions. On trobaríem cada paisatge?',
    figures: [
      {
        id: 'unitats-relleu-peninsular', section: 'meseta', name: 'Les unitats del relleu peninsular', ratio: 2280 / 1515,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa físic de la península Ibèrica amb les dues submesetes, les serralades principals i les depressions de l’Ebre i del Guadalquivir marcades amb trama.',
        caption: 'El Sistema Central divideix la Meseta. Cerca les dues depressions i les serralades que les envolten.',
        credit: 'ETOPO 2022, Natural Earth i atles didàctic de l’IGN.',
        variants: {
          pla: { src: 'illustracions/m009/unitats-relleu-peninsular-pla.png', thumbnail: 'illustracions/m009/miniatures/unitats-relleu-peninsular-pla.jpg' },
          atles: { src: 'illustracions/m009/unitats-relleu-peninsular-atles.png', thumbnail: 'illustracions/m009/miniatures/unitats-relleu-peninsular-atles.jpg' },
        },
      },
      {
        id: 'depressions-ebre-guadalquivir', section: 'ebre', name: 'Dues depressions entre muntanyes', ratio: 2280 / 1280,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Dos mapes mostren el curs de l’Ebre i del Guadalquivir, els seus relleus veïns i la sortida de cadascun cap al mar.',
        caption: 'Les dues depressions són més baixes que les serralades veïnes. Segueix l’Ebre fins a la Mediterrània i el Guadalquivir fins a l’Atlàntic.',
        credit: 'ETOPO 2022, Natural Earth, ACA i IGR Hidrografia de l’IGN.',
        variants: {
          pla: { src: 'illustracions/m009/depressions-ebre-guadalquivir-pla.png', thumbnail: 'illustracions/m009/miniatures/depressions-ebre-guadalquivir-pla.jpg' },
          atles: { src: 'illustracions/m009/depressions-ebre-guadalquivir-atles.png', thumbnail: 'illustracions/m009/miniatures/depressions-ebre-guadalquivir-atles.jpg' },
        },
      },
      {
        id: 'relleu-mallorca-tenerife', section: 'balears', name: 'Tramuntana i Teide', ratio: 2280 / 1280,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Dos mapes amb nord i escala mostren la Tramuntana i una plana de Mallorca i el Teide a Tenerife. Uns mapes petits situen les illes dins de cada arxipèlag.',
        caption: 'Compara la serra de Tramuntana i la plana interior de Mallorca amb els pendents del Teide, a Tenerife.',
        credit: 'NOAA/NCEI ETOPO 2022 i Natural Earth.',
        variants: {
          pla: { src: 'illustracions/m009/relleu-mallorca-tenerife-pla.png', thumbnail: 'illustracions/m009/miniatures/relleu-mallorca-tenerife-pla.jpg' },
          atles: { src: 'illustracions/m009/relleu-mallorca-tenerife-atles.png', thumbnail: 'illustracions/m009/miniatures/relleu-mallorca-tenerife-atles.jpg' },
        },
      },
    ],
    sections: [
      section('meseta', 'La Meseta, una plana elevada',
        essencial('La **Meseta** ocupa bona part de l’interior peninsular. El **Sistema Central** la divideix en submeseta nord i submeseta sud.'),
        p('La submeseta nord inclou gran part de la conca del Duero. A la sud, els Montes de Toledo separen les conques del Tajo i el Guadiana. Hi ha planes elevades i també muntanyes dins de la Meseta.')),
      section('vores', 'Muntanyes que voregen la Meseta',
        essencial('La **serralada Cantàbrica**, el **Sistema Ibèric** i **Sierra Morena** voregen la Meseta pel nord, per l’est i pel sud.'),
        p('Entre la costa cantàbrica i les terres altes, el relleu canvia en poc espai. El Sistema Ibèric separa part de la Meseta de la depressió de l’Ebre.')),
      section('periferia', 'De Galícia als Pirineus i les Bètiques',
        essencial('Prop de les vores peninsulars destaquen el **massís Galaic**, les **muntanyes Basques**, els **Pirineus**, les **serralades costaneres catalanes** i les **Bètiques**.'),
        p('El massís Galaic és al nord-oest. Els Pirineus són al nord-est, i les serralades costaneres catalanes segueixen la Mediterrània. Les Bètiques s’estenen pel sud i el sud-est.')),
      section('ebre', 'L’Ebre travessa una depressió',
        essencial('La **depressió de l’Ebre** és una zona més baixa entre els Pirineus, el Sistema Ibèric i les serralades costaneres catalanes.'),
        p('El riu Ebre hi passa cap a la Mediterrània. Una depressió és baixa en relació amb el relleu que l’envolta, i també pot incloure turons i altiplans.')),
      section('guadalquivir', 'La plana del Guadalquivir',
        essencial('La **depressió del Guadalquivir** se situa entre Sierra Morena i les serralades Bètiques.'),
        p('S’eixampla cap a l’Atlàntic. A prop de la desembocadura hi ha maresmes, zones baixes on l’aigua cobreix el terreny de manera permanent o temporal.'),
        box('prova', 'Llegim el relleu al costat dels rius', 'Busca al mapa la depressió de l’Ebre i la del Guadalquivir. Escriu una serralada que voregi cadascuna i el mar o oceà cap on va el seu riu.')),
      section('balears', 'Serralades i planes a les Balears',
        essencial('A **Mallorca** hi ha la serra de Tramuntana, al nord-oest, i zones de plana a l’interior.'),
        p('Els paisatges de les Balears són diversos. Menorca té un relleu generalment més baix, amb un nord més irregular i un sud travessat per barrancs.')),
      section('canaries', 'Les illes volcàniques de les Canàries',
        essencial('Les **Canàries** són un arxipèlag d’origen volcànic. A Tenerife hi ha el **Teide**.'),
        p('Hi ha pendents forts, barrancs i planes volcàniques. L’origen volcànic és compartit, però l’edat dels materials, l’erosió i les erupcions han donat formes diferents a cada illa.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Franges de color i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Relleu modelat i detalls de paisatge.' },
    ],
    description: 'S’organitza el relleu d’Espanya a partir de la Meseta, les serralades, les depressions i el relleu dels arxipèlags.',
    curriculum: [{ row: 'medi:cartografia', section: 'guadalquivir', note: 'S’organitza el relleu d’Espanya a partir de la Meseta, les serralades, les depressions i el relleu dels arxipèlags.' }],
    sources: [
      ['NOAA/NCEI · Model de relleu ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['IGN · IGR Hidrografia', 'https://www.ign.es/web/ign/portal/seccion-hidrografia'],
      ['ACA · Cartografia i geoserveis', 'https://aca.gencat.cat/ca/laigua/consulta-de-dades/cartografia-geoserveis/'],
      ['IGN · Les unitats del relleu peninsular', 'https://educativo.ign.es/atlas-didactico/relieve-bach/las_grandes_unidades_del_relieve_peninsular.html'],
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
    ],
  });

  addTopic('M010', {
    id: 'costes-i-rius-espanya',
    title: 'Tres vessants i moltes costes',
    intro: 'Una gota d’aigua que cau a la Península pot acabar al Cantàbric, a l’Atlàntic o a la Mediterrània. El relleu ens dona pistes per explicar quin camí farà.',
    coverFigure: 'vessants-peninsulars',
    figures: [
      {
        id: 'vessants-peninsulars', section: 'cantabric', name: 'Els tres vessants peninsulars', ratio: 2280 / 1515,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa amb trames per als vessants cantàbric, atlàntic i mediterrani. Les línies blaves mostren deu rius i els triangles, les desembocadures.',
        caption: 'Segueix el Nalón, el Xúquer i el Tajo. El mar o oceà on acaba cadascun indica a quin vessant pertany.',
        credit: 'HydroBASINS v1c, IGN, ACA, Natural Earth i ETOPO 2022.',
        variants: {
          pla: { src: 'illustracions/m010/vessants-peninsulars-pla.png', thumbnail: 'illustracions/m010/miniatures/vessants-peninsulars-pla.jpg' },
          atles: { src: 'illustracions/m010/vessants-peninsulars-atles.png', thumbnail: 'illustracions/m010/miniatures/vessants-peninsulars-atles.jpg' },
        },
      },
      {
        id: 'conca-i-vessant', section: 'rius', name: 'On va l’aigua que cau a cada vessant?', ratio: 2280 / 1190,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Tres conques formen un paisatge fictici. Unes carenes discontínues separen les conques i unes fletxes indiquen cap a quin mar va l’aigua.',
        caption: 'Dues conques desguassen al mar A i formen un mateix vessant. Una altra conca desguassa al mar B.',
        variants: {
          pla: { src: 'illustracions/m010/conca-i-vessant-pla.png', thumbnail: 'illustracions/m010/miniatures/conca-i-vessant-pla.jpg' },
          atles: { src: 'illustracions/m010/conca-i-vessant-atles.png', thumbnail: 'illustracions/m010/miniatures/conca-i-vessant-atles.jpg' },
        },
      },
      {
        id: 'formes-de-costa', section: 'costa', name: 'Quatre formes de costa', ratio: 2280 / 819,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Quatre esquemes oblics mostren un penya-segat alt, una platja de sorra, una ria que entra terra endins i un delta amb sediments i braços de riu.',
        caption: 'El penya-segat, la platja, la ria i el delta tenen formes diferents a la vora del mar.',
        variants: {
          pla: { src: 'illustracions/m010/formes-de-costa-pla.png', thumbnail: 'illustracions/m010/miniatures/formes-de-costa-pla.jpg' },
          atles: { src: 'illustracions/m010/formes-de-costa-atles.png', thumbnail: 'illustracions/m010/miniatures/formes-de-costa-atles.jpg' },
        },
      },
    ],
    sections: [
      section('rius', 'Què explica el recorregut d’un riu?',
        essencial('La **conca** és el territori que aporta aigua a un riu. Un **vessant hidrogràfic** agrupa conques que desguassen a la mateixa mar o oceà.'),
        p('Les carenes separen conques. El pendent, les pluges i la mida de la conca influeixen en la llargada i el cabal d’un riu. El cabal és la quantitat d’aigua que passa per un punt en un temps determinat.')),
      section('costa', 'Penya-segats, platges i deltes',
        essencial('La **costa** és la franja de contacte entre la terra i el mar. Hi trobem penya-segats, platges, ries i deltes.'),
        p('A Galícia hi ha ries, valls fluvials ocupades pel mar a la desembocadura. A la Mediterrània, el delta de l’Ebre s’ha format amb sediments que el riu ha dipositat al llarg del temps.')),
      section('cantabric', 'Rius cap al Cantàbric',
        essencial('Molts rius del **vessant cantàbric** són curts i tenen pendent fort perquè les muntanyes són a prop de la costa.'),
        p('El **Nalón** i el **Nervión** en són exemples. Les pluges freqüents poden mantenir un cabal relativament abundant, encara que el cabal variï durant l’any.')),
      section('mediterrani', 'Rius cap a la Mediterrània',
        essencial('El **vessant mediterrani** inclou rius com l’**Ebre**, el **Xúquer** i el **Segura**.'),
        p('Alguns cursos d’aquest vessant tenen cabals irregulars, amb poc cabal a l’estiu i crescudes després de pluges intenses. L’Ebre és més llarg i recull aigua de moltes conques afluents.')),
      section('atlantic', 'Rius cap a l’Atlàntic',
        essencial('El **Miño**, el **Duero**, el **Tajo**, el **Guadiana** i el **Guadalquivir** desemboquen a l’**Atlàntic**.'),
        p('El Duero i el Tajo recullen l’aigua de grans conques interiors i desemboquen a Portugal. Els rius travessen fronteres polítiques, però el vessant es determina pel destí de l’aigua.'),
        box('prova', 'Classifica pel final del recorregut', 'Busca el Nalón, el Xúquer i el Tajo en un atles i posa’ls en tres grups segons on desemboquen. Comprova que els rius i les seves desembocadures poden estar en territoris diferents.')),
      section('illes', 'Torrents i barrancs a les illes',
        essencial('A les **Balears** i a les **Canàries** molts cursos d’aigua corren sobretot després de pluges.'),
        p('A Mallorca hi ha nombrosos torrents. A les Canàries, molts cursos temporals baixen per barrancs. L’absència de grans rius permanents no vol dir que l’aigua no pugui modelar el paisatge.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Franges de color i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Relleu modelat i detalls de paisatge.' },
    ],
    description: 'Agrupa els rius peninsulars per vessants i relaciona el relleu de les costes i les illes amb els recorreguts de l’aigua.',
    curriculum: [{ row: 'medi:cartografia', section: 'atlantic', note: 'Agrupa els rius peninsulars per vessants i relaciona el relleu de les costes i les illes amb els recorreguts de l’aigua.' }],
    sources: [
      ['HydroBASINS · Límits de les conques', 'https://www.hydrosheds.org/products/hydrobasins'],
      ['IGN · IGR Hidrografia', 'https://www.ign.es/web/ign/portal/seccion-hidrografia'],
      ['NOAA/NCEI · Model de relleu ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['IGN · Rius d’Espanya i vessants', 'https://educativo.ign.es/atlas-didactico/agua-bach/actividad_identificar_los_principales_ros_de_espaa.html'],
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
    ],
  });

  addTopic('M011', {
    id: 'relleu-catalunya',
    title: 'Dels Pirineus a la costa catalana',
    intro: 'De nord a sud, Catalunya combina cims alts, depressions, altiplans i serres paral·leles al mar. Un recorregut dibuixat al mapa ens permet relacionar-los.',
    figures: [
      {
        id: 'relleu-catalunya', section: 'pirineus', name: 'Mapa físic de Catalunya', ratio: 2280 / 1470,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa físic de Catalunya amb el Pirineu axial, el Prepirineu, la Depressió Central, les dues serralades costaneres, el Vallès i el Penedès.',
        caption: 'De la muntanya al mar es poden seguir el Pirineu, el Prepirineu, l’interior i les serres costaneres. El Vallès i el Penedès ocupen franges més baixes.',
        credit: 'NOAA/NCEI ETOPO 2022, Natural Earth i © EuroGeographics pels límits.',
        variants: {
          pla: { src: 'illustracions/m011/relleu-catalunya-pla.png', thumbnail: 'illustracions/m011/miniatures/relleu-catalunya-pla.jpg' },
          atles: { src: 'illustracions/m011/relleu-catalunya-atles.png', thumbnail: 'illustracions/m011/miniatures/relleu-catalunya-atles.jpg' },
        },
      },
      {
        id: 'recorregut-prepirineu-mar', section: 'costaneres', name: 'Un recorregut del Prepirineu al mar', ratio: 2280 / 1500,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Una línia numerada creua Catalunya des del Prepirineu fins a la Mediterrània i passa pel Vallès. Un dibuix lateral mostra l’ordre del mateix recorregut.',
        caption: 'Esquema del recorregut. Els nombres del mapa indiquen l’ordre del Prepirineu fins al mar passant pel Vallès.',
        credit: 'NOAA/NCEI ETOPO 2022, Natural Earth i © EuroGeographics pels límits.',
        variants: {
          pla: { src: 'illustracions/m011/recorregut-prepirineu-mar-pla.png', thumbnail: 'illustracions/m011/miniatures/recorregut-prepirineu-mar-pla.jpg' },
          atles: { src: 'illustracions/m011/recorregut-prepirineu-mar-atles.png', thumbnail: 'illustracions/m011/miniatures/recorregut-prepirineu-mar-atles.jpg' },
        },
      },
      {
        id: 'plana-altipla-plana-litoral', section: 'interior', name: 'Tres formes de terreny més pla', ratio: 1200 / 727,
        width: 50, position: 'right', wrap: true, anchor: 'paragraph-1',
        alt: 'Tres vinyetes mostren una plana interior, una superfície plana elevada sobre l’entorn i una plana adjacent al mar.',
        caption: 'Esquemes de terres planes en entorns diferents. L’altiplà queda elevat i la plana litoral és a tocar del mar.',
        variants: {
          pla: { src: 'illustracions/m011/plana-altipla-plana-litoral-pla.png', thumbnail: 'illustracions/m011/miniatures/plana-altipla-plana-litoral-pla.jpg' },
          atles: { src: 'illustracions/m011/plana-altipla-plana-litoral-atles.png', thumbnail: 'illustracions/m011/miniatures/plana-altipla-plana-litoral-atles.jpg' },
        },
      },
    ],
    sections: [
      section('pirineus', 'El Pirineu axial i el Prepirineu',
        essencial('Al nord hi ha el **Pirineu axial**, amb cims com la **Pica d’Estats**. Més al sud hi ha les serres del **Prepirineu**.'),
        p('Al Prepirineu trobem el **Cadí**, el **Port del Comte** i el **Montsec**. Al mapa, fixa’t en les valls que s’obren entre les carenes. L’orientació oest-est de moltes serres ajuda a reconèixer-les.')),
      section('interior', 'Planes, conques i altiplans interiors',
        essencial('La **Depressió Central** és entre el Prepirineu i el sistema de serres que segueix la costa.'),
        p('Inclou zones planes com la de Lleida, conques més tancades, valls i altiplans com el del Moianès. Les planes litorals, en canvi, són prop del mar, com els sectors plans de l’Empordà o del delta del Llobregat.')),
      section('costaneres', 'Dues serralades prop del mar',
        essencial('La **Serralada Prelitoral** queda més endins que la **Serralada Litoral**. Entre totes dues hi ha sectors més baixos.'),
        p('Montserrat i el Montseny formen part de la Prelitoral. Collserola i el Montnegre pertanyen a la Litoral. El Vallès i el Penedès ocupen sectors de la depressió que separa bona part de les dues serralades.'),
        box('prova', 'Un tall imaginari', 'En un mapa físic, traça un recorregut del Prepirineu a la Mediterrània que passi per l’interior i la zona del Vallès. Anota quines zones més planes o més muntanyoses travesses.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Franges de color i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Relleu modelat i detalls de paisatge.' },
    ],
    description: 'Localitza els Pirineus, les terres baixes de l’interior i les serralades i planes costaneres de Catalunya.',
    curriculum: [{ row: 'medi:cartografia', section: 'costaneres', note: 'Localitza els Pirineus, les terres baixes de l’interior i les serralades i planes costaneres de Catalunya.' }],
    sources: [
      ['NOAA/NCEI · Model de relleu ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Eurostat/GISCO · Límits de context NUTS 2024', 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/nuts-2024-files.html'],
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M012', {
    id: 'rius-costes-catalunya',
    title: 'Seguint l’aigua fins a la costa catalana',
    intro: 'El Segre, l’Ebre, el Ter i el Llobregat passen per paisatges molt diferents. Segueix-los al mapa i descobreix quins arriben al mar i quin desemboca en un altre riu.',
    figures: [
      {
        id: 'xarxa-fluvial-catalunya', section: 'conques', name: 'El Segre, l’Ebre, el Ter i el Llobregat', ratio: 2280 / 1480,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa de quatre rius de Catalunya. Un rombe marca la unió del Segre amb l’Ebre i tres triangles indiquen les desembocadures al mar. Una fletxa indica que la Garona va cap a l’Atlàntic.',
        caption: 'El Segre s’uneix a l’Ebre a Mequinensa. L’Ebre, el Ter i el Llobregat arriben a la Mediterrània.',
        credit: 'ACA, ETOPO 2022, Natural Earth i © EuroGeographics pels límits.',
        variants: {
          pla: { src: 'illustracions/m012/xarxa-fluvial-catalunya-pla.png', thumbnail: 'illustracions/m012/miniatures/xarxa-fluvial-catalunya-pla.jpg' },
          atles: { src: 'illustracions/m012/xarxa-fluvial-catalunya-atles.png', thumbnail: 'illustracions/m012/miniatures/xarxa-fluvial-catalunya-atles.jpg' },
        },
      },
      {
        id: 'deltes-ebre-llobregat', section: 'costes', name: 'Els deltes de l’Ebre i el Llobregat', ratio: 2280 / 1210,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Comparació orientada al nord dels deltes de l’Ebre i el Llobregat. Cada retall té un traç de riu, un símbol de desembocadura i una barra d’escala.',
        caption: 'Dos deltes i dues escales. Compara la forma de la costa i localitza la sortida de cada riu.',
        credit: 'Traç i contorns aproximats a partir de l’ortofoto territorial © ICGC, vol 2025 (CC BY 4.0).',
        variants: {
          pla: { src: 'illustracions/m012/deltes-ebre-llobregat-pla.png', thumbnail: 'illustracions/m012/miniatures/deltes-ebre-llobregat-pla.jpg' },
          atles: { src: 'illustracions/m012/deltes-ebre-llobregat-atles.png', thumbnail: 'illustracions/m012/miniatures/deltes-ebre-llobregat-atles.jpg', credit: 'Ortofoto territorial © ICGC, vol 2025 (CC BY 4.0). Retall i ajust de color.' },
        },
      },
      {
        id: 'recorreguts-ter-llobregat', section: 'ter', name: 'Dos cursos, de la capçalera al mar', ratio: 2280 / 1215,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Dues tires mostren els llocs que travessen el Ter i el Llobregat. Símbols diferents distingeixen les capçaleres, els embassaments, les confluències i les desembocadures.',
        caption: 'Recorreguts esquemàtics. Segueix els llocs en ordre des de la capçalera fins al mar.',
        variants: {
          pla: { src: 'illustracions/m012/recorreguts-ter-llobregat-pla.png', thumbnail: 'illustracions/m012/miniatures/recorreguts-ter-llobregat-pla.jpg' },
          atles: { src: 'illustracions/m012/recorreguts-ter-llobregat-atles.png', thumbnail: 'illustracions/m012/miniatures/recorreguts-ter-llobregat-atles.jpg' },
        },
      },
    ],
    sections: [
      section('conques', 'Cap al mateix mar per camins diferents',
        essencial('Bona part de l’aigua dels rius de Catalunya acaba a la **Mediterrània**. El Ter i el Llobregat són de **conques internes**.'),
        p('Les conques internes desemboquen directament a la Mediterrània dins l’àmbit català. L’Ebre i el Segre formen part d’una conca compartida amb altres territoris. La Garona, a l’Aran, és una excepció, perquè desguassa cap a l’Atlàntic.')),
      section('costes', 'Cales, platges i deltes',
        essencial('La costa catalana alterna trams rocosos, platges i terres baixes com les dels **deltes**.'),
        p('A la Costa Brava són freqüents les cales i els trams abruptes. Les costes baixes dels deltes de l’Ebre i el Llobregat es relacionen amb els sediments que han aportat els rius.')),
      section('segre', 'El Segre és afluent de l’Ebre',
        essencial('El **Segre** baixa dels Pirineus, passa per Lleida i s’uneix a l’**Ebre** a Mequinensa.'),
        p('En el seu recorregut rep aigües d’altres rius, com la Noguera Pallaresa i la Noguera Ribagorçana. Un **afluent** aporta la seva aigua a un altre riu.')),
      section('ebre', 'L’Ebre s’obre en un delta',
        essencial('L’**Ebre** travessa les Terres de l’Ebre i desemboca a la Mediterrània.'),
        p('Els sediments aportats pel riu han contribuït a formar el delta. Les ones, els corrents i els canvis en l’aportació de sediments continuen modificant-ne el contorn.')),
      section('ter', 'El Ter, del Pirineu a la Gola',
        essencial('El **Ter** neix al Pirineu oriental i desemboca a la **Gola del Ter**, al Baix Empordà.'),
        p('Passa per Ripoll, la plana de Vic i Girona. Els embassaments de Sau i Susqueda regulen part de l’aigua que baixa cap al curs inferior.')),
      section('llobregat', 'El Llobregat i el seu delta',
        essencial('El **Llobregat** neix a Castellar de n’Hug i arriba al mar al **Prat de Llobregat**.'),
        p('Rep afluents com el Cardener i l’Anoia. A la plana del delta hi ha aiguamolls, camps de conreu, vies de comunicació i àrees urbanes.'),
        box('prova', 'Dibuixa la xarxa', 'Amb fletxes, uneix Segre, Ebre, Ter i Llobregat amb el riu o la mar on aboquen l’aigua directament. El Segre i l’Ebre han de quedar connectats abans d’arribar al mar.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Franges de color i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Relleu modelat i detalls de paisatge.' },
    ],
    description: 'Compara quatre rius i els paisatges de la costa, i distingeix les conques internes de la conca de l’Ebre.',
    curriculum: [{ row: 'medi:cartografia', section: 'llobregat', note: 'Compara quatre rius i els paisatges de la costa, i distingeix les conques internes de la conca de l’Ebre.' }],
    sources: [
      ['ACA · Cartografia i geoserveis', 'https://aca.gencat.cat/ca/laigua/consulta-de-dades/cartografia-geoserveis/'],
      ['ICGC · Ortofoto territorial', 'https://www.icgc.cat/ca/Geoinformacio-i-mapes/Dades-i-productes/Imatge/Ortofoto-Territorial'],
      ['Llicència de l’ortofoto · CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/deed.ca'],
      ['Eurostat/GISCO · Límits de context NUTS 2024', 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/nuts-2024-files.html'],
      ['ACA · El medi hídric i les conques de Catalunya', 'https://aca.gencat.cat/ca/laigua/el-medi-hidric-a-catalunya/'],
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M013', {
    id: 'altitud-i-perfils',
    title: 'Del mapa de corbes al perfil d’una excursió',
    intro: 'Dos camins poden començar i acabar a la mateixa altitud, però un pot fer una pujada molt més forta que l’altre. Les corbes de nivell i els perfils ens ajuden a triar.',
    coverFigure: 'mapa-i-perfil',
    figures: [
      {
        id: 'mapa-i-perfil', section: 'perfil', name: 'Del mapa al perfil', ratio: 2280 / 1410,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tram recte d’1 km. P és a 600 m, el punt del mig és a 620 m i Q és a 640 m. Al perfil, els punts són a 0, 0,5 i 1 km.',
        caption: 'Tram de mostra P–Q. Les guies uneixen tres llocs del mapa amb els punts corresponents al perfil.',
        variants: {
          pla: { src: 'illustracions/m013/mapa-i-perfil-pla.png', thumbnail: 'illustracions/m013/miniatures/mapa-i-perfil-pla.jpg' },
          atles: { src: 'illustracions/m013/mapa-i-perfil-atles.png', thumbnail: 'illustracions/m013/miniatures/mapa-i-perfil-atles.jpg' },
        },
      },
      {
        id: 'corbes-i-pendent', section: 'corbes', name: 'Mateixa equidistància, pendents diferents', ratio: 1200 / 790,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Retalls a la mateixa escala amb corbes de 540, 560 i 580 m. Les corbes són més juntes al pendent fort.',
        caption: 'Les corbes tenen una equidistància de 20 m en tots dos retalls. Compara la distància que recorre cada fletxa entre una corba i la següent.',
        variants: {
          pla: { src: 'illustracions/m013/corbes-i-pendent-pla.png', thumbnail: 'illustracions/m013/miniatures/corbes-i-pendent-pla.jpg' },
          atles: { src: 'illustracions/m013/corbes-i-pendent-atles.png', thumbnail: 'illustracions/m013/miniatures/corbes-i-pendent-atles.jpg' },
        },
      },
      {
        id: 'graella-dos-itineraris', section: 'excursio', name: 'Dos recorreguts sobre uns mateixos eixos', ratio: 2280 / 1110,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Graella buida. L’eix horitzontal va de 0 a 3 km. El vertical va de 500 a 750 m amb guies cada 10 m.',
        caption: 'Marca els punts dels itineraris A i B sobre la mateixa graella. Uneix els punts d’A amb un traç continu i els de B amb un traç discontinu.',
        variants: {
          pla: { src: 'illustracions/m013/graella-dos-itineraris-pla.png', thumbnail: 'illustracions/m013/miniatures/graella-dos-itineraris-pla.jpg' },
          atles: { src: 'illustracions/m013/graella-dos-itineraris-atles.png', thumbnail: 'illustracions/m013/miniatures/graella-dos-itineraris-atles.jpg' },
        },
      },
    ],
    sections: [
      section('corbes', 'Les corbes uneixen punts a la mateixa altitud',
        essencial('Una **corba de nivell** uneix punts situats a la mateixa altitud. En un mateix mapa, quan les corbes són més juntes, el pendent és més fort.'),
        p('L’**equidistància** és la diferència d’altitud entre dues corbes seguides. Si la llegenda indica 20 metres, entre les corbes de 540 i 560 metres hi ha un canvi de 20 metres. Els colors solen indicar franges més àmplies.')),
      section('perfil', 'Un perfil mostra la pujada de costat',
        essencial('Un **perfil altimètric** representa l’altitud al llarg d’un recorregut. La distància va a l’eix horitzontal i l’altitud, al vertical.'),
        p('Dibuixa quatre punts amb les distàncies 0, 1, 2 i 3 quilòmetres i les altituds corresponents de 540, 660, 620 i 700 metres. En unir-los veuràs un tram de pujada, un de baixada i un altre de pujada.')),
      section('excursio', 'Mirem el camí abans de sortir',
        essencial('Per comparar dues excursions, mira la **llargada**, el **desnivell** i on es concentren els pendents.'),
        p('Els camins que arriben a la mateixa altitud poden passar per llocs diferents. Comprova també el tipus de terreny i si el camí és adequat per a les persones que el faran.'),
        box('prova', 'Escull un recorregut', 'L’itinerari A té el perfil de l’apartat anterior. El B fa 0, 1, 2 i 3 km a 540, 580, 620 i 700 m. Dibuixa’ls als mateixos eixos. Tots dos acaben 160 m més amunt. En quin has pujat més metres en total?')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Aprèn a llegir corbes de nivell, dibuixa un perfil altimètric i compara dos recorreguts per preparar una excursió.',
    curriculum: [{ row: 'medi:cartografia', section: 'excursio', note: 'Aprèn a llegir corbes de nivell, dibuixa un perfil altimètric i compara dos recorreguts per preparar una excursió.' }],
    sources: [
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
      ['ICGC · Corba de nivell', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Corba-de-nivell'],
    ],
  });

  addTopic('M014', {
    id: 'conservar-paisatges',
    title: 'Com podem tenir cura dels paisatges?',
    intro: 'Quan un barri creix o un bosc rep moltes visites, el paisatge canvia. Podem observar què s’hi transforma i pensar com conservar els espais que compartim.',
    coverFigure: 'pluja-i-sol-urba',
    figures: [
      {
        id: 'pluja-i-sol-urba', section: 'urbanitzacio', name: 'La mateixa pluja sobre dos barris', ratio: 2280 / 1255,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'En un carrer amb arbres i terra oberta, part de l’aigua s’infiltra. Amb el sòl pavimentat, més aigua circula per la superfície cap al mateix embornal.',
        caption: 'Esquema del mateix carrer amb la mateixa pluja i el mateix pendent. Les fletxes mostren per on va l’aigua segons el tipus de sòl.',
        variants: {
          pla: { src: 'illustracions/m014/pluja-i-sol-urba-pla.png', thumbnail: 'illustracions/m014/miniatures/pluja-i-sol-urba-pla.jpg' },
          atles: { src: 'illustracions/m014/pluja-i-sol-urba-atles.png', thumbnail: 'illustracions/m014/miniatures/pluja-i-sol-urba-atles.jpg' },
        },
      },
      {
        id: 'zona-humida-i-visitants', section: 'proteccio', name: 'Observar ocells en una zona humida', ratio: 2280 / 1210,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Uns visitants observen flamencs des de l’extrem d’un camí. L’aigua i la vegetació separen l’espai de pas de la zona de fauna.',
        caption: 'Esquema inspirat en el Delta de l’Ebre. Des del punt d’observació es poden veure ocells sense sortir del camí senyalitzat.',
        credit: 'Esquema inspirat en el Parc Natural del Delta de l’Ebre.',
        variants: {
          pla: { src: 'illustracions/m014/zona-humida-i-visitants-pla.png', thumbnail: 'illustracions/m014/miniatures/zona-humida-i-visitants-pla.jpg' },
          atles: { src: 'illustracions/m014/zona-humida-i-visitants-atles.png', thumbnail: 'illustracions/m014/miniatures/zona-humida-i-visitants-atles.jpg' },
        },
      },
      {
        id: 'seguiment-drecera-bosc', section: 'boscos', name: 'Seguir el camí i observar l’erosió', ratio: 2280 / 1240,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una drecera de terra nua talla un revolt. El segon dibuix incorpora un senyal que dirigeix el pas pel sender. Quatre estaques marquen el mateix quadrat d’observació als dos dibuixos.',
        caption: 'Dos moments del mateix revolt. Un senyal indica el sender. Al cap d’un mes es pot tornar al punt de seguiment i anotar l’amplada del sòl nu o els solcs visibles.',
        variants: {
          pla: { src: 'illustracions/m014/seguiment-drecera-bosc-pla.png', thumbnail: 'illustracions/m014/miniatures/seguiment-drecera-bosc-pla.jpg' },
          atles: { src: 'illustracions/m014/seguiment-drecera-bosc-atles.png', thumbnail: 'illustracions/m014/miniatures/seguiment-drecera-bosc-atles.jpg' },
        },
      },
    ],
    sections: [
      section('canvis', 'El paisatge canvia amb l’activitat humana',
        essencial('Les persones **transformem el medi** quan construïm, conreem o aprofitem recursos.'),
        p('Una carretera pot facilitar desplaçaments i alhora separar hàbitats. Un camp de conreu pot conservar marges de pedra i vegetació o perdre’ls quan s’eixampla. Observar què s’ha mantingut ajuda a interpretar el canvi.')),
      section('urbanitzacio', 'Quan la ciutat ocupa més terreny',
        essencial('La **urbanització** modifica l’ús del sòl i pot reduir o separar espais naturals i agrícoles.'),
        p('Quan augmenten l’asfalt i els edificis, part de l’aigua de pluja deixa d’infiltrar-se i corre més de pressa cap als embornals o les rieres. En barris catalans, conservar arbres, espais oberts i sòls permeables pot ajudar a esmorteir alguns efectes.')),
      section('proteccio', 'Espais amb mesures de protecció',
        essencial('En un **espai natural protegit** hi pot haver normes i actuacions per conservar paisatges, hàbitats o espècies.'),
        p('Al Delta de l’Ebre hi ha zones humides i llocs per observar ocells. En alguns sectors es limiten usos o accessos per evitar molèsties. La protecció es combina amb activitats compatibles i amb el treball de les persones que hi viuen.')),
      section('accions', 'Canvis que podem impulsar',
        essencial('Podem reduir els residus, respectar els camins senyalitzats i observar la fauna sense molestar-la.'),
        p('A l’escola podem comparar fotografies del barri, comptar quants arbres donen ombra en un carrer o fer un mapa d’un itinerari amb punts on acostuma a acumular-se brossa.')),
      section('boscos', 'Què ajuda a conservar un bosc?',
        essencial('Conservar un bosc vol dir cuidar el sòl i els hàbitats i facilitar una gestió adaptada a l’entorn.'),
        p('En alguns llocs es protegeix la vegetació de ribera o es recuperen espais oberts del mosaic. Una mateixa acció pot anar bé en un lloc i no en un altre. Per això convé mirar primer com és el bosc i què necessita.'),
        box('prova', 'Actuem i comprovem el resultat', 'Un sender del bosc té dreceres que han deixat el sòl sense vegetació. Proposa una acció per evitar que el problema creixi i un indicador que puguis observar al cap d’un mes.')),
    ],
  }, {
    collection: { id: 'relleu', title: 'El relleu i els rius' },
    theme: 'Geografia',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Analitza els efectes de la urbanització i proposa maneres de conservar els boscos i els espais naturals.',
    curriculum: [{ row: 'medi:ecosocial', section: 'boscos', note: 'Analitza els efectes de la urbanització i proposa maneres de conservar els boscos i els espais naturals.' }],
    sources: [
      ['Parc Natural del Delta de l’Ebre · Pautes de visita', 'https://parcsnaturals.gencat.cat/ca/xarxa-de-parcs/delta-ebre/gaudeix-del-parc/consells/pautes-i-consells/index.html'],
      ['Generalitat · Els espais naturals protegits', 'https://mediambient.gencat.cat/ca/05_ambits_dactuacio/patrimoni_natural/senp_catalunya/'],
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M015', {
    id: 'temps-i-clima',
    title: 'El temps d’avui i el clima d’un lloc',
    intro: 'Ens abriguem abans de sortir, però els pagesos també necessiten saber com solen ser les estacions de l’any. Són preguntes diferents i es responen amb dades diferents.',
    coverFigure: 'un-dia-i-trenta-anys',
    figures: [
      {
        id: 'un-dia-i-trenta-anys', section: 'clima', name: 'Un dia i trenta anys d’observacions', ratio: 2280 / 1165,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'En un dia de febrer, a les 8 h hi ha núvols i 10 °C, a les 13 h sol i 17 °C i a les 18 h pluja i 13 °C. La segona tira té una marca per cada febrer del 1991 al 2020.',
        caption: 'Dades d’exemple d’una estació imaginària. Un panell recull tres observacions d’un sol dia i l’altre representa les observacions de febrer al llarg de trenta anys.',
        variants: {
          pla: { src: 'illustracions/m015/un-dia-i-trenta-anys-pla.png', thumbnail: 'illustracions/m015/miniatures/un-dia-i-trenta-anys-pla.jpg' },
          atles: { src: 'illustracions/m015/un-dia-i-trenta-anys-atles.png', thumbnail: 'illustracions/m015/miniatures/un-dia-i-trenta-anys-atles.jpg' },
        },
      },
      {
        id: 'tres-instruments-meteorologics', section: 'temps', name: 'Què mesura una estació?', ratio: 1200 / 910,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Termòmetre dins d’un abric ventilat, pluviòmetre amb embut i anemòmetre de cassoletes amb una fletxa que en mostra el gir.',
        caption: 'Tres instruments d’una estació mesuren la temperatura, la precipitació i la velocitat del vent.',
        variants: {
          pla: { src: 'illustracions/m015/tres-instruments-meteorologics-pla.png', thumbnail: 'illustracions/m015/miniatures/tres-instruments-meteorologics-pla.jpg' },
          atles: { src: 'illustracions/m015/tres-instruments-meteorologics-atles.png', thumbnail: 'illustracions/m015/miniatures/tres-instruments-meteorologics-atles.jpg' },
        },
      },
      {
        id: 'dos-deserts-temperatures', section: 'extrems', name: 'Dos llocs molt secs i temperatures diferents', ratio: 2280 / 1180,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'El Sàhara es representa amb sorra i roca, i l’interior de l’Antàrtida amb una plana de gel. Tots dos són molt secs.',
        caption: 'Esquemes de dos llocs amb molt poca precipitació. El Sàhara i l’interior de l’Antàrtida tenen paisatges i temperatures diferents.',
        variants: {
          pla: { src: 'illustracions/m015/dos-deserts-temperatures-pla.png', thumbnail: 'illustracions/m015/miniatures/dos-deserts-temperatures-pla.jpg' },
          atles: { src: 'illustracions/m015/dos-deserts-temperatures-atles.png', thumbnail: 'illustracions/m015/miniatures/dos-deserts-temperatures-atles.jpg' },
        },
      },
    ],
    sections: [
      section('temps', 'Una fotografia del temps',
        essencial('El **temps atmosfèric** és l’estat de l’atmosfera en un lloc i un moment concrets.'),
        p('Per descriure’l podem observar els núvols i el vent i mesurar-hi la temperatura o la precipitació. Al mateix lloc pot fer sol al matí i ploure a la tarda.')),
      section('clima', 'El patró que apareix amb els anys',
        essencial('El **clima** descriu les condicions habituals d’un lloc i les seves variacions al llarg de molts anys.'),
        p('Per comparar climes, se solen fer servir períodes de referència de trenta anys. La temperatura mitjana ajuda, però també interessa saber quan plou, com canvien les estacions i quins extrems són més habituals.')),
      section('extrems', 'Quan les condicions són extremes',
        essencial('L’Antàrtida és molt freda i seca. El Sàhara té grans zones molt seques que poden arribar a temperatures molt altes.'),
        p('Un desert és molt sec i també pot ser fred. Una onada de calor és un episodi de temps atmosfèric excepcionalment calorós per al lloc i l’època de l’any, fins i tot en una regió de clima temperat.'),
        box('prova', 'Quines dades ens calen?', 'Per decidir què endur-te demà consulta la previsió. Per investigar si en aquest indret és habitual tenir neu al febrer, de quins anys i mesos miraries dades? Justifica la tria.')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Distingeix el temps del clima i interpreta exemples de condicions extremes.',
    curriculum: [{ row: 'medi:reptes', section: 'extrems', note: 'Distingeix el temps del clima i interpreta exemples de condicions extremes.' }],
    sources: [
      ['Meteocat · Estacions automàtiques', 'https://apidocs.meteocat.gencat.cat/documentacio/dades-de-la-xema/'],
      ['OMM · Períodes climatològics de referència', 'https://community.wmo.int/site/knowledge-hub/programmes-and-initiatives/climate-services/wmo-climatological-normals'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M016', {
    id: 'factors-del-clima',
    title: 'Per què dos llocs tenen climes diferents?',
    intro: 'Dues poblacions poden estar a la mateixa latitud i tenir hiverns diferents. La latitud, el mar i les muntanyes hi influeixen alhora.',
    coverFigure: 'angle-rajos-i-superficie',
    figures: [
      {
        id: 'angle-rajos-i-superficie', section: 'latitud', name: 'Un mateix feix de llum sobre dues superfícies', ratio: 2280 / 1110,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos feixos de la mateixa amplada il·luminen dues superfícies horitzontals. La marca que deixa el feix més inclinat és més llarga.',
        caption: 'Model en tall lateral. A latituds diferents, un feix de rajos pot arribar amb angles diferents. Quan arriba més oblic, es reparteix sobre més superfície.',
        variants: {
          pla: { src: 'illustracions/m016/angle-rajos-i-superficie-pla.png', thumbnail: 'illustracions/m016/miniatures/angle-rajos-i-superficie-pla.jpg' },
          atles: { src: 'illustracions/m016/angle-rajos-i-superficie-atles.png', thumbnail: 'illustracions/m016/miniatures/angle-rajos-i-superficie-atles.jpg' },
        },
      },
      {
        id: 'costa-i-interior-temperatures', section: 'mar', name: 'De la costa a l’interior', ratio: 2280 / 1240,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Temperatures d’hivern, primavera, estiu i tardor. A la costa són 9, 14, 21 i 16 °C. A l’interior són 4, 13, 26 i 17 °C.',
        caption: 'Dades inventades de dues poblacions a la mateixa latitud i a una altitud semblant. Compara la diferència entre el màxim d’estiu i el mínim d’hivern a cada lloc.',
        variants: {
          pla: { src: 'illustracions/m016/costa-i-interior-temperatures-pla.png', thumbnail: 'illustracions/m016/miniatures/costa-i-interior-temperatures-pla.jpg' },
          atles: { src: 'illustracions/m016/costa-i-interior-temperatures-atles.png', thumbnail: 'illustracions/m016/miniatures/costa-i-interior-temperatures-atles.jpg' },
        },
      },
      {
        id: 'aire-humit-i-serralada', section: 'relleu', name: 'La pluja a banda i banda d’una serra', ratio: 2280 / 1305,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'El vent humit entra per l’esquerra, puja pel vessant de l’estació A, es refreda i produeix núvols i precipitació. En passar la carena arriba al vessant de sotavent, on hi ha B.',
        caption: 'Esquema d’una serra amb dues estacions a la mateixa altitud. Imagina per quin vessant pujaria l’aire humit si canviés la direcció del vent.',
        variants: {
          pla: { src: 'illustracions/m016/aire-humit-i-serralada-pla.png', thumbnail: 'illustracions/m016/miniatures/aire-humit-i-serralada-pla.jpg' },
          atles: { src: 'illustracions/m016/aire-humit-i-serralada-atles.png', thumbnail: 'illustracions/m016/miniatures/aire-humit-i-serralada-atles.jpg' },
        },
      },
    ],
    sections: [
      section('factors', 'Llegir el clima amb un mapa',
        essencial('La **latitud**, la proximitat al mar i el **relleu** són alguns dels factors que influeixen en el clima.'),
        p('Per comprovar un factor, és útil comparar llocs tan semblants com sigui possible en la resta de característiques. Un mapa físic ens ajuda a situar cada lloc.')),
      section('latitud', 'La llum arriba amb angles diferents',
        essencial('La **latitud** indica com de lluny som de l’equador cap al nord o cap al sud. A latituds altes els rajos solars solen arribar formant un angle més petit amb l’horitzó.'),
        p('Quan la llum arriba més obliquament, la mateixa energia es reparteix en una superfície més gran. La inclinació de l’eix terrestre també fa variar l’angle de la llum i les hores de dia amb les estacions.')),
      section('mar', 'A prop del mar, canvis més suaus',
        essencial('El **mar** s’escalfa i es refreda més lentament que la terra. Per això molts llocs costaners tenen temperatures menys extremes que llocs semblants de l’interior.'),
        p('Una serralada prop de la costa pot frenar l’entrada d’aire humit cap a l’interior. També hi influeixen la direcció dels vents dominants i els corrents marins.')),
      section('relleu', 'Pujar d’altitud i canviar de vessant',
        essencial('En general, la temperatura baixa quan augmenta l’**altitud**. Un vessant pot rebre més pluja que l’altre.'),
        p('Quan aire humit és empès muntanya amunt, es refreda i es poden formar núvols i precipitació. A l’altre vessant, que queda a sotavent, l’aire pot arribar més sec.'),
        box('prova', 'Canvia un sol factor', 'Dissenya dues comparacions. A la primera, fes variar només la distància al mar. A la segona, només l’altitud. Quines altres característiques procuraries mantenir iguals?')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Relaciona la latitud, la distància al mar, el relleu i l’altitud amb diferències de temperatura i precipitació.',
    curriculum: [{ row: 'medi:reptes', section: 'relleu', note: 'Relaciona la latitud, la distància al mar, el relleu i l’altitud amb diferències de temperatura i precipitació.' }],
    sources: [
      ['IGN · Atles didàctic del clima', 'https://educativo.ign.es/atlas-didactico/clima-eso/'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M017', {
    id: 'zones-climatiques',
    title: 'De les zones climàtiques als climogrames',
    intro: 'D’una regió polar a una costa mediterrània canvien les temperatures i les pluges. Els mapes de clima i els climogrames ens permeten llegir aquests patrons de dues maneres.',
    coverFigure: 'climograma-lloc-c',
    figures: [
      {
        id: 'climograma-lloc-c', section: 'dades', name: 'Un climograma de dotze mesos', ratio: 2280 / 1330,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dotze mesos amb barres de precipitació en mm i una línia de temperatura en °C. Al juliol s’arriba a la temperatura més alta i a la precipitació més baixa. A l’octubre la barra de precipitació és la més alta.',
        caption: 'Estació C i dades inventades. Les barres es llegeixen amb l’eix de precipitació i la línia amb el de temperatura.',
        variants: {
          pla: { src: 'illustracions/m017/climograma-lloc-c-pla.png', thumbnail: 'illustracions/m017/miniatures/climograma-lloc-c-pla.jpg' },
          atles: { src: 'illustracions/m017/climograma-lloc-c-atles.png', thumbnail: 'illustracions/m017/miniatures/climograma-lloc-c-atles.jpg' },
        },
      },
      {
        id: 'franges-climatiques-terra', section: 'terra', name: 'Grans franges climàtiques de la Terra', ratio: 2280 / 1315,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Planisferi amb una franja càlida entre els tròpics, dues de temperades i dues de fredes als extrems. Les categories porten ratlles diagonals, línies horitzontals o punts.',
        caption: 'Franges climàtiques orientatives. El relleu i altres factors contribueixen a explicar els climes locals.',
        credit: 'Natural Earth a 1:110 milions.',
        variants: {
          pla: { src: 'illustracions/m017/franges-climatiques-terra-pla.png', thumbnail: 'illustracions/m017/miniatures/franges-climatiques-terra-pla.jpg' },
          atles: { src: 'illustracions/m017/franges-climatiques-terra-atles.png', thumbnail: 'illustracions/m017/miniatures/franges-climatiques-terra-atles.jpg' },
        },
      },
      {
        id: 'referents-climatics-europa', section: 'europa', name: 'Cinc referents climàtics a Europa', ratio: 2280 / 1455,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa amb l’exemple oceànic a l’oest d’Irlanda, el continental a l’est de Polònia, el mediterrani al litoral valencià, el d’alta muntanya als Alps i el polar a Svalbard.',
        caption: 'Cinc exemples locals de climes de regions més àmplies. El requadre permet trobar l’exemple polar a Svalbard.',
        credit: 'NOAA/NCEI ETOPO 2022 i Natural Earth.',
        variants: {
          pla: { src: 'illustracions/m017/referents-climatics-europa-pla.png', thumbnail: 'illustracions/m017/miniatures/referents-climatics-europa-pla.jpg' },
          atles: { src: 'illustracions/m017/referents-climatics-europa-atles.png', thumbnail: 'illustracions/m017/miniatures/referents-climatics-europa-atles.jpg' },
        },
      },
    ],
    sections: [
      section('terra', 'Zones fredes, temperades i càlides',
        essencial('En general, a la Terra distingim zones **càlides** prop de l’equador, **temperades** a latituds mitjanes i **fredes** cap als pols.'),
        p('Aquesta distribució és una primera aproximació. Dins d’una mateixa zona climàtica, el relleu, els vents i la humitat poden fer que paisatges pròxims siguin ben diferents.')),
      section('europa', 'Els contrastos climàtics d’Europa',
        essencial('A Europa hi ha climes **polars** a l’extrem nord, **oceànics** a l’oest, **continentals** cap a l’interior i **mediterranis** en parts del sud. També hi ha climes d’**alta muntanya**.'),
        p('Al litoral atlàntic solen ser més suaus les temperatures i més repartides les pluges. Cap a l’interior sovint hi ha més contrast entre estiu i hivern. A moltes costes mediterrànies l’estiu és sec. Les muntanyes introdueixen canvis d’altitud que un mapa per latituds no mostra.')),
      section('dades', 'D’una estació a un gràfic de dotze mesos',
        essencial('Una estació meteorològica mesura el temps. Un **climograma** mostra la temperatura mitjana i la precipitació per mesos d’un període.'),
        p('En un climograma, la línia sol representar la temperatura en graus Celsius i les barres, els mil·límetres de precipitació. El mapa climàtic mostra on es distribueixen els climes. Llegeix la llegenda abans de comparar llocs.'),
        box('prova', 'Un estiu sec?', 'En un exemple inventat, al gener hi ha 7 °C i 58 mm i al juliol, 24 °C i 9 mm. Dibuixa les dues barres i marca les temperatures en un altre eix. Què podem dir d’aquests dos mesos? Què ens falta per descriure tot el clima?')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Compara les grans zones climàtiques, els climes europeus i les dades que recull un climograma.',
    curriculum: [{ row: 'medi:reptes', section: 'dades', note: 'Compara les grans zones climàtiques, els climes europeus i les dades que recull un climograma.' }],
    sources: [
      ['Natural Earth · Vectors físics a 1:110 milions', 'https://www.naturalearthdata.com/downloads/110m-physical-vectors/'],
      ['Natural Earth · Vectors físics a 1:10 milions', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M018', {
    id: 'climes-espanya-catalunya',
    title: 'Del litoral atlàntic al Mediterrani i les Canàries',
    intro: 'En un mateix viatge per la Península i les illes podem trobar pluges regulars, estius secs o neu hivernal. Mirem com es reparteixen aquests patrons.',
    coverFigure: 'referents-clima-espanya-catalunya',
    figures: [
      {
        id: 'referents-clima-espanya-catalunya', section: 'atlantic', name: 'Cinc referents climàtics i un detall de Catalunya', ratio: 2280 / 1460,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa amb exemples climàtics al nord-oest, a les Canàries, als Pirineus, a la Meseta i al litoral mediterrani. Un mapa de Catalunya situa la Val d’Aran, els Pirineus, la Plana de Lleida i el Barcelonès.',
        caption: 'Mapa de referents climàtics. Els símbols indiquen llocs representatius. Les transicions entre climes són graduals.',
        credit: 'NOAA/NCEI ETOPO 2022, Natural Earth i © EuroGeographics pels límits de Catalunya.',
        variants: {
          pla: { src: 'illustracions/m018/referents-clima-espanya-catalunya-pla.png', thumbnail: 'illustracions/m018/miniatures/referents-clima-espanya-catalunya-pla.jpg' },
          atles: { src: 'illustracions/m018/referents-clima-espanya-catalunya-atles.png', thumbnail: 'illustracions/m018/miniatures/referents-clima-espanya-catalunya-atles.jpg' },
        },
      },
      {
        id: 'climogrames-a-b', section: 'litoral', name: 'Dos climes llegits en dos gràfics', ratio: 2280 / 1510,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos climogrames de dotze mesos, amb barres de precipitació fins a 160 mm i una línia de temperatura fins a 32 °C. El lloc A té un mínim de pluja molt marcat al juliol. El lloc B té barres més altes la major part de l’any.',
        caption: 'Dades inventades per comparar patrons. Els dos gràfics tenen les mateixes escales.',
        variants: {
          pla: { src: 'illustracions/m018/climogrames-a-b-pla.png', thumbnail: 'illustracions/m018/miniatures/climogrames-a-b-pla.jpg' },
          atles: { src: 'illustracions/m018/climogrames-a-b-atles.png', thumbnail: 'illustracions/m018/miniatures/climogrames-a-b-atles.jpg' },
        },
      },
      {
        id: 'vessants-illa-canaria', section: 'subtropical', name: 'Un vessant amb núvols i un altre de més sec', ratio: 1200 / 775,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Illa amb fletxa d’alisis entrant pel nord, núvols a mig vessant i menys núvols al sud en aquest exemple.',
        caption: 'Tall esquemàtic. En algunes illes, els alisis aporten aire humit i afavoreixen la formació de núvols al vessant nord.',
        variants: {
          pla: { src: 'illustracions/m018/vessants-illa-canaria-pla.png', thumbnail: 'illustracions/m018/miniatures/vessants-illa-canaria-pla.jpg' },
          atles: { src: 'illustracions/m018/vessants-illa-canaria-atles.png', thumbnail: 'illustracions/m018/miniatures/vessants-illa-canaria-atles.jpg' },
        },
      },
    ],
    sections: [
      section('atlantic', 'Pluges repartides a l’àrea atlàntica',
        essencial('Al nord i nord-oest peninsular hi ha zones de **clima atlàntic**, amb pluges freqüents i temperatures generalment moderades prop de la costa.'),
        p('A Catalunya, la **Val d’Aran** rep influència oceànica. Queda principalment al vessant nord dels Pirineus i s’obre cap a la conca de la Garona.')),
      section('subtropical', 'El clima subtropical de les Canàries',
        essencial('Les **Canàries** tenen un clima subtropical amb temperatures suaus durant bona part de l’any a moltes zones baixes.'),
        p('L’altitud i els vents alisis fan que hi hagi diferències marcades. En algunes illes, el vessant nord acumula més núvols i humitat que parts del sud.')),
      section('muntanya', 'Fred i neu als sectors més alts',
        essencial('El **clima de muntanya** es relaciona amb l’altitud. A les zones altes solen fer temperatures més baixes i hi pot nevar a l’hivern.'),
        p('Als Pirineus hi ha diferències entre fons de vall, vessants i cims. La neu és una forma de precipitació i pot restar al sòl durant mesos en alguns llocs.')),
      section('interior', 'L’interior mediterrani marca més contrast',
        essencial('En moltes zones **mediterrànies d’interior**, els hiverns són més freds i els estius més calorosos que a la costa.'),
        p('A l’interior peninsular i en sectors com la plana de Lleida, l’allunyament de la mar facilita contrastos tèrmics. Les temperatures i les pluges també canvien segons l’altitud i el relleu local.')),
      section('litoral', 'La Mediterrània a prop del mar',
        essencial('A bona part del litoral mediterrani els estius són secs i calorosos i els hiverns, relativament suaus.'),
        p('Les pluges poden concentrar-se en alguns episodis de tardor o primavera. Comparar el Barcelonès i una estació de l’interior amb dades del mateix període ajuda a veure quins contrastos es repeteixen.'),
        box('prova', 'Quin patró et sembla més probable?', 'En un lloc litoral, el gener és suau i el juliol sec. En un altre, hi ha pluges freqüents en totes les estacions i hiverns suaus. Quin et recorda més un clima mediterrani litoral i quin un d’atlàntic? Què comprovaries en un climograma?')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Identifica patrons atlàntics, subtropicals, de muntanya i mediterranis a Espanya i Catalunya.',
    curriculum: [{ row: 'medi:reptes', section: 'litoral', note: 'Identifica patrons atlàntics, subtropicals, de muntanya i mediterranis a Espanya i Catalunya.' }],
    sources: [
      ['Natural Earth · Vectors físics a 1:10 milions', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Eurostat/GISCO · Límits NUTS 2024', 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/nuts-2024-files.html'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M019', {
    id: 'vegetacio-espanya-catalunya',
    title: 'Els paisatges que formen les plantes',
    intro: 'Un bosc humit, una pineda de muntanya i una màquia litoral poden assemblar-se de lluny i ser molt diferents de prop. L’aigua, les temperatures, el sòl i els usos humans hi tenen a veure.',
    coverFigure: 'quatre-paisatges-vegetals',
    figures: [
      {
        id: 'quatre-paisatges-vegetals', section: 'subtropical', name: 'Quatre paisatges en paral·lel', ratio: 2280 / 1440,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Bosc humit amb núvols a les Canàries, prat delimitat per una tanca i un bosc caducifoli a l’àrea atlàntica, prat per sobre del bosc a l’alta muntanya i alzines disperses amb matollar a l’àrea mediterrània.',
        caption: 'Quatre exemples de paisatges vegetals. Compara on creixen els arbres, com és el matollar i quines pistes mostren l’ús del sòl.',
        variants: {
          pla: { src: 'illustracions/m019/quatre-paisatges-vegetals-pla.png', thumbnail: 'illustracions/m019/miniatures/quatre-paisatges-vegetals-pla.jpg' },
          atles: { src: 'illustracions/m019/quatre-paisatges-vegetals-atles.png', thumbnail: 'illustracions/m019/miniatures/quatre-paisatges-vegetals-atles.jpg' },
        },
      },
      {
        id: 'vegetacio-vessant-canari', section: 'subtropical', name: 'De les plantes de zones baixes al bosc humit', ratio: 2280 / 1190,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Un cardonal de tiges suculentes creix a baix. La laurisilva ocupa el sector humit amb núvols. Les capçades dels pins destaquen més amunt. Les formacions es barregen als límits.',
        caption: 'Vessant idealitzat. La distribució del cardonal, la laurisilva i la pineda canària varia segons l’illa, l’orientació i l’altitud.',
        variants: {
          pla: { src: 'illustracions/m019/vegetacio-vessant-canari-pla.png', thumbnail: 'illustracions/m019/miniatures/vegetacio-vessant-canari-pla.jpg' },
          atles: { src: 'illustracions/m019/vegetacio-vessant-canari-atles.png', thumbnail: 'illustracions/m019/miniatures/vegetacio-vessant-canari-atles.jpg' },
        },
      },
      {
        id: 'fulla-d-alzina', section: 'mediterrania', name: 'Una fulla en temps sec', ratio: 1200 / 1010,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Anvers i revers de la mateixa forma de fulla, a la mateixa escala. L’anvers és més fosc i el revers mostra els nervis. Un detall mostra el gruix de la fulla coriàcia.',
        caption: 'Model d’una fulla adulta d’alzina. L’anvers és més fosc i el revers és més clar. El detall ampliat mostra la làmina gruixuda.',
        variants: {
          pla: { src: 'illustracions/m019/fulla-d-alzina-pla.png', thumbnail: 'illustracions/m019/miniatures/fulla-d-alzina-pla.jpg' },
          atles: { src: 'illustracions/m019/fulla-d-alzina-atles.png', thumbnail: 'illustracions/m019/miniatures/fulla-d-alzina-atles.jpg' },
        },
      },
    ],
    sections: [
      section('subtropical', 'Canàries, del cardonal a la laurisilva',
        essencial('A les **Canàries**, la vegetació varia amb l’altitud i la humitat. En sectors humits hi pot créixer la **laurisilva**.'),
        p('Hi ha zones baixes força seques amb plantes com els cardons, boscos humits amb vegetació adaptada a l’aigua dels núvols i pinedes canàries a sectors més elevats. La distribució varia entre illes.')),
      section('atlantic', 'Boscos i prats de les zones humides',
        essencial('A les zones de clima **atlàntic** hi ha prats verds i boscos de fulla caduca, amb espècies com roures i faigs, segons el lloc.'),
        p('Els prats també poden ser resultat de la sega i el pasturatge. Els arbres que perden la fulla ho fan de manera estacional. L’alçada, el sòl i l’activitat humana ajuden a explicar per què no hi ha el mateix bosc a tot arreu.')),
      section('muntanya', 'La vegetació canvia quan pugem',
        essencial('A les muntanyes trobem diferents **estatges de vegetació**. Als Pirineus, per damunt de molts boscos hi ha prats d’alta muntanya.'),
        p('El pi negre arriba a altituds elevades en moltes zones pirinenques. L’orientació del vessant i la durada de la neu poden fer canviar la vegetació a la mateixa cota.'),
        box('prova', 'Tres fotos en un mapa', 'Imagina una foto de laurisilva, una de prat alpí i una de màquia. Assigna-les a un lloc probable i escriu una pista del clima o del relleu que sostingui cada decisió.')),
      section('mediterrania', 'Créixer quan l’estiu és sec',
        essencial('En moltes zones mediterrànies podem trobar **alzines**, **pins** i matollars. Algunes plantes tenen fulles dures o petites que ajuden a limitar la pèrdua d’aigua.'),
        p('A Catalunya hi ha alzinars, suredes, pinedes i màquies. El paisatge actual també és fruit de conreus, incendis, tala i abandonament de camps. El clima és una pista important, però hi ha altres factors.')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Relaciona vegetació mediterrània, atlàntica, subtropical i de muntanya amb condicions del medi.',
    curriculum: [{ row: 'medi:reptes', section: 'muntanya', note: 'Relaciona vegetació mediterrània, atlàntica, subtropical i de muntanya amb condicions del medi.' }],
    sources: [
      ['Govern de Canàries · Ecosistemes terrestres zonals', 'https://www.gobiernodecanarias.org/medioambiente/materias/biodiversidad/antiguo__biodiversidad-canaria/ecosistemas-terrestres-zonales/'],
      ['Herbari Virtual de la UIB · Quercus ilex', 'https://herbarivirtual.uib.es/ca/general/170/especie/quercus-ilex-l-subsp-ilex'],
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
    ],
  });

  addTopic('M020', {
    id: 'canvi-climatic-causes',
    title: 'El clima canvia, busquem-ne les causes',
    intro: 'El nostre planeta reté una part de l’energia que rep del Sol. Quan canvia la quantitat de gasos que hi ha a l’atmosfera, també canvia aquest equilibri.',
    coverFigure: 'energia-i-efecte-hivernacle',
    figures: [
      {
        id: 'energia-i-efecte-hivernacle', section: 'hivernacle', name: 'Com es reparteix l’energia', ratio: 2280 / 1210,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Fletxes contínues mostren la llum solar cap a la superfície. Fletxes discontínues mostren la radiació infraroja que emet la superfície, la que arriba a l’espai i la que els gasos reemeten cap a l’espai i cap a la superfície.',
        caption: 'Esquema de l’efecte hivernacle natural. Les fletxes indiquen recorreguts qualitatius. Alguns gasos absorbeixen part de la radiació infraroja i en tornen a emetre en diverses direccions.',
        variants: {
          pla: { src: 'illustracions/m020/energia-i-efecte-hivernacle-pla.png', thumbnail: 'illustracions/m020/miniatures/energia-i-efecte-hivernacle-pla.jpg' },
          atles: { src: 'illustracions/m020/energia-i-efecte-hivernacle-atles.png', thumbnail: 'illustracions/m020/miniatures/energia-i-efecte-hivernacle-atles.jpg' },
        },
      },
      {
        id: 'dies-per-sobre-del-llindar', section: 'canvi', name: 'Un recompte en dos períodes', ratio: 2280 / 1170,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dues barres comencen a zero. La del període A arriba a 4 dies i la del període B a 15 dies, a la mateixa estació i amb el mateix llindar.',
        caption: 'Exemple inventat amb dos períodes de la mateixa durada. Quins altres registres podríem consultar per saber si el canvi es manté?',
        variants: {
          pla: { src: 'illustracions/m020/dies-per-sobre-del-llindar-pla.png', thumbnail: 'illustracions/m020/miniatures/dies-per-sobre-del-llindar-pla.jpg' },
          atles: { src: 'illustracions/m020/dies-per-sobre-del-llindar-atles.png', thumbnail: 'illustracions/m020/miniatures/dies-per-sobre-del-llindar-atles.jpg' },
        },
      },
      {
        id: 'dues-maneres-d-actuar', section: 'efectes', name: 'Actuar sobre la causa i preparar-se per als efectes', ratio: 2280 / 1380,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'A l’esquerra, baixen els trajectes en cotxe i algunes persones caminen fins a l’escola. A la dreta, s’obre un local de barri i s’hi veuen persones a l’ombra de l’entrada.',
        caption: 'Dues seqüències esquemàtiques. Una escola fa a peu part dels trajectes curts i un barri obre un espai fresc durant les hores de més calor.',
        variants: {
          pla: { src: 'illustracions/m020/dues-maneres-d-actuar-pla.png', thumbnail: 'illustracions/m020/miniatures/dues-maneres-d-actuar-pla.jpg' },
          atles: { src: 'illustracions/m020/dues-maneres-d-actuar-atles.png', thumbnail: 'illustracions/m020/miniatures/dues-maneres-d-actuar-atles.jpg' },
        },
      },
    ],
    sections: [
      section('hivernacle', 'L’efecte hivernacle, un procés natural',
        essencial('Alguns gasos de l’atmosfera absorbeixen i tornen a emetre part de l’energia que la Terra envia cap a l’espai. Aquest procés és l’**efecte hivernacle**.'),
        p('La superfície rep energia solar i emet energia en forma de radiació infraroja. Gasos com el vapor d’aigua, el diòxid de carboni i el metà hi intervenen. L’efecte hivernacle natural contribueix a mantenir la Terra més càlida.')),
      section('canvi', 'El clima es mesura en períodes llargs',
        essencial('El **canvi climàtic** és un canvi durador en patrons com la temperatura, la pluja o la freqüència d’alguns extrems.'),
        p('Una tarda de fred no ens diu si el planeta s’escalfa. Per detectar el canvi cal comparar mesures de períodes llargs i de molts llocs. Les dades actuals mostren un escalfament global.')),
      section('causes', 'D’on venen els gasos afegits?',
        essencial('La causa principal de l’escalfament global actual són les **emissions humanes de gasos d’efecte hivernacle**.'),
        p('Cremar carbó, petroli i gas allibera diòxid de carboni. Algunes pràctiques ramaderes i altres activitats emeten metà. Els canvis d’ús del sòl també poden alliberar carboni i reduir-ne l’absorció per la vegetació.')),
      section('efectes', 'Canvis que ja poden afectar el paisatge',
        essencial('Un planeta més càlid afavoreix onades de calor més intenses en moltes regions i fa pujar el nivell del mar.'),
        p('El nivell del mar puja perquè l’aigua s’expandeix en escalfar-se i perquè hi arriba aigua del gel continental. Els efectes varien segons el lloc. Reduir emissions actua sobre la causa. Augmentar l’ombra als carrers ajuda a adaptar-nos a la calor.'),
        box('prova', 'Actuar de dues maneres', 'Compara substituir un trajecte en cotxe per un en tren quan sigui viable i crear zones d’ombra al pati. Quina mesura pot reduir emissions i quina ajuda a suportar millor la calor?')),
    ],
  }, {
    collection: { id: 'clima', title: 'El clima i la vegetació' },
    theme: 'Clima i paisatge',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Explica l’efecte hivernacle i relaciona les emissions humanes amb l’escalfament i els impactes climàtics.',
    curriculum: [{ row: 'medi:ecosocial', section: 'efectes', note: 'Explica l’efecte hivernacle i relaciona les emissions humanes amb l’escalfament i els impactes climàtics.' }],
    sources: [
      ['IPCC · AR6, bases físiques', 'https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-1/'],
      ['IPCC · Informe de síntesi sobre el canvi climàtic', 'https://www.ipcc.ch/report/ar6/syr/resources/spm-headline-statements/'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
    ],
  });

  addTopic('M021', {
    id: 'etapes-prehistoria',
    title: 'Tres maneres de mirar la prehistòria',
    intro: 'Una eina de pedra, una olla i un estri de ferro poden donar pistes sobre moments diferents del passat. Les etapes ens ajuden a ordenar-les.',
    coverFigure: 'tres-escenes-prehistoria',
    figures: [
      {
        id: 'tres-escenes-prehistoria', section: 'paleolitic', name: 'Tres escenes i pistes per observar', ratio: 2280 / 1430,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Al paleolític, un grup recull fruits i hi ha una eina de pedra tallada. Al neolític, hi ha un camp, cabanes i un recipient de ceràmica. A les edats dels metalls, un intercanvi reuneix peces de metall, pedra i fusta.',
        caption: 'Reconstruccions esquemàtiques. Els canvis es van produir en moments diferents segons el lloc. Cerca un material que aparegui en més d’una escena.',
        variants: {
          pla: { src: 'illustracions/m021/tres-escenes-prehistoria-pla.png', thumbnail: 'illustracions/m021/miniatures/tres-escenes-prehistoria-pla.jpg' },
          atles: { src: 'illustracions/m021/tres-escenes-prehistoria-atles.png', thumbnail: 'illustracions/m021/miniatures/tres-escenes-prehistoria-atles.jpg' },
        },
      },
      {
        id: 'materials-en-tres-restes', section: 'metalls', name: 'Tres materials, tres detalls', ratio: 2280 / 1130,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un estri de sílex amb una vora tallada, un fragment decorat de ceràmica amb secció visible i una peça corbada de bronze. Sota el bronze apareixen els rètols coure i estany units amb un signe més.',
        caption: 'Tres models de peces. Compara el tall del sílex, la secció de l’argila i la superfície del bronze. Cada vinyeta té escala pròpia.',
        variants: {
          pla: { src: 'illustracions/m021/materials-en-tres-restes-pla.png', thumbnail: 'illustracions/m021/miniatures/materials-en-tres-restes-pla.jpg' },
          atles: { src: 'illustracions/m021/materials-en-tres-restes-atles.png', thumbnail: 'illustracions/m021/miniatures/materials-en-tres-restes-atles.jpg' },
        },
      },
      {
        id: 'fogar-en-dos-contextos', section: 'neolitic', name: 'La mateixa pista en dos contextos', ratio: 2280 / 1190,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'El retall A té un fogar, peces de sílex i ossos d’animals. El retall B té un fogar, grans de cereal i un fragment de recipient.',
        caption: 'Dos conjunts inventats per practicar la interpretació. El fogar és comú als dos retalls. Què hi afegeixen les altres restes?',
        variants: {
          pla: { src: 'illustracions/m021/fogar-en-dos-contextos-pla.png', thumbnail: 'illustracions/m021/miniatures/fogar-en-dos-contextos-pla.jpg' },
          atles: { src: 'illustracions/m021/fogar-en-dos-contextos-atles.png', thumbnail: 'illustracions/m021/miniatures/fogar-en-dos-contextos-atles.jpg' },
        },
      },
    ],
    sections: [
      section('paleolitic', 'El paleolític, seguir els recursos',
        essencial('Durant el **paleolític**, les persones obtenien aliments caçant, pescant i recollint plantes i fruits.'),
        p('Molts grups es desplaçaven segons l’estació i els recursos. Fabricaven eines de pedra tallada, d’os i de fusta. La **prehistòria** és el nom que donem, en cada lloc, al passat humà anterior a les primeres fonts escrites disponibles.')),
      section('neolitic', 'Sembrar, criar animals i tornar a un lloc',
        essencial('Al **neolític** alguns grups van començar a cultivar plantes i criar animals.'),
        p('En molts llocs es van establir en poblats durant períodes més llargs. La caça i la recol·lecció van continuar. Aquestes maneres de viure van aparèixer en moments diferents segons la regió.')),
      section('metalls', 'Conèixer materials nous',
        essencial('En les **edats dels metalls**, diferents societats van aprendre a treballar el coure, el bronze i el ferro.'),
        p('El bronze sol ser una barreja de coure i estany. Les eines de pedra, de fusta i d’os van continuar en ús. L’intercanvi permetia que materials i objectes circulessin entre poblats.'),
        box('prova', 'Classifica amb una pista', 'Relaciona un fogar amb eines de sílex, un poblat amb cereals i una ferreria amb les tres etapes. Podria haver-hi un fogar en més d’una etapa? Explica què miraries per decidir.')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Ordena el paleolític, el neolític i les edats dels metalls i compara canvis en la vida quotidiana.',
    curriculum: [{ row: 'medi:passat', section: 'metalls', note: 'Ordena el paleolític, el neolític i les edats dels metalls i compara canvis en la vida quotidiana.' }],
    sources: [
      ['Visitmuseum · Jaciment neolític de la Draga', 'https://visitmuseum.gencat.cat/ca/museu/poblat-neolitic-de-la-draga/recorregut/jaciment-neolitic-de-la-draga'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
    ],
  });

  addTopic('M022', {
    id: 'campament-paleolitic',
    title: 'Pistes d’un campament paleolític',
    intro: 'Si només ens quedessin unes pedres tallades i un cercle de cendres, podríem descobrir com s’organitzava un campament?',
    coverFigure: 'planta-campament-i-fogar',
    figures: [
      {
        id: 'planta-campament-i-fogar', section: 'refugi', name: 'Plànol esquemàtic d’un campament', ratio: 2280 / 1330,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Planta d’una balma amb la línia del sortint de roca i una zona excavada discontínua. Dins del perímetre hi ha un fogar amb cendra i carbó, peces de pedra i ossos.',
        caption: 'Campament fictici en un plànol esquemàtic. Localitza els objectes prop del fogar i pensa quines altres pistes permetrien comprovar la teva interpretació.',
        variants: {
          pla: { src: 'illustracions/m022/planta-campament-i-fogar-pla.png', thumbnail: 'illustracions/m022/miniatures/planta-campament-i-fogar-pla.jpg' },
          atles: { src: 'illustracions/m022/planta-campament-i-fogar-atles.png', thumbnail: 'illustracions/m022/miniatures/planta-campament-i-fogar-atles.jpg' },
        },
      },
      {
        id: 'rascador-cendra-i-agulla', section: 'estris', name: 'Tres restes que es poden examinar', ratio: 2280 / 1110,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres retalls en fons clar. El rascador mostra retocs de la vora, la cendra té fragments de carbó i l’agulla d’os té un forat. Les dues peces sòlides tenen barra d’escala.',
        caption: 'Models de tres restes. Fixa’t en la vora treballada, la cendra amb carbó i el forat de l’agulla.',
        variants: {
          pla: { src: 'illustracions/m022/rascador-cendra-i-agulla-pla.png', thumbnail: 'illustracions/m022/miniatures/rascador-cendra-i-agulla-pla.jpg' },
          atles: { src: 'illustracions/m022/rascador-cendra-i-agulla-atles.png', thumbnail: 'illustracions/m022/miniatures/rascador-cendra-i-agulla-atles.jpg' },
        },
      },
      {
        id: 'figures-paleolitiques-a-la-roca', section: 'pintures', name: 'Figures en una paret de roca', ratio: 1200 / 800,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Una paret de roca mostra un animal amb cornamenta, un grup de punts foscos i el contorn clar d’una mà envoltat de pigment ocre.',
        caption: 'Recreació original de tres formes d’art rupestre. S’hi veuen una figura animal, punts i una mà en negatiu. El seu significat queda obert a interpretació.',
        variants: {
          pla: { src: 'illustracions/m022/figures-paleolitiques-a-la-roca-pla.png', thumbnail: 'illustracions/m022/miniatures/figures-paleolitiques-a-la-roca-pla.jpg' },
          atles: { src: 'illustracions/m022/figures-paleolitiques-a-la-roca-atles.png', thumbnail: 'illustracions/m022/miniatures/figures-paleolitiques-a-la-roca-atles.jpg' },
        },
      },
    ],
    sections: [
      section('refugi', 'Entre coves, balmes i aire lliure',
        essencial('Els grups paleolítics podien instal·lar-se **a l’aire lliure**, en coves o sota una balma.'),
        p('Una balma és un sortint de roca que ofereix refugi. A prop podien buscar aigua i aliments. Les coves conserven restes durant molt de temps, però només mostren una part dels llocs on es vivia.')),
      section('estris', 'Eines per a feines diferents',
        essencial('Amb pedra, os i fusta, els grups fabricaven **eines** per tallar, rascar o treballar altres materials.'),
        p('Una vora esmolada podia ajudar a tallar carn o fibres. Un rascador permetia preparar pells. Les marques d’ús són una pista sobre quina feina s’hi va fer.')),
      section('foc', 'El foc al centre de moltes activitats',
        essencial('El **foc** servia per escalfar-se, il·luminar i preparar aliments.'),
        p('Les restes d’un fogar poden incloure carbó, cendra i ossos cremats. Saber on són respecte de les eines ajuda a imaginar com es repartien algunes feines.')),
      section('pintures', 'Figures sobre la roca',
        essencial('Algunes persones del paleolític van representar **animals, signes i mans** a les parets i sostres de coves.'),
        p('Per fer els colors es podien usar pigments com els ocres i el carbó. Les figures aporten pistes sobre què es representava, però sovint desconeixem què significaven per als seus autors.')),
      section('vestits', 'Roba que costa de conservar',
        essencial('Les persones podien preparar **pells** per protegir-se del fred.'),
        p('Com que les pells es desfan amb el temps, agulles d’os i rascadors poden ser pistes indirectes. Una agulla indica que es podia cosir, però no ens diu com era qualsevol peça de roba.'),
        box('prova', 'Fes d’arqueòleg', 'Imagina que trobes un rascador, cendra i una agulla d’os. Per a cada resta, escriu una observació i una possible explicació. Quina explicació voldries confirmar amb una altra pista?')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum i textura als paisatges i més contrast als gràfics.' },
    ],
    description: 'Interpreta refugis, eines, foc, pintures i vestits a partir de les restes que es poden conservar.',
    curriculum: [{ row: 'medi:passat', section: 'vestits', note: 'Interpreta refugis, eines, foc, pintures i vestits a partir de les restes que es poden conservar.' }],
    sources: [
      ['IPHES · Abric Romaní', 'https://www.iphes.cat/ca/abric-roman%C3%AD'],
      ['Museu d’Arqueologia de Catalunya · Art primer', 'https://artprimer.mac.cat/wp-content/uploads/2020/10/MAC_CATALEG_ARTPRIMER.pdf'],
      ['IPHES · Memòria d’excavació de l’Abric Romaní', 'https://calaix.gencat.cat/bitstream/handle/10687/457382/qmem16402.pdf?sequence=1'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
    ],
  });

  addTopic('M023', {
    id: 'poblat-neolitic',
    title: 'Un poblat neolític, feina a feina',
    intro: 'A tocar d’un estany hi ha camps, cabanes i espais on es treballa la fusta. Cadascun deixa pistes diferents sobre com vivia la gent.',
    coverFigure: 'poblat-i-estany-de-banyoles',
    figures: [
      {
        id: 'poblat-i-estany-de-banyoles', section: 'poblats', name: 'Un poblat vora l’estany de Banyoles', ratio: 2280 / 1440,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Vista elevada d’un poblat vora l’estany amb cabanes, conreu i persones en un espai de feina. Un tall esquemàtic mostra fusta en un sòl saturat d’aigua.',
        caption: 'Reconstrucció didàctica inspirada en la Draga. Al sòl saturat d’aigua hi ha poc oxigen, un fet que pot alentir la descomposició de materials orgànics com la fusta.',
        variants: {
          pla: { src: 'illustracions/m023/poblat-i-estany-de-banyoles-pla.png', thumbnail: 'illustracions/m023/miniatures/poblat-i-estany-de-banyoles-pla.jpg' },
          atles: { src: 'illustracions/m023/poblat-i-estany-de-banyoles-atles.png', thumbnail: 'illustracions/m023/miniatures/poblat-i-estany-de-banyoles-atles.jpg' },
        },
      },
      {
        id: 'fibres-fils-i-teixit', section: 'teixit', name: 'De la fibra al teixit', ratio: 1200 / 680,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Tres vinyetes connectades mostren fibres soltes, un fil torçat i un teixit amb fils que passen alternativament per damunt i per sota.',
        caption: 'De les fibres soltes al fil torçat. Els fils longitudinals i transversals s’entrecreuen a l’esquema del teixit.',
        variants: {
          pla: { src: 'illustracions/m023/fibres-fils-i-teixit-pla.png', thumbnail: 'illustracions/m023/miniatures/fibres-fils-i-teixit-pla.jpg' },
          atles: { src: 'illustracions/m023/fibres-fils-i-teixit-atles.png', thumbnail: 'illustracions/m023/miniatures/fibres-fils-i-teixit-atles.jpg' },
        },
      },
      {
        id: 'estris-i-recipients-neolitics', section: 'estris', name: 'Quatre estris, feines diferents', ratio: 2280 / 1115,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una falç corba amb peces de sílex, un molí de mà amb dues pedres, un recipient de ceràmica amb boca ampla i una aixa amb la fulla travessada respecte al mànec.',
        caption: 'Quatre models d’estris neolítics. Observa com es combinen materials i formes abans d’escollir quin estri faries servir per a cada feina.',
        variants: {
          pla: { src: 'illustracions/m023/estris-i-recipients-neolitics-pla.png', thumbnail: 'illustracions/m023/miniatures/estris-i-recipients-neolitics-pla.jpg' },
          atles: { src: 'illustracions/m023/estris-i-recipients-neolitics-atles.png', thumbnail: 'illustracions/m023/miniatures/estris-i-recipients-neolitics-atles.jpg' },
        },
      },
    ],
    sections: [
      section('poblats', 'Fer vida a prop dels conreus',
        essencial('Al **neolític**, molts poblats eren prop d’aigua i de terres que es podien conrear.'),
        p('Les cabanes es feien amb materials de l’entorn, com fusta i fibres. A la Draga, a Banyoles, s’han conservat elements de fusta gràcies a un medi humit que n’ha alentit la descomposició.')),
      section('teixit', 'De la fibra al fil',
        essencial('Per fer un **teixit** cal transformar fibres en fils i entrecreuar-los.'),
        p('Alguns estris relacionats amb el filat i el teixit s’han conservat millor que la roba. També hi ha cistells i cordes de fibres vegetals en alguns jaciments.')),
      section('ceramica', 'Recipients que guarden els aliments',
        essencial('La **ceràmica** es fa donant forma a l’argila i coent-la.'),
        p('Una olla pot servir per cuinar o contenir aigua. Un recipient gran permet guardar aliments. La forma, les restes i el lloc on s’ha trobat ajuden a interpretar-ne l’ús.'),
        box('prova', 'Decideix què caldrà al poblat', 'Una família vol recollir cereal i guardar-ne una part fins a l’hivern. Quins estris i recipients proposaries? Ordena les feines que fan falta.')),
      section('estris', 'De la collita al menjar',
        essencial('Les falçs, els molins de mà i les aixes ajudaven a fer feines relacionades amb els conreus i la fusta.'),
        p('Una **falç** talla les tiges. Un molí de mà tritura grans. Una **aixa** serveix per treballar la fusta. Un estri podia combinar materials diferents, com un mànec de fusta i una fulla de pedra.')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Relaciona els poblats neolítics amb l’agricultura, el teixit, la ceràmica i les eines.',
    curriculum: [{ row: 'medi:passat', section: 'ceramica', note: 'Relaciona els poblats neolítics amb l’agricultura, el teixit, la ceràmica i les eines.' }],
    sources: [
      ['Visitmuseum · Jaciment neolític de la Draga', 'https://visitmuseum.gencat.cat/ca/museu/poblat-neolitic-de-la-draga/recorregut/jaciment-neolitic-de-la-draga'],
      ['Museu d’Arqueologia de Catalunya · Estris neolítics de La Draga', 'https://artprimer.mac.cat/3-lart-llevanti-lart-de-les-persones/'],
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
    ],
  });

  addTopic('M024', {
    id: 'arqueologia-pistes',
    title: 'Arqueologia, de la troballa a l’explicació',
    intro: 'Una peça sola dona pistes. Si sabem on era, a quina capa i què hi havia al costat, en podem aprendre molt més.',
    coverFigure: 'capes-i-alteracio',
    figures: [
      {
        id: 'capes-i-alteracio', section: 'jaciment', name: 'Tres capes i una alteració del terreny', ratio: 2280 / 1200,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'A l’esquerra, les capes A, B i C són contínues i hi ha restes a B i C. A la dreta, un clot baixa des de la superfície fins a C. La trama del rebliment distingeix la resta que queda a l’altura de B.',
        caption: 'Model de dos talls del mateix terreny. Compara una resta de la capa B amb la resta que es troba a la mateixa alçada dins del rebliment.',
        variants: {
          pla: { src: 'illustracions/m024/capes-i-alteracio-pla.png', thumbnail: 'illustracions/m024/miniatures/capes-i-alteracio-pla.jpg' },
          atles: { src: 'illustracions/m024/capes-i-alteracio-atles.png', thumbnail: 'illustracions/m024/miniatures/capes-i-alteracio-atles.jpg' },
        },
      },
      {
        id: 'graella-i-fitxa-de-registre', section: 'metode', name: 'Registrar una resta abans de retirar-la', ratio: 2280 / 1280,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Graella de tres per tres caselles d’un metre, amb nord i escala. La resta F07 és a B2. La fitxa indica capa C i fragment de ceràmica.',
        caption: 'Exemple de registre. El codi de la resta, el quadrat i la capa permeten relacionar la fitxa amb la seva posició a l’excavació.',
        variants: {
          pla: { src: 'illustracions/m024/graella-i-fitxa-de-registre-pla.png', thumbnail: 'illustracions/m024/miniatures/graella-i-fitxa-de-registre-pla.jpg' },
          atles: { src: 'illustracions/m024/graella-i-fitxa-de-registre-atles.png', thumbnail: 'illustracions/m024/miniatures/graella-i-fitxa-de-registre-atles.jpg' },
        },
      },
      {
        id: 'abric-romani-i-la-draga', section: 'comparacio', name: 'Dos jaciments, dues pistes', ratio: 2280 / 1550,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un localitzador situa Capellades i Banyoles. Dos detalls mostren un fogar amb cendra i carbó i un mànec d’aixa de fusta amb l’extrem colzat.',
        caption: 'Recreacions a escala orientativa. Un fogar de l’Abric Romaní conserva cendra i carbó. A la Draga es va conservar un mànec d’aixa colzat de fusta de pi.',
        credit: 'Fogar recreat a partir del registre de l’IPHES. Mànec redibuixat segons MACB-907-002-123, Museu Arqueològic Comarcal de Banyoles.',
        variants: {
          pla: { src: 'illustracions/m024/abric-romani-i-la-draga-pla.png', thumbnail: 'illustracions/m024/miniatures/abric-romani-i-la-draga-pla.jpg' },
          atles: { src: 'illustracions/m024/abric-romani-i-la-draga-atles.png', thumbnail: 'illustracions/m024/miniatures/abric-romani-i-la-draga-atles.jpg' },
        },
      },
    ],
    sections: [
      section('metode', 'Què estudia l’arqueologia?',
        essencial('L’**arqueologia** estudia les societats del passat a partir de les seves restes materials.'),
        p('L’equip anota la posició, el tipus de sòl, la capa i les troballes del voltant abans de retirar un objecte. L’observació queda registrada perquè altres persones puguin revisar les interpretacions.')),
      section('jaciment', 'Llegir les capes d’un jaciment',
        essencial('Un **jaciment** és un lloc on s’han conservat restes d’activitats del passat.'),
        p('En un terreny que no s’ha remogut, les capes inferiors solen ser més antigues. Un forat o una arrel pot desplaçar materials. Per situar una peça en el temps es combinen diverses pistes.')),
      section('comparacio', 'Dues finestres al passat català',
        essencial('A l’**Abric Romaní**, a Capellades, s’han trobat restes de fogars i d’ocupacions neandertals. A **la Draga**, a Banyoles, s’ha conservat un poblat neolític.'),
        p('Les eines, ossos i fogars de l’Abric Romaní aporten pistes sobre campaments paleolítics. Les fustes i eines de la Draga mostren pràctiques quotidianes d’un poblat amb agricultura i ramaderia.'),
        box('prova', 'Dues restes i dues preguntes', 'Tria una resta de cada jaciment i escriu què pot explicar. Quina pregunta no es pot respondre encara amb aquesta resta sola?')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Aprèn què és el context arqueològic i compara les troballes de l’Abric Romaní i la Draga.',
    curriculum: [{ row: 'medi:passat', section: 'comparacio', note: 'Aprèn què és el context arqueològic i compara les troballes de l’Abric Romaní i la Draga.' }],
    sources: [
      ['IPHES · Abric Romaní', 'https://www.iphes.cat/ca/abric-roman%C3%AD'],
      ['Museu d’Arqueologia de Catalunya · Estris neolítics de La Draga', 'https://artprimer.mac.cat/3-lart-llevanti-lart-de-les-persones/'],
      ['IPHES · Memòria d’excavació de l’Abric Romaní', 'https://calaix.gencat.cat/bitstream/handle/10687/457382/qmem16402.pdf?sequence=1'],
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
    ],
  });

  addTopic('M025', {
    id: 'poblat-edat-ferro',
    title: 'Cases, tallers i ferro al poblat',
    intro: 'El ferro va obrir possibilitats noves, però fabricar una eina requeriria coneixements, temps i persones especialitzades. Què es veuria en un poblat?',
    coverFigure: 'poblat-en-un-turo',
    figures: [
      {
        id: 'poblat-en-un-turo', section: 'poblat', name: 'Un poblat en un turó', ratio: 2280 / 1450,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Poblat oblic en un turó amb muralla, habitatges i espai de treball. L’entrada comunica amb un camí cap als camps i una fletxa cap a l’aigua.',
        caption: 'Reconstrucció didàctica inspirada en Ullastret. Els habitatges, el taller, els camps i l’accés a l’aigua formen un exemple imaginat.',
        variants: {
          pla: { src: 'illustracions/m025/poblat-en-un-turo-pla.png', thumbnail: 'illustracions/m025/miniatures/poblat-en-un-turo-pla.jpg' },
          atles: { src: 'illustracions/m025/poblat-en-un-turo-atles.png', thumbnail: 'illustracions/m025/miniatures/poblat-en-un-turo-atles.jpg' },
        },
      },
      {
        id: 'interior-d-una-casa-iberica', section: 'cases', name: 'Què hi havia dins d’una casa?', ratio: 2280 / 1290,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tall de casa amb base de pedra, paret de terra i elements de fusta. A terra es distingeixen un fogar i una gerra. La part alta es marca amb traç discontinu.',
        caption: 'Tall esquemàtic d’una casa ibèrica. El traç ple marca elements que es poden documentar i el discontinu, l’alçat reconstruït.',
        variants: {
          pla: { src: 'illustracions/m025/interior-d-una-casa-iberica-pla.png', thumbnail: 'illustracions/m025/miniatures/interior-d-una-casa-iberica-pla.jpg' },
          atles: { src: 'illustracions/m025/interior-d-una-casa-iberica-atles.png', thumbnail: 'illustracions/m025/miniatures/interior-d-una-casa-iberica-atles.jpg' },
        },
      },
      {
        id: 'pistes-de-fosa-i-forja', section: 'metall', name: 'Quines pistes deixa un taller?', ratio: 2280 / 1170,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'La fosa es representa amb un motlle i una peça de bronze compatible. La forja mostra ferro a mig acabar amb marques, un martell i residus d’escòria.',
        caption: 'Models de restes de taller. Compara la cavitat d’un motlle i les marques d’una peça de ferro. L’escòria s’interpreta amb les altres pistes del jaciment.',
        variants: {
          pla: { src: 'illustracions/m025/pistes-de-fosa-i-forja-pla.png', thumbnail: 'illustracions/m025/miniatures/pistes-de-fosa-i-forja-pla.jpg' },
          atles: { src: 'illustracions/m025/pistes-de-fosa-i-forja-atles.png', thumbnail: 'illustracions/m025/miniatures/pistes-de-fosa-i-forja-atles.jpg' },
        },
      },
    ],
    sections: [
      section('metall', 'Del mineral a l’estri',
        essencial('Per obtenir **ferro** es tracta el mineral amb molta calor. Després, el metall es pot treballar a cops mentre és calent.'),
        p('A l’edat del ferro, els ferrers sovint donaven forma al ferro per forja. El bronze fos, en canvi, es podia abocar en motlles. Els residus dels forns i tallers són pistes sobre aquests processos.')),
      section('poblat', 'Espais per viure, guardar i treballar',
        essencial('Alguns poblats de l’edat del ferro s’alçaven en un turó i tenien carrers i muralles.'),
        p('El terreny podia facilitar la vigilància i l’organització. També calia tenir accés a aigua, camps i camins. Ullastret és un exemple de gran assentament ibèric de l’edat del ferro.')),
      section('cases', 'Què ens expliquen les cases?',
        essencial('En molts habitatges hi havia parets amb base de **pedra** i parts fetes amb terra i fusta.'),
        p('Un fogar servia per cuinar i escalfar l’espai. Gerres i altres estris permetien guardar aliments. Les dimensions i les restes trobades ens ajuden a imaginar feines i espais de cada casa.')),
      section('estris', 'Eines noves al costat de les antigues',
        essencial('Amb el ferro es podien fer fulles de tall, eines agrícoles i altres peces resistents.'),
        p('Els molins de pedra, els recipients de ceràmica i els mànecs de fusta continuaven sent útils. La tècnica nova complementava altres maneres de fabricar objectes.'),
        box('prova', 'Què ens diu un taller?', 'En un espai hi ha escòries, restes de carbó i una peça de ferro a mig acabar. Proposa una explicació i digues quina altra resta cercaries per comprovar-la.')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Interpreta l’organització d’un poblat de l’edat del ferro, els habitatges i la feina del metall.',
    curriculum: [{ row: 'medi:passat', section: 'estris', note: 'Interpreta l’organització d’un poblat de l’edat del ferro, els habitatges i la feina del metall.' }],
    sources: [
      ['Museu d’Arqueologia de Catalunya · Ullastret', 'https://www.mac.cat/ca/Visita-ns-Portada/Ullastret-Portada-Seu/jaciment-ullastret'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
      ['Museu d’Arqueologia · Ullastret', 'https://www.macullastret.cat/'],
    ],
  });

  addTopic('M026', {
    id: 'patrimoni-figures-i-pedres',
    title: 'Pedres i figures que ens parlen del passat',
    intro: 'Alguns paisatges conserven pintures i grans pedres alçades. Són testimonis fràgils, i estudiar-los ens obliga a separar allò que veiem d’allò que imaginem.',
    coverFigure: 'menhir-dolmen-i-cromlec',
    figures: [
      {
        id: 'menhir-dolmen-i-cromlec', section: 'megalits', name: 'Tres maneres de disposar grans pedres', ratio: 2280 / 1110,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres vinyetes mostren un menhir de pedra única dreta, un dolmen amb cambra i llosa de coberta i un cromlec amb pedres verticals disposades en cercle.',
        caption: 'Tres exemples esquemàtics de monuments amb formes simplificades. Compara el nombre de pedres i la seva disposició.',
        variants: {
          pla: { src: 'illustracions/m026/menhir-dolmen-i-cromlec-pla.png', thumbnail: 'illustracions/m026/miniatures/menhir-dolmen-i-cromlec-pla.jpg' },
          atles: { src: 'illustracions/m026/menhir-dolmen-i-cromlec-atles.png', thumbnail: 'illustracions/m026/miniatures/menhir-dolmen-i-cromlec-atles.jpg' },
        },
      },
      {
        id: 'planta-cova-d-en-daina', section: 'megalits', name: 'La cambra i el corredor de la Cova d’en Daina', ratio: 2280 / 1160,
        width: 100, position: 'center', wrap: false, anchor: 'after',
        alt: 'Planta amb una cambra al centre i un corredor que surt cap al sud-est. Un cercle de lloses envolta la trama del túmul.',
        caption: 'Cova d’en Daina · Romanyà de la Selva. La planta simplifica les lloses documentades. La trama indica l’espai aproximat del túmul.',
        credit: 'Redibuix a partir de la fig. 186 de la Crònica de la Secció Arqueològica de l’IEC i del registre de prospecció.',
        variants: {
          pla: { src: 'illustracions/m026/planta-cova-d-en-daina-pla.png', thumbnail: 'illustracions/m026/miniatures/planta-cova-d-en-daina-pla.jpg' },
          atles: { src: 'illustracions/m026/planta-cova-d-en-daina-atles.png', thumbnail: 'illustracions/m026/miniatures/planta-cova-d-en-daina-atles.jpg' },
        },
      },
      {
        id: 'pigment-solc-i-volum', section: 'gravats', name: 'Pintat, gravat o esculpit?', ratio: 2280 / 1130,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un rombe pintat queda damunt la roca. Un solc dibuixa el mateix rombe i se’n veu la secció. Un tercer rombe té dues cares visibles i volum.',
        caption: 'Tres models amb el mateix motiu. El patrimoni rupestre s’observa sense tocar-lo.',
        variants: {
          pla: { src: 'illustracions/m026/pigment-solc-i-volum-pla.png', thumbnail: 'illustracions/m026/miniatures/pigment-solc-i-volum-pla.jpg' },
          atles: { src: 'illustracions/m026/pigment-solc-i-volum-atles.png', thumbnail: 'illustracions/m026/miniatures/pigment-solc-i-volum-atles.jpg' },
        },
      },
    ],
    sections: [
      section('rupestre', 'Pintar sobre la roca',
        essencial('L’**art rupestre** es va fer sobre superfícies de roca, com parets de coves i de balmes.'),
        p('En el conjunt mediterrani de la Península hi ha figures humanes, animals i escenes en moviment. Segons el lloc i el moment, les tècniques i els temes poden variar.')),
      section('megalits', 'Menhirs, dòlmens i cercles de pedra',
        essencial('Els **megàlits** són construccions o monuments fets amb grans pedres. Un menhir és una pedra dreta i un cromlec és un conjunt de pedres en cercle.'),
        p('Molts **dòlmens** eren cambres funeràries fetes amb lloses. La **Cova d’en Daina**, a Romanyà de la Selva, és un dolmen amb una cambra i un corredor, envoltat per un cercle de pedres que delimitava el túmul.')),
      section('gravats', 'Figures fetes amb altres tècniques',
        essencial('Un **gravat** es fa marcant una superfície. Una **escultura** dona volum a una figura.'),
        p('Una figura es podia gravar a la roca o esculpir en pedra, os o altres materials. Seguir la direcció de les marques i mirar-ne el suport ajuda a descriure la tècnica.'),
        box('prova', 'Pintat, gravat o esculpit?', 'Dibuixa un exemple de cada tècnica i explica què miraries en una peça real per distingir-les. Per què és important observar una pintura sense tocar-la?')),
    ],
  }, {
    collection: { id: 'prehistoria', title: 'La prehistòria' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Interpreta exemples de pintures, megàlits, gravats i escultures i explica com protegir-los.',
    curriculum: [{ row: 'medi:passat', section: 'gravats', note: 'Interpreta exemples de pintures, megàlits, gravats i escultures i explica com protegir-los.' }],
    sources: [
      ['IEC · Planta rectificada del sepulcre de la Cova d’en Daina, fig. 186', 'https://publicacions.iec.cat/repository/pdf/00000103/00000026.pdf'],
      ['UNESCO · Art rupestre mediterrani', 'https://whc.unesco.org/en/list/874/'],
      ['Patrimoni cultural · Cova d’en Daina', 'https://patrimoni.gencat.cat/ca/coleccio/cova-den-daina'],
    ],
  });

  addTopic('M027', {
    id: 'de-roma-a-imperi',
    title: 'Com Roma va passar de ciutat a imperi',
    intro: 'En alguns mapes, Roma només és un punt. En d’altres, el seu poder s’estén al voltant de tota la Mediterrània. Què va passar entre un mapa i l’altre?',
    coverFigure: 'roma-i-mediterrania-dos-moments',
    figures: [
      {
        id: 'roma-i-mediterrania-dos-moments', section: 'origens', name: 'Roma i la Mediterrània en dos moments', ratio: 2280 / 2110,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos mapes comparables situen Roma, la península Itàlica i la Mediterrània. El primer mostra el Tíber en un requadre. Al segon, una trama s’estén per Europa, el nord d’Àfrica i l’Àsia occidental.',
        caption: 'Dos mapes amb la mateixa escala. El punt situa Roma i la trama indica l’extensió territorial aproximada de l’Imperi cap al 117 dC.',
        credit: 'Contorn de l’Ancient World Mapping Center (UNC), via Roman Empire Map i OpenStreetMap, ODbL 1.0. Costes Natural Earth i relleu NOAA/NCEI ETOPO 2022.',
        variants: {
          pla: { src: 'illustracions/m027/roma-i-mediterrania-dos-moments-pla.png', thumbnail: 'illustracions/m027/miniatures/roma-i-mediterrania-dos-moments-pla.jpg' },
          atles: { src: 'illustracions/m027/roma-i-mediterrania-dos-moments-atles.png', thumbnail: 'illustracions/m027/miniatures/roma-i-mediterrania-dos-moments-atles.jpg' },
        },
      },
      {
        id: 'tres-etapes-govern-roma', section: 'govern', name: 'De la monarquia a l’imperi', ratio: 2280 / 940,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'La monarquia s’associa als reis, la república al Senat i als magistrats, i l’Imperi a l’emperador. August i el 27 aC marquen el pas cap a l’Imperi.',
        caption: 'Ordre esquemàtic de les etapes, amb durades gràfiques orientatives. El Senat va continuar existint sota els emperadors.',
        variants: {
          pla: { src: 'illustracions/m027/tres-etapes-govern-roma-pla.png', thumbnail: 'illustracions/m027/miniatures/tres-etapes-govern-roma-pla.jpg' },
          atles: { src: 'illustracions/m027/tres-etapes-govern-roma-atles.png', thumbnail: 'illustracions/m027/miniatures/tres-etapes-govern-roma-atles.jpg' },
        },
      },
      {
        id: 'feines-i-drets-a-roma', section: 'societat', name: 'Feines que no donaven els mateixos drets', ratio: 2280 / 1420,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres persones en escenes domèstiques, de taller i de mercat. Els cartells indiquen ciutadania, llibertat sense ciutadania romana i esclavitud.',
        caption: 'Tres casos ficticis en una ciutat provincial. Qui podia decidir on treballava? Què voldries saber per entendre els drets concrets de cada persona?',
        variants: {
          pla: { src: 'illustracions/m027/feines-i-drets-a-roma-pla.png', thumbnail: 'illustracions/m027/miniatures/feines-i-drets-a-roma-pla.jpg' },
          atles: { src: 'illustracions/m027/feines-i-drets-a-roma-atles.png', thumbnail: 'illustracions/m027/miniatures/feines-i-drets-a-roma-atles.jpg' },
        },
      },
    ],
    sections: [
      section('origens', 'Al costat del Tíber',
        essencial('La ciutat de **Roma** va créixer a la vora del **Tíber**, a la península Itàlica.'),
        p('Segons la llegenda, Ròmul va fundar Roma. L’arqueologia mostra que la ciutat va créixer a partir d’assentaments. El riu i els camins facilitaven els contactes amb altres pobles.')),
      section('govern', 'Tres maneres de governar',
        essencial('La història de Roma s’acostuma a dividir en **monarquia, república i imperi**.'),
        p('Primer hi hagué reis. Durant la república intervenien institucions com el Senat i els magistrats. Amb August, a partir del 27 aC, el poder es va concentrar en l’emperador, encara que es van conservar algunes institucions republicanes.')),
      section('expansio', 'La Mediterrània connectava territoris',
        essencial('Roma va estendre el seu poder per conquestes i aliances. Amb el temps va controlar territoris a Europa, al nord d’Àfrica i a l’Àsia occidental.'),
        p('Els romans organitzaven territoris en províncies i hi construïen calçades. Els ports i les rutes marítimes movien mercaderies, persones i notícies. L’expansió incloïa conflictes i formes diverses d’incorporar cada territori.'),
        box('prova', 'Llegeix dos mapes', 'Situa Roma i la Mediterrània. Imagina un mapa d’una Roma encara petita i un del moment de màxima expansió. Què representaries de manera diferent a cada mapa?')),
      section('societat', 'Una societat amb drets desiguals',
        essencial('A l’Imperi romà convivien ciutadans, persones lliures amb drets diferents i persones esclavitzades.'),
        p('Les formes de vida depenien de la ciutat, la feina i els recursos de cada família. Entre les persones esclavitzades hi havia qui treballava a cases, tallers, camps o mines sense poder decidir sobre la seva llibertat.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes i traços nets.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Ordena la monarquia, la república i l’imperi i explica com Roma es va expandir.',
    curriculum: [{ row: 'medi:passat', section: 'expansio', note: 'Ordena la monarquia, la república i l’imperi i explica com Roma es va expandir.' }],
    sources: [
      ['Roman Empire Map · Polígons històrics i llicència', 'https://romanempiremap.com/data-sources#open-database-licence-notice-odbl-for-the-empire-extents'],
      ['Base geogràfica del 117 dC · ODbL 1.0', 'https://tiles.romanempiremap.com/extents.geojson'],
      ['Metropolitan Museum · La dinastia julioclàudia', 'https://www.metmuseum.org/essays/the-julio-claudian-dynasty-27-b-c-68-a-d'],
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
    ],
  });

  addTopic('M028', {
    id: 'hispania-romana',
    title: 'De l’arribada a Empúries a la Hispània romana',
    intro: 'L’any 218 aC, una flota romana va fer servir el port d’Empúries. Era un episodi d’una guerra i també el començament d’un procés llarg de conquestes a la Península.',
    coverFigure: 'empuries-i-tarraco-dos-moments',
    figures: [
      {
        id: 'empuries-i-tarraco-dos-moments', section: 'arribada', name: 'Empúries i Tàrraco en dos moments', ratio: 2280 / 1790,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos mapes amb el mateix enquadrament. A dalt, una fletxa esquemàtica arriba a Empúries des del mar. A baix, una línia de calçada surt de Tàrraco cap al nord-est i Empúries apareix com un punt a la costa.',
        caption: 'El 218 aC les tropes romanes van arribar per mar a Empúries durant la guerra amb Cartago. El mapa inferior mostra un tram de la Via Augusta a l’entorn de Tàrraco en època imperial. Els dos mapes fan servir la costa actual.',
        credit: 'Via Augusta: Itiner-e, segment 26715, Pau de Soto (2010), CC BY 4.0. Traçat aproximat i generalitzat. Bases NOAA/NCEI ETOPO 2022 i Natural Earth.',
        variants: {
          pla: { src: 'illustracions/m028/empuries-i-tarraco-dos-moments-pla.png', thumbnail: 'illustracions/m028/miniatures/empuries-i-tarraco-dos-moments-pla.jpg' },
          atles: { src: 'illustracions/m028/empuries-i-tarraco-dos-moments-atles.png', thumbnail: 'illustracions/m028/miniatures/empuries-i-tarraco-dos-moments-atles.jpg' },
        },
      },
      {
        id: 'pobles-de-la-peninsula', section: 'pobles', name: 'Una península amb pobles diversos', ratio: 2280 / 1450,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa de la península amb trames esvaïdes per a exemples de pobles ibers a l’est i al sud, grups de cultura cèltica al nord-oest i l’oest i pobles celtibers a l’interior oriental.',
        caption: 'Àrees orientatives cap al segle III aC. Els noms generals abracen comunitats diferents. Empúries i Numància serveixen de referència geogràfica.',
        credit: 'Síntesi del mapa epigràfic de Beltrán Lloris i Jordán Cólera. Bases NOAA/NCEI ETOPO 2022 i Natural Earth.',
        variants: {
          pla: { src: 'illustracions/m028/pobles-de-la-peninsula-pla.png', thumbnail: 'illustracions/m028/miniatures/pobles-de-la-peninsula-pla.jpg' },
          atles: { src: 'illustracions/m028/pobles-de-la-peninsula-atles.png', thumbnail: 'illustracions/m028/miniatures/pobles-de-la-peninsula-atles.jpg' },
        },
      },
      {
        id: 'inscripcio-bilingue-de-numas', section: 'canvis', name: 'Dues llengües en una mateixa inscripció', ratio: 2280 / 1530,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres fragments d’una inscripció. Les línies llatines són a dalt i les gregues a baix. Les interrupcions marquen les parts de la pedra que falten.',
        caption: 'Inscripció de Numas, Empúries, segle I aC. El redibuix esquemàtic diferencia els fragments coneguts i les parts perdudes. Quines altres restes ens ajudarien a saber quines llengües s’hi feien servir?',
        credit: 'Redibuix a partir de la figura 22 i la transcripció de l’estudi. Referència epigràfica IRC III, 15 i CIL II, 6185.',
        variants: {
          pla: { src: 'illustracions/m028/inscripcio-bilingue-de-numas-pla.png', thumbnail: 'illustracions/m028/miniatures/inscripcio-bilingue-de-numas-pla.jpg' },
          atles: { src: 'illustracions/m028/inscripcio-bilingue-de-numas-atles.png', thumbnail: 'illustracions/m028/miniatures/inscripcio-bilingue-de-numas-atles.jpg' },
        },
      },
    ],
    sections: [
      section('arribada', 'Les tropes romanes arriben per mar',
        essencial('Les tropes romanes van arribar a **Empúries** el **218 aC**, durant la guerra amb Cartago.'),
        p('Per Roma, arribar a la Península era una manera de disputar a Cartago el control de territoris i recursos. Roma va estendre el seu domini amb campanyes, pactes i conflictes que van durar generacions.')),
      section('pobles', 'Molts pobles en una mateixa península',
        essencial('A la Península hi havia grups diversos, entre els quals pobles **ibers** i grups de cultura **cèltica**.'),
        p('Els ibers vivien sobretot a l’est i al sud peninsular. En algunes zones de l’interior hi havia pobles celtibers. Els noms generals ajuden a llegir un mapa, però cada grup tenia formes d’organització, contactes i trajectòries pròpies.')),
      section('canvis', 'Canvis locals en temps de Roma',
        essencial('Anomenem **romanització** la difusió i adopció de costums, usos, llengües i institucions romanes als territoris conquerits.'),
        p('El llatí, la moneda i el dret es van estendre, mentre molts costums locals van continuar o es van barrejar amb altres. La transformació va variar segons el lloc i també hi va haver resistències.')),
      section('xarxa', 'Províncies, ciutats i calçades',
        essencial('Roma va dividir **Hispània** en províncies. **Tàrraco** va ser la capital d’una gran província, la Tarraconense.'),
        p('Els límits de les províncies van canviar amb el temps. La **Via Augusta** connectava llocs de l’est peninsular i passava per Tàrraco. Una calçada podia servir a persones que comerciaven, a missatgers i a tropes.'),
        box('prova', 'Què hi posa un mapa romà?', 'Dibuixa un esquema amb Empúries, Tàrraco i una ruta litoral. Dona un exemple d’ús civil de la calçada i un altre relacionat amb el govern de la província.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Situa l’arribada romana a Empúries i estudia què va canviar a Hispània amb les ciutats i les calçades.',
    curriculum: [{ row: 'medi:passat', section: 'xarxa', note: 'Situa l’arribada romana a Empúries i estudia què va canviar a Hispània amb les ciutats i les calçades.' }],
    sources: [
      ['Itiner-e · Atles digital de les calçades romanes', 'https://itiner-e.org/documentation'],
      ['Ajuntament de Tarragona · Arc de Berà i Via Augusta', 'https://www.tarragona.cat/patrimoni/conjunt-arqueologic-de-tarraco-1/arc-de-triomf-de-bera/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['Estudi epigràfic · Inscripció de Numas, figura 22', 'https://www.tdx.cat/bitstream/handle/10803/457665/tacs_20170915.pdf?sequence=5'],
      ['Institución Fernando el Católico · Continuum celtibèric i mapa preromà', 'https://ifc.dpz.es/recursos/publicaciones/38/77/18beltranjordan.pdf'],
      ['MAC Empúries · La ciutat grega', 'https://www.macempuries.cat/Sobre-el-MAC-Empuries/Itinerari-arqueologic/Ciutat-grega'],
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
    ],
  });

  addTopic('M029', {
    id: 'vida-dels-ibers',
    title: 'Els ibers, poblats i intercanvis',
    intro: 'Al costat d’una muralla apareixen ceràmiques fetes a la zona i d’altres que han arribat per mar. Com podem saber a qui pertanyien i què ens expliquen dels contactes?',
    coverFigure: 'puig-castellar-i-sant-sebastia',
    figures: [
      {
        id: 'puig-castellar-i-sant-sebastia', section: 'jaciments', name: 'Dos poblats, dos entorns', ratio: 2280 / 1765,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un mapa de Catalunya situa Puig Castellar i Sant Sebastià de la Guarda. Dos retalls orientats al nord indiquen el Besòs i la Mediterrània prop dels jaciments.',
        caption: 'Dos jaciments sobre la cartografia del paisatge actual. Compara el turó del Puig Castellar, a prop del Besòs, amb la posició litoral de Sant Sebastià de la Guarda.',
        credit: 'Costes IGN i Natural Earth, Besòs ACA, relleu NOAA/NCEI ETOPO 2022, límit català © EuroGeographics via GISCO 2024.',
        variants: {
          pla: { src: 'illustracions/m029/puig-castellar-i-sant-sebastia-pla.png', thumbnail: 'illustracions/m029/miniatures/puig-castellar-i-sant-sebastia-pla.jpg' },
          atles: { src: 'illustracions/m029/puig-castellar-i-sant-sebastia-atles.png', thumbnail: 'illustracions/m029/miniatures/puig-castellar-i-sant-sebastia-atles.jpg' },
        },
      },
      {
        id: 'vas-grec-i-context-iber', section: 'grecs', name: 'Un vas grec en una casa ibera', ratio: 2280 / 1360,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un vaixell és al port d’Empòrion. En una casa ibera hi ha un fragment de copa de vernís negre. Un interrogant uneix les dues escenes.',
        caption: 'Escenes imaginades. El detall pren com a model la base d’una copa àtica trobada a Ullastret. La línia discontínua obre una pregunta. Com hi podria haver arribat?',
        credit: 'Model segons MAC-ULL 1896, Puig de Sant Andreu, fitxa CIG 6730. Dibuix propi.',
        variants: {
          pla: { src: 'illustracions/m029/vas-grec-i-context-iber-pla.png', thumbnail: 'illustracions/m029/miniatures/vas-grec-i-context-iber-pla.jpg' },
          atles: { src: 'illustracions/m029/vas-grec-i-context-iber-atles.png', thumbnail: 'illustracions/m029/miniatures/vas-grec-i-context-iber-atles.jpg' },
        },
      },
      {
        id: 'detall-inscripcio-iberica', section: 'cultura', name: 'Què es veu en una inscripció?', ratio: 1200 / 935,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Fotografia del suport sencer, una làmina allargada de plom amb vores irregulars. Un retall ampliat mostra part d’una línia de signes.',
        caption: 'Carta ibèrica sobre plom del Puig de Sant Andreu, Ullastret, segle III aC. El requadre permet observar de prop alguns dels signes incisos.',
        credit: 'MAC Ullastret, MAC ULL-03309. Imatge via Visitmuseum, fitxa actualitzada el 31/10/2026. Retall i ampliació a partir de la fotografia publicada.',
        variants: {
          pla: { src: 'illustracions/m029/detall-inscripcio-iberica-pla.png', thumbnail: 'illustracions/m029/miniatures/detall-inscripcio-iberica-pla.jpg' },
          atles: { src: 'illustracions/m029/detall-inscripcio-iberica-atles.png', thumbnail: 'illustracions/m029/miniatures/detall-inscripcio-iberica-atles.jpg' },
        },
      },
    ],
    sections: [
      section('pobles', 'Pobles diferents, trets compartits',
        essencial('Els **ibers** eren diversos pobles que compartien trets culturals a l’est i al sud de la península Ibèrica.'),
        p('Al territori de l’actual Catalunya hi havia, entre d’altres, **indigets**, **laietans** i **ilergets**. L’agricultura, la ramaderia, l’artesania i els intercanvis tenien un pes diferent segons el lloc.')),
      section('grecs', 'El contacte amb els grecs',
        essencial('La ciutat grega d’**Empòrion**, l’actual Empúries, era un lloc de contacte i comerç.'),
        p('Algunes ceràmiques importades apareixen en poblats ibers. També hi circulaven tècniques, models i idees. Les comunitats iberes decidien quins objectes adquirien i com els utilitzaven.'),
        box('prova', 'Un objecte que ha viatjat', 'Un vas grec és trobat dins d’una casa ibera. Proposa dues maneres diferents com hi podria haver arribat. Quina altra resta donaria força a una explicació?')),
      section('cultura', 'Ceràmica, escriptura i imatges',
        essencial('Entre les restes ibèriques hi ha ceràmiques decorades, objectes de metall, escultures i inscripcions.'),
        p('L’escriptura ibèrica es pot llegir en gran part pel que fa als signes, però la llengua encara no s’entén completament. Una inscripció pot informar sobre una pràctica sense que en coneguem tot el missatge.')),
      section('jaciments', 'Dos poblats amb vistes diferents',
        essencial('Al **Puig Castellar**, a Santa Coloma de Gramenet, i a **Sant Sebastià de la Guarda**, a Palafrugell, hi ha restes de poblats ibers.'),
        p('El Puig Castellar domina l’entorn del Besòs i Sant Sebastià de la Guarda queda a tocar de la costa. Comparar-los ajuda a veure quins recursos i camins podia controlar cada comunitat.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Coneix la diversitat dels pobles ibers, els contactes amb els grecs i dos jaciments catalans.',
    curriculum: [{ row: 'medi:passat', section: 'grecs', note: 'Coneix la diversitat dels pobles ibers, els contactes amb els grecs i dos jaciments catalans.' }],
    sources: [
      ['Iberia Graeca · Copa escif MAC-ULL 1896', 'https://bd.iberiagraeca.net/fichas/6730'],
      ['Visitmuseum · Carta ibèrica sobre plom', 'https://visitmuseum.gencat.cat/ca/museu/museu-d-arqueologia-de-catalunya-ullastret/objecte/carta-iberica-sobre-plom'],
      ['MAC Ullastret · Làmina de plom', 'https://www.mac.cat/ca/Col-leccio/Tresors-del-MAC/ullastret/ULL-lamina-de-plom'],
      ['Ajuntament de Palafrugell · Coordenades del jaciment, fitxa A-05', 'https://mapes.palafrugell.cat/documentacio/Planejament/PEPIPH/Vigent/finestra%20documents/05%20Arqueologia.pdf'],
      ['IGN · Línia de costa', 'https://api-features.idee.es/collections/landwaterboundary'],
      ['ACA · Cartografia i geoserveis', 'https://aca.gencat.cat/ca/laigua/consulta-de-dades/cartografia-geoserveis/'],
      ['Patrimoni cultural · Ruta dels ibers', 'https://patrimoni.gencat.cat/sites/default/files/hd-images-zip/descarregues/rutes/rutaibers_per_internet.pdf'],
      ['MAC Empúries · La ciutat grega', 'https://www.macempuries.cat/Sobre-el-MAC-Empuries/Itinerari-arqueologic/Ciutat-grega'],
    ],
  });

  addTopic('M030', {
    id: 'ciutat-romana',
    title: 'Un recorregut per una ciutat romana',
    intro: 'Una persona que arriba a Tàrraco pot anar al mercat, visitar un edifici públic i tornar a casa pel mateix carrer. Què la guia per la ciutat?',
    coverFigure: 'planol-ciutat-terrasses',
    figures: [
      {
        id: 'planol-ciutat-terrasses', section: 'tracat', name: 'Un plànol de ciutat sobre terrasses', ratio: 2280 / 1470,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Vista en planta amb carrers, fòrum, botigues i teatre. Una línia A–B creua un canvi de nivell amb escalinates, que apareix també al perfil lateral.',
        caption: 'Ciutat romana de mostra, inspirada en les terrasses de Tàrraco. A i B uneixen el plànol amb el perfil. Busca més d’un camí possible entre el fòrum i el teatre.',
        variants: {
          pla: { src: 'illustracions/m030/planol-ciutat-terrasses-pla.png', thumbnail: 'illustracions/m030/miniatures/planol-ciutat-terrasses-pla.jpg' },
          atles: { src: 'illustracions/m030/planol-ciutat-terrasses-atles.png', thumbnail: 'illustracions/m030/miniatures/planol-ciutat-terrasses-atles.jpg' },
        },
      },
      {
        id: 'forum-teatre-i-termes', section: 'edificis', name: 'Tres espais on es reunia la gent', ratio: 2280 / 1260,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'En un fòrum hi ha persones que conversen davant d’un temple. Al teatre, hi ha públic a les grades i una figura a l’escena. A les termes, hi ha una persona a l’aigua i una altra vora la piscina.',
        caption: 'Reconstruccions didàctiques de tres espais públics. Observa què fa la gent a la plaça, a les grades i a la sala de bany.',
        variants: {
          pla: { src: 'illustracions/m030/forum-teatre-i-termes-pla.png', thumbnail: 'illustracions/m030/miniatures/forum-teatre-i-termes-pla.jpg' },
          atles: { src: 'illustracions/m030/forum-teatre-i-termes-atles.png', thumbnail: 'illustracions/m030/miniatures/forum-teatre-i-termes-atles.jpg' },
        },
      },
      {
        id: 'taberna-del-carrer-al-taller', section: 'comerc', name: 'Una taberna oberta al carrer', ratio: 1200 / 915,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Una façana obre el taulell al carrer. Darrere de l’obertura hi ha espai per treballar o guardar recipients.',
        caption: 'Tall esquemàtic d’una taberna. On podia atendre la gent qui hi treballava? On podia desar els materials?',
        variants: {
          pla: { src: 'illustracions/m030/taberna-del-carrer-al-taller-pla.png', thumbnail: 'illustracions/m030/miniatures/taberna-del-carrer-al-taller-pla.jpg' },
          atles: { src: 'illustracions/m030/taberna-del-carrer-al-taller-atles.png', thumbnail: 'illustracions/m030/miniatures/taberna-del-carrer-al-taller-atles.jpg' },
        },
      },
    ],
    sections: [
      section('tracat', 'Carrers, places i cases',
        essencial('En moltes ciutats romanes, els carrers principals orientaven el **traçat urbà**.'),
        p('Algunes ciutats tenien una planta regular amb carrers que es creuaven. Tàrraco també s’adaptava a un turó i tenia terrasses. Les persones amb més recursos podien viure en cases espaioses, i d’altres en habitatges més petits o edificis compartits.')),
      section('edificis', 'On es reunia la gent?',
        essencial('El **fòrum** era una plaça pública important. A prop hi podia haver un temple i edificis relacionats amb el govern o els negocis.'),
        p('El teatre, les termes i altres edificis reunien gent per motius diferents. La seva forma ajuda a reconèixer la funció que podien tenir.')),
      section('comerc', 'Es ven i es treballa a peu de carrer',
        essencial('En una **taberna** es podien vendre productes o fer feines d’artesania.'),
        p('Moltes botigues o tallers obrien directament al carrer. Una mateixa façana podia connectar espais de venda al públic amb dependències de treball o de magatzem.'),
        box('prova', 'Prepara un plànol de visita', 'Dibuixa tres carrers, un fòrum i dues tabernae. Explica quin recorregut faries per comprar, passar pel fòrum i arribar al teatre.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Interpreta espais públics, habitatges i botigues d’una ciutat romana.',
    curriculum: [{ row: 'medi:passat', section: 'comerc', note: 'Interpreta espais públics, habitatges i botigues d’una ciutat romana.' }],
    sources: [
      ['MNAT · Teatre de Tàrraco', 'https://www.mnat.cat/teatre-de-tarraco/'],
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M031', {
    id: 'comerc-tarraconense',
    title: 'D’una vil·la al port de Tàrraco',
    intro: 'Una gerra amb oli pot passar per un magatzem, una calçada i un port abans d’arribar a una altra ciutat. Seguim-ne el recorregut.',
    coverFigure: 'oli-de-la-villa-al-mercat',
    figures: [
      {
        id: 'oli-de-la-villa-al-mercat', section: 'xarxa', name: 'El recorregut d’una àmfora d’oli', ratio: 2280 / 1260,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Quatre vinyetes segueixen una àmfora amb una marca en forma de rombe. Passa d’una vil·la a un carro, a la càrrega d’un vaixell al port de Tàrraco i al taulell d’un mercat.',
        caption: 'Vil·la, àmfora marcada i itinerari de mostra. Segueix la mateixa marca i busca a quin lloc l’àmfora passa del carro al vaixell.',
        variants: {
          pla: { src: 'illustracions/m031/oli-de-la-villa-al-mercat-pla.png', thumbnail: 'illustracions/m031/miniatures/oli-de-la-villa-al-mercat-pla.jpg' },
          atles: { src: 'illustracions/m031/oli-de-la-villa-al-mercat-atles.png', thumbnail: 'illustracions/m031/miniatures/oli-de-la-villa-al-mercat-atles.jpg' },
        },
      },
      {
        id: 'forma-i-marca-d-amfora', section: 'productes', name: 'La forma i les marques d’una àmfora', ratio: 1200 / 1000,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'A l’esquerra, la part alta conservada contrasta amb el perfil aproximat discontinu de l’àmfora. Una guia assenyala el segell ACIRCI a l’ansa. A la dreta hi ha el segell ampliat.',
        caption: 'Àmfora Dressel 20 fabricada a la Bètica i trobada a Londres. Es conserven el coll, les anses i la part superior. Quines pistes ens permetrien saber si es va tornar a fer servir per a un altre producte?',
        credit: 'Dibuix segons el London Museum, objecte 26653. Escala orientativa a partir del diàmetre i l’alçada conservada de catàleg.',
        variants: {
          pla: { src: 'illustracions/m031/forma-i-marca-d-amfora-pla.png', thumbnail: 'illustracions/m031/miniatures/forma-i-marca-d-amfora-pla.jpg' },
          atles: { src: 'illustracions/m031/forma-i-marca-d-amfora-atles.png', thumbnail: 'illustracions/m031/miniatures/forma-i-marca-d-amfora-atles.jpg' },
        },
      },
      {
        id: 'anvers-i-revers-denari', section: 'denari', name: 'Les dues cares d’un denari', ratio: 1200 / 884,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Dues cares de la mateixa moneda a la mateixa mida. L’anvers mostra el cap d’Apol·lo. El revers mostra els Dioscurs amb els cavalls i una inscripció al peu.',
        caption: 'Denari de plata emès per Postumi Albí a Roma, cap al 96 aC. Compara el retrat de l’anvers amb l’escena i la inscripció del revers.',
        credit: 'The Metropolitan Museum of Art, Rogers Fund 1908, 08.170.75. Fotografies de domini públic.',
        variants: {
          pla: { src: 'illustracions/m031/anvers-i-revers-denari-pla.png', thumbnail: 'illustracions/m031/miniatures/anvers-i-revers-denari-pla.jpg' },
          atles: { src: 'illustracions/m031/anvers-i-revers-denari-atles.png', thumbnail: 'illustracions/m031/miniatures/anvers-i-revers-denari-atles.jpg' },
        },
      },
    ],
    sections: [
      section('villes', 'Produir i guardar al camp',
        essencial('Les **vil·les** eren finques rurals. Algunes produïen cereal, oli o vi per vendre o intercanviar.'),
        p('Hi podia haver habitatges, espais de feina i magatzems. Algunes vil·les, com la dels Munts, també tenien una zona residencial luxosa. Les feines agrícoles sostenien bona part de l’economia.')),
      section('xarxa', 'Del taller al mercat',
        essencial('Durant l’època romana es feien intercanvis entre ciutats i regions de l’Imperi.'),
        p('A Tàrraco es podien rebre productes de moltes procedències i exportar-ne d’altres. Les persones que treballaven al camp, als tallers, al transport i als mercats formaven part de la mateixa xarxa.')),
      section('productes', 'Calçades, vaixells i àmfores',
        essencial('El **vi**, l’**oli** i algunes **conserves de peix** es transportaven en àmfores. Les rutes seguien per terra i per mar.'),
        p('La forma i les marques d’una àmfora poden donar pistes sobre el producte o el lloc on es va fabricar. Per als trajectes llargs i les càrregues pesants, el transport marítim podia portar moltes més peces que un carro.')),
      section('denari', 'Una moneda que viatja',
        essencial('El **denari** era una moneda romana, sovint de plata, que es va utilitzar durant segles.'),
        p('S’emprava juntament amb altres monedes. Mirar-ne les cares permet identificar inscripcions, retrats o símbols. Una moneda també podia difondre el nom o la imatge de qui governava.'),
        box('prova', 'Dues pistes de comerç', 'Trobem una àmfora feta lluny i un denari. Quina peça informa millor del transport de productes? Què pot explicar la moneda? Justifica per què totes dues ens interessen.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Segueix productes i rutes de l’Imperi, i interpreta el paper de les vil·les, les àmfores i el denari.',
    curriculum: [{ row: 'medi:passat', section: 'denari', note: 'Segueix productes i rutes de l’Imperi, i interpreta el paper de les vil·les, les àmfores i el denari.' }],
    sources: [
      ['London Museum · Àmfora Dressel 20, 26653', 'https://www.londonmuseum.org.uk/collections/v/object-20399/amphora-dressel-20-amphora/'],
      ['The Met · Denari de Postumi Albí, 08.170.75', 'https://www.metmuseum.org/art/collection/search/248032'],
      ['MNAT · El comerç a Tàrraco', 'https://www.mnat.cat/documents/74992mnat-itinerari-7-catal1.pdf'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M032', {
    id: 'creences-en-temps-romans',
    title: 'Déus, rituals i cristianisme a Roma',
    intro: 'Què ens expliquen un altar, una moneda amb un símbol i un sarcòfag? Les creences canvien al llarg del temps i de vegades conviuen al mateix lloc.',
    coverFigure: 'comunitats-313-380',
    figures: [
      {
        id: 'comunitats-313-380', section: 'oficial', name: 'Del segle I al 380', ratio: 2280 / 1225,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres fites ordenades: primeres comunitats cristianes a Judea al segle I, llibertat de culte per als cristians el 313 i cristianisme nicè com a religió oficial el 380. Dues bandes mostren la coexistència de pràctiques.',
        caption: 'Línia del temps esquemàtica. Les bandes indiquen que diferents pràctiques religioses van coexistir. El 313 i el 380 marquen decisions diferents.',
        variants: {
          pla: { src: 'illustracions/m032/comunitats-313-380-pla.png', thumbnail: 'illustracions/m032/miniatures/comunitats-313-380-pla.jpg' },
          atles: { src: 'illustracions/m032/comunitats-313-380-atles.png', thumbnail: 'illustracions/m032/miniatures/comunitats-313-380-atles.jpg' },
        },
      },
      {
        id: 'culte-domestic-i-public', section: 'rituals', name: 'Una ofrena a casa i un ritual públic', ratio: 2280 / 1290,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'A l’esquerra hi ha una ofrena petita en un altar domèstic amb dues figures en un nínxol. A la dreta hi ha un grup de persones davant de l’altar exterior d’un temple.',
        caption: 'Reconstruccions didàctiques. Quines pistes permeten distingir una ofrena en un espai de casa d’una cerimònia a la plaça?',
        variants: {
          pla: { src: 'illustracions/m032/culte-domestic-i-public-pla.png', thumbnail: 'illustracions/m032/miniatures/culte-domestic-i-public-pla.jpg' },
          atles: { src: 'illustracions/m032/culte-domestic-i-public-atles.png', thumbnail: 'illustracions/m032/miniatures/culte-domestic-i-public-atles.jpg' },
        },
      },
      {
        id: 'pistes-de-la-necropolis-tarraco', section: 'hispania', name: 'Una peça de la Necròpolis de Tàrraco', ratio: 2280 / 1430,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dibuix de la cara de marbre documentada, amb una figura humana al mig, solcs ondulats i un lleó amb una gasela a cada extrem. Un requadre amplia un dels relleus.',
        caption: 'Sarcòfag dels Lleons, segle III dC. El catàleg el situa a la Necròpolis de Tarragona i descriu una difunta al centre i lleons amb gaseles als extrems. Què podem observar al relleu i què ens caldria contrastar amb el context?',
        credit: 'Recreació gràfica segons el catàleg del Museu Nacional Arqueològic de Tarragona, MNAT P-53.',
        variants: {
          pla: { src: 'illustracions/m032/pistes-de-la-necropolis-tarraco-pla.png', thumbnail: 'illustracions/m032/miniatures/pistes-de-la-necropolis-tarraco-pla.jpg' },
          atles: { src: 'illustracions/m032/pistes-de-la-necropolis-tarraco-atles.png', thumbnail: 'illustracions/m032/miniatures/pistes-de-la-necropolis-tarraco-atles.jpg' },
        },
      },
    ],
    sections: [
      section('rituals', 'Creences a casa i a la ciutat',
        essencial('En època romana molta gent practicava cultes a **diverses divinitats**.'),
        p('Al fòrum hi podia haver temples dedicats a déus com Júpiter. També es feien ofrenes a la llar i es podia venerar l’emperador en cerimònies públiques. Les pràctiques variaven segons el lloc i el moment.')),
      section('cristianisme', 'Neixen les primeres comunitats cristianes',
        essencial('El **cristianisme** va néixer al segle I a la regió de Judea i es va estendre per ciutats de l’Imperi.'),
        p('Les comunitats es formaven al voltant dels ensenyaments de Jesús. En alguns moments i llocs les autoritats romanes van perseguir persones cristianes. En d’altres, les comunitats podien créixer amb més marge.')),
      section('oficial', 'De religió autoritzada a religió oficial',
        essencial('L’any **313** es va reconèixer als cristians la llibertat de practicar la seva religió. L’any **380**, el cristianisme nicè va esdevenir la religió oficial de l’Imperi.'),
        p('Són dos canvis diferents. Una pràctica pot ser permesa sense ser oficial. La decisió imperial no va fer desaparèixer de cop totes les altres formes de culte.')),
      section('hispania', 'Com es veu el canvi a Hispània?',
        essencial('Les comunitats cristianes d’Hispània van deixar restes com inscripcions, tombes i edificis.'),
        p('La **Necròpolis Paleocristiana de Tarragona** conserva enterraments i objectes que ajuden a conèixer aquelles comunitats. Els símbols i les paraules de les inscripcions són pistes que podem comparar amb altres fonts.'),
        box('prova', 'Què explica una tomba?', 'Imagina que veus una inscripció amb un nom, una data i un símbol. Quines pistes són directes? Quina informació necessites per saber si es relaciona amb el cristianisme?')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Explica el culte romà, l’expansió del cristianisme i algunes de les seves primeres restes a Hispània.',
    curriculum: [{ row: 'medi:passat', section: 'hispania', note: 'Explica el culte romà, l’expansió del cristianisme i algunes de les seves primeres restes a Hispània.' }],
    sources: [
      ['MNAT · Sarcòfag dels Lleons, P-53', 'https://www.mnat.cat/obra/21/sarcofag-dels-lleons/'],
      ['The Met · Estatueta d’un lar domèstic', 'https://www.metmuseum.org/art/collection/search/250737'],
      ['Universitat de Fordham · Text de Lactanci sobre l’acord del 313', 'https://sourcebooks.web.fordham.edu/source/edict-milan.asp'],
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M033', {
    id: 'llegat-de-roma',
    title: 'De Roma al present, què n’ha quedat?',
    intro: 'Un mot, el traçat d’un carrer i el nom d’un mes poden tenir històries llargues. Algunes comencen molt abans que la nostra ciutat actual.',
    coverFigure: 'tarraco-ciutat-en-capes',
    figures: [
      {
        id: 'tarraco-ciutat-en-capes', section: 'ciutats', name: 'Una ciutat que ha anat canviant', ratio: 2280 / 1260,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dues vistes d’una muralla en el mateix enquadrament. El segon dibuix conserva la base, marcada amb un contorn discontinu, i hi afegeix construccions.',
        caption: 'Esquema inspirat en les muralles de Tàrraco. El contorn discontinu assenyala el mateix tram en totes dues escenes. Què veus a sobre i al costat del tram conservat?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m033/tarraco-ciutat-en-capes-pla.png', thumbnail: 'illustracions/m033/miniatures/tarraco-ciutat-en-capes-pla.jpg' },
          atles: { src: 'illustracions/m033/tarraco-ciutat-en-capes-atles.png', thumbnail: 'illustracions/m033/miniatures/tarraco-ciutat-en-capes-atles.jpg' },
        },
      },
      {
        id: 'aqua-i-llengues-romaniques', section: 'llengues', name: 'Paraules amb un origen compartit', ratio: 2280 / 1240,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Cinc branques surten de la paraula llatina aqua i arriben a aigua en català, agua en castellà, eau en francès, acqua en italià i água en portuguès.',
        caption: 'Cinc paraules emparentades amb el llatí aqua. Totes tenen un origen compartit i cada llengua ha seguit la seva trajectòria.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m033/aqua-i-llengues-romaniques-pla.png', thumbnail: 'illustracions/m033/miniatures/aqua-i-llengues-romaniques-pla.jpg' },
          atles: { src: 'illustracions/m033/aqua-i-llengues-romaniques-atles.png', thumbnail: 'illustracions/m033/miniatures/aqua-i-llengues-romaniques-atles.jpg' },
        },
      },
      {
        id: 'mateix-corredor-dos-camins', section: 'vies', name: 'Una vall, dos traçats', ratio: 2280 / 1390,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una calçada discontínua i una carretera de traç continu passen per una vall amb dos nuclis i un riu. Les dues vies s’acosten al pas estret.',
        caption: 'Model d’una vall imaginària. Una calçada i una carretera passen pel mateix corredor, amb traçats diferents. Quines fonts ajudaran a comprovar-ho en un lloc real?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m033/mateix-corredor-dos-camins-pla.png', thumbnail: 'illustracions/m033/miniatures/mateix-corredor-dos-camins-pla.jpg' },
          atles: { src: 'illustracions/m033/mateix-corredor-dos-camins-atles.png', thumbnail: 'illustracions/m033/miniatures/mateix-corredor-dos-camins-atles.jpg' },
        },
      },
    ],
    sections: [
      section('llengues', 'El llatí canvia al llarg del temps',
        essencial('Del **llatí** que es parlava a l’Imperi es van desenvolupar llengües romàniques com el català, el castellà, el francès, l’italià i el portuguès.'),
        p('Les maneres de parlar van canviar amb el pas dels segles i les relacions entre comunitats. Paraules com «aigua» i «agua» s’assemblen perquè comparteixen un origen llatí.')),
      section('ciutats', 'Carrers i serveis que deixen una empremta',
        essencial('Algunes ciutats actuals conserven parts del traçat o restes de **muralles**, **aqüeductes** i altres obres romanes.'),
        p('Una ciutat es transforma moltes vegades. A Tàrraco es poden reconèixer parts de la ciutat antiga sota o al costat de construccions molt posteriors. Els aqüeductes portaven aigua d’un lloc a un altre aprofitant sovint un pendent suau.')),
      section('vies', 'Camins nous damunt de rutes antigues',
        essencial('Algunes rutes actuals passen per corredors que ja comunicaven llocs en **època romana**.'),
        p('Els passos de muntanya, les valls i les costes orienten els desplaçaments. Una carretera d’avui pot seguir el mateix corredor general sense passar exactament damunt l’antiga calçada.'),
        box('prova', 'Un rastre al municipi', 'Tria una paraula, un carrer, una obra antiga o un nom del calendari. Explica quina font et permet comprovar si realment té algun vincle amb el món romà.')),
      section('calendari', 'Mesos que conserven noms antics',
        essencial('Una part dels noms dels mesos i de l’organització del nostre calendari prové de l’època romana.'),
        p('Juliol recorda Juli Cèsar i agost recorda August. El calendari gregorià d’avui va modificar l’antic calendari julià per ajustar millor el còmput dels anys.')),
      section('religio', 'La continuïtat d’una religió',
        essencial('El **cristianisme** es va estendre durant l’Imperi romà i ha continuat canviant al llarg dels segles.'),
        p('Alguns edificis, festes i expressions de l’entorn tenen una història relacionada amb el cristianisme. També formen part de la societat tradicions de molts altres orígens.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Ressegueix rastres romans en les llengües, els carrers, les vies, el calendari i el cristianisme.',
    curriculum: [{ row: 'medi:passat', section: 'vies', note: 'Ressegueix rastres romans en les llengües, els carrers, les vies, el calendari i el cristianisme.' }],
    sources: [
      ['Diccionari català-valencià-balear · Aigua', 'https://dcvb.iec.cat/results.asp?word=aigua'],
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
    ],
  });

  addTopic('M034', {
    id: 'patrimoni-de-tarraco',
    title: 'Llegim les formes dels edificis romans',
    intro: 'Una graderia semicircular, una arena oval i unes sales amb aigua ens donen pistes sobre tres usos diferents. Com podem reconèixer cada edifici?',
    coverFigure: 'teatre-i-amfiteatre-en-planta',
    figures: [
      {
        id: 'teatre-i-amfiteatre-en-planta', section: 'spectacles', name: 'Teatre i amfiteatre en planta', ratio: 2280 / 1190,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'La graderia del teatre forma un semicercle davant de l’escena. La de l’amfiteatre envolta l’arena ovalada. La mateixa trama marca les graderies.',
        caption: 'Plantes esquemàtiques sense escala comuna. Tapa els títols i fixa’t en la forma de la graderia i en la seva posició respecte de l’espai central.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m034/teatre-i-amfiteatre-en-planta-pla.png', thumbnail: 'illustracions/m034/miniatures/teatre-i-amfiteatre-en-planta-pla.jpg' },
          atles: { src: 'illustracions/m034/teatre-i-amfiteatre-en-planta-atles.png', thumbnail: 'illustracions/m034/miniatures/teatre-i-amfiteatre-en-planta-atles.jpg' },
        },
      },
      {
        id: 'pistes-d-un-temple', section: 'temples', name: 'Pistes per identificar un temple', ratio: 1200 / 1020,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Un dibuix de façana indica la base, l’escala i les columnes. Un requadre mostra un fragment de columna i una nota recorda la relació amb el fòrum.',
        caption: 'Una façana reconstruïda i un fragment esquemàtic de columna. La situació respecte del fòrum pot ser una pista. Quines altres restes o documents buscaries?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m034/pistes-d-un-temple-pla.png', thumbnail: 'illustracions/m034/miniatures/pistes-d-un-temple-pla.jpg' },
          atles: { src: 'illustracions/m034/pistes-d-un-temple-atles.png', thumbnail: 'illustracions/m034/miniatures/pistes-d-un-temple-atles.jpg' },
        },
      },
      {
        id: 'termes-i-paviment-escalfat', section: 'termes', name: 'Com s’escalfava una sala de les termes?', ratio: 2280 / 1400,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un forn lateral envia aire calent sota el paviment elevat de la sala. Un traç doble, separat del tall, representa una conducció d’aigua.',
        caption: 'Tall d’un sistema de calefacció que s’emprava en algunes termes romanes. Les fletxes segueixen l’aire entre els pilarets. Un requadre mostra una conducció d’aigua.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m034/termes-i-paviment-escalfat-pla.png', thumbnail: 'illustracions/m034/miniatures/termes-i-paviment-escalfat-pla.jpg' },
          atles: { src: 'illustracions/m034/termes-i-paviment-escalfat-atles.png', thumbnail: 'illustracions/m034/miniatures/termes-i-paviment-escalfat-atles.jpg' },
        },
      },
    ],
    sections: [
      section('temples', 'Espais de culte',
        essencial('Un **temple** era un edifici destinat al culte. En molts casos s’alçava sobre una base alta i tenia una entrada amb columnes.'),
        p('El ritual podia celebrar-se també a l’exterior. Per identificar un temple es poden combinar fragments arquitectònics, inscripcions i la seva situació en relació amb el fòrum.')),
      section('spectacles', 'Dues graderies, formes diferents',
        essencial('El **teatre** romà tenia una graderia aproximadament semicircular davant de l’escena. L’**amfiteatre** envoltava una arena, generalment ovalada.'),
        p('Al teatre hi havia representacions escèniques. A l’amfiteatre s’hi feien espectacles públics, entre ells els combats de gladiadors. A Tarragona es conserven restes dels dos tipus d’edifici.')),
      section('termes', 'Termes, banys i espais de trobada',
        essencial('Les **termes** eren llocs de bany i de relació social. Podien tenir sales amb aigua a diverses temperatures.'),
        p('En algunes termes, l’aire calent circulava sota el paviment. Les estances, els desguassos i els forns ajuden a entendre com s’organitzava l’edifici.'),
        box('prova', 'Quin edifici hem trobat?', 'En unes restes hi ha tres sales amb conduccions d’aigua. En unes altres hi ha una graderia que envolta una arena. Identifica els edificis probables i assenyala quina pista t’ha ajudat.')),
    ],
  }, {
    collection: { id: 'roma', title: 'En temps dels romans' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Distingeix temples, teatres, amfiteatres i termes a partir de la forma i la funció.',
    curriculum: [{ row: 'medi:passat', section: 'termes', note: 'Distingeix temples, teatres, amfiteatres i termes a partir de la forma i la funció.' }],
    sources: [
      ['MNAT · Teatre de Tàrraco', 'https://www.mnat.cat/teatre-de-tarraco/'],
      ['Generalitat de Catalunya · Termes de Sant Boi de Llobregat', 'https://govern.cat/govern/docs/2016/07/19/16/12/51838643-0591-4bf4-bb75-251ff42b1c4b.pdf'],
      ['Patrimoni cultural · Amfiteatre de Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco/amfiteatre'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M035', {
    id: 'visigots-inici-edat-mitjana',
    title: 'De l’Imperi romà al regne visigot',
    intro: 'Les ciutats, les llengües i les creences continuen canviant quan es fragmenta un imperi. Què es manté i qui governa la Península després de Roma?',
    coverFigure: 'del-476-al-711',
    figures: [
      {
        id: 'del-476-al-711', section: 'imperi', name: 'Del 476 al 711, canvis i continuïtats', ratio: 2280 / 1120,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Un eix marca el 476, el regne visigot amb centre a Toledo i el 711. A sota, una línia discontínua llarga identifica les ciutats i el llatí parlat.',
        caption: 'El 476 és una data convencional. La franja indica el període visigot a la Península. Les ciutats i el llatí parlat continuen canviant mentre se succeeixen els governs.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m035/del-476-al-711-pla.png', thumbnail: 'illustracions/m035/miniatures/del-476-al-711-pla.jpg' },
          atles: { src: 'illustracions/m035/del-476-al-711-atles.png', thumbnail: 'illustracions/m035/miniatures/del-476-al-711-atles.jpg' },
        },
      },
      {
        id: 'toledo-i-estret-de-gibraltar', section: 'set-cents', name: 'Toledo i el pas entre dues ribes', ratio: 2280 / 1450,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa de la península Ibèrica i el nord d’Àfrica. Un punt indica Toledo i una fletxa curta creua l’estret de Gibraltar cap al nord.',
        caption: 'Toledo era el centre del regne visigot. La fletxa marca de manera esquemàtica el pas del nord d’Àfrica cap a la Península el 711.',
        credit: 'Cartografia física Natural Earth i NOAA/NCEI ETOPO 2022.',
        variants: {
          pla: { src: 'illustracions/m035/toledo-i-estret-de-gibraltar-pla.png', thumbnail: 'illustracions/m035/miniatures/toledo-i-estret-de-gibraltar-pla.jpg' },
          atles: { src: 'illustracions/m035/toledo-i-estret-de-gibraltar-atles.png', thumbnail: 'illustracions/m035/miniatures/toledo-i-estret-de-gibraltar-atles.jpg' },
        },
      },
      {
        id: 'llengua-religio-i-govern', section: 'islam', name: 'Una llengua, una creença i un govern', ratio: 2280 / 1330,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres fotografies documentades mostren un fragment de teixit amb lletres àrabs, un foli en pergamí de l’Alcorà i un dinar del califa Abd-al-Màlik.',
        caption: 'Les tres peces provenen de diferents llocs i èpoques del món islàmic. Quina pregunta faries a cada peça per aprendre sobre la llengua, la religió o el govern?',
        credit: 'The Met, Rogers Fund, 1927 (27.170.79) i Gift of Rudolf M. Riefstahl, 1930 (30.45). Münzkabinett, Staatliche Museen zu Berlin (18205131), fotografia de Lutz-Jürgen Lübke. Imatges de domini públic.',
        variants: {
          pla: { src: 'illustracions/m035/llengua-religio-i-govern-pla.png', thumbnail: 'illustracions/m035/miniatures/llengua-religio-i-govern-pla.jpg' },
          atles: { src: 'illustracions/m035/llengua-religio-i-govern-atles.png', thumbnail: 'illustracions/m035/miniatures/llengua-religio-i-govern-atles.jpg' },
        },
      },
    ],
    sections: [
      section('imperi', 'Quan es fragmenta l’Imperi d’Occident',
        essencial('Al segle V, l’**Imperi romà d’Occident** es va fragmentar. Diversos grups van formar regnes als seus antics territoris.'),
        p('El 476 es fa servir com a data convencional del final de l’Imperi d’Occident. A l’est, l’Imperi romà va continuar. Les ciutats, el llatí parlat i algunes formes de vida van perdurar als territoris occidentals.')),
      section('visigots', 'Un regne amb centre a Toledo',
        essencial('Els **visigots** van governar bona part de la península Ibèrica. **Toledo** va esdevenir la seva capital.'),
        p('El regne reunia persones amb orígens diversos i va conservar part de les maneres de governar romanes. Amb el temps es van transformar les lleis, els vincles entre grups i les pràctiques religioses.'),
        box('prova', 'Què continua i què canvia?', 'Escriu un exemple de continuïtat després de Roma i un canvi en qui governa la Península. Quina dada de la lectura sosté cada resposta?')),
      section('set-cents', 'L’arribada d’exèrcits musulmans',
        essencial('L’any **711**, un exèrcit musulmà procedent del nord d’Àfrica va entrar a la Península.'),
        p('Amb conquestes i pactes, el regne visigot va perdre el control de gran part del territori. Es va formar **Al-Àndalus**. La conquesta no va tenir el mateix ritme a tot arreu.')),
      section('islam', 'Què és l’islam?',
        essencial('L’**islam** és una religió monoteista que va sorgir a Aràbia al segle VII. El seu llibre sagrat és l’**Alcorà**.'),
        p('Els musulmans consideren Mahoma un profeta. Una llengua, una religió i un govern són coses diferents. A les societats medievals hi podia haver persones de llengües i religions diverses.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Relaciona la fragmentació de l’Imperi romà d’Occident amb el regne visigot, l’arribada musulmana i l’islam.',
    curriculum: [{ row: 'medi:passat', section: 'visigots', note: 'Relaciona la fragmentació de l’Imperi romà d’Occident amb el regne visigot, l’arribada musulmana i l’islam.' }],
    sources: [
      ['IGN · Atlas Nacional de España, capítol 6', 'https://www.ign.es/web/resources/docs/IGNCnig/ANE/Capitulos/06_Referenciashistoricas.pdf'],
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['The Met · Teixit amb inscripció, 27.170.79', 'https://www.metmuseum.org/art/collection/search/448123'],
      ['The Met · Foli de l’Alcorà, 30.45', 'https://www.metmuseum.org/art/collection/search/448369'],
      ['Münzkabinett Berlin · Dinar omeia, 18205131', 'https://ikmk.smb.museum/object?id=18205131'],
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
    ],
  });

  addTopic('M036', {
    id: 'terres-andalusines',
    title: 'Lleida i Tortosa en temps d’Al-Àndalus',
    intro: 'Els límits dels territoris medievals no coincideixen amb els actuals. A les terres de Lleida i Tortosa, podem seguir pistes de com era la vida sota govern andalusí.',
    coverFigure: 'lleida-balaguer-tortosa-i-rius',
    figures: [
      {
        id: 'lleida-balaguer-tortosa-i-rius', section: 'alandalus', name: 'De la vall del Segre al baix Ebre', ratio: 2280 / 1500,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Balaguer i Lleida són a la vora del Segre. El Segre s’uneix a l’Ebre, que passa per Tortosa abans d’arribar a la Mediterrània.',
        caption: 'Balaguer, Lleida i Tortosa són tres ciutats de referència del segle XI. El mapa simplifica la xarxa fluvial i fa servir la costa actual.',
        credit: 'Cartografia física Natural Earth i NOAA/NCEI ETOPO 2022. Eixos fluvials de l’Agència Catalana de l’Aigua.',
        variants: {
          pla: { src: 'illustracions/m036/lleida-balaguer-tortosa-i-rius-pla.png', thumbnail: 'illustracions/m036/miniatures/lleida-balaguer-tortosa-i-rius-pla.jpg' },
          atles: { src: 'illustracions/m036/lleida-balaguer-tortosa-i-rius-atles.png', thumbnail: 'illustracions/m036/miniatures/lleida-balaguer-tortosa-i-rius-atles.jpg' },
        },
      },
      {
        id: 'tortosa-i-el-port-fluvial', section: 'vida', name: 'Una ciutat al costat del riu', ratio: 2280 / 1310,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una embarcació de càrrega és al costat d’un embarcador de l’Ebre. Un camí puja cap a un carrer de la ciutat on s’intercanvien productes.',
        caption: 'Reconstrucció didàctica inspirada en la Tortosa andalusina. Segueix el camí entre l’embarcació i el carrer i identifica les feines que s’hi fan.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m036/tortosa-i-el-port-fluvial-pla.png', thumbnail: 'illustracions/m036/miniatures/tortosa-i-el-port-fluvial-pla.jpg' },
          atles: { src: 'illustracions/m036/tortosa-i-el-port-fluvial-atles.png', thumbnail: 'illustracions/m036/miniatures/tortosa-i-el-port-fluvial-atles.jpg' },
        },
      },
      {
        id: 'alqueria-sequia-i-camps', section: 'alqueries', name: 'Una séquia porta aigua als camps', ratio: 2280 / 1300,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una séquia contínua amb una fletxa alimenta diferents camps. Un camí discontinu surt del petit grup de cases i connecta amb la ciutat.',
        caption: 'Exemple esquemàtic de reg prop d’una alqueria. Segueix el sentit de l’aigua i comprova com arriba als camps. Quin traç indica el camí cap a la ciutat?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m036/alqueria-sequia-i-camps-pla.png', thumbnail: 'illustracions/m036/miniatures/alqueria-sequia-i-camps-pla.jpg' },
          atles: { src: 'illustracions/m036/alqueria-sequia-i-camps-atles.png', thumbnail: 'illustracions/m036/miniatures/alqueria-sequia-i-camps-atles.jpg' },
        },
      },
    ],
    sections: [
      section('alandalus', 'Un territori que va canviar de forma',
        essencial('**Al-Àndalus** és el nom que reben els territoris peninsulars sota govern musulmà durant l’edat mitjana.'),
        p('Les fronteres van variar amb els segles. Lleida, Balaguer i Tortosa van formar part d’Al-Àndalus durant molt de temps. Per situar-les, ens cal conèixer la data del mapa.')),
      section('vida', 'Llengües, creences i vida urbana',
        essencial('En els territoris andalusins es van estendre l’ús de l’**àrab** i l’**islam**. Hi continuaven convivint comunitats amb creences diferents.'),
        p('La difusió de l’islam, anomenada islamització, va ser gradual. Tortosa connectava l’Ebre amb la mar. Lleida articulava un territori agrícola i comercial a la vall del Segre.'),
        box('prova', 'Un riu que connecta', 'Situa Lleida i Tortosa al mapa amb el Segre i l’Ebre. Quin avantatge tenia viure o comerciar a prop d’aquests rius?')),
      section('alqueries', 'Les alqueries i els conreus',
        essencial('Una **alqueria** era un petit assentament rural amb terres de conreu.'),
        p('En alguns llocs es conreava aprofitant séquies i altres sistemes de reg. Les alqueries, els camins i les ciutats formaven una xarxa per moure gent i productes.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Situa parts de l’actual Catalunya a Al-Àndalus i explica la vida de ciutats i alqueries.',
    curriculum: [{ row: 'medi:passat', section: 'vida', note: 'Situa parts de l’actual Catalunya a Al-Àndalus i explica la vida de ciutats i alqueries.' }],
    sources: [
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Agència Catalana de l’Aigua · Cartografia i geoserveis', 'https://aca.gencat.cat/ca/laigua/consulta-de-dades/cartografia-geoserveis/'],
      ['Museu de Lleida · Al-Àndalus', 'https://museudelleida.cat/collection/al-andalus/'],
      ['Museu de Tortosa · Turtuxa', 'https://www.museudetortosa.cat/museu/exposicio-permanent/turtuxa'],
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
    ],
  });

  addTopic('M037', {
    id: 'comtats-i-feudalisme',
    title: 'Dels comtats a les terres feudals',
    intro: 'Una frontera pot donar lloc a castells i comtats. Amb els segles, aquells territoris canvien de govern i amplien les seves relacions.',
    coverFigure: 'comtats-i-frontera-carolingia',
    figures: [
      {
        id: 'comtats-i-frontera-carolingia', section: 'frontera', name: 'Dos comtats en una zona de frontera', ratio: 2280 / 1500,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'El mapa assenyala els comtats de Girona i Barcelona. Una fletxa apunta cap al món franc i una franja tramada indica la zona de frontera amb Al-Àndalus.',
        caption: 'Esquema del segle IX. La Marca Hispànica incloïa diversos comtats i territoris fronterers. La trama representa una franja aproximada.',
        credit: 'Cartografia física Natural Earth i NOAA/NCEI ETOPO 2022. Franja orientativa segons el Museu d’Història de Catalunya.',
        variants: {
          pla: { src: 'illustracions/m037/comtats-i-frontera-carolingia-pla.png', thumbnail: 'illustracions/m037/miniatures/comtats-i-frontera-carolingia-pla.jpg' },
          atles: { src: 'illustracions/m037/comtats-i-frontera-carolingia-atles.png', thumbnail: 'illustracions/m037/miniatures/comtats-i-frontera-carolingia-atles.jpg' },
        },
      },
      {
        id: 'autonomia-creixent-i-988', section: 'autonomia', name: 'Una data dins d’un procés', ratio: 2280 / 1000,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Una banda tramada representa l’autonomia creixent dels comtes. Una marca indica el 988 al tram final del segle X i la banda continua cap al segle XI.',
        caption: 'El 988 serveix de referència per interpretar l’afebliment del vincle amb la monarquia franca. El procés venia d’abans i va seguir ritmes diferents segons el comtat.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m037/autonomia-creixent-i-988-pla.png', thumbnail: 'illustracions/m037/miniatures/autonomia-creixent-i-988-pla.jpg' },
          atles: { src: 'illustracions/m037/autonomia-creixent-i-988-atles.png', thumbnail: 'illustracions/m037/miniatures/autonomia-creixent-i-988-atles.jpg' },
        },
      },
      {
        id: 'mateix-lloc-noves-obligacions', section: 'poblament', name: 'Un mateix lloc amb noves obligacions', ratio: 2280 / 1280,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dos plànols conserven una casa, un camí i un camp. Al segon, s’afegeixen noves terres i una fletxa mostra una renda de gra cap al domini senyorial.',
        caption: 'Cas imaginari. Alguns habitants continuen al lloc mentre es reparteixen noves terres i canvia qui rep una part de la collita. Quina font ho podria documentar?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m037/mateix-lloc-noves-obligacions-pla.png', thumbnail: 'illustracions/m037/miniatures/mateix-lloc-noves-obligacions-pla.jpg' },
          atles: { src: 'illustracions/m037/mateix-lloc-noves-obligacions-atles.png', thumbnail: 'illustracions/m037/miniatures/mateix-lloc-noves-obligacions-atles.jpg' },
        },
      },
    ],
    sections: [
      section('frontera', 'Comtats a la frontera carolíngia',
        essencial('Els **comtats catalans** es van formar en territoris vinculats a l’Imperi carolingi, a prop de la frontera amb Al-Àndalus.'),
        p('Els comtes hi exercien funcions de govern. La **Marca Hispànica** és el nom que s’utilitza per parlar d’aquella zona de frontera formada per diversos comtats i territoris.')),
      section('autonomia', 'Una autonomia guanyada amb el temps',
        essencial('Els comtes van actuar amb una autonomia cada vegada més gran respecte dels reis francs.'),
        p('El comtat de Barcelona va guanyar pes amb el temps. A finals del segle X es va afeblir el vincle amb la monarquia franca. Va ser un procés d’anys i va afectar de manera diferent cada comtat.')),
      section('poblament', 'Conquesta i reorganització del territori',
        essencial('Durant els segles XI i XII, els comtes van ampliar els dominis i van reorganitzar espais ja habitats.'),
        p('Les conquestes i els canvis de poblament van portar repartiments de terres i arribada de nous habitants. Altres persones van romandre, van ser desplaçades o van perdre terres. El mot «repoblament» no implica que totes les zones fossin buides.'),
        box('prova', 'Canvis d’habitants i de poder', 'Explica amb un exemple per què el govern d’una terra pot canviar mentre una part dels habitants hi continua vivint. Quina font permetria comprovar-ho?')),
      section('feudalisme', 'Terres, protecció i poder',
        essencial('En una societat **feudal**, els senyors controlaven terres i podien exigir rendes o serveis a la pagesia.'),
        p('Alguns nobles es comprometien a donar ajuda i fidelitat a altres a canvi de terres o drets. Monestirs, bisbats i senyors laics també podien controlar dominis. Les condicions variaven segons el lloc.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Segueix l’origen dels comtats catalans, l’autonomia creixent i les transformacions feudals i de poblament.',
    curriculum: [{ row: 'medi:passat', section: 'poblament', note: 'Segueix l’origen dels comtats catalans, l’autonomia creixent i les transformacions feudals i de poblament.' }],
    sources: [
      ['Museu d’Història de Catalunya · La frontera d’Europa', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/el_naixement_d_una_nacio/la_frontera_d_europa'],
      ['Museu d’Història de Catalunya · Guia del museu', 'https://www.mhcat.cat/enmhc/visiting_the_museum/plano_libreria/guide_to_visit_the_museum/audio_guide/guia_de_visita_al_museo/segona_planta'],
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
    ],
  });

  addTopic('M038', {
    id: 'regnes-peninsulars-medievals',
    title: 'Una península amb regnes canviants',
    intro: 'Si comparem tres mapes separats per segles veurem que canvien fronteres, governants i habitants. Un mapa amb data permet tractar aquests canvis amb més precisió.',
    coverFigure: 'peninsula-per-segles',
    figures: [
      {
        id: 'peninsula-per-segles', section: 'segles', name: 'Tres mapes de la península', ratio: 2280 / 1440,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres mapes de la mateixa península cap al 1070, 1190 i 1350. Les llegendes amb lletres identifiquen els governs de cada moment. El punt de Granada es manté.',
        caption: 'Els tres mapes tenen la mateixa escala. Les lletres assenyalen llocs de referència de cada govern i les trames són orientatives. El punt fosc situa la ciutat de Granada.',
        credit: 'Cartografia física Natural Earth i NOAA/NCEI ETOPO 2022. Selecció històrica a partir de l’Atlas Nacional de España i l’Atlas de la Historia del Territorio de Andalucía.',
        variants: {
          pla: { src: 'illustracions/m038/peninsula-per-segles-pla.png', thumbnail: 'illustracions/m038/miniatures/peninsula-per-segles-pla.jpg' },
          atles: { src: 'illustracions/m038/peninsula-per-segles-atles.png', thumbnail: 'illustracions/m038/miniatures/peninsula-per-segles-atles.jpg' },
        },
      },
      {
        id: 'fronteres-pactes-i-treves', section: 'exercits', name: 'Una frontera que canvia de maneres diferents', ratio: 2280 / 1210,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres parelles de dibuixos conserven un riu i dos nuclis. Canvis en la trama o en els símbols representen un canvi de control, una unió i una treva.',
        caption: 'Tres models imaginaris. Compara el control del territori, els acords entre governants i la interrupció dels enfrontaments. Què es manté al paisatge?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m038/fronteres-pactes-i-treves-pla.png', thumbnail: 'illustracions/m038/miniatures/fronteres-pactes-i-treves-pla.jpg' },
          atles: { src: 'illustracions/m038/fronteres-pactes-i-treves-atles.png', thumbnail: 'illustracions/m038/miniatures/fronteres-pactes-i-treves-atles.jpg' },
        },
      },
      {
        id: 'dos-moments-un-lloc-habitat', section: 'poblament', name: 'Qui es queda i qui hi arriba?', ratio: 2280 / 1260,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Els dos plànols mantenen la casa, el camp i el camí. Al segon s’hi distingeixen una parcel·la nova en un altre costat i una indicació de canvi de govern.',
        caption: 'Model d’un nucli habitat en dos moments. Una part del nucli es manté i s’hi afegeix una parcel·la. Què podria explicar una carta de poblament?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m038/dos-moments-un-lloc-habitat-pla.png', thumbnail: 'illustracions/m038/miniatures/dos-moments-un-lloc-habitat-pla.jpg' },
          atles: { src: 'illustracions/m038/dos-moments-un-lloc-habitat-atles.png', thumbnail: 'illustracions/m038/miniatures/dos-moments-un-lloc-habitat-atles.jpg' },
        },
      },
    ],
    sections: [
      section('segles', 'Tres moments per comparar',
        essencial('Als segles XI, XII i XIV, la Península estava repartida entre diversos regnes i territoris. Les fronteres van canviar.'),
        p('Al segle XI hi havia, entre altres, Lleó, Castella, Navarra, Aragó, els comtats catalans i regnes de taifes en terres andalusines. Al segle XII es van formar el regne de Portugal i la unió que coneixem com a Corona d’Aragó. Al XIV destaquen Castella, Portugal, Navarra, la Corona d’Aragó i el regne nassarita de Granada.')),
      section('exercits', 'Expandir-se amb conquestes i pactes',
        essencial('Els **exèrcits** van ser importants en els canvis de fronteres. Els pactes, les unions entre cases governants i les treves també hi van influir.'),
        p('Alguns llocs estaven fortificats perquè controlaven un pas, una vall o un camí. Els conflictes afectaven la pagesia i els nuclis urbans i comportaven nous impostos o canvis d’autoritat.')),
      section('poblament', 'Qui vivia als territoris conquerits?',
        essencial('Després de les conquestes es podien repartir terres, arribar nous pobladors o mantenir-hi part de la població anterior.'),
        p('Alguns governs atorgaven cartes de poblament amb normes i avantatges per atraure veïns. També hi hagué desplaçaments i situacions de desigualtat. Convé comprovar què va passar en cada cas.'),
        box('prova', 'Comparar dos mapes i una font', 'Localitza Granada en un mapa del segle XIV. Compara’l amb un mapa del segle XI. Quin canvi polític hi veus? Quina font et podria ajudar a saber si els habitants del lloc també van canviar?')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Compara la Península dels segles XI, XII i XIV i analitza conquestes, aliances i poblament.',
    curriculum: [{ row: 'medi:passat', section: 'poblament', note: 'Compara la Península dels segles XI, XII i XIV i analitza conquestes, aliances i poblament.' }],
    sources: [
      ['IGN · Atlas Nacional de España, capítol 6', 'https://www.ign.es/web/resources/docs/IGNCnig/ANE/Capitulos/06_Referenciashistoricas.pdf'],
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Junta de Andalucía · Organització territorial d’Al-Àndalus', 'https://www.juntadeandalucia.es/institutodeestadisticaycartografia/atlasterritorio/at/pdf/13_organizacionterritorialdealandalus.pdf'],
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
      ['MHC · L’expansió de la Corona d’Aragó', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/el_naixement_d_una_nacio/l_expansio_de_la_corona_d_arago'],
    ],
  });

  addTopic('M039', {
    id: 'noblesa-i-castells',
    title: 'El castell, estratègia i vida quotidiana',
    intro: 'Un castell pot dominar una ruta i allotjar persones alhora. El seu plànol permet descobrir quins espais responien a cada necessitat.',
    coverFigure: 'planta-castell-espais-i-usos',
    figures: [
      {
        id: 'planta-castell-espais-i-usos', section: 'parts', name: 'Planta i tall d’un castell', ratio: 2400 / 1509,
        width: 100, position: 'center', wrap: false, anchor: 'paragraph-1',
        variants: {
          pla: {
            src: 'illustracions/m039/planta-castell-espais-i-usos-pla.png?v=0.1.88',
            thumbnail: 'illustracions/m039/miniatures/planta-castell-espais-i-usos-pla.jpg?v=0.1.88',
            alt: 'Planta d’un castell. L’entrada dona al pati amb la torre i el magatzem al fons. Un traç discontinu delimita la cisterna sota el pati.',
            caption: 'Planta d’un castell imaginari. La trama marca la cisterna que hi ha sota el pati.',
            credit: 'Dibuix didàctic de producció pròpia.',
          },
          atles: {
            src: 'illustracions/m039/planta-castell-espais-i-usos-atles.png?v=0.1.88',
            thumbnail: 'illustracions/m039/miniatures/planta-castell-espais-i-usos-atles.jpg?v=0.1.88',
            alt: 'Tall oblic del mateix castell. Al davant i a l’esquerra es veuen la boca i el nivell de l’aigua al dipòsit sota el pati.',
            caption: 'Reconstrucció didàctica del mateix castell. El tall permet veure la boca i el dipòsit d’aigua sota el pati.',
            credit: 'Il·lustració generada i retolada per a Món a mà.',
          },
        },
      },
      {
        id: 'castell-carena-i-cami', section: 'situacio', name: 'Què es veu des del castell?', ratio: 2280 / 1380,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Dues línies discontínues surten del castell. Una arriba al tram visible del camí i l’altra topa amb una carena que amaga el tram llunyà.',
        caption: 'Tall esquemàtic d’un paisatge. Una línia arriba al camí de la vall. L’altra acaba on la carena interromp la visió.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m039/castell-carena-i-cami-pla.png', thumbnail: 'illustracions/m039/miniatures/castell-carena-i-cami-pla.jpg' },
          atles: { src: 'illustracions/m039/castell-carena-i-cami-atles.png', thumbnail: 'illustracions/m039/miniatures/castell-carena-i-cami-atles.jpg' },
        },
      },
      {
        id: 'feines-d-un-castell', section: 'estaments', name: 'Un espai de residència i govern', ratio: 1200 / 1280,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'Tres vinyetes mostren una persona amb un llibre de comptes, una altra al costat d’atuells de magatzem i una altra preparant menjar vora el foc.',
        caption: 'Tres feines possibles en alguns castells. Fixa’t en els objectes i explica què està fent cada persona.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m039/feines-d-un-castell-pla.png', thumbnail: 'illustracions/m039/miniatures/feines-d-un-castell-pla.jpg' },
          atles: { src: 'illustracions/m039/feines-d-un-castell-atles.png', thumbnail: 'illustracions/m039/miniatures/feines-d-un-castell-atles.jpg' },
        },
      },
    ],
    sections: [
      section('estaments', 'Qui tenia terres i privilegis?',
        essencial('En molts territoris medievals, la **noblesa** tenia privilegis i controlava terres i drets. Part del clergat també exercia poder.'),
        p('El terme **estament** agrupa persones amb una posició social i uns drets semblants. Dins de cada grup hi havia diferències de riquesa i d’autoritat.')),
      section('situacio', 'El castell dins del territori',
        essencial('El **castell** podia servir per controlar un territori i defensar un pas. També podia ser residència i centre de govern.'),
        p('Els castells sovint se situaven en llocs elevats. Les vistes, l’accés a l’aigua i la proximitat a camins eren factors importants. El conjunt podia canviar d’ús durant els segles.')),
      section('parts', 'Muralles, torres i espais interiors',
        essencial('La muralla tanca un recinte. Les torres permeten observar l’entorn i el pati distribueix l’accés a diversos espais.'),
        p('Una **cisterna** permet guardar aigua. En força castells també hi havia cuina, sales de residència i magatzems. Les parts varien segons la mida i l’època de l’edifici.'),
        box('prova', 'Dibuixa un castell que funcioni', 'En una planta senzilla, situa una entrada, una cisterna, una torre i un magatzem. Explica dues decisions amb la funció de cada espai.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Relaciona el poder de la noblesa amb la funció i els espais del castell medieval.',
    curriculum: [{ row: 'medi:passat', section: 'parts', note: 'Relaciona el poder de la noblesa amb la funció i els espais del castell medieval.' }],
    sources: [
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
      ['MHC · La mar nostra', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/la_mar_nostra'],
    ],
  });

  addTopic('M040', {
    id: 'pagesia-i-feus',
    title: 'Treballar i viure en un domini feudal',
    intro: 'Als marges d’un llogaret hi ha camps, boscos i camins. Qui hi treballava i qui decidia com se n’aprofitaven els recursos?',
    coverFigure: 'paisatge-de-llogaret-i-moli',
    figures: [
      {
        id: 'paisatge-de-llogaret-i-moli', section: 'conreus', name: 'Un llogaret i el seu entorn', ratio: 2280 / 1340,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Camins connecten les cases del llogaret amb els camps, les pastures i el molí d’aigua. Al fons hi ha una zona de bosc.',
        caption: 'Cas esquemàtic d’un domini rural. Ressegueix com s’arriba del llogaret al camp o al molí. Què hi podria obtenir una família?',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m040/paisatge-de-llogaret-i-moli-pla.png', thumbnail: 'illustracions/m040/miniatures/paisatge-de-llogaret-i-moli-pla.jpg' },
          atles: { src: 'illustracions/m040/paisatge-de-llogaret-i-moli-atles.png', thumbnail: 'illustracions/m040/miniatures/paisatge-de-llogaret-i-moli-atles.jpg' },
        },
      },
      {
        id: 'quatre-moments-del-cereal', section: 'produccio', name: 'Del conreu al graner', ratio: 2280 / 1420,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Quatre vinyetes mostren treballar la terra, escampar llavors, collir i desar sacs de gra. Un requadre separat mostra una parcel·la en guaret.',
        caption: 'Quatre moments de la feina amb el cereal. Els ritmes i les eines podien variar segons el conreu i el lloc. Una vinyeta mostra una parcel·la en guaret.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m040/quatre-moments-del-cereal-pla.png', thumbnail: 'illustracions/m040/miniatures/quatre-moments-del-cereal-pla.jpg' },
          atles: { src: 'illustracions/m040/quatre-moments-del-cereal-atles.png', thumbnail: 'illustracions/m040/miniatures/quatre-moments-del-cereal-atles.jpg' },
        },
      },
      {
        id: 'renda-en-productes-diners-i-feina', section: 'dominis', name: 'Tres formes de complir una obligació', ratio: 1200 / 1120,
        width: 50, position: 'right', wrap: true, anchor: 'after',
        alt: 'La primera targeta mostra sacs de gra, la segona monedes i la tercera una persona que treballa el camp.',
        caption: 'Tres exemples esquemàtics de renda. Les obligacions variaven segons el lloc i els acords.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m040/renda-en-productes-diners-i-feina-pla.png', thumbnail: 'illustracions/m040/miniatures/renda-en-productes-diners-i-feina-pla.jpg' },
          atles: { src: 'illustracions/m040/renda-en-productes-diners-i-feina-atles.png', thumbnail: 'illustracions/m040/miniatures/renda-en-productes-diners-i-feina-atles.jpg' },
        },
      },
    ],
    sections: [
      section('pagesia', 'La feina de la pagesia',
        essencial('La major part de la població medieval vivia al camp. La **pagesia** conreava la terra i criava animals.'),
        p('Homes, dones i infants contribuïen de maneres diverses a les tasques domèstiques i agrícoles. Algunes famílies tenien terres pròpies i altres treballaven terres sota drets d’un senyor.')),
      section('produccio', 'Collites al ritme de les estacions',
        essencial('Les collites depenien del clima, de la terra i del treball. Els cereals tenien un paper important en l’alimentació.'),
        p('També es conreaven llegums, hortalisses o vinya, segons el paisatge. Es podia deixar una part del camp en guaret per recuperar-ne la fertilitat i aprofitar altres parts per pasturar.')),
      section('dominis', 'Rendes i obligacions',
        essencial('En un **domini senyorial**, el senyor podia cobrar rendes o exigir serveis a canvi de l’ús de terres o recursos.'),
        p('La renda es podia pagar amb productes, diners o feina, segons el lloc. En alguns dominis també es pagava per fer servir determinats molins, forns o altres instal·lacions.'),
        box('prova', 'Posa nom a tres usos del paisatge', 'Dibuixa un llogaret, un camp i un molí. Anota què en podia obtenir una família pagesa i quin pagament o condició podia afectar l’ús d’algun d’aquests espais.')),
      section('conreus', 'El paisatge que envolta els camps',
        essencial('Al voltant dels conreus hi podia haver pastures, boscos i recursos compartits.'),
        p('Boscos i pastures proporcionaven llenya, fruits i aliment per als animals. L’accés a aquests espais depenia de normes i acords i podia provocar conflictes.')),
      section('llogaret', 'A prop de casa, allò necessari',
        essencial('En un **llogaret** hi havia un grup petit d’habitatges, camins i espais de feina.'),
        p('Un pou, un hort, una església o un corral podien formar part del paisatge. Algunes famílies vivien en masos més aïllats i es desplaçaven per anar al mercat o al molí.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Interpreta l’organització d’un domini feudal, el treball de la pagesia i els usos de conreus i espais comuns.',
    curriculum: [{ row: 'medi:passat', section: 'dominis', note: 'Interpreta l’organització d’un domini feudal, el treball de la pagesia i els usos de conreus i espais comuns.' }],
    sources: [
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
      ['MHC · La mar nostra', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/la_mar_nostra'],
    ],
  });

  addTopic('M041', {
    id: 'corona-arago-mediterrania',
    title: 'La Corona d’Aragó a la Mediterrània',
    intro: 'Des d’un port es veuen vaixells que parteixen cap a altres ports. A terra, comerciants i artesans treballen en ciutats que formen part d’una corona amb territoris diversos.',
    coverFigure: 'ports-i-fites-mediterranies',
    figures: [
      {
        id: 'ports-i-fites-mediterranies', section: 'comerc', name: 'Ports, territoris i rutes', ratio: 2280 / 1590,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Mapa de la Mediterrània amb punts de port, línies marítimes discontínues i cinc quadrats numerats que es relacionen amb una taula de dates.',
        caption: 'Els traços discontinus mostren exemples de connexions marítimes. Els quadrats numerats remeten a fites polítiques de dates diferents.',
        credit: 'Cartografia física Natural Earth i NOAA/NCEI ETOPO 2022. Fites segons el Museu d’Història de Catalunya i l’Atlas Nacional de España.',
        variants: {
          pla: { src: 'illustracions/m041/ports-i-fites-mediterranies-pla.png', thumbnail: 'illustracions/m041/miniatures/ports-i-fites-mediterranies-pla.jpg' },
          atles: { src: 'illustracions/m041/ports-i-fites-mediterranies-atles.png', thumbnail: 'illustracions/m041/miniatures/ports-i-fites-mediterranies-atles.jpg' },
        },
      },
      {
        id: 'treball-a-les-drassanes', section: 'drassanes', name: 'Una galera a les Drassanes', ratio: 2280 / 1470,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'En una nau coberta amb arcs hi ha una galera de costat sobre suports, fusta i persones amb feines diferents. Un requadre situa la nau respecte de l’aigua.',
        caption: 'Reconstrucció inspirada en les Drassanes Reials de Barcelona. Les persones, les peces i la situació respecte de l’aigua formen part de l’esquema didàctic.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m041/treball-a-les-drassanes-pla.png', thumbnail: 'illustracions/m041/miniatures/treball-a-les-drassanes-pla.jpg' },
          atles: { src: 'illustracions/m041/treball-a-les-drassanes-atles.png', thumbnail: 'illustracions/m041/miniatures/treball-a-les-drassanes-atles.jpg' },
        },
      },
      {
        id: 'diposit-i-pagament-a-la-taula', section: 'taula', name: 'Deixar diners anotats i fer un pagament', ratio: 2280 / 1220,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres escenes mostren monedes dipositades, l’anotació en un llibre amb columnes i el pagament. Cada escena incorpora la mateixa marca de compte.',
        caption: 'Seqüència didàctica de la Taula de Canvi. Una mateixa marca acompanya el dipòsit, l’anotació al llibre i el pagament posterior.',
        credit: 'Dibuix didàctic de producció pròpia.',
        variants: {
          pla: { src: 'illustracions/m041/diposit-i-pagament-a-la-taula-pla.png', thumbnail: 'illustracions/m041/miniatures/diposit-i-pagament-a-la-taula-pla.jpg' },
          atles: { src: 'illustracions/m041/diposit-i-pagament-a-la-taula-atles.png', thumbnail: 'illustracions/m041/miniatures/diposit-i-pagament-a-la-taula-atles.jpg' },
        },
      },
    ],
    sections: [
      section('formacio', 'Una corona, territoris diferents',
        essencial('La **Corona d’Aragó** es va formar amb la unió dinàstica del regne d’Aragó i el casal de Barcelona.'),
        p('L’acord del 1137 va vincular Peronella d’Aragó i Ramon Berenguer IV. Els territoris compartien sobirans, però van mantenir lleis i institucions pròpies.')),
      section('expansio', 'Més territoris a través de la Mediterrània',
        essencial('A partir del segle XIII, la Corona d’Aragó va incorporar territoris com **Mallorca** i **València**.'),
        p('Els seus dominis i influències van variar. En moments diferents, la corona va governar llocs com Sicília, Sardenya i Nàpols. Per comparar dominis, cal mirar mapes amb data i distingir possessions de rutes comercials.')),
      section('comerc', 'Ciutats connectades per rutes de mar',
        essencial('Mercaders i mariners transportaven mercaderies entre ports. Les ciutats reunien tallers, mercats i llocs per guardar productes.'),
        p('La indústria tèxtil i el comerç van donar pes a alguns grups urbans. Els comerciants s’havien d’entendre amb pesos, monedes i normes que podien canviar d’un port a l’altre.')),
      section('drassanes', 'Les Drassanes Reials de Barcelona',
        essencial('Les **drassanes** eren instal·lacions on es construïen i reparaven vaixells. A les Drassanes Reials es feien galeres.'),
        p('Uns espais grans i coberts facilitaven la feina amb fusta, cordes i peces de grans dimensions. La proximitat a l’aigua ajudava a posar els vaixells en servei.')),
      section('taula', 'Una taula per guardar i moure diners',
        essencial('La **Taula de Canvi** de Barcelona es va crear el **1401** com a institució municipal de dipòsit i pagaments.'),
        p('Una persona podia dipositar diners i tenir-los anotats en un compte. En podia fer servir una part per a pagaments. Se’n conserven documents que permeten seguir com s’organitzava.'),
        box('prova', 'Segueix una operació comercial', 'Imagina un vaixell que es repara a Barcelona, surt amb teixits i els ven en un altre port. Marca quan intervenen els artesans, la tripulació i la gent que gestiona els diners.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Formes planes, traços nets i una paleta més gràfica.' },
      { id: 'atles', label: 'Atles', description: 'Volum, textura i contrast de color.' },
    ],
    description: 'Explica la formació i l’expansió mediterrània de la Corona d’Aragó i el paper de les Drassanes i la Taula de Canvi.',
    curriculum: [{ row: 'medi:passat', section: 'taula', note: 'Explica la formació i l’expansió mediterrània de la Corona d’Aragó i el paper de les Drassanes i la Taula de Canvi.' }],
    sources: [
      ['Museu d’Història de Catalunya · L’hegemonia catalana a la Mediterrània', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/la_mar_nostra/l_hegemonia_catalana_a_la_mediterrania'],
      ['IGN · Atlas Nacional de España, capítol 6', 'https://www.ign.es/web/resources/docs/IGNCnig/ANE/Capitulos/06_Referenciashistoricas.pdf'],
      ['Natural Earth · Vectors físics', 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/'],
      ['NOAA/NCEI · ETOPO 2022', 'https://www.ncei.noaa.gov/products/etopo-global-relief-model'],
      ['Museu Marítim de Barcelona · Drassanes i galeres', 'https://www.mmb.cat/exposicions/drassanes-i-galeres/'],
      ['MHC · L’expansió de la Corona d’Aragó', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/el_naixement_d_una_nacio/l_expansio_de_la_corona_d_arago'],
      ['Museu Marítim · Les Drassanes Reials', 'https://www.mmb.cat/exposicions/viatge-en-el-temps-per-les-drassanes-reials-de-barcelona/'],
      ['Arxiu Municipal · Ordinacions de la Taula de Canvi', 'https://patrimoni.gencat.cat/ca/catalunyapaisdarxius/recurs-digital/recurs/document/ordinacions-de-la-taula-de-canvi-de-barcelona/'],
    ],
  });

  addTopic('M042', {
    id: 'viure-ciutat-medieval',
    title: 'Un dia dins les muralles',
    intro: 'A la plaça hi ha mercat i en alguns carrers es treballa el cuir o es ven roba. La ciutat reuneix activitats que sovint no hi ha a cada llogaret.',
    coverFigure: 'planta-ciutat-medieval',
    figures: [
      {
        id: 'planta-ciutat-medieval', section: 'muralla', name: 'D’una porta al mercat i al taller', ratio: 2280 / 1640,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        variants: {
          pla: {
            src: 'illustracions/m042/planta-ciutat-medieval-pla.png', thumbnail: 'illustracions/m042/miniatures/planta-ciutat-medieval-pla.jpg',
            alt: 'Plànol amb muralla, porta, raval, plaça del mercat i taller. Hi ha més d’un camí per arribar a la plaça i al taller.',
            caption: 'Plànol d’un barri medieval imaginari. Troba dos recorreguts possibles entre la porta, la plaça i el taller.',
            credit: 'Dibuix de producció pròpia a partir de la geometria compartida amb la vista elevada.',
          },
          atles: {
            src: 'illustracions/m042/planta-ciutat-medieval-atles.png', thumbnail: 'illustracions/m042/miniatures/planta-ciutat-medieval-atles.jpg',
            alt: 'Vista elevada del mateix barri. La muralla és de pedra i les teulades de teula. A la plaça hi ha dues parades i el taller s’obre al carrer.',
            caption: 'Vista elevada del mateix barri. Fixa’t en la porta i les bifurcacions. Per on aniries de la plaça al taller?',
            credit: 'Reconstrucció didàctica en tres dimensions inspirada en l’urbanisme de la Barcelona medieval.',
          },
        },
      },
      {
        id: 'mercat-oficis-i-productes', section: 'placa', name: 'Una plaça amb feines diferents', ratio: 2280 / 1640,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        variants: {
          pla: {
            src: 'illustracions/m042/mercat-oficis-i-productes-pla.png', thumbnail: 'illustracions/m042/miniatures/mercat-oficis-i-productes-pla.jpg',
            alt: 'Tres vinyetes segueixen unes pomes d’una cistella a la parada i a la mà del comprador. Un requadre separat indica el taller de cuir.',
            caption: 'Segueix les pomes en els tres moments. Quina feina es fa al taller, al costat del mercat?',
            credit: 'Esquema didàctic de producció pròpia.',
          },
          atles: {
            src: 'illustracions/m042/mercat-oficis-i-productes-atles.png', thumbnail: 'illustracions/m042/miniatures/mercat-oficis-i-productes-atles.jpg',
            alt: 'A peu de plaça, una dona porta una cistella de pomes. Una venedora les posa al taulell i un comprador en tria una. A la dreta, un artesà treballa el cuir.',
            caption: 'Reconstrucció d’una plaça medieval. Segueix les pomes de la cistella a la parada. Quina pista deixa veure què es fa al taller?',
            credit: 'Reconstrucció didàctica generada, inspirada en l’activitat del mercat i els oficis urbans medievals.',
          },
        },
      },
      {
        id: 'tres-fonts-sobre-una-epidemia', section: 'malalties', name: 'Tres documents sobre una epidèmia a la ciutat', ratio: 2280 / 1640,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        alt: 'Tres fragments inventats amb transcripcions. Un registre conté dates d’enterrament, un testament deixa estris i una ordenança estableix un avís.',
        caption: 'Tres fragments inventats amb la transcripció en català actual. Quin document serviria per comptar enterraments? Quin ajudaria a entendre una decisió del consell?',
        credit: 'Fragments i transcripcions didàctics de producció pròpia.',
        src: 'illustracions/m042/tres-fonts-sobre-una-epidemia.png', thumbnail: 'illustracions/m042/miniatures/tres-fonts-sobre-una-epidemia.jpg',
      },
    ],
    sections: [
      section('muralla', 'Portes que obren i tanquen',
        essencial('La **muralla** protegia la ciutat. Les portes eren punts de pas i de control.'),
        p('Els camins principals arribaven a les portes. Quan una ciutat creixia podien aparèixer ravals fora del recinte o construir-se una muralla més gran.')),
      section('barris', 'Barris amb oficis i històries diferents',
        essencial('Els barris es podien formar al voltant d’esglésies, mercats, tallers o camins.'),
        p('El nom d’un carrer pot conservar el record d’un ofici o d’una comunitat. Per confirmar qui hi vivia en un segle concret cal consultar altres fonts, com censos o contractes.')),
      section('carrers', 'Carrers per circular i treballar',
        essencial('Molts carrers medievals eren estrets i irregulars. Al costat dels habitatges algunes botigues i tallers obrien directament al carrer.'),
        p('L’espai es compartia entre vianants, transport de càrregues i artesans. L’accés a aigua, els desguassos i la recollida de deixalles podien ser problemes de convivència.'),
        box('prova', 'Un recorregut amb tres parades', 'Dibuixa una porta, una plaça i un taller i traça el recorregut d’una persona que porta gra i busca un encàrrec. Què li facilita cada espai?')),
      section('placa', 'La plaça reuneix la ciutat',
        essencial('La **plaça** servia per comprar, vendre i trobar-se amb altres persones.'),
        p('En algunes s’hi llegien decisions i avisos. Al mercat, els productes procedents del camp entraven en contacte amb els que es fabricaven a tallers urbans.')),
      section('burgesia', 'Tenir un ofici o fer negocis',
        essencial('Sovint anomenem **burgesia** els grups urbans vinculats als negocis, a l’artesania i a altres activitats de la ciutat.'),
        p('Hi havia comerciants rics i treballadors amb recursos molt més limitats. Les oportunitats i la participació en el govern local depenien de la posició social i de les normes de cada ciutat.')),
      section('malalties', 'Malalties i respostes a la ciutat',
        essencial('Les ciutats medievals podien patir epidèmies. La **pesta** del segle XIV va tenir conseqüències profundes.'),
        p('La concentració de persones i el moviment entre pobles i ports facilitaven l’expansió de diverses malalties. Les autoritats i les comunitats intentaven respondre-hi amb els coneixements i els recursos de l’època.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Planta per resseguir els carrers i seqüència per seguir el producte.' },
      { id: 'atles', label: 'Atles', description: 'Vista elevada del barri i reconstrucció a peu de plaça.' },
    ],
    description: 'Interpreta la muralla, els barris i els mercats d’una ciutat medieval i relaciona la vida urbana amb els riscos de malaltia.',
    curriculum: [{ row: 'medi:passat', section: 'carrers', note: 'Interpreta la muralla, els barris i els mercats d’una ciutat medieval i relaciona la vida urbana amb els riscos de malaltia.' }],
    sources: [
      ['Arxiu Municipal de Barcelona · Itinerari per Ciutat Vella', 'https://ajuntament.barcelona.cat/arxiumunicipal/sites/default/files/2022-06/ITINERARI%20PER%20CIUTAT%20VELLA_def.pdf'],
      ['Museu d’Història de Catalunya · Guia del museu', 'https://www.mhcat.cat/enmhc/visiting_the_museum/plano_libreria/guide_to_visit_the_museum/audio_guide/guia_de_visita_al_museo/segona_planta'],
      ['MHC · La mar nostra', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/la_mar_nostra'],
      ['MHC · Edat mitjana', 'https://www.mhcat.cat/esmhc/consulta_la_coleccion/els_destacats_del_museu/els_destacats_del_museu/edat_mitjana'],
    ],
  });

  addTopic('M043', {
    id: 'romanic-i-gotic',
    title: 'Llegim el romànic i el gòtic als edificis',
    intro: 'En entrar en dues esglésies medievals podem observar la forma dels arcs, la llum que hi entra i el pes que han de suportar les parets. Què indica cada detall?',
    coverFigure: 'arcs-i-llum',
    figures: [
      {
        id: 'arcs-i-llum', section: 'romanic', name: 'Arcs i llum a l’interior', ratio: 2280 / 1640,
        width: 100, position: 'center', wrap: false, anchor: 'lead',
        variants: {
          pla: {
            src: 'illustracions/m043/arcs-i-llum-pla.png', thumbnail: 'illustracions/m043/miniatures/arcs-i-llum-pla.jpg',
            alt: 'Dibuix d’un arc de mig punt amb un mur gruixut i una finestra petita, al costat d’un arc apuntat i un finestral més gran.',
            caption: 'Dos perfils de mostra sense escala comuna. Compara la forma dels arcs i l’amplada de les obertures.',
            credit: 'Esquema didàctic de producció pròpia.',
          },
          atles: {
            src: 'illustracions/m043/arcs-i-llum-atles.png', thumbnail: 'illustracions/m043/miniatures/arcs-i-llum-atles.jpg',
            alt: 'Dos interiors imaginats. La llum entra per una finestra petita sota arcs de mig punt i per un finestral gran sota les voltes de creueria.',
            caption: 'Dos interiors imaginats, inspirats en el romànic de la Vall de Boí i el gòtic barceloní. Què canvia en la llum quan són diferents les obertures?',
            credit: 'Reconstruccions generades amb Sant Climent de Taüll i Santa Maria del Mar com a referents d’arquitectura.',
          },
        },
      },
    ],
    sections: [
      section('romanic', 'Arcs rodons i pintures murals',
        essencial('En moltes esglésies **romàniques** hi ha arcs de mig punt, murs gruixuts i finestres petites.'),
        p('Els absis i altres parts de l’interior podien estar decorats amb pintures murals. El cos de l’edifici i el campanar variaven segons els recursos i les necessitats del lloc.')),
      section('boi', 'Les esglésies de la Vall de Boí',
        essencial('A la **Vall de Boí**, al Pirineu, s’ha conservat un conjunt d’esglésies romàniques.'),
        p('A Sant Climent de Taüll destaquen el campanar i les pintures de l’absis. Moltes pintures originals es conserven al Museu Nacional d’Art de Catalunya. L’edifici i les pintures s’han de cuidar cadascun segons les seves necessitats.')),
      section('gotic', 'Arcs apuntats i espais més alts',
        essencial('A l’arquitectura **gòtica** són habituals els arcs apuntats i les voltes de creueria.'),
        p('El pes de les voltes es transmet a punts concrets. Els contraforts ajuden a suportar les empentes i permeten obrir finestrals més grans en molts edificis. Hi ha variants locals i edificis que combinen estils.')),
      section('santa-maria', 'Santa Maria del Mar, una basílica gòtica',
        essencial('**Santa Maria del Mar**, a Barcelona, és una basílica gòtica del segle XIV.'),
        p('L’interior té pilars esvelts i un espai ampli. El barri de la Ribera on es troba estava relacionat amb l’activitat comercial i marítima. La basílica i la catedral de Barcelona són edificis diferents.'),
        box('prova', 'Compara dos edificis', 'Busca una foto de Sant Climent de Taüll i una de Santa Maria del Mar. Anota dues diferències visibles, i digues si la foto mostra l’edifici per dins o per fora.')),
    ],
  }, {
    collection: { id: 'medieval', title: 'L’edat mitjana' },
    theme: 'Història',
    figureStyles: [
      { id: 'pla', label: 'Pla', description: 'Perfils per comparar la forma dels arcs i les obertures.' },
      { id: 'atles', label: 'Atles', description: 'Vistes interiors per observar la llum i els materials.' },
    ],
    description: 'Distingeix elements del romànic i del gòtic i compara la Vall de Boí i Santa Maria del Mar.',
    curriculum: [{ row: 'medi:passat', section: 'santa-maria', note: 'Distingeix elements del romànic i del gòtic i compara la Vall de Boí i Santa Maria del Mar.' }],
    sources: [
      ['Centre del Romànic · Sant Climent de Taüll', 'https://www.centreromanic.com/esglesia/sant-climent-de-taull/'],
      ['Ajuntament de Barcelona · Santa Maria del Mar', 'https://guia.barcelona.cat/detall/visites-a-santa-maria-del-mar_99400477080.html'],
      ['UNESCO · Esglésies romàniques de la Vall de Boí', 'https://whc.unesco.org/en/list/988/'],
      ['MHC · La mar nostra', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/la_mar_nostra'],
    ],
  });

  addTopic('M044', {
    id: 'materia-viva-i-cellules',
    title: 'La vida vista de prop',
    intro: 'Una fulla i un animal poden semblar molt diferents. Si els observem amb prou ampliació, hi reconeixem unitats petites que fan possible la vida.',
    sections: [
      section('materia', 'Què tenen en comú els éssers vius?',
        essencial('Els éssers vius estan formats per una o més **cèl·lules** i duen a terme funcions vitals.'),
        p('La matèria viva conté aigua i moltes substàncies, com sucres, proteïnes i greixos. Una roca també té matèria, però no està organitzada en cèl·lules.')),
      section('cellula', 'Una unitat amb parts que cooperen',
        essencial('La **cèl·lula** és la unitat bàsica dels éssers vius. Una membrana la separa de l’entorn.'),
        p('A l’interior hi ha citoplasma i informació genètica. Algunes cèl·lules tenen un nucli que conté la major part d’aquesta informació. L’estructura de la cèl·lula ajuda a explicar què pot fer.')),
      section('organitzacio', 'Una o moltes cèl·lules',
        essencial('Un ésser **unicel·lular** té una sola cèl·lula. En un organisme **pluricel·lular** n’hi ha moltes que treballen juntes.'),
        p('Un llevat viu com a cèl·lula individual. En una planta, cèl·lules diferents poden protegir la superfície o transportar aigua. Cada grup de cèl·lules especialitzades contribueix a la vida de l’organisme.')),
      section('virus', 'Els virus i les cèl·lules',
        essencial('Els **virus** no són cèl·lules. Necessiten una cèl·lula hoste per fer-ne noves còpies.'),
        p('Per això no els classifiquem als grups d’éssers vius cel·lulars. Un bacteri, en canvi, sí que és una cèl·lula. Distingir-los ajuda a interpretar els noms que apareixen en textos de ciència.'),
        box('prova', 'Una col·lecció de quatre exemples', 'Classifica una roca, un llevat, una alzina i un virus. Indica quins tenen cèl·lules i quins en tenen una o més d’una. Argumenta per què el virus queda en una categoria pròpia.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Distingeix matèria viva, cèl·lules, organismes unicel·lulars i pluricel·lulars, i situa els virus al marge de la classificació cel·lular.',
    curriculum: [{ row: 'medi:vida', section: 'virus', note: 'Distingeix matèria viva, cèl·lules, organismes unicel·lulars i pluricel·lulars, i situa els virus al marge de la classificació cel·lular.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
      ['NHGRI · Virus', 'https://www.genome.gov/genetics-glossary/Virus'],
    ],
  });

  addTopic('M045', {
    id: 'biodiversitat-i-funcions',
    title: 'La vida fa moltes coses de maneres diferents',
    intro: 'Un faig no es mou com una formiga i totes dues espècies responen a l’entorn. Compararem com obtenen matèria i energia, com detecten canvis i com deixen descendència.',
    sections: [
      section('nutricio', 'Obtenir matèria i energia',
        essencial('Amb la **nutrició**, els éssers vius obtenen matèria i energia per mantenir-se i créixer.'),
        p('Moltes plantes aprofiten la llum per elaborar sucres. Els animals obtenen matèria i energia alimentant-se. Els fongs absorbeixen nutrients del medi.')),
      section('relacio', 'Detectar canvis i respondre',
        essencial('La funció de **relació** permet captar canvis i respondre-hi.'),
        p('Els animals poden detectar sons o olors. Algunes plantes orienten el creixement cap a la llum. Respondre a l’entorn no sempre implica desplaçar-se.')),
      section('reproduccio', 'Deixar descendència',
        essencial('Amb la **reproducció** es formen individus nous i es mantenen les poblacions al llarg del temps.'),
        p('Els individus d’una població poden ser diversos. Per créixer i viure, una persona o un animal no necessita tenir descendència.')),
      section('diversitat', 'Moltes espècies i maneres de viure',
        essencial('La **biodiversitat** inclou la varietat d’éssers vius, les diferències entre individus i la diversitat d’ecosistemes.'),
        p('Un bassal temporal i un bosc acullen conjunts diferents d’organismes. Observar-los en més d’un moment ajuda a detectar la vida que no és sempre visible.'),
        box('prova', 'Un pati viu', 'Tria tres organismes que podries observar al pati. Escriu una acció o estructura que relacionis amb una funció vital de cadascun i com la podries observar.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Relaciona biodiversitat, formes de vida i les funcions vitals de nutrició, relació i reproducció.',
    curriculum: [{ row: 'medi:vida', section: 'diversitat', note: 'Relaciona biodiversitat, formes de vida i les funcions vitals de nutrició, relació i reproducció.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });

  addTopic('M046', {
    id: 'classificar-vida',
    title: 'De l’espècie als grans grups',
    intro: 'Classificar és com ordenar molts llibres amb etiquetes. En biologia, canviem les etiquetes quan tenim proves noves sobre el parentiu.',
    sections: [
      section('categories', 'Grups dins de grups',
        essencial('Una classificació pot anar de grups amplis a grups més concrets. Els rangs habituals són **regne, fílum o divisió, classe, ordre, família, gènere i espècie**.'),
        p('Cada nivell conté grups més petits. En el nom científic d’una espècie se solen escriure dos mots, el del gènere i un segon nom que l’identifica dins del gènere.')),
      section('especies', 'Què és una espècie?',
        essencial('Una **espècie** agrupa organismes que comparteixen trets i una història evolutiva pròxima.'),
        p('En molts animals, una pista és que poden tenir descendència fèrtil entre ells. En organismes que es reprodueixen asexualment calen altres criteris.')),
      section('regnes', 'El model escolar dels cinc regnes',
        essencial('La classificació clàssica en cinc regnes agrupava **animals, plantes, fongs, protists i moneres**.'),
        p('Era una manera útil d’ordenar la diversitat. Amb noves dades, especialment de parentiu, els científics han revisat aquests grups. «Moneres» i «protists» són noms de models escolars o agrupacions convencionals.')),
      section('dominis', 'Amb nucli o sense nucli',
        essencial('Les cèl·lules **eucariotes** tenen nucli. Les **procariotes** tenen el material genètic sense un nucli envoltat de membrana.'),
        p('En el model de tres dominis distingim **Bacteria, Archaea i Eukarya**. Bacteris i arqueus són procariotes. Els animals, plantes, fongs i els organismes que solem anomenar protists són eucariotes.'),
        box('prova', 'Classifica sense saltar nivells', 'Ordena «espècie, família, gènere, regne» de més ampli a més concret. Després dibuixa tres cercles per als dominis i situa-hi un bacteri, un arqueu i una alzina.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Practica les categories taxonòmiques i compara la classificació històrica en cinc regnes amb el model dels tres dominis.',
    curriculum: [{ row: 'medi:vida', section: 'dominis', note: 'Practica les categories taxonòmiques i compara la classificació històrica en cinc regnes amb el model dels tres dominis.' }],
    sources: [
      ['OpenStax · Classificació i tres dominis', 'https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology'],
    ],
  });

  addTopic('M047', {
    id: 'vertebrats-i-entorn',
    title: 'Vertebrats que viuen en medis diferents',
    intro: 'Com pots saber que un ratpenat és mamífer i una balena també? Per classificar un animal necessitem més d’una pista sobre el seu cos.',
    sections: [
      section('columna', 'Una columna a l’interior',
        essencial('Els **vertebrats** tenen columna vertebral. Amb l’esquelet intern poden sostenir el cos i protegir parts delicades.'),
        p('L’esquelet no té la mateixa forma en tots els vertebrats. La forma de les extremitats, les aletes o les ales es relaciona amb maneres diferents de moure’s.')),
      section('peixos-amfibis', 'Peixos i amfibis',
        essencial('Molts **peixos** viuen a l’aigua i respiren amb brànquies. Molts **amfibis** passen d’una larva aquàtica a una forma adulta diferent.'),
        p('La majoria dels peixos tenen aletes. Una granota pot respirar amb pulmons i a través de la pell. Alguns amfibis no tenen el mateix cicle de vida que la granota.')),
      section('reptils-ocells', 'Escates i plomes',
        essencial('Molts **rèptils** tenen la pell coberta d’escates. Els **ocells** tenen plomes.'),
        p('Un llangardaix i una tortuga són rèptils. Un pingüí és un ocell encara que no voli. En la classificació evolutiva, els ocells formen part de la branca dels rèptils.')),
      section('mamifers', 'Pèl i llet',
        essencial('Els **mamífers** tenen pèl en alguna etapa i les femelles produeixen llet per alimentar les cries.'),
        p('Les balenes respiren amb pulmons i alimenten les cries amb llet. La forma del seu cos s’assembla en alguns aspectes a la dels peixos perquè es mouen pel mateix medi.'),
        box('prova', 'Agrupa per dues pistes', 'Classifica una granota, un lluç, una serp, un pingüí i un ratpenat. Escriu una pista de cada classificació i explica per què «té ales» sola no resol els dos últims casos.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Compara peixos, amfibis, rèptils, ocells i mamífers amb trets observables i contraexemples.',
    curriculum: [{ row: 'medi:vida', section: 'mamifers', note: 'Compara peixos, amfibis, rèptils, ocells i mamífers amb trets observables i contraexemples.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });

  addTopic('M048', {
    id: 'invertebrats-i-formes',
    title: 'Sis pistes per reconèixer invertebrats',
    intro: 'La majoria de les espècies animals no tenen columna vertebral. Una medusa i una formiga ens mostren fins a quin punt es poden assemblar poc.',
    sections: [
      section('cucs', 'Anèl·lids i altres animals amb cos allargat',
        essencial('Els **anèl·lids**, com el cuc de terra, tenen el cos dividit en segments.'),
        p('«Cuc» és una paraula corrent per a animals allargats de grups diferents. Fixa’t en la segmentació i altres trets abans de triar un grup.')),
      section('marins', 'Meduses, esponges i estrelles de mar',
        essencial('Les meduses són **cnidaris**, les esponges són **porífers** i les estrelles de mar són **equinoderms**.'),
        p('Les esponges fan circular aigua pels porus. Els cnidaris poden tenir tentacles amb cèl·lules urticants. Molts equinoderms adults tenen parts disposades al voltant d’un centre.')),
      section('articulats', 'Cossos tous i potes articulades',
        essencial('Molts **mol·luscs** tenen cos tou. Els **artròpodes** tenen un esquelet extern i apèndixs articulats.'),
        p('Els cargols, els musclos i els pops són mol·luscs, amb petxina externa o sense. Els insectes, les aranyes i els crustacis són artròpodes, però no tenen tots el mateix nombre de potes.'),
        box('prova', 'Munta una clau de tres preguntes', 'Tria sis animals d’aquests grups. Inventa tres preguntes sobre trets visibles que ajudin a separar-los. Quan una pregunta sigui insuficient, mostra quin cas provoca el dubte.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Reconeix anèl·lids, cnidaris, equinoderms, porífers, mol·luscs i artròpodes per trets del seu cos.',
    curriculum: [{ row: 'medi:vida', section: 'articulats', note: 'Reconeix anèl·lids, cnidaris, equinoderms, porífers, mol·luscs i artròpodes per trets del seu cos.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });

  addTopic('M049', {
    id: 'plantes-i-grans-grups',
    title: 'Plantes amb espores, llavors i flors',
    intro: 'Una molsa al peu d’un mur, una falguera i un pi poden viure sense tenir flors vistoses. Mirem quina informació ens dona cada estructura.',
    sections: [
      section('llum', 'Matèria i energia a partir de la llum',
        essencial('En la **fotosíntesi**, moltes plantes utilitzen llum, aigua i diòxid de carboni per elaborar sucres i alliberen oxigen.'),
        p('La **clorofil·la** ajuda a captar llum. Les plantes que elaboren la seva matèria orgànica a partir de substàncies senzilles són autòtrofes. També respiren.')),
      section('espores', 'Molses i falgueres',
        essencial('Les **molses** i les **falgueres** es reprodueixen amb espores i no fan llavors.'),
        p('Les molses són petites i solen viure on troben humitat en alguna època. Les falgueres poden portar grups d’estructures amb espores a la cara inferior de les fulles.')),
      section('llavors', 'Llavors al fruit o fora del fruit',
        essencial('Les **gimnospermes**, com el pi, no tenen les llavors tancades dins d’un fruit. Les **angiospermes** fan flors i fruits.'),
        p('En una pinya madura algunes escates deixen sortir les llavors. En un tomàquet, el fruit envolta les llavors. Hi ha flors petites que es passen per alt quan mirem una planta.'),
        box('prova', 'Tres observacions', 'Relaciona una pinya, una fulla de falguera amb punts a sota i una flor de mongetera amb tres estratègies. Digues quines estructures t’han servit de pista.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Explica la fotosíntesi i diferencia molses, falgueres, gimnospermes i angiospermes.',
    curriculum: [{ row: 'medi:vida', section: 'llavors', note: 'Explica la fotosíntesi i diferencia molses, falgueres, gimnospermes i angiospermes.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });

  addTopic('M050', {
    id: 'vida-dels-fongs',
    title: 'Fongs que veiem i fongs que passen desapercebuts',
    intro: 'Un bolet apunta fora de terra. Una floridura cobreix una superfície i un llevat fa créixer una massa de pa. Què comparteixen?',
    sections: [
      section('nutricio', 'Els fongs absorbeixen nutrients',
        essencial('Els **fongs** són heteròtrofs. Obtenen nutrients de matèria orgànica de l’entorn.'),
        p('Molts descomponen restes d’éssers vius. Altres poden viure associats a plantes o obtenir nutrients de cossos vius. Aquestes relacions no tenen totes els mateixos efectes.')),
      section('bolets', 'Un bolet és una part del fong',
        essencial('El **bolet** és una estructura reproductora d’alguns fongs. La part que s’estén pel medi s’anomena **miceli**.'),
        p('El miceli es compon de filaments molt fins. Els bolets poden formar espores que es dispersen. Hi ha fongs que no fan cap bolet visible.')),
      section('llevats-floridures', 'Llevats i floridures a la vida quotidiana',
        essencial('Molts **llevats** són unicel·lulars. Les **floridures** solen créixer formant filaments.'),
        p('Alguns llevats produeixen gas quan intervenen en la preparació del pa. Alguns fongs es fan servir en aliments i altres en malmeten. La funció depèn de l’espècie i de l’entorn.'),
        box('prova', 'Per què no és una planta?', 'Compara un bolet i una molsa. Explica la diferència en com obtenen nutrients, i recorda per què veure un bolet no ens mostra tot el fong.')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Distingeix bolets, llevats i floridures, i descriu el paper dels fongs en el reciclatge de la matèria i en la vida quotidiana.',
    curriculum: [{ row: 'medi:vida', section: 'llevats-floridures', note: 'Distingeix bolets, llevats i floridures, i descriu el paper dels fongs en el reciclatge de la matèria i en la vida quotidiana.' }],
    sources: [
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });

  addTopic('M051', {
    id: 'microorganismes-i-microbiota',
    title: 'Món microscòpic, algues, protists i bacteris',
    intro: 'En una gota d’aigua i també dins del cos es poden trobar éssers vius molt petits. Les paraules que els agrupen no volen dir totes el mateix.',
    sections: [
      section('protists', 'Protists, un nom que agrupa molta diversitat',
        essencial('Sovint diem **protists** a molts organismes eucariotes que no es classifiquen com a animals, plantes terrestres o fongs.'),
        p('Molts són unicel·lulars. «Protozou» s’empra per a alguns que obtenen nutrients d’altres organismes o restes. El grup escolar no representa una sola branca evolutiva.')),
      section('algues', 'Algues senzilles i algues grans',
        essencial('Moltes **algues** fan fotosíntesi. N’hi ha d’unicel·lulars i també de pluricel·lulars.'),
        p('Diverses algues microscòpiques formen part del fitoplàncton. Les algues marines grans agrupen organismes de llinatges diferents. No confonguis el nom corrent amb una categoria única de parentiu.')),
      section('bacteris', 'Bacteris i vida en comunitat',
        essencial('Els **bacteris** són unicel·lulars i procariotes. La **microbiota** és el conjunt de microorganismes d’un lloc, com l’intestí.'),
        p('El nom tradicional «flora intestinal» es refereix a la microbiota intestinal. Inclou molts bacteris i altres microorganismes. Els bacteris són molt diversos i no tots tenen els mateixos efectes.'),
        box('prova', 'Tria una etiqueta i justifica-la', 'Compara una alga unicel·lular, una de gran i un bacteri. Indica quins tenen nucli i quins podrien fer fotosíntesi. Per què «petit» no serveix com a classificació?')),
    ],
  }, {
    collection: { id: 'vida', title: 'La diversitat de la vida' },
    theme: 'Éssers vius',
    description: 'Compara algues, protozous i bacteris i explica què és la microbiota.',
    curriculum: [{ row: 'medi:vida', section: 'bacteris', note: 'Compara algues, protozous i bacteris i explica què és la microbiota.' }],
    sources: [
      ['OpenStax · Classificació i tres dominis', 'https://openstax.org/books/biology-2e/pages/1-2-themes-and-concepts-of-biology'],
      ['OpenStax · Biologia', 'https://openstax.org/books/biology-2e/pages/1-introduction'],
    ],
  });
}
