"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatWeight, formatPrice, cn } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { Star } from "lucide-react";
import type { GearItemWithCategory } from "@/types";

type GearNodeData = {
  item: GearItemWithCategory;
  isTerminal: boolean;
  isGreyedOut: boolean;
};

function GearNodeComponent({ data }: NodeProps) {
  const { item, isTerminal, isGreyedOut } = data as unknown as GearNodeData;
  const { weightUnit } = usePreferences();

  return (
    <div className="relative">
      <Handle type="target" position={Position.Left} className="!bg-primary" />
      <Card
        className={cn(
          "w-60 transition-opacity",
          isGreyedOut && "opacity-40",
          isTerminal && "ring-2 ring-yellow-400"
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-tight">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.brand}</p>
            </div>
            {isTerminal && (
              <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {formatWeight(item.weightGrams, weightUnit)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {formatPrice(item.priceCents, item.currency)}
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Handle type="source" position={Position.Right} className="!bg-primary" />
    </div>
  );
}

export const GearNode = memo(GearNodeComponent);
