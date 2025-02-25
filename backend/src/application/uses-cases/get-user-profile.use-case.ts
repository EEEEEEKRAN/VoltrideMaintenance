import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/repositories/iuser.repository';

@Injectable()
export class GetUserProfileUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: number, loggedInUserId: number): Promise<any> {
    // Vérifiez que l'utilisateur connecté demande son propre profil
    if (userId !== loggedInUserId) {
      throw new Error('Unauthorized access');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const { password, ...result } = user;
    return result;
  }
}