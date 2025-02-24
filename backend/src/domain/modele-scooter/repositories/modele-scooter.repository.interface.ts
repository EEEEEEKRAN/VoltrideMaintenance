import { ModeleScooter } from '../entities/modele-scooter.entity';

export interface IModeleScooterRepository {
  findById(id: number): Promise<ModeleScooter | null>;
  findByNom(nom: string): Promise<ModeleScooter | null>;
  findAll(): Promise<ModeleScooter[]>;
  save(modeleScooter: ModeleScooter): Promise<ModeleScooter>;
  update(
    id: number,
    modeleScooter: Partial<ModeleScooter>,
  ): Promise<ModeleScooter>;
  delete(id: number): Promise<void>;
  findWithScooters(id: number): Promise<ModeleScooter | null>;
}
