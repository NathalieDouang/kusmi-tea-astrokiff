#!/usr/bin/env bash
# Downloads all design assets from the local Figma Dev Mode server into public/assets.
# Re-runnable while the Figma desktop app + Dev Mode MCP server are running.
set -euo pipefail
BASE="http://localhost:3845/assets"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DECOR="$ROOT/public/assets/decor"
CARDS="$ROOT/public/assets/cards"
TINS="$ROOT/public/assets/tins"
mkdir -p "$DECOR" "$CARDS" "$TINS"

dl () { # dl <hash.ext> <dest/name.ext>
  curl -fsS "$BASE/$1" -o "$2" && echo "  ok  $2" || echo "  FAIL $1 -> $2"
}

echo "== decor =="
dl 0b6a9c97157b67b5bdb3902a29019c3c062f1409.png "$DECOR/wallpaper-header.png"
dl c9864dfdd1fa5eb865a02c931f8f49d7d797183f.png "$DECOR/night-sky.png"
dl 6e9034e40a3429bd7f7deaaa8ace3f92f9a453fd.png "$DECOR/hand-star.png"
dl cdd9e196f41cd1808969a0a893caadd4d93780ac.png "$DECOR/cloud-3.png"
dl 7b503eb8c3a1ade26e03128c01fc708d18134e02.png "$DECOR/cloud-1.png"
dl 57ce25f0b354921b5b039c96d70439e5112a801a.png "$DECOR/cloud-2.png"
dl 7d55b1cc32991db73b8769c9e7af1f44c819f522.png "$DECOR/cherub-1.png"
dl 887fe411d08a954150e070a75e2e8830a605d51f.png "$DECOR/cherub-2.png"
dl 34aee8983d150c33e0ae1d31064efd9e97ec8977.png "$DECOR/moon-deco.png"
dl 1d05f5602e45210d6f977129a85dade3fde92e1d.png "$DECOR/sun-deco.png"
dl 34ddd3142a9ff50e084ccd42316d99cb00aced34.png "$DECOR/star-deco.png"
dl d0584013c03cdacbb1aaad92193adfed89bfdca8.png "$DECOR/photo-1.png"
dl 4d981dc63f98d937e901960496bdae792b101872.png "$DECOR/photo-2.png"
dl eb093b4ecca76c8699ddd0be50991bd51db2f40e.png "$DECOR/photo-3.png"
dl 1bf6403ad494e0364b808f51e0d46ee6d453e083.png "$DECOR/flower-collab.png"
# per-ritual header flowers
dl 3771a7ae62b0995054b6ac1fb99a0390ba913b0e.png "$DECOR/flower-header-blue.png"
dl 9ead482e2db9027f1690374ef327b9a92a5c7e00.png "$DECOR/flower-header-purple.png"
dl 6fc32bfb691b6348291fd04fb39b6f142504a2bc.png "$DECOR/flower-header-orange.png"
dl 8c9ccdebc2c33b657179e402438995bcc1f4b890.png "$DECOR/flower-header-pink.png"
dl 02d25f660e8faaf518ea1dfb05271514705b0ae1.png "$DECOR/flower-header-green.png"
# per-ritual black line illustrations
dl eb03e4a1a38b1a6869a5f8ad6f196a892756edae.png "$DECOR/illu-moon.png"
dl b46ac50d64a5313c98c7d4de66906c4a97ce6aa8.png "$DECOR/illu-card.png"
dl ecc5771335d3beb9dea87752da39d77a99b99ff1.png "$DECOR/illu-sun.png"
dl 34e869271dd082c8dbaf0639d1ce6a33c449c45f.png "$DECOR/illu-cupid.png"
dl 127a121c37e139ab8e7ec27dd776c478cb808bd1.png "$DECOR/illu-cloud.png"
# lines (svg)
dl 4545f088acfd6ac0e2683fa8fbbdb661cd611118.svg "$DECOR/line-footer.svg"
dl 68b46f4076945e69a8b816587cd7dd04d89f7602.svg "$DECOR/line-sep.svg"

echo "== card faces =="
dl a4856f91e52346eead37a4a7b38710120e187e09.png "$CARDS/card-intuition-lunaire.png"
dl 23e8facd7f04d8c4a1a8045ffbf56622377dc649.png "$CARDS/card-energie-interieure.png"
dl c8a78408690701c2238b3a36c35983be0ca135c9.png "$CARDS/card-elan-solaire.png"
dl 4baae5813bbd2e7295ab32d4dd04c87fb4edbea4.png "$CARDS/card-influence-de-venus.png"
dl 03797d6569b1e91289a73f80786e6d393fa8aa15.png "$CARDS/card-reve-astral.png"
# card title + subtitle (vector text overlays)
dl 6390e0ed7fb552f62e6d021b9858a4b7f3135d4f.svg "$CARDS/title-intuition-lunaire.svg"
dl d5f3f4d09017f9e1c9fc205d769577728e8a589a.svg "$CARDS/sub-intuition-lunaire.svg"
dl ccdf493669692c23e73288d26d64d7cff938a086.svg "$CARDS/title-energie-interieure.svg"
dl 62949a66f60cf0e95897c7062b060e34bb17f81e.svg "$CARDS/sub-energie-interieure.svg"
dl 42891e18a8d09219918930256abbefb515f32a1f.svg "$CARDS/title-elan-solaire.svg"
dl 30318da61eb6ec69f2cfd700633285815ea7e95f.svg "$CARDS/sub-elan-solaire.svg"
dl a27000876e636a49fdbc8897721549eb055092c9.svg "$CARDS/title-influence-de-venus.svg"
dl 5a1b5dd0f356bbee917c7e0658f3fe562505cf49.svg "$CARDS/sub-influence-de-venus.svg"
dl 524d6df47e9f5bb11ea72a2e3fe801083fd14143.svg "$CARDS/title-reve-astral.svg"
dl 8afa1ed189771177b75e1cec3d629498e5ba670f.svg "$CARDS/sub-reve-astral.svg"

echo "== tins =="
dl 28eed61067386f09d32e519a1ae4d1c430a66341.png "$TINS/intuition-lunaire.png"
dl 1731971c21b49779a7758fe956e4448e630ad39a.png "$TINS/energie-interieure.png"
dl 5804f28b551c46a78f25c0484c39ff8d263276fc.png "$TINS/elan-solaire.png"
dl 00e8c41638f152914708de3a67a7048eb38d0263.png "$TINS/influence-de-venus.png"
dl a7f033e77d1c5fc1b2d961b96b3adfa4c6d42449.png "$TINS/reve-astral.png"

echo "done."
