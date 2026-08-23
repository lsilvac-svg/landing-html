// Tabs de la malla curricular: 6 módulos con navegación accesible por teclado.
// Depende de qsa definido en utils.js (cargado antes que este archivo).

function initCurriculumTabs() {
  const tabs = qsa('.tab-strip__btn');
  const panels = qsa('.module-panel');

  if (!tabs.length || !panels.length) return;

  const activateTab = (tab, moveFocus = false) => {
    const targetId = tab.getAttribute('aria-controls');

    tabs.forEach((item) => {
      const active = item === tab;

      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== targetId;
    });

    if (moveFocus) {
      tab.focus();
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });

    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;

      if (
        event.key === 'ArrowRight' ||
        event.key === 'ArrowDown'
      ) {
        nextIndex = (index + 1) % tabs.length;
      } else if (
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp'
      ) {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  });
}