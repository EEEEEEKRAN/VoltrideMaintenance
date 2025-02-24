import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Maintenance } from '../../maintenance/entities/maintenance.entity';

export enum TechnicienStatut {
  DISPONIBLE = 'DISPONIBLE',
  EN_INTERVENTION = 'EN_INTERVENTION',
  INDISPONIBLE = 'INDISPONIBLE',
}

@Entity()
export class Technicien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;

  @Column({
    type: 'enum',
    enum: TechnicienStatut,
    default: TechnicienStatut.DISPONIBLE,
  })
  statut: TechnicienStatut;

  @OneToMany('Maintenance', 'technicien')
  maintenances: Maintenance[];

  constructor(nom: string, email: string, telephone: string) {
    this.nom = nom;
    this.email = email;
    this.telephone = telephone;
    this.statut = TechnicienStatut.DISPONIBLE;
  }

  public changerStatut(nouveauStatut: TechnicienStatut): void {
    if (this.statut === nouveauStatut) {
      throw new Error('Le technicien est déjà dans ce statut');
    }
    this.statut = nouveauStatut;
  }

  public estDisponible(): boolean {
    return this.statut === TechnicienStatut.DISPONIBLE;
  }

  public mettreAJourContact(email?: string, telephone?: string): void {
    if (email) {
      if (!email.includes('@')) {
        throw new Error('Format email invalide');
      }
      this.email = email;
    }
    if (telephone) {
      if (!/^\+?[\d\s-]{10,}$/.test(telephone)) {
        throw new Error('Format téléphone invalide');
      }
      this.telephone = telephone;
    }
  }
}
