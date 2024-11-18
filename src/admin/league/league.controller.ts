import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { AdminGuard } from 'src/guards';
import { AddTeamDto, LeagueCreateDto } from 'src/leagues/dto';
import { LeaguesService } from 'src/leagues/leagues.service';
import { League } from 'src/schemas';
import { LeagueService } from './league.service';

@UseGuards(AdminGuard)
@ApiBearerAuth()
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

  @Put('add-team')
  @ApiBody({
    schema: {
      properties: {
        leagueId: { type: 'string' },
        teamId: { type: 'string' },
      },
    },
  })
  addTeam(@Body() dto: AddTeamDto): Promise<League> {
    return this.leagueService.addTeam(dto);
  }

  @Patch('calculate-league')
  @ApiBody({
    schema: {
      properties: {
        leagueId: { type: 'string' },
      },
    },
  })
  calculateLeague(@Body('leagueId') leagueId: Types.ObjectId): Promise<League> {
    return this.leagueService.calculateLeague(leagueId);
  }

  @Get('league/:leagueId')
  @ApiParam({ name: 'leagueId', type: 'string', required: true })
  getLeagueById(@Param('leagueId') leagueId: Types.ObjectId): Promise<League> {
    return this.leaguesService.getById(leagueId);
  }
}
