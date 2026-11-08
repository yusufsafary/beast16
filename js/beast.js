// Beast16 character engine: 16 spesies baby beast, SVG prosedural.
// Dipakai galeri, trait mixer, dan nanti generator metadata NFT (seed on-chain).
(function () {
  const FURS = ["#F7D9B0", "#E8A05C", "#9C6644", "#8FBF6B", "#B5C99A", "#9AD0EC", "#C3A6E8", "#F2A7BB", "#FFB59E", "#A8E6CF", "#FFD93D", "#CFC8BD"];
  const BGS = ["#FFE8C2", "#DFF3D8", "#D9EDFB", "#FDE3EE", "#EFE7FB", "#FFF3B0", "#E2F5E9", "#FFE0D1"];
  const SPECIES = ["Cub", "Fang Pup", "Mini Dragon", "Oni Kid", "Longear", "Cat Beast", "Fox Kit", "Panda Beast", "Koala Beast", "Piggy", "Froggy", "Owl Beast", "Batty", "Deer Beast", "Rhino Beast", "The Sixteenth"];
  const EYES = ["Round", "Happy", "Sparkle", "Sleepy", "Wink", "Brave"];
  const MOUTHS = ["Fang", "Double Fang", "Grin", "Tiny O", "Tongue", "Smirk"];
  const ACCS = ["None", "Leaf", "Bandana", "Bell Collar", "Flower", "Star Patch"];

  function shade(hex, f) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 255) * f)));
    const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 255) * f)));
    const b = Math.min(255, Math.max(0, Math.round((n & 255) * f)));
    return `rgb(${r},${g},${b})`;
  }

  function earsBack(sp, fur, dark, light) {
    switch (sp) {
      case 0: return `<circle cx="112" cy="128" r="34" fill="${fur}"/><circle cx="112" cy="128" r="17" fill="${light}"/><circle cx="288" cy="128" r="34" fill="${fur}"/><circle cx="288" cy="128" r="17" fill="${light}"/>`;
      case 1: return `<path d="M96 142 L84 62 L158 100 Z" fill="${fur}"/><path d="M100 128 L94 84 L136 106 Z" fill="${light}"/><path d="M304 142 L316 62 L242 100 Z" fill="${fur}"/><path d="M300 128 L306 84 L264 106 Z" fill="${light}"/>`;
      case 2: return `<path d="M104 118 Q74 62 108 40 Q128 74 128 108 Z" fill="#FFC53D"/><path d="M296 118 Q326 62 292 40 Q272 74 272 108 Z" fill="#FFC53D"/><circle cx="200" cy="96" r="9" fill="#FFC53D"/>`;
      case 3: return `<path d="M200 30 Q218 74 200 108 Q182 74 200 30 Z" fill="#E4572E"/>`;
      case 4: return `<ellipse cx="118" cy="72" rx="22" ry="58" fill="${fur}"/><ellipse cx="118" cy="78" rx="10" ry="38" fill="${light}"/><ellipse cx="282" cy="72" rx="22" ry="58" fill="${fur}"/><ellipse cx="282" cy="78" rx="10" ry="38" fill="${light}"/>`;
      case 5: return `<path d="M100 138 L106 58 L172 104 Z" fill="${fur}"/><path d="M112 122 L116 80 L152 106 Z" fill="${light}"/><path d="M300 138 L294 58 L228 104 Z" fill="${fur}"/><path d="M288 122 L284 80 L248 106 Z" fill="${light}"/>`;
      case 6: return `<path d="M92 146 L78 44 L170 96 Z" fill="${fur}"/><path d="M102 126 L94 68 L148 100 Z" fill="#FFF6E8"/><path d="M308 146 L322 44 L230 96 Z" fill="${fur}"/><path d="M298 126 L306 68 L252 100 Z" fill="#FFF6E8"/>`;
      case 7: return `<circle cx="112" cy="126" r="33" fill="#3B2F2A"/><circle cx="288" cy="126" r="33" fill="#3B2F2A"/>`;
      case 8: return `<circle cx="82" cy="196" r="42" fill="${fur}"/><circle cx="82" cy="196" r="42" fill="none" stroke="${light}" stroke-width="10" stroke-dasharray="7 9"/><circle cx="318" cy="196" r="42" fill="${fur}"/><circle cx="318" cy="196" r="42" fill="none" stroke="${light}" stroke-width="10" stroke-dasharray="7 9"/>`;
      case 9: return `<ellipse cx="106" cy="140" rx="34" ry="20" fill="${dark}" transform="rotate(38 106 140)"/><ellipse cx="294" cy="140" rx="34" ry="20" fill="${dark}" transform="rotate(-38 294 140)"/>`;
      case 10: return `<circle cx="140" cy="98" r="24" fill="${fur}"/><circle cx="260" cy="98" r="24" fill="${fur}"/>`;
      case 11: return `<path d="M116 116 L96 66 L150 92 Z" fill="${dark}"/><path d="M284 116 L304 66 L250 92 Z" fill="${dark}"/>`;
      case 12: return `<path d="M98 150 L66 66 L118 84 L146 52 L156 108 Z" fill="${dark}"/><path d="M302 150 L334 66 L282 84 L254 52 L244 108 Z" fill="${dark}"/>`;
      case 13: return `<path d="M118 118 Q96 58 118 34 M118 84 Q96 76 84 84 M118 84 Q138 70 150 74" stroke="#8A5A33" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M282 118 Q304 58 282 34 M282 84 Q304 76 316 84 M282 84 Q262 70 250 74" stroke="#8A5A33" stroke-width="11" fill="none" stroke-linecap="round"/>`;
      case 14: return `<circle cx="116" cy="132" r="24" fill="${fur}"/><circle cx="116" cy="132" r="11" fill="${light}"/><circle cx="284" cy="132" r="24" fill="${fur}"/><circle cx="284" cy="132" r="11" fill="${light}"/>`;
      case 15: return `<ellipse cx="200" cy="86" rx="86" ry="20" fill="none" stroke="#FFC53D" stroke-width="7"/><path d="M200 8 L214 44 L188 44 L200 22 L186 50 L172 30 L188 62 L200 44 L214 62 L228 30 L214 50 L226 44 Z" fill="#FFC53D"/>`;
      default: return "";
    }
  }
  function faceExtra(sp, fur, dark, light) {
    let s = "";
    if (sp === 6) s += `<path d="M70 226 Q52 262 78 288 Q92 258 88 232 Z" fill="${fur}"/><path d="M330 226 Q348 262 322 288 Q308 258 312 232 Z" fill="${fur}"/>`;
    if (sp === 7) s += `<ellipse cx="152" cy="208" rx="30" ry="24" fill="#3B2F2A" opacity="0.85"/><ellipse cx="248" cy="208" rx="30" ry="24" fill="#3B2F2A" opacity="0.85"/>`;
    if (sp === 9) s += `<ellipse cx="200" cy="252" rx="30" ry="21" fill="${light}"/><circle cx="189" cy="252" r="5" fill="${dark}"/><circle cx="211" cy="252" r="5" fill="${dark}"/>`;
    if (sp === 11) s += `<path d="M140 168 Q200 146 260 168 L260 182 Q200 162 140 182 Z" fill="${dark}" opacity="0.5"/>`;
    if (sp === 14) s += `<path d="M200 196 L212 232 L188 232 Z" fill="#EDE6DA"/>`;
    if (sp === 15) s += `<path d="M84 130 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#FFC53D"/><path d="M308 108 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#FFC53D"/>`;
    return s;
  }
  function eyesSvg(kind) {
    const ink = "#22301F";
    switch (kind) {
      case 0: return `<circle cx="152" cy="212" r="13" fill="${ink}"/><circle cx="248" cy="212" r="13" fill="${ink}"/><circle cx="157" cy="207" r="4.5" fill="#fff"/><circle cx="253" cy="207" r="4.5" fill="#fff"/>`;
      case 1: return `<path d="M136 216 Q152 198 168 216" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M232 216 Q248 198 264 216" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
      case 2: return `<path d="M152 198 l4.5 9.5 10.5 1.5 -7.6 7.4 1.8 10.4 -9.2 -4.9 -9.2 4.9 1.8 -10.4 -7.6 -7.4 10.5 -1.5 Z" fill="${ink}"/><path d="M248 198 l4.5 9.5 10.5 1.5 -7.6 7.4 1.8 10.4 -9.2 -4.9 -9.2 4.9 1.8 -10.4 -7.6 -7.4 10.5 -1.5 Z" fill="${ink}"/>`;
      case 3: return `<path d="M136 210 Q152 222 168 210" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M232 210 Q248 222 264 210" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
      case 4: return `<path d="M136 214 Q152 200 168 214" stroke="${ink}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="248" cy="212" r="13" fill="${ink}"/><circle cx="253" cy="207" r="4.5" fill="#fff"/>`;
      case 5: return `<path d="M134 190 L168 198" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><path d="M266 190 L232 198" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><circle cx="152" cy="214" r="12" fill="${ink}"/><circle cx="248" cy="214" r="12" fill="${ink}"/>`;
      default: return "";
    }
  }
  function mouthSvg(kind) {
    const ink = "#22301F";
    switch (kind) {
      case 0: return `<path d="M176 262 Q200 282 224 262" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M210 272 L222 270 L216 288 Z" fill="#fff" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`;
      case 1: return `<path d="M174 260 Q200 284 226 260" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M180 268 L190 266 L184 282 Z" fill="#fff" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><path d="M220 268 L210 266 L216 282 Z" fill="#fff" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`;
      case 2: return `<rect x="172" y="254" width="56" height="26" rx="12" fill="#fff" stroke="${ink}" stroke-width="5"/><line x1="189" y1="256" x2="189" y2="278" stroke="${ink}" stroke-width="4"/><line x1="206" y1="256" x2="206" y2="278" stroke="${ink}" stroke-width="4"/>`;
      case 3: return `<circle cx="200" cy="268" r="10" fill="${ink}"/>`;
      case 4: return `<path d="M176 260 Q200 280 224 260" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M188 274 Q200 302 214 276 Q202 268 188 274 Z" fill="#F2849E" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/>`;
      case 5: return `<path d="M182 268 Q206 280 226 258" stroke="${ink}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
      default: return "";
    }
  }
  function accSvg(kind, dark) {
    switch (kind) {
      case 1: return `<path d="M238 96 Q268 66 292 84 Q272 116 240 112 Q232 104 238 96 Z" fill="#57A773"/><path d="M242 104 Q262 92 284 86" stroke="#2F7A4C" stroke-width="4" fill="none"/>`;
      case 2: return `<path d="M96 168 Q200 96 304 168 L304 138 Q200 70 96 138 Z" fill="#E4572E"/><circle cx="200" cy="106" r="10" fill="#FFC53D"/>`;
      case 3: return `<path d="M128 306 Q200 336 272 306 L272 322 Q200 352 128 322 Z" fill="#E4572E"/><circle cx="200" cy="338" r="13" fill="#FFC53D" stroke="#C9930A" stroke-width="3"/>`;
      case 4: return `<g transform="translate(288 118)"><circle r="9" fill="#F2A7BB"/><circle cx="13" cy="4" r="9" fill="#F2A7BB"/><circle cx="4" cy="13" r="9" fill="#F2A7BB"/><circle cx="-8" cy="8" r="9" fill="#F2A7BB"/><circle cx="2" cy="5" r="5" fill="#FFC53D"/></g>`;
      case 5: return `<path d="M112 268 l4.5 9.5 10.5 1.5 -7.6 7.4 1.8 10.4 -9.2 -4.9 -9.2 4.9 1.8 -10.4 -7.6 -7.4 10.5 -1.5 Z" fill="#FFC53D" stroke="#C9930A" stroke-width="2.5"/>`;
      default: return "";
    }
  }

  function beastSVG(t) {
    const fur = FURS[t.fur % FURS.length];
    const dark = shade(fur, 0.72), light = shade(fur, 1.16);
    const bg = BGS[t.bg % BGS.length];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
<rect width="400" height="400" fill="${bg}"/>
<circle cx="52" cy="52" r="7" fill="#ffffff" opacity="0.55"/><circle cx="348" cy="44" r="5" fill="#ffffff" opacity="0.55"/><circle cx="362" cy="330" r="8" fill="#ffffff" opacity="0.5"/><circle cx="38" cy="318" r="5" fill="#ffffff" opacity="0.5"/><circle cx="330" cy="150" r="4" fill="#ffffff" opacity="0.45"/>
${earsBack(t.species, fur, dark, light)}
<ellipse cx="200" cy="216" rx="120" ry="106" fill="${fur}"/>
<ellipse cx="200" cy="262" rx="66" ry="52" fill="${light}" opacity="0.75"/>
${faceExtra(t.species, fur, dark, light)}
<ellipse cx="118" cy="252" rx="17" ry="11" fill="#F49FB4" opacity="0.8"/><ellipse cx="282" cy="252" rx="17" ry="11" fill="#F49FB4" opacity="0.8"/>
${t.species === 9 ? `<circle cx="152" cy="206" r="12" fill="#22301F"/><circle cx="248" cy="206" r="12" fill="#22301F"/><circle cx="157" cy="201" r="4" fill="#fff"/><circle cx="253" cy="201" r="4" fill="#fff"/>` : eyesSvg(t.eyes)}
${t.species === 9 ? "" : mouthSvg(t.mouth)}
${accSvg(t.acc, dark)}
</svg>`;
  }

  function rng(seed) { let a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function fromSeed(seed) {
    const r = rng(seed * 2654435761 % 4294967296);
    const roll = Math.floor(r() * 1000);
    let species;
    if (roll >= 970) species = 15; else species = Math.floor(r() * 15);
    return { species, fur: Math.floor(r() * FURS.length), bg: Math.floor(r() * BGS.length), eyes: Math.floor(r() * EYES.length), mouth: Math.floor(r() * MOUTHS.length), acc: Math.floor(r() * ACCS.length) };
  }
  function clsOf(t) { return t.species === 15 ? "Apex" : "Wild Pack"; }

  window.BEAST = { FURS, BGS, SPECIES, EYES, MOUTHS, ACCS, beastSVG, fromSeed, clsOf };
})();
