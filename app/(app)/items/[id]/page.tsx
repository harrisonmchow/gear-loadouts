"use client";

import { use, useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatWeight, formatPrice, cn } from "@/lib/utils";
import { getGearCategoryMeta } from "@/lib/gear-categories";
import { usePreferences } from "@/stores/preferences";
import { useAddToWatchlist, useRemoveFromWatchlist, useWatchlist } from "@/hooks/use-marketplace";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserGear, useAddUserGear, useUpdateUserGear } from "@/hooks/use-profile";
import { ReviewForm } from "@/components/shared/ReviewForm";
import { GearRadarChart } from "@/components/upgrades/GearRadarChart";
import { CompareItemPicker } from "@/components/upgrades/CompareItemPicker";
import { GearCompareModal } from "@/components/shared/GearCompareModal";
import { generateMockRatings } from "@/lib/mock-ratings";
import { useSession } from "next-auth/react";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
  ImageOff,
  ArrowLeftRight,
  Trophy,
} from "lucide-react";
import type { GearItemWithCategory, ReviewWithUser } from "@/types";

type WhereToBuyEntry = {
  retailer: string;
  url: string;
  priceCents: number;
  currency: string;
};

type GearItemDetail = GearItemWithCategory & {
  reviews: ReviewWithUser[];
  imageUrls?: string[];
  whereToBuy?: WhereToBuyEntry[];
};

function useGearItem(id: string) {
  return useQuery<GearItemDetail>({
    queryKey: ["gear-item", id],
    queryFn: async () => {
      const res = await fetch(`/api/gear/${id}`);
      if (!res.ok) throw new Error("Failed to fetch item");
      return res.json();
    },
  });
}

function useCategoryItems(categoryName: string | undefined) {
  return useQuery<GearItemWithCategory[]>({
    queryKey: ["gear-items", categoryName],
    queryFn: async () => {
      const res = await fetch(`/api/gear?category=${categoryName}`);
      if (!res.ok) throw new Error("Failed to fetch category items");
      return res.json();
    },
    enabled: !!categoryName,
  });
}

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

  // Compare flow state
  const [showPicker, setShowPicker] = useState(false);
  const [compareItem, setCompareItem] = useState<GearItemWithCategory | null>(null);
  const [showCompare, setShowCompare] = useState(false);

  const { data: categoryItems } = useCategoryItems(item?.category.name);
  const pickerItems = useMemo(
    () => (categoryItems ?? []).filter((i) => i.id !== id),
    [categoryItems, id]
  );

  const watchlistEntry = watchlist?.find((w) => w.gearId === id);
  const isOnWatchlist = !!watchlistEntry;
  const ownedEntry = userGear?.find((g) => g.gearId === id);
  const isOwned = ownedEntry?.status === "owned";

  // Check if current user already reviewed this item
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
      {/* Photos */}
      {imageUrls.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${item.name} photo ${i + 1}`}
              className="h-48 w-auto shrink-0 rounded-lg object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          <ImageOff className="mr-2 h-5 w-5" />
          <span className="text-sm">No photos yet</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-lg text-muted-foreground">{item.brand}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={cn(
                getGearCategoryMeta(item.category.name).badgeClass
              )}
            >
              {item.category.displayName}
            </Badge>
            {item.award && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700">
                <Trophy className="mr-1 h-3 w-3" />
                {item.award}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Ownership toggle */}
          {ownedEntry ? (
            <Button
              variant={isOwned ? "default" : "outline"}
              size="sm"
              onClick={() =>
                updateUserGear.mutate({
                  id: ownedEntry.id,
                  status: isOwned ? "want" : "owned",
                })
              }
              disabled={updateUserGear.isPending}
            >
              {isOwned ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4" />
                  Owned
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1.5 h-4 w-4" />
                  Mark as Owned
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                addUserGear.mutate({ gearId: id, status: "owned" })
              }
              disabled={addUserGear.isPending}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" />
              I Own This
            </Button>
          )}

          {/* Watchlist toggle */}
          <Button
            variant={isOnWatchlist ? "secondary" : "outline"}
            size="sm"
            onClick={() => {
              if (isOnWatchlist) {
                setShowUnwatchConfirm(true);
              } else {
                addToWatchlist.mutate({ gearId: id });
              }
            }}
            disabled={addToWatchlist.isPending || removeFromWatchlist.isPending}
          >
            {isOnWatchlist ? (
              <>
                <EyeOff className="mr-1.5 h-4 w-4" />
                On Watchlist
              </>
            ) : (
              <>
                <Eye className="mr-1.5 h-4 w-4" />
                Add to Watchlist
              </>
            )}
          </Button>

          <AlertDialog open={showUnwatchConfirm} onOpenChange={setShowUnwatchConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Remove from Watchlist?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will no longer receive deal alerts for this item. You can always add it back later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (watchlistEntry) {
                      removeFromWatchlist.mutate(watchlistEntry.id);
                    }
                  }}
                >
                  Remove
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Weight</p>
            <p className="text-lg font-semibold">
              {formatWeight(item.weightGrams, weightUnit)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Price ({item.currency})
            </p>
            <p className="text-lg font-semibold">
              {formatPrice(item.priceCents, item.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="text-lg font-semibold">
              {item.category.displayName}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Reviews</p>
            <p className="text-lg font-semibold">{item.reviews.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Specs */}
      {specEntries.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-3 text-lg font-semibold">Specifications</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <span className="text-sm capitalize text-muted-foreground">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-sm font-medium">{String(value)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {notes && (
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Notes</h2>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Where to Buy */}
      {whereToBuy.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h2 className="mb-3 text-lg font-semibold">Where to Buy</h2>
            <div className="space-y-2">
              {whereToBuy.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{entry.retailer}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(entry.priceCents, entry.currency)}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-3 w-3" />
                      Visit
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Community Ratings & Compare */}
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

      {/* Compare item picker */}
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

      {/* Compare modal */}
      <GearCompareModal
        open={showCompare}
        onOpenChange={setShowCompare}
        itemA={item}
        itemB={compareItem}
      />

      {/* Reviews */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Reviews ({item.reviews.length})
        </h2>
        {item.reviews.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No reviews yet. Own this item to leave a review.
          </p>
        )}
        {item.reviews.length > 0 && (
          <div className="space-y-3">
            {item.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.user.username}</p>
                    <span className="text-sm text-muted-foreground">
                      {review.rating}/5
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm text-muted-foreground">{review.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Review form — only if owned and not yet reviewed */}
        {isOwned && !hasReviewed && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="mb-3 font-semibold">Write a Review</h3>
              <ReviewForm
                gearId={id}
                ratingFields={ratingFields}
                onSuccess={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["gear-item", id],
                  });
                }}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
