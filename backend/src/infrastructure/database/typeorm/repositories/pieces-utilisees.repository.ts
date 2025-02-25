import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PiecesUtilisees } from '../../../../domain/pieces-utilisees/entities/pieces-utilisees.entity';
import { IPiecesUtiliseesRepository } from '../../../../domain/pieces-utilisees/repositories/pieces-utilisees.repository.interface';

@Injectable()
export class PiecesUtiliseesRepository implements IPiecesUtiliseesRepository {
  constructor(
    @InjectRepository(PiecesUtilisees)
    private readonly repository: Repository<PiecesUtilisees>,
  ) {}

  async findByMaintenanceId(maintenanceId: number): Promise<PiecesUtilisees[]> {
    return this.repository.find({
      where: { maintenanceId },
      relations: ['maintenance', 'piece'],
    });
  }

  async findByPieceId(pieceId: number): Promise<PiecesUtilisees[]> {
    return this.repository.find({
      where: { pieceId },
      relations: ['maintenance', 'piece'],
    });
  }

  async findByMaintenanceAndPieceId(
    maintenanceId: number,
    pieceId: number,
  ): Promise<PiecesUtilisees | null> {
    return this.repository.findOne({
      where: { maintenanceId, pieceId },
      relations: ['maintenance', 'piece'],
    });
  }

  async save(piecesUtilisees: PiecesUtilisees): Promise<PiecesUtilisees> {
    return this.repository.save(piecesUtilisees);
  }

  async update(
    maintenanceId: number,
    pieceId: number,
    piecesUtilisees: Partial<PiecesUtilisees>,
  ): Promise<PiecesUtilisees> {
    await this.repository.update({ maintenanceId, pieceId }, piecesUtilisees);

    const updatedPiecesUtilisees = await this.findByMaintenanceAndPieceId(
      maintenanceId,
      pieceId,
    );
    if (!updatedPiecesUtilisees) {
      throw new Error('PiecesUtilisees non trouvées après la mise à jour');
    }

    return updatedPiecesUtilisees;
  }

  async delete(maintenanceId: number, pieceId: number): Promise<void> {
    await this.repository.delete({ maintenanceId, pieceId });
  }
}
