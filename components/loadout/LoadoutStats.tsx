"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import type { LoadoutItemWithGear } from "@/types";
import { Weight, DollarSign } from "lucide-react";

interface LoadoutStatsProps {
  items: LoadoutItemWithGear[];
}

export function LoadoutStats({ items }: LoadoutStatsProps) {
  const { weightUnit, toggleWeightUnit } = usePreferences();

  const totalWeight = items.reduce(
    (sum, item) => sum + (item.gear.weightGrams ?? 0) * item.quantity,
    0
  );

  const totalCost = items.reduce(
    (sum, item) => sum + (item.gear.priceCents ?? 0) * item.quantity,
    0
  );

  // Determine dominant currency from items
  const currencies = items
    .map((i) => i.gear.currency)
    .filter(Boolean);
  const currency = currencies.length > 0 ? currencies[0] : "AUD";
  const mixedCurrency = new Set(currencies).size > 1;

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <Weight className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Base Weight</p>
            <Button
              variant="link"
              className="h-auto p-0 text-lg font-semibold"
              onClick={toggleWeightUnit}
            >
              {formatWeight(totalWeight, weightUnit)}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">
              Total Cost{mixedCurrency ? " (mixed currencies)" : ` (${currency})`}
            </p>
            <p className="text-lg font-semibold">
              {formatPrice(totalCost, currency)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
