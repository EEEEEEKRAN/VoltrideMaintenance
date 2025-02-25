import { Injectable } from '@nestjs/common';
import {
  PlanificationMaintenance,
  TypeMaintenance,
} from '../entities/planification-maintenance.entity';
import { IPlanificationMaintenanceRepository } from '../repositories/planification-maintenance.repository.interface';
import { CreatePlanificationMaintenanceDto } from '../dtos/create-planification-maintenance.dto';
import { UpdatePlanificationMaintenanceDto } from '../dtos/update-planification-maintenance.dto';
import { IModeleScooterRepository } from '../../modele-scooter/repositories/modele-scooter.repository.interface';

@Injectable()
export class GestionPlanificationMaintenanceUseCase {
  constructor(
    private readonly planificationMaintenanceRepository: IPlanificationMaintenanceRepository,
    private readonly modeleScooterRepository: IModeleScooterRepository,
  ) {}

  async creerPlanification(
    createPlanificationMaintenanceDto: CreatePlanificationMaintenanceDto,
  ): Promise<PlanificationMaintenance> {
    const modeleScooter = await this.modeleScooterRepository.findById(
      createPlanificationMaintenanceDto.modeleScooterId,
    );
    if (!modeleScooter) {
      throw new Error('Modèle de scooter non trouvé');
    }

    const nouvellePlanification = new PlanificationMaintenance(
      modeleScooter,
      createPlanificationMaintenanceDto.typeMaintenance,
      createPlanificationMaintenanceDto.intervalleType,
      createPlanificationMaintenanceDto.intervalleValeur,
    );

    return this.planificationMaintenanceRepository.save(nouvellePlanification);
  }

  async findAll(): Promise<PlanificationMaintenance[]> {
    return this.planificationMaintenanceRepository.findAll();
  }

  async findById(id: number): Promise<PlanificationMaintenance> {
    const planification =
      await this.planificationMaintenanceRepository.findById(id);
    if (!planification) {
      throw new Error('Planification de maintenance non trouvée');
    }
    return planification;
  }
  async findByModeleScooterId(
    modeleScooterId: number,
  ): Promise<PlanificationMaintenance[]> {
    return this.planificationMaintenanceRepository.findByModeleScooterId(
      modeleScooterId,
    );
  }

  async findByType(type: TypeMaintenance): Promise<PlanificationMaintenance[]> {
    return this.planificationMaintenanceRepository.findByType(type);
  }

  async mettreAJourPlanification(
    id: number,
    updatePlanificationMaintenanceDto: UpdatePlanificationMaintenanceDto,
  ): Promise<PlanificationMaintenance> {
    const planification = await this.findById(id);

    if (updatePlanificationMaintenanceDto.typeMaintenance) {
      planification.typeMaintenance =
        updatePlanificationMaintenanceDto.typeMaintenance;
    }

    if (updatePlanificationMaintenanceDto.intervalleType) {
      planification.intervalleType =
        updatePlanificationMaintenanceDto.intervalleType;
    }

    if (updatePlanificationMaintenanceDto.intervalleValeur) {
      planification.intervalleValeur =
        updatePlanificationMaintenanceDto.intervalleValeur;
    }

    return this.planificationMaintenanceRepository.save(planification);
  }

  async supprimerPlanification(id: number): Promise<void> {
    await this.findById(id);
    await this.planificationMaintenanceRepository.delete(id);
  }

  async verifierMaintenanceNecessaire(
    modeleScooterId: number,
    derniereMaintenance: Date,
    kilometrageActuel: number,
    cyclesChargeActuels: number,
  ): Promise<boolean> {
    const planifications = await this.findByModeleScooterId(modeleScooterId);
    return planifications.some((planification) =>
      planification.verifierMaintenanceNecessaire(
        derniereMaintenance,
        kilometrageActuel,
        cyclesChargeActuels,
      ),
    );
  }
}
