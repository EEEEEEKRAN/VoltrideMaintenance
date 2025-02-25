import { Injectable, Inject } from '@nestjs/common';
import { Scooter, ScooterStatut } from '../entities/scooter.entity';
import { IScooterRepository } from '../repositories/scooter.repository.interface';
import { ModeleScooter } from '../../modele-scooter/entities/modele-scooter.entity';
import { UpdateScooterDto } from '../dtos/update-scooter.dto';

@Injectable()
export class GestionScooterUseCase {
  constructor(
    @Inject('IScooterRepository')
    private readonly scooterRepository: IScooterRepository
  ) {}

  async creerScooter(
    numeroSerie: string,
    modeleScooterId: number,
  ): Promise<Scooter> {
    const scooterExistant =
      await this.scooterRepository.findByNumeroSerie(numeroSerie);
    if (scooterExistant) {
      throw new Error('Un scooter avec ce numéro de série existe déjà');
    }

    const nouveauScooter = new Scooter(numeroSerie, {
      id: modeleScooterId,
    } as ModeleScooter);
    nouveauScooter.statut = ScooterStatut.DISPONIBLE;
    nouveauScooter.kilometrageTotal = 0;
    nouveauScooter.cyclesCharge = 0;

    return this.scooterRepository.save(nouveauScooter);
  }

  async findAll(): Promise<Scooter[]> {
    return this.scooterRepository.findAll();
  }

  async findDisponibles(): Promise<Scooter[]> {
    return this.scooterRepository.findDisponibles();
  }

  async mettreAJourKilometrage(
    scooterId: number,
    nouveauKilometrage: number,
  ): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    scooter.mettreAJourKilometrage(nouveauKilometrage);
    return this.scooterRepository.save(scooter);
  }

  async changerStatut(
    scooterId: number,
    nouveauStatut: ScooterStatut,
  ): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    scooter.changerStatut(nouveauStatut);
    return this.scooterRepository.save(scooter);
  }

  async incrementerCyclesCharge(scooterId: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    scooter.incrementerCyclesCharge();
    return this.scooterRepository.save(scooter);
  }

  async verifierMaintenanceNecessaire(): Promise<Scooter[]> {
    return this.scooterRepository.findNecessitantMaintenance();
  }

  async supprimerScooter(scooterId: number): Promise<void> {
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    await this.scooterRepository.delete(scooterId);
  }

  async mettreAJourScooter(
    scooterId: number,
    updateScooterDto: UpdateScooterDto,
  ): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(scooterId);
    if (!scooter) {
      throw new Error('Scooter non trouvé');
    }

    if (updateScooterDto.statut) {
      scooter.changerStatut(updateScooterDto.statut);
    }
    if (updateScooterDto.kilometrageTotal !== undefined) {
      scooter.mettreAJourKilometrage(updateScooterDto.kilometrageTotal);
    }
    if (updateScooterDto.cyclesCharge !== undefined) {
      while (scooter.cyclesCharge < updateScooterDto.cyclesCharge) {
        scooter.incrementerCyclesCharge();
      }
    }

    return this.scooterRepository.save(scooter);
  }
}
