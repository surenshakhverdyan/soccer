import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';

import { Status } from 'src/enums';
import { AddTeamDto, LeagueCreateDto } from 'src/leagues/dto';
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

      for (const team of dto.teams) {
        await this.teamsService.updateStatus(
          team.team,
          Status.InLeague,
          session,
        );
      }

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

  async addTeam(dto: AddTeamDto): Promise<League> {
    const team = await this.teamsService.getById(dto.teamId);
    if (team.status !== Status.Active)
      throw new HttpException('The team is not active', 403);

    const session = await this.connection.startSession();

    try {
      session.startTransaction();

      await this.teamsService.updateStatus(
        dto.teamId,
        Status.InLeague,
        session,
      );

      const league = await this.leaguesService.addTeam(
        dto.leagueId,
        dto.teamId,
        session,
      );

      await session.commitTransaction();
      session.endSession();

      return league;
    } catch (error: any) {
      await session.abortTransaction();
      session.endSession();

      throw new HttpException(error.message, 500);
    }
  }

  async calculateLeague(leagueId: Types.ObjectId): Promise<League> {
    const session = await this.connection.startSession();
    try {
      session.startTransaction();
      const league = await this.leaguesService.updateStatus(leagueId, session);
      const teams = [];
      league.teams.map((team) => {
        const data = {
          team: team.team,
        };
        teams.push(data);
      });

      for (let i = 0; i < teams.length; i++) {
        await this.teamsService.updateStatus(
          teams[i].team,
          Status.Active,
          session,
        );
      }

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
