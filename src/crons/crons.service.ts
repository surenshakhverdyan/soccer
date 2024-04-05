import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cron } from 'src/schemas';

@Injectable()
export class CronsService {
  constructor(
    @InjectModel(Cron.name) private readonly cronModel: Model<Cron>,
  ) {}

  async createOrUpdate(date: Date): Promise<Cron> {
    const cron = await this.cronModel.findOne({
      endTransfers: { $ne: null },
    });

    if (!cron) {
      await this.cronModel.create({ endTransfers: date });
    } else {
      cron.endTransfers = date;
      await cron.save();
    }

    return cron;
  }

  async get(): Promise<Cron> {
    const cron = await this.cronModel.findOne();

    return cron;
  }
}
