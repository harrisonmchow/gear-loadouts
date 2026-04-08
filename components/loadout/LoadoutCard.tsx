"use client";

import { GearSlot } from "./GearSlot";
import type { LoadoutWithItems } from "@/types";

const SLOT_TYPES = [
  { name: "tent", label: "Shelter" },
  { name: "sleeping_bag", label: "Sleeping Bag / Quilt" },
  { name: "sleeping_pad", label: "Sleeping Pad" },
  { name: "backpack", label: "Backpack" },
  { name: "pillow", label: "Pillow" },
  { name: "cook_stove", label: "Stove" },
  { name: "cook_pot", label: "Pot / Pan" },
  { name: "water_filter", label: "Water Filter" },
  { name: "water_container", label: "Water Container" },
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
