import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Game } from 'src/schemas';
import { GameCreateDto, GameSetDto, GameUpdateDto } from './dto';
import { GameMediaDto } from 'src/admin/game/dto';
import { Status } from 'src/enums';

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
    const game = await this.gameModel
      .findById(gameId)
      .populate({
        path: 'team_1.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_1.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_2.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      });

    return game;
  }

  async getGamesByTeamId(teamId: Types.ObjectId): Promise<Game[]> {
    const game = await this.gameModel
      .find({
        $or: [{ 'team_1.team': teamId }, { 'team_2.team': teamId }],
      })
      .populate({
        path: 'team_1.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_1.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_2.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      });

    return game;
  }

  async pushData(dto: GameUpdateDto, session?: ClientSession): Promise<Game> {
    const game = await this.gameModel.findById(dto.gameId);

    game[dto.teamKey].goals.push(...dto.goals);
    game[dto.teamKey].cards.push(...dto.cards);

    await game.save({ session });

    return game;
  }

  async getActiveGames(): Promise<Game[]> {
    const games = await this.gameModel
      .find({ status: Status.Active })
      .populate({
        path: 'team_1.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_1.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_1.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.team',
        model: 'Team',
        select: 'name avatar',
      })
      .populate({
        path: 'team_2.players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.assist',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.goals.goal',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      })
      .populate({
        path: 'team_2.cards.player',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      });

    return games;
  }

  async updateMedia(dto: GameMediaDto): Promise<boolean> {
    await this.gameModel.findByIdAndUpdate(
      dto.gameId,
      { $set: { video: dto.url }, $push: { images: dto.images } },
      { new: true },
    );

    return true;
  }

  async technicalDefeat(gameId: Types.ObjectId, td: any): Promise<Game> {
    const game = await this.gameModel
      .findByIdAndUpdate(gameId, td, { new: true })
      .exec();

    return game;
  }
}
