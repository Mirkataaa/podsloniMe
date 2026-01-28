import type { Property } from '@/app/shared/types/property.types';
import { Button } from '@/components/ui/button';

type PropertyDetailsGridProps = {
  images: Property['images'];
  onOpenGallery: (index: number) => void;
};

export default function PropertyDetailsGrid({
  images,
  onOpenGallery,
}: PropertyDetailsGridProps) {
  // TODO: Fix condition rendering ??

  if (!images.length) {
    return (
      <div className="h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Няма снимки</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-2xl overflow-hidden relative">
      {/* Main Image */}
      <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
        <img
          onClick={() => onOpenGallery(0)}
          src={images[0]?.url}
          alt="Main property"
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Secondary Images */}
      {images.slice(1, 5).map((img, idx) => (
        <div
          onClick={() => onOpenGallery(idx + 1)}
          key={idx}
          className="hidden md:block relative group cursor-pointer overflow-hidden"
        >
          <img
            src={img.url}
            alt={`Detail ${idx}`}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      ))}

      {/* View All Button */}
      <Button
        onClick={() => onOpenGallery(0)}
        variant="secondary"
        className="absolute bottom-4 right-4 shadow-lg text-xs md:text-sm"
      >
        Виж всички снимки
      </Button>
    </div>
  );
}
