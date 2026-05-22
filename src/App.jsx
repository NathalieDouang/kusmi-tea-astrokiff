import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Home from "./pages/Home.jsx";
import Ritual from "./pages/Ritual.jsx";
import RevealCursor from "./components/RevealCursor.jsx";
import StardustCursor from "./components/StardustCursor.jsx";
import { PageTransitionProvider } from "./components/PageTransition.jsx";
import { setLenis } from "./lib/lenis.js";

function useLenisScroll(lenisRef) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    setLenis(lenis);
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [lenisRef]);
}

// Reset to the top of the page on every route change (jump, no animation).
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenisRef]);
  return null;
}

export default function App() {
  const lenisRef = useRef(null);
  useLenisScroll(lenisRef);
  return (
    <>
      <ScrollToTop lenisRef={lenisRef} />
      <StardustCursor />
      <RevealCursor />
      <PageTransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rituel/:slug" element={<Ritual />} />
        </Routes>
      </PageTransitionProvider>
    </>
  );
}
