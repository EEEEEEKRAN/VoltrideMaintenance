import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginUserUseCase } from '../../application/uses-cases/login-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
