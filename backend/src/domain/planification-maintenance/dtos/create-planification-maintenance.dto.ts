import { IsEnum, IsNumber, IsNotEmpty, Min } from 'class-validator';
import {
  TypeMaintenance,
  IntervalleType,
} from '../entities/planification-maintenance.entity';

export class CreatePlanificationMaintenanceDto {
  @IsNumber()
  @IsNotEmpty()
  modeleScooterId: number;

  @IsEnum(TypeMaintenance)
  @IsNotEmpty()
  typeMaintenance: TypeMaintenance;

  @IsEnum(IntervalleType)
  @IsNotEmpty()
  intervalleType: IntervalleType;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  intervalleValeur: number;
}
