import { IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTeamStatistics {
  @IsNotEmpty()
  leagueId: Types.ObjectId;

  @IsNotEmpty()
  teamId: Types.ObjectId;

  @IsOptional()
  wins?: number;

  @IsOptional()
  losses?: number;

  @IsOptional()
  draws?: number;
}
