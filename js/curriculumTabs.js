// Tabs de la malla curricular: muestra un único panel de módulo a la vez.
import { qs, qsa } from "./utils.js";

export function initCurriculumTabs() {
  const tabs = qsa(".tab-strip__btn");
  const panels = qsa(".module-panel");
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");

      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });
}
