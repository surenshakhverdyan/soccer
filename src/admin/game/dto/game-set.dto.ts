import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class GameSetDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  team_1: Types.ObjectId; // schedule ids

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  team_2: Types.ObjectId; // schedule ids

  @ApiProperty()
  @IsDateString()
  startDateTime: Date;
}
