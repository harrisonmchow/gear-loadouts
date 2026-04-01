// scripts/scrape-au-retailers.ts
// Playwright scraper to fill in missing prices / items from JS-heavy AU retailers.
// Run with: npx ts-node scripts/scrape-au-retailers.ts
// Install: npm install playwright @types/playwright
// Then: npx playwright install chromium

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// ── Config ─────────────────────────────────────────────────────────────────

const DELAY_MS = 1500; // be polite

interface ScrapedItem {
  name: string;
  brand: string;
  priceCents: number | null;
  weightGrams: number | null;
  href: string;
  inStock: boolean;
  source: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── Scrapers ────────────────────────────────────────────────────────────────

/**
 * Macpac — Magento-based. Products loaded via JS.
 * Selectors confirmed via browser inspection April 2026.
 */
async function scrapeMacpac(page: Page, category: string, url: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Macpac: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-component="product-card"]', { timeout: 10000 }).catch(() => {});

  return page.evaluate((source) => {
    const cards = document.querySelectorAll('[data-component="product-card"]');
    const results: ScrapedItem[] = [];
    cards.forEach((card) => {
      const name = card.querySelector('h3, .product-name, [class*="name"]')?.textContent?.trim() ?? '';
      const priceText = card.querySelector('[class*="price"]')?.textContent?.trim() ?? '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const href = (card.querySelector('a') as HTMLAnchorElement)?.href ?? '';
      const outOfStock = card.textContent?.toLowerCase().includes('out of stock') ?? false;
      if (name) {
        results.push({
          name,
          brand: 'Macpac',
          priceCents: isNaN(price) ? null : Math.round(price * 100),
          weightGrams: null, // scraped separately from product page
          href,
          inStock: !outOfStock,
          source,
        });
      }
    });
    return results;
  }, `macpac.com.au`);
}

/**
 * Kathmandu — Shopify-based.
 * Products loaded via collections JSON endpoint — much cleaner than DOM scraping.
 */
async function scrapeKathmandu(category: string, collectionHandle: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Kathmandu collection: ${collectionHandle}`);
  const url = `https://www.kathmandu.com.au/collections/${collectionHandle}/products.json?limit=250`;
  const res = await fetch(url);
  const json = await res.json() as { products: any[] };

  return json.products.map((p: any) => {
    const variant = p.variants?.[0];
    const price = variant?.price ? Math.round(parseFloat(variant.price) * 100) : null;
    const available = p.variants?.some((v: any) => v.available) ?? false;
    return {
      name: p.title,
      brand: p.vendor ?? 'Kathmandu',
      priceCents: price,
      weightGrams: null,
      href: `https://www.kathmandu.com.au/products/${p.handle}`,
      inStock: available,
      source: 'kathmandu.com.au',
    };
  });
}

/**
 * Paddy Pallin — Magento. Uses page.goto + DOM scraping.
 */
async function scrapePaddyPallin(page: Page, url: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Paddy Pallin: ${url}`);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await delay(2000);

  return page.evaluate(() => {
    const items = document.querySelectorAll('.product-item-info, .item.product');
    const results: ScrapedItem[] = [];
    items.forEach((item) => {
      const name = item.querySelector('.product-item-name, .product-name')?.textContent?.trim() ?? '';
      const priceText = item.querySelector('[data-price-type="finalPrice"] .price, .price')?.textContent?.trim() ?? '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
      const href = (item.querySelector('a.product-item-link, a.product-item-photo') as HTMLAnchorElement)?.href ?? '';
      if (name) {
        results.push({
          name,
          brand: '',
          priceCents: isNaN(price) ? null : Math.round(price * 100),
          weightGrams: null,
          href,
          inStock: !item.querySelector('.unavailable, .out-of-stock'),
          source: 'paddypallin.com.au',
        });
      }
    });
    return results;
  });
}

/**
 * Decathlon — Shopify. Use products.json for clean extraction.
 */
async function scrapeDecathlon(collectionHandle: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Decathlon collection: ${collectionHandle}`);
  const url = `https://www.decathlon.com.au/collections/${collectionHandle}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json() as { products: any[] };

  return json.products.map((p: any) => {
    const variant = p.variants?.[0];
    const price = variant?.price ? Math.round(parseFloat(variant.price) * 100) : null;
    const available = p.variants?.some((v: any) => v.available) ?? false;

    // Try to extract weight from description / tags
    const desc: string = p.body_html ?? '';
    const weightMatch = desc.match(/(\d[\d.,]+)\s*g(?:rams?)?/i);
    const weightGrams = weightMatch ? parseInt(weightMatch[1].replace(',', ''), 10) : null;

    return {
      name: p.title,
      brand: p.vendor ?? 'Decathlon',
      priceCents: price,
      weightGrams,
      href: `https://www.decathlon.com.au/products/${p.handle}`,
      inStock: available,
      source: 'decathlon.com.au',
    };
  });
}

/**
 * Sea to Summit AU — Shopify. Use products.json.
 */
async function scrapeSeaToSummit(collectionHandle: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Sea to Summit: ${collectionHandle}`);
  const url = `https://seatosummit.com.au/collections/${collectionHandle}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json() as { products: any[] };

  return json.products.map((p: any) => {
    const variant = p.variants?.[0];
    const price = variant?.price ? Math.round(parseFloat(variant.price) * 100) : null;
    const available = p.variants?.some((v: any) => v.available) ?? false;
    const desc: string = p.body_html ?? '';
    const weightMatch = desc.match(/Weight[:\s]+(\d[\d.,]+)\s*g/i);
    const weightGrams = weightMatch ? parseInt(weightMatch[1].replace(',', ''), 10) : null;

    return {
      name: p.title,
      brand: 'Sea to Summit',
      priceCents: price,
      weightGrams,
      href: `https://seatosummit.com.au/products/${p.handle}`,
      inStock: available,
      source: 'seatosummit.com.au',
    };
  });
}

/**
 * Zorali — Shopify. Use products.json.
 */
async function scrapeZorali(collectionHandle: string): Promise<ScrapedItem[]> {
  console.log(`Scraping Zorali: ${collectionHandle}`);
  const url = `https://www.zorali.com/collections/${collectionHandle}/products.json?limit=250`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const json = await res.json() as { products: any[] };

  return json.products.map((p: any) => {
    const variant = p.variants?.[0];
    // Zorali prices are in AUD cents * 100 (standard Shopify)
    const price = variant?.price ? Math.round(parseFloat(variant.price) * 100) : null;
    const available = p.variants?.some((v: any) => v.available) ?? false;
    const desc: string = p.body_html ?? '';
    const weightMatch = desc.match(/(\d[\d.,]+)\s*g(?:rams?)?/i);
    const weightGrams = weightMatch ? parseInt(weightMatch[1].replace(',', ''), 10) : null;

    return {
      name: p.title,
      brand: 'Zorali',
      priceCents: price,
      weightGrams,
      href: `https://www.zorali.com/products/${p.handle}`,
      inStock: available,
      source: 'zorali.com',
    };
  });
}

// ── Collection handles ───────────────────────────────────────────────────────

const targets = {
  tents: {
    kathmandu: 'camping-tents',
    decathlon: 'tents',
    seatosummit: 'tents',
    zorali: 'tents',
    paddypallin: 'https://www.paddypallin.com.au/equipment/camping/tents.html',
    macpac: 'https://www.macpac.com.au/outdoor-equipment/tents-and-gazebos/tents',
  },
  sleepingBags: {
    kathmandu: 'sleeping-bags',
    decathlon: 'sleeping-bags',
    seatosummit: 'sleeping-bags',
    zorali: 'sleeping-bags-1',
    paddypallin: 'https://www.paddypallin.com.au/equipment/camping/sleeping-bags-and-liners.html',
    macpac: 'https://www.macpac.com.au/outdoor-equipment/sleeping-gear/sleeping-bags',
  },
  sleepingPads: {
    kathmandu: 'camp-beds-mats',
    decathlon: 'sleeping-mats',
    seatosummit: 'sleeping-pads',
    zorali: 'sleeping-bags-1',
    paddypallin: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    macpac: 'https://www.macpac.com.au/outdoor-equipment/sleeping-gear',
  },
  backpacks: {
    kathmandu: 'hiking-packs',
    decathlon: 'hiking-backpacks',
    seatosummit: 'bags-and-packs',
    zorali: 'backpacks',
    paddypallin: 'https://www.paddypallin.com.au/equipment/packs/hiking-packs.html',
    macpac: 'https://www.macpac.com.au/backpacks-bags/outdoor-adventure/hiking',
  },
  pillows: {
    kathmandu: 'camp-beds-mats',
    decathlon: 'camping-pillows',
    seatosummit: 'camping-pillows',
    zorali: 'camp-goods',
    paddypallin: 'https://www.paddypallin.com.au/equipment/camping/sleeping-mats-and-pillows.html',
    macpac: 'https://www.macpac.com.au/outdoor-equipment/sleeping-gear',
  },
};

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Suppress images/fonts for speed
  await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf}', (route) => route.abort());

  const allResults: Record<string, ScrapedItem[]> = {
    tents: [],
    sleepingBags: [],
    sleepingPads: [],
    backpacks: [],
    pillows: [],
  };

  for (const [category, sources] of Object.entries(targets)) {
    console.log(`\n── Category: ${category} ──`);

    // Shopify JSON endpoints (no browser needed)
    if (sources.kathmandu) {
      const items = await scrapeKathmandu(category, sources.kathmandu).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }
    if (sources.decathlon) {
      const items = await scrapeDecathlon(sources.decathlon).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }
    if (sources.seatosummit) {
      const items = await scrapeSeaToSummit(sources.seatosummit).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }
    if (sources.zorali) {
      const items = await scrapeZorali(sources.zorali).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }

    // Magento sites — need browser
    if (sources.paddypallin) {
      const items = await scrapePaddyPallin(page, sources.paddypallin).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }
    if (sources.macpac) {
      const items = await scrapeMacpac(page, category, sources.macpac).catch((e) => { console.error(e); return []; });
      allResults[category].push(...items);
      await delay(DELAY_MS);
    }
  }

  await browser.close();

  // Write results to JSON for review before merging into .ts seed files
  const outDir = path.join(__dirname, '../prisma/data/scraped');
  fs.mkdirSync(outDir, { recursive: true });

  for (const [category, items] of Object.entries(allResults)) {
    // Deduplicate by name
    const seen = new Set<string>();
    const deduped = items.filter((item) => {
      const key = item.name.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const outPath = path.join(outDir, `${category}.json`);
    fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2));
    console.log(`Wrote ${deduped.length} items → ${outPath}`);
  }

  console.log('\n✅ Scrape complete. Review /prisma/data/scraped/*.json and merge into seed files.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});