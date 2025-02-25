// src/domain/entities/incident.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Reservation, reservation => reservation.incidents)
  @JoinColumn({ name: 'reservation_id' })
  reservation: Reservation;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  date_signalement: Date;

  @Column()
  gravite: string;
}
