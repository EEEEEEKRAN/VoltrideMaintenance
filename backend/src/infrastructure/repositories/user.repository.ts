import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { Utilisateur } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private users: Utilisateur[] = [];
  private currentId: number = 1;

  async save(user: Utilisateur): Promise<Utilisateur> {
    user.id = this.currentId++;
    this.users.push(user);
    return user;
  }
  async findById(id: number): Promise<Utilisateur | null> {
    return this.users.find(user => user.id === id) || null;
  }
  async findAll(): Promise<Utilisateur[]> {
    return this.users;
  }


  async update(user: Utilisateur): Promise<Utilisateur> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return user;
  }

  async delete(id: number): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}