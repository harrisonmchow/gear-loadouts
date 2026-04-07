"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useAddToWatchlist } from "@/hooks/use-marketplace";
import { ExternalLink, Eye } from "lucide-react";
import type { DealWithGear } from "@/types";

interface DealCardProps {
  deal: DealWithGear;
}

export function DealCard({ deal }: DealCardProps) {
  const addToWatchlist = useAddToWatchlist();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="font-medium leading-tight">{deal.gear.name}</p>
            <p className="text-sm text-muted-foreground">{deal.gear.brand}</p>
          </div>
          <Badge className="ml-2 shrink-0 bg-green-600">
            -{deal.discountPct}%
          </Badge>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold">
            {formatPrice(deal.priceCents)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            {formatPrice(deal.normalPrice)}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {deal.retailerName}
        </p>

        <div className="mt-3 flex gap-2">
          <Button size="sm" asChild className="flex-1">
            <a href={deal.retailerUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1 h-3 w-3" />
              Go to deal
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => addToWatchlist.mutate({ gearId: deal.gearId })}
            disabled={addToWatchlist.isPending}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
