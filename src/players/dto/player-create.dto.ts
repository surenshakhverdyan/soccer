import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import { Position } from 'src/enums';

export class PlayerCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  number: number;

  @IsEnum(Position)
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  teamId?: Types.ObjectId;
}
