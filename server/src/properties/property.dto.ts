import z from 'zod';
import {
  Currency,
  TransactionType,
  BuildingStage,
  ConstructionType,
  HeatingType,
  PropertyType,
} from './property.types';

export const createPropertySchema = z.object({
  title: z.string().min(3).max(160),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  currency: z.enum(Currency),
  transactionType: z.enum(TransactionType),
  propertyType: z.enum(PropertyType),
  area: z.coerce.number().int().positive(),
  yardArea: z.coerce.number().int().optional(),
  floor: z.coerce.number().int().min(0).optional(),
  totalFloors: z.coerce.number().int().min(0).optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  furnished: z.coerce.boolean().default(false),
  yearBuilt: z.coerce
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),
  region: z.string().min(2).max(20).optional(),
  municipality: z.string().min(2).max(20),
  settlement: z.string().min(2).max(20),
  district: z.string().max(120).optional(),
  address: z.string().max(200).optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
        publicId: z.string(),
      }),
    )
    .max(20)
    .optional(),
  constructionType: z.enum(ConstructionType).optional(),
  heating: z.enum(HeatingType).optional(),
  hasParking: z.coerce.boolean().optional(),
  hasGarage: z.coerce.boolean().optional(),
  hasElevator: z.coerce.boolean().optional(),
  hasSecurity: z.coerce.boolean().optional(),
  hasVideoSurveillance: z.coerce.boolean().optional(),
  internetReady: z.coerce.boolean().optional(),
  buildingStage: z.enum(BuildingStage).optional(),
  act16: z.coerce.boolean().optional(),
  maintenanceFee: z.coerce.number().min(0).optional(),
  pricePerSqm: z.coerce.number().min(0).optional(),
});

export type CreatePropertyDto = z.infer<typeof createPropertySchema>;

export const updatePropertySchema = createPropertySchema.partial();
export type UpdatePropertyDto = z.infer<typeof updatePropertySchema>;
