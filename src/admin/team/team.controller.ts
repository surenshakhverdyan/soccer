import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

import { AdminGuard } from 'src/guards';
import { Team } from 'src/schemas';
import { TeamsService } from 'src/teams/teams.service';
import { Status } from 'src/enums';

@UseGuards(AdminGuard)
@Controller('admin')
export class TeamController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get('get-teams')
  @ApiBearerAuth()
  getTeams(): Promise<Team[]> {
    return this.teamsService.getAll();
  }

  @Get('get-teams-by-status')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: Object.values(Status) },
      },
    },
  })
  getTeamsByStatus(@Body('status') status: string): Promise<Team[]> {
    return this.teamsService.getByStatus(status);
  }
}
