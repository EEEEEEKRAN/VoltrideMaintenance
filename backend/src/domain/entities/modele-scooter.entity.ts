import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Scooter } from './scooter.entity';

@Entity()
export class ModeleScooter {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nom: string;

  @Column()
  fabricant: string;

  @Column()
  annee_sortie: number;

  @Column()
  autonomie_max: number;

  @Column()
  vitesse_max: number;

  @OneToMany(() => Scooter, (scooter) => scooter.modele)
  scooters: Scooter[];

  constructor(
    nom: string,
    fabricant: string,
    annee_sortie: number,
    autonomie_max: number,
    vitesse_max: number,
    id?: number,
  ) {
    this.nom = nom;
    this.fabricant = fabricant;
    this.annee_sortie = annee_sortie;
    this.autonomie_max = autonomie_max;
    this.vitesse_max = vitesse_max;
    if (id) this.id = id;
  }
}
