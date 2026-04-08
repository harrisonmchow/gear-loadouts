import type {
  GearItem,
  GearCategory,
  Loadout,
  LoadoutItem,
  UpgradeEdge,
  UserGear,
  Review,
  Deal,
  WatchlistItem,
  User,
  ExternalReview,
  ExternalReviewSource,
} from "@prisma/client";

// Re-export Prisma types
export type {
  GearItem,
  GearCategory,
  Loadout,
  LoadoutItem,
  UpgradeEdge,
  UserGear,
  Review,
  Deal,
  WatchlistItem,
  User,
  ExternalReview,
  ExternalReviewSource,
};

// Extended types with relations
export type GearItemWithCategory = GearItem & {
  category: GearCategory;
};

export type GearItemWithReviews = GearItem & {
  category: GearCategory;
  reviews: Review[];
};

export type LoadoutItemWithGear = LoadoutItem & {
  gear: GearItemWithCategory;
};

export type LoadoutWithItems = Loadout & {
  items: LoadoutItemWithGear[];
};

export type UserGearWithItem = UserGear & {
  gear: GearItemWithCategory;
};

export type ReviewWithUser = Review & {
  user: Pick<User, "id" | "username" | "avatarUrl">;
};

export type ReviewWithGear = Review & {
  gear: GearItemWithCategory;
};

export type DealWithGear = Deal & {
  gear: GearItemWithCategory | null;
};

export type WatchlistItemWithGear = WatchlistItem & {
  gear: GearItemWithCategory;
  gear_deals?: Deal[];
};

export type UpgradeEdgeWithItems = UpgradeEdge & {
  from: GearItemWithCategory;
  to: GearItemWithCategory;
};

// API response types
export type ProfileData = Pick<
  User,
  "id" | "username" | "avatarUrl" | "bio" | "region" | "createdAt"
> & {
  _count: { followers: number; following: number };
  loadouts: Loadout[];
  ownedGear: UserGearWithItem[];
  reviews: ReviewWithGear[];
};

// External review types
export type ExternalReviewWithSource = ExternalReview & {
  source: ExternalReviewSource;
};

export type GearItemWithAllReviews = GearItem & {
  category: GearCategory;
  reviews: Review[];
  externalReviews: ExternalReviewWithSource[];
};

// User preferences stored as JSON on User.preferences
export interface UserPreferences {
  maxTentPrice?: number;
  maxPackWeight?: number;
  weightUnit?: "g" | "oz";
  gearStyle?: "ultralight" | "lightweight" | "traditional";
}
