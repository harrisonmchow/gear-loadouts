"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useRemoveFromWatchlist } from "@/hooks/use-marketplace";
import { Trash2 } from "lucide-react";
import type { WatchlistItemWithGear } from "@/types";

interface WatchlistPanelProps {
  items: WatchlistItemWithGear[];
}

export function WatchlistPanel({ items }: WatchlistPanelProps) {
  const removeItem = useRemoveFromWatchlist();

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        Your watchlist is empty. Add items from deals or the upgrade graph.
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
            <Link
              href={`/items/${item.gearId}`}
              className="font-medium hover:underline"
            >
              {item.gear.name}
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.gear.brand}</span>
              <span>{item.gear.category.displayName}</span>
              {item.maxPrice && (
                <Badge variant="outline" className="text-xs">
                  Alert below {formatPrice(item.maxPrice)}
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem.mutate(item.id)}
            disabled={removeItem.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
