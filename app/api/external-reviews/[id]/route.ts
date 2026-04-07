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
  const { gearId, isVerified } = body;

  const review = await prisma.externalReview.findUnique({ where: { id } });
  if (!review) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.externalReview.update({
    where: { id },
    data: {
      ...(gearId !== undefined && { gearId }),
      ...(isVerified !== undefined && { isVerified }),
    },
    include: { source: true },
  });

  return NextResponse.json(updated);
}
