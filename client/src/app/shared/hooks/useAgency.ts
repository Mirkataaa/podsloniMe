import { agenciesApi } from '@/app/features/agencies/api/agenciesApi';
import { useQuery } from '@tanstack/react-query';

export function useAgency(id: string) {
  const query = useQuery({
    queryKey: ['agencies', id],
    queryFn: () => agenciesApi.getById(id),
    enabled: !!id,
  });

  return query;
}
