"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { ExternalReviewsList } from "./ExternalReviewsList";
import type { GearItemWithCategory } from "@/types";

interface GearCompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemA: GearItemWithCategory | null;
  itemB: GearItemWithCategory | null;
}

export function GearCompareModal({
  open,
  onOpenChange,
  itemA,
  itemB,
}: GearCompareModalProps) {
  const { weightUnit } = usePreferences();

  if (!itemA || !itemB) return null;

  const specsA = (itemA.specs ?? {}) as Record<string, unknown>;
  const specsB = (itemB.specs ?? {}) as Record<string, unknown>;
  const allSpecKeys = [
    ...new Set([...Object.keys(specsA), ...Object.keys(specsB)]),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Compare Gear</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 text-sm">
          {/* Header row */}
          <div />
          <div className="font-medium">{itemA.name}</div>
          <div className="font-medium">{itemB.name}</div>

          {/* Brand */}
          <div className="text-muted-foreground">Brand</div>
          <div>{itemA.brand}</div>
          <div>{itemB.brand}</div>

          {/* Weight */}
          <div className="text-muted-foreground">Weight</div>
          <div>
            <CompareValue
              a={itemA.weightGrams}
              b={itemB.weightGrams}
              lower
              format={(v) => formatWeight(v, weightUnit)}
            />
          </div>
          <div>
            <CompareValue
              a={itemB.weightGrams}
              b={itemA.weightGrams}
              lower
              format={(v) => formatWeight(v, weightUnit)}
            />
          </div>

          {/* Price */}
          <div className="text-muted-foreground">Price</div>
          <div>{formatPrice(itemA.priceCents, itemA.currency)}</div>
          <div>{formatPrice(itemB.priceCents, itemB.currency)}</div>

          {/* Specs */}
          {allSpecKeys
            .filter((k) => k !== "notes")
            .map((key) => (
              <div key={key} className="contents">
                <div className="capitalize text-muted-foreground">
                  {key.replace(/_/g, " ")}
                </div>
                <div>{String(specsA[key] ?? "—")}</div>
                <div>{String(specsB[key] ?? "—")}</div>
              </div>
            ))}
        </div>

        {/* External reviews */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <ExternalReviewsList gearId={itemA.id} />
          <ExternalReviewsList gearId={itemB.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CompareValue({
  a,
  b,
  lower,
  format,
}: {
  a: number | null;
  b: number | null;
  lower: boolean;
  format: (v: number | null) => string;
}) {
  const formatted = format(a);
  if (a == null || b == null) return <span>{formatted}</span>;

  const isBetter = lower ? a < b : a > b;
  return (
    <span className="flex items-center gap-1">
      {formatted}
      {isBetter && (
        <Badge variant="secondary" className="text-[10px] text-green-600">
          Better
        </Badge>
      )}
    </span>
  );
}
