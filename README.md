# Món a mà

Apunts i materials per explorar el medi a primària i preparar carpetes d’aprenentatge. El primer tema, **La Terra i els mapes**, conté quatre capítols de 5è de primària.

## Obre el catàleg

Obre `docs/index.html` al navegador. També es pot servir el directori `docs` amb un servidor estàtic. Per exemple, des de l’arrel del projecte, executa `python -m http.server 4196 --directory docs` i obre [el catàleg local](http://127.0.0.1:4196/).

Tria un tema al catàleg per obrir la previsualització A4. Pots navegar pels capítols i canviar el cos de lletra, l’interlineat, els marges i les il·lustracions. **Llegeix els apunts** obre la vista de lectura. **Imprimeix / Desa en PDF** obre el diàleg d’impressió del navegador amb el capítol o el tema complet, segons l’opció seleccionada. Els ajustos i les imatges que hi afegeixis es desen al navegador que fas servir, sempre que l’emmagatzematge local hi estigui disponible.

## Afegeix continguts

- Crea un fitxer a `docs/continguts` a partir de `terra-i-mapes.js` i carrega’l a `docs/index.html` abans d’`app.js`. Cada tema té metadades, capítols i, si escau, fonts, currículum i recursos. Els capítols contenen apartats amb paràgrafs, taules, passos numerats i requadres. Mantén estables els identificadors per conservar els enllaços.
- Desa les figures a `docs/illustracions` i registra-les al capítol amb un identificador únic dins del tema, l’apartat, la ruta, el text alternatiu i el peu. Els ajustos inicials són l’amplada en percentatge, l’alineació i el punt d’inserció. El programa `tools/dibuixa-esquemes.py` regenera les tres figures del tema amb Pillow.
- Llista els materials complementaris a `resources` amb `type`, `title`, `provider` i `url`. Aquest camp permet reunir els materials de cada tema quan s’hi vagin incorporant altres formats. Les adreces dels temes, capítols i apartats es poden enllaçar directament.
- Afegeix `theme`, `difficulty` i, opcionalment, `cover` a les dades del tema. L’extensió es calcula amb el nombre de capítols.
- Per oferir un solucionari, afegeix `solution` al capítol amb `sections` i, opcionalment, `title`, `intro` i `figures`. Si utilitzes figures, assigna’ls identificadors diferents dels de la fitxa.

## GitHub Pages

La font de publicació a GitHub Pages és la carpeta `/docs` de la branca `main` del repositori `aaronFortuno/mon-a-ma`. El domini del projecte és `monama.ortogra.fi`.
