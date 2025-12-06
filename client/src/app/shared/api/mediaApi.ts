import requester from './axios';

export interface CloudinaryImage {
  url: string;
  publicId: string;
}

export const mediaApi = {
  upload: async (formData: FormData): Promise<CloudinaryImage[]> => {
    const res = await requester.post<CloudinaryImage[]>(
      '/cloudinary/uploads',
      formData,
    );

    return res.data;
  },
};
