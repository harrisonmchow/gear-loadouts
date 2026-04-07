import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoadoutWithItems, GearItemWithCategory } from "@/types";

export function useLoadout() {
  return useQuery<LoadoutWithItems>({
    queryKey: ["loadout"],
    queryFn: async () => {
      const res = await fetch("/api/loadout");
      if (!res.ok) throw new Error("Failed to fetch loadout");
      return res.json();
    },
  });
}

export function useLoadouts() {
  return useQuery<LoadoutWithItems[]>({
    queryKey: ["loadouts"],
    queryFn: async () => {
      const res = await fetch("/api/loadout?all=true");
      if (!res.ok) throw new Error("Failed to fetch loadouts");
      return res.json();
    },
  });
}

export function useCreateLoadout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch("/api/loadout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create loadout");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
      queryClient.invalidateQueries({ queryKey: ["loadouts"] });
    },
  });
}

export function useRenameLoadout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const res = await fetch(`/api/loadout/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to rename loadout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
      queryClient.invalidateQueries({ queryKey: ["loadouts"] });
    },
  });
}

export function useSwitchLoadout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/loadout/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true }),
      });
      if (!res.ok) throw new Error("Failed to switch loadout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
      queryClient.invalidateQueries({ queryKey: ["loadouts"] });
    },
  });
}

export function useDeleteLoadout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/loadout/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error("Failed to delete loadout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
      queryClient.invalidateQueries({ queryKey: ["loadouts"] });
    },
  });
}

export function useUpdateLoadoutItem(loadoutId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { gearId: string; slotType: string }) => {
      const res = await fetch(`/api/loadout/${loadoutId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update loadout");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
    },
  });
}

export function useRemoveLoadoutItem(loadoutId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: string) => {
      const res = await fetch(`/api/loadout/${loadoutId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!res.ok) throw new Error("Failed to remove item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loadout"] });
    },
  });
}

export function useGearSearch(category?: string, query?: string) {
  return useQuery<GearItemWithCategory[]>({
    queryKey: ["gear-search", category, query],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      if (query) params.set("q", query);
      const res = await fetch(`/api/gear?${params}`);
      if (!res.ok) throw new Error("Failed to search gear");
      return res.json();
    },
    enabled: !!category,
  });
}

export function useAllGearSearch(query?: string, category?: string) {
  return useQuery<GearItemWithCategory[]>({
    queryKey: ["gear-all-search", query, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (category) params.set("category", category);
      const res = await fetch(`/api/gear?${params}`);
      if (!res.ok) throw new Error("Failed to search gear");
      return res.json();
    },
  });
}
