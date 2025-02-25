import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Utilisateur } from './domain/user/entities/user.entity';
import { Scooter } from './domain/scooter/entities/scooter.entity';
import { ModeleScooter } from './domain/modele-scooter/entities/modele-scooter.entity';
import { Maintenance } from './domain/maintenance/entities/maintenance.entity';
import { Technicien } from './domain/technicien/entities/technicien.entity';
import { PlanificationMaintenance } from './domain/planification-maintenance/entities/planification-maintenance.entity';
import { Piece } from './domain/piece/entities/piece.entities';
import { PiecesUtilisees } from './domain/pieces-utilisees/entities/pieces-utilisees.entity';
import { Reservation } from './domain/reservation/entities/reservation.entity';
import { Incident } from './domain/incident/entities/incident.entity';
import { Fournisseur } from './domain/fournisseur/entities/fournisseur.entities';
import { ScooterModule } from './domain/scooter/scooter.module';
import { ModeleScooterModule } from './domain/modele-scooter/modele-scooter.module';
import { MaintenanceModule } from './domain/maintenance/maintenance.module';
import { TechnicienModule } from './domain/technicien/technicien.module';
import { PlanificationMaintenanceModule } from './domain/planification-maintenance/planification-maintenance.module';
import { PieceModule } from './domain/piece/piece.module';
import { PiecesUtiliseesModule } from './domain/pieces-utilisees/pieces-utilisees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'voltride',
      password: 'voltride',
      database: 'voltride',
      entities: [
        Utilisateur,
        Scooter,
        ModeleScooter,
        Maintenance,
        Technicien,
        PlanificationMaintenance,
        Piece,
        PiecesUtilisees,
        Reservation,
        Incident,
        Fournisseur,
      ],
      synchronize: false,
    }),
    UsersModule,
    ModeleScooterModule,
    ScooterModule,
    MaintenanceModule,
    TechnicienModule,
    PlanificationMaintenanceModule,
    PieceModule,
    PiecesUtiliseesModule,
  ],
})
export class AppModule {}
