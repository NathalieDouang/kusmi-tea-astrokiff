import { useEffect } from "react";

/**
 * Fade-up reveal on scroll. Any element with the `reveal` class inside
 * `scopeRef` starts hidden and animates in once it enters the viewport.
 *
 * - Elements WITHOUT an inline transform get fade + translateY.
 * - Elements WITH an inline transform (e.g. centred translateX(-50%)) keep
 *   their transform and simply fade in (inline transform wins over the class).
 * - No-JS / reduced-motion fallback: the `has-reveal` guard class is only
 *   added by this hook, so without it nothing is ever hidden.
 */
export function useScrollReveal(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const els = Array.from(scope.querySelectorAll(".reveal"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // leave everything visible

    document.documentElement.classList.add("has-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target); // one-shot
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scopeRef]);
}
