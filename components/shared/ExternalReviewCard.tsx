"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube, Globe } from "lucide-react";
import type { ExternalReviewWithSource } from "@/types";

interface ExternalReviewCardProps {
  review: ExternalReviewWithSource;
}

export function ExternalReviewCard({ review }: ExternalReviewCardProps) {
  const isYouTube = review.source.type === "youtube";
  const Icon = isYouTube ? Youtube : Globe;

  return (
    <Card>
      <CardContent className="p-3">
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="flex gap-3">
            {review.thumbnailUrl && (
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded">
                <Image
                  src={review.thumbnailUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium leading-tight group-hover:underline">
                {review.title}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3 w-3 shrink-0" />
                <span>{review.source.name}</span>
                <span>&middot;</span>
                <span>
                  {new Date(review.publishedAt).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                {isYouTube && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] text-red-600"
                  >
                    YouTube
                  </Badge>
                )}
                {!review.isVerified && review.matchScore != null && (
                  <Badge variant="outline" className="text-[10px]">
                    Auto-matched
                  </Badge>
                )}
                <ExternalLink className="ml-auto h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
}
