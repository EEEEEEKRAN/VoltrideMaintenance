import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PlanificationMaintenance,
  TypeMaintenance,
} from '../../../../domain/planification-maintenance/entities/planification-maintenance.entity';
import { IPlanificationMaintenanceRepository } from '../../../../domain/planification-maintenance/repositories/planification-maintenance.repository.interface';

@Injectable()
export class PlanificationMaintenanceRepository
  implements IPlanificationMaintenanceRepository
{
  constructor(
    @InjectRepository(PlanificationMaintenance)
    private readonly repository: Repository<PlanificationMaintenance>,
  ) {}

  async findById(id: number): Promise<PlanificationMaintenance | null> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<PlanificationMaintenance[]> {
    return this.repository.find();
  }

  async findByModeleScooterId(
    modeleScooterId: number,
  ): Promise<PlanificationMaintenance[]> {
    return this.repository.find({
      where: { modeleScooter: { id: modeleScooterId } },
    });
  }

  async findByType(type: TypeMaintenance): Promise<PlanificationMaintenance[]> {
    return this.repository.find({ where: { typeMaintenance: type } });
  }

  async save(
    planification: PlanificationMaintenance,
  ): Promise<PlanificationMaintenance> {
    return this.repository.save(planification);
  }

  async update(
    id: number,
    planification: Partial<PlanificationMaintenance>,
  ): Promise<PlanificationMaintenance> {
    await this.repository.update(id, planification);
    const updatedPlanification = await this.findById(id);
    if (!updatedPlanification) {
      throw new Error(`PlanificationMaintenance with id ${id} not found`);
    }
    return updatedPlanification;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
