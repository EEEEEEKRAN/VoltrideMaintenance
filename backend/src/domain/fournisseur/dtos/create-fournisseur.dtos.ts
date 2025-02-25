import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateFournisseurDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  @IsNotEmpty()
  contact_email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  adresse: string;
}
