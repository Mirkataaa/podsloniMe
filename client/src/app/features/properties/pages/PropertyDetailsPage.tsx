import { useNavigate, useParams } from 'react-router-dom'; // Предполагам ползваш React Router
import { useProperty } from '@/app/shared/hooks/useProperty';
import PropertyHeader from '../components/PropertyDetals/PropertyHeader';
import PropertyDetailsGrid from '../components/PropertyDetals/PropertyDetailsGrid';
import PropertyDetailsMainContentLeft from '../components/PropertyDetals/PropertyDetailsMainContentLeft';
import PropertyDetailsMainContentRight from '../components/PropertyDetals/PropertyDetailsMainContentRight';

export default function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error('Property ID is missing');
  }

  const { data: property, isLoading } = useProperty(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <p className="text-gray-500">Зареждане...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-white pb-20 flex items-center justify-center">
        <p className="text-gray-500">Имота не е намерен</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ─── 1. HEADER & NAV ─── */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <PropertyHeader onBack={() => navigate(-1)} />

        {/* ─── 2. IMAGE GALLERY (Bento Grid) ─── */}
        <PropertyDetailsGrid images={property.images} />
      </div>

      {/* ─── 3. MAIN CONTENT ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN (Details) */}

          <PropertyDetailsMainContentLeft property={property} />

          {/* RIGHT COLUMN (Sticky Sidebar) */}
          <PropertyDetailsMainContentRight property={property} />
        </div>
      </main>
    </div>
  );
}
