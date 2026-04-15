import { prisma } from "@/lib/prisma";
import { NotFoundError, ValidationError } from "@server/lib/errors";

const LOADOUT_INCLUDE = {
  items: {
    include: { gear: { include: { category: true } } },
  },
} as const;

export async function getActiveLoadout(userId: string) {
  let loadout = await prisma.loadout.findFirst({
    where: { userId, isActive: true },
    include: LOADOUT_INCLUDE,
  });

  if (!loadout) {
    loadout = await prisma.loadout.create({
      data: { userId, name: "My Loadout", isActive: true },
      include: LOADOUT_INCLUDE,
    });
  }

  return loadout;
}

export async function getAllLoadouts(userId: string) {
  return prisma.loadout.findMany({
    where: { userId },
    include: LOADOUT_INCLUDE,
    orderBy: { createdAt: "desc" },
  });
}

export async function createLoadout(userId: string, name: string) {
  const count = await prisma.loadout.count({ where: { userId } });
  if (count >= 3) {
    throw new ValidationError("Maximum of 3 loadouts reached. Delete one first.");
  }

  await prisma.loadout.updateMany({
    where: { userId, isActive: true },
    data: { isActive: false },
  });

  return prisma.loadout.create({
    data: { userId, name: name || "New Loadout", isActive: true },
    include: LOADOUT_INCLUDE,
  });
}

export async function renameLoadout(userId: string, id: string, name: string) {
  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== userId) throw new NotFoundError();

  return prisma.loadout.update({
    where: { id },
    data: { name },
    include: LOADOUT_INCLUDE,
  });
}

export async function switchLoadout(userId: string, id: string) {
  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== userId) throw new NotFoundError();

  await prisma.loadout.updateMany({
    where: { userId, isActive: true },
    data: { isActive: false },
  });

  return prisma.loadout.update({
    where: { id },
    data: { isActive: true },
    include: LOADOUT_INCLUDE,
  });
}

export async function upsertLoadoutItem(
  userId: string,
  id: string,
  gearId: string,
  slotType: string
) {
  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== userId) throw new NotFoundError();

  await prisma.loadoutItem.deleteMany({ where: { loadoutId: id, slotType } });
  await prisma.loadoutItem.create({ data: { loadoutId: id, gearId, slotType } });

  return prisma.loadout.findUnique({ where: { id }, include: LOADOUT_INCLUDE });
}

export async function removeLoadoutItem(
  userId: string,
  loadoutId: string,
  itemId: string
) {
  const loadout = await prisma.loadout.findUnique({ where: { id: loadoutId } });
  if (!loadout || loadout.userId !== userId) throw new NotFoundError();

  await prisma.loadoutItem.delete({ where: { id: itemId } });

  return prisma.loadout.findUnique({ where: { id: loadoutId }, include: LOADOUT_INCLUDE });
}

export async function deleteLoadout(userId: string, id: string) {
  const loadout = await prisma.loadout.findUnique({ where: { id } });
  if (!loadout || loadout.userId !== userId) throw new NotFoundError();

  await prisma.loadout.delete({ where: { id } });

  if (loadout.isActive) {
    const next = await prisma.loadout.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    if (next) {
      await prisma.loadout.update({
        where: { id: next.id },
        data: { isActive: true },
      });
    }
  }

  return { success: true };
}
