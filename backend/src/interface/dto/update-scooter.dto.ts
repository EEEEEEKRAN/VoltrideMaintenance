import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateScooterDto {
  @IsNumber()
  @IsOptional()
  modele_id?: number;

  @IsString()
  @IsOptional()
  numero_serie?: string;

  @IsString()
  @IsOptional()
  statut?: string;

  @IsDate()
  @IsOptional()
  date_derniere_maintenance?: Date;

  @IsNumber()
  @IsOptional()
  kilometrage_total?: number;

  @IsNumber()
  @IsOptional()
  cycles_charge?: number;
}
