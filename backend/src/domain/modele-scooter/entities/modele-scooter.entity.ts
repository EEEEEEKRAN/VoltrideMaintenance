import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Scooter } from '../../scooter/entities/scooter.entity';

@Entity()
export class ModeleScooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nom: string;

  @Column('text')
  description: string;

  @OneToMany(() => Scooter, (scooter) => scooter.modeleScooter)
  scooters: Scooter[];

  constructor(nom: string, description: string) {
    this.nom = nom;
    this.description = description;
  }

  public mettreAJourInformations(nom: string, description: string): void {
    if (!nom || nom.trim().length === 0) {
      throw new Error('Le nom du modèle ne peut pas être vide');
    }
    this.nom = nom;
    this.description = description;
  }

  public estUtiliseParScooters(): boolean {
    return this.scooters && this.scooters.length > 0;
  }
}
