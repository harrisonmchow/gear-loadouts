import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse, errorResponse } from "@server/lib/api-response";
import { getReviews, createReview } from "@server/services/review.service";
import { createReviewSchema } from "@/lib/validators";
import { reviewRateLimit } from "@server/middleware/rate-limit";

export const GET = withErrorHandling(async (request) => {
  const url = new URL(request.url);
  const gearId = url.searchParams.get("gearId");

  if (!gearId) return errorResponse("gearId required", 400);

  const reviews = await getReviews(gearId);
  return successResponse(reviews);
});

export const POST = reviewRateLimit(
  withErrorHandling(
    withAuthAndValidation(createReviewSchema, async (_req, { session, data }) => {
      const review = await createReview(session.user.id, data);
      return successResponse(review, 201);
    })
  )
);
