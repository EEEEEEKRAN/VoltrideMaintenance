import { Module } from '@nestjs/common';
import { AuthController } from '../interface/controllers/auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
