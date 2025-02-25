// src/interface/controllers/reservation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateReservationUseCase } from '../../domain/reservation/use-cases/create-reservation.use-case';
import { CreateReservationDTO } from '../../domain/user/dtos/create-reservation.dto';
import { Reservation } from '../../domain/reservation/entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly createReservationUseCase: CreateReservationUseCase,
  ) {}

  @Post()
  async create(
    @Body() createReservationDTO: CreateReservationDTO,
  ): Promise<Reservation> {
    return this.createReservationUseCase.execute(createReservationDTO);
  }
  
}
