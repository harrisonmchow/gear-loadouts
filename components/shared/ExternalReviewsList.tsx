"use client";

import { useExternalReviews } from "@/hooks/use-external-reviews";
import { ExternalReviewCard } from "./ExternalReviewCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ExternalReviewsListProps {
  gearId: string;
}

export function ExternalReviewsList({ gearId }: ExternalReviewsListProps) {
  const { data: reviews, isLoading } = useExternalReviews(gearId);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        Expert &amp; Creator Reviews
      </h4>
      {reviews.map((review) => (
        <ExternalReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
