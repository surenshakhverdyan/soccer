import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import { Position } from 'src/enums';

export class PlayerCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  number: number;

  @IsEnum(Position)
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  team?: Types.ObjectId;
}
