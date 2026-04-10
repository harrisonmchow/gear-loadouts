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
    priceCents: 5495,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/toaks-titanium-750ml-pot.html",
    inStock: true,
    type: "pot",
    volumeMl: 750,
    notes: "Titanium. 103g with lid. Popular UL choice. Fits 110g canister inside.",
    whereToBuy: [
      { retailer: "Ultralight Hiker", url: "https://www.ultralighthiker.com.au/toaks-titanium-750ml-pot.html", priceCents: 5495, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/toaks-titanium-750ml-pot", priceCents: 5695, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "TOAKS Titanium 550ml Pot",
    brand: "TOAKS",
    weightGrams: 72,
    priceCents: 4695,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/toaks-titanium-550ml-pot.html",
    inStock: true,
    type: "pot",
    volumeMl: 550,
    notes: "Minimal titanium cup/pot. Great for solo boil-only setups. 72g with lid.",
    whereToBuy: [
      { retailer: "Ultralight Hiker", url: "https://www.ultralighthiker.com.au/toaks-titanium-550ml-pot.html", priceCents: 4695, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/toaks-titanium-550ml-pot", priceCents: 4895, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "MSR Trail Mini Solo Cook Set",
    brand: "MSR",
    weightGrams: 230,
    priceCents: 5995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/msr-trail-mini-solo-cook-set.html",
    inStock: true,
    type: "pot",
    volumeMl: 750,
    notes: "Hard-anodized aluminium. 750ml pot + lid. Affordable and durable.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/msr-trail-mini-solo-cook-set.html", priceCents: 5995, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/trail-mini-solo-cook-set", priceCents: 5995, currency: "AUD" },
    ],
    imageUrls: [],
  },
];
