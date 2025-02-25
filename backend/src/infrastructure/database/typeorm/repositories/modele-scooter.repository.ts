import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModeleScooter } from '../../../../domain/modele-scooter/entities/modele-scooter.entity';
import { IModeleScooterRepository } from '../../../../domain/modele-scooter/repositories/modele-scooter.repository.interface';

@Injectable()
export class ModeleScooterRepository implements IModeleScooterRepository {
  constructor(
    @InjectRepository(ModeleScooter)
    private readonly repository: Repository<ModeleScooter>,
  ) {}

  async findById(id: number): Promise<ModeleScooter | null> {
    return this.repository.findOneBy({ id });
  }

  async findByNom(nom: string): Promise<ModeleScooter | null> {
    return this.repository.findOneBy({ nom });
  }

  async findAll(): Promise<ModeleScooter[]> {
    return this.repository.find();
  }

  async save(modeleScooter: ModeleScooter): Promise<ModeleScooter> {
    return this.repository.save(modeleScooter);
  }

  async update(
    id: number,
    modeleScooter: Partial<ModeleScooter>,
  ): Promise<ModeleScooter> {
    await this.repository.update(id, modeleScooter);
    const updatedModele = await this.findById(id);
    if (!updatedModele) {
      throw new Error(`ModeleScooter with id ${id} not found`);
    }
    return updatedModele;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findWithScooters(id: number): Promise<ModeleScooter | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['scooters'],
    });
  }
}
