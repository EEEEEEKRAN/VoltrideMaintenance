import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdateFournisseurDto {
  @IsString()
  @IsOptional()
  nom?: string;

  @IsEmail()
  @IsOptional()
  contact_email?: string;

  @IsPhoneNumber()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  adresse?: string;
}
