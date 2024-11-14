import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class BasketCreateDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  league: Types.ObjectId;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(2)
  teams: Types.ObjectId[];
}
