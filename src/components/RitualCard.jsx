import { forwardRef } from "react";

/**
 * A tarot-style ritual card: the AI-illustrated face with the title & subtitle
 * vector overlays positioned on top (matching the Figma card components).
 * Used both in the homepage fan and the "Continuer l'experience" related grid.
 */
const RitualCard = forwardRef(function RitualCard(
  { ritual, style, onActivate, reveal = "", ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className="rcard"
      style={style}
      onClick={onActivate}
      role="link"
      tabIndex={0}
      aria-label={ritual.name}
      data-reveal={reveal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate?.(e);
      }}
      {...rest}
    >
      <span className="rcard__glow" />
      <img className="rcard__face" src={ritual.card.face} alt={ritual.name} />
    </div>
  );
});

export default RitualCard;
