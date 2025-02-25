import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from './entities/maintenance.entity';
import { MaintenanceController } from '../../interface/controllers/maintenance.controller';
import { GestionMaintenanceUseCase } from './use-cases/gestion-maintenance.use-case';
import { MaintenanceRepository } from '../../infrastructure/database/typeorm/repositories/maintenance.repository';
import { ScooterModule } from '../scooter/scooter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Maintenance]), ScooterModule],
  controllers: [MaintenanceController],
  providers: [
    GestionMaintenanceUseCase,
    {
      provide: 'IMaintenanceRepository',
      useClass: MaintenanceRepository,
    },
  ],
  exports: [GestionMaintenanceUseCase, 'IMaintenanceRepository'],
})
export class MaintenanceModule {} 