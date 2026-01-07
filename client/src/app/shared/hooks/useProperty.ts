import { propertiesApi } from '@/app/features/properties/api/propertiesApi';
import { useQuery } from '@tanstack/react-query';

export function useProperty(id: string) {
  const query = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesApi.getById(id),
    enabled: !!id,
  });

  return query;
}
