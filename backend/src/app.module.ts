import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Utilisateur } from './domain/entities/user.entity';
import { Scooter } from './domain/scooter/entities/scooter.entity';
import { ModeleScooter } from './domain/modele-scooter/entities/modele-scooter.entity';
import { Maintenance } from './domain/maintenance/entities/maintenance.entity';
import { ScooterModule } from './infrastructure/modules/scooter.module';
import { ModeleScooterModule } from './domain/modele-scooter/modele-scooter.module';
import { MaintenanceModule } from './infrastructure/modules/maintenance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'voltride',
      password: 'voltride',
      database: 'voltride',
      entities: [Utilisateur, Scooter, ModeleScooter, Maintenance],
      synchronize: false,
    }),
    UsersModule,
    ModeleScooterModule,
    ScooterModule,
    MaintenanceModule,
  ],
})
export class AppModule {}
