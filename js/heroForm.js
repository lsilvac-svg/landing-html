// Formulario del hero: envío por WhatsApp.
// Depende de qs/qsa/openWhatsApp definidos en utils.js (cargado antes que este archivo).

const HERO_WHATSAPP_NUMBER = "51944123456";

function initHeroForm() {
  const form = qs("#hero-form");
  if (!form) return;

  // Selector de turno
  const select = qs("#hero-turno", form);

  select?.addEventListener("change", () => {
    select.classList.toggle("has-value", Boolean(select.value));
  });

  // Selector de "¿Cómo te enteraste?"
  const enteraste = qs("#hero-enteraste", form);

  enteraste?.addEventListener("change", () => {
    enteraste.classList.toggle("has-value", Boolean(enteraste.value));
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

    const enterasteLabel = enteraste?.value
      ? enteraste.selectedOptions[0].text
      : "";

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
      `Turno de preferencia: ${turnoLabel || "No especificado"}\n` +
      `¿Cómo te enteraste?: ${enterasteLabel || "No especificado"}`;

    openWhatsApp(HERO_WHATSAPP_NUMBER, message);
  });
}