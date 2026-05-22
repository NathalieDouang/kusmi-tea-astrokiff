// Content + theme + header-layout model for the 5 Kusmi Tea × Astrokiff rituals.
// All values extracted faithfully from the Figma maquettes (1280px design space).
// Product `tin` images live in /public/assets/tins and are easy to swap later.

export const rituals = [
  {
    slug: "intuition-lunaire",
    name: "L’Intuition Lunaire",
    card: { face: "/assets/cards/card-intuition-lunaire.png", aspect: 564 / 927 },
    description:
      "La pleine lune amplifie les émotions, éclaire les pensées et révèle ce qui était caché. Ce rituel accompagne ces instants d’intensité intérieure et de clarté émotionnelle.",
    notes: ["Camomille", "Fleurs blanches", "Vanille", "Lavande"],
    energie: ["Intuitive", "Calme", "Introspective", "Sensorielle"],
    steps: [
      { n: "01", title: "Profiter du calme de la soirée", tag: "Rituel d’ouverture" },
      { n: "02", title: "Préparer l’infusion", tag: "Infuser 2Min à 80°C" },
      { n: "03", title: "Prendre un moment pour soi", tag: "S’installer" },
      { n: "04", title: "Observer ce qui vous traverse", tag: "introspection" },
      { n: "05", title: "Déguster lentement", tag: "Savourer l’infusion" },
    ],
    ingredients: [
      { pct: "70%", name: "Camomille séchée", origin: "ROMAINE" },
      { pct: "10%", name: "Pétales de lavande", origin: "PROVENCE" },
      { pct: "15%", name: "Gousse de vanille", origin: "MADAGASCAR" },
      { pct: "5%", name: "Fleur de tiaré", origin: "POLYNÉSIE" },
    ],
    moment:
      "À savourer lors des soirées de pleine lune, des journaling sessions ou des moments de calme et de connexion intérieure",
    theme: { tint: "#f1f6ff", accent: "#285eb5", tagBg: "#4c5b86" },
    tin: "/assets/tins/intuition-lunaire.png",
    header: {
      illu: { src: "/assets/decor/illu-moon.png", left: 275, top: 128, w: 305, h: 282,
        crop: { w: "467.99%", h: "337.95%", left: "-6.4%", top: "-8.58%" } },
      flower: { src: "/assets/decor/flower-header-blue.png", cx: 78.4, cy: 445.9, w: 284.06, h: 397.37, rotate: 31.78 },
      tin: { cx: 300.9, cy: 413.9, size: 424, rotate: -9.78 },
    },
  },
  {
    slug: "energie-interieure",
    name: "L’Énergie Intérieure",
    card: { face: "/assets/cards/card-energie-interieure.png", aspect: 581 / 927 },
    description:
      "Une infusion inspirée par les moments de tirage de cartes, d’introspection et les énergies profondes qui émergent lorsque l’on cherche des réponses à l’intérieur de soi.",
    notes: ["Cacao", "Thé noir", "Cardamome", "Cannelle"],
    energie: ["Mystérieuse", "Intuitive", "Introspective", "Profonde"],
    steps: [
      { n: "01", title: "Créer un espace calme", tag: "Rituel d’ouverture" },
      { n: "02", title: "Préparer l’infusion", tag: "Infuser 2Min à 80°C" },
      { n: "03", title: "Tirer une carte", tag: "Moment de tirage" },
      { n: "04", title: "Observer ce que cela réveille en soi", tag: "introspection" },
      { n: "05", title: "Déguster lentement", tag: "Savourer l’infusion" },
    ],
    ingredients: [
      { pct: "70%", name: "Camomille séchée", origin: "ROMAINE" },
      { pct: "10%", name: "Pétales de lavande", origin: "PROVENCE" },
      { pct: "15%", name: "Gousse de vanille", origin: "MADAGASCAR" },
      { pct: "5%", name: "Fleur de tiaré", origin: "POLYNÉSIE" },
    ],
    moment:
      "Lors d’un tirage de tarot ou d’oracle, pendant un moment d’introspection, ou lorsque l’on cherche à clarifier une situation personnelle.",
    theme: { tint: "#f9efff", accent: "#8e79ad", tagBg: "#8e79ad" },
    tin: "/assets/tins/energie-interieure.png",
    header: {
      illu: { src: "/assets/decor/illu-card.png", left: 365.32, top: 155.84, w: 196.82, h: 295.04, rotate: 9.2 },
      flower: { src: "/assets/decor/flower-header-purple.png", cx: 45.36, cy: 479.52, w: 534.98, h: 534.98, rotate: 14.72 },
      tin: { cx: 308.6, cy: 394.6, size: 303, rotate: -6.48 },
    },
  },
  {
    slug: "elan-solaire",
    name: "L’Élan Solaire",
    card: { face: "/assets/cards/card-elan-solaire.png", aspect: 560 / 921 },
    description:
      "Une infusion lumineuse pensée pour accompagner les débuts de journée et réveiller une énergie douce et claire.",
    notes: ["Thé vert", "Gingembre", "Agrumes", "Citronnelle"],
    energie: ["Énergisante", "Lumineuse", "Fraîche", "Dynamisante"],
    steps: [
      { n: "01", title: "Ouvrir la journée en douceur", tag: "Rituel d’ouverture" },
      { n: "02", title: "Préparer l’infusion", tag: "Infuser 2Min à 80°C" },
      { n: "03", title: "Respirer profondément", tag: "S’installer" },
      { n: "04", title: "Se mettre en mouvement", tag: "Éveil" },
      { n: "05", title: "Déguster dans la matinée", tag: "Savourer l’infusion" },
    ],
    ingredients: [
      { pct: "65%", name: "Thé vert", origin: "CHINE" },
      { pct: "15%", name: "Gingembre", origin: "INDE" },
      { pct: "10%", name: "Agrumes", origin: "FRANCE" },
      { pct: "10%", name: "Citronnelle", origin: "THAÏLANDE" },
    ],
    moment:
      "Idéal le matin, pour démarrer la journée avec clarté, énergie et légèreté.",
    theme: { tint: "#ffedde", accent: "#e77231", tagBg: "#e77231" },
    tin: "/assets/tins/elan-solaire.png",
    header: {
      illu: { src: "/assets/decor/illu-sun.png", left: 253, top: 113, w: 345, h: 335,
        crop: { w: "444.93%", h: "305.67%", left: "-111.59%", top: "-11.34%" } },
      flower: { src: "/assets/decor/flower-header-orange.png", cx: 71.38, cy: 511.83, w: 337.78, h: 473.04, rotate: 11.6 },
      tin: { cx: 300.72, cy: 394.72, size: 405, rotate: -7.67 },
    },
  },
  {
    slug: "influence-de-venus",
    name: "L’Influence de Vénus",
    card: { face: "/assets/cards/card-influence-de-venus.png", aspect: 569 / 915 },
    description:
      "Une infusion lumineuse pensée pour accompagner les débuts de journée et réveiller une énergie douce et claire.",
    notes: ["Rose", "Fruits rouges", "Hibiscus", "Vanille"],
    energie: ["Douce", "Harmonieuse", "Sensorielle", "Romantique"],
    steps: [
      { n: "01", title: "Créer une ambiance douce", tag: "Rituel d’ouverture" },
      { n: "02", title: "Préparer l’infusion", tag: "Infuser 2Min à 80°C" },
      { n: "03", title: "Prendre un moment pour soi", tag: "S’installer" },
      { n: "04", title: "Se reconnecter à ses émotions positives", tag: "Harmonie" },
      { n: "05", title: "Déguster lentement", tag: "Savourer l’infusion" },
    ],
    ingredients: [
      { pct: "50%", name: "Hibiscus", origin: "AFRIQUE" },
      { pct: "25%", name: "Rose", origin: "ITALIE" },
      { pct: "15%", name: "Fruits rouges", origin: "EUROPE" },
      { pct: "10%", name: "Vanille", origin: "MADAGASCAR" },
    ],
    moment:
      "À savourer lors de moments de douceur, de self-care ou d’instants partagés.",
    theme: { tint: "#ffe6eb", accent: "#cf636d", tagBg: "#cf636d" },
    tin: "/assets/tins/influence-de-venus.png",
    header: {
      illu: { src: "/assets/decor/illu-cupid.png", left: 220, top: 122, w: 363, h: 374 },
      flower: { src: "/assets/decor/flower-header-pink.png", cx: 49, cy: 496, w: 312, h: 410, rotate: 25.13 },
      tin: { cx: 297.91, cy: 394.91, size: 306.587, rotate: -8.34 },
    },
  },
  {
    slug: "reve-astral",
    name: "Le Rêve Astral",
    card: { face: "/assets/cards/card-reve-astral.png", aspect: 560 / 921 },
    description:
      "Une infusion apaisante pensée pour accompagner la transition vers le sommeil et favoriser le lâcher-prise.",
    notes: ["Lavande", "Camomille", "Fleur d’oranger", "Verveine"],
    energie: ["Apaisante", "Rêveuse", "Nocturne", "Légère"],
    steps: [
      { n: "01", title: "Ralentir la fin de journée", tag: "Rituel d’ouverture" },
      { n: "02", title: "Préparer l’infusion", tag: "Infuser 2Min à 80°C" },
      { n: "03", title: "Éteindre les écrans", tag: "S’installer" },
      { n: "04", title: "Se détendre progressivement", tag: "Relâchement" },
      { n: "05", title: "Déguster avant le coucher", tag: "Savourer l’infusion" },
    ],
    ingredients: [
      { pct: "45%", name: "Camomille", origin: "EUROPE" },
      { pct: "25%", name: "Lavande", origin: "PROVENCE" },
      { pct: "20%", name: "Fleur d’oranger", origin: "MÉDITERRANÉE" },
      { pct: "10%", name: "Verveine", origin: "AMÉRIQUE DU SUD" },
    ],
    moment:
      "Idéal en soirée, avant le sommeil, pour accompagner le lâcher-prise et la détente profonde.",
    theme: { tint: "#f1fffb", accent: "#658d81", tagBg: "#658d81" },
    tin: "/assets/tins/reve-astral.png",
    header: {
      illu: { src: "/assets/decor/illu-cloud.png", left: 155, top: 115, w: 476, h: 278 },
      flower: { src: "/assets/decor/flower-header-green.png", cx: 88, cy: 479.5, w: 352, h: 493, rotate: 58.55 },
      tin: { cx: 301.52, cy: 392.52, size: 303, rotate: -6.43 },
    },
  },
];

export const ritualsBySlug = Object.fromEntries(rituals.map((r) => [r.slug, r]));
export const relatedRituals = (slug) => rituals.filter((r) => r.slug !== slug);

// Homepage card-fan placement (left, top, rotation) in the 1280×1781 design space.
// Evenly-spaced fan (card centres ~150px apart) with a gentle arc and modest
// rotation, so each card's top title and bottom subtitle banners stay visible.
export const fanLayout = {
  "intuition-lunaire": { left: 232, top: 392, w: 220.86, rotate: -13 },
  "energie-interieure": { left: 379, top: 368, w: 223.14, rotate: -7 },
  "elan-solaire": { left: 544, top: 380, w: 191, rotate: 0 },
  "influence-de-venus": { left: 680, top: 368, w: 220.24, rotate: 7 },
  "reve-astral": { left: 829, top: 392, w: 218.53, rotate: 13 },
};
