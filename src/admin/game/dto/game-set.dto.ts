import { IsDateString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GameSetDto {
  @IsNotEmpty()
  team_1: Types.ObjectId;

  @IsNotEmpty()
  team_2: Types.ObjectId;

  @IsDateString()
  startDateTime: Date;
}
