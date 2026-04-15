import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withAuth } from "@server/middleware/with-auth";
import { successResponse } from "@server/lib/api-response";
import { followUser, unfollowUser } from "@server/services/profile.service";

export const POST = withErrorHandling(
  withAuth(async (_req, { session, params }) => {
    const { userId } = await params;
    const result = await followUser(session.user.id, userId);
    return successResponse(result);
  })
);

export const DELETE = withErrorHandling(
  withAuth(async (_req, { session, params }) => {
    const { userId } = await params;
    const result = await unfollowUser(session.user.id, userId);
    return successResponse(result);
  })
);
