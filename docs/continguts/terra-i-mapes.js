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

  addTopic('M008', {
    id: 'muntanyes-i-rius-europa',
    title: 'De les muntanyes als grans rius d’Europa',
    intro: 'En un mapa d’Europa, els colors del relleu i les línies dels rius expliquen coses diferents. Podem llegir-los junts i seguir l’aigua fins on arriba.',
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
    description: 'Situa els Alps, el Caucas i la Gran Plana Europea i compara el recorregut del Danubi amb el del Volga.',
    curriculum: [{ row: 'medi:cartografia', section: 'volga', note: 'Situa els Alps, el Caucas i la Gran Plana Europea i compara el recorregut del Danubi amb el del Volga.' }],
    sources: [
      ['ICGC · El món en català', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/Didactics-i-ludics/El-Mon-en-catala'],
    ],
  });

  addTopic('M009', {
    id: 'relleu-espanya',
    title: 'De la Meseta al relleu de les illes',
    intro: 'Si féssim un viatge des del centre de la península fins a la costa i les illes, passaríem per altiplans, serralades i depressions. On trobaríem cada paisatge?',
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
    description: 'S’organitza el relleu d’Espanya a partir de la Meseta, les serralades, les depressions i el relleu dels arxipèlags.',
    curriculum: [{ row: 'medi:cartografia', section: 'guadalquivir', note: 'S’organitza el relleu d’Espanya a partir de la Meseta, les serralades, les depressions i el relleu dels arxipèlags.' }],
    sources: [
      ['IGN · Les unitats del relleu peninsular', 'https://educativo.ign.es/atlas-didactico/relieve-bach/las_grandes_unidades_del_relieve_peninsular.html'],
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
    ],
  });

  addTopic('M010', {
    id: 'costes-i-rius-espanya',
    title: 'Tres vessants i moltes costes',
    intro: 'Una gota d’aigua que cau a la Península pot acabar al Cantàbric, a l’Atlàntic o a la Mediterrània. El relleu ens dona pistes per explicar quin camí farà.',
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
    description: 'Agrupa els rius peninsulars per vessants i relaciona el relleu de les costes i les illes amb els recorreguts de l’aigua.',
    curriculum: [{ row: 'medi:cartografia', section: 'atlantic', note: 'Agrupa els rius peninsulars per vessants i relaciona el relleu de les costes i les illes amb els recorreguts de l’aigua.' }],
    sources: [
      ['IGN · Rius d’Espanya i vessants', 'https://educativo.ign.es/atlas-didactico/agua-bach/actividad_identificar_los_principales_ros_de_espaa.html'],
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
    ],
  });

  addTopic('M011', {
    id: 'relleu-catalunya',
    title: 'Dels Pirineus a la costa catalana',
    intro: 'De nord a sud, Catalunya combina cims alts, depressions, altiplans i serres paral·leles al mar. Un recorregut dibuixat al mapa ens permet relacionar-los.',
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
    description: 'Localitza els Pirineus, les terres baixes de l’interior i les serralades i planes costaneres de Catalunya.',
    curriculum: [{ row: 'medi:cartografia', section: 'costaneres', note: 'Localitza els Pirineus, les terres baixes de l’interior i les serralades i planes costaneres de Catalunya.' }],
    sources: [
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M012', {
    id: 'rius-costes-catalunya',
    title: 'Seguint l’aigua fins a la costa catalana',
    intro: 'El Segre, l’Ebre, el Ter i el Llobregat passen per paisatges molt diferents. Segueix-los al mapa i descobreix quins arriben al mar i quin desemboca en un altre riu.',
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
    description: 'Compara quatre rius i els paisatges de la costa, i distingeix les conques internes de la conca de l’Ebre.',
    curriculum: [{ row: 'medi:cartografia', section: 'llobregat', note: 'Compara quatre rius i els paisatges de la costa, i distingeix les conques internes de la conca de l’Ebre.' }],
    sources: [
      ['ACA · El medi hídric i les conques de Catalunya', 'https://aca.gencat.cat/ca/laigua/el-medi-hidric-a-catalunya/'],
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M013', {
    id: 'altitud-i-perfils',
    title: 'Del mapa de corbes al perfil d’una excursió',
    intro: 'Dos camins poden començar i acabar a la mateixa altitud, però un pot fer una pujada molt més forta que l’altre. Les corbes de nivell i els perfils ens ajuden a triar.',
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
    description: 'Analitza els efectes de la urbanització i proposa maneres de conservar els boscos i els espais naturals.',
    curriculum: [{ row: 'medi:ecosocial', section: 'boscos', note: 'Analitza els efectes de la urbanització i proposa maneres de conservar els boscos i els espais naturals.' }],
    sources: [
      ['Generalitat · Els espais naturals protegits', 'https://mediambient.gencat.cat/ca/05_ambits_dactuacio/patrimoni_natural/senp_catalunya/'],
      ['ICGC · VISSIR, visor de cartografia', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/VISSIR'],
    ],
  });

  addTopic('M015', {
    id: 'temps-i-clima',
    title: 'El temps d’avui i el clima d’un lloc',
    intro: 'Ens abriguem abans de sortir, però els pagesos també necessiten saber com solen ser les estacions de l’any. Són preguntes diferents i es responen amb dades diferents.',
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
    description: 'Distingeix el temps del clima i interpreta exemples de condicions extremes.',
    curriculum: [{ row: 'medi:reptes', section: 'extrems', note: 'Distingeix el temps del clima i interpreta exemples de condicions extremes.' }],
    sources: [
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M016', {
    id: 'factors-del-clima',
    title: 'Per què dos llocs tenen climes diferents?',
    intro: 'Dues poblacions poden estar a la mateixa latitud i tenir hiverns diferents. La latitud, el mar i les muntanyes hi influeixen alhora.',
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
    description: 'Relaciona la latitud, la distància al mar, el relleu i l’altitud amb diferències de temperatura i precipitació.',
    curriculum: [{ row: 'medi:reptes', section: 'relleu', note: 'Relaciona la latitud, la distància al mar, el relleu i l’altitud amb diferències de temperatura i precipitació.' }],
    sources: [
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M017', {
    id: 'zones-climatiques',
    title: 'De les zones climàtiques als climogrames',
    intro: 'D’una regió polar a una costa mediterrània canvien les temperatures i les pluges. Els mapes de clima i els climogrames ens permeten llegir aquests patrons de dues maneres.',
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
    description: 'Compara les grans zones climàtiques, els climes europeus i les dades que recull un climograma.',
    curriculum: [{ row: 'medi:reptes', section: 'dades', note: 'Compara les grans zones climàtiques, els climes europeus i les dades que recull un climograma.' }],
    sources: [
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M018', {
    id: 'climes-espanya-catalunya',
    title: 'Del litoral atlàntic al Mediterrani i les Canàries',
    intro: 'En un mateix viatge per la Península i les illes podem trobar pluges regulars, estius secs o neu hivernal. Mirem com es reparteixen aquests patrons.',
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
    description: 'Identifica patrons atlàntics, subtropicals, de muntanya i mediterranis a Espanya i Catalunya.',
    curriculum: [{ row: 'medi:reptes', section: 'litoral', note: 'Identifica patrons atlàntics, subtropicals, de muntanya i mediterranis a Espanya i Catalunya.' }],
    sources: [
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
      ['AEMET · Atles climàtics', 'https://www.aemet.es/es/serviciosclimaticos/datosclimatologicos/atlas_climatico'],
    ],
  });

  addTopic('M019', {
    id: 'vegetacio-espanya-catalunya',
    title: 'Els paisatges que formen les plantes',
    intro: 'Un bosc humit, una pineda de muntanya i una màquia litoral poden assemblar-se de lluny i ser molt diferents de prop. L’aigua, les temperatures, el sòl i els usos humans hi tenen a veure.',
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
    description: 'Relaciona vegetació mediterrània, atlàntica, subtropical i de muntanya amb condicions del medi.',
    curriculum: [{ row: 'medi:reptes', section: 'muntanya', note: 'Relaciona vegetació mediterrània, atlàntica, subtropical i de muntanya amb condicions del medi.' }],
    sources: [
      ['IGN · Atlas Didàctic', 'https://educativo.ign.es/atlas-didactico/'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
    ],
  });

  addTopic('M020', {
    id: 'canvi-climatic-causes',
    title: 'El clima canvia, busquem-ne les causes',
    intro: 'El nostre planeta reté una part de l’energia que rep del Sol. Quan canvia la quantitat de gasos que hi ha a l’atmosfera, també canvia aquest equilibri.',
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
    description: 'Explica l’efecte hivernacle i relaciona les emissions humanes amb l’escalfament i els impactes climàtics.',
    curriculum: [{ row: 'medi:ecosocial', section: 'efectes', note: 'Explica l’efecte hivernacle i relaciona les emissions humanes amb l’escalfament i els impactes climàtics.' }],
    sources: [
      ['IPCC · Informe de síntesi sobre el canvi climàtic', 'https://www.ipcc.ch/report/ar6/syr/resources/spm-headline-statements/'],
      ['Meteocat · Climatologia', 'https://www.meteocat.gencat.cat/ca/climatologia/'],
    ],
  });

  addTopic('M021', {
    id: 'etapes-prehistoria',
    title: 'Tres maneres de mirar la prehistòria',
    intro: 'Una eina de pedra, una olla i un estri de ferro poden donar pistes sobre moments diferents del passat. Les etapes ens ajuden a ordenar-les.',
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
    description: 'Ordena el paleolític, el neolític i les edats dels metalls i compara canvis en la vida quotidiana.',
    curriculum: [{ row: 'medi:passat', section: 'metalls', note: 'Ordena el paleolític, el neolític i les edats dels metalls i compara canvis en la vida quotidiana.' }],
    sources: [
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
    ],
  });

  addTopic('M022', {
    id: 'campament-paleolitic',
    title: 'Pistes d’un campament paleolític',
    intro: 'Si només ens quedessin unes pedres tallades i un cercle de cendres, podríem descobrir com s’organitzava un campament?',
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
    description: 'Interpreta refugis, eines, foc, pintures i vestits a partir de les restes que es poden conservar.',
    curriculum: [{ row: 'medi:passat', section: 'vestits', note: 'Interpreta refugis, eines, foc, pintures i vestits a partir de les restes que es poden conservar.' }],
    sources: [
      ['IPHES · Memòria d’excavació de l’Abric Romaní', 'https://calaix.gencat.cat/bitstream/handle/10687/457382/qmem16402.pdf?sequence=1'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
    ],
  });

  addTopic('M023', {
    id: 'poblat-neolitic',
    title: 'Un poblat neolític, feina a feina',
    intro: 'A tocar d’un estany hi ha camps, cabanes i espais on es treballa la fusta. Cadascun deixa pistes diferents sobre com vivia la gent.',
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
    description: 'Relaciona els poblats neolítics amb l’agricultura, el teixit, la ceràmica i les eines.',
    curriculum: [{ row: 'medi:passat', section: 'ceramica', note: 'Relaciona els poblats neolítics amb l’agricultura, el teixit, la ceràmica i les eines.' }],
    sources: [
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
    ],
  });

  addTopic('M024', {
    id: 'arqueologia-pistes',
    title: 'Arqueologia, de la troballa a l’explicació',
    intro: 'Una peça sola dona pistes. Si sabem on era, a quina capa i què hi havia al costat, en podem aprendre molt més.',
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
    description: 'Aprèn què és el context arqueològic i compara les troballes de l’Abric Romaní i la Draga.',
    curriculum: [{ row: 'medi:passat', section: 'comparacio', note: 'Aprèn què és el context arqueològic i compara les troballes de l’Abric Romaní i la Draga.' }],
    sources: [
      ['IPHES · Memòria d’excavació de l’Abric Romaní', 'https://calaix.gencat.cat/bitstream/handle/10687/457382/qmem16402.pdf?sequence=1'],
      ['Patrimoni cultural · La Draga', 'https://patrimoni.gencat.cat/ca/coleccio/la-draga'],
    ],
  });

  addTopic('M025', {
    id: 'poblat-edat-ferro',
    title: 'Cases, tallers i ferro al poblat',
    intro: 'El ferro va obrir possibilitats noves, però fabricar una eina requeriria coneixements, temps i persones especialitzades. Què es veuria en un poblat?',
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
    description: 'Interpreta l’organització d’un poblat de l’edat del ferro, els habitatges i la feina del metall.',
    curriculum: [{ row: 'medi:passat', section: 'estris', note: 'Interpreta l’organització d’un poblat de l’edat del ferro, els habitatges i la feina del metall.' }],
    sources: [
      ['Museu d’Arqueologia de Catalunya', 'https://www.mac.cat/'],
      ['Museu d’Arqueologia · Ullastret', 'https://www.macullastret.cat/'],
    ],
  });

  addTopic('M026', {
    id: 'patrimoni-figures-i-pedres',
    title: 'Pedres i figures que ens parlen del passat',
    intro: 'Alguns paisatges conserven pintures i grans pedres alçades. Són testimonis fràgils, i estudiar-los ens obliga a separar allò que veiem d’allò que imaginem.',
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
    description: 'Interpreta exemples de pintures, megàlits, gravats i escultures i explica com protegir-los.',
    curriculum: [{ row: 'medi:passat', section: 'gravats', note: 'Interpreta exemples de pintures, megàlits, gravats i escultures i explica com protegir-los.' }],
    sources: [
      ['UNESCO · Art rupestre mediterrani', 'https://whc.unesco.org/en/list/874/'],
      ['Patrimoni cultural · Cova d’en Daina', 'https://patrimoni.gencat.cat/ca/coleccio/cova-den-daina'],
    ],
  });

  addTopic('M027', {
    id: 'de-roma-a-imperi',
    title: 'Com Roma va passar de ciutat a imperi',
    intro: 'En alguns mapes, Roma només és un punt. En d’altres, el seu poder s’estén al voltant de tota la Mediterrània. Què va passar entre un mapa i l’altre?',
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
    description: 'Ordena la monarquia, la república i l’imperi i explica com Roma es va expandir.',
    curriculum: [{ row: 'medi:passat', section: 'expansio', note: 'Ordena la monarquia, la república i l’imperi i explica com Roma es va expandir.' }],
    sources: [
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
    ],
  });

  addTopic('M028', {
    id: 'hispania-romana',
    title: 'De l’arribada a Empúries a la Hispània romana',
    intro: 'L’any 218 aC, una flota romana va fer servir el port d’Empúries. Era un episodi d’una guerra i també el començament d’un procés llarg de conquestes a la Península.',
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
    description: 'Situa l’arribada romana a Empúries i estudia què va canviar a Hispània amb les ciutats i les calçades.',
    curriculum: [{ row: 'medi:passat', section: 'xarxa', note: 'Situa l’arribada romana a Empúries i estudia què va canviar a Hispània amb les ciutats i les calçades.' }],
    sources: [
      ['MAC Empúries · La ciutat grega', 'https://www.macempuries.cat/Sobre-el-MAC-Empuries/Itinerari-arqueologic/Ciutat-grega'],
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
    ],
  });

  addTopic('M029', {
    id: 'vida-dels-ibers',
    title: 'Els ibers, poblats i intercanvis',
    intro: 'Al costat d’una muralla apareixen ceràmiques fetes a la zona i d’altres que han arribat per mar. Com podem saber a qui pertanyien i què ens expliquen dels contactes?',
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
    description: 'Coneix la diversitat dels pobles ibers, els contactes amb els grecs i dos jaciments catalans.',
    curriculum: [{ row: 'medi:passat', section: 'grecs', note: 'Coneix la diversitat dels pobles ibers, els contactes amb els grecs i dos jaciments catalans.' }],
    sources: [
      ['Patrimoni cultural · Ruta dels ibers', 'https://patrimoni.gencat.cat/sites/default/files/hd-images-zip/descarregues/rutes/rutaibers_per_internet.pdf'],
      ['MAC Empúries · La ciutat grega', 'https://www.macempuries.cat/Sobre-el-MAC-Empuries/Itinerari-arqueologic/Ciutat-grega'],
    ],
  });

  addTopic('M030', {
    id: 'ciutat-romana',
    title: 'Un recorregut per una ciutat romana',
    intro: 'Una persona que arriba a Tàrraco pot anar al mercat, visitar un edifici públic i tornar a casa pel mateix carrer. Què la guia per la ciutat?',
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
    description: 'Interpreta espais públics, habitatges i botigues d’una ciutat romana.',
    curriculum: [{ row: 'medi:passat', section: 'comerc', note: 'Interpreta espais públics, habitatges i botigues d’una ciutat romana.' }],
    sources: [
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M031', {
    id: 'comerc-tarraconense',
    title: 'D’una vil·la al port de Tàrraco',
    intro: 'Una gerra amb oli pot passar per un magatzem, una calçada i un port abans d’arribar a una altra ciutat. Seguim-ne el recorregut.',
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
    description: 'Segueix productes i rutes de l’Imperi, i interpreta el paper de les vil·les, les àmfores i el denari.',
    curriculum: [{ row: 'medi:passat', section: 'denari', note: 'Segueix productes i rutes de l’Imperi, i interpreta el paper de les vil·les, les àmfores i el denari.' }],
    sources: [
      ['MNAT · El comerç a Tàrraco', 'https://www.mnat.cat/documents/74992mnat-itinerari-7-catal1.pdf'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M032', {
    id: 'creences-en-temps-romans',
    title: 'Déus, rituals i cristianisme a Roma',
    intro: 'Què ens expliquen un altar, una moneda amb un símbol i un sarcòfag? Les creences canvien al llarg del temps i de vegades conviuen al mateix lloc.',
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
    description: 'Explica el culte romà, l’expansió del cristianisme i algunes de les seves primeres restes a Hispània.',
    curriculum: [{ row: 'medi:passat', section: 'hispania', note: 'Explica el culte romà, l’expansió del cristianisme i algunes de les seves primeres restes a Hispània.' }],
    sources: [
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });

  addTopic('M033', {
    id: 'llegat-de-roma',
    title: 'De Roma al present, què n’ha quedat?',
    intro: 'Un mot, el traçat d’un carrer i el nom d’un mes poden tenir històries llargues. Algunes comencen molt abans que la nostra ciutat actual.',
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
    description: 'Ressegueix rastres romans en les llengües, els carrers, les vies, el calendari i el cristianisme.',
    curriculum: [{ row: 'medi:passat', section: 'vies', note: 'Ressegueix rastres romans en les llengües, els carrers, les vies, el calendari i el cristianisme.' }],
    sources: [
      ['Patrimoni cultural · Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco'],
      ['Britannica · La Roma antiga', 'https://www.britannica.com/place/ancient-Rome'],
    ],
  });

  addTopic('M034', {
    id: 'patrimoni-de-tarraco',
    title: 'Llegim les formes dels edificis romans',
    intro: 'Una graderia semicircular, una arena oval i unes sales amb aigua ens donen pistes sobre tres usos diferents. Com podem reconèixer cada edifici?',
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
    description: 'Distingeix temples, teatres, amfiteatres i termes a partir de la forma i la funció.',
    curriculum: [{ row: 'medi:passat', section: 'termes', note: 'Distingeix temples, teatres, amfiteatres i termes a partir de la forma i la funció.' }],
    sources: [
      ['Patrimoni cultural · Amfiteatre de Tàrraco', 'https://patrimoni.gencat.cat/ca/tarraco/amfiteatre'],
      ['Museu Nacional Arqueològic de Tarragona', 'https://www.mnat.cat/'],
    ],
  });
}
