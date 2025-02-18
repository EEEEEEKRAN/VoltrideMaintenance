import { Scooter } from '../entities/scooter.entity';

export interface IScooterRepository {
  create(scooter: Scooter): Promise<Scooter>;
  findById(id: number): Promise<Scooter>;
  findAll(): Promise<Scooter[]>;
  update(id: number, scooter: Partial<Scooter>): Promise<Scooter>;
  delete(id: number): Promise<void>;
  findByNumeroSerie(numeroSerie: string): Promise<Scooter>;
  findByStatut(statut: string): Promise<Scooter[]>;
  updateKilometrage(id: number, kilometrage: number): Promise<Scooter>;
  updateCyclesCharge(id: number, cycles: number): Promise<Scooter>;
  updateDerniereMaintenance(id: number, date: Date): Promise<Scooter>;
}
