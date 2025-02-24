import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  coutMainOeuvre?: number;

  @IsString()
  @IsOptional()
  notesTechniques?: string;
}
