"use client";

import { useMemo, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { GearNode } from "./GearNode";
import { UpgradeEdge } from "./UpgradeEdgeComponent";
import { buildFilteredGraph } from "@/lib/upgrade-graph";
import type {
  GearItemWithCategory,
  UpgradeEdgeWithItems,
  UserPreferences,
} from "@/types";

const nodeTypes: NodeTypes = { gearNode: GearNode };
const edgeTypes: EdgeTypes = { upgradeEdge: UpgradeEdge };

interface UpgradeGraphProps {
  items: GearItemWithCategory[];
  edges: UpgradeEdgeWithItems[];
  preferences: UserPreferences;
  categoryFilter?: string;
}

export function UpgradeGraphView({
  items,
  edges: upgradeEdges,
  preferences,
  categoryFilter,
}: UpgradeGraphProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildFilteredGraph(items, upgradeEdges, preferences, categoryFilter),
    [items, upgradeEdges, preferences, categoryFilter]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((instance: { fitView: () => void }) => {
    instance.fitView();
  }, []);

  return (
    <div className="h-[600px] w-full rounded-lg border bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
