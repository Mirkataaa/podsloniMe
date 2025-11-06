import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginReponseDto,
  LoginUserDto,
} from '../users/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/user.entity';
import { AgenciesService } from 'src/agencies/agencies.service';
import { toUserDto } from 'src/users/user.mapper';
import { Agency } from 'src/agencies/agency.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly agenciesService: AgenciesService,
  ) {}

  async register(authCredentialsDto: CreateUserDto): Promise<void> {
    const {
      email,
      username,
      password,
      role,
      agencyId,
      agency,
      createNewAgency,
    } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const baseUser = {
      email,
      username,
      password: hashedPassword,
      role,
    };

    try {
      if (role === UserRole.USER) {
        await this.usersService.createUser({
          ...baseUser,
          isApproved: true,
        });

        return;
      }

      if (role === UserRole.BROKER) {
        const broker = await this.usersService.createUser({
          ...baseUser,
          isApproved: false,
        });

        let createdAgency: Agency | null = null;

        // case: create NEW agency
        if (createNewAgency && agency) {
          createdAgency = await this.agenciesService.createAgency({
            ...agency,
            isApproved: false,
          });

          // set owner reference
          createdAgency.owner = broker;
          await this.agenciesService.save(createdAgency);

          broker.agency = createdAgency;
          await this.usersService.save(broker);
        }

        // case: join EXISTING agency
        else if (agencyId) {
          const existingAgency = await this.agenciesService.findOne(agencyId);
          await this.usersService.update(broker.id, {
            agency: existingAgency,
          });
        }

        return;
      }
    } catch (error) {
      console.log('Registration failed:', error);
      throw new InternalServerErrorException('Грешка при регистрация');
    }
  }

  async signIn(authCredentialsDto: LoginUserDto): Promise<LoginReponseDto> {
    const { email, password } = authCredentialsDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Wrong credentials!');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken, user: toUserDto(user) };
  }
}
