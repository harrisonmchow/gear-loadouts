// prisma/seed.ts
// Run with: npx prisma db seed
// Ensure package.json has: "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }

import { PrismaClient } from '@prisma/client';
import { tents } from './data/tents';
import { sleepingBags } from './data/sleeping-bags';
import { sleepingPads } from './data/sleeping-pads';
import { backpacks } from './data/backpacks';
import { pillows } from './data/pillows';
import { stoves } from './data/stoves';
import { cookPots } from './data/cook-pots';
import { waterFilters } from './data/water-filters';
import { waterContainers } from './data/water-containers';
import { allUpgradeEdges } from './data/upgrade-edges';
import { externalReviewSources } from './data/external-review-sources';

const prisma = new PrismaClient();

// ── Category definitions ────────────────────────────────────────────────────

const categories = [
  {
    name: 'tent',
    displayName: 'Tent / Shelter',
    icon: '⛺',
    ratingFields: ['weight', 'packability', 'setup_ease', 'weather_resistance', 'space', 'ventilation'],
  },
  {
    name: 'sleeping_bag',
    displayName: 'Sleeping Bag / Quilt',
    icon: '🛌',
    ratingFields: ['warmth_accuracy', 'weight', 'packability', 'comfort', 'moisture_resistance'],
  },
  {
    name: 'sleeping_pad',
    displayName: 'Sleeping Pad',
    icon: '🟦',
    ratingFields: ['weight', 'packability', 'insulation', 'comfort', 'durability', 'noise'],
  },
  {
    name: 'backpack',
    displayName: 'Backpack',
    icon: '🎒',
    ratingFields: ['weight', 'comfort', 'durability', 'packability', 'organization', 'ventilation'],
  },
  {
    name: 'pillow',
    displayName: 'Pillow',
    icon: '🛏️',
    ratingFields: ['weight', 'packability', 'comfort', 'insulation'],
  },
  {
    name: 'cook_stove',
    displayName: 'Stove',
    icon: '🔥',
    ratingFields: ['weight', 'packability', 'boil_time', 'fuel_efficiency', 'durability'],
  },
  {
    name: 'cook_pot',
    displayName: 'Pot / Pan',
    icon: '🍳',
    ratingFields: ['weight', 'packability', 'durability', 'heat_distribution', 'capacity'],
  },
  {
    name: 'water_filter',
    displayName: 'Water Filter',
    icon: '💧',
    ratingFields: ['weight', 'flow_rate', 'packability', 'durability', 'ease_of_use'],
  },
  {
    name: 'water_container',
    displayName: 'Water Container',
    icon: '🫙',
    ratingFields: ['weight', 'packability', 'durability', 'capacity', 'ease_of_use'],
  },
];

// ── Seed functions ─────────────────────────────────────────────────────────

async function seedCategories() {
  console.log('Seeding categories...');
  for (const cat of categories) {
    await prisma.gearCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: {
        name: cat.name,
        displayName: cat.displayName,
        icon: cat.icon,
        ratingFields: cat.ratingFields,
      },
    });
  }
  console.log(`✓ ${categories.length} categories seeded.`);
}

async function seedGearItems() {
  console.log('Seeding gear items...');

  const categoryMap = new Map<string, string>();
  const cats = await prisma.gearCategory.findMany();
  cats.forEach((c) => categoryMap.set(c.name, c.id));

  const allItems = [
    ...tents.map((t) => ({
      name: t.name,
      brand: t.brand,
      categoryName: 'tent',
      weightGrams: t.weightGrams,
      priceCents: t.priceCents,
      currency: t.currency,
      href: t.href,
      inStock: t.inStock,
      whereToBuy: t.whereToBuy ?? [],
      imageUrls: t.imageUrls ?? [],
      specs: {
        capacity: (t as any).capacity,
        type: (t as any).type,
        seasons: (t as any).seasons,
        notes: t.notes,
      },
    })),
    ...sleepingBags.map((s) => ({
      name: s.name,
      brand: s.brand,
      categoryName: 'sleeping_bag',
      weightGrams: s.weightGrams,
      priceCents: s.priceCents,
      currency: s.currency,
      href: s.href,
      inStock: s.inStock,
      whereToBuy: s.whereToBuy ?? [],
      imageUrls: s.imageUrls ?? [],
      specs: {
        type: s.type,
        fill: s.fill,
        fillPower: s.fillPower,
        tempRatingComfortC: s.tempRatingComfortC,
        tempRatingLowerC: s.tempRatingLowerC,
        notes: s.notes,
      },
    })),
    ...sleepingPads.map((p) => ({
      name: p.name,
      brand: p.brand,
      categoryName: 'sleeping_pad',
      weightGrams: p.weightGrams,
      priceCents: p.priceCents,
      currency: p.currency,
      href: p.href,
      inStock: p.inStock,
      whereToBuy: p.whereToBuy ?? [],
      imageUrls: p.imageUrls ?? [],
      specs: {
        type: p.type,
        rValue: p.rValue,
        thicknessCm: p.thicknessCm,
        notes: p.notes,
      },
    })),
    ...backpacks.map((b) => ({
      name: b.name,
      brand: b.brand,
      categoryName: 'backpack',
      weightGrams: b.weightGrams,
      priceCents: b.priceCents,
      currency: b.currency,
      href: b.href,
      inStock: b.inStock,
      whereToBuy: b.whereToBuy ?? [],
      imageUrls: b.imageUrls ?? [],
      specs: {
        volumeLitres: b.volumeLitres,
        frameType: b.frameType,
        gender: b.gender,
        notes: b.notes,
      },
    })),
    ...pillows.map((p) => ({
      name: p.name,
      brand: p.brand,
      categoryName: 'pillow',
      weightGrams: p.weightGrams,
      priceCents: p.priceCents,
      currency: p.currency,
      href: p.href,
      inStock: p.inStock,
      whereToBuy: p.whereToBuy ?? [],
      imageUrls: p.imageUrls ?? [],
      specs: {
        type: p.type,
        notes: p.notes,
      },
    })),
    ...stoves.map((s) => ({
      name: s.name,
      brand: s.brand,
      categoryName: 'cook_stove',
      weightGrams: s.weightGrams,
      priceCents: s.priceCents,
      currency: s.currency,
      href: s.href,
      inStock: s.inStock,
      whereToBuy: s.whereToBuy ?? [],
      imageUrls: s.imageUrls ?? [],
      specs: {
        type: s.type,
        fuelType: s.fuelType,
        volumeMl: s.volumeMl,
        notes: s.notes,
      },
    })),
    ...cookPots.map((p) => ({
      name: p.name,
      brand: p.brand,
      categoryName: 'cook_pot',
      weightGrams: p.weightGrams,
      priceCents: p.priceCents,
      currency: p.currency,
      href: p.href,
      inStock: p.inStock,
      whereToBuy: p.whereToBuy ?? [],
      imageUrls: p.imageUrls ?? [],
      specs: {
        type: p.type,
        volumeMl: p.volumeMl,
        notes: p.notes,
      },
    })),
    ...waterFilters.map((w) => ({
      name: w.name,
      brand: w.brand,
      categoryName: 'water_filter',
      weightGrams: w.weightGrams,
      priceCents: w.priceCents,
      currency: w.currency,
      href: w.href,
      inStock: w.inStock,
      whereToBuy: w.whereToBuy ?? [],
      imageUrls: w.imageUrls ?? [],
      specs: {
        type: w.type,
        flowRate: w.flowRate,
        notes: w.notes,
      },
    })),
    ...waterContainers.map((c) => ({
      name: c.name,
      brand: c.brand,
      categoryName: 'water_container',
      weightGrams: c.weightGrams,
      priceCents: c.priceCents,
      currency: c.currency,
      href: c.href,
      inStock: c.inStock,
      whereToBuy: c.whereToBuy ?? [],
      imageUrls: c.imageUrls ?? [],
      specs: {
        type: c.type,
        volumeMl: c.volumeMl,
        notes: c.notes,
      },
    })),
  ];

  // Deduplicate by name (safety net — data files should already be unique)
  const seen = new Set<string>();
  const deduped = allItems.filter((item) => {
    const key = `${item.categoryName}::${item.name.toLowerCase().trim()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let created = 0;
  let skipped = 0;

  for (const item of deduped) {
    const categoryId = categoryMap.get(item.categoryName);
    if (!categoryId) {
      console.warn(`Unknown category "${item.categoryName}" for item "${item.name}" — skipping.`);
      skipped++;
      continue;
    }

    // upsert by name+category to allow re-running safely
    const existing = await prisma.gearItem.findFirst({
      where: { name: item.name, categoryId },
    });

    if (existing) {
      // Update all fields on re-seed
      await prisma.gearItem.update({
        where: { id: existing.id },
        data: {
          brand: item.brand,
          weightGrams: item.weightGrams,
          priceCents: item.priceCents,
          currency: item.currency,
          href: item.href,
          isDiscontinued: !item.inStock,
          specs: item.specs ?? {},
          whereToBuy: (item.whereToBuy ?? []) as any,
          imageUrls: (item.imageUrls ?? []) as any,
        } as any,
      });
      skipped++;
      continue;
    }

    await prisma.gearItem.create({
      data: {
        name: item.name,
        brand: item.brand,
        categoryId,
        weightGrams: item.weightGrams,
        priceCents: item.priceCents,
        currency: item.currency,
        href: item.href,
        isDiscontinued: !item.inStock,
        specs: item.specs ?? {},
        whereToBuy: (item.whereToBuy ?? []) as any,
        imageUrls: (item.imageUrls ?? []) as any,
      },
    });
    created++;
  }

  console.log(`✓ ${created} gear items created, ${skipped} skipped (already existed).`);
  console.log(`  Total items across all categories: ${deduped.length}`);
}

async function seedUpgradeEdges() {
  console.log('Seeding upgrade edges...');

  let created = 0;
  let skipped = 0;

  for (const edge of allUpgradeEdges) {
    const fromItem = await prisma.gearItem.findFirst({ where: { name: edge.from } });
    const toItem = await prisma.gearItem.findFirst({ where: { name: edge.to } });

    if (!fromItem || !toItem) {
      console.warn(`Edge skipped: "${edge.from}" → "${edge.to}" — item not found.`);
      skipped++;
      continue;
    }

    await prisma.upgradeEdge.upsert({
      where: { fromId_toId: { fromId: fromItem.id, toId: toItem.id } },
      update: {
        edgeType: edge.type,
        path: edge.path ?? [],
        notes: edge.notes ?? null,
      },
      create: {
        fromId: fromItem.id,
        toId: toItem.id,
        edgeType: edge.type,
        path: edge.path ?? [],
        notes: edge.notes ?? null,
      },
    });
    created++;
  }

  console.log(`✓ ${created} upgrade edges created, ${skipped} skipped.`);
}

async function seedExternalReviewSources() {
  console.log('Seeding external review sources...');

  let created = 0;
  let skipped = 0;

  for (const source of externalReviewSources) {
    const existing = await prisma.externalReviewSource.findUnique({
      where: { name: source.name },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.externalReviewSource.create({
      data: {
        name: source.name,
        type: source.type,
        channelId: source.channelId,
        feedUrl: source.feedUrl,
        avatarUrl: source.avatarUrl,
      },
    });
    created++;
  }

  console.log(`✓ ${created} external review sources created, ${skipped} skipped.`);
}

async function seedSiteDeals() {
  console.log('Seeding site-wide deals...');

  const siteDeals = [
    {
      title: 'Paddy Pallin Hiking Sale',
      description: 'Up to 30% off selected hiking gear',
      retailerName: 'Paddy Pallin',
      retailerUrl: 'https://www.paddypallin.com.au/sale',
      priceCents: 0,
      normalPrice: 0,
      discountPct: 30,
      region: 'AU',
      expiresAt: new Date('2026-04-09'),
    },
    {
      title: 'Snowys End of Season Clearance',
      description: '20-40% off winter sleeping bags and insulated jackets',
      retailerName: 'Snowys',
      retailerUrl: 'https://www.snowys.com.au/clearance',
      priceCents: 0,
      normalPrice: 0,
      discountPct: 40,
      region: 'AU',
      expiresAt: new Date('2026-04-15'),
    },
  ];

  let created = 0;
  for (const deal of siteDeals) {
    // Check if a site deal with same title already exists
    const existing = await prisma.deal.findFirst({
      where: { title: deal.title, gearId: null },
    });
    if (existing) continue;

    await prisma.deal.create({ data: deal });
    created++;
  }
  console.log(`✓ ${created} site-wide deals created.`);
}

// ── Award assignments ────────────────────────────────────────────────────────
// Hard-coded awards: 3 per gear category. Item name → award label.

const gearAwards: Record<string, string> = {
  // Tents / Shelters
  'Naturehike Cloud-Up 2': 'Best Value',
  'Durston X-Mid Pro 1': 'Ultralight Favourite',
  'Durston X-Mid 2': 'Best All Rounder',
  // Sleeping Bags / Quilts
  'Neve Gear Waratah Quilt -2°C': 'Best Value',
  'Enlightened Equipment Enigma Quilt 20°F (-7°C)': 'Ultralight Favourite',
  'Sea to Summit Spark SpII Down Sleeping Bag 1°C': 'Best All Rounder',
  // Sleeping Pads
  'Alton Ultralight Insulated Sleeping Mat R4': 'Best Value',
  'NEMO Tensor Elite Ultralight Sleeping Mat': 'Ultralight Favourite',
  'NEMO Tensor Insulated Sleeping Mat Regular Wide': 'Best All Rounder',
  // Backpacks
  'Gossamer Gear Gorilla 40L': 'Best Value',
  'Zpacks Arc Blast 55L': 'Ultralight Favourite',
  'Osprey Exos 58': 'Best All Rounder',
  // Pillows
  'Alton Ultralight Camping Pillow': 'Best Value',
  'Exped AirPillow UL M': 'Ultralight Favourite',
  'Sea to Summit Aeros Premium Pillow Regular': 'Best All Rounder',
  // Stoves
  'BRS-3000T Ultralight Stove': 'Best Value',
  'MSR PocketRocket 2': 'Ultralight Favourite',
  'Soto WindMaster': 'Best All Rounder',
  // Cook Pots
  'TOAKS Titanium 550ml Pot': 'Best Value',
  'TOAKS Titanium 750ml Pot': 'Ultralight Favourite',
  'MSR Trail Mini Solo Cook Set': 'Best All Rounder',
  // Water Filters
  'Sawyer Squeeze Water Filter': 'Best Value',
  'Sawyer Micro Squeeze': 'Ultralight Favourite',
  'Katadyn BeFree 1.0L': 'Best All Rounder',
  // Water Containers
  'CNOC Vecto 2L Water Container': 'Best Value',
  'CNOC Vecto 3L Water Container': 'Best All Rounder',
};

async function seedAwards() {
  console.log('Seeding gear awards...');
  let updated = 0;

  for (const [itemName, award] of Object.entries(gearAwards)) {
    const result = await prisma.gearItem.updateMany({
      where: { name: itemName },
      data: { award },
    });
    if (result.count > 0) updated++;
  }

  console.log(`✓ ${updated} gear awards assigned.`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  try {
    await seedCategories();
    await seedGearItems();
    await seedUpgradeEdges();
    await seedExternalReviewSources();
    await seedSiteDeals();
    await seedAwards();
    console.log('\n✅ Seed complete.');
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();