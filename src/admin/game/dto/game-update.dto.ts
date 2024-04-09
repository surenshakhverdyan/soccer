import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

class Goals {
  @IsOptional()
  assist?: Types.ObjectId;

  @IsOptional()
  goal?: Types.ObjectId;
}

class Cards {
  @IsOptional()
  player?: Types.ObjectId;

  @IsOptional()
  @IsNumber()
  yellow?: number;

  @IsOptional()
  @IsNumber()
  red?: number;
}

export class GameUpdateDto {
  @IsNotEmpty()
  gameId: Types.ObjectId;

  @IsNotEmpty()
  teamId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  goals?: Goals[];

  @IsArray()
  @IsOptional()
  cards?: Cards[];
}
