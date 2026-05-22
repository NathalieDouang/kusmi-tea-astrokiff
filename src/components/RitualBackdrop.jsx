/* ============================================================
   Very subtle astrology backdrop for the ritual pages.
   Faint sparkles, constellations and a dotted orbit in the
   ritual colour, sitting behind the content (low z-index) over
   the light section only. A few elements twinkle gently.
   ============================================================ */

const SPARKLE = "M0,-7 C1,-2 2,-1 7,0 C2,1 1,2 0,7 C-1,2 -2,1 -7,0 C-2,-1 -1,-2 0,-7 Z";

// tiny round stars: [x, y, r, opacity]
const STARS = [
  [140, 250, 1.6, 0.18], [355, 150, 1.2, 0.14], [560, 95, 1.4, 0.16],
  [1185, 95, 2, 0.2], [1080, 470, 1.3, 0.14], [60, 560, 1.6, 0.16],
  [1210, 760, 1.5, 0.16], [40, 1000, 1.4, 0.14], [1175, 1180, 1.7, 0.16],
  [150, 1330, 1.3, 0.14], [1100, 1520, 1.6, 0.16], [70, 1720, 1.4, 0.14],
  [1220, 1880, 1.5, 0.15], [620, 1980, 1.3, 0.13],
];

// sparkles: [x, y, scale, opacity, twinkleDelay (null = static)]
const SPARKLES = [
  [1110, 250, 1.0, 0.22, 0], [80, 470, 0.8, 0.18, 1.6], [1180, 600, 0.9, 0.2, 0.8],
  [220, 880, 0.7, 0.16, 2.3], [1150, 980, 0.85, 0.18, 1.1], [95, 1230, 0.8, 0.16, 0.4],
  [1080, 1700, 1.0, 0.2, 1.9], [180, 1560, 0.75, 0.16, 2.8], [1200, 1340, 0.8, 0.18, 0.6],
];

// constellations: polyline points + dots at vertices
const CONSTELLATIONS = [
  { o: 0.16, pts: [[1010, 150], [1078, 210], [1155, 168], [1205, 258], [1125, 300]] },
  { o: 0.14, pts: [[55, 760], [120, 830], [90, 930], [180, 980], [150, 1080]] },
  { o: 0.14, pts: [[980, 1640], [1060, 1600], [1130, 1690], [1075, 1780]] },
];

export default function RitualBackdrop({ accent, height }) {
  return (
    <svg
      className="ritual-backdrop"
      viewBox={`0 0 1280 ${height}`}
      width={1280}
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {CONSTELLATIONS.map((c, i) => (
        <g key={`c${i}`} stroke={accent} strokeOpacity={c.o} fill={accent} fillOpacity={c.o + 0.06}>
          <polyline points={c.pts.map((p) => p.join(",")).join(" ")} fill="none" strokeWidth="0.75" />
          {c.pts.map((p, j) => (
            <circle key={j} cx={p[0]} cy={p[1]} r="2.2" stroke="none" />
          ))}
        </g>
      ))}

      {/* dotted orbit */}
      <circle cx="1090" cy="980" r="120" fill="none" stroke={accent} strokeOpacity="0.1"
        strokeWidth="1" strokeDasharray="1.5 12" />
      <circle cx="190" cy="1380" r="86" fill="none" stroke={accent} strokeOpacity="0.1"
        strokeWidth="1" strokeDasharray="1.5 11" />

      {STARS.map(([x, y, r, o], i) => (
        <circle key={`s${i}`} cx={x} cy={y} r={r} fill={accent} opacity={o} />
      ))}

      {SPARKLES.map(([x, y, sc, o, delay], i) => (
        <path
          key={`p${i}`}
          d={SPARKLE}
          fill={accent}
          transform={`translate(${x} ${y}) scale(${sc})`}
          className={delay != null ? "rb-tw" : undefined}
          style={delay != null ? { opacity: o, animationDelay: `${delay}s` } : { opacity: o }}
        />
      ))}
    </svg>
  );
}
