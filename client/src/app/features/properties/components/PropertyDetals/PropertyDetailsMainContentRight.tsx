import type { Property } from '@/app/shared/types/property.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import { Mail, Phone } from 'lucide-react';

interface Props {
  property: Property;
}

export default function PropertyDetailsMainContentRight({ property }: Props) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: property.currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* Price & Contact Card */}
        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-6">
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                Цена
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  {formatPrice(property.price)}
                </span>
                {property.area > 0 && (
                  <span className="text-gray-400 text-sm">
                    ({Math.round(property.price / property.area)} €/кв.м)
                  </span>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Agent Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
                <span className="text-blue-600 font-bold text-lg">
                  {property.createdBy.username[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-bold text-gray-900">
                  {property.createdBy.username}
                </p>
                <p className="text-sm text-gray-500">
                  {property.createdBy.email}
                </p>
                <p className="text-sm text-gray-500">
                  {property.createdBy.role}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 mr-2" />
                Обади се
              </Button>
              <Button variant="outline" className="w-full h-12 text-lg">
                <Mail className="w-4 h-4 mr-2" />
                Изпрати запитване
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
