import { Controller, Get, Param } from '@nestjs/common';
import { Types } from 'mongoose';

import { SchedulesService } from 'src/schedules/schedules.service';
import { Schedule } from 'src/schemas';

@Controller('admin')
export class ScheduleController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('schedule/:gameId')
  gameSchedules(@Param('gameId') gameId: Types.ObjectId): Promise<Schedule[]> {
    return this.schedulesService.getByGameId(gameId);
  }
}
