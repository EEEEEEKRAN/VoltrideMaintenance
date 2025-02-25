import { Fournisseur } from '../../fournisseur/entities/fournisseur.entities';

export interface IFournisseurRepository {
  findById(id: number): Promise<Fournisseur | null>;
  findByNom(nom: string): Promise<Fournisseur | null>;
  findAll(): Promise<Fournisseur[]>;
  save(fournisseur: Fournisseur): Promise<Fournisseur>;
  update(id: number, fournisseur: Partial<Fournisseur>): Promise<Fournisseur>;
  delete(id: number): Promise<void>;
}
