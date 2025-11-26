import { User } from 'src/users/user.entity';
import { CreatePropertyDto } from './property.dto';
import {
  BuildingStage,
  ConstructionType,
  Currency,
  HeatingType,
  PropertyType,
  TransactionType,
} from './property.types';
import { DeepPartial } from 'typeorm';
import { Property } from './property.entity';

export function toPropertyEntity(
  data: CreatePropertyDto,
  creator: User,
): DeepPartial<Property> {
  return {
    title: data.title,
    description: data.description,
    price: data.price,
    currency: data.currency as Currency,
    transactionType: data.transactionType as TransactionType,
    propertyType: data.propertyType as PropertyType,
    area: data.area,
    yardArea: data.yardArea,
    floor: data.floor,
    totalFloors: data.totalFloors,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    furnished: data.furnished ?? false,
    yearBuilt: data.yearBuilt,
    region: data.region,
    municipality: data.municipality,
    settlement: data.settlement,
    district: data.district,
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
    images: data.images,
    constructionType: data.constructionType
      ? (data.constructionType as ConstructionType)
      : undefined,
    heating: data.heating as HeatingType,
    hasParking: data.hasParking ?? false,
    hasGarage: data.hasGarage ?? false,
    hasElevator: data.hasElevator ?? false,
    hasSecurity: data.hasSecurity ?? false,
    hasVideoSurveillance: data.hasVideoSurveillance ?? false,
    internetReady: data.internetReady ?? false,
    buildingStage: data.buildingStage
      ? (data.buildingStage as BuildingStage)
      : undefined,
    act16: data.act16 ?? false,
    maintenanceFee: data.maintenanceFee,
    createdBy: creator,
    pricePerSqm:
      data.price && data.area
        ? Number(data.price) / Number(data.area)
        : undefined,
  };
}
