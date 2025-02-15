import { Module } from '@nestjs/common';
import { UsersController } from '../interface/controllers/users.controller';
import { CreateUserUseCase } from '../application/uses-cases/create-user.use-case';
import { GetUserUseCase } from '../application/uses-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../application/uses-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../application/uses-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/uses-cases/delete-user.use-case';
import { UserRepository } from '../infrastructure/repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}