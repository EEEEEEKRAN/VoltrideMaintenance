import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UpdateUserDto } from '../../interface/dto/update-user.dto';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }
}