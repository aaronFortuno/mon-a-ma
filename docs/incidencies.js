(() => {
  const { node } = window.imprimible;
  const { loadIncidencies, saveIncidencies } = window.preferencies;
  const byId = id => document.getElementById(id);
  const categories = {
    text: 'Text',
    imatge: 'Imatge',
    maquetacio: 'Maquetació',
    curricular: 'Mapa curricular',
  };
  const levels = { suport: 'Suport', intermedia: 'Base', ampliacio: 'Ampliació' };
  const dateFormat = new Intl.DateTimeFormat(document.documentElement.lang, { dateStyle: 'short', timeStyle: 'short' });
  const catalogVersion = () => document.querySelector('[data-dialog="release"]').textContent.trim();

  function flagButton(className, label) {
    const button = node('button', className);
    button.type = 'button';
    button.title = label;
    button.setAttribute('aria-label', label);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'M5 21V4m0 0c5-4 9 4 14 0v10c-5 4-9-4-14 0');
    svg.append(path);
    button.append(svg);
    return button;
  }

  function contextLabel(context) {
    return [
      context.materialCode ? context.materialCode + ' · ' + context.materialTitle : context.pageTitle,
      context.documentType === 'solution' ? 'Solucionari' : levels[context.readingLevel],
      context.sectionTitle, context.figureTitle, context.figureStyleTitle,
    ].filter(Boolean).join(' / ');
  }

  function setupIncidencies({ openContext, currentContext }) {
    const listDialog = byId('issues-dialog');
    const editor = byId('issue-editor');
    const form = byId('issue-form');
    const filter = byId('issues-filter');
    const list = byId('issues-list');
    const exportStatus = byId('issues-status');
    const exportText = byId('issues-json');
    const announce = byId('issue-announcement');
    const selection = new Set();
    let editing = null;
    let addContext = null;
    let saved = true;

    function visibleIssues() {
      return loadIncidencies().filter(item => filter.value === 'all' ||
        (filter.value === 'resolved' ? item.resolved : !item.resolved)).reverse();
    }

    function openEditor(context, item = null) {
      editing = item;
      addContext = context;
      byId('issue-editor-title').textContent = item ? 'Edita la incidència' : 'Anota una incidència';
      byId('issue-context').textContent = contextLabel(context);
      form.elements.category.value = item?.category ?? context.category;
      form.elements.note.value = item?.note ?? '';
      form.elements.note.setCustomValidity('');
      editor.showModal();
    }

    function save(items) {
      saved = saveIncidencies(items);
      byId('issues-storage').hidden = saved;
      render();
    }

    function action(label, handler) {
      const button = node('button', 'secondary', label);
      button.type = 'button';
      button.addEventListener('click', handler);
      return button;
    }

    function render() {
      const items = visibleIssues();
      const ids = new Set(items.map(item => item.id));
      for (const id of selection) if (!ids.has(id)) selection.delete(id);
      list.replaceChildren(...items.map(item => {
        const entry = node('li', 'issue-entry');
        const check = node('input');
        check.type = 'checkbox';
        check.checked = selection.has(item.id);
        check.setAttribute('aria-label', 'Inclou a l’exportació: ' + contextLabel(item.context));
        check.addEventListener('change', () => {
          if (check.checked) selection.add(item.id);
          else selection.delete(item.id);
          syncExport(items.length);
        });
        const content = node('div', 'issue-entry-content');
        const context = node('strong', 'issue-entry-context', contextLabel(item.context));
        const metadata = node('small', '', categories[item.category] + ' · ' + dateFormat.format(new Date(item.createdAt)));
        const buttons = node('div', 'issue-actions');
        buttons.append(
          action('Obre el context', () => {
            listDialog.close('navigate');
            openContext(item.context);
          }),
          action('Edita', () => openEditor(item.context, item)),
          action(item.resolved ? 'Reobre' : 'Resol', () => {
            const current = loadIncidencies();
            save(current.map(record => record.id === item.id
              ? { ...record, resolved: !record.resolved, updatedAt: new Date().toISOString() }
              : record));
            exportStatus.textContent = item.resolved ? 'Incidència reoberta.' : 'Incidència resolta.';
            filter.focus();
          }),
        );
        content.append(context, metadata, node('p', 'issue-note', item.note), buttons);
        entry.append(check, content);
        return entry;
      }));
      byId('issues-empty').hidden = items.length > 0;
      syncExport(items.length);
    }

    function syncExport(count) {
      const exporting = selection.size || count;
      byId('issues-export-count').textContent = exporting === 1 ? '1 incidència per exportar' : exporting + ' incidències per exportar';
      byId('issues-copy').disabled = byId('issues-download').disabled = !exporting;
      exportText.hidden = true;
    }

    function exportJSON() {
      const issues = visibleIssues().filter(item => !selection.size || selection.has(item.id));
      return JSON.stringify({
        format: 'mon-a-ma-incidencies', schemaVersion: 1, catalogVersion: catalogVersion(),
        exportedAt: new Date().toISOString(), issues,
      }, null, 2);
    }

    byId('issues-button').addEventListener('click', () => {
      selection.clear();
      exportStatus.textContent = '';
      render();
    });
    byId('issues-new').addEventListener('click', () => openEditor(currentContext()));
    filter.addEventListener('change', () => {
      selection.clear();
      exportStatus.textContent = '';
      render();
    });
    form.elements.note.addEventListener('input', () => form.elements.note.setCustomValidity(''));
    form.addEventListener('submit', event => {
      event.preventDefault();
      const note = form.elements.note.value.trim();
      if (!note) {
        form.elements.note.setCustomValidity('Escriu què cal revisar.');
        form.elements.note.reportValidity();
        return;
      }
      const items = loadIncidencies();
      const now = new Date().toISOString();
      const item = {
        ...(editing ?? {
          id: crypto.randomUUID(), createdAt: now, resolved: false,
          catalogVersion: catalogVersion(), context: addContext,
        }),
        note, category: form.elements.category.value, updatedAt: now,
      };
      const index = items.findIndex(record => record.id === item.id);
      if (index === -1) items.push(item);
      else items[index] = item;
      save(items);
      const message = saved ? 'Incidència desada.' : 'Incidència anotada per a aquesta sessió. Exporta-la abans de tancar.';
      exportStatus.textContent = announce.textContent = message;
      editor.close();
      if (listDialog.open) filter.focus();
    });
    byId('issues-copy').addEventListener('click', async () => {
      const json = exportJSON();
      try {
        await navigator.clipboard.writeText(json);
        exportStatus.textContent = 'JSON copiat.';
      } catch {
        exportText.value = json;
        exportText.hidden = false;
        exportText.focus();
        exportText.select();
        exportStatus.textContent = 'JSON seleccionat. Fes servir Ctrl+C o ⌘C per copiar-lo.';
      }
    });
    byId('issues-download').addEventListener('click', () => {
      const json = exportJSON();
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      const link = node('a');
      link.href = url;
      link.download = 'mon-a-ma-incidencies-' + new Date().toISOString().slice(0, 10) + '.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      exportStatus.textContent = 'JSON descarregat.';
    });
    return openEditor;
  }

  window.incidencies = { setup: setupIncidencies, flagButton };
})();
