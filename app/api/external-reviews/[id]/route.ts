import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { updateExternalReview } from "@server/services/review.service";
import { updateExternalReviewSchema } from "@/lib/validators";

export const PATCH = withErrorHandling(
  withAuthAndValidation(updateExternalReviewSchema, async (_req, { data, params }) => {
    const { id } = await params;
    const updated = await updateExternalReview(id, data.gearId, data.isVerified);
    return successResponse(updated);
  })
);
