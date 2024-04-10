import { IsDateString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GameSetDto {
  @IsNotEmpty()
  team_1: Types.ObjectId; // schedule ids

  @IsNotEmpty()
  team_2: Types.ObjectId; // schedule ids

  @IsDateString()
  startDateTime: Date;
}
