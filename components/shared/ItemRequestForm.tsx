"use client";

import { useState } from "react";
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

export function ItemRequestForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setCategory("");
        setLink("");
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item name</Label>
                <Input
                  id="item-name"
                  placeholder="e.g. Nemo Tensor Insulated"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-link">Link</Label>
                <Input
                  id="item-link"
                  type="url"
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Submit request</Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
