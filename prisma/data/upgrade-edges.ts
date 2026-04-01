// prisma/data/upgrade-edges.ts
// Edges are curated manually — only add an edge if the target is NOTABLY better
// than the source in the specified category. "Similar" = marginally better or
// same tier different style. Don't add X-Mid → X-Mid Pro AND X-Mid → X-Mid Pro 2;
// pick the most direct next step.

export type EdgeType = 'quality' | 'value' | 'alternative' | 'similar';

export interface UpgradeEdge {
  from: string;   // must match GearItem.name exactly
  to: string;     // must match GearItem.name exactly
  type: EdgeType;
  notes?: string;
}

// ── Edge type guide ───────────────────────────────────────────────────────────
// quality      → meaningfully better in its primary purpose (lighter, warmer, stronger)
// value        → similar quality but better price-to-performance
// alternative  → lateral move, different design philosophy (e.g. tent → tarp)
// similar      → marginally better, same category and style, worth knowing about

export const tentEdges: UpgradeEdge[] = [
  // Budget → Mid UL → UL thru-hiker progression
  {
    from: 'Naturehike Cloud-Up 2',
    to: '3F UL Gear Lanshan 2 Pro',
    type: 'quality',
    notes: 'Silpoly vs silnylon — doesn\'t sag when wet, slightly lighter',
  },
  {
    from: '3F UL Gear Lanshan 2 Pro',
    to: 'Durston X-Mid 2',
    type: 'quality',
    notes: 'Dramatically better geometry, weather protection, and ease of pitch for similar weight',
  },
  {
    from: 'Durston X-Mid 2',
    to: 'Durston X-Mid Pro 2',
    type: 'quality',
    notes: 'DCF cuts weight roughly in half — significant jump in cost',
  },

  // Freestanding path
  {
    from: 'Macpac Duolight 2P V4',
    to: 'NEMO Dragonfly OSMO 2P',
    type: 'quality',
    notes: 'Lighter freestanding with OSMO fabric and better vestibules',
  },
  {
    from: 'NEMO Dragonfly OSMO 2P',
    to: 'NEMO Hornet OSMO 2P',
    type: 'quality',
    notes: 'Big weight saving — trade some liveability for grams',
  },

  // Alternative style
  {
    from: 'Durston X-Mid 2',
    to: 'Hyperlite Mountain Gear UltaMid 2',
    type: 'alternative',
    notes: 'Pyramid vs trekking pole — more weather-proof, no inner by default',
  },
];

export const sleepingBagEdges: UpgradeEdge[] = [
  // Synthetic → Down
  {
    from: 'Zorali Apex Eco Sleeping Bag 4°C',
    to: 'Alton Ultralight Sleeping Bag 0°C',
    type: 'quality',
    notes: 'Down is lighter and more packable for same insulation level',
  },

  // Warmth progression
  {
    from: 'Alton Ultralight Sleeping Bag 0°C',
    to: 'Alton Ultralight Sleeping Bag -5°C',
    type: 'quality',
    notes: 'Same bag, more fill — for AU alpine and shoulder season',
  },

  // Bag → Quilt alternative
  {
    from: 'Alton Ultralight Sleeping Bag 0°C',
    to: 'Neve Gear Waratah Quilt -2°C',
    type: 'alternative',
    notes: 'Quilt is lighter and easier to temp-regulate; needs a good pad',
  },
  {
    from: 'Neve Gear Waratah Quilt -2°C',
    to: 'Neve Gear Waratah Pro Quilt -2°C',
    type: 'quality',
    notes: 'Pro adds ¼-zip footbox for better draft control on cold nights',
  },
];

export const sleepingPadEdges: UpgradeEdge[] = [
  // Foam → Air progression
  {
    from: 'Thermarest Z-Lite SOL Regular',
    to: 'Alton Ultralight Insulated Sleeping Mat R4',
    type: 'quality',
    notes: 'Air pad: far more comfortable and lighter for the same warmth',
  },

  // R-value progression
  {
    from: 'Alton Ultralight Insulated Sleeping Mat R4',
    to: 'NEMO Tensor All Season Insulated Sleeping Pad',
    type: 'quality',
    notes: 'R5.4 vs R4.0, quieter Spaceframe™ baffles',
  },
  {
    from: 'NEMO Tensor All Season Insulated Sleeping Pad',
    to: 'NEMO Tensor Extreme Conditions Sleeping Pad',
    type: 'quality',
    notes: 'R8.5 — for alpine and winter AU conditions',
  },
];

export const backpackEdges: UpgradeEdge[] = [
  // Volume progression
  {
    from: 'Osprey Exos 48',
    to: 'Osprey Exos Pro 55',
    type: 'quality',
    notes: 'Sub-1kg, UHMWPE fabric — lighter for similar volume',
  },

  // Framed → Frameless
  {
    from: 'Osprey Exos Pro 55',
    to: 'Gossamer Gear Gorilla 40',
    type: 'alternative',
    notes: 'Frameless — lighter but less comfortable with heavy loads',
  },
  {
    from: 'Gossamer Gear Gorilla 40',
    to: 'Hyperlite Mountain Gear 3400 Southwest',
    type: 'quality',
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