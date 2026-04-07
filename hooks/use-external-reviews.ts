import { useQuery } from "@tanstack/react-query";
import type { ExternalReviewWithSource } from "@/types";

export function useExternalReviews(gearId: string) {
  return useQuery<ExternalReviewWithSource[]>({
    queryKey: ["external-reviews", gearId],
    queryFn: async () => {
      const res = await fetch(`/api/external-reviews?gearId=${gearId}`);
      if (!res.ok) throw new Error("Failed to fetch external reviews");
      return res.json();
    },
    enabled: !!gearId,
  });
}
