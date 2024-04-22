import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { League } from 'src/schemas';
import { LeagueCreateDto, PointsUpdateDto } from './dto';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<League>,
  ) {}

  async create(dto: LeagueCreateDto): Promise<League> {
    const league = await this.leagueModel.create(dto);

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
}
