import requester from '../../../shared/api/axios';
import type { Property } from '../../../shared/types/property.types';
import type { CreatePropertyDto } from '../schema/create-property.schema';

export type PropertyFilters = {
  settlement?: string;
  transactionType?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const propertiesApi = {
  create: async (data: CreatePropertyDto): Promise<Property> => {
    const res = await requester.post<Property>('/properties', data);
    return res.data;
  },

  getAll: async (filters: PropertyFilters = {}): Promise<Property[]> => {
    const res = await requester.get<Property[]>('/properties', {
      params: filters,
    });

    return res.data;
  },

  getById: async (id: string): Promise<Property> => {
    const res = await requester.get<Property>(`/properties/${id}`);
    return res.data;
  },
};
