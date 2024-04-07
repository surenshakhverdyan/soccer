import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';

import { Game } from 'src/schemas';
import { GameCreateDto } from './dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
  ) {}

  async create(dto: GameCreateDto, session?: ClientSession): Promise<Game> {
    const [game] = await this.gameModel.create([dto], { session });

    return game;
  }
}
