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
    priceCents: 4799,
    currency: "AUD",
    href: "https://ultralightgear.com.au/products/cnoc-vecto-water-bladder",
    inStock: true,
    type: "container",
    volumeMl: 3000,
    notes: "3L dirty water bag. 42mm thread fits Sawyer filters. Slide-lock closure. 54g. BPA-free.",
    whereToBuy: [
      { retailer: "Ultralight Gear", url: "https://ultralightgear.com.au/products/cnoc-vecto-water-bladder", priceCents: 4799, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/cnoc-42mm-vecto-water-container-3l", priceCents: 4320, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/files/V2-2l28m-org_b50612ec-60a0-4c2e-b001-32475502b520.jpg?v=1755571451",
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/files/VectoGravitywoman.jpg?v=1755571452",
    ],
  },
  {
    name: "CNOC Vecto 2L Water Container",
    brand: "CNOC",
    weightGrams: 43,
    priceCents: 4399,
    currency: "AUD",
    href: "https://ultralightgear.com.au/products/cnoc-vecto-water-bladder",
    inStock: true,
    type: "container",
    volumeMl: 2000,
    notes: "2L dirty water bag. Same Sawyer-compatible 42mm thread as 3L. Lighter for shorter carries.",
    whereToBuy: [
      { retailer: "Ultralight Gear", url: "https://ultralightgear.com.au/products/cnoc-vecto-water-bladder", priceCents: 4399, currency: "AUD" },
      { retailer: "Backpacking Light", url: "https://www.backpackinglight.com.au/products/cnoc-42mm-vecto-water-container-3l", priceCents: 3960, currency: "AUD" },
    ],
    imageUrls: [
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/files/V2-2l28m-blu.jpg?v=1755571451",
      "https://cdn.shopify.com/s/files/1/0019/6699/7613/files/VectoGravity.jpg?v=1755571452",
    ],
  },
];
