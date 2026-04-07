import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const gearId = url.searchParams.get("gearId");
  const unmatched = url.searchParams.get("unmatched");

  if (unmatched === "true") {
    const reviews = await prisma.externalReview.findMany({
      where: { gearId: null },
      include: { source: true },
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json(reviews);
  }

  if (!gearId) {
    return NextResponse.json(
      { error: "gearId or unmatched=true required" },
      { status: 400 }
    );
  }

  const reviews = await prisma.externalReview.findMany({
    where: { gearId },
    include: { source: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(reviews);
}
