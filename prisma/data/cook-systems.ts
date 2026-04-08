import type { WhereToBuyEntry } from './water-filtration';

export interface CookSystemSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "stove" | "pot" | "pan" | "system";
  fuelType?: "canister" | "alcohol" | "solid" | "wood" | "multi";
  volumeMl?: number;
  notes?: string;
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
}

export const cookSystems: CookSystemSeedItem[] = [
  {
    name: "Jetboil Flash Cooking System",
    brand: "Jetboil",
    weightGrams: 371,
    priceCents: 23995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/jetboil-flash-cooking-system.html",
    inStock: true,
    type: "system",
    fuelType: "canister",
    volumeMl: 1000,
    notes: "Integrated canister system. 100-second boil time. FluxRing technology. Push-button igniter.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/jetboil-flash-cooking-system.html", priceCents: 23995, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/flash-cooking-system", priceCents: 23995, currency: "AUD" },
      { retailer: "Wild Earth", url: "https://www.wildearth.com.au/jetboil-flash-cooking-system", priceCents: 24495, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "MSR PocketRocket 2",
    brand: "MSR",
    weightGrams: 73,
    priceCents: 8995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/msr-pocketrocket-2-stove.html",
    inStock: true,
    type: "stove",
    fuelType: "canister",
    notes: "Ultralight canister stove. 3.5 min boil for 1L. WindClip windscreen. Folds tiny.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/msr-pocketrocket-2-stove.html", priceCents: 8995, currency: "AUD" },
      { retailer: "Wildfire Sports", url: "https://www.wildfiresports.com.au/msr-pocketrocket-2", priceCents: 8995, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/pocketrocket-2", priceCents: 9295, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "BRS-3000T Ultralight Stove",
    brand: "BRS",
    weightGrams: 25,
    priceCents: 2499,
    currency: "AUD",
    href: "https://www.amazon.com.au/dp/B00NNMF70U",
    inStock: true,
    type: "stove",
    fuelType: "canister",
    notes: "Budget ultralight canister stove. 25g. Titanium. Popular thru-hiker choice.",
    whereToBuy: [
      { retailer: "Amazon AU", url: "https://www.amazon.com.au/dp/B00NNMF70U", priceCents: 2499, currency: "AUD" },
    ],
    imageUrls: [],
  },
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
  {
    name: "Soto WindMaster",
    brand: "Soto",
    weightGrams: 67,
    priceCents: 11995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/soto-windmaster-stove.html",
    inStock: true,
    type: "stove",
    fuelType: "canister",
    notes: "Excellent wind resistance. Micro-regulator for cold weather. 67g with 3Flex pot support.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/soto-windmaster-stove.html", priceCents: 11995, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/windmaster-stove", priceCents: 11995, currency: "AUD" },
      { retailer: "Bogong", url: "https://www.bogong.com.au/soto-windmaster.html", priceCents: 12495, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "Trangia 25-1 UL Cook Set",
    brand: "Trangia",
    weightGrams: 845,
    priceCents: 19995,
    currency: "AUD",
    href: "https://www.snowys.com.au/25-1-ul-cook-set",
    inStock: true,
    type: "system",
    fuelType: "alcohol",
    volumeMl: 1750,
    notes: "Classic Swedish alcohol stove system. Windproof design. Two saucepans + frypan. Heavier but reliable.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/25-1-ul-cook-set", priceCents: 19995, currency: "AUD" },
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/trangia-25-1-ul-cook-set.html", priceCents: 19995, currency: "AUD" },
    ],
    imageUrls: [],
  },
];
