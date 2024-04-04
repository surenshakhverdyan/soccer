import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TeamsService } from './teams.service';
import { Team, TeamSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
  ],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
