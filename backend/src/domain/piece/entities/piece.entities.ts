import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Fournisseur } from '../../fournisseur/entities/fournisseur.entities';

@Entity()
export class Piece {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  quantity: number;

  @Column()
  thresold: number;

  @ManyToOne(() => Fournisseur, (fournisseur) => fournisseur.pieces)
  fournisseur: Fournisseur;
}
