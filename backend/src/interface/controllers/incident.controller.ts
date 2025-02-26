import { Controller, Post, Body } from '@nestjs/common';
import { CreateIncidentUseCase } from '../../domain/incident/use-cases/create-incident.use-case';
import { CreateIncidentDTO } from '../../domain/incident/dtos/create-incident.dto';
import { Incident } from '../../domain/incident/entities/incident.entity';

@Controller('incidents')
export class IncidentController {
  constructor(
    private readonly createIncidentUseCase: CreateIncidentUseCase,
  ) {}

  @Post()
  async create(@Body() createIncidentDTO: CreateIncidentDTO): Promise<Incident> {
    return this.createIncidentUseCase.execute(createIncidentDTO);
  }
}
