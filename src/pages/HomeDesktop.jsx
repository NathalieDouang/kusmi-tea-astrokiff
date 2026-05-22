import { useRef } from "react";
import gsap from "gsap";
import Stage from "../lib/Stage.jsx";
import { useParallax } from "../lib/useParallax.js";
import { useScrollReveal } from "../lib/useScrollReveal.js";
import { usePageTransition } from "../components/PageTransition.jsx";
import { smoothScrollTo } from "../lib/lenis.js";
import SiteHeader from "../components/SiteHeader.jsx";
import FaqSection from "../components/FaqSection.jsx";
import ReviewsSection from "../components/ReviewsSection.jsx";
import RitualCard from "../components/RitualCard.jsx";
import CropImage from "../components/CropImage.jsx";
import { rituals, fanLayout } from "../data/rituals.js";

const HOME_CTA = "rgba(74,122,200,0.79)";

export default function HomeDesktop() {
  const scopeRef = useRef(null);
  const cardRefs = useRef({});
  const go = usePageTransition();
  useParallax(scopeRef);
  useScrollReveal(scopeRef);

  const activate = (slug) => {
    const el = cardRefs.current[slug];
    if (!el) return go(`/rituel/${slug}`);
    // quick lift of the chosen card, then the celestial portal takes over
    gsap
      .timeline({ onComplete: () => go(`/rituel/${slug}`) })
      .to(el, { y: -34, scale: 1.16, rotate: 0, duration: 0.32, ease: "power2.out" });
  };

  return (
    <>
      {/* full-bleed header section background (outside the scaled stage).
          Height tracks the header band (scales with the 1280 design) so it
          fills the viewport on desktop yet never bleeds over the section below. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "min(1180px, 92vw)",
          opacity: 0.85,
          backgroundImage: "url(/assets/decor/wallpaper-header.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        }}
      />
      <Stage width={1280} height={2020} background="transparent" fitDesignHeight={900}>
        <div ref={scopeRef} className="page-enter">
        <SiteHeader ctaBg={HOME_CTA} />

        {/* celestial decor */}
        <CropImage
          src="/assets/decor/sun-deco.png"
          box={{ left: 147, top: 182, w: 178, h: 166 }}
          crop={{ w: "464.05%", h: "331.39%", left: "-189.12%", top: "-5.5%" }}
          parallax={{ mouse: 16 }}
          className="twinkle twinkle--slow"
        />
        <div className="abs twinkle twinkle--delay" data-mouse="22" style={{ left: 975, top: 185, width: 155, height: 169 }}>
          <img
            src="/assets/decor/moon-deco.png"
            alt=""
            style={{ width: 117, height: 139, margin: "15px auto", transform: "rotate(18.34deg)" }}
          />
        </div>

        {/* H1 */}
        <h1
          className="abs display"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 148,
            width: 537,
            fontSize: 54.857,
            lineHeight: 0.95,
            textAlign: "center",
          }}
        >
          Trouvez le rituel qui correspond à votre énergie
        </h1>
        <p
          className="abs body"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 252,
            width: 410,
            fontSize: 16,
            textAlign: "center",
            fontWeight: 300,
          }}
        >
          Une collection <b style={{ fontWeight: 500 }}>de cinq rituels de thé</b> inspirés des
          astres et des énergies célestes.
        </p>

        {/* clouds + cherubs — straddle the seam (header bg ends ~y1000, next
            section starts ~y1154) so the two backgrounds blend invisibly */}
        <img className="abs" data-par="0.13" data-mouse="10" src="/assets/decor/cloud-2.png" alt=""
          style={{ left: 190, top: 870, width: 880, height: 330 }} />
        <img className="abs" data-par="0.11" data-mouse="14" src="/assets/decor/cloud-3.png" alt=""
          style={{ left: 900, top: 760, width: 660, height: 550, opacity: 0.8 }} />
        <img className="abs" data-par="0.16" data-mouse="8" src="/assets/decor/cloud-1.png" alt=""
          style={{ left: -320, top: 740, width: 740, height: 617, opacity: 0.7 }} />

        {/* cherubs — nearer layer, lag less than the clouds */}
        <img className="abs" data-par="0.06" data-mouse="-12" src="/assets/decor/cherub-1.png" alt=""
          style={{ left: 175, top: 1000, width: 218, height: 138 }} />
        <img className="abs" data-par="0.04" data-mouse="-16" src="/assets/decor/cherub-2.png" alt=""
          style={{ left: 666, top: 962, width: 394, height: 220 }} />

        {/* card fan */}
        <div className="fan">
          {rituals.map((r, i) => {
            const f = fanLayout[r.slug];
            const depth = Math.abs(i - 2);
            // front/centre card clearly dominant, cards behind it progressively smaller
            const scale = depth === 0 ? 1.1 : depth === 1 ? 0.88 : 0.78;
            return (
              <RitualCard
                key={r.slug}
                ritual={r}
                ref={(n) => (cardRefs.current[r.slug] = n)}
                onActivate={() => activate(r.slug)}
                style={{
                  position: "absolute",
                  left: f.left,
                  top: f.top,
                  width: f.w,
                  height: f.w / r.card.aspect,
                  transform: `rotate(${f.rotate}deg) scale(${scale})`,
                  transformOrigin: "center bottom",
                  zIndex: 10 - depth,
                }}
              />
            );
          })}
        </div>

        {/* "look up at the cards" cue: a small chevron bobbing toward the fan */}
        <div className="abs" style={{ left: "50%", transform: "translateX(-50%)", top: 806, zIndex: 55 }}>
          <svg className="scroll-cue" width="26" height="15" viewBox="0 0 26 15" fill="none" aria-hidden="true">
            <path d="M2 13 L13 3 L24 13" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p
          className="abs body"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 838,
            width: 324,
            textAlign: "center",
            fontSize: 16,
            letterSpacing: "0.96px",
            textTransform: "uppercase",
            color: "#575757",
            zIndex: 55,
          }}
        >
          Choisissez une carte
        </p>

        {/* ── Collaboration section ── */}
        <h2 className="abs display reveal" style={{ left: 114, top: 1514, width: 530, fontSize: 48 }}>
          Traduire les énergies en infusion
        </h2>
        <div
          className="abs body reveal"
          style={{ left: 118, top: 1591, width: 460, fontSize: 16, lineHeight: 1.45 }}
        >
          <p style={{ marginBottom: 16 }}>
            Kusmi Tea et Astrokiff s’unissent autour d’une vision commune : transformer les
            instants du quotidien en expériences sensibles et symboliques.
          </p>
          <p>
            D’un côté, le savoir-faire de Kusmi Tea, maison historique de l’infusion et des
            assemblages créatifs.
            <br />
            De l’autre, Astrokiff, une lecture contemporaine de l’astrologie comme langage
            émotionnel et intuitif.
          </p>
        </div>
        <div className="abs" style={{ left: 114, top: 1828, display: "flex", alignItems: "center", gap: 26 }}>
          <a
            href="#"
            className="cta cta--home"
            style={{ background: HOME_CTA }}
            onClick={(e) => e.preventDefault()}
          >
            COMMANDER
          </a>
          <button
            type="button"
            className="cta-ghost"
            onClick={() => smoothScrollTo(0)}
          >
            <span className="cta-ghost__text">Découvrir les 5 rituels</span>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
              <path d="M2 9 L8 3 L14 9" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* collab imagery */}
        <div className="abs" data-mouse="10" style={{ left: 955, top: 1524, width: 333, height: 431 }}>
          <img src="/assets/decor/flower-header-orange.png" alt=""
            style={{ width: 284, height: 397, margin: "0 auto", transform: "rotate(7.58deg)" }} />
        </div>
        <img className="abs reveal" src="/assets/decor/photo-1.png" alt="Astrokiff"
          style={{ left: 707, top: 1510, width: 236, height: 354, borderRadius: 10, objectFit: "cover" }} />
        <img className="abs reveal" src="/assets/decor/photo-2.png" alt=""
          style={{ left: 955, top: 1511, width: 222, height: 177, borderRadius: 10, objectFit: "cover" }} />
        <img className="abs reveal" src="/assets/decor/photo-3.png" alt=""
          style={{ left: 955, top: 1696, width: 222, height: 167, borderRadius: 10, objectFit: "cover" }} />
        <img className="abs" data-mouse="-8" src="/assets/decor/flower-collab.png" alt=""
          style={{ left: 641, top: 1411, width: 200, height: 200 }} />
        <CropImage
          src="/assets/decor/star-deco.png"
          box={{ left: 473, top: 1810, w: 176, h: 132 }}
          crop={{ w: "512%", h: "455.11%", left: "-73%", top: "-151.11%" }}
          parallax={{ mouse: 14 }}
          className="twinkle twinkle--fast"
        />

      </div>
    </Stage>

    {/* reviews + FAQ section + footer (normal flow, below the scaled hero) */}
    <div className="home-lower">
      <ReviewsSection />
      <FaqSection />
      <footer className="home-footer">
        <img src="/assets/logo.png" alt="Kusmi Tea × Astrokiff" />
        <div className="home-footer__links">
          <p>Les rituels</p>
          <p>La collaboration</p>
          <p>Mentions légales</p>
        </div>
        <p className="home-footer__copy">Kusmi Tea × Astrokiff — 2026</p>
      </footer>
    </div>
    </>
  );
}
