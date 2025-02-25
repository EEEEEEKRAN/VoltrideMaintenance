import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReservationModule } from './reservation/reservation.module';
import { IncidentModule } from './incident/incident.module';
import { Utilisateur } from './domain/entities/user.entity';
import { Reservation } from './domain/entities/reservation.entity';
import { Incident } from './domain/entities/incident.entity';
import { Scooter } from './domain/entities/scooter.entity';
import { ModeleScooter } from './domain/entities/modele-scooter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'voltride',
      password: 'voltride',
      database: 'voltride',
      entities: [Utilisateur, Reservation, Incident, Scooter, ModeleScooter],
      synchronize: false, 
    }),
    UsersModule,
    ReservationModule,
    IncidentModule,
  ],
})
export class AppModule {}
