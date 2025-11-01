import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type CreateAgencyDto,
  createAgencySchema,
  type UpdateAgencyDto,
} from './agency.dto';
import { Agency } from './agency.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User, UserRole } from 'src/users/user.entity';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAgencySchema))
  async create(
    @GetUser() user: User,
    @Body() data: CreateAgencyDto,
  ): Promise<Agency> {
    if (user.role !== UserRole.BROKER) {
      throw new ForbiddenException('Only brokes can create agencies');
    }

    const agency = await this.agenciesService.createAgency({
      ...data,
      isApproved: false,
    });

    return agency;
  }

  @Get()
  async findAllApprovedAgencies(): Promise<Agency[] | null> {
    const agencies = await this.agenciesService.findAll();
    return agencies.filter((a) => a.isApproved);
  }

  @UseGuards(AuthGuard())
  @Get('my')
  async getMyAgency(@GetUser() user: User): Promise<Agency | null> {
    if (!user.agency) {
      throw new ForbiddenException('You are not associated with any agency');
    }

    return this.agenciesService.findOne(user.agency.id);
  }

  @UseGuards(AuthGuard())
  @Patch(':id')
  async updateAgency(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() data: UpdateAgencyDto,
  ): Promise<Agency> {
    const agency = await this.agenciesService.findOne(id);

    if (!agency) {
      throw new ForbiddenException('Agency not found');
    }

    if (user.role !== UserRole.ADMIN && agency.owner?.id !== user.id) {
      throw new ForbiddenException('You cannot edit this agency');
    }

    return this.agenciesService.updateAgency(id, data);
  }

  }
}
