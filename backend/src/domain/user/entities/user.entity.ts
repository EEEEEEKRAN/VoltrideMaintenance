import { Entity, Column, PrimaryGeneratedColumn,  OneToMany } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  numero_permis: string;

  @Column()
  password: string;

  @OneToMany(() => Reservation, reservation => reservation.utilisateur)
  reservations: Reservation[];

  constructor(nom: string, email: string, telephone: string, numero_permis: string, password: string, id?: number) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.telephone = telephone;
    this.numero_permis = numero_permis;
    this.password = password;
  }
}
