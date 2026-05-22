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

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" aria-label="Questions fréquentes">
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
