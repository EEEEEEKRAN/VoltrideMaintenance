import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { CreateUserUseCase } from '../../domain/user/use-cases/create-user.use-case';
import { UserRepository } from '../../domain/user/repositories/user.repository';

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