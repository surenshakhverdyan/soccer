import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CronsService } from './crons.service';
import { Cron, CronSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }]),
  ],
  providers: [CronsService],
  exports: [CronsService],
})
export class CronsModule {}
