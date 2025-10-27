import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.schema';
import * as bcrypt from 'bcrypt';
import { isPostgresError } from 'src/common/utils/postgres-error.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepositoy: Repository<User>,
  ) {}

  async register(authCredentialsDto: CreateUserDto): Promise<void> {
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
}
