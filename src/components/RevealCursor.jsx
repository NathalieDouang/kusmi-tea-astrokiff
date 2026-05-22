import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ============================================================
   Premium circular "reveal" cursor (Awwwards / Active Theory vibe)
   - appears when hovering any [data-reveal] element
   - follows the pointer with eased (lerp) inertia
   - "Révéler" sits static at the centre, a small star orbits the ring
   ------------------------------------------------------------
   TUNABLES
   - LERP            : follow inertia, fraction travelled toward the
                       target each frame (0 = frozen, 1 = rigid/instant).
   - --reveal-spin   : star orbit duration (set in index.css).
   - star orbit radius: `.reveal-cursor__star { top }` in index.css.
   ============================================================ */

const DEFAULT_TEXT = "Révéler";
const LERP = 0.18; // ← inertie du suivi souris

export default function RevealCursor() {
  const outerRef = useRef(null); // niveau 1 — suit la souris (translate x,y)
  const innerRef = useRef(null); // niveau 2 — centrage + scale d'apparition
  const labelRef = useRef(null); // texte central statique
  const { pathname } = useLocation();

  // hide again whenever the route changes (target may unmount)
  useEffect(() => {
    innerRef.current?.classList.remove("is-active");
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    // niveau 1 : suivi souris UNIQUEMENT (jamais de scale ici)
    const tick = () => {
      cx += (mx - cx) * LERP;
      cy += (my - cy) * LERP;
      outer.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target.closest?.("[data-reveal]");
      if (!t) return;
      const custom = t.getAttribute("data-reveal");
      labelRef.current.textContent = custom && custom.trim() ? custom : DEFAULT_TEXT;
      inner.classList.add("is-active");
    };
    const onOut = (e) => {
      const t = e.target.closest?.("[data-reveal]");
      if (!t) return;
      if (e.relatedTarget && t.contains(e.relatedTarget)) return;
      inner.classList.remove("is-active");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <div className="reveal-cursor" ref={outerRef} aria-hidden="true">
      {/* niveau 2 : centrage + apparition (scale/opacity) */}
      <div className="reveal-cursor__inner" ref={innerRef}>
        <span className="reveal-cursor__disc" />
        {/* niveau 3 : seule la petite étoile tourne autour du cercle */}
        <span className="reveal-cursor__orbit">
          <svg className="reveal-cursor__star" viewBox="0 0 24 24" width="13" height="13">
            <path
              d="M12 0c1.1 8 2.9 9.9 12 11-9.1 1.1-10.9 3-12 11-1.1-8-2.9-9.9-12-11 9.1-1.1 10.9-3 12-11Z"
              fill="#fff"
            />
          </svg>
        </span>
        {/* texte central statique (pas de rotation) */}
        <span className="reveal-cursor__label" ref={labelRef}>
          {DEFAULT_TEXT}
        </span>
      </div>
    </div>
  );
}
