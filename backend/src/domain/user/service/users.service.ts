import { Injectable, Inject } from '@nestjs/common';
import { Utilisateur } from '../entities/user.entity';
import { IUserRepository } from '../repositories/iuser.repository';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../../register/dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<Utilisateur> {
    const { password, ...userData } = registerUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new Utilisateur(
      userData.nom,
      userData.email,
      userData.telephone,
      userData.numero_permis,
      hashedPassword, 
    );

    return this.userRepository.save(user);
  }
  async create(user: Utilisateur) {
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<Utilisateur | null> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.userRepository.findAll();
  }

  async update(user: Utilisateur): Promise<Utilisateur> {
    return this.userRepository.update(user);
  }

  async remove(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
