import { useEffect } from "react";

/**
 * Lightweight, performant parallax. Any element inside `scopeRef` carrying a
 * `data-par` (scroll speed) and/or `data-mouse` (px on mouse move) attribute is
 * translated each frame. Pointer movement is eased for a soft, premium feel.
 *
 * Decorative elements should wrap their (possibly rotated) image in this node so
 * the parallax translate composes cleanly with the inner rotation.
 */
export function useParallax(scopeRef) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(scope.querySelectorAll("[data-par],[data-mouse]"));
    if (!els.length) return;

    let mx = 0, my = 0, tmx = 0, tmy = 0, raf = 0;

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      tmx = (e.clientX - cx) / cx;
      tmy = (e.clientY - cy) / cy;
    };

    const tick = () => {
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      const sy = window.scrollY;
      for (const el of els) {
        const ps = parseFloat(el.dataset.par) || 0;
        const pm = parseFloat(el.dataset.mouse) || 0;
        const x = mx * pm;
        const y = sy * ps + my * pm;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) window.addEventListener("mousemove", onMove, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [scopeRef]);
}
