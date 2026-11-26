window.variantsMaterials ??= {};

{
  const p = text => ({ type: 'paragraph', text });
  const passos = (...items) => ({ type: 'steps', items });
  const taula = (headers, rows, rowHeadingWidth) => ({ type: 'table', headers, rows, rowHeadingWidth });
  const repte = (title, text) => ({ type: 'note', title, text });

  Object.assign(window.variantsMaterials, {
    M001: {
      'planeta-terra': {
        suport: {
          intro: 'Vivim a la superfície de la Terra. A sota hi ha roca i metall. A la superfície i al seu voltant hi ha aigua, aire i vida.',
          sections: {
            capes: [
              p('Imagina un tall de la Terra, des de la superfície fins al centre. Hi veuríem tres capes principals.'),
              taula(['Capa', 'On és i com és?'], [
                ['Escorça', 'És la capa de fora. És prima i feta de roca.'],
                ['Mantell', 'És sota l’escorça. És la capa més gruixuda. La roca és molt calenta.'],
                ['Nucli', 'És al centre. Té una part de fora líquida i una part de dins sòlida.'],
              ], 24),
            ],
            moviment: [
              p('La capa rígida de fora de la Terra està trencada en grans peces. S’anomenen **plaques tectòniques**. Es mouen molt a poc a poc.'),
              passos('Dues plaques es poden **separar**.', 'Dues plaques poden **xocar**.', 'Dues plaques poden lliscar de costat.'),
              p('Si les roques es mouen de cop, el terra pot tremolar. Això és un **terratrèmol**.'),
            ],
            gravetat: [
              p('Deixa anar una pilota. Cau per la **gravetat**. Aquesta força estira els objectes cap al centre de la Terra.'),
              p('Tenim el centre de la Terra sota els peus. A l’altre costat del planeta, «avall» també apunta cap al centre.'),
            ],
            elements: [
              p('La Terra té parts que es relacionen. Pensa en el paisatge d’un riu.'),
              taula(['Part', 'Exemple'], [
                ['Geosfera', 'Les roques de la riba.'],
                ['Hidrosfera', 'L’aigua del riu.'],
                ['Atmosfera', 'L’aire que envolta la Terra.'],
                ['Biosfera', 'Les plantes i els animals del riu.'],
              ], 26),
              p('Quan plou, arriba més aigua al riu. El riu pot arrossegar pedretes i dona aigua a les plantes.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            capes: [repte('Una pista de l’interior', 'Dues vibracions d’un terratrèmol arriben en moments diferents al mateix detector. Explica per què estudiar com viatgen les vibracions pot donar pistes sobre materials que no veiem. Quins altres factors podrien influir en l’hora d’arribada?')],
            moviment: [repte('De centímetres a metres', 'Suposa que dues plaques se separen a un ritme constant de **4 cm cada any**. Calcula quant augmentarà la distància en cent anys. Explica com un moviment tan lent pot transformar el paisatge al llarg de milions d’anys.')],
            gravetat: [repte('Dos llocs, un mateix centre', 'Imagina dues persones en punts oposats del globus que deixen anar una pilota. Dibuixa les fletxes de la gravetat. Compara les direccions en el dibuix i explica com totes dues pilotes poden caure «avall».')],
            elements: [repte('Segueix el canvi', 'Imagina tres dies de pluja intensa. Ordena els canvis del paisatge començant pel cel. Relaciona el cabal del riu, el transport de roques i els llocs on viuen les plantes i els animals. Indica quina part de la Terra intervé en cada pas.')],
          },
        },
      },
    },
    M002: {
      coordenades: {
        suport: {
          intro: 'Per trobar un lloc en un mapa fem servir dues dades. Són la **latitud** i la **longitud**.',
          sections: {
            latitud: [
              p('Els **paral·lels** són línies imaginàries. L’**equador** és el paral·lel de **0°**. Separa la meitat nord i la meitat sud de la Terra.'),
              p('La **latitud** indica els graus al nord (**N**) o al sud (**S**) de l’equador. Per exemple, **20° N** és al nord de l’equador.'),
            ],
            longitud: [
              p('Els **meridians** són línies imaginàries que van d’un pol a l’altre. El de **Greenwich** marca **0°**.'),
              p('La **longitud** indica els graus a l’est (**E**) o a l’oest (**O**) de Greenwich. Per exemple, **40° O** és a l’oest de Greenwich.'),
            ],
            localitzacio: [
              p('Busquem una boia a **20° N, 40° O**.'),
              passos('Busca la línia de **20° N**. És un paral·lel.', 'Busca la línia de **40° O**. És un meridià.', 'Marca el punt on es creuen les dues línies. Allà hi ha la boia.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            latitud: [repte('Dues ciutats en un mateix paral·lel', 'Imagina dues ciutats a **30° N**, una a l’est i l’altra a l’oest de Greenwich. Dibuixa-les en un globus esquemàtic. Quina coordenada comparteixen? Explica per què encara no en saps la posició exacta.')],
            longitud: [repte('Meridians que es troben', 'Ressegueix dos meridians des de l’equador fins a un pol. Com varia la separació entre tots dos? Explica per què els mateixos graus de longitud no sempre corresponen a la mateixa distància sobre la Terra.')],
            localitzacio: [repte('Dues boies', 'La primera boia és a **20° N, 40° O**. La segona és a **20° N, 30° O**. Dibuixa la posició aproximada de la segona a la mateixa graella i indica quina queda més a prop de Greenwich. Explica quina dada ho demostra.')],
          },
        },
      },
    },
    M003: {
      'mapes-i-planols': {
        suport: {
          intro: 'Amb un mapa podem veure un territori des de dalt. Per veure amb detall un lloc petit, com el barri de l’escola, podem fer servir un plànol.',
          sections: {
            definicions: [
              p('Un **mapa** representa un territori en petit. Per exemple, un mapa de Catalunya mostra pobles, rius i muntanyes.'),
              p('Un **plànol** mostra un lloc més petit amb més detall. Al plànol de l’escola pots trobar les aules, les portes i les escales.'),
            ],
            llegenda: [
              p('La **llegenda** explica què volen dir els símbols i els colors d’un mapa o un plànol.'),
              p('Si la llegenda diu que **E** és l’escola, busca el símbol **E** al plànol. El trobaràs al lloc on hi ha l’escola.'),
            ],
            escala: [
              p('L’**escala** ens ajuda a saber quina distància real representa una distància del dibuix.'),
              p('Si **1 cm** al paper representa **100 m** al carrer, **2 cm** representen **200 m**.'),
              p('L’**escala gràfica** és una barra amb nombres. Pots comparar la llargada de la barra amb la distància que vols mesurar.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            definicions: [repte('Dues mirades sobre el mateix lloc', 'Vols preparar un viatge amb autobús fins a una altra ciutat i, després, anar a peu fins a la biblioteca. Explica quina informació necessites per a cada tram i quin tipus de representació buscaries.')],
            llegenda: [repte('Dissenya una llegenda', 'Dibuixa un plànol amb un riu, un itinerari, una escola i un parc. Dona a cada element una forma o un patró propi. Explica com el lector els podrà distingir si imprimeix el plànol en blanc i negre.')],
            escala: [repte('Quan ampliem el paper', 'Un plànol a **1:10.000** s’amplia al **200 %**. Si abans **1 cm** eren **100 m**, quina distància real representa ara **1 cm**? Justifica per què la barra gràfica continua funcionant si també s’ha ampliat.')],
          },
        },
      },
    },
    M004: {
      'tipus-de-mapes': {
        suport: {
          intro: 'Hi ha mapes de muntanyes, de països i fins i tot de trens. Abans de buscar un mapa, pensa què vols saber.',
          sections: {
            tipus: [
              taula(['Mapa', 'Què mostra?'], [
                ['Físic', 'Muntanyes, planes i rius.'],
                ['Polític', 'Països, fronteres i capitals.'],
                ['Topogràfic', 'Pendents del terreny i camins.'],
                ['Temàtic', 'Un tema, com el transport o la pluja.'],
              ], 25),
            ],
            atles: [
              p('Un **atles** és un conjunt de mapes. Pot ser de paper o digital. Consulta l’índex per trobar el mapa d’un lloc.'),
            ],
            lectura: [
              passos('Llegeix el **títol** per saber què mostra el mapa.', 'Busca el **nord** per orientar-te.', 'Consulta la **llegenda** per entendre els símbols.', 'Fes servir l’**escala** per saber les distàncies.'),
            ],
            fisic: [
              p('Un **planisferi** és un mapa de tot el món. El planisferi **físic** mostra continents, oceans, muntanyes i rius.'),
              p('Busca els **Andes** a l’oest d’Amèrica del Sud. Consulta la llegenda per saber què indiquen els colors.'),
            ],
            politic: [
              p('El planisferi **polític** mostra els països i les seves fronteres. Els colors separen països. Un punt pot indicar una ciutat.'),
              p('Torna a mirar la zona dels Andes i busca-hi el nom d’un país.'),
            ],
          },
        },
        ampliacio: {
          sections: {
            tipus: [repte('Tria dos mapes', 'Vols preparar una excursió i saber en quins trams t’hauràs d’esforçar més i si hi arribaràs en tren. Indica quins dos mapes consultaries. Explica com llegiries els pendents i el recorregut de la línia.')],
            atles: [repte('Del riu als estats', 'Tria un riu que aparegui en un atles. Indica quina informació en treus del mapa físic i quina del polític. Explica per què és útil buscar el mateix tram als dos mapes.')],
            lectura: [repte('Quin mapa et serveix avui?', 'Et donen dos mapes d’autobús de la mateixa ciutat amb dates diferents. Fixa’t en la llegenda, la data i qui els ha fet. Explica com decidiries quin consultar i quina informació encara et caldria comprovar.')],
            fisic: [repte('Del globus al paper', 'Compara la forma d’un continent en un globus i en dos mapamundis diferents. Identifica alguna diferència de proporció que es vegi a simple vista. Explica com es relaciona amb la projecció de cada mapa.')],
            politic: [repte('Una serralada compartida', 'Ressegueix els Andes al mapa físic. Al polític, localitza dos països que travessa la serralada. Escriu una frase que diferenciï el límit d’un estat del relleu d’un territori.')],
          },
        },
      },
    },
  });
}
