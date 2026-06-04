import type { WhereToBuyEntry } from './shared';

export interface CookPotSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "pot" | "pan";
  volumeMl?: number;
  notes?: string;
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
}

export const cookPots: CookPotSeedItem[] = [
  {
    name: "TOAKS Titanium 750ml Pot",
    brand: "TOAKS",
    weightGrams: 103,
    priceCents: 4495,
    currency: "AUD",
    href: "https://ultralightgear.com.au/products/toaks-titanium-750ml-pot-with-lid",
    inStock: true,
    type: "pot",
    volumeMl: 750,
    notes: "Titanium. 103g with lid. Popular UL choice. Fits 110g canister inside.",
    whereToBuy: [
      { retailer: "Ultralight Gear", url: "https://ultralightgear.com.au/products/toaks-titanium-750ml-pot-with-lid", priceCents: 4495, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/toaks-titanium-toaks-titanium-pot-with-lid-750ml", priceCents: 4495, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/products/toaks_750.jpg?v=1755571448",
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/products/toaks_750_1.jpg?v=1755571448",
    ],
  },
  {
    name: "TOAKS Titanium 550ml Pot",
    brand: "TOAKS",
    weightGrams: 72,
    priceCents: 4595,
    currency: "AUD",
    href: "https://ultralightgear.com.au/products/toaks-titanium-550ml-pot-with-lid",
    inStock: true,
    type: "pot",
    volumeMl: 550,
    notes: "Minimal titanium cup/pot. Great for solo boil-only setups. 72g with lid.",
    whereToBuy: [
      { retailer: "Ultralight Gear", url: "https://ultralightgear.com.au/products/toaks-titanium-550ml-pot-with-lid", priceCents: 4595, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/products/TOAKS550MLPOT.jpg?v=1755571376",
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/products/9594A559-2F36-4E81-87EB-CCD68811CD4E.jpg?v=1755571377",
    ],
  },
  {
    name: "MSR Trail Mini Solo Cook Set",
    brand: "MSR",
    weightGrams: 230,
    priceCents: 9990,
    currency: "AUD",
    href: "https://www.snowys.com.au/trail-mini-solo-cook-set",
    inStock: true,
    type: "pot",
    volumeMl: 750,
    notes: "Hard-anodized aluminium. 750ml pot + lid. Affordable and durable.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/trail-mini-solo-cook-set", priceCents: 9990, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1270377_trail-mini-solo-cook-set.jpeg",
      "https://cdn.snowys.com.au/content/images/thumbs/0038971_trail-mini-solo-cook-set.jpeg",
    ],
  },
];
