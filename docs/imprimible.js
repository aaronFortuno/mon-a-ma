window.imprimible = (() => {
  const paperFonts = {
    georgia: "Georgia, 'Times New Roman', serif",
    lora: 'Lora, Georgia, serif',
    times: "'Times New Roman', serif",
    arial: 'Arial, sans-serif',
    lexend: 'Lexend, Arial, sans-serif',
    verdana: 'Verdana, sans-serif',
  };
  const webFonts = { lora: 'Lora', lexend: 'Lexend' };
  const fontLoads = new Map();
  const projectLogo = 'assets/mon-a-ma.png?v=0.1.4';

  function loadPaperFont(id) {
    const family = webFonts[id];
    if (!family || !document.fonts) return;
    if (!fontLoads.has(id)) {
      const sample = 'Àçó ’ l·l ě';
      const loaded = Promise.all([400, 700].map(weight => document.fonts.load(weight + ' 12pt ' + family, sample)))
        .catch(() => fontLoads.delete(id));
      fontLoads.set(id, loaded);
    }
    return fontLoads.get(id);
  }

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
    if (source.type === 'paragraph') return rich(node('p', source.core ? 'paper-core' : ''), source.text);
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
    if (source.rowHeadingWidth) table.style.setProperty('--row-heading-width', source.rowHeadingWidth + '%');
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
    element.dataset.figureName = source.name ?? source.alt ?? 'Il·lustració';
    if (source.blob) element.dataset.legacyUpload = '';
    if (!source.src) {
      const placeholder = node('div', 'image-placeholder');
      if (source.ratio) placeholder.style.setProperty('--figure-ratio', source.ratio);
      placeholder.setAttribute('role', 'img');
      placeholder.setAttribute('aria-label', ['Espai reservat per a una il·lustració', source.name].filter(Boolean).join(' · '));
      element.append(placeholder);
    } else {
      const image = node('img');
      image.alt = source.alt ?? '';
      if (source.pixelWidth && source.pixelHeight) {
        image.width = source.pixelWidth;
        image.height = source.pixelHeight;
      }
      image.src = source.src;
      element.append(image);
    }
    if (source.caption || source.credit) {
      const caption = node('figcaption');
      if (source.caption) caption.append(node('span', 'figure-caption', source.caption));
      if (source.credit) caption.append(node('span', 'figure-credit', 'Font: ' + source.credit));
      element.append(caption);
    }
    return element;
  }

  function chapterHeader(chapter, documentType) {
    const header = node('div', 'paper-unit');
    const title = documentType === 'solution' ? 'Solucionari · ' + chapter.title : chapter.title;
    header.append(node('h2', '', title));
    header.append(rich(node('p', 'chapter-intro'), chapter.intro));
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
        unit.append(node('h3', 'section-title', section.title), ...before.slice(0, 1).map(figure));
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

  function makePage(topic, options, firstPage) {
    const sheet = node('article', 'sheet ink');
    sheet.lang = topic.lang;
    sheet.style.setProperty('--margin', options.margin + 'mm');
    sheet.style.setProperty('--font-size', options.fontSize + 'pt');
    sheet.style.setProperty('--leading', options.leading);
    sheet.style.setProperty('--serif', paperFonts[options.font] ?? paperFonts.georgia);
    sheet.dataset.alignment = options.textAlignment;
    if (options.markCore) sheet.dataset.markCore = '';
    if (options.paragraphSpacing) sheet.style.setProperty('--paragraph-spacing', options.paragraphSpacing);
    const inner = node('div', 'sheet-inner');
    if (firstPage) {
      const row = node('div', 'sheet-header-fields');
      if (options.headerLogo) {
        const brand = node('div', 'sheet-header-brand');
        const logo = node('img', options.headerLogoImage ? 'sheet-header-logo is-custom' : 'sheet-header-logo');
        logo.src = options.headerLogoImage || projectLogo;
        logo.alt = options.headerBrand || options.headerLogoImage ? '' : 'Món a mà';
        brand.append(logo);
        if (options.headerBrand) brand.append(node('span', '', 'Món a mà'));
        row.append(brand);
      }
      if (options.headerName || options.headerDate) {
        const fields = node('div', 'sheet-student-fields');
        if (options.headerName) fields.append(node('span', 'sheet-student-field sheet-student-name', 'Nom'));
        if (options.headerDate) fields.append(node('span', 'sheet-student-field', 'Data'));
        row.append(fields);
      }
      const code = options.showClassroomCode && options.classroomCode.trim();
      if (code) {
        const badge = node('span', 'sheet-classroom-code', code);
        badge.classList.toggle('is-outline', options.classroomCodeStyle === 'outline');
        badge.style.fontSize = options.classroomCodeSize + 'pt';
        row.append(badge);
      }
      if (row.childElementCount) {
        const header = node('header', 'sheet-header');
        header.append(row);
        inner.append(header);
      }
    }
    const body = node('div', 'sheet-body');
    const footer = options.showPageFooter ? node('footer', 'sheet-footer') : null;
    inner.append(body);
    if (footer) {
      if (options.showTopicTitle) footer.append(node('span', 'sheet-footer-title', topic.title));
      if (options.showMaterialCode) footer.append(node('span', 'sheet-material-code', topic.code));
      if (options.pageNumbers) footer.append(node('span', 'sheet-page-number', '1 / 1'));
      inner.append(footer);
    }
    sheet.append(inner);
    return { sheet, body, footer };
  }

  function previewPage(topic, chapter, sectionId, options) {
    const { sheet, body } = makePage(topic, options, true);
    const section = chapter.sections.find(item => item.id === sectionId) ?? chapter.sections[0];
    body.append(chapterHeader(chapter, options.documentType));
    if (section) {
      const figures = (chapter.figures ?? []).filter(item => item.section === section.id);
      body.append(...sectionUnits(section, figures).slice(0, 2));
    }
    return sheet;
  }

  function paginate(topic, chapters, figuresByChapter, options, measuring, target) {
    measuring.replaceChildren();
    const idPrefix = target.id === 'paper-stack' ? '' : (target.id || 'miniatura') + '-';
    const pages = [];
    let page;
    let oversized = false;

    function start(firstPage = false) {
      page = makePage(topic, options, firstPage);
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
      start(true);
      add(chapterHeader(chapter, options.documentType));
      const figures = figuresByChapter.get(chapter.id);
      for (const section of chapter.sections) {
        const units = sectionUnits(section, figures.filter(item => item.section === section.id));
        if (units[0]) {
          units[0].id = idPrefix + 'fitxa-' + chapter.id + '-' + section.id;
          units[0].tabIndex = -1;
          units[0].dataset.paperChapter = chapter.id;
          units[0].dataset.paperSection = section.id;
        }
        for (const [index, unit] of units.entries()) {
          unit.dataset.paperUnit = units[0].id + ':' + index;
          add(unit);
        }
      }
    }
    const width = pages[0].sheet.getBoundingClientRect().width;
    const height = pages[0].sheet.getBoundingClientRect().height;
    const frames = pages.map(({ sheet, footer }, index) => {
      const number = footer?.querySelector('.sheet-page-number');
      if (number) number.textContent = (index + 1) + ' / ' + pages.length;
      const frame = node('div', 'sheet-frame');
      frame.append(sheet);
      return frame;
    });
    target.replaceChildren(...frames);
    return { count: pages.length, width, height, oversized };
  }

  return { node, paragraphAnchor, loadPaperFont, paginate, previewPage };
})();
