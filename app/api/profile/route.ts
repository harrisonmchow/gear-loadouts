import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { bio, avatarUrl, preferences } = body;

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(bio !== undefined && { bio }),
      ...(avatarUrl !== undefined && { avatarUrl }),
      ...(preferences !== undefined && { preferences }),
    },
  });

  return NextResponse.json(updated);
}
