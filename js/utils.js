// Pequeños helpers compartidos por los demás módulos.

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

/** Abre WhatsApp con un mensaje pre-armado a partir de los datos del formulario. */
export function openWhatsApp(phoneNumber, message) {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
