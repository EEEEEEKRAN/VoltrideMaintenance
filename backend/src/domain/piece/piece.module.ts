import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Piece } from './entities/piece.entities';
import { PieceController } from '../../interface/controllers/piece.controller';
import { GestionPieceUseCase } from './use-cases/gestion-piece.use-case';
import { PieceRepository } from '../../infrastructure/database/typeorm/repositories/piece.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Piece])],
  controllers: [PieceController],
  providers: [
    GestionPieceUseCase,
    {
      provide: 'IPieceRepository',
      useClass: PieceRepository,
    },
  ],
  exports: [GestionPieceUseCase, 'IPieceRepository'],
})
export class PieceModule {}
