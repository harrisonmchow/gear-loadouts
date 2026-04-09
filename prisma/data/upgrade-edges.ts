// prisma/data/upgrade-edges.ts
// Edges are curated manually — only add an edge if the target is NOTABLY better
// than the source in the specified category. "Similar" = marginally better or
// same tier different style. Don't add X-Mid → X-Mid Pro AND X-Mid → X-Mid Pro 2;
// pick the most direct next step.

export type EdgeType = 'quality' | 'value' | 'alternative' | 'similar';

// ── Path guide ────────────────────────────────────────────────────────────────
// budget       → entry-level, best bang-for-buck gear (starting point for all)
// ultralight   → optimise for weight above all else
// comfort      → optimise for liveability, space, features
// An edge can sit on multiple paths (e.g. a crossover from comfort → ultralight).
export type GearPath = 'budget' | 'ultralight' | 'comfort';

export interface UpgradeEdge {
  from: string;   // must match GearItem.name exactly
  to: string;     // must match GearItem.name exactly
  type: EdgeType;
  path: GearPath[];
  notes?: string;
}

// ── Edge type guide ───────────────────────────────────────────────────────────
// quality      → meaningfully better in its primary purpose (lighter, warmer, stronger)
// value        → similar quality but better price-to-performance
// alternative  → lateral move, different design philosophy (e.g. tent → tarp)
// similar      → marginally better, same category and style, worth knowing about

export const tentEdges: UpgradeEdge[] = [
  // ── Budget entry points ────────────────────────────────────────────────────
  {
    from: 'Naturehike Mongar 2',
    to: '3F UL Gear Lanshan 2 Pro',
    type: 'alternative',
    path: ['budget'],
    notes: 'Silpoly vs silnylon — doesn\'t sag when wet, slightly lighter. Good introduction to trekking pole tents',
  },
  {
    from: 'Naturehike Mongar 2',
    to: 'Macpac Duolight 2P V4',
    type: 'alternative',
    path: ['budget'],
    notes: 'Freestanding AU-available option — heavier but easier to pitch',
  },

  // ── Budget → Ultralight branch ─────────────────────────────────────────────
  {
    from: '3F UL Gear Lanshan 2 Pro',
    to: 'Durston X-Mid 2',
    type: 'quality',
    path: ['ultralight', 'comfort'],
    notes: 'Dramatically better geometry, weather protection, and ease of pitch for similar weight',
  },
  {
    from: 'Durston X-Mid 2',
    to: 'Durston X-Mid Pro 2',
    type: 'quality',
    path: ['ultralight'],
    notes: 'DCF cuts weight roughly in half — significant jump in cost',
  },
  {
    from: 'Durston X-Mid 2',
    to: 'Hyperlite Mountain Gear UltaMid 2',
    type: 'alternative',
    path: ['ultralight'],
    notes: 'Pyramid vs trekking pole — more weather-proof, no inner by default',
  },

  // ── Budget → Comfort branch ────────────────────────────────────────────────
  {
    from: 'Macpac Duolight 2P V4',
    to: 'NEMO Dragonfly OSMO 2P',
    type: 'quality',
    path: ['comfort'],
    notes: 'Lighter freestanding with OSMO fabric and better vestibules',
  },
  {
    from: 'NEMO Dragonfly OSMO 2P',
    to: 'NEMO Hornet OSMO 2P',
    type: 'quality',
    path: ['comfort', 'ultralight'],
    notes: 'Big weight saving — trade some liveability for grams',
  },

  // ── Crossover: Comfort → Ultralight ────────────────────────────────────────
  {
    from: 'NEMO Hornet OSMO 2P',
    to: 'Durston X-Mid 2',
    type: 'alternative',
    path: ['ultralight'],
    notes: 'Semi free standing to trekking pole — crossover into UL path',
  },
];

export const sleepingBagEdges: UpgradeEdge[] = [
  // ── Budget entry ───────────────────────────────────────────────────────────
  {
    from: 'Zorali Apex Eco Sleeping Bag 4°C',
    to: 'Alton Ultralight Sleeping Bag 0°C',
    type: 'quality',
    path: ['budget'],
    notes: 'Down is lighter and more packable for same insulation level',
  },

  // ── Comfort branch ─────────────────────────────────────────────────────────
  {
    from: 'Alton Ultralight Sleeping Bag 0°C',
    to: 'Alton Ultralight Sleeping Bag -5°C',
    type: 'quality',
    path: ['comfort'],
    notes: 'Same bag, more fill — for AU alpine and shoulder season',
  },

  // ── Ultralight branch ──────────────────────────────────────────────────────
  {
    from: 'Alton Ultralight Sleeping Bag 0°C',
    to: 'Neve Gear Waratah Quilt -2°C',
    type: 'alternative',
    path: ['ultralight'],
    notes: 'Quilt is lighter and easier to temp-regulate; needs a good pad',
  },
  {
    from: 'Neve Gear Waratah Quilt -2°C',
    to: 'Neve Gear Waratah Pro Quilt -2°C',
    type: 'quality',
    path: ['ultralight'],
    notes: 'Pro adds ¼-zip footbox for better draft control on cold nights',
  },
];

export const sleepingPadEdges: UpgradeEdge[] = [
  // ── Budget entry ───────────────────────────────────────────────────────────
  {
    from: 'Thermarest Z-Lite SOL Regular',
    to: 'Alton Ultralight Insulated Sleeping Mat R4',
    type: 'quality',
    path: ['budget'],
    notes: 'Air pad: far more comfortable and lighter for the same warmth',
  },

  // ── Comfort branch ─────────────────────────────────────────────────────────
  {
    from: 'Alton Ultralight Insulated Sleeping Mat R4',
    to: 'NEMO Tensor All Season Insulated Sleeping Mat Regular Mummy',
    type: 'quality',
    path: ['comfort'],
    notes: 'R5.4 vs R4.0, quieter Spaceframe™ baffles',
  },
  {
    from: 'NEMO Tensor All Season Insulated Sleeping Mat Regular Mummy',
    to: 'NEMO Tensor Extreme Conditions Sleeping Mat Regular Mummy',
    type: 'quality',
    path: ['comfort'],
    notes: 'R8.5 — for alpine and winter AU conditions',
  },
];

export const backpackEdges: UpgradeEdge[] = [
  // ── Budget → Comfort ───────────────────────────────────────────────────────
  {
    from: 'Osprey Exos 48',
    to: 'Osprey Exos Pro 55',
    type: 'quality',
    path: ['comfort'],
    notes: 'Sub-1kg, UHMWPE fabric — lighter for similar volume',
  },

  // ── Comfort → Ultralight crossover ─────────────────────────────────────────
  {
    from: 'Osprey Exos Pro 55',
    to: 'Gossamer Gear Gorilla 40L',
    type: 'alternative',
    path: ['ultralight'],
    notes: 'Frameless — lighter but less comfortable with heavy loads',
  },
  {
    from: 'Gossamer Gear Gorilla 40L',
    to: 'Hyperlite Mountain Gear 3400 Southwest 55L',
    type: 'quality',
    path: ['ultralight'],
    notes: 'DCF is waterproof and lighter — big price jump',
  },
];

// Re-export all edges together for the seed script
export const allUpgradeEdges = [
  ...tentEdges,
  ...sleepingBagEdges,
  ...sleepingPadEdges,
  ...backpackEdges,
];