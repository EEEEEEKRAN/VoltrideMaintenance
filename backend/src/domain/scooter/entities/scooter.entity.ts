import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ModeleScooter } from '../../../domain/modele-scooter/entities/modele-scooter.entity';
import { Maintenance } from '../../maintenance/entities/maintenance.entity';

export enum ScooterStatut {
  DISPONIBLE = 'DISPONIBLE',
  EN_MAINTENANCE = 'EN_MAINTENANCE',
  RESERVE = 'RESERVE',
  HORS_SERVICE = 'HORS_SERVICE',
}

export enum GarantieType {
  STANDARD = 'STANDARD',
  ETENDUE = 'ETENDUE',
  PREMIUM = 'PREMIUM',
}

interface IMaintenanceRequirements {
  kilometrageMax: number;
  cyclesChargeMax: number;
  joursDepuisDerniereMaintenance: number;
}

@Entity()
export class Scooter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ModeleScooter, { eager: true })
  modeleScooter: ModeleScooter;

  @Column({ unique: true })
  numeroSerie: string;

  @Column({
    type: 'enum',
    enum: ScooterStatut,
    default: ScooterStatut.DISPONIBLE,
  })
  statut: ScooterStatut;

  @Column({ type: 'date', nullable: true })
  dateDerniereMaintenance: Date;

  @Column({ default: 0 })
  kilometrageTotal: number;

  @Column({ default: 0 })
  cyclesCharge: number;

  @Column({ type: 'date' })
  garantieDebut: Date;

  @Column({ type: 'date' })
  garantieFin: Date;

  @Column({
    type: 'enum',
    enum: GarantieType,
    default: GarantieType.STANDARD,
  })
  garantieType: GarantieType;

  @OneToMany('Maintenance', 'scooter')
  maintenances: Maintenance[];

  constructor(numeroSerie: string, modeleScooter: ModeleScooter) {
    this.numeroSerie = numeroSerie;
    this.modeleScooter = modeleScooter;
    this.statut = ScooterStatut.DISPONIBLE;
    this.kilometrageTotal = 0;
    this.cyclesCharge = 0;
    this.garantieDebut = new Date();
    this.garantieFin = new Date();
    this.garantieFin.setFullYear(this.garantieFin.getFullYear() + 2); // Garantie standard de 2 ans
    this.garantieType = GarantieType.STANDARD;
  }

  public estSousGarantie(): boolean {
    const now = new Date();
    return now >= this.garantieDebut && now <= this.garantieFin;
  }

  public prolongerGarantie(nombreMois: number): void {
    if (nombreMois <= 0) {
      throw new Error('Le nombre de mois doit être positif');
    }
    const dateFin = new Date(this.garantieFin);
    dateFin.setMonth(dateFin.getMonth() + nombreMois);
    this.garantieFin = dateFin;
  }

  public changerTypeGarantie(nouveauType: GarantieType): void {
    this.garantieType = nouveauType;
  }

  public necessiteMaintenance(requirements: IMaintenanceRequirements): boolean {
    if (!this.dateDerniereMaintenance) {
      return true;
    }

    const joursDepuisDerniereMaintenance = Math.floor(
      (new Date().getTime() - this.dateDerniereMaintenance.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return (
      this.kilometrageTotal >= requirements.kilometrageMax ||
      this.cyclesCharge >= requirements.cyclesChargeMax ||
      joursDepuisDerniereMaintenance >=
        requirements.joursDepuisDerniereMaintenance
    );
  }

  public mettreAJourKilometrage(nouveauKilometrage: number): void {
    if (nouveauKilometrage < this.kilometrageTotal) {
      throw new Error(
        'Le nouveau kilométrage ne peut pas être inférieur au kilométrage actuel',
      );
    }
    this.kilometrageTotal = nouveauKilometrage;
  }

  public incrementerCyclesCharge(): void {
    this.cyclesCharge += 1;
  }

  public changerStatut(nouveauStatut: ScooterStatut): void {
    if (this.statut === nouveauStatut) {
      throw new Error('Le scooter est déjà dans ce statut');
    }

    if (
      nouveauStatut === ScooterStatut.DISPONIBLE &&
      this.necessiteMaintenance({
        kilometrageMax: 5000,
        cyclesChargeMax: 300,
        joursDepuisDerniereMaintenance: 90,
      })
    ) {
      throw new Error(
        'Le scooter nécessite une maintenance avant de pouvoir être disponible',
      );
    }

    this.statut = nouveauStatut;
  }

  public effectuerMaintenance(): void {
    this.dateDerniereMaintenance = new Date();
  }

  public estDisponible(): boolean {
    return this.statut === ScooterStatut.DISPONIBLE;
  }
}
