import React, { useEffect, useRef } from "react";
import { UploadCloud, X } from "lucide-react";

type ImageItem = File | string;

interface ImageUploadProps {
  images: ImageItem[];
  onChange: React.Dispatch<React.SetStateAction<ImageItem[]>>;
}

export default function ImageUpload({ images, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // helper
  const getPreview = (img: ImageItem) => {
    if (typeof img === "string") return img;
    return URL.createObjectURL(img);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return;
      newFiles.push(file);
    });

    onChange((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    onChange((prev) => prev.filter((_, i) => i !== index));
  };

  // cleanup object URLs
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img instanceof File) {
          URL.revokeObjectURL(getPreview(img));
        }
      });
    };
  }, [images]);

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="cursor-pointer rounded-xl border-2 border-dashed border-green-200 bg-white p-10 text-center hover:bg-green-50 transition"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-green-100 p-4">
            <UploadCloud className="h-8 w-8 text-green-600" />
          </div>
          <p className="font-medium text-gray-800">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, JPEG, WEBP (Max 5MB)
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative h-24 w-24 rounded-lg border overflow-hidden"
            >
              <img
                src={getPreview(img)}
                alt="preview"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
