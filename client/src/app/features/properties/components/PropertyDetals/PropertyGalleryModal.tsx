import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  images: { url: string }[];
  startIndex: number;
  onClose: () => void;
};

export default function PropertyGalleryModal({
  images,
  startIndex,
  onClose,
}: Props) {
  console.log(startIndex);

  return (
    <div className="fixed inset-0 bg-black/90 z-50">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-100 p-2 bg-white/10 rounded-full"
        aria-label="Close modal"
      >
        <X />
      </button>

      <Swiper
        modules={[Navigation, Keyboard, Pagination]}
        navigation={true}
        keyboard={{ enabled: true }}
        initialSlide={startIndex}
        className="h-full"
        pagination={{
          type: 'progressbar',
        }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="flex items-center justify-center h-full">
              <img
                src={img.url}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
