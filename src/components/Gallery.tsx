"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Car exterior detailing",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600964373031-f0b65565f354?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Car interior cleaning",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Paint protection",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Wheel detailing",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Full car detailing",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Car polishing",
  },
];

export default function Gallery() {
  return (
    <div
      id="gallery"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {galleryImages.length > 0 ? (
        galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </AspectRatio>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh] border rounded-xl w-full">
          <p className="text-center text-muted-foreground text-xl font-medium">
            No images found
          </p>
        </div>
      )}
    </div>
  );
}
