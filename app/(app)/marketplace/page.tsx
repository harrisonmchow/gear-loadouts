"use client";

import { useState } from "react";
import { useDeals, useWatchlist } from "@/hooks/use-marketplace";
import { DealCard } from "@/components/marketplace/DealCard";
import { WatchlistPanel } from "@/components/marketplace/WatchlistPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "tent", label: "Shelter" },
  { value: "sleeping_bag", label: "Sleeping Bags" },
  { value: "sleeping_pad", label: "Sleeping Pads" },
  { value: "backpack", label: "Backpacks" },
  { value: "pillow", label: "Pillows" },
  { value: "cook_stove", label: "Stove" },
  { value: "cook_pot", label: "Pot / Pan" },
  { value: "water_filter", label: "Water Filter" },
  { value: "water_container", label: "Water Container" },
];

export default function MarketplacePage() {
  const [category, setCategory] = useState("all");
  const { data: deals, isLoading: dealsLoading } = useDeals(
    category !== "all" ? { category } : undefined
  );
  const { data: watchlist, isLoading: watchlistLoading } = useWatchlist();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Marketplace</h1>

      <Tabs defaultValue="deals">
        <TabsList>
          <TabsTrigger value="deals">All Deals</TabsTrigger>
          <TabsTrigger value="watchlist">
            Watchlist{watchlist?.length ? ` (${watchlist.length})` : ""}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="space-y-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {dealsLoading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          )}

          {deals && deals.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}

          {deals?.length === 0 && !dealsLoading && (
            <p className="py-16 text-center text-muted-foreground">
              No active deals right now. Check back soon!
            </p>
          )}
        </TabsContent>

        <TabsContent value="watchlist">
          {watchlistLoading ? (
            <Skeleton className="h-64" />
          ) : (
            <WatchlistPanel items={watchlist ?? []} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
