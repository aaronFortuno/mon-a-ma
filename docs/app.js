(() => {
  const locale = document.documentElement.lang;
  const cycleById = new Map(window.curriculum.cycles.map(cycle => [cycle.id, cycle]));
  const topics = window.quaderns.filter(topic => topic.lang === locale);
  const { node, paragraphAnchor, loadPaperFont, paginate, previewPage, figureSizing, normalizeFigureWidth, canWrapFigure, noteTypes, noteIcons, noteColors, noteIcon } = window.imprimible;
  const preferences = window.preferencies;
  const { defaults } = preferences;
  const materialLevels = [
    { id: 'suport', label: 'Suport' },
    { id: 'intermedia', label: 'Base' },
    { id: 'ampliacio', label: 'Ampliació' },
  ];
  const byId = id => document.getElementById(id);
  const topicById = new Map(topics.map(topic => [topic.id, topic]));
  const topicByCode = new Map(topics.map(topic => [topic.code, topic]));
  const codeInput = byId('material-code');
  const quickTemplateForm = byId('quick-template-form');
  const quickTemplateEntry = byId('quick-template-entry');
  const quickTemplateStatus = byId('quick-template-status');
  const templateDialog = byId('templates-dialog');
  const templateGallery = byId('template-gallery');
  let browsingTemplate = 'inherit';
  let library = preferences.library();
  let activeCollection = null;
  const form = byId('options');
  const figureForm = byId('figure-settings');
  const figureAlignment = byId('figure-alignment-template');
  const figureOptions = byId('figure-options');
  const figureHelper = byId('figure-helper');
  const figureUpload = byId('figure-upload');
  const levelPicker = byId('material-level');
  const variantSides = [byId('variant-left'), byId('variant-right')];
  const comparisonDialog = byId('variant-comparison');
  const comparisonBodies = [byId('comparison-left-paper'), byId('comparison-right-paper')];
  const compareButtons = [byId('compare-left'), byId('compare-right')];
  const comparisonHeadings = [byId('comparison-left-title'), byId('comparison-right-title')];
  const comparisonSections = byId('comparison-sections');
  const comparisonArrows = [byId('comparison-previous'), byId('comparison-next')];
  let comparisonOpener;
  const comparisonGrid = comparisonDialog.querySelector('.comparison-grid');
  const variantThumbPages = new WeakMap();
  let comparisonRevision = 0;
  let comparisonPages = [];
  let comparisonAnchors = [];
  let comparisonProgress = 0;
  let comparisonScrollPositions = [];
  let comparisonFrame = 0;
  let comparisonPair;
  let comparisonSwap;
  let helperFigure = '';
  let helperPinned = false;
  let helperTimer;
  let uploadTarget = null;
  let imageWrite = false;
  const studio = byId('studio');
  const stack = byId('paper-stack');
  const zoomOut = byId('zoom-out');
  const zoomReset = byId('zoom-reset');
  const zoomIn = byId('zoom-in');
  const minPreviewMagnification = 0.5;
  const maxPreviewMagnification = 4;
  const zoomStep = 1.2;
  const motionLayer = byId('paper-motion');
  const printMenu = byId('print-menu');
  const printOptions = byId('print-options');
  const resetMaterialStatus = byId('reset-material-status');
  const printButtons = [byId('print'), byId('save-pdf')];
  const printStatus = byId('print-status');
  const catalogTitle = document.title;
  const isDefinitive = topic => topic.status === 'definitiu';
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
  let figureEdit = '';
  let paperAnimations = [];
  let pendingReset;

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
    return [catalogAddress(collection), ...path, section].filter(Boolean).join('/').replace(/^#\//, '#');
  }

  function members(collection) {
    return collection.topicIds.map(id => topicById.get(id)).filter(Boolean);
  }

  function option(value, label) {
    return new Option(label, value);
  }

  function setupCatalog() {
    const filters = byId('catalog-filters');
    const drafts = byId('catalog-drafts');
    drafts.checked = preferences.loadCatalogDrafts();
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
      const chapter = topic.chapters[0];
      const firstFigure = (chapter.figures ?? []).find(figure => figure.section === chapter.sections[0]?.id);
      const variant = firstFigure && figureVariants(topic, firstFigure).findLast(item => item.src);
      const coverSrc = variant?.thumbnail ?? variant?.src ?? firstFigure?.src;
      const picture = node('div', coverSrc ? 'topic-cover' : 'topic-cover image-placeholder');
      picture.setAttribute('aria-hidden', 'true');
      if (coverSrc) {
        const cover = node('img');
        cover.src = coverSrc;
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
      const visible = candidates.filter(topic => isDefinitive(topic) === !drafts.checked);
      const matching = visible.filter(topic => controls.every(({ select, values }) => !select.value || values(topic).includes(select.value)));
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
      const empty = byId('empty');
      if (activeCollection && !candidates.length) empty.textContent = 'La col·lecció encara és buida.';
      else if (!visible.length) empty.textContent = drafts.checked ? 'No hi ha cap tema en desenvolupament.' : 'Encara no hi ha cap tema definitiu.';
      else empty.textContent = 'No hi ha cap tema amb aquests filtres.';
      byId('topic-count').value = matching.length + (matching.length === 1 ? ' tema' : ' temes');
      filters.querySelector('button[type="reset"]').hidden = !controls.some(({ select }) => select.value);
    }
    drafts.addEventListener('change', () => {
      preferences.saveCatalogDrafts(drafts.checked);
      if (!route) refresh();
    });
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
    if (path[0] === 'maqueta') path.shift();
    const section = path[0] || '';
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

  function reservedFigures(chapter, uploads) {
    const figures = chapter.figures ?? [];
    return chapter.sections.flatMap((section, index) => {
      const [original, ...extra] = figures.filter(figure => figure.section === section.id);
      const side = index % 2 ? 'left' : 'right';
      const first = {
        id: 'reserva-' + section.id, section: section.id, name: section.title, ratio: 1.7,
        anchor: section.blocks[0]?.type === 'paragraph' ? 'lead' : 'before',
        width: 100, position: side, wrap: false,
        ...original,
      };
      const additions = extra.concat(uploads.filter(figure => figure.section === section.id));
      const taken = new Set([first, ...additions].map(figure => paragraphAnchor(settings.figures[figure.id]?.anchor ?? figure.anchor)));
      const paragraphSlots = section.blocks.flatMap((block, number) => block.type === 'paragraph' && !taken.has(number) ? [number] : []);
      return [first, ...additions.map((figure, i) => {
        const paragraph = figure.anchor || settings.figures[figure.id]?.anchor ? undefined : paragraphSlots.shift();
        return {
          name: figure.alt || 'Imatge complementària',
          width: 50, position: i % 2 ? 'right' : 'left', wrap: true,
          anchor: paragraph === undefined ? 'after' : paragraph === 0 ? 'lead' : 'paragraph-' + paragraph,
          ...figure,
        };
      })];
    });
  }

  function figureVariants(topic, figure) {
    return (topic.figureStyles ?? []).filter(style => figure.variants?.[style.id]).map(style => ({
      ...style, ...figure.variants[style.id],
    }));
  }

  function figuresFor(chapter, type = documentType) {
    const uploads = knownUploads.filter(item => item.topic === route.topic.id && item.chapter === chapter.id &&
      (item.collectionId ?? '') === (activeCollection?.id ?? '') && (item.documentType ?? 'sheet') === type);
    const additions = uploads.filter(upload => !upload.figure)
      .sort((a, b) => (a.addedAt ?? 0) - (b.addedAt ?? 0))
      .map(upload => ({ ...upload, section: settings.figures[upload.id]?.section ?? upload.section }));
    const planned = type === 'sheet' ? reservedFigures(chapter, additions) : [...(chapter.figures ?? []), ...additions];
    const sections = new Map(chapter.sections.map(section => [section.id, section]));
    return planned.map(item => {
      const saved = settings.figures[item.id];
      const personal = uploads.find(upload => upload.figure === item.id);
      const variants = figureVariants(route.topic, item);
      const previousOriginal = item.src && variants.find(variant => variant.src === item.src);
      if (!variants.length && item.src && !item.blob) variants.push({ id: 'original', label: 'Original', src: item.src });
      const defaultVariant = variants.find(variant => variant.id === settings.figureStyle && variant.src) ??
        variants.findLast(variant => variant.src);
      if (personal) variants.push({ id: 'custom', label: 'Imatge pròpia', src: personal.src, alt: personal.alt });
      const savedVariant = saved?.variant === 'original' && previousOriginal ? previousOriginal.id : saved?.variant;
      const selected = variants.find(variant => variant.id === savedVariant && variant.src) ?? defaultVariant;
      const config = {
        wrap: false, border: true, ...item, ...selected, id: item.id, visible: true, ...saved,
        variants, selectedVariant: selected?.id ?? '', chapterId: chapter.id,
        ...(selected?.id === 'custom' ? { caption: '', credit: '' } : {}),
        ...(previousOriginal && selected === previousOriginal ? saved?.byStyle?.original : undefined),
        ...saved?.byStyle?.[selected?.id],
      };
      const paragraph = paragraphAnchor(config.anchor);
      const blocks = sections.get(config.section)?.blocks;
      if (paragraph > 0 && blocks?.[paragraph]?.type !== 'paragraph') {
        config.anchor = blocks?.[0]?.type === 'paragraph' ? 'lead' : 'before';
      }
      config.width = normalizeFigureWidth(config.width);
      config.wrap = canWrapFigure(config) && config.wrap;
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
    const list = node('div', 'figure-style-list');
    list.setAttribute('role', 'group');
    list.setAttribute('aria-label', 'Imatges de «' + item.name + '»');
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
        image.src = variant.thumbnail ?? variant.src;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        button.append(image);
      } else {
        button.disabled = true;
        button.append(node('span', 'figure-style-pending', 'Pendent'));
      }
      button.append(node('span', 'figure-style-label', variant.label));
      list.append(button);
    }
    if (list.childElementCount) group.append(list);
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
    const button = event.target.closest('[data-choice-figure], [data-upload-figure], [data-add-figure]');
    if (!route || !button) return;
    const { choiceFigure, variant, uploadFigure, addFigure } = button.dataset;
    if (uploadFigure || addFigure) {
      if (imageWrite) return;
      const item = uploadFigure ? findFigure(uploadFigure) : null;
      if (uploadFigure && !item) return;
      const chapterId = item?.chapterId ?? route.chapter.id;
      uploadTarget = { item, section: addFigure, chapterId, topic: route.topic.id, collection: activeCollection, type: documentType };
      figureUpload.click();
      return;
    }
    const item = findFigure(choiceFigure);
    if (!item?.variants.some(choice => choice.id === variant && choice.src) || item.selectedVariant === variant) return;
    settings.figures[item.id] = { ...settings.figures[item.id], variant };
    figureEdit = item.id;
    storeOptions();
    updateFigureChoices(item.id);
    requestPaper();
  }

  function syncIntroStyle(topic) {
    const preferred = settings.figureStyle || topic.figureStyles?.at(-1)?.id;
    for (const button of byId('material-intro-style-options').children) {
      button.setAttribute('aria-pressed', String(button.dataset.introStyle === preferred));
    }
  }

  function showMaterialIntro(topic) {
    if (!preferences.firstVisit(topic.code)) return;
    const styles = topic.figureStyles ?? [];
    const example = styles.length > 1 && topic.chapters.flatMap(chapter => chapter.figures ?? []).find(
      figure => styles.every(style => figure.variants?.[style.id]?.src),
    );
    const useSplit = Boolean(example && styles.length === 2);
    const showPreviews = Boolean(example && styles.length > 2);
    byId('material-intro-compare').hidden = styles.length < 2;
    byId('material-intro-styles').hidden = styles.length < 2;
    byId('material-intro-level').hidden = availableLevels(topic).length < 2;
    const heading = byId('material-intro-example');
    heading.hidden = !example;
    heading.textContent = example?.name ?? '';
    const split = byId('material-intro-split');
    split.hidden = !useSplit;
    const picture = byId('material-intro-picture');
    picture.replaceChildren();

    function exampleImage(style, thumbnail = false) {
      const variant = example.variants[style.id];
      const image = node('img');
      image.src = thumbnail ? variant.thumbnail ?? variant.src : variant.src;
      image.alt = thumbnail ? '' : style.label + ' · ' + (variant.alt ?? example.alt ?? example.name);
      return image;
    }

    if (useSplit) {
      picture.append(...styles.map(style => exampleImage(style)), node('span', 'intro-divider'));
      byId('material-intro-slider').value = '50';
      picture.style.setProperty('--split', '50%');
    }

    const options = byId('material-intro-style-options');
    options.toggleAttribute('data-with-previews', showPreviews);
    options.replaceChildren(...styles.map(style => {
      const button = node('button', showPreviews ? 'figure-style-choice' : '');
      button.type = 'button';
      button.dataset.introStyle = style.id;
      if (showPreviews) button.append(exampleImage(style, true), node('span', 'figure-style-label', style.label));
      else button.textContent = style.label;
      return button;
    }));
    syncIntroStyle(topic);
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
    const current = levels.findIndex(level => level.id === selectedLevel().id);
    for (const [index, side] of variantSides.entries()) {
      const level = levels[current + (index === 0 ? -1 : 1)];
      const compare = compareButtons[index];
      side.hidden = compare.hidden = !level || documentType !== 'sheet';
      if (side.hidden) continue;
      const start = index === 0 ? current - 1 : current;
      compare.dataset.pairStart = String(start);
      const description = 'Compara ' + levels[start].label + ' i ' + levels[start + 1].label;
      compare.setAttribute('aria-label', description);
      compare.title = description;
      side.dataset.variantSide = level.id;
      side.setAttribute('aria-label', 'Obre la variant ' + level.label);
      side.querySelector('.variant-side-name').textContent = level.label;
    }
  }

  function chapterForLevel(chapter, level) {
    const content = window.variantsMaterials[route.topic.code]?.[chapter.id]?.[level];
    if (!content) return chapter;
    return {
      ...chapter,
      intro: content.intro ?? chapter.intro,
      sections: chapter.sections.map(section => {
        const alternate = content.sections[section.id];
        if (!alternate) return section;
        const shared = level === 'ampliacio' ? section.blocks : section.blocks.filter(block => block.core);
        return { ...section, blocks: [...shared, ...alternate] };
      }),
    };
  }

  function printableChapter(chapter, level = selectedLevel().id, type = documentType) {
    if (type === 'sheet') return arrangeChapter(chapterForLevel(chapter, level));
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
    cancelResetConfirmation();
    const previous = route;
    route = extractRoute();
    if (route) {
      const canonical = address(route.topic, route.chapter, route.section);
      if (location.hash !== canonical) history.replaceState(history.state, '', canonical);
    }
    const changedMaterial = previous?.topic.id !== route?.topic.id || previous?.collectionId !== route?.collectionId;
    if (changedMaterial && byId('material-intro').open) byId('material-intro').close();
    if (changedMaterial && comparisonDialog.open) comparisonDialog.close();
    if (changedMaterial && printMenu.matches(':popover-open')) printMenu.hidePopover();
    byId('catalog-home').href = route ? catalogAddress(activeCollection) : '#';
    byId('catalog').hidden = Boolean(route);
    const curriculumDialog = byId('curriculum-dialog');
    if (location.hash === '#mapa-curricular' && !curriculumDialog.open) {
      curriculumDialog.returnValue = '';
      curriculumDialog.showModal();
    }
    byId('workspace').hidden = !route;

    const title = byId('topic-title');
    title.textContent = route ? 'Tema: ' + route.topic.title : '';
    if (!route) {
      closeFigureHelper();
      stopPaperMotion();
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
    if (changedChapter) {
      closeFigureHelper();
      figureEdit = '';
    }
    if (changedMaterial) {
      resetMaterialStatus.textContent = '';
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

  function syncFigureWidth(input) {
    const label = input.value + ' %';
    input.setAttribute('aria-valuetext', label);
    input.parentElement.querySelector('.figure-width-value').textContent = label;
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
    width.type = 'range';
    width.min = figureSizing.min;
    width.max = figureSizing.max;
    width.step = figureSizing.step;
    width.value = item.width;
    width.dataset.setting = 'width';
    width.setAttribute('aria-label', 'Amplada de la imatge');
    const widthLabel = node('label', 'figure-width', 'Amplada');
    const percent = node('span', 'figure-width-value');
    percent.setAttribute('aria-hidden', 'true');
    widthLabel.append(percent, width);
    syncFigureWidth(width);
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
    flow.disabled = !canWrapFigure(item);
    flow.dataset.setting = 'wrap';
    flow.setAttribute('aria-label', 'Envolta la imatge amb text');
    const wrapLabel = control('Envolta', flow, 'check figure-wrap');
    wrapLabel.title = 'Envolta la imatge amb text';
    const border = node('input');
    border.type = 'checkbox';
    border.checked = item.border;
    border.dataset.setting = 'border';
    border.setAttribute('aria-label', 'Mostra una vora a la imatge');
    placement.append(picker('anchor', 'Punt d’inserció', anchors), wrapLabel, control('Vora', border, 'check'));
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
    byId('core-format-option').hidden = !route.topic.chapters.some(chapter =>
      chapter.sections.some(section => section.blocks.some(block => block.core)),
    );
    for (const key of Object.keys(defaults)) {
      const input = form.elements.namedItem(key) ?? figureForm.elements.namedItem(key);
      if (!input) continue;
      if (input.type === 'checkbox') input.checked = settings[key];
      else input.value = settings[key];
    }
    syncMeasurements();
    syncNoteColors();
    syncHeaderControls();
    syncFooterControls();
    syncTemplateSelector();
    const chapter = printableChapter(route.chapter);
    const figures = chapter ? figuresFor(chapter) : [];
    const cards = chapter?.sections.flatMap(section => {
      const controls = figures.filter(item => item.section === section.id).map(item => figureControl(item, chapter));
      if (documentType === 'sheet') {
        const add = node('button', 'secondary add-section-figure', 'Afegeix una imatge');
        add.type = 'button';
        add.dataset.addFigure = section.id;
        add.setAttribute('aria-label', 'Afegeix una imatge a «' + section.title + '»');
        controls.push(add);
      }
      return controls;
    }) ?? [];
    figureOptions.replaceChildren(...cards);
    figureOptions.hidden = !settings.showFigures;
    if (helperFigure && (!settings.showFigures || !findFigure(helperFigure)?.visible)) closeFigureHelper();
  }

  function syncMeasurements() {
    byId('font-size-value').value = layoutNumber.format(settings.fontSize) + ' pt';
    byId('leading-value').value = layoutNumber.format(settings.leading);
    byId('margin-value').value = layoutNumber.format(settings.margin) + ' mm';
    byId('block-spacing-value').value = layoutNumber.format(settings.blockSpacing) + ' %';
    byId('note-width-value').value = layoutNumber.format(settings.noteWidth) + ' %';
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
    const style = getComputedStyle(stack);
    const viewportInsets = stack.offsetWidth - stack.clientWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const compareWidth = compareButtons.reduce((total, button) => total + button.getBoundingClientRect().width, 0);
    // Measure the variants at their normal width so their movement never changes the zoom scale.
    const variantWidth = variantSides.filter(side => !side.hidden).reduce((total, side) =>
      total + (parseFloat(getComputedStyle(side).getPropertyValue('--variant-ideal-width')) || side.offsetWidth), 0);
    const space = studio.clientWidth - viewportInsets - compareWidth;
    const fitted = Math.min(1, Math.max(0.1, (space - variantWidth) / paper.width));
    const zoom = fitted * previewMagnification;
    const pageWidth = paper.width * zoom;
    const variantRoom = variantWidth ? Math.max(0, Math.min(1, (space - pageWidth) / variantWidth)) : 1;
    const widePreview = previewMagnification > 1 && variantRoom < .42;
    studio.style.setProperty('--variant-room', previewMagnification > 1 ? variantRoom : 1);
    studio.classList.toggle('is-paper-wide', widePreview);
    sizePaperFrames(stack, paper, zoom);
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
    const expandedView = stack.getBoundingClientRect();
    const targetX = pointer?.clientX ?? expandedView.left + stack.clientLeft + stack.clientWidth / 2;
    const targetY = pointer?.clientY ?? expandedView.top + stack.clientTop + stack.clientHeight / 2;
    stack.scrollLeft += after.left + anchorX * after.width - targetX;
    stack.scrollTop += after.top + anchorY * after.height - targetY;
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

  function animateFigureChange(previous, id) {
    const duration = parseFloat(getComputedStyle(stack).getPropertyValue('--motion-duration'));
    const current = stack.querySelector('figure[data-figure="' + CSS.escape(id) + '"] > :is(img, .image-placeholder)');
    if (!duration || !current || typeof current.animate !== 'function') return;
    const rect = current.getBoundingClientRect();
    if (!inPreview(rect, stack.getBoundingClientRect())) return;
    const timing = { duration, easing: 'ease-in-out' };
    current.animate([{ opacity: .25 }, { opacity: 1 }], timing);
    if (!previous) return;
    const layer = motionLayer.getBoundingClientRect();
    const ghost = previous.cloneNode(false);
    ghost.classList.add('figure-fade-out');
    Object.assign(ghost.style, {
      left: rect.left - layer.left + 'px',
      top: rect.top - layer.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
    });
    motionLayer.append(ghost);
    ghost.animate([{ opacity: .95 }, { opacity: 0 }], timing).finished.then(() => ghost.remove(), () => ghost.remove());
  }

  function setPrintReady(ready) {
    for (const button of printButtons) button.disabled = !ready;
  }

  function optionsForLevel(level, type) {
    const options = { ...settings, documentType: type };
    if (type === 'solution') return options;
    options.markCore = options.markCore && level !== 'suport';
    if (level === 'suport') {
      options.fontSize = Math.min(16, options.fontSize + .5);
      options.leading = Math.min(2.15, options.leading + .17);
      options.blockSpacing *= 1.2;
    } else if (level === 'ampliacio') {
      options.fontSize = Math.max(10, options.fontSize - .5);
      options.leading = Math.max(1.1, options.leading - .12);
      options.blockSpacing *= .76;
    }
    return options;
  }

  function materialPages(level, type = 'sheet') {
    const options = optionsForLevel(level, type);
    const entries = options.scope === 'topic' ? route.topic.chapters : [route.chapter];
    const chapters = entries.map(chapter => printableChapter(chapter, level, type)).filter(Boolean);
    const figures = new Map(chapters.map(chapter => [
      chapter.id,
      options.showFigures ? figuresFor(chapter, type).filter(figure => figure.visible) : [],
    ]));
    return { options, chapters, figures };
  }

  async function loadMaterialPages(material) {
    let missing = false;
    const figures = await Promise.all([...material.figures].map(async ([id, candidates]) => [
      id,
      await Promise.all(candidates.map(async figure => {
        if (!figure.src) return figure;
        const size = await preload(figure.src);
        if (size) return { ...figure, pixelWidth: size.width, pixelHeight: size.height };
        missing = true;
        return { ...figure, src: '' };
      })),
    ]));
    await loadPaperFont(material.options.font);
    return { ...material, figures: new Map(figures), missing };
  }

  function layoutMaterial(material, target) {
    return paginate(route.topic, material.chapters, material.figures, material.options, byId('layout-probe'), target);
  }

  function fitMaterial(target, preview) {
    if (!preview) return;
    const style = getComputedStyle(target);
    const width = target.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    if (width > 0) sizePaperFrames(target, preview, Math.min(1, width / preview.width));
  }

  function sizePaperFrames(target, preview, scale) {
    target.style.setProperty('--zoom', scale);
    for (const frame of target.children) {
      frame.style.width = preview.width * scale + 'px';
      frame.style.height = preview.height * scale + 'px';
    }
  }

  async function renderVariantPreviews(ticket) {
    await Promise.all(variantSides.filter(side => !side.hidden).map(async side => {
      const thumbnail = side.querySelector('.variant-thumb');
      const material = await loadMaterialPages(materialPages(side.dataset.variantSide));
      if (ticket !== revision || !route) return;
      const pages = node('div');
      pages.id = side.id + '-miniatura';
      const preview = layoutMaterial(material, pages);
      thumbnail.replaceChildren(pages.firstElementChild);
      variantThumbPages.set(thumbnail, preview);
      fitMaterial(thumbnail, preview);
    }));
  }

  function comparisonOffsets(target, preview) {
    target.style.removeProperty('--comparison-tail');
    fitMaterial(target, preview);
    const viewport = target.getBoundingClientRect();
    // The dialog scales while it opens, but scrollTop still uses layout pixels.
    const scale = viewport.width / parseFloat(getComputedStyle(target).width) || 1;
    const origin = target.scrollTop - 12;
    const offsets = new Map();
    for (const unit of target.querySelectorAll('[data-paper-section]')) {
      const heading = unit.querySelector('.section-title');
      if (heading) {
        const section = unit.dataset.paperChapter + ':' + unit.dataset.paperSection;
        const offset = (heading.getBoundingClientRect().top - viewport.top) / scale + origin;
        offsets.set(section, Math.max(0, Math.round(offset)));
      }
    }
    const last = [...offsets.values()].at(-1) ?? 0;
    const extra = Math.max(0, last - (target.scrollHeight - target.clientHeight));
    target.style.setProperty('--comparison-tail', extra + 'px');
    return { offsets, end: target.scrollHeight - target.clientHeight };
  }

  function fitComparison() {
    const panes = comparisonBodies.map((target, index) => comparisonOffsets(target, comparisonPages[index]));
    const anchors = [{ section: '', offsets: [0, 0] }];
    for (const button of comparisonSections.querySelectorAll('[data-comparison-section]')) {
      const section = button.dataset.comparisonSection;
      if (panes.every(pane => pane.offsets.has(section))) {
        anchors.push({ section, offsets: panes.map(pane => pane.offsets.get(section)), button });
      }
    }
    anchors.push({ section: null, offsets: panes.map(pane => pane.end) });
    comparisonAnchors = anchors;
  }

  // Interpolate between matching headings, so each pane can travel a different distance.
  function positionComparison(progress, source = -1) {
    const last = comparisonAnchors.length - 1;
    comparisonProgress = Math.min(last, Math.max(0, progress));
    const index = Math.floor(comparisonProgress);
    const from = comparisonAnchors[index];
    const to = comparisonAnchors[Math.min(index + 1, last)];
    const fraction = comparisonProgress - index;
    comparisonBodies.forEach((target, pane) => {
      if (pane !== source) {
        target.scrollTop = from.offsets[pane] + fraction * (to.offsets[pane] - from.offsets[pane]);
      }
      comparisonScrollPositions[pane] = target.scrollTop;
    });
    const active = (index === last ? comparisonAnchors[index - 1] : from).button;
    const previous = comparisonSections.querySelector('[aria-current]');
    if (previous !== active) {
      previous?.removeAttribute('aria-current');
      active?.setAttribute('aria-current', 'location');
    }
  }

  function followComparison(pane, target) {
    const offset = target.scrollTop;
    if (!comparisonAnchors.length || offset === comparisonScrollPositions[pane]) return;
    stopComparisonScroll();
    const next = comparisonAnchors.findIndex(anchor => anchor.offsets[pane] >= offset);
    if (next <= 0) {
      positionComparison(next === 0 ? 0 : comparisonAnchors.length - 1, pane);
      return;
    }
    const start = comparisonAnchors[next - 1].offsets[pane];
    const end = comparisonAnchors[next].offsets[pane];
    positionComparison(next - 1 + (offset - start) / (end - start), pane);
  }

  function stopComparisonScroll() {
    cancelAnimationFrame(comparisonFrame);
    comparisonFrame = 0;
  }

  function comparisonDuration() {
    return parseFloat(getComputedStyle(comparisonDialog).getPropertyValue('--motion-duration')) || 0;
  }

  function alignComparison(section) {
    const destination = comparisonAnchors.findIndex(anchor => anchor.section === section);
    if (destination < 0) return;
    stopComparisonScroll();
    const duration = comparisonDuration();
    const from = comparisonProgress;
    if (!duration || from === destination) {
      positionComparison(destination);
      return;
    }
    const start = performance.now();
    const frame = now => {
      const elapsed = Math.max(0, Math.min((now - start) / duration, 1));
      const eased = 1 - (1 - elapsed) ** 3;
      positionComparison(from + (destination - from) * eased);
      comparisonFrame = elapsed < 1 ? requestAnimationFrame(frame) : 0;
    };
    comparisonFrame = requestAnimationFrame(frame);
  }

  function renderComparisonSections(left, right) {
    const sectionKey = (chapter, section) => chapter.id + ':' + section.id;
    const shared = new Set(right.flatMap(chapter => chapter.sections.map(section => sectionKey(chapter, section))));
    const buttons = left.flatMap(chapter => chapter.sections.map(section => {
      const key = sectionKey(chapter, section);
      if (!shared.has(key)) return null;
      const button = node('button', 'secondary', section.title);
      button.type = 'button';
      button.dataset.comparisonSection = key;
      return button;
    })).filter(Boolean);
    comparisonSections.replaceChildren(...buttons);
    comparisonSections.hidden = !buttons.length;
  }

  function setComparisonArrow(arrow, levels, index) {
    const left = levels[index];
    const right = levels[index + 1];
    arrow.hidden = !left || !right;
    if (arrow.hidden) return;
    arrow.dataset.pairStart = String(index);
    const label = 'Compara ' + left.label + ' i ' + right.label;
    arrow.setAttribute('aria-label', label);
    arrow.title = label;
  }

  async function renderComparison(pairStart) {
    const levels = availableLevels(route.topic);
    const pair = levels.slice(pairStart, pairStart + 2);
    if (pairStart < 0 || pair.length !== 2) return;
    const ticket = ++comparisonRevision;
    byId('comparison-status').textContent = 'Preparant la comparació…';
    const materials = await Promise.all(pair.map(level => loadMaterialPages(materialPages(level.id))));
    if (ticket !== comparisonRevision || !comparisonDialog.open) return;
    stopComparisonScroll();
    const index = Math.floor(comparisonProgress);
    const section = comparisonAnchors[index]?.section;
    const fraction = comparisonProgress - index;
    const previousPair = comparisonPair;
    comparisonPair = pairStart;
    const focusedArrow = document.activeElement;
    setComparisonArrow(comparisonArrows[0], levels, pairStart - 1);
    setComparisonArrow(comparisonArrows[1], levels, pairStart + 1);
    if (comparisonArrows.includes(focusedArrow) && focusedArrow.hidden) {
      comparisonArrows.find(arrow => !arrow.hidden)?.focus({ preventScroll: true });
    }
    comparisonHeadings.forEach((heading, pane) => { heading.textContent = pair[pane].label; });
    renderComparisonSections(materials[0].chapters, materials[1].chapters);
    comparisonPages = materials.map((material, pane) => layoutMaterial(material, comparisonBodies[pane]));
    fitComparison();
    const corresponding = comparisonAnchors.findIndex(anchor => anchor.section === section);
    positionComparison(corresponding >= 0 ? corresponding + fraction : 0);
    const duration = comparisonDuration();
    comparisonSwap?.cancel();
    if (previousPair !== undefined && previousPair !== pairStart && duration) {
      const distance = pairStart > previousPair ? 8 : -8;
      comparisonSwap = comparisonGrid.animate(
        [{ opacity: .45, translate: distance + 'px 0' }, { opacity: 1, translate: '0 0' }],
        { duration, easing: 'ease-out' },
      );
    }
    byId('comparison-status').textContent = 'Comparació de ' + pair[0].label + ' i ' + pair[1].label;
  }

  function openComparison(event) {
    if (!route) return;
    comparisonOpener = event.currentTarget;
    comparisonDialog.showModal();
    renderComparison(Number(comparisonOpener.dataset.pairStart));
  }

  function selectMaterialLevel(level) {
    if (!route || !availableLevels(route.topic).some(item => item.id === level) || level === selectedLevel().id) return;
    settings.materialLevel = level;
    sectionEdit = null;
    storeOptions();
    renderControls();
    requestPaper();
  }

  async function refreshPaper() {
    const ticket = ++revision;
    const { chapter } = route;
    setPrintReady(false);
    printStatus.hidden = true;
    const material = await loadMaterialPages(materialPages(selectedLevel().id, documentType));
    if (ticket !== revision || !route) return;
    const edit = sectionEdit;
    sectionEdit = null;
    const changedFigure = figureEdit;
    figureEdit = '';
    const previousFigure = changedFigure && stack.querySelector(
      'figure[data-figure="' + CSS.escape(changedFigure) + '"] > :is(img, .image-placeholder)',
    );
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
    paper = layoutMaterial(material, stack);
    if (documentType === 'sheet') renderSectionTools(material.chapters);
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
    if (changedFigure) animateFigureChange(previousFigure, changedFigure);
    positionFigureHelper();
    const warnings = [];
    if (material.missing) warnings.push('Alguna imatge no s’ha pogut carregar.');
    if (paper.oversized) warnings.push('Redueix la lletra, l’interlineat o els marges per encabir el contingut.');
    printStatus.textContent = warnings.join(' ');
    printStatus.hidden = !warnings.length;
    setPrintReady(!paper.oversized);
    renderVariantPreviews(ticket);
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
        syncFigureWidth(input);
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
        delete settings.figures[id].anchor;
        renderControls();
        figureForm.querySelector('[data-figure-id="' + id + '"] [data-setting="section"]').focus({ preventScroll: true });
      } else if (key === 'anchor' || key === 'position' || key === 'width') {
        const current = figuresFor(printableChapter(route.chapter)).find(item => item.id === id);
        const wrap = card.querySelector('[data-setting="wrap"]');
        wrap.disabled = !canWrapFigure(current);
        wrap.checked = current.wrap;
      }
    } else {
      if (!(input.name in defaults)) return;
      settings[input.name] = value;
      if (['fontSize', 'leading', 'margin', 'blockSpacing', 'noteWidth'].includes(input.name)) syncMeasurements();
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
    applyOptions();
  }

  function applyOptions() {
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
    const { item, section, chapterId, topic, collection, type } = target;
    const collectionId = collection?.id ?? '';
    const id = item ? 'slot:' + JSON.stringify([collectionId, topic, chapterId, type, item.id]) : 'img-' + crypto.randomUUID();
    const source = {
      id, topic, chapter: chapterId, collectionId, documentType: type,
      ...(item ? { figure: item.id } : { section, addedAt: Date.now() }),
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
      if (item) {
        const layout = current ? settings : preferences.loadLayout(topic, collection, library);
        layout.figures[item.id] = { ...layout.figures[item.id], variant: 'custom' };
        if (current) storeOptions();
        else preferences.saveLayout(topic, collection, layout, library);
      }
      if (current) {
        if (documentType === type && route.chapter.id === chapterId) {
          if (item) {
            updateFigureChoices(item.id, true);
            figureEdit = item.id;
          } else {
            renderControls();
            figureOptions.querySelector('[data-add-figure="' + CSS.escape(section) + '"]')?.focus();
          }
        }
        requestPaper();
        imageFeedback(persisted ? 'Imatge pròpia desada en aquest navegador.' : 'Imatge pròpia disponible durant aquesta sessió.');
      }
    } finally {
      imageWrite = false;
    }
  }

  async function clearFigureUploads(topic, collection) {
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
  }

  async function resetUserPreferences() {
    if (imageWrite) return;
    const status = byId('reset-user-status');
    imageWrite = true;
    status.textContent = '';
    try {
      await uploadsReady;
      await imageOperation('readwrite', store => store.clear());
      for (const item of knownUploads) releaseUpload(item);
      knownUploads = [];
      uploadTarget = null;
      logoUploadVersion++;
      const persisted = preferences.resetAll();
      library = preferences.library();
      document.dispatchEvent(new Event('reset-user-preferences'));
      byId('catalog-drafts').checked = preferences.loadCatalogDrafts();
      for (const select of byId('catalog-filters').querySelectorAll('select')) select.selectedIndex = 0;
      history.replaceState(history.state, '', '#');
      renderRoute();
      status.textContent = persisted ? 'Preferències restablertes.' : 'Preferències restablertes durant aquesta sessió.';
    } catch {
      status.textContent = 'No s’han pogut restablir les preferències.';
    } finally {
      imageWrite = false;
    }
  }

  async function resetMaterial() {
    if (!route || imageWrite) return;
    const { topic } = route;
    const collection = activeCollection;
    const isCurrent = () => route?.topic.id === topic.id && activeCollection?.id === collection?.id;
    imageWrite = true;
    byId('reset-material').disabled = true;
    resetMaterialStatus.textContent = '';
    try {
      await clearFigureUploads(topic.id, collection);
      const persisted = preferences.clearLayout(topic.id, collection);
      if (!isCurrent()) return;
      settings = getOptions(topic);
      documentType = 'sheet';
      previewMagnification = 1;
      pendingSection = route.section ?? '';
      sectionEdit = null;
      figureEdit = '';
      logoUploadVersion++;
      closeFigureHelper();
      if (comparisonDialog.open) comparisonDialog.close();
      headerLogoFeedback('');
      byId('upload-status').hidden = true;
      byId('save-status').hidden = true;
      stack.scrollTop = 0;
      stack.scrollLeft = 0;
      renderNavigation();
      renderControls();
      requestPaper();
      resetMaterialStatus.textContent = persisted ? 'Fitxa restablerta.' : 'Fitxa restablerta durant aquesta sessió.';
    } catch {
      if (isCurrent()) resetMaterialStatus.textContent = 'No s’ha pogut restablir la fitxa. Torna-ho a provar.';
    } finally {
      imageWrite = false;
      byId('reset-material').disabled = false;
    }
  }

  async function resetFigures() {
    if (!route || imageWrite) return;
    const topic = route.topic.id;
    const collection = activeCollection;
    imageWrite = true;
    try {
      await clearFigureUploads(topic, collection);
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

  const templateSample = {
    id: 'mostra', lang: locale, code: 'M000', title: 'Un paisatge per observar',
    intro: 'Un mateix paisatge canvia segons l’estació i el lloc des d’on el mires. Pots descriure què hi veus i comparar-ho amb el que veu una altra persona.',
    sections: [{
      id: 'observacio', title: 'Com és el paisatge?',
      blocks: [
        { type: 'paragraph', core: true, text: 'Comença per allò que tens més a prop. Fixa’t en el relleu, la vegetació i els camins. Busca un detall que t’ajudi a orientar-te.' },
        { type: 'note', kind: 'observa', title: 'El mateix lloc, dues mirades', text: 'Tria un detall del paisatge i explica per què t’hi has fixat.' },
        { type: 'paragraph', text: 'Ara mira més lluny. Què canvia? Explica-ho amb exemples i compara la teva descripció amb la d’un company.' },
      ],
    }],
    figures: [{
      id: 'mostra-paisatge', section: 'observacio', anchor: 'lead', position: 'right', width: 45, wrap: true,
      src: 'illustracions/m001/elements-pla.png', ratio: 23 / 14, alt: '',
    }],
  };

  function templateName(id) {
    if (id === 'inherit') {
      const inherited = activeCollection?.templateId ?? library.defaultTemplateId;
      return 'Per defecte · ' + (library.templates.find(item => item.id === inherited)?.name ?? 'Format original');
    }
    return library.templates.find(item => item.id === id)?.name ?? 'Format original';
  }

  function templatePreview(container, format) {
    loadPaperFont(format.font);
    const chapter = format.showFigures ? templateSample : { ...templateSample, figures: [] };
    container.replaceChildren(previewPage(templateSample, chapter, 'observacio', { ...format, classroomCode: 'A5' }));
  }

  function templateSummary(format) {
    const font = form.elements.font.querySelector('option[value="' + CSS.escape(format.font) + '"]')?.label ?? format.font;
    return font + ' · ' + layoutNumber.format(format.fontSize) + ' pt · ' + layoutNumber.format(format.margin) + ' mm';
  }

  function syncTemplateSelector() {
    byId('current-template-name').textContent = templateName(settings.templateId ?? 'inherit');
    templatePreview(byId('current-template-thumb'), preferences.getBase(settings.templateId, activeCollection, library));
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

  function selectTemplatePreview(id) {
    browsingTemplate = id;
    const format = preferences.getBase(id === 'inherit' ? null : id, activeCollection, library);
    for (const card of templateGallery.querySelectorAll('button')) {
      card.setAttribute('aria-pressed', String(card.dataset.templateId === id));
    }
    byId('template-detail-name').textContent = templateName(id);
    byId('template-detail-format').textContent = templateSummary(format);
    templatePreview(byId('template-detail-preview'), format);

    const defaultButton = byId('default-template');
    defaultButton.hidden = id === 'inherit';
    defaultButton.disabled = id === library.defaultTemplateId;
    defaultButton.textContent = defaultButton.disabled ? 'Format per defecte' : 'Fes-la per defecte';
    const template = library.templates.find(item => item.id === id);
    const manager = byId('template-form');
    manager.hidden = !template;
    manager.elements.title.value = template?.name ?? '';
    byId('template-status').textContent = '';
  }

  function showTemplateManager(selected = 'inherit') {
    const ids = ['inherit', '', ...library.templates.map(item => item.id)];
    templateGallery.replaceChildren(...ids.map(id => {
      const card = node('button', 'template-card');
      card.type = 'button';
      card.dataset.templateId = id;
      const thumb = node('span', 'template-thumb');
      thumb.setAttribute('aria-hidden', 'true');
      const format = preferences.getBase(id === 'inherit' ? null : id, activeCollection, library);
      templatePreview(thumb, format);
      card.append(thumb, node('span', 'template-card-name', templateName(id)), node('small', 'template-card-format', templateSummary(format)));
      card.addEventListener('click', () => selectTemplatePreview(id));
      return card;
    }));
    selectTemplatePreview(ids.includes(selected) ? selected : 'inherit');
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

  function cancelResetConfirmation() {
    if (!pendingReset) return;
    const { button, labelElement, label } = pendingReset;
    pendingReset = undefined;
    labelElement.textContent = label;
    delete button.dataset.confirmingReset;
  }

  function registerReset(id, confirmationLabel, action) {
    const button = byId(id);
    const labelElement = button.querySelector('[data-reset-label]') ?? button;
    const label = labelElement.textContent;
    button.addEventListener('click', event => {
      event.preventDefault();
      if (pendingReset?.button === button) {
        cancelResetConfirmation();
        action();
        return;
      }
      cancelResetConfirmation();
      pendingReset = { button, labelElement, label };
      labelElement.textContent = confirmationLabel;
      button.dataset.confirmingReset = '';
    });
    button.addEventListener('blur', () => {
      if (pendingReset?.button === button) cancelResetConfirmation();
    });
    button.addEventListener('keydown', event => {
      if (event.key === 'Enter' && event.repeat) event.preventDefault();
    });
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
    if (event.key !== 'Escape') return;
    cancelResetConfirmation();
    if (helperFigure) closeFigureHelper(helperPinned);
  });
  document.addEventListener('pointerdown', event => {
    if (pendingReset && !pendingReset.button.contains(event.target)) cancelResetConfirmation();
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
  registerReset('reset-figures', 'Confirma', resetFigures);
  registerReset('reset-user', 'Esborra tots els canvis locals', resetUserPreferences);
  registerReset('reset-material', 'Confirma i esborra els canvis i les imatges', resetMaterial);
  figureUpload.addEventListener('change', addImage);
  byId('removed-sections').addEventListener('click', restoreSection);
  registerReset('reset-section-order', 'Confirma', () => {
    const menu = byId('chapter-menu');
    const expanded = menu.open;
    delete settings.sectionOrder[route.chapter.id];
    updateSections('S’ha recuperat l’ordre original dels apartats.');
    menu.open = expanded;
    byId('outline-title').closest('summary').focus({ preventScroll: true });
  });
  byId('apply-template').addEventListener('click', () => {
    applyTemplate(browsingTemplate === 'inherit' ? null : browsingTemplate);
    templateDialog.close();
    quickTemplateStatus.textContent = 'Format aplicat a la fitxa.';
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
  byId('manage-templates').addEventListener('click', () => showTemplateManager(settings.templateId ?? 'inherit'));
  byId('template-form').addEventListener('submit', event => {
    event.preventDefault();
    const manager = event.currentTarget;
    const name = manager.elements.title.value.trim();
    if (!name) return;
    const id = browsingTemplate;
    const persisted = updateLibrary(data => {
      const template = data.templates.find(item => item.id === id);
      if (template) template.name = name;
    });
    syncTemplateSelector();
    showTemplateManager(id);
    templateStatus('Nom de la plantilla actualitzat.', persisted);
  });
  byId('default-template').addEventListener('click', () => {
    const persisted = updateLibrary(data => { data.defaultTemplateId = browsingTemplate; });
    settings = getOptions(route.topic);
    renderControls();
    requestPaper();
    showTemplateManager(browsingTemplate);
    templateStatus('Format per defecte actualitzat.', persisted);
  });
  byId('remove-template').addEventListener('click', () => {
    const id = browsingTemplate;
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
  levelPicker.addEventListener('click', event => selectMaterialLevel(event.target.closest('button')?.dataset.materialLevel));
  for (const side of variantSides) {
    side.addEventListener('click', () => {
      selectMaterialLevel(side.dataset.variantSide);
      levelPicker.querySelector('[aria-pressed="true"]')?.focus({ preventScroll: true });
    });
  }
  for (const button of compareButtons) button.addEventListener('click', openComparison);
  for (const arrow of comparisonArrows) {
    arrow.addEventListener('click', () => renderComparison(Number(arrow.dataset.pairStart)));
  }
  comparisonSections.addEventListener('click', event => {
    const section = event.target.closest('[data-comparison-section]')?.dataset.comparisonSection;
    if (section) alignComparison(section);
  });
  const comparisonObserver = new ResizeObserver(entries => {
    if (comparisonPages.length && comparisonDialog.open && entries.some(entry => comparisonBodies.includes(entry.target))) {
      fitComparison();
      positionComparison(comparisonProgress);
    }
    for (const side of variantSides) {
      const thumbnail = side.querySelector('.variant-thumb');
      fitMaterial(thumbnail, variantThumbPages.get(thumbnail));
    }
  });
  comparisonBodies.forEach((target, pane) => {
    target.addEventListener('scroll', () => followComparison(pane, target), { passive: true });
    target.addEventListener('wheel', stopComparisonScroll, { passive: true });
    target.addEventListener('pointerdown', stopComparisonScroll);
    target.addEventListener('keydown', stopComparisonScroll);
    comparisonObserver.observe(target);
  });
  for (const side of variantSides) comparisonObserver.observe(side);
  comparisonDialog.addEventListener('click', event => {
    if (event.target !== comparisonDialog) return;
    const bounds = comparisonDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) comparisonDialog.close();
  });
  comparisonDialog.addEventListener('close', () => {
    comparisonRevision++;
    stopComparisonScroll();
    comparisonSwap?.cancel();
    comparisonSwap = undefined;
    comparisonPair = undefined;
    comparisonPages = [];
    comparisonAnchors = [];
    comparisonProgress = 0;
    comparisonScrollPositions = [];
    for (const target of comparisonBodies) target.replaceChildren();
    comparisonSections.replaceChildren();
    comparisonOpener?.focus({ preventScroll: true });
    comparisonOpener = undefined;
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
  registerReset('reset', 'Confirma', () => {
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
  function positionPrintMenu() {
    const trigger = printOptions.getBoundingClientRect();
    printMenu.style.setProperty('--print-trigger-bottom', trigger.bottom + 'px');
    printMenu.style.setProperty('--print-trigger-right', document.documentElement.clientWidth - trigger.right + 'px');
  }

  printMenu.addEventListener('beforetoggle', event => {
    if (event.newState === 'open') positionPrintMenu();
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
  studio.addEventListener('wheel', event => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stack.clientHeight : 1;
    const distance = Math.max(-240, Math.min(240, event.deltaY * unit));
    if (distance) zoomPaper(previewMagnification * 2 ** (-distance / 480), event);
  }, { passive: false });
  new ResizeObserver(() => {
    fitPaper();
    positionFigureHelper();
  }).observe(studio);
  window.addEventListener('resize', () => {
    positionFigureHelper();
    if (printMenu.matches(':popover-open')) positionPrintMenu();
  });
  window.addEventListener('hashchange', event => {
    if (location.hash !== '#main') renderRoute(event);
  });
  function noteRadio(name, value, title, symbol) {
    const label = node('label');
    label.title = title;
    const input = node('input', 'sr-only');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    input.setAttribute('aria-label', title);
    const face = node('span');
    face.setAttribute('aria-hidden', 'true');
    face.append(symbol);
    label.append(input, face);
    return label;
  }

  function syncNoteColors() {
    for (const card of byId('note-type-options').children) {
      const type = noteTypes[card.dataset.noteType];
      const color = settings[type.colorField];
      const trigger = card.querySelector('.note-color-trigger');
      trigger.dataset.noteColor = color;
      trigger.setAttribute('aria-label', 'Color del quadre «' + type.label + '» · ' + noteColors[color]);
      trigger.title = trigger.getAttribute('aria-label');
      for (const swatch of card.querySelectorAll('.note-color-swatch')) {
        swatch.setAttribute('aria-pressed', String(swatch.dataset.noteColor === color));
      }
    }
  }

  function setupNoteOptions() {
    const options = byId('note-type-options');

    function showPalette(trigger, open) {
      trigger.setAttribute('aria-expanded', String(open));
      byId(trigger.getAttribute('aria-controls')).hidden = !open;
    }

    for (const [kind, type] of Object.entries(noteTypes)) {
      const card = node('div', 'note-edit-card');
      card.dataset.noteType = kind;
      const heading = node('div', 'note-edit-heading');
      const trigger = node('button', 'note-color-trigger');
      trigger.type = 'button';
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', 'note-colors-' + kind);
      const side = node('div', 'alignment-options note-side-options');
      side.setAttribute('role', 'group');
      side.setAttribute('aria-label', 'Costat de la barra · ' + type.label);
      side.append(noteRadio(type.sideField, 'left', 'Esquerra', '←'), noteRadio(type.sideField, 'right', 'Dreta', '→'));
      heading.append(trigger, node('span', 'note-edit-title', type.label), side);

      const palette = node('div', 'note-color-options');
      palette.id = 'note-colors-' + kind;
      palette.hidden = true;
      palette.setAttribute('role', 'group');
      palette.setAttribute('aria-label', 'Colors · ' + type.label);
      for (const [id, color] of Object.entries(noteColors)) {
        const swatch = node('button', 'note-color-swatch');
        swatch.type = 'button';
        swatch.dataset.noteColor = id;
        swatch.setAttribute('aria-label', color);
        swatch.title = color;
        swatch.addEventListener('click', () => {
          settings[type.colorField] = id;
          syncNoteColors();
          showPalette(trigger, false);
          trigger.focus({ preventScroll: true });
          applyOptions();
        });
        palette.append(swatch);
      }
      trigger.addEventListener('click', () => {
        const open = palette.hidden;
        const previous = options.querySelector('.note-color-trigger[aria-expanded="true"]');
        if (previous) showPalette(previous, false);
        if (open) showPalette(trigger, true);
      });
      card.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || palette.hidden) return;
        event.stopPropagation();
        showPalette(trigger, false);
        trigger.focus({ preventScroll: true });
      });

      const icons = node('div', 'alignment-options note-icon-gallery');
      icons.setAttribute('role', 'group');
      icons.setAttribute('aria-label', 'Icona · ' + type.label);
      for (const id of [...type.icons, 'none']) icons.append(noteRadio(type.iconField, id, noteIcons[id][0], noteIcon(id)));
      card.append(heading, palette, icons);
      options.append(card);
    }
  }

  setupNoteOptions();
  const refreshCatalog = setupCatalog();
  window.setupCurriculum(topics, (topic, section) => {
    const chapter = topic.chapters.find(entry => entry.sections.some(item => item.id === section)) ?? topic.chapters[0];
    return address(topic, chapter, section, null);
  }, isDefinitive);
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
