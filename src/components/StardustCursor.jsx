import { useEffect, useRef } from "react";

/* ============================================================
   Stardust cursor — a glowing gold star follows the pointer and
   leaves a trail of falling sparkles (comet of stardust).
   Fits the celestial / astro universe of the site.
   ------------------------------------------------------------
   TUNABLES
   - FOLLOW   : star inertia (0 = frozen, 1 = instant).
   - STEP     : px of movement between two spawned sparkles
                (smaller = denser trail).
   - LIFE / drift / colours handled in index.css (.stardust).
   ============================================================ */

const FOLLOW = 0.22;
const STEP = 13;
const COLORS = ["#c8a24c", "#d8c79a", "#e8d8a8", "#b9974c", "#f0e6c6"];

export default function StardustCursor() {
  const starRef = useRef(null); // niveau 1 — suit la souris
  const iconRef = useRef(null); // niveau 2 — centrage + masquage sur les cartes
  const layerRef = useRef(null); // conteneur des particules

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return; // pas de souris
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("has-custom-cursor");
    const star = starRef.current;
    const icon = iconRef.current;
    const layer = layerRef.current;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let sx = mx;
    let sy = my;
    let lastX = mx;
    let lastY = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const spawn = (x, y) => {
      const s = document.createElement("span");
      s.className = "stardust";
      const size = 4 + Math.random() * 7;
      s.style.left = `${x + (Math.random() * 8 - 4)}px`;
      s.style.top = `${y + (Math.random() * 8 - 4)}px`;
      s.style.setProperty("--sz", `${size}px`);
      s.style.setProperty("--col", COLORS[(Math.random() * COLORS.length) | 0]);
      s.style.setProperty("--dx", `${Math.random() * 18 - 9}px`);
      s.style.setProperty("--dy", `${10 + Math.random() * 18}px`); // retombe (gravité)
      s.style.setProperty("--rot", `${Math.random() * 220 - 110}deg`);
      layer.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    };

    const tick = () => {
      sx += (mx - sx) * FOLLOW;
      sy += (my - sy) * FOLLOW;
      star.style.transform = `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px)`;
      if (!reduce) {
        const dist = Math.hypot(mx - lastX, my - lastY);
        if (dist > STEP) {
          spawn(mx, my);
          lastX = mx;
          lastY = my;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    // efface l'étoile au survol des cibles "Révéler" (le cercle prend le relais)
    const onOver = (e) => {
      if (e.target.closest?.("[data-reveal]")) icon.classList.add("is-hidden");
    };
    const onOut = (e) => {
      const t = e.target.closest?.("[data-reveal]");
      if (!t) return;
      if (e.relatedTarget && t.contains(e.relatedTarget)) return;
      icon.classList.remove("is-hidden");
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
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div className="stardust-layer" ref={layerRef} aria-hidden="true" />
      <div className="cursor-star" ref={starRef} aria-hidden="true">
        <div className="cursor-star__icon" ref={iconRef}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M12 0c1 8 3 10 12 12-9 2-11 4-12 12-1-8-3-10-12-12 9-2 11-4 12-12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
