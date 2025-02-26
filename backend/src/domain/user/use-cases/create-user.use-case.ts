import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/iuser.repository';
import { Utilisateur } from '../entities/user.entity';


@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: Utilisateur): Promise<Utilisateur> {
    return this.userRepository.save(user);
  }
  
}