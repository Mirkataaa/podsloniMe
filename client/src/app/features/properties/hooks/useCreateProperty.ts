import { useMutation, useQueryClient } from '@tanstack/react-query';
import { propertiesApi } from '../api/propertiesApi';
import type { CreatePropertyDto } from '../schema/create-property.schema';
import type { Property } from '../../../shared/types/property.types';
import type { AxiosError } from 'axios';

export function useCreateProperty() {
  const client = useQueryClient();

  return useMutation<Property, AxiosError, CreatePropertyDto>({
    mutationFn: (data: CreatePropertyDto) => propertiesApi.create(data),
    onSuccess: (newProperty) => {
      client.invalidateQueries({ queryKey: ['properties'] });
      console.log('Successfully created property with id:', newProperty.id);
    },

    onError: (error) => {
      console.error('Error while creating property:', error.response?.data);
    },
  });
}
