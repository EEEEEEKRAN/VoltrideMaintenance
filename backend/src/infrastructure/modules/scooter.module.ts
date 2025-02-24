import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from '../../domain/scooter/entities/scooter.entity';
import { ScooterController } from '../../presentation/controllers/scooter.controller';
import { GestionScooterUseCase } from '../../domain/scooter/use-cases/gestion-scooter.use-case';
import { ScooterRepository } from '../database/typeorm/repositories/scooter.repository';
import { ModeleScooterModule } from '../../domain/modele-scooter/modele-scooter.module';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter]), ModeleScooterModule],
  controllers: [ScooterController],
  providers: [
    GestionScooterUseCase,
    {
      provide: 'IScooterRepository',
      useClass: ScooterRepository,
    },
  ],
  exports: [GestionScooterUseCase],
})
export class ScooterModule {}
