(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-button');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const themeKey = 'mon-a-ma:theme';
  let chosen;
  try { chosen = localStorage.getItem(themeKey); }
  catch { chosen = null; }

  function applyTheme() {
    const dark = chosen ? chosen === 'dark' : systemTheme.matches;
    root.dataset.theme = dark ? 'dark' : 'light';
    const label = dark ? 'Activa el tema clar' : 'Activa el tema fosc';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(dark));
  }

  button.addEventListener('click', () => {
    chosen = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    try { localStorage.setItem(themeKey, chosen); }
    catch { /* The choice is still active in this tab. */ }
  });
  systemTheme.addEventListener('change', applyTheme);
  applyTheme();

  const language = document.getElementById('language-button');
  const menu = document.getElementById('language-menu');
  menu.addEventListener('toggle', event => {
    language.setAttribute('aria-expanded', String(event.newState === 'open'));
  });
  menu.addEventListener('click', () => {
    menu.hidePopover();
    language.focus();
  });

  for (const open of document.querySelectorAll('[data-dialog]')) {
    const dialog = document.getElementById(open.dataset.dialog);
    open.addEventListener('click', () => {
      dialog.returnValue = '';
      dialog.showModal();
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      if (dialog.returnValue !== 'navigate') open.focus();
    });
  }

  document.getElementById('copy-lightning').addEventListener('click', async () => {
    const address = document.getElementById('lightning-address');
    const result = document.getElementById('lightning-status');
    try {
      await navigator.clipboard.writeText(address.textContent);
      result.textContent = 'Adreça copiada.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(address);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      result.textContent = 'Adreça seleccionada. Copia-la amb Ctrl+C o ⌘C.';
    }
    result.hidden = false;
  });

  const compact = matchMedia('(max-width: 800px)');
  const panels = document.querySelectorAll('.catalog-filters, #topic-outline, #settings');
  function fitPanels() {
    for (const panel of panels) panel.open = !compact.matches;
  }
  compact.addEventListener('change', fitPanels);
  fitPanels();
})();
