// Formulario del hero: selector de sede + envío por WhatsApp.
import { qs, qsa, openWhatsApp } from "./utils.js";

const WHATSAPP_NUMBER = "51944123456";

export function initHeroForm() {
  const form = qs("#hero-form");
  if (!form) return;

  const sedeButtons = qsa(".sede-toggle__btn", form);
  let selectedSede = sedeButtons.find((b) => b.getAttribute("aria-pressed") === "true")?.dataset.sede ?? "";

  sedeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      sedeButtons.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      selectedSede = btn.dataset.sede;
    });
  });

  const select = qs("#hero-turno", form);
  select?.addEventListener("change", () => {
    select.classList.toggle("has-value", Boolean(select.value));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = qs("#hero-name", form).value.trim();
    const phone = qs("#hero-phone", form).value.trim();
    const turnoLabel = select?.value ? select.selectedOptions[0].text : "";
    const sedeLabel = selectedSede === "sanisidro" ? "San Isidro" : "Ate";

    if (!name || !phone) {
      form.reportValidity();
      return;
    }

    const message =
      `Hola, quiero información sobre Enfermería Técnica en el IESRP.\n` +
      `Nombre: ${name}\n` +
      `Celular: ${phone}\n` +
      `Sede de interés: ${sedeLabel}\n` +
      `Turno de preferencia: ${turnoLabel || "No especificado"}`;

    openWhatsApp(WHATSAPP_NUMBER, message);
  });
}
