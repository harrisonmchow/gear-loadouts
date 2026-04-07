import type { Scraper, ScrapedPrice } from "./base-scraper";
import { delay } from "./base-scraper";

export class SnowysScraper implements Scraper {
  name = "Snowys";

  async scrape(): Promise<ScrapedPrice[]> {
    // Placeholder: in production, use Cheerio/Playwright to scrape snowys.com.au
    // Respects robots.txt and rate limits
    const delayMs = parseInt(process.env.SCRAPER_DELAY_MS ?? "2000");
    await delay(delayMs);

    // Return empty for now — real implementation would fetch product pages
    return [];
  }
}
