import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { withAuthAndValidation } from "@server/middleware/with-auth-validation";
import { successResponse } from "@server/lib/api-response";
import { getWatchlist, addToWatchlist } from "@server/services/marketplace.service";
import { addToWatchlistSchema } from "@/lib/validators";

export const GET = withErrorHandling(
  withAuth(async (_req, { session }) => {
    const items = await getWatchlist(session.user.id);
    return successResponse(items);
  })
);

export const POST = withErrorHandling(
  withAuthAndValidation(addToWatchlistSchema, async (_req, { session, data }) => {
    const item = await addToWatchlist(session.user.id, data);
    return successResponse(item, 201);
  })
);
