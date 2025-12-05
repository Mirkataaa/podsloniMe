import type { User } from './user.types';
export const currencies = ['BGN', 'EUR'] as const;
export type Currency = (typeof currencies)[number];

export const transactionTypes = ['sale', 'rent'] as const;
export type TransactionType = (typeof transactionTypes)[number];

export const propertyTypes = [
  'apartment',
  'house',
  'office',
  'land',
  'garage',
  'other',
] as const;
export type PropertyType = (typeof propertyTypes)[number];

export const constructionTypes = [
  'brick',
  'panel',
  'epk',
  'new_build',
  'monolithic',
  'other',
] as const;
export type ConstructionType = (typeof constructionTypes)[number];

export const heatingTypes = [
  'none',
  'electric',
  'gas',
  'tec',
  'aircon',
  'pellet',
  'other',
] as const;
export type HeatingType = (typeof heatingTypes)[number];

export const buildingStages = ['shell', 'act14', 'act15', 'act16'] as const;
export type BuildingStage = (typeof buildingStages)[number];

export interface FilteredProperty {
  id: string;
  title: string;
  description: string;
  settlement?: string;
  district?: string;
  address?: string;
  price: number;
  currency: Currency;
  area: number;
  images: {
    url: string;
    publicId: string;
  }[];
  propertyType: string;
  transactionType: string;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: Currency;
  transactionType: TransactionType;
  propertyType: PropertyType;
  area: number;
  yardArea?: number;
  floor?: number;
  totalFloors?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished: boolean;
  yearBuilt?: number;
  district?: string;
  region?: string;
  municipality?: string;
  settlement?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  images: {
    url: string;
    publicId: string;
  }[];
  constructionType?: ConstructionType;
  heating?: HeatingType;
  hasParking: boolean;
  hasGarage: boolean;
  hasElevator: boolean;
  hasSecurity: boolean;
  hasVideoSurveillance: boolean;
  internetReady: boolean;
  buildingStage: BuildingStage;
  act16: boolean;
  maintenanceFee?: number;
  pricePerSqm?: number;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export const LABELS = {
  propertyTypes: {
    apartment: 'Апартамент',
    house: 'Къща',
    office: 'Офис',
    land: 'Парцел',
    garage: 'Гараж',
    other: 'Друго',
  },
  constructionTypes: {
    brick: 'Тухла',
    panel: 'Панел',
    epk: 'ЕПК',
    new_build: 'Ново строителство',
    monolithic: 'Монолит',
    other: 'Друго',
  },
  heatingTypes: {
    none: 'Без отопление',
    electric: 'Електричество',
    gas: 'Газ',
    tec: 'ТЕЦ',
    aircon: 'Климатик',
    pellet: 'Пелети',
    other: 'Друго',
  },
  buildingStages: {
    shell: 'Груб строеж',
    act14: 'Акт 14',
    act15: 'Акт 15',
    act16: 'Акт 16',
  },
  transactionTypes: {
    sale: 'Продажба',
    rent: 'Наем',
  },
};
