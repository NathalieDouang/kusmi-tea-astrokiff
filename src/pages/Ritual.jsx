import { useRef, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import gsap from "gsap";
import Stage from "../lib/Stage.jsx";
import { useParallax } from "../lib/useParallax.js";
import { useScrollReveal } from "../lib/useScrollReveal.js";
import { usePageTransition } from "../components/PageTransition.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import RitualCard from "../components/RitualCard.jsx";
import CropImage from "../components/CropImage.jsx";
import RitualBackdrop from "../components/RitualBackdrop.jsx";
import OrbitSystem from "../components/OrbitSystem.jsx";
import { ritualsBySlug, relatedRituals } from "../data/rituals.js";

// Uniform related-card size across every ritual page (placement kept as-is).
// object-fit: cover absorbs the tiny aspect differences between card arts.
const CARD_W = 232;
const CARD_H = 380;
const CARD_SLOTS = [
  { left: 113, top: 2173 },
  { left: 393.65, top: 2173 },
  { left: 665.91, top: 2173 },
  { left: 939.36, top: 2173 },
];

function rgba79(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},0.79)`;
}

export default function Ritual() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const go = usePageTransition();
  const scopeRef = useRef(null);
  const stepsRef = useRef(null);
  const cardRef = useRef(null);
  useParallax(scopeRef);
  useScrollReveal(scopeRef);

  // 3D tilt + cursor sheen on the ingredients card
  const onCardTilt = (e) => {
    const c = cardRef.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = c.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const max = 5.5;
    c.style.transform = `perspective(1000px) rotateX(${(-(py - 0.5) * 2 * max).toFixed(2)}deg) rotateY(${((px - 0.5) * 2 * max).toFixed(2)}deg)`;
    c.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    c.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const onCardLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  // staggered scroll-in for the ritual steps
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const steps = el.querySelectorAll(".rstep");
    if (!steps.length) return;
    gsap.set(steps, { opacity: 0, y: 26 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(steps, {
              opacity: 1,
              y: 0,
              stagger: 0.09,
              duration: 0.6,
              ease: "power3.out",
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slug]);

  // ingredients card fades in, its rows cascade
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = card.querySelectorAll(".ing-row");
    gsap.set(card, { opacity: 0 });
    gsap.set(rows, { opacity: 0, y: 16 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(card, { opacity: 1, duration: 0.6, ease: "power2.out" });
            gsap.to(rows, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power2.out", delay: 0.15 });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(card);
    return () => io.disconnect();
  }, [slug]);

  const r = ritualsBySlug[slug];
  if (!r) return <Navigate to="/" replace />;

  const { theme, header } = r;
  const cta = rgba79(theme.accent);
  const flowerStyle = (f) => ({
    left: f.cx - f.w / 2,
    top: f.cy - f.h / 2,
    width: f.w,
    height: f.h,
  });

  // ── Extra whitespace per section boundary (turn one knob at a time) ──
  const GAP = {
    headerRitual: 90, // header → section Rituel/Ingredients
    ritualCTA: 70, // Rituel → "Faire entrer le rituel"
    ctaDark: 80, // "Faire entrer" → section sombre "Continuer"
    darkFooter: 0, // section sombre → footer
  };
  // cumulative vertical offsets applied to each section's base Figma Y
  const offR = GAP.headerRitual; // section 2 (Rituel + Ingredients)
  const offC = offR + GAP.ritualCTA; // section 3 (Faire entrer + mid decor)
  const offD = offC + GAP.ctaDark; // section 4 (dark "Continuer")
  const offF = offD + GAP.darkFooter; // footer
  const NIGHT_TOP = 1877 + offD;
  const STAGE_H = 2817 + offF;

  // All tins shown at one uniform size (= Énergie Intérieure's: 303 × 1.12),
  // centred on each page's own header.tin centre.
  const tinSize = 339;

  return (
    <Stage width={1280} height={STAGE_H} background="#f6f1f0" fill>
      <div ref={scopeRef} className="page-enter">
        {/* ── backgrounds ── */}
        <div className="abs" style={{ left: 0, top: 0, width: 1280, height: 693,
          background: `linear-gradient(#ffffff, ${theme.tint})` }} />
        <div className="abs" style={{ left: 0, top: 693, width: 1280, height: NIGHT_TOP - 693, background: theme.tint }} />
        <div className="abs" style={{ left: -26, top: NIGHT_TOP, width: 1331, height: 788, overflow: "hidden", filter: "blur(1.1px)" }}>
          <img src="/assets/decor/night-sky.png" alt="" style={{ width: "100%", height: "112.56%", marginTop: "-5.86%", objectFit: "cover" }} />
        </div>

        {/* very subtle astro backdrop over the light area only (behind content) */}
        <RitualBackdrop accent={theme.accent} height={NIGHT_TOP} />
        {/* orbital system, centred on the Ingredients card, pushed right + overflowing */}
        <OrbitSystem accent={theme.accent} style={{ left: 920, top: 641 + offR, width: 680, height: 680 }} />
        {/* light shooting stars drifting down behind the ritual steps */}
        <span className="shooting-star" style={{ left: 90, top: 870 + offR, "--accent": theme.accent, "--ang": "33deg", animationDelay: "0s" }} />
        <span className="shooting-star" style={{ left: 300, top: 1040 + offR, "--accent": theme.accent, "--ang": "28deg", animationDelay: "3.2s" }} />
        <span className="shooting-star" style={{ left: 60, top: 1190 + offR, "--accent": theme.accent, "--ang": "37deg", animationDelay: "6s" }} />

        {/* ── header decor: flower, illustration, tin ── */}
        <div className="abs" data-mouse="-10" style={flowerStyle(header.flower)}>
          <img src={header.flower.src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", transform: `rotate(${header.flower.rotate}deg)` }} />
        </div>
        {header.illu.crop ? (
          <CropImage src={header.illu.src}
            box={{ left: header.illu.left, top: header.illu.top, w: header.illu.w, h: header.illu.h }}
            crop={header.illu.crop} parallax={{ mouse: 6 }} />
        ) : (
          <img className="abs" src={header.illu.src} alt="" data-mouse="6"
            style={{ left: header.illu.left, top: header.illu.top, width: header.illu.w, height: header.illu.h,
              objectFit: "contain", transform: `rotate(${header.illu.rotate || 0}deg)` }} />
        )}
        <div className="abs" style={{ left: header.tin.cx - tinSize / 2, top: header.tin.cy - tinSize / 2, width: tinSize, height: tinSize }}>
          <img src={r.tin} alt={r.name}
            style={{ width: "100%", height: "100%", objectFit: "contain",
              transform: `rotate(${header.tin.rotate}deg)` }} />
        </div>

        {/* ── mid-section decor ── */}
        {/* hand rendered first → sits BEHIND the clouds in z-order; its lower
            edge dips behind the bottom cloud (cloud top ≈ NIGHT_TOP - 250) */}
        <img className="abs" data-mouse="-8" src="/assets/decor/hand-only.png" alt=""
          style={{ left: 64, top: 1530 + offC, width: 270, height: 344 }} />
        <img className="abs" data-par="-0.02" data-mouse="12" src="/assets/decor/cloud-3.png" alt=""
          style={{ left: 883, top: 1230 + offC, width: 540, height: 450, opacity: 0.8 }} />
        {/* bottom cloud straddles the seam between the peach section and the dark one */}
        <img className="abs" data-par="-0.03" data-mouse="8" src="/assets/decor/cloud-1.png" alt=""
          style={{ left: -104, top: NIGHT_TOP - 250, width: 603, height: 503 }} />
        <CropImage src="/assets/decor/star-deco.png"
          box={{ left: 878, top: 1544 + offC, w: 192, h: 144 }}
          crop={{ w: "512%", h: "455.11%", left: "-73%", top: "-151.11%" }} parallax={{ mouse: 14 }}
          className="twinkle twinkle--slow" />

        {/* ── header text ── */}
        <h1 className="abs display" style={{ left: 640, top: 198, width: 320, fontSize: 96, lineHeight: 0.8 }}>{r.name}</h1>
        <p className="abs body" style={{ left: 640, top: 379, width: 410, fontSize: 16, lineHeight: 1.35 }}>{r.description}</p>

        <p className="abs label-serif" style={{ left: 640, top: 465, fontSize: 24 }}>Notes Astrales</p>
        <div className="abs" style={{ left: 640, top: 496, width: 470, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {r.notes.map((t) => (<span key={t} className="tag" style={{ color: theme.tagBg }}>{t}</span>))}
        </div>

        <p className="abs label-serif" style={{ left: 640, top: 553, fontSize: 24 }}>Energie</p>
        <div className="abs" style={{ left: 640, top: 584, width: 470, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {r.energie.map((t) => (<span key={t} className="tag" style={{ color: theme.tagBg }}>{t}</span>))}
        </div>

        {/* ── ritual steps ── */}
        <p className="abs body reveal" style={{ left: 118, top: 775 + offR, fontSize: 14, letterSpacing: "0.02em" }}>
          COMMENT PRÉPARER SON RITUEL AVEC SON THÉ
        </p>
        <h2 className="abs display reveal" style={{ left: 118, top: 800 + offR, fontSize: 48 }}>Rituel</h2>
        <div
          className="abs ritual-steps"
          ref={stepsRef}
          style={{ left: 113, top: 868 + offR, width: 509, "--accent": theme.accent, "--step-bg": theme.tint }}
        >
          {r.steps.map((s) => (
            <div className="rstep" key={s.n}>
              <span className="rstep__num">{s.n}</span>
              <span className="rstep__title">{s.title}</span>
              <span className="rstep__tag">{s.tag}</span>
            </div>
          ))}
        </div>

        {/* ── ingredients card ── */}
        <div
          className="abs ing-card"
          ref={cardRef}
          onMouseMove={onCardTilt}
          onMouseLeave={onCardLeave}
          style={{ left: 726, top: 742 + offR, width: 465, height: 478, "--accent": theme.accent }}
        >
          <h2 className="display" style={{ position: "absolute", left: 39, top: 60, fontSize: 48 }}>Ingredients</h2>
          <span className="ing-card__rule" />
          <div style={{ position: "absolute", left: 39, top: 148, width: 387 }}>
            {r.ingredients.map((ing) => (
              <div className="ing-row" key={ing.name}>
                <span className="ing-pct" style={{ color: theme.accent }}>{ing.pct}</span>
                <span className="ing-name">{ing.name}</span>
                <span className="ing-origin">{ing.origin}</span>
              </div>
            ))}
          </div>
          <p className="body" style={{ position: "absolute", left: 39, top: 348, fontSize: 14, fontWeight: 500 }}>
            <span className="ing-marker" />LE MEILLEUR MOMENT
          </p>
          <p className="body" style={{ position: "absolute", left: 39, top: 382, width: 388, fontSize: 16, lineHeight: 1.35 }}>{r.moment}</p>
        </div>

        {/* ── mid CTA ── */}
        <h2 className="abs display reveal" style={{ left: "50%", transform: "translateX(-50%)", top: 1446 + offC, width: 437, fontSize: 64, textAlign: "center", lineHeight: 1.05 }}>
          Faire entrer le rituel dans votre quotidien
        </h2>
        <div className="abs" style={{ left: 0, top: 1632 + offC, width: 1280, display: "flex", justifyContent: "center" }}>
          <button className="cta cta--lg" style={{ background: cta }} onClick={(e) => e.preventDefault()}>
            COMMANDER
          </button>
        </div>

        {/* ── dark "continuer" section ── */}
        <h2 className="abs display reveal" style={{ left: 118, top: 2013 + offD, width: 369, fontSize: 48, color: "#fff" }}>Continuer l’experience...</h2>
        <p className="abs body reveal" style={{ left: 120, top: 2073 + offD, width: 447, fontSize: 16, color: "#fff", lineHeight: 1.4 }}>
          Chaque rituel explore une énergie différente, pensée pour accompagner vos états intérieurs et vos moments du quotidien.
        </p>

        <div className="related">
          {relatedRituals(slug).map((rr, i) => {
            const s = CARD_SLOTS[i];
            return (
              <RitualCard key={rr.slug} ritual={rr}
                onActivate={() => go(`/rituel/${rr.slug}`)}
                style={{ position: "absolute", left: s.left, top: s.top + offD, width: CARD_W, height: CARD_H }} />
            );
          })}
        </div>

        <div className="abs" style={{ left: "50%", transform: "translateX(-50%)", top: 2574 + offD, zIndex: 1 }}>
          <svg className="scroll-cue" width="24" height="14" viewBox="0 0 26 15" fill="none" aria-hidden="true">
            <path d="M2 13 L13 3 L24 13" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="abs body" style={{ left: "50%", transform: "translateX(-50%)", top: 2600 + offD, width: 324, textAlign: "center", fontSize: 13, letterSpacing: "0.9px", textTransform: "uppercase", color: "#efefef" }}>
          Choisissez une carte
        </p>

        <SiteFooter top={2665 + offF} lineSrc="/assets/decor/line-footer.svg" ink="#000" />

        <SiteHeader ctaBg={cta} />
      </div>
    </Stage>
  );
}
