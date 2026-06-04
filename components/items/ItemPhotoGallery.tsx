import Image from "next/image";
import { ImageOff } from "lucide-react";

interface ItemPhotoGalleryProps {
  imageUrls: string[];
  itemName: string;
}

export function ItemPhotoGallery({ imageUrls, itemName }: ItemPhotoGalleryProps) {
  if (imageUrls.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        <ImageOff className="mr-2 h-5 w-5" />
        <span className="text-sm">No photos yet</span>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {imageUrls.map((url, i) => (
        <div key={i} className="relative h-48 w-64 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={url}
            alt={`${itemName} photo ${i + 1}`}
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>
      ))}
    </div>
  );
}
