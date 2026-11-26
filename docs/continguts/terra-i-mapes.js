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
          pla: { src: 'illustracions/capes.png' },
          volum: { src: 'illustracions/m001/capes.png', alt: 'Esfera de la Terra amb una porció retirada que mostra l’escorça, el mantell, el nucli extern i el nucli intern.' },
          realista: { src: 'illustracions/m001/capes-realista.png', thumbnail: 'illustracions/m001/miniatures/capes-realista.png', alt: 'Terra en un cel estel·lar, amb un tall que mostra l’escorça, el mantell, el nucli extern i el nucli intern.' },
        },
      },
      {
        id: 'reserva-moviment', section: 'moviment', name: 'Moviment de les plaques', ratio: 23 / 14,
        alt: 'Tres límits entre plaques amb fletxes de separació, acostament i lliscament lateral.',
        caption: 'Les plaques tectòniques poden separar-se, acostar-se o lliscar de costat.',
        variants: {
          pla: { src: 'illustracions/m001/moviment-pla.png' },
          volum: { src: 'illustracions/m001/moviment-volum.png' },
          realista: { src: 'illustracions/m001/moviment-realista.png', thumbnail: 'illustracions/m001/miniatures/moviment-realista.png', alt: 'Tres vinyetes de roca en perspectiva. Les fletxes mostren dues plaques que se separen, dues que s’acosten i formen una serralada, i dues que llisquen de costat.' },
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
          pla: { src: 'illustracions/m001/gravetat-pla.png' },
          volum: { src: 'illustracions/m001/gravetat-volum.png?v=0.1.31', thumbnail: 'illustracions/m001/miniatures/gravetat-volum.png', alt: 'Tres fletxes van des de tres pilotes fins al punt Centre, visible entre les dues cares del tall de la Terra.' },
          realista: { src: 'illustracions/m001/gravetat-realista.png', thumbnail: 'illustracions/m001/miniatures/gravetat-realista.png', alt: 'Tres fletxes van des de tres pilotes fins al punt Centre, visible entre les dues cares del tall de la Terra.' },
        },
      },
      {
        id: 'reserva-elements', section: 'elements', name: 'Els elements del planeta Terra', ratio: 23 / 14,
        alt: 'Paisatge amb un riu, roca, cel amb pluja i vegetació a la riba.',
        caption: 'El riu connecta l’aigua, les roques, l’aire i els éssers vius.',
        variants: {
          pla: { src: 'illustracions/m001/elements-pla.png' },
          volum: { src: 'illustracions/m001/elements-volum.png' },
          realista: { src: 'illustracions/m001/elements-realista.png', thumbnail: 'illustracions/m001/miniatures/elements-realista.png', alt: 'Paisatge de muntanya amb un vessant rocós, un riu, un cel amb pluja i plantes a la riba, retolats com a geosfera, hidrosfera, atmosfera i biosfera.' },
        },
      },
      {
        id: 'arrels-i-erosio', section: 'elements', name: 'Les arrels i l’erosió del sòl',
        src: 'illustracions/m001/arrels-i-erosio.png', ratio: 4 / 3,
        alt: 'Dues safates amb el mateix pendent reben pluja. Una té plantes amb arrels. A la safata sense plantes, l’aigua s’endú més partícules de terra.',
        caption: 'Dos vessants amb el mateix pendent reben la mateixa pluja. Compara la terra arrossegada i fixa’t en el paper de les arrels.',
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
    defaultFigureStyle: 'volum',
    figureStyles: [
      { id: 'pla', label: 'Esquema pla', description: 'Vistes planes, contorns nets i colors uniformes.' },
      { id: 'volum', label: 'Il·lustració amb volum', description: 'Perspectiva i ombres suaus per veure la profunditat.' },
      { id: 'realista', label: 'Il·lustració realista', description: 'Textura de roca, paisatge recreat i vistes de la Terra sobre un cel estel·lar.' },
    ],
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
    intro: 'Un mateix riu pot passar per molts llocs. Per assenyalar un punt concret, com ara on neix o on desemboca, fem servir dues dades: la latitud i la longitud. Juntes formen les seves coordenades geogràfiques.',
    figures: [
      { id: 'graella', section: 'localitzacio', anchor: 'before', name: 'Graella de coordenades', src: 'illustracions/coordenades.png', ratio: 1110 / 550, alt: 'Graella amb l’equador i Greenwich destacats. El punt A és a 20 graus nord i 40 graus oest.', caption: 'El punt A es troba a l’encreuament del paral·lel 20° N i el meridià 40° O.', position: 'center' },
      {
        id: 'troba-la-flota', section: 'localitzacio', name: 'Troba la flota',
        src: 'illustracions/m002/troba-la-flota.svg', ratio: 960 / 680,
        alt: 'Graella buida de latitud i longitud. L’equador és horitzontal i el meridià de Greenwich és vertical.',
        caption: 'En parelles, cadascú marca en secret tres vaixells en encreuaments diferents. Per torns, digueu una posició, primer la latitud i després la longitud. Si hi ha un vaixell, l’altre diu «trobat». Guanya qui troba primer els tres.',
      },
    ],
    sections: [
      section('latitud', 'Amb els paral·lels coneixem la latitud',
        p('Imagina unes línies que fan la volta a la Terra d’est a oest. Són els **paral·lels**. El més llarg és l’**equador**, que divideix el planeta en dos hemisferis: nord i sud. Els paral·lels es fan més petits a mesura que ens acostem als pols.'),
        p('La **latitud** indica quants graus al nord o al sud de l’equador es troba un punt. A l’equador és de **0°**, al pol nord és de **90° N** i al pol sud és de **90° S**. Tots els llocs que hi ha sobre un mateix paral·lel tenen la mateixa latitud.'),
        box('curiositat', 'Un paral·lel, molts llocs', 'Dos vaixells envien la mateixa latitud, **30° N**. Sabem que naveguen sobre el mateix paral·lel, que fa tota la volta al món. Per saber si són a prop o molt lluny, necessitem la longitud.')),
      section('longitud', 'Amb els meridians coneixem la longitud',
        p('Els **meridians** són línies imaginàries que van d’un pol a l’altre. El de referència és el **meridià de Greenwich**, que té una longitud de **0°**. A partir d’aquest meridià podem anar cap a l’est o cap a l’oest.'),
        p('La **longitud** indica quants graus a l’est o a l’oest del meridià de Greenwich es troba un punt. Va de **0° a 180°**. Fem servir **E** per a l’est i **O** per a l’oest. En alguns mapes trobaràs **W** per a l’oest, de l’anglès *west*. Els valors 180° E i 180° O assenyalen el mateix meridià.'),
        table(['Coordenada', 'Línies de referència', 'Què ens indica?'], [
          ['Latitud', 'Paral·lels, a partir de l’equador (0°)', 'Quants graus al nord o al sud.'],
          ['Longitud', 'Meridians, a partir de Greenwich (0°)', 'Quants graus a l’est o a l’oest.'],
        ]),
        p('Els meridians estan més separats a l’equador i s’acosten a mesura que ens apropem als pols. En un globus, ressegueix dos meridians amb els dits. A l’equador hi ha espai entre els dos dits i al pol es troben.')),
      section('localitzacio', 'Com es localitza un punt al mapa',
        p('Imagina que una boia de l’Atlàntic envia la seva posició: **20° N, 40° O**. Per trobar-la en un mapa amb paral·lels i meridians, segueix aquests passos.'),
        list('Llegeix la **latitud**: 20° N. Busca el paral·lel de 20° al nord de l’equador.',
          'Llegeix la **longitud**: 40° O. Busca el meridià de 40° a l’oest de Greenwich.',
          'Segueix totes dues línies fins al punt on s’encreuen. Marca-hi la posició de la boia.'),
        p('Si parteixes d’un punt marcat en un mapa, fes el camí a l’inrevés: llegeix la latitud al costat del paral·lel i la longitud al costat del meridià. Quan el punt cau entre dues línies numerades, pots estimar els graus intermedis.'),
        box('observa', 'Una segona boia', 'Compara les posicions **20° N, 40° O** i **20° N, 30° O**. Com que comparteixen latitud, les situem al mateix paral·lel. La de **30° O** és a l’est de l’altra i més a prop del meridià de Greenwich.'),
        box('ampliacio', 'De la posició al territori', 'Les coordenades ens diuen on és la boia. Per saber a quina distància és d’un port o què hi ha al seu voltant, ens cal un mapa que mostri aquesta informació.')),
    ],
  }, {
    description: 'Fes servir els paral·lels i els meridians per llegir la latitud i la longitud i localitzar un punt al mapa.',
    curriculum: [{ row: 'medi:cartografia', section: 'localitzacio', note: 'Situa punts al mapa amb la latitud i la longitud.' }],
    sources: [
      ['NOAA · Latitud i longitud', 'https://oceanservice.noaa.gov/education/tutorial_nautical_charts/nautical_charts02_information_2b.html'],
    ],
  });

  addTopic('M003', {
    id: 'mapes-i-planols',
    title: 'Els mapes i els plànols geogràfics',
    intro: 'Un globus ens mostra la forma general del planeta. Un mapa ens permet posar tota la Terra, o només una part, sobre un paper o una pantalla. Si volem conèixer de prop un lloc, com els carrers que envolten l’escola, podem fer servir un plànol.',
    figures: [
      { id: 'barri', section: 'llegenda', anchor: 'before', name: 'Plànol del barri', src: 'illustracions/planol.png', ratio: 1170 / 600, alt: 'Plànol esquemàtic amb escola, biblioteca, parc, pont, riu, nord i escala gràfica de 0, 50 i 100 metres.', caption: 'Plànol esquemàtic d’un barri imaginari. Fixa’t en la fletxa del nord, la llegenda i l’escala gràfica.', position: 'center' },
    ],
    sections: [
      section('definicions', 'Què són els mapes i els plànols?',
        p('Un **mapa** és una representació plana i reduïda d’un territori. Pot mostrar el món sencer, un continent, un país o una comarca. Qui el fa tria quina informació hi posa segons què vol explicar. Per exemple, un mapa de muntanya pot mostrar camins, cims i fonts.'),
        p('Un **plànol** acostuma a representar un espai més petit amb molt de detall, com una escola, un barri o una ciutat. Els objectes s’hi dibuixen com si els miréssim des de dalt. En un plànol de l’escola podem veure on són les aules, les portes i les escales.'),
        box('ampliacio', 'Dos trams d’un mateix viatge', 'Per anar a una altra ciutat amb autobús, busca un mapa que mostri les línies i les parades. Quan hi arribis, consulta un plànol de carrers per anar a peu fins a la biblioteca. Cada representació respon una pregunta diferent.')),
      section('llegenda', 'Els mapes i els plànols porten una llegenda',
        p('La **llegenda** explica què signifiquen els colors, els símbols i les línies del mapa. En un plànol de barri, un quadrat amb una E pot identificar l’escola, una línia blava pot mostrar un riu i una zona ombrejada pot representar un parc.'),
        p('Un mateix color pot tenir significats diferents segons el mapa. El verd pot indicar un parc en un plànol urbà o una zona de poca altitud en un mapa físic. Consulta la llegenda abans de decidir què vol dir.'),
        p('Perquè una llegenda es pugui llegir en blanc i negre, podem combinar colors amb formes o trames. En un plànol del barri, per exemple, una línia de punts pot marcar un itinerari i unes ratlles inclinades poden identificar el parc.')),
      section('escala', 'Els mapes i els plànols es dibuixen a escala',
        p('L’**escala** relaciona una distància del mapa amb la distància real. Es pot indicar de dues maneres.'),
        table(['Tipus d’escala', 'Com es llegeix?'], [
          ['Numèrica', 'Si diu 1:10.000, cada centímetre del paper equival a 10.000 centímetres reals, és a dir, 100 metres.'],
          ['Gràfica', 'És una barra dividida en trams. Les xifres indiquen la distància real que representa cada tram.'],
        ]),
        box('prova', 'Fem de cartògrafs', 'En un altre plànol, a escala **1:10.000**, dos edificis són a **3 cm** l’un de l’altre. Com que cada centímetre representa 100 m, la distància en línia recta és de **300 m**. Per saber quant caminaríem, mesuraríem cada tram del recorregut i els sumaríem.'),
        p('En un full de la mateixa mida, a escala **1:1.000** hi cap una zona més petita i s’hi poden dibuixar més detalls que a **1:100.000**. Si ampliem o reduïm un mapa, la barra de l’escala gràfica canvia de mida juntament amb el dibuix i continua sent útil.'),
        box('curiositat', 'La mateixa escala en dues còpies?', 'Si un plànol a **1:10.000** s’imprimeix al **200 %**, un tram que feia **1 cm** ara en fa **2**. La distància real continua sent **100 m**. Per tant, cada centímetre de la còpia representa **50 m** i l’escala numèrica efectiva és **1:5.000**.'),
        box('ampliacio', 'Quin mapa ens convé?', 'Un mapa que ens funciona per trobar la biblioteca pot quedar curt si volem saber per quines comarques passa un riu. A més de l’escala, hem de triar el tipus de mapa.')),
    ],
  }, {
    description: 'Distingeix un mapa d’un plànol i aprèn a llegir-ne la llegenda i l’escala per orientar-te i calcular distàncies.',
    curriculum: [{ row: 'medi:cartografia', section: 'escala', note: 'Ensenya a llegir la llegenda i a calcular distàncies amb l’escala.' }],
    sources: [
      ['ICGC · Escala cartogràfica', 'https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Escala'],
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
