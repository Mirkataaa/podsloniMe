import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuards } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User, UserRole } from 'src/users/user.entity';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type CreatePropertyDto,
  createPropertySchema,
  type UpdatePropertyDto,
  updatePropertySchema,
} from './property.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuards)
  @Roles(UserRole.ADMIN, UserRole.BROKER)
  @Post()
  async create(
    @Body(new ZodValidationPipe(createPropertySchema)) body: CreatePropertyDto,
    @GetUser() user: User,
  ) {
    return this.service.create(body, user);
  }

  @Get()
  async list(
    @Query('settlement')
    settlement?: string,
    @Query('transactionType')
    transactionType?: string,
    @Query('propertyType')
    propertyType?: string,
    @Query('minPrice')
    minPrice?: string,
    @Query('maxPrice')
    maxPrice?: string,
  ) {
    return this.service.findAll({
      settlement,
      transactionType,
      propertyType,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

