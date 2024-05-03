import { Controller, Get, Param } from '@nestjs/common';
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
  getLeague(@Param('leagueId') leagueId: Types.ObjectId): Promise<League> {
    return this.leaguesService.getById(leagueId);
  }
}
