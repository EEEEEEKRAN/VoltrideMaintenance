import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/user/repositories/iuser.repository';
import { Utilisateur } from '../../domain/user/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async save(user: Utilisateur): Promise<Utilisateur> {
    return this.utilisateurRepository.save(user);
  }

  async findById(id: number): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOneBy({ id }) || null;
  }

  async findByEmail(email: string): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }
  async update(user: Utilisateur): Promise<Utilisateur> {
    if (user.id === undefined) {
      throw new Error('User ID is not defined. Cannot update user.');
    }
    const existingUser = await this.findById(user.id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    await this.utilisateurRepository.update(user.id, user);
    const updatedUser = await this.findById(user.id);
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}
