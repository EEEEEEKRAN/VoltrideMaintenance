import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../interface/controllers/users.controller';
import { AuthController } from '../interface/controllers/auth.controller';
import { CreateUserUseCase } from '../application/uses-cases/create-user.use-case';
import { GetUserUseCase } from '../application/uses-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../application/uses-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../application/uses-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/uses-cases/delete-user.use-case';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { Utilisateur } from '../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  controllers: [UsersController, AuthController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    UsersService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UsersModule {}
