import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class setTechnicalDefeatDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  teamId: Types.ObjectId;
}
