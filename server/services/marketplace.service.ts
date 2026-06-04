import { prisma } from "@/lib/prisma";
import { NotFoundError } from "@server/lib/errors";
import type { z } from "zod";
import type { addToWatchlistSchema, updateWatchlistSchema } from "@/lib/validators";

export async function getDeals(
  category?: string | null,
  retailer?: string | null,
  minDiscount?: string | null
) {
  const where: Record<string, unknown> = { isActive: true };

  if (retailer) where.retailerName = retailer;
  if (minDiscount) {
    const pct = parseInt(minDiscount, 10);
    if (!isNaN(pct)) where.discountPct = { gte: pct };
  }

  if (category) {
    where.OR = [
      { gear: { category: { name: category } } },
      { gearId: null },
    ];
  }

  return prisma.deal.findMany({
    where,
    include: { gear: { include: { category: true } } },
    orderBy: { foundAt: "desc" },
    take: 50,
  });
}

export async function getWatchlist(userId: string) {
  return prisma.watchlistItem.findMany({
    where: { userId },
    include: {
      gear: {
        include: {
          category: true,
          deals: {
            where: { isActive: true },
            orderBy: { foundAt: "desc" },
            take: 1,
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function addToWatchlist(
  userId: string,
  data: z.infer<typeof addToWatchlistSchema>
) {
  return prisma.watchlistItem.upsert({
    where: { userId_gearId: { userId, gearId: data.gearId } },
    update: { maxPrice: data.maxPrice ?? null },
    create: {
      userId,
      gearId: data.gearId,
      maxPrice: data.maxPrice ?? null,
    },
    include: { gear: { include: { category: true } } },
  });
}

export async function updateWatchlistItem(
  userId: string,
  id: string,
  data: z.infer<typeof updateWatchlistSchema>
) {
  const item = await prisma.watchlistItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) throw new NotFoundError();

  return prisma.watchlistItem.update({
    where: { id },
    data: { maxPrice: data.maxPrice },
    include: { gear: { include: { category: true } } },
  });
}

export async function removeFromWatchlist(userId: string, id: string) {
  const item = await prisma.watchlistItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) throw new NotFoundError();

  await prisma.watchlistItem.delete({ where: { id } });
  return { success: true };
}

export async function runDealCheck() {
  const activeDeals = await prisma.deal.count({ where: { isActive: true } });
  return { success: true, activeDeals, message: "Deal check completed" };
}
