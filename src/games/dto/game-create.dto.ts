import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GameCreateDto {
  @IsNotEmpty()
  league: Types.ObjectId;

  @IsNotEmpty()
  basket: Types.ObjectId;
}
