import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Team } from 'src/schemas';
import { TeamCreateDto } from './dto';
import { Status } from 'src/enums';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async create(dto: TeamCreateDto, session?: ClientSession): Promise<Team> {
    const [team] = await this.teamModel.create([dto], { session });

    return team;
  }

  async addPlayers(
    players: Types.ObjectId[],
    teamId: Types.ObjectId,
    session?: any,
  ): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $addToSet: { players: { $each: players } } },
      { new: true, session },
    );

    if (team.players.length > 8) {
      team.status = Status.Active;
      await team.save({ session });
    }

    return team;
  }

  async deletePlayer(
    teamId: Types.ObjectId,
    playerId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $pull: { players: playerId } },
      { new: true, session },
    );

    return team;
  }

  async getById(teamId: Types.ObjectId): Promise<Team> {
    const team = await this.teamModel.findById(teamId).populate({
      path: 'players',
      model: 'Player',
    });

    return team;
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.teamModel.find().populate({
      path: 'players',
      model: 'Player',
    });

    return teams;
  }

  async update(avatar: string, teamId: Types.ObjectId): Promise<Team> {
    const team = await this.teamModel
      .findByIdAndUpdate(teamId, { $set: { avatar } }, { new: true })
      .populate({
        path: 'players',
        model: 'Player',
      });

    return team;
  }

  async delete(teamId: Types.ObjectId, session?: ClientSession): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $set: { status: Status.Deleted } },
      { new: true, session },
    );

    return team;
  }
}
