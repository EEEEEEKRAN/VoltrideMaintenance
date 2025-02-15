import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/uses-cases/create-user.use-case';
import { Utilisateur } from '../../domain/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() user: Utilisateur) {
    return this.createUserUseCase.execute(user);
  }
}