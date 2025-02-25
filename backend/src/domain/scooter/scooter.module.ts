import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './entities/scooter.entity';
import { ScooterRepository } from '../../infrastructure/database/typeorm/repositories/scooter.repository';
import { GestionScooterUseCase } from './use-cases/gestion-scooter.use-case';
import { ScooterController } from '../../interface/controllers/scooter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter])],
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
