import { usePageTransition } from "./PageTransition.jsx";

/** Top nav: centered wordmark + a top-right "Commander" CTA (placeholder link). */
export default function SiteHeader({ ctaBg }) {
  const go = usePageTransition();
  return (
    <header className="nav">
      <a
        href="/"
        className="nav__brand"
        onClick={(e) => {
          e.preventDefault();
          go("/");
        }}
      >
        <img src="/assets/logo.png" alt="Kusmi Tea × Astrokiff" style={{ height: 46, display: "block" }} />
      </a>
      <a
        href="https://www.kusmitea.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="cta cta--nav nav__cta"
        style={{ background: ctaBg }}
      >
        COMMANDER
      </a>
    </header>
  );
}
