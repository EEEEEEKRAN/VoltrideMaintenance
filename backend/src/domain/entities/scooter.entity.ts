// src/domain/entities/scooter.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ModeleScooter } from './modele-scooter.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ModeleScooter, modele => modele.scooters)
  modele: ModeleScooter;

  @Column()
  numero_serie: string;

  @Column()
  statut: string;

  @Column({ type: 'date' })
  date_derniere_maintenance: Date;

  @Column()
  kilometrage_total: number;

  @Column()
  cycles_charge: number;

  @OneToMany(() => Reservation, reservation => reservation.scooter)
  reservations: Reservation[];
}
