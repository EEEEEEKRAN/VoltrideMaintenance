import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Utilisateur } from './domain/entities/user.entity'; 
import { ScooterModule } from './scooter/scooter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'voltride',
      password: 'voltride',
      database: 'voltride',
      entities: [Utilisateur],
      synchronize: false, 
    }),
    UsersModule,
    ScooterModule,
  ],
})
export class AppModule {}
