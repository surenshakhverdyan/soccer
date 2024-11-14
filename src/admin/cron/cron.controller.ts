import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { CronsService } from 'src/crons/crons.service';
import { AdminGuard } from 'src/guards';
import { Cron } from 'src/schemas';

@UseGuards(AdminGuard)
@Controller('admin')
export class CronController {
  constructor(private readonly cronsService: CronsService) {}

  @Post('set-cron')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      properties: {
        date: { type: 'string', format: 'date-time' },
      },
    },
  })
  createOrUpdate(@Body('date') date: Date): Promise<Cron> {
    return this.cronsService.createOrUpdate(date);
  }

  @Get('end-transfers')
  @ApiBearerAuth()
  getDate(): Promise<Cron> {
    return this.cronsService.get();
  }
}
