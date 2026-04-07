"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { SubstituteModal } from "./SubstituteModal";
import { Plus, ArrowRightLeft } from "lucide-react";
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

  return (
    <>
      <Card
        className="cursor-pointer transition-colors hover:bg-accent/50"
        onClick={() => setShowSubstitute(true)}
      >
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {label}
            </Badge>
            {item ? (
              <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
            ) : (
              <Plus className="h-3.5 w-3.5 text-muted-foreground" />
            )}
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
