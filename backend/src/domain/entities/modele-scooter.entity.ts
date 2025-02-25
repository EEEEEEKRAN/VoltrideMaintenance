// src/domain/entities/modele-scooter.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Scooter } from './scooter.entity';

@Entity()
export class ModeleScooter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column('text')
  description: string;

  @OneToMany(() => Scooter, scooter => scooter.modele)
  scooters: Scooter[];
}
