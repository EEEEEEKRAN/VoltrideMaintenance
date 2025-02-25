import { Module } from '@nestjs/common';
import { MaintenanceAlertUseCase } from './maintenance-alert.use-case';
import { MaintenanceAlertController } from '../../../interface/controllers/maintenance-alert.controller';
import { NotificationModule } from '../../../infrastructure/services/notification/notification.module';
import { ScooterModule } from '../../scooter/scooter.module';
import { PlanificationMaintenanceModule } from '../../planification-maintenance/planification-maintenance.module';
import { TechnicienModule } from '../../technicien/technicien.module';

@Module({
  imports: [
    NotificationModule,
    ScooterModule,
    PlanificationMaintenanceModule,
    TechnicienModule,
  ],
  controllers: [MaintenanceAlertController],
  providers: [MaintenanceAlertUseCase],
  exports: [MaintenanceAlertUseCase],
})
export class MaintenanceAlertModule {} 