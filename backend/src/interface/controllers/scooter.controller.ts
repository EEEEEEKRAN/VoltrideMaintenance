import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateScooterUseCase } from '../../application/uses-cases/create-scooter.use-case';
import { GetScooterUseCase } from '../../application/uses-cases/get-scooter.use-case';
import { UpdateScooterUseCase } from '../../application/uses-cases/update-scooter.use-case';
import { DeleteScooterUseCase } from '../../application/uses-cases/delete-scooter.use-case';
import { CreateScooterDto } from '../dto/create-scooter.dto';
import { UpdateScooterDto } from '../dto/update-scooter.dto';

@Controller('scooters')
export class ScooterController {
  constructor(
    private readonly createScooterUseCase: CreateScooterUseCase,
    private readonly getScooterUseCase: GetScooterUseCase,
    private readonly updateScooterUseCase: UpdateScooterUseCase,
    private readonly deleteScooterUseCase: DeleteScooterUseCase,
  ) {}

  @Post()
  async createScooter(@Body() createScooterDto: CreateScooterDto) {
    return this.createScooterUseCase.execute(createScooterDto);
  }

  @Get()
  async getAllScooters() {
    return this.getScooterUseCase.executeAll();
  }

  @Get(':id')
  async getScooter(@Param('id') id: number) {
    const scooter = await this.getScooterUseCase.execute(id);
    if (!scooter) {
      throw new NotFoundException(
        `Le Scooter avec l'ID ${id} n'a pas été trouvé.`,
      );
    }
    return scooter;
  }

  @Get('serie/:numeroSerie')
  async getScooterByNumeroSerie(@Param('numeroSerie') numeroSerie: string) {
    const scooter =
      await this.getScooterUseCase.executeByNumeroSerie(numeroSerie);
    if (!scooter) {
      throw new NotFoundException(
        `Le Scooter avec le numéro de série ${numeroSerie} n'a pas été trouvé`,
      );
    }
    return scooter;
  }

  @Get('statut/:statut')
  async getScootersByStatut(@Param('statut') statut: string) {
    return this.getScooterUseCase.executeByStatut(statut);
  }

  @Put(':id')
  async updateScooter(
    @Param('id') id: number,
    @Body() updateScooterDto: UpdateScooterDto,
  ) {
    const updatedScooter = await this.updateScooterUseCase.execute(
      id,
      updateScooterDto,
    );
    if (!updatedScooter) {
      throw new NotFoundException(
        `Le Scooter avec l'ID ${id} n'a pas été trouvé.`,
      );
    }
    return updatedScooter;
  }

  @Put(':id/kilometrage')
  async updateKilometrage(
    @Param('id') id: number,
    @Body('kilometrage') kilometrage: number,
  ) {
    return this.updateScooterUseCase.updateKilometrage(id, kilometrage);
  }

  @Put(':id/cycles-charge')
  async updateCyclesCharge(
    @Param('id') id: number,
    @Body('cycles') cycles: number,
  ) {
    return this.updateScooterUseCase.updateCyclesCharge(id, cycles);
  }

  @Put(':id/maintenance')
  async updateDerniereMaintenance(
    @Param('id') id: number,
    @Body('date') date: Date,
  ) {
    return this.updateScooterUseCase.updateDerniereMaintenance(id, date);
  }

  @Delete(':id')
  async deleteScooter(@Param('id') id: number) {
    return this.deleteScooterUseCase.execute(id);
  }
}
