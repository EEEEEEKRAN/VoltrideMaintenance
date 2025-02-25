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
import { GestionTechnicienUseCase } from '../../domain/technicien/use-cases/gestion-technicien.use-case';
import { CreateTechnicienDto } from '../../domain/technicien/dtos/create-technicien.dto';
import { UpdateTechnicienDto } from '../../domain/technicien/dtos/update-technicien.dto';
import { TechnicienStatut } from '../../domain/technicien/entities/technicien.entity';

@Controller('techniciens')
export class TechnicienController {
  constructor(
    private readonly gestionTechnicienUseCase: GestionTechnicienUseCase,
  ) {}

  @Post()
  async creerTechnicien(@Body() createTechnicienDto: CreateTechnicienDto) {
    try {
      return await this.gestionTechnicienUseCase.creerTechnicien(
        createTechnicienDto,
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

  @Get()
  async findAll() {
    try {
      return await this.gestionTechnicienUseCase.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.gestionTechnicienUseCase.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('statut/:statut')
  async findByStatut(@Param('statut') statut: TechnicienStatut) {
    try {
      return await this.gestionTechnicienUseCase.findByStatut(statut);
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

  @Get('disponibles')
  async findDisponibles() {
    try {
      return await this.gestionTechnicienUseCase.findDisponibles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/statut')
  async changerStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body('statut') statut: TechnicienStatut,
  ) {
    try {
      return await this.gestionTechnicienUseCase.changerStatut(id, statut);
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

  @Put(':id')
  async mettreAJourTechnicien(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTechnicienDto: UpdateTechnicienDto,
  ) {
    try {
      return await this.gestionTechnicienUseCase.mettreAJourTechnicien(
        id,
        updateTechnicienDto,
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

  @Delete(':id')
  async supprimerTechnicien(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.gestionTechnicienUseCase.supprimerTechnicien(id);
      return { message: 'Technicien supprimé avec succès' };
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
