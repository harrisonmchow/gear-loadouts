import type { Node, Edge } from "@xyflow/react";
import type {
  GearItemWithCategory,
  UpgradeEdgeWithItems,
  UserPreferences,
} from "@/types";

const EDGE_COLORS: Record<string, string> = {
  quality: "#22c55e",
  value: "#3b82f6",
  alternative: "#f59e0b",
  similar: "#a855f7",
};

export function buildFilteredGraph(
  allItems: GearItemWithCategory[],
  allEdges: UpgradeEdgeWithItems[],
  preferences: UserPreferences,
  categoryFilter?: string
): { nodes: Node[]; edges: Edge[] } {
  // Get item IDs that appear in edges
  const edgeItemIds = new Set<string>();
  allEdges.forEach((e) => {
    edgeItemIds.add(e.fromId);
    edgeItemIds.add(e.toId);
  });

  // Filter items in edges + optional category filter
  let visibleItems = allItems.filter((item) => edgeItemIds.has(item.id));

  if (categoryFilter) {
    visibleItems = visibleItems.filter(
      (item) => item.category.name === categoryFilter
    );
  }

  // Apply preference filters (grey out rather than remove)
  const visibleIds = new Set(visibleItems.map((i) => i.id));

  // Filter edges to visible items
  const visibleEdges = allEdges.filter(
    (e) => visibleIds.has(e.fromId) && visibleIds.has(e.toId)
  );

  // Find terminal nodes (no outgoing edges)
  const hasOutgoing = new Set(visibleEdges.map((e) => e.fromId));

  // Group by category for layout
  const byCategory = new Map<string, GearItemWithCategory[]>();
  visibleItems.forEach((item) => {
    const cat = item.category.name;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(item);
  });

  const nodes: Node[] = [];
  let yOffset = 0;

  for (const [, catItems] of byCategory) {
    catItems.forEach((item, i) => {
      const exceedsPrefs = isExceedingPreferences(item, preferences);
      const isTerminal = !hasOutgoing.has(item.id);

      nodes.push({
        id: item.id,
        type: "gearNode",
        position: { x: i * 280, y: yOffset },
        data: {
          item,
          isTerminal,
          isGreyedOut: exceedsPrefs,
        },
      });
    });
    yOffset += 200;
  }

  const edges: Edge[] = visibleEdges.map((e) => ({
    id: e.id,
    source: e.fromId,
    target: e.toId,
    type: "upgradeEdge",
    data: { edgeType: e.edgeType, notes: e.notes },
    style: { stroke: EDGE_COLORS[e.edgeType] ?? "#888" },
    animated: e.edgeType === "quality",
  }));

  return { nodes, edges };
}

function isExceedingPreferences(
  item: GearItemWithCategory,
  prefs: UserPreferences
): boolean {
  if (
    prefs.maxTentPrice &&
    item.category.name === "tent" &&
    item.priceCents &&
    item.priceCents > prefs.maxTentPrice * 100
  ) {
    return true;
  }
  if (
    prefs.maxPackWeight &&
    item.weightGrams &&
    item.weightGrams > prefs.maxPackWeight
  ) {
    return true;
  }
  return false;
}
