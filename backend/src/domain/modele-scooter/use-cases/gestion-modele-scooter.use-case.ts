import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ModeleScooter } from '../entities/modele-scooter.entity';
import { IModeleScooterRepository } from '../repositories/modele-scooter.repository.interface';
import { CreateModeleScooterDto } from '../dtos/create-modele-scooter.dto';
import { UpdateModeleScooterDto } from '../dtos/update-modele-scooter.dto';

@Injectable()
export class GestionModeleScooterUseCase {
  constructor(
    @Inject('IModeleScooterRepository')
    private readonly modeleScooterRepository: IModeleScooterRepository,
  ) {}

  async creerModeleScooter(
    createModeleScooterDto: CreateModeleScooterDto,
  ): Promise<ModeleScooter> {
    const modeleExistant = await this.modeleScooterRepository.findByNom(
      createModeleScooterDto.nom,
    );
    if (modeleExistant) {
      throw new Error('Un modèle avec ce nom existe déjà');
    }

    const nouveauModele = new ModeleScooter(
      createModeleScooterDto.nom,
      createModeleScooterDto.description,
    );

    return this.modeleScooterRepository.save(nouveauModele);
  }

  async findAll(): Promise<ModeleScooter[]> {
    return this.modeleScooterRepository.findAll();
  }

  async findById(id: number): Promise<ModeleScooter> {
    const modele = await this.modeleScooterRepository.findById(id);
    if (!modele) {
      throw new NotFoundException(`ModeleScooter avec ID ${id} non trouvé`);
    }
    return modele;
  }

  async mettreAJourModeleScooter(
    id: number,
    updateModeleScooterDto: UpdateModeleScooterDto,
  ): Promise<ModeleScooter> {
    const modele = await this.modeleScooterRepository.findById(id);
    if (!modele) {
      throw new Error('Modèle non trouvé');
    }

    if (
      updateModeleScooterDto.nom &&
      updateModeleScooterDto.nom !== modele.nom
    ) {
      const modeleExistant = await this.modeleScooterRepository.findByNom(
        updateModeleScooterDto.nom,
      );
      if (modeleExistant) {
        throw new Error('Un modèle avec ce nom existe déjà');
      }
    }

    modele.mettreAJourInformations(
      updateModeleScooterDto.nom || modele.nom,
      updateModeleScooterDto.description || modele.description,
    );

    return this.modeleScooterRepository.save(modele);
  }

  async supprimerModeleScooter(id: number): Promise<void> {
    const modele = await this.modeleScooterRepository.findWithScooters(id);
    if (!modele) {
      throw new Error('Modèle non trouvé');
    }

    if (modele.estUtiliseParScooters()) {
      throw new Error(
        'Impossible de supprimer ce modèle car il est utilisé par des scooters',
      );
    }

    await this.modeleScooterRepository.delete(id);
  }

  async create(modeleScooter: Partial<ModeleScooter>): Promise<ModeleScooter> {
    const modele = new ModeleScooter(
      modeleScooter.nom || '',
      modeleScooter.description || '',
    );
    return this.modeleScooterRepository.save(modele);
  }

  async update(
    id: number,
    modeleScooter: Partial<ModeleScooter>,
  ): Promise<ModeleScooter> {
    await this.findById(id);
    return this.modeleScooterRepository.update(id, modeleScooter);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    return this.modeleScooterRepository.delete(id);
  }

  async findWithScooters(id: number): Promise<ModeleScooter> {
    const modele = await this.modeleScooterRepository.findWithScooters(id);
    if (!modele) {
      throw new NotFoundException(`ModeleScooter avec ID ${id} non trouvé`);
    }
    return modele;
  }
}
