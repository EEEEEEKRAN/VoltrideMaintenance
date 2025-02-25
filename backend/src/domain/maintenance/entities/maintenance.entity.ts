import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Scooter } from '../../scooter/entities/scooter.entity';

export enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE',
  CORRECTIVE = 'CORRECTIVE',
  REVISION = 'REVISION',
}

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Scooter,
    (scooter: Scooter) => scooter.maintenances as Maintenance[],
    { eager: true },
  )
  scooter: Scooter;

  @Column({ type: 'date' })
  dateDebut: Date;

  @Column({ type: 'date', nullable: true })
  dateFin: Date;

  @Column({
    type: 'enum',
    enum: MaintenanceType,
    default: MaintenanceType.PREVENTIVE,
  })
  type: MaintenanceType;

  @Column('decimal', { precision: 10, scale: 2 })
  coutMainOeuvre: number;

  @Column('text', { nullable: true })
  notesTechniques: string | null;

  @Column({ default: false })
  sousGarantie: boolean;

  @Column('text', { nullable: true })
  conditionsGarantie: string | null;

  constructor(
    scooter: Scooter,
    type: MaintenanceType,
    coutMainOeuvre: number,
    notesTechniques?: string,
  ) {
    this.scooter = scooter;
    this.type = type;
    this.coutMainOeuvre = coutMainOeuvre;
    this.notesTechniques = notesTechniques || null;
    this.dateDebut = new Date();
    this.sousGarantie = scooter && scooter.estSousGarantie ? scooter.estSousGarantie() : false;
    this.conditionsGarantie = this.sousGarantie && scooter && scooter.garantieType && scooter.garantieFin
      ? `Intervention sous garantie ${scooter.garantieType} valable jusqu'au ${scooter.garantieFin.toLocaleDateString()}`
      : null;
  }

  public terminerMaintenance(): void {
    if (this.dateFin) {
      throw new Error('Cette maintenance est déjà terminée');
    }
    this.dateFin = new Date();
    this.scooter.effectuerMaintenance();
  }

  public estTerminee(): boolean {
    return !!this.dateFin;
  }

  public ajouterNotesTechniques(notes: string): void {
    if (this.estTerminee()) {
      throw new Error('Impossible de modifier une maintenance terminée');
    }
    this.notesTechniques = notes;
  }

  public mettreAJourCout(nouveauCout: number): void {
    if (this.estTerminee()) {
      throw new Error('Impossible de modifier une maintenance terminée');
    }
    if (nouveauCout < 0) {
      throw new Error('Le coût ne peut pas être négatif');
    }
    this.coutMainOeuvre = nouveauCout;
  }

  public mettreAJourGarantie(sousGarantie: boolean, conditions?: string): void {
    if (this.estTerminee()) {
      throw new Error('Impossible de modifier une maintenance terminée');
    }
    this.sousGarantie = sousGarantie;
    this.conditionsGarantie = conditions || null;
  }
}
