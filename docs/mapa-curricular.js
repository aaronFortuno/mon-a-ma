(() => {
  const { node } = window.imprimible;
  const { cycles, groups } = window.curriculum;
  const byId = id => document.getElementById(id);
  const countLabel = count => count === 1 ? '1 material' : count + ' materials';

  function setupCurriculum(topics, materialAddress) {
    const form = byId('curriculum-filters');
    const table = byId('curriculum-table');
    const detail = byId('curriculum-detail');
    const cycleSelect = form.elements.cycle;
    const areaSelect = form.elements.area;
    const matches = new Map();
    for (const topic of topics) {
      for (const entry of topic.curriculum ?? []) {
        const key = entry.row + ':' + topic.cycle;
        if (!matches.has(key)) matches.set(key, []);
        matches.get(key).push({ ...entry, topic });
      }
    }
    const rowKey = (group, row) => group.id + ':' + row[0];
    const cellKey = (group, row, cycle) => rowKey(group, row) + ':' + cycle.id;
    const resources = (group, row, cycle) => matches.get(cellKey(group, row, cycle)) ?? [];
    let selection = 'medi:terra:p3';

    cycleSelect.append(...cycles.map(cycle => new Option(cycle.label + ' · ' + cycle.stage, cycle.id)));
    areaSelect.append(...groups.map(group => new Option(group.title, group.id)));
    if (matchMedia('(max-width: 660px)').matches) cycleSelect.value = 'p3';

    function showCell(group, row, cycle) {
      selection = cellKey(group, row, cycle);
      for (const control of table.querySelectorAll('button[data-cell]')) {
        control.setAttribute('aria-pressed', String(control.dataset.cell === selection));
      }
      const title = node('h2', '', row[2]);
      title.id = 'curriculum-detail-title';
      const meta = node('p', 'curriculum-context', [group.title, row[1], cycle.label + ' · ' + cycle.stage].filter(Boolean).join(' / '));
      const description = node('p', '', row[3][cycle.id]);
      const linked = resources(group, row, cycle);
      detail.replaceChildren(meta, title, description, node('h3', '', linked.length ? countLabel(linked.length) : 'Encara sense materials'));
      if (linked.length) {
        const list = node('ul', 'curriculum-materials');
        for (const entry of linked) {
          const item = node('li');
          const anchor = node('a', '', entry.topic.code + ' · ' + entry.topic.title);
          anchor.href = materialAddress(entry.topic, entry.section);
          item.append(anchor, node('p', '', entry.note));
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
      detail.scrollTop = 0;
    }

    function render() {
      const columns = cycles.filter(cycle => !cycleSelect.value || cycle.id === cycleSelect.value);
      const labels = node('tr');
      const subject = node('th', '', 'Blocs i sabers');
      subject.scope = 'col';
      labels.append(subject);
      for (const cycle of columns) {
        const heading = node('th', '', cycle.label);
        heading.scope = 'col';
        heading.append(node('small', '', cycle.stage + (cycle.stage === 'Primària' ? ' · ' + cycle.years : '')));
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
          const heading = node('th', '', row[2]);
          heading.scope = 'row';
          line.append(heading);
          for (const cycle of columns) {
            const cell = line.insertCell();
            if (!row[3][cycle.id]) {
              cell.className = 'curriculum-na';
              cell.append(node('span', 'sr-only', 'Fora d’aquest cicle'));
              continue;
            }
            const count = resources(group, row, cycle).length;
            const button = node('button', count ? 'has-materials' : '', count ? countLabel(count) : 'Sense material');
            button.type = 'button';
            button.dataset.cell = cellKey(group, row, cycle);
            button.setAttribute('aria-label', row[2] + ', ' + cycle.label + ' ' + cycle.stage + ': ' + button.textContent);
            button.addEventListener('click', () => showCell(group, row, cycle));
            cell.append(button);
            options.push({ group, row, cycle, count });
          }
        }
      }
      table.hidden = !options.length;
      byId('curriculum-empty').hidden = options.length > 0;
      const chosen = options.find(item => cellKey(item.group, item.row, item.cycle) === selection) ??
        options.find(item => item.count) ?? options[0];
      if (chosen) showCell(chosen.group, chosen.row, chosen.cycle);
      detail.hidden = !chosen;
    }

    form.addEventListener('change', render);
    render();
  }

  window.setupCurriculum = setupCurriculum;
})();
