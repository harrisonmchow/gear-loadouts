"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { getGearCategoryMeta } from "@/lib/gear-categories";
import { CheckCircle2, ShoppingBag, Eye, EyeOff, Trophy } from "lucide-react";
import type { GearItemDetail } from "@/hooks/use-gear";
import type { UserGearWithItem, WatchlistItemWithGear } from "@/types";

interface ItemHeaderProps {
  item: GearItemDetail;
  ownedEntry: UserGearWithItem | undefined;
  watchlistEntry: WatchlistItemWithGear | undefined;
  showUnwatchConfirm: boolean;
  onShowUnwatchConfirm: (show: boolean) => void;
  onOwnershipToggle: () => void;
  onAddOwnership: () => void;
  onAddToWatchlist: () => void;
  onRemoveFromWatchlist: () => void;
  isAddingOwnership: boolean;
  isUpdatingOwnership: boolean;
  isAddingToWatchlist: boolean;
  isRemovingFromWatchlist: boolean;
}

export function ItemHeader({
  item,
  ownedEntry,
  watchlistEntry,
  showUnwatchConfirm,
  onShowUnwatchConfirm,
  onOwnershipToggle,
  onAddOwnership,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isAddingOwnership,
  isUpdatingOwnership,
  isAddingToWatchlist,
  isRemovingFromWatchlist,
}: ItemHeaderProps) {
  const isOwned = ownedEntry?.status === "owned";
  const isOnWatchlist = !!watchlistEntry;

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-lg text-muted-foreground">{item.brand}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={cn(getGearCategoryMeta(item.category.name).badgeClass)}
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
        {ownedEntry ? (
          <Button
            variant={isOwned ? "default" : "outline"}
            size="sm"
            onClick={onOwnershipToggle}
            disabled={isUpdatingOwnership}
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
            onClick={onAddOwnership}
            disabled={isAddingOwnership}
          >
            <CheckCircle2 className="mr-1.5 h-4 w-4" />
            I Own This
          </Button>
        )}

        <Button
          variant={isOnWatchlist ? "secondary" : "outline"}
          size="sm"
          onClick={() => {
            if (isOnWatchlist) {
              onShowUnwatchConfirm(true);
            } else {
              onAddToWatchlist();
            }
          }}
          disabled={isAddingToWatchlist || isRemovingFromWatchlist}
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

        <AlertDialog open={showUnwatchConfirm} onOpenChange={onShowUnwatchConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from Watchlist?</AlertDialogTitle>
              <AlertDialogDescription>
                You will no longer receive deal alerts for this item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRemoveFromWatchlist}>
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
