import { Body, Controller, Param, Post } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleCreateDto } from 'src/schedules/dto';
import { Schedule } from 'src/schemas';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create-schedule/:token')
  createSchedule(
    @Body() dto: ScheduleCreateDto,
    @Param('token') token: string,
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(dto, token);
  }
}
