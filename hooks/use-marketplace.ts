import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { DealWithGear, WatchlistItemWithGear } from "@/types";

export function useDeals(filters?: {
  category?: string;
  retailer?: string;
  minDiscount?: number;
}) {
  return useQuery<DealWithGear[]>({
    queryKey: ["deals", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.category) params.set("category", filters.category);
      if (filters?.retailer) params.set("retailer", filters.retailer);
      if (filters?.minDiscount)
        params.set("minDiscount", String(filters.minDiscount));
      const res = await fetch(`/api/marketplace/deals?${params}`);
      if (!res.ok) throw new Error("Failed to fetch deals");
      return res.json();
    },
  });
}

export function useWatchlist() {
  return useQuery<WatchlistItemWithGear[]>({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await fetch("/api/watchlist");
      if (!res.ok) throw new Error("Failed to fetch watchlist");
      return res.json();
    },
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { gearId: string; maxPrice?: number }) => {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add to watchlist");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/watchlist/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from watchlist");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

export function useUpdateWatchlistPrice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      maxPrice,
    }: {
      id: string;
      maxPrice: number | null;
    }) => {
      const res = await fetch(`/api/watchlist/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maxPrice }),
      });
      if (!res.ok) throw new Error("Failed to update price alert");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}
