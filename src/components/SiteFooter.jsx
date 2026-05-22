/**
 * Page footer. Positioned absolutely inside the ritual/home stages, so it takes
 * a `top` (design-space y) plus a divider line image and ink color.
 */
export default function SiteFooter({ top, lineSrc, ink = "#000", bg = "#F6F1F0" }) {
  return (
    <>
      {/* footer background band (full-width) */}
      <div
        className="abs"
        style={{ left: 0, top, width: 1280, height: 260, background: bg }}
      />
      <img
        className="abs"
        src={lineSrc}
        alt=""
        style={{ left: 0, top, width: 1280 }}
      />
      <img
        className="abs"
        src="/assets/logo.png"
        alt="Kusmi Tea × Astrokiff"
        style={{ left: 124, top: top + 26, height: 52 }}
      />
      <div
        className="abs body"
        style={{
          left: 474,
          top: top + 15,
          width: 177,
          fontSize: 16,
          lineHeight: 1.6,
          color: ink,
        }}
      >
        <p>Les rituels</p>
        <p>La collaboration</p>
        <p>Mentions légales</p>
      </div>
      <p
        className="abs body"
        style={{ left: 980, top: top + 36, width: 207, fontSize: 16, color: ink }}
      >
        Kusmi Tea × Astrokiff — 2026
      </p>
    </>
  );
}
