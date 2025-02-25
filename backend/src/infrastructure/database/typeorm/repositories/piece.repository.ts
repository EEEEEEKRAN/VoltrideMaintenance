import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piece } from '../../../../domain/piece/entities/piece.entities';
import { IPieceRepository } from '../../../../domain/piece/repositories/piece.repository.interface';

@Injectable()
export class PieceRepository implements IPieceRepository {
  constructor(
    @InjectRepository(Piece)
    private readonly repository: Repository<Piece>,
  ) {}

  async findById(id: number): Promise<Piece | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Piece | null> {
    return this.repository.findOne({ where: { name } });
  }

  async findAll(): Promise<Piece[]> {
    return this.repository.find();
  }

  async save(piece: Piece): Promise<Piece> {
    return this.repository.save(piece);
  }

  async update(id: number, piece: Partial<Piece>): Promise<Piece> {
    await this.repository.update(id, piece);
    const updatedPiece = await this.findById(id);
    if (!updatedPiece) {
      throw new Error(`Piece with id ${id} not found`);
    }
    return updatedPiece;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
