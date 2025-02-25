import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './entities/scooter.entity';
import { ScooterController } from '../../interface/controllers/scooter.controller';
import { GestionScooterUseCase } from './use-cases/gestion-scooter.use-case';
import { ScooterRepository } from '../../infrastructure/database/typeorm/repositories/scooter.repository';
import { ModeleScooterModule } from '../modele-scooter/modele-scooter.module';

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
  exports: [GestionScooterUseCase, 'IScooterRepository'],
})
export class ScooterModule {}
