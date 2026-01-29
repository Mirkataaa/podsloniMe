import requester from '@/app/shared/api/axios';
import type { Agency } from '@/app/shared/types/agency.types';

export const agenciesApi = {
  getAll: async (): Promise<Agency[]> => {
    const res = await requester.get<Agency[]>('/agencies');
    return res.data;
  },

  getById: async (id: string): Promise<Agency> => {
    const res = await requester.get<Agency>(`/agencies/${id}`);
    return res.data;
  },
};
