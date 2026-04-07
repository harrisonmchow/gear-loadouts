"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { useUpdateUserGear } from "@/hooks/use-profile";
import type { UserGearWithItem } from "@/types";

interface GearCollectionProps {
  items: UserGearWithItem[];
  isOwn: boolean;
}

const statusColors: Record<string, "default" | "secondary" | "outline"> = {
  owned: "default",
  sold: "secondary",
  want: "outline",
};

export function GearCollection({ items, isOwn }: GearCollectionProps) {
  const { weightUnit } = usePreferences();
  const updateGear = useUpdateUserGear();

  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No gear in collection yet
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-lg border p-3"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-medium leading-tight">{item.gear.name}</p>
              <Badge variant={statusColors[item.status] ?? "secondary"}>
                {item.status}
              </Badge>
            </div>
            <div className="flex gap-3 pt-0.5 text-sm text-muted-foreground">
              <span>{item.gear.brand}</span>
              <span>{item.gear.category.displayName}</span>
              <span>{formatWeight(item.gear.weightGrams, weightUnit)}</span>
              <span>{formatPrice(item.gear.priceCents, item.gear.currency)}</span>
            </div>
          </div>
          {isOwn && item.status === "owned" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateGear.mutate({ id: item.id, status: "sold" })}
              disabled={updateGear.isPending}
            >
              Mark Sold
            </Button>
          )}
          {isOwn && item.status === "want" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateGear.mutate({ id: item.id, status: "owned" })}
              disabled={updateGear.isPending}
            >
              I bought this
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
