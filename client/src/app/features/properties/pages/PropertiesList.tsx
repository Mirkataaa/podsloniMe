import { useState } from 'react';
import { useProperties } from '@/app/shared/hooks/useProperties';
import { Loader2 } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { PropertyFilters } from '../components/PropertyFilters';

export default function PropertiesList() {
  const [filters, setFilters] = useState({
    settlement: '',
    transactionType: '',
    propertyType: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const { properties, loading, error, isFetching } = useProperties(filters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  console.log('FILERS:"', filters);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Намери своя имот
      </h1>

      <PropertyFilters filters={filters} onChange={handleChange} />

      <div className="h-6 mb-2 flex justify-end">
        {isFetching && !loading && (
          <span className="text-xs text-blue-500 font-medium animate-pulse">
            Овновяване на резултатите...
          </span>
        )}
      </div>

      {error ? (
        <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
          <p className="text-red-600 font-medium">
            Възникна грешка при зареждането.
          </p>
          <p className="text-sm text-red-400">
            Моля, опитайте отново по-късно.
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-32">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xl text-slate-600 font-medium">
            Няма намерени имоти
          </p>
          <p className="text-slate-400 mt-1">
            Опитайте да промените критериите за търсене.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
