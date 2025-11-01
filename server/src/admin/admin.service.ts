import { Injectable, NotFoundException } from '@nestjs/common';
import { AgenciesService } from 'src/agencies/agencies.service';
import { Agency } from 'src/agencies/agency.entity';
import { UserRole } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly agenciesService: AgenciesService,
    private readonly usersService: UsersService,
  ) {}

  async approveAgency(id: string): Promise<Agency> {
    const agency = await this.agenciesService.findOne(id);

    if (!agency) {
      throw new NotFoundException('Agenct not found');
    }

    agency.isApproved = true;
    return this.agenciesService.save(agency);
  }

  async approveBroker(id: string): Promise<{ message: string }> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.BROKER) {
      return { message: `User ${user.username} dos not requre approval` };
    }

    user.isApproved = true;
    await this.usersService.save(user);

    return { message: `Broker ${user.username} has been approved` };
  }

  async removeAgency(id: string): Promise<void> {
    return this.agenciesService.remove(id);
  }

  async findPendingAgencies(): Promise<Agency[]> {
    return this.agenciesService.findPending();
  }

  async removeUser(id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
