import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiecesUtilisees } from '../../domain/pieces-utilisees/entities/pieces-utilisees.entity';
import { PiecesUtiliseesController } from '../../interface/controllers/pieces-utilisees.controller';
import { GestionPiecesUtiliseesUseCase } from '../../domain/pieces-utilisees/use-cases/gestion-pieces-utilisees.use-case';
import { PiecesUtiliseesRepository } from '../database/typeorm/repositories/pieces-utilisees.repository';
import { MaintenanceModule } from './maintenance.module';
import { PieceModule } from '../../domain/piece/piece.module';

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
  exports: [GestionPiecesUtiliseesUseCase],
})
export class PiecesUtiliseesModule {}
