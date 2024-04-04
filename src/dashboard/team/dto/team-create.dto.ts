import { IsArray, IsOptional } from 'class-validator';

import { PlayerCreateDto } from 'src/players/dto';
import { TeamCreateDto as CreateTeamDto } from 'src/teams/dto';

export class TeamCreateDto extends CreateTeamDto {
  @IsArray()
  @IsOptional()
  players?: PlayerCreateDto[];
}
