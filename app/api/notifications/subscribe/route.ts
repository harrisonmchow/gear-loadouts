import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { subscribeRateLimit } from "@server/middleware/rate-limit";
import { successResponse } from "@server/lib/api-response";
import { savePushSubscription } from "@server/services/notification.service";
import { pushSubscriptionSchema } from "@/lib/validators";

export const POST = subscribeRateLimit(
  withErrorHandling(
    withAuthAndValidation(pushSubscriptionSchema, async (_req, { session, data }) => {
      const result = await savePushSubscription(session.user.id, data);
      return successResponse(result);
    })
  )
);
