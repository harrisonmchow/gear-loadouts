import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse } from "@server/lib/api-response";
import { searchGear } from "@server/services/gear.service";

export const GET = withErrorHandling(async (request) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const q = url.searchParams.get("q");

  const items = await searchGear(category, q);
  return successResponse(items, 200, "public, s-maxage=60, stale-while-revalidate=120");
});
