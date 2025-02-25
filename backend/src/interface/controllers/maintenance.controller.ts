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
} from '@nestjs/common';
import { GestionMaintenanceUseCase } from '../../domain/maintenance/use-cases/gestion-maintenance.use-case';
import { CreateMaintenanceDto } from '../../domain/maintenance/dtos/create-maintenance.dto';
import { UpdateMaintenanceDto } from '../../domain/maintenance/dtos/update-maintenance.dto';
import { MaintenanceType } from '../../domain/maintenance/entities/maintenance.entity';

@Controller('maintenances')
export class MaintenanceController {
  constructor(
    private readonly gestionMaintenanceUseCase: GestionMaintenanceUseCase,
  ) {}

  @Post()
  async creerMaintenance(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    try {
      return await this.gestionMaintenanceUseCase.creerMaintenance(
        createMaintenanceDto,
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
      return await this.gestionMaintenanceUseCase.findAll();
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
  async findById(@Param('id') id: string) {
    try {
      return await this.gestionMaintenanceUseCase.findById(Number(id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('scooter/:scooterId')
  async findByScooterId(@Param('scooterId') scooterId: string) {
    try {
      return await this.gestionMaintenanceUseCase.findByScooterId(
        Number(scooterId),
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Une erreur est survenue', HttpStatus.NOT_FOUND);
    }
  }

  @Get('type/:type')
  async findByType(@Param('type') type: MaintenanceType) {
    try {
      return await this.gestionMaintenanceUseCase.findByType(type);
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

  @Get('status/en-cours')
  async findEnCours() {
    try {
      return await this.gestionMaintenanceUseCase.findEnCours();
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

  @Get('status/terminees')
  async findTerminees() {
    try {
      return await this.gestionMaintenanceUseCase.findTerminees();
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

  @Put(':id/terminer')
  async terminerMaintenance(@Param('id') id: string) {
    try {
      return await this.gestionMaintenanceUseCase.terminerMaintenance(
        Number(id),
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
  async mettreAJourMaintenance(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    try {
      return await this.gestionMaintenanceUseCase.mettreAJourMaintenance(
        Number(id),
        updateMaintenanceDto,
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
  async supprimerMaintenance(@Param('id') id: string) {
    try {
      await this.gestionMaintenanceUseCase.supprimerMaintenance(Number(id));
      return { message: 'Maintenance supprimée avec succès' };
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
