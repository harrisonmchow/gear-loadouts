import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { getUserGear, addUserGear } from "@server/services/gear.service";
import { addUserGearSchema } from "@/lib/validators";

export const GET = withErrorHandling(
  withAuth(async (_req, { session }) => {
    const gear = await getUserGear(session.user.id);
    return successResponse(gear);
  })
);

export const POST = withErrorHandling(
  withAuthAndValidation(addUserGearSchema, async (_req, { session, data }) => {
    const userGear = await addUserGear(session.user.id, data);
    return successResponse(userGear, 201);
  })
);
