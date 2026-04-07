import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
  weightUnit: "g" | "oz";
  toggleWeightUnit: () => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      weightUnit: "g",
      toggleWeightUnit: () =>
        set((state) => ({
          weightUnit: state.weightUnit === "g" ? "oz" : "g",
        })),
    }),
    { name: "trailkit-preferences" }
  )
);
