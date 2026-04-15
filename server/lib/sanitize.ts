/**
 * Recursively strips HTML tags and trims whitespace from all string values
 * in an object. Runs automatically after Zod parsing in withValidation.
 */
export function sanitizeStrings<T>(input: T): T {
  if (typeof input === "string") {
    return input.replace(/<[^>]*>/g, "").trim() as unknown as T;
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeStrings) as unknown as T;
  }
  if (input !== null && typeof input === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      result[key] = sanitizeStrings(value);
    }
    return result as T;
  }
  return input;
}
