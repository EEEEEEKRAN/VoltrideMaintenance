import { Technicien, TechnicienStatut } from '../entities/technicien.entity';

export interface ITechnicienRepository {
  findById(id: number): Promise<Technicien | null>;
  findByEmail(email: string): Promise<Technicien | null>;
  findAll(): Promise<Technicien[]>;
  findByStatut(statut: TechnicienStatut): Promise<Technicien[]>;
  findDisponibles(): Promise<Technicien[]>;
  save(technicien: Technicien): Promise<Technicien>;
  update(id: number, technicien: Partial<Technicien>): Promise<Technicien>;
  delete(id: number): Promise<void>;
}
