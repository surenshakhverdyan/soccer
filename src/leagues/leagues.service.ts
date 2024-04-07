import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
}
