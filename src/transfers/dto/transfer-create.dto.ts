import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TransferCreateDto {
  @IsNotEmpty()
  transferId: Types.ObjectId;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
