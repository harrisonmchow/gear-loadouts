import type { GearItemWithCategory } from "@/types";

/** djb2 hash — deterministic number from a string */
function hashCode(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

/** Produce a deterministic rating between 2.5 and 5.0 for a given item + field */
function mockRating(itemId: string, field: string): number {
  const h = hashCode(`${itemId}:${field}`);
  // Map to 2.5–5.0 range with one decimal
  return Math.round((2.5 + (h % 2500) / 1000) * 10) / 10;
}

/** Generate mock review ratings for all category-specific fields of an item */
export function generateMockRatings(
  item: GearItemWithCategory
): Record<string, number> {
  const fields = item.category.ratingFields as string[];
  const ratings: Record<string, number> = {};
  for (const field of fields) {
    ratings[field] = mockRating(item.id, field);
  }
  return ratings;
}
