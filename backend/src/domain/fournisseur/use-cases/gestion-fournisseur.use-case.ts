import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fournisseur } from '../../fournisseur/entities/fournisseur.entities';
import { CreateFournisseurDto } from '../../fournisseur/dtos/create-fournisseur.dtos';
import { UpdateFournisseurDto } from '../../fournisseur/dtos/update-fournisseur.dtos';

@Injectable()
export class GestionFournisseurUseCase {
  constructor(
    @InjectRepository(Fournisseur)
    private readonly fournisseurRepository: Repository<Fournisseur>,
  ) {}

  async createFournisseur(
    createFournisseurDto: CreateFournisseurDto,
  ): Promise<Fournisseur> {
    const fournisseur = this.fournisseurRepository.create(createFournisseurDto);
    return this.fournisseurRepository.save(fournisseur);
  }

  async getFournisseurById(id: number): Promise<Fournisseur> {
    const fournisseur = await this.fournisseurRepository.findOneBy({ id });
    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur with ID ${id} not found`);
    }
    return fournisseur;
  }

  async getFournisseurByNom(nom: string): Promise<Fournisseur> {
    const fournisseur = await this.fournisseurRepository.findOne({
      where: { nom },
    });
    if (!fournisseur) {
      throw new NotFoundException(`Fournisseur with name ${nom} not found`);
    }
    return fournisseur;
  }

  async getAllFournisseurs(): Promise<Fournisseur[]> {
    return this.fournisseurRepository.find();
  }

  async updateFournisseur(
    id: number,
    updateFournisseurDto: UpdateFournisseurDto,
  ): Promise<Fournisseur> {
    await this.getFournisseurById(id); // Ensure the fournisseur exists
    await this.fournisseurRepository.update(id, updateFournisseurDto);
    return this.getFournisseurById(id);
  }

  async deleteFournisseur(id: number): Promise<void> {
    const fournisseur = await this.getFournisseurById(id);
    await this.fournisseurRepository.remove(fournisseur);
  }
}
