import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  type CreateUserDto,
  createUserSchema,
  LoginReponseDto,
  type LoginUserDto,
  loginUserSchema,
} from '../users/user.dto';

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
  ): Promise<LoginReponseDto> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
