// Central source of truth for gear category presentation.
// Keys match GearCategory.name in the DB and slot types in LoadoutCard.
// `color` is used by charts; `badgeClass` is used by category badges across the app.
// Tailwind classes are hardcoded (no string interpolation) so JIT picks them up.

export interface GearCategoryMeta {
  label: string;
  color: string;
  badgeClass: string;
}

const FALLBACK: GearCategoryMeta = {
  label: "Other",
  color: "#9ca3af",
  badgeClass: "bg-gray-100 text-gray-800 border-gray-200",
};

export const GEAR_CATEGORY_META: Record<string, GearCategoryMeta> = {
  tent: {
    label: "Shelter",
    color: "#10b981", // emerald-500
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  sleeping_bag: {
    label: "Sleeping Bag / Quilt",
    color: "#6366f1", // indigo-500
    badgeClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
  },
  sleeping_pad: {
    label: "Sleeping Pad",
    color: "#3b82f6", // blue-500
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
  },
  backpack: {
    label: "Backpack",
    color: "#f59e0b", // amber-500
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
  },
  pillow: {
    label: "Pillow",
    color: "#ec4899", // pink-500
    badgeClass: "bg-pink-100 text-pink-800 border-pink-200",
  },
  cook_stove: {
    label: "Stove",
    color: "#ef4444", // red-500
    badgeClass: "bg-red-100 text-red-800 border-red-200",
  },
  cook_pot: {
    label: "Pot / Pan",
    color: "#f97316", // orange-500
    badgeClass: "bg-orange-100 text-orange-800 border-orange-200",
  },
  water_filter: {
    label: "Water Filter",
    color: "#06b6d4", // cyan-500
    badgeClass: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  water_container: {
    label: "Water Container",
    color: "#8b5cf6", // violet-500
    badgeClass: "bg-violet-100 text-violet-800 border-violet-200",
  },
};

export function getGearCategoryMeta(slotType: string): GearCategoryMeta {
  return GEAR_CATEGORY_META[slotType] ?? FALLBACK;
}
