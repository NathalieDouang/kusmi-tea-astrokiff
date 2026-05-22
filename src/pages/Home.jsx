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

  // Footer / FAQ links land on the home page with a hash (#rituels,
  // #collaboration, #faq). Scroll to the matching section once it's mounted
  // (delayed so it runs after App's ScrollToTop reset on the route change).
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    // small headroom so the section isn't flush against the top
    const offsets = { rituels: -130, collaboration: -60, faq: 0 };
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) smoothScrollTo(el, { duration: 1.1, offset: offsets[id] || 0 });
    }, 140);
    return () => clearTimeout(t);
  }, [hash, isMobile]);

  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
