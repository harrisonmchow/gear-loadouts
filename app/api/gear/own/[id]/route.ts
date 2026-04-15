import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { updateUserGear } from "@server/services/gear.service";
import { updateUserGearSchema } from "@/lib/validators";

export const PATCH = withErrorHandling(
  withAuthAndValidation(updateUserGearSchema, async (_req, { session, data, params }) => {
    const { id } = await params;
    const updated = await updateUserGear(session.user.id, id, data);
    return successResponse(updated);
  })
);
