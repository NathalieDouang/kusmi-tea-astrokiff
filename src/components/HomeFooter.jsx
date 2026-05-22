import { usePageTransition } from "./PageTransition.jsx";

/* Flowing footer used on the home page (desktop & mobile) and mobile ritual.
   Logo → home, "Les rituels" → home cards, "La collaboration" → collab section. */
export default function HomeFooter() {
  const go = usePageTransition();
  const nav = (path) => (e) => {
    e.preventDefault();
    go(path);
  };
  return (
    <footer className="home-footer">
      <a href="/" className="home-footer__brand" onClick={nav("/")}>
        <img src="/assets/logo.png" alt="Kusmi Tea × Astrokiff" />
      </a>
      <div className="home-footer__links">
        <a href="/#rituels" onClick={nav("/#rituels")}>Les rituels</a>
        <a href="/#collaboration" onClick={nav("/#collaboration")}>La collaboration</a>
        <p>Mentions légales</p>
      </div>
      <p className="home-footer__copy">Kusmi Tea × Astrokiff — 2026</p>
    </footer>
  );
}
