import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UseFormReturn } from 'react-hook-form';
import type { CreatePropertyDto } from '../../schema/create-property.schema';
import { ImagePlus, Loader2, X } from 'lucide-react';

interface ImageSectionProps {
  form: UseFormReturn<CreatePropertyDto>;
  isUploading: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  images: any[];
}

export function ImageUploadSection({
  form,
  isUploading,
  handleImageUpload,
  handleRemoveImage,
  images,
}: ImageSectionProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Снимки</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* upload button */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="image-upload"
              className={`
                 flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md cursor-pointer hover:bg-slate-800 transition
                 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isUploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ImagePlus />
              )}
              <span>{isUploading ? 'Качване...' : 'Добави снимки'}</span>
            </label>

            <input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </div>

          {/* grid gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images?.map((img, index) => (
              <div
                key={index}
                className="relative group aspect-square border rounded-md overflow-hidden"
              >
                <img
                  src={img.url}
                  alt="preview"
                  className="object-cover w-full h-full"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {/* errors */}
          {form.formState.errors.images && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
