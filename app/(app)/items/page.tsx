"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllGearSearch } from "@/hooks/use-loadout";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "tent", label: "Shelter" },
  { value: "sleeping_bag", label: "Sleeping Bag / Quilt" },
  { value: "sleeping_pad", label: "Sleeping Pad" },
  { value: "backpack", label: "Backpack" },
  { value: "pillow", label: "Pillow" },
  { value: "cook_system", label: "Cook System" },
  { value: "water_filtration", label: "Water Filtration" },
];

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { weightUnit } = usePreferences();

  const { data: items, isLoading } = useAllGearSearch(
    search || undefined,
    category === "all" ? undefined : category
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gear Items</h1>

      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      )}

      {items && items.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">
          No gear items found
        </p>
      )}

      {items && items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} href={`/items/${item.id}`}>
              <Card className="h-full transition-colors hover:bg-accent/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-tight">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.brand}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-2 shrink-0 text-xs">
                      {item.category.displayName}
                    </Badge>
                  </div>
                  <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                    <span>{formatWeight(item.weightGrams, weightUnit)}</span>
                    <span>{formatPrice(item.priceCents, item.currency)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
