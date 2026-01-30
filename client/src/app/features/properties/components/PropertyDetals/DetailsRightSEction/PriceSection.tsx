import type { Property } from '@/app/shared/types/property.types';

type PriceSectionProps = {
  price: Property['price'];
  area: Property['area'];
  currency: string;
};

export function PriceSection({ price, area, currency }: PriceSectionProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);

  const pricePerSqm = area ? Math.round(price / area) : 0;

  return (
    <div className="mb-6">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
        Цена
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-900">
          {formatPrice(price)}
        </span>
        {area > 0 && (
          <span className="text-gray-400 text-sm">({pricePerSqm} €/кв.м)</span>
        )}
      </div>
    </div>
  );
}
