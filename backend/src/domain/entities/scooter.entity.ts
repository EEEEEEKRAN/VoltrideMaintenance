import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ModeleScooter } from './modele-scooter.entity';

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => ModeleScooter, (modele) => modele.scooters)
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

  constructor(
    modele: ModeleScooter,
    numero_serie: string,
    statut: string,
    date_derniere_maintenance: Date,
    kilometrage_total: number,
    cycles_charge: number,
    id?: number,
  ) {
    this.modele = modele;
    this.numero_serie = numero_serie;
    this.statut = statut;
    this.date_derniere_maintenance = date_derniere_maintenance;
    this.kilometrage_total = kilometrage_total;
    this.cycles_charge = cycles_charge;
    if (id) this.id = id;
  }
}
