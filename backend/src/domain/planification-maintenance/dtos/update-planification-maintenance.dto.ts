import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import {
  TypeMaintenance,
  IntervalleType,
} from '../entities/planification-maintenance.entity';

export class UpdatePlanificationMaintenanceDto {
  @IsEnum(TypeMaintenance)
  @IsOptional()
  typeMaintenance?: TypeMaintenance;

  @IsEnum(IntervalleType)
  @IsOptional()
  intervalleType?: IntervalleType;

  @IsNumber()
  @IsOptional()
  @Min(1)
  intervalleValeur?: number;
}
