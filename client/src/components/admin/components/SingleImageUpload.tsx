import { UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SingleImage {
  file: File | null;   // agar existing URL hai to file null ho sakta hai
  preview: string;     // URL ya ObjectURL
}

interface Props {
  onChange?: (file: File | null) => void;
  initialImage?: string; // <- existing image URL
}

export default function SingleImageUpload({ onChange, initialImage }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<SingleImage | null>(null);

  useEffect(() => {
    if (initialImage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImage({ file: null, preview: initialImage });
    } else {
      setImage(null);
    }
  }, [initialImage]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;

    if (image?.preview) URL.revokeObjectURL(image.preview);

    const preview = URL.createObjectURL(file);
    setImage({ file, preview });
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removeImage = () => {
    if (image?.preview && image.file) URL.revokeObjectURL(image.preview);
    setImage(null);
    onChange?.(null);
  };

  return (
    <div className="space-y-4">
      {!image && (
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
            <p className="font-medium text-gray-800">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, JPEG, WEBP (Max 5MB)</p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </div>
      )}

      {image && (
        <div className="relative rounded-xl border overflow-hidden">
          <img src={image.preview} alt="preview" className="h-full w-full object-cover" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
