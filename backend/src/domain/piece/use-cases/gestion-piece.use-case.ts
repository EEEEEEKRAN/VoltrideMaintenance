import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Piece } from '../../piece/entities/piece.entities';
import { CreatePieceDto } from '../../piece/dtos/create-piece.dtos';
import { UpdatePieceDto } from '../../piece/dtos/update-piece.dtos';

@Injectable()
export class GestionPieceUseCase {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>,
  ) {}

  async createPiece(createPieceDto: CreatePieceDto): Promise<Piece> {
    const piece = this.pieceRepository.create(createPieceDto);
    return this.pieceRepository.save(piece);
  }

  async getPieceById(id: number): Promise<Piece> {
    const piece = await this.pieceRepository.findOne({ where: { id } });
    if (!piece) {
      throw new NotFoundException(`Piece with ID ${id} not found`);
    }
    return piece;
  }

  async getPieceByName(name: string): Promise<Piece> {
    const piece = await this.pieceRepository.findOne({ where: { name } });
    if (!piece) {
      throw new NotFoundException(`Piece with name ${name} not found`);
    }
    return piece;
  }

  async getAllPieces(): Promise<Piece[]> {
    return this.pieceRepository.find();
  }

  async updatePiece(
    id: number,
    updatePieceDto: UpdatePieceDto,
  ): Promise<Piece> {
    await this.getPieceById(id); // Ensure the piece exists
    await this.pieceRepository.update(id, updatePieceDto);
    return this.getPieceById(id);
  }

  async deletePiece(id: number): Promise<void> {
    const piece = await this.getPieceById(id);
    await this.pieceRepository.remove(piece);
  }
}
