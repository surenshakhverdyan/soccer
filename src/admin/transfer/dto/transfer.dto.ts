import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TransferDto {
  @IsNotEmpty()
  transferId: Types.ObjectId;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
