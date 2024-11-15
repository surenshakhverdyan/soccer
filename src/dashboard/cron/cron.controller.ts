import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CronService } from './cron.service';
import { AuthGuard } from 'src/guards';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Get('get-date')
  getCron(): Promise<boolean> {
    return this.cronService.getDate();
  }
}
