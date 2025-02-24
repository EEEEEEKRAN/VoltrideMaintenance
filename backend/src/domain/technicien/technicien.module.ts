import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technicien } from './entities/technicien.entity';
import { TechnicienController } from '../../infrastructure/controllers/technicien.controller';
import { GestionTechnicienUseCase } from './use-cases/gestion-technicien.use-case';
import { TechnicienRepository } from '../../infrastructure/database/typeorm/repositories/technicien.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Technicien])],
  controllers: [TechnicienController],
  providers: [
    GestionTechnicienUseCase,
    {
      provide: 'ITechnicienRepository',
      useClass: TechnicienRepository,
    },
  ],
  exports: [GestionTechnicienUseCase],
})
export class TechnicienModule {}
