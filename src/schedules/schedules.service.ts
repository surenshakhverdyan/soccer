import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Schedule } from 'src/schemas';
import { ScheduleCreateDto } from './dto';
import { ISchedule } from './interfaces';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  async create(dto: ScheduleCreateDto): Promise<Schedule> {
    const schedule = await this.scheduleModel.create(dto);

    return schedule;
  }

  async getByTeamAndGameIds(
    teamId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<Schedule> {
    const schedule = await this.scheduleModel.findOne({
      team: teamId,
      game: gameId,
    });

    return schedule;
  }

  async getById(scheduleId: Types.ObjectId): Promise<ISchedule> {
    const schedule = await this.scheduleModel
      .findById(scheduleId)
      .populate({
        path: 'team',
        model: 'Team',
        select: '-players -avatar -status -createdAt -updatedAt -__v',
        populate: {
          path: 'user',
          model: 'User',
          select: '_id email',
        },
      })
      .select('-updatedAt -createdAt -__v');

    return schedule;
  }

  async getByGameId(gameId: Types.ObjectId): Promise<Schedule[]> {
    const schedules = await this.scheduleModel
      .find({ game: new Types.ObjectId(gameId) })
      .populate({
        path: 'team',
        model: 'Team',
        select: 'name team',
        populate: {
          path: 'user',
          model: 'User',
          select: 'phone email',
        },
      })
      .populate({
        path: 'players',
        model: 'Player',
      });

    return schedules;
  }

  async deleteByGameId(
    gameId: Types.ObjectId,
    session?: ClientSession,
  ): Promise<boolean> {
    await this.scheduleModel.deleteMany({ game: gameId }, { session });

    return true;
  }
}
