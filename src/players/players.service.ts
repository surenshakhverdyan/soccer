import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Player } from 'src/schemas';
import { PlayerCreateDto } from './dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async create(dto: PlayerCreateDto, session?: any): Promise<Player> {
    const [player] = await this.playerModel.create([dto], session);

    return player;
  }
}
