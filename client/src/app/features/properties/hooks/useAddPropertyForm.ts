import { useNavigate } from 'react-router-dom';
import { useCreateProperty } from './useCreateProperty';

import { useImageUpload } from '@/app/features/properties/hooks/useImageUpload';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPropertySchema,
  type CreatePropertyDto,
} from '../schema/create-property.schema';
import { useEffect, useMemo } from 'react';
import { useLocations } from './useLocations';

export const useAddPropertyForm = () => {
  const navigate = useNavigate();
  const createMutation = useCreateProperty();
  const { regions, getMunicipalities, getSettlements } = useLocations();
  const { isUploading, uploadImages } = useImageUpload();

  const form = useForm<CreatePropertyDto>({
    resolver: zodResolver(createPropertySchema) as any,
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      area: 0,
      pricePerSqm: 0,
      currency: 'EUR',
      transactionType: 'sale',
      propertyType: 'apartment',
      constructionType: undefined,
      buildingStage: undefined,
      heating: undefined,
      yardArea: undefined,
      yearBuilt: 0,
      maintenanceFee: 0,
      floor: undefined,
      totalFloors: undefined,
      bedrooms: 1,
      bathrooms: 1,
      region: '',
      municipality: '',
      settlement: '',
      district: '',
      address: '',
      images: [],
      furnished: false,
      hasParking: false,
      hasGarage: false,
      hasElevator: false,
      hasSecurity: false,
      hasVideoSurveillance: false,
      internetReady: false,
      act16: false,
    },
  });

  const {
    area = 0,
    price = 0,
    region,
    municipality,
  } = useWatch({
    control: form.control,
  });

  const municipalities = useMemo(
    () => (region ? getMunicipalities(region) : []),
    [region, getMunicipalities],
  );

  const settlements = useMemo(
    () => (region && municipality ? getSettlements(region, municipality) : []),
    [region, municipality, getSettlements],
  );

  useEffect(() => {
    if (area > 0 && price > 0) {
      const sqm = Math.round(price / area);
      const currentSqm = form.getValues('pricePerSqm');

      if (sqm !== currentSqm) {
        form.setValue('pricePerSqm', sqm, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
  }, [area, price, form.setValue, form.getValues]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) return;

    const uploaded = await uploadImages(files);

    if (uploaded.length > 0) {
      const current = form.getValues('images') || [];
      form.setValue('images', [...current, ...uploaded], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const current = form.getValues('images') || [];

    form.setValue(
      'images',
      current.filter((_, i) => i !== index),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  const submitHandler = (data: CreatePropertyDto) => {
    createMutation.mutate(data, {
      onSuccess: () => navigate('/properties'),
    });
  };

  return {
    form,
    state: {
      regions,
      municipalities,
      settlements,
      isUploading,
      isLoading: createMutation.isPending,
    },
    handler: {
      handleImageUpload,
      handleRemoveImage,
      submitHandler: form.handleSubmit(submitHandler),
    },
  };
};
