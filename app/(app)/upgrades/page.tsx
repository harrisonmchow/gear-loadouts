"use client";

import { useState } from "react";
import { useUpgradeGraph } from "@/hooks/use-upgrades";
import { UpgradeGraphView } from "@/components/upgrades/UpgradeGraph";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserPreferences } from "@/types";

const CATEGORIES = [
  { name: "all", label: "All" },
  { name: "tent", label: "Shelter" },
  { name: "sleeping_bag", label: "Sleeping Bags" },
  { name: "sleeping_pad", label: "Sleeping Pads" },
  { name: "backpack", label: "Backpacks" },
];

export default function UpgradesPage() {
  const { data, isLoading } = useUpgradeGraph();
  const [category, setCategory] = useState("all");
  const [preferences] = useState<UserPreferences>({});

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-[600px]" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-muted-foreground">Failed to load upgrade graph</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upgrade Paths</h1>
      </div>

      <Tabs value={category} onValueChange={setCategory}>
        <TabsList>
          {CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <UpgradeGraphView
        items={data.items}
        edges={data.edges}
        preferences={preferences}
        categoryFilter={category === "all" ? undefined : category}
      />

      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2 w-4 rounded bg-green-500" /> Quality
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-4 rounded bg-blue-500" /> Value
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-4 rounded bg-amber-500" /> Alternative
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-4 rounded bg-purple-500" /> Similar
        </span>
      </div>
    </div>
  );
}
