import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../user/repositories/iuser.repository';
import { Utilisateur } from '../../user/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: Utilisateur): Promise<Utilisateur> {
    return this.userRepository.update(user);
  }
}