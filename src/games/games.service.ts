import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Game } from 'src/schemas';
import { GameCreateDto, GameSetDto, GameUpdateDto } from './dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private readonly gameModel: Model<Game>,
  ) {}

  async create(dto: GameCreateDto, session?: ClientSession): Promise<Game> {
    const [game] = await this.gameModel.create([dto], { session });

    return game;
  }

  async setGame(dto: GameSetDto, session?: ClientSession): Promise<Game> {
    const game = await this.gameModel.findByIdAndUpdate(
      dto.gameId,
      { $set: dto },
      { new: true, session },
    );

    return game;
  }

  async getById(gameId: Types.ObjectId): Promise<Game> {
    const game = await this.gameModel.findById(gameId);

    return game;
  }

  async pushData(dto: GameUpdateDto, session?: ClientSession): Promise<Game> {
    const updateObj = {};
    const data = {
      cards: dto.cards,
      goals: dto.goals,
    };
    updateObj[dto.teamKey];

    const game = await this.gameModel.findByIdAndUpdate(
      dto.gameId,
      { $set: { updateObj: data } },
      { new: true, session },
    );

    return game;
  }
}
