import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gear = await prisma.userGear.findMany({
    where: { userId: session.user.id },
    include: { gear: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(gear);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { gearId, status, purchasePrice, notes } = body;

  if (!gearId || !status) {
    return NextResponse.json({ error: "gearId and status required" }, { status: 400 });
  }

  const existing = await prisma.userGear.findUnique({
    where: { userId_gearId: { userId: session.user.id, gearId } },
  });

  if (existing) {
    return NextResponse.json({ error: "Already in collection" }, { status: 409 });
  }

  const userGear = await prisma.userGear.create({
    data: {
      userId: session.user.id,
      gearId,
      status,
      purchasePrice,
      notes,
    },
    include: { gear: { include: { category: true } } },
  });

  return NextResponse.json(userGear, { status: 201 });
}
