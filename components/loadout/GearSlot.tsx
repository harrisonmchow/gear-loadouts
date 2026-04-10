"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatWeight, formatPrice, cn } from "@/lib/utils";
import { getGearCategoryMeta } from "@/lib/gear-categories";
import { usePreferences } from "@/stores/preferences";
import { useRemoveLoadoutItem } from "@/hooks/use-loadout";
import { SubstituteModal } from "./SubstituteModal";
import { Plus, ArrowRightLeft, Trash2 } from "lucide-react";
import type { LoadoutItemWithGear } from "@/types";

interface GearSlotProps {
  slotType: string;
  label: string;
  loadoutId: string;
  item: LoadoutItemWithGear | null;
}

export function GearSlot({ slotType, label, loadoutId, item }: GearSlotProps) {
  const [showSubstitute, setShowSubstitute] = useState(false);
  const { weightUnit } = usePreferences();
  const removeItem = useRemoveLoadoutItem(loadoutId);
  const meta = getGearCategoryMeta(slotType);

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    if (!item) return;
    removeItem.mutate(item.id);
  }

  return (
    <>
      <Card
        className="cursor-pointer transition-colors hover:bg-accent/50"
        onClick={() => setShowSubstitute(true)}
      >
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge
              variant="outline"
              className={cn("text-xs", meta.badgeClass)}
            >
              {label}
            </Badge>
            <div className="flex items-center gap-1">
              {item ? (
                <>
                  <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={handleRemove}
                    disabled={removeItem.isPending}
                    title="Remove from loadout"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
          </div>
          {item ? (
            <div className="space-y-1">
              <Link
                href={`/items/${item.gearId}`}
                className="font-medium leading-tight hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {item.gear.name}
              </Link>
              <p className="text-sm text-muted-foreground">{item.gear.brand}</p>
              <div className="flex gap-3 pt-1 text-sm text-muted-foreground">
                <span>{formatWeight(item.gear.weightGrams, weightUnit)}</span>
                <span>
                  {formatPrice(item.gear.priceCents, item.gear.currency)}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-16 items-center justify-center">
              <p className="text-sm text-muted-foreground">Add gear</p>
            </div>
          )}
        </CardContent>
      </Card>

      <SubstituteModal
        open={showSubstitute}
        onOpenChange={setShowSubstitute}
        slotType={slotType}
        loadoutId={loadoutId}
        currentGearId={item?.gearId}
      />
    </>
  );
}
