import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. Initialised synchronously so the first
 * render already reflects the correct breakpoint (no flash on mount).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Phones get a dedicated reflowed layout; tablets & desktop use the scaled canvas.
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
