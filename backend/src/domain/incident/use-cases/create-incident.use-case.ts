import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from '../../incident/entities/incident.entity';
import { CreateIncidentDTO } from '../../incident/dtos/create-incident.dto';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Injectable()
export class CreateIncidentUseCase {
  constructor(
    @InjectRepository(Incident)
    private incidentRepository: Repository<Incident>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async execute(createIncidentDTO: CreateIncidentDTO): Promise<Incident> {
    const { reservationId } = createIncidentDTO;

    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new BadRequestException('Reservation not found');
    }

    const incident = this.incidentRepository.create({
      ...createIncidentDTO,
      reservation,
    });

    return this.incidentRepository.save(incident);
  }
}
