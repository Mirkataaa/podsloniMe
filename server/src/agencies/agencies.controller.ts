import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { type CreateAgencyDto, createAgencySchema } from './agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAgencySchema))
  create(@Body() data: CreateAgencyDto) {
    return this.agenciesService.createAgency(data);
  }
}
