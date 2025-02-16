import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsNotEmpty()
  numero_permis: string;

  @IsString()
  @IsNotEmpty()
  password: string; 
}
