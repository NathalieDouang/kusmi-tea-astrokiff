/* Fictitious customer reviews — sits between the collaboration & FAQ sections. */

const REVIEWS = [
  {
    quote:
      "L'Intuition Lunaire est devenue mon rituel du soir. Une parenthèse douce qui apaise vraiment mes fins de journée.",
    name: "Camille L.",
    meta: "Rituel Intuition Lunaire",
  },
  {
    quote:
      "Des saveurs justes et un univers magnifique. J'ai l'impression de m'offrir un vrai moment rien qu'à moi chaque matin.",
    name: "Thomas R.",
    meta: "Rituel Élan Solaire",
  },
  {
    quote:
      "La rencontre entre le thé et l'astrologie est une idée brillante. L'Influence de Vénus est un pur instant de douceur.",
    name: "Léa M.",
    meta: "Rituel Influence de Vénus",
  },
];

const STAR = "M12 2l2.92 6.26 6.84.62-5.16 4.53 1.52 6.71L12 17.1 5.88 20.65l1.52-6.71L2.24 8.88l6.84-.62z";

function Stars() {
  return (
    <div className="review-card__stars" aria-label="Note : 5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d={STAR} fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="reviews" aria-label="Avis clients">
      <h2 className="reviews__title display">Ils ont trouvé leur rituel</h2>
      <p className="reviews__sub">
        <span className="reviews__score">4,9/5</span> · plus de 1&nbsp;200 avis vérifiés
      </p>
      <div className="reviews__grid">
        {REVIEWS.map((r) => (
          <figure className="review-card" key={r.name}>
            <Stars />
            <blockquote className="review-card__quote">{r.quote}</blockquote>
            <figcaption className="review-card__author">
              <span className="review-card__name">{r.name}</span>
              <span className="review-card__meta">{r.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
