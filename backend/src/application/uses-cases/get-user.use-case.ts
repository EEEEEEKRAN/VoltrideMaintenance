import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/repositories/iuser.repository';
import { Utilisateur } from '../../domain/user/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<Utilisateur | null> {
    return this.userRepository.findById(id);
  }
}