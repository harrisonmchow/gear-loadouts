"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { createReviewSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StarRating } from "./StarRating";
import { useCreateReview } from "@/hooks/use-reviews";

type ReviewFormValues = z.infer<typeof createReviewSchema>;

interface ReviewFormProps {
  gearId: string;
  ratingFields: string[];
  onSuccess?: () => void;
}

export function ReviewForm({ gearId, ratingFields, onSuccess }: ReviewFormProps) {
  const createReview = useCreateReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      gearId,
      rating: 0,
      ratings: {},
      body: "",
    },
  });

  const rating = watch("rating");
  const ratings = watch("ratings");

  function onSubmit(data: ReviewFormValues) {
    createReview.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Overall Rating</Label>
        <StarRating
          value={rating}
          onChange={(v) => setValue("rating", v, { shouldValidate: true })}
        />
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating.message}</p>
        )}
      </div>

      {ratingFields.map((field) => (
        <div key={field} className="flex items-center justify-between">
          <Label className="capitalize">{field.replace(/_/g, " ")}</Label>
          <StarRating
            value={ratings[field] ?? 0}
            onChange={(v) =>
              setValue("ratings", { ...ratings, [field]: v }, { shouldValidate: true })
            }
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
          {...register("body")}
        />
        {errors.body && (
          <p className="text-sm text-destructive">{errors.body.message}</p>
        )}
      </div>

      <Button type="submit" disabled={createReview.isPending}>
        {createReview.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
