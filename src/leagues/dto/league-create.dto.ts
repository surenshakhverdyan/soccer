import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LeagueCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayMinSize(2)
  teams: { team: Types.ObjectId }[];
}
