import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateProfileSchema = z.object({
  bio: z.string().max(300).optional(),
  avatarUrl: z.string().url().optional(),
  preferences: z
    .object({
      maxTentPrice: z.number().positive().optional(),
      maxPackWeight: z.number().positive().optional(),
      weightUnit: z.enum(["g", "oz"]).optional(),
      gearStyle: z.enum(["ultralight", "lightweight", "traditional"]).optional(),
    })
    .optional(),
});

export const createLoadoutSchema = z.object({
  name: z.string().min(1).max(100),
});

export const renameLoadoutSchema = z.object({
  name: z.string().min(1).max(100),
});

export const updateLoadoutItemSchema = z.object({
  gearId: z.string().cuid(),
  slotType: z.string().min(1),
});

export const removeLoadoutItemSchema = z.object({
  itemId: z.string().cuid(),
});

export const createReviewSchema = z.object({
  gearId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  ratings: z.record(z.string(), z.number().int().min(1).max(5)),
  body: z.string().min(10).max(5000),
});

export const addToWatchlistSchema = z.object({
  gearId: z.string().cuid(),
  maxPrice: z.number().int().positive().optional(),
});

export const updateWatchlistSchema = z.object({
  maxPrice: z.number().int().positive().nullable(),
});

export const addUserGearSchema = z.object({
  gearId: z.string().cuid(),
  status: z.enum(["owned", "sold", "want"]),
  purchasePrice: z.number().int().positive().optional(),
  notes: z.string().max(500).optional(),
});

export const updateUserGearSchema = z.object({
  status: z.enum(["owned", "sold", "want"]),
});

export const pushSubscriptionSchema = z.object({
  endpoint: z.string().url(),
  p256dh: z.string().min(1),
  auth: z.string().min(1),
});

export const updateExternalReviewSchema = z.object({
  gearId: z.string().cuid().optional().nullable(),
  isVerified: z.boolean().optional(),
});

export const gearRequestSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().min(1),
  link: z.string().url(),
});
