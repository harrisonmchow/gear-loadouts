export interface ScrapedPrice {
  itemName: string;
  retailerName: string;
  retailerUrl: string;
  priceCents: number;
  currency: string;
}

export interface Scraper {
  name: string;
  scrape(): Promise<ScrapedPrice[]>;
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
