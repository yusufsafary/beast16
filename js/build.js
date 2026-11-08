// Build a Beast: jelajahi 16 spesies render 3D + vibe filter.
(function () {
  const NAMES = ["Cub", "Fang Pup", "Mini Dragon", "Oni Kid", "Longear", "Cat Beast", "Fox Kit", "Panda Beast", "Koala Beast", "Piggy", "Froggy", "Owl Beast", "Batty", "Deer Beast", "Rhino Beast", "The Sixteenth"];
  const VIBES = [
    { name: "Original", css: "none" },
    { name: "Sunny", css: "saturate(1.25) brightness(1.06) sepia(0.18)" },
    { name: "Frost", css: "saturate(0.85) brightness(1.05) hue-rotate(12deg)" },
    { name: "Dream", css: "saturate(1.15) contrast(0.95) brightness(1.1) hue-rotate(-8deg)" },
  ];
  const $ = (id) => document.getElementById(id);
  let sp = 7; // Fox Kit
  let vibe = 0;
  const src = () => `img/sp-${String(sp).padStart(2, "0")}.jpg`;

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 2600);
  }
  function render() {
    const im = $("stage-img");
    im.src = src();
    im.alt = NAMES[sp - 1];
    im.style.filter = VIBES[vibe].css;
    $("traits-out").innerHTML =
      `SPECIES · ${NAMES[sp - 1]} (Nº ${String(sp).padStart(2, "0")}/16)<br/>VIBE · ${VIBES[vibe].name} · FINISH · Glossy 3D render` +
      (sp === 16 ? `<br/><b style="color:var(--berry)">THE SIXTEENTH: around 3% of mints. Treasure.</b>` : "");
    document.querySelectorAll("[data-sp]").forEach((el) => el.classList.toggle("on", Number(el.dataset.sp) === sp));
    document.querySelectorAll("[data-vibe]").forEach((el) => el.classList.toggle("on", Number(el.dataset.vibe) === vibe));
  }
  $("ctl-species").innerHTML = NAMES.map((n, i) => `<button class="chip" data-sp="${i + 1}">${n}</button>`).join("");
  $("ctl-vibe").innerHTML = VIBES.map((v, i) => `<button class="chip" data-vibe="${i}">${v.name}</button>`).join("");
  document.querySelectorAll("[data-sp]").forEach((el) => el.addEventListener("click", () => { sp = Number(el.dataset.sp); render(); }));
  document.querySelectorAll("[data-vibe]").forEach((el) => el.addEventListener("click", () => { vibe = Number(el.dataset.vibe); render(); }));
  $("btn-random").addEventListener("click", () => {
    sp = 1 + Math.floor(Math.random() * 16);
    vibe = Math.floor(Math.random() * VIBES.length);
    render();
    toast(sp === 16 ? "You rolled The Sixteenth. Extremely rare hands." : "New beast: " + NAMES[sp - 1]);
  });
  $("btn-save").addEventListener("click", async () => {
    try {
      const res = await fetch(src());
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "beast16-" + NAMES[sp - 1].toLowerCase().replace(/\s+/g, "-") + ".jpg";
      a.click();
      URL.revokeObjectURL(a.href);
      toast("Saved. Share it and tag the pack.");
    } catch (e) { toast("Save failed, long-press the image instead."); }
  });
  render();
})();
