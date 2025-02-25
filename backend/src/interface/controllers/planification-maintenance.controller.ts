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
  Query,
} from '@nestjs/common';
import { GestionPlanificationMaintenanceUseCase } from '../../domain/planification-maintenance/use-cases/gestion-planification-maintenance.use-case';
import { CreatePlanificationMaintenanceDto } from '../../domain/planification-maintenance/dtos/create-planification-maintenance.dto';
import { UpdatePlanificationMaintenanceDto } from '../../domain/planification-maintenance/dtos/update-planification-maintenance.dto';
import { TypeMaintenance } from '../../domain/planification-maintenance/entities/planification-maintenance.entity';

@Controller('planification-maintenances')
export class PlanificationMaintenanceController {
  constructor(
    private readonly gestionPlanificationMaintenanceUseCase: GestionPlanificationMaintenanceUseCase,
  ) {}

  @Post()
  async creerPlanification(
    @Body()
    createPlanificationMaintenanceDto: CreatePlanificationMaintenanceDto,
  ) {
    try {
      return await this.gestionPlanificationMaintenanceUseCase.creerPlanification(
        createPlanificationMaintenanceDto,
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
      return await this.gestionPlanificationMaintenanceUseCase.findAll();
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
      return await this.gestionPlanificationMaintenanceUseCase.findById(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('modele/:modeleScooterId')
  async findByModeleScooterId(
    @Param('modeleScooterId', ParseIntPipe) modeleScooterId: number,
  ) {
    try {
      return await this.gestionPlanificationMaintenanceUseCase.findByModeleScooterId(
        modeleScooterId,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('type/:type')
  async findByType(@Param('type') type: TypeMaintenance) {
    try {
      return await this.gestionPlanificationMaintenanceUseCase.findByType(type);
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

  @Get('verification')
  async verifierMaintenanceNecessaire(
    @Query('modeleScooterId', ParseIntPipe) modeleScooterId: number,
    @Query('derniereMaintenance') derniereMaintenance: string,
    @Query('kilometrageActuel', ParseIntPipe) kilometrageActuel: number,
    @Query('cyclesChargeActuels', ParseIntPipe) cyclesChargeActuels: number,
  ) {
    try {
      return await this.gestionPlanificationMaintenanceUseCase.verifierMaintenanceNecessaire(
        modeleScooterId,
        new Date(derniereMaintenance),
        kilometrageActuel,
        cyclesChargeActuels,
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

  @Put(':id')
  async mettreAJourPlanification(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePlanificationMaintenanceDto: UpdatePlanificationMaintenanceDto,
  ) {
    try {
      return await this.gestionPlanificationMaintenanceUseCase.mettreAJourPlanification(
        id,
        updatePlanificationMaintenanceDto,
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
  async supprimerPlanification(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.gestionPlanificationMaintenanceUseCase.supprimerPlanification(
        id,
      );
      return { message: 'Planification supprimée avec succès' };
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
