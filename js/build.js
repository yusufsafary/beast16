// Build a Beast: kontrol mixer trait.
(function () {
  const B = window.BEAST;
  const $ = (id) => document.getElementById(id);
  let t = { species: 6, fur: 3, bg: 1, eyes: 1, mouth: 1, acc: 1 };

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2600);
  }
  function render() {
    $("stage-art").innerHTML = B.beastSVG(t);
    $("traits-out").innerHTML =
      `SPECIES · ${B.SPECIES[t.species]}<br/>FUR · ${["Cream", "Caramel", "Cocoa", "Moss", "Sage", "Sky", "Lilac", "Rose", "Peach", "Mint", "Butter", "Ash"][t.fur]} · EYES · ${B.EYES[t.eyes]}<br/>MOUTH · ${B.MOUTHS[t.mouth]} · ACCESSORY · ${B.ACCS[t.acc]}` +
      (t.species === 15 ? `<br/><b style="color:var(--berry)">THE SIXTEENTH: around 3% of mints. Treasure.</b>` : "");
    document.querySelectorAll("[data-k]").forEach((el) => {
      const k = el.dataset.k;
      el.classList.toggle("on", Number(el.dataset.v) === t[k]);
    });
  }
  function chips(id, key, names) {
    $(id).innerHTML = names.map((n, i) => `<button class="chip" data-k="${key}" data-v="${i}">${n}</button>`).join("");
  }
  function swatches(id, key, colors) {
    $(id).innerHTML = colors.map((c, i) => `<button class="swatch" data-k="${key}" data-v="${i}" style="background:${c}" aria-label="color ${i + 1}"></button>`).join("");
  }
  chips("ctl-species", "species", B.SPECIES);
  swatches("ctl-fur", "fur", B.FURS);
  swatches("ctl-bg", "bg", B.BGS);
  chips("ctl-eyes", "eyes", B.EYES);
  chips("ctl-mouth", "mouth", B.MOUTHS);
  chips("ctl-acc", "acc", B.ACCS);
  document.querySelectorAll("[data-k]").forEach((el) => {
    el.addEventListener("click", () => { t[el.dataset.k] = Number(el.dataset.v); render(); });
  });
  $("btn-random").addEventListener("click", () => {
    const seed = Math.floor(Math.random() * 100000000);
    t = B.fromSeed(seed);
    render();
    toast(t.species === 15 ? "You rolled The Sixteenth. Extremely rare hands." : "New beast: " + B.SPECIES[t.species]);
  });
  $("btn-save").addEventListener("click", () => {
    const svg = B.beastSVG(t);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 800; c.height = 800;
      c.getContext("2d").drawImage(img, 0, 0, 800, 800);
      const a = document.createElement("a");
      a.download = "my-beast16.png";
      a.href = c.toDataURL("image/png");
      a.click();
      toast("Saved. Share it and tag the pack.");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  });
  render();
})();
