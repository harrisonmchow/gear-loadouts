// prisma/data/pillows.ts
// Scraped from: seatosummit.com.au, ultralightgear.com.au, backpackinglight.com.au,
// nemoequipment.com, zorali.com, altongoods.com, decathlon.com.au, naturehike.com
// Currency: AUD unless noted.

export interface PillowSeedItem {
  name: string;
  brand: string;
  weightGrams: number | null;
  priceCents: number | null;
  currency: 'AUD' | 'USD';
  href: string;
  inStock: boolean;
  type: 'inflatable' | 'foam' | 'hybrid' | 'compressible';
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
    notes: 'Entry-level inflatable. Compact and lightweight.',
  },
];