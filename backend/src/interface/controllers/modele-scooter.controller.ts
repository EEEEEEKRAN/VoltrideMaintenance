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
import { GestionModeleScooterUseCase } from '../../domain/modele-scooter/use-cases/gestion-modele-scooter.use-case';
import { CreateModeleScooterDto } from '../../domain/modele-scooter/dtos/create-modele-scooter.dto';
import { UpdateModeleScooterDto } from '../../domain/modele-scooter/dtos/update-modele-scooter.dto';
import { ModeleScooter } from '../../domain/modele-scooter/entities/modele-scooter.entity';

@Controller('modele-scooters')
export class ModeleScooterController {
  constructor(
    private readonly gestionModeleScooterUseCase: GestionModeleScooterUseCase,
  ) {}

  @Post()
  async creerModeleScooter(
    @Body() createModeleScooterDto: CreateModeleScooterDto,
  ): Promise<ModeleScooter> {
    try {
      return await this.gestionModeleScooterUseCase.creerModeleScooter(
        createModeleScooterDto,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllModelesScooter(): Promise<ModeleScooter[]> {
    try {
      return await this.gestionModeleScooterUseCase.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getModeleScooterById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ModeleScooter> {
    try {
      return await this.gestionModeleScooterUseCase.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateModeleScooter(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModeleScooterDto: UpdateModeleScooterDto,
  ): Promise<ModeleScooter> {
    try {
      return await this.gestionModeleScooterUseCase.mettreAJourModeleScooter(
        id,
        updateModeleScooterDto,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async supprimerModeleScooter(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      await this.gestionModeleScooterUseCase.supprimerModeleScooter(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Une erreur est survenue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
