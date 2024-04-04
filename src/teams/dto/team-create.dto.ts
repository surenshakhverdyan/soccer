import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { PlayerCreateDto } from 'src/players/dto';

export class TeamCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  players?: PlayerCreateDto[];

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  user?: Types.ObjectId;
}
