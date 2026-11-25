# Món a mà

Apunts i materials per explorar el medi a primària i preparar carpetes d’aprenentatge. El primer conjunt, **La Terra i els mapes**, agrupa quatre temes de 5è de primària.

## Obre el catàleg

Obre `docs/index.html` al navegador. També es pot servir el directori `docs` amb un servidor estàtic. Per exemple, des de l’arrel del projecte, executa `python -m http.server 4196 --directory docs` i obre [el catàleg local](http://127.0.0.1:4196/).

Tria un tema al catàleg per obrir la previsualització A4. Pots navegar pels capítols i canviar el cos de lletra, l’interlineat, els marges i les il·lustracions. **Llegeix els apunts** obre la vista de lectura. També pots introduir un codi com ara `M001` al catàleg per obrir directament els apunts. El codi apareix a la targeta i, per defecte, al peu de la fitxa. **Imprimeix / Desa en PDF** obre el diàleg d’impressió del navegador amb el capítol o el tema complet, segons l’opció seleccionada. Els ajustos i les imatges que hi afegeixis es desen al navegador que fas servir, sempre que l’emmagatzematge local hi estigui disponible.

## Organitza les fitxes

Al taller, **Desa plantilla…** permet donar un nom al format actual. **Desa els canvis** actualitza la plantilla que has triat per a la fitxa. L’apartat **Plantilles** permet canviar de format i gestionar la plantilla per defecte. El codi d’aula, les imatges concretes i l’ordre dels apartats es desen amb cada fitxa. Al catàleg, **Nova col·lecció** crea un grup propi amb una plantilla opcional. Els ajustos fets dins d’una col·lecció es desen per separat.

Les fletxes del panell **Apartats** canvien l’ordre de la fitxa i de la lectura. Les reserves d’imatge alternen de costat segons l’ordre del material, i el panell d’il·lustracions permet ajustar cada reserva.

## Afegeix continguts

- Crea un fitxer a `docs/continguts` a partir de `terra-i-mapes.js` i carrega’l a `docs/index.html` abans d’`app.js`. Cada tema té metadades, capítols i, si escau, fonts, currículum i recursos. Els capítols contenen apartats amb paràgrafs, taules, passos numerats i requadres. Assigna a cada material un `code` alfanumèric i indica la llengua a `lang`. Les versions traduïdes d’un material han de compartir el codi i els identificadors interns. El catàleg carrega l’edició de la llengua indicada a l’HTML.
- Desa les fotografies i il·lustracions a `docs/illustracions` i registra-les al capítol amb un identificador únic dins del tema, l’apartat, la ruta `src`, el text alternatiu i el peu. Si encara no tens la imatge, omet `src` i indica `name` i `ratio` (amplada dividida per l’alçada) per reservar un requadre. En tots dos casos pots ajustar l’amplada en percentatge, l’alineació i el punt d’inserció.
- Llista els materials complementaris a `resources` amb `type`, `title`, `provider` i `url`. Aquest camp permet reunir els materials de cada tema quan s’hi vagin incorporant altres formats. Les adreces dels temes, capítols i apartats es poden enllaçar directament.
- Afegeix `theme`, `difficulty` i, opcionalment, `cover` a les dades del tema. L’extensió es calcula amb el nombre d’apartats. Els temes poden compartir una `collection` amb `id`, `title` i recursos comuns opcionals.
- Per oferir un solucionari, afegeix `solution` al capítol amb `sections` i, opcionalment, `title`, `intro` i `figures`. Si utilitzes figures, assigna’ls identificadors diferents dels de la fitxa.

## GitHub Pages

La font de publicació a GitHub Pages és la carpeta `/docs` de la branca `main` del repositori `aaronFortuno/mon-a-ma`. El domini del projecte és `monama.ortogra.fi`.
