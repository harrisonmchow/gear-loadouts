"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFollowToggle } from "@/hooks/use-profile";
import type { ProfileData } from "@/types";

interface ProfileHeaderProps {
  profile: ProfileData;
  isOwn: boolean;
}

export function ProfileHeader({ profile, isOwn }: ProfileHeaderProps) {
  const { data: session } = useSession();
  const followToggle = useFollowToggle();

  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={profile.avatarUrl ?? undefined} />
        <AvatarFallback className="text-lg">
          {profile.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">{profile.username}</h1>
          <Badge variant="secondary">{profile.region}</Badge>
        </div>
        {profile.bio && (
          <p className="mt-1 text-sm text-muted-foreground">{profile.bio}</p>
        )}
      </div>
      {!isOwn && session?.user?.id && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            followToggle.mutate({
              userId: profile.id,
              action: "follow",
            })
          }
          disabled={followToggle.isPending}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
