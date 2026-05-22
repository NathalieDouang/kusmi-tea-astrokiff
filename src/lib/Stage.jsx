import { useEffect, useRef } from "react";

/**
 * Renders a fixed 1280px-wide design space and scales it to fit the viewport,
 * preserving the exact Figma layout. The outer wrapper height is kept in sync
 * so the document scrolls naturally.
 *
 * - default            : scale capped at 1, canvas centred (cream side margins
 *                        possible on screens wider than `width`).
 * - fill               : scale = viewport / width with NO cap, so the canvas
 *                        always fills the full viewport width — section
 *                        backgrounds bleed edge-to-edge (no side margins).
 */
export default function Stage({ width = 1280, height, background, fill = false, fitDesignHeight = 0, children }) {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const apply = () => {
      const avail = wrap.clientWidth;
      let scale = fill ? avail / width : Math.min(1, avail / width);
      // Also fit a key region (e.g. the hero) into the viewport HEIGHT, so on
      // short screens (13" laptops) the bottom of the hero isn't cut off.
      if (fitDesignHeight) {
        scale = Math.min(scale, window.innerHeight / fitDesignHeight);
      }
      stage.style.setProperty("--stage-scale", scale);
      wrap.style.height = `${height * scale}px`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(document.documentElement);
    window.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [width, height, fill, fitDesignHeight]);

  return (
    <div className="stage-wrap" ref={wrapRef} style={{ background }}>
      <div
        className="stage"
        ref={stageRef}
        style={{ width, height, ...(fill ? { margin: 0 } : null) }}
      >
        {children}
      </div>
    </div>
  );
}
