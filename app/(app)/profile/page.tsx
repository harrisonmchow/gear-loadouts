"use client";

import { useSession } from "next-auth/react";
import { useProfile } from "@/hooks/use-profile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { GearCollection } from "@/components/profile/GearCollection";
import { FollowStats } from "@/components/profile/FollowStats";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const { data: session } = useSession();
  const username = session?.user?.name ?? "";
  const { data: profile, isLoading } = useProfile(username);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!profile) {
    return <p className="text-muted-foreground">Profile not found</p>;
  }

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} isOwn />
      <FollowStats
        followers={profile._count.followers}
        following={profile._count.following}
      />
      <Tabs defaultValue="gear">
        <TabsList>
          <TabsTrigger value="gear">Gear Collection</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="gear">
          <GearCollection items={profile.ownedGear} isOwn />
        </TabsContent>
        <TabsContent value="reviews">
          <div className="space-y-4">
            {profile.reviews.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No reviews yet
              </p>
            )}
            {profile.reviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.gear.name}</p>
                  <span className="text-sm text-muted-foreground">
                    {review.rating}/5
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {review.body}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
