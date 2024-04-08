import { IsArray, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class ScheduleCreateDto {
  @IsOptional()
  game?: Types.ObjectId;

  @IsOptional()
  team?: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  players: Types.ObjectId[];

  @IsDate()
  date: Date;
}
