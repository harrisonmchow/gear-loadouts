export interface MatchResult {
  gearId: string;
  score: number;
}

interface GearCandidate {
  id: string;
  name: string;
  brand: string;
}

/**
 * Normalize a string for matching: lowercase, strip punctuation, collapse whitespace.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Tokenize into individual words.
 */
function tokenize(text: string): string[] {
  return normalize(text).split(" ").filter(Boolean);
}

/**
 * Calculate token overlap ratio: how many of the needle tokens appear in the haystack.
 */
function tokenOverlap(needleTokens: string[], haystackTokens: Set<string>): number {
  if (needleTokens.length === 0) return 0;
  let matches = 0;
  for (const token of needleTokens) {
    if (haystackTokens.has(token)) matches++;
  }
  return matches / needleTokens.length;
}

/**
 * Match a review title to the best-matching GearItem.
 *
 * Scoring:
 * - Brand match contributes 0.3 (brand tokens found in title)
 * - Name match contributes 0.7 (name tokens found in title)
 * - Only returns matches with score >= 0.4
 */
export function matchReviewToGear(
  title: string,
  gearItems: GearCandidate[]
): MatchResult | null {
  const titleTokens = new Set(tokenize(title));

  if (titleTokens.size === 0) return null;

  let bestMatch: MatchResult | null = null;

  for (const item of gearItems) {
    const brandTokens = tokenize(item.brand);
    const nameTokens = tokenize(item.name);

    // Brand must have at least partial presence in title
    const brandScore = tokenOverlap(brandTokens, titleTokens);
    if (brandScore === 0) continue;

    const nameScore = tokenOverlap(nameTokens, titleTokens);
    const totalScore = brandScore * 0.3 + nameScore * 0.7;

    if (totalScore >= 0.4 && (!bestMatch || totalScore > bestMatch.score)) {
      bestMatch = { gearId: item.id, score: totalScore };
    }
  }

  return bestMatch;
}
