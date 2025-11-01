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

