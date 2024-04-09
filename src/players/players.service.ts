import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Player } from 'src/schemas';
import {
  PlayerCreateDto,
  PlayerStatisticsUpdateDto,
  PlayerUpdateDto,
} from './dto';
import { Status } from 'src/enums';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {}

  async create(dto: PlayerCreateDto, session?: ClientSession): Promise<Player> {
    const [player] = await this.playerModel.create([dto], { session });

    return player;
  }

  async getById(playerId: Types.ObjectId): Promise<Player> {
    const player = this.playerModel.findById(playerId);

    return player;
  }

  async update(dto: PlayerUpdateDto, session?: ClientSession): Promise<Player> {
    const player = await this.playerModel.findByIdAndUpdate(
      dto.playerId,
      { $set: dto },
      { new: true, session },
    );

    return player;
  }

  async deleteMany(
    teamId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<void> {
    await this.playerModel.updateMany(
      { team: teamId },
      { $set: { status: Status.Deleted } },
      { session },
    );
  }

  async delete(
    playerId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<Player> {
    const player = await this.playerModel.findByIdAndUpdate(
      playerId,
      { $set: { status: Status.Deleted } },
      { new: true, session },
    );

    return player;
  }

  async findByTeamAndActivate(
    teamId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<boolean> {
    await this.playerModel.updateMany(
      {
        team: teamId,
        status: Status.Inactive,
      },
      { $set: { status: Status.Active } },
      { session },
    );

    return true;
  }

  async findByIdAndInactivate(
    teamId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<boolean> {
    await this.playerModel.findByIdAndUpdate(
      teamId,
      { $set: { status: Status.Inactive } },
      { new: true, session },
    );

    return true;
  }

  async updateStatistics(
    dto: PlayerStatisticsUpdateDto,
    session?: ClientSession,
  ): Promise<Player> {
    const updateObj = {};
    updateObj[dto.fieldKey] = dto.value;

    const player = await this.playerModel.findByIdAndUpdate(
      dto.playerId,
      { $inc: { updateObj } },
      { new: true, session },
    );

    return player;
  }
}
