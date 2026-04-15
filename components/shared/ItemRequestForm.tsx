"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { gearRequestSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleCheck, CirclePlus } from "lucide-react";

const CATEGORIES = [
  { value: "tent", label: "Shelter" },
  { value: "sleeping_bag", label: "Sleeping Bag / Quilt" },
  { value: "sleeping_pad", label: "Sleeping Pad" },
  { value: "backpack", label: "Backpack" },
  { value: "pillow", label: "Pillow" },
  { value: "cook_stove", label: "Stove" },
  { value: "cook_pot", label: "Pot / Pan" },
  { value: "water_filter", label: "Water Filter" },
  { value: "water_container", label: "Water Container" },
];

type GearRequestValues = z.infer<typeof gearRequestSchema>;

export function ItemRequestForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GearRequestValues>({
    resolver: zodResolver(gearRequestSchema),
    defaultValues: { name: "", category: "", link: "" },
  });

  const category = watch("category");

  async function onSubmit(data: GearRequestValues) {
    const res = await fetch("/api/gear/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json();
      setError("root", { message: json.error || "Failed to submit request" });
      return;
    }

    setSubmitted(true);
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        setSubmitted(false);
        reset();
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CirclePlus className="h-4 w-4" />
          Can&apos;t find an item?
        </Button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CircleCheck className="h-10 w-10 text-green-500" />
            <DialogTitle>Request submitted</DialogTitle>
            <DialogDescription>
              Your item request is pending review. We&apos;ll add it to the
              database once verified.
            </DialogDescription>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a new item</DialogTitle>
              <DialogDescription>
                Submit a gear item you&apos;d like added to the database.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item name</Label>
                <Input
                  id="item-name"
                  placeholder="e.g. Nemo Tensor Insulated"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) =>
                    setValue("category", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger id="item-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-link">Link</Label>
                <Input
                  id="item-link"
                  type="url"
                  placeholder="https://..."
                  {...register("link")}
                />
                {errors.link && (
                  <p className="text-sm text-destructive">{errors.link.message}</p>
                )}
              </div>
              {errors.root && (
                <p className="text-sm text-destructive">{errors.root.message}</p>
              )}
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit request"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
