"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md";
}

export function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
}: StarRatingProps) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(i + 1)}
          className={cn(
            "text-muted-foreground transition-colors",
            i < value && "text-yellow-500",
            onChange && "cursor-pointer hover:text-yellow-400"
          )}
        >
          <Star
            className={cn(iconSize, i < value && "fill-current")}
          />
        </button>
      ))}
    </div>
  );
}
