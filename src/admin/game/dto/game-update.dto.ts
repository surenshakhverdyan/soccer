import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

class Goals {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  assist?: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  goal?: Types.ObjectId;
}

class Cards {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  player?: Types.ObjectId;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  yellow?: number;

  @ApiProperty({ type: 'number' })
  @IsOptional()
  @IsNumber()
  red?: number;
}

export class GameUpdateDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  teamId: Types.ObjectId;

  @ApiProperty({ type: [Goals] })
  @IsArray()
  @IsOptional()
  goals?: Goals[];

  @ApiProperty({ type: [Cards] })
  @IsArray()
  @IsOptional()
  cards?: Cards[];
}
