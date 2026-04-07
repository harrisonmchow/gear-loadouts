"use client";

import { GearSlot } from "./GearSlot";
import type { LoadoutWithItems } from "@/types";

const SLOT_TYPES = [
  { name: "tent", label: "Shelter", icon: "tent" },
  { name: "sleeping_bag", label: "Sleeping Bag / Quilt", icon: "sleeping_bag" },
  { name: "sleeping_pad", label: "Sleeping Pad", icon: "sleeping_pad" },
  { name: "backpack", label: "Backpack", icon: "backpack" },
  { name: "pillow", label: "Pillow", icon: "pillow" },
];

interface LoadoutCardProps {
  loadout: LoadoutWithItems;
}

export function LoadoutCard({ loadout }: LoadoutCardProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SLOT_TYPES.map((slot) => {
        const item = loadout.items.find((i) => i.slotType === slot.name);
        return (
          <GearSlot
            key={slot.name}
            slotType={slot.name}
            label={slot.label}
            loadoutId={loadout.id}
            item={item ?? null}
          />
        );
      })}
    </div>
  );
}
