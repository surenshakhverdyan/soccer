import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { League } from 'src/schemas';
import {
  ChangeNameDto,
  LeagueCreateDto,
  PointsUpdateDto,
  UpdateTeamStatistics,
} from './dto';
import { Status } from 'src/enums';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<League>,
  ) {}

  async create(dto: LeagueCreateDto, session?: ClientSession): Promise<League> {
    const [league] = await this.leagueModel.create([dto], { session });

    return league;
  }

  async addBasket(
    leagueId: Types.ObjectId,
    basketId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<League> {
    const league = await this.leagueModel.findByIdAndUpdate(
      leagueId,
      { $push: { baskets: basketId } },
      { new: true, session },
    );

    return league;
  }

  async addTeam(
    leagueId: Types.ObjectId,
    teamId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<League> {
    const league = await this.leagueModel.findByIdAndUpdate(
      leagueId,
      { $push: { teams: { team: teamId } } },
      { new: true, session },
    );

    return league;
  }

  async addGame(
    leagueId: Types.ObjectId,
    gameId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<League> {
    const league = await this.leagueModel.findByIdAndUpdate(
      leagueId,
      { $push: { games: gameId } },
      { new: true, session },
    );

    return league;
  }

  async updatePoint(
    dto: PointsUpdateDto,
    session?: ClientSession,
  ): Promise<boolean> {
    await this.leagueModel.updateOne(
      { _id: dto.leagueId, 'teams.team': dto.teamId },
      { $inc: { 'teams.$.points': dto.value } },
      { new: true, session },
    );

    return true;
  }

  async updateGamesCount(
    leagueId: Types.ObjectId,
    teamId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<boolean> {
    await this.leagueModel.updateOne(
      { _id: leagueId, 'teams.team': teamId },
      { $inc: { 'teams.$.games': 1 } },
      { new: true, session },
    );

    return true;
  }

  async updateTeamStatistics(
    dto: UpdateTeamStatistics,
    session?: ClientSession,
  ): Promise<boolean> {
    const incrementFields: Record<string, number> = {};

    if (dto.wins !== undefined) incrementFields['teams.$.wins'] = dto.wins;
    if (dto.losses !== undefined)
      incrementFields['teams.$.losses'] = dto.losses;
    if (dto.draws !== undefined) incrementFields['teams.$.draws'] = dto.draws;

    await this.leagueModel.updateOne(
      { _id: dto.leagueId, 'teams.team': dto.teamId },
      { $inc: incrementFields },
      { new: true, session },
    );
    return true;
  }

  async updateStatus(
    leagueId: Types.ObjectId,
    session: ClientSession,
  ): Promise<League> {
    const _league = await this.leagueModel.findById(leagueId);

    const teams = [];
    _league.teams.map((team) => {
      const data = {
        team: team.team,
        points: team.points,
      };
      teams.push(data);
    });

    const filteredData = teams.filter((obj) => obj.points !== undefined);
    filteredData.sort((a, b) => b.points - a.points);
    const winners = filteredData.slice(0, 3);

    const updateObject = {
      $set: {
        status: Status.Ended,
      },
    };

    for (let i = 0; i < winners.length; i++) {
      updateObject.$set[`place_${i + 1}`] = winners[i].team;
    }

    const league = await this.leagueModel.findByIdAndUpdate(
      leagueId,
      updateObject,
      { new: true, session },
    );

    return league;
  }

  async getById(leagueId: Types.ObjectId): Promise<League> {
    const league = await this.leagueModel
      .findById(leagueId)
      .populate({
        path: 'teams.team',
        model: 'Team',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'players',
          model: 'Player',
          select: '-createdAt -updatedAt -__v',
        },
      })
      .populate({
        path: 'games',
        model: 'Game',
        populate: {
          path: 'team_1.team team_2.team',
          model: 'Team',
          select: 'name',
        },
      })
      .populate({
        path: 'baskets',
        model: 'Basket',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'teams',
          model: 'Team',
          select: '-createdAt -updatedAt -__v',
        },
      });

    return league;
  }

  async getActiveLeagues(): Promise<League[]> {
    const leagues = await this.leagueModel
      .find({ status: Status.Active })
      .populate({
        path: 'teams.team',
        model: 'Team',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'players',
          model: 'Player',
          select: '-createdAt -updatedAt -__v',
        },
      })
      .populate({
        path: 'games',
        model: 'Game',
        populate: {
          path: 'team_1.team team_2.team',
          model: 'Team',
          select: 'name',
        },
      });

    leagues.forEach((league) => {
      if (Array.isArray(league.teams)) {
        league.teams.sort((a, b) => b.points - a.points);
      }
    });

    return leagues;
  }

  async getEndedLeagues(): Promise<League[]> {
    const leagues = await this.leagueModel
      .find({ status: Status.Ended })
      .populate({
        path: 'teams.team',
        model: 'Team',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'players',
          model: 'Player',
          select: '-createdAt -updatedAt -__v',
        },
      })
      .sort('teams.points')
      .populate({
        path: 'games',
        model: 'Game',
        populate: {
          path: 'team_1.team team_2.team',
          model: 'Team',
          select: 'name',
        },
      });

    leagues.forEach((league) => {
      if (Array.isArray(league.teams)) {
        league.teams.sort((a, b) => b.points - a.points);
      }
    });

    return leagues;
  }

  async changeName(dto: ChangeNameDto): Promise<League> {
    const league = await this.leagueModel.findByIdAndUpdate(
      dto.leagueId,
      { $set: { name: dto.name } },
      { new: true },
    );

    return league;
  }
}
