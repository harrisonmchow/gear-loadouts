"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { formatWeight, formatPrice } from "@/lib/utils";
import { usePreferences } from "@/stores/preferences";
import type { GearItemWithCategory } from "@/types";

interface CompareItemPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: GearItemWithCategory[];
  onSelect: (item: GearItemWithCategory) => void;
}

export function CompareItemPicker({
  open,
  onOpenChange,
  items,
  onSelect,
}: CompareItemPickerProps) {
  const { weightUnit } = usePreferences();

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Select item to compare"
      description="Choose a second item from the same category"
    >
      <CommandInput placeholder="Search items..." />
      <CommandList>
        <CommandEmpty>No items found.</CommandEmpty>
        <CommandGroup heading="Same category">
          {items.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.name} ${item.brand}`}
              onSelect={() => {
                onSelect(item);
                onOpenChange(false);
              }}
            >
              <div className="flex flex-1 items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                </div>
                <div className="flex gap-1.5">
                  <Badge variant="secondary" className="text-xs">
                    {formatWeight(item.weightGrams, weightUnit)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatPrice(item.priceCents, item.currency)}
                  </Badge>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
