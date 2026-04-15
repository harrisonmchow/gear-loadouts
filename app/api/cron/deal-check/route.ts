import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withCronAuth } from "@server/middleware/with-cron-auth";
import { successResponse } from "@server/lib/api-response";
import { runDealCheck } from "@server/services/marketplace.service";

export const GET = withCronAuth(
  withErrorHandling(async () => {
    const result = await runDealCheck();
    return successResponse(result);
  })
);
