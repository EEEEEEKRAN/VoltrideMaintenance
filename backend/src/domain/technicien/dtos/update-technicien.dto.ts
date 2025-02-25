import { IsString, IsEmail, IsOptional, Length, IsEnum } from 'class-validator';
import { TechnicienStatut } from '../entities/technicien.entity';

export class UpdateTechnicienDto {
  @IsString()
  @IsOptional()
  @Length(2, 50)
  nom?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(10, 15)
  telephone?: string;

  @IsEnum(TechnicienStatut)
  @IsOptional()
  statut?: TechnicienStatut;
}
