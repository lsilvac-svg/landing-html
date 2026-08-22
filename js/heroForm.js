// Formulario del hero: selector de sede + envío por WhatsApp.
// Depende de qs/qsa/openWhatsApp definidos en utils.js (cargado antes que este archivo).

const HERO_WHATSAPP_NUMBER = "51944123456";

function initHeroForm() {
  const form = qs("#hero-form");
  if (!form) return;

  const sedeButtons = qsa(".sede-toggle__btn", form);

  let selectedSede =
    sedeButtons.find(
      (button) => button.getAttribute("aria-pressed") === "true"
    )?.dataset.sede ?? "";

  // Selector de sede
  sedeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sedeButtons.forEach((item) => {
        item.setAttribute("aria-pressed", "false");
      });

      button.setAttribute("aria-pressed", "true");
      selectedSede = button.dataset.sede;
    });
  });

  // Selector de turno
  const select = qs("#hero-turno", form);

  select?.addEventListener("change", () => {
    select.classList.toggle("has-value", Boolean(select.value));
  });

  // Envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = qs("#hero-name", form).value.trim();
    const phone = qs("#hero-phone", form).value.trim();
    const email = qs("#hero-email", form).value.trim();

    const turnoLabel = select?.value
      ? select.selectedOptions[0].text
      : "";

    const sedeLabel =
      selectedSede === "sanisidro"
        ? "San Isidro"
        : "Ate";

    // Validación
    if (!name || !phone || !email || !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Mensaje que se enviará por WhatsApp
    const message =
      `Hola, quiero información sobre Enfermería Técnica en el IESRP.\n` +
      `Nombre: ${name}\n` +
      `Celular: ${phone}\n` +
      `Correo: ${email}\n` +
      `Sede de interés: ${sedeLabel}\n` +
      `Turno de preferencia: ${turnoLabel || "No especificado"}`;

    openWhatsApp(HERO_WHATSAPP_NUMBER, message);
  });
}