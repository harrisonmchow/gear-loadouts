"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGearSearch, useUpdateLoadoutItem } from "@/hooks/use-loadout";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { Check } from "lucide-react";
import type { GearItemWithCategory } from "@/types";

// Map loadout slot types to DB category names for search
const SLOT_TO_CATEGORY: Record<string, string> = {
  cook_stove: "cook_system",
  cook_pot: "cook_system",
  water_filter: "water_filtration",
  water_container: "water_filtration",
};

interface SubstituteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slotType: string;
  loadoutId: string;
  currentGearId?: string;
}

export function SubstituteModal({
  open,
  onOpenChange,
  slotType,
  loadoutId,
  currentGearId,
}: SubstituteModalProps) {
  const [search, setSearch] = useState("");
  const { weightUnit } = usePreferences();
  const searchCategory = SLOT_TO_CATEGORY[slotType] ?? slotType;
  const { data: items, isLoading } = useGearSearch(searchCategory, search);
  const updateItem = useUpdateLoadoutItem(loadoutId);

  function handleSelect(item: GearItemWithCategory) {
    updateItem.mutate(
      { gearId: item.id, slotType },
      { onSuccess: () => onOpenChange(false) }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-hidden sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose gear</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Search by name or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="max-h-96 space-y-2 overflow-y-auto">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          {items?.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="h-auto w-full justify-start p-3 text-left"
              onClick={() => handleSelect(item)}
              disabled={updateItem.isPending}
            >
              <div className="flex w-full items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-tight">{item.name}</p>
                  <div className="flex gap-2 pt-0.5 text-sm text-muted-foreground">
                    <span>{item.brand}</span>
                    <span>{formatWeight(item.weightGrams, weightUnit)}</span>
                    <span>{formatPrice(item.priceCents, item.currency)}</span>
                  </div>
                </div>
                {item.id === currentGearId && (
                  <Badge variant="secondary" className="ml-2 shrink-0">
                    <Check className="mr-1 h-3 w-3" />
                    Current
                  </Badge>
                )}
              </div>
            </Button>
          ))}
          {items?.length === 0 && !isLoading && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No gear found
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
