import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateScooterDto {
  @IsString()
  @IsNotEmpty()
  numeroSerie: string;

  @IsNumber()
  @IsNotEmpty()
  modeleScooterId: number;
}
