import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { League, LeagueSchema } from 'src/schemas';
import { LeaguesService } from './leagues.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }]),
  ],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
