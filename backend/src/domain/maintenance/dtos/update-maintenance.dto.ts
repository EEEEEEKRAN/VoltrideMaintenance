import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  IsBoolean,
} from 'class-validator';

export class UpdateMaintenanceDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  coutMainOeuvre?: number;

  @IsString()
  @IsOptional()
  notesTechniques?: string;

  @IsBoolean()
  @IsOptional()
  sousGarantie?: boolean;

  @IsString()
  @IsOptional()
  conditionsGarantie?: string;
}
