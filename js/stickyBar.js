// Barra fija inferior en móvil: aparece luego de bajar el hero.
// Depende de qs definido en utils.js (cargado antes que este archivo).

const STICKY_BAR_SHOW_AFTER_PX = 480;
const STICKY_BAR_MOBILE_QUERY = "(max-width: 639px)";

function initStickyBar() {
  const bar = qs("#sticky-bar");
  if (!bar) return;

  const isMobile = () => window.matchMedia(STICKY_BAR_MOBILE_QUERY).matches;

  const onScroll = () => {
    if (!isMobile()) {
      bar.classList.remove("is-visible");
      return;
    }
    bar.classList.toggle("is-visible", window.scrollY > STICKY_BAR_SHOW_AFTER_PX);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
}
