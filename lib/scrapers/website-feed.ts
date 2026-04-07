import { XMLParser } from "fast-xml-parser";
import { delay } from "./base-scraper";
import type { FeedEntry } from "./youtube-feed";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

/**
 * Fetch entries from an RSS 2.0 or Atom feed (gear review websites).
 */
export async function fetchWebsiteFeed(
  feedUrl: string
): Promise<FeedEntry[]> {
  const delayMs = parseInt(process.env.SCRAPER_DELAY_MS ?? "2000", 10);
  await delay(delayMs);

  const res = await fetch(feedUrl);
  if (!res.ok) {
    console.warn(`Website feed fetch failed (${res.status}): ${feedUrl}`);
    return [];
  }

  const xml = await res.text();
  const parsed = parser.parse(xml);

  // RSS 2.0 format
  const rssItems = parsed?.rss?.channel?.item;
  if (rssItems) {
    return parseRssItems(rssItems);
  }

  // Atom format
  const atomEntries = parsed?.feed?.entry;
  if (atomEntries) {
    return parseAtomEntries(atomEntries);
  }

  return [];
}

function parseRssItems(items: unknown): FeedEntry[] {
  const list = Array.isArray(items) ? items : [items];

  return list.map((item: Record<string, unknown>) => {
    const enclosure = item.enclosure as Record<string, string> | undefined;

    return {
      title: String(item.title ?? ""),
      url: String(item.link ?? ""),
      thumbnailUrl: enclosure?.["@_url"] ?? null,
      publishedAt: new Date(String(item.pubDate ?? "")),
    };
  });
}

function parseAtomEntries(entries: unknown): FeedEntry[] {
  const list = Array.isArray(entries) ? entries : [entries];

  return list.map((entry: Record<string, unknown>) => {
    const link = entry.link as Record<string, string> | undefined;

    return {
      title: String(entry.title ?? ""),
      url: String(link?.["@_href"] ?? ""),
      thumbnailUrl: null,
      publishedAt: new Date(String(entry.published ?? entry.updated ?? "")),
    };
  });
}
