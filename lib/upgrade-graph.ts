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

  // Build adjacency list for DAG layout (longest-path ranking)
  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  for (const id of visibleIds) {
    adj.set(id, []);
    inDegree.set(id, 0);
  }
  for (const e of visibleEdges) {
    adj.get(e.fromId)!.push(e.toId);
    inDegree.set(e.toId, (inDegree.get(e.toId) ?? 0) + 1);
  }

  // Kahn's algorithm + longest-path rank computation
  const rank = new Map<string, number>();
  const queue: string[] = [];
  for (const [id, deg] of inDegree) {
    if (deg === 0) {
      queue.push(id);
      rank.set(id, 0);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const curRank = rank.get(cur)!;
    for (const next of adj.get(cur) ?? []) {
      rank.set(next, Math.max(rank.get(next) ?? 0, curRank + 1));
      inDegree.set(next, inDegree.get(next)! - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  // Determine each node's lane from incoming edge paths
  // Lane order: ultralight (top), budget (center), comfort (bottom)
  const LANE_Y: Record<string, number> = {
    ultralight: -180,
    budget: 0,
    comfort: 180,
  };

  // Collect paths that touch each item (from incoming + outgoing edges)
  const itemPaths = new Map<string, Set<string>>();
  for (const e of visibleEdges) {
    const paths: string[] = (e as unknown as { path?: string[] }).path ?? [];
    for (const p of paths) {
      if (!itemPaths.has(e.fromId)) itemPaths.set(e.fromId, new Set());
      if (!itemPaths.has(e.toId)) itemPaths.set(e.toId, new Set());
      itemPaths.get(e.fromId)!.add(p);
      itemPaths.get(e.toId)!.add(p);
    }
  }

  function getLaneY(itemId: string): number {
    const paths = itemPaths.get(itemId);
    if (!paths || paths.size === 0) return LANE_Y.budget;
    // If item sits on multiple non-budget paths, average them for a centered position
    const nonBudget = [...paths].filter((p) => p !== "budget");
    if (nonBudget.length === 0) return LANE_Y.budget;
    const sum = nonBudget.reduce((acc, p) => acc + (LANE_Y[p] ?? 0), 0);
    return sum / nonBudget.length;
  }

  // Group by (rank, laneY) to detect collisions and offset within a cell
  const cellMap = new Map<string, number>();

  const H_SPACING = 300;

  const nodes: Node[] = [];

  for (const item of visibleItems) {
    const r = rank.get(item.id) ?? 0;
    const baseY = getLaneY(item.id);
    const cellKey = `${r}:${baseY}`;
    const cellIdx = cellMap.get(cellKey) ?? 0;
    cellMap.set(cellKey, cellIdx + 1);

    const exceedsPrefs = isExceedingPreferences(item, preferences);
    const isTerminal = !hasOutgoing.has(item.id);

    nodes.push({
      id: item.id,
      type: "gearNode",
      position: { x: r * H_SPACING, y: baseY + cellIdx * 140 },
      data: {
        item,
        isTerminal,
        isGreyedOut: exceedsPrefs,
      },
    });
  }

  const edges: Edge[] = visibleEdges.map((e) => ({
    id: e.id,
    source: e.fromId,
    target: e.toId,
    type: "upgradeEdge",
    data: { edgeType: e.edgeType, path: (e as unknown as { path?: string[] }).path ?? [], notes: e.notes },
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
