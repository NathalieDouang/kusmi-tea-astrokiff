import { createContext, useContext, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

/* ============================================================
   Minimal, elegant route transition — a soft cream dissolve.
   A veil the colour of the page background fades in, the route
   swaps underneath, then the veil fades out: a gentle cross-fade.
   Use via: const go = usePageTransition(); go("/rituel/xxx")
   ------------------------------------------------------------
   TUNABLES: COVER / REVEAL durations below.
   ============================================================ */

const COVER = 0.28;
const REVEAL = 0.4;

const Ctx = createContext(() => {});
export const usePageTransition = () => useContext(Ctx);

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const veilRef = useRef(null);
  const busy = useRef(false);

  const go = useCallback(
    (path) => {
      if (busy.current || path === pathname) return;
      const veil = veilRef.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || !veil) {
        navigate(path);
        return;
      }
      busy.current = true;
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(veil, { display: "none" });
            busy.current = false;
          },
        })
        .set(veil, { display: "block", opacity: 0 })
        .to(veil, { opacity: 1, duration: COVER, ease: "power1.inOut" })
        .add(() => navigate(path))
        .to(veil, { opacity: 0, duration: REVEAL, ease: "power1.inOut" }, "+=0.03");
    },
    [navigate, pathname]
  );

  return (
    <Ctx.Provider value={go}>
      {children}
      <div ref={veilRef} className="page-veil" aria-hidden="true" />
    </Ctx.Provider>
  );
}
