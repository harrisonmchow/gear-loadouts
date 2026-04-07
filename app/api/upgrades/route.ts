import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [items, edges] = await Promise.all([
    prisma.gearItem.findMany({
      include: { category: true },
      where: { isDiscontinued: false },
    }),
    prisma.upgradeEdge.findMany({
      include: {
        from: { include: { category: true } },
        to: { include: { category: true } },
      },
    }),
  ]);

  return NextResponse.json({ items, edges });
}
