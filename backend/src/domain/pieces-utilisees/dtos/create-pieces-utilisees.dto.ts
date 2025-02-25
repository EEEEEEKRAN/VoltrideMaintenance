import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreatePiecesUtiliseesDto {
  @IsNotEmpty()
  @IsInt()
  maintenanceId: number;

  @IsNotEmpty()
  @IsInt()
  pieceId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantiteUtilisee: number;
}
