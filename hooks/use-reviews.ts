import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReviewWithUser } from "@/types";

export function useReviews(gearId: string) {
  return useQuery<ReviewWithUser[]>({
    queryKey: ["reviews", gearId],
    queryFn: async () => {
      const res = await fetch(`/api/reviews?gearId=${gearId}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
    enabled: !!gearId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      gearId: string;
      rating: number;
      ratings: Record<string, number>;
      body: string;
    }) => {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create review");
      return res.json();
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.gearId] });
    },
  });
}
