import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../lib/useMediaQuery.js";
import { smoothScrollTo } from "../lib/lenis.js";
import HomeDesktop from "./HomeDesktop.jsx";
import HomeMobile from "./HomeMobile.jsx";

// Phones get a dedicated reflowed layout; tablets & desktop keep the scaled canvas.
export default function Home() {
  const isMobile = useIsMobile();
  const { hash } = useLocation();

  // Arriving from a ritual page's "Consultez la FAQ" link: scroll to the FAQ.
  // Delayed so it runs after App's ScrollToTop reset on the route change.
  useEffect(() => {
    if (hash !== "#faq") return;
    const t = setTimeout(() => {
      const el = document.getElementById("faq");
      if (el) smoothScrollTo(el, { duration: 1.1 });
    }, 140);
    return () => clearTimeout(t);
  }, [hash, isMobile]);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
