import { useQuery } from "@tanstack/react-query";
import type { GearItemWithCategory, ReviewWithUser } from "@/types";

type WhereToBuyEntry = {
  retailer: string;
  url: string;
  priceCents: number;
  currency: string;
};

export type GearItemDetail = GearItemWithCategory & {
  reviews: ReviewWithUser[];
  imageUrls?: string[];
  whereToBuy?: WhereToBuyEntry[];
};

export function useGearItem(id: string) {
  return useQuery<GearItemDetail>({
    queryKey: ["gear-item", id],
    queryFn: async () => {
      const res = await fetch(`/api/gear/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    },
  });
}

export function useCategoryItems(categoryName: string | undefined) {
  return useQuery<GearItemWithCategory[]>({
    queryKey: ["gear-items", categoryName],
    queryFn: async () => {
      const res = await fetch(`/api/gear?category=${categoryName}`);
      if (!res.ok) throw new Error("Failed to fetch category items");
      return res.json();
    },
    enabled: !!categoryName,
  });
}
