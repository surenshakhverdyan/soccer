import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { League } from 'src/schemas';
import { LeagueCreateDto } from './dto';

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
}
