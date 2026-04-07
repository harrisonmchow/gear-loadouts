"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import { useAddToWatchlist, useWatchlist } from "@/hooks/use-marketplace";
import { useUserGear, useAddUserGear, useUpdateUserGear } from "@/hooks/use-profile";
import { Eye, EyeOff, CheckCircle2, ShoppingBag } from "lucide-react";
import type { GearItemWithCategory, ReviewWithUser } from "@/types";

type GearItemDetail = GearItemWithCategory & {
  reviews: ReviewWithUser[];
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

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: item, isLoading } = useGearItem(id);
  const { weightUnit } = usePreferences();
  const { data: watchlist } = useWatchlist();
  const addToWatchlist = useAddToWatchlist();
  const { data: userGear } = useUserGear();
  const addUserGear = useAddUserGear();
  const updateUserGear = useUpdateUserGear();

  const isOnWatchlist = watchlist?.some((w) => w.gearId === id);
  const ownedEntry = userGear?.find((g) => g.gearId === id);
  const isOwned = ownedEntry?.status === "owned";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-lg text-muted-foreground">{item.brand}</p>
          <Badge variant="secondary" className="mt-1">
            {item.category.displayName}
          </Badge>
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
              if (!isOnWatchlist) {
                addToWatchlist.mutate({ gearId: id });
              }
            }}
            disabled={isOnWatchlist || addToWatchlist.isPending}
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
                <div key={key} className="flex justify-between rounded-md bg-muted/50 px-3 py-2">
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

      {/* Reviews */}
      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Reviews ({item.reviews.length})
        </h2>
        {item.reviews.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No reviews yet. Own this item to leave a review.
          </p>
        ) : (
          <div className="space-y-3">
            {item.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {review.user.username}
                    </p>
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
      </div>
    </div>
  );
}
