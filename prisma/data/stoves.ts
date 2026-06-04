import type { WhereToBuyEntry } from './shared';

export interface StoveSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "stove" | "system";
  fuelType?: "canister" | "alcohol" | "solid" | "wood" | "multi";
  volumeMl?: number;
  notes?: string;
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
}

export const stoves: StoveSeedItem[] = [
  {
    name: "Jetboil Flash Cooking System",
    brand: "Jetboil",
    weightGrams: 371,
    priceCents: 23900,
    currency: "AUD",
    href: "https://www.snowys.com.au/flash-1-0l",
    inStock: true,
    type: "system",
    fuelType: "canister",
    volumeMl: 1000,
    notes: "Integrated canister system. 100-second boil time. FluxRing technology. Push-button igniter.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/flash-1-0l", priceCents: 23900, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1308160_flash-1-0l-carbon.jpeg",
      "https://cdn.snowys.com.au/content/images/thumbs/1308161_flash-1-0l-carbon.jpeg",
    ],
  },
  {
    name: "MSR PocketRocket 2",
    brand: "MSR",
    weightGrams: 73,
    priceCents: 9290,
    currency: "AUD",
    href: "https://www.snowys.com.au/pocket-rocket-2-hiking-stove",
    inStock: true,
    type: "stove",
    fuelType: "canister",
    notes: "Ultralight canister stove. 3.5 min boil for 1L. WindClip windscreen. Folds tiny.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/pocket-rocket-2-hiking-stove", priceCents: 9290, currency: "AUD" },
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/msr-pocketrocket-2-stove.html", priceCents: 11995, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1253578_pocketrocket-2-hiking-stove.jpeg",
      "https://cdn.snowys.com.au/content/images/thumbs/1253576_pocketrocket-2-hiking-stove.jpeg",
      "https://www.paddypallin.com.au/media/catalog/product/p/o/pocketrocket2_2.jpg",
    ],
  },
  {
    name: "BRS-3000T Ultralight Stove",
    brand: "BRS",
    weightGrams: 25,
    priceCents: 2499,
    currency: "AUD",
    href: "https://www.amazon.com.au/s?k=BRS-3000T+stove",
    inStock: false,
    type: "stove",
    fuelType: "canister",
    notes: "Budget ultralight canister stove. 25g. Titanium. Popular thru-hiker choice. No longer sold standalone in AU.",
    whereToBuy: [],
    imageUrls: [],
  },
  {
    name: "Soto WindMaster",
    brand: "Soto",
    weightGrams: 67,
    priceCents: 12495,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/sot-windmaster-stove-2020.html",
    inStock: true,
    type: "stove",
    fuelType: "canister",
    notes: "Excellent wind resistance. Micro-regulator for cold weather. 67g with 3Flex pot support.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/sot-windmaster-stove-2020.html", priceCents: 12495, currency: "AUD" },
    ],
    imageUrls: [
      "https://www.paddypallin.com.au/media/catalog/product/7/_/7_3.jpg",
      "https://www.paddypallin.com.au/media/catalog/product/2/_/2_24.jpg",
    ],
  },
  {
    name: "Trangia 25-1 UL Cook Set",
    brand: "Trangia",
    weightGrams: 845,
    priceCents: 17995,
    currency: "AUD",
    href: "https://www.snowys.com.au/25-1-large-ultralight-aluminium",
    inStock: true,
    type: "system",
    fuelType: "alcohol",
    volumeMl: 1750,
    notes: "Classic Swedish alcohol stove system. Windproof design. Two saucepans + frypan. Heavier but reliable.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/25-1-large-ultralight-aluminium", priceCents: 12990, currency: "AUD" },
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/trangia-storm-cooker-25-1-ultra-light.html", priceCents: 17995, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1227957_25-1-large-ul-aluminium-stove.jpeg",
      "https://cdn.snowys.com.au/content/images/thumbs/1227958_25-1-large-ul-aluminium-stove.jpeg",
    ],
  },
];
