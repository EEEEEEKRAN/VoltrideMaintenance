// src/interface/controllers/reservation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateReservationUseCase } from '../../application/uses-cases/create-reservation.use-case';
import { CreateReservationDTO } from '../dto/create-reservation.dto';
import { Reservation } from '../../domain/entities/reservation.entity';


@Controller('reservations')
export class ReservationController {
  constructor(private readonly createReservationUseCase: CreateReservationUseCase) {}

  @Post()
  async create(@Body() createReservationDTO: CreateReservationDTO): Promise<Reservation> {
    return this.createReservationUseCase.execute(createReservationDTO);
  }
}