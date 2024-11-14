import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GameCreateDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  league: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  basket: Types.ObjectId;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  dates?: Date[];
}
