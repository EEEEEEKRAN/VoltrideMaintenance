import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScooterController } from '../interface/controllers/scooter.controller';
import { CreateScooterUseCase } from '../application/uses-cases/create-scooter.use-case';
import { GetScooterUseCase } from '../application/uses-cases/get-scooter.use-case';
import { UpdateScooterUseCase } from '../application/uses-cases/update-scooter.use-case';
import { DeleteScooterUseCase } from '../application/uses-cases/delete-scooter.use-case';
import { ScooterRepository } from '../infrastructure/repositories/scooter.repository';
import { Scooter } from '../domain/entities/scooter.entity';
import { ModeleScooter } from '../domain/entities/modele-scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Scooter, ModeleScooter])],
  controllers: [ScooterController],
  providers: [
    CreateScooterUseCase,
    GetScooterUseCase,
    UpdateScooterUseCase,
    DeleteScooterUseCase,
    {
      provide: 'IScooterRepository',
      useClass: ScooterRepository,
    },
  ],
  exports: [
    {
      provide: 'IScooterRepository',
      useClass: ScooterRepository,
    },
  ],
})
export class ScooterModule {}
