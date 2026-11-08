// Beast16 site: strip marquee, hero pack, gallery (render 3D per spesies).
(function () {
  const NAMES = ["Cub", "Fang Pup", "Mini Dragon", "Oni Kid", "Longear", "Cat Beast", "Fox Kit", "Panda Beast", "Koala Beast", "Piggy", "Froggy", "Owl Beast", "Batty", "Deer Beast", "Rhino Beast", "The Sixteenth"];
  const img = (n) => `img/sp-${String(n).padStart(2, "0")}.jpg`;
  const strip = document.getElementById("strip-track");
  if (strip) {
    const items = "4,444 BABY BEASTS · 16 SPECIES · FIRST MINT FREE · AGENTS FIRST CLASS · $BEAST16 WAKES WHEN IT WAKES · ";
    strip.innerHTML = `<span>${items.repeat(3)}</span><span>${items.repeat(3)}</span>`;
  }
  const hero = document.getElementById("hero-beasts");
  if (hero) {
    const picks = [16, 3, 7, 13, 8];
    hero.innerHTML = picks.map((n, i) => `<div class="sticker ${i % 2 ? "tilt-r" : "tilt-l"}"><img src="${img(n)}" alt="${NAMES[n - 1]}" loading="lazy"/></div>`).join("");
  }
  const card = (n, note) => `<div class="scard ${n === 16 ? "apex" : ""}"><img src="${img(n)}" alt="${NAMES[n - 1]}" loading="lazy"/><div class="nm"><span class="display">${NAMES[n - 1]}</span><span class="no">Nº ${String(n).padStart(2, "0")}/16</span></div>${note ? `<p class="label" style="padding:0 14px 14px; color:var(--ink2)">${note}</p>` : ""}</div>`;
  const grid = document.getElementById("home-grid");
  if (grid) {
    grid.innerHTML = [1, 2, 3, 4, 6, 7, 11, 16].map((n) => card(n)).join("");
  }
  const full = document.getElementById("species-grid");
  if (full) {
    full.innerHTML = NAMES.map((_, i) => card(i + 1, i === 15 ? "Apex · around 3% of mints" : "Wild pack")).join("");
  }
})();
