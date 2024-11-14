import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { LeaguesService } from 'src/leagues/leagues.service';
import { League } from 'src/schemas';

@Controller('league')
export class LeagueController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get('active')
  getActiveLeagues(): Promise<League[]> {
    return this.leaguesService.getActiveLeagues();
  }

  @Get(':leagueId')
  @ApiParam({ name: 'leagueId', type: 'string', required: true })
  getLeague(@Param('leagueId') leagueId: Types.ObjectId): Promise<League> {
    return this.leaguesService.getById(leagueId);
  }
}
