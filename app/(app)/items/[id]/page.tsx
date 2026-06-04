"use client";

import { use, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePreferences } from "@/stores/preferences";
import {
  useAddToWatchlist,
  useRemoveFromWatchlist,
  useWatchlist,
} from "@/hooks/use-marketplace";
import { useUserGear, useAddUserGear, useUpdateUserGear } from "@/hooks/use-profile";
import { useSession } from "next-auth/react";
import { useGearItem, useCategoryItems } from "@/hooks/use-gear";
import { CompareItemPicker } from "@/components/upgrades/CompareItemPicker";
import { GearCompareModal } from "@/components/shared/GearCompareModal";
import { ItemPhotoGallery } from "@/components/items/ItemPhotoGallery";
import { ItemHeader } from "@/components/items/ItemHeader";
import { ItemStats } from "@/components/items/ItemStats";
import { ItemSpecs } from "@/components/items/ItemSpecs";
import { ItemWhereToBuy } from "@/components/items/ItemWhereToBuy";
import { ItemReviews } from "@/components/items/ItemReviews";
import { ExternalReviewsList } from "@/components/shared/ExternalReviewsList";
import { generateMockRatings } from "@/lib/mock-ratings";
import { ArrowLeftRight } from "lucide-react";
import type { GearItemWithCategory } from "@/types";

const GearRadarChart = dynamic(
  () =>
    import("@/components/upgrades/GearRadarChart").then((m) => m.GearRadarChart),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[280px] w-full" />,
  }
);

type WhereToBuyEntry = {
  retailer: string;
  url: string;
  priceCents: number;
  currency: string;
};

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: item, isLoading } = useGearItem(id);
  const { weightUnit } = usePreferences();
  const { data: watchlist } = useWatchlist();
  const addToWatchlist = useAddToWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();
  const [showUnwatchConfirm, setShowUnwatchConfirm] = useState(false);
  const { data: userGear } = useUserGear();
  const addUserGear = useAddUserGear();
  const updateUserGear = useUpdateUserGear();

  const [showPicker, setShowPicker] = useState(false);
  const [compareItem, setCompareItem] = useState<GearItemWithCategory | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const { data: categoryItems } = useCategoryItems(item?.category.name);
  const pickerItems = useMemo(
    () => (categoryItems ?? []).filter((i) => i.id !== id),
    [categoryItems, id]
  );

  const watchlistEntry = watchlist?.find((w) => w.gearId === id);
  const ownedEntry = userGear?.find((g) => g.gearId === id);
  const isOwned = ownedEntry?.status === "owned";
  const hasReviewed = item?.reviews.some(
    (r) => r.user.username === session?.user?.name
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (!item) {
    return <p className="text-muted-foreground">Item not found</p>;
  }

  const specs = (item.specs ?? {}) as Record<string, unknown>;
  const specEntries = Object.entries(specs).filter(
    ([key, val]) => key !== "notes" && val != null && val !== ""
  );
  const notes = specs.notes as string | undefined;
  const imageUrls = (item.imageUrls ?? []) as string[];
  const whereToBuy = (item.whereToBuy ?? []) as WhereToBuyEntry[];
  const ratingFields = (item.category.ratingFields ?? []) as string[];

  return (
    <div className="space-y-6">
      <ItemPhotoGallery imageUrls={imageUrls} itemName={item.name} />

      <ItemHeader
        item={item}
        ownedEntry={ownedEntry}
        watchlistEntry={watchlistEntry}
        showUnwatchConfirm={showUnwatchConfirm}
        onShowUnwatchConfirm={setShowUnwatchConfirm}
        onOwnershipToggle={() =>
          updateUserGear.mutate({
            id: ownedEntry!.id,
            status: isOwned ? "want" : "owned",
          })
        }
        onAddOwnership={() => addUserGear.mutate({ gearId: id, status: "owned" })}
        onAddToWatchlist={() => addToWatchlist.mutate({ gearId: id })}
        onRemoveFromWatchlist={() => {
          if (watchlistEntry) removeFromWatchlist.mutate(watchlistEntry.id);
        }}
        isAddingOwnership={addUserGear.isPending}
        isUpdatingOwnership={updateUserGear.isPending}
        isAddingToWatchlist={addToWatchlist.isPending}
        isRemovingFromWatchlist={removeFromWatchlist.isPending}
      />

      <ItemStats item={item} weightUnit={weightUnit} />

      <ItemSpecs specEntries={specEntries} notes={notes} />

      <ItemWhereToBuy entries={whereToBuy} />

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Community Ratings</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPicker(true)}
            >
              <ArrowLeftRight className="mr-1.5 h-4 w-4" />
              Compare
            </Button>
          </div>
          <GearRadarChart
            items={[
              {
                name: item.name,
                ratings: generateMockRatings(item),
                color: "#68b0ab",
              },
            ]}
            fields={ratingFields}
          />
        </CardContent>
      </Card>

      <CompareItemPicker
        open={showPicker}
        onOpenChange={setShowPicker}
        items={pickerItems}
        onSelect={(selected) => {
          setCompareItem(selected);
          setShowPicker(false);
          setShowCompare(true);
        }}
      />

      <GearCompareModal
        open={showCompare}
        onOpenChange={setShowCompare}
        itemA={item}
        itemB={compareItem}
      />

      <ItemReviews
        reviews={item.reviews}
        gearId={id}
        ratingFields={ratingFields}
        isOwned={!!isOwned}
        hasReviewed={!!hasReviewed}
        onReviewSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["gear-item", id] })
        }
      />

      <div>
        <h2 className="mb-3 text-lg font-semibold">External Reviews</h2>
        <ExternalReviewsList gearId={id} />
      </div>
    </div>
  );
}
