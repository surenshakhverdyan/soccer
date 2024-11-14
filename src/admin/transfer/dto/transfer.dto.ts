import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class TransferDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  transferId: Types.ObjectId;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
