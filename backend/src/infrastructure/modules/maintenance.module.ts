import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Maintenance } from '../../domain/maintenance/entities/maintenance.entity';
import { MaintenanceController } from '../controllers/maintenance.controller';
import { GestionMaintenanceUseCase } from '../../domain/maintenance/use-cases/gestion-maintenance.use-case';
import { MaintenanceRepository } from '../database/typeorm/repositories/maintenance.repository';
import { ScooterModule } from '../../domain/scooter/scooter.module';

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
  exports: [GestionMaintenanceUseCase],
})
export class MaintenanceModule {}
