// src/incident/incident.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentController } from '../../interface/controllers/incident.controller';
import { CreateIncidentUseCase } from '../../application/uses-cases/create-incident.use-case';
import { Incident } from './entities/incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [IncidentController],
  providers: [CreateIncidentUseCase],
})
export class IncidentModule {}
