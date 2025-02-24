import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ModeleScooter } from '../../modele-scooter/entities/modele-scooter.entity';

export enum TypeMaintenance {
  REVISION = 'REVISION',
  PREVENTIVE = 'PREVENTIVE',
  REGLEMENTAIRE = 'REGLEMENTAIRE',
}

export enum IntervalleType {
  JOURS = 'JOURS',
  KILOMETRES = 'KILOMETRES',
  CYCLES_CHARGE = 'CYCLES_CHARGE',
}

@Entity()
export class PlanificationMaintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ModeleScooter, { eager: true })
  modeleScooter: ModeleScooter;

  @Column({
    type: 'enum',
    enum: TypeMaintenance,
    default: TypeMaintenance.PREVENTIVE,
  })
  typeMaintenance: TypeMaintenance;

  @Column({
    type: 'enum',
    enum: IntervalleType,
  })
  intervalleType: IntervalleType;

  @Column()
  intervalleValeur: number;

  constructor(
    modeleScooter: ModeleScooter,
    typeMaintenance: TypeMaintenance,
    intervalleType: IntervalleType,
    intervalleValeur: number,
  ) {
    this.modeleScooter = modeleScooter;
    this.typeMaintenance = typeMaintenance;
    this.intervalleType = intervalleType;
    this.intervalleValeur = intervalleValeur;
  }

  public verifierMaintenanceNecessaire(
    derniereMaintenance: Date,
    kilometrageActuel: number,
    cyclesChargeActuels: number,
  ): boolean {
    switch (this.intervalleType) {
      case IntervalleType.JOURS: {
        const joursEcoules = Math.floor(
          (new Date().getTime() - derniereMaintenance.getTime()) /
            (1000 * 60 * 60 * 24),
        );
        return joursEcoules >= this.intervalleValeur;
      }
      case IntervalleType.KILOMETRES:
        return kilometrageActuel >= this.intervalleValeur;
      case IntervalleType.CYCLES_CHARGE:
        return cyclesChargeActuels >= this.intervalleValeur;
      default:
        return false;
    }
  }

  public getDescription(): string {
    return `Maintenance ${this.typeMaintenance} tous les ${this.intervalleValeur} ${this.intervalleType}`;
  }
}
