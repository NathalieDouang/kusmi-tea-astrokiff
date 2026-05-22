import { useMemo, useEffect, useRef } from "react";

/* Ambient tea leaves & petals drifting down the ritual pages.
   A fixed, non-interactive layer; each particle falls + sways on a loop.
   Tinted with the ritual accent (plus soft gold/green) for a "tea" mood.
   `hideOnId`: when that element scrolls into view (e.g. the dark "Continuer"
   section) the whole layer fades out so the petals aren't seen there. */

const LEAF = "M12 1.5C17 6 17.5 15 12 22.5 6.5 15 7 6 12 1.5Z";
const PETAL = "M12 3C15.5 8 15.5 14.5 12 21 8.5 14.5 8.5 8 12 3Z";

export default function FallingPetals({ accent = "#c8a24c", count = 10, hideOnId }) {
  const layerRef = useRef(null);

  useEffect(() => {
    if (!hideOnId) return;
    const layer = layerRef.current;
    const target = document.getElementById(hideOnId);
    if (!layer || !target) return;
    const io = new IntersectionObserver(
      ([entry]) => layer.classList.toggle("is-hidden", entry.isIntersecting),
      { rootMargin: "0px 0px -25% 0px" }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [hideOnId]);

  const items = useMemo(() => {
    const palette = [accent, "#c8a24c", "#8a9a5b", "#a98c4a"];
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 11 + Math.random() * 15,
      fall: 16 + Math.random() * 13,
      sway: 4.5 + Math.random() * 4,
      delay: -Math.random() * 28,
      opacity: 0.22 + Math.random() * 0.33,
      color: palette[(Math.random() * palette.length) | 0],
      leaf: Math.random() > 0.4,
      flip: Math.random() > 0.5 ? -1 : 1,
    }));
  }, [accent, count]);

  return (
    <div className="petals-layer" aria-hidden="true" ref={layerRef}>
      {items.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, animationDuration: `${p.fall}s`, animationDelay: `${p.delay}s` }}
        >
          <span
            className="petal__i"
            style={{
              width: p.size,
              height: p.size,
              color: p.color,
              opacity: p.opacity,
              animationDuration: `${p.sway}s`,
              animationDelay: `${p.delay}s`,
              "--flip": p.flip,
            }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%">
              <path d={p.leaf ? LEAF : PETAL} fill="currentColor" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}
