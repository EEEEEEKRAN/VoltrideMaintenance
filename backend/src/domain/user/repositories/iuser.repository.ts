import { Utilisateur } from '../entities/user.entity';

export interface IUserRepository {
  save(user: Utilisateur): Promise<Utilisateur>;
  findById(id: number): Promise<Utilisateur | null>;
  findAll(): Promise<Utilisateur[]>;
  findByEmail(email: string): Promise<Utilisateur | null>;
  update(user: Utilisateur): Promise<Utilisateur>;
  delete(id: number): Promise<void>;
}