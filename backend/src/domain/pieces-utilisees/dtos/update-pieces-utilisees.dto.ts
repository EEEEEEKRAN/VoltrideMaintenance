import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdatePiecesUtiliseesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  quantiteUtilisee?: number;
}
