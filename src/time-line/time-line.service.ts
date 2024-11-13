import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';

import { Timeline } from 'src/schemas/game-timeline.schema';
import { TimeLineCreateDto } from './dto/timeline-create.dto';

@Injectable()
export class TimeLineService {
  constructor(
    @InjectModel(Timeline.name) private readonly timeLineModel: Model<Timeline>,
  ) {}

  async create(dto: TimeLineCreateDto, session: ClientSession): Promise<void> {
    await this.timeLineModel.create([dto], { session });
  }

  async getByGameId(gameId: Types.ObjectId): Promise<Timeline> {
    const timeLine = await this.timeLineModel.findOne({ gameId });
    return timeLine;
  }
}
