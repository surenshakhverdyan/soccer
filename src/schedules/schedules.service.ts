import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Schedule } from 'src/schemas';
import { ScheduleCreateDto } from './dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}

  async create(dto: ScheduleCreateDto): Promise<Schedule> {
    const schedule = await this.scheduleModel.create(dto);

    return schedule;
  }
}
