// src/users/users.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Utilisateur } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/iuser.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async create(user: Utilisateur) {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<Utilisateur | null> {
    return this.userRepository.findById(id);
  }
}
