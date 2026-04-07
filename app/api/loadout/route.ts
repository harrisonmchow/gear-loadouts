import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const all = url.searchParams.get("all");

  if (all) {
    const loadouts = await prisma.loadout.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { gear: { include: { category: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(loadouts);
  }

  let loadout = await prisma.loadout.findFirst({
    where: { userId: session.user.id, isActive: true },
    include: {
      items: {
        include: { gear: { include: { category: true } } },
      },
    },
  });

  if (!loadout) {
    loadout = await prisma.loadout.create({
      data: {
        userId: session.user.id,
        name: "My Loadout",
        isActive: true,
      },
      include: {
        items: {
          include: { gear: { include: { category: true } } },
        },
      },
    });
  }

  return NextResponse.json(loadout);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  // Enforce max 3 loadouts
  const count = await prisma.loadout.count({
    where: { userId: session.user.id },
  });
  if (count >= 3) {
    return NextResponse.json(
      { error: "Maximum of 3 loadouts reached. Delete one first." },
      { status: 400 }
    );
  }

  // Deactivate current active loadout
  await prisma.loadout.updateMany({
    where: { userId: session.user.id, isActive: true },
    data: { isActive: false },
  });

  const loadout = await prisma.loadout.create({
    data: {
      userId: session.user.id,
      name: name || "New Loadout",
      isActive: true,
    },
    include: {
      items: {
        include: { gear: { include: { category: true } } },
      },
    },
  });

  return NextResponse.json(loadout, { status: 201 });
}
