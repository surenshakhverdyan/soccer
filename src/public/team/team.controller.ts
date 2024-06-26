import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { TeamsService } from 'src/teams/teams.service';
import { Game, Team } from 'src/schemas';
import { GamesService } from 'src/games/games.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly gamesService: GamesService,
  ) {}

  @Get(':teamId')
  getTeam(@Param('teamId') teamId: Types.ObjectId): Promise<Team> {
    return this.teamsService.getById(teamId);
  }

  @Get('game/:teamId')
  getGamesByTeamId(@Param('teamId') teamId: Types.ObjectId): Promise<Game[]> {
    return this.gamesService.getGamesByTeamId(teamId);
  }
}
