import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { ScheduleCreateDto } from 'src/schedules/dto';
import { Player, Schedule } from 'src/schemas';

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

  @Get('get-players/:token')
  getPlayersByTeamId(@Param('token') token: string): Promise<Player[]> {
    return this.scheduleService.getPlayersByTeamId(token);
  }
}
