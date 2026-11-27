# Encàrrec d’il·lustracions de Món a mà

**Pilot · La Terra i els mapes · 5è de primària**

Cada encàrrec indica quantes **figures diferents** calen per apartat i quins **lots d’estil** cal lliurar. Una figura que es repeteix en tres estils compta com tres fitxers. Una fotografia o una graella compartida compta una sola vegada. Els lots visuals són independents de les variants de lectura Suport, Base i Ampliació.

## Pauta general

Per a cada tema, acorda els lots, les figures que comparteixen i les referències abans de començar. Cada sèrie ha de poder-se emprar com un lot complet, amb una composició i una retolació pròpies que siguin coherents de la primera imatge a l’última. Per a cada figura, anota l’ID de l’apartat, l’ordre, què ha de veure o fer l’alumnat, les etiquetes literals i els fitxers per lot.

- **Ordre dels lots.** Presenta els estils del més esquemàtic al més detallat o realista. L’última imatge disponible de cada figura és la que s’obre per defecte a la fitxa. Situa al final l’estil que vulguis que s’hi mostri d’entrada, per exemple Pla, Volum, Realista.
- **Finalitat.** Fes il·lustracions que ajudin l’alumnat de 10–11 anys a entendre o aplicar el que explica el text. Fes evident d’un cop d’ull què s’ha d’observar.
- **Estil.** Atles escolar contemporani. Fons blanc llis, formes netes, línia fina però visible, masses de color suaus i contorns foscos. Fes servir blau per a l’aigua, verd i ocre per al terreny i un accent teula per destacar un element. Mantén la coherència amb la referència escollida. Reserva la fotografia o la textura per als encàrrecs que les demanin.
- **Lectura impresa.** Comprova cada imatge a escala real en un A4 vertical, a l’amplada que li correspon pel seu ordre dins de l’apartat. Fes servir una tipografia de pal sec amb accents correctes. Pren 11–13 pt com a punt de partida per als rètols i mantén les etiquetes clau a 9 pt o més. Combina el color amb el gruix del traç, els patrons o els símbols perquè la figura també es pugui interpretar en grisos.
- **Retolació.** Dimensiona els noms, els números i les llegendes per a l’amplada final abans de dibuixar la figura. Si una figura passa del 50 % al 100 %, reajusta la capa de text perquè els rètols mantinguin el cos previst a l’A4. Fes servir els literals catalans indicats i deixa un marge net al voltant del contingut. La fitxa ja hi posa el peu i el títol.
- **Precisió.** Construeix les graelles i els plànols amb geometria controlada. Munta els mapes geogràfics a partir de dades verificables. Pots generar motius purament visuals quan el brief ho indiqui. Per als elements que expressen posició, escala, relleu o fronteres, dibuixa o renderitza les dades i valida-les abans d’exportar.
- **Lliurament.** Exporta la il·lustració en PNG RGB amb perfil sRGB. Conserva en SVG els esquemes vectorials que hagin de mantenir traços i text nítids. Per a una fotografia, conserva el JPEG i anota font, autoria i permís d’ús. Lliura miniatures lleugeres per als selectors quan es demanin. Les rutes parteixen de l’arrel del repositori `mon-a-ma`. Crea la carpeta si cal. Mantén els noms i les ubicacions exactes. L’encàrrec és de producció d’imatges. La incorporació de les rutes al catàleg i la publicació són passos posteriors.

## Fitxers i encaix a les fitxes

En un A4 vertical amb marges laterals de 20 mm, l’amplada útil és de 170 mm.

| Ordre dins de cada apartat | Amplada útil per defecte | Amplada impresa | Amplada orientativa del PNG |
| --- | --- | --- | --- |
| Primera figura | 100 % | 170 mm | 2.000 px |
| Segona figura i següents | 50 % | 85 mm | 1.000 px |

Les figures complementàries alternen esquerra i dreta i s’ancoren a un paràgraf amb text envoltant, si n’hi ha un de disponible. A les resolucions de la taula, un cos de 12 pt a la impressió correspon a uns 50 px al fitxer. Si les dimensions de l’arxiu són diferents, reajusta el cos proporcionalment i comprova’l a l’amplada impresa.

| Fitxa | Figures diferents | Lots i arxius previstos |
| --- | --- | --- |
| M001 · El planeta Terra | 6, quatre principals i dos complements | 3 lots de 5 figures (Pla, Volum i Realista) i una fotografia compartida. 16 originals. |
| M002 · Les coordenades geogràfiques | 4 principals i 1 exemple de joc opcional | 2 estils per globus, 2 versions de la graella de les boies i 2 figures de la flota. 8 PNG. |
| M003 · Els mapes i els plànols geogràfics | 3, canvi d’enquadrament, llegenda i escala | 3 lots de 3 figures (Pla, Atles escolar i Vista aèria il·lustrada) amb una mateixa geometria de barri. |
| M004 · Els tipus de mapes | 8, cinc principals i tres complements | 2 lots de 3 figures i 5 peces compartides. 11 originals i 6 miniatures. |

| Fitxa | Apartat · ID de figura | Fitxers dins de docs/illustracions/ |
| --- | --- | --- |
| M001 | capes · capes | capes.png · m001/capes.png · m001/capes-realista.png |
| M001 | moviment · reserva-moviment | m001/moviment-pla.png · m001/moviment-volum.png · m001/moviment-realista.png |
| M001 | moviment · falla-san-andreas | m001/falla-san-andreas.jpg, complement compartit |
| M001 | gravetat · reserva-gravetat | m001/gravetat-pla.png · m001/gravetat-volum.png · m001/gravetat-realista.png |
| M001 | elements · reserva-elements | m001/elements-pla.png · m001/elements-volum.png · m001/elements-realista.png |
| M001 | elements · arrels-i-erosio | m001/arrels-i-erosio.png · m001/arrels-i-erosio-volum.png · m001/arrels-i-erosio-realista.png |
| M002 | latitud · reserva-latitud | m002/parallels-pla.png · m002/parallels-volum.png |
| M002 | longitud · reserva-longitud | m002/meridians-pla.png · m002/meridians-volum.png |
| M002 | localitzacio · graella | m002/graella-boies.png · m002/graella-boies-planisferi.png |
| M002 | localitzacio · troba-la-flota | m002/troba-la-flota.png, tauler de joc |
| M002 | localitzacio · troba-la-flota-exemple | m002/troba-la-flota-exemple.png, exemple opcional |
| M003 | definicions · reserva-definicions | m003/municipi-i-barri.png · m003/municipi-i-barri-atles.png · m003/municipi-i-barri-aeria.png, 2.160 × 900 px per imatge |
| M003 | llegenda · barri | m003/planol-barri.png · m003/planol-barri-atles.png · m003/planol-barri-aeria.png, 2.100 × 1.000 px per imatge |
| M003 | escala · reserva-escala | m003/distancies-barri.png · m003/distancies-barri-atles.png · m003/distancies-barri-aeria.png, 2.250 × 900 px per imatge |
| M004 | Vegeu la taula del [lot M004](#m004--els-tipus-de-mapes) | `m004/` i `m004/miniatures/` |

## M001 · El planeta Terra

### Lots d’estil

- **Pla · Esquema pla.** Pren com a referència docs/illustracions/capes.png. Usa vistes frontals o de perfil, contorns nets i masses planes. Les línies guia i les fletxes han de destacar.
- **Volum · Il·lustració amb volum.** Pren com a referència docs/illustracions/m001/capes.png. Usa perspectiva obliqua, superfícies visibles i llum suau.
- **Realista · Il·lustració realista.** Pren com a referència docs/illustracions/m001/capes-realista.png. Alterna textures naturals i escenes recreades segons la figura. En gràfics amb fletxes i etiquetes, prioritza la precisió i la lectura impresa.
- Mantén el concepte, els elements identificats i la jerarquia visual als tres lots. Fes servir la foto de la falla com a complement compartit.

### Capes de la Terra · Referències disponibles

En pla, el disc mostra quatre zones concèntriques. Amb volum, l’esfera té una porció petita retirada, aproximadament un setzè, com un tall de pastís que deixa veure l’interior. Identifica «Escorça», «Mantell», «Nucli extern» i «Nucli intern». El mantell és la franja més gruixuda i l’escorça la més prima. El peu de la fitxa explica que els gruixos no són a escala. [Referència científica de l’USGS](https://pubs.usgs.gov/gip/dynamic/inside.html).

### Moviment de les plaques · `reserva-moviment`

**Què ha de veure l’alumne.** Dues plaques poden separar-se, acostar-se o lliscar lateralment. Les fletxes expliquen el moviment relatiu.

**Composició.** Fes tres vinyetes equiamples en l’ordre «Se separen», «S’acosten» i «Lliscament lateral». Dibuixa dos blocs de litosfera per vinyeta i marca’n el límit amb un traç visible. En les dues primeres, les fletxes s’allunyen o apunten l’una cap a l’altra, perpendiculars al límit. En la tercera, les fletxes apunten en direccions oposades i són paral·leles al límit. Usa una lleugera serralada a la segona vinyeta per mostrar un possible resultat de la col·lisió.

**Pla.** Fes una vista de planta en les tres vinyetes i marca la serralada amb un perfil senzill o símbols a la zona de contacte.

**Volum.** Fes tres blocs vistos en perspectiva obliqua amb llesques de roca visibles al davant. En la tercera vinyeta, deixa prou visible la superfície superior per llegir les fletxes de costat.

**Peu proposat.** «Les plaques tectòniques poden separar-se, acostar-se o lliscar de costat.»

**Comprovació.** Es poden seguir amb el dit les sis fletxes i distingir els tres moviments en grisos a l’amplada completa.

**Complement compartit.** La fotografia de la falla de San Andreas mostra la traça superficial del límit entre plaques a la plana de Carrizo. Conserva el crèdit de Scott Haefner (USGS) i la referència de domini públic. [Fitxa original de l’USGS](https://www.usgs.gov/media/images/view-san-andreas-fault).

### La gravetat de la Terra · `reserva-gravetat`

**Què ha de veure l’alumne.** «Avall» apunta cap al centre de la Terra des de qualsevol punt de la superfície.

**Composició.** Mostra una Terra amb tres figures o pilotes situades just per sobre de la superfície, ben separades al voltant de la silueta. Fes que les tres fletxes apuntin radialment des de les pilotes cap al mateix punt central, marcat i retolat «Centre». Situa els peus de les figures cap a la superfície allà on n’hi hagi. Dona a les figures i les pilotes una mida simbòlica perquè es distingeixin a la impressió.

**Pla.** Usa un cercle amb continents esquemàtics i un punt central. Inclou una pilota a dalt, una a un costat i una a baix.

**Volum.** Usa un globus amb la llum i la perspectiva de la referència. Mantén el punt central i les fletxes llegibles sobre el globus amb un filet clar o una petita secció que permeti veure el centre. Conserva les tres direccions radials.

**Peu proposat.** «En qualsevol punt de la superfície, la gravetat atrau els objectes cap al centre de la Terra.»

**Comprovació.** Les prolongacions de les tres fletxes coincideixen en el punt «Centre», i la fletxa de sota apunta cap amunt en el paper.

### Els elements del planeta Terra · `reserva-elements`

**Què ha de veure l’alumne.** Al paisatge del riu interactuen la roca, l’aigua, l’aire i els éssers vius.

**Composició.** Fes una sola escena que inclogui un vessant rocós, un riu que hi baixa, aire visible al cel amb un núvol de pluja i dues o tres plantes a la riba. Etiqueta «Geosfera» amb una guia a la roca, «Hidrosfera» cap a l’aigua del riu, «Atmosfera» cap a l’aire del cel i «Biosfera» cap a la vegetació. Mostra que l’aigua recull petits fragments de roca, amb dos o tres còdols visibles al llit del riu.

**Pla.** Fes una vista de perfil del paisatge amb dues o tres formes per concepte i guies netes.

**Volum.** Fes el mateix paisatge en perspectiva obliqua, com una secció de terreny amb un riu que entra des del vessant i recorre la vall. Diferencia el cel del terreny amb la llum i la profunditat.

**Peu proposat.** «El riu connecta l’aigua, les roques, l’aire i els éssers vius.»

**Comprovació.** Cada guia acaba en un element inequívoc. Es pot resseguir el riu des del vessant fins a la riba amb vegetació.

**Complement en tres estils.** Compara dos vessants amb el mateix pendent i la mateixa pluja. Mostra la terra que arriba al recipient de cada vessant i deixa les arrels visibles al tall del sòl. Les partícules són indicatives. Fes servir la il·lustració principal per identificar les parts de la Terra i aquest complement per observar com interactuen.

## M002 · Les coordenades geogràfiques

Les quatre figures principals i l’exemple opcional estan disponibles a Suport, Base i Ampliació. Fes que les etiquetes i els punts de referència es puguin llegir a A4 i en escala de grisos. [Referència de la NOAA sobre paral·lels i meridians](https://oceanservice.noaa.gov/education/tutorial_nautical_charts/nautical_charts02_information_2b.html).

### Els paral·lels en un globus

Mostra el globus amb el pol nord a dalt i el pol sud a baix. Identifica «Equador · 0°» i ressalta el paral·lel «20° N», al nord de l’equador. Inclou com a mínim un paral·lel al sud i fes visible com s’escurcen els cercles cap als pols.

### Els meridians en un globus

Repeteix l’orientació del primer globus. Dibuixa meridians que s’uneixen als dos pols i marca «Greenwich · 0°». Assenyala «40° O» a l’oest de Greenwich i un meridià a l’est. Conserva només les etiquetes necessàries per identificar el 0° i llegir les direccions.

### Graella de les boies

Dibuixa una graella didàctica rectangular amb el nord a dalt i l’oest a l’esquerra. Posa les etiquetes de longitud al marge superior i les de latitud al marge esquerre. Marca l’equador i Greenwich amb traços de referència distintius i etiqueta els dos 0°.

| Eix | Etiquetes en l’ordre visual |
| --- | --- |
| Longitud, d’esquerra a dreta | 80° O · 60° O · 40° O · 20° O · 0° · 20° E · 40° E |
| Latitud, de dalt a baix | 40° N · 20° N · 0° · 20° S · 40° S |

Marca «A» a **20° N, 40° O**, «B» a **20° N, 20° O** i «C» a **20° S, 20° E**. Ressalta el recorregut fins a A amb un traç discontinu. Marca B i C només amb la lletra al costat del punt. L’alumnat en deduirà les coordenades a partir de les etiquetes dels marges de la graella. C és un lloc de pràctica i es representa amb un punt.

### Troba la flota

A tota l’amplada de la fitxa, posa dues graelles buides idèntiques de costat, amb els títols «La meva flota» i «Els meus intents». Cada graella té set meridians de **60° O** a **60° E** i cinc paral·lels de **40° N** a **40° S**, en passos de 20°. Diferencia l’equador i Greenwich i deixa prou espai a cada encreuament per marcar-hi un vaixell o registrar-hi un intent. Les regles van al peu de la figura.

L’exemple opcional assenyala el vaixell 1 a 20° S, 40° E i planteja que l’alumnat trobi el vaixell 2. Si s’activa, es mostra abans del tauler buit.

## M003 · Els mapes i els plànols geogràfics

Les tres imatges comparteixen un barri imaginari, orientat amb el nord cap amunt. L’escola i la biblioteca són a l’oest del riu i el parc és a l’est. Conserva els carrers, els símbols i la posició d’aquests elements quan passis d’una imatge a l’altra. Traça el barri en metres abans d’exportar i mantén les proporcions quan en facis un retall.

### Del mapa del municipi al plànol del barri

Mostra dos dibuixos de costat. Al mapa del municipi, inclou una carretera, la línia d’autobús i la parada que deixa més a prop de la biblioteca. Un requadre identifica el barri ampliat. Al plànol del barri, repeteix la parada i la biblioteca en la posició corresponent. Mostra prou carrers per seguir el tram a peu. Retola «Mapa del municipi» i «Plànol del barri».

### Plànol del barri

Fes servir una vista zenital i una llegenda separada. Identifica el nord amb una fletxa i la lletra «N». Dibuixa el riu de nord a sud i un carrer que el travessa per un pont. La llegenda i el plànol fan servir aquests mateixos símbols.

| Element | Símbol |
| --- | --- |
| Escola | Quadrat amb «E» |
| Biblioteca | Quadrat amb «B» |
| Parc | Zona amb ratllat i arbres esquemàtics |
| Pont | Dues vores que marquen el pas sobre el riu |
| Riu | Banda amb vores ondulades |
| Parada d’autobús | Pictograma d’autobús |

### De l’escola a la biblioteca

Fes servir el mateix plànol per comparar un segment recte i un itinerari a peu. Separa horitzontalment **100 m** els centres dels símbols E i B i situa’ls a la mateixa alçada. El camí té tres trams. Des d’E va **50 m al nord**, **100 m a l’est** i **50 m al sud** fins a B. Dibuixa carrers accessibles en els tres trams. Diferencia el segment recte i l’itinerari amb línies o patrons que es distingeixin en grisos, i posa una clau que identifiqui els dos traços.

La barra d’escala retola **0**, **50** i **100 m** amb dos trams iguals. La barra sencera ha de mesurar el mateix que el segment E–B i que el tram horitzontal de l’itinerari. Els dos trams verticals han de mesurar la meitat. L’alumnat dedueix les distàncies a partir de la barra. Comprova que els resultats són **100 m en línia recta** i **200 m pel camí**. Mantén la barra unida al dibuix en redimensionar-lo. [Referència de l’ICGC sobre l’escala cartogràfica](https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Escala).

## M004 · Els tipus de mapes

**Encàrrec prioritari.** Treballa a partir de la [fitxa de Món a mà](https://monama.ortogra.fi/#M004). El Perú i els Andes són el fil conductor de Suport, Base i Ampliació. Prepara cinc figures principals, una per apartat, i tres complements. Els dos planisferis són una parella i s’han de lliurar junts. La primera figura de la secció `tipus` també servirà com a imatge de la targeta del catàleg.

### Lots, mides i noms

| Ordre dins de l’apartat | Apartat · ID de figura | Amplada prevista | Fitxers dins de `docs/illustracions/m004/` |
| --- | --- | --- | --- |
| Principal | tipus · `quatre-mapes-peru` | 170 mm · 2.600 × 1.600 px | `quatre-mapes-peru-pla.png`, `quatre-mapes-peru-atles.png` |
| Complement | tipus · `corbes-de-nivell` | 85 mm · 1.300 × 850 px | `corbes-de-nivell.png` |
| Principal | atles · `atles-andes-d4` | 170 mm · 2.600 × 1.150 px | `atles-andes-d4.png` |
| Principal | lectura · `llegendes-trac-puntejat` | 170 mm · 2.600 × 1.050 px | `llegendes-trac-puntejat.png` |
| Principal | fisic · `planisferi-fisic` | 170 mm · 2.600 × 1.300 px | `planisferi-fisic-pla.png`, `planisferi-fisic-atles.png` |
| Complement | fisic · `canon-colca` | 85 mm · 2.200 × 1.463 px | `canon-colca.jpg` |
| Complement opcional per al repte d’Ampliació | fisic · `comparativa-projeccions` | 170 mm · 2.600 × 1.500 px | `comparativa-projeccions.png` |
| Principal | politic · `planisferi-politic` | 170 mm · 2.600 × 1.300 px | `planisferi-politic-pla.png`, `planisferi-politic-atles.png` |

- **Pla**, primera opció. Masses planes, línies precises, fons blanc i llegendes de contrast alt.
- **Atles amb textura**, opció per defecte. Conserva el mateix mapa, les mateixes dades i la mateixa retolació. Afegeix un ombrejat discret derivat del relleu al mapa físic i tintes suaus sobre fons blanc al polític i a la làmina de quatre mapes. Mantén les fronteres i els símbols nítids. Conserva l’enquadrament dels dos lots perquè es puguin combinar en una mateixa fitxa.
- Lliura **11 originals** i les **sis miniatures** de les figures amb dos estils. Les miniatures són JPEG de **360 px d’ample**, amb el mateix enquadrament que l’original, a `docs/illustracions/m004/miniatures/` i amb el mateix nom base. Per exemple, `miniatures/planisferi-fisic-atles.jpg`.
- Exporta els gràfics en PNG RGB sRGB. Als gràfics de 2.600 px a 170 mm i als de 1.300 px a 85 mm, un rètol de **12 pt equival a uns 65 px**. Procura que els noms necessaris per resoldre les activitats tinguin almenys **11 pt** i la resta de rètols, almenys **9 pt**. Prova una còpia en grisos als dos amples d’impressió.
- Fes servir dades cartogràfiques verificables per a les costes, el relleu, la pluja, els límits i les ciutats. Les pàgines de l’atles, els dos fragments de llegenda i l’esquema de corbes són composicions didàctiques. Afegeix-hi a mà el text i la geometria perquè els rètols, la graella i els traços siguin exactes. [Natural Earth i condicions d’ús](https://www.naturalearthdata.com/about/terms-of-use/) · [Model de relleu ETOPO de la NOAA](https://www.ncei.noaa.gov/products/etopo-global-relief-model) · [CHIRPS, dades obertes de pluja](https://chc.ucsb.edu/data/chirps/).

### Quatre mapes per preparar el viatge · `quatre-mapes-peru`

Munta una làmina de quatre finestres amb els rètols **«Físic»**, **«Polític»**, **«Topogràfic»** i **«Temàtic»**, en aquest ordre. Fes servir el mateix marc del Perú i l’entorn als mapes físic, polític i temàtic. Dona al topogràfic un enquadrament propi.

| Mapa | Detall que s’ha de poder trobar |
| --- | --- |
| Físic | «Andes» i «Oceà Pacífic». Mostra la franja de muntanya amb dades d’altitud. Mantén el contorn del Perú com a referència discreta. |
| Polític | «Perú», «Equador», «Colòmbia», «Brasil», «Bolívia», «Xile» i «Lima». Separa els països amb una línia nítida i marca la capital amb el mateix símbol que al planisferi polític. |
| Topogràfic | Un retall dels Andes a l’entorn de Cusco, d’uns 40 km d’amplada, amb la retolació «Entorn de Cusco» i algunes corbes d’altitud llegibles. Traça-les a partir d’ETOPO a 15″ o d’una font d’elevació equivalent. Escull un interval uniforme, com ara 200 m, i indica’l. Marca l’àrea ampliada en un petit requadre al mapa físic amb la mateixa referència visual. |
| Temàtic | «Pluja mitjana de juliol (1991–2020)». Calcula la mitjana dels totals de juliol dels 30 anys de CHIRPS al Perú, en mil·límetres. Busca classes que separin bé els valors del mapa i mostra’n els intervals i la unitat a la llegenda. Distingeix les zones sense dades si n’hi ha. |

**Peu.** «El mapa físic, el polític, el topogràfic i el temàtic responen preguntes diferents sobre un mateix territori.»  
**Text alternatiu.** «Quatre mapes del Perú mostren el relleu andí, els països veïns, les corbes de nivell al voltant de Cusco i la pluja mitjana de juliol.»  
**Comprovació.** Es poden assenyalar la serralada, els països veïns i la zona més plujosa amb tres mapes diferents. El requadre de Cusco coincideix amb el retall topogràfic.

### Corbes juntes i corbes separades · `corbes-de-nivell`

Dibuixa un turó imaginari amb quatre corbes tancades niades, de **100 m**, **120 m**, **140 m** i **160 m**, etiquetades des de fora cap endins. Desplaça els contorns interiors perquè s’acostin pel costat esquerre i se separin pel dret. Marca **A** al vessant esquerre i **B** al dret. Fes-hi passar un mateix tall horitzontal pel centre. A sota, dibuixa el perfil amb cada altitud situada a la mateixa posició horitzontal on el tall travessa la corba. Si l’eix vertical està exagerat, el peu ha d’indicar que el perfil és esquemàtic.

**Peu.** «Cada corba marca una altitud. Compara l’espai entre corbes als vessants A i B.»  
**Text alternatiu.** «Vista superior i perfil d’un turó esquemàtic. Les corbes de nivell són més juntes al vessant A que al B.»  
**Comprovació.** El pendent de l’esquerra es veu més fort en totes dues vistes. Les altituds augmenten 20 m entre corbes.

### Del nom a la casella D4 · `atles-andes-d4`

Prepara una composició de paper amb un extracte de l’índex a l’esquerra i una pàgina d’atles a la dreta. A l’índex, posa els encapçalaments **«Nom»**, **«Pàgina»** i **«Casella»** i l’entrada **«Andes · 12 · D4»**. A la dreta, posa una pàgina **12** titulada **«Amèrica del Sud»**, amb columnes **A–F** d’esquerra a dreta i files **1–6** de dalt a baix. Munta el mapa sobre una costa real, en una projecció cilíndrica equidistant amb l’equador com a paral·lel estàndard. Pots usar l’extensió **135° O a 30° O**, **60° S a 15° N**, deixant una franja del Pacífic a l’oest. Amb sis columnes i sis files iguals, D4 cobreix de 82,5° O a 65° O i de 35° S a 22,5° S. Posa-hi el rètol «Andes» i la seva línia guia cap al tram de la serralada que envolta l’Aconcagua. Deixa que el relleu andí continuï per les caselles veïnes. Remarca discretament les capçaleres **D** i **4** i deixa la casella sense pintar.

**Peu.** «En aquest atles d’exemple, l’índex t’envia a la pàgina 12 i t’indica la casella on comença la cerca.»  
**Text alternatiu.** «Una entrada de l’índex amb el nom Andes, pàgina 12, casella D4, i un mapa quadriculat d’Amèrica del Sud.»  
**Comprovació.** Una persona que segueixi només la columna D i la fila 4 troba el rètol «Andes» al lloc correcte.

### La mateixa línia, dos significats · `llegendes-trac-puntejat`

Dibuixa dos fragments esquemàtics de mapa amb fletxa del nord. A l’esquerra, **«Itinerari de muntanya»**, amb un sender marcat mitjançant punts negres. A la dreta, **«Dos territoris veïns»**, amb una frontera marcada amb punts exactament iguals. Sota cada fragment, posa «Llegenda», una mostra del traç i el mot **«Camí»** o **«Frontera»**. Dóna als fragments formes senzilles i diferents, i reserva un filet clar al voltant del traç allí on calgui. Afegeix el rètol petit **«Exemples esquemàtics»**. Les dades i els traços serveixen només per interpretar el símbol.

**Peu.** «La mateixa línia de punts pot tenir significats diferents. Què indica en cada exemple?»  
**Text alternatiu.** «Dos mapes esquemàtics fan servir la mateixa línia de punts. Una llegenda la identifica com un camí i l’altra, com una frontera.»  
**Comprovació.** Els dos traços es veuen idèntics a l’A4 i la mostra de cada llegenda coincideix amb el seu mapa.

### La parella de planisferis · `planisferi-fisic` i `planisferi-politic`

Fes servir **Equal Earth centrat a Greenwich (EPSG:8857)**, el mateix marc mundial, la mateixa costa de Natural Earth, el nord a dalt i la mateixa amplada de mapa a totes les variants. Inclou-hi l’Antàrtida. Reserva una franja blanca sota cada mapa per a la llegenda i espai a l’oest d’Amèrica del Sud per a les línies guia. Conserva exactament la posició de les costes si se superposen els PNG. [Projecció Equal Earth](https://proj.org/en/stable/operations/projections/eqearth.html) · [Capes físiques Natural Earth](https://www.naturalearthdata.com/downloads/110m-physical-vectors/) · [Capes culturals Natural Earth](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/).

**Físic.** Deriva l’altitud terrestre, la profunditat marina i l’ombrejat de relleu d’ETOPO. Usa quatre trams d’altitud, **menys de 500 m**, **500 a menys de 2.000 m**, **2.000 a menys de 4.000 m** i **4.000 m o més**. Si distingeixes profunditats al mar, retola dos trams, **menys de 2.000 m** i **2.000 m o més**. Mantén la llegenda coherent amb el mapa. Retola com a mínim **«Andes»**, **«Himàlaia»**, **«Oceà Pacífic»**, **«Oceà Atlàntic»** i **«Oceà Índic»**. Dona al rètol «Andes» una guia visible cap a la serralada.

**Peu del físic.** «Busca els Andes a l’oest d’Amèrica del Sud i consulta la llegenda per interpretar els colors del relleu.»  
**Text alternatiu del físic.** «Planisferi amb continents, oceans i colors d’altitud. Una línia guia assenyala els Andes a l’oest d’Amèrica del Sud.»

**Polític.** Dibuixa els països amb els polígons Admin 0 de Natural Earth, marca amb traç diferenciat els límits que la font indica com a disputats i explica aquest símbol a la llegenda. Retola com a mínim **«Perú»**, **«Xile»**, **«Argentina»**, **«Lima»** i **«Santiago de Xile»**. Marca les dues capitals amb el mateix símbol i inclou-lo a la llegenda. Usa línies guia en zones denses. Mantén el traç fronterer visible en grisos i documenta l’edició i el criteri de límits de la font. [Criteri de límits de Natural Earth](https://www.naturalearthdata.com/about/disputed-boundaries-policy/).

**Peu del polític.** «Localitza el Perú i Xile i compara aquesta zona amb la del planisferi físic.»  
**Text alternatiu del polític.** «Planisferi amb països, fronteres i capitals. El Perú, Xile i l’Argentina estan retolats a l’oest i al sud d’Amèrica del Sud.»  
**Comprovació de la parella.** Una vegada localitzats els Andes al físic, la mateixa zona es reconeix al polític pels contorns de la costa. «Andes», «Perú», «Xile» i «Lima» es llegeixen a l’amplada d’impressió.

### Fotografia del canó del Colca · `canon-colca`

Desa el JPEG original de [Colca Canyon.jpg a Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Colca_Canyon.jpg), fotografia de **world-wide-gifts.com**, llicència **CC BY-SA 2.0**. Mantén el marc horitzontal complet. L’objectiu és que es vegin les parets inclinades i el fons de la vall. Mantén la fotografia i el seu crèdit com a recurs independent.

**Peu.** «El canó del Colca, als Andes del Perú. Fixa’t en la forma de la vall i en el pendent dels vessants.»  
**Text alternatiu.** «Fotografia del canó del Colca amb vessants costeruts que baixen cap al fons de la vall.»  
**Crèdit.** «world-wide-gifts.com · Wikimedia Commons · CC BY-SA 2.0».  
**Comprovació.** La llicència i la pàgina original consten al lliurament. La vall es distingeix a 85 mm, també en grisos.

### Mercator i Equal Earth cara a cara · `comparativa-projeccions`

Munta dos mapes de costat amb el mateix meridià central, les mateixes costes de Natural Earth, el mateix interval de latitud (**80° S a 84° N**) i el mateix ample d’equador a la imatge. Renderitza a l’esquerra **«Mercator»** (EPSG:3395) i a la dreta **«Equal Earth · projecció equivalent»** (EPSG:8857). Ajusta cada mapa conservant les proporcions del renderitzat, dins del seu marc. Ressalta les siluetes de **Groenlàndia** i **Amèrica del Sud** amb els mateixos dos tractaments a cada mapa, per exemple contorn gruixut i ratllat. Repeteix les dues etiquetes. La resta del món va en gris clar.

**Peu.** «Compara la mida aparent de Groenlàndia i Amèrica del Sud en les dues projeccions.»  
**Text alternatiu.** «Mercator i Equal Earth mostren Groenlàndia i Amèrica del Sud amb proporcions diferents. Groenlàndia sembla relativament més gran en Mercator.»  
**Comprovació.** Groenlàndia queda sencera als dos marcs. Es pot comparar la proporció de les dues superfícies amb una còpia en grisos. [Projecció de Mercator](https://proj.org/en/stable/operations/projections/merc.html).

### Ordre de lliurament

Prepara primer els dos planisferis d’estil Atles i una prova de la graella D4 per validar les referències del text. Completa les altres figures principals i les tres variants Pla. Acaba amb l’esquema de corbes, la fotografia i el comparador de projeccions. Envia una taula final amb el nom de cada fitxer, el peu, el text alternatiu, el crèdit o font de les dades i el resultat de la prova en A4. Compta les miniatures per separat.

## Per descriure una figura nova

Omple els mateixos camps de l’encàrrec pilot. Indica **codi de fitxa, apartat i ID de figura**, **què ha de veure o fer l’alumne**, **composició, estil i retolació literal**, **dades o referències**, **estils i referències de cada sèrie**, **ruta, format i mida** i **un criteri de comprovació**. Especifica els canvis d’estil només si la figura requereix un tractament diferent de la pauta general.

## Resposta de lliurament

Per a cada imatge, confirma **ruta exacta, dimensions, font de les dades o del recurs i condicions de reutilització**. Afegeix **una proposta de text alternatiu i una de peu** quan la fitxa encara no en tingui. Indica el peu i la font o autoria com a camps separats. Si una variant incorpora una foto o una base externa, indica la font i les condicions de reutilització específiques d’aquella variant. Explica en una línia què has comprovat. Assenyala els fitxers pendents i la causa concreta si un recurs o una dada no s’ha pogut obtenir.
