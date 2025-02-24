import { Injectable } from '@nestjs/common';
import { Maintenance, MaintenanceType } from '../entities/maintenance.entity';
import { IMaintenanceRepository } from '../repositories/maintenance.repository.interface';
import { CreateMaintenanceDto } from '../dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../dtos/update-maintenance.dto';
import { IScooterRepository } from '../../scooter/repositories/scooter.repository.interface';

@Injectable()
export class GestionMaintenanceUseCase {
  constructor(
    private readonly maintenanceRepository: IMaintenanceRepository,
    private readonly scooterRepository: IScooterRepository,
  ) {}

  async creerMaintenance(
    createMaintenanceDto: CreateMaintenanceDto,
  ): Promise<Maintenance> {
    const scooter = await this.scooterRepository.findById(
      createMaintenanceDto.scooterId,
    );
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    const nouvelleMaintenance = new Maintenance(
      scooter,
      createMaintenanceDto.type,
      createMaintenanceDto.coutMainOeuvre,
      createMaintenanceDto.notesTechniques,
    );

    return this.maintenanceRepository.save(nouvelleMaintenance);
  }

  async findAll(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findAll();
  }

  async findById(id: number): Promise<Maintenance> {
    const maintenance = await this.maintenanceRepository.findById(id);
    if (!maintenance) {
      throw new Error('Maintenance non trouvée');
    }
    return maintenance;
  }

  async findByScooterId(scooterId: number): Promise<Maintenance[]> {
    return this.maintenanceRepository.findByScooterId(scooterId);
  }

  async findByType(type: MaintenanceType): Promise<Maintenance[]> {
    return this.maintenanceRepository.findByType(type);
  }

  async findEnCours(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findEnCours();
  }

  async findTerminees(): Promise<Maintenance[]> {
    return this.maintenanceRepository.findTerminees();
  }

  async terminerMaintenance(id: number): Promise<Maintenance> {
    const maintenance = await this.findById(id);
    maintenance.terminerMaintenance();
    return this.maintenanceRepository.save(maintenance);
  }

  async mettreAJourMaintenance(
    id: number,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ): Promise<Maintenance> {
    const maintenance = await this.findById(id);

    if (updateMaintenanceDto.coutMainOeuvre !== undefined) {
      maintenance.mettreAJourCout(updateMaintenanceDto.coutMainOeuvre);
    }

    if (updateMaintenanceDto.notesTechniques !== undefined) {
      maintenance.ajouterNotesTechniques(updateMaintenanceDto.notesTechniques);
    }

    return this.maintenanceRepository.save(maintenance);
  }

  async supprimerMaintenance(id: number): Promise<void> {
    const maintenance = await this.findById(id);
    if (!maintenance.estTerminee()) {
      throw new Error('Impossible de supprimer une maintenance en cours');
    }
    await this.maintenanceRepository.delete(id);
  }
}
