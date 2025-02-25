import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/repositories/iuser.repository';
import { Utilisateur } from '../../domain/user/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<Utilisateur[]> {
    return this.userRepository.findAll();
  }
}