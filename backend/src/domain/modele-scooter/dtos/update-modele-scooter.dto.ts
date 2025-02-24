import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateModeleScooterDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  nom?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
