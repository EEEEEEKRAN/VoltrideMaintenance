import { IsString, IsInt } from 'class-validator';

export class UpdatePieceDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsInt()
  quantity?: number;

  @IsInt()
  thresold?: number;

  @IsInt()
  fournisseurId?: number;
}
