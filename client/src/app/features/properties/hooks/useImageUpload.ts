import { useState } from 'react';
import { mediaApi, type CloudinaryImage } from '../../../shared/api/mediaApi';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImages = async (
    files: FileList | null,
  ): Promise<CloudinaryImage[]> => {
    if (!files || files.length === 0) {
      return [];
    }

    setIsUploading(true);
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('file[]', file);
    });

    try {
      const data = await mediaApi.upload(formData);
      return data;
    } catch (error) {
      console.error('Upload error', error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImages };
};
