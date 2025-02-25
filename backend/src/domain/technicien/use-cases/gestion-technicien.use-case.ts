import { Injectable, Inject } from '@nestjs/common';
import { Technicien, TechnicienStatut } from '../entities/technicien.entity';
import { ITechnicienRepository } from '../repositories/technicien.repository.interface';
import { CreateTechnicienDto } from '../dtos/create-technicien.dto';
import { UpdateTechnicienDto } from '../dtos/update-technicien.dto';

@Injectable()
export class GestionTechnicienUseCase {
  constructor(
    @Inject('ITechnicienRepository')
    private readonly technicienRepository: ITechnicienRepository
  ) {}

  async creerTechnicien(
    createTechnicienDto: CreateTechnicienDto,
  ): Promise<Technicien> {
    const technicienExistant = await this.technicienRepository.findByEmail(
      createTechnicienDto.email,
    );
    if (technicienExistant) {
      throw new Error('Un technicien avec cet email existe déjà');
    }

    const nouveauTechnicien = new Technicien(
      createTechnicienDto.nom,
      createTechnicienDto.email,
      createTechnicienDto.telephone,
    );

    return this.technicienRepository.save(nouveauTechnicien);
  }

  async findAll(): Promise<Technicien[]> {
    return this.technicienRepository.findAll();
  }

  async findById(id: number): Promise<Technicien> {
    const technicien = await this.technicienRepository.findById(id);
    if (!technicien) {
      throw new Error('Technicien non trouvé');
    }
    return technicien;
  }

  async findByStatut(statut: TechnicienStatut): Promise<Technicien[]> {
    return this.technicienRepository.findByStatut(statut);
  }

  async findDisponibles(): Promise<Technicien[]> {
    return this.technicienRepository.findDisponibles();
  }

  async changerStatut(
    id: number,
    nouveauStatut: TechnicienStatut,
  ): Promise<Technicien> {
    const technicien = await this.findById(id);
    technicien.changerStatut(nouveauStatut);
    return this.technicienRepository.save(technicien);
  }

  async mettreAJourTechnicien(
    id: number,
    updateTechnicienDto: UpdateTechnicienDto,
  ): Promise<Technicien> {
    const technicien = await this.findById(id);

    if (
      updateTechnicienDto.email &&
      updateTechnicienDto.email !== technicien.email
    ) {
      const technicienExistant = await this.technicienRepository.findByEmail(
        updateTechnicienDto.email,
      );
      if (technicienExistant) {
        throw new Error('Un technicien avec cet email existe déjà');
      }
    }

    if (updateTechnicienDto.email || updateTechnicienDto.telephone) {
      technicien.mettreAJourContact(
        updateTechnicienDto.email,
        updateTechnicienDto.telephone,
      );
    }

    if (updateTechnicienDto.statut) {
      technicien.changerStatut(updateTechnicienDto.statut);
    }

    if (updateTechnicienDto.nom) {
      technicien.nom = updateTechnicienDto.nom;
    }

    return this.technicienRepository.save(technicien);
  }

  async supprimerTechnicien(id: number): Promise<void> {
    const technicien = await this.findById(id);
    await this.technicienRepository.delete(technicien.id);
  }
}
