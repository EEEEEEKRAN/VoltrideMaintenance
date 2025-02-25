// src/application/use-cases/create-incident.use-case.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from '../../domain/incident/entities/incident.entity';
import { CreateIncidentDTO } from '../../interface/dto/create-incident.dto';

@Injectable()
export class CreateIncidentUseCase {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
  ) {}

  async execute(createIncidentDTO: CreateIncidentDTO): Promise<Incident> {
    const newIncident = this.incidentRepository.create(createIncidentDTO);
    return this.incidentRepository.save(newIncident);
  }
}
