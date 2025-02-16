import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RegisterUserDto } from '../dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }
}
