import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimeLineService } from './time-line.service';
import { Timeline, timeLineSchema } from 'src/schemas/game-timeline.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timeline.name, schema: timeLineSchema },
    ]),
  ],
  providers: [TimeLineService],
  exports: [TimeLineService],
})
export class TimeLineModule {}
