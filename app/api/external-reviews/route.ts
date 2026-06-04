import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse, errorResponse } from "@server/lib/api-response";
import { getExternalReviews } from "@server/services/review.service";

export const GET = withErrorHandling(async (request) => {
  const url = new URL(request.url);
  const gearId = url.searchParams.get("gearId");
  const unmatched = url.searchParams.get("unmatched") === "true";

  const reviews = await getExternalReviews(gearId, unmatched);

  if (reviews === null) {
    return errorResponse("gearId or unmatched=true required", 400);
  }

  return successResponse(
    reviews,
    200,
    "public, s-maxage=60, stale-while-revalidate=120"
  );
});
