import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse } from "@server/lib/api-response";
import { getGearItem } from "@server/services/gear.service";

export const GET = withErrorHandling(async (_request, { params }) => {
  const { id } = await params;
  const item = await getGearItem(id);
  return successResponse(item, 200, "public, s-maxage=60, stale-while-revalidate=120");
});
