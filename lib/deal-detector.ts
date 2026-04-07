import { prisma } from "@/lib/prisma";
import type { ScrapedPrice } from "./scrapers/base-scraper";

const MIN_DISCOUNT_PCT = 20;

export async function detectDeals(scrapedPrices: ScrapedPrice[]) {
  const results = { created: 0, updated: 0, notified: 0 };

  for (const scraped of scrapedPrices) {
    // Find matching gear item by name (fuzzy match in production)
    const gearItem = await prisma.gearItem.findFirst({
      where: {
        name: { contains: scraped.itemName, mode: "insensitive" },
        isDiscontinued: false,
      },
    });

    if (!gearItem || !gearItem.priceCents) continue;

    const discountPct = Math.round(
      ((gearItem.priceCents - scraped.priceCents) / gearItem.priceCents) * 100
    );

    if (discountPct < MIN_DISCOUNT_PCT) continue;

    // Upsert deal
    const existingDeal = await prisma.deal.findFirst({
      where: {
        gearId: gearItem.id,
        retailerName: scraped.retailerName,
        isActive: true,
      },
    });

    if (existingDeal) {
      await prisma.deal.update({
        where: { id: existingDeal.id },
        data: {
          priceCents: scraped.priceCents,
          discountPct,
          foundAt: new Date(),
        },
      });
      results.updated++;
    } else {
      await prisma.deal.create({
        data: {
          gearId: gearItem.id,
          retailerName: scraped.retailerName,
          retailerUrl: scraped.retailerUrl,
          priceCents: scraped.priceCents,
          normalPrice: gearItem.priceCents,
          discountPct,
        },
      });
      results.created++;
    }

    // Check watchlist for notifications
    const watchers = await prisma.watchlistItem.findMany({
      where: {
        gearId: gearItem.id,
        notified: false,
        OR: [
          { maxPrice: null },
          { maxPrice: { gte: scraped.priceCents } },
        ],
      },
      include: { user: { include: { pushSubscription: true } } },
    });

    // Mark as notified (actual push notification in lib/push-notifications.ts)
    for (const watcher of watchers) {
      await prisma.watchlistItem.update({
        where: { id: watcher.id },
        data: { notified: true },
      });
      results.notified++;
    }
  }

  return results;
}
