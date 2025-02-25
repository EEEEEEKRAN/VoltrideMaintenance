import { Injectable, Inject } from '@nestjs/common';
import { PiecesUtilisees } from '../entities/pieces-utilisees.entity';
import { IPiecesUtiliseesRepository } from '../repositories/pieces-utilisees.repository.interface';
import { CreatePiecesUtiliseesDto } from '../dtos/create-pieces-utilisees.dto';
import { UpdatePiecesUtiliseesDto } from '../dtos/update-pieces-utilisees.dto';
import { IMaintenanceRepository } from '../../maintenance/repositories/maintenance.repository.interface';
import { IPieceRepository } from '../../piece/repositories/piece.repository.interface';

@Injectable()
export class GestionPiecesUtiliseesUseCase {
  constructor(
    @Inject('IPiecesUtiliseesRepository')
    private readonly piecesUtiliseesRepository: IPiecesUtiliseesRepository,
    @Inject('IMaintenanceRepository')
    private readonly maintenanceRepository: IMaintenanceRepository,
    @Inject('IPieceRepository')
    private readonly pieceRepository: IPieceRepository,
  ) {}

  async creerPiecesUtilisees(
    createPiecesUtiliseesDto: CreatePiecesUtiliseesDto,
  ): Promise<PiecesUtilisees> {
    const maintenance = await this.maintenanceRepository.findById(
      createPiecesUtiliseesDto.maintenanceId,
    );
    if (!maintenance) {
      throw new Error('Maintenance non trouvée');
    }

    const piece = await this.pieceRepository.findById(
      createPiecesUtiliseesDto.pieceId,
    );
    if (!piece) {
      throw new Error('Pièce non trouvée');
    }

    const existingPiecesUtilisees =
      await this.piecesUtiliseesRepository.findByMaintenanceAndPieceId(
        createPiecesUtiliseesDto.maintenanceId,
        createPiecesUtiliseesDto.pieceId,
      );
    if (existingPiecesUtilisees) {
      throw new Error('Cette pièce est déjà utilisée dans cette maintenance');
    }

    const nouvellePiecesUtilisees = new PiecesUtilisees(
      maintenance.id,
      piece.id,
      createPiecesUtiliseesDto.quantiteUtilisee,
    );

    return this.piecesUtiliseesRepository.save(nouvellePiecesUtilisees);
  }

  async findByMaintenanceId(maintenanceId: number): Promise<PiecesUtilisees[]> {
    return this.piecesUtiliseesRepository.findByMaintenanceId(maintenanceId);
  }

  async findByPieceId(pieceId: number): Promise<PiecesUtilisees[]> {
    return this.piecesUtiliseesRepository.findByPieceId(pieceId);
  }

  async findByMaintenanceAndPieceId(
    maintenanceId: number,
    pieceId: number,
  ): Promise<PiecesUtilisees> {
    const piecesUtilisees =
      await this.piecesUtiliseesRepository.findByMaintenanceAndPieceId(
        maintenanceId,
        pieceId,
      );
    if (!piecesUtilisees) {
      throw new Error('Association pièce-maintenance non trouvée');
    }
    return piecesUtilisees;
  }

  async mettreAJourPiecesUtilisees(
    maintenanceId: number,
    pieceId: number,
    updatePiecesUtiliseesDto: UpdatePiecesUtiliseesDto,
  ): Promise<PiecesUtilisees> {
    const piecesUtilisees = await this.findByMaintenanceAndPieceId(
      maintenanceId,
      pieceId,
    );

    if (updatePiecesUtiliseesDto.quantiteUtilisee !== undefined) {
      piecesUtilisees.mettreAJourQuantite(
        updatePiecesUtiliseesDto.quantiteUtilisee,
      );
    }

    return this.piecesUtiliseesRepository.save(piecesUtilisees);
  }

  async supprimerPiecesUtilisees(
    maintenanceId: number,
    pieceId: number,
  ): Promise<void> {
    await this.findByMaintenanceAndPieceId(maintenanceId, pieceId);
    await this.piecesUtiliseesRepository.delete(maintenanceId, pieceId);
  }
}
