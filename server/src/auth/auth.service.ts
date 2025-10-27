import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.schema';
import * as bcrypt from 'bcrypt';
import { isPostgresError } from 'src/common/utils/postgres-error.util';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepositoy: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: UserDto): Promise<void> {
    const { email, username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepositoy.create({
      email,
      username,
      password: hashedPassword,
      role,
    });

    try {
      await this.usersRepositoy.save(user);
    } catch (error) {
      if (isPostgresError(error) && error.code === '23505') {
        throw new ConflictException('Email or username already exists!');
      }

      throw new InternalServerErrorException();
    }
  }

  async signIn(authCredentialsDto: UserDto): Promise<{ accessToken: string }> {
    const { email, password, username } = authCredentialsDto;
    const user = await this.usersRepositoy.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email, username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Wrong Credentials!');
    }
  }
}
