import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Repository } from 'typeorm';
import { CreateAgencyDto } from './agency.dto';
import { parsePostgresUniqueError } from 'src/common/utils/parse-postgres-unique-error.util';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepo: Repository<Agency>,
  ) {}

  async createAgency(data: CreateAgencyDto): Promise<Agency> {
    try {
      const agency = this.agencyRepo.create({
        ...data,
        isApproved: false,
      });

      return await this.agencyRepo.save(agency);
    } catch (error) {
      const message = parsePostgresUniqueError(error);

      if (message) {
        throw new ConflictException(message);
      }

      throw new InternalServerErrorException('Грешка при създаване на агенция');
    }
  }

  findOne(id: string): Promise<Agency | null> {
    return this.agencyRepo.findOne({ where: { id }, relations: ['members'] });
  }

  findAll(): Promise<Agency[]> {
    return this.agencyRepo.find({ relations: ['members'] });
  }

  async remove(id: string): Promise<void> {
    await this.agencyRepo.delete(id);
  }

  async save(agency: Agency): Promise<Agency> {
    return this.agencyRepo.save(agency);
  }
}
