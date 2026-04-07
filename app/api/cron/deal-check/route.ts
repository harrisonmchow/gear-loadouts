import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Placeholder: in production, this would run scrapers and detect deals
  // For now, just return status
  const activeDeals = await prisma.deal.count({ where: { isActive: true } });

  return NextResponse.json({
    success: true,
    activeDeals,
    message: "Deal check completed",
  });
}
