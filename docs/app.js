(() => {
  const topics = window.quaderns;
  const { node, paragraphAnchor, readChapter, paginate } = window.imprimible;
  const byId = id => document.getElementById(id);
  const form = byId('options');
  const stack = byId('paper-stack');
  const catalogTitle = document.title;
  // Keep storage identifiers stable so saved layouts and uploaded images survive the rename.
  const storageKey = 'quadern-obert:layout:v1';
  const defaults = { scope: 'chapter', fontSize: 12, leading: 1.45, margin: 16, monochrome: false, pageNumbers: true, showFigures: true };
  const widths = new Intl.NumberFormat('ca', { maximumFractionDigits: 1 });
  const images = new Map();
  let saved = {};
  let knownUploads = [];
  let route;
  let documentType = 'sheet';
  let settings;
  let paper;
  let revision = 0;
  let frameId;
  let imageDb;

  try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; }
  catch { saved = {}; }

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

  function address(topic, chapter, view = 'maqueta', section = '') {
    return '#' + [topic.id, chapter.id, view, section].filter(Boolean).join('/');
  }

  function meta(topic) {
    return [topic.subject, topic.grades.join(', ') + ' de primària'].join(' · ');
  }

  function option(value, label) {
    return new Option(label, value);
  }

  function setupCatalog() {
    const filters = byId('catalog-filters');
    const size = topic => topic.chapters.length + (topic.chapters.length === 1 ? ' capítol' : ' capítols');
    const fields = {
      grade: topic => topic.grades,
      theme: topic => [topic.theme],
      length: topic => [size(topic)],
      difficulty: topic => [topic.difficulty],
    };
    const controls = Object.entries(fields).map(([name, values]) => {
      const select = filters.elements.namedItem(name);
      const available = [...new Set(topics.flatMap(values).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'ca', { numeric: true }));
      select.append(...available.map(value => option(value, value)));
      return { select, values };
    });

    function refresh() {
      const matching = topics.filter(topic => controls.every(({ select, values }) => !select.value || values(topic).includes(select.value)));
      byId('topics').replaceChildren(...matching.map(topic => {
        const card = link('', address(topic, topic.chapters[0]), 'topic-card');
        card.dataset.topic = topic.id;
        const picture = node('div', 'topic-cover');
        if (topic.cover) {
          const cover = node('img');
          cover.src = topic.cover;
          cover.alt = '';
          cover.loading = 'lazy';
          picture.append(cover);
        }
        const details = node('div', 'topic-details');
        const summary = [topic.grades.join(', '), topic.theme ?? topic.subject].join(' · ');
        const extent = [size(topic), topic.difficulty].filter(Boolean).join(' · ');
        details.append(node('p', 'eyebrow', summary), node('h2', '', topic.title),
          node('p', 'topic-description', topic.description), node('p', 'topic-extent', extent));
        card.append(picture, details);
        return card;
      }));
      byId('empty').hidden = matching.length > 0;
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
    refresh();
  }

  function extractRoute() {
    const [topicId, chapterId, view, section] = location.hash.slice(1).split('/');
    const topic = topics.find(item => item.id === topicId);
    if (!topic) return null;
    const chapter = topic.chapters.find(item => item.id === chapterId) ?? topic.chapters[0];
    return { topic, chapter, view: view === 'llegeix' ? 'llegeix' : 'maqueta', section };
  }

  function getOptions(topic) {
    const data = saved[topic.id] ?? {};
    return { ...defaults, ...data, figures: { ...data.figures } };
  }

  function storeOptions() {
    saved[route.topic.id] = settings;
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      byId('save-status').hidden = true;
    } catch {
      byId('save-status').hidden = false;
      byId('save-status').textContent = 'Els ajustos es mantindran mentre aquesta pàgina sigui oberta.';
    }
  }

  function figuresFor(chapter) {
    const userFigures = knownUploads.filter(item => item.topic === route.topic.id &&
      item.chapter === chapter.id && (item.documentType ?? 'sheet') === documentType);
    return [...(chapter.figures ?? []), ...userFigures].map(item => {
      const config = { ...item, visible: true, ...settings.figures[item.id] };
      if (paragraphAnchor(config.anchor) === null || config.position === 'center') config.wrap = false;
      return config;
    });
  }

  function printableChapter(chapter) {
    if (documentType === 'sheet') return chapter;
    const solution = chapter.solution;
    return solution && { ...solution, id: chapter.id, title: solution.title ?? chapter.title };
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

  function mountList(container, title, rows, intro) {
    container.hidden = rows.length === 0 && !intro;
    const summary = node('summary', '', title);
    const list = node('ul');
    for (const [label, url] of rows) {
      const item = node('li');
      const anchor = link(label, url);
      anchor.target = '_blank';
      anchor.rel = 'noopener';
      item.append(anchor);
      list.append(item);
    }
    container.replaceChildren(summary);
    if (intro) container.append(node('p', '', intro));
    if (rows.length) container.append(list);
  }

  function renderNavigation() {
    const { topic, chapter, view, section } = route;
    const nav = byId('chapter-nav');
    nav.replaceChildren();
    for (const entry of topic.chapters) {
      const anchor = link(entry.title, address(topic, entry, view));
      if (entry.id === chapter.id && !section) anchor.setAttribute('aria-current', 'page');
      nav.append(anchor);
      if (entry.id !== chapter.id || view !== 'llegeix') continue;
      const sub = node('div', 'section-links');
      for (const item of entry.sections) {
        const heading = link(item.title, address(topic, entry, view, item.id));
        if (item.id === section) heading.setAttribute('aria-current', 'location');
        sub.append(heading);
      }
      nav.append(sub);
    }
    mountList(byId('resources'), 'Recursos del tema', (topic.resources ?? []).map(item => [[item.title, item.provider].filter(Boolean).join(' · '), item.url]));
    mountList(byId('sources'), 'Currículum i fonts', topic.sources ?? [], topic.curriculum);
    byId('document-view-link').href = address(topic, chapter, view === 'maqueta' ? 'llegeix' : 'maqueta');
    byId('document-view-link').textContent = view === 'maqueta' ? 'Llegeix els apunts' : 'Obre la maquetació';
  }

  function renderRoute(event) {
    const previous = route;
    route = extractRoute();
    if (!route) {
      revision++;
      byId('catalog').hidden = false;
      byId('workspace').hidden = true;
      document.title = catalogTitle;
      if (previous) {
        window.scrollTo(0, 0);
        if (event) byId('topics').querySelector('[data-topic="' + previous.topic.id + '"]')?.focus({ preventScroll: true });
      }
      return;
    }
    if (previous?.topic.id !== route.topic.id) {
      settings = getOptions(route.topic);
      documentType = 'sheet';
    }
    const editing = route.view === 'maqueta';
    byId('catalog').hidden = true;
    byId('workspace').hidden = false;
    byId('reader').hidden = editing;
    byId('studio').hidden = !editing;
    byId('settings').hidden = !editing;
    byId('workspace-grid').classList.toggle('maqueta', editing);
    byId('topic-title').textContent = route.topic.title;
    byId('topic-meta').textContent = meta(route.topic);
    document.title = route.chapter.title + ' · Món a mà';
    if (event && previous?.topic.id !== route.topic.id) byId('topic-title').focus({ preventScroll: true });
    if (previous?.topic.id !== route.topic.id || previous?.chapter.id !== route.chapter.id || previous?.view !== route.view) {
      byId('upload-status').hidden = true;
      byId('save-status').hidden = true;
      byId('upload').value = '';
    }
    window.scrollTo(0, 0);
    renderNavigation();
    if (editing) {
      renderControls();
      refreshPaper();
    } else {
      const figures = route.chapter.figures.map(item => ({ ...item, visible: true }));
      byId('reader').replaceChildren(readChapter(route.chapter, figures));
      if (route.section) {
        const heading = byId('apartat-' + route.section);
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView();
      }
    }
  }

  function control(label, input, className) {
    const wrapper = node('label', className);
    if (input.type === 'checkbox') wrapper.append(input, ' ' + label);
    else wrapper.append(label, input);
    return wrapper;
  }

  function figureControl(item) {
    const field = node('fieldset', 'figure-control');
    field.dataset.figureId = item.id;
    field.append(node('legend', '', item.name || item.alt.replace(/\.$/, '')));
    const visible = node('input');
    visible.type = 'checkbox';
    visible.checked = item.visible;
    visible.dataset.setting = 'visible';
    field.append(control('Mostra aquesta imatge', visible, 'check'));
    const group = node('div', 'option-group');
    group.hidden = !item.visible;
    const width = node('input');
    width.type = 'range';
    width.min = '25';
    width.max = '100';
    width.value = item.width;
    width.dataset.setting = 'width';
    const widthLabel = node('label', 'slider', 'Amplada');
    widthLabel.append(node('output', '', item.width + ' %'), width);
    group.append(widthLabel);

    function pick(key, label, values) {
      const select = node('select');
      select.append(...values.map(([value, text]) => option(value, text)));
      select.value = item[key];
      select.dataset.setting = key;
      group.append(control(label, select));
    }
    const chapter = printableChapter(route.chapter);
    pick('section', 'Apartat', chapter.sections.map(entry => [entry.id, entry.title]));
    const anchors = [['before', 'Abans del primer text'], ['lead', 'Amb el primer text']];
    const section = chapter.sections.find(entry => entry.id === item.section);
    section.blocks.forEach((entry, index) => {
      if (index > 0 && entry.type === 'paragraph') anchors.push(['paragraph-' + index, 'Amb el text «' + entry.text.replaceAll('*', '').slice(0, 32) + '…»']);
    });
    anchors.push(['after', 'Al final de l’apartat']);
    pick('anchor', 'Punt d’inserció', anchors);
    pick('position', 'Alineació', [['left', 'Esquerra'], ['center', 'Centre'], ['right', 'Dreta']]);
    const flow = node('input');
    flow.type = 'checkbox';
    flow.checked = item.wrap;
    flow.disabled = item.position === 'center' || paragraphAnchor(item.anchor) === null;
    flow.dataset.setting = 'wrap';
    group.append(control('Text al voltant', flow, 'check'));
    const caption = node('input');
    caption.type = 'text';
    caption.value = item.caption;
    caption.maxLength = 240;
    caption.dataset.setting = 'caption';
    group.append(control('Peu de la imatge', caption));
    if (item.blob) {
      const remove = node('button', 'secondary', 'Treu la imatge');
      remove.type = 'button';
      remove.dataset.removeFigure = item.id;
      field.append(group, remove);
    } else field.append(group);
    return field;
  }

  function renderControls() {
    syncDocumentPicker();
    for (const key of Object.keys(defaults)) {
      const input = form.elements.namedItem(key);
      if (input.type === 'checkbox') input.checked = settings[key];
      else input.value = settings[key];
    }
    byId('font-size-value').value = widths.format(settings.fontSize) + ' pt';
    const chapter = printableChapter(route.chapter);
    const figures = chapter ? figuresFor(chapter) : [];
    byId('figure-options').replaceChildren(...figures.map(figureControl));
    byId('upload').disabled = !chapter;
    byId('figure-options').hidden = !settings.showFigures;
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
    if (!paper || byId('studio').hidden) return;
    const padding = getComputedStyle(stack);
    const available = stack.clientWidth - parseFloat(padding.paddingLeft) - parseFloat(padding.paddingRight);
    const zoom = Math.min(1, Math.max(0.1, available / paper.width));
    stack.style.setProperty('--zoom', zoom);
    for (const frame of stack.children) {
      frame.style.width = paper.width * zoom + 'px';
      frame.style.height = paper.height * zoom + 'px';
    }
  }

  async function refreshPaper() {
    const ticket = ++revision;
    const { topic, chapter } = route;
    const options = { ...settings, documentType };
    const chapters = (options.scope === 'topic' ? topic.chapters : [chapter]).map(printableChapter).filter(Boolean);
    const print = byId('print');
    print.disabled = true;
    const selected = chapters.map(entry => [entry.id, options.showFigures ? figuresFor(entry).filter(item => item.visible) : []]);
    let missing = false;
    const resolved = await Promise.all(selected.map(async ([id, candidates]) => {
      const figures = await Promise.all(candidates.map(async item => {
        const size = await preload(item.src);
        if (!size) {
          missing = true;
          return null;
        }
        return { ...item, pixelWidth: size.width, pixelHeight: size.height };
      }));
      return [id, figures.filter(Boolean)];
    }));
    if (ticket !== revision || route?.view !== 'maqueta') return;
    paper = paginate(topic, chapters, new Map(resolved), options, byId('layout-probe'), stack);
    fitPaper();
    byId('page-count').value = paper.count + (paper.count === 1 ? ' pàgina' : ' pàgines') +
      (missing ? ' · Alguna imatge no s’ha pogut carregar.' : '') +
      (paper.oversized ? ' · Redueix la lletra o els marges per encabir el contingut.' : '');
    print.disabled = paper.oversized;
  }

  function requestPaper() {
    revision++;
    byId('print').disabled = true;
    cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      if (route?.view === 'maqueta') refreshPaper();
    });
  }

  function updateOption(event) {
    const input = event.target;
    if (input.id === 'upload') return;
    if (event.type === 'input' && input.type !== 'range') return;
    const value = input.type === 'checkbox' ? input.checked : input.type === 'range' || ['leading', 'margin'].includes(input.name) ? Number(input.value) : input.value;
    const card = input.closest('[data-figure-id]');
    if (card) {
      const id = card.dataset.figureId;
      const key = input.dataset.setting;
      if (!key) return;
      settings.figures[id] = { ...settings.figures[id], [key]: value };
      if (key === 'width') card.querySelector('output').value = value + ' %';
      if (key === 'visible') card.querySelector('.option-group').hidden = !value;
      if (key === 'section') {
        settings.figures[id].anchor = 'lead';
        renderControls();
        form.querySelector('[data-figure-id="' + id + '"] [data-setting="section"]').focus({ preventScroll: true });
      } else if (key === 'anchor' || key === 'position') {
        const current = figuresFor(printableChapter(route.chapter)).find(item => item.id === id);
        const wrap = card.querySelector('[data-setting="wrap"]');
        wrap.disabled = paragraphAnchor(current.anchor) === null || current.position === 'center';
        wrap.checked = current.wrap;
      }
    } else {
      if (!(input.name in defaults)) return;
      settings[input.name] = value;
      if (input.name === 'fontSize') byId('font-size-value').value = widths.format(value) + ' pt';
      if (input.name === 'showFigures') byId('figure-options').hidden = !value;
      if (input.name === 'scope') renderControls();
    }
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
    if (!printable) return;
    input.value = '';
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'].includes(file.type) || file.size > 12 * 1024 * 1024) {
      imageFeedback('Tria una imatge PNG, JPG, WebP, GIF o AVIF de fins a 12 MB.');
      return;
    }
    const name = file.name.replace(/\.[^.]+$/, '').slice(0, 75);
    const source = {
      id: 'local-' + crypto.getRandomValues(new Uint32Array(4)).join('-'),
      name, alt: name, caption: '', blob: file, topic: topic.id, chapter: chapter.id, documentType,
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
    if (route?.topic.id === topic.id && route.chapter.id === chapter.id && source.documentType === documentType) {
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
    if (route?.topic.id === item.topic) {
      delete settings.figures[id];
      storeOptions();
      renderControls();
      requestPaper();
      imageFeedback('Imatge treta.');
    }
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', updateOption);
  form.addEventListener('change', updateOption);
  byId('figure-options').addEventListener('click', removeImage);
  byId('upload').addEventListener('change', addImage);
  byId('document-picker').addEventListener('click', event => {
    const type = event.target.closest('button')?.dataset.document;
    if (!type || type === documentType) return;
    documentType = type;
    renderControls();
    requestPaper();
  });
  byId('reset').addEventListener('click', () => {
    settings = { ...defaults, figures: {} };
    storeOptions();
    renderControls();
    requestPaper();
  });
  byId('print').addEventListener('click', () => {
    if (route?.view !== 'maqueta' || !paper || paper.oversized) return;
    const title = document.title;
    const name = settings.scope === 'topic' ? route.topic.title : printableChapter(route.chapter).title;
    document.title = documentType === 'solution' ? name + ' · Solucionari' : name;
    window.print();
    document.title = title;
  });
  new ResizeObserver(fitPaper).observe(stack);
  window.addEventListener('hashchange', event => {
    if (location.hash !== '#main') renderRoute(event);
  });
  byId('print').disabled = true;
  setupCatalog();
  renderRoute();
  imageOperation('readonly', store => store.getAll()).then(items => {
    knownUploads.push(...items.map(item => ({ ...addUrl(item), persisted: true })));
    if (route?.view === 'maqueta') {
      renderControls();
      requestPaper();
    }
  }).catch(() => {
    byId('upload-hint').textContent = 'Les imatges afegides es mantindran mentre aquesta pàgina sigui oberta.';
  });
})();
