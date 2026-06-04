import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse } from "@server/lib/api-response";
import { getPublicProfile } from "@server/services/profile.service";

export const GET = withErrorHandling(async (_request, { params }) => {
  const { username } = await params;
  const user = await getPublicProfile(username);
  return successResponse(user);
});
