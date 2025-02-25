import { Injectable, Inject } from '@nestjs/common';
import { INotificationService } from '../../../domain/notification/interfaces/notification-service.interface';
import { Scooter } from '../../../domain/scooter/entities/scooter.entity';
import { MaintenanceType } from '../../../domain/maintenance/entities/maintenance.entity';
import { IPlanificationMaintenanceRepository } from '../../../domain/planification-maintenance/repositories/planification-maintenance.repository.interface';
import { IScooterRepository } from '../../../domain/scooter/repositories/scooter.repository.interface';
import { ITechnicienRepository } from '../../../domain/technicien/repositories/technicien.repository.interface';

interface MaintenanceNecessaire {
  scooter: Scooter;
  types: MaintenanceType[];
  dateRecommandee: Date;
}

@Injectable()
export class MaintenanceAlertUseCase {
  constructor(
    @Inject('INotificationService')
    private readonly notificationService: INotificationService,
    @Inject('IPlanificationMaintenanceRepository')
    private readonly planificationMaintenanceRepository: IPlanificationMaintenanceRepository,
    @Inject('IScooterRepository')
    private readonly scooterRepository: IScooterRepository,
    @Inject('ITechnicienRepository')
    private readonly technicienRepository: ITechnicienRepository,
  ) {}

  async verifierEtEnvoyerAlertesMaintenances(): Promise<{
    scootersAlertes: number;
    emailsEnvoyes: number;
  }> {
    const scooters = await this.scooterRepository.findAll();
    const maintenancesNecessaires: MaintenanceNecessaire[] = [];

    for (const scooter of scooters) {
      const planifications =
        await this.planificationMaintenanceRepository.findByModeleScooterId(
          scooter.modeleScooter.id,
        );

      const typesMaintenanceNecessaires: MaintenanceType[] = [];

      for (const planification of planifications) {
        if (
          planification.verifierMaintenanceNecessaire(
            scooter.dateDerniereMaintenance || new Date(0),
            scooter.kilometrageTotal,
            scooter.cyclesCharge,
          )
        ) {
          typesMaintenanceNecessaires.push(
            planification.typeMaintenance as unknown as MaintenanceType,
          );
        }
      }

      if (typesMaintenanceNecessaires.length > 0) {
        maintenancesNecessaires.push({
          scooter,
          types: typesMaintenanceNecessaires,
          dateRecommandee: new Date(),
        });
      }
    }

    const techniciens = await this.technicienRepository.findAll();
    let emailsEnvoyes = 0;

    for (const maintenance of maintenancesNecessaires) {
      for (const technicien of techniciens) {
        if (technicien.estDisponible()) {
          const success = await this.notificationService.sendMaintenanceAlert(
            technicien.email,
            {
              id: maintenance.scooter.id,
              numeroSerie: maintenance.scooter.numeroSerie,
              modele: maintenance.scooter.modeleScooter.nom,
            },
            {
              type: maintenance.types.join(', '),
              recommandationDate: maintenance.dateRecommandee,
            },
          );

          if (success) {
            emailsEnvoyes++;
          }
        }
      }
    }

    return {
      scootersAlertes: maintenancesNecessaires.length,
      emailsEnvoyes,
    };
  }
} 