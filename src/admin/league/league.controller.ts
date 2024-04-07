import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AdminGuard } from 'src/guards';
import { LeagueCreateDto } from 'src/leagues/dto';
import { LeaguesService } from 'src/leagues/leagues.service';
import { League } from 'src/schemas';

@UseGuards(AdminGuard)
@Controller('admin')
export class LeagueController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post('create-league')
  createLeague(@Body() dto: LeagueCreateDto): Promise<League> {
    return this.leaguesService.create(dto);
  }
}
