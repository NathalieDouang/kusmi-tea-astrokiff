import { useIsMobile } from "../lib/useMediaQuery.js";
import RitualDesktop from "./RitualDesktop.jsx";
import RitualMobile from "./RitualMobile.jsx";

// Phones get a dedicated reflowed layout; tablets & desktop keep the scaled canvas.
export default function Ritual() {
  const isMobile = useIsMobile();
  return isMobile ? <RitualMobile /> : <RitualDesktop />;
}
