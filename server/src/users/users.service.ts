import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { parsePostgresUniqueError } from 'src/common/utils/parse-postgres-unique-error.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(
    createUserDto: Partial<User> | CreateUserDto,
  ): Promise<User> {
    const user = this.userRepo.create(createUserDto);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      const message = parsePostgresUniqueError(error);
      if (message) throw new ConflictException(message);

      throw new InternalServerErrorException(
        'Грешка при създаване на потребител',
      );
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, data);
    return await this.userRepo.save(user);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.delete(id);
  }
}
