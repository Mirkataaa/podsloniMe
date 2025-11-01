import { Controller, Delete, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Agency } from 'src/agencies/agency.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('approve/agency/:id')
  approveAgency(@Param('id') id: string): Promise<Agency> {
    return this.adminService.approveAgency(id);
  }

  @Patch('approve/broker/:id')
  approveUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.adminService.approveBroker(id);
  }

  @Delete('agency/:id')
  removeAgency(@Param('id') id: string): Promise<void> {
    return this.adminService.removeAgency(id);
  }

  @Delete('user/:id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.adminService.removeUser(id);
  }
}
