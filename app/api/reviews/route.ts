import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const gearId = url.searchParams.get("gearId");

  if (!gearId) {
    return NextResponse.json({ error: "gearId required" }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { gearId },
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { gearId, rating, ratings, body: reviewBody } = body;

  if (!gearId || !rating || !ratings || !reviewBody) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Check ownership
  const ownership = await prisma.userGear.findUnique({
    where: { userId_gearId: { userId: session.user.id, gearId } },
  });

  if (!ownership || ownership.status !== "owned") {
    return NextResponse.json(
      { error: "You must own this item to review it" },
      { status: 403 }
    );
  }

  // Check existing review
  const existing = await prisma.review.findUnique({
    where: { userId_gearId: { userId: session.user.id, gearId } },
  });

  if (existing) {
    return NextResponse.json(
      { error: "You already reviewed this item" },
      { status: 409 }
    );
  }

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      gearId,
      rating,
      ratings,
      body: reviewBody,
    },
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
  });

  return NextResponse.json(review, { status: 201 });
}
