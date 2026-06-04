import { prisma } from "@/lib/prisma";
import { NotFoundError, ValidationError } from "@server/lib/errors";
import type { z } from "zod";
import type { updateProfileSchema } from "@/lib/validators";

export async function getPublicProfile(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
      bio: true,
      region: true,
      createdAt: true,
      _count: { select: { followers: true, following: true } },
      loadouts: {
        where: { isActive: true },
        include: {
          items: { include: { gear: { include: { category: true } } } },
        },
      },
      ownedGear: {
        include: { gear: { include: { category: true } } },
        orderBy: { createdAt: "desc" },
      },
      reviews: {
        include: { gear: { include: { category: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) throw new NotFoundError("User not found");
  return user;
}

export async function updateProfile(
  userId: string,
  data: z.infer<typeof updateProfileSchema>
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.bio !== undefined && { bio: data.bio }),
      ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
      ...(data.preferences !== undefined && { preferences: data.preferences }),
    },
  });
}

export async function followUser(followerId: string, followingId: string) {
  if (followerId === followingId) {
    throw new ValidationError("Cannot follow yourself");
  }

  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId, followingId } },
    update: {},
    create: { followerId, followingId },
  });

  return { success: true };
}

export async function unfollowUser(followerId: string, followingId: string) {
  await prisma.follow.deleteMany({
    where: { followerId, followingId },
  });

  return { success: true };
}
