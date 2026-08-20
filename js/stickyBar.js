// Barra fija inferior en móvil: aparece luego de bajar el hero.
import { qs } from "./utils.js";

const SHOW_AFTER_PX = 480;
const MOBILE_QUERY = "(max-width: 639px)";

export function initStickyBar() {
  const bar = qs("#sticky-bar");
  if (!bar) return;

  const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

  const onScroll = () => {
    if (!isMobile()) {
      bar.classList.remove("is-visible");
      return;
    }
    bar.classList.toggle("is-visible", window.scrollY > SHOW_AFTER_PX);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  onScroll();
}
