import { prisma } from "@/lib/prisma";
import { NotFoundError, ForbiddenError, ConflictError } from "@server/lib/errors";
import { fetchYouTubeFeed } from "@/lib/scrapers/youtube-feed";
import { fetchWebsiteFeed } from "@/lib/scrapers/website-feed";
import { matchReviewToGear } from "@/lib/gear-matcher";
import type { z } from "zod";
import type { createReviewSchema } from "@/lib/validators";

export async function getReviews(gearId: string) {
  return prisma.review.findMany({
    where: { gearId },
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createReview(
  userId: string,
  data: z.infer<typeof createReviewSchema>
) {
  const ownership = await prisma.userGear.findUnique({
    where: { userId_gearId: { userId, gearId: data.gearId } },
  });

  if (!ownership || ownership.status !== "owned") {
    throw new ForbiddenError("You must own this item to review it");
  }

  const existing = await prisma.review.findUnique({
    where: { userId_gearId: { userId, gearId: data.gearId } },
  });

  if (existing) throw new ConflictError("You already reviewed this item");

  return prisma.review.create({
    data: {
      userId,
      gearId: data.gearId,
      rating: data.rating,
      ratings: data.ratings,
      body: data.body,
    },
    include: {
      user: { select: { id: true, username: true, avatarUrl: true } },
    },
  });
}

export async function getExternalReviews(
  gearId?: string | null,
  unmatched?: boolean
) {
  if (unmatched) {
    return prisma.externalReview.findMany({
      where: { gearId: null },
      include: { source: true },
      orderBy: { publishedAt: "desc" },
    });
  }

  if (!gearId) return null;

  return prisma.externalReview.findMany({
    where: { gearId },
    include: { source: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function updateExternalReview(
  id: string,
  gearId?: string | null,
  isVerified?: boolean
) {
  const review = await prisma.externalReview.findUnique({ where: { id } });
  if (!review) throw new NotFoundError();

  return prisma.externalReview.update({
    where: { id },
    data: {
      ...(gearId !== undefined && { gearId }),
      ...(isVerified !== undefined && { isVerified }),
    },
    include: { source: true },
  });
}

export async function syncReviews() {
  const sources = await prisma.externalReviewSource.findMany({
    where: { isActive: true },
  });

  const gearItems = await prisma.gearItem.findMany({
    select: { id: true, name: true, brand: true },
  });

  let newReviews = 0;
  let matched = 0;
  let unmatched = 0;

  for (const source of sources) {
    const entries =
      source.type === "youtube"
        ? await fetchYouTubeFeed(source.feedUrl)
        : await fetchWebsiteFeed(source.feedUrl);

    for (const entry of entries) {
      if (!entry.url) continue;

      const existing = await prisma.externalReview.findUnique({
        where: { url: entry.url },
      });
      if (existing) continue;

      const match = matchReviewToGear(entry.title, gearItems);

      await prisma.externalReview.create({
        data: {
          sourceId: source.id,
          gearId: match?.gearId ?? null,
          title: entry.title,
          url: entry.url,
          thumbnailUrl: entry.thumbnailUrl,
          publishedAt: entry.publishedAt,
          matchScore: match?.score ?? null,
          isVerified: match ? match.score >= 0.8 : false,
        },
      });

      newReviews++;
      if (match) matched++;
      else unmatched++;
    }
  }

  return { newReviews, matched, unmatched, sourcesChecked: sources.length };
}
