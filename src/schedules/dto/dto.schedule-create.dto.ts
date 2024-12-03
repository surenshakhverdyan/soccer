import { IsArray, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

class DateString {
  @IsDateString()
  date: Date;
}

export class ScheduleCreateDto {
  @IsOptional()
  game?: Types.ObjectId;

  @IsOptional()
  team?: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  players: Types.ObjectId[];

  @IsArray()
  date: DateString[];
}
