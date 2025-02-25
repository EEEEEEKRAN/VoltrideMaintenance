import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanificationMaintenance } from './entities/planification-maintenance.entity';
import { PlanificationMaintenanceController } from '../../interface/controllers/planification-maintenance.controller';
import { GestionPlanificationMaintenanceUseCase } from './use-cases/gestion-planification-maintenance.use-case';
import { PlanificationMaintenanceRepository } from '../../infrastructure/database/typeorm/repositories/planification-maintenance.repository';
import { ModeleScooterModule } from '../modele-scooter/modele-scooter.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanificationMaintenance]),
    ModeleScooterModule,
  ],
  controllers: [PlanificationMaintenanceController],
  providers: [
    GestionPlanificationMaintenanceUseCase,
    {
      provide: 'IPlanificationMaintenanceRepository',
      useClass: PlanificationMaintenanceRepository,
    },
  ],
  exports: [
    GestionPlanificationMaintenanceUseCase,
    'IPlanificationMaintenanceRepository'
  ],
})
export class PlanificationMaintenanceModule {}
