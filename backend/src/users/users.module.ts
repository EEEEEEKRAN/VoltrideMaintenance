import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from '../interface/controllers/users.controller';
import { AuthController } from '../interface/controllers/auth.controller';
import { CreateUserUseCase } from '../application/uses-cases/create-user.use-case';
import { GetUserUseCase } from '../application/uses-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../application/uses-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../application/uses-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/uses-cases/delete-user.use-case';
import { LoginUserUseCase } from '../application/uses-cases/login-user.use-case';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { Utilisateur } from '../domain/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    JwtModule.register({
      secret: '260e9476d3c1f7ce7dbf2d0d7591021aabf07a44dfa1bbaf9fcc0ffc2d703d38',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LoginUserUseCase,
    UsersService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    JwtModule,
  ],
})
export class UsersModule {}
