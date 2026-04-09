"use client";

import { useMemo, useCallback, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
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
import type { Node } from "@xyflow/react";

const nodeTypes: NodeTypes = { gearNode: GearNode };
const edgeTypes: EdgeTypes = { upgradeEdge: UpgradeEdge };

interface UpgradeGraphProps {
  items: GearItemWithCategory[];
  edges: UpgradeEdgeWithItems[];
  preferences: UserPreferences;
  categoryFilter?: string;
  onNodeClick?: (item: GearItemWithCategory) => void;
}

export function UpgradeGraphView({
  items,
  edges: upgradeEdges,
  preferences,
  categoryFilter,
  onNodeClick,
}: UpgradeGraphProps) {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => buildFilteredGraph(items, upgradeEdges, preferences, categoryFilter),
    [items, upgradeEdges, preferences, categoryFilter]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onInit = useCallback((instance: { fitView: () => void }) => {
    instance.fitView();
  }, []);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const data = node.data as unknown as { item: GearItemWithCategory };
      onNodeClick?.(data.item);
    },
    [onNodeClick]
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
    }),
    []
  );

  return (
    <div className="h-[600px] w-full rounded-lg border bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
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
