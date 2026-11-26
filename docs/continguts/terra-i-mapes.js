window.quaderns ??= [];

{
  const p = text => ({ type: 'paragraph', text });
  const essencial = text => ({ ...p(text), core: true });
  const table = (headers, rows, rowHeadingWidth) => ({ type: 'table', headers, rows, rowHeadingWidth });
  const list = (...items) => ({ type: 'steps', items });
  const box = (title, text) => ({ type: 'note', title, text });
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
        width: 45, position: 'right', wrap: true,
        variants: {
          pla: { src: 'illustracions/capes.png' },
          volum: { src: 'illustracions/m001/capes.png', alt: 'Esfera de la Terra amb una porció retirada que mostra l’escorça, el mantell, el nucli extern i el nucli intern.' },
        },
      },
      {
        id: 'reserva-moviment', section: 'moviment', name: 'Moviment de les plaques', ratio: 23 / 14,
        alt: 'Tres límits entre plaques amb fletxes de separació, acostament i lliscament lateral.',
        caption: 'Les plaques tectòniques poden separar-se, acostar-se o lliscar de costat.',
        variants: {
          pla: { src: 'illustracions/m001/moviment-pla.png' },
          volum: { src: 'illustracions/m001/moviment-volum.png' },
        },
      },
      {
        id: 'reserva-gravetat', section: 'gravetat', name: 'La gravetat de la Terra', ratio: 23 / 14,
        alt: 'Tres fletxes, des de diferents punts de la superfície, apunten cap al centre de la Terra.',
        caption: 'En qualsevol punt de la superfície, la gravetat atrau els objectes cap al centre de la Terra.',
        variants: {
          pla: { src: 'illustracions/m001/gravetat-pla.png' },
          volum: { src: 'illustracions/m001/gravetat-volum.png' },
        },
      },
      {
        id: 'reserva-elements', section: 'elements', name: 'Els elements del planeta Terra', ratio: 23 / 14,
        alt: 'Paisatge amb un riu, roca, cel amb pluja i vegetació a la riba.',
        caption: 'El riu connecta l’aigua, les roques, l’aire i els éssers vius.',
        variants: {
          pla: { src: 'illustracions/m001/elements-pla.png' },
          volum: { src: 'illustracions/m001/elements-volum.png' },
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
        ], 24)),
      section('moviment', 'Hi ha moviment a les capes de la Terra?',
        essencial('La capa rígida de fora de la Terra està dividida en grans peces, les **plaques tectòniques**. Les plaques es mouen molt a poc a poc.'),
        p('L’escorça i la part més superficial i rígida del mantell formen la **litosfera**. Les plaques es mouen uns quants centímetres cada any, aproximadament el que poden créixer les ungles en un any.'),
        p('La calor interna de la Terra contribueix a moviments molt lents al mantell. A la superfície, algunes plaques se separen, d’altres xoquen i d’altres llisquen de costat. Amb el pas de milions d’anys, aquests moviments desplacen els continents i poden aixecar serralades.'),
        p('Quan les roques es desplacen de cop al llarg d’una fractura, el terra pot tremolar. En moltes zones on es troben plaques també es forma **magma**, roca fosa que, quan surt a la superfície en una erupció, s’anomena **lava**.'),
        box('Del moviment al mapa', 'Un mapa de plaques i un mapa de terratrèmols ens permeten comprovar si les zones amb molts terratrèmols coincideixen amb els límits de les plaques.')),
      section('gravetat', 'La gravetat de la Terra',
        essencial('Si deixes anar una pilota, cau per la **gravetat**. A qualsevol lloc de la Terra, «avall» apunta cap al centre de la Terra.'),
        p('La gravetat també manté l’aire a prop de la Terra i contribueix a mantenir la Lluna en òrbita. Al paisatge es nota quan l’aigua corre pendent avall i quan les pedres cauen d’un vessant.')),
      section('elements', 'Els elements del planeta Terra',
        essencial('Les **roques**, l’**aigua**, l’**aire** i els **éssers vius** formen parts de la Terra que es relacionen.'),
        table(['Part del sistema', 'Què hi trobem?'], [
          ['Geosfera', 'Les roques i els minerals del planeta, des de la superfície fins al nucli.'],
          ['Hidrosfera', 'L’aigua del planeta, com la dels oceans, els rius, els llacs, les glaceres i el subsol.'],
          ['Atmosfera', 'La capa de gasos que envolta la Terra. L’aire que respirem en forma part.'],
          ['Biosfera', 'El conjunt dels éssers vius i els llocs de la Terra on hi ha vida.'],
        ]),
        p('Pensa en un riu. L’aigua que hi circula (hidrosfera) desgasta i transporta fragments de roca (geosfera). La pluja (que es forma a l’atmosfera) pot fer pujar el cabal, i el riu ofereix aigua i refugi a plantes i animals (biosfera).'),
        box('I ara, on ho situem?', 'Si volguéssim assenyalar el naixement d’un riu o el lloc d’un terratrèmol en un globus, ens caldria una manera de dir en quin punt del planeta es troba.')),
    ],
  }, {
    defaultFigureStyle: 'volum',
    figureStyles: [
      { id: 'pla', label: 'Esquema pla', description: 'Vistes planes, contorns nets i colors uniformes.' },
      { id: 'volum', label: 'Il·lustració amb volum', description: 'Perspectiva i ombres suaus per veure la profunditat.' },
    ],
    description: 'Descobreix les capes de la Terra, el moviment de les plaques, la gravetat i com es relacionen l’aigua, l’aire, les roques i els éssers vius.',
    curriculum: [{ row: 'medi:terra', section: 'elements', note: 'Explica les capes i com s’influeixen les roques, l’aigua, l’aire i els éssers vius.' }],
    sources: [
      ['USGS · L’interior de la Terra', 'https://pubs.usgs.gov/gip/dynamic/inside.html'],
      ['NASA · La Terra', 'https://science.nasa.gov/earth/facts/'],
    ],
  });

  addTopic('M002', {
    id: 'coordenades',
    title: 'Les coordenades geogràfiques',
    intro: 'Un mateix riu pot passar per molts llocs. Per assenyalar un punt concret, com ara on neix o on desemboca, fem servir dues dades: la latitud i la longitud. Juntes formen les seves coordenades geogràfiques.',
    figures: [
      { id: 'graella', section: 'localitzacio', anchor: 'before', name: 'Graella de coordenades', ratio: 1110 / 550, alt: 'Graella amb l’equador i Greenwich destacats. El punt A és a 20 graus nord i 40 graus oest.', caption: 'El punt A es troba a l’encreuament del paral·lel 20° N i el meridià 40° O.', width: 67, position: 'center', wrap: false },
    ],
    sections: [
      section('latitud', 'Amb els paral·lels coneixem la latitud',
        p('Imagina unes línies que fan la volta a la Terra d’est a oest. Són els **paral·lels**. El més llarg és l’**equador**, que divideix el planeta en dos hemisferis: nord i sud. Els paral·lels es fan més petits a mesura que ens acostem als pols.'),
        p('La **latitud** indica quants graus al nord o al sud de l’equador es troba un punt. A l’equador és de **0°**, al pol nord és de **90° N** i al pol sud és de **90° S**. Tots els llocs que hi ha sobre un mateix paral·lel tenen la mateixa latitud.')),
      section('longitud', 'Amb els meridians coneixem la longitud',
        p('Els **meridians** són línies imaginàries que van d’un pol a l’altre. El de referència és el **meridià de Greenwich**, que té una longitud de **0°**. A partir d’aquest meridià podem anar cap a l’est o cap a l’oest.'),
        p('La **longitud** indica quants graus a l’est o a l’oest del meridià de Greenwich es troba un punt. Va de **0° a 180°**. Fem servir **E** per a l’est i **O** per a l’oest. En alguns mapes trobaràs **W** per a l’oest, de l’anglès *west*. Els valors 180° E i 180° O assenyalen el mateix meridià.'),
        table(['Coordenada', 'Línies de referència', 'Què ens indica?'], [
          ['Latitud', 'Paral·lels, a partir de l’equador (0°)', 'Quants graus al nord o al sud.'],
          ['Longitud', 'Meridians, a partir de Greenwich (0°)', 'Quants graus a l’est o a l’oest.'],
        ])),
      section('localitzacio', 'Com es localitza un punt al mapa',
        p('Imagina que una boia de l’Atlàntic envia la seva posició: **20° N, 40° O**. Per trobar-la en un mapa amb paral·lels i meridians, segueix aquests passos.'),
        list('Llegeix la **latitud**: 20° N. Busca el paral·lel de 20° al nord de l’equador.',
          'Llegeix la **longitud**: 40° O. Busca el meridià de 40° a l’oest de Greenwich.',
          'Segueix totes dues línies fins al punt on s’encreuen. Marca-hi la posició de la boia.'),
        p('Si parteixes d’un punt marcat en un mapa, fes el camí a l’inrevés: llegeix la latitud al costat del paral·lel i la longitud al costat del meridià. Quan el punt cau entre dues línies numerades, pots estimar els graus intermedis.'),
        box('De la posició al territori', 'Les coordenades ens diuen on és la boia. Per saber a quina distància és d’un port o què hi ha al seu voltant, ens cal un mapa que mostri aquesta informació.')),
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
      { id: 'barri', section: 'llegenda', anchor: 'before', name: 'Plànol del barri', ratio: 1170 / 600, alt: 'Plànol esquemàtic amb escola, biblioteca, parc, pont, riu, nord i escala gràfica de 0, 50 i 100 metres.', caption: 'Plànol esquemàtic d’un barri imaginari. Fixa’t en la fletxa del nord, la llegenda i l’escala gràfica.', width: 72, position: 'center', wrap: false },
    ],
    sections: [
      section('definicions', 'Què són els mapes i els plànols?',
        p('Un **mapa** és una representació plana i reduïda d’un territori. Pot mostrar el món sencer, un continent, un país o una comarca. Qui el fa tria quina informació hi posa segons què vol explicar. Per exemple, un mapa de muntanya pot mostrar camins, cims i fonts.'),
        p('Un **plànol** acostuma a representar un espai més petit amb molt de detall, com una escola, un barri o una ciutat. Els objectes s’hi dibuixen com si els miréssim des de dalt. En un plànol de l’escola podem veure on són les aules, les portes i les escales.')),
      section('llegenda', 'Els mapes i els plànols porten una llegenda',
        p('La **llegenda** explica què signifiquen els colors, els símbols i les línies del mapa. En un plànol de barri, un quadrat amb una E pot identificar l’escola, una línia blava pot mostrar un riu i una zona ombrejada pot representar un parc.'),
        p('Un mateix color pot tenir significats diferents segons el mapa. El verd pot indicar un parc en un plànol urbà o una zona de poca altitud en un mapa físic. Consulta la llegenda abans de decidir què vol dir.')),
      section('escala', 'Els mapes i els plànols es dibuixen a escala',
        p('L’**escala** relaciona una distància del mapa amb la distància real. Es pot indicar de dues maneres.'),
        table(['Tipus d’escala', 'Com es llegeix?'], [
          ['Numèrica', 'Si diu 1:10.000, cada centímetre del paper equival a 10.000 centímetres reals, és a dir, 100 metres.'],
          ['Gràfica', 'És una barra dividida en trams. Les xifres indiquen la distància real que representa cada tram.'],
        ]),
        box('Fem de cartògrafs', 'En un altre plànol, a escala **1:10.000**, dos edificis són a **3 cm** l’un de l’altre. Com que cada centímetre representa 100 m, la distància en línia recta és de **300 m**. Per saber quant caminaríem, mesuraríem cada tram del recorregut i els sumaríem.'),
        p('En un full de la mateixa mida, a escala **1:1.000** hi cap una zona més petita i s’hi poden dibuixar més detalls que a **1:100.000**. Si ampliem o reduïm un mapa, la barra de l’escala gràfica canvia de mida juntament amb el dibuix i continua sent útil.'),
        box('Quin mapa ens convé?', 'Un mapa que ens funciona per trobar la biblioteca pot quedar curt si volem saber per quines comarques passa un riu. A més de l’escala, hem de triar el tipus de mapa.')),
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
      { id: 'planisferi-fisic', name: 'Planisferi físic', section: 'fisic', anchor: 'after', ratio: 2, width: 90, position: 'center', wrap: false },
      { id: 'planisferi-politic', name: 'Planisferi polític', section: 'politic', anchor: 'lead', ratio: 2, width: 90, position: 'center', wrap: false },
    ],
    sections: [
      section('tipus', 'Quins tipus de mapes hi ha?',
        table(['Tipus', 'Què destaca?', 'Quan ens pot servir?'], [
          ['Físic', 'Muntanyes, planes, rius i altres elements naturals.', 'Per descobrir per on passa una serralada.'],
          ['Polític', 'Fronteres, territoris, capitals i altres ciutats.', 'Per saber quins països comparteixen frontera.'],
          ['Topogràfic', 'El relleu amb detall, els camins i altres elements del terreny.', 'Per preparar una excursió i veure els pendents.'],
          ['Temàtic', 'Un tema concret, com les pluges, la població o el transport.', 'Per comparar on plou més o trobar una línia de tren.'],
        ]),
        p('Un mapa topogràfic pot mostrar el relleu amb **corbes de nivell**, línies que uneixen punts situats a la mateixa altitud. Quan són molt juntes, el terreny fa més pendent.')),
      section('atles', 'L’atles',
        p('Un **atles** és un conjunt de mapes organitzats per territoris, per temes o per tots dos criteris. Pot ser un llibre o un recurs digital. Si busques un lloc, l’índex de noms et pot indicar en quina pàgina i en quin sector de la graella el trobaràs.'),
        p('Per estudiar un riu, pots obrir un mapa físic per veure on neix i on desemboca. Després pots consultar un mapa polític per descobrir quins països travessa o separa.')),
      section('lectura', 'Com es llegeix un mapa?',
        list('Llegeix el **títol**. Et diu quin territori i quin tema representa el mapa.',
          'Busca l’**orientació**. La fletxa del nord o la rosa dels vents t’ajuden a saber cap a on mires. En molts mapes el nord és a dalt.',
          'Consulta la **llegenda**. Interpreta els colors i els símbols que et fan falta.',
          'Comprova l’**escala** si necessites estimar distàncies. Fes servir les coordenades o la graella si vols situar un punt.',
          'Fixa’t en la **font i la data** si vols dades actualitzades, com una nova carretera o una ruta d’autobús.')),
      section('fisic', 'El planisferi físic',
        p('Un **planisferi** o **mapamundi** representa tota la superfície terrestre en un pla. Com que la Terra és gairebé esfèrica, en passar-la a un full es deformen algunes mides, formes o distàncies. La manera de fer aquest pas s’anomena **projecció cartogràfica**.'),
        p('El **planisferi físic** mostra la distribució dels continents i oceans i destaca elements naturals com les serralades, els rius i les grans planes. La llegenda indica si els colors mostren l’altitud del terreny o la profunditat del mar. Per exemple, pots buscar la serralada dels Andes a l’oest d’Amèrica del Sud.')),
      section('politic', 'El planisferi polític',
        p('El **planisferi polític** mostra com s’organitza el territori del món en estats. Hi podem trobar els noms dels països, les fronteres, les capitals i algunes ciutats importants. Els colors ajuden a distingir països veïns i els punts o altres símbols indiquen les ciutats.'),
        box('Dos mapes, un mateix lloc', 'Localitza els **Andes** al planisferi físic. Després busca la mateixa zona al polític i identifica dos països per on passa la serralada. Quina informació t’ha donat cadascun dels mapes?')),
    ],
  }, {
    description: 'Tria el mapa que et convé, consulta un atles i compara què mostren els planisferis físics i polítics.',
    curriculum: [{ row: 'medi:cartografia', section: 'lectura', note: 'Ensenya a triar i llegir mapes físics, polítics i temàtics.' }],
    resources: worldMaps,
  });
}
