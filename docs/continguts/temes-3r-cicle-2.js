window.quaderns ??= [];
window.variantsMaterials ??= {};

{
  const p = text => ({ type: 'paragraph', text });
  const repte = (title, text) => ({ type: 'note', kind: 'prova', title, text });
  const taula = (headers, rows, rowHeadingWidth = 30) => ({ type: 'table', headers, rows, rowHeadingWidth });
  const itinerari = (id, title, theme) => ({ collection: { id, title }, theme });

  function apartat(id, title, essencial, ...lectura) {
    return {
      id,
      title,
      blocks: [{ ...p(essencial), core: true }, ...lectura.map(block => typeof block === 'string' ? p(block) : block)],
    };
  }

  function fitxa(grup, code, id, title, intro, { descripcio, curriculum, fonts, apartats, guia, ampliacio }) {
    const ultimApartat = apartats.at(-1).id;
    const suport = Object.fromEntries(apartats.map(({ id }) => [id, []]));
    suport[ultimApartat] = [{ type: 'steps', items: guia }];
    window.quaderns.push({
      ...grup, id, code, title, lang: 'ca', subject: 'Medi', cycle: 'p3',
      status: 'en-desenvolupament', difficulty: 'Intermèdia',
      description: descripcio,
      curriculum: curriculum.map(([row, section, note]) => ({ row: 'medi:' + row, section, note })),
      sources: fonts,
      chapters: [{ id, title, intro, sections: apartats }],
    });
    window.variantsMaterials[code] = {
      [id]: {
        suport: { sections: suport },
        ampliacio: { sections: { [ultimApartat]: ampliacio } },
      },
    };
  }

  const drets = itinerari('drets-i-deures', 'Drets i responsabilitats', 'Ciutadania');
  const convencio = ['Nacions Unides · Convenció sobre els Drets de l’Infant', 'https://www.ohchr.org/sites/default/files/crc.pdf'];

  fitxa(drets, 'M052', 'paraula-i-drets', 'La paraula donada i els drets de tothom',
    'La classe ha acordat tornar a lloc el material de joc. Un grup se n’oblida. Què es pot fer perquè l’acord torni a funcionar?', {
      descripcio: 'Distingeix drets, deures i compromisos i practica com reparar un acord incomplert.',
      curriculum: [['civica', 'drets', 'Diferencia els drets dels infants de les normes i els compromisos de convivència.']],
      fonts: [convencio],
      apartats: [
        apartat('paraula', 'Què implica donar la paraula?',
          'Un **compromís** és una cosa que acordem fer. Si no el podem complir, podem avisar i buscar una manera de reparar les conseqüències.',
          'Si t’havies compromès a dur unes cartolines i t’has descuidat, pots avisar el grup, reconèixer què ha passat i oferir-te a buscar-ne unes altres.'),
        apartat('drets', 'Els drets són de tots els infants',
          'Tots els infants tenen **drets** com la protecció, l’educació i el joc. Un dret es manté encara que algú incompleixi un acord.',
          'La Convenció sobre els Drets de l’Infant recull drets que els estats que s’hi han compromès han de respectar i garantir. Si tenim un problema, podem demanar ajuda a una persona adulta de confiança.'),
        apartat('acords', 'Responsabilitats que fan possible conviure',
          'Les **normes de convivència** concreten com compartim espais i ens tractem. Han de respectar els drets de totes les persones.',
          'Ordenar el material facilita que el grup següent pugui jugar. Si es perd una peça, una resposta proporcionada és ajudar a buscar-la i acordar qui comprovarà el material la pròxima vegada.',
          repte('Repara l’acord', 'Escriu què diries al grup següent, quina reparació proposaries i quin dret cal continuar respectant.')),
      ],
      guia: ['Digues una cosa que havíem acordat fer.', 'Completa «Em comprometo a reparar-ho fent…».', 'Posa un exemple de dret que es manté.'],
      ampliacio: [repte('Pot l’assemblea aprovar qualsevol norma?', 'La majoria vol deixar un grup sense pati tota la setmana per una peça perduda. Examina què intenta solucionar la proposta i suggereix una mesura que repari el problema i preservi el dret al joc.')],
    });

  fitxa(drets, 'M053', 'expressio-i-informacio', 'Dir la nostra i comprovar què sabem',
    'Dos missatges circulen sobre una festa de l’escola. Un diu que s’ha ajornat i l’altre diu que es farà. Què ens ajudaria a aclarir-ho?', {
      descripcio: 'Relaciona el dret a expressar-se i a ser escoltat amb l’accés a informació fiable.',
      curriculum: [
        ['civica', 'expressio', 'Distingeix el dret a ser escoltat i la llibertat d’expressió.'],
        ['digital', 'fonts', 'Comprova autoria, data, font original i privadesa en compartir informació.'],
      ],
      fonts: [convencio, ['XTEC · Currículum de primària', 'https://xtec.gencat.cat/ca/curriculum/primaria/curriculum-175-2022/']],
      apartats: [
        apartat('expressio', 'Tenir veu quan una decisió ens afecta',
          'Els infants tenen dret a **expressar les seves opinions** i a ser escoltats en els assumptes que els afecten.',
          'En una assemblea pots dir que no comparteixes una proposta i explicar per què. Pots qüestionar les idees mantenint el respecte per les persones. Escoltar una opinió implica prendre-la en consideració.'),
        apartat('fonts', 'D’on ha sortit el missatge?',
          'Tenim dret a accedir a informació. Per saber si és fiable, mira **qui** l’ha publicat, **quan** i si es pot trobar la font original.',
          'Si un missatge reenviat afirma que la festa s’ajorna, busca l’avís més recent de l’escola. Una captura antiga pot semblar nova quan perd la data. Evita reenviar dades personals que no cal difondre.'),
        apartat('decisio', 'Diferencia una dada d’una opinió',
          'Una **dada** es pot comprovar. Una **opinió** expressa una valoració que podem justificar.',
          repte('Troba la prova', 'Compara «L’avís del centre diu que la festa comença a les cinc» i «Començar a les cinc és massa tard». Identifica què comprovaries i quina frase demana arguments.')),
      ],
      guia: ['Subratlla la frase que indica una hora.', 'Digues on comprovaries l’hora.', 'Comença una opinió amb «Crec que… perquè…».'],
      ampliacio: [repte('El missatge més nou té sempre raó?', 'Un missatge anònim és més nou que l’avís del centre. Proposa dues comprovacions abans de dir a la classe si hi ha hagut un canvi.')],
    });

  fitxa(drets, 'M054', 'salut-i-educacio', 'Què fa possible anar a escola i tenir salut?',
    'Una escola té escales a l’única entrada. Al poble, el transport que arriba al centre de salut passa poques vegades. Com afecten aquests obstacles la vida dels infants?', {
      descripcio: 'Identifica barreres d’accés a l’educació i la salut i pensa com es poden reduir.',
      curriculum: [['civica', 'barreres', 'Relaciona drets, barreres d’accés i mesures d’equitat.']],
      fonts: [convencio],
      apartats: [
        apartat('salut', 'Poder tenir cura de la salut',
          'El **dret a la salut** inclou accedir a l’atenció sanitària quan cal i créixer en condicions que protegeixin la salut.',
          'L’aigua potable, la informació que s’entén i l’accés a un centre de salut hi contribueixen. Poder arribar a una consulta també depèn del transport.'),
        apartat('educacio', 'Aprendre i participar',
          'El **dret a l’educació** inclou poder anar a escola i trobar-hi condicions per aprendre i participar.',
          'Una rampa pot facilitar l’accés a l’edifici. Un text amb lletra llegible o un suport lingüístic poden ajudar a participar en una activitat de classe.'),
        apartat('barreres', 'Localitza la barrera',
          'Una **barrera** és un obstacle que dificulta exercir un dret. L’**equitat** busca donar a cada persona el suport que li cal.',
          repte('Accés a la biblioteca', 'La biblioteca escolar és al primer pis i l’ascensor està avariat. Proposa una actuació per avui i una millora que resolgui el problema a llarg termini.')),
      ],
      guia: ['Digues què impedeix arribar a la biblioteca.', 'Proposa un lloc accessible per fer el préstec avui.', 'Explica què caldria reparar.'],
      ampliacio: [repte('Com sabem si la millora funciona?', 'El centre canvia el lloc del préstec. Indica com consultaries l’alumnat i què observaries per saber si ara pot fer servir el servei en les mateixes condicions.')],
    });

  fitxa(drets, 'M055', 'respecte-i-igualtat', 'El respecte també es veu en com repartim les coses',
    'En un projecte, les mateixes persones sempre fan servir les eines i unes altres sempre prenen notes. Com es decideix qui fa cada feina?', {
      descripcio: 'Detecta estereotips, discriminació i repartiments desiguals en situacions escolars.',
      curriculum: [['civica', 'igualtat', 'Identifica discriminacions i proposa mesures d’igualtat entre nenes i nens.']],
      fonts: [convencio],
      apartats: [
        apartat('respecte', 'La dignitat de cada persona',
          'Respectar algú és tractar-lo amb **dignitat** i tenir en compte els seus drets, les seves necessitats i els seus límits.',
          'Un malnom pot semblar divertit a qui el diu i fer mal a qui el rep. Si una persona demana que parem, cal escoltar-la. També podem donar-li suport o demanar ajuda.'),
        apartat('estereotips', 'Quan una etiqueta decideix per tu',
          'Un **estereotip** atribueix el mateix tret a tot un grup. Hi ha **discriminació** quan això porta a un tracte desigual.',
          'Dir que només els nens saben muntar un circuit pot fer que les nenes no tinguin ocasió d’aprendre’n. Que algú ja en sàpiga més avui pot reflectir les oportunitats que ha tingut fins ara.'),
        apartat('igualtat', 'Repartim les oportunitats',
          'La **igualtat** implica que nenes i nens puguin accedir a les mateixes oportunitats i participar en les decisions.',
          repte('Tothom passa per cada tasca', 'Organitza tres torns perquè totes les persones d’un grup de tres puguin muntar, comprovar i explicar el circuit. Indica quin suport oferiries a qui comença.')),
      ],
      guia: ['Anomena les tres tasques.', 'Assigna una tasca diferent a cada persona.', 'Fes dos canvis de torn i comprova que tothom ho ha fet tot.'],
      ampliacio: [repte('Revisa el temps de joc', 'Dos grups tenen el mateix torn de pista, però un ha d’arribar des d’un edifici llunyà i perd part del temps. Proposa com comprovaries la diferència i com canviaries l’acord.')],
    });

  fitxa(drets, 'M056', 'camins-escolars-segurs', 'Un camí escolar que pugui fer tothom',
    'Per anar a l’escola hi ha un camí curt amb un encreuament difícil i un de més llarg amb voreres amples. Quin triaries i amb quins criteris?', {
      descripcio: 'Compara itineraris escolars segons la visibilitat, les cruïlles i l’accessibilitat.',
      curriculum: [['civica', 'auditoria', 'Analitza la mobilitat segura i accessible en un recorregut escolar.']],
      fonts: [['Servei Català de Trànsit · Vianants', 'https://transit.gencat.cat/ca/seguretat_viaria/col-lectius-vulnerables/vianants/']],
      apartats: [
        apartat('risc', 'Els punts que cal mirar en un plànol',
          'Per comparar recorreguts, fixa’t en els **encreuaments**, la visibilitat, la continuïtat de les voreres i els passos de vianants.',
          'Una cruïlla amb vehicles aparcats molt a prop pot deixar poc espai per veure si en ve un altre. Una vorera estreta pot dificultar el pas d’algú que va en cadira de rodes.'),
        apartat('creuar', 'Creuar amb atenció',
          'Abans de creuar, atura’t en un punt habilitat, mira en totes direccions i comprova que els vehicles s’han aturat o que es pot passar amb seguretat.',
          'Si hi ha semàfor, creua quan el senyal ho permeti i el pas sigui segur. Guarda el mòbil mentre creues. Quan observem un carrer en grup, ho fem des d’un lloc segur de la vorera.'),
        apartat('auditoria', 'Tria un recorregut i justifica’l',
          'Un **camí escolar segur** combina les decisions de qui es desplaça amb un carrer ben dissenyat i accessible.',
          taula(['Ruta', 'Distància', 'Punts que cal valorar'], [
            ['A', '350 m', 'Una cruïlla amb poca visibilitat i un tram de vorera estreta.'],
            ['B', '470 m', 'Dos passos de vianants amb semàfor i voreres amples.'],
          ], 20),
          repte('Dues opcions al plànol', 'Amb les dades de la taula, tria una ruta i explica dos motius. Anota una dada que et faltaria per confirmar la tria.')),
      ],
      guia: ['Busca a la taula la ruta de voreres amples.', 'Marca què ajuda a creuar-hi.', 'Digues un motiu per fer uns metres més.'],
      ampliacio: [repte('Una ruta segura de matí i de tarda?', 'A l’hivern es fa fosc a l’hora de sortida. Tria una dada sobre llum i una sobre trànsit que recolliries en dos moments diferents, sempre des d’un lloc segur.')],
    });

  fitxa(drets, 'M057', 'decidir-que-consumim', 'Abans de comprar, quines opcions tenim?',
    'La cremallera de la motxilla de l’aula s’ha espatllat. En podeu comprar una altra, reparar-la o aprofitar-ne una que ja teniu. Què cal saber per decidir?', {
      descripcio: 'Compara compra, reparació i reutilització segons el cost, la durada i els residus.',
      curriculum: [['ecosocial', 'opcions', 'Argumenta una decisió de consum amb criteris socials, econòmics i ambientals.']],
      fonts: [['Agència Catalana del Consum · Escola del Consum de Catalunya', 'https://consum.gencat.cat/ca/lagencia/escola-del-consum-de-catalunya/docencia/sobre-lescola/']],
      apartats: [
        apartat('necessitat', 'Quina necessitat volem cobrir?',
          'El **consum responsable** comença preguntant què necessitem i què podem aprofitar abans de comprar.',
          'L’anunci pot destacar una oferta o una moda. Per decidir, ajuda saber si el producte encaixa amb l’ús que en farem, quant pot durar i si es podrà reparar.'),
        apartat('opcions', 'Compara opcions amb les mateixes preguntes',
          'A més del **preu**, podem comparar la durada, els materials, les condicions de fabricació i els residus que generarà cada opció.',
          taula(['Opció', 'Cost estimat', 'Què comporta?'], [
            ['Reparar', '8 €', 'Cal esperar dos dies i es conserva la motxilla.'],
            ['Comprar', '20 €', 'Es pot fer servir avui i cal gestionar la motxilla vella.'],
            ['Reutilitzar', '0 €', 'Hi ha una motxilla de recanvi; falta comprovar-ne la mida.'],
          ]),
          repte('Decideix amb dos criteris', 'Si la motxilla es necessita d’aquí a tres dies, quines opcions encaixen? Tria’n una, explica el cost i afegeix un criteri que no sigui el preu.')),
        apartat('publicitat', 'Comprovem les promeses',
          'Quan una etiqueta diu «sostenible» o «durador», pregunta **quina informació** ho acredita.',
          'Una garantia, la disponibilitat de recanvis o una informació verificable sobre el material ajuden a comparar productes. Una paraula atractiva a l’anunci aporta poca informació tota sola.'),
      ],
      guia: ['Tria entre reparar, comprar o aprofitar el recanvi.', 'Comprova el cost i si l’opció arriba a temps.', 'Demana una dada que et falti.'],
      ampliacio: [repte('El cost per ús', 'Una opció costa 20 € i s’estima que durarà 100 usos. Una altra costa 12 € i en duraria 30. Compara el cost per ús i indica quina dada real voldries observar per comprovar les estimacions.')],
    });


  const materia = itinerari('canvis-i-mescles', 'La matèria canvia i es barreja', 'Matèria i energia');
  const propietats = ['OpenStax · Propietats i canvis físics i químics', 'https://openstax.org/books/chemistry-2e/pages/1-3-physical-and-chemical-properties'];
  const mescles = ['OpenStax · Classificació de la matèria', 'https://openstax.org/books/chemistry-2e/pages/1-2-phases-and-classification-of-matter'];
  const dissolucions = ['OpenStax · Dissolucions i solubilitat', 'https://openstax.org/books/chemistry-2e/pages/11-3-solubility'];

  fitxa(materia, 'M058', 'canvis-fisics-quimics', 'Quan un canvi forma substàncies noves?',
    'La xocolata es fon quan l’escalfem i s’endureix quan es refreda. Un pa de pessic canvia al forn. Què ha passat en cada cas?', {
      descripcio: 'Compara canvis físics i químics al voltant de la cuina i distingeix observacions i proves.',
      curriculum: [['materia', 'quimics', 'Relaciona els canvis de la matèria amb la formació de substàncies noves.']],
      fonts: [propietats],
      apartats: [
        apartat('fisics', 'Fondre i barrejar',
          'En un **canvi físic**, les substàncies continuen sent les mateixes, encara que en canviï la forma, l’estat o la distribució.',
          'La xocolata es pot fondre i tornar a solidificar. En preparar xocolata desfeta se solen produir també mescles, per exemple quan distribuïm cacau dins de la llet.'),
        apartat('quimics', 'Transformacions durant la cocció',
          'En un **canvi químic** es formen substàncies diferents de les inicials. En una mateixa preparació hi pot haver més d’un tipus de canvi.',
          'Al forn un impulsor pot alliberar diòxid de carboni, que ajuda a fer pujar el pa de pessic. Quan es fregeix un ou, algunes proteïnes canvien de forma i s’agrupen. Aquest canvi en les proteïnes ajuda a explicar per què la clara es torna opaca i sòlida.',
          'Fabricar sabó a partir de greixos requereix una reacció química, la **saponificació**. En canvi, dissoldre sabó ja fet en aigua reparteix el sabó per la mescla.'),
        apartat('pistes', 'Una pista s’ha d’interpretar',
          'El color, les bombolles o la temperatura ens poden donar **pistes**. Cal saber d’on ve cada canvi per poder explicar-lo.',
          repte('Dues bombolles amb orígens diferents', 'En aigua que bull, les bombolles són sobretot vapor d’aigua. En un pa de pessic, l’impulsor pot formar un gas nou. En quin cas hi ha prova d’una reacció?')),
      ],
      guia: ['Assenyala quin cas continua sent aigua.', 'Busca el nom del gas nou al pa de pessic.', 'Relaciona cada exemple amb un tipus de canvi.'],
      ampliacio: [repte('Què demostra una forma diferent?', 'Trencar una galeta és difícil de desfer i fondre xocolata és fàcil de revertir. Per què la possibilitat de tornar enrere, tota sola, serveix poc per classificar canvis?')],
    });

  fitxa(materia, 'M059', 'mescles-i-components', 'Quan podem distingir els ingredients?',
    'Si remenes aigua amb sorra, pots veure els grans. Si hi dissols sucre, el líquid sembla igual a tot arreu. Què els diferencia?', {
      descripcio: 'Distingeix mescles homogènies i heterogènies i observa què passa quan es deixen reposar.',
      curriculum: [['materia', 'comparacio', 'Classifica mescles a partir de la distribució dels components.']],
      fonts: [mescles],
      apartats: [
        apartat('components', 'Els components d’una mescla',
          'Una **mescla** conté dues substàncies o més. Podem combinar materials en proporcions diferents.',
          'Amb aigua i sorra es poden preparar mescles amb molta o poca sorra. Si n’agafem de la superfície i del fons, les mostres poden tenir quantitats diferents de sorra.'),
        apartat('comparacio', 'Una fase o diverses fases',
          'En una mescla **homogènia**, els components estan repartits uniformement a l’escala que estudiem. Una mescla **heterogènia** presenta regions de composició diferent.',
          taula(['Exemple', 'Què hi veiem?'], [
            ['Aigua i sucre dissolt', 'Un líquid uniforme sense cristalls al fons.'],
            ['Aigua i sorra', 'Grans sòlids que es poden acumular al fons.'],
            ['Aigua i oli', 'Capes diferents quan la mescla reposa.'],
          ], 34),
          repte('Justifica la classificació', 'Classifica els tres exemples i justifica’ls amb les observacions de la taula.')),
      ],
      guia: ['Busca a la taula el líquid uniforme.', 'Marca els casos on distingim dues parts.', 'Escriu el nom dels dos tipus de mescla.'],
      ampliacio: [repte('L’oli després de remenar', 'Just després de remenar, veus moltes gotetes petites. Després tornen a aparèixer dues capes. Explica com el repòs t’ha ajudat a interpretar la mescla.')],
    });

  fitxa(materia, 'M060', 'dissoldre-diluir-saturar', 'On va a parar la sal quan es dissol?',
    'En un got, la sal deixa de veure’s. En un altre amb la mateixa quantitat d’aigua queda sal al fons. Què pot explicar la diferència?', {
      descripcio: 'Explica què són solut i dissolvent, interpreta una dilució i reconeix una dissolució saturada.',
      curriculum: [['materia', 'saturacio', 'Distingeix dissolució, dilució i saturació en dades senzilles.']],
      fonts: [dissolucions],
      apartats: [
        apartat('dissolucio', 'Solut i dissolvent',
          'En una **dissolució**, el **solut** queda repartit pel **dissolvent**. En aigua amb sal dissolta, la sal és el solut i l’aigua és el dissolvent.',
          'L’aigua dissol moltes substàncies, com la sal i el sucre. Sovint se’n diu «dissolvent universal» per aquesta capacitat. L’oli o la sorra, en canvi, no s’hi dissolen en les condicions habituals.'),
        apartat('estats', 'Dissolucions líquides, sòlides i gasoses',
          'Les **dissolucions** poden ser líquides, sòlides o gasoses, segons l’estat de la mescla.',
          'L’aigua salada és líquida i l’aire sec és una mescla gasosa, formada sobretot per nitrogen i oxigen. Alguns aliatges, com certs tipus de llautó fets amb coure i zinc, són dissolucions sòlides.'),
        apartat('dilucio', 'La mateixa sal en més aigua',
          'Fer una **dilució** és afegir dissolvent. La quantitat de solut es manté i la concentració baixa.',
          'Si hi ha 4 g de sal en 100 mL de dissolució i hi afegeixes aigua fins a 200 mL, continuen havent-hi 4 g de sal. Cada 100 mL de la nova dissolució en contenen 2 g.'),
        apartat('saturacio', 'El límit que es pot dissoldre',
          'Una dissolució és **saturada** quan, en unes condicions determinades, conté la quantitat màxima de solut que es pot dissoldre.',
          'Si queda sal al fons després de remenar i esperar prou, pot haver-se assolit aquest límit. La quantitat que es pot dissoldre depèn del solut, del dissolvent i de la temperatura.',
          repte('Què canviaria?', 'Al got amb sal al fons afegim aigua. Explica per què podria desaparèixer part de la sal visible.')),
      ],
      guia: ['Assenyala el solut i el dissolvent.', 'En l’exemple de la dilució, troba la quantitat de sal abans i després.', 'Explica què mostra la sal al fons després d’haver esperat.'],
      ampliacio: [repte('Compara condicions', 'Amb la mateixa quantitat d’aigua, un grup ha dissolt 15 g d’un solut i un altre 22 g. Quines dues dades necessites abans d’atribuir la diferència a la temperatura?')],
    });

  fitxa(materia, 'M061', 'separar-mescles', 'Una tècnica de separació per a cada mescla',
    'Un grapat conté pedretes, sorra i clips d’acer. Què podríem aprofitar de cada material per separar-los?', {
      descripcio: 'Tria entre garbellar, imantar, filtrar, evaporar, cristal·litzar i destil·lar.',
      curriculum: [['materia', 'triar', 'Tria tècniques de separació segons les propietats dels components.']],
      fonts: [mescles, dissolucions],
      apartats: [
        apartat('triar', 'Què diferencia els components?',
          'Cada tècnica aprofita una **propietat** dels materials, com la mida de les partícules, el magnetisme o la facilitat d’evaporar-se.',
          taula(['Tècnica', 'Quina propietat aprofita?'], [
            ['Garbellament', 'La mida. Els grans petits travessen els forats del garbell.'],
            ['Imantació', 'L’atracció per l’imant. Els clips d’acer es poden separar de la sorra.'],
            ['Filtració', 'Un filtre adequat reté partícules sòlides en suspensió i deixa passar el líquid.'],
          ], 36)),
        apartat('recuperar', 'Recuperar la sal o recuperar l’aigua',
          'Quan l’aigua s’**evapora**, el solut pot formar cristalls. La **destil·lació** recull el vapor i el refreda perquè torni a ser líquid.',
          'A les salines s’evapora l’aigua i es recull la sal cristal·litzada. En un esquema de destil·lació d’aigua salada, el vapor d’aigua viatja a una zona més freda i es recull com a aigua líquida.',
          repte('Del riu al laboratori', 'Imagina una barreja d’aigua salada amb sorra en suspensió. Proposa un ordre de tècniques per recuperar la sorra i després la sal.')),
      ],
      guia: ['Troba quina tècnica fa servir un imant.', 'Tria la tècnica que reté sorra al filtre.', 'Explica com recuperaries la sal dissolta.'],
      ampliacio: [repte('Què passarà si fem servir un filtre?', 'Dos grups intenten separar la sal de l’aigua. Un fa servir un filtre de paper i l’altre deixa evaporar l’aigua. Prediu on quedarà la sal en cada cas i justifica-ho.')],
    });

  fitxa(materia, 'M062', 'oxidacio-i-fermentacio', 'Quan el ferro es rovella i la massa creix',
    'Una peça de ferro al carrer canvia amb el temps. Una massa de pa creix mentre reposa. Quines pistes ens ajuden a explicar aquests canvis?', {
      descripcio: 'Compara l’oxidació del ferro i la fermentació del pa amb observacions i dades.',
      curriculum: [
        ['materia', 'oxidacio', 'Reconeix l’oxidació i la fermentació com a canvis de la matèria.'],
        ['indagacio', 'comparar', 'Identifica la variable que canvia en una prova comparativa.'],
      ],
      fonts: [propietats, ['OpenStax · Fermentació', 'https://openstax.org/books/biology-2e/pages/7-5-metabolism-without-oxygen']],
      apartats: [
        apartat('oxidacio', 'Com es forma el rovell?',
          'Quan el ferro reacciona amb l’oxigen en presència d’aigua es poden formar substàncies que constitueixen el **rovell**.',
          'Una tanca protegida amb pintura queda menys exposada a l’aigua i l’aire. Si la pintura es desprèn, el ferro queda a l’abast de la humitat.'),
        apartat('fermentacio', 'El gas que infla la massa',
          'En la **fermentació** del pa, els llevats transformen sucres i produeixen, entre altres substàncies, diòxid de carboni.',
          'Les bombolles queden atrapades a la massa, que augmenta de volum. Fermentacions diferents intervenen en altres aliments, com el iogurt.'),
        apartat('comparar', 'Canvia una sola condició',
          'Una comparació és més clara quan **canvia una sola condició** i observem de la mateixa manera.',
          repte('La peça més humida', 'Dues peces iguals, sense pintura, són a la mateixa temperatura. Una és seca i l’altra rep humitat. Prediu on apareixerà abans el rovell i digues què observaries per comprovar-ho.')),
      ],
      guia: ['Assenyala la peça exposada a l’aigua.', 'Busca quin gas fa créixer la massa.', 'Digues quina única condició canvia en la comparació.'],
      ampliacio: [repte('Quan la comparació és confusa', 'Una peça era humida i de ferro. L’altra era seca i d’acer inoxidable. Indica dues diferències que impedeixen atribuir el resultat a una sola causa.')],
    });

  fitxa(materia, 'M063', 'combustio-i-energia', 'Què passa quan crema un combustible?',
    'Una calefacció pot escalfar una aula amb electricitat o amb un combustible. Com es produeix la calor en cada cas?', {
      descripcio: 'Relaciona combustió, energia, productes de la reacció i qualitat de l’aire.',
      curriculum: [
        ['materia', 'reaccio', 'Explica la combustió com a transformació de matèria amb alliberament d’energia.'],
        ['ecosocial', 'aire', 'Relaciona la tria d’una font d’energia amb les emissions i l’aire de l’entorn.'],
      ],
      fonts: [propietats, ['EPA · El fum de la fusta', 'https://www.epa.gov/burnwise/wood-smoke-and-your-health']],
      apartats: [
        apartat('reaccio', 'Combustible, oxigen i energia',
          'En la **combustió**, materials com la fusta o el gas reaccionen amb l’oxigen i alliberen energia, sobretot en forma de calor.',
          'Durant la reacció es formen productes nous. En la combustió completa d’un combustible format per carboni i hidrogen, els productes principals són el diòxid de carboni i l’aigua.'),
        apartat('aire', 'La calor i el que arriba a l’aire',
          'El **fum** pot contenir gasos i partícules. La combustió incompleta pot produir monòxid de carboni, un gas tòxic que no es veu ni es pot olorar.',
          'La fusta i el carbó s’han utilitzat per obtenir calor. Un radiador elèctric transforma electricitat en calor allà on funciona. Per comparar els impactes, també cal saber com s’ha generat l’electricitat.',
          repte('Dues calefaccions', 'Dibuixa dos esquemes, un per a la llenya i un per al radiador elèctric. Marca on es produeix la calor i què has de saber per comparar les emissions.')),
      ],
      guia: ['Assenyala quin sistema crema llenya.', 'Indica on intervé l’oxigen.', 'Localitza el lloc que s’escalfa.'],
      ampliacio: [repte('Mira més enllà de l’aparell', 'La mateixa aula es podria escalfar amb electricitat de dues procedències. Quines dades de cada font caldrien per comparar l’impacte sobre la qualitat de l’aire i el clima?')],
    });


  const reproduccio = itinerari('reproduccio', 'Com continua la vida', 'Éssers vius');
  const reproduccioAnimal = ['OpenStax · Reproducció i desenvolupament dels animals', 'https://openstax.org/books/biology-2e/pages/43-chapter-summary'];
  const anatomia = ['OpenStax · Anatomia de l’aparell reproductor humà', 'https://openstax.org/books/biology-2e/pages/43-3-human-reproductive-anatomy-and-gametogenesis'];

  fitxa(reproduccio, 'M064', 'formes-de-reproduccio', 'De quantes maneres es pot formar un ésser viu?',
    'Un llevat pot fer aparèixer una cèl·lula nova al seu costat. Un ocell es desenvolupa a partir d’un ou fecundat. Què tenen en comú aquests processos?', {
      descripcio: 'Compara reproducció sexual i asexual i diferencia regeneració i formació de descendència.',
      curriculum: [['vida', 'asexual', 'Distingeix formes de reproducció i explica com es forma un individu nou.']],
      fonts: [reproduccioAnimal, ['OpenStax · Reproducció sexual', 'https://openstax.org/books/biology-2e/pages/11-2-sexual-reproduction']],
      apartats: [
        apartat('asexual', 'Un individu produeix descendència',
          'En la **reproducció asexual** no s’uneixen gàmetes. La descendència acostuma a tenir informació genètica molt semblant a la de l’organisme de partida. Se’n pot dir **clon**.',
          'En la **bipartició**, una cèl·lula es divideix en dues. En la **gemmació**, com en molts llevats, creix una gemma que pot separar-se. Alguns fongs es reprodueixen asexualment per **espores**.'),
        apartat('fragments', 'Reparar una part o formar un individu',
          'Hi ha **fragmentació** reproductiva si d’un fragment sorgeix un individu nou. La **regeneració** també pot servir només per reparar una part del cos.',
          'Una sargantana pot regenerar part de la cua. La cua separada no es converteix en una altra sargantana. En alguns cucs plans, segons l’espècie i el fragment, una part separada sí que pot donar un nou individu.'),
        apartat('sexual', 'Dos gàmetes s’uneixen',
          'En la **reproducció sexual**, dos **gàmetes** s’uneixen i formen un **zigot**, la primera cèl·lula del nou organisme.',
          'En els animals, l’òvul i l’espermatozoide són els gàmetes. La combinació de la seva informació genètica contribueix a les diferències entre individus.',
          repte('Quina pista decideix?', 'Compara una gemma de llevat, una cua que torna a créixer i un ou fecundat. Indica si es forma un individu nou i si s’han unit gàmetes.')),
      ],
      guia: ['Cerca què passa als gàmetes en la reproducció sexual.', 'Assenyala quin exemple és una reparació.', 'Escriu el nom del cas en què creix una gemma.'],
      ampliacio: [repte('Tenen el mateix aspecte?', 'Dues plantes procedents del mateix esqueix creixen amb quantitats de llum diferents. Si tenen alçades diferents, és una prova que no són clons? Separa l’efecte de l’entorn i el de la informació genètica.')],
    });

  fitxa(reproduccio, 'M065', 'flors-llavors-i-esqueixos', 'Una planta nova sense llavor i una amb llavor',
    'Un maduixer creix de costat i arrela en un punt nou. Un gira-sol forma llavors. Seguirem els passos que poden donar lloc a cada planta nova.', {
      descripcio: 'Compara esqueixos, estolons i tubercles amb la reproducció sexual de les plantes amb flor.',
      curriculum: [['vida', 'pollinitzacio', 'Diferencia la propagació vegetativa, la pol·linització i la fecundació.']],
      fonts: [['OpenStax · Reproducció de les plantes', 'https://openstax.org/books/biology-2e/pages/32-chapter-summary']],
      apartats: [
        apartat('vegetativa', 'Quan una part de la planta arrela',
          'La **reproducció vegetativa** permet obtenir una planta nova a partir d’una part d’una altra planta, sense formar llavors.',
          'Un **esqueix** és un tros de planta que pot arrelar. Un **estoló** és una tija que creix horitzontalment, com al maduixer. Alguns **tubercles**, com les patates, tenen gemmes que poden brotar.'),
        apartat('flor', 'Les parts d’una flor',
          'Els **estams** produeixen pol·len. El **pistil** inclou l’estigma, on pot arribar el pol·len, i l’ovari, on hi ha els òvuls.',
          'Una flor amb estams i pistil sovint s’anomena **hermafrodita**. També hi ha flors que tenen només una d’aquestes estructures.'),
        apartat('pollinitzacio', 'Del pol·len a la llavor',
          'La **pol·linització** és el transport del pol·len fins a l’estigma. Si després s’uneixen els gàmetes, hi ha **fecundació**.',
          'El vent o animals com les abelles poden transportar el pol·len. Després de la fecundació, l’òvul pot convertir-se en llavor i l’ovari contribueix a formar el fruit.',
          repte('Ordena el recorregut', 'Ordena aquestes pistes: formació de la llavor, arribada del pol·len a l’estigma, unió dels gàmetes. Assenyala quin pas pot fer una abella en moure pol·len.')),
      ],
      guia: ['Assenyala d’on surt i on arriba el pol·len.', 'Col·loca la fecundació entre l’arribada del pol·len i la llavor.', 'Posa un exemple de planta nova sense llavor.'],
      ampliacio: [repte('Una flor amb visita', 'Un insecte visita diverses flors, però després algunes no fan llavors. Explica per què la visita, per si sola, no demostra que s’hagi produït fecundació.')],
    });

  fitxa(reproduccio, 'M066', 'fecundacio-animals', 'On s’uneixen els gàmetes dels animals?',
    'En moltes granotes els ous es troben a l’aigua. En una gallina l’ou es pon més endavant. En quin moment s’han unit els gàmetes?', {
      descripcio: 'Distingeix fecundació interna i externa i separa el lloc de fecundació del de desenvolupament.',
      curriculum: [['vida', 'desenvolupament', 'Compara fecundació i desenvolupament embrionari en animals.']],
      fonts: [reproduccioAnimal],
      apartats: [
        apartat('fecundacio', 'Dins o fora del cos',
          'La **fecundació externa** passa fora del cos de l’animal que allibera els òvuls. La **interna** passa dins del cos.',
          'En moltes granotes la fecundació es produeix a l’aigua. En rèptils, ocells i mamífers és interna. En algunes espècies de mamífers, el **zel** és el període del cicle en què la femella és receptiva a l’aparellament.'),
        apartat('desenvolupament', 'On creix l’embrió?',
          'El lloc de **fecundació** i el lloc on es desenvolupa l’**embrió** són dues informacions diferents.',
          taula(['Exemple', 'Fecundació', 'Desenvolupament'], [
            ['Moltes granotes', 'Fora del cos.', 'En ous a l’aigua.'],
            ['Gallina', 'Dins del cos.', 'En un ou que es pon.'],
            ['Gat', 'Dins del cos.', 'Dins l’úter.'],
          ], 30),
          repte('Dos ous, dues històries', 'Observa la taula i explica per què veure un ou fora del cos no et diu on es va produir la fecundació.')),
      ],
      guia: ['Troba la fila de la gallina.', 'Llegeix primer on s’uneixen els gàmetes.', 'Llegeix després on creix l’embrió.'],
      ampliacio: [repte('Què cal observar?', 'En una espècie marina es troben ous fora del cos. Escriu dues observacions diferents que permetrien decidir on s’han unit els gàmetes.')],
    });

  fitxa(reproduccio, 'M067', 'pubertat-i-menstruacio', 'Un cos que canvia durant la pubertat',
    'Els canvis de la pubertat no comencen el mateix dia per a tothom. Conèixer el cos ajuda a posar nom als canvis i a preguntar amb confiança.', {
      descripcio: 'Identifica òrgans reproductors, canvis de pubertat i la funció de la menstruació.',
      curriculum: [['vida', 'cicle', 'Explica canvis de la pubertat, anatomia reproductora i menstruació amb vocabulari de salut.']],
      fonts: [anatomia],
      apartats: [
        apartat('canvis', 'Els canvis tenen ritmes diferents',
          'La **pubertat** és una etapa en què les hormones desencadenen canvis físics i maduren els òrgans reproductors.',
          'Poden canviar l’alçada, el pèl, la pell o la veu. Pot començar el desenvolupament dels pits, la menstruació o la producció d’espermatozoides, segons l’anatomia. Els ritmes varien i podem preguntar a un professional de salut si alguna cosa ens preocupa.'),
        apartat('organs', 'Posar nom als òrgans genitals',
          'Els **testicles** produeixen espermatozoides. Els **ovaris** contenen òvuls i poden alliberar-ne quan es produeix l’ovulació.',
          'El penis i l’escrot són parts externes de l’aparell reproductor masculí. La **vulva** és el conjunt de genitals externs femenins. La **vagina** és un conducte intern i l’**úter** és l’òrgan on es pot desenvolupar un embaràs. Les trompes uterines comuniquen l’úter amb la zona dels ovaris.'),
        apartat('cicle', 'Què passa durant la menstruació?',
          'En la **menstruació**, una part del revestiment intern de l’úter es desprèn i surt per la vagina amb sang.',
          'Al llarg del cicle, el revestiment de l’úter canvia. Quan no hi ha embaràs, pot produir-se una nova menstruació. La durada dels cicles varia i és habitual que siguin irregulars al principi.',
          repte('Explica-ho amb els noms', 'Dibuixa tres etiquetes, «ovari», «úter» i «vagina». Escriu quina s’associa amb l’ovulació, on canvia el revestiment i per quin conducte surt el flux menstrual.')),
      ],
      guia: ['Relaciona «ovari» amb «òvul».', 'Troba l’òrgan on es desprèn el revestiment.', 'Marca per on surt el flux menstrual.'],
      ampliacio: [repte('Calendari amb variació', 'En un cas fictici passen 29 dies entre dos inicis de menstruació i 34 entre els següents. Explica per què una data calculada amb un únic interval és una estimació. No cal fer servir dates personals.')],
    });

  fitxa(reproduccio, 'M068', 'embaras-i-cura-mutua', 'De la fecundació al naixement i la cura mútua',
    'En un esquema humà, la fecundació i l’embaràs tenen lloc en espais diferents. També hi ha preguntes sobre sexualitat que tenen a veure amb els afectes i els límits.', {
      descripcio: 'Ordena els primers passos de l’embaràs i practica la comunicació i el respecte dels límits.',
      curriculum: [['vida', 'limits', 'Relaciona l’anatomia reproductora i l’embaràs amb l’educació afectivosexual.']],
      fonts: [
        ['OpenStax · Fecundació i desenvolupament embrionari inicial', 'https://openstax.org/books/biology-2e/pages/43-6-fertilization-and-early-embryonic-development'],
        ['Canal Salut · Relacions personals i benestar', 'https://canalsalut.gencat.cat/ca/vida-saludable/salut-mental/consells-tenir-cura/cuidar-relacions-personals/'],
      ],
      apartats: [
        apartat('inici', 'Fecundació i implantació',
          'En humans, la fecundació sol produir-se en una **trompa uterina**. Després de les primeres divisions cel·lulars, l’embrió pot implantar-se a l’**úter**.',
          'La **implantació** és l’adhesió de l’embrió al revestiment de l’úter. En l’esquema, situa primer la fecundació i després el desplaçament i la implantació.'),
        apartat('embaras', 'El desenvolupament durant l’embaràs',
          'Durant l’**embaràs** l’embrió es desenvolupa a l’úter i, més endavant, s’anomena **fetus**.',
          'La placenta permet intercanviar oxigen, nutrients i residus entre l’organisme gestant i el fetus, que s’hi connecta pel cordó umbilical. Amb el part té lloc el naixement.'),
        apartat('limits', 'Parlar i respectar els límits',
          'La sexualitat també té a veure amb el cos, els afectes i la comunicació. El **consentiment** és un acord lliure que es pot retirar en qualsevol moment.',
          'Podem preguntar, escoltar, dir que no i canviar d’opinió. Si algú ens pressiona o ens fa sentir insegurs, podem acudir a una persona adulta de confiança.',
          repte('Pregunta i escolta', 'En un cas inventat, algú demana una abraçada i l’altra persona prefereix saludar amb la mà. Escriu una resposta que respecti el límit.')),
      ],
      guia: ['Ordena «fecundació», «implantació» i «naixement».', 'Assenyala on creix l’embrió.', 'Escriu què diries per respectar un «no».'],
      ampliacio: [repte('I si algú canvia d’opinió?', 'En un joc, algú accepta fer-se una foto i després demana que no es comparteixi. Explica quina decisió cal respectar ara i com hi pots respondre.')],
    });


  const benestar = itinerari('benestar-i-convivencia', 'Benestar i convivència', 'Salut i benestar');
  const relacions = ['Canal Salut · Cuidar les relacions personals', 'https://canalsalut.gencat.cat/ca/vida-saludable/salut-mental/consells-tenir-cura/cuidar-relacions-personals/'];
  const infancia = ['Canal Salut · Infància i adolescència', 'https://canalsalut.gencat.cat/ca/vida-saludable/etapes-de-la-vida/infants-adolescencia/index.html'];

  fitxa(benestar, 'M069', 'emocions-i-autoestima', 'Dies bons, dies difícils i eines per cuidar-nos',
    'S’ha ajornat una sortida que esperàveu. Algú fa una broma i algú altre es posa trist. Totes dues reaccions poden tenir sentit.', {
      descripcio: 'Parla de felicitat, emocions i autoestima a partir d’una situació compartida.',
      curriculum: [['vida', 'respostes', 'Identifica emocions i proposa respostes que cuiden el benestar.']],
      fonts: [infancia, relacions],
      apartats: [
        apartat('felicitat', 'La sort i les condicions per estar bé',
          'El **benestar** depèn de diversos factors, com el descans, la seguretat i les relacions. També hi ha coses que passen per atzar o que escapen a les nostres decisions.',
          'Una activitat pot alegrar-nos i, alhora, podem estar preocupats per una altra cosa. Posar nom al que sentim ajuda a explicar què necessitem.'),
        apartat('autoestima', 'Valorar-nos mentre aprenem',
          'L’**autoestima** és com ens valorem. Ens podem tractar amb respecte també quan alguna cosa ens surt malament.',
          '«Aquesta vegada m’he perdut en les instruccions. Puc demanar que m’expliquin el primer pas» és una manera de pensar que reconeix la dificultat i obre una opció realista.'),
        apartat('respostes', 'Respectar com se sent l’altra persona',
          'El **bon humor** compartit pot alleugerir una situació. Podem mirar si l’altra persona el rep bé i donar-li espai si necessita temps.',
          repte('Dues respostes possibles', 'Algú està decebut perquè s’ha ajornat la sortida. Escriu una frase que reconegui com se sent i una proposta que pugui acceptar o rebutjar.')),
      ],
      guia: ['Posa nom a una emoció del cas.', 'Completa «Entenc que…».', 'Ofereix una ajuda concreta.'],
      ampliacio: [repte('Què podem canviar?', 'Dibuixa dues columnes per separar allò que la classe pot decidir sobre la sortida i allò que depèn de fora. Suggereix un pas realista per a una de les decisions de la classe.')],
    });

  fitxa(benestar, 'M070', 'estrategies-per-aprendre', 'Moltes maneres de practicar una habilitat',
    'Per explicar una descoberta, algú prepara un esquema i algú altre prova d’explicar-la amb les seves paraules. Es poden combinar totes dues idees.', {
      descripcio: 'Valora habilitats diverses i prova estratègies d’aprenentatge segons la tasca.',
      curriculum: [['vida', 'practica', 'Relaciona l’aprenentatge, la confiança i la possibilitat de demanar suport.']],
      fonts: [['IES · Estudi sobre practicar la recuperació de coneixements', 'https://ies.ed.gov/ncee/WWC/Study/67306']],
      apartats: [
        apartat('habilitats', 'Les habilitats es desenvolupen',
          'Podem desenvolupar **habilitats** diferents, com comunicar, orientar-nos o organitzar feina. La pràctica, l’ajuda i les oportunitats hi influeixen.',
          'Una persona pot fer un bon esquema de mapes i demanar suport per entendre una taula. Reduir les capacitats d’algú a una etiqueta deixa de banda tot el que encara pot aprendre.'),
        apartat('practica', 'Comprova què pots explicar',
          'Una manera de revisar què has après és **recordar i explicar** sense mirar i, després, comprovar quines parts cal repassar.',
          'Pots provar de llistar de memòria els components d’una dissolució, comparar la resposta amb la fitxa i afegir-hi un exemple propi. Saber què ja entens pot fer que t’atreveixis a provar una tasca nova.',
          repte('Tres minuts per comprovar-ho', 'Tria dos conceptes que ja hagis treballat. Explica’ls sense mirar, obre la fitxa i corregeix una cosa amb les teves paraules.')),
      ],
      guia: ['Escull una paraula que hagis après.', 'Explica-la a una parella.', 'Rellegeix la definició i completa el que et falti.'],
      ampliacio: [repte('Decideix segons la tasca', 'Per preparar una explicació d’un itinerari, compara què et permet comprovar un plànol i què et permet comprovar explicar el recorregut de memòria.')],
    });

  fitxa(benestar, 'M071', 'cos-imatge-i-alimentacio', 'Cuidar el cos i demanar ajuda quan cal',
    'Una publicació assegura que tots els cossos haurien de tenir la mateixa forma. Què passaria si a classe jutgéssim la salut de les persones amb aquest únic criteri?', {
      descripcio: 'Treballa la diversitat corporal, els hàbits de cura i l’ajuda davant dels trastorns alimentaris.',
      curriculum: [['vida', 'ajuda', 'Relaciona imatge corporal, hàbits saludables i xarxa de suport.']],
      fonts: [
        infancia,
        ['Canal Salut · Trastorns de la conducta alimentària', 'https://canalsalut.gencat.cat/ca/salut-a-z/t/trastorns-conducta-alimentaria/'],
      ],
      apartats: [
        apartat('cura', 'Els cossos es desenvolupen de maneres diferents',
          'El **benestar físic** inclou menjar de manera variada i suficient, descansar i trobar maneres de moure’ns que ens agradin.',
          'L’aspecte del cos, per si sol, aporta poca informació sobre la salut. Podem respectar els cossos de tothom i evitar comentaris sobre el pes o sobre què menja una altra persona.'),
        apartat('ajuda', 'A qui podem recórrer?',
          'L’**anorèxia** i la **bulímia** són trastorns de la conducta alimentària. Poden afectar persones de cossos diversos i requereixen suport professional.',
          'En l’anorèxia hi pot haver una restricció persistent del menjar i una por intensa a guanyar pes. La bulímia es caracteritza per episodis repetits de pèrdua de control amb el menjar i intents de compensar-los. Els professionals de salut valoren el conjunt de símptomes.',
          'Si el menjar o el cos provoquen patiment a algú, podem escoltar-lo amb respecte i parlar amb una persona adulta de confiança. Els professionals de salut poden valorar quina ajuda necessita.',
          repte('Una resposta que acompanya', 'En un cas fictici, algú rep comentaris repetits sobre el seu cos. Escriu què li podries dir en privat i a quina persona adulta del centre podríeu acudir.')),
      ],
      guia: ['Escriu una frase amable que no parli del pes.', 'Pensa una persona adulta de confiança.', 'Completa «Et puc acompanyar a…».'],
      ampliacio: [repte('Canvia el missatge', 'Transforma un anunci fictici que associa una sola forma de cos amb estar bé. Fes una proposta que mostri diversitat corporal i una acció de cura quotidiana.')],
    });

  fitxa(benestar, 'M072', 'tabac-alcohol-i-decisions', 'Com respondre a la pressió per consumir',
    'En una escena inventada, algú ofereix alcohol o un vapejador dient que ho fa tothom. Què sabem sobre el risc i quines sortides tenim?', {
      descripcio: 'Reconeix riscos del tabac, la nicotina i l’alcohol i practica respostes davant la pressió.',
      curriculum: [['vida', 'pressio', 'Analitza riscos per a la salut i practica formes de demanar suport.']],
      fonts: [['Canal Salut · Efectes i riscos del consum de drogues', 'https://canalsalut.gencat.cat/ca/salut-a-z/d/drogues-addiccions-comportamentals/efectes-riscos/']],
      apartats: [
        apartat('tabac', 'El tabac, els vapejadors i la nicotina',
          'El fum del **tabac** perjudica la salut. La **nicotina** és una substància que pot crear dependència i pot ser present en els vapejadors.',
          'El fum també afecta les persones que el respiren de prop. L’aerosol d’un vapejador pot contenir substàncies nocives. Un sabor dolç diu poc sobre els riscos.'),
        apartat('alcohol', 'Què pot canviar amb l’alcohol?',
          'L’**alcohol** afecta el cervell i pot dificultar la coordinació, el judici i el temps de reacció. Evitar-ne el consum protegeix la salut dels infants i adolescents.',
          'Una beguda alcohòlica pot semblar un refresc si l’envàs és vistós. La manera de presentar-la i els efectes sobre el cos són qüestions diferents.'),
        apartat('pressio', 'Una resposta clara i un pla',
          'Davant la pressió del grup, podem **rebutjar** el que ens ofereixen, canviar d’espai i demanar ajuda.',
          repte('Tres frases útils', 'Escriu un «no» breu, una proposta alternativa per fer en grup i una frase per demanar ajuda a una persona adulta si la pressió continua.')),
      ],
      guia: ['Escull què diries primer.', 'Pensa on et podries apartar.', 'Tria a qui demanaries ajuda.'],
      ampliacio: [repte('Analitza el reclam', '«Ho fa tothom» és una afirmació que requereix proves. Explica com pot influir aquesta frase i per què una dada de popularitat tampoc demostraria que el consum és segur.')],
    });

  fitxa(benestar, 'M073', 'assertivitat-i-empatia', 'Dir què necessitem i escoltar què necessita l’altre',
    'Una parella discuteix perquè tots dos volen començar la mateixa tasca. Un abaixa el cap i l’altre parla cada vegada més fort. Com poden reprendre la conversa?', {
      descripcio: 'Practica assertivitat, empatia, lectura dels gestos i estratègies per refer-se.',
      curriculum: [
        ['vida', 'suport', 'Identifica formes de regular el malestar i buscar ajuda.'],
        ['civica', 'acord', 'Aplica l’escolta i el diàleg a un desacord quotidià.'],
      ],
      fonts: [relacions],
      apartats: [
        apartat('gestos', 'Els gestos són pistes',
          'El **llenguatge no verbal** inclou gestos, mirades, postura i to de veu. Un mateix gest pot tenir significats diferents.',
          'Si algú abaixa el cap, podria sentir malestar, estar pensant o estar cansat. Una pregunta respectuosa ens dona més informació.'),
        apartat('acord', 'Assertivitat i empatia en una conversa',
          'L’**assertivitat** permet expressar necessitats amb claredat i respecte. L’**empatia** ajuda a intentar comprendre com ho viu l’altra persona.',
          '«Volia començar jo. Com et semblaria que féssim torns?» comunica una preferència i obre una opció. Escoltar la resposta permet ajustar la proposta.'),
        apartat('suport', 'Quan cal aturar-se i reprendre-ho',
          'La **resiliència** inclou adaptar-nos davant les dificultats i recórrer a persones o recursos que ens poden ajudar.',
          repte('Reprèn la conversa', 'Inventa tres intervencions: una per aturar la discussió, una per preguntar què necessita l’altra persona i una per proposar un acord.')),
      ],
      guia: ['Descriu un gest que has llegit al cas.', 'Canvia una acusació per «Jo necessito…».', 'Afegeix una pregunta per escoltar.'],
      ampliacio: [repte('I si els torns no resolen el problema?', 'Una persona es queixa perquè mai no té accés al material. Explica com es podria comprovar si es tracta d’un patró i quan convé demanar suport a una persona adulta.')],
    });

  fitxa(benestar, 'M074', 'voluntariat-i-comunitat', 'Donar temps per cuidar un lloc compartit',
    'Una entitat del barri cuida un hort comunitari. Té ganes d’acollir la classe, però primer demana que esbrineu quina feina hi podeu fer amb suport.', {
      descripcio: 'Distingeix ajuda puntual i voluntariat i planifica una acció comunitària acotada.',
      curriculum: [['civica', 'projecte', 'Distingeix formes de participació i planifica una acció comunitària acordada.']],
      fonts: [['Generalitat · Què és el voluntariat?', 'https://voluntariat.gencat.cat/ciutadania/que-vol-dir-fer-voluntari-i-participar-a-una-entitat/']],
      apartats: [
        apartat('participar', 'Ajudar per decisió pròpia',
          'El **voluntariat** és una participació lliure, solidària i sense remuneració que es fa de manera organitzada amb una entitat i dins d’un projecte.',
          'Tornar un llapis perdut és un gest d’ajuda puntual. En un projecte de voluntariat, les persones participants acorden tasques, suport i compromisos. Una activitat escolar amb una entitat també pot servir per conèixer com funciona aquesta feina.'),
        apartat('projecte', 'Pregunta què necessita l’entitat',
          'Una acció **comunitària** comença escoltant les persones que coneixen el lloc i acordant una tasca adequada al grup.',
          'Potser l’hort necessita etiquetes llegibles per identificar les plantes. La classe pot preguntar quins noms i materials calen i comprovar després si les etiquetes s’entenen.',
          repte('Una proposta d’una tarda', 'Descriu què preguntaries a l’entitat, quina feina podria fer el grup i com sabríeu si ha servit.')),
      ],
      guia: ['Anota a qui preguntaràs què necessita.', 'Defineix una tasca concreta.', 'Escriu què comprovaràs al final.'],
      ampliacio: [repte('El recompte és suficient?', 'Si l’alumnat fabrica 20 etiquetes però les persones de l’hort no les poden llegir, l’objectiu s’ha complert? Proposa una manera de mesurar el resultat que tingui en compte les persones usuàries.')],
    });


  const catalunya = itinerari('historia-i-cultura-catalunya', 'Catalunya, història i vida pública', 'Història i patrimoni');
  const generalitat = ['Generalitat · Història contemporània de la institució', 'https://web.gencat.cat/ca/generalitat/qui-som/historia-generalitat/generalitat-contemporania'];
  const diada = ['Generalitat · Diada Nacional de Catalunya', 'https://web.gencat.cat/ca/inici/actualitat/diada-nacional-de-catalunya'];

  fitxa(catalunya, 'M075', 'conflicte-dels-segadors', 'De les cases i els camps a la revolta de 1640',
    'En plena guerra, algunes famílies havien d’allotjar i mantenir soldats. Com podia convertir-se un problema de les cases i els pobles en una revolta?', {
      descripcio: 'Relaciona la vida de la pagesia, els allotjaments militars i la guerra dels Segadors.',
      curriculum: [['passat', 'revolta', 'Explica el pas d’un conflicte social a un conflicte polític del segle XVII.']],
      fonts: [['Museu d’Història de Catalunya · La guerra dels Segadors', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/a_la_periferia_de_l_imperi/la_guerra_dels_segadors']],
      apartats: [
        apartat('cases', 'El cost d’allotjar tropes',
          'Al segle XVII, la guerra entre les monarquies hispànica i francesa va dur tropes a Catalunya. Els **allotjaments** obligaven moltes llars a acollir soldats.',
          'Amb males collites i abusos de les tropes, proporcionar aliments i allotjament podia agreujar els problemes de moltes famílies. Els enfrontaments es van estendre per diversos pobles.'),
        apartat('revolta', 'De la protesta a la guerra',
          'El **Corpus de Sang**, a Barcelona el 1640, va ser un episodi de revolta. El conflicte també va enfrontar la monarquia i les institucions catalanes.',
          'La Generalitat, presidida per Pau Claris, va buscar l’ajuda de França. Barcelona es va rendir a les forces de Felip IV el 1652. El tractat dels Pirineus de 1659 va modificar la frontera entre les dues monarquies.',
          repte('Posa cada cosa al seu lloc', 'Identifica un motiu de descontentament anterior a 1640, un episodi d’aquell any i una conseqüència que aparegui després.')),
      ],
      guia: ['Troba què havien de donar les famílies als soldats.', 'Assenyala l’episodi que passa l’any 1640.', 'Marca el tractat al final de la línia del temps.'],
      ampliacio: [repte('Què voldries preguntar a cada font?', 'Imagina que tens una ordre d’allotjament i una carta d’una família. Formula una pregunta que pugui respondre millor cada document.')],
    });

  fitxa(catalunya, 'M076', 'successio-i-onze-setembre', 'Una corona disputada i una ciutat assetjada',
    'Quan va morir Carles II sense descendència directa, diverses potències europees van intervenir en la disputa per la corona. Per què Barcelona va continuar en guerra després dels acords entre potències?', {
      descripcio: 'Situa la guerra de Successió, el setge de Barcelona i els decrets de Nova Planta.',
      curriculum: [['passat', 'despres', 'Relaciona un conflicte europeu amb els canvis polítics a Catalunya després de 1714.']],
      fonts: [['Museu d’Història de Catalunya · Catalunya i la Guerra de Successió', 'https://1714.mhcat.cat/intro.html'], diada],
      apartats: [
        apartat('disputa', 'Qui havia d’heretar la corona?',
          'A la **guerra de Successió** es van enfrontar els partidaris de Felip de Borbó i els de l’arxiduc Carles d’Àustria.',
          'Les potències europees tenien aliances i interessos diferents. Les institucions catalanes es van decantar pel candidat austriacista. Els tractats d’Utrecht del 1713 van canviar el suport internacional.'),
        apartat('setge', 'Barcelona resisteix el setge',
          'Un **setge** aïlla una ciutat per forçar-ne la rendició. Barcelona va caure l’**11 de setembre de 1714** després d’una llarga resistència.',
          'El setge va afectar la població civil i va dificultar aconseguir queviures. La data es commemora avui en la Diada Nacional de Catalunya.'),
        apartat('despres', 'Canvis en el govern del territori',
          'Amb el **Decret de Nova Planta** de 1716, Felip V va substituir institucions pròpies com les Corts i la Generalitat per una nova organització del poder.',
          repte('Guerra, tractat i canvi polític', 'Ordena «Utrecht», «caiguda de Barcelona» i «Nova Planta». Digues quin fet és un acord internacional i quin reorganitza les institucions.')),
      ],
      guia: ['Troba els noms dels dos candidats.', 'Escriu la data de la caiguda de Barcelona.', 'Indica què va canviar el decret.'],
      ampliacio: [repte('Relats a escales diferents', 'Explica quin fet inclouries en una cronologia europea i quin detall buscaria una persona que vol estudiar com es vivia a Barcelona durant el setge.')],
    });

  fitxa(catalunya, 'M077', 'republica-guerra-i-refugis', 'Viure la guerra des de sota terra',
    'Un refugi antiaeri conserva un banc, entrades i galeries. Què ens diu del temps en què la població de Barcelona s’havia de protegir dels bombardeigs?', {
      descripcio: 'Contextualitza la Segona República, la Guerra Civil i els refugis de la població civil.',
      curriculum: [['passat', 'refugis', 'Interpreta el patrimoni de la Guerra Civil com a font sobre la població civil.']],
      fonts: [generalitat, ['Memorial Democràtic · Catalunya bombardejada', 'https://memoria.gencat.cat/web/.content/00_exposicions/exposicions_enlinia/catalunya_bombardejada/dossier_premsa_web.pdf']],
      apartats: [
        apartat('republica', 'Un canvi polític i un cop militar',
          'La **Segona República** es va proclamar el 1931. Catalunya va recuperar institucions d’autogovern. Les Corts espanyoles van aprovar l’Estatut de Catalunya el 1932.',
          'El juliol de 1936, un cop militar contra la República va donar pas a la **Guerra Civil**. El conflicte va durar fins al 1939, quan es va imposar el bàndol dirigit pel general Franco.'),
        apartat('refugis', 'Protegir la població civil',
          'Durant la guerra diverses ciutats van patir **bombardeigs**. A Barcelona, els atacs del març de 1938 van causar moltes víctimes civils.',
          'A molts barris es van construir o adaptar refugis. Un plànol mostra com s’hi entrava i què hi havia. Una fotografia o un testimoni poden explicar altres aspectes de l’experiència.',
          repte('Llegeix un refugi com una font', 'Si un plànol mostra dues entrades i bancs al llarg de les parets, explica quina funció pot tenir cada element i quina dada del plànol et falta per estimar quanta gent hi cabia.')),
      ],
      guia: ['Ordena «República», «cop militar» i «final de la guerra».', 'Assenyala per a què servia un refugi.', 'Tria una font que expliqui què sentia una persona que hi va baixar.'],
      ampliacio: [repte('Tres documents per a una pregunta', 'Compara un plànol, una fotografia i un testimoni oral. Per saber si un refugi es va utilitzar un dia concret, quina combinació de fonts et donaria més pistes?')],
    });

  fitxa(catalunya, 'M078', 'dictadura-democracia-generalitat', 'De la dictadura a la recuperació de l’autogovern',
    'El 1977 es va restablir provisionalment la Generalitat. Per entendre el canvi, seguirem què s’havia perdut durant la dictadura i què es va anar reconstruint.', {
      descripcio: 'Ordena dictadura franquista, transició, restabliment de la Generalitat i estatut d’autonomia.',
      curriculum: [['passat', 'restabliment', 'Situa fites de la democratització i la recuperació de l’autogovern.']],
      fonts: [generalitat],
      apartats: [
        apartat('dictadura', 'Drets i institucions sota el franquisme',
          'La **dictadura franquista** va suprimir llibertats polítiques i institucions d’autogovern. No hi havia eleccions lliures amb partits competint en igualtat.',
          'El català va patir prohibicions i restriccions en diferents àmbits de la vida pública. La Generalitat es va mantenir a l’exili.'),
        apartat('transicio', 'Recuperar la possibilitat de triar',
          'Durant la **transició democràtica** es van recuperar drets i eleccions pluralistes. Les eleccions generals del 1977 van precedir la Constitució del 1978.',
          'Les mobilitzacions ciutadanes, les entitats i les negociacions polítiques van formar part d’un procés que va durar diversos anys.'),
        apartat('restabliment', 'El retorn de la Generalitat',
          'El **1977** es va restablir provisionalment la Generalitat i va tornar el president Josep Tarradellas. L’**Estatut de 1979** va donar un nou marc d’autogovern.',
          repte('Quatre fites en ordre', 'Ordena el final de la dictadura, el restabliment de la Generalitat, la Constitució i l’Estatut. Quina fita correspon directament al retorn de la institució?')),
      ],
      guia: ['Marca 1977, 1978 i 1979 en una línia.', 'Col·loca-hi «retorn», «Constitució» i «Estatut».', 'Explica què canvia quan es poden celebrar eleccions lliures.'],
      ampliacio: [repte('Una fotografia i una llei expliquen el mateix?', 'Compara què mostra una fotografia del retorn de Tarradellas i què permet saber un text oficial sobre el restabliment. Proposa una pregunta per a cada font.')],
    });

  fitxa(catalunya, 'M079', 'institucions-catalanes', 'Qui decideix, qui actua i qui escolta una queixa?',
    'Una classe vol que millori l’accés al transport públic. Algú parla d’una llei, algú d’un servei i algú d’una queixa. A quina institució correspon cada funció?', {
      descripcio: 'Distingeix les funcions del Parlament, la Presidència, el Govern i el Síndic de Greuges.',
      curriculum: [['civica', 'casos', 'Relaciona les institucions catalanes amb les funcions que exerceixen.']],
      fonts: [
        ['Parlament de Catalunya · Funció legislativa', 'https://www.parlament.cat/pcat/parlament/funcions-del-parlament/funcio-legislativa/'],
        ['Síndic de Greuges · Preguntes freqüents', 'https://www.sindic.cat/ca/page.asp?id=29'],
      ],
      apartats: [
        apartat('autogovern', 'La Generalitat, un conjunt d’institucions',
          'La **Generalitat** és el sistema institucional de l’autogovern de Catalunya. En formen part el Parlament, la Presidència i el Govern, entre altres institucions.',
          'La ciutadania amb dret de vot elegeix el Parlament. El Parlament elegeix la persona que ocuparà la Presidència, que dirigeix l’acció del Govern.'),
        apartat('casos', 'Quina funció correspon a cadascú?',
          'El **Parlament** aprova lleis i controla el Govern. El **Govern** dirigeix les polítiques i els serveis en els àmbits de la seva competència.',
          'El **Síndic de Greuges** protegeix drets i pot examinar queixes sobre l’actuació de l’administració. Pot fer recomanacions i demanar que s’investigui o es corregeixi una actuació.',
          repte('Relaciona tres accions', 'Associa cada acció amb una institució: aprovar una llei, aplicar un programa de formació i estudiar una queixa sobre un tràmit.')),
      ],
      guia: ['Subratlla qui aprova lleis.', 'Marca qui aplica les polítiques.', 'Digues a qui es pot adreçar una queixa.'],
      ampliacio: [repte('Una pregunta per a cada institució', 'En el cas fictici d’un servei inaccessible, escriu una pregunta sobre com s’aplica la norma i una altra sobre què pot demanar una persona afectada.')],
    });

  fitxa(catalunya, 'M080', 'llengues-simbols-diada', 'Què expliquen una bandera, un himne i una diada?',
    'En un acte de l’Onze de Setembre coincideixen una bandera, un himne i textos en diverses llengües. Què explica cada element sobre Catalunya?', {
      descripcio: 'Situa la senyera, Els segadors, la Diada i les llengües oficials a Catalunya.',
      curriculum: [['passat', 'simbols', 'Relaciona símbols públics, memòria històrica i vida cultural.']],
      fonts: [diada, ['Generalitat · Política lingüística', 'https://web.gencat.cat/ca/generalitat/com-ens-organitzem/departaments/recerca-universitats/plans-estrategics/politica-linguistica']],
      apartats: [
        apartat('llengues', 'Les llengües de la vida pública',
          'El **català** és la llengua pròpia de Catalunya i hi és oficial, igual que el castellà. L’**aranès**, la varietat de l’occità pròpia d’Aran, també és oficial a Catalunya.',
          'A Catalunya es parlen moltes altres llengües. Els mapes i els cartells ens poden donar pistes sobre usos i noms de lloc, i a classe també ho podem investigar sense donar per fet què parla cada persona.'),
        apartat('simbols', 'La senyera, Els segadors i l’Onze de Setembre',
          'La **senyera** té quatre barres vermelles sobre fons groc. **Els segadors** és l’himne de Catalunya. L’**Onze de Setembre** n’és la Diada Nacional.',
          'L’himne pren el nom del record de la revolta del 1640. La Diada commemora la caiguda de Barcelona el 1714. Són referències a moments històrics diferents.',
          repte('Escriu un peu de cartell', 'Escriu una frase per a cadascun d’aquests elements: senyera, himne i Diada. Indica si descrius un objecte, una peça musical o una data.')),
      ],
      guia: ['Compta les barres de la senyera.', 'Digues com s’anomena l’himne.', 'Relaciona la Diada amb l’any 1714.'],
      ampliacio: [repte('Dos usos d’un símbol', 'Compara una senyera en una fotografia d’un acte públic i en una il·lustració d’un llibre. Quina informació et cal per explicar per què apareix en cada lloc?')],
    });

  fitxa(catalunya, 'M081', 'tradicions-catalanes', 'Les tradicions es fan en comunitat',
    'Una colla assaja, una plaça es prepara per ballar i al calendari apareixen festes diferents segons el poble. Què fa possible que una tradició continuï viva?', {
      descripcio: 'Compara sardanes, castells, correfocs, Sant Jordi i Sant Joan com a patrimoni viu.',
      curriculum: [['passat', 'participar', 'Interpreta pràctiques de cultura popular i els canvis en la participació.']],
      fonts: [
        ['UNESCO · Castells', 'https://ich.unesco.org/en/RL/human-towers-castells-00364'],
        ['Generalitat · Patrimoni Cultural', 'https://patrimoni.gencat.cat/ca'],
      ],
      apartats: [
        apartat('colles', 'Ballar, assajar i fer pinya',
          'El **patrimoni immaterial** inclou pràctiques que s’aprenen i es transmeten, com balls, festes i coneixements compartits.',
          'La **sardana** es balla en rotllana i habitualment hi toca una cobla. Els **castells** són torres humanes fetes per colles amb assaig, coordinació i mesures de seguretat.'),
        apartat('calendari', 'Al carrer i al calendari',
          'Les festes populars tenen **formes locals**. Als correfocs hi participen colles de diables i en alguns llocs figures de bestiari festiu.',
          'Per **Sant Jordi**, el 23 d’abril, llibres i roses ocupen molts carrers. La revetlla de **Sant Joan** se celebra la nit del 23 al 24 de juny, amb costums que poden variar segons el municipi.'),
        apartat('participar', 'Com es transmet una tradició?',
          'Una tradició es manté quan la comunitat la practica, l’ensenya i l’adapta a noves circumstàncies.',
          repte('Dues festes i una pregunta', 'Tria dues pràctiques de la fitxa. Digues qui les prepara i quina pregunta faries per saber com es pot participar a cada lloc.')),
      ],
      guia: ['Relaciona «rotllana» amb una dansa.', 'Troba una activitat que necessita una colla.', 'Anota el mes de Sant Jordi i el de Sant Joan.'],
      ampliacio: [repte('Què ha canviat amb el temps?', 'Si dues fotografies d’una festa tenen quaranta anys de diferència, tria un element que puguis comparar i una pregunta que hagis de fer a la gent que l’organitza.')],
    });


  const espanya = itinerari('institucions-espanya', 'El territori i les institucions d’Espanya', 'Ciutadania');
  const constitucio = ['BOE · Constitució espanyola', 'https://www.boe.es/eli/es/c/1978/12/27/(1)/con'];

  fitxa(espanya, 'M082', 'organitzacio-territorial-espanya', 'Del municipi a la comunitat autònoma',
    'En escriure una adreça, pots indicar el carrer, el municipi i la província. En un mapa polític també hi trobaràs la comunitat autònoma. Què representa cada nom?', {
      descripcio: 'Llegeix els nivells territorials d’Espanya i diferencia municipis, províncies i comunitats autònomes.',
      curriculum: [
        ['cartografia', 'mapa', 'Interpreta en un mapa polític diversos nivells territorials.'],
        ['reptes', 'autonomia', 'Reconeix l’organització territorial i el repartiment de competències.'],
      ],
      fonts: [constitucio],
      apartats: [
        apartat('mapa', 'Municipis i províncies',
          'Un **municipi** és un territori governat per un ajuntament. Una **província** agrupa municipis.',
          'Per exemple, Girona pot fer referència a una ciutat i al seu municipi, o a una província amb altres municipis. Llegir la llegenda ajuda a distingir el territori que marca cada línia.'),
        apartat('autonomia', 'Comunitats i ciutats autònomes',
          'Una **comunitat autònoma** té institucions i competències pròpies. A Espanya hi ha 17 comunitats autònomes i les ciutats autònomes de Ceuta i Melilla.',
          'Catalunya inclou les províncies de Barcelona, Girona, Lleida i Tarragona. Altres comunitats, com La Rioja, són uniprovincials. Els límits d’una comarca i els d’una província poden respondre a divisions diferents.'),
        apartat('serveis', 'Un servei pot tenir una escala diferent',
          'Els **serveis públics** s’organitzen segons les competències de cada administració. El territori que gestiona un servei pot anar més enllà del municipi.',
          repte('Tres escales en un cas', 'Situem el municipi de Girona dins de la província de Girona i dins de Catalunya. Dibuixa tres contorns encaixats, posa-hi els noms i explica què significa cada contorn.')),
      ],
      guia: ['Comença pel municipi.', 'Envolta’l amb la província.', 'Marca la comunitat i comprova què indica cada nom.'],
      ampliacio: [repte('I si els límits coincideixen?', 'Compara en un mapa polític una comunitat uniprovincial i Catalunya. Explica per què veure una sola línia al mapa no vol dir que els dos nivells siguin sempre el mateix.')],
    });

  fitxa(espanya, 'M083', 'monarquia-parlamentaria', 'Com es forma un govern en una monarquia parlamentària?',
    'Després d’unes eleccions generals s’obre un període de converses. Per què el resultat de les urnes encara ha de passar per un debat al Congrés?', {
      descripcio: 'Explica eleccions, investidura, legislatura i el paper constitucional de la Corona.',
      curriculum: [['civica', 'investidura', 'Distingeix elecció de representants, investidura i funcions constitucionals.']],
      fonts: [constitucio, ['Congrés dels Diputats · Funcions', 'https://www.congreso.es/es/cem/func']],
      apartats: [
        apartat('sistema', 'La Constitució reparteix funcions',
          'Espanya és una **monarquia parlamentària**. El rei és el cap de l’Estat i exerceix les funcions que li atribueix la Constitució. El Govern dirigeix la política.',
          'La ciutadania amb dret de vot elegeix els diputats i bona part dels senadors. El mandat de les cambres dura fins a quatre anys, amb possibilitat de dissolució anticipada. Aquest període s’anomena **legislatura**.'),
        apartat('investidura', 'Del vot a la formació del Govern',
          'En la **investidura**, el Congrés debat i vota si dona confiança a la candidatura a la presidència del Govern.',
          'El rei proposa una candidatura després de consultar representants dels grups polítics. Si el Congrés li dona la confiança, el rei nomena la persona que presidirà el Govern.',
          repte('Qui intervé en cada pas?', 'Escriu en ordre «eleccions», «debat i votació al Congrés» i «nomenament». Afegeix qui intervé principalment en cada pas.')),
      ],
      guia: ['Assenyala qui elegeix els diputats.', 'Troba la cambra que vota la investidura.', 'Marca qui fa el nomenament.'],
      ampliacio: [repte('Per què es parla d’acords?', 'En un Congrés imaginari hi ha molts grups i cap té prou escons per donar suport tot sol a una candidatura. Explica per què les converses entre grups poden influir en el resultat.')],
    });

  fitxa(espanya, 'M084', 'corts-i-lleis', 'Què fan el Congrés i el Senat amb una proposta de llei?',
    'Una proposta per regular els residus arriba a les Corts Generals. Seguirem què hi pot passar abans que es publiqui la llei.', {
      descripcio: 'Compara les dues cambres de les Corts i segueix una tramitació legislativa simplificada.',
      curriculum: [['civica', 'proces', 'Segueix la funció de les Corts Generals i el recorregut d’una proposta de llei.']],
      fonts: [constitucio, ['Congrés dels Diputats · Funció legislativa', 'https://www.congreso.es/es/cem/fleg']],
      apartats: [
        apartat('cambres', 'Dues cambres i diverses funcions',
          'Les **Corts Generals** estan formades pel **Congrés dels Diputats** i el **Senat**. Aproven lleis i pressupostos i controlen l’acció del Govern.',
          'La Constitució defineix el Senat com a cambra de representació territorial. El Congrés té funcions pròpies com la votació de la investidura.'),
        apartat('proces', 'Llegir, modificar i votar',
          'En la tramitació habitual, el **Congrés** debat i aprova un text i el remet al **Senat**, que el pot aprovar, esmenar o vetar.',
          'Una **esmena** proposa canviar una part del text. Si el Senat hi introdueix esmenes o el veta, el Congrés torna a intervenir segons les regles aplicables. Una vegada aprovada, la llei es publica al Butlletí Oficial de l’Estat.',
          repte('Una proposta de canvi', 'El text diu que els contenidors s’instal·laran sense indicar la data. Escriu una esmena que hi afegeixi un termini i explica com canviaria la proposta.')),
      ],
      guia: ['Escriu els noms de les dues cambres.', 'Assenyala en què consisteix una esmena.', 'Indica on es publica la llei.'],
      ampliacio: [repte('Controlar l’aplicació', 'Mesos després, uns contenidors encara no s’han instal·lat. Escriu una pregunta concreta que un diputat podria adreçar al Govern i diferencia-la d’una esmena al text de la llei.')],
    });

  const europa = itinerari('europa-i-ue', 'Europa i la Unió Europea', 'Geografia');
  const tractats = ['Unió Europea · Tractats fundacionals', 'https://european-union.europa.eu/principles-countries-history/principles-and-values/founding-agreements_en'];
  const institucions = ['Unió Europea · Institucions i organismes', 'https://european-union.europa.eu/institutions-law-budget/institutions-and-bodies/types-institutions-and-bodies_es'];
  const schengen = ['Consell de la UE · L’espai Schengen', 'https://www.consilium.europa.eu/en/policies/schengen-area/'];
  const euro = ['Unió Europea · Països que fan servir l’euro', 'https://european-union.europa.eu/institutions-law-budget/euro/countries-using-euro_es'];

  fitxa(europa, 'M085', 'europa-al-planisferi', 'On situem Europa al planisferi?',
    'En un mapa físic, Europa i Àsia apareixen unides per terra. En molts planisferis, en canvi, s’hi dibuixen com a continents diferents. Com es tria el límit?', {
      descripcio: 'Situa Europa entre els continents i interpreta els límits i les convencions dels planisferis.',
      curriculum: [['cartografia', 'limits', 'Situa Europa al planisferi i interpreta una convenció cartogràfica.']],
      fonts: [['ICGC · El món en català', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/Didactics-i-ludics/El-Mon-en-catala']],
      apartats: [
        apartat('continents', 'Grans divisions del món',
          'En una convenció habitual a l’escola distingim sis **continents**: Àfrica, Amèrica, Antàrtida, Àsia, Europa i Oceania.',
          'Alguns mapes separen Amèrica del Nord i Amèrica del Sud i en compten set. En un planisferi, la llegenda i els noms indiquen quin criteri es fa servir.'),
        apartat('limits', 'Una part d’una gran massa de terra',
          'Europa és a l’oest d’**Euràsia**, la massa de terra que comparteix amb Àsia. Els **Urals** formen part d’un límit convencional entre totes dues.',
          'L’Atlàntic banya l’oest d’Europa i la Mediterrània en banya el sud. A l’est, el límit es dibuixa amb criteris geogràfics acordats i hi ha zones, com el Caucas, on es poden trobar representacions diferents.',
          repte('Dibuixa un mapa esquemàtic', 'Situa Europa, Àsia i Àfrica en tres formes senzilles. Escriu «Atlàntic» a l’oest d’Europa i «Mediterrània» entre Europa i Àfrica.')),
      ],
      guia: ['Posa Àsia a l’est d’Europa.', 'Situa Àfrica al sud de la Mediterrània.', 'Escriu el nom de l’oceà que queda a l’oest.'],
      ampliacio: [repte('Dos planisferis, dos recomptes', 'Un mapa compta sis continents i un altre en compta set. Identifica una convenció que pugui explicar el canvi i què es manté igual sobre la superfície terrestre.')],
    });

  fitxa(europa, 'M086', 'paisos-europeus-al-mapa', 'Nou països europeus i les seves capitals',
    'Un equip prepara una ruta per diferents llocs d’Europa. Amb les capitals i les pistes de la taula podràs ordenar el viatge al mapa.', {
      descripcio: 'Localitza nou països, compara posicions i diferencia Europa i pertinença a la UE.',
      curriculum: [['cartografia', 'paisos', 'Situa països europeus amb ajuda de capitals, illes i fronteres terrestres.']],
      fonts: [
        ['Unió Europea · Perfils dels estats membres', 'https://european-union.europa.eu/principles-countries-history/eu-countries_en'],
        ['ICGC · El món en català', 'https://www.icgc.cat/ca/Eines-i-visors/Visors/Didactics-i-ludics/El-Mon-en-catala'],
      ],
      apartats: [
        apartat('paisos', 'Localitza les capitals i comprova la posició',
          'Una **capital** és una ciutat on se situen institucions de govern. Per trobar un país, combina el nom amb alguna pista de situació o de frontera.',
          taula(['País', 'Capital', 'Pista al mapa'], [
            ['Portugal', 'Lisboa', 'A l’oest de la península Ibèrica.'],
            ['França', 'París', 'Al nord dels Pirineus.'],
            ['Andorra', 'Andorra la Vella', 'Als Pirineus, entre França i Espanya.'],
            ['Bèlgica', 'Brussel·les', 'Al nord de França.'],
            ['Alemanya', 'Berlín', 'A l’est de Bèlgica.'],
            ['Suïssa', 'Berna', 'Als Alps, al nord d’Itàlia.'],
            ['Itàlia', 'Roma', 'Amb una península que s’endinsa a la Mediterrània.'],
            ['Grècia', 'Atenes', 'Al sud de la península Balcànica.'],
            ['Regne Unit', 'Londres', 'Al nord-oest del continent, en territori insular.'],
          ], 25)),
        apartat('pertinenca', 'Què et mostra la llegenda?',
          'El mapa dels **països europeus** abasta un espai més ampli que un mapa dels membres de la **Unió Europea**.',
          'Dels nou països de la taula, Andorra, Suïssa i el Regne Unit són europeus i queden fora de la UE. Els altres sis en són membres.',
          repte('Una ruta de tres parades', 'Ordena França, Andorra i Portugal de nord a sud segons la posició de les capitals. Indica a quin país de la ruta pertany la capital que queda als Pirineus.')),
      ],
      guia: ['Busca a la taula la capital d’Andorra.', 'Troba el país on és Brussel·les.', 'Marca els tres països que no formen part de la UE.'],
      ampliacio: [repte('Dues preguntes, dues llegendes', 'Per estudiar una frontera terrestre i per saber si dos països són membres de la UE, quina informació afegiries a la llegenda de cada mapa?')],
    });

  fitxa(europa, 'M087', 'maastricht-i-lisboa', 'Per què hi ha tractats europeus?',
    'Quan diversos estats acorden unes regles comunes, necessiten dir què volen fer junts i qui podrà prendre les decisions. Això s’escriu en tractats.', {
      descripcio: 'Segueix els tractats de Maastricht i Lisboa i relaciona els símbols amb la cooperació europea.',
      curriculum: [['civica', 'tractats', 'Relaciona la creació i les reformes de la UE amb els tractats.']],
      fonts: [tractats, ['Unió Europea · Símbols', 'https://european-union.europa.eu/principles-countries-history/symbols_en']],
      apartats: [
        apartat('tractats', 'De la cooperació a la Unió Europea',
          'Un **tractat** és un acord formal entre estats. El tractat de **Maastricht**, en vigor des de 1993, va crear la Unió Europea.',
          'Va reforçar la cooperació i va establir les bases de la unió econòmica i monetària. El tractat de **Lisboa**, en vigor des de 2009, va reformar el funcionament de la UE, inclòs el paper del Parlament en moltes decisions.'),
        apartat('simbols', 'Allò que podem reconèixer sense llegir un tractat',
          'La **bandera europea** té dotze estrelles sobre fons blau. L’**himne europeu** fa servir la melodia de l’Oda a l’alegria de Beethoven.',
          'Les estrelles es mantenen en nombre de dotze quan canvia el nombre d’estats membres. Els símbols es fan servir en actes i espais públics.',
          repte('Un tractat o un símbol?', 'Escriu un peu per a una imatge de la bandera i una frase per explicar què va aportar Maastricht. Quina de les dues peces permet entendre qui pot prendre decisions?')),
      ],
      guia: ['Busca quin tractat va crear la UE.', 'Digues quin tractat va reformar-ne el funcionament.', 'Compta quantes estrelles té la bandera.'],
      ampliacio: [repte('Signar i entrar en vigor', 'Maastricht es va signar el 1992 i va entrar en vigor el 1993. Explica quina data posaries en una cronologia de la signatura i quina en una cronologia de les normes aplicables.')],
    });

  fitxa(europa, 'M088', 'schengen-i-moneda', 'Una frontera i una moneda expliquen coses diferents',
    'En una ruta per Europa pots canviar de moneda sense sortir de l’espai Schengen. Com pot passar?', {
      descripcio: 'Compara pertinença a la UE, controls fronterers a Schengen i ús de la moneda.',
      curriculum: [['civica', 'comparar', 'Distingeix polítiques europees amb participants i finalitats diferents.']],
      fonts: [schengen, euro],
      apartats: [
        apartat('schengen', 'Travessar fronteres interiors',
          'L’**espai Schengen** permet passar habitualment les fronteres interiors sense controls fronterers sistemàtics. De vegades es poden restablir controls temporals.',
          'Hi participen estats membres de la UE i també alguns que no en són, com Suïssa. Viatjar pot continuar requerint documentació.'),
        apartat('comparar', 'Quina moneda s’hi fa servir?',
          'L’**euro** és la moneda comuna dels estats de la UE que l’han adoptat. La **zona euro** i Schengen tenen propòsits i membres diferents.',
          taula(['País', 'UE', 'Schengen', 'Moneda oficial'], [
            ['França', 'Sí', 'Sí', 'Euro'],
            ['Suïssa', 'No', 'Sí', 'Franc suís'],
            ['Irlanda', 'Sí', 'No', 'Euro'],
          ], 25),
          repte('Tria dues columnes', 'Compara França i Suïssa per explicar el cas de l’inici. Fes servir la columna de Schengen i la de moneda.')),
      ],
      guia: ['Troba «Suïssa» a la taula.', 'Comprova si és a Schengen.', 'Digues quina moneda s’hi utilitza.'],
      ampliacio: [repte('Quina font comprovaries abans de viatjar?', 'Explica per què cal consultar fonts diferents per preparar la documentació del viatge i per saber en quina moneda es paga.')],
    });

  fitxa(europa, 'M089', 'institucions-ue', 'Qui proposa, qui acorda i qui revisa a la UE?',
    'Un projecte europeu vol reduir residus d’envasos. Hi intervenen institucions de diferents maneres. Seguirem el paper de cadascuna.', {
      descripcio: 'Diferencia institucions europees i les seves funcions legislatives, judicials i de control.',
      curriculum: [['civica', 'llei', 'Identifica les institucions de la UE i segueix un procés legislatiu simplificat.']],
      fonts: [institucions],
      apartats: [
        apartat('llei', 'De la proposta a la decisió',
          'En el procediment més habitual, la **Comissió Europea** proposa una norma i el **Parlament Europeu** i el **Consell de la UE** l’han d’acordar.',
          'El Parlament reuneix representants elegits per la ciutadania. Al Consell de la UE es troben ministres dels països membres i la composició canvia segons el tema. El **Consell Europeu** reuneix caps d’estat o de govern per fixar grans orientacions.'),
        apartat('altres', 'Justícia, queixes i moneda',
          'El **Tribunal de Justícia de la Unió Europea** vetlla per la interpretació i aplicació del dret de la UE.',
          'El **Defensor del Poble Europeu** examina queixes per mala administració en institucions i organismes de la UE. El **Banc Central Europeu** dirigeix la política monetària de la zona euro i té com a objectiu principal l’estabilitat dels preus.',
          repte('Qui hi intervé?', 'Relaciona cada acció amb una institució: proposar una norma, acordar-la entre dues institucions i examinar una possible mala administració.')),
      ],
      guia: ['Busca qui fa la proposta.', 'Escriu els dos noms que l’han d’acordar habitualment.', 'Troba qui estudia queixes sobre l’administració europea.'],
      ampliacio: [repte('Dos noms molt semblants', 'En un titular s’hi llegeix «El Consell acorda prioritats generals». En un altre, «Els ministres negocien la norma». Explica quin consell és probable que aparegui en cada cas i quina pista t’ho indica.')],
    });

  fitxa(europa, 'M090', 'participacio-i-democracia-ue', 'A qui votem i com podem intervenir a Europa?',
    'Un grup vol que una proposta ambiental arribi a les institucions europees. A qui va poder votar la ciutadania i quines vies hi ha entre eleccions?', {
      descripcio: 'Compara vies directes i indirectes de representació, transparència i participació a la UE.',
      curriculum: [['civica', 'participacio', 'Valora la representació i els mecanismes de participació i control democràtic a la UE.']],
      fonts: [
        institucions,
        ['Parlament Europeu · Eleccions', 'https://www.europarl.europa.eu/at-your-service/en/be-heard/elections'],
        ['Parlament Europeu · Iniciativa ciutadana europea', 'https://www.europarl.europa.eu/factsheets/en/sheet/149/tratado-de-lisboa'],
      ],
      apartats: [
        apartat('vots', 'Representació directa i indirecta',
          'La ciutadania elegeix directament el **Parlament Europeu**. Al Consell de la UE i al Consell Europeu la representació arriba a través dels governs dels estats.',
          'El Parlament elegeix la presidència de la Comissió a proposta del Consell Europeu i vota l’aprovació de la Comissió com a conjunt. La cadena és més llarga i això pot dificultar que la ciutadania identifiqui qui respon per una decisió.'),
        apartat('grups', 'Com s’organitza el Parlament',
          'Els **grups polítics** del Parlament Europeu reuneixen representants de diversos països amb afinitats polítiques.',
          'Els grups negocien i voten propostes. Per saber què fa un representant es poden consultar debats, posicions i resultats de votacions publicats.'),
        apartat('participacio', 'Preguntar què podem canviar',
          'A la UE hi ha vies de **participació**, com les peticions al Parlament o la iniciativa ciutadana. Cada via té condicions i efectes propis.',
          'Una iniciativa que compleix els requisits pot demanar a la Comissió que estudiï una proposta dins de les seves competències. Presentar-la no equival a l’aprovació d’una llei.',
          repte('Dibuixa la cadena de decisions', 'Compara com arriba el vot d’una persona al Parlament i com s’hi relaciona un ministre del Consell. Assenyala on seria més fàcil trobar un vot individual i explica què voldries comprovar.')),
      ],
      guia: ['Marca quina institució s’elegeix directament.', 'Assenyala d’on venen els ministres del Consell.', 'Troba una via de participació entre eleccions.'],
      ampliacio: [repte('Què faria més visible la decisió?', 'Tria un pas de la tramitació d’una norma. Proposa una dada que s’hauria de poder consultar i explica com ajudaria a identificar qui va defensar o canviar la proposta.')],
    });


  const historia = itinerari('mirar-el-passat', 'Com llegim els canvis del passat?', 'Història i patrimoni');
  const fontsHistoriques = ['Arxiu Nacional de Catalunya · Les fonts de la història', 'https://anc.gencat.cat/ca/aprendre/dossiers-didactics/les-fonts-de-la-historia'];
  const museuHistoria = ['Museu d’Història de Catalunya · Exposició permanent', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais'];

  fitxa(historia, 'M091', 'llegir-el-temps-historic', 'Una línia del temps per entendre què va canviar',
    'Un mercat, una estació i una biblioteca poden haver inaugurat en moments diferents. Com podem veure quants anys van passar i què coincidia?', {
      descripcio: 'Llegeix una cronologia a escala i diferencia ordre, durada, simultaneïtat i causes.',
      curriculum: [['passat', 'lectura', 'Fa servir l’escala i les fites d’una línia del temps per descriure canvis.']],
      fonts: [fontsHistoriques],
      apartats: [
        apartat('escala', 'Una mateixa distància representa el mateix temps',
          'En una **línia del temps a escala**, distàncies iguals representen la mateixa durada. Una fita marca un fet i un tram pot representar un període.',
          'Una **dècada** dura deu anys. Un **segle** en dura cent. El segle XX va del 1901 al 2000 i el segle XXI va començar el 2001.'),
        apartat('lectura', 'Abans, després i al mateix temps',
          'La **successió** ens diu en quin ordre passen els fets. La **simultaneïtat** ens ajuda a veure processos que coincideixen.',
          'En un exemple inventat, el mercat obre el 1920, l’estació el 1940 i la biblioteca el 1960. El mercat va funcionar fins al 1970. El 1950 l’estació i el mercat ja funcionaven alhora.',
          repte('Dibuixa i interpreta', 'Fes una línia amb una marca cada deu anys entre 1920 i 1970. Col·loca-hi les obertures i marca el tram de funcionament del mercat. Quants anys separen l’estació i la biblioteca?')),
      ],
      guia: ['Fes sis marques amb la mateixa separació.', 'Escriu els anys del 1920 al 1970.', 'Marca l’obertura del mercat i la de l’estació.'],
      ampliacio: [repte('Passar abans no demostra ser-ne la causa', 'Algú afirma que l’estació va provocar l’obertura de la biblioteca perquè és anterior. Proposa un document o una dada que podria ajudar a comprovar si hi ha una relació.')],
    });

  fitxa(historia, 'M092', 'fonts-del-passat', 'Què en sabem i amb quines proves?',
    'Una fotografia d’un mercat i un llibre publicat molts anys més tard en parlen de maneres diferents. Què podem preguntar a cadascun?', {
      descripcio: 'Distingeix fonts primàries i secundàries i contrasta la informació que aporten.',
      curriculum: [['passat', 'contrastar', 'Identifica, contextualitza i contrasta fonts per respondre una pregunta històrica.']],
      fonts: [fontsHistoriques],
      apartats: [
        apartat('primaries', 'Pistes directes sobre el que estudiem',
          'Una **font primària** aporta un testimoni directe del fet o del temps que estudiem, com una fotografia de l’època, un objecte, un document o un record de qui ho va viure.',
          'Una fotografia pot mostrar les parades de mercat que queden dins l’enquadrament. Ens parla menys de què passava en un altre carrer o de qui no surt a la imatge.'),
        apartat('secundaries', 'Interpretacions elaborades després',
          'Una **font secundària** interpreta, explica o resumeix uns fets a partir d’altres fonts. Un estudi històric sovint n’és un exemple.',
          'Un llibre que compara diverses fotografies i registres pot explicar un canvi de llarg recorregut. També podem preguntar quines proves ha triat i quines en falten.'),
        apartat('contrastar', 'Fes una pregunta que es pugui investigar',
          'Per **contrastar** fonts, compara què diu cadascuna, qui l’ha produït, quan i per a quin propòsit.',
          repte('Hi havia parades cada dia?', 'Una fotografia mostra moltes parades un dissabte. Quina altra font buscàries per saber si el mercat també obria entre setmana? Explica què hi buscaries.')),
      ],
      guia: ['Anota què mostra la fotografia.', 'Assenyala quina dada només correspon a dissabte.', 'Tria un altre document que pugui indicar els horaris.'],
      ampliacio: [repte('Depèn de la pregunta', 'Un llibre del 1980 explica un mercat del 1920. Per a quina pregunta seria una font secundària i per a quina pregunta sobre l’any 1980 es podria convertir en font primària?')],
    });

  fitxa(historia, 'M093', 'edats-i-perioditzacio', 'Per què posem noms a les edats de la història?',
    'Si separes la història en edats pots orientar-te millor, però una data escrita al llibre no transforma tots els llocs alhora.', {
      descripcio: 'Ordena les etapes històriques i interpreta què expliquen i què simplifiquen els seus límits.',
      curriculum: [['passat', 'convencions', 'Relaciona les edats amb processos històrics i reconeix els límits de la periodització.']],
      fonts: [museuHistoria, fontsHistoriques],
      apartats: [
        apartat('edats', 'Cinc noms per orientar-nos',
          'La **periodització** agrupa el passat en etapes. En una convenció habitual a Europa fem servir prehistòria, edat antiga, edat mitjana, edat moderna i edat contemporània.',
          taula(['Etapa', 'Un exemple de procés o de fet'], [
            ['Prehistòria', 'En alguns llocs es desenvolupa l’agricultura.'],
            ['Edat antiga', 'Roma s’expandeix i més endavant es divideix l’Imperi.'],
            ['Edat mitjana', 'Es transformen les ciutats i les rutes de comerç.'],
            ['Edat moderna', 'S’estenen les connexions transoceàniques.'],
            ['Edat contemporània', 'La industrialització transforma molts treballs.'],
          ], 36)),
        apartat('convencions', 'Què vol dir que una data sigui convencional?',
          'Dates com el **1492** o el **1789** serveixen per marcar transicions en algunes cronologies. Els canvis de la vida quotidiana tenen ritmes diferents segons el lloc i el grup social.',
          'L’escriptura va aparèixer en moments diferents segons la regió. Per això el límit entre prehistòria i edat antiga es pot situar de maneres diferents segons què estudiem.',
          repte('Ordena i explica un exemple', 'Numera les cinc etapes i tria un procés de la taula. Digues si es podria situar amb un sol any o si necessitaries un tram.')),
      ],
      guia: ['Troba la primera i l’última etapa.', 'Busca on apareix Roma.', 'Indica en quina etapa situaries la industrialització.'],
      ampliacio: [repte('Dos territoris, dos ritmes', 'Explica per què fer servir la primera escriptura com a fita dona dues dates si la pràctica comença en segles diferents en dos territoris.')],
    });

  fitxa(historia, 'M094', 'monarquia-i-absolutisme', 'Fins on arribava el poder d’un monarca?',
    'En un retrat de cort, el monarca ocupa el centre i l’envolten símbols de poder. Com comprovem si podia prendre decisions tot sol?', {
      descripcio: 'Introdueix l’absolutisme i investiga la diferència entre mostrar poder i exercir-lo.',
      curriculum: [['passat', 'poder', 'Interpreta l’absolutisme a partir de les institucions i de les fonts de representació.']],
      fonts: [museuHistoria, ['Palau de Versalles · Lluís XIV', 'https://en.chateauversailles.fr/discover/history/great-characters/louis-xiv']],
      apartats: [
        apartat('poder', 'Intentar concentrar les decisions',
          'L’**absolutisme** va ser una forma de govern en què el monarca intentava concentrar bona part del poder en la corona.',
          'Lluís XIV de França és un exemple conegut. El seu govern es presentava al voltant de la figura del rei. Per fer arribar ordres, obtenir impostos i sostenir el govern continuava necessitant col·laboradors i negociacions.'),
        apartat('imatge', 'Un retrat mostra com volien ser vistos',
          'Un **retrat de cort** permet estudiar com es representava el poder. Les lleis i els registres ajuden a saber com s’aplicava una decisió.',
          'Una corona, un tron o un ceptre donen pistes sobre la imatge pública. Un document de cobrament pot indicar qui pagava un impost i qui n’estava exempt.',
          repte('Del retrat al registre', 'Escriu una pregunta que puguis respondre mirant un retrat i una altra que et demani dades sobre una decisió concreta.')),
      ],
      guia: ['Busca quin monarca apareix al text.', 'Assenyala dos objectes que mostren poder.', 'Tria el document adequat per estudiar un impost.'],
      ampliacio: [repte('Posa a prova l’afirmació', 'Si una ordre reial es compleix en una comarca però es negocia en una altra, explica què ens diu això sobre com arribava el poder als territoris.')],
    });

  fitxa(historia, 'M095', 'revolucions-industrials', 'Què canvia quan la feina passa a la fàbrica?',
    'Un carrer conserva la xemeneia d’una antiga fàbrica. Què ens pot explicar sobre l’energia, la feina i la ciutat?', {
      descripcio: 'Compara canvis tecnològics i socials de la industrialització amb exemples de Catalunya.',
      curriculum: [['passat', 'treball', 'Relaciona els canvis industrials amb la feina, la ciutat i les condicions de vida.']],
      fonts: [
        ['Museu d’Història de Catalunya · Vapor i nació', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/vapor_i_nacio'],
        ['Museu d’Història de Catalunya · Els anys elèctrics', 'https://www.mhcat.cat/exposicions/la_memoria_d_un_pais/esbossos/nova_expo_permanent_on_line/els_anys_electrics'],
      ],
      apartats: [
        apartat('energia', 'Aigua, vapor i electricitat',
          'La **industrialització** va estendre la fabricació amb màquines. L’aigua i el vapor van moure moltes màquines i l’electricitat va obrir noves possibilitats més endavant.',
          'A Catalunya va créixer la indústria tèxtil al segle XIX. Hi havia vapors en ciutats i colònies industrials en alguns rius. Les dates i les fonts d’energia variaven d’un lloc a un altre.'),
        apartat('treball', 'Canvien la jornada, els barris i el transport',
          'A les **fàbriques**, moltes persones treballaven a l’hora que marcaven els torns i sota el ritme de les màquines.',
          'La industrialització va alterar el creixement dels barris, el transport de mercaderies i la feina de les famílies. També hi va haver treball infantil, jornades llargues i organització obrera per reclamar millores.',
          repte('Què ens explica cada font?', 'Compara una fotografia d’una xemeneia, un horari de fàbrica i un plànol del barri. Quina font triaries per estudiar l’energia, la jornada i la proximitat dels habitatges?')),
      ],
      guia: ['Anomena dues fonts d’energia.', 'Troba una paraula que indiqui l’organització del temps.', 'Relaciona «horari» amb una pregunta.'],
      ampliacio: [repte('Qui explica la jornada?', 'Compara què podria destacar un anunci de l’empresa i què podria recordar una persona que hi treballava. Proposa una tercera font amb dades per contrastar-los.')],
    });

  fitxa(historia, 'M096', 'comerc-comunicacions-invents', 'Objectes, idees i missatges en moviment',
    'Com arribaven les mercaderies a una ciutat? I les notícies? Compararem camins, màquines i canals que van canviar la manera de fer circular coses i missatges.', {
      descripcio: 'Relaciona el comerç, el transport, la impremta i el telègraf amb els seus efectes i límits.',
      curriculum: [['passat', 'comparacio', 'Compara canvis i continuïtats en les xarxes comercials i de comunicació.']],
      fonts: [
        museuHistoria,
        ['Library of Congress · La invenció del telègraf', 'https://www.loc.gov/collections/samuel-morse-papers/articles-and-essays/invention-of-the-telegraph/'],
      ],
      apartats: [
        apartat('comerc', 'Com circulen els productes?',
          'El **comerç** connecta llocs on es produeixen, es transporten i s’intercanvien productes. Les rutes depenen de la geografia, el cost i els mitjans de transport.',
          'Un port connecta trajectes marítims i terrestres. El ferrocarril va ampliar la càrrega i la velocitat en moltes rutes. L’ampliació dels intercanvis va conviure amb desigualtats i, en algunes rutes, amb explotació colonial.'),
        apartat('missatges', 'Com circulen les idees i les notícies?',
          'La **impremta** permet reproduir molts exemplars d’un text. El **telègraf** elèctric permet enviar senyals que representen un missatge a llarga distància.',
          'Amb la impremta, els llibres es podien multiplicar. Amb el telègraf, en una ruta connectada una notícia podia avançar-se al tren que transportava el diari. L’accés depenia de la infraestructura, el cost i la possibilitat d’interpretar el missatge.'),
        apartat('comparacio', 'Quin problema resol cada canvi?',
          'Una **invenció** pot resoldre un problema concret i crear nous usos. Cal estudiar on arriba, qui hi té accés i quins recursos necessita.',
          repte('Tria el mitjà segons la feina', 'Tens un avís breu que ha d’arribar de pressa i cent còpies d’un full que cal repartir. Tria un mitjà per produir les còpies, un per transportar-les i un per enviar l’avís.')),
      ],
      guia: ['Digues què permet copiar molts textos.', 'Indica quin aparell envia senyals.', 'Tria què serveix per portar una caixa de llibres.'],
      ampliacio: [repte('Dues ciutats, dues velocitats', 'Una ciutat rep el telègraf i una altra només disposa de correu. Explica com podries comparar el temps de transmissió d’un missatge i quina dada caldria sobre l’accés al servei.')],
    });

  const disseny = itinerari('disseny-i-prototips', 'Disseny i prototips', 'Tecnologia i digitalització');
  const sabersCicleSuperior = ['XTEC · Sabers de coneixement del medi de cinquè i sisè', 'https://xtec.gencat.cat/web/.content/curriculum/primaria/curriculum-175-2022/Coneixement-del-Medi-Natural-Social-i-Cultural.pdf#page=22'];

  fitxa(disseny, 'M097', 'reg-amb-sensor', 'Reguem només quan la terra és seca?',
    'Un planter s’asseca els caps de setmana, però algun test queda xop quan el reguem per rutina. Com podria un prototip decidir quan cal regar i quan ha de parar?', {
      descripcio: 'Construeix i avalua un model de reg que interpreta la humitat amb un sensor i una regla.',
      curriculum: [
        ['disseny', 'prototip', 'Dissenya, construeix i avalua un prototip que respon a la lectura d’un sensor.'],
        ['indagacio', 'proves', 'Comprova prediccions amb casos de control i ajusta una regla a partir dels resultats.'],
      ],
      fonts: [sabersCicleSuperior, ['Microsoft MakeCode · Sensor d’humitat del sòl amb micro:bit', 'https://makecode.microbit.org/projects/soil-moisture']],
      apartats: [
        apartat('necessitat', 'Què necessita el planter?',
          'Comença per definir la **necessitat** i dos criteris d’èxit. El model ha d’avisar per regar amb terra seca i ha d’aturar el reg quan la humitat és suficient.',
          'Pregunta a la persona que cuida el planter què passa quan la terra queda xopa o quan s’asseca massa. Un **sensor** recull una dada de l’entorn. Amb un sensor d’humitat, podem comparar lectures del mateix tipus de terra en condicions diferents.'),
        apartat('regla', 'Convertim una lectura en una decisió',
          'En aquest model, les lectures més altes indiquen terra més humida. Si el valor és **inferior a 40**, s’encén el senyal de reg. Amb **40 o més**, s’apaga.',
          'Els valors de la fitxa són inventats i l’escala no indica un percentatge real d’aigua. Amb un sensor de debò, compara primer què marca en terra seca i en terra humida. El **llindar** és el valor de referència que separa dues respostes.'),
        apartat('prototip', 'Muntem una maqueta que es pugui provar',
          'Muntem tres peces amb les etiquetes **sensor → regla → senyal**. Les targetes fan de lectures del sensor i el senyal indica si el reg està encès o apagat.',
          'Retalla cinc targetes amb els números de la taula. En un full, dibuixa dues posicions per al senyal: «rega» i «atura». Una persona passa la targeta, una altra aplica la regla i una tercera mou el senyal. Intercanvieu els papers i comproveu si el resultat es manté.',
          'Si teniu un sensor digital preparat a l’aula, feu una segona prova amb les seves lectures i un senyal a la pantalla o un llum. Compareu els resultats amb la maqueta de paper. El prototip representa l’ordre de reg sense haver d’accionar una bomba.'),
        apartat('proves', 'Provem casos fàcils i casos de frontera',
          'Abans d’activar el **prototip**, escriu què esperes observar. Compara el senyal obtingut amb la predicció i anota qualsevol diferència.',
          taula(['Lectura', 'Cas de prova'], [
            ['20', 'Terra més seca que el llindar.'],
            ['39', 'Immediatament per sota del llindar.'],
            ['40', 'Just al llindar.'],
            ['41', 'Immediatament per damunt del llindar.'],
            ['58', 'Terra més humida que el llindar.'],
          ], 26),
          repte('Una millora i una segona prova', 'Passeu les targetes 20, 39, 40, 41 i 58 en aquest ordre. Indiqueu quan canvia el senyal. Si algú interpreta que cal regar també amb 40, en quin cas es veu l’error? Reescriviu la regla perquè dues persones la interpretin de la mateixa manera.')),
      ],
      guia: ['Fes tres targetes amb 20, 40 i 58 i passa-les pel model.', 'Mou el senyal a «rega» o «atura» segons la regla de la fitxa.', 'Compara què passa amb 20 i amb 40 i explica quan s’atura el reg.'],
      ampliacio: [
        p('Amb un únic llindar, les lectures 39, 41, 38 i 42 poden fer canviar el senyal a cada pas. Podem fer servir dos llindars: encenem per sota de 35 i apaguem a partir de 50. Entre 35 i 49, conservem l’estat anterior.'),
        repte('Evita els canvis constants', 'Comença amb el reg apagat. Aplica aquesta regla a 32, 39, 41, 50 i 44. Indica després de quines lectures canvia el senyal. Explica què s’ha de recordar entre una lectura i la següent.'),
      ],
    });

  fitxa(disseny, 'M098', 'instruccions-dun-semafor', 'Com donem instruccions a un semàfor?',
    'En un carrer de joguina hi ha un semàfor per als vehicles i un altre per a qui va a peu. Com donem instruccions a la maqueta perquè no apareguin dos verds alhora?', {
      descripcio: 'Divideix un repte en passos, programa una seqüència amb una condició i comprova què fa el model.',
      curriculum: [['disseny', 'condicio', 'Descompon un problema i dissenya, simula i revisa una seqüència amb una condició.']],
      fonts: [
        sabersCicleSuperior,
        ['Micro:bit Educational Foundation · Primeres lliçons amb MakeCode', 'https://www.microbit.org/teach/lessons/first-lessons-with-makecode-and-the-microbit/'],
        ['Micro:bit Educational Foundation · Projecte de semàfor intel·ligent', 'https://www.microbit.org/about/impact/do-your-bit/projects/2024/smart-traffic-light/'],
      ],
      apartats: [
        apartat('descomposar', 'Dividim el repte en tres feines',
          'Per **descompondre** el repte, separem tres feines: rebre una petició, canviar els senyals en ordre i tornar al començament.',
          'Hi ha una **entrada**, que és prémer un botó, i dues **sortides**, que són els senyals de la maqueta. Dibuixeu el pas i prepareu una targeta de senyal per als vehicles i una per als vianants.'),
        apartat('sequencia', 'Canviem les llums en ordre',
          'La **seqüència** comença amb verd per als vehicles i vermell per als vianants. Abans de donar pas als vianants, els vehicles passen per groc i després tots dos tenen vermell.',
          taula(['Pas', 'Vehicles', 'Vianants'], [
            ['1 · Espera', 'Verd', 'Vermell'],
            ['2 · Avís', 'Groc', 'Vermell'],
            ['3 · Pausa', 'Vermell', 'Vermell'],
            ['4 · Pas', 'Vermell', 'Verd'],
            ['5 · Pausa', 'Vermell', 'Vermell'],
          ], 34),
          'Després del pas 5, el model torna al pas 1. Les pauses del model es poden marcar amb un batec de mans. La durada d’una fase del carrer real requereix altres dades i decisions.'),
        apartat('condicio', 'Decidim quan ha de començar el cicle',
          'En el **pas 1**, si es prem el botó, el model passa al pas 2. Si ningú el prem, el model continua al pas 1.',
          'Quan el model ja ha començat el cicle, conserva l’ordre dels passos encara que algú torni a prémer el botó. La mateixa seqüència es pot repetir cada vegada que arriba una petició nova durant el pas 1.'),
        apartat('comprovacio', 'Simulem i detectem un error',
          'Simulem tres **casos de prova**: sense prémer el botó, prement-lo al pas 1 i prement-lo una altra vegada durant el pas 4.',
          'En grup, feu que una persona llegeixi les instruccions, una canviï les targetes i una faci de vianant. En cada prova, anoteu si es passa al pas 2 i si en algun moment coincideixen dos verds.',
          repte('Quin ordre cal reparar?', 'Una seqüència equivocada dona llum verda als vianants abans de posar vermell als vehicles. Assenyala quina situació es pot produir. Canvia l’ordre i prova quan es prem el botó dues vegades.')),
      ],
      guia: ['Dibuixa els dos senyals tal com són al pas 1.', 'Fes servir un tros de paper com a botó i simula què passa si ningú el prem.', 'Prem el botó i assenyala quin senyal s’ha de posar vermell abans del verd dels vianants.'],
      ampliacio: [
        p('Podem afegir una regla que recordi una petició feta al pas 4. En tornar al pas 1, el model espera dos batecs abans de començar el proper cicle i esborra la petició guardada.'),
        repte('Recordar un botó premut', 'Dibuixa els passos si una persona prem el botó durant el pas 4. Compara aquest recorregut amb el de la primera maqueta. Quin cas hauries de provar per assegurar que la petició només es fa servir una vegada?'),
      ],
    });

  const proves = itinerari('investigar-amb-proves', 'Investigar amb proves', 'Ciència i tecnologia');
  const digital = itinerari('dades-i-ciutadania-digital', 'Dades i ciutadania digital', 'Tecnologia i digitalització');

  fitxa(proves, 'M099', 'planadors-en-prova', 'Quin planador vola més lluny?',
    'Dos planadors de paper aterren a llocs diferents. Un té les puntes de les ales plegades cap amunt. Com podem saber si aquest detall explica la diferència?', {
      descripcio: 'Compara vols de planadors amb una prova repetida, mesures de distància i una conclusió basada en dades.',
      curriculum: [
        ['indagacio', 'mesures', 'Controla variables, repeteix una prova, registra les mesures i argumenta amb les dades.'],
        ['materia', 'forces', 'Relaciona la forma de les ales i les forces que actuen sobre un planador.'],
      ],
      fonts: [
        sabersCicleSuperior,
        ['NASA JPL · Construcció i prova d’un planador de paper', 'https://www.jpl.nasa.gov/edu/resources/project/make-a-paper-glider/'],
        ['NASA Glenn · Forces que actuen sobre un planador', 'https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/three-forces-on-a-glider/'],
      ],
      apartats: [
        apartat('forces', 'Què passa un cop el deixem anar?',
          'Quan el **planador** avança, l’aire exerceix forces sobre les ales. La **sustentació** ajuda a mantenir-lo a l’aire i la **resistència** en frena l’avanç. El pes l’estira cap avall.',
          'En un model de paper, el llançament proporciona la velocitat inicial. Un cop a l’aire, modificar la forma de les ales pot canviar com plana. Farem una prova per veure què passa amb un plec petit a les puntes.'),
        apartat('control', 'Canvia una sola cosa',
          'Fes dues versions a partir del mateix model. A la versió **A**, les puntes de les ales queden planes. A la **B**, es plega cap amunt una tira d’1 cm a l’extrem de cada ala.',
          'Per fer el model, posa un full en vertical i plega’l per la meitat al llarg. Obre’l, porta les dues cantonades de dalt fins al plec central i torna-hi a plegar les vores inclinades. Tanca el full pel plec central i abaixa els dos costats per formar ales iguals. Repeteix el model amb un full igual.',
          'Proveu els planadors en un espai tranquil i sense obstacles. Mantingueu la mateixa persona, la línia de sortida, l’altura i el tipus de llançament. Alterneu A i B per repartir els canvis d’un intent al següent.'),
        apartat('mesures', 'Mesura i repeteix',
          'Mesura des de la línia fins al lloc on el planador toca el terra per primera vegada. Feu **tres intents per versió** abans de comparar dades.',
          taula(['Versió', 'Vol 1', 'Vol 2', 'Vol 3'], [
            ['A · Puntes planes', '3,0 m', '4,0 m', '3,5 m'],
            ['B · Puntes plegades', '4,2 m', '3,7 m', '4,1 m'],
          ], 38),
          'A la taula hi ha mesures d’exemple. Per calcular la **mitjana**, suma les tres distàncies d’una versió i divideix el total per tres. Pots comparar també si els resultats de totes dues versions se solapen.'),
        apartat('conclusio', 'Què podem afirmar amb aquestes dades?',
          'Una **conclusió** respon a la pregunta inicial amb proves. Digues en quines condicions has fet la prova i quines mesures donen suport a l’afirmació.',
          repte('Explica el resultat amb dades', 'Calcula la mitjana de cada versió amb les dades de la taula i tria quina ha volat més lluny de mitjana. Busca dos intents que mostrin que una versió no guanya cada vegada. Proposa una millora per repetir la prova.')),
      ],
      guia: ['Assenyala què canvia entre A i B.', 'Llegeix aquests dos exemples: A vola 4,0 m al segon intent i B vola 3,7 m. Quin ha fet més distància en aquest intent?', 'Digues per què faries més intents abans de triar un planador.'],
      ampliacio: [repte('Una mitjana molt semblant', 'Un segon grup obté 3,9 m de mitjana amb A i 4,0 m amb B. Explica per què seria útil veure les sis mesures originals i què més voldries saber del llançament abans de comparar els dos grups.')],
    });

  fitxa(digital, 'M100', 'dades-del-pati', 'De les dades del pati a un gràfic que s’entén',
    'La classe vol saber en quina zona del pati es troben més papers a terra. Ajudarà mirar a tot arreu de la mateixa manera i fer un gràfic que es pugui llegir.', {
      descripcio: 'Delimita una observació, ordena els recomptes en un full de càlcul i explica un gràfic de barres.',
      curriculum: [
        ['digital', 'grafic', 'Organitza dades en un full de càlcul i en fa una representació gràfica llegible.'],
        ['indagacio', 'observacio', 'Aplica un criteri comú de recompte i identifica els límits de les dades.'],
      ],
      fonts: [
        sabersCicleSuperior,
        ['XTEC · Sabers de matemàtiques a primària', 'https://projectes.xtec.cat/nou-curriculum/wp-content/uploads/usu2072/2024/04/Ed.Primaria_Matematiques_sabers.pdf'],
      ],
      apartats: [
        apartat('observacio', 'Preparem un recompte que es pugui comparar',
          'Observa zones de la **mateixa superfície** a la mateixa hora. Decideix què comptaràs i segueix el mateix criteri a cada zona.',
          'Després del pati marqueu quatre espais de 3 metres per 3. Compteu durant cinc minuts els trossos de paper visibles dins de cada espai. Per comptar un paper que toca el límit, acordeu mirar si més de la meitat queda a dins. Si no hi ha cap tros, anoteu **0**.'),
        apartat('registre', 'Una fila per a cada zona',
          'Al **full de càlcul**, posa el nom de la zona en una columna i el nombre de papers en una altra. Un títol ha d’explicar què hi ha a cada columna.',
          taula(['Zona observada', 'Trossos de paper'], [
            ['Entrada', '4'],
            ['Porxo', '7'],
            ['Pista', '2'],
            ['Hort', '0'],
          ], 48),
          'Aquests nombres són inventats. Si una zona queda sense observar, marca-ho a les notes i deixa la dada pendent. Un zero significa que sí que s’ha observat i no s’hi ha trobat cap paper.'),
        apartat('grafic', 'Del recompte a les barres',
          'En un **gràfic de barres** vertical, posem les zones a baix i el nombre de trossos a l’eix vertical. L’escala comença a **zero** i avança amb intervals iguals.',
          'Selecciona les dues columnes del full i insereix un gràfic de barres verticals. Posa-hi un títol com «Trossos de paper observats al pati després de l’esbarjo». Revisa que l’escala, els noms de les zones i la unitat es llegeixin. També pots dibuixar el gràfic en paper quadriculat.'),
        apartat('lectura', 'Què podem explicar amb el gràfic?',
          'Una fotografia de les dades d’un dia descriu aquell moment. Per dir si el resultat es repeteix, necessitem mesures d’**altres dies** en condicions comparables.',
          repte('Llegeix i comunica una observació', 'Fes el gràfic amb les dades de la fitxa. On se n’han comptat més? Quants trossos més hi ha al Porxo que a l’Entrada? Escriu una frase que indiqui també l’àrea i el moment observats.')),
      ],
      guia: ['Fes tres barres que comencin a 0. Entrada té 4 papers, Porxo en té 7 i Pista en té 2.', 'Escriu el nom de cada zona sota la seva barra.', 'Marca quina és la barra més alta i digues què indica.'],
      ampliacio: [repte('Quan les superfícies són diferents', 'Un altre grup compta 10 papers en 20 m² i 6 papers en 10 m². Calcula quants n’hi ha per cada 10 m² a la primera zona i compara les dues zones amb la mateixa unitat. Explica per què els totals donaven una impressió diferent.')],
    });

  fitxa(digital, 'M101', 'que-publiquem-a-internet', 'Quina informació compartim quan publiquem a internet?',
    'La classe vol compartir una fotografia d’un projecte. Al fons s’hi veuen un horari amb noms i una persona que no vol aparèixer. Què podem canviar abans de publicar-la?', {
      descripcio: 'Reconeix pistes que identifiquen persones i practica com compartir amb privadesa i respecte.',
      curriculum: [['digital', 'tria', 'Analitza la identitat i la petjada digitals i aplica decisions de privadesa abans de compartir.']],
      fonts: [
        sabersCicleSuperior,
        ['APDCAT · Difusió d’imatges de menors i joves als centres educatius', 'https://apdcat.gencat.cat/web/.content/04-actualitat/noticies/documents/DifusioImatgesMenors.pdf'],
      ],
      apartats: [
        apartat('pistes', 'Una imatge pot dir més del que pensem',
          'Una **dada personal** és informació que identifica algú directament o amb altres pistes. Un nom, una cara o un horari amb noms en poden ser exemples.',
          'En una foto, mira també el fons i el text que l’acompanya. Un nom en una carpeta i el lloc visible en un cartell poden aportar informació que no cal compartir per explicar el projecte.'),
        apartat('petjada', 'Qui ho podrà veure després?',
          'La **petjada digital** inclou rastres que deixem quan fem servir internet. La **identitat digital** és la imatge que s’hi forma sobre nosaltres amb informació pròpia i d’altres persones.',
          'Abans de compartir en un grup, comprova qui hi té accés. Una persona del grup pot reenviar una imatge o fer-ne una captura. Si alguna cosa et preocupa, demana ajuda a una persona adulta de confiança.'),
        apartat('tria', 'Tres preguntes abans de compartir',
          'Pregunta’t **què** vols mostrar, **qui** ho veurà i **quines dades** necessites. Si hi reconeixes altres persones, parla amb elles i seguiu amb la mestra o el mestre les pautes del centre.',
          'Podeu fer una foto nova centrada en el projecte, treure noms del cartell o presentar el treball amb un dibuix. Si algú expressa que no vol sortir en una imatge, respecteu la seva decisió i busqueu una manera de mostrar el treball.',
          repte('Tria què envies i a qui', 'Imagineu un vídeo d’una maqueta amb una persona i un full amb cognoms al darrere. Proposeu una nova versió que mostri la feina. Decidiu si el grup de classe necessita el mateix accés que les persones de fora del centre.')),
      ],
      guia: ['Busca una pista que permeti identificar algú.', 'Digues quina part del projecte voleu mostrar.', 'Tria una manera de mostrar-la que deixi fora aquella dada.'],
      ampliacio: [repte('La fotografia ja s’ha compartit', 'Una companya descobreix que una foto seva s’ha reenviat sense que ella ho volgués. Escriu què pot fer el grup per aturar nous reenviaments i què podria fer una persona adulta del centre per ajudar.')],
    });

  const cel = itinerari('terra-i-mapes', 'La Terra i les seves representacions', 'Geografia');
  const poblacio = itinerari('poblacio-i-territori', 'Població i territori', 'Geografia');

  fitxa(cel, 'M102', 'estrelles-i-llum-nocturna', 'Per què veiem menys estrelles a la ciutat?',
    'La mateixa nit, dues persones miren la mateixa regió del cel. Una hi compta sis estrelles i l’altra, setze. Què pot explicar aquesta diferència?', {
      descripcio: 'Investiga la contaminació lumínica, compara observacions i justifica una millora de l’enllumenat.',
      curriculum: [
        ['terra', 'entorn', 'Explica com l’enllumenat nocturn altera el cel i pot afectar els éssers vius.'],
        ['indagacio', 'recompte', 'Compara observacions del cel amb un protocol i identifica explicacions alternatives.'],
      ],
      fonts: [
        sabersCicleSuperior,
        ['Generalitat · Què és la contaminació lumínica?', 'https://mediambient.gencat.cat/ca/05_ambits_dactuacio/atmosfera/contaminacio_luminica/que-es-la-contaminacio-luminica/'],
      ],
      apartats: [
        apartat('resplendor', 'Quan el cel del fons es fa més clar',
          'La **contaminació lumínica** és l’alteració de la foscor natural de la nit per llum artificial. Quan part de la llum s’escampa per l’atmosfera, el cel pot semblar més clar.',
          'Les estrelles més febles destaquen menys sobre un fons clar. També pot costar veure-les si una llum ens enlluerna directament. Els núvols, la Lluna i els obstacles canvien les condicions d’observació.'),
        apartat('recompte', 'Comptem a la mateixa regió del cel',
          'Per comparar dos llocs, observa la **mateixa zona del cel**, a la mateixa hora, i anota els núvols i si hi ha lluna. Deixa que la vista s’acostumi a la foscor abans de comptar.',
          'Si ho proveu, trieu llocs segurs amb una persona adulta. Delimiteu la mateixa zona amb un grup d’estrelles fàcils de trobar i feu el recompte amb el mateix criteri. També podeu treballar amb aquestes dades d’exemple.',
          taula(['Lloc', 'Estrelles visibles', 'Condicions anotades'], [
            ['Plaça il·luminada', '6', 'Cel serè, mateixa hora i lluna sota l’horitzó.'],
            ['Camí fosc', '16', 'Cel serè, mateixa hora i lluna sota l’horitzó.'],
          ], 33)),
        apartat('entorn', 'Portar la llum allà on cal',
          'Podem **dirigir la llum cap a terra**, limitar-ne la intensitat i apagar-la quan no es necessita. Així es pot il·luminar un pas i reduir la llum que surt cap al cel.',
          'La llum nocturna també pot alterar l’activitat d’alguns animals, com els insectes nocturns. Cal decidir quines zones s’han d’il·luminar, en quin horari i amb quina intensitat.',
          repte('Dibuixa una millora per a la plaça', 'Assenyala de quins llocs són els recomptes de 6 i de 16 estrelles. Dibuixa una llum que il·lumini el camí i indica on reduiries la llum que s’escapa. Què observaries abans i després del canvi?')),
      ],
      guia: ['A la plaça es veuen 6 estrelles i al camí se’n veuen 16. Digues on se’n veuen més.', 'Assenyala una condició que ha de ser igual per comparar.', 'Dibuixa una fletxa que mostri cap on dirigiríem la llum d’un fanal.'],
      ampliacio: [repte('I si només tenim dades d’una nit?', 'Organitza observacions en tres vespres a la mateixa hora. Decideix com anotaries la nuvolositat i què faries amb les dades d’un recompte en què no es podia veure tota la regió del cel.')],
    });

  fitxa(proves, 'M103', 'flotabilitat-i-densitat', 'Per què sura un vaixell d’acer?',
    'Una làmina de metall es pot doblegar fins a fer un bol. El metall continua sent el mateix, però la forma nova canvia com es comporta a l’aigua.', {
      descripcio: 'Mesura massa i volum, compara densitats i investiga com la forma afecta la flotabilitat.',
      curriculum: [
        ['materia', 'empenta', 'Relaciona massa i volum amb la densitat i explica la flotabilitat i l’empenta de l’aigua.'],
        ['indagacio', 'assaig', 'Compara dues formes amb la mateixa massa i registra què passa a l’aigua.'],
      ],
      fonts: [
        sabersCicleSuperior,
        ['OpenStax · Principi d’Arquimedes i flotabilitat', 'https://openstax.org/books/university-physics-volume-1/pages/14-4-archimedes-principle-and-buoyancy'],
      ],
      apartats: [
        apartat('densitat', 'Quanta massa hi ha en un mateix volum?',
          'La **densitat** relaciona la massa i el volum. Per calcular-la, divideix la massa pel volum. A igual volum, l’objecte amb més massa té una densitat més gran.',
          '100 mL d’aigua tenen una massa aproximada de 100 g. Un bloc de 100 mL que té una massa de 80 g és menys dens que l’aigua. Un bloc del mateix volum amb una massa de 125 g és més dens.'),
        apartat('empenta', 'L’aigua empeny el vaixell cap amunt',
          'Quan un objecte entra a l’aigua, n’aparta una part. L’aigua li fa una **empenta cap amunt**. Quan l’objecte sura, l’empenta equilibra el seu pes.',
          'L’acer del casc és més dens que l’aigua. El vaixell sencer té molt d’espai ple d’aire. Gràcies a la seva forma, pot desplaçar prou aigua per surar abans que n’hi entri per les vores. Amb més càrrega, queda més enfonsat i desplaça més aigua.'),
        apartat('assaig', 'La mateixa massa, dues formes',
          'Fes servir **dues peces de paper d’alumini de la mateixa massa**. Fes-ne una bola ben compacta i un bol de vores altes. Posa-les per separat sobre aigua i anota què observes.',
          'Comproveu la massa de les peces amb una balança i feu les proves amb la mateixa aigua. Anoteu quina part de cada peça queda sota l’aigua i si l’aire queda atrapat o hi entra aigua. Una bola d’alumini pot retenir aire i continuar surant.',
          repte('Carrega el bol a poc a poc', 'Posa fitxes iguals d’una en una al centre del bol. Després de cada fitxa, mira fins on puja l’aigua a la paret del bol. Anota quantes en suporta abans que hi entri aigua. Explica quin canvi has observat mentre hi afegies massa.')),
      ],
      guia: ['Compara dos blocs del mateix volum: un fa 80 g i l’altre 125 g. Quin és més dens?', 'Digues quina força de l’aigua ajuda el bol a surar.', 'Observa si el bol s’enfonsa més quan hi afegeixes una fitxa.'],
      ampliacio: [repte('El lloc de la càrrega importa?', 'Prova la mateixa quantitat de fitxes al centre i després molt a prop d’una vora. Mantén la forma del bol. Compara quan s’inclina, quan entra aigua i què mostra aquesta prova sobre el repartiment de la càrrega.')],
    });

  fitxa(proves, 'M104', 'una-bombeta-en-un-circuit', 'Què cal perquè s’encengui la bombeta?',
    'Tens un portapiles, una bombeta petita, un interruptor i uns cables. Quines connexions necessites? Com ho pots comprovar abans de moure l’interruptor?', {
      descripcio: 'Munta i dibuixa un circuit senzill i segueix les transformacions de l’energia.',
      curriculum: [['materia', 'circuit', 'Construeix un circuit elèctric senzill i relaciona el funcionament de la bombeta amb les transformacions d’energia.']],
      fonts: [
        sabersCicleSuperior,
        ['Science Buddies · Proves amb un circuit senzill de baixa tensió', 'https://www.sciencebuddies.org/stem-activities/which-materials-conduct-electricity'],
      ],
      apartats: [
        apartat('circuit', 'Dos contactes i un camí complet',
          'En un **circuit tancat**, el corrent pot circular per un camí complet que connecta els dos pols de la pila a través del dispositiu. Obrir el camí interromp el corrent.',
          'Amb l’acompanyament del docent, feu servir un portapiles de baixa tensió, una bombeta escolar adequada a la pila, un interruptor i tres cables aïllats. Connecteu un pol al primer contacte de la bombeta. Connecteu el segon contacte a l’interruptor i torneu de l’interruptor a l’altre pol.',
          'Mantingueu l’interruptor obert mentre munteu el circuit. Connecteu els pols entre si només a través de la bombeta i els altres elements del circuit.'),
        apartat('energia', 'D’on surt la llum?',
          'La **pila** transforma energia química en energia elèctrica. A la bombeta, l’energia elèctrica es transforma en **llum** i **calor**.',
          'Altres sistemes poden proporcionar energia elèctrica. Una placa fotovoltaica aprofita l’energia de la llum i un generador amb maneta transforma energia del moviment. En cada cas podem dibuixar què arriba al dispositiu i en què es transforma.'),
        apartat('interruptor', 'Prediu què passarà i comprova-ho',
          'Un **interruptor** obre o tanca un tram del circuit. Si hi ha una interrupció en un altre punt, la bombeta continua apagada encara que tanquem l’interruptor.',
          repte('Fes tres proves', 'Dibuixa el circuit i prediu si la bombeta s’encendrà amb l’interruptor obert, amb l’interruptor tancat i amb l’interruptor tancat però un cable desconnectat. Obre l’interruptor abans de desconnectar el cable. Registra els resultats i assenyala on queda tallat el camí en cada cas.')),
      ],
      guia: ['Dibuixa la pila i la bombeta i uneix-les amb dos camins entre contactes diferents.', 'Afegeix l’interruptor a un dels camins i marca si queda obert o tancat.', 'Assenyala quan pot circular el corrent i què produeix la bombeta.'],
      ampliacio: [repte('Canvia l’interruptor de lloc', 'Dibuixa un segon circuit amb l’interruptor a l’altre costat de la bombeta, dins del mateix camí. Prediu què passarà quan l’obris en cada muntatge i explica quina propietat del circuit permet fer la predicció.')],
    });

  fitxa(poblacio, 'M105', 'com-canvia-la-poblacio', 'Com ha canviat la població del nostre municipi?',
    'Les xifres d’un municipi pugen un any i baixen el següent. Amb un gràfic veurem quan canvien i amb altres dades investigarem per què.', {
      descripcio: 'Representa l’evolució de la població i interpreta els saldos natural i migratori.',
      curriculum: [
        ['reptes', 'components', 'Interpreta canvis demogràfics i diferencia naixements, defuncions, arribades i sortides.'],
        ['digital', 'evolucio', 'Organitza una sèrie temporal i representa l’evolució de la població amb un gràfic.'],
      ],
      fonts: [
        sabersCicleSuperior,
        ['Idescat · Xifres de població', 'https://www.idescat.cat/tema/xifpo'],
        ['Idescat · Creixement de la població per components a escala municipal', 'https://www.idescat.cat/pub/?geo=mun%3A081043&id=censph&n=16847'],
      ],
      apartats: [
        apartat('evolucio', 'Posa les dades per ordre i dibuixa’n l’evolució',
          'Per comparar la **població** al llarg del temps, fes servir xifres del mateix territori i amb la mateixa data de referència. En un gràfic de línies, posa els anys a baix i el nombre d’habitants a l’eix vertical.',
          taula(['Data de referència', 'Habitants del municipi'], [
            ['1 de gener de 2022', '1.200'],
            ['1 de gener de 2023', '1.230'],
            ['1 de gener de 2024', '1.220'],
            ['1 de gener de 2025', '1.250'],
          ], 48),
          'Les dades són d’un municipi fictici. Fes una línia amb les quatre dades. Mantén intervals iguals a cada eix i indica quin tram has triat representar. Marca entre quines dues dates hi ha una baixada.'),
        apartat('components', 'Què explica el canvi?',
          'El **saldo natural** és el nombre de naixements menys el de defuncions. El **saldo migratori** és el nombre de persones que hi arriben a viure menys el de les que se’n van.',
          'Durant el 2024, al municipi de l’exemple hi va haver 10 naixements i 16 defuncions. Hi van arribar 48 persones i se’n van anar 12. Podem calcular cada saldo per explicar el canvi entre l’1 de gener de 2024 i l’1 de gener de 2025.'),
        apartat('lectura', 'Del nostre exemple al municipi real',
          'Per investigar com canvia el teu **municipi**, tria una sèrie de població de l’Idescat i apunta la font, el territori i la data de cada xifra.',
          'Un lloc pot créixer per motius diferents d’un altre. Si només coneixem el total d’habitants, sabem quant ha canviat la població. Ens calen dades de naixements, defuncions i moviments de població per investigar per què.',
          repte('Reconstrueix un any de canvi', 'Calcula la diferència entre els habitants de 2024 i 2025 a la taula. Calcula els dos saldos amb les dades de l’apartat anterior i comprova si, en aquest cas, la seva suma coincideix amb el canvi total.')),
      ],
      guia: ['Compara 1.220 habitants el 2024 i 1.250 el 2025. Calcula quants més n’hi ha.', 'Per al saldo natural, calcula 10 menys 16.', 'Per al saldo migratori, calcula 48 menys 12 i suma-hi el resultat anterior.'],
      ampliacio: [repte('El mateix canvi en municipis diferents', 'Dos municipis guanyen 30 habitants. Un en tenia 1.000 i l’altre 5.000. Calcula quin percentatge de la població inicial representa un augment de 30 a cada municipi. Explica què ens diu aquesta comparació que el recompte de persones tot sol no mostra.')],
    });

  fitxa(disseny, 'M106', 'pont-de-paper', 'Quin pont de paper aguanta més pes?',
    'La classe vol fer un pont perquè unes fitxes passin per damunt d’un buit. Cada pont només pot fer servir un full. Com podem canviar la forma del paper perquè aguanti més càrrega?', {
      descripcio: 'Dissenya un pont de paper amb materials limitats, compara dues formes i revisa el prototip.',
      curriculum: [
        ['disseny', 'millora', 'Dissenya, construeix, posa a prova i millora un prototip amb uns criteris i uns materials definits.'],
        ['indagacio', 'carrega', 'Controla la distància i la càrrega en una prova de resistència i compara els resultats.'],
      ],
      fonts: [sabersCicleSuperior],
      apartats: [
        apartat('condicions', 'Un repte amb tres condicions',
          'El **prototip** ha de cobrir un buit de 15 cm, fer servir un full A4 i aguantar tantes fitxes iguals com pugui.',
          'Poseu dos llibres gruixuts estables, de la mateixa alçada, separats 15 cm. Col·loqueu-hi el full amb el costat llarg en la direcció del pont. L’espai entre llibres ha de ser el mateix a cada prova.'),
        apartat('formes', 'Un full pla i un full amb vores plegades',
          'Compareu un **full pla** amb un altre full igual amb les dues vores llargues plegades cap amunt. Tots dos tenen la mateixa quantitat de paper.',
          'Feu cada plec a 2 cm de la vora. Deixeu la mateixa llargada de paper sobre cada suport. Abans de provar-ho, dibuixeu els dos models de costat i feu una predicció.'),
        apartat('carrega', 'La càrrega sempre al mateix lloc',
          'Afegiu **una fitxa cada vegada al centre**. Anoteu quantes n’aguanta abans que el paper toqui la taula o que caigui la càrrega.',
          taula(['Forma', 'Prova 1', 'Prova 2', 'Prova 3'], [
            ['Full pla', '4', '5', '4'],
            ['Vores plegades', '10', '9', '10'],
          ], 37),
          'Les dades de la taula són un exemple. Si repetiu una prova, feu servir un full nou del mateix tipus perquè els plecs o les deformacions anteriors no afectin el resultat.'),
        apartat('millora', 'Canvia una cosa i torna-ho a provar',
          'Per **millorar** el model, trieu un sol canvi i compareu-lo amb el model de referència amb el mateix procediment.',
          repte('Tria què modificaràs', 'Proposeu modificar l’alçada dels plecs o la forma del pont. Dibuixeu la idea, indiqueu quina mesura es manté igual i escriviu el resultat que voldríeu superar.')),
      ],
      guia: ['Separa els llibres 15 cm.', 'Posa les fitxes d’una en una al centre de cada pont.', 'En una prova, el full pla n’aguanta 4 i el plegat 10. Digues quin n’aguanta més i quantes de diferència.'],
      ampliacio: [repte('Guanya sempre el mateix?', 'El pont amb les vores plegades ha aguantat més fitxes al centre. Proposa una prova amb la càrrega prop d’una vora. Explica què mantindries igual i per què no pots donar el resultat per sabut.')],
    });

  fitxa(disseny, 'M107', 'robot-amb-instruccions', 'Com fem arribar un robot al seu destí?',
    'Un robot de paper ha de portar una capsa de la biblioteca al taller. Només sap avançar una casella i girar. Com li donarem les instruccions perquè esquivi els obstacles?', {
      descripcio: 'Escriu i comprova instruccions en blocs per a un robot i substitueix repeticions per un bucle.',
      curriculum: [['disseny', 'depurar', 'Descompon un recorregut, identifica patrons, empra bucles i comprova i depura una seqüència.']],
      fonts: [sabersCicleSuperior, ['Code.org · Depuració en un laberint', 'https://studio.code.org/courses/coursec-2025/units/1/lessons/4/levels/2']],
      apartats: [
        apartat('graella', 'Situem el robot, el destí i els obstacles',
          'Dibuixa una graella de 5 × 5. Les columnes són **A–E**, d’esquerra a dreta, i les files **1–5**, de dalt a baix. El robot és a **A1** i mira cap a la dreta. El destí és **D3**. Bloqueja **C2** i **B3**.',
          taula(['Fila', 'A', 'B', 'C', 'D', 'E'], [
            ['1', 'Inici →', '·', '·', '·', '·'],
            ['2', '·', '·', 'Bloqueig', '·', '·'],
            ['3', '·', 'Bloqueig', '·', 'Destí', '·'],
            ['4', '·', '·', '·', '·', '·'],
            ['5', '·', '·', '·', '·', '·'],
          ], 16)),
        apartat('blocs', 'Una instrucció cada vegada',
          'El bloc **Avança** mou el robot una casella cap on mira. **Gira a la dreta** i **Gira a l’esquerra** el fan girar un quart de volta sense moure’l de casella.',
          'Retalleu targetes amb els blocs o dibuixeu-los en fila. Una persona llegeix i una altra mou el robot. Marqueu la casella i l’orientació després de cada bloc.'),
        apartat('bucle', 'Repetir un pas amb un bloc',
          'Un **bucle** permet repetir una instrucció diverses vegades. **Repeteix 3 vegades [Avança]** fa tres avanços seguits.',
          'D’A1 a D1 hi ha tres avanços si el robot mira cap a la dreta. Un gir a la dreta el deixa mirant cap a la fila 2. Continua la seqüència fins a D3.'),
        apartat('depurar', 'Troba el primer error i corregeix-lo',
          '**Depurar** és localitzar els errors d’una seqüència i comprovar que el canvi els resol.',
          repte('Un gir massa aviat', 'Prova «Repeteix 2 vegades [Avança] → Gira a la dreta → Repeteix 2 vegades [Avança]». En quina casella apareix el primer problema? Canvia un sol nombre i prova el programa sencer des d’A1.')),
      ],
      guia: ['Dibuixa la graella i situa A1, D3 i els dos obstacles.', 'Avança tres vegades des d’A1 i digues on arribes.', 'Gira cap avall sense canviar de casella i escriu quants avanços et falten.'],
      ampliacio: [repte('Canvia l’entorn', 'Bloqueja també D2. Troba un altre recorregut d’A1 a D3, escriu-lo amb blocs i comprova’l. Busca quines repeticions pots agrupar sense canviar el recorregut.')],
    });

  fitxa(cel, 'M108', 'satel-lits-i-residus-espacials', 'Què hi fem, a l’espai, i què hi deixem?',
    'Pots veure una imatge dels núvols de tot un país feta des de l’espai. El satèl·lit que l’ha captada comparteix l’entorn amb altres naus i amb fragments que ja no tenen cap funció.', {
      descripcio: 'Relaciona alguns usos dels satèl·lits amb la vida a la Terra i analitza com reduir els residus en òrbita.',
      curriculum: [['terra', 'decisions', 'Analitza els usos dels satèl·lits i les conseqüències de la contaminació espacial.']],
      fonts: [sabersCicleSuperior, ['ESA · Residus espacials', 'https://www.esa.int/about-us/directorates/operations/space-safety/space-debris'], ['ESA · Observació de la Terra', 'https://www.esa.int/Applications/Observing_the_Earth']],
      apartats: [
        apartat('orbita', 'Què vol dir estar en òrbita?',
          'Un **satèl·lit artificial** és un objecte construït que hem posat en òrbita. Mentre avança, la gravetat fa que el seu camí es corbi al voltant de la Terra.',
          'Hi ha òrbites de formes i altituds diferents. Per llegir un esquema, segueix el traç que envolta la Terra i comprova si indica que les distàncies s’han dibuixat a escala.'),
        apartat('usos', 'Per a què ens serveixen els satèl·lits?',
          'Alguns satèl·lits **observen la Terra**. D’altres ajuden a transmetre comunicacions o a saber on som.',
          'Les imatges de la Terra permeten seguir núvols i observar com canvia el territori. Els aparells de navegació poden usar senyals de diversos satèl·lits per calcular una posició.'),
        apartat('residus', 'Objectes que ja no fan cap servei',
          'Els **residus espacials** inclouen satèl·lits fora de servei, parts de coets i fragments que continuen en òrbita.',
          'Els objectes en òrbita es mouen molt de pressa. Un xoc pot danyar una nau en funcionament i produir fragments nous. També hi ha peces que, amb el temps, tornen a l’atmosfera.'),
        apartat('decisions', 'Planificar abans del llançament',
          'Abans d’enviar un satèl·lit, es pot planificar com es **retirarà de l’òrbita de treball** al final de la missió. La solució depèn de l’òrbita i del tipus de satèl·lit.',
          repte('Tria què vols saber de cada objecte', 'En un esquema de l’espai proper a la Terra, dibuixa un satèl·lit actiu, un satèl·lit aturat i un fragment. Quina informació et cal saber per identificar quin encara fa un servei? Explica com ajudaria planificar el final de la missió.')),
      ],
      guia: ['Digues quina informació fa servir una previsió meteorològica que pot venir d’un satèl·lit.', 'Identifica un exemple de residu espacial.', 'Explica què es pot decidir abans del llançament.'],
      ampliacio: [repte('Dues decisions per a un mateix problema', 'Compara planificar la retirada d’un satèl·lit nou i fer el seguiment d’un fragment que ja existeix. Digues en quin moment serveix cada acció i quina informació necessitaria l’equip.')],
    });

  fitxa(digital, 'M109', 'afinar-una-cerca-i-citar', 'Com afinem una cerca i citem el que trobem?',
    'Necessites explicar quins ocells es poden observar al Delta de l’Ebre. La primera cerca et dona anuncis, fotografies i notícies. Com pots trobar una font útil i indicar d’on surt?', {
      descripcio: 'Planifica una cerca, ajusta la consulta, compara fonts i atribueix el material que reutilitzes.',
      curriculum: [['digital', 'atribucio', 'Afina la cerca amb paraules clau i operadors i anota l’origen i la llicència dels materials.']],
      fonts: [
        sabersCicleSuperior,
        ['Google · Opcions per afinar una cerca', 'https://support.google.com/websearch/answer/2466433'],
        ['Creative Commons · Pautes d’atribució', 'https://wiki.creativecommons.org/Best_practices_for_attribution'],
      ],
      apartats: [
        apartat('pregunta', 'De la pregunta a les paraules clau',
          'Escriu la pregunta sencera i tria **paraules clau** de lloc, tema i finalitat. Per al Delta de l’Ebre, pots començar amb «delta de l’Ebre ocells observació».',
          'Si apareixen molts anuncis, afegeix-hi «guia». Si apareixen pocs resultats, prova un sinònim com «aus» o elimina una paraula. Anota què has canviat i quina mena de resultats apareix ara.'),
        apartat('operadors', 'Limita la cerca amb una pista concreta',
          'En cercadors com Google, les **cometes dobles** busquen una expressió exacta i **site:** limita la cerca a un web o domini.',
          'La consulta «ocells "delta de l’Ebre" site:parcsnaturals.gencat.cat» demana resultats d’aquest domini que continguin l’expressió entre cometes. Escriu el domini enganxat a site:. Si una consulta és massa restrictiva, prova de treure un filtre i compara el resultat.'),
        apartat('fonts', 'Compara què aporta cada resultat',
          'Per triar una **font**, comprova qui l’ha publicada, de quan és i si respon a la pregunta. La posició a la llista depèn de la consulta i dels criteris del cercador.',
          'Una guia del parc pot explicar on observar ocells. Una notícia sobre una sola observació pot donar una data i un lloc més precisos. Obre les pàgines i decideix quina informació et serveix de cadascuna.'),
        apartat('atribucio', 'Deixa escrit d’on has tret la informació',
          'Per **citar** una font, anota l’autoria, el títol, el lloc on es pot trobar i la data si consta. Si reutilitzes una imatge, mira quina llicència té i quines condicions demana.',
          'En una imatge amb llicència CC BY, indica l’autoria, la font i la llicència, i anota si has fet canvis. Afegeix el títol si consta. Una imatge feta a classe o una amb una llicència que permeti l’ús són opcions que pots valorar.',
          repte('Una cerca i una fitxa de font', 'Escriu dues consultes per respondre la pregunta inicial. Compara un resultat de cada consulta i deixa constància de quin t’ajuda més i per què. Prepara una línia d’atribució si la font inclou una imatge que pots reutilitzar.')),
      ],
      guia: ['Subratlla el lloc i el tema de la pregunta.', 'Escriu tres paraules per cercar.', 'A la pàgina triada, troba l’autoria i el títol.'],
      ampliacio: [repte('Una cerca que deixa coses fora', 'Limitant la cerca al web del parc trobes documents útils. Quina mena de fonts quedaran fora? Escriu una segona consulta que pugui trobar-les i explica per què mantindries un registre de totes dues.')],
    });

  fitxa(digital, 'M110', 'protegir-un-compte-digital', 'Com protegim un compte digital?',
    'A l’escola, un missatge diu que cal confirmar el compte de seguida i demana un codi. Què pot fer una persona per comprovar-ho sense donar cap dada?', {
      descripcio: 'Aplica pràctiques de protecció al compte i respon amb criteri davant d’un avís inesperat.',
      curriculum: [['digital', 'avis', 'Aplica normes de seguretat a l’entorn digital, incloent-hi contrasenyes, verificació i resposta a avisos sospitosos.']],
      fonts: [
        sabersCicleSuperior,
        ['INCIBE · Consells per evitar riscos en línia', 'https://www.incibe.es/sites/default/files/2024-12/tips-para-evitar-riesgos-en-linea.pdf'],
        ['INCIBE · Autenticació en dos passos', 'https://www.incibe.es/sites/default/files/docs/osi_autenticacion_2_pasos.pdf'],
      ],
      apartats: [
        apartat('contrasenya', 'Una clau diferent per a cada compte',
          'Una **contrasenya llarga i única** ajuda a protegir un compte. Evita noms, dates i altres dades fàcils d’endevinar. Mantén la contrasenya en privat.',
          'Una frase de pas pot combinar paraules que no tinguin una relació evident. Fes servir només exemples inventats en aquesta activitat. Si s’ha de recuperar un compte escolar, segueix els passos del centre amb una persona adulta.'),
        apartat('passos', 'Una segona comprovació',
          'La **verificació en dos passos** demana una comprovació addicional després de la contrasenya. Si reps un codi que no has demanat, guarda’l en privat i avisa.',
          'Un servei pot confirmar l’accés amb una aplicació, un dispositiu o un codi. La comprovació complementa la contrasenya. Quan el centre permet triar el mètode, demana ajuda per activar-lo i per saber com tornar a entrar si perds l’accés.'),
        apartat('avis', 'Atura’t i comprova l’avís',
          'Si un missatge inesperat et demana una dada secreta, **atura’t**. Obre el servei pel camí que fas servir habitualment i demana ajuda a una persona adulta de confiança.',
          'La pressa, una petició estranya o una notificació que no esperaves són motius per comprovar l’avís. Si ja has compartit una clau o un codi, avisa de seguida perquè t’ajudin amb els passos de recuperació del servei.',
          repte('Tria què faries primer', 'En el cas del principi, escriu una frase per explicar la situació a una persona adulta. Indica per quin camí consultaries el compte i què faries amb el codi que has rebut.')),
      ],
      guia: ['Marca què demana el missatge inesperat.', 'Digues què has de mantenir en privat.', 'Tria a qui ho explicaries abans de continuar.'],
      ampliacio: [repte('Dues capes, dos problemes', 'En un cas fictici, algú reutilitza la mateixa contrasenya en dos comptes. Un té verificació en dos passos i l’altre no. Explica per què és útil que les claus siguin diferents, fins i tot quan un compte té una segona comprovació.')],
    });
}
