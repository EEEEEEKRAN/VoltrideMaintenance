import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePieceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  thresold: number;

  @IsInt()
  fournisseurId?: number;
}
