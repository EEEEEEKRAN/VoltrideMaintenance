// src/domain/entities/reservation.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Utilisateur } from '../../user/entities/user.entity';
import { Scooter } from '../../scooter/entities/scooter.entity';
import { Incident } from '../../incident/entities/incident.entity';


@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.reservations)
  @JoinColumn({ name: 'utilisateur_id' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Scooter, scooter => scooter.reservations)
  @JoinColumn({ name: 'scooter_id' }) 
  scooter: Scooter;

  @Column({ type: 'timestamp' })
  date_debut: Date;

  @Column({ type: 'timestamp' })
  date_fin: Date;

  @Column()
  lieu: string;

  @Column()
  statut: string;

  @OneToMany(() => Incident, incident => incident.reservation)
  incidents: Incident[];
}
