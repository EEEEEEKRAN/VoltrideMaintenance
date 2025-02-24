import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import {
  Maintenance,
  MaintenanceType,
} from '../../../../domain/maintenance/entities/maintenance.entity';
import { IMaintenanceRepository } from '../../../../domain/maintenance/repositories/maintenance.repository.interface';

@Injectable()
export class MaintenanceRepository implements IMaintenanceRepository {
  constructor(
    @InjectRepository(Maintenance)
    private readonly repository: Repository<Maintenance>,
  ) {}

  async findById(id: number): Promise<Maintenance | null> {
    return this.repository.findOneBy({ id });
  }

  async findAll(): Promise<Maintenance[]> {
    return this.repository.find();
  }

  async findByScooterId(scooterId: number): Promise<Maintenance[]> {
    return this.repository.find({
      where: { scooter: { id: scooterId } },
    });
  }

  async findByType(type: MaintenanceType): Promise<Maintenance[]> {
    return this.repository.find({ where: { type } });
  }

  async findEnCours(): Promise<Maintenance[]> {
    return this.repository.find({
      where: { dateFin: IsNull() },
    });
  }

  async findTerminees(): Promise<Maintenance[]> {
    return this.repository.find({
      where: { dateFin: Not(IsNull()) },
    });
  }

  async save(maintenance: Maintenance): Promise<Maintenance> {
    return this.repository.save(maintenance);
  }

  async update(
    id: number,
    maintenance: Partial<Maintenance>,
  ): Promise<Maintenance> {
    await this.repository.update(id, maintenance);
    const updatedMaintenance = await this.findById(id);
    if (!updatedMaintenance) {
      throw new Error(`Maintenance with id ${id} not found`);
    }
    return updatedMaintenance;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
