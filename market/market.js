// Beast16 Market: escrow trading untuk NFT Beast16 (pola VerseMarket).
// KONFIGURASI LAUNCH: isi alamat kontrak saat koleksi rilis, halaman langsung aktif.
const CONFIG = {
  nft: "0xaCeF3B62B958ED7F49dFc73885609b4d270B9bD0",            // Beast16 NFT contract (diisi saat launch)
  market: "0x50bCbE0Adb0f1F731e59a0B6C74e94407D8b202E",         // Beast16 Market contract (diisi saat launch)
  chainId: 56,
  rpcs: [
    "https://bsc-dataseed.binance.org",
    "https://bsc-mainnet.public.blastapi.io",
    "https://bsc-rpc.publicnode.com",
    "https://bsc-dataseed1.binance.org",
  ],
  metadataBase: "https://beast16.fun/metadata/",
};
const SEL = {
  listedIds: "0x023bea53", listingOf: "0xe3404981", listedCount: "0xf36065b3",
  list: "0x50fd7367", buy: "0xd96a094a", delist: "0x964bc33f",
  ownerOf: "0x6352211e", tokenURI: "0xc87b56dd", approve: "0x095ea7b3", getApproved: "0x081812fc",
};
const LIVE = CONFIG.nft && CONFIG.market;
const $ = (id) => document.getElementById(id);
const pad = (hex) => hex.replace(/^0x/, "").padStart(64, "0");
const encAddr = (a) => pad(a.toLowerCase());
const encUint = (n) => pad(BigInt(n).toString(16));
let account = null;

function status(msg, isErr) {
  const bar = $("statusbar");
  bar.textContent = msg;
  bar.classList.add("show");
  bar.classList.toggle("err", !!isErr);
  clearTimeout(bar._t);
  bar._t = setTimeout(() => bar.classList.remove("show"), 6000);
}
async function rpcCall(to, data, value) {
  const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to, data, ...(value ? { value } : {}) }, "latest"] });
  for (const url of CONFIG.rpcs) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 7000);
      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body, signal: ctrl.signal });
      clearTimeout(t);
      const j = await res.json();
      if (j && j.result) return j.result;
    } catch (e) { /* coba RPC berikutnya */ }
  }
  return null;
}
async function readProvider() { return new ethers.providers.JsonRpcProvider(CONFIG.rpcs[0]); }

async function loadListings() {
  const grid = $("listings");
  const empty = $("listings-empty");
  if (!LIVE) { grid.innerHTML = ""; empty.style.display = "block"; $("st-listed").textContent = "0"; $("st-floor").textContent = "·"; return; }
  const countRes = await rpcCall(CONFIG.market, SEL.listedCount);
  const count = countRes ? Number(BigInt(countRes)) : 0;
  $("st-listed").textContent = String(count);
  if (!count) { grid.innerHTML = ""; empty.style.display = "block"; $("st-floor").textContent = "·"; return; }
  const idsRes = await rpcCall(CONFIG.market, SEL.listedIds);
  let ids = [];
  if (idsRes && idsRes.length > 130) {
    const raw = idsRes.slice(2);
    const len = Number(BigInt("0x" + raw.slice(64, 128)));
    for (let i = 0; i < len; i++) ids.push(Number(BigInt("0x" + raw.slice(128 + i * 64, 192 + i * 64))));
  }
  const rows = [];
  for (const id of ids) {
    const l = await rpcCall(CONFIG.market, SEL.listingOf + encUint(id));
    if (!l || l.length < 2 + 64 * 3) continue;
    const seller = "0x" + l.slice(2 + 24, 2 + 64);
    const price = BigInt("0x" + l.slice(2 + 64, 2 + 128));
    let img = "";
    try {
      const uriRes = await rpcCall(CONFIG.nft, SEL.tokenURI + encUint(id));
      if (uriRes) {
        const bytes = ethers.utils.arrayify("0x" + uriRes.slice(2 + 128, 2 + 128 + Number(BigInt("0x" + uriRes.slice(2 + 64, 2 + 128))) * 2));
        let uri = new TextDecoder().decode(bytes);
        if (uri.startsWith("ipfs://")) uri = "https://ipfs.io/ipfs/" + uri.slice(7);
        const meta = await (await fetch(uri)).json();
        img = meta.image || "";
        if (img.startsWith("ipfs://")) img = "https://ipfs.io/ipfs/" + img.slice(7);
      }
    } catch (e) { /* gambar opsional */ }
    rows.push({ id, seller, price, img });
  }
  rows.sort((a, b) => (a.price < b.price ? -1 : 1));
  if (rows.length) $("st-floor").textContent = ethers.utils.formatEther(rows[0].price);
  empty.style.display = rows.length ? "none" : "block";
  grid.innerHTML = rows.map((r) => {
    const mine = account && r.seller.toLowerCase() === account.toLowerCase();
    return `<div class="card">
      ${r.img ? `<img src="${r.img}" alt="Beast #${r.id}" loading="lazy"/>` : ""}
      <div class="body">
        <div class="row"><span class="nm">Beast #${r.id}</span><span class="price">${ethers.utils.formatEther(r.price)} BNB</span></div>
        <p class="meta">Seller ${r.seller.slice(0, 6)}...${r.seller.slice(-4)}</p>
        ${mine
          ? `<button class="btn block" style="margin-top:12px" onclick="delistBeast(${r.id})">Delist (free)</button>`
          : `<button class="btn btn-orange block" style="margin-top:12px" onclick="buyBeast(${r.id}, '${r.price.toString()}')">Buy now</button>`}
      </div>
    </div>`;
  }).join("");
}

async function connect() {
  if (!LIVE) { status("Trading opens at launch. Contracts are not live yet."); return null; }
  if (!window.ethereum) { status("No wallet found. Open this page inside a wallet browser.", true); return null; }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const net = await provider.getNetwork();
  if (net.chainId !== CONFIG.chainId) {
    try { await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x38" }] }); }
    catch (e) { status("Please switch your wallet to BNB Smart Chain.", true); return null; }
  }
  account = await provider.getSigner().getAddress();
  $("btn-connect").textContent = account.slice(0, 6) + "..." + account.slice(-4);
  return provider.getSigner();
}
async function sendTx(to, data, value, okMsg) {
  const signer = await connect();
  if (!signer) return;
  try {
    status("Confirm the transaction in your wallet...");
    const tx = await signer.sendTransaction({ to, data, ...(value ? { value } : {}) });
    status("Sent. Waiting for confirmation...");
    await tx.wait();
    status(okMsg);
    loadListings();
  } catch (e) { status("Transaction cancelled or failed.", true); }
}
window.buyBeast = (id, price) => sendTx(CONFIG.market, SEL.buy + encUint(id), ethers.BigNumber.from(price), `Beast #${id} is yours. Welcome to the pack.`);
window.delistBeast = (id) => sendTx(CONFIG.market, SEL.delist + encUint(id), null, `Beast #${id} delisted.`);
$("btn-connect").addEventListener("click", connect);
$("btn-refresh").addEventListener("click", () => { loadListings(); status(LIVE ? "Listings refreshed." : "Trading opens at launch."); });
$("btn-approve").addEventListener("click", async () => {
  if (!LIVE) { status("Trading opens at launch. Contracts are not live yet."); return; }
  const id = $("in-token").value.trim();
  if (!id) { status("Enter your beast token ID first.", true); return; }
  const signer = await connect();
  if (!signer) return;
  const ownerRes = await rpcCall(CONFIG.nft, SEL.ownerOf + encUint(id));
  const owner = ownerRes ? "0x" + ownerRes.slice(26) : "";
  if (!account || owner.toLowerCase() !== account.toLowerCase()) { status("That beast is not in your connected wallet.", true); return; }
  sendTx(CONFIG.nft, SEL.approve + encAddr(CONFIG.market) + encUint(id), null, "Market approved. Now list your beast.");
});
$("btn-list").addEventListener("click", async () => {
  if (!LIVE) { status("Trading opens at launch. Contracts are not live yet."); return; }
  const id = $("in-token").value.trim();
  const priceTxt = $("in-price").value.trim();
  if (!id || !priceTxt) { status("Enter token ID and price first.", true); return; }
  let price;
  try { price = ethers.utils.parseEther(priceTxt); } catch (e) { status("Price format not valid.", true); return; }
  const appr = await rpcCall(CONFIG.nft, SEL.getApproved + encUint(id));
  const apprAddr = appr ? "0x" + appr.slice(26) : "";
  if (apprAddr.toLowerCase() !== CONFIG.market.toLowerCase()) { status("Approve the market first (step 1).", true); return; }
  sendTx(CONFIG.market, SEL.list + encUint(id) + encUint(price.toString()), null, `Beast #${id} is now listed.`);
});
if (LIVE) $("soon").style.display = "none";
loadListings();
