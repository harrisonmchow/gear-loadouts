import { useQuery } from "@tanstack/react-query";
import type { UpgradeEdgeWithItems, GearItemWithCategory } from "@/types";

export interface UpgradeGraphData {
  items: GearItemWithCategory[];
  edges: UpgradeEdgeWithItems[];
}

export function useUpgradeGraph() {
  return useQuery<UpgradeGraphData>({
    queryKey: ["upgrade-graph"],
    queryFn: async () => {
      const res = await fetch("/api/upgrades");
      if (!res.ok) throw new Error("Failed to fetch upgrade graph");
      return res.json();
    },
  });
}
