import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateScooterDto {
  @IsNumber()
  @IsNotEmpty()
  modele_id: number;

  @IsString()
  @IsNotEmpty()
  numero_serie: string;

  @IsString()
  @IsNotEmpty()
  statut: string;

  @IsDate()
  @IsNotEmpty()
  date_derniere_maintenance: Date;

  @IsNumber()
  @IsNotEmpty()
  kilometrage_total: number;

  @IsNumber()
  @IsNotEmpty()
  cycles_charge: number;
}
