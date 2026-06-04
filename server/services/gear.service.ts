import { prisma } from "@/lib/prisma";
import { NotFoundError, ConflictError } from "@server/lib/errors";
import type { z } from "zod";
import type { addUserGearSchema, updateUserGearSchema } from "@/lib/validators";

export async function searchGear(category?: string | null, q?: string | null) {
  return prisma.gearItem.findMany({
    where: {
      ...(category && { category: { name: category } }),
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
}

export async function getGearItem(id: string) {
  const item = await prisma.gearItem.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: {
          user: { select: { id: true, username: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!item) throw new NotFoundError("Item not found");
  return item;
}

export async function getUserGear(userId: string) {
  return prisma.userGear.findMany({
    where: { userId },
    include: { gear: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function addUserGear(
  userId: string,
  data: z.infer<typeof addUserGearSchema>
) {
  const existing = await prisma.userGear.findUnique({
    where: { userId_gearId: { userId, gearId: data.gearId } },
  });

  if (existing) throw new ConflictError("Already in collection");

  return prisma.userGear.create({
    data: {
      userId,
      gearId: data.gearId,
      status: data.status,
      purchasePrice: data.purchasePrice,
      notes: data.notes,
    },
    include: { gear: { include: { category: true } } },
  });
}

export async function updateUserGear(
  userId: string,
  id: string,
  data: z.infer<typeof updateUserGearSchema>
) {
  const userGear = await prisma.userGear.findUnique({ where: { id } });
  if (!userGear || userGear.userId !== userId) throw new NotFoundError();

  return prisma.userGear.update({
    where: { id },
    data: { status: data.status },
    include: { gear: { include: { category: true } } },
  });
}
