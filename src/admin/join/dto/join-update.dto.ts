import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class JoinUpdateDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  joinId: Types.ObjectId;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
