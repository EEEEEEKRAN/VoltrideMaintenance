import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Scooter } from '../../domain/entities/scooter.entity';
import { IScooterRepository } from '../../domain/repositories/iscooter.repository';
import { UpdateScooterDto } from '../../interface/dto/update-scooter.dto';

@Injectable()
export class UpdateScooterUseCase {
  constructor(
    @Inject('IScooterRepository')
    private scooterRepository: IScooterRepository,
  ) {}

  async execute(
    id: number,
    updateScooterDto: UpdateScooterDto,
  ): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }

    const updatedScooter = await this.scooterRepository.update(
      id,
      updateScooterDto,
    );
    return updatedScooter;
  }

  async updateKilometrage(id: number, kilometrage: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }

    return this.scooterRepository.updateKilometrage(id, kilometrage);
  }

  async updateCyclesCharge(id: number, cycles: number): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }

    return this.scooterRepository.updateCyclesCharge(id, cycles);
  }

  async updateDerniereMaintenance(id: number, date: Date): Promise<Scooter> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }

    return this.scooterRepository.updateDerniereMaintenance(id, date);
  }
}
