"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GearRadarChart } from "./GearRadarChart";
import { generateMockRatings } from "@/lib/mock-ratings";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import type { GearItemWithCategory } from "@/types";

interface ItemDetailSheetProps {
  item: GearItemWithCategory | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompare: (item: GearItemWithCategory) => void;
}

export function ItemDetailSheet({
  item,
  open,
  onOpenChange,
  onCompare,
}: ItemDetailSheetProps) {
  const { weightUnit } = usePreferences();

  if (!item) return null;

  const specs = (item.specs ?? {}) as Record<string, unknown>;
  const fields = item.category.ratingFields as string[];
  const ratings = generateMockRatings(item);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{item.name}</SheetTitle>
          <SheetDescription>{item.brand}</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-6">
          {/* Weight & Price */}
          <div className="flex gap-2">
            <Badge variant="secondary">
              {formatWeight(item.weightGrams, weightUnit)}
            </Badge>
            <Badge variant="outline">
              {formatPrice(item.priceCents, item.currency)}
            </Badge>
          </div>

          {/* Specs */}
          {Object.keys(specs).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Specifications</h3>
              <dl className="space-y-1">
                {Object.entries(specs)
                  .filter(([k]) => k !== "notes")
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between text-sm border-b border-border/50 py-1"
                    >
                      <dt className="text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="font-medium">{String(value)}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          )}

          <Separator />

          {/* Radar Chart */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Community Ratings</h3>
            <GearRadarChart
              items={[{ name: item.name, ratings, color: "#68b0ab" }]}
              fields={fields}
            />
          </div>
        </div>

        <SheetFooter>
          <Button onClick={() => onCompare(item)} className="w-full">
            Compare
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
