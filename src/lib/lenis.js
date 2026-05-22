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
  // Fallback (no Lenis, e.g. reduced motion): resolve elements & selectors too.
  let el = null;
  if (typeof target === "string") el = document.querySelector(target);
  else if (target && target.nodeType === 1) el = target;
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  const top = typeof target === "number" ? target : 0;
  window.scrollTo({ top, behavior: "smooth" });
}
