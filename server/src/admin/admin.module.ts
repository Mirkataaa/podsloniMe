import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AgenciesModule } from 'src/agencies/agencies.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AgenciesModule, UsersModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
