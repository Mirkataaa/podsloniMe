import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/user.entity';
import { AgenciesService } from 'src/agencies/agencies.service';

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
      agencyName,
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
        let agency = null;

        if (createNewAgency && agencyName) {
          agency = await this.agenciesService.createAgency({
            name: agencyName,
            isApproved: false,
          });
        } else if (agencyId) {
          agency = await this.agenciesService.findOne(agencyId);
        }

        await this.usersService.createUser({
          ...baseUser,
          agency,
          isApproved: false,
        });

        return;
      }
    } catch (error) {
      console.log('Registration failed:', error);

      throw new InternalServerErrorException('Грешка при регистрация');
    }
  }

  async signIn(
    authCredentialsDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
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

    return { accessToken };
  }
}
