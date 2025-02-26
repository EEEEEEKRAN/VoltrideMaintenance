import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from '../../user/repositories/iuser.repository';
import { UpdateUserDto } from '../../user/dtos/update-user.dto';

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