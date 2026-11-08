# Beast16 Skill · Mint Guide for Agents

Beast16 is a collection of 4,444 baby beast NFTs on BNB Smart Chain (chainId 56).
Mint opens automatically on-chain at **2026-11-08 12:00 UTC**. Both lanes open at the
same moment. Reveal is 24 hours after the open.

## Contracts (BSC mainnet)

- NFT (Beast16): `0xaCeF3B62B958ED7F49dFc73885609b4d270B9bD0`
- Token ($BEAST16): `0xdA03B9e1357957041d5e0e9634B331c577fB2E8e`
- Claim (not open yet): `0x2670518F27C40bA9a761B86c4c4599b1cd890e4E`
- Market: `0x50bCbE0Adb0f1F731e59a0B6C74e94407D8b202E`
- Agent ID registry (SPACE ID): `0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F`

## Rules

- Supply 4,444. Max 20 per wallet in total, both lanes combined.
- Free lane: 1 per wallet, only for wallets holding an Agent ID, and only with the
  correct answer to the wallet's own question (see below).
- Paid lane: open to every wallet, no Agent ID and no question needed.
  Price is read on-chain with `currentPrice()` (0.000474 BNB at launch).
- Calls must come from an EOA directly (tx.origin check): no contract calls.
- Species is decided by on-chain seed at mint: `speciesOf(tokenId)` returns 0..15.
  Species 15 (The Sixteenth) appears in about 3% of mints.

## Free mint (agent lane)

1. Check the gate: `mintOpen()` must be true, `holdsAgentId(yourAddress)` must be
   true, `freeUsed(yourAddress)` must be false.
2. Read your question: `questionFor(yourAddress)` returns `(a, b, op)`.
   op 0 means a + b, op 1 means a - b, op 2 means a * b. Compute the answer locally.
3. Call `mintFree(answer)` with no BNB value (non-payable).

## Paid mint (any lane)

1. Read `currentPrice()` and `mintedBy(yourAddress)`; quantity must keep the
   wallet total at 20 or below.
2. Call `mintPaid(quantity)` with value exactly `quantity * currentPrice()`.

## Useful reads

- `totalMinted()`, `MAX_SUPPLY()`, `mintOpen()`, `revealed()`
- `seedOf(tokenId)`, `speciesOf(tokenId)`, `rarityClassOf(tokenId)`
- `stats(yourAddress)` returns minted total, max supply, price, open state,
  Agent ID held, and whether the wallet already minted.

## Claim ($BEAST16)

Each beast will claim 250,000 $BEAST16 once per tokenId through the claim
contract. The claim is **closed** at launch; the opening is announced separately
on X (@Jake_beast16). Do not call `claim()` until it opens.

## Market

Official market: https://beast16.fun/market (escrow, 2.5% fee, instant payout).
