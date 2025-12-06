import type { FilteredProperty } from '@/app/shared/types/property.types';
import { MapPin, Maximize } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: FilteredProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: property.currency || 'EUR',
    maximumFractionDigits: 0,
  }).format(property.price);

  const mainImage = property.images?.[0]?.url;

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* photo sectyion */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* label fro transaction type */}
        <div className="absolute top-3 right-3">
          <span
            className={`
            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm
            ${
              property.transactionType === 'sale'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-500 text-white'
            }
          `}
          >
            {property.transactionType === 'sale' ? 'Продажба' : 'Наем'}
          </span>
        </div>
      </div>

      {/* info section */}
      <div className="p-5">
        {/* heading & pricing */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-slate-500 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1 text-slate-400" />
            {property.settlement}
            {property.district && `, ${property.district}`}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4 text-slate-400" />
            <span>{property.area} м²</span>
          </div>
          {/* :TODO add others later*/}
        </div>

        {/* price & type */}
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-slate-900">
            {formattedPrice}
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            {property.propertyType}
          </div>
        </div>
      </div>
    </Link>
  );
}
