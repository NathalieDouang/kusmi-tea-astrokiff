/* ============================================================
   Slowly-rotating astrological wheel / astrolabe for the
   background of the ritual "section 2". Thin lines in the
   ritual colour, light but visible, behind the content.
   ============================================================ */

const C = 200;
const ANG = Array.from({ length: 12 }, (_, i) => (i * 30 - 90) * (Math.PI / 180));
const P = (r, a) => [C + r * Math.cos(a), C + r * Math.sin(a)];

// a few "planets" sitting on the rings (rotate with the wheel)
const PLANETS = [
  [150, 40], [110, 205], [176, 290], [88, 130],
];

export default function AstroWheel({ accent, style, className = "" }) {
  return (
    <svg
      className={`astro-wheel ${className}`}
      viewBox="0 0 400 400"
      width="400"
      height="400"
      style={style}
      aria-hidden="true"
    >
      <g stroke={accent} fill="none">
        <circle cx={C} cy={C} r="196" strokeOpacity="0.2" strokeWidth="1" />
        <circle cx={C} cy={C} r="176" strokeOpacity="0.14" strokeWidth="1" />
        <circle cx={C} cy={C} r="150" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx={C} cy={C} r="70" strokeOpacity="0.16" strokeWidth="1" />
        <circle cx={C} cy={C} r="46" strokeOpacity="0.12" strokeWidth="1" />
        {/* 12 ticks + spokes */}
        {ANG.map((a, i) => {
          const [tx1, ty1] = P(176, a);
          const [tx2, ty2] = P(196, a);
          const [sx1, sy1] = P(70, a);
          const [sx2, sy2] = P(150, a);
          return (
            <g key={i}>
              <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} strokeOpacity="0.22" strokeWidth="1" />
              <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} strokeOpacity="0.1" strokeWidth="1" />
            </g>
          );
        })}
      </g>
      {/* dots on the outer division ring */}
      <g fill={accent}>
        {ANG.map((a, i) => {
          const [x, y] = P(186, a);
          return <circle key={i} cx={x} cy={y} r="2" fillOpacity="0.22" />;
        })}
        {PLANETS.map(([r, deg], i) => {
          const [x, y] = P(r, (deg - 90) * (Math.PI / 180));
          return <circle key={`p${i}`} cx={x} cy={y} r={i === 0 ? 4 : 3} fillOpacity="0.3" />;
        })}
        {/* centre */}
        <circle cx={C} cy={C} r="3" fillOpacity="0.3" />
      </g>
    </svg>
  );
}
