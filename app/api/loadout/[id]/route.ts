import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { successResponse, errorResponse } from "@server/lib/api-response";
import {
  renameLoadout,
  switchLoadout,
  upsertLoadoutItem,
  removeLoadoutItem,
  deleteLoadout,
} from "@server/services/loadout.service";

export const PATCH = withErrorHandling(
  withAuth(async (request, { session, params }) => {
    const { id } = await params;
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      return errorResponse("Invalid JSON body", 400);
    }

    if (body.name !== undefined) {
      const updated = await renameLoadout(session.user.id, id, String(body.name));
      return successResponse(updated);
    }

    if (body.isActive) {
      const updated = await switchLoadout(session.user.id, id);
      return successResponse(updated);
    }

    const gearId = body.gearId as string | undefined;
    const slotType = body.slotType as string | undefined;
    if (!gearId || !slotType) {
      return errorResponse("gearId and slotType required", 400);
    }

    const updated = await upsertLoadoutItem(session.user.id, id, gearId, slotType);
    return successResponse(updated);
  })
);

export const DELETE = withErrorHandling(
  withAuth(async (request, { session, params }) => {
    const { id } = await params;
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      // no body is fine for full deletion
    }

    if (body.itemId) {
      const updated = await removeLoadoutItem(session.user.id, id, String(body.itemId));
      return successResponse(updated);
    }

    const result = await deleteLoadout(session.user.id, id);
    return successResponse(result);
  })
);
