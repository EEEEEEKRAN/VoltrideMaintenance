import {
  PlanificationMaintenance,
  TypeMaintenance,
} from '../entities/planification-maintenance.entity';

export interface IPlanificationMaintenanceRepository {
  findById(id: number): Promise<PlanificationMaintenance | null>;
  findAll(): Promise<PlanificationMaintenance[]>;
  findByModeleScooterId(
    modeleScooterId: number,
  ): Promise<PlanificationMaintenance[]>;
  findByType(type: TypeMaintenance): Promise<PlanificationMaintenance[]>;
  save(
    planification: PlanificationMaintenance,
  ): Promise<PlanificationMaintenance>;
  update(
    id: number,
    planification: Partial<PlanificationMaintenance>,
  ): Promise<PlanificationMaintenance>;
  delete(id: number): Promise<void>;
}
