interface FollowStatsProps {
  followers: number;
  following: number;
}

export function FollowStats({ followers, following }: FollowStatsProps) {
  return (
    <div className="flex gap-4 text-sm">
      <span>
        <strong>{followers}</strong>{" "}
        <span className="text-muted-foreground">followers</span>
      </span>
      <span>
        <strong>{following}</strong>{" "}
        <span className="text-muted-foreground">following</span>
      </span>
    </div>
  );
}
