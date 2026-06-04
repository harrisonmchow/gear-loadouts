import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AppNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold">Not found</h2>
          <p className="text-sm text-muted-foreground">
            This page or item doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/loadout">Back to loadout</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
