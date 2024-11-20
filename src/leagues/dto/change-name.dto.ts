import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ChangeNameDto {
  leagueId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;
}
