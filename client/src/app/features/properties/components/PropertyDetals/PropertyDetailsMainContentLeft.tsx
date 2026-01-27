import type { Property } from '@/app/shared/types/property.types';
import { Bath, Bed, CheckCircle2, MapPin, Maximize } from 'lucide-react';

interface Props {
  property: Property;
}

export default function PropertyDetailsMainContentLeft({ property }: Props) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Title Section */}
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {property.title}
            </h1>
            <p className="flex items-center text-gray-500 mt-2 text-lg">
              <MapPin className="w-5 h-5 mr-1 text-gray-400" />
              {property.address}, {property.settlement}
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="flex gap-6 mt-6 py-4 border-y border-gray-100">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-lg">{property.bedrooms}</span>
            <span className="text-gray-500">Спални</span>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-lg">{property.bathrooms}</span>
            <span className="text-gray-500">Бани</span>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-lg">{property.area}</span>
            <span className="text-gray-500">кв.м.</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">За имота</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          {property.description}
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Характеристики</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Примерни характеристики */}
          <FeatureItem
            label="Етаж"
            value={`${property.floor} от ${property.totalFloors}`}
          />
          <FeatureItem
            label="Строителство"
            value={property.constructionType === 'brick' ? 'Тухла' : 'Панел'}
          />
          <FeatureItem
            label="Отопление"
            value={property.heating === 'gas' ? 'Газ' : 'Ток'}
          />
          <FeatureItem label="Година" value={property.yearBuilt ?? '-'} />
          <FeatureItem label="Акт 16" value="Да" />
          <FeatureItem label="Асансьор" value="Да" />
        </div>
      </div>

      {/* Map Placeholder */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Локация</h2>
        <div className="w-full h-[300px] bg-gray-100 rounded-xl flex items-center justify-center border">
          <p className="text-gray-500">
            Тук ще бъде картата (Google Maps / Leaflet)
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
      <CheckCircle2 className="w-4 h-4 text-blue-500" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
