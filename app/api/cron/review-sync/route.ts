import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchYouTubeFeed } from "@/lib/scrapers/youtube-feed";
import { fetchWebsiteFeed } from "@/lib/scrapers/website-feed";
import { matchReviewToGear } from "@/lib/gear-matcher";
import type { FeedEntry } from "@/lib/scrapers/youtube-feed";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    let entries: FeedEntry[];

    if (source.type === "youtube") {
      entries = await fetchYouTubeFeed(source.feedUrl);
    } else {
      entries = await fetchWebsiteFeed(source.feedUrl);
    }

    for (const entry of entries) {
      if (!entry.url) continue;

      // Skip if already stored
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
      if (match) {
        matched++;
      } else {
        unmatched++;
      }
    }
  }

  return NextResponse.json({
    success: true,
    newReviews,
    matched,
    unmatched,
    sourcesChecked: sources.length,
  });
}
