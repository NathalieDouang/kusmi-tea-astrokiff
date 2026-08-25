// Generate a full-page PNG for each route — used for the oral presentation deck.
// Usage: node scripts/screenshots.mjs   (dev server must be running on :5180)

import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "screenshots");
mkdirSync(OUT_DIR, { recursive: true });

const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const BASE = "http://localhost:5180";

const PAGES = [
  { name: "01-home", path: "/" },
  { name: "02-rituel-intuition-lunaire", path: "/rituel/intuition-lunaire" },
  { name: "03-rituel-energie-interieure", path: "/rituel/energie-interieure" },
  { name: "04-rituel-elan-solaire", path: "/rituel/elan-solaire" },
  { name: "05-rituel-influence-de-venus", path: "/rituel/influence-de-venus" },
  { name: "06-rituel-reve-astral", path: "/rituel/reve-astral" },
];

const VIEWPORTS = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "mobile", width: 375, height: 812 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
});

for (const v of VIEWPORTS) {
for (const p of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 2 });

  // Hide moving decor + force scroll-revealed content to be visible so nothing
  // gets cropped out of the still capture.
  await page.evaluateOnNewDocument(() => {
    const style = document.createElement("style");
    style.textContent = `
      .cursor-star, .reveal-cursor, .stardust, .stardust-layer,
      .page-veil { display: none !important; }
      /* freeze the continuous decorations so the screenshot is calm */
      .twinkle, .orbit-rotor, .orbit-ring--mid, .orbit-ring--dotted,
      .reviews-orbit__ring--mid, .reviews-orbit__rotor,
      .reviews-orbit__rotor--rev,
      .shooting-star, .scroll-cue, .faq-tw, .rb-tw {
        animation: none !important;
      }
      /* force-visible: scroll-reveal targets + GSAP-set opacity-0 elements */
      .reveal, .has-reveal .reveal,
      .ing-card, .ing-row, .rstep {
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.documentElement.appendChild(style);
  });

  await page.goto(BASE + p.path, { waitUntil: "networkidle0", timeout: 30000 });
  // give React + GSAP a beat to mount and set their inline opacity:0
  await sleep(900);
  // Clear the inline opacity/transform that GSAP applies on the
  // scroll-revealed elements — those IntersectionObservers don't fire
  // reliably during a headless full-page capture.
  await page.evaluate(() => {
    const sel =
      ".reveal, .ing-card, .ing-row, .rstep, .has-reveal .reveal";
    document.querySelectorAll(sel).forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  });
  await sleep(200);

  const file = resolve(OUT_DIR, `${p.name}-${v.label}.png`);
  await page.screenshot({ path: file, fullPage: true, type: "png" });
  console.log("✓", v.label, p.name, "→", file);
  await page.close();
}
}

await browser.close();
console.log("\nDone. Screenshots in:", OUT_DIR);
