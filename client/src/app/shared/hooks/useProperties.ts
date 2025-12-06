import {
  propertiesApi,
  type PropertyFilters,
} from '@/app/features/properties/api/propertiesApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useProperties(filters: PropertyFilters = {}) {
  const query = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertiesApi.getAll(filters),
    placeholderData: keepPreviousData,
  });

  return {
    properties: query.data || [],
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
