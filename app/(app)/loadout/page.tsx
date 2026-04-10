"use client";

import { useState } from "react";
import {
  useLoadout,
  useLoadouts,
  useCreateLoadout,
  useRenameLoadout,
  useSwitchLoadout,
  useDeleteLoadout,
} from "@/hooks/use-loadout";
import { LoadoutCard } from "@/components/loadout/LoadoutCard";
import { LoadoutStats } from "@/components/loadout/LoadoutStats";
import { WeightBreakdownChart } from "@/components/loadout/WeightBreakdownChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

export default function LoadoutPage() {
  const { data: loadout, isLoading } = useLoadout();
  const { data: allLoadouts } = useLoadouts();
  const createLoadout = useCreateLoadout();
  const renameLoadout = useRenameLoadout();
  const switchLoadout = useSwitchLoadout();
  const deleteLoadout = useDeleteLoadout();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");

  const loadoutCount = allLoadouts?.length ?? 0;
  const canCreate = loadoutCount < 3;

  function handleStartRename() {
    setNewName(loadout?.name ?? "");
    setIsRenaming(true);
  }

  function handleConfirmRename() {
    if (!loadout || !newName.trim()) return;
    renameLoadout.mutate(
      { id: loadout.id, name: newName.trim() },
      { onSuccess: () => setIsRenaming(false) }
    );
  }

  function handleDelete() {
    if (!loadout) return;
    if (loadoutCount <= 1) return; // can't delete the last one
    deleteLoadout.mutate(loadout.id);
  }

  function handleCreate() {
    if (!canCreate) return;
    createLoadout.mutate("New Loadout");
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: selector + actions */}
      <div className="flex flex-wrap items-center gap-3">
        {isRenaming ? (
          <div className="flex items-center gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="h-9 w-56"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirmRename();
                if (e.key === "Escape") setIsRenaming(false);
              }}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleConfirmRename}
              disabled={renameLoadout.isPending}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsRenaming(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Loadout dropdown */}
            <Select
              value={loadout?.id}
              onValueChange={(id) => {
                if (id !== loadout?.id) switchLoadout.mutate(id);
              }}
            >
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select loadout" />
              </SelectTrigger>
              <SelectContent>
                {allLoadouts?.map((lo) => (
                  <SelectItem key={lo.id} value={lo.id}>
                    {lo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleStartRename}
              title="Rename loadout"
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleDelete}
              disabled={loadoutCount <= 1 || deleteLoadout.isPending}
              title={
                loadoutCount <= 1
                  ? "Can't delete your only loadout"
                  : "Delete loadout"
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {loadoutCount}/3 loadouts
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreate}
            disabled={!canCreate || createLoadout.isPending}
            title={canCreate ? "Create new loadout" : "Maximum 3 loadouts"}
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Loadout
          </Button>
        </div>
      </div>

      {loadout && <LoadoutStats items={loadout.items} />}
      {loadout && <WeightBreakdownChart items={loadout.items} />}
      {loadout && <LoadoutCard loadout={loadout} />}
    </div>
  );
}
