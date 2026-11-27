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
              ], 24),
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
              ], 26),
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
            definicions: [
              p('Un mapa selecciona informació. En passar d’un plànol detallat a un mapa que cobreix més territori, pot caldre simplificar el traçat del riu, deixar carrers fora o representar una ciutat amb un punt. Aquesta tria s’anomena **generalització cartogràfica**.'),
              repte('Un full per a tot el municipi', 'Un plànol del centre aplega tots els carrers i portes dels edificis. Si vols encabir tot el municipi en un full de la mateixa mida, explica què conservaries per orientar algú que hi arriba en autobús i què simplificaries.'),
            ],
            llegenda: [
              p('Les llegendes també poden agrupar valors amb **intervals**. Per exemple, si un mapa de pluja d’un mes pinta amb el mateix blau les zones de **40 a menys de 60 mm**, dos llocs de color igual poden haver rebut 42 i 57 mm. El color ens ajuda a comparar zones, però només ens dona un rang.'),
              repte('Revisa la llegenda', 'En un mapa de pluja, algú ha escrit «0–20 mm» i «20–40 mm» com a categories. On posaries un lloc que ha rebut exactament **20 mm**? Reescriu les categories perquè es pugui decidir en tots els casos.'),
            ],
            escala: [
              p('Un regle dona la distància en línia recta. Per mesurar un camí amb revolts al paper, pots resseguir-lo amb un fil, estirar el fil i mesurar-lo. Després converteix la mesura amb l’escala del mapa. Amb revolts petits o un traç gruixut, el resultat és una estimació.'),
              repte('Mesura dues distàncies', 'En un mapa a **1:25.000**, entre dos refugis mesures **2,4 cm** en línia recta i **3,6 cm** seguint el sender. Calcula les dues distàncies reals i la diferència. Quina faries servir per estimar el temps de l’excursió?'),
            ],
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
            tipus: [
              p('Un mapa temàtic pot mostrar el **total** d’habitants de cada municipi o la **densitat de població**, que relaciona habitants i superfície. Un municipi molt extens pot tenir més persones en total i, alhora, menys habitants per quilòmetre quadrat.'),
              repte('El mateix tema, resultats diferents', 'Un municipi té **1.600 habitants** en **8 km²** i un altre en té **900** en **3 km²**. Quin destaca si pintem el mapa segons el total? I si dividim els habitants pels quilòmetres quadrats? Explica quin mapa triaries per comparar com de densament poblat està cada territori.'),
            ],
            atles: [
              p('Pots relacionar mapes de l’atles localitzant el mateix punt a cada un. Si estudies un riu, segueix el curs pel mapa físic i situa al polític les poblacions a prop de la llera. Un mapa temàtic de pluges pot aportar una tercera dada sobre la conca.'),
              repte('Organitza la consulta', 'Vols investigar per què un poble a prop de la desembocadura pot rebre més aigua després de pluges que han caigut lluny. Tria quins mapes consultaries i ordena la cerca. Digues quina dada hauries de comprovar fora de l’atles per saber si el cabal va augmentar aquell dia.'),
            ],
            lectura: [
              p('En un mapa topogràfic, l’**equidistància** és el desnivell entre dues corbes de nivell consecutives. Si compares dos mapes, comprova l’equidistància i l’escala. La separació de les línies al paper, tota sola, no permet afirmar quin camí fa més pendent.'),
              repte('Compara dos pendents', 'Dos camins de la mateixa llargada horitzontal creuen cinc intervals. En el primer mapa cada interval val **10 m** d’altitud i en el segon en val **20**. Si en tots dos casos el camí puja tota l’estona, calcula el desnivell de cada camí i explica quin fa més pendent.'),
            ],
            fisic: [
              p('En un mapamundi amb la projecció de **Mercator**, les superfícies s’engrandeixen molt a mesura que ens acostem als pols. Per comparar la mida de dues regions, és més adient una **projecció equivalent**, que manté les proporcions de superfície encara que en canviïn les formes.'),
              repte('Tria la projecció per comparar', 'Vols comparar la superfície de dues illes, una propera al tròpic i l’altra a prop de l’Àrtic. En un mapa de Mercator semblen iguals. Explica per què aquesta observació no és suficient i quin tipus de mapamundi consultaries.'),
            ],
            politic: [
              p('Les fronteres són límits entre territoris. Poden seguir un riu o una serralada, o bé passar per zones on el paisatge continua a banda i banda. Alguns mapes fan servir un traç diferent quan un límit és disputat. Per interpretar-lo, cal mirar què indica la llegenda i qui ha publicat el mapa.'),
              repte('Dues línies sobre un riu', 'Un mapa marca la frontera amb una línia contínua i un altre la marca amb ratlles al mateix tram. Explica què consultaries per saber si és una diferència de dibuix o si els dos mapes tenen criteris diferents sobre el límit.'),
            ],
          },
        },
      },
    },
  });
}
