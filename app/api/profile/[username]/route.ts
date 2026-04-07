import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      bio: true,
      region: true,
      createdAt: true,
      _count: { select: { followers: true, following: true } },
      loadouts: {
        where: { isActive: true },
        include: {
          items: { include: { gear: { include: { category: true } } } },
        },
      },
      ownedGear: {
        include: { gear: { include: { category: true } } },
        orderBy: { createdAt: "desc" },
      },
      reviews: {
        include: { gear: { include: { category: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
