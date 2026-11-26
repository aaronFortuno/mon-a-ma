(() => {
  const locale = document.documentElement.lang;
  const cycleById = new Map(window.curriculum.cycles.map(cycle => [cycle.id, cycle]));
  const topics = window.quaderns.filter(topic => topic.lang === locale);
  const { node, paragraphAnchor, loadPaperFont, paginate } = window.imprimible;
  const preferences = window.preferencies;
  const { defaults } = preferences;
  const byId = id => document.getElementById(id);
  const topicById = new Map(topics.map(topic => [topic.id, topic]));
  const topicByCode = new Map(topics.map(topic => [topic.code, topic]));
  const codeInput = byId('material-code');
  const quickTemplateForm = byId('quick-template-form');
  const quickTemplateEntry = byId('quick-template-entry');
  const quickTemplateStatus = byId('quick-template-status');
  let library = preferences.library();
  let activeCollection = null;
  const form = byId('options');
  const figureForm = byId('figure-settings');
  const figureAlignment = byId('figure-alignment-template');
  const figureStyleButton = byId('figure-style-button');
  const figureStyleDialog = byId('figure-style-dialog');
  const stack = byId('paper-stack');
  const zoomOut = byId('zoom-out');
  const zoomReset = byId('zoom-reset');
  const zoomIn = byId('zoom-in');
  const minPreviewMagnification = 0.5;
  const maxPreviewMagnification = 4;
  const zoomStep = 1.2;
  const motionLayer = byId('paper-motion');
  const printMenu = byId('print-menu');
  const printButtons = [byId('print'), byId('save-pdf')];
  const printStatus = byId('print-status');
  const catalogTitle = document.title;
  const layoutNumber = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const images = new Map();
  let knownUploads = [];
  let route;
  let documentType = 'sheet';
  let settings;
  let paper;
  let previewMagnification = 1;
  let revision = 0;
  let frameId;
  let imageDb;
  let logoUploadVersion = 0;
  let pendingSection = '';
  let sectionEdit;
  let paperAnimations = [];

  function imageStore() {
    imageDb ??= new Promise((resolve, reject) => {
      const open = indexedDB.open('quadern-obert-imatges', 1);
      open.onupgradeneeded = () => open.result.createObjectStore('imatges', { keyPath: 'id' });
      open.onsuccess = () => resolve(open.result);
      open.onerror = () => reject(open.error);
      open.onblocked = () => reject(new Error('Base de dades en ús'));
    });
    return imageDb;
  }

  async function imageOperation(mode, operation) {
    const db = await imageStore();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('imatges', mode);
      const request = operation(transaction.objectStore('imatges'));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onabort = () => reject(transaction.error || new Error('Operació interrompuda'));
      transaction.onerror = () => reject(transaction.error);
    });
  }

  function addUrl(source) {
    return { ...source, src: URL.createObjectURL(source.blob) };
  }

  function link(label, target, className) {
    const element = node('a', className, label);
    element.href = target;
    return element;
  }

  function catalogAddress(collection) {
    return collection ? '#colleccio/' + collection.id : '#';
  }

  function address(topic, chapter, section = '', collection = activeCollection) {
    const path = topic.chapters.length === 1 ? [topic.code] : [topic.code, chapter.id];
    return [catalogAddress(collection), ...path, 'maqueta', section].filter(Boolean).join('/').replace(/^#\//, '#');
  }

  function members(collection) {
    return collection.topicIds.map(id => topicById.get(id)).filter(Boolean);
  }

  function option(value, label) {
    return new Option(label, value);
  }

  function setupCatalog() {
    const filters = byId('catalog-filters');
    const size = topic => {
      const count = topic.chapters.reduce((total, chapter) => total + chapter.sections.length, 0);
      return count + (count === 1 ? ' apartat' : ' apartats');
    };
    const fields = {
      cycle: topic => [topic.cycle],
      theme: topic => [topic.theme],
      collection: topic => [topic.collection?.title],
      length: topic => [size(topic)],
      difficulty: topic => [topic.difficulty],
    };
    const controls = Object.entries(fields).map(([name, values]) => {
      const select = filters.elements.namedItem(name);
      const available = [...new Set(topics.flatMap(values).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, locale, { numeric: true }));
      if (name === 'cycle') {
        select.append(...window.curriculum.cycles.filter(cycle => available.includes(cycle.id))
          .map(cycle => option(cycle.id, cycle.label + (cycle.stage === 'ESO' ? ' · ESO' : ''))));
      } else select.append(...available.map(value => option(value, value)));
      return { select, values };
    });

    function makeCard(topic, grouped) {
      const card = link('', address(topic, topic.chapters[0]), 'topic-card');
      card.dataset.topic = topic.id;
      const picture = node('div', topic.cover ? 'topic-cover' : 'topic-cover image-placeholder');
      picture.setAttribute('aria-hidden', 'true');
      if (topic.cover) {
        const cover = node('img');
        cover.src = topic.cover;
        cover.alt = '';
        cover.loading = 'lazy';
        picture.append(cover);
      }
      const details = node('div', 'topic-details');
      const summary = [cycleById.get(topic.cycle)?.label, topic.theme ?? topic.subject].filter(Boolean).join(' · ');
      const extent = [topic.code, size(topic), topic.difficulty].filter(Boolean).join(' · ');
      details.append(node('p', 'eyebrow', summary), node(grouped ? 'h3' : 'h2', 'topic-card-title', topic.title),
        node('p', 'topic-description', topic.description), node('p', 'topic-extent', extent));
      card.append(picture, details);
      return card;
    }

    function refresh() {
      const choices = byId('catalog-collection');
      choices.replaceChildren(option('', 'Tot el catàleg'), ...library.collections.map(item => option(item.id, item.name)));
      choices.value = activeCollection?.id ?? '';
      byId('edit-collection').hidden = !activeCollection;
      byId('catalog-title').textContent = activeCollection?.name ?? 'Temes';
      const candidates = activeCollection ? members(activeCollection) : topics;
      const matching = candidates.filter(topic => controls.every(({ select, values }) => !select.value || values(topic).includes(select.value)));
      const groups = new Map();
      for (const topic of matching) {
        const collection = activeCollection ? null : topic.collection ?? null;
        const key = collection?.id ?? null;
        if (!groups.has(key)) groups.set(key, { collection, cards: node('div', 'topics') });
        groups.get(key).cards.append(makeCard(topic, Boolean(collection)));
      }
      byId('topics').replaceChildren(...[...groups.values()].map(({ collection, cards }) => {
        if (!collection) return cards;
        const group = node('section', 'topic-group');
        const heading = node('h2', 'topic-group-title', collection.title);
        heading.id = 'conjunt-' + collection.id;
        group.setAttribute('aria-labelledby', heading.id);
        group.append(heading, cards);
        return group;
      }));
      byId('empty').hidden = matching.length > 0;
      byId('empty').textContent = activeCollection && !candidates.length ? 'La col·lecció encara és buida.' : 'No hi ha cap tema amb aquests filtres.';
      byId('topic-count').value = matching.length + (matching.length === 1 ? ' tema' : ' temes');
      filters.querySelector('button[type="reset"]').hidden = !controls.some(({ select }) => select.value);
    }
    filters.addEventListener('change', refresh);
    filters.addEventListener('reset', event => {
      event.preventDefault();
      for (const { select } of controls) select.selectedIndex = 0;
      refresh();
      controls[0].select.focus();
    });
    return refresh;
  }

  function extractRoute() {
    const path = location.hash.slice(1).split('/');
    activeCollection = null;
    if (path[0] === 'colleccio') {
      path.shift();
      activeCollection = library.collections.find(item => item.id === path.shift()) ?? null;
      if (!activeCollection) return null;
    }
    const topic = topicByCode.get(path.shift()?.toUpperCase());
    if (!topic || (activeCollection && !activeCollection.topicIds.includes(topic.id))) return null;
    const chapterId = topic.chapters.length > 1 ? path.shift() : topic.chapters[0].id;
    const chapter = topic.chapters.find(item => item.id === chapterId) ?? topic.chapters[0];
    const section = path[1];
    return { topic, chapter, section, collectionId: activeCollection?.id };
  }

  function getOptions(topic) {
    const chosen = preferences.loadLayout(topic.id, activeCollection, library);
    if (topic.chapters.length === 1) chosen.scope = 'chapter';
    return chosen;
  }

  function storeOptions() {
    const persisted = preferences.saveLayout(route.topic.id, activeCollection, settings, library);
    byId('save-status').hidden = persisted;
    byId('save-status').textContent = persisted ? '' : 'Els ajustos es mantindran mentre aquesta pàgina sigui oberta.';
  }

  function removedIds(chapter) {
    const ids = settings.hiddenSections[chapter.id];
    return new Set(Array.isArray(ids) ? ids : []);
  }

  function arrangeChapter(chapter) {
    const removed = removedIds(chapter);
    const sections = preferences.orderedSections(chapter, settings.sectionOrder[chapter.id]);
    return { ...chapter, sections: sections.filter(section => !removed.has(section.id)) };
  }

  function reservedFigures(chapter) {
    const figures = chapter.figures ?? [];
    return chapter.sections.flatMap((section, index) => {
      const [original, ...extra] = figures.filter(figure => figure.section === section.id);
      const startsWithText = section.blocks[0]?.type === 'paragraph';
      return [{
        id: 'reserva-' + section.id, section: section.id, name: section.title, ratio: 1.7,
        ...original,
        anchor: startsWithText ? 'lead' : 'before',
        width: Math.min(original?.width ?? 45, 45),
        position: index % 2 ? 'left' : 'right',
        wrap: startsWithText,
      }, ...extra];
    });
  }

  function figuresFor(chapter, type = documentType) {
    const style = selectedFigureStyle();
    const collectionId = activeCollection?.id ?? '';
    const userFigures = knownUploads.filter(item => item.topic === route.topic.id && item.chapter === chapter.id &&
      (item.collectionId ?? '') === collectionId && (item.documentType ?? 'sheet') === type);
    const planned = type === 'sheet' ? reservedFigures(chapter) : chapter.figures ?? [];
    const sections = new Set(chapter.sections.map(section => section.id));
    return [...planned, ...userFigures].map(item => {
      const variant = type === 'sheet' ? item.variants?.[style?.id] : undefined;
      const saved = settings.figures[item.id];
      const config = { ...item, ...variant, visible: true, ...saved, styleId: variant ? style.id : '' };
      if (variant) Object.assign(config, saved?.byStyle?.[style.id]);
      if (paragraphAnchor(config.anchor) === null || config.position === 'center') config.wrap = false;
      return config;
    }).filter(config => sections.has(config.section));
  }

  function figureStyles() {
    return documentType === 'sheet' ? route?.topic.figureStyles ?? [] : [];
  }

  function selectedFigureStyle() {
    const styles = figureStyles();
    return styles.find(style => style.id === settings.figureStyle) ?? styles[0];
  }

  function openFigureStyles(event) {
    const trigger = event.target.closest('[data-style-figure]');
    const styles = figureStyles();
    if (!trigger || styles.length < 2) return;
    const figures = route.topic.chapters.flatMap(chapter => chapter.figures ?? []);
    const hasBoth = figure => styles.every(style => figure.variants?.[style.id]?.src);
    const sample = figures.find(figure => figure.id === trigger.dataset.styleFigure && hasBoth(figure)) ??
      figures.find(hasBoth) ?? figures.find(figure => figure.variants);
    if (!sample) return;
    const selected = selectedFigureStyle()?.id;
    byId('figure-style-example').textContent = 'Mostra · ' + sample.name;
    byId('figure-style-choices').replaceChildren(...styles.map(style => {
      const option = node('button', 'figure-style-choice');
      option.type = 'button';
      option.dataset.figureStyle = style.id;
      option.setAttribute('aria-pressed', String(style.id === selected));
      option.autofocus = style.id === selected;
      const variant = sample.variants[style.id];
      if (variant?.src) {
        const image = node('img');
        image.src = variant.src;
        image.alt = variant.alt ?? sample.alt ?? '';
        option.append(image);
      } else {
        option.append(node('span', 'figure-style-pending', 'Mostra pendent'));
      }
      option.append(node('strong', '', style.label), node('span', 'figure-style-description', style.description));
      return option;
    }));
    figureStyleDialog.showModal();
  }

  function renderFigureStyleTools() {
    if (figureStyles().length < 2) return;
    for (const figure of stack.querySelectorAll('figure[data-styled]')) {
      const button = node('button', 'figure-style-trigger', 'Estil');
      button.type = 'button';
      button.dataset.styleFigure = figure.dataset.figure;
      button.setAttribute('aria-label', 'Tria l’estil de les il·lustracions');
      button.setAttribute('aria-haspopup', 'dialog');
      button.title = 'Tria l’estil de les il·lustracions';
      figure.append(button);
    }
  }

  function printableChapter(chapter) {
    if (documentType === 'sheet') return arrangeChapter(chapter);
    const solution = chapter.solution;
    return solution && arrangeChapter({ ...solution, id: chapter.id, title: solution.title ?? chapter.title });
  }

  function syncDocumentPicker() {
    const picker = byId('document-picker');
    const hasSolution = settings.scope === 'topic' ?
      route.topic.chapters.some(chapter => chapter.solution) : Boolean(route.chapter.solution);
    if (!hasSolution) documentType = 'sheet';
    picker.hidden = !hasSolution;
    for (const button of picker.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(button.dataset.document === documentType));
    }
  }

  function mountList(container, rows) {
    container.hidden = rows.length === 0;
    if (container.hidden) container.open = false;
    const list = node('ul');
    for (const [label, url] of rows) {
      const item = node('li');
      const anchor = link(label, url);
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      item.append(anchor);
      list.append(item);
    }
    const body = container.querySelector('.sidebar-pane');
    body.replaceChildren();
    if (rows.length) body.append(list);
  }

  function renderRelatedTopics(topic) {
    const container = byId('related-nav');
    const group = activeCollection ?? topic.collection;
    const membersOfGroup = activeCollection ? members(activeCollection) :
      group ? topics.filter(candidate => candidate.collection?.id === group.id) : [];
    const related = membersOfGroup.filter(item => item.id !== topic.id);
    const nav = container.querySelector('nav');
    nav.replaceChildren();
    container.hidden = !related.length;
    if (container.hidden) {
      container.open = false;
      return;
    }
    for (const item of related.slice(0, 3)) nav.append(link(item.title, address(item, item.chapters[0])));
    if (related.length > 3) {
      const target = activeCollection ? catalogAddress(activeCollection) : '#conjunt/' + group.id;
      nav.append(link('Mostra tot el conjunt', target, 'all-related'));
    }
  }

  function renderNavigation() {
    const { topic, chapter, section } = route;
    const nav = byId('chapter-nav');
    const hasChapters = topic.chapters.length > 1;
    nav.replaceChildren();
    const chapterMenu = byId('chapter-menu');
    const revealChapters = chapterMenu.hidden;
    chapterMenu.hidden = false;
    const restore = byId('reset-section-order');
    restore.hidden = !settings.sectionOrder[chapter.id];
    byId('outline-title').textContent = hasChapters ? 'Capítols' : 'Apartats';
    for (const entry of topic.chapters) {
      if (hasChapters) {
        const anchor = link(entry.title, address(topic, entry));
        if (entry.id === chapter.id && !section) anchor.setAttribute('aria-current', 'page');
        nav.append(anchor);
      }
      if (entry.id !== chapter.id) continue;
      const sub = node('div', hasChapters ? 'section-links' : '');
      for (const item of arrangeChapter(entry).sections) {
        const heading = link(item.title, address(topic, entry, item.id));
        if (item.id === section) heading.setAttribute('aria-current', 'location');
        sub.append(heading);
      }
      nav.append(sub);
    }
    renderRemovedSections(topic, chapter);
    renderRelatedTopics(topic);
    const resources = [...(topic.resources ?? []), ...(topic.collection?.resources ?? [])];
    mountList(byId('resources'), resources.map(item => [[item.title, item.provider].filter(Boolean).join(' · '), item.url]));
    mountList(byId('sources'), topic.sources ?? []);
    const outline = byId('topic-outline');
    if (revealChapters) chapterMenu.open = true;
    else if (!outline.querySelector('.sidebar-menu[open]:not([hidden])')) {
      const first = outline.querySelector('.sidebar-menu:not([hidden])');
      if (first) first.open = true;
    }
  }

  function renderRemovedSections(topic, chapter) {
    const container = byId('removed-sections');
    const chapters = settings.scope === 'topic' ? topic.chapters : [chapter];
    const items = [];
    for (const entry of chapters) {
      const removed = removedIds(entry);
      for (const section of entry.sections) {
        if (!removed.has(section.id)) continue;
        const item = node('li');
        const button = node('button', 'restore-section');
        button.type = 'button';
        button.dataset.chapter = entry.id;
        button.dataset.section = section.id;
        button.setAttribute('aria-label', 'Torna a afegir «' + section.title + '»');
        const plus = node('span', 'restore-section-icon', '+');
        plus.setAttribute('aria-hidden', 'true');
        const label = node('span', '', section.title);
        if (chapters.length > 1) label.append(node('small', '', entry.title));
        button.append(plus, label);
        item.append(button);
        items.push(item);
      }
    }
    container.querySelector('ul').replaceChildren(...items);
    container.hidden = items.length === 0;
  }

  function focusRemovedSection(chapter, section) {
    const buttons = byId('removed-sections').querySelectorAll('button');
    const target = [...buttons].find(button => button.dataset.chapter === chapter && button.dataset.section === section);
    if (!target) return;
    byId('topic-outline').open = true;
    byId('chapter-menu').open = true;
    target.focus();
  }

  function renderRoute(event) {
    const previous = route;
    route = extractRoute();
    const changedMaterial = previous?.topic.id !== route?.topic.id || previous?.collectionId !== route?.collectionId;
    if (changedMaterial && figureStyleDialog.open) figureStyleDialog.close();
    byId('catalog-home').href = route ? catalogAddress(activeCollection) : '#';
    byId('catalog').hidden = Boolean(route);
    const curriculumDialog = byId('curriculum-dialog');
    if (location.hash === '#mapa-curricular' && !curriculumDialog.open) {
      curriculumDialog.returnValue = '';
      curriculumDialog.showModal();
    }
    byId('workspace').hidden = !route;

    const title = byId('topic-title');
    title.hidden = !route;
    title.textContent = route?.topic.title ?? '';
    if (!route) {
      stopPaperMotion();
      if (printMenu.matches(':popover-open')) printMenu.hidePopover();
      sectionEdit = null;
      revision++;
      if (location.hash.startsWith('#conjunt/')) {
        const id = location.hash.slice('#conjunt/'.length);
        const group = topics.find(topic => topic.collection?.id === id)?.collection;
        if (group) {
          const filters = byId('catalog-filters');
          for (const select of filters.querySelectorAll('select')) select.selectedIndex = 0;
          filters.elements.collection.value = group.title;
        }
      }
      refreshCatalog();
      document.title = activeCollection ? activeCollection.name + ' · Món a mà' : catalogTitle;
      if (previous && event) byId('topics').querySelector('[data-topic="' + previous.topic.id + '"]')?.focus({ preventScroll: true });
      return;
    }

    const changedChapter = changedMaterial || previous?.chapter.id !== route.chapter.id;
    if (changedMaterial) {
      showQuickTemplate(false);
      quickTemplateStatus.textContent = '';
      settings = getOptions(route.topic);
      previewMagnification = 1;
      documentType = 'sheet';
      logoUploadVersion++;
      headerLogoFeedback('');
    }
    if (changedChapter) {
      byId('upload-status').hidden = true;
      byId('save-status').hidden = true;
      byId('upload').value = '';
      stack.scrollTop = 0;
      stack.scrollLeft = 0;
    }
    if (changedChapter || previous?.section !== route.section) {
      stopPaperMotion();
      sectionEdit = null;
      pendingSection = route.section ?? '';
      if (pendingSection) documentType = 'sheet';
    }
    document.title = route.chapter.title + ' · Món a mà';
    if (event && changedMaterial && !route.section) title.focus({ preventScroll: true });
    renderNavigation();
    renderControls();
    refreshPaper();
  }

  function control(label, input, className) {
    const wrapper = node('label', className);
    if (input.type === 'checkbox') wrapper.append(input, ' ' + label);
    else wrapper.append(label, input);
    return wrapper;
  }

  function figureControl(item, chapter) {
    const field = node('fieldset', 'figure-control');
    field.dataset.figureId = item.id;
    if (item.styleId) field.dataset.figureStyle = item.styleId;
    const title = item.name || item.alt?.replace(/\.$/, '') || 'Il·lustració';
    field.append(node('legend', 'sr-only', title));
    const header = node('div', 'figure-heading');
    const name = node('span', 'figure-name', title);
    name.setAttribute('aria-hidden', 'true');
    const visible = node('input');
    visible.type = 'checkbox';
    visible.checked = item.visible;
    visible.dataset.setting = 'visible';
    visible.setAttribute('aria-label', 'Mostra «' + title + '»');
    visible.title = 'Mostra a la fitxa';
    header.append(name, visible);
    field.append(header);

    const group = node('div', 'figure-options');
    group.hidden = !item.visible;
    const sizeAndAlignment = node('div', 'figure-size-alignment');
    const width = node('input');
    width.type = 'number';
    width.min = '25';
    width.max = '100';
    width.step = '1';
    width.defaultValue = item.width;
    width.dataset.setting = 'width';
    width.setAttribute('aria-label', 'Amplada en percentatge');
    const widthLabel = control('Amplada', width, 'figure-width');
    const percent = node('span', '', '%');
    percent.setAttribute('aria-hidden', 'true');
    widthLabel.append(percent);
    const alignment = figureAlignment.content.firstElementChild.cloneNode(true);
    alignment.setAttribute('role', 'group');
    alignment.setAttribute('aria-label', 'Alineació de la imatge');
    for (const radio of alignment.querySelectorAll('input')) {
      radio.name = 'figure-position-' + item.id;
      radio.checked = radio.value === item.position;
    }
    sizeAndAlignment.append(widthLabel, alignment);
    group.append(sizeAndAlignment);

    function picker(key, label, values) {
      const select = node('select');
      select.setAttribute('aria-label', label);
      select.title = label;
      select.append(...values.map(([value, text]) => option(value, text)));
      select.value = item[key];
      select.dataset.setting = key;
      return select;
    }

    const placement = node('div', 'figure-placement');
    const anchors = [['before', 'Abans del text'], ['lead', 'Amb el primer text']];
    const section = chapter.sections.find(entry => entry.id === item.section);
    section.blocks.forEach((entry, index) => {
      if (index > 0 && entry.type === 'paragraph') {
        anchors.push(['paragraph-' + index, 'Amb «' + entry.text.replaceAll('*', '').slice(0, 32) + '…»']);
      }
    });
    anchors.push(['after', 'Al final de l’apartat']);
    const flow = node('input');
    flow.type = 'checkbox';
    flow.checked = item.wrap;
    flow.disabled = item.position === 'center' || paragraphAnchor(item.anchor) === null;
    flow.dataset.setting = 'wrap';
    flow.setAttribute('aria-label', 'Envolta la imatge amb text');
    const wrapLabel = control('Envolta', flow, 'check figure-wrap');
    wrapLabel.title = 'Envolta la imatge amb text';
    placement.append(picker('anchor', 'Punt d’inserció', anchors), wrapLabel);
    group.append(placement);
    if (item.blob && chapter.sections.length > 1) {
      const sections = chapter.sections.map(entry => [entry.id, entry.title]);
      group.append(picker('section', 'Apartat de la imatge pujada', sections));
    }
    const notes = node('details', 'figure-notes');
    notes.append(node('summary', '', 'Peu i font'));
    const fields = node('div', 'figure-notes-fields');
    for (const [key, label, example] of [
      ['caption', 'Peu de la imatge', 'Descripció breu'],
      ['credit', 'Font o autoria', 'Autoria, arxiu o adreça web'],
    ]) {
      const input = node('input');
      input.type = 'text';
      input.value = item[key] ?? '';
      input.maxLength = 240;
      input.placeholder = example;
      input.dataset.setting = key;
      fields.append(control(label, input));
    }
    notes.append(fields);
    group.append(notes);
    if (item.blob) {
      const remove = node('button', 'figure-remove', '×');
      remove.type = 'button';
      remove.dataset.removeFigure = item.id;
      remove.title = 'Treu la imatge pujada';
      remove.setAttribute('aria-label', 'Treu «' + title + '»');
      header.append(remove);
    }
    field.append(group);
    return field;
  }

  function renderControls() {
    byId('print-scope').hidden = route.topic.chapters.length === 1;
    syncDocumentPicker();
    figureStyleButton.hidden = figureStyles().length < 2;
    const style = selectedFigureStyle();
    if (style) figureStyleButton.textContent = 'Estil · ' + style.label;
    for (const key of Object.keys(defaults)) {
      const input = form.elements.namedItem(key) ?? figureForm.elements.namedItem(key);
      if (!input) continue;
      if (input.type === 'checkbox') input.checked = settings[key];
      else input.value = settings[key];
    }
    syncMeasurements();
    syncHeaderControls();
    syncFooterControls();
    syncTemplateSelector();
    const chapter = printableChapter(route.chapter);
    const figures = chapter ? figuresFor(chapter) : [];
    byId('figure-options').replaceChildren(...figures.map(item => figureControl(item, chapter)));
    byId('upload').disabled = !chapter?.sections.length;
    byId('figure-options').hidden = !settings.showFigures;
  }

  function syncMeasurements() {
    byId('font-size-value').value = layoutNumber.format(settings.fontSize) + ' pt';
    byId('leading-value').value = layoutNumber.format(settings.leading);
    byId('margin-value').value = layoutNumber.format(settings.margin) + ' mm';
  }

  function syncFooterControls() {
    byId('page-footer-options').hidden = !settings.showPageFooter;
  }

  function syncHeaderControls() {
    byId('header-logo-options').hidden = !settings.headerLogo;
    byId('reset-header-logo').hidden = !settings.headerLogoImage;
    byId('classroom-code-options').hidden = !settings.showClassroomCode;
  }

  function headerLogoFeedback(message) {
    const status = byId('header-logo-status');
    status.textContent = message;
    status.hidden = !message;
  }

  async function changeHeaderLogo(event) {
    const input = event.target;
    const file = input.files[0];
    input.value = '';
    if (!file || !settings) return;
    const selected = settings;
    const version = ++logoUploadVersion;
    const source = URL.createObjectURL(file);
    const image = new Image();
    image.src = source;
    try {
      await image.decode();
      if (settings !== selected || logoUploadVersion !== version) return;
      const scale = Math.min(1, 640 / image.naturalWidth, 240 / image.naturalHeight);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/webp', .85);
      if (data.length > 180000) throw Error('Imatge massa gran');
      settings.headerLogoImage = data;
      storeOptions();
      syncHeaderControls();
      headerLogoFeedback('Logotip actualitzat.');
      requestPaper();
    } catch {
      if (settings === selected && logoUploadVersion === version) {
        headerLogoFeedback('No s’ha pogut carregar aquest logotip. Prova una altra imatge.');
      }
    } finally {
      URL.revokeObjectURL(source);
    }
  }

  function preload(url) {
    if (!images.has(url)) {
      const image = new Image();
      image.src = url;
      images.set(url, image.decode().then(() => ({ width: image.naturalWidth, height: image.naturalHeight })).catch(() => null));
    }
    return images.get(url);
  }

  function fitPaper() {
    if (!paper || !route) return;
    const padding = getComputedStyle(stack);
    const available = stack.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
    const fitted = Math.min(1, Math.max(0.1, available / paper.width));
    const zoom = fitted * previewMagnification;
    stack.style.setProperty('--zoom', zoom);
    for (const frame of stack.children) {
      frame.style.width = paper.width * zoom + 'px';
      frame.style.height = paper.height * zoom + 'px';
    }
    zoomOut.disabled = previewMagnification <= minPreviewMagnification;
    zoomReset.disabled = false;
    zoomIn.disabled = previewMagnification >= maxPreviewMagnification;
  }

  function zoomPaper(magnification, pointer) {
    const next = Math.min(maxPreviewMagnification, Math.max(minPreviewMagnification, magnification));
    if (!route || !paper || !stack.firstElementChild || next === previewMagnification) return;
    stopPaperMotion();
    const view = stack.getBoundingClientRect();
    const x = pointer?.clientX ?? view.left + stack.clientLeft + stack.clientWidth / 2;
    const y = pointer?.clientY ?? view.top + stack.clientTop + stack.clientHeight / 2;
    let frame = stack.firstElementChild;
    let before = frame.getBoundingClientRect();
    while (before.bottom < y && frame.nextElementSibling) {
      frame = frame.nextElementSibling;
      before = frame.getBoundingClientRect();
    }
    const anchorX = Math.max(0, Math.min(1, (x - before.left) / before.width));
    const anchorY = Math.max(0, Math.min(1, (y - before.top) / before.height));
    previewMagnification = next;
    fitPaper();
    const after = frame.getBoundingClientRect();
    stack.scrollLeft += after.left + anchorX * after.width - x;
    stack.scrollTop += after.top + anchorY * after.height - y;
  }

  function paperSection(chapter, section) {
    return byId('fitxa-' + chapter + '-' + section);
  }

  function renderSectionTools(chapters) {
    for (const chapter of chapters) {
      for (const [index, section] of chapter.sections.entries()) {
        const unit = paperSection(chapter.id, section.id);
        if (!unit) continue;
        const tools = node('div', 'section-preview-tools');
        const toggle = node('button', 'section-preview-toggle', '⋯');
        toggle.type = 'button';
        toggle.dataset.action = 'toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Opcions de «' + section.title + '»');
        toggle.setAttribute('aria-controls', unit.id + '-controls');
        const actions = node('div', 'section-preview-actions');
        actions.id = unit.id + '-controls';
        actions.setAttribute('role', 'group');
        actions.setAttribute('aria-label', 'Edita «' + section.title + '»');
        for (const [action, symbol, label, disabled] of [
          ['up', '↑', 'Puja', index === 0],
          ['down', '↓', 'Baixa', index === chapter.sections.length - 1],
          ['remove', '×', 'Treu de la fitxa', false],
        ]) {
          const button = node('button', '', symbol);
          button.type = 'button';
          button.dataset.action = action;
          button.title = label;
          button.setAttribute('aria-label', label + ' «' + section.title + '»');
          button.disabled = disabled;
          actions.append(button);
        }
        tools.append(toggle, actions);
        unit.append(tools);
      }
    }
  }

  function focusPaperSection(chapter, section) {
    const unit = paperSection(chapter, section);
    if (!unit) return false;
    unit.focus({ preventScroll: true });
    stack.scrollTop += unit.getBoundingClientRect().top - stack.getBoundingClientRect().top - 12;
    return true;
  }

  function focusMovedSection({ chapter, section, action }) {
    const unit = paperSection(chapter, section);
    const heading = unit?.querySelector('.section-title');
    if (!heading || !inPreview(heading.getBoundingClientRect(), stack.getBoundingClientRect())) {
      stack.focus({ preventScroll: true });
      return;
    }
    const tools = unit.querySelector('.section-preview-tools');
    tools.querySelector('.section-preview-toggle').setAttribute('aria-expanded', 'true');
    const button = tools.querySelector('[data-action="' + action + '"]:not(:disabled)') ??
      tools.querySelector('.section-preview-actions button:not(:disabled)');
    button.focus({ preventScroll: true });
  }

  function stopPaperMotion() {
    for (const animation of paperAnimations) animation.cancel();
    paperAnimations = [];
    for (const unit of stack.querySelectorAll('[data-paper-in-motion]')) delete unit.dataset.paperInMotion;
    stack.classList.remove('is-repaginating');
    motionLayer.replaceChildren();
  }

  function sectionUnitsOnPaper({ chapter, section }) {
    const prefix = 'fitxa-' + chapter + '-' + section + ':';
    return [...stack.querySelectorAll('[data-paper-unit]')].filter(unit => unit.dataset.paperUnit.startsWith(prefix));
  }

  function capturePaperMotion(edit) {
    const duration = parseFloat(getComputedStyle(stack).getPropertyValue('--motion-duration'));
    if (!duration || typeof stack.animate !== 'function') return;
    const units = new Map(sectionUnitsOnPaper(edit).map(unit =>
      [unit.dataset.paperUnit, { unit, rect: unit.getBoundingClientRect() }]));
    return { units, duration, view: stack.getBoundingClientRect(), zoom: parseFloat(stack.style.getPropertyValue('--zoom')) || 1 };
  }

  function inPreview(rect, view) {
    return rect.bottom > view.top && rect.top < view.bottom;
  }

  function removedPaperUnit({ unit, rect }, layer, zoom) {
    const ghost = unit.closest('.sheet').cloneNode(false);
    const clone = unit.cloneNode(true);
    clone.querySelector('.section-preview-tools')?.remove();
    clone.removeAttribute('id');
    clone.removeAttribute('tabindex');
    clone.removeAttribute('data-paper-unit');
    clone.removeAttribute('data-paper-section');
    const body = node('div', 'sheet-body');
    body.append(clone);
    ghost.append(body);
    ghost.classList.add('paper-ghost');
    ghost.style.left = rect.left - layer.left + 'px';
    ghost.style.top = rect.top - layer.top + 'px';
    ghost.style.width = rect.width / zoom + 'px';
    ghost.style.setProperty('--ghost-zoom', zoom);
    motionLayer.append(ghost);
    return ghost;
  }

  function animatePaper(snapshot, edit) {
    const timing = { duration: snapshot.duration, easing: 'ease-out' };
    const animations = [];
    if (edit.action === 'remove') {
      const layer = motionLayer.getBoundingClientRect();
      for (const previous of snapshot.units.values()) {
        if (!inPreview(previous.rect, snapshot.view)) continue;
        const ghost = removedPaperUnit(previous, layer, snapshot.zoom);
        animations.push(ghost.animate([{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 -9px' }], timing));
      }
    } else {
      const zoom = parseFloat(stack.style.getPropertyValue('--zoom')) || 1;
      const view = stack.getBoundingClientRect();
      for (const unit of sectionUnitsOnPaper(edit)) {
        const last = unit.getBoundingClientRect();
        const first = snapshot.units.get(unit.dataset.paperUnit)?.rect;
        if (!inPreview(last, view) && (!first || !inPreview(first, snapshot.view))) continue;
        let frames;
        if (first) {
          const x = (first.left - last.left) / zoom;
          const y = (first.top - last.top) / zoom;
          if (Math.abs(x) < 1 && Math.abs(y) < 1) continue;
          frames = [{ transform: 'translate(' + x + 'px, ' + y + 'px)' }, { transform: 'none' }];
        } else {
          frames = [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }];
        }
        unit.dataset.paperInMotion = first ? 'move' : 'enter';
        animations.push(unit.animate(frames, timing));
      }
    }
    if (!animations.length) return;
    stack.classList.add('is-repaginating');
    paperAnimations = animations;
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (paperAnimations === animations) stopPaperMotion();
    });
  }

  function setPrintReady(ready) {
    for (const button of printButtons) button.disabled = !ready;
  }

  async function refreshPaper() {
    const ticket = ++revision;
    const { topic, chapter } = route;
    const options = { ...settings, documentType };
    const chapters = (options.scope === 'topic' ? topic.chapters : [chapter]).map(printableChapter).filter(Boolean);
    setPrintReady(false);
    printStatus.hidden = true;
    const fontReady = loadPaperFont(options.font);
    const selected = chapters.map(entry => [entry.id, options.showFigures ? figuresFor(entry).filter(item => item.visible) : []]);
    let missing = false;
    const resolved = await Promise.all(selected.map(async ([id, candidates]) => {
      const figures = await Promise.all(candidates.map(async item => {
        if (!item.src) return item;
        const size = await preload(item.src);
        if (!size) {
          missing = true;
          return item.styleId ? { ...item, src: '' } : null;
        }
        return { ...item, pixelWidth: size.width, pixelHeight: size.height };
      }));
      return [id, figures.filter(Boolean)];
    }));
    await fontReady;
    if (ticket !== revision || !route) return;
    const edit = sectionEdit;
    sectionEdit = null;
    const scrollTop = stack.scrollTop;
    const snapshot = edit && capturePaperMotion(edit);
    stopPaperMotion();
    const focusedStyleFigure = document.activeElement?.dataset.styleFigure;
    paper = paginate(topic, chapters, new Map(resolved), options, byId('layout-probe'), stack);
    if (documentType === 'sheet') renderSectionTools(chapters);
    renderFigureStyleTools();
    fitPaper();
    if (focusedStyleFigure) {
      [...stack.querySelectorAll('[data-style-figure]')].find(button =>
        button.dataset.styleFigure === focusedStyleFigure)?.focus({ preventScroll: true });
    }
    if (edit) stack.scrollTop = scrollTop;
    if (pendingSection) {
      if (!focusPaperSection(chapter.id, pendingSection)) focusRemovedSection(chapter.id, pendingSection);
      pendingSection = '';
    } else if (edit?.action === 'restore') {
      focusPaperSection(edit.chapter, edit.section);
    } else if (edit?.action === 'up' || edit?.action === 'down') {
      focusMovedSection(edit);
    }
    if (snapshot) animatePaper(snapshot, edit);
    const warnings = [];
    if (missing) warnings.push('Alguna imatge no s’ha pogut carregar.');
    if (paper.oversized) warnings.push('Redueix la lletra, l’interlineat o els marges per encabir el contingut.');
    printStatus.textContent = warnings.join(' ');
    printStatus.hidden = !warnings.length;
    setPrintReady(!paper.oversized);
  }

  function requestPaper() {
    revision++;
    setPrintReady(false);
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      if (route) refreshPaper();
    });
  }

  function updateOption(event) {
    const input = event.target;
    if (input.type === 'file') return;
    if (event.type === 'input' && !['range', 'text', 'number'].includes(input.type)) return;
    const isNumber = input.type === 'range' || input.name === 'classroomCodeSize';
    let value = input.type === 'checkbox' ? input.checked : isNumber ? Number(input.value) : input.value;
    const card = input.closest('[data-figure-id]');
    if (card) {
      const id = card.dataset.figureId;
      const key = input.dataset.setting;
      if (!key) return;
      if (key === 'width') {
        const width = input.valueAsNumber;
        if (event.type === 'input' && (!Number.isFinite(width) || !input.validity.valid)) return;
        value = Number.isFinite(width)
          ? Math.min(Number(input.max), Math.max(Number(input.min), Math.round(width)))
          : settings.figures[id]?.width ?? Number(input.defaultValue);
        if (event.type !== 'input') input.value = value;
        if (settings.figures[id]?.width === value) return;
      }
      const saved = settings.figures[id];
      const styleId = card.dataset.figureStyle;
      if (styleId && (key === 'caption' || key === 'credit')) {
        const byStyle = saved?.byStyle;
        settings.figures[id] = {
          ...saved,
          byStyle: { ...byStyle, [styleId]: { ...byStyle?.[styleId], [key]: value } },
        };
      } else {
        settings.figures[id] = { ...saved, [key]: value };
      }
      if (key === 'visible') card.querySelector('.figure-options').hidden = !value;
      if (key === 'section') {
        settings.figures[id].anchor = 'lead';
        renderControls();
        figureForm.querySelector('[data-figure-id="' + id + '"] [data-setting="section"]').focus({ preventScroll: true });
      } else if (key === 'anchor' || key === 'position') {
        const current = figuresFor(printableChapter(route.chapter)).find(item => item.id === id);
        const wrap = card.querySelector('[data-setting="wrap"]');
        wrap.disabled = paragraphAnchor(current.anchor) === null || current.position === 'center';
        wrap.checked = current.wrap;
      }
    } else {
      if (!(input.name in defaults)) return;
      settings[input.name] = value;
      if (['fontSize', 'leading', 'margin'].includes(input.name)) syncMeasurements();
      if (input.name === 'showFigures') byId('figure-options').hidden = !value;
      if (input.name === 'headerLogo' || input.name === 'showClassroomCode') syncHeaderControls();
      if (input.name === 'showPageFooter') syncFooterControls();
      if (input.name === 'scope') {
        renderNavigation();
        renderControls();
      }
    }
    quickTemplateStatus.textContent = '';
    storeOptions();
    requestPaper();
  }

  function imageFeedback(message) {
    byId('upload-status').textContent = message;
    byId('upload-status').hidden = !message;
  }

  async function addImage(event) {
    const input = event.target;
    const file = input.files[0];
    if (!file || !route) return;
    const { topic, chapter } = route;
    const printable = printableChapter(chapter);
    input.value = '';
    if (!printable?.sections.length) return;
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'].includes(file.type) || file.size > 12 * 1024 * 1024) {
      imageFeedback('Tria una imatge PNG, JPG, WebP, GIF o AVIF de fins a 12 MB.');
      return;
    }
    const name = file.name.replace(/\.[^.]+$/, '').slice(0, 75);
    const source = {
      id: 'local-' + crypto.getRandomValues(new Uint32Array(4)).join('-'),
      name, alt: name, caption: '', blob: file, topic: topic.id, chapter: chapter.id, documentType,
      collectionId: activeCollection?.id ?? '',
      section: printable.sections[0].id, anchor: 'lead', width: 55, position: 'center', wrap: false,
    };
    const item = addUrl(source);
    if (!await preload(item.src)) {
      URL.revokeObjectURL(item.src);
      images.delete(item.src);
      imageFeedback('El navegador no pot obrir aquesta imatge.');
      return;
    }
    let persisted = true;
    try { await imageOperation('readwrite', store => store.put(source)); }
    catch { persisted = false; }
    knownUploads.push({ ...item, persisted });
    if (route?.topic.id === topic.id && route.chapter.id === chapter.id && source.documentType === documentType && source.collectionId === (activeCollection?.id ?? '')) {
      settings.showFigures = true;
      storeOptions();
      renderControls();
      requestPaper();
      imageFeedback(persisted ? 'Imatge afegida.' : 'Imatge afegida per a aquesta sessió.');
    }
  }

  async function removeImage(event) {
    const id = event.target.dataset.removeFigure;
    if (!id) return;
    const item = knownUploads.find(image => image.id === id);
    if (!item) return;
    try { await imageOperation('readwrite', store => store.delete(id)); }
    catch {
      // An image added in memory can still be removed.
      if (item.persisted) {
        imageFeedback('No s’ha pogut treure la imatge desada.');
        return;
      }
    }
    knownUploads = knownUploads.filter(image => image.id !== id);
    URL.revokeObjectURL(item.src);
    images.delete(item.src);
    if (route?.topic.id === item.topic && (activeCollection?.id ?? '') === (item.collectionId ?? '')) {
      delete settings.figures[id];
      storeOptions();
      renderControls();
      requestPaper();
      imageFeedback('Imatge treta.');
    }
  }


  function templateOptions(inheritedLabel) {
    return [
      ...(inheritedLabel ? [option('inherit', inheritedLabel)] : []),
      option('', 'Format original'),
      ...library.templates.map(item => option(item.id, item.name)),
    ];
  }

  function syncTemplateSelector() {
    const select = byId('layout-template');
    const inheritedId = activeCollection?.templateId ?? library.defaultTemplateId;
    const inherited = library.templates.find(item => item.id === inheritedId)?.name ?? 'Format original';
    select.replaceChildren(...templateOptions('Per defecte · ' + inherited));
    select.value = settings.templateId ?? 'inherit';
    const template = library.templates.find(item => item.id === settings.templateId);
    const save = byId('save-active-template');
    save.hidden = !template;
    save.title = template ? 'Desa els canvis a «' + template.name + '»' : '';
    byId('new-template').textContent = template ? 'Nova plantilla' : 'Desa plantilla…';
  }

  function showQuickTemplate(open) {
    quickTemplateEntry.hidden = !open;
    byId('template-actions').hidden = open;
    byId('new-template').setAttribute('aria-expanded', String(open));
    if (open) {
      quickTemplateForm.reset();
      quickTemplateStatus.textContent = '';
      quickTemplateForm.elements.title.focus();
    }
  }

  function saveCurrentTemplate(id, name) {
    const template = { id, name, format: preferences.format(settings) };
    const persisted = updateLibrary(data => {
      const index = data.templates.findIndex(item => item.id === id);
      if (index < 0) data.templates.push(template);
      else data.templates[index] = template;
    });
    applyTemplate(id);
    quickTemplateStatus.textContent = persisted ? 'Plantilla desada.' : 'Plantilla disponible durant aquesta sessió.';
  }

  function applyTemplate(id) {
    settings.templateId = id;
    quickTemplateStatus.textContent = '';
    Object.assign(settings, preferences.format(preferences.getBase(id, activeCollection, library)));
    storeOptions();
    renderControls();
    requestPaper();
  }

  function showTemplateManager(selected = '') {
    const manager = byId('template-form');
    const picker = byId('default-template');
    picker.replaceChildren(...templateOptions());
    picker.value = library.defaultTemplateId;
    const select = manager.elements.template;
    select.replaceChildren(...library.templates.map(item => option(item.id, item.name)));
    const template = library.templates.find(item => item.id === selected) ?? library.templates[0];
    manager.hidden = !template;
    select.value = template?.id ?? '';
    manager.elements.title.value = template?.name ?? '';
  }

  function updateLibrary(change) {
    const persisted = preferences.saveLibrary(change);
    library = preferences.library();
    if (activeCollection) activeCollection = library.collections.find(item => item.id === activeCollection.id) ?? null;
    return persisted;
  }

  function templateStatus(message, persisted) {
    byId('template-status').textContent = persisted ? message : message + ' Disponible durant aquesta sessió.';
  }

  function editCollection(collection) {
    const editor = byId('collection-form');
    editor.dataset.collectionId = collection?.id ?? '';
    editor.elements.title.value = collection?.name ?? '';
    editor.elements.template.replaceChildren(...templateOptions('Per defecte del professorat'));
    editor.elements.template.value = collection?.templateId ?? 'inherit';
    const ids = collection?.topicIds ?? [];
    const choices = collection ? [...members(collection), ...topics.filter(item => !ids.includes(item.id))] : topics;
    byId('collection-topics').replaceChildren(...choices.map(topic => {
      const choice = node('input');
      choice.type = 'checkbox';
      choice.name = 'material';
      choice.value = topic.id;
      choice.checked = ids.includes(topic.id);
      return control(topic.title, choice, 'check');
    }));
    byId('remove-collection').hidden = !collection;
    byId('collection-status').textContent = '';
    byId('collection-dialog').showModal();
  }

  function showCollection(collection) {
    const hash = catalogAddress(collection);
    if (location.hash === hash || (!location.hash && hash === '#')) renderRoute();
    else location.hash = hash;
  }

  function updateSections(message, edit) {
    sectionEdit = edit;
    storeOptions();
    renderNavigation();
    renderControls();
    byId('section-order-status').textContent = message;
    requestPaper();
  }

  function editPreviewSection(event) {
    const button = event.target.closest('.section-preview-tools button');
    if (!button || !route || documentType !== 'sheet') return;
    const { action } = button.dataset;
    if (action === 'toggle') {
      button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'));
      return;
    }
    const unit = button.closest('[data-paper-section]');
    const { paperChapter, paperSection: id } = unit.dataset;
    const chapter = route.topic.chapters.find(entry => entry.id === paperChapter);
    if (!chapter) return;
    const removed = removedIds(chapter);
    const ordered = preferences.orderedSections(chapter, settings.sectionOrder[chapter.id]);
    const visible = ordered.filter(section => !removed.has(section.id));
    const index = visible.findIndex(section => section.id === id);
    if (index < 0) return;
    const section = visible[index];

    if (action === 'remove') {
      removed.add(id);
      settings.hiddenSections[chapter.id] = [...removed];
      updateSections('S’ha tret «' + section.title + '» de la fitxa.', { chapter: chapter.id, section: id, action });
      focusRemovedSection(chapter.id, id);
      return;
    }

    const direction = action === 'up' ? -1 : 1;
    const neighbor = visible[index + direction];
    if (!neighbor) return;
    const from = ordered.indexOf(section);
    const to = ordered.indexOf(neighbor);
    [ordered[from], ordered[to]] = [ordered[to], ordered[from]];
    settings.sectionOrder[chapter.id] = ordered.map(item => item.id);
    updateSections(section.title + '. Posició ' + (index + direction + 1) + ' de ' + visible.length + '.',
      { chapter: chapter.id, section: id, action });
  }

  function restoreSection(event) {
    const button = event.target.closest('button[data-section]');
    if (!button || !route) return;
    const chapter = route.topic.chapters.find(entry => entry.id === button.dataset.chapter);
    const section = chapter?.sections.find(entry => entry.id === button.dataset.section);
    if (!section) return;
    const removed = removedIds(chapter);
    if (!removed.delete(section.id)) return;
    if (removed.size) settings.hiddenSections[chapter.id] = [...removed];
    else delete settings.hiddenSections[chapter.id];
    documentType = 'sheet';
    updateSections('S’ha afegit «' + section.title + '» a la fitxa.',
      { chapter: chapter.id, section: section.id, action: 'restore' });
  }

  codeInput.addEventListener('input', () => codeInput.setCustomValidity(''));
  byId('material-code-form').addEventListener('submit', event => {
    event.preventDefault();
    const topic = topicByCode.get(codeInput.value.trim().toUpperCase());
    if (!topic) {
      codeInput.setCustomValidity('No hi ha cap material amb aquest codi.');
      codeInput.reportValidity();
      return;
    }
    codeInput.value = '';
    location.hash = address(topic, topic.chapters[0], '', null);
  });

  byId('catalog-collection').addEventListener('change', event => {
    showCollection(library.collections.find(item => item.id === event.target.value));
  });
  byId('new-collection').addEventListener('click', () => editCollection());
  byId('edit-collection').addEventListener('click', () => editCollection(activeCollection));
  byId('collection-form').addEventListener('submit', event => {
    event.preventDefault();
    const editor = event.currentTarget;
    const name = editor.elements.title.value.trim();
    if (!name) return;
    const id = editor.dataset.collectionId || 'col-' + crypto.getRandomValues(new Uint32Array(2)).join('-');
    const topics = [...editor.querySelectorAll('input[name="material"]:checked')].map(input => input.value);
    const selected = editor.elements.template.value;
    const collection = { id, name, topicIds: topics, templateId: selected === 'inherit' ? null : selected };
    const persisted = updateLibrary(data => {
      const index = data.collections.findIndex(item => item.id === id);
      if (index < 0) data.collections.push(collection);
      else data.collections[index] = collection;
    });
    if (!persisted) {
      byId('collection-status').textContent = 'La col·lecció es mantindrà mentre aquesta pàgina sigui oberta.';
      editor.dataset.collectionId = id;
      byId('remove-collection').hidden = false;
      refreshCatalog();
      return;
    }
    byId('collection-dialog').close();
    showCollection(collection);
  });
  byId('remove-collection').addEventListener('click', async () => {
    const id = byId('collection-form').dataset.collectionId;
    const collection = library.collections.find(item => item.id === id);
    if (!collection || !window.confirm('Vols suprimir «' + collection.name + '» i la seva maquetació?')) return;
    const uploads = knownUploads.filter(item => item.collectionId === id);
    try {
      if (uploads.some(item => item.persisted)) {
        await imageOperation('readwrite', store => {
          for (const item of uploads.filter(image => image.persisted)) store.delete(item.id);
          return store.count();
        });
      }
    } catch {
      byId('collection-status').textContent = 'No s’han pogut eliminar les imatges de la col·lecció. Prova-ho de nou.';
      return;
    }
    for (const item of uploads) {
      URL.revokeObjectURL(item.src);
      images.delete(item.src);
    }
    knownUploads = knownUploads.filter(item => item.collectionId !== id);
    preferences.clearCollectionLayouts(id);
    updateLibrary(data => { data.collections = data.collections.filter(item => item.id !== id); });
    byId('collection-dialog').close();
    showCollection();
  });
  stack.addEventListener('click', editPreviewSection);
  stack.addEventListener('click', openFigureStyles);
  figureStyleButton.addEventListener('click', openFigureStyles);
  byId('figure-style-choices').addEventListener('click', event => {
    const id = event.target.closest('button[data-figure-style]')?.dataset.figureStyle;
    if (!figureStyles().some(style => style.id === id)) return;
    figureStyleDialog.close();
    if (selectedFigureStyle()?.id === id) return;
    settings.figureStyle = id;
    storeOptions();
    renderControls();
    requestPaper();
  });
  byId('removed-sections').addEventListener('click', restoreSection);
  byId('reset-section-order').addEventListener('click', () => {
    delete settings.sectionOrder[route.chapter.id];
    updateSections('S’ha recuperat l’ordre original dels apartats.');
    byId('outline-title').focus({ preventScroll: true });
  });
  byId('layout-template').addEventListener('change', event => {
    const selected = event.target.value;
    applyTemplate(selected === 'inherit' ? null : selected);
  });
  byId('new-template').addEventListener('click', () => showQuickTemplate(true));
  function cancelQuickTemplate() {
    showQuickTemplate(false);
    byId('new-template').focus();
  }
  byId('cancel-new-template').addEventListener('click', cancelQuickTemplate);
  quickTemplateEntry.addEventListener('keydown', event => {
    if (event.key === 'Escape') cancelQuickTemplate();
  });
  quickTemplateForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = quickTemplateForm.elements.title.value.trim();
    if (!name) return;
    const id = 'fmt-' + crypto.getRandomValues(new Uint32Array(2)).join('-');
    saveCurrentTemplate(id, name);
    showQuickTemplate(false);
    byId('save-active-template').focus();
  });
  byId('save-active-template').addEventListener('click', () => {
    const template = library.templates.find(item => item.id === settings.templateId);
    if (template) saveCurrentTemplate(template.id, template.name);
  });
  byId('manage-templates').addEventListener('click', () => {
    byId('template-status').textContent = '';
    showTemplateManager(settings.templateId ?? '');
  });
  byId('template-form').elements.template.addEventListener('change', event => showTemplateManager(event.target.value));
  byId('template-form').addEventListener('submit', event => {
    event.preventDefault();
    const manager = event.currentTarget;
    const name = manager.elements.title.value.trim();
    if (!name) return;
    const id = manager.elements.template.value;
    const persisted = updateLibrary(data => {
      const template = data.templates.find(item => item.id === id);
      if (template) template.name = name;
    });
    syncTemplateSelector();
    showTemplateManager(id);
    templateStatus('Nom de la plantilla actualitzat.', persisted);
  });
  byId('default-template').addEventListener('change', event => {
    const persisted = updateLibrary(data => { data.defaultTemplateId = event.target.value; });
    settings = getOptions(route.topic);
    renderControls();
    requestPaper();
    templateStatus('Format per defecte actualitzat.', persisted);
  });
  byId('remove-template').addEventListener('click', () => {
    const id = byId('template-form').elements.template.value;
    const template = library.templates.find(item => item.id === id);
    if (!template || !window.confirm('Vols suprimir la plantilla «' + template.name + '»?')) return;
    const persisted = updateLibrary(data => {
      data.templates = data.templates.filter(item => item.id !== id);
      if (data.defaultTemplateId === id) data.defaultTemplateId = '';
      for (const item of data.collections) if (item.templateId === id) item.templateId = null;
    });
    settings = getOptions(route.topic);
    renderControls();
    requestPaper();
    showTemplateManager();
    templateStatus('Plantilla suprimida.', persisted);
  });
  for (const panel of [form, figureForm]) {
    panel.addEventListener('submit', event => event.preventDefault());
    panel.addEventListener('input', updateOption);
    panel.addEventListener('change', updateOption);
  }
  figureForm.addEventListener('focusout', event => {
    const input = event.target;
    if (input.dataset.setting === 'width' && (!input.value || !input.validity.valid)) updateOption(event);
  });
  byId('figure-options').addEventListener('click', removeImage);
  byId('upload').addEventListener('change', addImage);
  byId('header-logo-upload').addEventListener('change', changeHeaderLogo);
  byId('reset-header-logo').addEventListener('click', () => {
    logoUploadVersion++;
    delete settings.headerLogoImage;
    storeOptions();
    syncHeaderControls();
    headerLogoFeedback('');
    byId('header-logo-upload').focus({ preventScroll: true });
    requestPaper();
  });
  byId('document-picker').addEventListener('click', event => {
    const type = event.target.closest('button')?.dataset.document;
    if (!type || type === documentType) return;
    documentType = type;
    sectionEdit = null;
    renderControls();
    requestPaper();
  });
  byId('reset').addEventListener('click', () => {
    logoUploadVersion++;
    headerLogoFeedback('');
    settings = {
      ...preferences.getBase(settings.templateId, activeCollection, library), templateId: settings.templateId,
      figures: {}, figureStyle: settings.figureStyle, sectionOrder: settings.sectionOrder, hiddenSections: settings.hiddenSections,
    };
    storeOptions();
    renderNavigation();
    renderControls();
    requestPaper();
  });
  function printDocument() {
    if (!route || !paper || paper.oversized) return;
    const title = document.title;
    const name = settings.scope === 'topic' ? route.topic.title : printableChapter(route.chapter).title;
    document.title = documentType === 'solution' ? name + ' · Solucionari' : name;
    try { window.print(); }
    finally { document.title = title; }
  }
  for (const button of printButtons) {
    button.addEventListener('click', () => {
      if (printMenu.matches(':popover-open')) printMenu.hidePopover();
      printDocument();
    });
  }
  zoomOut.addEventListener('click', () => zoomPaper(previewMagnification / zoomStep));
  zoomIn.addEventListener('click', () => zoomPaper(previewMagnification * zoomStep));
  zoomReset.addEventListener('click', () => {
    zoomPaper(1);
    stack.scrollLeft = 0;
  });
  byId('studio').addEventListener('wheel', event => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stack.clientHeight : 1;
    const distance = Math.max(-240, Math.min(240, event.deltaY * unit));
    if (distance) zoomPaper(previewMagnification * 2 ** (-distance / 480), event);
  }, { passive: false });
  new ResizeObserver(fitPaper).observe(stack);
  window.addEventListener('hashchange', event => {
    if (location.hash !== '#main') renderRoute(event);
  });
  const refreshCatalog = setupCatalog();
  window.setupCurriculum(topics, (topic, section) => {
    const chapter = topic.chapters.find(entry => entry.sections.some(item => item.id === section)) ?? topic.chapters[0];
    return address(topic, chapter, section, null);
  });
  renderRoute();
  imageOperation('readonly', store => store.getAll()).then(items => {
    knownUploads.push(...items.map(item => ({ ...addUrl(item), persisted: true })));
    if (route) {
      renderControls();
      requestPaper();
    }
  }).catch(() => {
    byId('upload-hint').textContent = 'Les imatges afegides es mantindran mentre aquesta pàgina sigui oberta.';
  });
})();
