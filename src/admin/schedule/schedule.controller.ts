import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { SchedulesService } from 'src/schedules/schedules.service';
import { Schedule } from 'src/schemas';

@Controller('admin')
export class ScheduleController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('schedule/:gameId')
  @ApiParam({ name: 'gameId', type: 'string', required: true })
  gameSchedules(@Param('gameId') gameId: Types.ObjectId): Promise<Schedule[]> {
    return this.schedulesService.getByGameId(gameId);
  }
}
