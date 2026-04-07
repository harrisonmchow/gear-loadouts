import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { endpoint, p256dh, auth: authKey } = body;

  if (!endpoint || !p256dh || !authKey) {
    return NextResponse.json(
      { error: "Missing subscription fields" },
      { status: 400 }
    );
  }

  await prisma.pushSubscription.upsert({
    where: { userId: session.user.id },
    update: { endpoint, p256dh, auth: authKey },
    create: {
      userId: session.user.id,
      endpoint,
      p256dh,
      auth: authKey,
    },
  });

  return NextResponse.json({ success: true });
}
