import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";

type WhereToBuyEntry = {
  retailer: string;
  url: string;
  priceCents: number;
  currency: string;
};

interface ItemWhereToBuyProps {
  entries: WhereToBuyEntry[];
}

export function ItemWhereToBuy({ entries }: ItemWhereToBuyProps) {
  if (entries.length === 0) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="mb-3 text-lg font-semibold">Where to Buy</h2>
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium">{entry.retailer}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(entry.priceCents, entry.currency)}
                </p>
              </div>
              <Button size="sm" variant="outline" asChild>
                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Visit
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
