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
    priceCents: 5995,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/sawyer-squeeze-filter.html",
    inStock: true,
    type: "filter",
    flowRate: "1.7 L/min",
    notes: "Hollow-fibre 0.1 micron. Backflushable. Includes 3 squeeze pouches. Gold standard for thru-hikers.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/sawyer-squeeze-filter.html", priceCents: 5995, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/squeeze-water-filter", priceCents: 6295, currency: "AUD" },
      { retailer: "Wild Earth", url: "https://www.wildearth.com.au/sawyer-squeeze-water-filter", priceCents: 5995, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "Katadyn BeFree 1.0L",
    brand: "Katadyn",
    weightGrams: 59,
    priceCents: 7495,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/katadyn-befree-1l.html",
    inStock: true,
    type: "filter",
    flowRate: "2.0 L/min",
    notes: "0.1 micron EZ-Clean Membrane. Ultra-fast flow. Integrated soft flask. 59g total.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/katadyn-befree-1l.html", priceCents: 7495, currency: "AUD" },
      { retailer: "Bogong", url: "https://www.bogong.com.au/katadyn-befree-1l.html", priceCents: 7495, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/befree-1l-water-filter", priceCents: 7695, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "Sawyer Micro Squeeze",
    brand: "Sawyer",
    weightGrams: 57,
    priceCents: 5495,
    currency: "AUD",
    href: "https://www.paddypallin.com.au/sawyer-micro-squeeze.html",
    inStock: true,
    type: "filter",
    flowRate: "1.5 L/min",
    notes: "Compact version of the Squeeze. Fits standard bottle threads. 57g. Backflushable.",
    whereToBuy: [
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/sawyer-micro-squeeze.html", priceCents: 5495, currency: "AUD" },
      { retailer: "Snowys", url: "https://www.snowys.com.au/micro-squeeze-water-filter", priceCents: 5695, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "Aquamira Water Treatment Drops",
    brand: "Aquamira",
    weightGrams: 85,
    priceCents: 2495,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/aquamira-drops.html",
    inStock: true,
    type: "chemical",
    notes: "Chlorine dioxide two-part drops. Treats 30 gallons. Good backup to filter. 15-min wait time.",
    whereToBuy: [
      { retailer: "Ultralight Hiker", url: "https://www.ultralighthiker.com.au/aquamira-drops.html", priceCents: 2495, currency: "AUD" },
    ],
    imageUrls: [],
  },
  {
    name: "SteriPEN Ultra UV Purifier",
    brand: "SteriPEN",
    weightGrams: 140,
    priceCents: 14995,
    currency: "AUD",
    href: "https://www.snowys.com.au/steripen-ultra.html",
    inStock: true,
    type: "purifier",
    notes: "UV light purifier. USB rechargeable. Treats 0.5L in 48 sec or 1L in 90 sec. Also kills viruses.",
    whereToBuy: [
      { retailer: "Snowys", url: "https://www.snowys.com.au/steripen-ultra.html", priceCents: 14995, currency: "AUD" },
      { retailer: "Paddy Pallin", url: "https://www.paddypallin.com.au/steripen-ultra-uv-purifier.html", priceCents: 14995, currency: "AUD" },
    ],
    imageUrls: [],
  },
];
