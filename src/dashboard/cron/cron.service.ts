import { Injectable } from '@nestjs/common';

import { CronsService } from 'src/crons/crons.service';

@Injectable()
export class CronService {
  constructor(private readonly cronsService: CronsService) {}

  async getDate(): Promise<boolean> {
    const currentDate = Date.now();
    const cron = await this.cronsService.get();

    const endTransfers = new Date(cron.endTransfers).getTime();

    if (endTransfers > currentDate) {
      return true;
    } else {
      return false;
    }
  }
}
