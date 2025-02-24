import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ScooterStatut } from '../entities/scooter.entity';

export class UpdateScooterDto {
  @IsNumber()
  @IsOptional()
  kilometrageTotal?: number;

  @IsEnum(ScooterStatut)
  @IsOptional()
  statut?: ScooterStatut;

  @IsNumber()
  @IsOptional()
  cyclesCharge?: number;
}
