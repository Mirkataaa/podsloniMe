import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type CreateUserDto,
  createUserSchema,
  type LoginUserDto,
  loginUserSchema,
} from '../users/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async register(@Body() authCredentialsDto: CreateUserDto): Promise<void> {
    await this.authService.register(authCredentialsDto);
  }

  @Post('/signin')
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async signIn(
    @Body() authCredentialsDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
