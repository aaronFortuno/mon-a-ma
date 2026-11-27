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
| M002 · Les coordenades geogràfiques | 4, dos globus, la graella de les boies i el joc de la flota | 4 reserves pendents. Les graelles s’han de construir amb geometria controlada. |
| M003 · Els mapes i els plànols geogràfics | 1, plànol del barri | 1 lot cartogràfic. 1 original. |
| M004 · Els tipus de mapes | 2, planisferis físic i polític | 1 lot cartogràfic amb el mateix enquadrament i projecció. 2 originals pendents. |

| Fitxa | Apartat · ID de figura | Fitxers dins de docs/illustracions/ |
| --- | --- | --- |
| M001 | capes · capes | capes.png · m001/capes.png · m001/capes-realista.png |
| M001 | moviment · reserva-moviment | m001/moviment-pla.png · m001/moviment-volum.png · m001/moviment-realista.png |
| M001 | moviment · falla-san-andreas | m001/falla-san-andreas.jpg, complement compartit |
| M001 | gravetat · reserva-gravetat | m001/gravetat-pla.png · m001/gravetat-volum.png · m001/gravetat-realista.png |
| M001 | elements · reserva-elements | m001/elements-pla.png · m001/elements-volum.png · m001/elements-realista.png |
| M001 | elements · arrels-i-erosio | m001/arrels-i-erosio.png · m001/arrels-i-erosio-volum.png · m001/arrels-i-erosio-realista.png |
| M002 | latitud · reserva-latitud | m002/parallels.png, pendent |
| M002 | longitud · reserva-longitud | m002/meridians.png, pendent |
| M002 | localitzacio · graella | m002/graella-boies.png, pendent |
| M002 | localitzacio · troba-la-flota | m002/troba-la-flota.png, pendent |
| M003 | llegenda · barri | planol.png |
| M004 | fisic · planisferi-fisic | m004/planisferi-fisic.png, pendent, 2.600 × 1.300 px |
| M004 | politic · planisferi-politic | m004/planisferi-politic.png, pendent, 2.600 × 1.300 px |

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

Les quatre figures s’utilitzen en les variants Suport, Base i Ampliació. Fes que les etiquetes i els punts de referència es puguin llegir a A4 i en escala de grisos. [Referència de la NOAA sobre paral·lels i meridians](https://oceanservice.noaa.gov/education/tutorial_nautical_charts/nautical_charts02_information_2b.html).

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

## M003 · Plànol d’un barri imaginari

**Què ha de fer l’alumne.** Relacionar els símbols amb la llegenda, orientar el plànol amb el nord i usar la barra per comparar distàncies.

**Composició.** Vista zenital del barri, amb carrers i illes senzills a l’esquerra i una llegenda ben separada a la dreta. Orienta el nord cap amunt i posa-hi una fletxa amb «N». Dibuixa el riu de nord a sud, un pont sobre el riu alineat amb un carrer, l’escola i la biblioteca a l’oest, i el parc a l’est.

| Element | Símbol al plànol i a la llegenda |
| --- | --- |
| Escola | Quadrat amb una «E» |
| Biblioteca | Quadrat amb una «B», ben distingible del de l’escola |
| Parc | Superfície verda amb ratllat fi o arbres esquemàtics |
| Pont | Dues vores curtes que abracen el pas per damunt del riu |
| Riu | Traç o banda blava amb vores recognoscibles |

Dibuixa el plànol en unitats de metres i usa el mateix factor per a la barra. Per concretar la geometria, separa horitzontalment els centres dels símbols de l’escola i la biblioteca **100 m** i posa’ls a la mateixa alçada. La barra té dos trams iguals i es retola **0**, **50** i **100 m**. En la imatge final, la barra completa ha de tenir la mateixa longitud que el segment recte que uneix els centres dels dos símbols. Mantén la barra i el dibuix junts quan facis qualsevol canvi de mida. [Referència de l’ICGC sobre l’escala cartogràfica](https://www.icgc.cat/ca/Ambits-tematics/Divulgacio/Publicacions/Diccionaris/Escala).

## M004 · Dos planisferis que es poden comparar

**Què ha de fer l’alumne.** Trobar els Andes al mapa físic i identificar al mapa polític almenys dos països per on passa la serralada.

**Composició compartida.** Fes servir el mateix marc, projecció Equal Earth centrada a Greenwich (EPSG:8857), escala de dibuix i costa als dos PNG. Col·loca la llegenda en una franja blanca comuna a sota. Inclou l’Antàrtida i comprova que els dos mapes se superposin en la línia de costa. Mantén Amèrica del Sud sencera i deixa marge per retolar la seva façana pacífica. La base cartogràfica de Natural Earth es pot reutilitzar i modificar. [Capes físiques de Natural Earth](https://www.naturalearthdata.com/downloads/110m-physical-vectors/) · [Condicions d’ús de Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/).

### Planisferi físic

Mostra els continents i els oceans i distingeix l’altitud de la profunditat marina. Deriva els colors de dades reals d’elevació i batimetria. Usa verd, ocre i marró en tres franges terrestres, i blau clar i fosc per a dues franges marines. Per al terra, aplica menys de 500 m, de 500 m a menys de 2.000 m i 2.000 m o més d’altitud. Per al mar, aplica menys de 2.000 m i 2.000 m o més de profunditat. Retola aquests mateixos intervals a la llegenda. Retola com a mínim «Andes», «Himàlaia», «Oceà Pacífic», «Oceà Atlàntic» i «Oceà Índic». Situa «Andes» al costat de la franja de relleu de l’oest d’Amèrica del Sud, amb una línia guia si fa falta. Mantén la costa i el relleu com a referències principals. [Model global de relleu ETOPO de la NOAA](https://www.ncei.noaa.gov/products/etopo-global-relief-model).

### Planisferi polític

Dibuixa els països a partir dels polígons d’Admin 0. Separa els veïns amb un límit nítid i colors suaus alternats. Retola com a mínim «Perú», «Xile» i «Argentina» i marca «Lima» i «Santiago de Xile» amb un símbol de capital, també explicat a la llegenda. Si les etiquetes del Perú o Xile no hi caben, posa-les a l’oceà amb línies guia cap al país corresponent. Mantén els colors dels països i les fronteres com a referències principals. Fes servir un traç diferenciat quan representis els límits que la font marca com a disputats. [Capes administratives de Natural Earth](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/).

## Per descriure una figura nova

Omple els mateixos camps de l’encàrrec pilot. Indica **codi de fitxa, apartat i ID de figura**, **què ha de veure o fer l’alumne**, **composició, estil i retolació literal**, **dades o referències**, **estils i referències de cada sèrie**, **ruta, format i mida** i **un criteri de comprovació**. Especifica els canvis d’estil només si la figura requereix un tractament diferent de la pauta general.

## Resposta de lliurament

Per a cada imatge, confirma **ruta exacta, dimensions, font de les dades o del recurs i condicions de reutilització**. Afegeix **una proposta de text alternatiu i una de peu** quan la fitxa encara no en tingui. Indica el peu i la font o autoria com a camps separats. Si una variant incorpora una foto o una base externa, indica la font i les condicions de reutilització específiques d’aquella variant. Explica en una línia què has comprovat. Assenyala els fitxers pendents i la causa concreta si un recurs o una dada no s’ha pogut obtenir.
