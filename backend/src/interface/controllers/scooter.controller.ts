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
import { GestionScooterUseCase } from '../../domain/scooter/use-cases/gestion-scooter.use-case';
import { CreateScooterDto } from '../../domain/scooter/dtos/create-scooter.dto';
import { UpdateScooterDto } from '../../domain/scooter/dtos/update-scooter.dto';
import {
  Scooter,
  ScooterStatut,
} from '../../domain/scooter/entities/scooter.entity';

@Controller('scooters')
export class ScooterController {
  constructor(private readonly gestionScooterUseCase: GestionScooterUseCase) {}

  @Post()
  async creerScooter(
    @Body() createScooterDto: CreateScooterDto,
  ): Promise<Scooter> {
    try {
      return await this.gestionScooterUseCase.creerScooter(
        createScooterDto.numeroSerie,
        createScooterDto.modeleScooterId,
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
  async getAllScooters(): Promise<Scooter[]> {
    try {
      return await this.gestionScooterUseCase.findAll();
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

  @Get('disponibles')
  async getScootersDisponibles(): Promise<Scooter[]> {
    try {
      return await this.gestionScooterUseCase.findDisponibles();
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

  @Get('maintenance-necessaire')
  async getScootersNecessitantMaintenance(): Promise<Scooter[]> {
    try {
      return await this.gestionScooterUseCase.verifierMaintenanceNecessaire();
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

  @Put(':id/kilometrage')
  async updateKilometrage(
    @Param('id', ParseIntPipe) id: number,
    @Body('kilometrage', ParseIntPipe) kilometrage: number,
  ): Promise<Scooter> {
    try {
      return await this.gestionScooterUseCase.mettreAJourKilometrage(
        id,
        kilometrage,
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

  @Put(':id/statut')
  async updateStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body('statut') statut: ScooterStatut,
  ): Promise<Scooter> {
    try {
      return await this.gestionScooterUseCase.changerStatut(id, statut);
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

  @Put(':id/cycles-charge')
  async incrementerCyclesCharge(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Scooter> {
    try {
      return await this.gestionScooterUseCase.incrementerCyclesCharge(id);
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
  async updateScooter(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateScooterDto: UpdateScooterDto,
  ): Promise<Scooter> {
    try {
      return await this.gestionScooterUseCase.mettreAJourScooter(
        id,
        updateScooterDto,
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
  async supprimerScooter(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.gestionScooterUseCase.supprimerScooter(id);
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
