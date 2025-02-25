import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { GestionPieceUseCase } from '../../domain/piece/use-cases/gestion-piece.use-case';
import { CreatePieceDto } from '../../domain/piece/dtos/create-piece.dtos';
import { UpdatePieceDto } from '../../domain/piece/dtos/update-piece.dtos';
import { Piece } from '../../domain/piece/entities/piece.entities';

@Controller('pieces')
export class PieceController {
  constructor(private readonly gestionPieceUseCase: GestionPieceUseCase) {}

  @Post()
  async createPiece(@Body() createPieceDto: CreatePieceDto): Promise<Piece> {
    return this.gestionPieceUseCase.createPiece(createPieceDto);
  }

  @Get(':id')
  async getPieceById(@Param('id') id: number): Promise<Piece> {
    const piece = await this.gestionPieceUseCase.getPieceById(id);
    if (!piece) {
      throw new NotFoundException(`Piece with ID ${id} not found`);
    }
    return piece;
  }

  @Get()
  async getAllPieces(): Promise<Piece[]> {
    return this.gestionPieceUseCase.getAllPieces();
  }

  @Put(':id')
  async updatePiece(
    @Param('id') id: number,
    @Body() updatePieceDto: UpdatePieceDto,
  ): Promise<Piece> {
    return this.gestionPieceUseCase.updatePiece(id, updatePieceDto);
  }

  @Delete(':id')
  async deletePiece(@Param('id') id: number): Promise<void> {
    return this.gestionPieceUseCase.deletePiece(id);
  }
}
