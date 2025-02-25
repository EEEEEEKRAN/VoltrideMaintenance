// src/reservation/reservation.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from '../../interface/controllers/reservation.controller';
import { CreateReservationUseCase } from '../../application/uses-cases/create-reservation.use-case';
import { Reservation } from './entities/reservation.entity';
import { Utilisateur } from '../domain/entities/user.entity'; 
import { Scooter } from '../domain/entities/scooter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Utilisateur, Scooter])],
  controllers: [ReservationController],
  providers: [CreateReservationUseCase],
})
export class ReservationModule {}
