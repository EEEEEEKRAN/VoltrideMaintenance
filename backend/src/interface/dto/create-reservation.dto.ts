import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReservationDTO {
  @IsInt()
  utilisateurId: number;

  @IsInt()
  scooterId: number;

  @IsDate()
  date_debut: Date;

  @IsDate()
  date_fin: Date;

  @IsString()
  lieu: string;

  @IsString()
  statut: string;


}
