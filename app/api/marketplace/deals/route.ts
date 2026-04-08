import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const retailer = url.searchParams.get("retailer");
  const minDiscount = url.searchParams.get("minDiscount");

  // Build where clause — category filter only applies to item deals
  const where: Record<string, unknown> = { isActive: true };

  if (retailer) where.retailerName = retailer;
  if (minDiscount) where.discountPct = { gte: parseInt(minDiscount) };

  if (category) {
    // When filtering by category, only show item deals for that category
    // plus all site-wide deals
    where.OR = [
      { gear: { category: { name: category } } },
      { gearId: null },
    ];
  }

  const deals = await prisma.deal.findMany({
    where,
    include: { gear: { include: { category: true } } },
    orderBy: { foundAt: "desc" },
    take: 50,
  });

  return NextResponse.json(deals);
}
