import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Technicien,
  TechnicienStatut,
} from '../../../../domain/technicien/entities/technicien.entity';
import { ITechnicienRepository } from '../../../../domain/technicien/repositories/technicien.repository.interface';

@Injectable()
export class TechnicienRepository implements ITechnicienRepository {
  constructor(
    @InjectRepository(Technicien)
    private readonly repository: Repository<Technicien>,
  ) {}

  async findById(id: number): Promise<Technicien | null> {
    return this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<Technicien | null> {
    return this.repository.findOneBy({ email });
  }

  async findAll(): Promise<Technicien[]> {
    return this.repository.find();
  }

  async findByStatut(statut: TechnicienStatut): Promise<Technicien[]> {
    return this.repository.find({ where: { statut } });
  }

  async findDisponibles(): Promise<Technicien[]> {
    return this.repository.find({
      where: { statut: TechnicienStatut.DISPONIBLE },
    });
  }

  async save(technicien: Technicien): Promise<Technicien> {
    return this.repository.save(technicien);
  }

  async update(
    id: number,
    technicien: Partial<Technicien>,
  ): Promise<Technicien> {
    await this.repository.update(id, technicien);
    const updatedTechnicien = await this.findById(id);
    if (!updatedTechnicien) {
      throw new Error(`Technicien with id ${id} not found`);
    }
    return updatedTechnicien;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
