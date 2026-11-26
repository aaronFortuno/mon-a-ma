(() => {
  const locale = document.documentElement.lang;
  const cycleById = new Map(window.curriculum.cycles.map(cycle => [cycle.id, cycle]));
  const topics = window.quaderns.filter(topic => topic.lang === locale);
  const { node, paragraphAnchor, loadPaperFont, paginate } = window.imprimible;
  const preferences = window.preferencies;
  const { defaults } = preferences;
  const materialLevels = [
    { id: 'suport', label: 'Amb suport' },
    { id: 'intermedia', label: 'Intermèdia' },
    { id: 'ampliacio', label: 'Ampliació' },
  ];
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
  const figureOptions = byId('figure-options');
  const figureHelper = byId('figure-helper');
  const figureUpload = byId('figure-upload');
  const levelPicker = byId('material-level');
  let helperFigure = '';
  let helperPinned = false;
  let helperTimer;
  let uploadTarget = null;
  let imageWrite = false;
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
      difficulty: topic => availableLevels(topic).length > 1 ? availableLevels(topic).map(level => level.label) : [topic.difficulty],
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
      const levels = availableLevels(topic);
      const extent = [topic.code, size(topic), levels.length > 1 ? levels.length + ' variants' : topic.difficulty].filter(Boolean).join(' · ');
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
    const uploads = knownUploads.filter(item => item.topic === route.topic.id && item.chapter === chapter.id &&
      (item.collectionId ?? '') === (activeCollection?.id ?? '') && (item.documentType ?? 'sheet') === type);
    const planned = type === 'sheet' ? reservedFigures(chapter) : chapter.figures ?? [];
    const sections = new Map(chapter.sections.map(section => [section.id, section]));
    return [...planned, ...uploads.filter(upload => !upload.figure)].map(item => {
      const saved = settings.figures[item.id];
      const personal = uploads.find(upload => upload.figure === item.id);
      const styles = route.topic.figureStyles ?? [];
      const variants = styles.filter(style => item.variants?.[style.id]).map(style => ({
        ...style, ...item.variants[style.id],
      }));
      if (!variants.length && item.src && !item.blob) variants.push({ id: 'original', label: 'Original', src: item.src });
      if (personal) variants.push({ id: 'custom', label: 'Imatge pròpia', src: personal.src, alt: personal.alt });
      const defaultVariant = variants.find(variant => variant.id === (settings.figureStyle || route.topic.defaultFigureStyle) && variant.src) ??
        variants.find(variant => variant.id !== 'custom' && variant.src);
      const selected = variants.find(variant => variant.id === saved?.variant && variant.src) ?? defaultVariant;
      const config = {
        ...item, ...selected, id: item.id, visible: true, ...saved,
        variants, selectedVariant: selected?.id ?? '', chapterId: chapter.id,
        ...(selected?.id === 'custom' ? { caption: '', credit: '' } : {}),
        ...saved?.byStyle?.[selected?.id],
      };
      const paragraph = paragraphAnchor(config.anchor);
      const blocks = sections.get(config.section)?.blocks;
      if (paragraph > 0 && blocks?.[paragraph]?.type !== 'paragraph') {
        config.anchor = blocks?.[0]?.type === 'paragraph' ? 'lead' : 'before';
      }
      if (paragraphAnchor(config.anchor) === null || config.position === 'center') config.wrap = false;
      return config;
    }).filter(config => sections.has(config.section));
  }

  function findFigure(id) {
    const { topic, chapter } = route;
    for (const entry of settings.scope === 'topic' ? topic.chapters : [chapter]) {
      const printable = printableChapter(entry);
      const figure = printable && figuresFor(printable).find(item => item.id === id);
      if (figure) return figure;
    }
  }

  function figureChoices(item) {
    const group = node('div', 'figure-style-choices');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Imatges de «' + item.name + '»');
    for (const variant of item.variants) {
      const button = node('button', 'figure-style-choice');
      button.type = 'button';
      button.dataset.variant = variant.id;
      button.dataset.choiceFigure = item.id;
      button.setAttribute('aria-pressed', String(variant.id === item.selectedVariant));
      button.setAttribute('aria-label', variant.src ? variant.label : variant.label + ' · Pendent');
      button.title = variant.label;
      if (variant.src) {
        const image = node('img');
        image.src = variant.src;
        image.alt = '';
        button.append(image);
      } else {
        button.disabled = true;
        button.append(node('span', 'figure-style-pending', 'Pendent'));
      }
      group.append(button);
    }
    const personal = item.variants.some(variant => variant.id === 'custom');
    const upload = node('button', 'secondary figure-upload-button', personal ? 'Substitueix la imatge pròpia' : 'Puja una imatge');
    upload.type = 'button';
    upload.dataset.uploadFigure = item.id;
    group.append(upload);
    return group;
  }

  function clearHelperTimer() {
    clearTimeout(helperTimer);
  }

  function closeFigureHelper(restoreFocus = false) {
    const id = helperFigure;
    clearHelperTimer();
    helperFigure = '';
    helperPinned = false;
    figureHelper.hidden = true;
    for (const button of stack.querySelectorAll('[data-style-figure]')) {
      button.setAttribute('aria-expanded', 'false');
      if (restoreFocus && button.dataset.styleFigure === id) button.focus({ preventScroll: true });
    }
  }

  function positionFigureHelper() {
    if (!helperFigure) return;
    const figure = stack.querySelector('figure[data-figure="' + CSS.escape(helperFigure) + '"]');
    const media = figure?.querySelector(':scope > img, :scope > .image-placeholder');
    const bounds = media?.getBoundingClientRect();
    const view = stack.getBoundingClientRect();
    if (!bounds || bounds.bottom <= view.top || bounds.top >= view.bottom ||
        bounds.right <= view.left || bounds.left >= view.right) {
      closeFigureHelper();
      return;
    }
    const portrait = media.naturalWidth
      ? media.naturalWidth < media.naturalHeight
      : bounds.width < bounds.height;
    figureHelper.dataset.orientation = portrait ? 'portrait' : 'landscape';

    const margin = 8;
    const gap = 6;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const left = Math.max(bounds.left, view.left);
    const right = Math.min(bounds.right, view.right);
    const leftSpace = left - gap - margin;
    const rightSpace = viewportWidth - right - gap - margin;
    const openLeft = leftSpace > rightSpace;
    const space = openLeft ? leftSpace : rightSpace;
    const preferredWidth = portrait ? 252 : 166;
    const width = Math.min(viewportWidth - 2 * margin, preferredWidth, Math.max(118, space));
    figureHelper.style.width = width + 'px';
    const x = openLeft ? left - gap - width : right + gap;
    const y = Math.max(view.top, bounds.top);
    figureHelper.style.left = Math.max(margin, Math.min(x, viewportWidth - width - margin)) + 'px';
    figureHelper.style.top = Math.max(margin, Math.min(y, viewportHeight - figureHelper.offsetHeight - margin)) + 'px';
  }

  function showFigureHelper(figure, pin = false) {
    const id = figure.dataset.figure;
    clearHelperTimer();
    if (helperFigure === id && !pin) return;
    if (helperFigure === id && helperPinned) {
      closeFigureHelper(true);
      return;
    }
    const item = findFigure(id);
    if (!item) return;
    closeFigureHelper();
    helperFigure = id;
    helperPinned = pin;
    figure.querySelector('[data-style-figure]').setAttribute('aria-expanded', 'true');
    byId('figure-helper-title').textContent = item.name;
    byId('figure-helper-status').textContent = '';
    byId('figure-helper-options').replaceChildren(figureChoices(item));
    figureHelper.hidden = false;
    positionFigureHelper();
    if (pin && !figureHelper.hidden) byId('figure-helper-close').focus({ preventScroll: true });
  }

  function scheduleHelperClose() {
    clearHelperTimer();
    if (!helperPinned) helperTimer = setTimeout(() => closeFigureHelper(), 240);
  }

  function previewFigure(target) {
    return target?.closest?.('figure[data-figure]:not([data-legacy-upload])');
  }

  function renderFigureStyleTools() {
    for (const figure of stack.querySelectorAll('figure[data-figure]:not([data-legacy-upload])')) {
      const button = node('button', 'figure-style-trigger', 'Imatge');
      button.type = 'button';
      button.dataset.styleFigure = figure.dataset.figure;
      button.setAttribute('aria-label', 'Opcions d’imatge: ' + figure.dataset.figureName);
      button.setAttribute('aria-controls', 'figure-helper');
      button.setAttribute('aria-expanded', String(helperFigure === figure.dataset.figure));
      figure.append(button);
    }
  }

  function updateFigureChoices(id, refreshChoices = false) {
    const item = findFigure(id);
    if (!item) return;
    const card = [...figureOptions.children].find(field => field.dataset.figureId === id);
    const groups = [];
    if (card) {
      card.dataset.figureStyle = item.selectedVariant;
      for (const key of ['caption', 'credit']) card.querySelector('[data-setting="' + key + '"]').value = item[key] ?? '';
      groups.push(card.querySelector('.figure-style-choices'));
    }
    if (helperFigure === id) groups.push(byId('figure-helper-options').firstElementChild);
    for (const group of groups) {
      if (refreshChoices) group.replaceWith(figureChoices(item));
      else for (const button of group.querySelectorAll('[data-variant]')) {
        button.setAttribute('aria-pressed', String(button.dataset.variant === item.selectedVariant));
      }
    }
  }

  function editFigureChoice(event) {
    const button = event.target.closest('[data-choice-figure], [data-upload-figure]');
    if (!route || !button) return;
    const { choiceFigure, variant, uploadFigure } = button.dataset;
    if (uploadFigure) {
      if (imageWrite) return;
      const item = findFigure(uploadFigure);
      if (!item) return;
      uploadTarget = { item, topic: route.topic.id, collection: activeCollection, type: documentType };
      figureUpload.click();
      return;
    }
    const item = findFigure(choiceFigure);
    if (!item?.variants.some(choice => choice.id === variant && choice.src) || item.selectedVariant === variant) return;
    settings.figures[item.id] = { ...settings.figures[item.id], variant };
    storeOptions();
    updateFigureChoices(item.id);
    requestPaper();
  }

  function syncIntroStyle(topic) {
    const preferred = settings.figureStyle || topic.defaultFigureStyle || topic.figureStyles?.[0]?.id;
    for (const button of byId('material-intro-style-options').children) {
      button.setAttribute('aria-pressed', String(button.dataset.introStyle === preferred));
    }
  }

  function showMaterialIntro(topic) {
    if (!preferences.firstVisit(topic.code)) return;
    const styles = topic.figureStyles?.slice(0, 2) ?? [];
    const example = styles.length === 2 && topic.chapters.flatMap(chapter => chapter.figures ?? []).find(
      figure => styles.every(style => figure.variants?.[style.id]?.src),
    );
    byId('material-intro-compare').hidden = !example;
    byId('material-intro-styles').hidden = styles.length < 2;
    byId('material-intro-level').hidden = availableLevels(topic).length < 2;
    if (example) {
      const images = styles.map(style => {
        const variant = example.variants[style.id];
        const image = node('img');
        image.src = variant.src;
        image.alt = style.label + ' · ' + (variant.alt ?? example.alt ?? example.name);
        return image;
      });
      byId('material-intro-example').textContent = example.name;
      byId('material-intro-picture').replaceChildren(...images, node('span', 'intro-divider'));
      byId('material-intro-slider').value = '50';
      byId('material-intro-picture').style.setProperty('--split', '50%');
      byId('material-intro-style-options').replaceChildren(...styles.map(style => {
        const button = node('button', '', style.label);
        button.type = 'button';
        button.dataset.introStyle = style.id;
        return button;
      }));
      syncIntroStyle(topic);
    }
    byId('material-intro').showModal();
  }

  function availableLevels(topic) {
    const variants = window.variantsMaterials[topic.code];
    return materialLevels.filter(level => level.id === 'intermedia' ||
      topic.chapters.some(chapter => variants?.[chapter.id]?.[level.id]));
  }

  function selectedLevel() {
    return availableLevels(route.topic).find(level => level.id === settings.materialLevel) ?? materialLevels[1];
  }

  function syncMaterialLevel() {
    const levels = availableLevels(route.topic);
    levelPicker.hidden = levels.length < 2;
    for (const button of levelPicker.querySelectorAll('button')) {
      button.hidden = !levels.some(level => level.id === button.dataset.materialLevel);
      button.setAttribute('aria-pressed', String(button.dataset.materialLevel === selectedLevel().id));
    }
  }

  function chapterForLevel(chapter) {
    const level = selectedLevel().id;
    const content = window.variantsMaterials[route.topic.code]?.[chapter.id]?.[level];
    if (!content) return chapter;
    return {
      ...chapter,
      intro: content.intro ?? chapter.intro,
      sections: chapter.sections.map(section => {
        const alternate = content.sections[section.id];
        if (!alternate) return section;
        return { ...section, blocks: level === 'ampliacio' ? [...section.blocks, ...alternate] : alternate };
      }),
    };
  }

  function printableChapter(chapter) {
    if (documentType === 'sheet') return arrangeChapter(chapterForLevel(chapter));
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
    if (changedMaterial && byId('material-intro').open) byId('material-intro').close();
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
      closeFigureHelper();
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
    if (changedChapter) closeFigureHelper();
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
    if (previous?.topic.id !== route.topic.id) showMaterialIntro(route.topic);
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
    field.dataset.figureStyle = item.selectedVariant;
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
    if (!item.blob) group.append(figureChoices(item));
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
    syncMaterialLevel();
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
    figureOptions.replaceChildren(...figures.map(item => figureControl(item, chapter)));
    figureOptions.hidden = !settings.showFigures;
    if (helperFigure && (!settings.showFigures || !findFigure(helperFigure)?.visible)) closeFigureHelper();
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
    positionFigureHelper();
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
    for (const control of clone.querySelectorAll('.section-preview-tools, .figure-style-trigger')) control.remove();
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
          return { ...item, src: '' };
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
    const scrollLeft = stack.scrollLeft;
    const viewTop = stack.getBoundingClientRect().top;
    const visibleUnit = scrollTop > 0 && [...stack.querySelectorAll('[data-paper-unit]')].find(
      unit => unit.getBoundingClientRect().bottom > viewTop,
    );
    const visibleOffset = visibleUnit ? visibleUnit.getBoundingClientRect().top - viewTop : 0;
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
    stack.scrollTop = scrollTop;
    stack.scrollLeft = scrollLeft;
    if (visibleUnit) {
      const equivalent = stack.querySelector('[data-paper-unit="' + CSS.escape(visibleUnit.dataset.paperUnit) + '"]');
      if (equivalent) stack.scrollTop += equivalent.getBoundingClientRect().top - viewTop - visibleOffset;
    }
    if (pendingSection) {
      if (!focusPaperSection(chapter.id, pendingSection)) focusRemovedSection(chapter.id, pendingSection);
      pendingSection = '';
    } else if (edit?.action === 'restore') {
      focusPaperSection(edit.chapter, edit.section);
    } else if (edit?.action === 'up' || edit?.action === 'down') {
      focusMovedSection(edit);
    }
    if (snapshot) animatePaper(snapshot, edit);
    positionFigureHelper();
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
      if (key === 'visible') {
        card.querySelector('.figure-options').hidden = !value;
        if (!value && helperFigure === id) closeFigureHelper();
      }
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
      if (input.name === 'showFigures') {
        figureOptions.hidden = !value;
        if (!value) closeFigureHelper();
      }
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

  function inFigureScope(item, topic, collection) {
    return item.topic === topic && (item.collectionId ?? '') === (collection?.id ?? '');
  }

  function imageFeedback(message) {
    byId('upload-status').textContent = message;
    byId('upload-status').hidden = !message;
    byId('figure-helper-status').textContent = message;
  }

  function releaseUpload(item) {
    URL.revokeObjectURL(item.src);
    images.delete(item.src);
  }

  async function addImage() {
    const file = figureUpload.files[0];
    const target = uploadTarget;
    uploadTarget = null;
    figureUpload.value = '';
    if (!file || !target || imageWrite) return;
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'].includes(file.type) || file.size > 12 * 1024 * 1024) {
      imageFeedback('Tria una imatge PNG, JPG, WebP, GIF o AVIF de fins a 12 MB.');
      return;
    }
    const { item, topic, collection, type } = target;
    const collectionId = collection?.id ?? '';
    const id = 'slot:' + JSON.stringify([collectionId, topic, item.chapterId, type, item.id]);
    const source = {
      id, figure: item.id, topic, chapter: item.chapterId, collectionId, documentType: type,
      blob: file, alt: file.name.replace(/\.[^.]+$/, '').slice(0, 75),
    };
    const upload = addUrl(source);
    imageWrite = true;
    try {
      await uploadsReady;
      if (!await preload(upload.src)) {
        releaseUpload(upload);
        imageFeedback('El navegador no pot obrir aquesta imatge.');
        return;
      }
      if (collectionId && !library.collections.some(entry => entry.id === collectionId)) {
        releaseUpload(upload);
        return;
      }
      const previous = knownUploads.find(entry => entry.id === id);
      let persisted = true;
      try { await imageOperation('readwrite', store => store.put(source)); }
      catch {
        if (previous?.persisted) {
          releaseUpload(upload);
          imageFeedback('No s’ha pogut substituir la imatge desada.');
          return;
        }
        persisted = false;
      }
      if (previous) {
        releaseUpload(previous);
        knownUploads = knownUploads.filter(entry => entry.id !== id);
      }
      knownUploads.push({ ...upload, persisted });

      const current = route && inFigureScope(source, route.topic.id, activeCollection);
      const layout = current ? settings : preferences.loadLayout(topic, collection, library);
      const saved = layout.figures[item.id];
      layout.figures[item.id] = { ...saved, variant: 'custom' };
      if (current) {
        storeOptions();
        if (documentType === type) updateFigureChoices(item.id, true);
        requestPaper();
        imageFeedback(persisted ? 'Imatge pròpia desada en aquest navegador.' : 'Imatge pròpia disponible durant aquesta sessió.');
      } else {
        preferences.saveLayout(topic, collection, layout, library);
      }
    } finally {
      imageWrite = false;
    }
  }

  async function resetFigures() {
    if (!route || imageWrite) return;
    const topic = route.topic.id;
    const collection = activeCollection;
    if (!window.confirm('Vols esborrar les imatges pròpies i els ajustos d’il·lustració d’aquesta fitxa?')) return;
    imageWrite = true;
    try {
      await uploadsReady;
      const uploads = knownUploads.filter(item => inFigureScope(item, topic, collection));
      if (uploads.some(item => item.persisted)) {
        await imageOperation('readwrite', store => {
          for (const item of uploads) if (item.persisted) store.delete(item.id);
          return store.count();
        });
      }
      for (const item of uploads) releaseUpload(item);
      knownUploads = knownUploads.filter(item => !inFigureScope(item, topic, collection));
      const current = route?.topic.id === topic && activeCollection?.id === collection?.id;
      const layout = current ? settings : preferences.loadLayout(topic, collection, library);
      layout.figureStyle = '';
      layout.figures = {};
      layout.showFigures = preferences.getBase(layout.templateId, collection, library).showFigures;
      if (current) {
        closeFigureHelper();
        storeOptions();
        renderControls();
        requestPaper();
        imageFeedback('Il·lustracions restablertes.');
      } else {
        preferences.saveLayout(topic, collection, layout, library);
      }
    } catch {
      imageFeedback('No s’han pogut esborrar les imatges desades. Prova-ho de nou.');
    } finally {
      imageWrite = false;
    }
  }

  async function removeImage(event) {
    const id = event.target.dataset.removeFigure;
    if (!id || imageWrite) return;
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
    if (imageWrite || !collection || !window.confirm('Vols suprimir «' + collection.name + '» i la seva maquetació?')) return;
    imageWrite = true;
    await uploadsReady;
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
    } finally {
      imageWrite = false;
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
  stack.addEventListener('pointerover', event => {
    const figure = previewFigure(event.target);
    if (event.pointerType === 'mouse' && route && figure && !figure.contains(event.relatedTarget)) showFigureHelper(figure);
  });
  stack.addEventListener('pointerout', event => {
    const figure = previewFigure(event.target);
    if (event.pointerType === 'mouse' && figure?.dataset.figure === helperFigure &&
        !figure.contains(event.relatedTarget) && !figureHelper.contains(event.relatedTarget)) scheduleHelperClose();
  });
  stack.addEventListener('click', event => {
    if (!route || !event.target.closest('[data-style-figure]')) return;
    const figure = previewFigure(event.target);
    if (figure) showFigureHelper(figure, true);
  });
  stack.addEventListener('scroll', positionFigureHelper, { passive: true });
  figureOptions.addEventListener('click', editFigureChoice);
  figureHelper.addEventListener('click', editFigureChoice);
  figureHelper.addEventListener('pointerenter', clearHelperTimer);
  figureHelper.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse' && previewFigure(event.relatedTarget)?.dataset.figure !== helperFigure) scheduleHelperClose();
  });
  byId('figure-helper-close').addEventListener('click', () => closeFigureHelper(true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && helperFigure) closeFigureHelper(helperPinned);
  });
  document.addEventListener('pointerdown', event => {
    if (helperFigure && !figureHelper.contains(event.target) && previewFigure(event.target)?.dataset.figure !== helperFigure) closeFigureHelper();
  });
  byId('material-intro-slider').addEventListener('input', event => {
    byId('material-intro-picture').style.setProperty('--split', event.target.value + '%');
  });
  byId('material-intro-style-options').addEventListener('click', event => {
    const choice = event.target.closest('[data-intro-style]')?.dataset.introStyle;
    if (!route?.topic.figureStyles?.some(style => style.id === choice)) return;
    settings.figureStyle = choice;
    syncIntroStyle(route.topic);
    storeOptions();
    renderControls();
    requestPaper();
  });
  byId('reset-figures').addEventListener('click', resetFigures);
  figureUpload.addEventListener('change', addImage);
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
  levelPicker.addEventListener('click', event => {
    const level = event.target.closest('button')?.dataset.materialLevel;
    if (!availableLevels(route.topic).some(item => item.id === level) || level === selectedLevel().id) return;
    settings.materialLevel = level;
    sectionEdit = null;
    storeOptions();
    renderControls();
    requestPaper();
  });
  byId('document-picker').addEventListener('click', event => {
    const type = event.target.closest('button')?.dataset.document;
    if (!type || type === documentType) return;
    closeFigureHelper();
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
      figures: Object.fromEntries(Object.entries(settings.figures).map(([id, figure]) => [id,
        Object.fromEntries(Object.entries(figure).filter(([key]) => ['variant', 'caption', 'credit', 'byStyle'].includes(key))),
      ])),
      figureStyle: settings.figureStyle, materialLevel: settings.materialLevel,
      sectionOrder: settings.sectionOrder, hiddenSections: settings.hiddenSections,
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
    const level = selectedLevel();
    const edition = level.id === 'intermedia' ? '' : ' · ' + level.label;
    document.title = name + edition + (documentType === 'solution' ? ' · Solucionari' : '');
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
  new ResizeObserver(() => {
    fitPaper();
    positionFigureHelper();
  }).observe(stack);
  window.addEventListener('resize', positionFigureHelper);
  window.addEventListener('hashchange', event => {
    if (location.hash !== '#main') renderRoute(event);
  });
  const refreshCatalog = setupCatalog();
  window.setupCurriculum(topics, (topic, section) => {
    const chapter = topic.chapters.find(entry => entry.sections.some(item => item.id === section)) ?? topic.chapters[0];
    return address(topic, chapter, section, null);
  });
  renderRoute();
  const uploadsReady = imageOperation('readonly', store => store.getAll()).then(items => {
    knownUploads.push(...items.map(item => ({ ...addUrl(item), persisted: true })));
    if (route) {
      renderControls();
      requestPaper();
    }
  }).catch(() => {
    if (route) imageFeedback('Les imatges afegides es mantindran mentre aquesta pàgina sigui oberta.');
  });
})();
