import { z } from 'zod';
import {
  buildingStages,
  constructionTypes,
  currencies,
  heatingTypes,
  propertyTypes,
  transactionTypes,
} from '../../../shared/types/property.types';

export const createPropertySchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().min(10).max(5000),
  price: z.coerce.number(),
  currency: z.enum(currencies),
  transactionType: z.enum(transactionTypes),
  propertyType: z.enum(propertyTypes),
  area: z.coerce.number(),
  yardArea: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().optional(),
  ),
  floor: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().optional(),
  ),
  totalFloors: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().min(1, 'Минимум 1 етаж').optional(),
  ),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  furnished: z.boolean().default(false),
  yearBuilt: z.coerce.number().optional(),
  district: z.string().optional(),
  region: z.string().min(2),
  municipality: z.string().min(2),
  settlement: z.string().min(1),
  address: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        publicId: z.string(),
      }),
    )
    .optional()
    .default([]),
  constructionType: z.enum(constructionTypes).optional(),
  heating: z.enum(heatingTypes).optional(),
  hasParking: z.boolean().default(false),
  hasGarage: z.boolean().default(false),
  hasElevator: z.boolean().default(false),
  hasSecurity: z.boolean().default(false),
  hasVideoSurveillance: z.boolean().default(false),
  internetReady: z.boolean().default(false),
  buildingStage: z.enum(buildingStages).optional(),
  act16: z.boolean().default(false),
  maintenanceFee: z.coerce.number().optional(),
  pricePerSqm: z.coerce.number().optional(),
});

export type CreatePropertyDto = z.infer<typeof createPropertySchema>;
