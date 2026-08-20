// Lightbox de la galería: abre la imagen en grande y permite navegar.
import { qs, qsa } from "./utils.js";

export function initGallery() {
  const items = qsa(".gallery__item");
  const lightbox = qs("#lightbox");
  if (!items.length || !lightbox) return;

  const image = qs(".lightbox__image", lightbox);
  const captionText = qs(".lightbox__caption-text", lightbox);
  const captionCount = qs(".lightbox__caption-count", lightbox);
  const closeButtons = qsa("[data-lightbox-close]", lightbox);
  const prevButtons = qsa("[data-lightbox-prev]", lightbox);
  const nextButtons = qsa("[data-lightbox-next]", lightbox);

  const slides = items.map((item) => ({
    full: item.dataset.full,
    caption: item.dataset.caption,
  }));

  let currentIndex = 0;
  let lastFocused = null;

  function render() {
    const slide = slides[currentIndex];
    image.src = slide.full;
    image.alt = slide.caption;
    captionText.textContent = slide.caption;
    captionCount.textContent = `${currentIndex + 1} de ${slides.length}`;
  }

  function open(index) {
    currentIndex = index;
    lastFocused = document.activeElement;
    render();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    closeButtons[0]?.focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + slides.length) % slides.length;
    render();
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => open(index));
  });

  closeButtons.forEach((btn) => btn.addEventListener("click", close));
  prevButtons.forEach((btn) => btn.addEventListener("click", () => step(-1)));
  nextButtons.forEach((btn) => btn.addEventListener("click", () => step(1)));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  });
}
