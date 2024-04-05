import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TransferCreateDto {
  @IsNotEmpty()
  player: Types.ObjectId;

  @IsNotEmpty()
  fromTeam: Types.ObjectId;

  @IsNotEmpty()
  toTeam: Types.ObjectId;
}
