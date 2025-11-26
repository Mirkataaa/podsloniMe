import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto, UpdatePropertyDto } from './property.dto';
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

