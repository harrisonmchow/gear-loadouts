// prisma/data/pillows.ts
// Scraped from: seatosummit.com.au, ultralightgear.com.au, backpackinglight.com.au,
// nemoequipment.com, zorali.com, altongoods.com, decathlon.com.au, naturehike.com
// Currency: AUD unless noted.

import type { WhereToBuyEntry } from './water-filtration';

export interface PillowSeedItem {
  name: string;
  brand: string;
  weightGrams: number | null;
  priceCents: number | null;
  currency: 'AUD' | 'USD';
  href: string;
  inStock: boolean;
  type: 'inflatable' | 'foam' | 'hybrid' | 'compressible';
  whereToBuy: WhereToBuyEntry[];
  imageUrls: string[];
  notes?: string;
}

export const pillows: PillowSeedItem[] = [
  // ── Sea to Summit ──────────────────────────────────────────────────────────
  {
    name: 'Sea to Summit Aeros Ultralight Pillow Regular',
    brand: 'Sea to Summit',
    weightGrams: 58,
    priceCents: 6495,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-ultralight-pillow',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-ultralight-pillow', priceCents: 6495, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-aeros-ultralight-pillow-regular', priceCents: 6695, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/aeros-ultralight-pillow-regular', priceCents: 6795, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Most popular ultralight pillow in AU. Multi-function valve. PillowLock compatible. 58g.',
  },
  {
    name: 'Sea to Summit Aeros Ultralight Pillow Large',
    brand: 'Sea to Summit',
    weightGrams: 67,
    priceCents: 6995,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-ultralight-pillow',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-ultralight-pillow', priceCents: 6995, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-aeros-ultralight-pillow-large', priceCents: 7195, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/aeros-ultralight-pillow-large', priceCents: 7295, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Large size for side sleepers. Multi-function valve. PillowLock compatible.',
  },
  {
    name: 'Sea to Summit Aeros Premium Pillow Regular',
    brand: 'Sea to Summit',
    weightGrams: 98,
    priceCents: 8495,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-premium-pillow',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-premium-pillow', priceCents: 8495, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-aeros-premium-pillow-regular', priceCents: 8695, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/aeros-premium-pillow-regular', priceCents: 8895, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Brushed 50D polyester top panel. More comfortable than Ultralight version.',
  },
  {
    name: 'Sea to Summit Aeros Premium Pillow Large',
    brand: 'Sea to Summit',
    weightGrams: 116,
    priceCents: 8995,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-premium-pillow',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/aeros-premium-pillow', priceCents: 8995, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-aeros-premium-pillow-large', priceCents: 9195, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/aeros-premium-pillow-large', priceCents: 9395, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Large brushed top. Best comfort at low weight.',
  },
  {
    name: 'Sea to Summit Aeros Pillow Case',
    brand: 'Sea to Summit',
    weightGrams: 35,
    priceCents: 2999,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows', priceCents: 2999, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-aeros-pillow-case', priceCents: 3099, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Pillow case for Aeros range. Can also function as a standalone pillow stuffed with clothes.',
  },
  {
    name: 'Sea to Summit Foam Core Pillow Regular',
    brand: 'Sea to Summit',
    weightGrams: 290,
    priceCents: 4999,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/foam-core-pillow',
    inStock: true,
    type: 'foam',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/foam-core-pillow', priceCents: 4999, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-foam-core-pillow-regular', priceCents: 5149, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/foam-core-pillow-regular', priceCents: 5199, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Upcycled foam from SI mat off-cuts. No inflation required. Home pillow feel.',
  },
  {
    name: 'Sea to Summit Foam Core Pillow Large',
    brand: 'Sea to Summit',
    weightGrams: 380,
    priceCents: 5999,
    currency: 'AUD',
    href: 'https://seatosummit.com.au/collections/camping-pillows/products/foam-core-pillow',
    inStock: true,
    type: 'foam',
    whereToBuy: [
      { retailer: 'Sea to Summit', url: 'https://seatosummit.com.au/collections/camping-pillows/products/foam-core-pillow', priceCents: 5999, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/sea-to-summit-foam-core-pillow-large', priceCents: 6149, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/foam-core-pillow-large', priceCents: 6299, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Large foam pillow. PillowLock compatible. Great for car camping or hut-to-hut.',
  },

  // ── NEMO Equipment ──────────────────────────────────────────────────────────
  {
    name: 'NEMO Fillo Pillow',
    brand: 'NEMO',
    weightGrams: 82,
    priceCents: 8495,
    currency: 'AUD',
    href: 'https://ultralightgear.com.au/products/nemo-fillo-pillow',
    inStock: true,
    type: 'hybrid',
    whereToBuy: [
      { retailer: 'Ultralight Gear', url: 'https://ultralightgear.com.au/products/nemo-fillo-pillow', priceCents: 8495, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/nemo-fillo-pillow', priceCents: 8695, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Inflatable core + microfibre filled topper. Feels like a real pillow. Velour cover.',
  },
  {
    name: 'NEMO Fillo Elite Pillow',
    brand: 'NEMO',
    weightGrams: 57,
    priceCents: null,
    currency: 'AUD',
    href: 'https://www.nemoequipment.com/products/fillo-elite',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'NEMO', url: 'https://www.nemoequipment.com/products/fillo-elite', priceCents: 0, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/nemo-fillo-elite-pillow', priceCents: 0, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Ultralight version. 57g. Soft brushed top. Down-alternative fill air chambers.',
  },
  {
    name: 'NEMO Fillo Luxury Pillow',
    brand: 'NEMO',
    weightGrams: 142,
    priceCents: null,
    currency: 'AUD',
    href: 'https://www.nemoequipment.com/products/fillo-luxury',
    inStock: true,
    type: 'hybrid',
    whereToBuy: [
      { retailer: 'NEMO', url: 'https://www.nemoequipment.com/products/fillo-luxury', priceCents: 0, currency: 'AUD' },
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/nemo-fillo-luxury-pillow', priceCents: 0, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'King-sized comfort. Down-alternative fill. For comfort-focused campers.',
  },

  // ── Exped ────────────────────────────────────────────────────────────────────
  {
    name: 'Exped AirPillow UL M',
    brand: 'Exped',
    weightGrams: 49,
    priceCents: 4999,
    currency: 'AUD',
    href: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html', priceCents: 4999, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/exped-airpillow-ul-m', priceCents: 5149, currency: 'AUD' },
      { retailer: 'Bogong', url: 'https://www.bogong.com.au/exped-airpillow-ul-m.html', priceCents: 5199, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Ultra packable. Flat valve. 49g. Popular ultralight option at Paddy Pallin.',
  },
  {
    name: 'Exped AirPillow UL L',
    brand: 'Exped',
    weightGrams: 58,
    priceCents: 5999,
    currency: 'AUD',
    href: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html', priceCents: 5999, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/exped-airpillow-ul-l', priceCents: 6179, currency: 'AUD' },
      { retailer: 'Bogong', url: 'https://www.bogong.com.au/exped-airpillow-ul-l.html', priceCents: 6249, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Large size. 58g. Flat valve for minimal size when packed.',
  },
  {
    name: 'Exped DeciDown Pillow M',
    brand: 'Exped',
    weightGrams: 85,
    priceCents: 7999,
    currency: 'AUD',
    href: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    inStock: true,
    type: 'compressible',
    whereToBuy: [
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html', priceCents: 7999, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/exped-decidown-pillow-m', priceCents: 8239, currency: 'AUD' },
      { retailer: 'Bogong', url: 'https://www.bogong.com.au/exped-decidown-pillow-m.html', priceCents: 8319, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Down-filled compressible pillow. Softer feel than inflatable.',
  },

  // ── Therm-a-Rest ─────────────────────────────────────────────────────────────
  {
    name: 'Therm-a-Rest Air Head Pillow Regular',
    brand: 'Therm-a-Rest',
    weightGrams: 74,
    priceCents: 5999,
    currency: 'AUD',
    href: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html', priceCents: 5999, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/thermarest-air-head-pillow-regular', priceCents: 6179, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Stretch-knit top panel. Valve inflation. Works with NeoAir strapping system.',
  },
  {
    name: 'Therm-a-Rest Compressible Pillow Regular',
    brand: 'Therm-a-Rest',
    weightGrams: 158,
    priceCents: 4999,
    currency: 'AUD',
    href: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    inStock: true,
    type: 'compressible',
    whereToBuy: [
      { retailer: 'Paddy Pallin', url: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html', priceCents: 4999, currency: 'AUD' },
      { retailer: 'Snowys', url: 'https://www.snowys.com.au/thermarest-compressible-pillow-regular', priceCents: 5149, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Foam-filled. Packs into its own cover. Popular car camping option.',
  },

  // ── Zorali ────────────────────────────────────────────────────────────────────
  {
    name: 'Zorali Campsite Pillow',
    brand: 'Zorali',
    weightGrams: null,
    priceCents: 3700,
    currency: 'AUD',
    href: 'https://www.zorali.com/collections/camp-goods',
    inStock: true,
    type: 'compressible',
    whereToBuy: [
      { retailer: 'Zorali', url: 'https://www.zorali.com/collections/camp-goods', priceCents: 3700, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Compressible camping pillow. Lightweight and packable. Lifetime warranty.',
  },

  // ── Alton Goods ─────────────────────────────────────────────────────────────
  {
    name: 'Alton Ultralight Camping Pillow',
    brand: 'Alton',
    weightGrams: null,
    priceCents: 4900,
    currency: 'AUD',
    href: 'https://altongoods.com/collections/sleeping',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Alton Goods', url: 'https://altongoods.com/collections/sleeping', priceCents: 4900, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Inflatable ultralight camping pillow. Pairs with Alton sleep system. Lifetime warranty.',
  },

  // ── Decathlon (Forclaz / Quechua) ────────────────────────────────────────────
  {
    name: 'Forclaz Ultralight Inflatable Trekking Pillow',
    brand: 'Forclaz',
    weightGrams: 85,
    priceCents: 1999,
    currency: 'AUD',
    href: 'https://www.decathlon.com.au/p/ultralight-inflatable-trekking-pillow/_/R-p-322985',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Decathlon', url: 'https://www.decathlon.com.au/p/ultralight-inflatable-trekking-pillow/_/R-p-322985', priceCents: 1999, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Budget inflatable. Best price-to-function ratio. Good for beginners.',
  },
  {
    name: 'Quechua MH500 Soft Pillow',
    brand: 'Quechua',
    weightGrams: 250,
    priceCents: 1499,
    currency: 'AUD',
    href: 'https://www.decathlon.com.au/p/mh500-soft-pillow/_/R-p-339810',
    inStock: true,
    type: 'compressible',
    whereToBuy: [
      { retailer: 'Decathlon', url: 'https://www.decathlon.com.au/p/mh500-soft-pillow/_/R-p-339810', priceCents: 1499, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Ultra-affordable. Good for car camping or hut-to-hut hiking.',
  },

  // ── Naturehike ───────────────────────────────────────────────────────────────
  {
    name: 'Naturehike Ultralight Inflatable Pillow',
    brand: 'Naturehike',
    weightGrams: 62,
    priceCents: 1999,
    currency: 'AUD',
    href: 'https://www.naturehike.com/collections/pillows',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Naturehike', url: 'https://www.naturehike.com/collections/pillows', priceCents: 1999, currency: 'AUD' },
      { retailer: 'Amazon AU', url: 'https://www.amazon.com.au/s?k=naturehike+ultralight+inflatable+pillow', priceCents: 2099, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Budget inflatable. Good weight. Popular in AU for beginners.',
  },

  // ── Macpac ────────────────────────────────────────────────────────────────────
  {
    name: 'Macpac Packable Pillow',
    brand: 'Macpac',
    weightGrams: 120,
    priceCents: 2999,
    currency: 'AUD',
    href: 'https://www.macpac.com.au/outdoor-equipment/sleeping-gear/',
    inStock: true,
    type: 'compressible',
    whereToBuy: [
      { retailer: 'Macpac', url: 'https://www.macpac.com.au/outdoor-equipment/sleeping-gear/', priceCents: 2999, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Packable compressible. Folds into stuff sack. Good AU budget option.',
  },

  // ── Kathmandu ────────────────────────────────────────────────────────────────
  {
    name: 'Kathmandu Ultralight Inflatable Pillow',
    brand: 'Kathmandu',
    weightGrams: null,
    priceCents: 2999,
    currency: 'AUD',
    href: 'https://www.kathmandu.com.au/camp-and-hike/camping/beds-and-mats.html',
    inStock: true,
    type: 'inflatable',
    whereToBuy: [
      { retailer: 'Kathmandu', url: 'https://www.kathmandu.com.au/camp-and-hike/camping/beds-and-mats.html', priceCents: 2999, currency: 'AUD' },
    ],
    imageUrls: [],
    notes: 'Entry-level inflatable. Compact and lightweight.',
  },
];
