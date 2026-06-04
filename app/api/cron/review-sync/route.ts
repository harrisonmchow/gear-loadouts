import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withCronAuth } from "@server/middleware/with-cron-auth";
import { successResponse } from "@server/lib/api-response";
import { syncReviews } from "@server/services/review.service";

export const GET = withCronAuth(
  withErrorHandling(async () => {
    const result = await syncReviews();
    return successResponse(result);
  })
);
