import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/repositories/iuser.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}