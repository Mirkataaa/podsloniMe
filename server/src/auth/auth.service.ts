import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: CreateUserDto): Promise<void> {
    const { email, username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      email,
      username,
      password: hashedPassword,
      role,
    };

    await this.usersService.createUser(user);
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
