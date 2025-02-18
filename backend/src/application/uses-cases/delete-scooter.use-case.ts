import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IScooterRepository } from '../../domain/repositories/iscooter.repository';

@Injectable()
export class DeleteScooterUseCase {
  constructor(
    @Inject('IScooterRepository')
    private scooterRepository: IScooterRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const scooter = await this.scooterRepository.findById(id);
    if (!scooter) {
      throw new NotFoundException(`Scooter with ID ${id} not found`);
    }

    await this.scooterRepository.delete(id);
  }
}
