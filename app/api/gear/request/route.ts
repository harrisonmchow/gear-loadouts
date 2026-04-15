import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { createGearRequest } from "@server/services/gear-request.service";
import { gearRequestSchema } from "@/lib/validators";

export const POST = withErrorHandling(
  withAuthAndValidation(gearRequestSchema, async (_req, { session, data }) => {
    const request = await createGearRequest(session.user.id, data);
    return successResponse(request, 201);
  })
);
