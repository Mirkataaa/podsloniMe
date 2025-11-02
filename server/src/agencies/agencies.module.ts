import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { AgenciesController } from './agencies.controller';
import { User } from 'src/users/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Agency, User]),
  ],
  providers: [AgenciesService],
  controllers: [AgenciesController],
  exports: [AgenciesService],
})
export class AgenciesModule {}
