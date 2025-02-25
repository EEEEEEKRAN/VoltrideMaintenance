import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateModeleScooterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nom: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
