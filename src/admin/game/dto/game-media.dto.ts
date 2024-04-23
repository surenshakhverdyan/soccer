import { IsArray, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Types } from 'mongoose';

export class GameMediaDto {
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsArray()
  images?: string[];
}
