import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import {
  Scooter,
  ScooterStatut,
} from '../../../../domain/scooter/entities/scooter.entity';
import { IScooterRepository } from '../../../../domain/scooter/repositories/scooter.repository.interface';

@Injectable()
export class ScooterRepository implements IScooterRepository {
  constructor(
    @InjectRepository(Scooter)
    private readonly repository: Repository<Scooter>,
  ) {}

  async findById(id: number): Promise<Scooter | null> {
    return this.repository.findOneBy({ id });
  }

  async findByNumeroSerie(numeroSerie: string): Promise<Scooter | null> {
    return this.repository.findOneBy({ numeroSerie });
  }

  async findAll(): Promise<Scooter[]> {
    return this.repository.find();
  }

  async findByStatut(statut: ScooterStatut): Promise<Scooter[]> {
    return this.repository.find({ where: { statut } });
  }

  async findDisponibles(): Promise<Scooter[]> {
    return this.repository.find({
      where: { statut: ScooterStatut.DISPONIBLE },
    });
  }

  async findByKilometrage(minKm: number, maxKm?: number): Promise<Scooter[]> {
    const where = maxKm
      ? { kilometrageTotal: Between(minKm, maxKm) }
      : { kilometrageTotal: MoreThanOrEqual(minKm) };
    return this.repository.find({ where });
  }

  async findByCyclesCharge(
    minCycles: number,
    maxCycles?: number,
  ): Promise<Scooter[]> {
    const where = maxCycles
      ? { cyclesCharge: Between(minCycles, maxCycles) }
      : { cyclesCharge: MoreThanOrEqual(minCycles) };
    return this.repository.find({ where });
  }

  async save(scooter: Scooter): Promise<Scooter> {
    return this.repository.save(scooter);
  }

  async update(id: number, scooter: Partial<Scooter>): Promise<Scooter> {
    await this.repository.update(id, scooter);
    const updatedScooter = await this.findById(id);
    if (!updatedScooter) {
      throw new Error(`Scooter with id ${id} not found`);
    }
    return updatedScooter;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findNecessitantMaintenance(): Promise<Scooter[]> {
    const KILOMETRAGE_MAX = 5000;
    const CYCLES_CHARGE_MAX = 300;
    const JOURS_MAINTENANCE_MAX = 90;

    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - JOURS_MAINTENANCE_MAX);

    return this.repository
      .createQueryBuilder('scooter')
      .where('scooter.kilometrageTotal >= :kmLimit', {
        kmLimit: KILOMETRAGE_MAX,
      })
      .orWhere('scooter.cyclesCharge >= :cyclesLimit', {
        cyclesLimit: CYCLES_CHARGE_MAX,
      })
      .orWhere('scooter.dateDerniereMaintenance <= :dateLimit', { dateLimit })
      .getMany();
  }
}
