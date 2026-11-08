// Beast16 site: strip marquee, hero pack, gallery renders.
(function () {
  const B = window.BEAST;
  const strip = document.getElementById("strip-track");
  if (strip) {
    const items = "4,444 BABY BEASTS · 16 SPECIES · FIRST MINT FREE · AGENTS FIRST CLASS · $BEAST16 WAKES WHEN IT WAKES · ";
    strip.innerHTML = `<span>${items.repeat(3)}</span><span>${items.repeat(3)}</span>`;
  }
  const showcase = [
    { species: 6, fur: 3, bg: 1, eyes: 1, mouth: 1, acc: 1 },
    { species: 2, fur: 8, bg: 3, eyes: 2, mouth: 2, acc: 3 },
    { species: 5, fur: 10, bg: 5, eyes: 0, mouth: 0, acc: 5 },
    { species: 13, fur: 1, bg: 0, eyes: 5, mouth: 4, acc: 0 },
    { species: 15, fur: 10, bg: 5, eyes: 2, mouth: 1, acc: 0 },
  ];
  const hero = document.getElementById("hero-beasts");
  if (hero) {
    hero.innerHTML = showcase.map((t, i) => `<div class="sticker ${i % 2 ? "tilt-r" : "tilt-l"}">${B.beastSVG(t)}</div>`).join("");
  }
  const grid = document.getElementById("home-grid");
  if (grid) {
    const picks = [0, 1, 2, 3, 4, 5, 6, 15];
    grid.innerHTML = picks.map((sp) => {
      const t = B.fromSeed(1000 + sp * 77);
      t.species = sp;
      return `<div class="scard ${sp === 15 ? "apex" : ""}">${B.beastSVG(t)}<div class="nm"><span class="display">${B.SPECIES[sp]}</span><span class="no">Nº ${String(sp + 1).padStart(2, "0")}/16</span></div></div>`;
    }).join("");
  }
  const full = document.getElementById("species-grid");
  if (full) {
    full.innerHTML = B.SPECIES.map((name, sp) => {
      const t = B.fromSeed(4242 + sp * 131);
      t.species = sp;
      const note = sp === 15 ? "Apex · around 3% of mints" : sp % 3 === 0 ? "Wild pack" : sp % 3 === 1 ? "Wild pack" : "Wild pack";
      return `<div class="scard ${sp === 15 ? "apex" : ""}">${B.beastSVG(t)}<div class="nm"><span class="display">${name}</span><span class="no">Nº ${String(sp + 1).padStart(2, "0")}/16</span></div><p class="label" style="padding:0 14px 14px; color:var(--ink2)">${note}</p></div>`;
    }).join("");
  }
})();
