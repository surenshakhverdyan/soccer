import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import { Position } from 'src/enums';

export class PlayerUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  number?: number;

  @IsEnum(Position)
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  team?: Types.ObjectId;
}
