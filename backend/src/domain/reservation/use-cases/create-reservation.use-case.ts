import { Injectable, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { CreateReservationDTO } from '../../user/dtos/create-reservation.dto';
import { Utilisateur } from '../../user/entities/user.entity';

@Injectable()
export class CreateReservationUseCase {
  private readonly logger = new Logger(CreateReservationUseCase.name);

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async execute(createReservationDTO: CreateReservationDTO): Promise<Reservation> {
    try {
      const { utilisateurId, date_debut, scooterId } = createReservationDTO;

      this.logger.log('Utilisateur ID from DTO:', utilisateurId);
      this.logger.log('Date de début:', date_debut);
      this.logger.log('Scooter ID:', scooterId);

      if (!utilisateurId || !scooterId) {
        throw new BadRequestException('Utilisateur ID or Scooter ID is missing');
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

      this.logger.log('Existing Reservation:', existingReservation);

      if (existingReservation) {
        throw new BadRequestException('Vous avez déjà une réservation pour ce jour.');
      }

      // Charger l'utilisateur pour établir la relation
      const utilisateur = await this.utilisateurRepository.findOne({
        where: { id: utilisateurId },
      });

      this.logger.log('Utilisateur chargé:', utilisateur);

      if (!utilisateur) {
        throw new BadRequestException('Utilisateur non trouvé.');
      }

      // Créer la nouvelle réservation
      const newReservation = this.reservationRepository.create({
        ...createReservationDTO,
        utilisateur,
      });

      return this.reservationRepository.save(newReservation);
    } catch (error) {
      this.logger.error('Error creating reservation', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
