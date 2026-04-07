import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q");

  const items = await prisma.gearItem.findMany({
    where: {
      ...(category && {
        category: { name: category },
      }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { brand: { contains: q, mode: "insensitive" } },
        ],
      }),
      isDiscontinued: false,
    },
    include: { category: true },
    orderBy: [{ brand: "asc" }, { name: "asc" }],
    take: 50,
  });

  return NextResponse.json(items);
}
