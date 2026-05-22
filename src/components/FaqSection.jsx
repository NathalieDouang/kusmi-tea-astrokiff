import { useState } from "react";

/* Dedicated FAQ accordion section for the home page (max 5 questions). */
const FAQ = [
  {
    q: "Les thés sont-ils bio ?",
    a: "Oui, toute la collection Kusmi Tea × Astrokiff est certifiée bio, élaborée à partir d’ingrédients sélectionnés avec soin pour des infusions sensibles et naturelles.",
  },
  {
    q: "Comment choisir mon rituel ?",
    a: "Laissez-vous guider par votre énergie du moment : chaque carte révèle un rituel pensé pour un état intérieur — intuition, élan, douceur, introspection ou repos.",
  },
  {
    q: "Comment préparer mon infusion ?",
    a: "Faites infuser 2 minutes à 80°C, créez un espace calme, accordez-vous un instant rien que pour vous, puis dégustez lentement pour savourer pleinement le rituel.",
  },
  {
    q: "Qu’est-ce que la collaboration Kusmi Tea × Astrokiff ?",
    a: "Une rencontre entre le savoir-faire d’infusion de Kusmi Tea et la lecture intuitive de l’astrologie par Astrokiff, pour transformer les instants du quotidien en expériences symboliques.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Vos rituels sont préparés et expédiés sous 48h, avec une livraison soignée partout en France métropolitaine.",
  },
];

const SPARK =
  "M0,-6 C0.9,-1.8 1.8,-0.9 6,0 C1.8,0.9 0.9,1.8 0,6 C-0.9,1.8 -1.8,0.9 -6,0 C-1.8,-0.9 -0.9,-1.8 0,-6 Z";

// scattered sparkles: [x%, y%, size px, twinkle delay (null = static)]
const SPARKS = [
  [6, 14, 16, 0], [93, 9, 13, 1.4], [13, 42, 12, null], [88, 40, 15, 0.7],
  [4, 68, 14, 2.2], [95, 64, 12, 1.1], [9, 90, 13, 0.4], [91, 92, 16, 1.9],
  [50, 6, 11, 2.6], [46, 96, 12, null], [76, 24, 11, 0.9], [24, 76, 12, 1.6],
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq" aria-label="Questions fréquentes">
      <div className="faq__bg" aria-hidden="true">
        {SPARKS.map(([x, y, s, d], i) => (
          <svg
            key={i}
            className={`faq-spark${d != null ? " faq-tw" : ""}`}
            viewBox="-7 -7 14 14"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: d != null ? `${d}s` : undefined }}
          >
            <path d={SPARK} fill="currentColor" />
          </svg>
        ))}
      </div>
      <h2 className="faq__title display">Questions fréquentes</h2>
      <div className="faq__list">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq__item${isOpen ? " open" : ""}`} key={i}>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <svg
                  className="faq__icon"
                  width="18"
                  height="11"
                  viewBox="0 0 18 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2.5 L9 8.5 L16 2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="faq__a">
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
