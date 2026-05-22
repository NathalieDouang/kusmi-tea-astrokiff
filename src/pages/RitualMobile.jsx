import { useParams, Navigate } from "react-router-dom";
import { usePageTransition } from "../components/PageTransition.jsx";
import RitualCard from "../components/RitualCard.jsx";
import HomeFooter from "../components/HomeFooter.jsx";
import FallingPetals from "../components/FallingPetals.jsx";
import { ritualsBySlug, relatedRituals } from "../data/rituals.js";

function rgba79(hex) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},0.79)`;
}

/** Phone layout for a ritual page — single reflowed column. */
export default function RitualMobile() {
  const { slug } = useParams();
  const go = usePageTransition();
  const r = ritualsBySlug[slug];
  if (!r) return <Navigate to="/" replace />;

  const { theme } = r;
  const cta = rgba79(theme.accent);

  return (
    <div className="m-page m-ritual" style={{ "--accent": theme.accent }}>
      <FallingPetals accent={theme.accent} count={10} hideOnId="ritual-continuer" />
      <header className="m-topbar">
        <a href="/" className="m-topbar__brand" onClick={(e) => { e.preventDefault(); go("/"); }}>
          <img src="/assets/logo.png" alt="Kusmi Tea × Astrokiff" />
        </a>
        <a href="https://www.kusmitea.com/" target="_blank" rel="noopener noreferrer" className="cta cta--nav" style={{ background: cta }}>
          COMMANDER
        </a>
      </header>

      {/* header: tin + title + description + tags */}
      <section className="m-rhead" style={{ background: `linear-gradient(#ffffff, ${theme.tint})` }}>
        <div className="m-rhead__tin">
          <img src={r.tin} alt={r.name} style={{ transform: `rotate(${r.header.tin.rotate}deg)` }} />
        </div>
        <h1 className="display m-rhead__title">{r.name}</h1>
        <p className="body m-rhead__desc">{r.description}</p>

        <p className="label-serif m-rhead__label">Notes Astrales</p>
        <div className="m-tags">
          {r.notes.map((t) => (<span key={t} className="tag" style={{ color: theme.tagBg }}>{t}</span>))}
        </div>
        <p className="label-serif m-rhead__label">Energie</p>
        <div className="m-tags">
          {r.energie.map((t) => (<span key={t} className="tag" style={{ color: theme.tagBg }}>{t}</span>))}
        </div>
      </section>

      {/* ritual steps */}
      <section className="m-section" style={{ background: theme.tint }}>
        <p className="body m-eyebrow">COMMENT PRÉPARER SON RITUEL AVEC SON THÉ</p>
        <h2 className="display m-section-title">Rituel</h2>
        <div className="ritual-steps" style={{ "--accent": theme.accent, "--step-bg": theme.tint }}>
          {r.steps.map((s) => (
            <div className="rstep" key={s.n}>
              <span className="rstep__num">{s.n}</span>
              <span className="rstep__title">{s.title}</span>
              <span className="rstep__tag">{s.tag}</span>
            </div>
          ))}
        </div>

        {/* ingredients */}
        <div className="m-ing-card" style={{ "--accent": theme.accent }}>
          <h2 className="display m-ing-card__title">Ingredients</h2>
          <span className="m-ing-card__rule" />
          <div>
            {r.ingredients.map((ing) => (
              <div className="ing-row" key={ing.name}>
                <span className="ing-pct" style={{ color: theme.accent }}>{ing.pct}</span>
                <span className="ing-name">{ing.name}</span>
                <span className="ing-origin">{ing.origin}</span>
              </div>
            ))}
          </div>
          <p className="body m-ing-card__moment-label"><span className="ing-marker" />LE MEILLEUR MOMENT</p>
          <p className="body m-ing-card__moment">{r.moment}</p>
        </div>
      </section>

      {/* mid CTA */}
      <section className="m-section m-cta-section" style={{ background: theme.tint }}>
        <h2 className="display m-cta-title">Faire entrer le rituel dans votre quotidien</h2>
        <a href="https://www.kusmitea.com/" target="_blank" rel="noopener noreferrer" className="cta cta--lg m-cta-block" style={{ background: cta }}>
          COMMANDER
        </a>
        <button type="button" className="cta-ghost m-faq-link" onClick={() => go("/#faq")}>
          <span className="cta-ghost__text">Une question ? Consultez la FAQ</span>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
            <path d="M2 3 L8 9 L14 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </section>

      {/* dark "continuer" section */}
      <section className="m-dark" id="ritual-continuer">
        <h2 className="display m-dark__title">Continuer l’experience...</h2>
        <p className="body m-dark__text">
          Chaque rituel explore une énergie différente, pensée pour accompagner vos états
          intérieurs et vos moments du quotidien.
        </p>
        <div className="m-slider m-slider--related" role="list">
          {relatedRituals(slug).map((rr) => (
            <div className="m-slide m-slide--sm" role="listitem" key={rr.slug}>
              <div className="m-card-frame">
                <RitualCard ritual={rr} onActivate={() => go(`/rituel/${rr.slug}`)} style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          ))}
        </div>
        <p className="m-cue m-cue--dark">
          <span className="m-cue__arrows" aria-hidden="true">‹ glissez ›</span>
          Choisissez une carte
        </p>
      </section>

      <HomeFooter />
    </div>
  );
}
