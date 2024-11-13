import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class setTechnicalDefeatDto {
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @IsNotEmpty()
  teamId: Types.ObjectId;
}
