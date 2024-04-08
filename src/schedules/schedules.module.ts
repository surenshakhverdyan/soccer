import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SchedulesService } from './schedules.service';
import { Schedule, ScheduleSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
