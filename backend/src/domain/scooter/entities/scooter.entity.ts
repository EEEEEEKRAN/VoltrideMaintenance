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

  @OneToMany('Maintenance', 'scooter')
  maintenances: Maintenance[];

  constructor(numeroSerie: string, modeleScooter: ModeleScooter) {
    this.numeroSerie = numeroSerie;
    this.modeleScooter = modeleScooter;
    this.statut = ScooterStatut.DISPONIBLE;
    this.kilometrageTotal = 0;
    this.cyclesCharge = 0;
    this.dateDerniereMaintenance = new Date();
  }

  public necessiteMaintenance(requirements: IMaintenanceRequirements): boolean {
    const joursDepuisDerniereMaintenance = this.dateDerniereMaintenance
      ? Math.floor(
          (new Date().getTime() - this.dateDerniereMaintenance.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : Infinity;

    return (
      this.kilometrageTotal >= requirements.kilometrageMax ||
      this.cyclesCharge >= requirements.cyclesChargeMax ||
      joursDepuisDerniereMaintenance >=
        requirements.joursDepuisDerniereMaintenance
    );
  }

  public mettreAJourKilometrage(nouveauKilometrage: number): void {
    if (!Number.isInteger(nouveauKilometrage)) {
      throw new Error('Le kilométrage doit être un nombre entier');
    }
    if (nouveauKilometrage < this.kilometrageTotal) {
      throw new Error(
        'Le nouveau kilométrage ne peut pas être inférieur au kilométrage actuel',
      );
    }
    this.kilometrageTotal = nouveauKilometrage;
  }

  public incrementerCyclesCharge(): void {
    if (this.cyclesCharge >= Number.MAX_SAFE_INTEGER) {
      throw new Error('Limite maximale de cycles de charge atteinte');
    }
    this.cyclesCharge++;
  }

  public changerStatut(nouveauStatut: ScooterStatut): void {
    if (this.statut === nouveauStatut) {
      throw new Error('Le scooter est déjà dans ce statut');
    }
    if (
      this.statut === ScooterStatut.HORS_SERVICE &&
      nouveauStatut !== ScooterStatut.EN_MAINTENANCE
    ) {
      throw new Error(
        "Un scooter hors service doit d'abord passer par la maintenance",
      );
    }
    this.statut = nouveauStatut;
  }

  public effectuerMaintenance(): void {
    this.dateDerniereMaintenance = new Date();
    this.statut = ScooterStatut.DISPONIBLE;
  }

  public estDisponible(): boolean {
    return this.statut === ScooterStatut.DISPONIBLE;
  }
}
