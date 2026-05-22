import { usePageTransition } from "../components/PageTransition.jsx";
import FaqSection from "../components/FaqSection.jsx";
import RitualCard from "../components/RitualCard.jsx";
import { rituals } from "../data/rituals.js";

const HOME_CTA = "rgba(74,122,200,0.79)";

/**
 * Phone layout for the home page — a single reflowed column.
 * The desktop card "fan" becomes a horizontal swipeable, scroll-snapping slider.
 */
export default function HomeMobile() {
  const go = usePageTransition();

  return (
    <div className="m-page">
      <header className="m-topbar">
        <a href="/" className="m-topbar__brand" onClick={(e) => { e.preventDefault(); go("/"); }}>
          <img src="/assets/logo.png" alt="Kusmi Tea × Astrokiff" />
        </a>
        <a href="#" className="cta cta--nav" style={{ background: HOME_CTA }} onClick={(e) => e.preventDefault()}>
          COMMANDER
        </a>
      </header>

      <section className="m-hero">
        <img className="m-hero__deco m-hero__deco--moon" src="/assets/decor/moon-deco.png" alt="" />
        <img className="m-hero__deco m-hero__deco--sun" src="/assets/decor/sun-deco.png" alt="" />
        <h1 className="display m-hero__title">Trouvez le rituel qui correspond à votre énergie</h1>
        <p className="body m-hero__intro">
          Une collection <b>de cinq rituels de thé</b> inspirés des astres et des énergies célestes.
        </p>
      </section>

      {/* swipeable card slider (replaces the desktop fan) */}
      <div className="m-slider" role="list" aria-label="Les cinq rituels">
        {rituals.map((r) => (
          <div className="m-slide" role="listitem" key={r.slug}>
            <div className="m-card-frame">
              <RitualCard
                ritual={r}
                onActivate={() => go(`/rituel/${r.slug}`)}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="m-cue">
        <span className="m-cue__arrows" aria-hidden="true">‹ glissez ›</span>
        Choisissez une carte
      </p>

      {/* collaboration */}
      <section className="m-collab">
        <h2 className="display m-section-title">Traduire les énergies en infusion</h2>
        <div className="m-collab__photos">
          <img src="/assets/decor/photo-1.png" alt="Astrokiff" />
          <img src="/assets/decor/photo-2.png" alt="" />
          <img src="/assets/decor/photo-3.png" alt="" />
        </div>
        <div className="body m-collab__text">
          <p>
            Kusmi Tea et Astrokiff s’unissent autour d’une vision commune : transformer les
            instants du quotidien en expériences sensibles et symboliques.
          </p>
          <p>
            D’un côté, le savoir-faire de Kusmi Tea, maison historique de l’infusion et des
            assemblages créatifs. De l’autre, Astrokiff, une lecture contemporaine de
            l’astrologie comme langage émotionnel et intuitif.
          </p>
        </div>
        <a href="#" className="cta cta--lg m-cta-block" style={{ background: HOME_CTA }} onClick={(e) => e.preventDefault()}>
          COMMANDER
        </a>
      </section>

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
  );
}
