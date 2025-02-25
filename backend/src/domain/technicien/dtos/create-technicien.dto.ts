import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateTechnicienDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  telephone: string;
}
