import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

import { Position, Status } from 'src/enums';

export class PlayerUpdateDto {
  @IsNotEmpty()
  playerId: Types.ObjectId;

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

  @IsEnum(Status)
  @IsOptional()
  status?: string;

  @IsOptional()
  team?: Types.ObjectId;
}
