// Shared handle to the Lenis instance so any component can request a smooth
// scroll without prop-drilling. Set by App's useLenisScroll.

let _lenis = null;

export function setLenis(l) {
  _lenis = l;
}

/** Smoothly scroll to a target (number = px, or an element/selector). */
export function smoothScrollTo(target, opts = {}) {
  if (_lenis) {
    _lenis.scrollTo(target, { duration: 1.2, ...opts });
    return;
  }
  const top = typeof target === "number" ? target : 0;
  window.scrollTo({ top, behavior: "smooth" });
}
