import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { updateProfile } from "@server/services/profile.service";
import { updateProfileSchema } from "@/lib/validators";

export const PATCH = withErrorHandling(
  withAuthAndValidation(updateProfileSchema, async (_req, { session, data }) => {
    const updated = await updateProfile(session.user.id, data);
    return successResponse(updated);
  })
);
