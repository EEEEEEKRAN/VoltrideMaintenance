import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Scooter } from '../../domain/entities/scooter.entity';
import { IScooterRepository } from '../../domain/repositories/iscooter.repository';

@Injectable()
export class GetScooterUseCase {
  constructor(
    @Inject('IScooterRepository')
    private scooterRepository: IScooterRepository,
  ) {}

  async execute(id: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }
    return scooter;
  }

  async executeAll(): Promise<Scooter[]> {
    return this.scooterRepository.findAll();
  }

  async executeByNumeroSerie(numeroSerie: string): Promise<Scooter> {
    const scooter = await this.scooterRepository.findByNumeroSerie(numeroSerie);
    if (!scooter) {
      throw new NotFoundException(
        `Scooter with serial number ${numeroSerie} not found`,
      );
    }
    return scooter;
  }

  async executeByStatut(statut: string): Promise<Scooter[]> {
    return this.scooterRepository.findByStatut(statut);
  }
}
