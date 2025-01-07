"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Control } from "react-hook-form";
import { useTranslations } from "next-intl";

interface Image {
  url: string;
}

interface FormValues {
  address: string;
  images: {
    url: string;
    description?: string;
    _id?: string;
  }[];
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  appointmentNote?: string;
  longitude?: number;
  latitude?: number;
}

interface ImageUploadProps {
  control: Control<FormValues>;
  existingImages?: Array<{
    url: string;
    description?: string;
    _id?: string;
  }>;
}

export function ImageUpload({ control, existingImages }: ImageUploadProps) {
  const t = useTranslations("image_upload");
  const [previews, setPreviews] = useState<string[]>([]);

  // Load existing images on component mount
  useEffect(() => {
    if (existingImages?.length) {
      console.log("existingImages", existingImages);
      setPreviews(existingImages.map((img) => img.url));
    }
  }, [existingImages]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: { url: string }[]) => void,
    currentValue: { url: string }[] = []
  ) => {
    const files = Array.from(e.target.files || []);
    const newPreviews: string[] = [];
    const uploadedImages: { url: string }[] = [];

    for (const file of files) {
      const preview = URL.createObjectURL(file);
      newPreviews.push(preview);
      uploadedImages.push({ url: preview });
    }

    setPreviews((prev) => [...prev, ...newPreviews]);
    onChange([...currentValue, ...uploadedImages]);
  };

  return (
    <FormField
      control={control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <div
                    key={`${preview}-${index}`}
                    className="relative aspect-square"
                  >
                    <Image
                      src={preview}
                      alt={t("preview.alt", { number: index + 1 })}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                      priority={true}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setPreviews((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                        field.onChange(
                          Array.isArray(field.value)
                            ? field.value.filter((_, i: number) => i !== index)
                            : []
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center w-full">
                <label className="w-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500">{t("upload.title")}</p>
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      handleFileChange(e, field.onChange, field.value)
                    }
                  />
                </label>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
