import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
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

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { gearId, maxPrice } = body;

  if (!gearId) {
    return NextResponse.json({ error: "gearId required" }, { status: 400 });
  }

  const item = await prisma.watchlistItem.upsert({
    where: {
      userId_gearId: { userId: session.user.id, gearId },
    },
    update: { maxPrice: maxPrice ?? null },
    create: {
      userId: session.user.id,
      gearId,
      maxPrice: maxPrice ?? null,
    },
    include: { gear: { include: { category: true } } },
  });

  return NextResponse.json(item, { status: 201 });
}
