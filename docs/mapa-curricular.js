(() => {
  const { node, previewPage } = window.imprimible;
  const { cycles, groups } = window.curriculum;
  const byId = id => document.getElementById(id);
  const countLabel = count => count === 1 ? '1 material' : count + ' materials';
  const cycleLabel = cycle => cycle.label + (cycle.stage === 'ESO' ? ' · ESO' : '');

  function hasIllustrationSet(topic) {
    const mainFigures = topic.chapters.flatMap(chapter => chapter.sections.map(section =>
      chapter.figures?.find(figure => figure.section === section.id)).filter(Boolean));
    if (!mainFigures.length) return false;
    if (mainFigures.every(figure => figure.src)) return true;
    return (topic.figureStyles ?? []).some(style =>
      mainFigures.every(figure => figure.src || figure.variants?.[style.id]?.src));
  }

  function setupCurriculum(topics, materialAddress, isDefinitive) {
    const dialog = byId('curriculum-dialog');
    const form = byId('curriculum-filters');
    const table = byId('curriculum-table');
    const panel = byId('curriculum-panel');
    const detail = byId('curriculum-detail');
    const help = byId('curriculum-help');
    const cycleSelect = form.elements.cycle;
    const areaSelect = form.elements.area;
    const tabs = [...dialog.querySelectorAll('[role="tab"]')];
    const filters = {
      p: { area: '', cycle: '', withMaterials: false, selection: '' },
      s: { area: '', cycle: '', withMaterials: false, selection: '' },
    };
    let stage = 'p';
    let helpTarget;
    let helpTimer;
    const helpContents = new WeakMap();
    const matches = new Map();
    const illustratedTopics = new Set(topics.filter(hasIllustrationSet));
    const statusLabel = topic => {
      const status = isDefinitive(topic) ? 'Definitiu' : 'En desenvolupament';
      return illustratedTopics.has(topic) ? status + ' · Lot d’il·lustracions incorporat' : status;
    };

    for (const topic of topics) {
      for (const entry of topic.curriculum ?? []) {
        const key = entry.row + ':' + topic.cycle;
        if (!matches.has(key)) matches.set(key, new Map());
        const materials = matches.get(key);
        if (!materials.has(topic.id)) materials.set(topic.id, { ...entry, topic });
      }
    }
    const rowKey = (group, row) => group.id + ':' + row[0];
    const cellKey = (group, row, cycle) => rowKey(group, row) + ':' + cycle.id;
    const resources = (group, row, cycle) => [...(matches.get(cellKey(group, row, cycle))?.values() ?? [])];

    function hideHelp() {
      clearTimeout(helpTimer);
      helpTarget?.removeAttribute('aria-describedby');
      helpTarget = null;
      help.hidden = true;
    }

    function showHelp(target) {
      clearTimeout(helpTimer);
      if (helpTarget === target || !dialog.open) return;
      hideHelp();
      helpTarget = target;
      target.setAttribute('aria-describedby', help.id);
      help.replaceChildren(...helpContents.get(target)());
      help.hidden = false;
      const frame = dialog.getBoundingClientRect();
      const anchor = target.getBoundingClientRect();
      const gap = 7;
      const left = anchor.left - frame.left + (anchor.width - help.offsetWidth) / 2;
      const below = anchor.bottom - frame.top + gap;
      const above = anchor.top - frame.top - help.offsetHeight - gap;
      help.style.left = dialog.scrollLeft + Math.max(gap, Math.min(left, dialog.clientWidth - help.offsetWidth - gap)) + 'px';
      help.style.top = dialog.scrollTop + Math.max(gap, Math.min(below + help.offsetHeight <= dialog.clientHeight ? below : above,
        dialog.clientHeight - help.offsetHeight - gap)) + 'px';
    }

    function helpHeading(title, context) {
      const heading = node('div', 'curriculum-help-heading');
      if (context) heading.append(node('span', '', context));
      heading.append(node('strong', '', title));
      return heading;
    }

    function materialHelp(entry, cycle) {
      const { topic, section, note } = entry;
      const chapter = topic.chapters.find(item => item.sections.some(part => part.id === section)) ?? topic.chapters[0];
      const content = node('div', 'curriculum-help-material');
      const text = node('div');
      text.append(helpHeading(topic.title, topic.code + ' · ' + cycleLabel(cycle)), node('p', '', statusLabel(topic)), node('p', '', note));
      const miniature = node('div', 'curriculum-thumbnail');
      miniature.setAttribute('aria-hidden', 'true');
      miniature.append(previewPage(topic, chapter, section, window.preferencies.defaults));
      content.append(text, miniature);
      return [content];
    }

    function materialLink(entry, cycle, square = false) {
      const label = entry.topic.code + ' · ' + entry.topic.title;
      const anchor = node('a', square ? 'curriculum-square' : '', square ? '' : label);
      anchor.href = materialAddress(entry.topic, entry.section);
      anchor.dataset.material = '';
      anchor.setAttribute('aria-label', label + ' · ' + statusLabel(entry.topic));
      if (square) {
        anchor.classList.toggle('is-draft', !isDefinitive(entry.topic));
        anchor.classList.toggle('is-illustrated', illustratedTopics.has(entry.topic));
      }
      helpContents.set(anchor, () => materialHelp(entry, cycle));
      return anchor;
    }

    function showCell(group, row, cycle, reveal = false) {
      hideHelp();
      const selected = cellKey(group, row, cycle);
      filters[stage].selection = selected;
      for (const control of table.querySelectorAll('button[data-cell], button[data-row]')) {
        const current = control.dataset.cell === selected || control.dataset.row === rowKey(group, row);
        control.setAttribute('aria-pressed', String(current));
      }

      const title = node('h3', '', row[2]);
      title.id = 'curriculum-detail-title';
      const meta = node('p', 'curriculum-context', [group.title, row[1], cycleLabel(cycle)].filter(Boolean).join(' / '));
      const linked = resources(group, row, cycle);
      detail.replaceChildren(meta, title, node('p', '', row[3][cycle.id]),
        node('h4', '', linked.length ? countLabel(linked.length) : 'Encara sense materials'));
      if (linked.length) {
        const list = node('ul', 'curriculum-materials');
        for (const entry of linked) {
          const item = node('li');
          const heading = node('div', 'curriculum-material-heading');
          heading.append(materialLink(entry, cycle), node('small', 'curriculum-material-status', statusLabel(entry.topic)));
          item.append(heading, node('p', '', entry.note));
          list.append(item);
        }
        detail.append(list);
      }
      if (group.note) detail.append(node('p', 'hint', group.note));
      const source = node('a', 'curriculum-source', 'Sabers oficials · XTEC');
      source.href = group.source;
      source.target = '_blank';
      source.rel = 'noopener';
      detail.append(source);
      if (reveal) {
        if (window.matchMedia('(max-width: 800px)').matches) detail.scrollIntoView({ block: 'start' });
        else title.scrollIntoView({ block: 'nearest' });
      }
    }

    function makeCell(cell, group, row, cycle, linked) {
      cell.className = 'curriculum-cell';
      const action = node('button', 'curriculum-cell-action');
      action.type = 'button';
      action.dataset.cell = cellKey(group, row, cycle);
      action.setAttribute('aria-pressed', 'false');
      action.setAttribute('aria-label', row[2] + ', ' + cycleLabel(cycle) + ' · ' + (linked.length ? countLabel(linked.length) : 'Sense materials'));
      action.addEventListener('click', () => showCell(group, row, cycle, true));
      cell.append(action);

      if (!linked.length) {
        const empty = node('span', 'curriculum-cell-empty', '—');
        empty.setAttribute('aria-hidden', 'true');
        cell.append(empty);
        return;
      }
      const squares = node('div', 'curriculum-squares');
      for (const entry of linked) squares.append(materialLink(entry, cycle, true));
      cell.append(squares);
    }

    function render() {
      hideHelp();
      const columns = cycles.filter(cycle => cycle.id.startsWith(stage) && (!cycleSelect.value || cycle.id === cycleSelect.value));
      const labels = node('tr');
      const subject = node('th', '', 'Blocs i sabers');
      subject.scope = 'col';
      labels.append(subject);
      for (const cycle of columns) {
        const heading = node('th', '', cycle.label);
        heading.scope = 'col';
        if (stage === 'p') heading.append(node('small', '', cycle.years));
        labels.append(heading);
      }
      table.tHead.replaceChildren(labels);
      const body = table.tBodies[0];
      body.replaceChildren();
      const options = [];
      for (const group of groups) {
        if (areaSelect.value && areaSelect.value !== group.id) continue;
        const rows = group.rows.filter(row => columns.some(cycle => row[3][cycle.id] &&
          (!form.elements.withMaterials.checked || resources(group, row, cycle).length)));
        if (!rows.length) continue;
        const labelRow = body.insertRow();
        labelRow.className = 'curriculum-group';
        const groupName = node('th', '', group.title);
        groupName.colSpan = columns.length + 1;
        labelRow.append(groupName);

        for (const row of rows) {
          const line = body.insertRow();
          const heading = node('th');
          heading.scope = 'row';
          const rowAction = node('button', 'curriculum-row-action', row[2]);
          rowAction.type = 'button';
          rowAction.dataset.row = rowKey(group, row);
          rowAction.setAttribute('aria-pressed', 'false');
          heading.append(rowAction);
          line.append(heading);
          const available = columns.filter(cycle => row[3][cycle.id]);
          rowAction.addEventListener('click', () => {
            const cycle = available.find(cycle => resources(group, row, cycle).length) ??
              available.find(cycle => filters[stage].selection.endsWith(':' + cycle.id)) ?? available[0];
            showCell(group, row, cycle, true);
          });
          for (const cycle of columns) {
            const cell = line.insertCell();
            if (!row[3][cycle.id]) {
              cell.className = 'curriculum-na';
              cell.append(node('span', 'sr-only', 'Fora d’aquest cicle'));
              continue;
            }
            const linked = resources(group, row, cycle);
            makeCell(cell, group, row, cycle, linked);
            options.push({ group, row, cycle });
          }
        }
      }
      table.hidden = !options.length;
      byId('curriculum-empty').hidden = options.length > 0;
      const chosen = options.find(item => cellKey(item.group, item.row, item.cycle) === filters[stage].selection);
      if (chosen) showCell(chosen.group, chosen.row, chosen.cycle);
      else {
        const title = node('h3', '', 'Sabers i fitxes');
        title.id = 'curriculum-detail-title';
        detail.replaceChildren(title, node('p', 'hint', 'Tria una cel·la per veure què es treballa al bloc i quines fitxes hi ha disponibles.'));
      }
      detail.hidden = !options.length;
      dialog.scrollTop = 0;
    }

    function selectStage(tab) {
      stage = tab.dataset.stage;
      const availableCycles = cycles.filter(cycle => cycle.id.startsWith(stage));
      const areas = groups.filter(group => group.rows.some(row => availableCycles.some(cycle => row[3][cycle.id])));
      const current = filters[stage];
      byId('curriculum-cycle-label').textContent = stage === 'p' ? 'Cicle' : 'Cursos';
      cycleSelect.replaceChildren(new Option(stage === 'p' ? 'Tots els cicles' : 'Tots els cursos', ''),
        ...availableCycles.map(cycle => new Option(cycle.label, cycle.id)));
      areaSelect.replaceChildren(new Option('Totes les àrees', ''), ...areas.map(group => new Option(group.title.replace(/^ESO · /, ''), group.id)));
      areaSelect.closest('label').hidden = areas.length < 2;
      cycleSelect.value = current.cycle;
      areaSelect.value = current.area;
      form.elements.withMaterials.checked = current.withMaterials;
      for (const candidate of tabs) {
        candidate.setAttribute('aria-selected', String(candidate === tab));
        candidate.tabIndex = candidate === tab ? 0 : -1;
        candidate.autofocus = candidate === tab;
      }
      panel.setAttribute('aria-labelledby', tab.id);
      render();
    }

    const tooltipTrigger = element => element?.closest?.('a[data-material]');
    panel.addEventListener('pointerover', event => {
      if (event.pointerType === 'touch') return;
      const target = tooltipTrigger(event.target);
      if (target) showHelp(target);
    });
    panel.addEventListener('pointerout', event => {
      if (event.pointerType === 'touch' || !helpTarget ||
        tooltipTrigger(event.target) !== helpTarget || tooltipTrigger(event.relatedTarget) === helpTarget) return;
      clearTimeout(helpTimer);
      helpTimer = setTimeout(hideHelp, 140);
    });
    panel.addEventListener('focusin', event => {
      const target = tooltipTrigger(event.target);
      if (target) showHelp(target);
    });
    panel.addEventListener('focusout', event => {
      if (tooltipTrigger(event.target) === helpTarget) hideHelp();
    });
    help.addEventListener('pointerenter', () => clearTimeout(helpTimer));
    help.addEventListener('pointerleave', hideHelp);
    dialog.addEventListener('scroll', hideHelp);
    window.addEventListener('resize', hideHelp);
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !help.hidden) {
        event.preventDefault();
        hideHelp();
      }
    });
    dialog.addEventListener('close', () => {
      hideHelp();
      if (location.hash === '#mapa-curricular') history.replaceState(history.state, '', '#');
    });
    dialog.addEventListener('click', event => {
      const link = event.target.closest('a[data-material]');
      if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      hideHelp();
      dialog.close('navigate');
    });
    for (const tab of tabs) {
      tab.addEventListener('click', () => selectStage(tab));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs.find(item => item !== tab);
        selectStage(next);
        next.focus();
      });
    }
    form.addEventListener('change', () => {
      Object.assign(filters[stage], { cycle: cycleSelect.value, area: areaSelect.value, withMaterials: form.elements.withMaterials.checked });
      render();
    });
    selectStage(tabs[0]);
  }

  window.setupCurriculum = setupCurriculum;
})();
