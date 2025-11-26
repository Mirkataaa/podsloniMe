import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from './property.dto';
import { User } from 'src/users/user.entity';
import { toPropertyEntity } from './property.mapper';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertiesRepo: Repository<Property>,
  ) {}

  async create(data: CreatePropertyDto, creator: User): Promise<Property> {
    const entityInput = toPropertyEntity(data, creator);
    const entity = this.propertiesRepo.create(entityInput);

    return await this.propertiesRepo.save(entity);
  }

  async findAll(params?: {
    settlement?: string;
    transactionType?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    const qb = this.propertiesRepo.createQueryBuilder('p');

    qb.leftJoinAndSelect('p.images', 'images');

    if (params?.settlement) {
      qb.andWhere('p.settlement ILIKE :settlement', {
        settlement: `%${params.settlement}%`,
      });
    }
    if (params?.transactionType) {
      qb.andWhere('p.transactionType = :tt', { tt: params.transactionType });
    }
    if (params?.propertyType) {
      qb.andWhere('p.propertyType = :pt', { pt: params.propertyType });
    }
    if (params?.minPrice) {
      qb.andWhere('p.price >= :min', { min: params.minPrice });
    }
    if (params?.maxPrice) {
      qb.andWhere('p.price <= :max', { max: params.maxPrice });
    }

    qb.orderBy('p.createdAt', 'DESC');
    return qb.getMany();
  }

