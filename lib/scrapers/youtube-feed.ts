import { XMLParser } from "fast-xml-parser";
import { delay } from "./base-scraper";

export interface FeedEntry {
  title: string;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: Date;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

/**
 * Fetch the latest videos from a YouTube channel's RSS feed.
 * Each channel exposes ~15 recent videos at:
 * https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
 */
export async function fetchYouTubeFeed(
  feedUrl: string
): Promise<FeedEntry[]> {
  const delayMs = parseInt(process.env.SCRAPER_DELAY_MS ?? "2000", 10);
  await delay(delayMs);

  const res = await fetch(feedUrl);
  if (!res.ok) {
    console.warn(`YouTube feed fetch failed (${res.status}): ${feedUrl}`);
    return [];
  }

  const xml = await res.text();
  const parsed = parser.parse(xml);

  const entries = parsed?.feed?.entry;
  if (!entries) return [];

  const items = Array.isArray(entries) ? entries : [entries];

  return items.map((entry: Record<string, unknown>) => {
    const mediaGroup = entry["media:group"] as Record<string, unknown> | undefined;
    const thumbnail = mediaGroup?.["media:thumbnail"] as Record<string, string> | undefined;

    return {
      title: String(entry.title ?? ""),
      url: String(
        (entry.link as Record<string, string>)?.["@_href"] ?? ""
      ),
      thumbnailUrl: thumbnail?.["@_url"] ?? null,
      publishedAt: new Date(String(entry.published ?? "")),
    };
  });
}
