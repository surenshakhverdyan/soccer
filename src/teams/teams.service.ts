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

    if (team.players.length > 8 && team.status === Status.Inactive) {
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
    const team = await this.teamModel
      .findByIdAndUpdate(
        teamId,
        { $pull: { players: playerId } },
        { new: true, session },
      )
      .populate({
        path: 'players',
        model: 'Player',
        select: '-createdAt -updatedAt -__v',
      });

    if (team.players.length < 9) {
      team.status = Status.Inactive;
      await team.save({ session });
    }

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

  async getByStatus(status: string): Promise<Team[]> {
    const teams = await this.teamModel.find({ status });

    return teams;
  }

  async update(
    teamId: Types.ObjectId,
    avatar?: string,
    teamName?: string,
  ): Promise<Team> {
    const dto: { avatar?: string; name?: string } = {};
    if (avatar && teamName !== undefined) {
      dto.avatar = avatar;
      dto.name = teamName;
    } else if (avatar && !teamName) {
      dto.avatar = avatar;
    } else if (teamName && !avatar) {
      dto.name = teamName;
    }
    const team = await this.teamModel
      .findByIdAndUpdate(teamId, { $set: dto }, { new: true })
      .populate({
        path: 'players',
        model: 'Player',
      });

    return team;
  }

  async updateStatus(
    teamId: Types.ObjectId,
    status: string,
    session?: ClientSession,
  ): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $set: { status } },
      { new: true, session },
    );

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

  async updateGame(
    teamId: Types.ObjectId,
    incrementable: { draws: 1 } | { losses: 1 } | { wins: 1 },
    session?: ClientSession,
  ): Promise<Team> {
    const team = await this.teamModel.findByIdAndUpdate(
      teamId,
      { $inc: incrementable },
      { new: true, session },
    );

    return team;
  }
}
