import { withErrorHandling } from "@server/middleware/with-error-handling";
import { successResponse } from "@server/lib/api-response";
import { prisma } from "@/lib/prisma";

export const GET = withErrorHandling(async () => {
  const [items, edges] = await Promise.all([
    prisma.gearItem.findMany({
      include: { category: true },
      where: { isDiscontinued: false },
    }),
    prisma.upgradeEdge.findMany({
      include: {
        from: { include: { category: true } },
        to: { include: { category: true } },
      },
    }),
  ]);

  return successResponse(
    { items, edges },
    200,
    "public, s-maxage=300, stale-while-revalidate=600"
  );
});
