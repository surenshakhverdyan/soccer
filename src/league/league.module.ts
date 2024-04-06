import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { League, LeagueSchema } from 'src/schemas';
import { LeagueService } from './league.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }]),
  ],
  providers: [LeagueService],
})
export class LeagueModule {}
