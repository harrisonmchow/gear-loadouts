import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse } from "@server/lib/api-response";
import { getDeals } from "@server/services/marketplace.service";

export const GET = withErrorHandling(async (request) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const retailer = url.searchParams.get("retailer");
  const minDiscount = url.searchParams.get("minDiscount");

  const deals = await getDeals(category, retailer, minDiscount);
  return successResponse(
    deals,
    200,
    "public, s-maxage=120, stale-while-revalidate=300"
  );
});
