"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StarRating } from "./StarRating";
import { useCreateReview } from "@/hooks/use-reviews";

interface ReviewFormProps {
  gearId: string;
  ratingFields: string[];
  onSuccess?: () => void;
}

export function ReviewForm({ gearId, ratingFields, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [body, setBody] = useState("");
  const createReview = useCreateReview();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !body) return;

    createReview.mutate(
      { gearId, rating, ratings, body },
      {
        onSuccess: () => {
          setRating(0);
          setRatings({});
          setBody("");
          onSuccess?.();
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Overall Rating</Label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {ratingFields.map((field) => (
        <div key={field} className="flex items-center justify-between">
          <Label className="capitalize">
            {field.replace(/_/g, " ")}
          </Label>
          <StarRating
            value={ratings[field] ?? 0}
            onChange={(v) => setRatings((prev) => ({ ...prev, [field]: v }))}
            size="sm"
          />
        </div>
      ))}

      <div className="space-y-2">
        <Label htmlFor="review-body">Review</Label>
        <textarea
          id="review-body"
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder="Share your experience with this gear..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
        />
      </div>

      <Button
        type="submit"
        disabled={createReview.isPending || !rating || body.length < 10}
      >
        {createReview.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
