import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModeleScooter } from './entities/modele-scooter.entity';
import { ModeleScooterController } from '../../interface/controllers/modele-scooter.controller';
import { GestionModeleScooterUseCase } from './use-cases/gestion-modele-scooter.use-case';
import { ModeleScooterRepository } from '../../infrastructure/database/typeorm/repositories/modele-scooter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModeleScooter])],
  controllers: [ModeleScooterController],
  providers: [
    GestionModeleScooterUseCase,
    {
      provide: 'IModeleScooterRepository',
      useClass: ModeleScooterRepository,
    },
  ],
  exports: [GestionModeleScooterUseCase, 'IModeleScooterRepository'],
})
export class ModeleScooterModule {}
