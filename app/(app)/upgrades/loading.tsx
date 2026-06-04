import { Skeleton } from "@/components/ui/skeleton";

export default function UpgradesLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-96" />
      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}
