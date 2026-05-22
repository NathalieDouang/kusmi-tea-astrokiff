import { useIsMobile } from "../lib/useMediaQuery.js";
import HomeDesktop from "./HomeDesktop.jsx";
import HomeMobile from "./HomeMobile.jsx";

// Phones get a dedicated reflowed layout; tablets & desktop keep the scaled canvas.
export default function Home() {
  const isMobile = useIsMobile();
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
