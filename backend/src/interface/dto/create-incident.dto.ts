// src/interface/dto/create-incident.dto.ts
import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateIncidentDTO {
  @IsInt()
  reservationId: number;

  @IsString()
  description: string;

  @IsDate()
  date_signalement: Date;

  @IsString()
  gravite: string;
}
