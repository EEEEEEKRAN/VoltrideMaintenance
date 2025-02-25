import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Maintenance } from '../../maintenance/entities/maintenance.entity';
import { Piece } from '../../piece/entities/piece.entities';

@Entity()
export class PiecesUtilisees {
  @ManyToOne(() => Maintenance)
  @JoinColumn({ name: 'maintenance_id' })
  maintenance: Maintenance;

  @Column({ name: 'maintenance_id', primary: true })
  maintenanceId: number;

  @ManyToOne(() => Piece)
  @JoinColumn({ name: 'piece_id' })
  piece: Piece;

  @Column({ name: 'piece_id', primary: true })
  pieceId: number;

  @Column({ name: 'quantite_utilisee' })
  quantiteUtilisee: number;

  constructor(
    maintenanceId: number,
    pieceId: number,
    quantiteUtilisee: number,
  ) {
    this.maintenanceId = maintenanceId;
    this.pieceId = pieceId;
    this.quantiteUtilisee = quantiteUtilisee;
  }

  public mettreAJourQuantite(nouvelleQuantite: number): void {
    if (nouvelleQuantite < 1) {
      throw new Error('La quantité utilisée doit être supérieure à 0');
    }
    this.quantiteUtilisee = nouvelleQuantite;
  }

  public ajouterQuantite(quantiteSupplementaire: number): void {
    if (quantiteSupplementaire < 0) {
      throw new Error('La quantité à ajouter ne peut pas être négative');
    }
    this.quantiteUtilisee += quantiteSupplementaire;
  }

  public retirerQuantite(quantiteARetirer: number): void {
    if (quantiteARetirer < 0) {
      throw new Error('La quantité à retirer ne peut pas être négative');
    }
    if (quantiteARetirer > this.quantiteUtilisee) {
      throw new Error(
        'La quantité à retirer ne peut pas être supérieure à la quantité utilisée',
      );
    }
    this.quantiteUtilisee -= quantiteARetirer;
  }
}
