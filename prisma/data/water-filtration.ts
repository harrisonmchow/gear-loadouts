export interface WaterFiltrationSeedItem {
  name: string;
  brand: string;
  weightGrams: number;
  priceCents: number;
  currency: "AUD" | "USD";
  href: string;
  inStock: boolean;
  type: "filter" | "purifier" | "chemical" | "container";
  flowRate?: string;
  notes?: string;
}

export const waterFiltration: WaterFiltrationSeedItem[] = [
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
  },
  {
    name: "CNOC Vecto 3L Water Container",
    brand: "CNOC",
    weightGrams: 54,
    priceCents: 3995,
    currency: "AUD",
    href: "https://www.ultralighthiker.com.au/cnoc-vecto-3l.html",
    inStock: true,
    type: "container",
    notes: "3L dirty water bag. 42mm thread fits Sawyer filters. Slide-lock closure. 54g. BPA-free.",
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
    notes: "2L dirty water bag. Same Sawyer-compatible thread as 3L. Lighter for shorter carries.",
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
  },
];
