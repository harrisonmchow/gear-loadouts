import type { WhereToBuyEntry } from './shared';

export interface WaterFilterSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "filter" | "purifier" | "chemical";
  flowRate?: string;
  notes?: string;
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
}

export const waterFilters: WaterFilterSeedItem[] = [
  {
    name: "Sawyer Squeeze Water Filter",
    brand: "Sawyer",
    weightGrams: 85,
    priceCents: 9995,
    currency: "AUD",
    href: "https://www.snowys.com.au/point-one-squeeze-water-filter-system",
    inStock: true,
    type: "filter",
    flowRate: "1.7 L/min",
    notes: "Hollow-fibre 0.1 micron. Backflushable. Includes 3 squeeze pouches. Gold standard for thru-hikers.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/point-one-squeeze-water-filter-system", priceCents: 12999, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1286851_point-one-squeeze-water-filter-system.jpeg",
      "https://cdn.snowys.com.au/content/images/thumbs/1286850_point-one-squeeze-water-filter-system.jpeg",
    ],
  },
  {
    name: "Katadyn BeFree 1.0L",
    brand: "Katadyn",
    weightGrams: 59,
    priceCents: 13995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/katadyn-befree-filter-ac-1l.html",
    inStock: true,
    type: "filter",
    flowRate: "2.0 L/min",
    notes: "0.1 micron EZ-Clean Membrane with activated carbon. Ultra-fast flow. Integrated soft flask. 59g total.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/katadyn-befree-filter-ac-1l.html", priceCents: 13995, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "Sawyer Micro Squeeze",
    brand: "Sawyer",
    weightGrams: 57,
    priceCents: 8499,
    currency: "AUD",
    href: "https://www.snowys.com.au/micro-squeeze-water-filter-system",
    inStock: true,
    type: "filter",
    flowRate: "1.5 L/min",
    notes: "Compact version of the Squeeze. Fits standard bottle threads. 57g. Backflushable.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/micro-squeeze-water-filter-system", priceCents: 8499, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.snowys.com.au/content/images/thumbs/1286867_micro-squeeze-water-filter-system.webp",
      "https://cdn.snowys.com.au/content/images/thumbs/1286868_micro-squeeze-water-filter-system.webp",
    ],
  },
  {
    name: "Aquamira Water Treatment Drops",
    brand: "Aquamira",
    weightGrams: 85,
    priceCents: 2495,
    currency: "AUD",
    href: "https://www.amazon.com.au/s?k=Aquamira+water+treatment+drops",
    inStock: false,
    type: "chemical",
    notes: "Chlorine dioxide two-part drops. Treats 30 gallons. Good backup to filter. 15-min wait time. No longer stocked by AU retailers.",
    whereToBuy: [],
    imageUrls: [],
  },
  {
    name: "SteriPEN Ultra UV Purifier",
    brand: "SteriPEN",
    weightGrams: 140,
    priceCents: 35995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/steripen-ultra-uv-portable-water-purifier.html",
    inStock: true,
    type: "purifier",
    notes: "UV light purifier. USB rechargeable. Treats 0.5L in 48 sec or 1L in 90 sec. Also kills viruses.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/steripen-ultra-uv-portable-water-purifier.html", priceCents: 35995, currency: "AUD" },
    ],
    imageUrls: [],
  },
];
