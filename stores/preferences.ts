import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PreferencesState {
  weightUnit: "g" | "oz";
  region: string;
  toggleWeightUnit: () => void;
  setRegion: (region: string) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      weightUnit: "g",
      region: "AU",
      toggleWeightUnit: () =>
        set((state) => ({
          weightUnit: state.weightUnit === "g" ? "oz" : "g",
        })),
      setRegion: (region) => set({ region }),
    }),
    { name: "trailkit-preferences" }
  )
);
