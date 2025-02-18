import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Scooter } from '../../domain/entities/scooter.entity';
import { IScooterRepository } from '../../domain/repositories/iscooter.repository';
import { CreateScooterDto } from '../../interface/dto/create-scooter.dto';
import { ModeleScooter } from '../../domain/entities/modele-scooter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateScooterUseCase {
  constructor(
    @Inject('IScooterRepository')
    private scooterRepository: IScooterRepository,
    @InjectRepository(ModeleScooter)
    private modeleScooterRepository: Repository<ModeleScooter>,
  ) {}

  async execute(createScooterDto: CreateScooterDto): Promise<Scooter> {
    const modele = await this.modeleScooterRepository.findOne({
      where: { id: createScooterDto.modele_id },
    });

    if (!modele) {
      throw new NotFoundException(
        `ModeleScooter with ID ${createScooterDto.modele_id} not found`,
      );
    }

    const scooter = new Scooter(
      modele,
      createScooterDto.numero_serie,
      createScooterDto.statut,
      createScooterDto.date_derniere_maintenance,
      createScooterDto.kilometrage_total,
      createScooterDto.cycles_charge,
    );

    return this.scooterRepository.create(scooter);
  }
}
