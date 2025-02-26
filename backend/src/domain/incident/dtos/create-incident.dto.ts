import { IsString, IsDate } from 'class-validator';

export class CreateIncidentDTO {
  @IsString()
  description: string;

  @IsDate()
  date_signalement: Date;

  @IsString()
  gravite: string;

  @IsString()
  reservationId: number;
}
