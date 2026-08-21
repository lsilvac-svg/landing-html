// Acordeón de preguntas frecuentes: una pregunta abierta a la vez.
// Depende de qsa definido en utils.js (cargado antes que este archivo).

function initFaqAccordion() {
  const items = qsa(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-item__question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-item__question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
}
