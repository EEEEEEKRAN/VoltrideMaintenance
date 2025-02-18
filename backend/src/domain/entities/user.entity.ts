import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  constructor(nom: string, email: string, telephone: string, numero_permis: string, password: string, id?: number) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.telephone = telephone;
    this.numero_permis = numero_permis;
    this.password = password;
  }
}
