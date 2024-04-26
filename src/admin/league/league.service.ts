import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Status } from 'src/enums';
import { LeagueCreateDto } from 'src/leagues/dto';
import { LeaguesService } from 'src/leagues/leagues.service';
import { League } from 'src/schemas';
import { TeamsService } from 'src/teams/teams.service';

@Injectable()
export class LeagueService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly leaguesService: LeaguesService,
    private readonly teamsService: TeamsService,
  ) {}

  async createLeague(dto: LeagueCreateDto): Promise<League> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();

      dto.teams.map(async (team) => {
        await this.teamsService.updateStatus(team, Status.InLeague, session);
      });

      const league = await this.leaguesService.create(dto, session);

      await session.commitTransaction();
      session.endSession();

      return league;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }
}
