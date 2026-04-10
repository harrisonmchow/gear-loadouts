import type { WhereToBuyEntry } from './shared';

export interface WaterContainerSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "container";
  volumeMl?: number;
  notes?: string;
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
}

export const waterContainers: WaterContainerSeedItem[] = [
  {
    name: "CNOC Vecto 3L Water Container",
    brand: "CNOC",
    weightGrams: 54,
    priceCents: 3995,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/cnoc-vecto-3l.html",
    inStock: true,
    type: "container",
    volumeMl: 3000,
    notes: "3L dirty water bag. 42mm thread fits Sawyer filters. Slide-lock closure. 54g. BPA-free.",
    whereToBuy: [
      { retailer: "Ultralight Hiker", url: "https://www.ultralighthiker.com.au/cnoc-vecto-3l.html", priceCents: 3995, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/cnoc-vecto-3l", priceCents: 4195, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "CNOC Vecto 2L Water Container",
    brand: "CNOC",
    weightGrams: 43,
    priceCents: 3495,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/cnoc-vecto-2l.html",
    inStock: true,
    type: "container",
    volumeMl: 2000,
    notes: "2L dirty water bag. Same Sawyer-compatible thread as 3L. Lighter for shorter carries.",
    whereToBuy: [
      { retailer: "Ultralight Hiker", url: "https://www.ultralighthiker.com.au/cnoc-vecto-2l.html", priceCents: 3495, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/cnoc-vecto-2l", priceCents: 3695, currency: "AUD" },
    ],
    imageUrls: [],
  },
];
