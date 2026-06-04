import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReviewForm } from "@/components/shared/ReviewForm";
import type { ReviewWithUser } from "@/types";

interface ItemReviewsProps {
  reviews: ReviewWithUser[];
  gearId: string;
  ratingFields: string[];
  isOwned: boolean;
  hasReviewed: boolean;
  onReviewSuccess: () => void;
}

export function ItemReviews({
  reviews,
  gearId,
  ratingFields,
  isOwned,
  hasReviewed,
  onReviewSuccess,
}: ItemReviewsProps) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Reviews ({reviews.length})</h2>
      {reviews.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No reviews yet. Own this item to leave a review.
        </p>
      )}
      {reviews.length > 0 && (
        <div className="space-y-3">
          {reviews.map((review) => (
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

      {isOwned && !hasReviewed && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h3 className="mb-3 font-semibold">Write a Review</h3>
            <ReviewForm
              gearId={gearId}
              ratingFields={ratingFields}
              onSuccess={onReviewSuccess}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
