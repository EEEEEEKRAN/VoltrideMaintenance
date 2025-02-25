import { Controller, Post, Body } from '@nestjs/common';
import { CreateIncidentUseCase } from '../../application/uses-cases/create-incident.use-case';
import { CreateIncidentDTO } from '../dto/create-incident.dto';
import { Incident } from '../../domain/incident/entities/incident.entity';

@Controller('incidents')
export class IncidentController {
  constructor(private readonly createIncidentUseCase: CreateIncidentUseCase) {}

  @Post()
  async create(
    @Body() createIncidentDTO: CreateIncidentDTO,
  ): Promise<Incident> {
    return this.createIncidentUseCase.execute(createIncidentDTO);
  }
}
