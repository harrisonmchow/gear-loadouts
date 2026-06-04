import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import {
  updateWatchlistItem,
  removeFromWatchlist,
} from "@server/services/marketplace.service";
import { updateWatchlistSchema } from "@/lib/validators";

export const PATCH = withErrorHandling(
  withAuthAndValidation(updateWatchlistSchema, async (_req, { session, data, params }) => {
    const { id } = await params;
    const updated = await updateWatchlistItem(session.user.id, id, data);
    return successResponse(updated);
  })
);

export const DELETE = withErrorHandling(
  withAuth(async (_req, { session, params }) => {
    const { id } = await params;
    const result = await removeFromWatchlist(session.user.id, id);
    return successResponse(result);
  })
);
