import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CreateUserUseCase } from '../../application/uses-cases/create-user.use-case';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}