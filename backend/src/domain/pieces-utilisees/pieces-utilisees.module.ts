import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiecesUtilisees } from './entities/pieces-utilisees.entity';
import { PiecesUtiliseesController } from '../../interface/controllers/pieces-utilisees.controller';
import { GestionPiecesUtiliseesUseCase } from './use-cases/gestion-pieces-utilisees.use-case';
import { PiecesUtiliseesRepository } from '../../infrastructure/database/typeorm/repositories/pieces-utilisees.repository';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { PieceModule } from '../piece/piece.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PiecesUtilisees]),
    MaintenanceModule,
    PieceModule,
  ],
  controllers: [PiecesUtiliseesController],
  providers: [
    GestionPiecesUtiliseesUseCase,
    {
      provide: 'IPiecesUtiliseesRepository',
      useClass: PiecesUtiliseesRepository,
    },
  ],
  exports: [GestionPiecesUtiliseesUseCase, 'IPiecesUtiliseesRepository'],
})
export class PiecesUtiliseesModule {} 