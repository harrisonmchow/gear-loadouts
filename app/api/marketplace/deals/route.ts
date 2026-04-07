import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const retailer = url.searchParams.get("retailer");
  const minDiscount = url.searchParams.get("minDiscount");

  const deals = await prisma.deal.findMany({
    where: {
      isActive: true,
      ...(category && {
        gear: { category: { name: category } },
      }),
      ...(retailer && { retailerName: retailer }),
      ...(minDiscount && {
        discountPct: { gte: parseInt(minDiscount) },
      }),
    },
    include: { gear: { include: { category: true } } },
    orderBy: { foundAt: "desc" },
    take: 50,
  });

  return NextResponse.json(deals);
}
