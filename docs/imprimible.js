window.imprimible = (() => {
  function node(tag, className = '', value = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value) element.textContent = value;
    return element;
  }

  function rich(element, value) {
    for (const piece of value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)) {
      if (piece.startsWith('**')) element.append(node('strong', '', piece.slice(2, -2)));
      else if (piece.startsWith('*')) element.append(node('em', '', piece.slice(1, -1)));
      else element.append(piece);
    }
    return element;
  }

  function block(source) {
    if (source.type === 'paragraph') return rich(node('p'), source.text);
    if (source.type === 'steps') {
      const items = node('ol');
      items.append(...source.items.map(value => rich(node('li'), value)));
      return items;
    }
    if (source.type === 'note') {
      const aside = node('aside', 'note');
      aside.append(node('strong', '', source.title), rich(node('p'), source.text));
      return aside;
    }
    const table = node('table');
    const headings = table.createTHead().insertRow();
    for (const heading of source.headers) {
      const cell = node('th', '', heading);
      cell.scope = 'col';
      headings.append(cell);
    }
    const body = table.createTBody();
    for (const row of source.rows) {
      const line = body.insertRow();
      const heading = node('th', '', row[0]);
      heading.scope = 'row';
      line.append(heading);
      for (const value of row.slice(1)) line.append(rich(node('td'), value));
    }
    return table;
  }

  function figure(source) {
    const wrapped = source.wrap && source.position !== 'center';
    const element = node('figure', wrapped ? 'illustration is-wrap' : 'illustration');
    element.style.setProperty('--image-width', source.width + '%');
    element.dataset.position = source.position;
    element.dataset.figure = source.id;
    const image = node('img');
    image.alt = source.alt;
    if (source.pixelWidth && source.pixelHeight) {
      image.width = source.pixelWidth;
      image.height = source.pixelHeight;
    }
    image.src = source.src;
    element.append(image);
    if (source.caption) element.append(node('figcaption', '', source.caption));
    return element;
  }

  function chapterHeader(chapter) {
    const header = node('div', 'paper-unit');
    header.append(node('h2', '', chapter.title), rich(node('p', 'chapter-intro'), chapter.intro));
    return header;
  }

  function paragraphAnchor(anchor) {
    return anchor === 'lead' ? 0 : /^paragraph-\d+$/.test(anchor) ? Number(anchor.slice(10)) : null;
  }

  function sectionUnits(section, figures) {
    const units = [];
    const before = figures.filter(item => item.anchor === 'before');
    const after = figures.filter(item => item.anchor === 'after');
    function imageUnit(item) {
      const unit = node('div', 'paper-unit');
      unit.append(figure({ ...item, wrap: false }));
      units.push(unit);
    }

    for (let index = 0; index < section.blocks.length; index++) {
      const anchored = figures.filter(item => paragraphAnchor(item.anchor) === index);
      const unit = node('div', 'paper-unit');
      if (index === 0) {
        unit.append(node('h3', '', section.title), ...before.slice(0, 1).map(figure));
      }
      if (anchored[0]) unit.append(figure(anchored[0]));
      unit.append(block(section.blocks[index]));
      const nextHasFigure = figures.some(item => paragraphAnchor(item.anchor) === index + 1);
      if (anchored[0]?.wrap && !nextHasFigure && section.blocks[index + 1]?.type === 'paragraph') {
        unit.append(block(section.blocks[++index]));
      }
      units.push(unit);
      if (units.length === 1) before.slice(1).forEach(imageUnit);
      anchored.slice(1).forEach(imageUnit);
    }
    after.forEach(imageUnit);
    return units;
  }

  function readChapter(chapter, figures) {
    const article = node('article', 'reading ink');
    article.append(chapterHeader(chapter));
    for (const source of chapter.sections) {
      const section = node('section');
      section.id = 'apartat-' + source.id;
      section.tabIndex = -1;
      section.append(...sectionUnits(source, figures.filter(item => item.section === source.id)));
      article.append(section);
    }
    return article;
  }

  function makePage(topic, options) {
    const sheet = node('article', options.monochrome ? 'sheet ink mono' : 'sheet ink');
    sheet.style.setProperty('--margin', options.margin + 'mm');
    sheet.style.setProperty('--font-size', options.fontSize + 'pt');
    sheet.style.setProperty('--leading', options.leading);
    const inner = node('div', 'sheet-inner');
    const header = node('header', 'sheet-header');
    header.append(node('span', '', topic.title), node('span', '', topic.subject + ' · ' + topic.grades.join(', ')));
    const body = node('div', 'sheet-body');
    const footer = node('footer', 'sheet-footer');
    footer.append(node('span', '', 'Quadern obert'));
    inner.append(header, body, footer);
    sheet.append(inner);
    return { sheet, body, footer };
  }

  function paginate(topic, chapters, figuresByChapter, options, measuring, target) {
    measuring.replaceChildren();
    const pages = [];
    let page;
    let oversized = false;

    function start() {
      page = makePage(topic, options);
      measuring.append(page.sheet);
      pages.push(page);
    }

    function add(unit) {
      const hadContent = page.body.childElementCount > 0;
      page.body.append(unit);
      if (page.body.scrollHeight <= page.body.clientHeight) return;
      if (hadContent) {
        start();
        page.body.append(unit);
      }
      if (page.body.scrollHeight > page.body.clientHeight) oversized = true;
    }

    for (const chapter of chapters) {
      start();
      add(chapterHeader(chapter));
      const figures = figuresByChapter.get(chapter.id);
      for (const section of chapter.sections) {
        for (const unit of sectionUnits(section, figures.filter(item => item.section === section.id))) add(unit);
      }
    }
    const width = pages[0].sheet.getBoundingClientRect().width;
    const height = pages[0].sheet.getBoundingClientRect().height;
    const frames = pages.map(({ sheet, footer }, index) => {
      if (options.pageNumbers) footer.append(node('span', '', (index + 1) + ' / ' + pages.length));
      const frame = node('div', 'sheet-frame');
      frame.append(sheet);
      return frame;
    });
    target.replaceChildren(...frames);
    return { count: pages.length, width, height, oversized };
  }

  return { node, paragraphAnchor, readChapter, paginate };
})();
