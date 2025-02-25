import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { GestionPiecesUtiliseesUseCase } from '../../domain/pieces-utilisees/use-cases/gestion-pieces-utilisees.use-case';
import { CreatePiecesUtiliseesDto } from '../../domain/pieces-utilisees/dtos/create-pieces-utilisees.dto';
import { UpdatePiecesUtiliseesDto } from '../../domain/pieces-utilisees/dtos/update-pieces-utilisees.dto';

@Controller('pieces-utilisees')
export class PiecesUtiliseesController {
  constructor(
    private readonly gestionPiecesUtiliseesUseCase: GestionPiecesUtiliseesUseCase,
  ) {}

  @Post()
  async creerPiecesUtilisees(
    @Body() createPiecesUtiliseesDto: CreatePiecesUtiliseesDto,
  ) {
    try {
      return await this.gestionPiecesUtiliseesUseCase.creerPiecesUtilisees(
        createPiecesUtiliseesDto,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('maintenance/:maintenanceId')
  async findByMaintenanceId(
    @Param('maintenanceId', ParseIntPipe) maintenanceId: number,
  ) {
    try {
      return await this.gestionPiecesUtiliseesUseCase.findByMaintenanceId(
        maintenanceId,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('piece/:pieceId')
  async findByPieceId(@Param('pieceId', ParseIntPipe) pieceId: number) {
    try {
      return await this.gestionPiecesUtiliseesUseCase.findByPieceId(pieceId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('maintenance/:maintenanceId/piece/:pieceId')
  async findByMaintenanceAndPieceId(
    @Param('maintenanceId', ParseIntPipe) maintenanceId: number,
    @Param('pieceId', ParseIntPipe) pieceId: number,
  ) {
    try {
      return await this.gestionPiecesUtiliseesUseCase.findByMaintenanceAndPieceId(
        maintenanceId,
        pieceId,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Put('maintenance/:maintenanceId/piece/:pieceId')
  async mettreAJourPiecesUtilisees(
    @Param('maintenanceId', ParseIntPipe) maintenanceId: number,
    @Param('pieceId', ParseIntPipe) pieceId: number,
    @Body() updatePiecesUtiliseesDto: UpdatePiecesUtiliseesDto,
  ) {
    try {
      return await this.gestionPiecesUtiliseesUseCase.mettreAJourPiecesUtilisees(
        maintenanceId,
        pieceId,
        updatePiecesUtiliseesDto,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('maintenance/:maintenanceId/piece/:pieceId')
  async supprimerPiecesUtilisees(
    @Param('maintenanceId', ParseIntPipe) maintenanceId: number,
    @Param('pieceId', ParseIntPipe) pieceId: number,
  ) {
    try {
      await this.gestionPiecesUtiliseesUseCase.supprimerPiecesUtilisees(
        maintenanceId,
        pieceId,
      );
      return { message: 'Association pièce-maintenance supprimée avec succès' };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
