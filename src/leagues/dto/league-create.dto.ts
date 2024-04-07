import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class LeagueCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @MinLength(2)
  teams: Types.ObjectId[];
}
