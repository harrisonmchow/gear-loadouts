import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import {
  getActiveLoadout,
  getAllLoadouts,
  createLoadout,
} from "@server/services/loadout.service";
import { createLoadoutSchema } from "@/lib/validators";

export const GET = withErrorHandling(
  withAuth(async (request, { session }) => {
    const url = new URL(request.url);
    const all = url.searchParams.get("all");

    if (all) {
      const loadouts = await getAllLoadouts(session.user.id);
      return successResponse(loadouts);
    }

    const loadout = await getActiveLoadout(session.user.id);
    return successResponse(loadout);
  })
);

export const POST = withErrorHandling(
  withAuthAndValidation(createLoadoutSchema, async (_req, { session, data }) => {
    const loadout = await createLoadout(session.user.id, data.name);
    return successResponse(loadout, 201);
  })
);
