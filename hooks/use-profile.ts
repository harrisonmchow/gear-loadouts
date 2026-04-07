import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileData, UserGearWithItem } from "@/types";

export function useProfile(username: string) {
  return useQuery<ProfileData>({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${username}`);
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  });
}

export function useUserGear() {
  return useQuery<UserGearWithItem[]>({
    queryKey: ["user-gear"],
    queryFn: async () => {
      const res = await fetch("/api/gear/own");
      if (!res.ok) throw new Error("Failed to fetch gear");
      return res.json();
    },
  });
}

export function useAddUserGear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      gearId: string;
      status: string;
      purchasePrice?: number;
      notes?: string;
    }) => {
      const res = await fetch("/api/gear/own", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add gear");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-gear"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useUpdateUserGear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/gear/own/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update gear");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-gear"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useFollowToggle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      action,
    }: {
      userId: string;
      action: "follow" | "unfollow";
    }) => {
      const res = await fetch(`/api/follow/${userId}`, {
        method: action === "follow" ? "POST" : "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to ${action}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
