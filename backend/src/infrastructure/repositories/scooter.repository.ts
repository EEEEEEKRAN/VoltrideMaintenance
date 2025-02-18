import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Scooter } from '../../domain/entities/scooter.entity';
import { IScooterRepository } from '../../domain/repositories/iscooter.repository';

@Injectable()
export class ScooterRepository implements IScooterRepository {
  constructor(
    @InjectRepository(Scooter)
    private scooterRepository: Repository<Scooter>,
  ) {}

  async create(scooter: Scooter): Promise<Scooter> {
    return this.scooterRepository.save(scooter);
  }

  async findById(id: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findOne({
      where: { id },
      relations: ['modele'],
    });
    if (!scooter) {
      throw new Error(`Scooter with id ${id} not found`);
    }
    return scooter;
  }

  async findAll(): Promise<Scooter[]> {
    return this.scooterRepository.find({ relations: ['modele'] });
  }

  async update(id: number, scooter: Partial<Scooter>): Promise<Scooter> {
    const result = await this.scooterRepository.update(id, scooter);
    if (result.affected === 0) {
      throw new Error(`Scooter with id ${id} not found`);
    }
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.scooterRepository.delete(id);
  }

  async findByNumeroSerie(numeroSerie: string): Promise<Scooter> {
    const scooter = await this.scooterRepository.findOne({
      where: { numero_serie: numeroSerie },
      relations: ['modele'],
    });
    if (!scooter) {
      throw new Error(`Scooter with serial number ${numeroSerie} not found`);
    }
    return scooter;
  }

  async findByStatut(statut: string): Promise<Scooter[]> {
    return this.scooterRepository.find({
      where: { statut },
      relations: ['modele'],
    });
  }

  async updateKilometrage(id: number, kilometrage: number): Promise<Scooter> {
    await this.scooterRepository.update(id, { kilometrage_total: kilometrage });
    return this.findById(id);
  }

  async updateCyclesCharge(id: number, cycles: number): Promise<Scooter> {
    await this.scooterRepository.update(id, { cycles_charge: cycles });
    return this.findById(id);
  }

  async updateDerniereMaintenance(id: number, date: Date): Promise<Scooter> {
    await this.scooterRepository.update(id, {
      date_derniere_maintenance: date,
    });
    return this.findById(id);
  }
}
