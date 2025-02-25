import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../domain/entities/reservation.entity';
import { CreateReservationDTO } from '../../interface/dto/create-reservation.dto';
import { Utilisateur } from '../../domain/entities/user.entity';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async execute(createReservationDTO: CreateReservationDTO): Promise<Reservation> {
    const { utilisateurId, date_debut } = createReservationDTO;

    console.log('Utilisateur ID from DTO:', utilisateurId);
    console.log('Date de début:', date_debut);

    if (utilisateurId === null) {
      throw new BadRequestException('Utilisateur ID is missing');
    }

    // Convertir la date en objet Date
    const startDate = new Date(date_debut);

    // Vérifier si l'utilisateur a déjà une réservation pour le même jour
    const existingReservation = await this.reservationRepository.findOne({
      relations: ['utilisateur'],
      where: {
        utilisateur: { id: utilisateurId },
        date_debut: startDate,
      },
    });

    console.log('Existing Reservation:', existingReservation);

    if (existingReservation) {
      throw new BadRequestException('Vous avez déjà une réservation pour ce jour.');
    }

    // Charger l'utilisateur pour établir la relation
    const utilisateur = await this.utilisateurRepository.findOne({
      where: { id: utilisateurId },
    });

    console.log('Utilisateur chargé:', utilisateur);

    if (!utilisateur) {
      throw new BadRequestException('Utilisateur non trouvé.');
    }

    // Créer la nouvelle réservation
    const newReservation = this.reservationRepository.create({
      ...createReservationDTO,
      utilisateur,
    });

    return this.reservationRepository.save(newReservation);
  }
}
