import { Piece } from '../../piece/entities/piece.entities';

export interface IPieceRepository {
  findById(id: number): Promise<Piece | null>;
  findByName(name: string): Promise<Piece | null>;
  findAll(): Promise<Piece[]>;
  save(piece: Piece): Promise<Piece>;
  update(id: number, piece: Partial<Piece>): Promise<Piece>;
  delete(id: number): Promise<void>;
}
