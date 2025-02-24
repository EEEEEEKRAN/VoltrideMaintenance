import { IsNumber, IsString, IsEnum, IsOptional, Min } from 'class-validator';
import { MaintenanceType } from '../entities/maintenance.entity';

export class CreateMaintenanceDto {
  @IsNumber()
  scooterId: number;

  @IsEnum(MaintenanceType)
  type: MaintenanceType;

  @IsNumber()
  @Min(0)
  coutMainOeuvre: number;

  @IsString()
  @IsOptional()
  notesTechniques?: string;
}
