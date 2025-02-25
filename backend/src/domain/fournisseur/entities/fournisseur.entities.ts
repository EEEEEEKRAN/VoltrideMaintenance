import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Piece } from '../../piece/entities/piece.entities';

@Entity()
export class Fournisseur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  contact_email: string;

  @Column()
  telephone: string;

  @Column('text')
  adresse: string;

  @OneToMany(() => Piece, (piece) => piece.fournisseur)
  pieces: Piece[];
}
