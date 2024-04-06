import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { Team } from 'src/schemas';
import { TeamsService } from 'src/teams/teams.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class TeamController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('get-teams')
  getTeams(): Promise<Team[]> {
    return this.teamsService.getAll();
  }
}
