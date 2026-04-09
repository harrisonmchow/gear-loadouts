"use client";

import { useState, useMemo } from "react";
import { useUpgradeGraph } from "@/hooks/use-upgrades";
import { UpgradeGraphView } from "@/components/upgrades/UpgradeGraph";
import { ItemDetailSheet } from "@/components/upgrades/ItemDetailSheet";
import { CompareItemPicker } from "@/components/upgrades/CompareItemPicker";
import { GearCompareModal } from "@/components/shared/GearCompareModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import type { GearItemWithCategory } from "@/types";
import type { UserPreferences } from "@/types";

const CATEGORIES = [
  { name: "tent", label: "Shelter" },
  { name: "sleeping_bag", label: "Sleeping Bags" },
  { name: "sleeping_pad", label: "Sleeping Pads" },
  { name: "backpack", label: "Backpacks" },
];

export default function UpgradesPage() {
  const { data, isLoading } = useUpgradeGraph();
  const [category, setCategory] = useState("tent");
  const [preferences] = useState<UserPreferences>({});

  // Detail sheet state
  const [selectedItem, setSelectedItem] = useState<GearItemWithCategory | null>(
    null
  );

  // Compare flow state
  const [compareItemA, setCompareItemA] =
    useState<GearItemWithCategory | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [compareItemB, setCompareItemB] =
    useState<GearItemWithCategory | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  // Items in the current category (for compare picker)
  const categoryItems = useMemo(() => {
    if (!data) return [];
    return data.items.filter((item) => item.category.name === category);
  }, [data, category]);

  // Picker items: same category, excluding the item being compared
  const pickerItems = useMemo(() => {
    if (!compareItemA) return categoryItems;
    return categoryItems.filter((item) => item.id !== compareItemA.id);
  }, [categoryItems, compareItemA]);

  const handleCompare = (item: GearItemWithCategory) => {
    setCompareItemA(item);
    setSelectedItem(null);
    setShowPicker(true);
  };

  const handlePickerSelect = (item: GearItemWithCategory) => {
    setCompareItemB(item);
    setShowPicker(false);
    setShowCompare(true);
  };

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
        categoryFilter={category}
        onNodeClick={setSelectedItem}
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

      {/* Item detail sheet */}
      <ItemDetailSheet
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
        }}
        onCompare={handleCompare}
      />

      {/* Compare item picker */}
      <CompareItemPicker
        open={showPicker}
        onOpenChange={setShowPicker}
        items={pickerItems}
        onSelect={handlePickerSelect}
      />

      {/* Compare modal */}
      <GearCompareModal
        open={showCompare}
        onOpenChange={setShowCompare}
        itemA={compareItemA}
        itemB={compareItemB}
      />
    </div>
  );
}
