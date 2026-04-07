import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWeight(grams: number | null, unit: "g" | "oz" = "g"): string {
  if (grams === null) return "—";
  if (unit === "oz") return `${(grams / 28.3495).toFixed(1)} oz`;
  return `${grams} g`;
}

export function formatPrice(cents: number | null, currency: string = "AUD"): string {
  if (cents === null) return "—";
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}
