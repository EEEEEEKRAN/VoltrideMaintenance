import { Scooter, ScooterStatut } from '../entities/scooter.entity';

export interface IScooterRepository {
  findById(id: number): Promise<Scooter | null>;
  findByNumeroSerie(numeroSerie: string): Promise<Scooter | null>;
  findAll(): Promise<Scooter[]>;
  findByStatut(statut: ScooterStatut): Promise<Scooter[]>;
  findDisponibles(): Promise<Scooter[]>;
  findByKilometrage(minKm: number, maxKm?: number): Promise<Scooter[]>;
  findByCyclesCharge(minCycles: number, maxCycles?: number): Promise<Scooter[]>;
  save(scooter: Scooter): Promise<Scooter>;
  update(id: number, scooter: Partial<Scooter>): Promise<Scooter>;
  delete(id: number): Promise<void>;
  findNecessitantMaintenance(): Promise<Scooter[]>;
}
