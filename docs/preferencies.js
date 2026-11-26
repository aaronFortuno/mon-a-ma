(() => {
  // Keep the original key so existing topic layouts remain available.
  const layoutKey = 'quadern-obert:layout:v1';
  const libraryKey = 'mon-a-ma:organitzacio:v1';
  const visitsKey = 'mon-a-ma:fitxes-vistes:v1';
  const catalogDraftsKey = 'mon-a-ma:cataleg-en-desenvolupament';
  const defaults = {
    scope: 'chapter', font: 'georgia', fontSize: 12, leading: 1.8, margin: 20, textAlignment: 'left', blockSpacing: 100,
    showPageFooter: true, pageNumbers: true, showMaterialCode: true, showTopicTitle: true, showFigures: true, markCore: true,
    headerLogo: true, headerBrand: true, headerName: true, headerDate: true, headerLogoImage: '',
    showClassroomCode: false, classroomCode: '', classroomCodeSize: 20, classroomCodeStyle: 'solid',
  };
  const legacyDefaults = { ...defaults, leading: 1.45, margin: 16 };
  const localKeys = new Set(['scope', 'classroomCode']);
  const temporary = new Map();

  function read(key, fallback) {
    if (temporary.has(key)) return temporary.get(key);
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      temporary.delete(key);
      return true;
    } catch {
      temporary.set(key, value);
      return false;
    }
  }

  function loadCatalogDrafts() {
    return read(catalogDraftsKey, true);
  }

  function saveCatalogDrafts(value) {
    write(catalogDraftsKey, value);
  }

  function firstVisit(code) {
    const visits = read(visitsKey, {});
    if (visits[code]) return false;
    write(visitsKey, { ...visits, [code]: true });
    return true;
  }

  function library() {
    const data = read(libraryKey, {});
    return {
      templates: Array.isArray(data.templates) ? data.templates : [],
      defaultTemplateId: data.defaultTemplateId ?? '',
      collections: Array.isArray(data.collections) ? data.collections : [],
    };
  }

  function saveLibrary(change) {
    const data = library();
    change(data);
    return write(libraryKey, data);
  }

  function format(settings) {
    return Object.fromEntries(Object.keys(defaults).filter(key => !localKeys.has(key)).map(key => [key, settings[key]]));
  }

  function getBase(templateId, collection, data) {
    const id = templateId ?? collection?.templateId ?? data.defaultTemplateId;
    const template = data.templates.find(item => item.id === id);
    return { ...defaults, ...template?.format };
  }

  function recordKey(topicId, collection) {
    return collection ? 'col:' + collection.id + ':' + topicId : topicId;
  }

  function loadLayout(topicId, collection, data) {
    const saved = read(layoutKey, {})[recordKey(topicId, collection)] ?? {};
    const templateId = data.templates.some(item => item.id === saved.templateId) || saved.templateId === '' ? saved.templateId : null;
    // Earlier versions stored a full snapshot. Keep the changes from the original defaults.
    const changes = saved.values ?? Object.fromEntries(Object.keys(legacyDefaults)
      .filter(key => Object.hasOwn(saved, key) && saved[key] !== legacyDefaults[key]).map(key => [key, saved[key]]));
    return {
      ...getBase(templateId, collection, data),
      ...changes,
      templateId,
      figureStyle: typeof saved.figureStyle === 'string' ? saved.figureStyle : '',
      materialLevel: saved.materialLevel ?? 'intermedia',
      figures: { ...saved.figures },
      sectionOrder: { ...saved.sectionOrder },
      hiddenSections: { ...saved.hiddenSections },
    };
  }

  function saveLayout(topicId, collection, settings, data) {
    const base = getBase(settings.templateId, collection, data);
    const values = Object.fromEntries(Object.keys(defaults).filter(key => settings[key] !== base[key]).map(key => [key, settings[key]]));
    const layouts = read(layoutKey, {});
    return write(layoutKey, {
      ...layouts,
      [recordKey(topicId, collection)]: {
        templateId: settings.templateId, values, figureStyle: settings.figureStyle, materialLevel: settings.materialLevel, figures: settings.figures,
        sectionOrder: settings.sectionOrder, hiddenSections: settings.hiddenSections,
      },
    });
  }

  function clearLayout(topicId, collection) {
    const layouts = read(layoutKey, {});
    const key = recordKey(topicId, collection);
    if (!Object.hasOwn(layouts, key)) return true;
    const next = { ...layouts };
    delete next[key];
    return write(layoutKey, next);
  }

  function clearCollectionLayouts(id) {
    const layouts = read(layoutKey, {});
    return write(layoutKey, Object.fromEntries(Object.entries(layouts).filter(([key]) => !key.startsWith('col:' + id + ':'))));
  }

  function orderedSections(chapter, order) {
    const sections = new Map(chapter.sections.map(section => [section.id, section]));
    const sorted = [];
    for (const id of Array.isArray(order) ? order : []) {
      if (!sections.has(id)) continue;
      sorted.push(sections.get(id));
      sections.delete(id);
    }
    return [...sorted, ...sections.values()];
  }

  window.preferencies = { defaults, loadCatalogDrafts, saveCatalogDrafts, firstVisit, library, saveLibrary, format, getBase, loadLayout, saveLayout, clearLayout, clearCollectionLayouts, orderedSections };
})();
