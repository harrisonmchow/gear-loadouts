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

  const userGear = await prisma.userGear.findUnique({ where: { id } });
  if (!userGear || userGear.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.userGear.update({
    where: { id },
    data: { status: body.status },
    include: { gear: { include: { category: true } } },
  });

  return NextResponse.json(updated);
}
