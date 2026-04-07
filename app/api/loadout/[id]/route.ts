import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Rename loadout
  if (body.name !== undefined) {
    const updated = await prisma.loadout.update({
      where: { id },
      data: { name: body.name },
      include: {
        items: { include: { gear: { include: { category: true } } } },
      },
    });
    return NextResponse.json(updated);
  }

  // Set as active loadout
  if (body.isActive) {
    await prisma.loadout.updateMany({
      where: { userId: session.user.id, isActive: true },
      data: { isActive: false },
    });
    const updated = await prisma.loadout.update({
      where: { id },
      data: { isActive: true },
      include: {
        items: { include: { gear: { include: { category: true } } } },
      },
    });
    return NextResponse.json(updated);
  }

  // Swap/add item in slot
  const { gearId, slotType } = body;
  if (!gearId || !slotType) {
    return NextResponse.json({ error: "gearId and slotType required" }, { status: 400 });
  }

  // Remove existing item in this slot
  await prisma.loadoutItem.deleteMany({
    where: { loadoutId: id, slotType },
  });

  // Add new item
  await prisma.loadoutItem.create({
    data: { loadoutId: id, gearId, slotType },
  });

  const updated = await prisma.loadout.findUnique({
    where: { id },
    include: {
      items: { include: { gear: { include: { category: true } } } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // no body is fine for full deletion
  }

  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Remove specific item
  if (body.itemId) {
    await prisma.loadoutItem.delete({ where: { id: body.itemId as string } });
    const updated = await prisma.loadout.findUnique({
      where: { id },
      include: {
        items: { include: { gear: { include: { category: true } } } },
      },
    });
    return NextResponse.json(updated);
  }

  // Delete entire loadout
  await prisma.loadout.delete({ where: { id } });

  // If the deleted loadout was active, activate the most recent remaining one
  if (loadout.isActive) {
    const next = await prisma.loadout.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    if (next) {
      await prisma.loadout.update({
        where: { id: next.id },
        data: { isActive: true },
      });
    }
  }

  return NextResponse.json({ success: true });
}
