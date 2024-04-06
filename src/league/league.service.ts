import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { League } from 'src/schemas';

@Injectable()
export class LeagueService {
  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<League>,
  ) {}
}
