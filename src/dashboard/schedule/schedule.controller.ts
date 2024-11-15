import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { ScheduleService } from './schedule.service';
import { ScheduleCreateDto } from 'src/schedules/dto';
import { Player, Schedule } from 'src/schemas';
import { Timeline } from 'src/schemas/game-timeline.schema';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create-schedule/:token')
  @ApiBody({
    schema: {
      properties: {
        players: {
          type: 'array',
          items: { type: 'string' },
        },
        date: { type: 'string', format: 'date-time' },
      },
    },
  })
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

  @Get('time-lines/:token')
  getTimeLines(@Param('token') token: string): Promise<Timeline> {
    return this.scheduleService.getTimeLine(token);
  }

  @Get('schedule-by-game-id/:token')
  getScheduleByGameId(@Param('token') token: string): Promise<Schedule[]> {
    return this.scheduleService.getScheduleByGameId(token);
  }
}
