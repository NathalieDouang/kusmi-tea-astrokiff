import { useMemo } from "react";

/* Ambient tea leaves & petals drifting down the ritual pages.
   A fixed, non-interactive layer; each particle falls + sways on a loop.
   Tinted with the ritual accent (plus soft gold/green) for a "tea" mood. */

const LEAF = "M12 1.5C17 6 17.5 15 12 22.5 6.5 15 7 6 12 1.5Z";
const PETAL = "M12 3C15.5 8 15.5 14.5 12 21 8.5 14.5 8.5 8 12 3Z";

export default function FallingPetals({ accent = "#c8a24c", count = 16 }) {
  const items = useMemo(() => {
    const palette = [accent, "#c8a24c", "#8a9a5b", "#a98c4a"];
    return Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 11 + Math.random() * 15,
      fall: 9 + Math.random() * 9,
      sway: 3 + Math.random() * 3,
      delay: -Math.random() * 18,
      opacity: 0.22 + Math.random() * 0.33,
      color: palette[(Math.random() * palette.length) | 0],
      leaf: Math.random() > 0.4,
      flip: Math.random() > 0.5 ? -1 : 1,
    }));
  }, [accent, count]);

  return (
    <div className="petals-layer" aria-hidden="true">
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
