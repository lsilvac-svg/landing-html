// Pequeños helpers compartidos por los demás scripts.
// Script clásico (sin import/export) para que el sitio funcione también
// abriendo index.html directamente con doble clic (protocolo file://).

function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
  return Array.from((scope || document).querySelectorAll(selector));
}

/** Abre WhatsApp con un mensaje pre-armado a partir de los datos del formulario. */
function openWhatsApp(phoneNumber, message) {
  const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}
