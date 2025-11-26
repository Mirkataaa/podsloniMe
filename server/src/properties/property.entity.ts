import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  TransactionType,
  Currency,
  PropertyType,
  BuildingStage,
  ConstructionType,
  HeatingType,
} from './property.types';
import { User } from 'src/users/user.entity';
import { PropertyImage } from 'src/cloudinary/property-image.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 160 })
  @Index()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 3 })
  currency: Currency;

  @Column({ type: 'varchar', length: 10 })
  transactionType: TransactionType;

  @Column({ type: 'varchar', length: 20 })
  propertyType: PropertyType;

  @Column('int')
  area: number; // sqm

  @Column('int', { nullable: true })
  yardArea?: number;

  @Column('int', { nullable: true })
  floor?: number;

  @Column('int', { nullable: true })
  totalFloors?: number;

  @Column('int', { nullable: true })
  bedrooms?: number;

  @Column('int', { nullable: true })
  bathrooms?: number;

  @Column({ default: false })
  furnished: boolean;

  @Column('int', { nullable: true })
  yearBuilt?: number;

  @Column({ length: 20 })
  region: string;

  @Column({ length: 20 })
  municipality: string;

  @Column({ length: 20 })
  settlement: string;

  @Column({ length: 20, nullable: true })
  district?: string;

  @Column({ length: 80, nullable: true })
  address?: string;

  @Column({ type: 'double precision', nullable: true })
  latitude?: number;

  @Column({ type: 'double precision', nullable: true })
  longitude?: number;

  @OneToMany(() => PropertyImage, (image) => image.property, {
    cascade: true,
  })
  images?: PropertyImage[];

  @Column({ type: 'varchar', length: 20, nullable: true })
  constructionType?: ConstructionType | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  heating?: HeatingType;

  @Column({ default: false })
  hasParking: boolean;

  @Column({ default: false })
  hasGarage: boolean;

  @Column({ default: false })
  hasElevator: boolean;

  @Column({ default: false })
  hasSecurity: boolean;

  @Column({ default: false })
  hasVideoSurveillance: boolean;

  @Column({ default: false })
  internetReady: boolean;

  @Column({ type: 'varchar', length: 10, nullable: true })
  buildingStage?: BuildingStage;

  @Column({ default: false })
  act16: boolean;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  maintenanceFee?: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  pricePerSqm?: number;

  @ManyToOne(() => User, (u) => u.id, { eager: true })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
