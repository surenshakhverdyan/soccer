import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CronsService } from 'src/crons/crons.service';
import { AdminGuard } from 'src/guards';
import { Cron } from 'src/schemas';

@UseGuards(AdminGuard)
@Controller('admin')
export class CronController {
  constructor(private readonly cronsService: CronsService) {}

  @Post('set-cron')
  createOrUpdate(@Body('date') date: Date): Promise<Cron> {
    return this.cronsService.createOrUpdate(date);
  }
}
