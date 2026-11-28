window.variantsMaterials ??= {};

{
  const p = text => ({ type: 'paragraph', text });
  const passos = (...items) => ({ type: 'steps', items });
  const taula = (headers, rows, rowHeadingWidth) => ({ type: 'table', headers, rows, rowHeadingWidth });
  const repte = (title, text) => ({ type: 'note', kind: 'prova', title, text });

  Object.assign(window.variantsMaterials, {
    M001: {
      'planeta-terra': {
        suport: {
          intro: 'Vivim a la superfície de la Terra. A sota hi ha roca i metall. A la superfície i al seu voltant hi ha aigua, aire i vida.',
          sections: {
            capes: [
              taula(['Capa', 'On és i com és?'], [
                ['Escorça', 'És la capa de fora. És prima i feta de roca.'],
                ['Mantell', 'És sota l’escorça. És la capa més gruixuda. La roca és molt calenta.'],
                ['Nucli', 'És al centre. Té una part de fora líquida i una part de dins sòlida.'],
              ], 26),
            ],
            moviment: [
              passos('Dues plaques es poden **separar**.', 'Dues plaques poden **xocar**.', 'Dues plaques poden lliscar de costat.'),
              p('Si les roques es mouen de cop, el terra pot tremolar. Això és un **terratrèmol**.'),
            ],
            gravetat: [
              p('Tenim el centre de la Terra sota els peus. A l’altre costat del planeta, «avall» també apunta cap al centre.'),
            ],
            elements: [
              taula(['Part', 'Exemple'], [
                ['Geosfera', 'Les roques de la riba.'],
                ['Hidrosfera', 'L’aigua del riu.'],
                ['Atmosfera', 'L’aire que envolta la Terra.'],
                ['Biosfera', 'Les plantes i els animals del riu.'],
              ], 30),
              p('Quan plou, arriba més aigua al riu. El riu pot arrossegar pedretes i dona aigua a les plantes.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            capes: [
              p('Els terratrèmols produeixen diferents tipus d’**ones sísmiques**. Les ones **P** poden travessar sòlids i líquids. Les ones **S** travessen sòlids, però es deixen de propagar quan arriben a un líquid. De la distribució de les ones que recullen molts detectors es pot deduir que hi ha una capa líquida a l’interior de la Terra.'),
              repte('De les dades a una explicació', 'En un model, dos detectors reben ones P. Només el detector situat al costat on ha tremolat la Terra rep ones S. Si l’altre detector és a l’altra banda del planeta, proposa una explicació. Per què voldries consultar registres de més llocs abans de donar-la per bona?'),
            ],
            moviment: [
              p('A la **dorsal atlàntica**, les plaques se separen. Hi puja material fos que es refreda i forma escorça oceànica nova. En canvi, a la costa occidental d’Amèrica del Sud, la placa oceànica de **Nazca** s’enfonsa sota la placa sud-americana. És la **subducció**, un procés que contribueix a formar els Andes.'),
              repte('Dos límits, dos paisatges', 'Dibuixa fletxes per representar els moviments a la dorsal i als Andes. Marca on s’afegeix escorça oceànica i on una placa s’enfonsa. Explica per què en tots dos casos es poden produir terratrèmols.'),
            ],
            gravetat: [
              p('Quan llances una pilota de costat, avança i alhora cau. La Lluna també avança mentre la gravetat de la Terra en corba la trajectòria. A la distància i la velocitat amb què es mou, continua girant al voltant de la Terra. Aquest moviment és una **òrbita**.'),
              repte('Dues fletxes per a la Lluna', 'Dibuixa la Terra i la Lluna. Traça una fletxa des de la Lluna cap a la Terra per indicar l’atracció, i una altra de costat per indicar cap on avança en aquell instant. Imagina que la Lluna perd de cop tot el seu moviment respecte de la Terra. Quina fletxa continuaria tenint sentit? Què li passaria?'),
            ],
            elements: [
              p('Una **conca hidrogràfica** és el territori on l’aigua s’escorre cap a un mateix riu, llac o punt de sortida. Una part de la pluja **s’infiltra** al sòl i una altra en corre per sobre. El pendent, el tipus de sòl, la vegetació i la quantitat d’aigua que ja hi ha al terreny influeixen en quant n’arriba al riu i amb quina rapidesa.'),
              repte('Compara dos vessants', 'Fes servir dues safates amb el mateix pendent i la mateixa quantitat de terra. Cobreix-ne una de vegetació i aboca el mateix volum d’aigua a totes dues. Què mesuraries per comparar l’aigua que hi baixa i el sòl que s’endú? Explica què hauries de mantenir igual per atribuir la diferència a la coberta vegetal.'),
            ],
          },
        },
      },
    },
    M002: {
      coordenades: {
        suport: {
          intro: 'Una boia envia dos nombres. Són la **latitud** i la **longitud**. Amb els dos nombres podem trobar-la en un mapa.',
          sections: {
            latitud: [
              p('Els **paral·lels** fan la volta a la Terra. L’equador és el paral·lel de **0°**. Separa la meitat nord de la meitat sud.'),
              p('La lletra **N** vol dir *nord* i la **S**, *sud*. Per trobar **20° N**, mira al nord de la línia de l’equador.'),
            ],
            longitud: [
              p('Els **meridians** uneixen els dos pols. El de Greenwich és el meridià de **0°**.'),
              p('La lletra **E** vol dir *est* i la **O**, *oest*. Per trobar **40° O**, mira a l’oest de la línia de Greenwich.'),
            ],
            localitzacio: [
              p('Busquem la boia **A** a **20° N, 40° O**.'),
              passos('Posa un dit sobre la línia de **20° N**. És un paral·lel.',
                'Posa un altre dit sobre la línia de **40° O**. És un meridià.',
                'Segueix les dues línies fins que els dits es trobin. Marca-hi el punt **A**.'),
              repte('Canvia només una coordenada', 'Si la boia passa de **20° N, 40° O** a **20° N, 20° O**, quina dada ha canviat? Busca la nova posició al punt **B**.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            latitud: [
              repte('Dos canvis de rumb', 'Des de **20° N, 40° O** imagina dos trajectes. El primer acaba a **10° N, 40° O**. El segon, a **20° N, 20° O**. Quin s’acosta a l’equador? Quin s’acosta a Greenwich? Digues quina coordenada es manté en cada trajecte.'),
            ],
            longitud: [
              p('A la mateixa latitud, un canvi de longitud ens fa seguir un paral·lel. Si canviem **10°** de longitud a prop d’un pol, recorrem menys distància que canviant **10°** a l’equador. Els paral·lels de prop dels pols són més petits.'),
              repte('Què passa al meridià de 180°?', 'Les longituds **180° E** i **180° O** corresponen al mateix meridià. Dues boies a **15° N** són a **179° E** i **179° O**. Quants graus de longitud les separen pel camí més curt? Situa-les a banda i banda del meridià de 180°.'),
            ],
            localitzacio: [
              p('Cada grau es pot dividir en **60 minuts d’arc**. Per exemple, **20° 30′ N** és a mig camí entre **20° N** i **21° N**. També es pot escriure **20,5° N**.'),
              repte('Quina precisió ens dona el mapa?', 'En un altre mapa, una boia és entre **20° N** i **21° N**, més a prop de la segona línia. És al nord o al sud de **20° 30′ N**? Amb aquesta informació, podries saber si és exactament a **20° 40′ N**? Justifica-ho.'),
            ],
          },
        },
      },
    },
    M003: {
      'mapes-i-planols': {
        suport: {
          intro: 'Has d’anar a la biblioteca d’un altre municipi. Primer hi vas en autobús. Després, a peu. Què et pot ajudar a trobar el camí?',
          sections: {
            definicions: [
              p('Al **mapa del municipi** hi ha la parada. Al **plànol del barri** hi ha els carrers i la biblioteca. Ara ets al barri i has de girar. Quin dibuix consultaràs?'),
            ],
            llegenda: [
              passos('Busca a la llegenda què volen dir les lletres **E** i **B**.', 'Troba les dues lletres al plànol.', 'Busca la fletxa amb una **N**. T’indica el **nord**.'),
              repte('Travessa el riu', 'Mira a la llegenda com es dibuixa el **pont**. Troba’l al plànol.'),
            ],
            escala: [
              p('Mira la **barra d’escala**. Va de **0 a 100 m**. Té dos trams iguals de **50 m**.'),
              passos('Busca la línia recta que va de l’escola a la biblioteca.', 'Compara-la amb la barra sencera. Quants metres hi ha en línia recta?', 'Segueix amb el dit el camí que va pels carrers. Té la mateixa llargada que la línia recta?'),
            ],
          },
        },
        ampliacio: {
          sections: {
            definicions: [
              p('Per mostrar tot un municipi en un full, cal triar quins elements s’hi dibuixen i amb quin detall. En un mapa, un poble es pot representar amb un punt. En un plànol, s’hi poden dibuixar els seus carrers. Aquesta simplificació s’anomena **generalització cartogràfica**.'),
              repte('El mateix municipi en un sol full', 'En el mapa municipal hi has de mantenir la informació que necessita algú que hi arriba en autobús. Quins dos elements conservaries del plànol del barri? Què simplificaries? Justifica la tria.'),
            ],
            llegenda: [
              p('En un mapa de pluja, un color pot representar un **interval**. Si el blau clar indica de **40 a menys de 60 mm**, dos llocs del mateix color poden haver rebut 42 i 57 mm de pluja.'),
              repte('A quin color correspon?', 'Una llegenda indica «de 0 a 20 mm» i «de 20 a 40 mm». Un poble ha rebut exactament **20 mm**. Reescriu la llegenda perquè cada valor entre 0 i 40 mm tingui un sol color.'),
            ],
            escala: [
              p('Si un camí fa revolts, pots resseguir-lo amb un fil. Després estira el fil i compara’l amb la barra d’escala. La distància obtinguda és una **estimació**.'),
              repte('Què passa si ampliem el plànol?', 'Un plànol a **1:5.000** s’imprimeix al **200 %**. El segment que representa 100 m passa de 2 a 4 cm. Quants metres representa ara cada centímetre de la còpia? Escriu la nova escala numèrica i explica per què la barra continua funcionant.'),
            ],
          },
        },
      },
    },
    M004: {
      'tipus-de-mapes': {
        suport: {
          intro: 'Imagina que prepares un viatge al Perú. Vols trobar una serralada, saber quins països hi ha al costat i veure on plou més. Quin mapa et pot ajudar en cada cas?',
          sections: {
            tipus: [
              repte('Tria un mapa', 'Vols trobar una serralada. Busca a la taula quin mapa mostra les muntanyes. Quin mapa triaries per saber on plou més?'),
            ],
            atles: [
              p('Busca el lloc per nom a l’**índex** de l’atles. Imagina que al costat d’«Andes» hi diu **pàgina 12, D4**.'),
              passos('Obre l’atles per la pàgina 12.', 'Busca la columna D i la fila 4. Es troben a la casella D4.'),
            ],
            lectura: [
              passos('Llegeix el **títol** per saber quin lloc mostra el mapa.', 'Busca la **fletxa del nord**. Si la trobes, fixa’t cap on apunta.', 'Tria un símbol i busca’l a la **llegenda**.', 'Si vols estimar una distància, consulta l’**escala**.'),
            ],
            fisic: [
              p('Busca **Amèrica del Sud** en un planisferi físic. Els **Andes** són una serralada que s’estén per l’oest del continent.'),
              p('Tria un color del relleu i busca què indica a la llegenda.'),
            ],
            politic: [
              p('Busca **Amèrica del Sud** al planisferi polític. Troba el **Perú** i ressegueix-ne la frontera amb el dit.'),
              repte('El mateix lloc en dos mapes', 'Torna a mirar el mapa físic. Quin mapa t’ha ajudat a trobar la serralada dels Andes? Quin t’ha ajudat a trobar la frontera del Perú?'),
            ],
          },
        },
        ampliacio: {
          sections: {
            tipus: [
              repte('Dos mapes de pluja', 'Un mapa mostra la pluja d’una setmana de juliol. Un altre mostra la pluja mitjana del juliol a partir de molts anys de dades. Quin consultaries per saber on sol ploure més al juliol? Què et diu l’altre?'),
            ],
            atles: [
              p('Si l’índex dona una sola casella, comença per allà. Després segueix la serralada per les caselles veïnes. En un mapa d’Amèrica del Sud podràs seguir el relleu amb més detall.'),
            ],
            lectura: [
              repte('Abans de comparar els colors', 'El blau fort representa **de 50 a menys de 100 mm** de pluja en un mapa i **de 100 a menys de 200 mm** en l’altre. Dos llocs tenen aquest color. Hi ha plogut igual? Què cal comprovar sobre les dates abans de comparar les dades?'),
            ],
            fisic: [
              p('Quan representem la Terra sobre un pla, fem servir una **projecció cartogràfica**. En la de Mercator, les terres properes als pols semblen molt més grans en comparació amb les de l’equador. Una **projecció equivalent** manté les proporcions de superfície, encara que canviï la forma dels continents.'),
              repte('Groenlàndia i Amèrica del Sud', 'Vols comparar la superfície de Groenlàndia amb la d’Amèrica del Sud. Quina de les dues projeccions triaries? Quin dels dos sembla més gran del que li correspon en la projecció de Mercator?'),
            ],
            politic: [
              p('Les fronteres poden seguir elements del paisatge, com un riu o una carena. El paisatge pot ser semblant a totes dues bandes del límit. La línia del mapa representa un límit entre territoris.'),
              repte('Una frontera entre muntanyes', 'Localitza Xile i l’Argentina al mapa polític. Et serviria el planisferi per dir per quin cim passa exactament la frontera? Quin mapa consultaries per comprovar-ho?'),
            ],
          },
        },
      },
    },
    M005: {
      'sistema-solar': {
        suport: {
          intro: 'La Terra és el nostre planeta. La Terra forma part del sistema solar. El sistema solar és dins d’una galàxia que es diu Via Làctia.',
          sections: {
            galaxia: [p('Completa en veu alta amb **Terra**, **sistema solar** i **Via Làctia**. «Vivim a la ___. El nostre planeta pertany al ___. Tot això és dins de la ___.»')],
            sistema: [p('El camí que fa un planeta al voltant del Sol és la seva **òrbita**. Busca el Sol al dibuix i ressegueix una òrbita amb el dit.')],
            planetes: [p('Els quatre planetes més propers al Sol són **rocosos**. Els altres quatre són **gegants**.'), repte('Els veïns de la Terra', 'Llegeix els noms en ordre. Quin planeta hi ha just abans de la Terra? I just després?')],
            'terra-lluna': [p('El Sol il·lumina la Lluna. Des de la Terra, de vegades en veiem un tros petit i de vegades la veiem gairebé rodona.'), repte('Qui gira al voltant de qui?', 'Digues quin cos gira al voltant del Sol i quin gira al voltant de la Terra.')],
            'altres-cossos': [p('Un **asteroide** sol ser rocós. Un **cometa** pot fer una cua prop del Sol. **Plutó** és un planeta nan.'), repte('La pista de la cua', 'Quin d’aquests cossos pot fer una cua quan s’acosta al Sol?')],
          },
        },
        ampliacio: {
          figures: [
            {
              id: 'distancies-ua', section: 'sistema', name: 'Distàncies al Sol', ratio: 15 / 4,
              src: 'illustracions/m005/distancies-ua.png', anchor: 'after', width: 100, position: 'center', wrap: false,
              alt: 'Regle de 0 a 30 unitats astronòmiques amb el Sol a 0, la Terra a 1 i Neptú aproximadament a 30.',
              caption: 'Una unitat astronòmica és aproximadament la distància mitjana de la Terra al Sol. Neptú és a prop de 30 UA del Sol.',
            },
          ],
          sections: {
            galaxia: [p('Com que som dins del disc de la Via Làctia, quan mirem al llarg del disc veiem la llum de moltes estrelles juntes. En un cel fosc, aquesta llum forma una banda clara.'), repte('Dues mirades', 'Per què veiem la Via Làctia com una banda des de la Terra i com una espiral en molts dibuixos?')],
            sistema: [repte('Un model d’òrbites', 'Si 1 cm representa la distància mitjana de la Terra al Sol, Neptú queda a uns 30 cm del Sol. Per què pot ser difícil dibuixar també els planetes amb aquesta mateixa escala?')],
            planetes: [p('Saturn té anells molt vistosos, però Júpiter, Urà i Neptú també en tenen. Els anells estan formats per partícules que orbiten el planeta.')],
            'terra-lluna': [p('La Lluna fa una volta al voltant de la Terra en uns 27 dies i alhora fa un gir sobre si mateixa. Per això ens mostra gairebé sempre la mateixa cara. El cicle de fases és una mica més llarg perquè, mentrestant, la Terra també es mou al voltant del Sol.'), repte('Prova amb una marca', 'Amb una pilota marcada, fes una volta al voltant d’un objecte mantenint la marca encarada cap a ell. Quantes vegades has hagut de girar la pilota sobre si mateixa?')],
            'altres-cossos': [p('Ceres és al cinturó d’asteroides. Plutó és al cinturó de Kuiper, més enllà de Neptú. Tots dos pertanyen al grup dels planetes nans encara que es trobin en regions molt diferents.')],
          },
        },
      },
    },
    M006: {
      'planisferi-fisic': {
        suport: {
          intro: 'Els colors d’aquest mapa ens donen pistes. Aprendrem a relacionar el color d’un lloc amb la seva altitud.',
          sections: {
            relleu: [p('En un mapa del món podem veure la forma dels continents i dels oceans. En aquest mapa, el blau indica l’aigua del mar.')],
            'colors-altitud': [p('A la llegenda, el verd més clar indica menys de **500 m**. El marró fosc indica **4.000 m o més**.'), passos('Busca una zona de verd clar al mapa.', 'Busca una zona de marró fosc.', 'Assenyala quina de les dues representa més altitud.')],
            'punts-altitud': [passos('Troba la lletra **A**. Mira el color de sota el punt.', 'Busca el mateix color a la llegenda i llegeix el seu interval d’altitud.', 'Fes el mateix amb **C**. Quin dels dos és en un tram d’altitud més alt?')],
          },
        },
        ampliacio: {
          sections: {
            relleu: [p('El canvi de color al dibuix es produeix en passar d’un interval a un altre. Al paisatge, l’altitud pot anar canviant a poc a poc sense cap tall visible.')],
            'colors-altitud': [repte('Just al límit', 'Assigna aquests dos llocs als seus intervals: un a **1.999 m** i l’altre a **2.000 m**. Què ens diu aquest cas sobre dos colors diferents?')],
            'punts-altitud': [repte('El gruix del gel', 'A Groenlàndia, el mapa mostra l’altitud de la superfície del gel. Si volguessis saber l’altitud del terreny que hi ha a sota, podries llegir-la en aquest mateix mapa? Explica quina dada hi falta.')],
          },
        },
      },
    },
    M007: {
      'planisferi-politic': {
        suport: {
          intro: 'En un mapa polític podem descobrir on és cada país. Després provarem com els colors ens ajuden a separar uns territoris dels altres.',
          sections: {
            fronteres: [p('Busca el requadre al planisferi. Hi ha la zona que veuràs més gran al mapa següent.')],
            veinat: [passos('Busca **Portugal** i **Espanya** al detall del mapa.', 'Posa el dit sobre la línia que tenen en comú.', 'Ara busca **França**. Troba amb quin dels altres dos països comparteix frontera.'), p('Imagina dues rajoles. Si les vores es toquen en un tram, necessiten colors diferents. Si només es toquen per una punta, poden repetir color.')],
            acoloreix: [passos('Al **mapa 1**, pinta A, B i C de tres colors diferents.', 'Al **mapa 2**, posa aquests mateixos colors a A, B i C.', 'Segueix la vora de **D**. Digues quins colors toca. Tria un color nou per a D.')],
          },
        },
        ampliacio: {
          sections: {
            fronteres: [p('El color d’un país depèn de les decisions de qui ha dibuixat el mapa. En un altre mapa el mateix país pot tenir un color diferent, amb la frontera al mateix lloc.')],
            veinat: [repte('Fes una llista de veïns', 'Escriu les parelles de regions veïnes del mapa 2. Hi ha cap parella que pugui repetir color? Usa la llista per justificar la resposta.')],
            acoloreix: [repte('Esborra una frontera', 'Imagina que A i D del mapa 2 s’uneixen en un sol territori i esborres el tram entre tots dos. Quants colors necessites ara? Dibuixa o explica quins territoris continuen sent veïns.')],
          },
        },
      },
    },
    M008: {
      'muntanyes-i-rius-europa': {
        suport: {
          intro: 'En un mapa d’Europa, els colors del relleu i les línies dels rius expliquen coses diferents. Podem llegir-los junts i seguir l’aigua fins on arriba.',
          sections: {
            'alps': [],
            'caucas': [],
            'plana': [],
            'danubi': [passos('Busca el Danubi en un mapa físic. Troba l’inici del seu recorregut.', 'Segueix la línia fins al mar Negre.')],
            'volga': [],
          },
        },
        ampliacio: {
          sections: {
            'caucas': [
              p('Els límits continentals s’acorden. Un PDF o un atles pot traçar la frontera convencional entre Europa i Àsia de manera diferent.'),
              repte('On s’acaba Europa?', 'Compara dos atles i explica com han tractat el Caucas. Quins elements físics es mantenen als dos mapes?'),
            ],
          },
        },
      },
    },
    M009: {
      'relleu-espanya': {
        suport: {
          intro: 'Si féssim un viatge des del centre de la península fins a la costa i les illes, passaríem per altiplans, serralades i depressions. On trobaríem cada paisatge?',
          sections: {
            'meseta': [passos('Busca la Meseta al centre del mapa.', 'Assenyala el Sistema Central. Digues quina submeseta queda al nord i quina al sud.')],
            'vores': [],
            'periferia': [],
            'ebre': [],
            'guadalquivir': [],
            'balears': [],
            'canaries': [],
          },
        },
        ampliacio: {
          sections: {
            'canaries': [
              p('Les formes volcàniques canvien amb l’erosió i es poden transformar amb noves erupcions.'),
              repte('Per què dues illes són tan diferents?', 'Compara les corbes de nivell d’una illa baixa i una de muntanyosa. Quines pistes utilitzes per saber quina té més desnivell?'),
            ],
          },
        },
      },
    },
    M010: {
      'costes-i-rius-espanya': {
        suport: {
          intro: 'Una gota d’aigua que cau a la Península pot acabar al Cantàbric, a l’Atlàntic o a la Mediterrània. El relleu ens dona pistes per explicar quin camí farà.',
          sections: {
            'rius': [],
            'costa': [],
            'cantabric': [passos('Busca el mar Cantàbric i el Nalón.', 'Compara amb el recorregut del Tajo. Quin triga més recorregut a arribar al mar?')],
            'mediterrani': [],
            'atlantic': [],
            'illes': [],
          },
        },
        ampliacio: {
          sections: {
            'illes': [
              p('Una conca petita amb pendent fort pot respondre ràpidament a una pluja intensa, encara que la llera sigui seca més dies de l’any.'),
              repte('Quan una llera seca porta aigua', 'Dibuixa dues conques amb pendents diferents i assenyala per on aniria l’aigua. Quina altra dada necessitaries per saber quina crescuda seria més gran?'),
            ],
          },
        },
      },
    },
    M011: {
      'relleu-catalunya': {
        suport: {
          intro: 'De nord a sud, Catalunya combina cims alts, depressions, altiplans i serres paral·leles al mar. Un recorregut dibuixat al mapa ens permet relacionar-los.',
          sections: {
            'pirineus': [passos('Troba la Pica d’Estats al nord.', 'Busca el Cadí i comprova a quin costat queda.')],
            'interior': [],
            'costaneres': [],
          },
        },
        ampliacio: {
          sections: {
            'interior': [
              p('Una plana es defineix pel poc desnivell. Un altiplà és una extensió relativament plana elevada respecte de l’entorn.'),
              repte('Una plana també pot ser alta', 'Compara en un mapa d’altituds el Moianès i una plana litoral. Quin significat tenen en cada cas els colors i les línies de nivell?'),
            ],
          },
        },
      },
    },
    M012: {
      'rius-costes-catalunya': {
        suport: {
          intro: 'El Segre, l’Ebre, el Ter i el Llobregat passen per paisatges molt diferents. Segueix-los al mapa i descobreix quins arriben al mar i quin desemboca en un altre riu.',
          sections: {
            'conques': [],
            'costes': [],
            'segre': [passos('Segueix el Segre fins que es trobi amb l’Ebre.', 'Ara segueix l’Ebre fins a la Mediterrània.')],
            'ebre': [],
            'ter': [],
            'llobregat': [],
          },
        },
        ampliacio: {
          sections: {
            'ebre': [
              p('Els sediments acumulen terra al delta. El mar també n’arrossega materials, i els embassaments poden retenir sediments riu amunt.'),
              repte('Un delta que canvia', 'Què pot passar en un tram de costa si li arriba menys sediment i les ones continuen actuant? Quines dues dades podries comparar per investigar-ho?'),
            ],
          },
        },
      },
    },
    M013: {
      'altitud-i-perfils': {
        suport: {
          intro: 'Dos camins poden començar i acabar a la mateixa altitud, però un pot fer una pujada molt més forta que l’altre. Les corbes de nivell i els perfils ens ajuden a triar.',
          sections: {
            'corbes': [],
            'perfil': [passos('Escriu els quatre quilòmetres en fila.', 'Anota a sobre 540, 660, 620 i 700 metres. Digues on l’altitud baixa.')],
            'excursio': [],
          },
        },
        ampliacio: {
          sections: {
            'perfil': [
              p('Si fas servir una escala vertical molt més gran que l’horitzontal, les mateixes costes semblaran més dretes al paper.'),
              repte('El gràfic pot exagerar el pendent', 'Dibuixa el primer quilòmetre del camí A i un segon perfil duplicant l’escala vertical. Què canvia al dibuix i què es manté al terreny?'),
            ],
          },
        },
      },
    },
    M014: {
      'conservar-paisatges': {
        suport: {
          intro: 'Quan un barri creix o un bosc rep moltes visites, el paisatge canvia. Podem observar què s’hi transforma i pensar com conservar els espais que compartim.',
          sections: {
            'canvis': [],
            'urbanitzacio': [],
            'proteccio': [],
            'accions': [passos('Tria un lloc prop de l’escola que vulguis cuidar.', 'Descriu un problema observable i una acció que hi puguem fer.')],
            'boscos': [],
          },
        },
        ampliacio: {
          sections: {
            'urbanitzacio': [
              p('Es pot avaluar una proposta de barri amb criteris com la superfície permeable, la connexió dels espais verds o l’ombra dels arbres.'),
              repte('Com comparem dos futurs?', 'Compara una plaça tota pavimentada amb una plaça amb arbres i espais de terra. Defineix un indicador mesurable per a un dia de pluja i un dia calorós.'),
            ],
          },
        },
      },
    },
    M015: {
      'temps-i-clima': {
        suport: {
          intro: 'Ens abriguem abans de sortir, però els pagesos també necessiten saber com solen ser les estacions de l’any. Són preguntes diferents i es responen amb dades diferents.',
          sections: {
            'temps': [],
            'clima': [passos('Classifica «aquest matí plou» i «els estius acostumen a ser secs».', 'Digues quina frase necessitaria dades de molts anys.')],
            'extrems': [],
          },
        },
        ampliacio: {
          sections: {
            'clima': [
              p('Dues localitats poden tenir la mateixa temperatura mitjana anual, amb estius i hiverns molt diferents.'),
              repte('Dues mitjanes iguals', 'Imagina dos llocs amb mitjana anual de 15 °C. Un té poca variació entre estacions i l’altre en té molta. Quines dades afegiries a la mitjana per distingir-los?'),
            ],
          },
        },
      },
    },
    M016: {
      'factors-del-clima': {
        suport: {
          intro: 'Dues poblacions poden estar a la mateixa latitud i tenir hiverns diferents. La latitud, el mar i les muntanyes hi influeixen alhora.',
          sections: {
            'factors': [],
            'latitud': [],
            'mar': [passos('Imagina dos pobles igual d’alts. Un és a la costa i l’altre lluny del mar.', 'A quin esperes menys diferència entre l’estiu i l’hivern?')],
            'relleu': [],
          },
        },
        ampliacio: {
          sections: {
            'relleu': [
              p('Una ombra pluviomètrica apareix sovint a sotavent d’una serralada. La direcció del vent és necessària per identificar-la.'),
              repte('La pluja a banda i banda', 'Tenim dues estacions a la mateixa altitud, a banda i banda d’una serra. Com comprovaries si la diferència de pluja es relaciona amb la direcció del vent?'),
            ],
          },
        },
      },
    },
    M017: {
      'zones-climatiques': {
        suport: {
          intro: 'D’una regió polar a una costa mediterrània canvien les temperatures i les pluges. Els mapes de clima i els climogrames ens permeten llegir aquests patrons de dues maneres.',
          sections: {
            'terra': [],
            'europa': [],
            'dades': [passos('Busca la línia de temperatura i les barres de precipitació en un climograma.', 'Assenyala el mes més càlid i el més plujós i explica quin traç has seguit.')],
          },
        },
        ampliacio: {
          sections: {
            'europa': [
              p('Un mapa de grans climes agrupa regions. Un climograma correspon a unes dades d’un lloc i un període concrets.'),
              repte('Llegim el mapa i el gràfic junts', 'Per comparar una estació costanera amb una del Pirineu, quines dades podrien ser diferents encara que totes dues siguin de latitud semblant?'),
            ],
          },
        },
      },
    },
    M018: {
      'climes-espanya-catalunya': {
        suport: {
          intro: 'En un mateix viatge per la Península i les illes podem trobar pluges regulars, estius secs o neu hivernal. Mirem com es reparteixen aquests patrons.',
          sections: {
            'atlantic': [],
            'subtropical': [],
            'muntanya': [passos('Busca la costa de Catalunya i els Pirineus.', 'On esperes més dies amb neu? Quina dada del relleu et fa pensar això?')],
            'interior': [],
            'litoral': [],
          },
        },
        ampliacio: {
          sections: {
            'interior': [
              p('«Mediterrani continentalitzat» descriu sectors mediterranis d’interior amb més contrast tèrmic. Una classificació agrupa i simplifica.'),
              repte('Una etiqueta té límits', 'Quines tres dades de dues estacions compararies per saber quina té més influència del mar?'),
            ],
          },
        },
      },
    },
    M019: {
      'vegetacio-espanya-catalunya': {
        suport: {
          intro: 'Un bosc humit, una pineda de muntanya i una màquia litoral poden assemblar-se de lluny i ser molt diferents de prop. L’aigua, les temperatures, el sòl i els usos humans hi tenen a veure.',
          sections: {
            'subtropical': [],
            'atlantic': [],
            'muntanya': [],
            'mediterrania': [passos('Imagina un estiu amb poca aigua.', 'Troba al text un tret de les fulles de les plantes mediterrànies que hi pot ajudar.')],
          },
        },
        ampliacio: {
          sections: {
            'atlantic': [
              p('Un prat pot semblar natural i haver estat mantingut durant anys per la sega o el pasturatge. També hi ha prats on no poden créixer arbres per les condicions del lloc.'),
              repte('Qui ha modelat aquest prat?', 'Proposa dues maneres de recollir pistes per distingir un prat de pastura d’un prat que queda per damunt del límit del bosc.'),
            ],
          },
        },
      },
    },
    M020: {
      'canvi-climatic-causes': {
        suport: {
          intro: 'El nostre planeta reté una part de l’energia que rep del Sol. Quan canvia la quantitat de gasos que hi ha a l’atmosfera, també canvia aquest equilibri.',
          sections: {
            'hivernacle': [],
            'canvi': [],
            'causes': [passos('Busca què s’allibera quan es crema carbó, petroli o gas.', 'Segueix la cadena amb fletxes: emissions, més gasos a l’atmosfera, augment de la temperatura.')],
            'efectes': [],
          },
        },
        ampliacio: {
          sections: {
            'canvi': [
              p('Un rècord de calor és una dada. Per detectar un canvi sostingut, els investigadors comparen sèries i estudien com canvia la freqüència de valors extrems.'),
              repte('Un rècord o una tendència', 'En dos períodes semblants, una estació registra 4 i 15 dies per damunt del mateix llindar. Què et suggereix? Quines comprovacions faries abans de generalitzar-ho a tota una regió?'),
            ],
          },
        },
      },
    },
  });
}
