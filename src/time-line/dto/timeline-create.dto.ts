import { IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TimeLineCreateDto {
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  dates: Date[];
}
