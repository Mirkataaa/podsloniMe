import { agenciesApi } from '@/app/features/agencies/api/agenciesApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useAgencies() {
  const query = useQuery({
    queryKey: ['agencies'],
    queryFn: () => agenciesApi.getAll(),
    placeholderData: keepPreviousData,
  });

  return {
    agencies: query.data || [],
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
