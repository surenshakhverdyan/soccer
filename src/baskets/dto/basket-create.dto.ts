import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class BasketCreateDto {
  @IsNotEmpty()
  league: Types.ObjectId;

  @IsArray()
  @ArrayMinSize(2)
  teams: Types.ObjectId[];
}
