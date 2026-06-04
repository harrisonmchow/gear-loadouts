import { Card, CardContent } from "@/components/ui/card";
import { formatWeight, formatPrice } from "@/lib/utils";
import type { GearItemDetail } from "@/hooks/use-gear";

interface ItemStatsProps {
  item: GearItemDetail;
  weightUnit: "g" | "oz";
}

export function ItemStats({ item, weightUnit }: ItemStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Weight</p>
          <p className="text-lg font-semibold">
            {formatWeight(item.weightGrams, weightUnit)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            Price ({item.currency})
          </p>
          <p className="text-lg font-semibold">
            {formatPrice(item.priceCents, item.currency)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Category</p>
          <p className="text-lg font-semibold">{item.category.displayName}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Reviews</p>
          <p className="text-lg font-semibold">{item.reviews.length}</p>
        </CardContent>
      </Card>
    </div>
  );
}
