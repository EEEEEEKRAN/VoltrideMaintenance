import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../domain/user/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../domain/user/use-cases/get-user.use-case';
import { GetAllUsersUseCase } from '../../domain/user/use-cases/get-all-users.use-case';
import { UpdateUserUseCase } from '../../domain/user/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../domain/user/use-cases/delete-user.use-case';
import { Utilisateur } from '../../domain/user/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(@Body() user: Utilisateur) {
    return this.createUserUseCase.execute(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute(+id);
  }

  @Get()
  async findAll() {
    return this.getAllUsersUseCase.execute();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Utilisateur) {
    user.id = +id;
    return this.updateUserUseCase.execute(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(+id);
  }
}
