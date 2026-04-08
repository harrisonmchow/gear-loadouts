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
  },
];
