import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { LeagueCreateDto } from 'src/leagues/dto';
import { LeaguesService } from 'src/leagues/leagues.service';
import { League } from 'src/schemas';
import { LeagueService } from './league.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class LeagueController {
  constructor(
    private readonly leaguesService: LeaguesService,
    private readonly leagueService: LeagueService,
  ) {}

  @Post('create-league')
  createLeague(@Body() dto: LeagueCreateDto): Promise<League> {
    return this.leagueService.createLeague(dto);
  }

  @Patch('calculate-league')
  calculateLeague(@Body('leagueId') leagueId: Types.ObjectId): Promise<League> {
    return this.leaguesService.updateStatus(leagueId);
  }
}
