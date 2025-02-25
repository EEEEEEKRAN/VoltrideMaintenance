import { PiecesUtilisees } from '../entities/pieces-utilisees.entity';

export interface IPiecesUtiliseesRepository {
  findByMaintenanceId(maintenanceId: number): Promise<PiecesUtilisees[]>;
  findByPieceId(pieceId: number): Promise<PiecesUtilisees[]>;
  findByMaintenanceAndPieceId(
    maintenanceId: number,
    pieceId: number,
  ): Promise<PiecesUtilisees | null>;
  save(piecesUtilisees: PiecesUtilisees): Promise<PiecesUtilisees>;
  update(
    maintenanceId: number,
    pieceId: number,
    piecesUtilisees: Partial<PiecesUtilisees>,
  ): Promise<PiecesUtilisees>;
  delete(maintenanceId: number, pieceId: number): Promise<void>;
}
