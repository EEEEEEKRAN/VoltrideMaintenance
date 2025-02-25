import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../../interface/dto/login-user.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    console.log('User found:', user);

    if (user) {
      const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
      console.log('Password valid:', isPasswordValid);

      if (isPasswordValid) {
        const { password: userPassword, ...result } = user;
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        return { ...result, accessToken };
      }
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}
