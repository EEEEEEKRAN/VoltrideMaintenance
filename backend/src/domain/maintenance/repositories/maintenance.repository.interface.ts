import { Maintenance, MaintenanceType } from '../entities/maintenance.entity';

export interface IMaintenanceRepository {
  findById(id: number): Promise<Maintenance | null>;
  findAll(): Promise<Maintenance[]>;
  findByScooterId(scooterId: number): Promise<Maintenance[]>;
  findByType(type: MaintenanceType): Promise<Maintenance[]>;
  findEnCours(): Promise<Maintenance[]>;
  findTerminees(): Promise<Maintenance[]>;
  save(maintenance: Maintenance): Promise<Maintenance>;
  update(id: number, maintenance: Partial<Maintenance>): Promise<Maintenance>;
  delete(id: number): Promise<void>;
}
